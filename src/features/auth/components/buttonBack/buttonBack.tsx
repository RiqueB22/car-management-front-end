"use client";

import { Button } from "@/components/ui/button";
import Image from 'next/image';
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import leftarrow from "../../../../../public/assets/leftarrow.png";

export default function ButtonBack() {
    const router = useRouter();
    //Volta para a pagina anterior
    const handleVoltar = () => {
        router.back(); // volta para a página anterior
    };

    // Retorna botão voltar
    return (
        <Button onClick={handleVoltar} className={styles.image}>
            <Image src={leftarrow} width={20} height={20} alt="retorno" />
        </Button>
    );
}