import { Request, Response } from 'express'
import respond from '../utils/http-responses'
import { TopicRegisterRequestDTO } from '../dto/topic-register-request.dto'
import topicRepo from '../repositories/topic.repository'

export default {
  register: async (req: Request, res: Response) => {
    const registerRequestDTO: TopicRegisterRequestDTO =
      new TopicRegisterRequestDTO()
    try {
      await topicRepo.register(Object.assign(registerRequestDTO, req.body))
      respond.created(res)
    } catch (error: any) {
      console.log(error)
    }
  },
  getTopicList: async (req: Request, res: Response) => {
    try {
      const topicList = await topicRepo.getTopicList(req.params.id)
      res.send(topicList)
    } catch (error: any) {
      console.log(error)
    }
  },
}
