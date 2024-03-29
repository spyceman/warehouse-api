import { Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { PrismaService } from '../prisma.service';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

@Injectable()
export class OrganizationsService {
  constructor(private prisma: PrismaService) {}

  async createOrganization(organization: CreateOrganizationDto, userId: number) {
    return this.prisma.organizations.create({
      data: {
        name: organization.name,
        location_id: organization.location_id,
        created_at: new Date(),
        created_by: userId,
        updated_at: new Date(),
        updated_by: userId,
        changed_by: userId,
      },
    });
  }

  async getAllOrganizations() {
    return this.prisma.organizations.findMany();
  }

  async getOrganizationById(id: number) {
    return this.prisma.organizations.findUnique({
      where: { id: id },
    });
  }

  async updateOrganization(id: number, organization: UpdateOrganizationDto, userId: number) {
    return this.prisma.organizations.update({
      where: {
        id: id,
      },
      data: {
        name: organization.name,
        location_id: organization.location_id,
        updated_at: new Date(),
        updated_by: userId,
        changed_by: userId,
      },
    });
  }

  async deleteOrganization(id: number) {
    return this.prisma.organizations.delete({ where: { id: id } });
  }
}
