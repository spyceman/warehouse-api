// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

// export async function main() {
//   await prisma.organizations.create({
//     data: {
//       name: 'a',
//       location_id: 1,
//       created_at: new Date(),
//       updated_at: new Date(),
//     },
//   });

//   await prisma.user.create({
//     data: {
//       email: 'example@gmail.com',
//       encrypted_password: 'abc',
//       organization_id: 0,
//       created_at: new Date(),
//       updated_at: new Date(),
//     },
//   });

//   await prisma.user.create({
//     data: {
//       email: 'abc@yandex.ru',
//       encrypted_password: '1337',
//       organization_id: 0,
//       created_at: new Date(),
//       updated_at: new Date(),
//     },
//   });
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
