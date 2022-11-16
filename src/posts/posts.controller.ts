import {
  Body,
  Controller,
  Delete,
  Get,
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
  constructor(private readonly postsService: PostsService) {}

  @Post()
  createPost(@Body() body: CreatePostDto, @Req() request) {
    return this.postsService.createPost(body, request.user);
  }

  @Patch(':id')
  updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: updatePostDto,
    @Req() request,
  ) {
    return this.postsService.updatePost(id, body, request.user);
  }

  @Delete(':id')
  deletePost(@Param('id', ParseIntPipe) id: number, @Req() request) {
    if (request.user.role === 'admin')
      return this.postsService.deletePostAsAdmin(id);

    return this.postsService.deletePostAsUser(id, request.user);
  }

  @Get(':id')
  getPostById(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.getPostById(id);
  }

  @Get()
  getPosts(@Req() request) {
    return this.postsService.getUsersPosts(request.user.id);
  }

  @Get('user-id/:id')
  getSpecificUserPosts(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.getUsersPosts(id);
  }
}
