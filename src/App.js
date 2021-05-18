import { NavMenu } from './components/header/NavMenu';
import Home from './pages/home/Home'
import Shop from './pages/shop/Shop';
import { Wishlist } from './pages/wishlist/Wishlist';
import { Cart } from './pages/cart/Cart'
import { Routes, Route } from 'react-router-dom';
import { useData } from './context/dataContext'
import { fetchCartData, fetchWishData} from './context/actions/dataActions'
import { useEffect } from 'react';
import { useStore } from './context/storeContext';
import { fetchProducts } from './context/actions/storeActions';
import { useAxios } from './useAxios'
function App() {
  const { dataDispatch } = useData()
  const { storeDispatch } = useStore();
  const { loading, data } = useAxios('get', 'https://geeky-basket-backend.theniteshnarang.repl.co/products')
  const { data: cartData} = useAxios('get', 'https://geeky-basket-backend.theniteshnarang.repl.co/cart')
  const { data: wishData} = useAxios('get', 'https://geeky-basket-backend.theniteshnarang.repl.co/wish')
  useEffect(() => {
    if (data) {
      storeDispatch(fetchProducts(data.products))
    }
  }, [data, storeDispatch])

  useEffect(()=>{
    if(cartData){
      dataDispatch(fetchCartData(cartData.cartItems))
    }
  },[cartData, dataDispatch])

  useEffect(()=>{
    if(wishData){
      dataDispatch(fetchWishData(wishData.wishItems))
    }
  },[wishData, dataDispatch])
 
  return (
    <div className="App">
      <NavMenu />
      <div className="mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Shop loading={loading} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
