import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostNotFoundException } from 'src/posts/exception/postNotFoundException';
import { PostsService } from 'src/posts/posts.service';
import User from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import CommentNotFoundException from './exception/commentNotFoundException';

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

  async updateComment(authorId: number, commentId: number, content: string) {
    const comment = await this.commentsRepository.findOne({
      where: { id: commentId, author: { id: authorId } },
    });
    if (!comment) throw new CommentNotFoundException();

    await this.commentsRepository.update(commentId, {
      content,
    });
    return this.commentsRepository.findOne({ where: { id: commentId } });
  }

  async deleteComment(id: number) {
    const deleteResult = await this.commentsRepository.delete(id);
    if (!deleteResult.affected) throw new CommentNotFoundException();
  }

  async deleteCommentAsUser(authorId: number, commentId: number) {
    const comment = await this.commentsRepository.findOne({
      where: { id: commentId, author: { id: authorId } },
    });
    if (!comment) throw new CommentNotFoundException();

    await this.commentsRepository.delete(commentId);
  }
}
