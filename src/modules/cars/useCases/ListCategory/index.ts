import { ListCategoriesUseCase } from "./ListCategoriesUseCase"
import { ListCategoriesController } from "./ListCategoriesController"
import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository"

// const categoriesRepository = CategoriesRepository.getInstance()
const categoriesRepository = null

const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository)

const listCategoriesController = new ListCategoriesController(
  listCategoriesUseCase
)

export { listCategoriesController }
