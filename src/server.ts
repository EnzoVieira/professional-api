import express from "express"
import swaggerUi from "swagger-ui-express"

import { router } from "./routes"

import swaggerFile from "./swagger.json"

const server = express()

server.use(express.json())

server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))

server.use(router)

server.get("/", (_, res) => res.send("Api funcionando"))

server.listen(3333, () => console.log("API online!"))
