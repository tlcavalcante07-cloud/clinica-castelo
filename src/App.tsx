import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Login from './pages/Login'
import Register from './pages/Register'
import Welcome from './pages/Welcome'
import Appointments from './pages/Appointments'
import MakeAppointment from './pages/MakeAppointment'
import Success from './pages/Success'
import PrivateRoute from './components/PrivateRoute'
import Home from './pages/Home'
import Wellness from './pages/Wellness'
import { Toaster } from 'sonner'

function App() {
  const location = useLocation()
  const isAuth = localStorage.getItem("isAuth") === "true"
  return (
    <>
      <Toaster position="top-right" richColors closeButton />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={isAuth ? <Navigate to="/home" replace /> : <Navigate to="/welcome" replace />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>} />
          <Route path="/makeappointment" element={
            <PrivateRoute>
              <MakeAppointment />
            </PrivateRoute>} />
          <Route path="/success" element={<Success />} />
          <Route path="/appointments" element={
            <PrivateRoute>
              <Appointments />
            </PrivateRoute>} />
          <Route path="/wellness" element={<PrivateRoute>
            <Wellness />
          </PrivateRoute>} />
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default App
