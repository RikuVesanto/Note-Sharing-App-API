import {
  BaseEntity,
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { Note } from './Note'
import { User } from './User'

@Entity('NoteEdit')
export class NoteEdit extends BaseEntity {
  @PrimaryColumn()
  id: number

  @ManyToOne(() => User, (user) => user.noteEdits)
  @JoinColumn({
    name: 'userId',
  })
  user: User

  @ManyToOne(() => Note, (note) => note.noteEdits)
  @JoinColumn({
    name: 'noteId',
  })
  note: Note

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
