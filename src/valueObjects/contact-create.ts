import z from "zod";

export const contactCreate = z.object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z.string().email({ message: "Email inválido" }),
    phone: z.string().min(10, "Telefone deve ter pelo menos 10 caracteres"),
    doubt: z.string().min(10, "Dúvida deve ter pelo menos 10 caracteres")
});
