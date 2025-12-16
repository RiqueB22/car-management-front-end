import { Session } from "next-auth";
import { toast } from "react-toastify";


export const handleDelete = async (id: string, session: Session, refetch?: () => void) => {
  //Perguntar se quer confirmar
  const confirmDelete = window.confirm("Deseja realmente excluir este carro?");
  if (!confirmDelete) return;

  try {
    // Deleta o carro
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/api/v1/carros/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${session?.user.token}` },
    });

    // Verifica se está ok
    if (!res.ok) {
      // Tenta extrair mensagem de erro
      const text = await res.text();
      console.error("Erro ao carregar carro:", res.status, text);
      throw new Error(`Erro ao carregar carro: ${res.status} ${text}`);
    }

    toast.success("Carro deletado!");
    if (refetch) refetch(); // atualiza a lista se houver função
  } catch (error) {
    console.error(error);
    toast.error("Erro ao deletar carro");
  }
};