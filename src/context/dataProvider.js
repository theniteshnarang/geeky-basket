import { createContext, useContext, useReducer } from 'react';
import { dataReducer } from './reducers/dataReducer'
import axios from 'axios'
import { fetchCartData, fetchWishData } from '../context/actions/dataActions'
const DataContext = createContext();


const DataProvider = ({ children }) => {
    const [{ cartItems, wishItems }, dataDispatch] = useReducer(dataReducer, { cartItems: [], wishItems: [] })

    const getCartData = async () => {
        try {
            const response = await axios.get(`${global.config.url}cart/u`)
            if (response.status === 200) {
                dataDispatch(fetchCartData(response.data.data.cartlist))
            }
        } catch (error) {
            console.log("Error while getting the cart data", error)
        }
    }

    const getWishData = async () => {
        try {
            const response = await axios.get(`${global.config.url}wish/u`)
            if (response.status === 200) {
                dataDispatch(fetchWishData(response.data.data.wishlist))
            }
        } catch (error) {
            console.log("Error while getting the cart data", error)
        }
    }

    const dataContextValue = {
        cartItems,
        wishItems,
        getCartData,
        getWishData,
        dataDispatch
    }

    return (
        <DataContext.Provider value={dataContextValue}>
            {children}
        </DataContext.Provider>
    )
}

const useData = () => {
    return useContext(DataContext)
}

export { DataProvider, useData }