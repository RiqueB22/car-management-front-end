
export interface RegisterPayload {
  nome: string;
  email: string;
  senha: string;
  ativo: boolean;
  role: string;
}

export default async function registerUser(payload: RegisterPayload) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/api/v1/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        // tenta extrair mensagem de erro do body
        const text = await res.text();
        console.error("Erro ao criar usuario:", res.status, text);
        throw new Error(`Erro ao criar usuario: ${res.status} ${text}`);
    }

    return res.json();
}