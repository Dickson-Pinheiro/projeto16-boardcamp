const games = []

export const gamesController = {
    createGame(req, res){
        const { name, image, stockTotal, pricePerDay } = req.body

        const game = {}
        Object.assign(game, {name, image, stockTotal, pricePerDay})

        return res.status(201).send()
    },
    getGames(req, res){
        return res.send(games)
    }
}