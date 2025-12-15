'use client';

import { useRouter } from "next/navigation";
import * as z from "zod";
import { SchemaCreateCar } from "../../schemas/schemaCreateCar";
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
import updateCar from "../../actions/UpdateCar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import "react-toastify/dist/ReactToastify.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import styles from "./style.module.css";
import { CarEditPageProps } from "@/utils/CarEditPageProps";
import ButtonBack from "../buttonBack/buttonBack";

// Inferindo tipo do Zod
type CarFormData = z.infer<typeof SchemaCreateCar>;

export default function CarEditPage({ Data, session }: CarEditPageProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (formData: CarFormData) => updateCar(Data.id, formData, session),
    onSuccess: () => {
      toast.success("Carro atualizado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["cars"] });
      router.push("/cars");
    },
    onError: () => {
      toast.error("Erro ao atualizar carro");
    }
  });

  const form = useForm<CarFormData>({
    resolver: zodResolver(SchemaCreateCar),
    defaultValues: {
      modelo: Data.modelo,
      marca: Data.marca,
      cor: Data.cor,
      ano: Data.ano,
      ativo: Data.ativo
    }
  });

  const onSubmit = async (values: CarFormData) => {
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
            <CardTitle className={styles.title}>Editar</CardTitle>
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
                      <Input className={styles.input} type="number" placeholder="seu ano" {...field} value={field.value || 0} />
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
                {mutation.isPending ? "Atualizando..." : "Atualizar"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}