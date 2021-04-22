import { NavMenu } from './components/header/NavMenu';
import Home from './pages/home/Home'
import Shop from './pages/shop/Shop';
// import Login from './pages/login/Login';
import {Wishlist} from './pages/wishlist/Wishlist';
import {Cart} from './pages/cart/Cart'
import { Routes, Route } from 'react-router-dom';
import {fetchProducts} from './context/actions/storeActions'
import {useStore} from './context/storeContext'
import {useData} from './context/dataContext'
import {fetchCartData, fetchWishData} from './context/actions/dataActions'
import {useEffect, useState} from 'react';
import axios from 'axios';
function App() {
  const {storeDispatch} = useStore()
  const {cartItems, wishItems, dataDispatch}= useData()
  const [loading, setLoading] = useState(false)
  useEffect(()=>{
    cartItems.length > 0 && localStorage.setItem('cartItems', JSON.stringify(cartItems))
  },[cartItems])
  useEffect(()=>{
    wishItems.length > 0 && localStorage.setItem('wishItems', JSON.stringify(wishItems))
  },[wishItems])
  useEffect(()=>{
    const cartList = localStorage.getItem('cartItems')
    const wishList = localStorage.getItem('wishItems')
    dataDispatch(fetchCartData(cartList))
    dataDispatch(fetchWishData(wishList))
  },[dataDispatch])
  useEffect(()=>{
    (async () => {
        try{
            setLoading(true)
            const data = await axios.get('https://geeky-basket-backend.theniteshnarang.repl.co/products/')
            storeDispatch(fetchProducts(data.data.products))
        }catch(error){
            console.log(error,'products nh mil paaye hai')
        }finally{
          setLoading(false)
        }
    })()   
},[storeDispatch])
  return (
    <div className="App">
      <NavMenu />
      <div className="mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop loading={loading}/>} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
