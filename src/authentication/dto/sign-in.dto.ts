import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class SigninDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export default SigninDto;
