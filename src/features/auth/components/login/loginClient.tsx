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

// inferimos o tipo a partir do Zod
type FormValues = z.infer<typeof schemaLogin>;

export default function Login() {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState("");

    // tipamos o useForm com FormValues
    const form = useForm<FormValues>({
        resolver: zodResolver(schemaLogin),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: FormValues) {
        setErrorMessage("");

        const res = await signIn("credentials", {
            redirect: false,
            email: values.email,
            password: values.password,
        });

        if (res?.error) {
            setErrorMessage("Credenciais inválidas.");
            return;
        }

        router.push("/cars"); //Redireciona após login bem-sucedido
        router.refresh();
    }

    // Login via Auth0
    const handleAuth0Login = () => {
        signIn("auth0", { callbackUrl: "/cars" });
    };

    return (
        <div className={styles.container}>
            <Card className={styles.card}>
                <h1>Login</h1>

                {errorMessage && (
                    <p className="text-red-500">{errorMessage}</p>
                )}

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

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

                        <FormField
                            control={form.control}
                            name="password"
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

                        <Button type="submit" className={styles.buttonSubmit}
                        onClick={handleAuth0Login}>
                            Entrar
                        </Button>

                    </form>
                </Form>
            </Card>
        </div>
    );
}