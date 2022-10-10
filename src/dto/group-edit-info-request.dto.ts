import { Allow, IsDefined, IsNotEmpty, Length } from 'class-validator'
import { BaseDTO } from './base-dto'

export class GroupEditInfoRequest extends BaseDTO {
	@IsDefined()
	@IsNotEmpty()
	@Length(4, 48)
	name!: string

	@Length(0, 100)
	@Allow()
	description!: string

	@IsDefined()
	@IsNotEmpty()
	groupId!: number
}
