import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/authProvider'
export const Register = ({ children }) => {
    const { token } = useAuth()
    return (
        <>
            <nav className="flex flex--center">
                {token ? (
                    <h1 className="mt-4">You are Already Logged In</h1>
                ) : (
                    <ul className="NavLogin flex flex--center bg-blue-200">
                        <li className="NavLogin-item">
                            <NavLink className="btn btn-primary" to="/login">Login</NavLink>
                        </li>
                        <li className="NavLogin-item ml-1">
                            <NavLink className="btn btn-primary" to="/sign-up">SignUp</NavLink>
                        </li>
                    </ul>
                )}
            </nav>
            {!token && children}
        </>
    )
}
