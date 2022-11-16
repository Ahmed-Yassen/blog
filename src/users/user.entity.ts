import { Exclude } from 'class-transformer';
import { Comment } from 'src/comments/comment.entity';
import { Post } from 'src/posts/post.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  @Exclude()
  public password: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'user'],
    default: 'user',
  })
  @Exclude()
  public role: string;

  @OneToMany(() => Post, (post: Post) => post.author, {
    cascade: true,
  })
  public posts: Post[];

  @OneToMany(() => Comment, (comment: Comment) => comment.author, {
    cascade: true,
  })
  public comments: Comment[];
}

export default User;
