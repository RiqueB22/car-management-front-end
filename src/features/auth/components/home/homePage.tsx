"use client";

import styles from "./home.module.css";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Card className={styles.card}>
          <h1 className={styles.title}>Bem-vindo ao geranciamento de carros</h1>
        </Card>
      </main>
    </div>
  );
}
