import { IsDefined, IsNotEmpty } from 'class-validator'
import { BaseDTO } from './base-dto'

export class GroupAdminEditRequestDTO extends BaseDTO {
	@IsDefined()
	@IsNotEmpty()
	userId!: number

	@IsDefined()
	@IsNotEmpty()
	groupId!: number
}
