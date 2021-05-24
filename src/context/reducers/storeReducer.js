import {STORE} from '../actionGroup'



export const storeReducer = (initState, dispatch)=>{
    const state = initState;
    const genreItems = state.genreItems;
    switch(dispatch.type){
        case STORE.FETCH_PRODUCTS : {
            return {
                ...state,
                products: [...dispatch.payload ]
            } 
        }
        case STORE.FETCH_CATEGORY:{
            return {
                ...state,
                category: [...dispatch.payload]
            }
        }
        case STORE.FILTER_GENRE: {
            if(genreItems.includes(dispatch.payload.name)){
                return {
                    ...state,
                    genreItems : genreItems.filter(item => item !== dispatch.payload.name)
                }
            }
            return {
                ...state,
                genreItems: genreItems.concat(dispatch.payload.name)
            }
            
        }
        case STORE.CLEAR_GENRE : {
            return {
                ...state,
                genreItems: []
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