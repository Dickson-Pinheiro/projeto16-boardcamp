import {Router} from "express"

const gameRoutes = Router()

gameRoutes.get("/games", (req, res) => {
    res.send("ok")
})

export {gameRoutes}