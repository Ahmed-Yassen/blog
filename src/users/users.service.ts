import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CreateUserDto from 'src/authentication/dto/create-user.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import UserNotFoundException from './exception/userNotFoundException';
import User from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async create(userData: CreateUserDto) {
    const newUser = this.usersRepository.create(userData);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async getById(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (user) return user;

    throw new UserNotFoundException();
  }

  async getByEmail(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user) {
      return user;
    }
    throw new UserNotFoundException();
  }

  async changePassword(
    currentPassword: string,
    newPassword: string,
    user: User,
  ) {
    const correctCurrentPassword = await bcrypt.compare(
      currentPassword,
      user.password,
    );
    if (!correctCurrentPassword)
      throw new BadRequestException('incorrect current password');

    const newPasswordHashed = await bcrypt.hash(newPassword, 10);
    user.password = newPasswordHashed;
    await this.usersRepository.save(user);
  }
}
