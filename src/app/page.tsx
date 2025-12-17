import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Home from "@/features/home/components/home/homePage";
import { redirect } from "next/navigation";

export default async function Page() {
  // Busca a sessão no servidor
  const session = await getServerSession(authOptions);

  // Se já estiver logado, redireciona para tabela
  if (session?.user) {
    redirect("/cars");
  }

  // Retorna a pagina Home
  return (
    <Home />
  );
}
