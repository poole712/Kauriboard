import { useState } from 'react'
import { login } from '../services/authService'
import { useNavigate } from 'react-router'
import GoogleButton from '../components/GoogleButton'
import { Toast } from 'bootstrap'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate()

  const toast = document.getElementById('toast')
  const loadingToast = Toast.getOrCreateInstance(toast!)

  function showToast() {
    loadingToast.show();
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    showToast()
    const response = await login(email, password)
    if (response.ok) {
      localStorage.setItem('token', response.data.token)
      console.log('Login successful:', response.data)
      navigate('/')
    } else {
      console.error('Login failed:', response.error)
      loadingToast.hide();
      setError(response.error || 'Login failed')
    }
  }

  return (
    <>
      <div className='vh-100 mb-5'>
        <h1 className="mt-5">Login Page</h1>
        <form className="w-50 mx-auto m-5">
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
          <div className="d-flex align-items-center justify-content-center">
            <button type="submit" onClick={handleSubmit} className="btn btn-primary">
              Login
            </button>
            <GoogleButton showToast={showToast}/>
          </div>
          <button type="button" onClick={() => navigate('/pages/Register')} className="btn btn-link">
            Register
          </button>
        </form>
        <div
          className="toast mx-5 float-end align-bottom"
          role="alert"
          id="toast"
          aria-live="assertive"
          aria-atomic="true"
          data-bs-delay="30000"
        >
          <div className="toast-header">
            <img src="/loading.webp" className="rounded m-0" style={{width: "10%"}} alt="..." />
            <strong className="me-auto">Login</strong>
            <small>now</small>
            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div className="toast-body">Logging in please wait...</div>
        </div>
      </div>
    </>
  )
}

export default LoginPage
