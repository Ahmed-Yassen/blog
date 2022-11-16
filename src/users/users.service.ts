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

  //- create an admin account only if it doesn't exist
  async onModuleInit() {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    try {
      await this.getByEmail(email);
    } catch (error) {
      await this.create({
        email,
        password,
        firstName: 'Admin',
        lastName: 'Admin',
        role: 'admin',
      } as CreateUserDto);
    }
  }

  async create(userData: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;
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
