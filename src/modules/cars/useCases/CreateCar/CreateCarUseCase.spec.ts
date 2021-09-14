import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { AppError } from "@shared/errors/AppErrors"
import { CreateCarUseCase } from "./CreateCarUseCase"

let createCarUseCase: CreateCarUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
  })

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Test Name",
      description: "Test Description",
      dailyRate: 100,
      licensePlate: "1234",
      fineAmount: 60,
      brand: "Test Brand",
      categoryId: "categoryTest",
    })

    expect(car).toHaveProperty("id")
  })

  it("should not be able to create a car with exists license plate", () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Test Name 1",
        description: "Test Description",
        dailyRate: 100,
        licensePlate: "1234",
        fineAmount: 60,
        brand: "Test Brand",
        categoryId: "categoryTest",
      })

      await createCarUseCase.execute({
        name: "Test Name 2",
        description: "Test Description",
        dailyRate: 100,
        licensePlate: "1234",
        fineAmount: 60,
        brand: "Test Brand",
        categoryId: "categoryTest",
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it("should be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Test Name",
      description: "Test Description",
      dailyRate: 100,
      licensePlate: "1234",
      fineAmount: 60,
      brand: "Test Brand",
      categoryId: "categoryTest",
    })

    expect(car.available).toBe(true)
  })
})
