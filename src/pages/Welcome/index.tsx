// Welcome.tsx
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
    LocalHospital as HospitalIcon,
    Favorite as HeartIcon,
    Schedule as ScheduleIcon,
    Security as SecurityIcon
} from '@mui/icons-material'
import styles from './Welcome.module.css'

export default function Welcome() {
    const navigate = useNavigate()

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/login")
        }, 4000)

        return () => clearTimeout(timer)
    }, [navigate])

    return (
        <div className={styles.container}>
            <div className={styles.background} />

            <motion.div
                className={styles.content}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                {/* Logo e título */}
                <motion.div
                    className={styles.logoSection}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <div className={styles.logoIcon}>
                        <HospitalIcon sx={{ fontSize: 40 }} />
                    </div>
                    <h1 className={styles.title}>Bem-vindo(a) à Clínica Castelo</h1>
                    <p className={styles.subtitle}>
                        Cuidado que transforma vidas
                    </p>
                </motion.div>

                {/* Cards de características */}
                <motion.div
                    className={styles.features}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    <div className={styles.featureCard}>
                        <div className={styles.featureIcon}>
                            <ScheduleIcon />
                        </div>
                        <span>Agendamento rápido</span>
                    </div>
                    <div className={styles.featureCard}>
                        <div className={styles.featureIcon}>
                            <HeartIcon />
                        </div>
                        <span>Atendimento humanizado</span>
                    </div>
                    <div className={styles.featureCard}>
                        <div className={styles.featureIcon}>
                            <SecurityIcon />
                        </div>
                        <span>Dados protegidos</span>
                    </div>
                </motion.div>

                {/* Loading animado */}
                <motion.div
                    className={styles.loadingContainer}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                >
                    <div className={styles.loadingWrapper}>
                        <motion.div
                            className={styles.loadingBar}
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 4, ease: "easeInOut" }}
                        />
                    </div>
                    <p className={styles.loadingText}>
                        Carregando sua experiência...
                    </p>
                </motion.div>

                {/* Versão */}
                <motion.p
                    className={styles.version}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    v2.0 • Segurança e confiança
                </motion.p>
            </motion.div>
        </div>
    )
}