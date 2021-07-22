import { Request, Response } from "express-serve-static-core"

import { ImportCategoryUseCase } from "./ImportCategoryUseCase"

class ImportCategoryController {
  constructor(private importCategoryUseCase: ImportCategoryUseCase) {}
  handle(req: Request, res: Response): Response {
    const { file } = req

    this.importCategoryUseCase.execute(file)

    return res.send()
  }
}

export { ImportCategoryController }
