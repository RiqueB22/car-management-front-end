import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import searchCar from "@/features/searchCar/actions/SearchCar";

export function useCars(filters: { modelo?: string; marca?: string; }, page: number, size: number) {
  const { data: session, status } = useSession();

  return useQuery({
    queryKey: ["carros", JSON.stringify(filters), page, size],
    queryFn: async () => searchCar(filters, page, size, session),
    placeholderData: (prev) => prev,
    enabled: status === "authenticated",
  });
}

