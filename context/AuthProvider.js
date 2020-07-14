import React, { createContext, useState } from 'react'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    isAuthenticated: false,
  })

  const logout = () => {
    alert('loggin out')
  }

  return (
    <AuthContext.Provider value={{ ...authState, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
