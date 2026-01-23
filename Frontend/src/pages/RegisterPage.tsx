import { useState } from 'react'
import { register } from '../services/authService'
import { useNavigate } from 'react-router'

function RegisterPage() {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        const response = await register(email, username, password);

        if(response.ok) {
            console.log('Registration successful:', response.data);
            navigate('/pages/LoginPage');
        } else {
            console.error('Registration failed:', response.error);
            setError(response.error || 'Registration failed');
        }
    }

  return (
    <>
      <h1>Register Page</h1>
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
        <div className="mb-3 ">
          <label htmlFor="username" className="form-label float-start">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={e => setUsername(e.target.value)}
            id="username"
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
          Register
        </button>
        <button type="button" onClick={() => navigate('/pages/LoginPage')} className="btn btn-link">
          Login
        </button>
      </form>
    </>
  )
}

export default RegisterPage
