import { Allow, IsDefined, IsNotEmpty, Length } from 'class-validator'
import { BaseDTO } from './base-dto'

export class GroupRegisterRequestDTO extends BaseDTO {
	@IsDefined()
	@IsNotEmpty()
	@Length(4, 48)
	name!: string

	@Length(8, 256)
	@Allow()
	password!: string

	@Length(0, 100)
	@Allow()
	description!: string

	@Allow()
	creatorId!: number
}
