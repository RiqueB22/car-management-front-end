import * as z from "zod";

export const SchemaUser = z.object({
  nome: z.string().min(2, "Nome obrigatório"),
  email: z.string().email("E-mail inválido"),
  senha: z.string().min(8, "Senha deve ter ao menos 8 caracteres"),
  ativo: z.boolean(),
  role: z.enum(["ADMIN", "USER"], "Escolha um papel"),
});