import { z } from "zod";

//Validação feita pelo zod
export const schemaLogin = z.object({
    email: z.string().email("Informe um e-mail válido"),
    senha: z.string().min(8, "Senha inválida"),
})