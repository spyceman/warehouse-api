import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { User as UserModel } from '@prisma/client';
import UserService from './user.service';

@Controller('auth')
export default class AppController {
  constructor(private readonly userService: UserService) {}

  @Post('registration')
  async signupUser(
    @Body() userData: { name?: string; email: string },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  // @Post('login')
  // async signinUser(
  //   @Body() userData: { name?: string; email: string },
  // ): Promise<UserModel> {
  //   return this.userService.createUser(userData);
  // }
}
