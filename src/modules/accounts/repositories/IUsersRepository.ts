import { ICreateUserDTO } from "../dtos/ICreateUserDTO"

interface IUsersRepository {
  create(user: ICreateUserDTO): Promise<void>
}

export { IUsersRepository }
