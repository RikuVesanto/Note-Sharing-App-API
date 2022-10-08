import argon2 from 'argon2'
import { Group } from '../entities/Group'
import { GroupRegisterRequestDTO } from '../dto/group-register-request.dto'
import validate from '../utils/validate-dto'
import { User } from '../entities/User'
import { appDataSource } from '../utils/app-data-source'
import { AddGroupsUserRequestDTO } from '../dto/add-groups-user-request.dto'

export default {
	register: async (request: GroupRegisterRequestDTO): Promise<String> => {
		await validate.validateRequest(request)
		if (!request.creatorId) {
			return 'userMissing'
		}
		const nameDuplicate = await appDataSource.manager.findOne(Group, {
			where: {
				name: request.name,
			},
		})
		if (nameDuplicate != null) {
			return 'duplicateName'
		}
		const group: Group = new Group()
		group.name = request.name
		if (request.password) {
			group.password = await argon2.hash(request.password)
		}
		const user: User = await appDataSource.manager.findOneOrFail(User, {
			where: {
				id: request.creatorId,
			},
		})
		group.user = user
		group.class = request.class ?? ''
		group.description = request.description ?? ''
		group.users = [user]
		await group.save()
		return 'success'
	},
	getGroupList: async (id: number): Promise<Group[]> => {
		const groupList = await appDataSource
			.getRepository(Group)
			.createQueryBuilder('group')
			.leftJoin('group.users', 'user')
			.where('user.id = :id', { id: id })
			.getMany()
		return groupList
	},
	getGroupSearchResult: async (search: string): Promise<Object> => {
		var response = await appDataSource
			.getRepository(Group)
			.createQueryBuilder('group')
			.where(`group.name LIKE '%${search}%'`)
			.getMany()
		return response
	},
	addUserConnection: async (
		request: AddGroupsUserRequestDTO
	): Promise<String> => {
		await validate.validateRequest(request)
		const usersGroups = await appDataSource
			.getRepository(Group)
			.createQueryBuilder('group')
			.leftJoin('group.users', 'user')
			.where('user.id = :id', { id: request.userId })
			.getMany()
		const group: Group = await appDataSource.manager.findOneOrFail(Group, {
			where: {
				id: parseInt(request.groupId),
			},
			relations: ['users', 'user'],
		})
		if (usersGroups.filter((g) => g.name == group.name).length > 0) {
			return 'alreadyInGroup'
		}
		const user: User = await appDataSource.manager.findOneOrFail(User, {
			where: {
				id: parseInt(request.userId),
			},
		})
		group.users = [...group.users, user]
		await group.save()
		return 'success'
	},
}
