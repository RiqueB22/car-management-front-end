'use client';

import { useQuery } from "@tanstack/react-query";
import { Car } from "../types/request/DTOCarsRequest";
import { useSession } from "next-auth/react";

// DTO dos filtros
interface CarroSearchDTO {
  modelo: string;
  marca: string;
}

// DTO das paginas
interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

// DTO response dos carros
interface CarroPage {
  content: Car[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}


export function useCars(filters: CarroSearchDTO) {
  const { data: session, status } = useSession();

  const queryKey = ["cars", filters];
  //Busca todos os dados de carros
  const query = useQuery<CarroPage>({
    queryKey,
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/v1/carros/search`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.token}`
          },
          body: JSON.stringify(filters),
        }
      );

      // Verifica se está ok
      if (!res.ok) {
        // Tenta extrair mensagem de erro
        const text = await res.text();
        console.error("Erro ao carregar carro:", res.status, text);
        throw new Error(`Erro ao carregar carro: ${res.status} ${text}`);
      }

      // Retorna response
      return res.json();
    },
    placeholderData: (previous) => previous,
    staleTime: 5000,
    enabled: status === "authenticated",
  });

  return query;
}
