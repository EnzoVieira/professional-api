import { inject, injectable } from "tsyringe"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"

import { IUsersRepository } from "../../repositories/IUsersRepository"

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: {
    name: string
    email: string
  }
  token: string
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ) {}
  async execute({ email, password }: IRequest): Promise<IResponse> {
    // Usuário existe
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new Error("Email or password incorrect")
    }

    // Senha está correta
    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new Error("Email or password incorrect")
    }

    // Gerar jsonwebtoken
    const token = sign({}, "a027e9eacc4f8b2b55d8fb31e7194956", {
      subject: user.id,
      expiresIn: "1d",
    })

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    }

    return tokenReturn
  }
}

export { AuthenticateUserUseCase }
