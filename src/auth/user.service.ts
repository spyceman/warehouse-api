import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async deleteUser(id: string) {
    return this.prisma.user.delete({ where: { id: Number(id) } });
  }

  async updateUser(id: string, user: CreateUserDto) {
    return this.prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        email: user.email,
        organization_id: user.organization_id,
      },
    });
  }

  async getAllUsers() {
    return this.prisma.user.findMany();
  }

  async getUserById(id: string) {
    return this.prisma.user.findUnique({
      where: { id: Number(id) },
    });
  }

}