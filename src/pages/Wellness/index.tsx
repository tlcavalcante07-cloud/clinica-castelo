// pages/Wellness/Wellness.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
    ArrowBack as BackIcon,
    Favorite as FavoriteIcon,
    SelfImprovement as MeditationIcon,
    DirectionsRun as ExerciseIcon,
    Restaurant as NutritionIcon,
    Bedtime as SleepIcon,
    WaterDrop as HydrationIcon,
    Psychology as MentalIcon,
    ChevronRight as ChevronIcon
} from '@mui/icons-material'
import styles from './Wellness.module.css'

interface Tip {
    id: number
    title: string
    description: string
    icon: JSX.Element
    color: string
    category: string
}

export default function Wellness() {
    const navigate = useNavigate()
    const [selectedCategory, setSelectedCategory] = useState<string>("todos")

    const tips: Tip[] = [
        {
            id: 1,
            title: "Beba água regularmente",
            description: "Manter-se hidratado melhora a concentração e a disposição.",
            icon: <HydrationIcon />,
            color: "#3b82f6",
            category: "nutrição"
        },
        {
            id: 2,
            title: "Pratique meditação",
            description: "5 minutos de meditação por dia reduzem o estresse e a ansiedade.",
            icon: <MeditationIcon />,
            color: "#8b5cf6",
            category: "mental"
        },
        {
            id: 3,
            title: "Alimentação balanceada",
            description: "Uma dieta rica em frutas e vegetais fortalece o sistema imunológico.",
            icon: <NutritionIcon />,
            color: "#10b981",
            category: "nutrição"
        },
        {
            id: 4,
            title: "Durma bem",
            description: "7 a 8 horas de sono são essenciais para a recuperação do corpo.",
            icon: <SleepIcon />,
            color: "#6366f1",
            category: "sono"
        },
        {
            id: 5,
            title: "Atividade física",
            description: "30 minutos de caminhada diária melhoram a saúde cardiovascular.",
            icon: <ExerciseIcon />,
            color: "#f59e0b",
            category: "exercício"
        },
        {
            id: 6,
            title: "Saúde mental",
            description: "Conversar sobre sentimentos é fundamental para o bem-estar emocional.",
            icon: <MentalIcon />,
            color: "#ec489a",
            category: "mental"
        }
    ]

    const categories = [
        { id: "todos", label: "Todos", icon: <FavoriteIcon /> },
        { id: "mental", label: "Saúde Mental", icon: <MentalIcon /> },
        { id: "nutrição", label: "Nutrição", icon: <NutritionIcon /> },
        { id: "exercício", label: "Exercícios", icon: <ExerciseIcon /> },
        { id: "sono", label: "Sono", icon: <SleepIcon /> }
    ]

    const filteredTips = selectedCategory === "todos"
        ? tips
        : tips.filter(tip => tip.category === selectedCategory)

    return (
        <div className={styles.container}>
            <div className={styles.background} />

            <div className={styles.content}>
                {/* Header */}
                <div className={styles.header}>
                    <button className={styles.backButton} onClick={() => navigate(-1)}>
                        <BackIcon />
                    </button>
                    <h1 className={styles.title}>Bem-estar</h1>
                    <div className={styles.placeholder} />
                </div>

                {/* Hero Section */}
                <motion.div
                    className={styles.hero}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className={styles.heroIcon}>
                        <FavoriteIcon sx={{ fontSize: 48 }} />
                    </div>
                    <h2 className={styles.heroTitle}>Cuide de você</h2>
                    <p className={styles.heroText}>
                        Pequenas mudanças no dia a dia fazem toda diferença para sua saúde e qualidade de vida.
                    </p>
                </motion.div>

                {/* Categories */}
                <motion.div
                    className={styles.categories}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                >
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            className={`${styles.categoryButton} ${selectedCategory === cat.id ? styles.active : ""}`}
                            onClick={() => setSelectedCategory(cat.id)}
                        >
                            <span className={styles.categoryIcon}>{cat.icon}</span>
                            <span className={styles.categoryLabel}>{cat.label}</span>
                        </button>
                    ))}
                </motion.div>

                {/* Tips Grid */}
                <motion.div
                    className={styles.tipsGrid}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    {filteredTips.map((tip, index) => (
                        <motion.div
                            key={tip.id}
                            className={styles.tipCard}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ y: -4 }}
                        >
                            <div className={styles.tipIcon} style={{ backgroundColor: `${tip.color}15`, color: tip.color }}>
                                {tip.icon}
                            </div>
                            <div className={styles.tipContent}>
                                <h3 className={styles.tipTitle}>{tip.title}</h3>
                                <p className={styles.tipDescription}>{tip.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Quote Section */}
                <motion.div
                    className={styles.quote}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <p className={styles.quoteText}>
                        A saúde é um estado de completo bem-estar físico, mental e social, e não apenas a ausência de doença.
                    </p>
                    <p className={styles.quoteAuthor}>— Organização Mundial da Saúde</p>
                </motion.div>
            </div>
        </div>
    )
}