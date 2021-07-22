import { Router } from "express"

import { createCategoryController } from "../modules/cars/useCases/CreateCategory"
import { listCategoriesController } from "../modules/cars/useCases/ListCategory"

const categoriesRoutes = Router()

categoriesRoutes.post("/", (req, res) => {
  return createCategoryController.handle(req, res)
})

categoriesRoutes.get("/", (_, res) => {
  return listCategoriesController.handle(_, res)
})

export { categoriesRoutes }
