import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import CategoryNotFoundException from 'src/categories/exception/categoryNotFoundException';
import User from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly postsRepository: Repository<Post>,
    private readonly categoriesService: CategoriesService,
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
}
