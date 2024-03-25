import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type User = { topData: { id: number; userId: number; } | null; } & { id: number; email: string; };
type TimeRange = 'short_term' | 'medium_term' | 'long_term';

export async function getTopArtistsData(user: User, timeRange: TimeRange) {
  try {
    const recentTopArtists = await prisma.topArtists.findMany({
      where: {
        topDataId: user.topData?.id,
        term: timeRange,
        date: {not: new Date().toLocaleDateString()}
      },
      orderBy: { id: 'desc' },
      take: 1
    });
    const recentTopArtistsData = recentTopArtists[0]?.artistData as string[];
    return recentTopArtistsData.length > 0 ? recentTopArtistsData : [];
  } catch(error){
    return [];
  }
};

export async function checkTopArtists(user: User, timeRange: TimeRange) {
  try {
    const topArtists = await prisma.topArtists.findMany({
      where: {
        topDataId: user.topData?.id,
        term: timeRange,
        date: new Date().toLocaleDateString()
      },
      take: 1
    });
    return topArtists.length > 0;
  }
  catch(error){
    return false;
  }
}

export async function createTopArtists(user: User, timeRange: TimeRange, topArtistsData: string[]) {
  try {
    const createdTopArtists = await prisma.topArtists.create({
      data: {
        topData: {
          connect: { id: user.topData?.id },
        },
        artistData: topArtistsData,
        date: new Date().toLocaleDateString(),
        term: timeRange
      }
    });
    return createdTopArtists;
  } catch(error){
    throw error;
  }
};
