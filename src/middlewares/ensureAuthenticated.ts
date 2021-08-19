import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository"

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
    throw new Error("Token missing")
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
      throw new Error("User do not exists")
    }

    next()
  } catch {
    throw new Error("Invalid token")
  }
}
