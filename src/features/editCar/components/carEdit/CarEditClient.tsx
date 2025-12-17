'use client';

import * as z from "zod";
import { SchemaEditCar } from "../../schemas/schemaEditCar";
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
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import "react-toastify/dist/ReactToastify.css";
import styles from "./style.module.css";
import { CarEditPageProps } from "@/features/editCar/types/CarEditPageProps";
import ButtonBack from "../../../../components/buttonBack";
import {useUpdateCar} from "@/features/editCar/hooks/useUpdateCar";
import FormContainer from "@/components/formContainer";
import FormCard from "@/components/formCard";

// Inferindo o esquema
type CarFormData = z.infer<typeof SchemaEditCar>;

export default function CarEditPage({ Data, session }: CarEditPageProps) {

  // Atualiza o dado
  const mutation = useUpdateCar(Data.id, session);

  // Informa os valores padrões e as validações
  const form = useForm<CarFormData>({
    resolver: zodResolver(SchemaEditCar),
    defaultValues: {
      modelo: Data.modelo,
      marca: Data.marca,
      cor: Data.cor,
      ano: Data.ano,
      ativo: Data.ativo
    }
  });

  // Submetendo o forms
  const onSubmit = async (values: CarFormData) => {
    mutation.mutate(values);
  };

  return (
    // Container de edição de carro
    <FormContainer>
      <ToastContainer />
      {/*Card*/}
      <FormCard>
        {/*Header do card*/}
        <section className={styles.header}>
          {/*Botão voltar*/}
          <div className={styles.imageLink}>
            <ButtonBack />
          </div>
          {/*Cabeçalho*/}
          <CardHeader className={styles.headerCard}>
            <CardTitle className={styles.title}>Editar</CardTitle>
          </CardHeader>
        </section>
        {/*Conteudo do card*/}
        <CardContent className={styles.contantCard}>
          {/*Forms*/}
          <Form {...form}>
            <form className={styles.form} onSubmit={form.handleSubmit(onSubmit)}>
              {/*Campo modelo*/}
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

              {/*Campo marca*/}
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

              {/*Campo cor*/}
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

              {/*Campo ano*/}
              <FormField
                control={form.control}
                name="ano"
                render={({ field }) => (
                  <FormItem className={styles.field}>
                    <FormLabel>Ano:</FormLabel>
                    <FormControl>
                      <Input className={styles.input} type="number" placeholder="seu ano" {...field} value={field.value || 0} />
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
                      <Checkbox checked={!!field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel>Ativo</FormLabel>
                  </FormItem>
                )}
              />

              {/*Botão submit*/}
              <Button type="submit" disabled={mutation.isPending} className={styles.buttonSubmit}>
                {mutation.isPending ? "Atualizando..." : "Atualizar"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </FormCard>
    </FormContainer>
  );
}