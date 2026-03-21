import { useState } from 'react'
import styles from './Login.module.css'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import isValidEmail from '../../Validation'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [erro, setErro] = useState("")
    const navigate = useNavigate()

    function handleLogin(e: React.FormEvent) {
        e.preventDefault()

        if (!isValidEmail(email)) {
            setErro("Email inválido")
            return
        }

        setErro("")
        console.log({ email, password })
    }

    return (
        <motion.div
            className={styles.container}
            initial={{ opacity: 0, x: 40, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -40, scale: 0.98 }}
            transition={{ duration: 0.3 }}
        >
            <div className={styles.wrapper}>
                <h1 className={styles.title}>Clínica Castelo</h1>
                <p className={styles.subtitle}>
                    Agende sua consulta de forma rápida e segura
                </p>

                <div className={styles.card}>
                    <div className={styles.avatar}>
                        <PersonOutlineIcon />
                    </div>

                    <form onSubmit={handleLogin} className={styles.form}>

                        <div className={`${styles.inputGroup} ${erro ? styles.inputError : ""}`}>
                            <MailOutlineIcon />
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {erro && <span className={styles.error}>{erro}</span>}

                        <div className={styles.inputGroup}>
                            <LockOutlinedIcon />
                            <input
                                type="password"
                                placeholder="Senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className={styles.options}>
                            <label>
                                <input type="checkbox" />
                                Lembrar de mim
                            </label>

                            <a href="#">
                                Esqueceu a senha?
                            </a>
                        </div>

                        <button
                            className={styles.loginBtn}>
                            Entrar
                        </button>

                        <button
                            type="button"
                            className={styles.registerBtn}
                            onClick={() => navigate("/register")}
                        >
                            Criar conta
                        </button>
                    </form>
                </div>
            </div>
        </motion.div >
    )
}