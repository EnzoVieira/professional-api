import { ICreateUserDTO } from "../dtos/ICreateUserDTO"
import { User } from "../entities/User"

interface IUsersRepository {
  create(user: ICreateUserDTO): Promise<void>
  findByEmail(email: string): Promise<User>
}

export { IUsersRepository }
