'use client';

import * as z from "zod";
import { SchemaCar } from "../../schemas/schemaCar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import "react-toastify/dist/ReactToastify.css";
import styles from "./style.module.css";
import { CarGetByIdPageProps } from "@/utils/CarGetByIdProps";
import ButtonEdit from "../button edit/button edit";
import ButtonBack from "../buttonBack/buttonBack";

// Inferindo o esquema
type CarFormData = z.infer<typeof SchemaCar>;

export default function CarGetByIdPage({ Data }: CarGetByIdPageProps) {
    // Informando os valores padrões e as validações
    const form = useForm<CarFormData>({
        resolver: zodResolver(SchemaCar),
        defaultValues: {
            modelo: Data.modelo,
            marca: Data.marca,
            cor: Data.cor,
            ano: Data.ano,
            created_at: Data.created_at,
            ativo: Data.ativo
        }
    });

    return (
        //Container de detalhes de carro
        <div className={styles.container}>
            <ToastContainer />
            {/*Card*/}
            <Card className={styles.card}>
                {/*Header do card*/}
                <section className={styles.header}>
                    {/*Botão voltar*/}
                    <div className={styles.imageLink}>
                        <ButtonBack />
                    </div>
                    {/*Cabeçalho*/}
                    <CardHeader className={styles.headerCard}>
                        <CardTitle className={styles.title}>Detalhes do carro</CardTitle>
                    </CardHeader>
                </section>
                {/*Conteudo do card*/}
                <CardContent className={styles.contantCard}>
                    {/*Form*/}
                    <Form {...form}>
                        <form className={styles.form}>
                            {/*Campo modelo*/}
                            <FormField
                                control={form.control}
                                name="modelo"
                                render={({ field }) => (
                                    <FormItem className={styles.field}>
                                        <FormLabel>Modelo:</FormLabel>
                                        <FormControl>
                                            <Input className={styles.input} readOnly={true} type="text" placeholder="seu modelo" {...field} value={field.value ?? ""} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/*Campo marca*/}
                            <FormField
                                control={form.control}
                                name="marca"
                                render={({ field }) => (
                                    <FormItem className={styles.field}>
                                        <FormLabel>Marca:</FormLabel>
                                        <FormControl>
                                            <Input className={styles.input} readOnly={true} type="text" placeholder="sua marca" {...field} value={field.value ?? ""} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/*Campo cor*/}
                            <FormField
                                control={form.control}
                                name="cor"
                                render={({ field }) => (
                                    <FormItem className={styles.field}>
                                        <FormLabel>Cor:</FormLabel>
                                        <FormControl>
                                            <Input className={styles.input} readOnly={true} type="text" placeholder="sua cor" {...field} value={field.value ?? ""} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/*Campo ano*/}
                            <FormField
                                control={form.control}
                                name="ano"
                                render={({ field }) => (
                                    <FormItem className={styles.field}>
                                        <FormLabel>Ano:</FormLabel>
                                        <FormControl>
                                            <Input className={styles.input} readOnly type="number" placeholder="seu ano" {...field} value={field.value || 0} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/*Campo data de criação*/}
                            <FormField
                                control={form.control}
                                name="created_at"
                                render={({ field }) => (
                                    <FormItem className={styles.fieldDate}>
                                        <FormLabel>Data de criação:</FormLabel>
                                        <FormControl>
                                            <Input className={styles.inputDate} readOnly type="date" placeholder="sua data" {...field} value={field.value ?? ""} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/*Campo de ativo*/}
                            <FormField
                                control={form.control}
                                name="ativo"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center space-x-2">
                                        <FormControl>
                                            <Checkbox disabled checked={!!field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                        <FormLabel>Ativo</FormLabel>
                                    </FormItem>
                                )}
                            />

                            {/*Botão que direciona para pagina de edição*/}
                            <ButtonEdit id={Data.id} />
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}