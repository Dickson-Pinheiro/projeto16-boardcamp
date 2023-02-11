import { db } from "../database/database.js"


export const gamesController = {
    async createGame(req, res) {
        const { name, image, stockTotal, pricePerDay } = req.body

        try {
            const queryVerifyName = 'select * from games where name = $1;'

            const game = await db.query(queryVerifyName, [name])
            if(game.rows[0]){
                return res.status(409).send()
            }

            const queryInsertGame = 'insert into games (name, image, "stockTotal", "pricePerDay") values ($1, $2, $3, $4);'
            await db.query(queryInsertGame, [name, image, stockTotal, pricePerDay])
            return res.status(201).send()
        } catch (error) {
            console.log(error)
            return res.status(500).send()
        }
    },

    async getGames(req, res) {
        try {
            const query = "select * from games;"
            const games = await db.query(query)
            return res.send(games.rows)
        } catch (error) {
            console.log(error)
            return res.status(500).send()
        }
    }
}