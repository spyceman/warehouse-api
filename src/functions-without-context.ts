import prisma from './client';

interface CreateOrganization {
  name: string;
  location_id: number;
  created_by: number;
  created_at: Date;
  changed_by: number;
  updated_by: number;
}

export async function createOrganization(
  organization: CreateOrganization,
) {
  organization = await prisma.organizations.create({
    data: organization,
  });
  return organization;
}

export async function getAllOrganizations() {
  const organizations = await prisma.organizations.findMany();
  return organizations;
}

export async function getOrganizationById(id: number) {
  const organization = await prisma.organizations.findUnique({
    where: {
      id: id,
    },
  });
  return organization;
}

interface UpdateOrganization {
  name: string;
  location_id: number;
  changed_by: number;
  updated_by: number;
  updated_at: Date
}

export async function updateOrganization(
  id: number,
  organization: UpdateOrganization,
) {
  organization = await prisma.organizations.update({
    where: { id: id },
    data: organization,
  });
  return organization;
}

export async function deleteOrganization(id: number) {
  const organization = await prisma.organizations.delete({
    where: {
      id: id,
    },
  });
  return organization;
}
