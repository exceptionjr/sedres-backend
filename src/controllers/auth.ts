import { RequestHandler } from "express";
import { authSignIn } from "../valueObjects/auth-signIn";
import { authSignUp } from "../valueObjects/auth-signUp";
import { login, findUserByEmail, createUser } from "../services/user";
import { createJWT } from "../lib/jwt";

export const signIn: RequestHandler = async (req, res) => {
    try {
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

        const token = createJWT(user.id);

        res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (error) {
        console.error('SignIn error:', error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
}

export const signUp: RequestHandler = async (req, res) => {
    try {
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
    } catch (error) {
        console.error('SignUp error:', error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
}