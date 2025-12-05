import type { Metadata } from "next";
import Header from "@/components/header";
import "./styles/globals.css";

export const metadata: Metadata = {
  title: "Car-management",
  description: "Front de gerenciamento de carro"
};

export default function RootLayout({
  children,
}:{
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
