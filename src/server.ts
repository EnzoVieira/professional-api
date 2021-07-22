import express from "express"

import { categoriesRoutes } from "./routes/categories.routes"
import { specificationsRoutes } from "./routes/specifications.routes"

const server = express()

server.use(express.json())

server.use("/categories", categoriesRoutes)
server.use("/specifications", specificationsRoutes)

server.get("/", (req, res) => res.send("Api funcionando"))

server.listen(3333, () => console.log("API online!"))
