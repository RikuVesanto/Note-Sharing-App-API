import {IsDefined, IsNotEmpty } from 'class-validator'
import { BaseDTO } from './base-dto'

export class AddGroupsUserRequestDTO extends BaseDTO {
  @IsNotEmpty()
  @IsDefined()
  userId!: string

  @IsNotEmpty()
  @IsDefined()
  groupId!: string
}
