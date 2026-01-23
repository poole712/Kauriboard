import { Link } from "react-router";


function Navbar() {
    return (
        <>
            <nav className="navbar align-self-start p-3">
                <Link className="navbar-brand" to="/">KauriTree</Link>
                <Link className="nav-link" to="/pages/LoginPage">Login</Link>
            </nav>
        </>
    )
}

export default Navbar;