import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type User = { topTracks: { id: number; userId: number; } | null; } & { id: number; email: string; };

export async function getShortTermTopTracksData(user: User) {
  try {
    const recentTopTracks = await prisma.shortTermTracks.findMany({
      where: {
        topTracksId: user.topTracks?.id
      },
      orderBy: {
        id: 'desc'
      },
      take: 1
    });
    const recentTopTracksData = recentTopTracks[0]?.trackData as string[];
    return recentTopTracksData.length > 0 ? recentTopTracksData : [];
  } catch(error){
    return [];
  }
};

export async function getMediumTermTopTracksData(user: User) {
  try {
    const recentTopTracks = await prisma.mediumTermTracks.findMany({
      where: {
        topTracksId: user.topTracks?.id
      },
      orderBy: {
        id: 'desc'
      },
      take: 1
    });
    const recentTopTracksData = recentTopTracks[0]?.trackData as string[];
    return recentTopTracksData.length > 0 ? recentTopTracksData : [];
  } catch(error){
    return [];
  }
};

export async function getLongTermTopTracksData(user: User) {
  try {
    const recentTopTracks = await prisma.longTermTracks.findMany({
      where: {
        topTracksId: user.topTracks?.id
      },
      orderBy: {
        id: 'desc'
      },
      take: 1
    });
    const recentTopTracksData = recentTopTracks[0]?.trackData as string[];
    return recentTopTracksData.length > 0 ? recentTopTracksData : [];
  } catch(error){
    return [];
  }
};

export async function createShortTermTopTracks(user: User, topTracksData: string[]) {
  try {
    await prisma.shortTermTracks.create({
      data: {
        topTracks: {
          connect: { id: user.topTracks?.id },
        },
        trackData: topTracksData,
        date: new Date().toLocaleDateString(),
      }
    });
  } catch(error){
    console.log(error);
  }
};

export async function createMediumTermTopTracks(user: User, topTracksData: string[]) {
  try {
    await prisma.mediumTermTracks.create({
      data: {
        topTracks: {
          connect: { id: user.topTracks?.id },
        },
        trackData: topTracksData,
        date: new Date().toLocaleDateString(),
      }
    });
  } catch(error){
    console.log(error);
  }
};

export async function createLongTermTopTracks(user: User, topTracksData: string[]) {
  try {
    await prisma.longTermTracks.create({
      data: {
        topTracks: {
          connect: { id: user.topTracks?.id },
        },
        trackData: topTracksData,
        date: new Date().toLocaleDateString(),
      }
    });
  } catch(error){
    console.log(error);
  }
}