
import { useMutation } from "@tanstack/react-query";
import {SchemaCreateCar} from "@/features/createCar/schemas/schemaCreateCar";
import {z} from "zod";
import createCar from "@/features/createCar/actions/CreateCar";
import {useRouter} from "next/navigation";
import { toast } from "react-toastify";
import {SessionProps} from "@/features/searchCar/types/SessionProps";
import {Session} from "next-auth";


// Inferindo o esquema
type CarCreateFormData = z.infer<typeof SchemaCreateCar>;

export function useCreateCar( session: Session){
    const router = useRouter();

    // Registra um novo carro
    const mutation = useMutation({
        mutationFn: (data: CarCreateFormData) => createCar(data, session),
        onSuccess: () => {
            toast.success("Carro criado com sucesso!", );
            setTimeout(() => {
                router.push("/cars");
            }, 700);
        },
        onError: (err: Error) => {
            const message = err?.message || "Erro ao criar carro";
            toast.error(message);
        },
    });

    return mutation;
}