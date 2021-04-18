import {STORE} from '../actionGroup'



export const storeReducer = (initState, dispatch)=>{
    const state = initState;
    switch(dispatch.type){
        case STORE.FETCH_PRODUCTS : {
            return {
                ...state,
                products: [...dispatch.payload]
            } 
        }
        case STORE.SORT_PRODUCTS : {
            return {
                ...state,
                sortBy: dispatch.payload
            }
        }
        case STORE.TOGGLE_INVENTORY: {
            return {
                ...state,
                showInventory: !state.showInventory
            }
        }
        case STORE.TOGGLE_DELIVERY: {
            return {
                ...state,
                showFastDelivery: !state.showFastDelivery
            }
        }
        case STORE.SEARCH_STORE: {
            return {
                ...state,
                searchBy: dispatch.payload
            }
        }
        default: 
            return {...state}
    }

}