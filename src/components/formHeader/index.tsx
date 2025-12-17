import styles from "./style.module.css";
import {ReactNode} from "react";


export default function FormHeader({children}: { children: ReactNode }){
    return(
        <section className={styles.header}>
            {children}
        </section>
    );
}