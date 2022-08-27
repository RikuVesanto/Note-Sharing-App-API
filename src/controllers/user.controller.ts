import { Request, Response } from 'express'
import respond from '../utils/http-responses'
import { UserRegisterRequestDTO } from '../dto/user-register-request.dto'
import userRepo from '../repositories/user.repository'

export default {
  register: async (req: Request, res: Response) => {
    const registerRequestDTO: UserRegisterRequestDTO =
      new UserRegisterRequestDTO()
    try {
      await userRepo.register(Object.assign(registerRequestDTO, req.body))
      respond.created(res)
    } catch (error: any) {
      console.log(error)
    }
  },
}
