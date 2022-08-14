import {
  BaseEntity,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { Note } from './Note'
import { Group } from './Group'

@Entity('Topic')
export class Topic extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @OneToMany(() => Note, (note) => note.topic)
  notes: Note[]

  @ManyToOne(() => Group, (group) => group.topics)
  @JoinColumn({
    name: 'groupId',
  })
  group: Group

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
