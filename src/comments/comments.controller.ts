import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

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

  @Patch(':id')
  updatePost(
    @Body() body: UpdateCommentDto,
    @Param('id', ParseIntPipe) id: number,
    @Req() request,
  ) {
    return this.commentsService.updateComment(
      request.user.id,
      id,
      body.content,
    );
  }
}
