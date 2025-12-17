import * as z from "zod";

//Validação feita pelo zod
export const SchemaCar = z.object({
  modelo: z.string().min(2, "Modelo obrigatório"),
  marca: z.string().min(2, "Marca obrigatório"),
  cor: z.string().min(2, "Cor obrigatório"),
  ano: z.number("Ano precisa ser um número")
    .int("Ano deve ser inteiro")
    .min(1886, "Ano inválido")
    .max(new Date().getFullYear() + 1, "Ano inválido"),
  created_at: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data inválida"),
  ativo: z.boolean()
});