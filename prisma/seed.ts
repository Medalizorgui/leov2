import { PrismaClient } from '@prisma/client';

import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Seed admin user
  const adminPassword = await hash('dali', 10);
  await prisma.user.upsert({
    where: { email: 'zorguimohamedali25@gmail.com' },
    update: {},
    create: {
      name: 'dali',
      email: 'zorguimohamedali25@gmail.com',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  // Seed normal user
  const userPassword = await hash('user', 10);
  await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      name: 'normaluser',
      email: 'user@example.com',
      password: userPassword,
      role: 'USER',
    },
  });

  console.log('Seed data inserted successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 