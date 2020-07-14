import React from 'react'
import useAuth from 'hooks/useAuth'
import Link from 'next/link'

const IsAuthenticated = ({ children }) => {
  const { isAuthenticated } = useAuth()

  return isAuthenticated ? (
    children
  ) : (
    <div>
      <h3>Debes estar autenticado para acceder a esto.</h3>
      <Link href="/login">
        <a>Inicia sesión</a>
      </Link>
    </div>
  )
}

export default IsAuthenticated
