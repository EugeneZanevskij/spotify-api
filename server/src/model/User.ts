import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createOrSkipUser(email : string) {
  try{ 
    const user = await prisma.user.upsert({
      where: { email: email },
      update: {},
      create: {
        email,
        topData: {
          create: {}
        }
      }
    });
    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function getUser(userId: number) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { topData: true },
    });
    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }
    return user;
  } catch (error) {
    throw error;
  }
}