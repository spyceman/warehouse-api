import {
  createOrganization,
  getAllOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganization,
} from '../src/functions-without-context';
import prismaMock from '../src/singleton';

describe('OrganizationsService', () => {
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
      prismaMock.organizations.findUnique.mockResolvedValue(organization);
      await expect(getOrganizationById(1)).resolves.toEqual(organization);
    });

    it('should return nothing', async () => {
      prismaMock.organizations.findUnique.mockResolvedValue(null);
      await expect(getOrganizationById(0)).resolves.toEqual(null);
    });

    it('should return nothing', async () => {
      prismaMock.organizations.findUnique.mockResolvedValue(null);
      await expect(getOrganizationById(333)).resolves.toEqual(null);
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
      prismaMock.organizations.findMany.mockResolvedValue(organizations);
      await expect(getAllOrganizations()).resolves.toEqual(organizations);
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
      prismaMock.organizations.create.mockResolvedValue(organization);
      await expect(createOrganization(organization)).resolves.toEqual(
        organization,
      );
    });

    it('should fail if data is incorrect', async () => {
      const organization = {
      };
      prismaMock.organizations.create.mockRejectedValue(new Error('Wrong data for creating an organization'));
      await expect(createOrganization(organization)).rejects.toEqual(
        new Error('Wrong data for creating an organization'),
      );
    });
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
      prismaMock.organizations.delete.mockResolvedValue(organization);
      await expect(deleteOrganization(12)).resolves.toEqual(organization);
    });

    it('should fail if organization does not exist', async () => {
      prismaMock.organizations.delete.mockRejectedValue(new Error('Organization does not exist'));
      await expect(deleteOrganization(-1)).rejects.toEqual(new Error('Organization does not exist'));
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
      prismaMock.organizations.update.mockResolvedValue(organization);
      await expect(
        updateOrganization(organization.id, organization),
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
      prismaMock.organizations.update.mockRejectedValue(new Error('Organization does not exist'));
      await expect(
        updateOrganization(-1, organization),
      ).rejects.toEqual(new Error('Organization does not exist'));
    });
  });
});
