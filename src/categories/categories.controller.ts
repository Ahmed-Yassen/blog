import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import CreateCategoryDto from './dto/create-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  createCategory(@Body() body: CreateCategoryDto) {
    return this.categoriesService.createCategory(body.name);
  }

  @Patch(':id')
  updateCategory(
    @Body() body: CreateCategoryDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.categoriesService.updateCategory(id, body.name);
  }
}
