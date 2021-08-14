import { Router } from "express"
import multer from "multer"

import { CreateCategoryController } from "../modules/cars/useCases/CreateCategory/CreateCategoryController"
import { listCategoriesController } from "../modules/cars/useCases/ListCategory"
import { importCategoryController } from "../modules/cars/useCases/ImportCategory"

const categoriesRoutes = Router()

const upload = multer({
  dest: "./tmp",
})

const createCategoryController = new CreateCategoryController()

categoriesRoutes.post("/", createCategoryController.handle)

categoriesRoutes.get("/", (_, res) => {
  return listCategoriesController.handle(_, res)
})

categoriesRoutes.post("/import", upload.single("file"), (req, res) => {
  return importCategoryController.handle(req, res)
})

export { categoriesRoutes }
