import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // register new user
  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
    //console.log(body);
    await this.usersService.createUser(body.email, body.password);
    return { message: 'User registered successfully' };
  }
}
