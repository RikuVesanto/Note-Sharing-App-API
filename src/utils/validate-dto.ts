import { validate } from 'class-validator'
import { BaseDTO } from '../dto/base-dto'

const validateRequest = async (request: BaseDTO) => {
  const errors = await validate(request, {
    skipMissingProperties: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  })
  if (errors.length > 0) {
    let invalidValues = ""
    let i = 0
    while (i < errors.length) {
      if (i != 0) {
        invalidValues += ", "
      }
      invalidValues +=  errors[i].property + " \'" + errors[i].value +"\'"
      i++
    }
    throw validationError(422, `Invalid values: ${invalidValues}`)
  }
}

const validationError = (statusCode: number, message: string) => {
  return new Error(String(statusCode) + " " + message);
}

export default {
  validateRequest
}