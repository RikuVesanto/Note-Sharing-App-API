import { Allow, IsDefined, IsNotEmpty, Length } from 'class-validator'
import { BaseDTO } from './base-dto'

export class TopicEditRequestDTO extends BaseDTO {
	@IsDefined()
	@IsNotEmpty()
	@Length(1, 48)
	topic!: string

	@Length(0, 100)
	@Allow()
	description!: string

	@IsDefined()
	@IsNotEmpty()
	id!: number
}
