import { appDataSource } from '../utils/app-data-source'
import { Topic } from '../entities/Topic'
import { Group } from '../entities/Group'
import { TopicRegisterRequestDTO } from '../dto/topic-register-request.dto'
import { TopicEditRequestDTO } from '../dto/topic-edit-request.dto'
import validate from '../utils/validate-dto'

export default {
	register: async (request: TopicRegisterRequestDTO): Promise<String> => {
		await validate.validateRequest(request)
		if (!request.groupId) {
			return 'groupMissing'
		}
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
		return 'success'
	},
	getTopicList: async (id: string): Promise<Topic[]> => {
		var response: Topic[] = await appDataSource
			.getRepository(Topic)
			.createQueryBuilder('topic')
			.where(`topic.groupId = ${id}`)
			.getMany()
		return response
	},
	editTopic: async (request: TopicEditRequestDTO): Promise<String> => {
		await validate.validateRequest(request)
		let topic: Topic
		try {
			topic = await appDataSource.manager.findOneOrFail(Topic, {
				where: {
					id: request.id,
				},
			})
		} catch (err) {
			return 'Topic not found'
		}
		topic.topic = request.topic
		topic.description = request.description ?? ''
		await topic.save()
		return 'Topic Edited'
	},
}
