import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../../api/auth/[...nextauth]/route";
import CarCreatePage from "@/features/auth/components/carCreate/CarCreate";

export default async function CreateCar() {
  // Busca a sessão no servidor
  const session = await getServerSession(authOptions);

  // Se não já estiver logado, redireciona para home
  if (!session?.user) {
    redirect("/");
  }

  // Retorna a pagina de edição de carro
  return <CarCreatePage session={session}  />; // componente client com interatividade
}