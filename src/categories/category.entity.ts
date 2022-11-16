import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export default class Category {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  name: string;

  @BeforeInsert()
  toLowerCase() {
    this.name = this.name.toLowerCase();
  }
}
