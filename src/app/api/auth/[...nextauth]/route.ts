import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";

// Configuração do NextAuth
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email@exemplo.com" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        // Garantindo que email e password existam
        if (!credentials?.email || !credentials?.password) return null;

        // Chamada para seu backend
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/api/v1/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json"},
          body: JSON.stringify({ email: credentials?.email, senha: credentials?.password}),
        });

        if (!res.ok) return null;

        const data = await res.json(); // data = { token: "abc123" }

        // Retorna um "usuário" fictício com o token
        return {
          id: "1",
          email: credentials?.email,
          token: data.token,
        };
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET!,
  session: { strategy: "jwt" as const },
  callbacks: {
    // Salva o token do backend no JWT
    async jwt({ token, user } : { token: JWT; user: any }) {
      if (user?.token) token.accessToken = user.token;
      return token;
    },

    // Adiciona o token à session
    async session({ session, token }: { session: Session; token: JWT }) {
      (session.user as any).token = token.accessToken;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

// Exporta para App Router (Next.js 16)
export { handler as GET, handler as POST };