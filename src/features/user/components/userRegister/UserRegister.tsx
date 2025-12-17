"use client";

import styles from "./style.module.css";
import * as z from "zod";
import { SchemaUser } from "@/features/user/schemas/schemaUser";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import "react-toastify/dist/ReactToastify.css";
import ButtonBack from "../../../../components/buttonBack";
import useUser from "@/features/user/hooks/useUser";
import UserContainer from "@/components/userContainer";
import FormCard from "@/components/formCard";
import FormHeader from "@/components/formHeader";
import HeadCard from "@/components/headCard";

// Inferindo o esquema
type RegisterFormData = z.infer<typeof SchemaUser>;

export default function RegisterPage() {

    // Informando o forms os valores padrões e as validações
    const form = useForm<RegisterFormData>({
        resolver: zodResolver(SchemaUser),
        defaultValues: {ativo: true, role: "USER"},
    });

    const mutation = useUser();
    // Subnetendo o forms
    const onSubmit = (values: RegisterFormData) =>{
        mutation.mutate(values);
    };

    return (
        // Container do registro de usuario
        <UserContainer>
            <ToastContainer/>
            {/*Card*/}
            <FormCard>
                {/*Header do card*/}
                <FormHeader>
                    {/*Botão voltar*/}
                    <ButtonBack/>
                    {/*Cabeçalho do card*/}
                    <HeadCard title="Registrar" />
                </FormHeader>
                {/*Conteudo do card*/}
                <CardContent className={styles.contantCard}>
                    {/*Forms*/}
                    <Form {...form}>
                        <form className={styles.form} onSubmit={form.handleSubmit(onSubmit)}>
                            {/*Campo nome*/}
                            <FormField
                                control={form.control}
                                name="nome"
                                render={({field}) => (
                                    <FormItem className={styles.field}>
                                        <FormLabel>Nome:</FormLabel>
                                        <FormControl>
                                            <Input className={styles.input} placeholder="Seu nome" {...field}
                                                   value={field.value || ""}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            {/*Campo email*/}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({field}) => (
                                    <FormItem className={styles.field}>
                                        <FormLabel>E-mail:</FormLabel>
                                        <FormControl>
                                            <Input className={styles.input} type="email"
                                                   placeholder="seu@email.com" {...field} value={field.value || ""}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            {/*Campo senha*/}
                            <FormField
                                control={form.control}
                                name="senha"
                                render={({field}) => (
                                    <FormItem className={styles.field}>
                                        <FormLabel>Senha:</FormLabel>
                                        <FormControl>
                                            <Input className={styles.input} type="password"
                                                   placeholder="Senha" {...field} value={field.value || ""}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            {/*Campo ativo*/}
                            <FormField
                                control={form.control}
                                name="ativo"
                                render={({field}) => (
                                    <FormItem className="flex flex-row items-center space-x-2">
                                        <FormControl>
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange}/>
                                        </FormControl>
                                        <FormLabel>Ativo</FormLabel>
                                    </FormItem>
                                )}
                            />

                            {/*Campo role*/}
                            <FormField
                                control={form.control}
                                name="role"
                                render={({field}) => (
                                    <FormItem className={styles.fieldSelect}>
                                        <FormLabel>Papel:</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Escolha um papel"/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="ADMIN">ADMIN</SelectItem>
                                                    <SelectItem value="USER">USER</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            {/*Botão Submit*/}
                            <Button type="submit" disabled={mutation.isPending} className={styles.buttonSubmit}>
                                {mutation.isPending ? "Registrando..." : "Registrar"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </FormCard>
        </UserContainer>
    );
}
