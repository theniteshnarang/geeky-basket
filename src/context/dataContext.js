import {createContext,useContext, useReducer} from 'react';
import {dataReducer} from './reducers/dataReducer'

const DataContext = createContext();


const DataProvider = ({children}) => {
    const [{cartItems, wishItems}, dataDispatch]=useReducer(dataReducer, {cartItems:[],wishItems:[]})
    const dataContextValue = {
        cartItems,
        wishItems,
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

export {DataProvider, useData}