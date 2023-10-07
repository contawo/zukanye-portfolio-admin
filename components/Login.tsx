"use client";

import { useState, useEffect } from "react";
import {ImWarning} from "react-icons/im";
import styles from "@/styles/components/Login.module.css";
import {AiOutlineMail} from "react-icons/ai";
import {MdPassword} from "react-icons/md";

export default function Login() {
    const [password, setPassword] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [error, setError] = useState<string>("")

    const [isDisabled, setIsDisabled] = useState<boolean>(true)
    const getPassword = process.env.NEXT_PUBLIC_PASSWORD;

    useEffect(() => {
        if (password === getPassword) {
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }
    }, [password, isDisabled, getPassword])

    const submit = () => {
        console.log("Submitted")
    }

    return (
        <section className={styles.login}>
            <h1 className={styles.loginTitle}>Welcome back</h1>
            <p className={styles.loginText}>You can now access your admin</p>
            <section className={styles.loginInfo}>
                <section className={styles.loginWarn}>
                    <ImWarning className={styles.loginWarnIcon} />
                    <section className={styles.loginWarnInfo}>
                        <h3 className={styles.loginWarnInfoTitle}>Warning</h3>
                        <p className={styles.loginWarnInfoText}>Only admin can access this website</p>
                    </section>
                </section>
                <section className={styles.loginInputSection}>
                    <div className={styles.loginInput}>
                        <AiOutlineMail className={styles.loginInputIcon} />
                        <input 
                            type="email"
                            placeholder="Enter admin email..."
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className={styles.loginInputField}
                        />
                    </div>
                    <p className={styles.loginError}>{error}</p>
                </section>
                <section className={styles.loginInputSection}>
                    <div className={styles.loginInput}>
                        <MdPassword className={styles.loginInputIcon} />
                        <input 
                            type="password"
                            placeholder="Enter admin password..."
                            autoComplete="current-password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            className={styles.loginInputField}
                        />
                    </div>
                    <p className={styles.loginError}>{error}</p>
                </section>
            </section>
            <button disabled={isDisabled} onClick={submit} className={isDisabled ? styles.loginButtonDisable : styles.loginButton}>Continue</button>
        </section>
    )
}