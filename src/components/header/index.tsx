'use client';

import { Button } from "../ui/button";
import Image from "next/image";
import styles from "./styles.module.css";
import image from "../../../public/vercel.svg";

export default function Header() {
    return (
        <header className={styles.header}>
            <section className={styles.positionLogo}>
                <Image src={image} alt="Logo" className={styles.logo}/>
            </section>

            <section className={styles.authButtons}>
                <Button variant="link" className={styles.login}>Login</Button>
                <p className={styles.authButtonsDetail}> | </p>
                <Button variant="link" className={styles.register}>Registrar</Button>
            </section>
        </header>
    );
}