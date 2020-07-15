import React, { createContext, useState } from 'react'
import { useMutation } from 'react-query'
import axios from 'axios'

const signUpEndpoint = 'http://localhost:3000/api/signup'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    isAuthenticated: false,
  })

  const createUserRequest = async ({ email, password }) => {
    const data = await axios.post(signUpEndpoint, {
      email,
      password,
    })

    return data
  }

  const [createUser] = useMutation(createUserRequest)

  const login = ({ email, password }) => {
    alert('login')
  }

  const register = async ({ email, password }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    try {
      const {
        data: { token },
      } = await createUser({ email, password })
    } catch (e) {
      console.error(e)
    }
  }

  const logout = () => {
    alert('loggin out')
  }

  return (
    <AuthContext.Provider value={{ ...authState, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
