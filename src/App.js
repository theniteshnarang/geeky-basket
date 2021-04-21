import { NavMenu } from './components/header/NavMenu';
import Home from './pages/home/Home'
import Shop from './pages/shop/Shop';
// import Login from './pages/login/Login';
import {Wishlist} from './pages/wishlist/Wishlist';
import {Cart} from './pages/cart/Cart'
import { Routes, Route } from 'react-router-dom';
import {fetchProducts} from './context/actions/storeActions'
import {useStore} from './context/storeContext'
import {useEffect} from 'react';
import axios from 'axios';
function App() {
  const {storeDispatch} = useStore()
  useEffect(()=>{
    (async function(){
        try{
            const data = await axios.get('https://geeky-basket-backend.theniteshnarang.repl.co/products/')
            storeDispatch(fetchProducts(data.data.products))
        }catch(error){
            console.log(error,'products nh mil paaye hai')
        }
    })()   
},[storeDispatch])
  return (
    <div className="App">
      <NavMenu />
      <div className="mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
