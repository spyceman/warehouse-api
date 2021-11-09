import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
  } from '@nestjs/common';
  import { UserService } from './user.service';
  import { User as UserModel } from '@prisma/client';
  
  @Controller('auth')
  export class AppController {
    constructor(
      private readonly userService: UserService,
    ) {}
  
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