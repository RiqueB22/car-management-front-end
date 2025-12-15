import { z } from "zod";

export const schemaLogin = z.object({
    email: z.string().email("Informe um e-mail válido"),
    password: z.string().min(8, "Senha inválida"),
})