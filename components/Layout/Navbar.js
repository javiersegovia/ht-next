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
    </div>
  )
}

export default Navbar
