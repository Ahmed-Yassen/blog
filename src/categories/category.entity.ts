import { Post } from 'src/posts/post.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToMany,
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

  @ManyToMany(() => Post, (post: Post) => post.categories, {
    cascade: true,
    eager: true,
  })
  public posts: Post[];
}
