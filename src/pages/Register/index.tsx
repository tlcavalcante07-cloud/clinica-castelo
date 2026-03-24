// Register.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { storage } from '../../Service/StorageService'
import {
    PersonOutline as PersonIcon,
    MailOutline as MailIcon,
    LockOutlined as LockIcon,
    Visibility,
    VisibilityOff,
    ArrowBack as BackIcon
} from '@mui/icons-material'
import isValidEmail from '../../Utils'
import styles from './Register.module.css'

export interface User {
    name: string
    email: string
    password: string
}

export default function Register() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [erro, setErro] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    // Register.tsx
    function handleRegister(e: React.FormEvent) {
        e.preventDefault()
        setErro("")

        if (!name.trim()) {
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

        if (password !== confirmPassword) {
            setErro('As senhas não coincidem')
            return
        }

        setIsLoading(true)

        setTimeout(() => {
            const users = storage.getPermanent<User[]>("users") || []
            const userExists = users.some((u) => u.email === email)

            if (userExists) {
                setErro("Usuário já cadastrado")
                setIsLoading(false)
                return
            }

            const newUser = { name, email, password }

            // ✅ CORRETO - sem JSON.stringify extra
            storage.setPermanent("users", [...users, newUser])

            setIsLoading(false)
            navigate("/login")
        }, 800)
    }

    return (
        <div className={styles.container}>
            <div className={styles.background} />

            <div className={styles.content}>
                {/* Header com botão voltar */}
                <div className={styles.header}>
                    <button
                        className={styles.backButton}
                        onClick={() => navigate(-1)}
                    >
                        <BackIcon />
                    </button>
                </div>

                <div className={styles.wrapper}>
                    <motion.div
                        className={styles.brand}
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className={styles.logoIcon}>
                            <PersonIcon sx={{ fontSize: 32 }} />
                        </div>
                        <h1 className={styles.title}>Criar conta</h1>
                        <p className={styles.subtitle}>
                            Cadastre-se para agendar sua consulta
                        </p>
                    </motion.div>

                    <motion.div
                        className={styles.card}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <form onSubmit={handleRegister} className={styles.form}>
                            {/* Nome */}
                            <div className={styles.inputGroup}>
                                <PersonIcon className={styles.inputIcon} />
                                <input
                                    type="text"
                                    placeholder="Nome completo"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            {/* Email */}
                            <div className={styles.inputGroup}>
                                <MailIcon className={styles.inputIcon} />
                                <input
                                    type="email"
                                    placeholder="E-mail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            {/* Senha */}
                            <div className={styles.inputGroup}>
                                <LockIcon className={styles.inputIcon} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Senha"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className={styles.eyeButton}
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </button>
                            </div>

                            {/* Confirmar Senha */}
                            <div className={styles.inputGroup}>
                                <LockIcon className={styles.inputIcon} />
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirmar senha"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className={styles.eyeButton}
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </button>
                            </div>

                            {erro && <div className={styles.errorMessage}>{erro}</div>}

                            <button
                                type="submit"
                                className={styles.registerButton}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className={styles.spinner} />
                                ) : (
                                    "Criar conta"
                                )}
                            </button>

                            <div className={styles.divider}>
                                <span>ou</span>
                            </div>

                            <button
                                type="button"
                                className={styles.loginButton}
                                onClick={() => navigate("/login")}
                            >
                                Já tenho conta
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}