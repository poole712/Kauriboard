import { Link, useNavigate } from 'react-router'

function Navbar() {

  const navigator = useNavigate();

  return (
    <>
      <nav className="navbar align-self-start p-3 justify-content-start">
        <Link className="navbar-brand" to="/">
          KauriBoard
        </Link>
        <div className='navlinks d-flex flex-fill justify-content-end'>
          <Link className="nav-link" to="/pages/Projects">
            Projects
          </Link>
          <Link className="nav-link" to="/pages/Login">
            Login
          </Link>
          <button className='nav-link' onClick={() => {
            localStorage.removeItem("token");
            navigator('/pages/Login')
          }}>
            Logout
          </button>
        </div>
      </nav>
    </>
  )
}

export default Navbar
