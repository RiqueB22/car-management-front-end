import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import RegisterPage from "@/features/user/components/userRegister/UserRegister";

export default async function Page() {
  // Busca a sessão no servidor
  const session = await getServerSession(authOptions);

  // Se já estiver logado, redireciona para tabela
  if (session?.user) {
    redirect("/cars");
  }

  // Retorna a pagina Registro de usuario
  return (
    <RegisterPage />
  );
}