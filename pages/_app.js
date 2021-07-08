import { render } from 'react-dom'
import 'tailwindcss/tailwind.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />

}

export default MyApp
