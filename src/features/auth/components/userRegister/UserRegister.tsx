"use client";

import styles from "./style.module.css";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { SchemaUser } from "@/features/auth/schemas/schemaUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import registerUser, { RegisterPayload } from "@/features/auth/actions/RegisterUser";
import "react-toastify/dist/ReactToastify.css";
import ButtonBack from "../buttonBack/buttonBack";

// Inferindo o esquema
type RegisterFormData = z.infer<typeof SchemaUser>;

export default function RegisterPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Informando o forms os valores padrões e as validações
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(SchemaUser),
    defaultValues: { ativo: true, role: "USER" },
  });

  // Subnetendo o forms
  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsSubmitting(true);
      await registerUser(data as RegisterPayload);

      toast.success("Cadastro realizado com sucesso!");
      form.reset(); // limpa formulário
      setTimeout(() => router.push("/auth/login"), 1500);
    } catch (err: any) {
      toast.error(err.message || "Erro ao cadastrar usuário");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // Container do registro de usuario
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
          {/*Cabeçalho do card*/}
          <CardHeader className={styles.headerCard}>
            <CardTitle className={styles.title}>Registrar</CardTitle>
          </CardHeader>
        </section>
        {/*Conteudo do card*/}
        <CardContent className={styles.contantCard}>
          {/*Forms*/}
          <Form {...form}>
            <form className={styles.form} onSubmit={form.handleSubmit(onSubmit)}>
              {/*Campo nome*/}
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem className={styles.field}>
                    <FormLabel>Nome:</FormLabel>
                    <FormControl>
                      <Input className={styles.input} placeholder="Seu nome" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/*Campo email*/}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className={styles.field}>
                    <FormLabel>E-mail:</FormLabel>
                    <FormControl>
                      <Input className={styles.input} type="email" placeholder="seu@email.com" {...field} value={field.value || ""} />
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
                    <FormLabel>Senha:</FormLabel>
                    <FormControl>
                      <Input className={styles.input} type="password" placeholder="Senha" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/*Campo ativo*/}
              <FormField
                control={form.control}
                name="ativo"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel>Ativo</FormLabel>
                  </FormItem>
                )}
              />

              {/*Campo role*/}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className={styles.fieldSelect}>
                    <FormLabel>Papel:</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Escolha um papel" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ADMIN">ADMIN</SelectItem>
                          <SelectItem value="USER">USER</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/*Botão Submit*/}
              <Button type="submit" disabled={isSubmitting} className={styles.buttonSubmit}>
                {isSubmitting ? "Cadastrando..." : "Cadastrar"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
