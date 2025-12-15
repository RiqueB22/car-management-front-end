'use client';

// hooks/useCars.ts
import { useQuery } from "@tanstack/react-query";
import { Car } from "../types/request/DTOCarsRequest";
import { useSession } from "next-auth/react";

interface CarroSearchDTO {
  modelo: string;
  marca: string;
}

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

  const query = useQuery<CarroPage>({
    queryKey,
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:8080/api/v1/carros/search`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.token}`
           },
          body: JSON.stringify(filters),
        }
      );

      if (!res.ok) throw new Error("Erro ao buscar carros");

      return res.json();
    },
    placeholderData: (previous) => previous,
    staleTime: 5000,
    enabled: status === "authenticated",
  });

  return query;
}
