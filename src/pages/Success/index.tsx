// Success.tsx
import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'  // ✅ Adicionar useLocation
import { motion } from 'framer-motion'
import { CheckCircle as CheckIcon, CalendarToday as CalendarIcon, AccessTime as TimeIcon } from '@mui/icons-material'
import styles from './Success.module.css'

export default function Success() {
    const navigate = useNavigate()
    const location = useLocation()  // ✅ Pegar os dados passados
    
    // ✅ Pegar os dados da consulta do state
    const appointment = location.state?.appointment
    
    // ✅ Formatar a data corretamente
    const formatDate = (dateString: string) => {
        const [year, month, day] = dateString.split("-")
        const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })
    }

    // Se não tiver dados, redirecionar
    useEffect(() => {
        if (!appointment) {
            // Se veio sem dados, redirecionar para home
            navigate("/home")
        }
    }, [appointment, navigate])

    if (!appointment) {
        return null  // Ou um loading
    }

    return (
        <div className={styles.container}>
            <div className={styles.background} />

            <div className={styles.content}>
                <motion.div
                    className={styles.card}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Ícone de sucesso animado */}
                    <motion.div
                        className={styles.iconWrapper}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    >
                        <motion.div
                            className={styles.circle}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.3 }}
                        >
                            <CheckIcon className={styles.checkIcon} />
                        </motion.div>
                    </motion.div>

                    {/* Título */}
                    <motion.h1
                        className={styles.title}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        Agendamento confirmado!
                    </motion.h1>

                    {/* Mensagem principal */}
                    <motion.p
                        className={styles.message}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        Sua consulta foi agendada com sucesso.
                    </motion.p>

                    {/* Card de resumo com dados reais */}
                    <motion.div
                        className={styles.summary}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                    >
                        <div className={styles.summaryItem}>
                            <CalendarIcon className={styles.summaryIcon} />
                            <div className={styles.summaryInfo}>
                                <span className={styles.summaryLabel}>Data</span>
                                <span className={styles.summaryValue}>
                                    {formatDate(appointment.date)}
                                </span>
                            </div>
                        </div>
                        <div className={styles.divider} />
                        <div className={styles.summaryItem}>
                            <TimeIcon className={styles.summaryIcon} />
                            <div className={styles.summaryInfo}>
                                <span className={styles.summaryLabel}>Horário</span>
                                <span className={styles.summaryValue}>
                                    {appointment.time}h
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Informações adicionais */}
                    <motion.div
                        className={styles.info}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9, duration: 0.5 }}
                    >
                        <p className={styles.infoText}>
                            📋 Você receberá um lembrete por e-mail 24h antes.
                        </p>
                        <p className={styles.infoText}>
                            💡 Chegue com 15 minutos de antecedência.
                        </p>
                    </motion.div>

                    {/* Botão manual (fallback) */}
                    <motion.button
                        className={styles.button}
                        onClick={() => navigate("/appointments")}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.3, duration: 0.5 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Ver meus agendamentos
                    </motion.button>
                </motion.div>
            </div>
        </div>
    )
}