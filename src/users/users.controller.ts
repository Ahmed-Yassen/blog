import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';
import ChangePassword from './dto/change-password.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Get('profile')
  getCurrentUser(@Req() request) {
    return request.user;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Patch('change-password')
  changePassword(@Body() body: ChangePassword, @Req() request) {
    return this.usersService.changePassword(
      body.currentPassword,
      body.newPassword,
      request.user,
    );
  }
}
