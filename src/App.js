import { NavMenu } from './components/header/NavMenu';
import Home from './pages/home/Home'
import Shop from './pages/shop/Shop';
import { Wishlist } from './pages/wishlist/Wishlist';
import { Cart } from './pages/cart/Cart'
import { Routes, Route } from 'react-router-dom';
import { useData } from './context/dataContext'
import { fetchCartData, fetchWishData } from './context/actions/dataActions'
import { useEffect } from 'react';
import { useStore } from './context/storeContext';
import { fetchProducts } from './context/actions/storeActions';
import { useAxios } from './useAxios'
function App() {
  const { cartItems, wishItems, dataDispatch } = useData()
  const { storeDispatch } = useStore();
  const { loading, data } = useAxios('get', 'https://geeky-basket-backend.theniteshnarang.repl.co/products')


  useEffect(() => {
    if (data) {
      storeDispatch(fetchProducts(data.products))
    }
  }, [data, storeDispatch])


  useEffect(() => {
    cartItems.length > 0 && localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems])
  useEffect(() => {
    wishItems.length > 0 && localStorage.setItem('wishItems', JSON.stringify(wishItems))
  }, [wishItems])


  useEffect(() => {
    const cartList = localStorage.getItem('cartItems')
    const wishList = localStorage.getItem('wishItems')
    dataDispatch(fetchCartData(cartList))
    dataDispatch(fetchWishData(wishList))
  }, [dataDispatch])

  return (
    <div className="App">
      <NavMenu />
      <div className="mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop loading={loading} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
