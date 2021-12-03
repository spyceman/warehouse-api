import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../src/prisma.service';
import { OrganizationsService } from '../src/organizations/organizations.service';
import {
  createOrganization,
  getAllOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganization,
} from '../src/functions-without-context';
import prismaMock from '../src/singleton';

describe('OrganizationsService', () => {
  let service: OrganizationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaService],
      providers: [OrganizationsService, PrismaService],
    }).compile();

    service = module.get<OrganizationsService>(OrganizationsService);
  });

  describe('getOrganization', () => {
    it('should return organization', async () => {
      const organization = await service.getOrganizationById(1);
      await expect(getOrganizationById(1)).resolves.toEqual(organization);
    });

    it('should return nothing', async () => {
      await expect(getOrganizationById(0)).resolves.toEqual(null);
    });

    it('should return nothing', async () => {
      await expect(getOrganizationById(333)).resolves.toEqual(null);
    });
  });

  describe('getOrganzations', () => {
    it('should return array of organizations', async () => {
      const organizations = await service.getAllOrganizations();
      await expect(getAllOrganizations()).resolves.toEqual(organizations);
    });
  });

  describe('createOrganization', () => {
    it('should return new organization', async () => {
      const organization = {
        id: 11,
        location_id: 1,
        name: 'Google',
        created_at: new Date(1),
        created_by: 1,
        updated_by: 1,
        changed_by: 1,
        updated_at: new Date(1),
      };
      prismaMock.organizations.create.mockResolvedValue(organization);
      await expect(createOrganization(organization)).resolves.toEqual(organization);
    });
  });

  describe('deleteOrganization', () => {
    it('should return deleted organization', async () => {
      const organization = await service.getOrganizationById(10); 
      await expect(deleteOrganization(10)).resolves.toEqual(organization);
    });
  });

  describe('updateOrganization', () => {
    it('should return object', async () => {
      const organization = {
        id: 1,
        location_id: 2,
        name: 'Google',
        created_at: new Date(2),
        created_by: 2,
        updated_by: 2,
        changed_by: 2,
        updated_at: new Date(2),
      };
      prismaMock.organizations.update.mockResolvedValue(organization);
      await expect(updateOrganization(organization.id, organization)).resolves.toEqual(organization);
    });
  });
});
