import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"

let listAvailableCarsUseCase: ListAvailableCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    )
  })

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test Name",
      description: "Test Description",
      dailyRate: 100,
      licensePlate: "1234",
      fineAmount: 60,
      brand: "Test Brand",
      categoryId: "categoryTest",
    })

    const cars = await listAvailableCarsUseCase.execute({})

    expect(cars).toEqual([car])
  })

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test Name",
      description: "Test Description",
      dailyRate: 100,
      licensePlate: "1234",
      fineAmount: 60,
      brand: "Car_brand_test",
      categoryId: "categoryTest",
    })

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Car_brand_test",
    })

    expect(cars).toEqual([car])
  })

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car3",
      description: "Test Description",
      dailyRate: 100,
      licensePlate: "1236",
      fineAmount: 60,
      brand: "Test Brand",
      categoryId: "categoryTest",
    })

    const cars = await listAvailableCarsUseCase.execute({ name: "Car3" })

    expect(cars).toEqual([car])
  })

  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car3",
      description: "Test Description",
      dailyRate: 100,
      licensePlate: "1236",
      fineAmount: 60,
      brand: "Test Brand",
      categoryId: "12345",
    })

    const cars = await listAvailableCarsUseCase.execute({ categoryId: "12345" })

    expect(cars).toEqual([car])
  })
})
