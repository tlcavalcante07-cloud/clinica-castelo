import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { storage } from '../../Service/StorageService'
import {
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    Link,
    Paper,
    Container,
    Box,
    Typography,
    IconButton,
    InputAdornment,
    Alert,
    CircularProgress,
    Divider,
} from '@mui/material'
import {
    MailOutline as MailIcon,
    LockOutlined as LockIcon,
    Visibility,
    VisibilityOff,
    Favorite as HeartIcon,
    Shield as ShieldIcon,
} from '@mui/icons-material'
import styles from './Login.module.css'

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)
    const [erro, setErro] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    // Carregar dados salvos ao iniciar
    useState(() => {
        const savedEmail = localStorage.getItem("rememberedEmail")
        const savedPassword = localStorage.getItem("rememberedPassword")
        if (savedEmail && savedPassword) {
            setEmail(savedEmail)
            setPassword(savedPassword)
            setRememberMe(true)
        }
    })

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setErro("")

        setTimeout(() => {
            const users = storage.getUsers()
            const user = users.find(u => u.email === email && u.password === password)

            if (!user) {
                setErro("Email ou senha inválidos")
                setIsLoading(false)
                return
            }

            if (rememberMe) {
                storage.setRememberedCredentials(email, password)
            } else {
                storage.clearRememberedCredentials()
            }

            storage.setAuth(true)
            storage.setCurrentUser(user)

            setIsLoading(false)
            navigate("/home")
        }, 800)
    }

    useEffect(() => {
        const { email, password } = storage.getRememberedCredentials()
        if (email && password) {
            setEmail(email)
            setPassword(password)
            setRememberMe(true)
        }
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.background} />

            <Container maxWidth="sm" className={styles.wrapper}>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className={styles.brand}
                >
                    <Box className={styles.logoIcon}>
                        <HeartIcon sx={{ fontSize: 32 }} />
                    </Box>
                    <Typography variant="h4" component="h1" className={styles.title}>
                        Clínica Castelo
                    </Typography>
                    <Typography variant="body2" className={styles.subtitle}>
                        Sua saúde em boas mãos
                    </Typography>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Paper elevation={0} className={styles.card}>
                        <form onSubmit={handleLogin}>
                            <Box className={styles.form}>
                                <TextField
                                    fullWidth
                                    type="email"
                                    label="E-mail"
                                    variant="outlined"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    error={!!erro}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <MailIcon color="action" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <TextField
                                    fullWidth
                                    type={showPassword ? "text" : "password"}
                                    label="Senha"
                                    variant="outlined"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    error={!!erro}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockIcon color="action" />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                {erro && (
                                    <Alert severity="error" className={styles.alert}>
                                        {erro}
                                    </Alert>
                                )}

                                <Box className={styles.options}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={rememberMe}
                                                onChange={(e) => setRememberMe(e.target.checked)}
                                                size="small"
                                            />
                                        }
                                        label={
                                            <Typography variant="body2" sx={{ fontSize: "13px" }}>
                                                Lembrar de mim
                                            </Typography>
                                        }
                                    />
                                    <Link href="#" underline="hover" className={styles.forgotLink}>
                                        Esqueceu a senha?
                                    </Link>
                                </Box>

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    disabled={isLoading}
                                    className={styles.loginButton}
                                >
                                    {isLoading ? <CircularProgress size={24} /> : "Entrar"}
                                </Button>

                                <Divider className={styles.divider}>ou</Divider>

                                <Button
                                    type="button"
                                    fullWidth
                                    variant="outlined"
                                    size="large"
                                    onClick={() => navigate("/register")}
                                    className={styles.registerButton}
                                >
                                    Criar nova conta
                                </Button>
                            </Box>
                        </form>
                    </Paper>
                </motion.div>

                <Box className={styles.footer}>
                    <ShieldIcon sx={{ fontSize: 14 }} />
                    <Typography variant="caption">Dados protegidos conforme LGPD</Typography>
                </Box>
            </Container>
        </div>
    )
}