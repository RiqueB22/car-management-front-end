import * as z from "zod";
import { SchemaCreateCar } from "../schemas/schemaCreateCar";
import { Session } from "next-auth";

type CarFormData = z.infer<typeof SchemaCreateCar>;

export default async function updateCar(id: string, data: CarFormData, session: Session) {

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/api/v1/carros/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.token}`
    },
    body: JSON.stringify(data),
  });

  if (!res.ok)  {
    const text = await res.text();
    console.error("Erro ao carregar carro:", res.status, text);
    throw new Error(`Erro ao carregar carro: ${res.status} ${text}`);
  }
  return res.json();
}