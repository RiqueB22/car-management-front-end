'use client';

import { Button } from "../ui/button";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./styles.module.css";
import { NavigationMenuLink, NavigationMenu } from "../ui/navigation-menu";

export default function Header() {

    const { data: session } = useSession();

    return (
        // Navbar
        <header className={styles.header}>
            {/*Logo*/}
            <section className={styles.positionLogo}>
                {/*Se estiver logado direciona para tabela*/}
                {session?.user && (
                    <Link href="/cars" className={styles.logo}>
                        <h1>Car management</h1>
                    </Link>
                )}
                {/*Se não estiver logado direciona para home*/}
                {!session?.user && (
                    <Link href="/" className={styles.logo}>
                        <h1>Car management</h1>
                    </Link>
                )}
            </section>

            {/*Menu*/}
            <section className={styles.menuPosition}>
                {/*Se estiver logado aparece a opção do link da tabela*/}
                {session?.user && (
                    <NavigationMenu className={styles.menu}>
                        <NavigationMenuLink asChild>
                            <Link className={styles.menuLink} href="/cars">Dashboard</Link>
                        </NavigationMenuLink>
                    </NavigationMenu>
                )}
            </section>

            {/*Botões de autenticação*/}
            <section className={styles.authButtons}>
                {/*Se estiver logado aparece o nome do usuario e o botão sair*/}
                {session ? (
                    <>
                        <span className={styles.userName}>Olá, {session.user?.email?.split("@")?.at(0)?.split(".")?.at(0)?.toUpperCase()}</span>
                        <p className={styles.authButtonsDetail}> | </p>
                        <Button variant="link" className={styles.buttonLogout} onClick={() => signOut({ callbackUrl: "/" })}>Sair</Button>
                    </>
                ) : (
                    <>
                        {/*Se não estiver logado aparece os botões login e registro*/}
                        <Button variant="link" className={styles.login} onClick={() => signIn("credentials")}>
                            <Link href="/auth/login">
                                Login
                            </Link>
                        </Button>
                        <p className={styles.authButtonsDetail}> | </p>
                        <Button variant="link" className={styles.register}>
                            <Link href="/register">
                                Registrar
                            </Link>
                        </Button>
                    </>
                )}
            </section>
        </header>
    );
}