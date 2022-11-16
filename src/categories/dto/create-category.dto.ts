import { IsString } from 'class-validator';

export default class CreateCategoryDto {
  @IsString()
  name: string;
}
