import { motion } from 'framer-motion'
import styles from './Logo.module.css'

interface LogoProps {
    size?: number
    animated?: boolean
    variant?: 'icon' | 'full' | 'compact'
}

export default function Logo({ size = 48, animated = true, variant = 'full' }: LogoProps) {
    const iconOnly = (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="gradLogo" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0066cc" />
                    <stop offset="100%" stopColor="#0052a3" />
                </linearGradient>

                <linearGradient id="gradGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#e8b86b" />
                    <stop offset="100%" stopColor="#c9771e" />
                </linearGradient>

                <filter id="shadow" x="-0.2" y="-0.2" width="1.4" height="1.4">
                    <feDropShadow dx="2" dy="4" stdDeviation="2" floodOpacity="0.15" />
                </filter>

                <filter id="glow">
                    <feGaussianBlur stdDeviation="1" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Anel externo */}
            <circle cx="50" cy="50" r="46" fill="none" stroke="url(#gradLogo)" strokeWidth="2" strokeOpacity="0.3" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="url(#gradGold)" strokeWidth="1.5" strokeDasharray="3 3" />

            <circle cx="50" cy="50" r="32" fill="url(#gradLogo)" filter="url(#shadow)" />

            <path
                d="M50 68s-12-7-12-18c0-5 4-9 9-9 3 0 5 2 6 4 1-2 3-4 6-4 5 0 9 4 9 9 0 11-12 18-12 18z"
                fill="white"
            />

            <path
                d="M40 52 L44 52 L47 48 L50 56 L53 50 L56 52 L60 52"
                stroke="#0066cc"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            <path
                d="M50 48 L50 52 M48 50 L52 50"
                stroke="url(#gradGold)"
                strokeWidth="2.5"
                strokeLinecap="round"
                filter="url(#glow)"
            />

            <circle cx="50" cy="50" r="22" fill="none" stroke="white" strokeWidth="1" opacity="0.3" />

            <circle cx="70" cy="30" r="2" fill="url(#gradGold)" opacity="0.5" />
            <circle cx="30" cy="70" r="1.5" fill="url(#gradGold)" opacity="0.4" />
        </svg>
    )

    const compact = (
        <div className={styles.compactContainer}>
            <div className={styles.compactIcon}>
                {iconOnly}
            </div>
            <div className={styles.compactText}>
                <h1 className={styles.compactTitle}>Dra. Selena Castelo</h1>
            </div>
        </div>
    )

    const full = (
        <div className={styles.logoContainer}>
            <div className={styles.iconWrapper}>
                {iconOnly}
            </div>
            <div className={styles.textContainer}>
                <h1 className={styles.logoTitle}>Dra. Selena Castelo</h1>
                <p className={styles.logoSubtitle}>Clínica Médica</p>
            </div>
        </div>
    )

    const content = variant === 'icon' ? iconOnly : variant === 'compact' ? compact : full

    if (animated && variant === 'icon') {
        return (
            <motion.div
                initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
            >
                {content}
            </motion.div>
        )
    }

    return content
}