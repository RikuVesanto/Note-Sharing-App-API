import argon2 from 'argon2'
import { Group } from '../entities/Group'
import { GroupRegisterRequestDTO } from '../dto/group-register-request.dto'
import { GroupEditInfoRequest } from '../dto/group-edit-info-request.dto'
import { AddGroupsUserRequestDTO } from '../dto/add-groups-user-request.dto'
import validate from '../utils/validate-dto'
import { User } from '../entities/User'
import { appDataSource } from '../utils/app-data-source'

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
	deleteUserConnection: async (
		groupId: number,
		userId: number
	): Promise<String> => {
		const usersGroups = await appDataSource
			.getRepository(Group)
			.createQueryBuilder('group')
			.leftJoin('group.users', 'user')
			.where('user.id = :id', { id: userId })
			.getMany()
		let group: Group
		try {
			group = await appDataSource.manager.findOneOrFail(Group, {
				where: {
					id: groupId,
				},
				relations: ['users', 'user'],
			})
		} catch (err) {
			return 'Group not found'
		}
		if (usersGroups.filter((g) => g.name == group.name).length != 1) {
			return 'Not in Group'
		}
		console.log(group.users)
		group.users = group.users.filter((u) => u.id != userId)
		console.log(group.users)
		await group.save()
		return 'Left Group'
	},
	editGroup: async (request: GroupEditInfoRequest): Promise<String> => {
		await validate.validateRequest(request)
		const nameDuplicate = await appDataSource.manager.findOne(Group, {
			where: {
				name: request.name,
			},
		})
		if (nameDuplicate != null && nameDuplicate.id != request.groupId) {
			return 'This group name is already in use'
		}
		let group: Group
		try {
			group = await appDataSource.manager.findOneOrFail(Group, {
				where: {
					id: request.groupId,
				},
			})
		} catch (err) {
			return 'Group not found'
		}
		group.name = request.name
		group.description = request.description ?? ''
		await group.save()
		return 'Group information changed'
	},
	isGroupCreator: async (
		groupId: number,
		userId: number
	): Promise<Boolean> => {
		const creator = await appDataSource.getRepository(Group).findOne({
			where: {
				id: groupId,
				user: { id: userId },
			},
			relations: {
				user: true,
			},
		})
		if (creator != null) {
			return true
		} else {
			return false
		}
	},
	getUserList: async (id: number): Promise<User[]> => {
		const group = await appDataSource.getRepository(Group).findOneOrFail({
			relations: ['users'],
			where: { id: id },
		})
		console.log(group.users)
		return group.users
	},
}
