import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class ChangePassword {
  @IsString()
  @IsNotEmpty()
  currentPassword: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  newPassword: string;
}

export default ChangePassword;
