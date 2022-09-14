import argon2 from 'argon2'
import { Group } from '../entities/Group'
import { GroupRegisterRequestDTO } from '../dto/group-register-request.dto'
import validate from '../utils/validate-dto'
import { User } from '../entities/User'
import { appDataSource } from '../utils/app-data-source'


export default {
  register: async (request: GroupRegisterRequestDTO): Promise<void> => {
    await validate.groupRegisterRequest(request)
    const group: Group = new Group()
    group.name = request.name
    group.password = await argon2.hash(request.password)
    const user: User = await appDataSource.manager.findOneOrFail(User, {
      where: {
        id: request.creatorId,
      },
    })
    group.user = user
    group.class = request.class ?? ''
    group.description = request.description ?? ''
    await group.save()
  },
  getGroupList: async (id: string): Promise<Object> => {
   var response = await appDataSource
    .getRepository(Group)
    .createQueryBuilder("group")
    .where(`group.creatorId = ${id}`)
    .getMany()
    return  response
  },

}
