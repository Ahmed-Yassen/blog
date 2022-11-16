import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@UseGuards(JwtAuthenticationGuard)
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  createPost(@Body() body: CreateCommentDto, @Req() request) {
    return this.commentsService.createComment(
      request.user,
      body.postId,
      body.content,
    );
  }
}
