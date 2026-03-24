export type AppointmentStatus = "confirmado" | "cancelado"

export interface Appointment {
    id: number
    date: string
    time: string
    status: AppointmentStatus
    userEmail?: string
    createdAt?: string
}

export interface User {
    name: string
    email: string
    password: string
}