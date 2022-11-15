import { Body, Controller, HttpCode, Post, Req } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthenticationService } from './authentication.service';
import CreateUserDto from './dto/create-user.dto';
import SigninDto from './dto/sign-in.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('sign-up')
  async signup(@Body() body: CreateUserDto) {
    return this.authenticationService.signup(body);
  }

  @HttpCode(200)
  @Post('sign-in')
  async signin(@Req() request, @Body() body: SigninDto) {
    const user = await this.authenticationService.getAuthenticatedUser(
      body.email,
      body.password,
    );
    const cookie = this.authenticationService.getCookieWithJwtToken(user.id);
    request.res.setHeader('Set-Cookie', cookie);
    return user;
  }
}
