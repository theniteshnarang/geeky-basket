import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { clearData } from './actions/dataActions';
import { useData } from './dataProvider';

const AuthContext = createContext()

function setupAuthHeaderForServiceCalls(token) {
    if (token) {
        return (axios.defaults.headers.common["Authorization"] = token);
    }
    delete axios.defaults.headers.common["Authorization"];
}


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(JSON.parse(localStorage.getItem('login'))?.['token'])
    const navigate = useNavigate()
    const { dataDispatch, getCartData, getWishData } = useData()

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
                navigate('/login-register/login')
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
                navigate('/products')
                getUser();
                getCartData();
                getWishData();
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
        localStorage.removeItem('login')
    }, [dataDispatch])

    useEffect(() => {
        setupAuthHeaderForServiceCalls(token)
    }, [token])

    useEffect(() => {
        getUser()
    }, [])

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
                        navigate("/login-register/login");
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