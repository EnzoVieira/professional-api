import { ICreateCarDTO } from "../dtos/ICreateCarDTO"
import { Car } from "../infra/typeorm/entities/Car"

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>
  findByLicensePlate(licensePlate: string): Promise<Car>
  findAvailable(
    brand?: string,
    categoryId?: string,
    name?: string
  ): Promise<Car[]>
}

export { ICarsRepository }
