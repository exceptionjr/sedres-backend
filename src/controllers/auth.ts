import { RequestHandler } from "express";
import { authSignIn } from "../valueObjects/auth-signIn";
import { authSignUp } from "../valueObjects/auth-signUp";
import { authUseOtp } from "../valueObjects/auth-useOtp";
import { login, findUserByEmail, createUser } from "../services/user";
import { generateOtp, validateOtp } from "../services/otp";
import { sendOtpEmail } from "../lib/mailtrap";
import { createJWT } from "../lib/jwt";

export const signIn: RequestHandler = async (req, res) => {
    const data = authSignIn.safeParse(req.body);
    if (!data.success) {
        res.status(400).json({ error: data.error.flatten().fieldErrors });
        return;
    }

    const user = await login(data.data.email, data.data.password);
    if (!user) {
        res.status(401).json({ error: "Email ou senha inválidos" });
        return;
    }

    const otp = await generateOtp(user.id);

    await sendOtpEmail(user.email, otp.code, user.name);

    res.json({ id: otp.id });
}

export const signUp: RequestHandler = async (req, res) => {
    const data = authSignUp.safeParse(req.body);
    if (!data.success) {
        res.status(400).json({ error: data.error.flatten().fieldErrors });
        return;
    }

    const user = await findUserByEmail(data.data.email);
    if (user) {
        res.status(409).json({ error: "Email já está em uso" });
        return;
    }

    const newUser = await createUser(data.data.name, data.data.email, data.data.password);

    res.status(201).json({ newUser });
}

export const useOtp: RequestHandler = async (req, res) => {
    const data = authUseOtp.safeParse(req.body);
    if (!data.success) {
        res.status(400).json({ error: data.error.flatten().fieldErrors });
        return;
    }

    const user = await validateOtp(data.data.otpId, data.data.code);
    if (!user) {
        res.status(401).json({ error: "Código inválido ou expirado" });
        return;
    }

    const token = createJWT(user.id);

    res.json({ token, user });
}