import express from "express"

import { router } from "./routes"

const server = express()

server.use(express.json())

server.use(router)

server.get("/", (req, res) => res.send("Api funcionando"))

server.listen(3333, () => console.log("API online!"))
