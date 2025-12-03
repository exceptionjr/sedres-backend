import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { neonConfig, Pool } from '@neondatabase/serverless';
import ws from 'ws';
import 'dotenv/config';

// Configure WebSocket for Neon serverless
neonConfig.webSocketConstructor = ws;

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

function createPrismaClient() {
    // Use Vercel Postgres URL (which uses Neon under the hood)
    const connectionString = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL;

    if (!connectionString) {
        throw new Error('Database connection string not found. Please set POSTGRES_PRISMA_URL or DATABASE_URL.');
    }

    // For Vercel Postgres (Neon-based)
    const pool = new Pool({ connectionString });
    const adapter = new PrismaNeon(pool as any);

    return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;