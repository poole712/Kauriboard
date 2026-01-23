import { useState } from 'react'
import { login } from '../services/authService'
import { useNavigate } from 'react-router'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate()

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const response = await login(email, password)

    if (response.ok) {
      localStorage.setItem('token', response.data.token)
      console.log('Login successful:', response.data)
      navigate('/')
    } else {
      console.error('Login failed:', response.error)
      setError(response.error || 'Login failed')
    }
  }

  return (
    <>
      <h1>Login Page</h1>
      <form className="w-50 mx-auto m-5 vh-100">
        <div className="mb-3 ">
          <label htmlFor="email" className="form-label float-start">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={e => setEmail(e.target.value)}
            id="email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label float-start">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={e => setPassword(e.target.value)}
            id="password"
          />
        </div>
        <p className="text-danger" id="error-message">
          {error}
        </p>
        <button type="submit" onClick={handleSubmit} className="btn btn-primary">
          Login
        </button>
        <button type="button" onClick={() => navigate('/pages/Register')} className="btn btn-link">
          Register
        </button>
      </form>
    </>
  )
}

export default LoginPage
