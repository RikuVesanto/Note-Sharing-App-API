import { validate } from 'class-validator'
import { UserRegisterRequestDTO } from '../dto/user-register-request.dto'
import { UserLoginRequestDTO } from 'src/dto/user-login-request.dto'
import { GroupRegisterRequestDTO } from '../dto/group-register-request.dto'
import { TopicRegisterRequestDTO } from '../dto/topic-register-request.dto'
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
  loginRequest: async (request: UserLoginRequestDTO): Promise<void> => {
    await validateRequest(request)
  },
  groupRegisterRequest: async (request: GroupRegisterRequestDTO): Promise<void> => {
    await validateRequest(request)
  },
  TopicRegisterRequestDTO: async (request: TopicRegisterRequestDTO): Promise<void> => {
    await validateRequest(request)
  },
}
