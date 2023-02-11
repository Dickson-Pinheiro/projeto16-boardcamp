import express from "express"
import cors from "cors"
import { customersRoutes } from "./routes/customers.routes.js"
import { gameRoutes } from "./routes/games.routes.js"
import { rentalsRoutes } from "./routes/rentals.routes.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use([customersRoutes, gameRoutes, rentalsRoutes])

const PORT = process.env.PORT || 5000

app.listen(PORT)