import { Request, Response } from 'express'
import { TopicRegisterRequestDTO } from '../dto/topic-register-request.dto'
import topicRepo from '../repositories/topic.repository'

export default {
  register: async (req: Request, res: Response) => {
    const registerRequestDTO: TopicRegisterRequestDTO =
      new TopicRegisterRequestDTO()
    try {
      const status = await topicRepo.register(Object.assign(registerRequestDTO, req.body))
      if (status == "groupMissing") {
        res.status(422).send("Failed to create topic, missing group")
      } else if (status == "success") {
        res.status(201).send("Topic created")
      }
    } catch (error: any) {
      console.log(error)
    }
  },
  getTopicList: async (req: Request, res: Response) => {
    try {
      const topicList = await topicRepo.getTopicList(req.params.id)
      res.status(200).send(topicList)
    } catch (error: any) {
      console.log(error)
      console.log("bah")
    }
  },
}
