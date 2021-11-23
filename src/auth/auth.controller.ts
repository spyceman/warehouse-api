import {
  Body,
  Controller,
  Post,
  Delete,
  Param,
  Get,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserService } from './user.service';

@ApiTags('Authentification')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: 'Logging in with login and password' })
  @ApiResponse({ status: 200, type: LoginUserDto })
  @Post('login')
  login(@Body() user: LoginUserDto) {
    return this.authService.login(user);
  }

  @ApiOperation({ summary: 'Registration with login and password' })
  @ApiResponse({ status: 201, type: CreateUserDto })
  @Post('registration')
  registration(@Body() user: CreateUserDto) {
    return this.authService.registration(user);
  }

  @ApiOperation({ summary: 'Getting user by id' })
  @ApiResponse({ status: 200 })
  @Get('users/:id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @ApiOperation({ summary: 'Getting all users' })
  @ApiResponse({ status: 200 })
  @Get('users')
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'Updating user by id' })
  @ApiResponse({ status: 202 })
  @Put('users/:id')
  updateUser(@Param('id') id: string, @Body() user: CreateUserDto) {
    return this.userService.updateUser(id, user);
  }

  @ApiOperation({ summary: 'Deleting user by id' })
  @ApiResponse({ status: 203 })
  @Delete('users/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
