import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

// Adicionando token no next-auth
declare module "next-auth" {
  interface Session {
    user: {
      // Inclui o token JWT retornado pelo backend
      token: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    token?: string;
  }
}
