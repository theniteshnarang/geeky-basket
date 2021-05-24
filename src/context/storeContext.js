import {createContext, useContext, useReducer} from 'react'
import {storeReducer} from './reducers/storeReducer'

const StoreContext = createContext()

const StoreProvider = ({children}) => {
    const [{products, category, genreItems, showInventory, showFastDelivery, sortBy, searchBy}, storeDispatch]=useReducer(storeReducer,
        {
            products:[],
            category:[],
            genreItems:[],
            showInventory: true,
            showFastDelivery: false,
            sortBy: 'popularity',
            searchBy:""
        })
    const storeContextValue = {
        products,
        category,
        showInventory,
        genreItems,
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