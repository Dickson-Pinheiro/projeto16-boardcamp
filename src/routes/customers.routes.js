import { Router } from "express";
import { customersController } from "../controllers/customersController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { customerSchema } from "../schemas/customerSchema.js";

const customersRoutes = Router()

customersRoutes.get("/customers", customersController.getCustomers)
customersRoutes.get("/customers/:id", customersController.getCustomerById)
customersRoutes.post("/customers", validateSchema(customerSchema), customersController.createCustomer)
customersRoutes.put("/customers/:id", validateSchema(customerSchema), customersController.updateCustomer)

export {customersRoutes}