import styles from "./style.module.css";
import {Card} from "@/components/ui/card";
import {ReactNode} from "react";


export default function FormCard({children}: {
    children: ReactNode;
}){
    return(
        <Card className={styles.card}>
            {children}
        </Card>
    );
}