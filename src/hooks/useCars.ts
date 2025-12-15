import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export function useCars(filters: { modelo?: string; marca?: string; }, page: number, size: number) {
  const { data: session, status } = useSession();

  return useQuery({
    queryKey: ["carros", JSON.stringify(filters), page, size],  // chave única para filtros
    queryFn: async () => {
      if (!session?.user?.token) throw new Error("Usuário não autenticado");
      const res = await fetch(`http://localhost:8080/api/v1/carros/search?page=${page}&size=${size}`, {
        method: "POST",
        headers: { "Content-Type": "application/json",
          "Authorization": `Bearer ${session?.user?.token}`,
        },
        body: JSON.stringify(filters),
      });

      if (!res.ok) throw new Error("Erro ao carregar carros");
      return res.json();
    },
    placeholderData: (prev) => prev, // mantém dados antigos enquanto busca novos
    enabled: status === "authenticated",
  });
}

