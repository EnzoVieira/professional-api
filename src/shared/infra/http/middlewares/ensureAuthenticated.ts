import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"

import { UsersRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersRepository"

import { AppError } from "../../../errors/AppErrors"

interface IPayload {
  sub: string
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError("Token missing", 401)
  }

  const [, token] = authHeader.split(" ")

  try {
    const { sub: userID } = verify(
      token,
      "a027e9eacc4f8b2b55d8fb31e7194956"
    ) as IPayload

    const usersRepository = new UsersRepository()

    const user = usersRepository.findById(userID)

    if (!user) {
      throw new AppError("User do not exists", 401)
    }

    request.user = { id: userID }

    next()
  } catch {
    throw new AppError("Invalid token", 401)
  }
}
