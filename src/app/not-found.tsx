'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import styles from "./styles/not-found.module.css";

export default function NotFound() {

  const { data: session} = useSession();

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h2 className={styles.title}>Pagina não encontrada</h2>
        <p className={styles.description}>Não pode ser encontrado a pagina desejada</p>
        <p className={styles.status}>Status: 404</p>
        {session ? (
          <Button className={styles.buttonHome}><Link href="/cars">Retornar</Link></Button>
        ) : (
          <Button className={styles.buttonHome}><Link href="/">Retornar</Link></Button>
        )}
      </main>
    </div>
  )
}