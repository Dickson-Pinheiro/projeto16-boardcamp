import { db } from "../database/database.js"


export const gamesController = {
    async createGame(req, res) {
        const { name, image, stockTotal, pricePerDay } = req.body

        try {
            const query = 'insert into games (name, image, "stockTotal", "pricePerDay") values ($1, $2, $3, $4);'
            await db.query(query, [name, image, stockTotal, pricePerDay])
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