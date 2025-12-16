"use client";

import { Card } from "@/components/ui/card";
import styles from "./login.module.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { schemaLogin } from "@/features/auth/schemas/schemaLogin";
import { useRouter } from "next/navigation";
import { z } from "zod"

// Inferindo o esquema
type FormValues = z.infer<typeof schemaLogin>;

export default function Login() {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState("");

    // Informando o forms os valores padrões e as validações
    const form = useForm<FormValues>({
        resolver: zodResolver(schemaLogin),
        defaultValues: {
            email: "",
            senha: "",
        },
    });

    // Submetendo o forms
    async function onSubmit(values: FormValues) {
        setErrorMessage("");

        const res = await signIn("credentials", {
            redirect: false,
            email: values.email,
            password: values.senha,
        });

        if (res?.error) {
            setErrorMessage("Credenciais inválidas.");
            return;
        }

        router.push("/cars");
        router.refresh();
    }

    // Login
    const handleLogin = () => {
        signIn();
    };

    return (
        // Container do login de usuario
        <div className={styles.container}>
            {/*Card*/}
            <Card className={styles.card}>
                <h1>Login</h1>

                {errorMessage && (
                    <p className="text-red-500">{errorMessage}</p>
                )}

                {/*Forms*/}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                        {/*Campo email*/}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className={styles.field}>
                                    <FormLabel className={styles.label}>Email:</FormLabel>
                                    <FormControl>
                                        <Input className={styles.input} type="email" placeholder="email@exemplo.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/*Campo senha*/}
                        <FormField
                            control={form.control}
                            name="senha"
                            render={({ field }) => (
                                <FormItem className={styles.field}>
                                    <FormLabel className={styles.label}>Senha:</FormLabel>
                                    <FormControl>
                                        <Input className={styles.input} type="password" placeholder="••••••••" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/*Botão submit*/}
                        <Button type="submit" className={styles.buttonSubmit}
                        onClick={handleLogin}>
                            Entrar
                        </Button>

                    </form>
                </Form>
            </Card>
        </div>
    );
}