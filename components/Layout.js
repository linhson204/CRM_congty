import Header from './header/Header.js'
import Footer from './footer/Footer'

export default function Layout({ children, isLoggedIn }) {
  return (
    <>
      {!isLoggedIn && <Header />}
      {children}
      {!isLoggedIn && <Footer />}
    </>
  )
}
