import { Car } from "@modules/cars/infra/typeorm/entities/Car"

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO"
import { ICarsRepository } from "../ICarsRepository"

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = []

  async create({
    name,
    description,
    brand,
    categoryId,
    dailyRate,
    fineAmount,
    licensePlate,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car()

    Object.assign(car, {
      name,
      description,
      brand,
      categoryId,
      dailyRate,
      fineAmount,
      licensePlate,
    })

    this.cars.push(car)

    return car
  }

  async findByLicensePlate(licensePlate: string): Promise<Car> {
    return this.cars.find(car => car.licensePlate === licensePlate)
  }
}

export { CarsRepositoryInMemory }
