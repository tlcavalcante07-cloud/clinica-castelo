import type { Appointment } from '../types/Appointment'

type User = {
    name: string
    email: string
    password: string
}

class StorageService {
    // Chaves padronizadas
    private readonly APPOINTMENTS_KEY = "appointments"
    private readonly USERS_KEY = "users"
    private readonly CURRENT_USER_KEY = "currentUser"
    private readonly IS_AUTH_KEY = "isAuth"
    private readonly REMEMBERED_EMAIL_KEY = "rememberedEmail"
    private readonly REMEMBERED_PASSWORD_KEY = "rememberedPassword"

    // ========== MÉTODOS GERAIS ==========

    setPermanent<T>(key: string, value: T): void {
        localStorage.setItem(key, JSON.stringify(value))
    }

    getPermanent<T>(key: string): T | null {
        const data = localStorage.getItem(key)
        return data ? JSON.parse(data) : null
    }

    removePermanent(key: string): void {
        localStorage.removeItem(key)
    }

    // ========== MÉTODOS ESPECÍFICOS PARA USUÁRIOS ==========

    getUsers(): User[] {
        return this.getPermanent<User[]>(this.USERS_KEY) || []
    }

    setUsers(users: User[]): void {
        this.setPermanent(this.USERS_KEY, users)
    }

    addUser(user: User): void {
        const users = this.getUsers()
        users.push(user)
        this.setUsers(users)
    }

    findUser(email: string): User | undefined {
        const users = this.getUsers()
        return users.find(u => u.email === email)
    }

    // ========== MÉTODOS ESPECÍFICOS PARA AGENDAMENTOS ==========

    getAppointments(): Appointment[] {
        return this.getPermanent<Appointment[]>(this.APPOINTMENTS_KEY) || []
    }

    setAppointments(appointments: Appointment[]): void {
        this.setPermanent(this.APPOINTMENTS_KEY, appointments)
    }

    addAppointment(appointment: Appointment): void {
        const appointments = this.getAppointments()
        appointments.push(appointment)
        this.setAppointments(appointments)
    }

    updateAppointment(id: number, updates: Partial<Appointment>): void {
        const appointments = this.getAppointments()
        const index = appointments.findIndex(a => a.id === id)
        if (index !== -1) {
            appointments[index] = { ...appointments[index], ...updates }
            this.setAppointments(appointments)
        }
    }

    deleteAppointment(id: number): void {
        const appointments = this.getAppointments()
        const filtered = appointments.filter(a => a.id !== id)
        this.setAppointments(filtered)
    }

    getUserAppointments(userEmail: string): Appointment[] {
        const appointments = this.getAppointments()
        return appointments.filter(a => a.userEmail === userEmail)
    }

    // ========== MÉTODOS ESPECÍFICOS PARA AUTENTICAÇÃO ==========

    setAuth(isAuth: boolean): void {
        this.setPermanent(this.IS_AUTH_KEY, isAuth)
    }

    isAuthenticated(): boolean {
        return this.getPermanent<boolean>(this.IS_AUTH_KEY) || false
    }

    setCurrentUser(user: User): void {
        this.setPermanent(this.CURRENT_USER_KEY, user)
    }

    getCurrentUser(): User | null {
        return this.getPermanent<User>(this.CURRENT_USER_KEY)
    }

    setRememberedCredentials(email: string, password: string): void {
        this.setPermanent(this.REMEMBERED_EMAIL_KEY, email)
        this.setPermanent(this.REMEMBERED_PASSWORD_KEY, password)
    }

    getRememberedCredentials(): { email: string | null; password: string | null } {
        return {
            email: this.getPermanent<string>(this.REMEMBERED_EMAIL_KEY),
            password: this.getPermanent<string>(this.REMEMBERED_PASSWORD_KEY)
        }
    }

    clearRememberedCredentials(): void {
        this.removePermanent(this.REMEMBERED_EMAIL_KEY)
        this.removePermanent(this.REMEMBERED_PASSWORD_KEY)
    }

    // ========== LIMPEZA ==========

    clearSession(): void {
        this.removePermanent(this.IS_AUTH_KEY)
        this.removePermanent(this.CURRENT_USER_KEY)
    }

    clearAll(): void {
        this.clearSession()
        this.clearRememberedCredentials()
        sessionStorage.clear()
    }
}

export const storage = new StorageService()