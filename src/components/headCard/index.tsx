import styles from "./style.module.css";
import {CardHeader, CardTitle} from "@/components/ui/card";


export default function HeadCard({ title }: {title: string}){
    return(
        <CardHeader className={styles.headerCard}>
            <CardTitle className={styles.title}>{title}</CardTitle>
        </CardHeader>
    );
}