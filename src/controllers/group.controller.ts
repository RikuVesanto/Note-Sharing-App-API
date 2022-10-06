import { Request, Response } from 'express'
import { GroupRegisterRequestDTO } from '../dto/group-register-request.dto'
import groupRepo from '../repositories/group.repository'
import { AddGroupsUserRequestDTO } from '../dto/add-groups-user-request.dto'

export default {
	register: async (req: Request, res: Response) => {
		const registerRequestDTO: GroupRegisterRequestDTO =
			new GroupRegisterRequestDTO()
		try {
			let status = await groupRepo.register(
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
			const groupList = await groupRepo.getGroupList(req.params.id)
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
			await groupRepo.addUserConnection(
				Object.assign(addGroupsUserRequestDTO, req.body)
			)
			res.sendStatus(201)
		} catch (error: any) {
			console.log(error)
		}
	},
}
