import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import CarsClient from "@/features/searchCar/components/cars/CarsClient";
import { authOptions } from "../../api/auth/[...nextauth]/route";

export default async function Dashboard() {
  // Busca a sessão no servidor
  const session = await getServerSession(authOptions);

  // Se não já estiver logado, redireciona para home
  if (!session?.user) {
    redirect("/");
  }

  // Retorna pagina da tabela de carros
  return <CarsClient session={session} />;
}
