import "reflect-metadata"
import express, { NextFunction, Request, Response } from "express"
import "express-async-errors"
import swaggerUi from "swagger-ui-express"

import "./database"

import "./shared/container"

import { AppError } from "./errors/AppErrors"
import { router } from "./routes"
import swaggerFile from "./swagger.json"

const server = express()

const PORT = 3333

server.use(express.json())

server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))

server.use(router)

server.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message })
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    })
  }
)

server.get("/", (_, res) => res.send("Api funcionando"))

server.listen(PORT, () => console.log(`API online na porta ${PORT}`))
