import prismaMock from '../src/singleton';


interface CreateOrganization {
  name: string;
  location_id: number;
  created_by: number;
  created_at: Date;
  changed_by: number;
  updated_by: number;
}

export async function createOrganization(organization: CreateOrganization | any) {
  try {
    organization = await prismaMock.organizations.create({
      data: organization,
    });
    return organization;
  } catch (e) {
    throw new Error('Wrong data for creating an organization');
  }
}

export async function getAllOrganizations() {
  const organizations = await prismaMock.organizations.findMany();
  return organizations;
}

export async function getOrganizationById(id: number) {
  const organization = await prismaMock.organizations.findUnique({
    where: {
      id: id,
    },
  });
  if (organization) {
    return organization;
  } else {
    return null;
  }
}

interface UpdateOrganization {
  name: string;
  location_id: number;
  changed_by: number;
  updated_by: number;
  updated_at: Date;
}

export async function updateOrganization(
  id: number,
  organization: UpdateOrganization | any,
) {
  try {
    organization = await prismaMock.organizations.update({
      where: { id: id },
      data: organization,
    });
    return organization;
  } catch (e) {
    throw new Error('Organization does not exist');
  }
}

export async function deleteOrganization(id: number) {
  try {
    const organization = await prismaMock.organizations.delete({
      where: {
        id: id,
      },
    });
    return organization;
  } catch (e) {
    throw new Error('Organization does not exist');
  }
}
