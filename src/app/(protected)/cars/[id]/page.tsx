import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../../api/auth/[...nextauth]/route";
import fetchCar from "@/features/getByIdCar/actions/GetCarbyId";
import CarGetByIdPage from "@/features/getByIdCar/components/carById/CarById";

interface PageProps {
  params: { id: string };
}

export default async function GetByIdCar({ params }: PageProps) {
  // Busca a sessão no servidor
  const session = await getServerSession(authOptions);

  // Se não já estiver logado, redireciona para home
  if (!session?.user) {
    redirect("/");
  }

  // Pegando id na URL
  const {id} = await params;

  // Busca pelo id o carro
  const car = await fetchCar(id, session);

  // Retorna a pagina de detalhes de carro
  return <CarGetByIdPage Data={car} />;
}