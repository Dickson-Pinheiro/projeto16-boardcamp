import { Router } from "express";

const rentalsRoutes = Router()

rentalsRoutes.get("/rentals", (req, res) => {
    res.send("ok")
})

export {rentalsRoutes}