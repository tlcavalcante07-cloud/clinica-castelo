import { Navigate } from 'react-router-dom'

export default function PrivateRoute({ children }: any) {
    const isAuth = localStorage.getItem("isAuth")

    return isAuth ? children : <Navigate to="/login" />
}