import "reflect-metadata"
import express from "express"
import swaggerUi from "swagger-ui-express"

import "./database"

import "./shared/container"

import { router } from "./routes"
import swaggerFile from "./swagger.json"

const server = express()

const PORT = 3333

server.use(express.json())

server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))

server.use(router)

server.get("/", (_, res) => res.send("Api funcionando"))

server.listen(PORT, () => console.log(`API online na porta ${PORT}`))
