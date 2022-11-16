import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsServic: PostsService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Post()
  createPost(@Body() body: CreatePostDto, @Req() request) {
    return this.postsServic.createPost(body, request.user);
  }
}
