'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import styles from "./styles/not-found.module.css";

export default function NotFound() {

  const { data: session} = useSession();

  return (
    // Container da pagina not found
    <div className={styles.container}>
      {/*Card*/}
      <main className={styles.main}>
        {/*Titulo*/}
        <h2 className={styles.title}>Pagina não encontrada</h2>
        {/*Descrição*/}
        <p className={styles.description}>Não pode ser encontrado a pagina desejada</p>
        {/*Status*/}
        <p className={styles.status}>Status: 404</p>
        {/*Botão retorna para home se não estiver logado ou para tabela se estiver logado*/}
        {session ? (
          <Button className={styles.buttonHome}><Link href="/cars">Retornar</Link></Button>
        ) : (
          <Button className={styles.buttonHome}><Link href="/">Retornar</Link></Button>
        )}
      </main>
    </div>
  )
}