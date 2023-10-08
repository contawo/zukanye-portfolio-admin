"use client";

import styles from "@/styles/components/Navigation.module.css";
import Link from "next/link";
import {TbWorldWww} from "react-icons/tb";
import {BsImage} from "react-icons/bs";
import {AiOutlineFilePdf} from "react-icons/ai";
import { useRouter } from "next/navigation";

export default function Navigation() {
    const router = useRouter()

    const logout = () => {
        router.push("/")
    }

    return (
        <section className={styles.navigation}>
            <section className={styles.navigationMain}>
                <h1 className={styles.navigationMainTitle}>Admin</h1>
                <Link href="/upload" className={styles.navigationMainImage}>
                    <BsImage className={styles.navigationMainImageIcon} />
                </Link>
                <Link href="/docs" className={styles.navigationMainDocs}>
                    <AiOutlineFilePdf className={styles.navigationMainDocsIcon} />
                </Link>
            </section>
            <section className={styles.navigationLinks}>
                <a href="https://zukhanye.vercel.app/" target="_blank" className={styles.navigationLink}>
                    <TbWorldWww className={styles.navigationLinkIcon} />
                </a>
                <span className={styles.navigationLogout} onClick={logout}>Logout</span>
            </section>
        </section>
    )
}