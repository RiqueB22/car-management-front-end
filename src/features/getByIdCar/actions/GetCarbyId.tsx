"use server";

import { Session } from "next-auth";

export default async function CarGetById(id: string, session?: Session) {
  // Busca carro pelo id
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/api/v1/carros/${id}`,
    {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.token}`
      },
    }
  );
  
  // Verifica se está ok
  if (!res.ok) {
    // Tenta extrair mensagem de erro
    const text = await res.text();
    console.error("Erro ao carregar carro:", res.status, text);
    throw new Error(`Erro ao carregar carro: ${res.status} ${text}`);
  }

  const car = await res.json();

  //Retorna o response
  return car;
} 