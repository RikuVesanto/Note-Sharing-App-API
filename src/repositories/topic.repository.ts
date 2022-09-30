import { appDataSource } from '../utils/app-data-source'
import { Topic } from '../entities/Topic'
import { Group } from '../entities/Group'
import { TopicRegisterRequestDTO } from '../dto/topic-register-request.dto'
import validate from '../utils/validate-dto'


export default {
  register: async (request: TopicRegisterRequestDTO): Promise<void> => {
    await validate.validateRequest(request)
    const topic: Topic = new Topic()
    const group: Group = await appDataSource.manager.findOneOrFail(Group, {
        where: {
          id: request.groupId,
        },
      })
    topic.topic = request.topic
    topic.description = request.description ?? ''
    topic.group = group
    await topic.save()
  },
  getTopicList: async (id: string): Promise<Object> => {
    var response = await appDataSource
     .getRepository(Topic)
     .createQueryBuilder("topic")
     .where(`topic.groupId = ${id}`)
     .getMany()
     return  response
   },
}