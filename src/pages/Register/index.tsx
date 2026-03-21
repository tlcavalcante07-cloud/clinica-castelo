import { useState } from 'react'
import styles from './Register.module.css'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import isValidEmail from '../../Validation'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Register() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [erro, setErro] = useState("")
    const navigate = useNavigate()

    function handleRegister(e: React.FormEvent) {
        e.preventDefault()

        if (!name) {
            setErro('Nome é obrigatório')
            return
        }

        if (!isValidEmail(email)) {
            setErro('Email inválido')
            return
        }

        if (password.length < 6) {
            setErro('Senha deve ter pelo menos 6 caracteres')
            return
        }

        setErro('')
        console.log({ name, email, password })
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

                <h1 className={styles.title}>Criar conta</h1>
                <p className={styles.subtitle}>
                    Cadastre-se para agendar sua consulta
                </p>

                <div className={styles.card}>
                    <div className={styles.avatar}>
                        <PersonOutlineIcon />
                    </div>

                    <form onSubmit={handleRegister} className={styles.form}>

                        {/* Nome */}
                        <div className={styles.inputGroup}>
                            <PersonOutlineIcon />
                            <input
                                type="text"
                                placeholder="Nome completo"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        {/* Email */}
                        <div className={styles.inputGroup}>
                            <MailOutlineIcon />
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Senha */}
                        <div className={styles.inputGroup}>
                            <LockOutlinedIcon />
                            <input
                                type="password"
                                placeholder="Senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {erro && <span className={styles.error}>{erro}</span>}

                        <button className={styles.registerBtn}>
                            Criar conta
                        </button>

                        <button
                            type="button"
                            className={styles.loginBtn}
                            onClick={() => navigate("/")}
                        >
                            Já tenho conta
                        </button>
                    </form>
                </div>
            </div>
        </motion.div>
    )
}