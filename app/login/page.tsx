"use client";

import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import styles from "./styles.module.css";
import { FEATURE_FLAGS } from "constants/featureFlags";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { signIn } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const message = searchParams?.get("message");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signIn(email, password);
            router.push("/interview");
            router.refresh();
        } catch (error) {
            setError("Failed to sign in");
        }
    };

    return (
        <div className={styles.authContainer}>
            <form onSubmit={handleSubmit} className={styles.authForm}>
                <h1 className={styles.authTitle}>Login</h1>
                {message && <p className={styles.success}>{message}</p>}
                {error && <p className={styles.error}>{error}</p>}
                <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className={styles.authButton}>
                    Login
                </button>
                {FEATURE_FLAGS.auth.createAccount && <p className={styles.authLink}>
                    Dont have an account? <Link href="/register">Register</Link>
                </p>}
            </form>
        </div>
    );
} 