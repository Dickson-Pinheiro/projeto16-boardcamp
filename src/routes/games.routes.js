import {Router} from "express"
import { gamesController } from "../controllers/gamesController.js"
import { validateSchema } from "../middlewares/validateSchema.js"
import { gameSchema } from "../schemas/gameSchema.js"

const gameRoutes = Router()

gameRoutes.get("/games", gamesController.getGames)
gameRoutes.post("/games", validateSchema(gameSchema), gamesController.createGame)

export {gameRoutes}