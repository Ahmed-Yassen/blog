import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';
import { AdminGuard } from 'src/guards/admin.guard';
import { CategoriesService } from './categories.service';
import CreateCategoryDto from './dto/create-category.dto';

@UseGuards(JwtAuthenticationGuard, AdminGuard)
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

  @Delete(':id')
  deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.deleteCategory(id);
  }
}
