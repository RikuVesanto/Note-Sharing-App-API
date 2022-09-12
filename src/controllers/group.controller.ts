import { Request, Response } from 'express'
import respond from '../utils/http-responses'
import { GroupRegisterRequestDTO } from '../dto/group-register-request.dto'
import groupRepo from '../repositories/group.repository'

export default {
  register: async (req: Request, res: Response) => {
    const registerRequestDTO: GroupRegisterRequestDTO =
      new GroupRegisterRequestDTO()
    try {
      await groupRepo.register(Object.assign(registerRequestDTO, req.body))
      respond.created(res)
    } catch (error: any) {
      console.log(error)
    }
  },
}
