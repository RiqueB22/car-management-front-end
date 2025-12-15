import { UUID } from "crypto";

export interface Car {
    id: UUID;
    modelo: string;
    marca: string;
    cor: string;
    ano: number;
    created_at: string;
    ativo: boolean;
}