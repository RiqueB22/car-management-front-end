"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import styles from "./buttonEdit.module.css";

interface BotaoEditarProps {
    id: string;
}

export default function ButtonEdit({ id }: BotaoEditarProps) {
    const router = useRouter();

    // Dereciona para a pagina de edição
    const handleEditar = () => {
        router.push(`/cars/${id}/edit`);
    };

    // Retorna botão editar
    return (
        <Button type="button" onClick={handleEditar} className={styles.buttonEdit}>
            Editar
        </Button>
    );
}
