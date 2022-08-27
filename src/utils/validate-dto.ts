import { validate } from 'class-validator'
import { UserRegisterRequestDTO } from '../dto/user-register-request.dto'
import { BaseDTO } from '../dto/base-dto'
import { HttpError } from './errors'

const validateRequest = async (request: BaseDTO) => {
  const errors = await validate(request, {
    skipMissingProperties: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  })
  if (errors.length > 0) {
    throw HttpError(400, `Invalid properties: ${errors[0].property}`)
  }
}

export default {
  registerRequest: async (request: UserRegisterRequestDTO): Promise<void> => {
    await validateRequest(request)
  },
}
