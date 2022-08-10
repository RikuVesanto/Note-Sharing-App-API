import {
  BaseEntity,
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
} from 'typeorm'

@Entity('User')
export class User extends BaseEntity {
  @PrimaryColumn()
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

  @CreateDateColumn()
  created_at: Date
}
