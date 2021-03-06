import { NavMenu } from './components/header/NavMenu';
import Home from './pages/home/Home'
import Shop from './pages/shop/Shop';
import { NotFound } from './pages/NotFound'
import { Wishlist } from './pages/wishlist/Wishlist';
import { Cart } from './pages/cart/Cart'
import { Login } from './pages/account/Login'
import { SignUp } from './pages/account/SignUp';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/authProvider'
import { useEffect } from 'react';
import { useStore } from './context/storeProvider';
import { fetchProducts, fetchCategory } from './context/actions/storeActions';
import { useAxios } from './hooks/useAxios';
import { useData } from './context/dataProvider'
import { setupAuthHeaderForServiceCalls } from './context/utils'
function App() {
  const { storeDispatch } = useStore();
  const { token, getUser } = useAuth()
  const { getCartData, getWishData } = useData()
  const { loading: productsLoading, data: productsData } = useAxios('get', `${global.config.url}product`)
  const { loading: categoryLoading, data: categoryData } = useAxios('get', `${global.config.url}category`)

  useEffect(() => {
    if (categoryData && productsData) {
      storeDispatch(fetchProducts(productsData.data))
      storeDispatch(fetchCategory(categoryData.data))
    }
  }, [productsData, categoryData, storeDispatch])

  function PrivateRoute({ token, ...props }) {
    return token ? <Route {...props} /> : <Navigate to="/login" replace={true} />
  }

  useEffect(() => {
    setupAuthHeaderForServiceCalls(token)
    if (token) {
      getCartData()
      getWishData()
      getUser()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])


  return (
    <div className="App">
      <NavMenu />
      <div className="mt-4">
        <Routes>
          <Route path="/" element={<Home loading={categoryLoading} />} />
          <Route path="/products" element={<Shop loading={productsLoading} />} />
          <PrivateRoute token={token} path="/cart" element={<Cart />} />
          <PrivateRoute token={token} path="/wishlist" element={<Wishlist />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {/* <MobileNavMenu /> */}
    </div>
  );
}

export default App;
