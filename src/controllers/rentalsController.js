import dayjs from "dayjs"
import { db } from "../database/database"

export const rentalsController = {
    async createRentals(req, res) {
        const { customerId, gameId, daysRented } = req.body

        if(daysRented <=0){
            return res.status(400).send()
        }

        try {
            const queryUser = "select * from customers where id=$1;"
            const customerData = await db.query(queryUser, [customerId])
            
            if(!customerData.rows[0]){
                return res.status(400).send()
            }

            const query = "select pricePerDay, stockTotal from game where id=$1;"
            const gameData = await db.query(query, [gameId])

            if(!gameData.rows[0]) {
                return res.status(400).send()
            }

            const { pricePerDay, stockTotal } = gameData.rows[0]
            const originalPrice = pricePerDay * daysRented
            const rentDate = dayjs(new Date()).format("YYYY-MM-DD")

            const queryRentals = "select count($1) as rented_games from rentals where gameId=$2 and returnDate is not null;"

            const rentalsData = await db.query(queryRentals, [gameId, gameId])
            const {rented_games} = rentalsData;

            if(rented_games >= stockTotal){
                return res.status(400).send()
            }

            const queryCreate = "insert into rentals (customerId, gameId, rentDate, daysRented, originalPrice) values ($1, $2, $3, $4, $5);"
            await db.query(queryCreate, [customerId, gameId, rentDate, daysRented, originalPrice])
            return res.status(201).send()
        } catch (error) {
            console.log(error)
            return res.status(500).send()
        }

    }
}