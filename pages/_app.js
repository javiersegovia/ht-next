import AuthProvider from '../context/AuthProvider'
import '../scss/main.scss'

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
