import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostNotFoundException } from 'src/posts/exception/postNotFoundException';
import { PostsService } from 'src/posts/posts.service';
import User from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
    private readonly postsService: PostsService,
  ) {}

  async createComment(author: User, postId: number, content: string) {
    const post = await this.postsService.getPostById(postId);
    if (!post) throw new PostNotFoundException();

    const comment = this.commentsRepository.create({ author, post, content });
    return this.commentsRepository.save(comment);
  }
}
