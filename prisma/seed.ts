import { PrismaClient, Role } from '@prisma/client';
import * as faker from 'faker';
const prisma = new PrismaClient();

export async function main() {
  const mainOrganization = await prisma.organizations.create({
    data: {
      name: 'mainOrganization',
      location_id: 1,
    },
  });

  const organizations = [mainOrganization];
  const priceLists = [];
  const warehouses = [];
  const priceListItems = [];
  const warehouseOperations = [];

  const users = [
    await prisma.user.create({
      data: {
        email: 'admin@gmail.com',
        encrypted_password: '123',
        organization_id: mainOrganization.id,
        role: Role.admin,
      },
    }),
    await prisma.user.create({
      data: {
        email: 'superAdmin@gmail.com',
        encrypted_password: '123',
        organization_id: mainOrganization.id,
        role: Role.super_admin,
      },
    }),
  ];

  for (let i = 0; i < 5; i++) {
    organizations.push(
      await prisma.organizations.create({
        data: {
          name: faker.company.companyName(),
          location_id: faker.datatype.number(),
        },
      }),
    );
    
    let numberOfUsers = faker.datatype.number(20) + 1;    
    for (let j = 0; j < numberOfUsers; j++) {
      users.push(
        await prisma.user.create({
          data: {
            email: faker.internet.email(),
            encrypted_password: faker.internet.password(),
            organization_id: organizations[i].id,
          },
        }),
      );
    }

    let numberOfPriceLists = faker.datatype.number(10) + 1;    
    for (let n = 0; n < numberOfPriceLists; n++) {
      priceLists.push(
        await prisma.price_lists.create({
          data: {
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            organization_id: organizations[i].id,
          },
        }),
      );
      await prisma.price_list_settings.create({
        data: {
          price_list_id: priceLists[n].id,
        },
      });

      let numberOfPriceListItems = faker.datatype.number(50) + 1;      
      for (let m = 0; m < numberOfPriceListItems; m++) {
        priceListItems.push(
          await prisma.price_list_items.create({
            data: {
              price_list_id: priceLists[n].id,
              price: faker.datatype.float(),
            },
          }),
        );
      }
    }

    let numberOfWarhouses = faker.datatype.number(7) + 1;
    for (let k = 0; k < numberOfWarhouses; k++) {
      let priceList = priceLists[Math.floor(Math.random() * priceLists.length)];
      let priceListItem =
        priceListItems[Math.floor(Math.random() * priceListItems.length)];
      warehouses.push(
        await prisma.warehouses.create({
          data: {
            name: faker.commerce.department(),
            organization_id: organizations[i].id,
            price_list_id: priceList.id,
          },
        }),
      );
      await prisma.warehouse_products.create({
        data: {
          product_id: priceListItem.id,
          count: faker.datatype.float(),
          warehouse_id: warehouses[k].id,
        },
      });
    }
                        
    let filteredUsers = users.filter(
      (v) => v.organization_id === organizations[i].id,
    );
    let user1 = filteredUsers[Math.floor(Math.random() * filteredUsers.length)];
    let user2 = filteredUsers[Math.floor(Math.random() * filteredUsers.length)];
    let filteredWarehouses = warehouses.filter(
      (v) => v.organization_id === organizations[i].id,
    );
    let warehouse1 =
      filteredWarehouses[Math.floor(Math.random() * filteredWarehouses.length)];
    let warehouse2 =
      filteredWarehouses[Math.floor(Math.random() * filteredWarehouses.length)];
    let numberOfWarhouseOperations = faker.datatype.number(50) + 1;    
    let numberOfWarhouseOperationItems = faker.datatype.number(50) + 1;
    

    for (let l = 0; l < numberOfWarhouseOperations; l++) {
      warehouseOperations.push(
        await prisma.warehouse_operations.create({
          data: {
            organization_id: organizations[i].id,
            date: faker.date.past(),
            document: faker.lorem.slug(),
            comment: faker.lorem.paragraph(),
            ordinal: faker.datatype.number(),
            responsible_user_id: user1.id,
            from_id: warehouse1.id,
            to_id: warehouse2.id,
            user_id: user2.id,
            reservation_id: faker.datatype.number(),
          },
        }),
      );
      for (let a = 0; a < numberOfWarhouseOperationItems; a++) {
        let priceListItem =
          priceListItems[Math.floor(Math.random() * priceListItems.length)];
        await prisma.warehouse_operation_items.create({
          data: {
            product_id: priceListItem.id,
            count: faker.datatype.number(),
            price: faker.datatype.float(),
            product_name: faker.commerce.productName(),
            warehouse_operation_id: warehouseOperations[l].id,
            discount: faker.datatype.float(),
          },
        });
      }
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
