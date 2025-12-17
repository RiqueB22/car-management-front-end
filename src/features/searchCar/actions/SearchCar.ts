import {Session} from "next-auth";

export default async function searchCar(filters: {
    modelo?: string;
    marca?: string
}, page: number, size: number, session: Session | null){
    if (!session?.user?.token) throw new Error("Usuário não autenticado");
    //Busca os carros
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/api/v1/carros/search?page=${page}&size=${size}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.user?.token}`,
        },
        body: JSON.stringify(filters),
    });

    // Verifica se está ok
    if (!res.ok) {
        // Tenta extrair mensagem de erro
        const text = await res.text();
        console.error("Erro ao carregar carro:", res.status, text);
        throw new Error(`Erro ao carregar carro: ${res.status} ${text}`);
    }

    // Retorna response
    return res.json();
}