import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../src/prisma.service';
import { OrganizationsService } from '../src/organizations/organizations.service';

describe('OrganizationsService', () => {
  let service: OrganizationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaService],
      providers: [OrganizationsService, PrismaService],
    }).compile();

    service = module.get<OrganizationsService>(OrganizationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // describe('getOrganization', () => {
  //   it('should be defined', () => {
  //     expect(service.getOrganizationById).toBeDefined();
  //   });
  //   it('should return object', () => {
  //     expect(service.getOrganizationById('')).toEqual([]);
  //   });
  // });

  // describe('getOrganzations', () => {
  //   it('should be defined', () => {
  //     expect(service.getAllOrganizations).toBeDefined();
  //   });
  //   it('should return object', () => {
  //     expect(service.getAllOrganizations()).toEqual('');
  //   });
  // });

  // describe('createOrganization', () => {
  //   it('should be defined', () => {
  //     expect(service.createOrganization).toBeDefined();
  //   });
  //   it('should return object', () => {
  //     expect(service.createOrganization({}, 1)).toEqual('');
  //   });
  // });

  // describe('deleteOrganization', () => {
  //   it('should be defined', () => {
  //     expect(service.deleteOrganization).toBeDefined();
  //   });
  //   it('should return object', () => {
  //     expect(service.deleteOrganization('')).toEqual('');
  //   });
  // });

  // describe('updateOrganization', () => {
  //   it('should be defined', () => {
  //     expect(service.updateOrganization).toBeDefined();
  //   });
  //   it('should return object', () => {
  //     expect(service.updateOrganization('', {}, '')).toEqual('');
  //   });
  // });
});
