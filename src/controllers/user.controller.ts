import { Request, Response } from 'express'
import { UserRegisterRequestDTO } from '../dto/user-register-request.dto'
import { UserLoginRequestDTO } from '../dto/user-login-request.dto'
import userRepo from '../repositories/user.repository'

export default {
  register: async (req: Request, res: Response) => {
    const registerRequestDTO: UserRegisterRequestDTO =
      new UserRegisterRequestDTO()
    try {
      let registerStatus = await userRepo.register(Object.assign(registerRequestDTO, req.body))
      if (registerStatus == "duplicateEmail") {
        res.status(409).send("This email is already in use")
      } else if (registerStatus == "duplicateUsername") {
        res.status(409).send("This username is already in use")
      } else if (registerStatus == "success") {
        res.status(201).send("Registration successful")
      }
    } catch (error: any) {
      console.log(error)
    }
  },
  login: async (req: Request, res: Response) => {
    const LoginRequestDTO: UserLoginRequestDTO = new UserLoginRequestDTO()
    try {
      const response = await userRepo.login(Object.assign(LoginRequestDTO, req.params))
      if (response == "Incorrect password" || response == "Username not found") {
        res.status(401).send({
          message: response
        })
      } else if (response != "") {
        res.status(200).send(response)
      }
    } catch (error: any) {
      console.log(error)
    }
  },
}
