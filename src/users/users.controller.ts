import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';
import { AdminGuard } from 'src/guards/admin.guard';
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

  @UseGuards(JwtAuthenticationGuard, AdminGuard)
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    if (id === 1) throw new BadRequestException('cannot delete admin');
    return this.usersService.deleteUser(id);
  }
}
