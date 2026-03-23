// Appointments.tsx
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { storage } from '../../Service/StorageService'
import {
    AccessTime as TimeIcon,
    Cancel as CancelIcon,
    ArrowBack as BackIcon,
    EventAvailable as EventIcon,
    EventBusy as EventBusyIcon,
    DeleteOutline as DeleteIcon
} from '@mui/icons-material'
import styles from './Appointments.module.css'

type Appointment = {
    id: number
    date: string
    time: string
    status: "confirmado" | "cancelado"
    createdAt?: string
}

export default function Appointments() {
    const [appointments, setAppointments] = useState<Appointment[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("appointments") || "[]")
        if (stored.length > 0) {
            setAppointments(stored)
        } else {
            setAppointments([])
        }
    }, [])

    const handleCancel = (id: number) => {
        if (window.confirm("Tem certeza que deseja cancelar esta consulta?")) {
            setIsLoading(true)
            setTimeout(() => {
                // ✅ Atualizar via storage
                const appointments = storage.getAppointments()
                const updated = appointments.map(a =>
                    a.id === id ? { ...a, status: "cancelado" } : a
                )
                storage.setAppointments(updated)

                setAppointments(updated)
                setIsLoading(false)
            }, 500)
        }
    }

    const handleDelete = (id: number) => {
        debugger
        if (window.confirm("Remover este agendamento da lista?")) {
            // ✅ Usar o método específico do storage
            storage.deleteAppointment(id)

            // Atualizar estado local
            setAppointments(prev => prev.filter(a => a.id !== id))
        }
    }

    const formatDate = (dateString: string | undefined) => {
        if (!dateString) return "Data inválida"
        try {
            const [year, month, day] = dateString.split("-")
            if (!year || !month || !day) return "Data inválida"
            const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
            return date.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            })
        } catch {
            return "Data inválida"
        }
    }

    const getDay = (dateString: string | undefined) => {
        if (!dateString) return "--"
        const formatted = formatDate(dateString)
        return formatted.split("/")[0] || "--"
    }

    const getMonth = (dateString: string | undefined) => {
        if (!dateString) return "---"
        const formatted = formatDate(dateString)
        return formatted.split("/")[1] || "---"
    }

    const confirmados = appointments.filter(a => a.status === "confirmado")
    const cancelados = appointments.filter(a => a.status === "cancelado")

    return (
        <div className={styles.container}>
            <div className={styles.background} />

            <div className={styles.content}>
                <div className={styles.header}>
                    <button className={styles.backButton} onClick={() => navigate("/home")}>
                        <BackIcon />
                    </button>
                    <h1 className={styles.title}>Meus Agendamentos</h1>
                    <div className={styles.placeholder} />
                </div>

                <div className={styles.stats}>
                    <div className={styles.statCard}>
                        <div className={styles.statIcon}><EventIcon /></div>
                        <div className={styles.statInfo}>
                            <span className={styles.statValue}>{confirmados.length}</span>
                            <span className={styles.statLabel}>Confirmados</span>
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statIcon}><EventBusyIcon /></div>
                        <div className={styles.statInfo}>
                            <span className={styles.statValue}>{cancelados.length}</span>
                            <span className={styles.statLabel}>Cancelados</span>
                        </div>
                    </div>
                </div>

                {appointments.length === 0 ? (
                    <motion.div
                        className={styles.emptyState}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className={styles.emptyIcon}>📅</div>
                        <p className={styles.emptyText}>Nenhum agendamento encontrado</p>
                        <button
                            className={styles.emptyButton}
                            onClick={() => navigate("/makeappointment")}
                        >
                            Agendar consulta
                        </button>
                    </motion.div>
                ) : (
                    <div className={styles.list}>
                        <AnimatePresence>
                            {appointments.map((item) => (
                                <motion.div
                                    key={item.id}  // ✅ USANDO ID ÚNICO
                                    className={`${styles.card} ${item.status === "cancelado" ? styles.cancelledCard : ""}`}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.3 }}
                                    layout  // ✅ Adicionado para animações suaves
                                >
                                    <div className={styles.cardContent}>
                                        <div className={styles.dateSection}>
                                            <div className={styles.dateDay}>
                                                {getDay(item.date)}
                                            </div>
                                            <div className={styles.dateMonth}>
                                                {getMonth(item.date)}
                                            </div>
                                        </div>

                                        <div className={styles.infoSection}>
                                            <div className={styles.appointmentTime}>
                                                <TimeIcon className={styles.timeIcon} />
                                                <span>{item.time}h</span>
                                            </div>
                                            <div className={styles.appointmentStatus}>
                                                <span className={
                                                    item.status === "confirmado"
                                                        ? styles.statusCancelled
                                                        : styles.statusConfirmed
                                                }>
                                                    {item.status === "confirmado" ? "✗ Cancelado" : "✓ Confirmado"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.cardActions}>
                                        {item.status === "confirmado" ? (
                                            <button
                                                className={styles.cancelButton}
                                                onClick={() => handleCancel(item.id)}
                                                disabled={isLoading}
                                            >
                                                <CancelIcon />
                                                Cancelar
                                            </button>
                                        ) : (
                                            <button
                                                className={styles.deleteButton}
                                                onClick={() => handleDelete(item.id)}
                                            >
                                                <DeleteIcon />
                                                Remover
                                            </button>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    )
}