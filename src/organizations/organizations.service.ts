import { Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { PrismaService } from '../prisma.service';
import { LoginUserDto } from '../auth/dto/login-user.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

@Injectable()
export class OrganizationsService {
  constructor(private prisma: PrismaService) {}

  async createOrganization(organization: CreateOrganizationDto, currentUser: LoginUserDto) {
    return this.prisma.organizations.create({
      data: {
        name: organization.name,
        location_id: organization.location_id,
        created_at: new Date(),
        created_by: currentUser.email,
        updated_at: new Date(),
        updated_by: currentUser.email,
        changed_by: currentUser.email,
      },
    });
  }

  async getAllOrganizations() {
    return this.prisma.organizations.findMany();
  }

  async getOrganizationById(id: string) {
    return this.prisma.organizations.findUnique({
      where: { id: Number(id) },
    });
  }

  async updateOrganization(id: string, organization: UpdateOrganizationDto, currentUser: LoginUserDto) {
    return this.prisma.organizations.update({
      where: {
        id: Number(id),
      },
      data: {
        name: organization.name,
        location_id: organization.location_id,
        updated_at: new Date(),
        updated_by: currentUser.email,
        changed_by: currentUser.email,
      },
    });
  }

  async deleteOrganization(id: string) {
    return this.prisma.organizations.delete({ where: { id: Number(id) } });
  }
}
