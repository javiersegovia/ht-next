import { useState } from 'react'
import { useQuery } from 'react-query'
import Navbar from 'components/Layout/Navbar'
import Wrapper from 'components/Layout/Wrapper'
import Link from 'next/link'

const RegisterPage = () => {
  const [formState, setFormState] = useState({})

  const loginRequest = () => {
    if (!formState.email || !formState.password) {
      alert('Email and password is needed')
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    loginRequest()
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  return (
    <>
      <Navbar />
      <Wrapper>
        <section className="Login">
          <form onSubmit={handleSubmit} className="Login__wrapper">
            <label htmlFor="email" className="Login__inputLabel">
              Email
              <input
                type="email"
                name="email"
                id="email"
                className="Login__inputEmail"
                onChange={handleChange}
              />
            </label>
            <label htmlFor="password" className="Login__inputLabel">
              Password
              <input
                type="password"
                id="password"
                name="password"
                className="Login__inputPassword"
                onChange={handleChange}
              />
            </label>
            <button type="submit" className="Login__submitButton">
              Registrarme
            </button>
          </form>
          <Link href="/login">
            <a className="Login__linkButton">... o inicia sesión</a>
          </Link>
        </section>
      </Wrapper>
    </>
  )
}

export default RegisterPage
