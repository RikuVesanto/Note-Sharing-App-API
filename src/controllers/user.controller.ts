import { Request, Response } from 'express'
import respond from '../utils/http-responses'
import { UserRegisterRequestDTO } from '../dto/user-register-request.dto'
import { UserLoginRequestDTO } from '../dto/user-login-request.dto'
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
  login: async (req: Request, res: Response) => {
    const LoginRequestDTO: UserLoginRequestDTO = new UserLoginRequestDTO()
    try {
      const token = await userRepo.login(Object.assign(LoginRequestDTO, req.params))
      if (token != "") {
        res.send(token)
      }
      //respond.ok(res)
    } catch (error: any) {
      console.log(error)
    }
  },
}
