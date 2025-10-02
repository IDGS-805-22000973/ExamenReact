import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Footer from './components/Footer'
import Header from './components/Header'
import MaquinasList from './components/MaquinasList'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <>
      {isLoggedIn && <Header isLoggedIn={isLoggedIn} />}

      <main>
        <Routes>
          <Route
            path="/"
            element={<Login onLogin={() => setIsLoggedIn(true)} />}
          />
          <Route
            path="/maquinas"
            element={<MaquinasList />}
          />
        </Routes>
      </main>

      {isLoggedIn && <Footer />}
    </>
  )
}

export default App