import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  private async validateUser(dto: LoginUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (user) {
      const isPasswordMatching = await bcrypt.compare(
        dto.encrypted_password,
        user.encrypted_password,
      );
      if (user && isPasswordMatching) {
        return user;
      }
    }
    throw new UnauthorizedException({ message: 'Wrong credentials provided' });
  }

  async login(dto: LoginUserDto) {
    const user = await this.validateUser(dto);
    return this.generateToken(user);
  }

  async registration(dto: CreateUserDto) {
    const check = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!check) {
      dto.encrypted_password = await bcrypt.hash(dto.encrypted_password, 10);
      this.prisma.user.create({
        data: {
          email: dto.email,
          encrypted_password: dto.encrypted_password,
          organization_id: dto.organization_id,
          created_at: new Date(),
          updated_at: new Date(),
        },
      });
      return this.generateToken(dto);
    } else {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
  }

  private async generateToken(user: LoginUserDto) {
    const payload = {
      email: user.email,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
