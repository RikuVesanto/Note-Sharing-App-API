import { Request, Response } from 'express'
import { GroupRegisterRequestDTO } from '../dto/group-register-request.dto'
import { GroupEditInfoRequest } from '../dto/group-edit-info-request.dto'
import groupRepo from '../repositories/group.repository'
import { AddGroupsUserRequestDTO } from '../dto/add-groups-user-request.dto'
import { GroupAdminEditRequestDTO } from '../dto/group-admin-edit-request.dto'

export default {
	register: async (req: Request, res: Response) => {
		const registerRequestDTO: GroupRegisterRequestDTO =
			new GroupRegisterRequestDTO()
		try {
			let status: String = await groupRepo.register(
				Object.assign(registerRequestDTO, req.body)
			)
			if (status == 'duplicateName') {
				res.status(409).send('This group name is already in use')
			} else if (status == 'userMissing') {
				res.status(422).send('Failed to create group, missing creator')
			} else if (status == 'success') {
				res.status(201).send('Group was created')
			}
		} catch (error: any) {
			console.log(error)
		}
	},
	getGroupList: async (req: Request, res: Response) => {
		try {
			const groupList = await groupRepo.getGroupList(
				parseInt(req.params.id)
			)
			res.status(200).send(groupList)
		} catch (error: any) {
			console.log(error)
		}
	},
	getGroupSearchResult: async (req: Request, res: Response) => {
		try {
			const groupSearchResult = await groupRepo.getGroupSearchResult(
				req.params.search
			)
			res.status(200).send(groupSearchResult)
		} catch (error: any) {
			console.log(error)
		}
	},
	addUserConnection: async (req: Request, res: Response) => {
		const addGroupsUserRequestDTO: AddGroupsUserRequestDTO =
			new AddGroupsUserRequestDTO()
		try {
			const result: String = await groupRepo.addUserConnection(
				Object.assign(addGroupsUserRequestDTO, req.body)
			)
			if (result == 'alreadyInGroup') {
				res.status(409).send('Could not join already in a group')
			} else if (result == 'success') {
				res.status(201).send('Joined group')
			}
		} catch (error: any) {
			console.log(error)
		}
	},
	deleteUserConnection: async (req: Request, res: Response) => {
		try {
			const result: String = await groupRepo.deleteUserConnection(
				parseInt(req.params.groupId),
				parseInt(req.params.userId)
			)
			if (result == 'Group not found') {
				res.status(409).send(result)
			} else if (result == 'Not in group') {
				res.status(409).send(result)
			} else if (result == 'Left Group') {
				res.status(200).send(result)
			}
		} catch (error: any) {
			console.log(error)
		}
	},
	editGroup: async (req: Request, res: Response) => {
		const registerRequestDTO: GroupEditInfoRequest =
			new GroupEditInfoRequest()
		try {
			let status: String = await groupRepo.editGroup(
				Object.assign(registerRequestDTO, req.body)
			)
			if (status == 'Group not found') {
				res.status(409).send(status)
			} else if (status == 'This group name is already in use') {
				res.status(409).send(status)
			} else if (status == 'Group information changed') {
				res.status(200).send(status)
			}
		} catch (error: any) {
			console.log(error)
		}
	},
	getCreator: async (req: Request, res: Response) => {
		try {
			const creatorStatus: Boolean = await groupRepo.isGroupCreator(
				parseInt(req.params.groupId),
				parseInt(req.params.userId)
			)
			res.status(200).send(creatorStatus)
		} catch (error: any) {
			console.log(error)
		}
	},
	getUserList: async (req: Request, res: Response) => {
		try {
			const userList = await groupRepo.getUserList(
				parseInt(req.params.id)
			)
			res.status(200).send(userList)
		} catch (error: any) {
			console.log(error)
		}
	},
	editCreator: async (req: Request, res: Response) => {
		const groupAdminEditRequestDTO: GroupAdminEditRequestDTO =
			new GroupAdminEditRequestDTO()
		try {
			let status: String = await groupRepo.editCreator(
				Object.assign(groupAdminEditRequestDTO, req.body)
			)
			if (status == 'Group not found') {
				res.status(409).send(status)
			} else if (status == 'Admin changed') {
				res.status(200).send(status)
			}
		} catch (error: any) {
			console.log(error)
		}
	},
}
