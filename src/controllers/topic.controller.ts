import { Request, Response } from 'express'
import { TopicRegisterRequestDTO } from '../dto/topic-register-request.dto'
import { TopicEditRequestDTO } from '../dto/topic-edit-request.dto'
import topicRepo from '../repositories/topic.repository'

export default {
	register: async (req: Request, res: Response) => {
		const registerRequestDTO: TopicRegisterRequestDTO =
			new TopicRegisterRequestDTO()
		try {
			const status: String = await topicRepo.register(
				Object.assign(registerRequestDTO, req.body)
			)
			if (status == 'groupMissing') {
				res.status(409).send('Failed to create topic, missing group')
			} else if (status == 'success') {
				res.status(201).send('Topic created')
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
		}
	},
	editTopic: async (req: Request, res: Response) => {
		const editRequestDTO: TopicEditRequestDTO = new TopicEditRequestDTO()
		try {
			const status: String = await topicRepo.editTopic(
				Object.assign(editRequestDTO, req.body)
			)
			if (status == 'Topic not found') {
				res.status(409).send(status)
			} else if (status == 'Topic Edited') {
				res.status(201).send(status)
			}
		} catch (error: any) {
			console.log(error)
		}
	},
}
