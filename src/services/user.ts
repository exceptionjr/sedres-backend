import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";

export const login = async (email: string, password: string) => {
    const user = await prisma.user.findFirst({
        where: { email }
    });

    if (!user) {
        return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return null;
    }

    return user;
}

export const findUserByEmail = async (email: string) => {
    return prisma.user.findUnique({
        where: { email }
    });
}

export const createUser = async (name: string, email: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        },
        select: {
            id: true,
            name: true,
            email: true
        }
    });

    return user;
}