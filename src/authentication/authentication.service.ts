import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import CreateUserDto from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { PostgresErrorCode } from 'src/database/postgresErrorCodes.enum';

@Injectable()
export class AuthenticationService {
  constructor(private readonly usersService: UsersService) {}

  public async signup(body: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(body.password, 10);

    try {
      const createdUser = await this.usersService.create({
        ...body,
        password: hashedPassword,
      });
      return createdUser;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation)
        throw new BadRequestException('user with that email already exists');

      throw new InternalServerErrorException();
    }
  }
}
