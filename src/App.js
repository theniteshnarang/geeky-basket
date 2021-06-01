import { NavMenu } from './components/header/NavMenu';
import Home from './pages/home/Home'
import Shop from './pages/shop/Shop';
import {NotFound} from './pages/NotFound'
import {LoginRegister} from './pages/account/LoginRegister'
import { Wishlist } from './pages/wishlist/Wishlist';
import { Cart } from './pages/cart/Cart'
import {Login } from './pages/account/Login'
import {SignUp} from './pages/account/SignUp';
import { Routes, Route, Navigate} from 'react-router-dom';
import { useData } from './context/dataProvider'
import {useAuth} from './context/authProvider'
import { fetchCartData, fetchWishData} from './context/actions/dataActions'
import { useEffect } from 'react';
import { useStore } from './context/storeProvider';
import { fetchProducts, fetchCategory } from './context/actions/storeActions';
import { useAxios } from './useAxios'
function App() {
  const { dataDispatch } = useData()
  const { storeDispatch } = useStore();
  const {user,setUser, token} = useAuth()
  const { loading:productsLoading, data:productsData } = useAxios('get', 'https://geeky-basket-backend.theniteshnarang.repl.co/product')
  const { loading:categoryLoading, data:categoryData } = useAxios('get', 'https://geeky-basket-backend.theniteshnarang.repl.co/category')
  const {data: userData} = useAxios('get', `https://geeky-basket-backend.theniteshnarang.repl.co/user/${user?._id}`)
  const { data: cartData} = useAxios('get', `https://geeky-basket-backend.theniteshnarang.repl.co/cart/${user?._id}`)
  const { data: wishData} = useAxios('get', `https://geeky-basket-backend.theniteshnarang.repl.co/wish/${user?._id}`)

  useEffect(()=>{
    if(userData){
      setUser(userData.user)
    }
  },[userData,setUser])
  
  useEffect(() => {
    if(categoryData && productsData){
      storeDispatch(fetchProducts(productsData.products))
      storeDispatch(fetchCategory(categoryData.categItems))
    }
  }, [productsData, categoryData ,storeDispatch])

  useEffect(()=>{
    if(cartData && wishData){
      console.log({wishData})
      dataDispatch(fetchCartData(cartData.cartItem.cartlist))
      dataDispatch(fetchWishData(wishData.wishItem.wishlist))
    }
  },[cartData, wishData, dataDispatch])

  function PrivateRoute ({token, ...props}){
    return token ? <Route {...props} /> : <Navigate to="/login-register/login" replace={true}/>
  }

 
  return (
    <div className="App">
      <NavMenu />
      <div className="mt-4">
        <Routes>
          <Route path="/" element={<Home loading={categoryLoading}/>} />
          <Route path="/products" element={<Shop loading={productsLoading} />} />
          <PrivateRoute token={token} path="/cart" element={<Cart />} />
          <PrivateRoute token={token} path="/wishlist" element={<Wishlist />} />
          <Route path="login-register" element={<LoginRegister/>}>
            <Route path="login" element={<Login/>}/>
            <Route path="sign-up" element={<SignUp/>}/>
          </Route>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
