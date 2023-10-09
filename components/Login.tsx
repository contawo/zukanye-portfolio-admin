"use client";

import { useState, useEffect } from "react";
import {ImWarning} from "react-icons/im";
import styles from "@/styles/components/Login.module.css";
import {AiOutlineMail} from "react-icons/ai";
import {MdPassword} from "react-icons/md";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/navigation";

export default function Login() {
    const [password, setPassword] = useState<{text: string; error: string}>({
        text: "",
        error: ""
    })
    const [email, setEmail] = useState<{text: string, error: string}>({
        text: "",
        error: ""
    })
    const [error, setError] = useState<string>("")

    const [isDisabled, setIsDisabled] = useState<boolean>(true)
    const getPassword = process.env.NEXT_PUBLIC_PASSWORD;
    const router = useRouter();

    useEffect(() => {
        if (password.text === getPassword) {
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }
    }, [password, isDisabled, getPassword])

    const submit = () => {
        console.log("Submitted")
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9]+\.+[a-zA-Z0-9]/
        if (!email.text.match(validRegex)) {
            setEmail({...email, error: "Invalid email provided"})
            setPassword({...password, error: ""})
            return
        }
        if (password.text != getPassword) {
            setPassword({...password, error: "Invalid password provided"})
            setEmail({...email, error: ""})
            return
        }
        setEmail({...email, error: ""})
        setPassword({...password, error: ""})

        signInWithEmailAndPassword(auth, email.text, password.text).then(() => {
            router.push("/upload")
        }).catch(() => {
            setEmail({...email, error: "You are not a valid user"})
            setPassword({...password, error: "You are not a valid user"})
        })
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
                            onChange={(e) => setEmail({...email, text: e.target.value})}
                            value={email.text}
                            className={styles.loginInputField}
                        />
                    </div>
                    <p className={styles.loginError}>{email.error}</p>
                </section>
                <section className={styles.loginInputSection}>
                    <div className={styles.loginInput}>
                        <MdPassword className={styles.loginInputIcon} />
                        <input 
                            type="password"
                            placeholder="Enter admin password..."
                            autoComplete="current-password"
                            onChange={(e) => setPassword({...password, text: e.target.value})}
                            value={password.text}
                            className={styles.loginInputField}
                        />
                    </div>
                    <p className={styles.loginError}>{password.error}</p>
                </section>
            </section>
            <button disabled={isDisabled} onClick={submit} className={isDisabled ? styles.loginButtonDisable : styles.loginButton}>Continue</button>
        </section>
    )
}