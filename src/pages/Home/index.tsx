// Home.tsx
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { storage } from '../../Service/StorageService'
import {
    CalendarToday as CalendarIcon,
    Schedule as ScheduleIcon,
    Logout as LogoutIcon,
    Person as PersonIcon,
    MedicalServices as MedicalIcon,
    ChevronRight as ChevronIcon,
    History as HistoryIcon,
    Receipt as ReceiptIcon,
    Favorite as FavoriteIcon
} from '@mui/icons-material'
import styles from './Home.module.css'

import type { Appointment } from '../../types/Appointment'

export default function Home() {
    const navigate = useNavigate()
    const [userName, setUserName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [nextAppointment, setNextAppointment] = useState<Appointment | null>(null)
    const [appointmentsCount, setAppointmentsCount] = useState(0)

    // Home.tsx - Atualizado
    useEffect(() => {
        // ✅ Usar storageService em vez de localStorage direto
        const user = storage.getPermanent("currentUser") || {}
        setUserName(user.name || "Usuário")
        setUserEmail(user.email || "")

        const appointments: Appointment[] = storage.getPermanent("appointments") || []

        const userAppointments = appointments.filter(
            a => a.userEmail === user.email && a.status === "Confirmado"
        )

        setAppointmentsCount(userAppointments.length)

        const sorted = userAppointments.sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        )

        if (sorted.length > 0) {
            setNextAppointment(sorted[0])
        }
    }, [])

    // Home.tsx
    const handleLogout = () => {
        storage.clearAll()
        navigate("/login")
    }

    const formatDate = (dateString: string) => {
        const [year, month, day] = dateString.split("-")
        return `${day}/${month}/${year}`
    }

    // Serviços disponíveis
    const services = [
        {
            id: 1,
            title: "Agendar consulta",
            description: "Marque sua próxima consulta médica",
            icon: <MedicalIcon />,
            path: "/makeappointment",
            color: "#0066cc"
        },
        {
            id: 2,
            title: "Meus agendamentos",
            description: `${appointmentsCount} consulta(s) agendada(s)`,
            icon: <ScheduleIcon />,
            path: "/appointments",
            color: "#10b981"
        },
        {
            id: 3,
            title: "Histórico médico",
            description: "Acesse seu prontuário e exames",
            icon: <HistoryIcon />,
            path: "/history",
            color: "#8b5cf6"
        },
        {
            id: 4,
            title: "Resultados de exames",
            description: "Visualize seus resultados",
            icon: <ReceiptIcon />,
            path: "/exams",
            color: "#f59e0b"
        },
        {
            id: 5,
            title: "Bem-estar",
            description: "Dicas e orientações de saúde",
            icon: <FavoriteIcon />,
            path: "/wellness",
            color: "#ec489a"
        }
    ]

    function formatName(userName) {
        return userName.split(' ')
            .map((x: any) => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase())
            .join(' ')
    }

    return (
        <div className={styles.container}>
            <div className={styles.background} />

            <div className={styles.content}>
                {/* Header */}
                <motion.div
                    className={styles.header}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className={styles.userInfo}>
                        <div className={styles.avatar}>
                            <PersonIcon />
                        </div>
                        <div className={styles.userText}>
                            <h2 className={styles.greeting}>Olá, {formatName(userName)}</h2>
                            <p className={styles.email}>{userEmail}</p>
                        </div>
                    </div>
                    <button className={styles.logoutButton} onClick={handleLogout}>
                        <LogoutIcon />
                    </button>
                </motion.div>

                {/* Cards de ações - Serviços */}
                <motion.div
                    className={styles.actionsGrid}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                >
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            className={styles.actionCard}
                            onClick={() => navigate(service.path)}
                            whileHover={{ scale: 1.02, x: 4 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <div className={styles.actionIcon} style={{ backgroundColor: `${service.color}15`, color: service.color }}>
                                {service.icon}
                            </div>
                            <div className={styles.actionInfo}>
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                            </div>
                            <ChevronIcon className={styles.chevron} />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Próxima consulta */}
                {/* {nextAppointment && (
                    <motion.div
                        className={styles.nextAppointment}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <div className={styles.sectionHeader}>
                            <CalendarIcon />
                            <h3>Próxima consulta</h3>
                        </div>
                        <div
                            className={styles.appointmentCard}
                            onClick={() => navigate("/appointments")}
                            style={{ cursor: "pointer" }}
                        >
                            <div className={styles.appointmentDate}>
                                <span className={styles.day}>
                                    {formatDate(nextAppointment.date).split("/")[0]}
                                </span>
                                <span className={styles.month}>
                                    {formatDate(nextAppointment.date).split("/")[1]}
                                </span>
                            </div>
                            <div className={styles.appointmentDetails}>
                                <p className={styles.appointmentTime}>
                                    {nextAppointment.time}h
                                </p>
                                <p className={styles.appointmentStatus}>
                                    {nextAppointment.status}
                                </p>
                            </div>
                            <ChevronIcon className={styles.chevronSmall} />
                        </div>
                    </motion.div>
                )} */}

                {/* Dica rápida */}
                <motion.div
                    className={styles.tip}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    <div className={styles.tipIcon}>💡</div>
                    <div className={styles.tipContent}>
                        <p className={styles.tipTitle}>Dica rápida</p>
                        <p className={styles.tipText}>
                            Chegue com 15 minutos de antecedência para evitar filas.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}