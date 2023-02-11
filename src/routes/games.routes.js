import {Router} from "express"
import { gamesController } from "../controllers/gamesController.js"

const gameRoutes = Router()

gameRoutes.get("/games", gamesController.getGames)
gameRoutes.post("/games", gamesController.createGame)

export {gameRoutes}