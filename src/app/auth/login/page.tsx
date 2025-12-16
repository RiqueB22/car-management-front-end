import Login from "@/features/auth/components/login/loginClient";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // seu authOptions do next-auth

export default async function Page() {
  // Busca a sessão no servidor
  const session = await getServerSession(authOptions);

  // Se já estiver logado, redireciona para tabela
  if (session?.user) {
    redirect("/cars");
  }

  // Retorna a pagina Login
  return (
    <Login />
  );
}
