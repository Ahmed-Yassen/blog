import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostgresErrorCode } from 'src/database/postgresErrorCodes.enum';
import { Repository } from 'typeorm';
import Category from './category.entity';
import CategoryNotFoundException from './exception/categoryNotFoundException';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async createCategory(name: string) {
    try {
      let category = this.categoriesRepository.create({ name });
      category = await this.categoriesRepository.save(category);
      return category;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation)
        throw new BadRequestException('category with that name already exists');

      throw new InternalServerErrorException();
    }
  }

  async updateCategory(id: number, name: string) {
    try {
      const updateResult = await this.categoriesRepository.update(id, {
        name: name.toLowerCase(),
      });
      if (!updateResult.affected) throw new CategoryNotFoundException();
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation)
        throw new BadRequestException('category with that name already exists');

      throw error;
    }
  }

  async deleteCategory(id: number) {
    const deletedCategory = await this.categoriesRepository.delete(id);
    if (!deletedCategory.affected) throw new CategoryNotFoundException();
  }
}
