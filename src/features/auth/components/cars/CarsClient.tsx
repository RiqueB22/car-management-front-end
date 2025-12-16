"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ButtonEdit from "../button edit/button edit";
import styles from "./dashboard.module.css";
import { Car } from "../../types/request/DTOCarsRequest";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCars } from "@/hooks/useCars";
import { useSearchParams, useRouter } from "next/navigation";
import { handleDelete } from "../../actions/DeleteCar";
import { Session } from "next-auth";

interface SessionProp {
    session: Session
}

export default function CarsClient({ session }: SessionProp) {
    const [filters, setFilters] = useState({ modelo: "", marca: "" });
    const searchParams = useSearchParams();
    const router = useRouter();
    const [page, setPage] = useState(Number(searchParams.get("page") ?? 0));
    const [size, setSize] = useState(Number(searchParams.get("size") ?? 10));

    // Atualiza estado quando a URL muda
    useEffect(() => {
        setPage(Number(searchParams.get("page") ?? 0));
        setSize(Number(searchParams.get("size") ?? 10));
    }, [searchParams]);

    // Busca os dados da tabela
    const { data, isFetching, refetch } = useCars(filters, page, size);

    // Função para atualizar a URL quando muda página ou tamanho
    const updateUrl = (newPage: number, newSize: number = size) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", String(newPage));
        params.set("size", String(newSize));
        router.push(`/cars?${params.toString()}`);
    };

    { isFetching && <p>Carregando...</p> }

    return (
        // Container do tabela de carros
        <div className={styles.container}>
            {/*Card*/}
            <main className={styles.main}>
                {/*Head do card*/}
                <section className={styles.head}>
                    {/*Titulo*/}
                    <h2>Lista de Carros</h2>

                    {/*Filtros*/}
                    <div className={styles.filter}>
                        {/*Campo modelo*/}
                        <div className={styles.field}>
                            <label className={styles.labelModel}>Modelo:</label>
                            <Input
                                value={filters.modelo}
                                onChange={(e) =>
                                    setFilters({ ...filters, modelo: e.target.value })
                                }
                            />
                        </div>

                        {/*Campo marca*/}
                        <div className={styles.field}>
                            <label className={styles.labelStamp}>Marca:</label>
                            <Input
                                value={filters.marca}
                                onChange={(e) =>
                                    setFilters({ ...filters, marca: e.target.value })
                                }
                            />
                        </div>
                    </div>

                    {/*Botão adicionar*/}
                    <Button className={styles.buttonAdd}>
                        <Link href="/cars/create">Adicionar Carro</Link>
                    </Button>
                </section>

                {/*Tabela*/}
                <Table className={styles.table}>
                    {/*Header da tabela*/}
                    <TableHeader className={styles.tableHeader}>
                        {/*Colunas*/}
                        <TableRow>
                            <TableHead className={styles.tableHead}>Modelo</TableHead>
                            <TableHead className={styles.tableHead}>Marca</TableHead>
                            <TableHead className={styles.tableHead}>Cor</TableHead>
                            <TableHead className={styles.tableHead}>Ano</TableHead>
                            <TableHead className={styles.tableHead}>Data de criação</TableHead>
                            <TableHead className={styles.tableHead}>Ações</TableHead>
                        </TableRow>
                    </TableHeader>

                    {/*Corpo da tabela*/}
                    <TableBody className={styles.tableBody}>
                        {/*Mapeando cada carro*/}
                        {data?.content?.map((car: Car) => (
                            // Colunas
                            <TableRow key={car.id}>
                                <TableCell onClick={() => router.push(`/cars/${car.id}`)} className={styles.tableCell}>{car.modelo}</TableCell>
                                <TableCell onClick={() => router.push(`/cars/${car.id}`)} className={styles.tableCell}>{car.marca}</TableCell>
                                <TableCell onClick={() => router.push(`/cars/${car.id}`)} className={styles.tableCell}>{car.cor}</TableCell>
                                <TableCell onClick={() => router.push(`/cars/${car.id}`)} className={styles.tableCell}>{car.ano}</TableCell>
                                <TableCell onClick={() => router.push(`/cars/${car.id}`)} className={styles.tableCell}>
                                    {car.created_at.split("-").reverse().join("/")}
                                </TableCell>
                                <TableCell className={styles.tableBodyButtons}>
                                    {/*Botão que direciona para a pagina de edição*/}
                                    <ButtonEdit id={car.id} />
                                    {/*Botão que deletar os dados*/}
                                    <Button className={styles.buttonDelete} onClick={() => handleDelete(car.id, session, refetch)}>
                                        Deletar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {/*Paginação*/}
                <footer className={styles.pagination}>
                    {/*Botão de voltar pagina*/}
                    <Button
                        disabled={page === 0}
                        onClick={() => updateUrl(page - 1)}
                    >
                        Anterior
                    </Button>

                    {/*Informa o numero de paginas*/}
                    <span style={{ margin: "0 12px" }}>
                        Página {page + 1} de {data?.totalPages ?? 1}
                    </span>

                    {/*Botão de proxima pagina*/}
                    <Button
                        disabled={page + 1 >= (data?.totalPages ?? 1)}
                        onClick={() => updateUrl(page + 1)}
                    >
                        Próxima
                    </Button>

                    {/*Seleciona o numero de itens visualizados*/}
                    <select
                        className={styles.select}
                        value={size}
                        onChange={(e) => updateUrl(0, Number(e.target.value))}
                        style={{
                            marginLeft: "20px",
                            padding: "6px 10px",
                            borderRadius: "8px",
                        }}
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                    </select>
                </footer>
            </main>
        </div>
    );
}