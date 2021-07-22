import { Router } from "express"
import multer from "multer"

import { createCategoryController } from "../modules/cars/useCases/CreateCategory"
import { listCategoriesController } from "../modules/cars/useCases/ListCategory"

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
  const { file } = req
  console.log(file)

  return res.send()
})

export { categoriesRoutes }
