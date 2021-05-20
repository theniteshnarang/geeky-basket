import {createContext, useContext, useReducer} from 'react'
import {storeReducer} from './reducers/storeReducer'

const StoreContext = createContext()

const StoreProvider = ({children}) => {
    const [{products, category, showInventory, showFastDelivery, sortBy, searchBy}, storeDispatch]=useReducer(storeReducer,
        {products:[], category:[],showInventory: false, showFastDelivery: false, sortBy: 'popularity', searchBy:""})
    const storeContextValue = {
        products,
        category,
        showInventory,
        showFastDelivery,
        sortBy,
        searchBy,
        storeDispatch
    }
    return (
        <StoreContext.Provider value={storeContextValue}>
            {children}
        </StoreContext.Provider>
    )
}

const useStore = () =>{
    return useContext(StoreContext)
}

export {StoreProvider, useStore}