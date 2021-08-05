import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { clearData } from './actions/dataActions';
import { useData } from './dataProvider';
import { setupAuthHeaderForServiceCalls } from './utils'
import { useToasts } from 'react-toast-notifications';
const AuthContext = createContext()



const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(JSON.parse(localStorage.getItem('login'))?.['token'])
    const navigate = useNavigate()
    const { addToast } = useToasts();
    const { dataDispatch } = useData()
    const getUser = async () => {
        try {
            const response = await axios.get(`${global.config.url}user/u`)
            if (response.status === 200) {
                setUser(response.data.user)
            }
        } catch (error) {
            console.log("Error while getting the user data", error.response)
        }
    }

    const handleSignUp = async (input) => {
        try {
            const response = await axios.post(`${global.config.url}auth/sign-up`, {
                name: input.name,
                email: input.email,
                password: input.password
            })
            if (response.status === 201) {
                navigate('/login')
                addToast("Signup Successfully, please Login", { appearance: 'success' })
            }
        } catch (error) {
            console.log("Something went wrong in sign-up", error.response)
        }
    }

    const handleLogin = async (input) => {
        try {
            const response = await axios.post(`${global.config.url}auth/login`, {
                email: input.email,
                password: input.password
            })
            if (response.status === 200) {
                setToken(response.data.token)
                setupAuthHeaderForServiceCalls(response.data.token)
                localStorage.setItem('login', JSON.stringify({ token: response.data.token }))
                console.log(addToast, '....')
                addToast("Login Successfully", { appearance: 'success' })
                navigate('/products')
            }
        } catch (error) {
            console.log("Credentials are incorrect, while login", error.response)
        }
    }


    const handleLogout = useCallback(() => {
        setupAuthHeaderForServiceCalls(null)
        setUser({})
        setToken(null)
        dataDispatch(clearData())
        addToast("Logout Successfully", { appearance: 'success' })
        localStorage.removeItem('login')
    }, [dataDispatch, addToast])

    useEffect(() => {
        function setupAuthExceptionHandler() {
            const UNAUTHORIZED = 401;
            axios.interceptors.response.use(
                (response) => response,
                (error) => {
                    console.log({ error })
                    if (error?.response?.request?.status === UNAUTHORIZED) {
                        console.log("Interceptor running")
                        handleLogout()
                        navigate("/login");
                    }
                    return Promise.reject(error);
                }
            );
        }
        setupAuthExceptionHandler()
    }, [handleLogout, navigate])

    const authProviderValue = {
        handleSignUp,
        handleLogin,
        handleLogout,
        getUser,
        token,
        user
    }

    return (
        <AuthContext.Provider value={authProviderValue}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    return useContext(AuthContext)
}


export { AuthProvider, useAuth }