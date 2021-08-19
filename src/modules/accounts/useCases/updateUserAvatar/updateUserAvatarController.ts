import { Request, response, Response } from "express"
import { container } from "tsyringe"

import { UpdateUserAvatarUseCase } from "./updateUserAvatarUseCase"

class UpdateUserAvatarController {
  async handle(request: Request, response: Response) {
    const { id } = request.user

    // Receber arquivo
    const avatarFile = request.file.filename

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase)

    await updateUserAvatarUseCase.execute({ userId: id, avatarFile })

    return response.status(204).send()
  }
}

export { UpdateUserAvatarController }
