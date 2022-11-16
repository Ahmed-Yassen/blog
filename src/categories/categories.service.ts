import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostgresErrorCode } from 'src/database/postgresErrorCodes.enum';
import { Repository } from 'typeorm';
import Category from './category.entity';

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
}
