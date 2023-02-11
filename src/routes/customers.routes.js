import { Router } from "express";
import { customersController } from "../controllers/customersController.js";

const customersRoutes = Router()

customersRoutes.get("/customers", customersController.getCustomers)
customersRoutes.get("/customers/:id", customersController.getCustomerById)
customersRoutes.post("/customers", customersController.createCustomer)
customersRoutes.put("/customers/:id", customersController.updateCustomer)

export {customersRoutes}