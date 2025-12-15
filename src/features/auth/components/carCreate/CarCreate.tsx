'use client';

import { useRouter } from "next/navigation";
import * as z from "zod";
import { SchemaCreateCar } from "../../schemas/schemaCreateCar";
import { SchemaCar } from "../../schemas/schemaCar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import "react-toastify/dist/ReactToastify.css";
import styles from "./styles.module.css";
import ButtonBack from "../buttonBack/buttonBack";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import createCar from "../../actions/CreateCar";
import { Session } from "next-auth";

// Inferindo tipo do Zod
type CarCreateFormData = z.infer<typeof SchemaCreateCar>;
type CarFormData = z.infer<typeof SchemaCar>;

interface SessionProps {
    session: Session
}

export default function CarCreatePage({ session }: SessionProps) {
    const router = useRouter();
    const queryClient = useQueryClient();

    const form = useForm<CarCreateFormData>({
        resolver: zodResolver(SchemaCreateCar),
        defaultValues: {
            modelo: "",
            marca: "",
            cor: "",
            ano: new Date().getFullYear(),
            ativo: true
        }
    });

    const mutation = useMutation({
        mutationFn: (data: CarCreateFormData) => createCar(data, session),
        onSuccess: () => {
            toast.success("Carro criado com sucesso!");
            // invalida/atualiza a listagem de carros cadastrados
            queryClient.invalidateQueries({ queryKey: ["cars"] });
            router.push("/cars");
        },
        onError: (err: any) => {
            const message = err?.message || "Erro ao criar carro";
            toast.error(message);
        },
    });

    const onSubmit = async (values: CarCreateFormData) => {
        mutation.mutate(values);
    };

    return (
        <div className={styles.container}>
            <ToastContainer />
            <Card className={styles.card}>
                <section className={styles.header}>
                    <div className={styles.imageLink}>
                        <ButtonBack />
                    </div>
                    <CardHeader className={styles.headerCard}>
                        <CardTitle className={styles.title}>Criar</CardTitle>
                    </CardHeader>
                </section>
                <CardContent className={styles.contantCard}>
                    <Form {...form}>
                        <form className={styles.form} onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="modelo"
                                render={({ field }) => (
                                    <FormItem className={styles.field}>
                                        <FormLabel>Modelo:</FormLabel>
                                        <FormControl>
                                            <Input className={styles.input} type="text" placeholder="seu modelo" {...field} value={field.value ?? ""} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="marca"
                                render={({ field }) => (
                                    <FormItem className={styles.field}>
                                        <FormLabel>Marca:</FormLabel>
                                        <FormControl>
                                            <Input className={styles.input} type="text" placeholder="sua marca" {...field} value={field.value ?? ""} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="cor"
                                render={({ field }) => (
                                    <FormItem className={styles.field}>
                                        <FormLabel>Cor:</FormLabel>
                                        <FormControl>
                                            <Input className={styles.input} type="text" placeholder="sua cor" {...field} value={field.value ?? ""} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="ano"
                                render={({ field }) => (
                                    <FormItem className={styles.field}>
                                        <FormLabel>Ano:</FormLabel>
                                        <FormControl>
                                            <Input className={styles.input} type="number" placeholder="seu ano" {...field} value={field.value} onChange={(e) =>
                                                field.onChange(
                                                    e.target.value === "" ? undefined : Number(e.target.value)
                                                )
                                            } />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="ativo"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center space-x-2">
                                        <FormControl>
                                            <Checkbox checked={!!field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                        <FormLabel>Ativo</FormLabel>
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" disabled={mutation.isPending} className={styles.buttonSubmit}>
                                {mutation.isPending ? "Registrando..." : "Registrar"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}