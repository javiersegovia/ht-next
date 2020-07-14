import React from 'react'
import Link from 'next/link'
import useAuth from 'hooks/useAuth'

const Navbar = (props) => {
  const { user, isAuthenticated, logout } = useAuth()

  return (
    <div className="Navbar">
      <div className="Navbar__mainContent">
        <Link href="/">
          <a className="Navbar__linkItem">Home</a>
        </Link>
        <Link href="/vacancies">
          <a className="Navbar__linkItem">Vacantes</a>
        </Link>
        <Link href="/vacancies/sample">
          <a className="Navbar__linkItem">Sample</a>
        </Link>
      </div>
      <div className="Navbar__userInfo">
        {!isAuthenticated ? (
          <>
            <Link href="/login">
              <a className="Navbar__linkItem">Login</a>
            </Link>
            <Link href="/register">
              <a className="Navbar__linkItem">Register</a>
            </Link>
          </>
        ) : (
          <>
            <p className="Navbar__userName">Javier Segovia</p>
            <button type="button" className="Navbar__linkItem" onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Navbar
