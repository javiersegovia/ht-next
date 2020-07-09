import React from 'react'
import Link from 'next/link'

const Navbar = (props) => {
  return (
    <div className="Navbar">
      <Link href="/">
        <a className="Navbar__linkItem">Home</a>
      </Link>
      <Link href="/vacancies">
        <a className="Navbar__linkItem">Vacantes</a>
      </Link>
      <Link href="/vacancies/active">
        <a className="Navbar__linkItem">Vacantes activas</a>
      </Link>
      <Link href="/vacancies/inactive">
        <a className="Navbar__linkItem">Vacantes inactivas</a>
      </Link>
      <Link href="/vacancies/deleted">
        <a className="Navbar__linkItem">Vacantes eliminadas</a>
      </Link>
    </div>
  )
}

export default Navbar
