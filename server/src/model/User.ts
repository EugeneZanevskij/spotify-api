import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createOrSkipUser(email : string) {
  try{ 
    const user = await prisma.user.upsert({
      where: { email: email },
      update: {},
      create: {
        email,
        topTracks: {
          create: {}
        }
      }
    });
    return user;
  } catch (error) {
    console.log(error);
  }
}



export async function getUser(userId : number) {
  try{ 
    const user = prisma.user.findUnique({
      where: { id: userId },
      include: { topTracks: true },
    });
    return user;
  } catch (error) {
    console.log(error);
  }
}