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
import { fetchProducts, fetchCategory } from './context/actions/storeActions';
import { useAxios } from './useAxios'
function App() {
  const { dataDispatch } = useData()
  const { storeDispatch } = useStore();
  const { loading:productsLoading, data:productsData } = useAxios('get', 'https://geeky-basket-backend.theniteshnarang.repl.co/product')
  const { loading:categoryLoading, data:categoryData } = useAxios('get', 'https://geeky-basket-backend.theniteshnarang.repl.co/category')
  const { data: cartData} = useAxios('get', 'https://geeky-basket-backend.theniteshnarang.repl.co/cart/60af2497674b50016f37c237')
  const { data: wishData} = useAxios('get', 'https://geeky-basket-backend.theniteshnarang.repl.co/wish/60af2497674b50016f37c237')
  
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

 
  return (
    <div className="App">
      <NavMenu />
      <div className="mt-4">
        <Routes>
          <Route path="/" element={<Home loading={categoryLoading}/>} />
          <Route path="/products" element={<Shop loading={productsLoading} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
