import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';

import prisma from './client';

jest.mock('./client', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

const prismaMock = prisma;

beforeEach(() => {
  mockReset(prismaMock);
});

export default prismaMock as unknown as DeepMockProxy<PrismaClient>;
