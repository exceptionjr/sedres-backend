import { Router } from "express";
import * as authController from "../controllers/auth";
import * as contactController from "../controllers/contact";
import { verifyJwt } from "../lib/jwt";

export const mainRouter = Router();

mainRouter.get("/", (req, res) => {
    res.json({
        success: true,
        data: {
            name: "SEDRES - Backend",
            version: "v1",
            status: "finished"
        }
    });
});

mainRouter.post("/auth/signin", authController.signIn);
mainRouter.post("/auth/signup", authController.signUp);

mainRouter.post("/contact", contactController.create);
mainRouter.get("/contact", verifyJwt, contactController.getAll);
mainRouter.get("/contact/dashboard", verifyJwt, contactController.dashboard);
mainRouter.get("/contact/:id", verifyJwt, contactController.getById);
mainRouter.delete("/contact/:id", verifyJwt, contactController.remove);
