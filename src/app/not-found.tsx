import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import styles from "./styles/not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.main}>
      <Card className={styles.card}>
        <h2 className={styles.title}>Pagina não encontrada</h2>
        <p className={styles.description}>Não pode ser encontrado a pagina desejada</p>
        <p className={styles.status}>Status: 404</p>
        <Button className={styles.buttonHome}><Link href="/">Retornar</Link></Button>
      </Card>
    </main>
  )
}