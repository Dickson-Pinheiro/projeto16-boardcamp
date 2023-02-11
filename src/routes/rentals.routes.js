import { Router } from "express";
import { rentalsController } from "../controllers/rentalsController.js"

const rentalsRoutes = Router()

rentalsRoutes.post("/rentals", rentalsController.createRentals)
rentalsRoutes.post("/rentals/:id/return", rentalsController.returnGame)
rentalsRoutes.get("/rentals", rentalsController.getRentals)
rentalsRoutes.delete("/rentals/:id", rentalsController.deleteRentals)

export { rentalsRoutes }