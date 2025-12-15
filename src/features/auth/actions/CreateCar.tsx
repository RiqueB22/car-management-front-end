import * as z from "zod";
import { SchemaCreateCar } from "../schemas/schemaCreateCar";
import { Session } from "next-auth";


type CreateCarForm = z.infer<typeof SchemaCreateCar>;

export default async function createCar(payload: CreateCarForm, session: Session) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/api/v1/carros`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.token}`
        },
        body: JSON.stringify(payload),
    });


    if (!res.ok) {
        const text = await res.text();
        console.error("Erro ao carregar carro:", res.status, text);
        throw new Error(`Erro ao carregar carro: ${res.status} ${text}`);
    }


    return res.json();
}