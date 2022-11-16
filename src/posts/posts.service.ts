import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import UserNotFoundException from 'src/users/exception/userNotFoundException';
import User from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { PostNotFoundException } from './exception/postNotFoundException';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly postsRepository: Repository<Post>,
    private readonly categoriesService: CategoriesService,
    private readonly usersService: UsersService,
  ) {}

  async createPost(postAttrs: CreatePostDto, author: User) {
    const categories = (await this.categoriesService.getAllCategories()).map(
      (category) => category.id,
    );
    postAttrs.categories.forEach((category) => {
      const categoryId = category['id'];
      if (!categories.includes(+categoryId))
        throw new NotFoundException(
          `category with id ${categoryId} was not found`,
        );
    });
    const post = this.postsRepository.create({ ...postAttrs, author });
    return this.postsRepository.save(post);
  }

  async updatePost(postId: number, postAttrs: Partial<Post>, author: User) {
    const post = await this.postsRepository.findOne({
      where: { author: { id: author.id }, id: postId },
    });
    if (!post) throw new PostNotFoundException();

    await this.postsRepository.update(postId, postAttrs);
    return this.postsRepository.findOne({
      where: { author: { id: author.id }, id: postId },
    });
  }

  async deletePostAsAdmin(id: number) {
    const deletedPost = await this.postsRepository.delete(id);
    if (!deletedPost.affected) throw new PostNotFoundException();
  }

  async deletePostAsUser(id: number, author: User) {
    const post = await this.postsRepository.findOne({
      where: { author: { id: author.id }, id },
    });
    if (!post) throw new PostNotFoundException();
    await this.postsRepository.delete(id);
  }

  async getPostById(id: number) {
    const post = await this.postsRepository.findOne({ where: { id } });
    if (!post) throw new PostNotFoundException();

    return post;
  }

  async getUsersPosts(userId: number) {
    const user = await this.usersService.getById(userId);
    if (!user) throw new UserNotFoundException();
    return this.postsRepository.find({ where: { author: { id: userId } } });
  }
}
