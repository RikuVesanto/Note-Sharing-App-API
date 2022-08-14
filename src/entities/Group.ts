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

  @Column()
  name: string

  @Column({
    nullable: true,
  })
  password: string

  @Column()
  private: boolean

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
  @CreateDateColumn()
  created_at: Date
}
