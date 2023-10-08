import ImageUpload from "@/components/ImageUpload";
import Navigation from "@/components/Navigation";
import styles from "@/styles/pages/Page.module.css";

export default function Upload() {
    return (
        <section className={styles.main}>
            <Navigation />
            <section className={styles.mainContent}>
                <ImageUpload />
            </section>
        </section>
    )
}