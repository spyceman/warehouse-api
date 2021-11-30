import { Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class OrganizationsService {
  constructor(private prisma: PrismaService) {}

  async createOrganization(organization: CreateOrganizationDto) {
    return this.prisma.organizations.create({
      data: {
        name: organization.name,
        location_id: organization.location_id,
        created_at: organization.created_at,
        created_by: organization.created_by,
        updated_at: organization.created_at,
        updated_by: organization.updated_by,
        changed_by: organization.changed_by,
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

  async updateOrganization(id: string, organization: CreateOrganizationDto) {
    return this.prisma.organizations.update({
      where: {
        id: Number(id),
      },
      data: {
        name: organization.name,
        location_id: organization.location_id,
        created_at: organization.created_at,
        created_by: organization.created_by,
        updated_at: organization.created_at,
        updated_by: organization.updated_by,
        changed_by: organization.changed_by,
      },
    });
  }

  async deleteOrganization(id: string) {
    return this.prisma.organizations.delete({ where: { id: Number(id) } });
  }
}
