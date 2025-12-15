"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import styles from "./buttonEdit.module.css";

interface BotaoEditarProps {
    id: string;
}

export default function ButtonEdit({ id }: BotaoEditarProps) {
    const router = useRouter();

    const handleEditar = () => {
        router.push(`/cars/${id}/edit`);
    };

    return (
        <Button type="button" onClick={handleEditar} className={styles.buttonEdit}>
            Editar
        </Button>
    );
}
