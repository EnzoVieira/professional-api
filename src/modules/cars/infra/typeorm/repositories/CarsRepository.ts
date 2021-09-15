import { getRepository, Repository } from "typeorm"

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO"
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository"
import { Car } from "../entities/Car"

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>

  constructor() {
    this.repository = getRepository(Car)
  }

  async create({
    brand,
    categoryId,
    dailyRate,
    description,
    fineAmount,
    licensePlate,
    name,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      brand,
      categoryId,
      dailyRate,
      description,
      fineAmount,
      licensePlate,
      name,
    })

    await this.repository.save(car)

    return car
  }

  async findByLicensePlate(licensePlate: string): Promise<Car> {
    const car = await this.repository.findOne({
      licensePlate,
    })

    return car
  }

  async findAvailable(
    brand?: string,
    categoryId?: string,
    name?: string
  ): Promise<Car[]> {
    const carsQuery = await this.repository
      .createQueryBuilder("c")
      .where("available = :available", { available: true })

    if (brand) {
      carsQuery.andWhere("c.brand = :brand", { brand })
    }

    if (categoryId) {
      carsQuery.andWhere("c.categoryId = :categoryId", { categoryId })
    }

    if (name) {
      carsQuery.andWhere("c.name = :name", { name })
    }

    const cars = await carsQuery.getMany()

    return cars
  }
}

export { CarsRepository }
