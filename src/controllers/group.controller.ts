import { Request, Response } from 'express'
import respond from '../utils/http-responses'
import { GroupRegisterRequestDTO } from '../dto/group-register-request.dto'
import groupRepo from '../repositories/group.repository'
import { AddGroupsUserRequestDTO } from '../dto/add-groups-user-request.dto'

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
  getGroupList: async (req: Request, res: Response) => {
    try {
      const groupList = await groupRepo.getGroupList(req.params.id)
      res.send(groupList)
    } catch (error: any) {
      console.log(error)
    }
  },
  getGroupSearchResult: async (req: Request, res: Response) => {
    try {
      const groupSearchResult = await groupRepo.getGroupSearchResult(req.params.search)
      res.send(groupSearchResult)
    } catch (error: any) {
      console.log(error)
    }
  },
  addUserConnection: async (req: Request, res: Response) => {
    const addGroupsUserRequestDTO: AddGroupsUserRequestDTO =
      new AddGroupsUserRequestDTO()
    try {
      await groupRepo.addUserConnection(Object.assign(addGroupsUserRequestDTO, req.body))
      respond.created(res)
    } catch (error: any) {
      console.log(error)
    }
  },
}
