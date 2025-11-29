import { z } from "zod";

export const authUseOtp = z.object({
    otpId: z.string().uuid({ message: "ID do OTP inválido" }),
    code: z.string().length(6, "Código deve ter 6 dígitos")
});
