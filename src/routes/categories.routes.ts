import { Router } from "express"
import multer from "multer"

import { createCategoryController } from "../modules/cars/useCases/CreateCategory"
import { listCategoriesController } from "../modules/cars/useCases/ListCategory"
import { importCategoryController } from "../modules/cars/useCases/ImportCategory"

const categoriesRoutes = Router()

const upload = multer({
  dest: "./tmp",
})

categoriesRoutes.post("/", (req, res) => {
  return createCategoryController.handle(req, res)
})

categoriesRoutes.get("/", (_, res) => {
  return listCategoriesController.handle(_, res)
})

categoriesRoutes.post("/import", upload.single("file"), (req, res) => {
  return importCategoryController.handle(req, res)
})

export { categoriesRoutes }
