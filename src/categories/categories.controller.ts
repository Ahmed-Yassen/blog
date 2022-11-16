import { Body, Controller, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import CreateCategoryDto from './dto/create-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  createCategory(@Body() body: CreateCategoryDto) {
    return this.categoriesService.createCategory(body.name);
  }
}
