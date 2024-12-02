import React from 'react'
import { Routes } from 'react-router-dom'

export const Auth = () => {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="auth/register" element={<RegisterScreen />} />
            <Route path="auth/login" element={<LoginScreen />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
