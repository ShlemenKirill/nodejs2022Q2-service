import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

const main = async () => {
  const user = {
    id: uuidv4(),
    login: 'DBTest',
    password: 'TestPassword',
    version: 1,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  await prisma.user.create({ data: user });
};

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
