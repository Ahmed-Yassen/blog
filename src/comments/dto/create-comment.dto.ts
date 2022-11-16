import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumberString()
  postId: number;
}
