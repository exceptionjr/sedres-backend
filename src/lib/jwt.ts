import { NextFunction, Response } from "express";
import { ExtendedRequest } from "../types/extendedRequest";
import jwt from "jsonwebtoken";

export const createJWT = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET as string);
}

export const verifyJwt = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        res.status(401).json({ error: "Acesso negado" })
        return;
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(
        token,
        process.env.JWT_SECRET as string,
        (err, decoded: any) => {
            if (err) {
                res.status(500).json({ error: "Acesso negado" });
                return;
            }

            req.userId = decoded.id;
            next();
        }
    );
}