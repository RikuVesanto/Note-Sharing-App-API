import {
	BaseEntity,
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	ManyToOne,
	JoinColumn,
	OneToMany,
	ManyToMany,
	JoinTable,
} from 'typeorm'
import { User } from './User'
import { Topic } from './Topic'

@Entity('Group')
export class Group extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column({
		unique: true,
	})
	name: string

	@Column({
		nullable: true,
	})
	class: string

	@Column({
		nullable: true,
	})
	description: string

	@Column({
		nullable: true,
	})
	password: string

	@ManyToOne(() => User, (user) => user.groups)
	@JoinColumn({
		name: 'creatorId',
	})
	user: User

	@OneToMany(() => Topic, (topic) => topic.group)
	topics: Topic[]

	@ManyToMany(() => User)
	@JoinTable({
		name: 'groups_users',
		joinColumn: {
			name: 'group',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'user',
			referencedColumnName: 'id',
		},
	})
	users: User[]
	@CreateDateColumn()
	created_at: Date
}
