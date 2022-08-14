import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm'
import { NoteEdit } from './NoteEdit'
import { Group } from './Group'

@Entity('User')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  password: string

  @Column({
    nullable: true,
  })
  school: string

  @Column()
  age: number

  @Column({
    unique: true,
  })
  email: string

  @OneToMany(() => NoteEdit, (noteEdit) => noteEdit.user)
  noteEdits: NoteEdit[]

  @OneToMany(() => Group, (group) => group.user)
  creatorsGroups: Group[]

  @ManyToMany(() => Group)
  groups: Group[]

  @CreateDateColumn()
  created_at: Date
}
