import { v4 as uuid } from "uuid";
import { prisma } from "../lib/prisma";

export const generateOtp = async (userId: string) => {
    let otpArray: number[] = [];
    for (let q = 0; q < 6; q++) {
        otpArray.push(Math.floor(Math.random() * 10));
    }

    let code: string = otpArray.join("");
    let expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 30);

    const otp = await prisma.otp.create({
        data: {
            id: uuid(),
            code,
            userId,
            expiresAt
        }
    });

    return otp;
}

export const validateOtp = async (otpId: string, code: string) => {
    const otp = await prisma.otp.findUnique({
        where: { id: otpId },
        include: { user: true }
    });

    if (!otp) {
        return null;
    }

    if (otp.used) {
        return null;
    }

    if (otp.expiresAt < new Date()) {
        return null;
    }

    if (otp.code !== code) {
        return null;
    }

    await prisma.otp.update({
        where: { id: otpId },
        data: { used: true }
    });

    return otp.user;
}