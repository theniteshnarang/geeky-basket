import {createContext, useContext, useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useData} from '../context/dataProvider'
import {clearData} from '../context/actions/dataActions'
import axios from 'axios'
const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [user, setUser] = useState({_id:JSON.parse(localStorage.getItem('login'))?.['_id']})
    const [error, setError] = useState({})
    const [token, setToken] = useState(JSON.parse(localStorage.getItem('login'))?.['token'])
    const navigate = useNavigate()
    const {dataDispatch} = useData()

    function setupAuthHeaderForServiceCalls(token) {
        if (token) {
          return (axios.defaults.headers.common["Authorization"] = token);
        }
        delete axios.defaults.headers.common["Authorization"];
    }

    useEffect(()=>{
        setupAuthHeaderForServiceCalls(token)
    },[token])

    const initiateWish = async (id) => {
        try{
            const response = await axios.post('https://geeky-basket-backend.theniteshnarang.repl.co/wish', {
                user: id,
                _id: id,
                wishlist: []
            })
            console.log({response})
        }catch(error){
            console.log({error},'...error while initating wish')
        }
    }

    const initiateCart = async (id) => {
        try{
            const response = await axios.post('https://geeky-basket-backend.theniteshnarang.repl.co/cart', {
                user: id,
                _id: id,
                cartlist: []
            })
            console.log({response})
        }catch(error){
            console.log({error},'...error while initating cart')
        }
    }
    const handleSignUp = async (input) => {
        try {
            const response = await axios.post('https://geeky-basket-backend.theniteshnarang.repl.co/user', {
                name: input.name,
                email: input.email,
                password: input.password
            })
            setUser(response.data.savedUser)
            setToken("abcdefghi")
            setupAuthHeaderForServiceCalls("abcdefghi")
            initiateWish(response.data.savedUser._id)
            initiateCart(response.data.savedUser._id)
            navigate('/')
            localStorage.setItem('login', JSON.stringify({token:"abcdefghi", _id:response.data.savedUser._id}))
        } catch (error) {
            setError(error.response)
        }
    }
    const handleLogin = async (input) => {
        console.log("I am clicked")
        try{
            const response = await axios.post('https://geeky-basket-backend.theniteshnarang.repl.co/user/login', {
                email: input.email,
                password: input.password
            })
            setUser(response.data.validUser)
            setToken("abcdefghi")
            setupAuthHeaderForServiceCalls("abcdefghi")
            localStorage.setItem('login', JSON.stringify({token:"abcdefghi", _id:response.data.validUser._id}))
            navigate('/')
        }catch(error){
            console.log({error})
            setError(error.response)
        }
    }
    const handleLogout = () => {
        setupAuthHeaderForServiceCalls(null)
        setUser({})
        setToken(null)
        dataDispatch(clearData())
        localStorage.removeItem('login')
    }
    const authProviderValue = {
        handleSignUp,
        handleLogin,
        handleLogout,
        token,
        error,
        user,
        setUser
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


export {AuthProvider, useAuth}