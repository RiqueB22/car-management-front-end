import * as z from "zod";

//Validação feita pelo zod
export const SchemaEditCar = z.object({
  modelo: z.string().min(2, "Modelo obrigatório"),
  marca: z.string().min(2, "Marca obrigatório"),
  cor: z.string().min(2, "Cor obrigatório"),
  ano: z.number("Ano precisa ser um número")
    .int("Ano deve ser inteiro")
    .min(1886, "Ano inválido")
    .max(new Date().getFullYear() + 1, "Ano inválido"),
  ativo: z.boolean()
});