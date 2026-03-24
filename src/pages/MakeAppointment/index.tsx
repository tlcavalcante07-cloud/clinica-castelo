// MakeAppointment.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { storage } from '../../Service/StorageService'
import {
    CalendarToday as CalendarIcon,
    AccessTime as TimeIcon,
    CheckCircle as CheckIcon,
    ArrowBack as BackIcon
} from '@mui/icons-material'
import styles from './MakeAppointment.module.css'

export default function MakeAppointment() {
    const [date, setDate] = useState("")
    const [selectedTime, setSelectedTime] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const navigate = useNavigate()

    const times = [
        "08:00", "09:00", "10:00",
        "11:00", "14:00", "15:00", "16:00"
    ]

    const handleSubmit = async () => {
        if (!date || !selectedTime) {
            alert("Selecione data e horário")
            return
        }

        setIsSubmitting(true)

        await new Promise(resolve => setTimeout(resolve, 1000))

        const user = storage.getPermanent<{ name: string; email: string }>("currentUser") || { name: "", email: "" }

        const newAppointment = {
            id: Date.now(),
            date,
            time: selectedTime,
            status: "Confirmado",
            userEmail: user?.email,
            createdAt: new Date().toISOString()
        }

        // Salvar no storage
        const appointments = storage.getAppointments()
        storage.setAppointments([...appointments, newAppointment])

        setIsSubmitting(false)

        // ✅ Passar os dados da consulta para a página de sucesso
        navigate("/success", {
            state: {
                appointment: newAppointment
            }
        })
    }

    // Formatar data para exibição
    const formatDate = (dateString: string) => {
        if (!dateString) return ""
        const [year, month, day] = dateString.split("-")
        return `${day}/${month}/${year}`
    }

    return (
        <div className={styles.container}>
            <div className={styles.background} />

            <motion.div
                className={styles.content}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
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
                    {/* Logo e título */}
                    <motion.div
                        className={styles.brand}
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className={styles.logoIcon}>
                            <CalendarIcon sx={{ fontSize: 32 }} />
                        </div>
                        <h1 className={styles.title}>Clínica Castelo</h1>
                        <p className={styles.subtitle}>
                            Agende sua consulta de forma rápida e segura
                        </p>
                    </motion.div>

                    {/* Formulário */}
                    <motion.div
                        className={styles.card}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        {/* Data */}
                        <div className={styles.field}>
                            <label className={styles.label}>
                                <CalendarIcon className={styles.labelIcon} />
                                Data da consulta
                            </label>
                            <div className={styles.dateInputWrapper}>
                                <input
                                    type="date"
                                    className={styles.dateInput}
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    min={new Date().toISOString().split("T")[0]}
                                />
                                {date && (
                                    <span className={styles.datePreview}>
                                        {formatDate(date)}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Horários */}
                        <div className={styles.field}>
                            <label className={styles.label}>
                                <TimeIcon className={styles.labelIcon} />
                                Horário disponível
                            </label>
                            <div className={styles.timesGrid}>
                                {times.map((time) => (
                                    <motion.button
                                        key={time}
                                        className={`${styles.timeButton} ${selectedTime === time ? styles.active : ""}`}
                                        onClick={() => setSelectedTime(time)}
                                        whileTap={{ scale: 0.97 }}
                                    >
                                        {time}
                                        {selectedTime === time && (
                                            <CheckIcon className={styles.checkIcon} />
                                        )}
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Resumo do agendamento */}
                        {(date || selectedTime) && (
                            <motion.div
                                className={styles.summary}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className={styles.summaryTitle}>Resumo do agendamento</div>
                                <div className={styles.summaryItem}>
                                    <span>Data:</span>
                                    <strong>{formatDate(date) || "—"}</strong>
                                </div>
                                <div className={styles.summaryItem}>
                                    <span>Horário:</span>
                                    <strong>{selectedTime || "—"}</strong>
                                </div>
                            </motion.div>
                        )}

                        {/* Botão confirmar */}
                        <button
                            className={styles.confirmButton}
                            onClick={handleSubmit}
                            disabled={!date || !selectedTime || isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className={styles.spinner} />
                                    Confirmando...
                                </>
                            ) : (
                                "Confirmar agendamento"
                            )}
                        </button>

                        {/* Informação adicional */}
                        <p className={styles.info}>
                            ⏱️ Atendimento com duração média de 30 minutos
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    )
}