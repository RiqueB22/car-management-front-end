"use client";

import styles from "./home.module.css";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    // Container da home
    <div className={styles.container}>
      {/*Main*/}
      <main className={styles.main}>
        {/*Card*/}
        <Card className={styles.card}>
          {/*Titulo*/}
          <h1 className={styles.title}>Bem-vindo ao geranciamento de carros</h1>
        </Card>
      </main>
    </div>
  );
}
