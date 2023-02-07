import { Router } from "express";

const customersRoutes = Router()

customersRoutes.get("/users", (req, res) => {
    res.send("ok")
})


export {customersRoutes}