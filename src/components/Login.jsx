import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login({ onLogin }) {


  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    console.log('Usuario:', username)
    console.log('Contraseña:', password)

    onLogin()

    navigate('/maquinas')
  }

  return (
    <div className="container-fluid vh-100 bg-light">
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-lg">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <h2 className="card-title text-secondary">
                  <i className="bi bi-box-arrow-in-right me-2"></i>
                  Bienvenido al GYM UTl
                </h2>
              </div>
              <div className="text-center mb-4">

              </div>
              <form onSubmit={handleLogin}>

                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    <i className="bi bi-person me-2"></i>Usuario
                  </label>
                  <input
                    id="username"
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    <i className="bi bi-lock me-2"></i>Contraseña
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Constraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                  >
                    <i className="bi bi-box-arrow-in-right me-2"></i>
                    Entrar
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login