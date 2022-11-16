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
import { CreatePostDto } from './dto/create-post.dto';
import updatePostDto from './dto/update-post.dto';
import { PostsService } from './posts.service';

@UseGuards(JwtAuthenticationGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsServic: PostsService) {}

  @Post()
  createPost(@Body() body: CreatePostDto, @Req() request) {
    return this.postsServic.createPost(body, request.user);
  }

  @Patch(':id')
  updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: updatePostDto,
    @Req() request,
  ) {
    return this.postsServic.updatePost(id, body, request.user);
  }
}
