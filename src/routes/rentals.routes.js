import { Router } from "express";
import { rentalsController } from "../controllers/rentalsController.js"
import { validateSchema } from "../middlewares/validateSchema.js";
import { rentalSchema } from "../schemas/rentalSchema.js";

const rentalsRoutes = Router()

rentalsRoutes.post("/rentals", validateSchema(rentalSchema), rentalsController.createRentals)
rentalsRoutes.post("/rentals/:id/return", rentalsController.returnGame)
rentalsRoutes.get("/rentals", rentalsController.getRentals)
rentalsRoutes.delete("/rentals/:id", rentalsController.deleteRentals)

export { rentalsRoutes }