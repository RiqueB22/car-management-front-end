
// DTO para registro de usuario
export interface RegisterPayload {
  nome: string;
  email: string;
  senha: string;
  ativo: boolean;
  role: string;
}

export default async function registerUser(payload: RegisterPayload) {
    // Registra usuario
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/api/v1/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    // Verifica se está ok
    if (!res.ok) {
        // Tenta extrair mensagem de erro
        const text = await res.text();
        console.error("Erro ao criar usuario:", res.status, text);
        throw new Error(`Erro ao criar usuario: ${res.status} ${text}`);
    }

    // Retorna o response
    return res.json();
}