import styles from "@/styles/components/Navigation.module.css";
import {TbWorldWww} from "react-icons/tb";

export default function Navigation() {
    return (
        <section className={styles.navigation}>
            <h1 className={styles.navigationTitle}>Zukanye admin</h1>
            <a href="https://zukhanye.vercel.app/" target="_blank" className={styles.navigationLink}>
                <TbWorldWww className={styles.navigationLinkIcon} />
                <span className={styles.navigationLinkText}>Visit</span>
            </a>
        </section>
    )
}