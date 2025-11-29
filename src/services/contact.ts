import { prisma } from "../lib/prisma";

export const createContact = async (name: string, email: string, phone: string, doubt: string) => {
    const contact = await prisma.contact.create({
        data: {
            name,
            email,
            phone,
            doubt
        }
    });

    return contact;
}

export const findAllContacts = async (page: number = 1, limit: number = 10) => {
    const skip = (page - 1) * limit;

    const [contacts, total] = await Promise.all([
        prisma.contact.findMany({
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' }
        }),
        prisma.contact.count()
    ]);

    return {
        contacts,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        }
    };
}

export const findContactById = async (id: string) => {
    return prisma.contact.findUnique({
        where: { id }
    });
}

export const findContactByEmail = async (email: string) => {
    return prisma.contact.findUnique({
        where: { email }
    });
}

export const deleteContact = async (id: string) => {
    return prisma.contact.delete({
        where: { id }
    });
}

export const getDashboardStats = async () => {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const [totalContacts, recentContacts, last30DaysContacts] = await Promise.all([
        prisma.contact.count(),
        prisma.contact.count({
            where: {
                createdAt: { gte: sevenDaysAgo }
            }
        }),
        prisma.contact.count({
            where: {
                createdAt: { gte: thirtyDaysAgo }
            }
        })
    ]);

    const previousWeekStart = new Date(sevenDaysAgo.getTime() - 7 * 24 * 60 * 60 * 1000);
    const previousWeekContacts = await prisma.contact.count({
        where: {
            createdAt: {
                gte: previousWeekStart,
                lt: sevenDaysAgo
            }
        }
    });

    const growthRate = previousWeekContacts > 0
        ? ((recentContacts - previousWeekContacts) / previousWeekContacts * 100).toFixed(1)
        : recentContacts > 0 ? '100' : '0';

    const latestContacts = await prisma.contact.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true
        }
    });

    return {
        overview: {
            totalContacts,
            contactsLast7Days: recentContacts,
            contactsLast30Days: last30DaysContacts,
            growthRate: `${growthRate}%`,
            averagePerDay: (last30DaysContacts / 30).toFixed(1)
        },
        latestContacts,
        generatedAt: new Date().toISOString()
    };
}
