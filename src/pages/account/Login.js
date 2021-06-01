import { useState } from 'react';
import {useAuth} from '../../context/authProvider'
export const Login = () => {
    const [userInput, setUserInput] = useState({})
    const {handleLogin} = useAuth()
    return <div className="Login flex flex--center">
        <div className="Login-card card flex flex--column flex--align_center flex--justify_evenly">
            <h3 className="Login-badge badge bg-blue-200">Login</h3>
            <form className="Login-form flex flex--column flex--justify_around" action="#">
                <div className="input-container flex flex--column">
                    <label className="input-label">Email</label>
                    <input onChange={(e) => setUserInput(userInput => ({ ...userInput, email: e.target.value }))} className="input" type="email" name="email" placeholder="Enter your Email" />
                </div>
                <div className="input-container flex flex--column">
                    <label className="input-label">Password</label>
                    <input onChange={(e) => setUserInput(userInput => ({ ...userInput, password: e.target.value }))} className="input" type="password" name="password" placeholder="Enter your Password" />
                </div>
                <button type="submit" onClick={(e) => { e.preventDefault(); handleLogin(userInput); }} className="Login-btn btn btn-secondary btn-round--corner">Submit</button>
            </form>
        </div>
    </div>;
};
