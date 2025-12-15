import { Session } from "next-auth";
import { toast } from "react-toastify";


export const handleDelete = async (id: string, session: Session, refetch?: () => void) => {
  const confirmDelete = window.confirm("Deseja realmente excluir este carro?");
  if (!confirmDelete) return;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/api/v1/carros/${id}`, {
      method: "DELETE",
      headers: {Authorization: `Bearer ${session?.user.token}`},
    });

    if (!res.ok) throw new Error("Erro ao deletar");

    toast.success("Carro deletado!");
    if (refetch) refetch(); // atualiza a lista se houver função
  } catch (error) {
    console.error(error);
    toast.error("Erro ao deletar carro");
  }
};