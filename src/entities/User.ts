import {
	BaseEntity,
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	OneToMany,
	ManyToMany,
} from 'typeorm'
import { Group } from './Group'

@Entity('User')
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column({
		unique: true,
	})
	username: string

	@Column()
	password: string

	@Column({
		nullable: true,
	})
	name: string

	@Column({
		unique: true,
	})
	email: string

	@OneToMany(() => Group, (group) => group.user)
	creatorsGroups: Group[]

	@ManyToMany(() => Group)
	groups: Group[]

	@CreateDateColumn()
	created_at: Date
}
