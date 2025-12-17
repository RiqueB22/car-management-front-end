import {useRouter} from "next/navigation";
import {useMutation} from "@tanstack/react-query";
import updateCar from "@/features/editCar/actions/UpdateCar";
import {toast} from "react-toastify";
import {SchemaEditCar} from "@/features/editCar/schemas/schemaEditCar";
import {z} from "zod";
import {Session} from "next-auth";

// Inferindo o esquema
type CarFormData = z.infer<typeof SchemaEditCar>;

export function useUpdateCar(id: string, session: Session){
    const router = useRouter();

    // Atualiza o dado
    const mutation = useMutation({
        mutationFn: (formData: CarFormData) => updateCar(id, formData, session),
        onSuccess: () => {
            toast.success("Carro atualizado com sucesso!");
            setTimeout(() => {
                router.push("/cars");
            }, 700);
        },
        onError: () => {
            toast.error("Erro ao atualizar carro");
        }
    });

    return mutation;
}