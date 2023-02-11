import dayjs from "dayjs"
import { db } from "../database/database.js"

export const rentalsController = {
    async createRentals(req, res) {
        const { customerId, gameId, daysRented } = req.body

        if (daysRented <= 0) {
            return res.status(400).send()
        }
        try {
            const queryUser = "select * from customers where id=$1;"
            const customerData = await db.query(queryUser, [customerId])

            if (!customerData.rows[0]) {
                return res.status(400).send()
            }

            const query = 'select "pricePerDay", "stockTotal" from games where id=$1;'
            const gameData = await db.query(query, [gameId])

            if (!gameData.rows[0]) {
                return res.status(400).send()
            }

            const { pricePerDay, stockTotal } = gameData.rows[0]
            const originalPrice = pricePerDay * daysRented
            const rentDate = dayjs(new Date()).format("YYYY-MM-DD")

            const queryRentals = 'select count("gameId") as rented_games from rentals where "gameId"=$1 and "returnDate" is null;'

            const rentalsData = await db.query(queryRentals, [gameId])
            const { rented_games } = rentalsData.rows[0];

            if (rented_games >= stockTotal) {
                return res.status(400).send()
            }

            const queryCreate = 'insert into rentals ("customerId", "gameId", "rentDate", "daysRented", "originalPrice") values ($1, $2, $3, $4, $5);'
            await db.query(queryCreate, [customerId, gameId, rentDate, daysRented, originalPrice])
            return res.status(201).send()
        } catch (error) {
            console.log(error)
            return res.status(500).send()
        }

    },
    async getRentals(req, res){
        const query = `SELECT json_build_object(
            'id', rentals.id,
            'customerId', rentals."customerId",
            'gameId', rentals."gameId",
            'rentDate', rentals."rentDate",
            'daysRented', rentals."daysRented",
            'returnDate', rentals."returnDate",
            'originalPrice', rentals."originalPrice",
            'delayFee', rentals."delayFee",
            'customer', json_build_object(
                'id', customers.id,
                'name', customers.name
            ),
            'game', json_build_object(
                'id', games.id,
                'name', games.name
            )
        )
        FROM rentals
        JOIN games
        ON games.id = rentals."gameId"
        JOIN customers
        ON customers.id = rentals."customerId"
        order by rentals.id;
        `

        try {
            const rentals = await db.query(query)
            const rentalsData = rentals.rows.map(rent => {return {...rent.json_build_object}}) 
            return res.send(rentalsData)
        } catch (error) {
            console.log(error)
            return res.status(500).send()
        }
    },
    async returnGame(req, res){
        const {id} = req.params;
        const query = 'select rentals."rentDate", rentals."daysRented", rentals."returnDate", games."pricePerDay" from rentals JOIN games ON rentals."gameId" = games.id where rentals.id=$1;'

        try {
            const rent = await db.query(query, [id])
            if(!rent.rows[0]){
                return res.status(404).send()
            }
            const returnedDate = new Date()
            const returnDateInset = dayjs(returnedDate).format("YYYY-MM-DD")
            const {rentDate, daysRented, pricePerDay, returnDate} = rent.rows[0]
            if(returnDate){
                return res.status(400).send() 
            }
            /*a diferença entre datas retorna o tempo em ms. Para converter para dias, primeiro transformei em segundos, minutos e horas */
            const rentTime = parseInt((returnedDate - rentDate)/(1000 * 60 * 60 * 24))

            if(rentTime > daysRented){
                const delay = rentTime - daysRented;
                const delayFee = delay * pricePerDay;
                let queryReturnRentals = 'update rentals set "returnDate"=$1, "delayFee"=$2 where id=$3;'
                await db.query(queryReturnRentals, [returnDateInset, delayFee, id])
                return res.send()
            }

            let queryReturnRentals = 'update rentals set "returnDate"=$1 where id=$2;'
            await db.query(queryReturnRentals, [returnDateInset, id])
            return res.send()

        } catch (error) {
            console.log(error)
            return res.status(500).send()
        }
    },
    async deleteRentals(req, res){
        const {id} = req.params;

        try {
            const query = 'select * from rentals where id=$1'
            const rentals = await db.query(query, [id])

            if(!rentals.rows[0]){
                return res.status(404).send()
            }
            const {returnDate} = rentals.rows[0]

            if(!returnDate){
                return res.status(400).send()
            }

           const queryDeleteRentals = 'delete from rentals where id=$1;'
           await db.query(queryDeleteRentals, [id])
           return res.send()
        } catch (error) {
            console.log(error)
            return res.status(500).send()
        }
    }
}