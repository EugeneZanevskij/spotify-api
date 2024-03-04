import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type User = { topData: { id: number; userId: number; } | null; } & { id: number; email: string; };
type TimeRange = 'short_term' | 'medium_term' | 'long_term';

export async function getTopTracksData(user: User, timeRange: TimeRange) {
  try {
    const recentTopTracks = await prisma.topTracks.findMany({
      where: {
        topDataId: user.topData?.id,
        term: timeRange,
        date: {not: new Date().toLocaleDateString()}
      },
      orderBy: { id: 'desc' },
      take: 1
    });
    const recentTopTracksData = recentTopTracks[0]?.trackData as string[];
    return recentTopTracksData.length > 0 ? recentTopTracksData : [];
  } catch(error){
    return [];
  }
};

export async function checkTopTracks(user: User, timeRange: TimeRange) {
  try {
    const topTracks = await prisma.topTracks.findMany({
      where: {
        topDataId: user.topData?.id,
        term: timeRange,
        date: new Date().toLocaleDateString()
      },
      take: 1
    });
    return topTracks.length > 0;
  }
  catch(error){
    return false;
  }
}

export async function createTopTracks(user: User, timeRange: TimeRange, topTracksData: string[]) {
  try {
    const createdTopTracks = await prisma.topTracks.create({
      data: {
        topData: {
          connect: { id: user.topData?.id },
        },
        trackData: topTracksData,
        date: new Date().toLocaleDateString(),
        term: timeRange
      }
    });
    return createdTopTracks;
  } catch(error){
    throw error;
  }
};
