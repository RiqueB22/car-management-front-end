"use client";

import {toast} from "react-toastify";
import * as z from "zod";
import { SchemaUser } from "@/features/user/schemas/schemaUser";
import {useRouter} from "next/navigation";
import registerUser from "../actions/RegisterUser";
import {useMutation} from "@tanstack/react-query";

type RegisterFormData = z.infer<typeof SchemaUser>;

export default function useUser() {
    const router = useRouter();

    // Registra um novo carro
    const mutation = useMutation({
        mutationFn: (data: RegisterFormData) => registerUser(data),
        onSuccess: () => {
            toast.success("Carro criado com sucesso!", );
            setTimeout(() => {
                router.push("/auth/login");
            }, 700);
        },
        onError: (err: Error) => {
            const message = err?.message || "Erro ao criar carro";
            toast.error(message);
        },
    });

    return mutation;
}