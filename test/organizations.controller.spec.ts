import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../src/prisma.service';
import { OrganizationsController } from '../src/organizations/organizations.controller';
import { OrganizationsService } from '../src/organizations/organizations.service';

describe('OrganizationsController', () => {
  let service: OrganizationsService;
  let controller: OrganizationsController;

  beforeEach(async () => {
    service = new OrganizationsService(new PrismaService());
    controller = new OrganizationsController(service);

    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaService],
      controllers: [OrganizationsController],
      providers: [PrismaService, OrganizationsService],
    }).compile();

    service = module.get<OrganizationsService>(OrganizationsService);
    controller = module.get<OrganizationsController>(OrganizationsController);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('getOrganization', () => {
    it('should return organization', async () => {
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
      jest.spyOn(service, 'getOrganizationById').mockImplementation(() => new Promise(resolve => resolve(organization)));
      await expect(controller.getOrganizationById(1)).resolves.toEqual(
        organization,
      );
    });

    it('should return nothing', async () => {
      jest.spyOn(service, 'getOrganizationById').mockImplementation(() => new Promise(resolve => resolve(null)));
      await expect(controller.getOrganizationById(0)).resolves.toEqual(null);
    });

    it('should return nothing', async () => {
      jest.spyOn(service, 'getOrganizationById').mockImplementation(() => new Promise(resolve => resolve(null)));
      await expect(controller.getOrganizationById(333)).resolves.toEqual(null);
    });
  });

  describe('getOrganzations', () => {
    it('should return array of organizations', async () => {
      const organizations = [
        {
          id: 12,
          location_id: 1,
          name: 'Google',
          created_at: new Date(1),
          created_by: 1,
          updated_by: 1,
          changed_by: 1,
          updated_at: new Date(1),
        },
        {
          id: 2,
          location_id: 2,
          name: 'Microsoft',
          created_at: new Date(1),
          created_by: 1,
          updated_by: 1,
          changed_by: 1,
          updated_at: new Date(1),
        },
      ];
      jest.spyOn(service, 'getAllOrganizations').mockImplementation(() => new Promise(resolve => resolve(organizations)));
      await expect(controller.getAllOrganizations()).resolves.toEqual(
        organizations,
      );
    });
  });

  describe('createOrganization', () => {
    it('should return new organization', async () => {
      const organization = {
        id: 12,
        location_id: 1,
        name: 'Google',
        created_at: new Date(1),
        created_by: 1,
        updated_by: 1,
        changed_by: 1,
        updated_at: new Date(1),
      };
      jest.spyOn(service, 'createOrganization').mockImplementation(() => new Promise(resolve => resolve(organization)));
      await expect(
        controller.createOrganization(organization, 2),
      ).resolves.toEqual(organization);
    });

    describe('deleteOrganization', () => {
      it('should return deleted organization', async () => {
        const organization = {
          id: 12,
          location_id: 1,
          name: 'Google',
          created_at: new Date(1),
          created_by: 1,
          updated_by: 1,
          changed_by: 1,
          updated_at: new Date(1),
        };
        jest.spyOn(service, 'deleteOrganization').mockImplementation(() => new Promise(resolve => resolve(organization)));
        await expect(controller.deleteOrganization(12)).resolves.toEqual(
          organization,
        );
      });

      it('should fail if organization does not exist', async () => {
        jest.spyOn(service, 'deleteOrganization').mockImplementation(() => new Promise((resolve, reject) => reject(new Error('Organization does not exist'))));
        await expect(controller.deleteOrganization(-1)).rejects.toEqual(
          new Error('Organization does not exist'),
        );
      });
    });

    describe('updateOrganization', () => {
      it('should return updated organization', async () => {
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
        jest.spyOn(service, 'updateOrganization').mockImplementation(() => new Promise((resolve) => resolve(organization)));
        await expect(
          controller.updateOrganization(organization.id, organization, 5),
        ).resolves.toEqual(organization);
      });

      it('should fail if id is incorrect', async () => {
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
        jest.spyOn(service, 'updateOrganization').mockImplementation(() => new Promise((resolve, reject) => reject(new Error('Organization does not exist'))));
        await expect(
          controller.updateOrganization(-1, organization, 5),
        ).rejects.toEqual(new Error('Organization does not exist'));
      });
    });
  });
});
