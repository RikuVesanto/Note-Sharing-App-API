import { Allow, IsDefined, IsNotEmpty, Length } from 'class-validator'
import { BaseDTO } from './base-dto'

export class GroupRegisterRequestDTO extends BaseDTO {
  @IsDefined()
  @IsNotEmpty()
  @Length(4, 48)
  name!: string

  @IsDefined()
  @IsNotEmpty()
  @Length(8, 256)
  password!: string

  @Length(0, 48)
  @Allow()
  class!: string

  @Length(0, 100)
  @Allow()
  description!: string

  @Allow()
  creatorId!: number
}
