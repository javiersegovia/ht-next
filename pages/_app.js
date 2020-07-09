// import { Provider } from 'react-redux'
// import store from '../store'
import '../scss/main.scss'

// <Provider store={store}>
//   <Component {...pageProps} />
// </Provider>

const MyApp = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default MyApp
