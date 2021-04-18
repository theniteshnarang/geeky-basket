import {createContext, useContext, useReducer} from 'react'
import {storeReducer} from './reducers/storeReducer'

const StoreContext = createContext()

const StoreProvider = ({children}) => {
    const [{products, showInventory, showFastDelivery, sortBy, searchBy}, storeDispatch]=useReducer(storeReducer,
        {products:[], showInventory: false, showFastDelivery: false, sortBy: null, searchBy:""})
    const storeContextValue = {
        products,
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