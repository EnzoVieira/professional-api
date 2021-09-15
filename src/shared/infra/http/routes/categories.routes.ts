import { Router } from "express"
import multer from "multer"

import { CreateCategoryController } from "../../../../modules/cars/useCases/CreateCategory/CreateCategoryController"
import { ListCategoriesController } from "../../../../modules/cars/useCases/ListCategory/ListCategoriesController"
import { ImportCategoryController } from "../../../../modules/cars/useCases/ImportCategory/ImportCategoryController"

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated"
import { ensureAdmin } from "../middlewares/ensureAdmin"

const categoriesRoutes = Router()

const upload = multer({
  dest: "./tmp",
})

const createCategoryController = new CreateCategoryController()
const importCategoryController = new ImportCategoryController()
const listCategoriesController = new ListCategoriesController()

categoriesRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCategoryController.handle
)

categoriesRoutes.get("/", listCategoriesController.handle)

categoriesRoutes.post(
  "/import",
  upload.single("file"),
  ensureAuthenticated,
  ensureAdmin,
  importCategoryController.handle
)

export { categoriesRoutes }
