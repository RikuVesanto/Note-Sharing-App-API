import {
	BaseEntity,
	Entity,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	PrimaryGeneratedColumn,
	ManyToOne,
	JoinColumn,
} from 'typeorm'
import { Topic } from './Topic'

@Entity('Note')
export class Note extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	content: string

	@Column({
		nullable: true,
	})
	title: string

	@ManyToOne(() => Topic, (topic) => topic.notes)
	@JoinColumn({
		name: 'topicId',
	})
	topic: Topic

	@CreateDateColumn()
	created_at: Date

	@UpdateDateColumn()
	updated_at: Date
}
