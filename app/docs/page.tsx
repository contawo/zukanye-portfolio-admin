import FileUpload from "@/components/FileUpload";
import Navigation from "@/components/Navigation";
import styles from "@/styles/pages/Page.module.css";

export default function Docs() {
    return (
        <section className={styles.main}>
            <Navigation />
            <section className={styles.mainContent}>
                <FileUpload />
            </section>
        </section>
    )
}