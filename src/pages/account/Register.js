import { NavLink } from 'react-router-dom'
export const Register = ({ children }) => {

    return (
        <>
            <nav className="flex flex--center">
                <ul className="NavLogin flex flex--center bg-blue-200">
                    <li className="NavLogin-item">
                        <NavLink className="btn btn-primary" to="/login">Login</NavLink>
                    </li>
                    <li className="NavLogin-item ml-1">
                        <NavLink className="btn btn-primary" to="/sign-up">SignUp</NavLink>
                    </li>
                </ul>
            </nav>
            {children}
        </>
    )
}
