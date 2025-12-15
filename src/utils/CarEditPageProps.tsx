import { Session } from "next-auth";

export interface CarEditPageProps {
  Data: {
    id: string;
    modelo: string;
    marca: string;
    cor: string;
    ano: number;
    created_at: string; // já no formato YYYY-MM-DD
    ativo: boolean;
  };
  session: Session;
}