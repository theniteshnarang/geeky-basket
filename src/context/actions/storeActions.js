import { STORE } from '../actionGroup'
const fetchProducts = (data) => ({
    type: STORE.FETCH_PRODUCTS,
    payload: data
})

const fetchCategory = (data) => ({
    type: STORE.FETCH_CATEGORY,
    payload:data
})

const filterGenre = (data) => ({
    type: STORE.FILTER_GENRE,
    payload: data
})

const clearGenre = () => ({
    type: STORE.CLEAR_GENRE
})

const sortProducts = (data) => ({
    type: STORE.SORT_PRODUCTS,
    payload: data
})

const toggleInventory = () => ({
    type: STORE.TOGGLE_INVENTORY
})

const toggleDelivery = () => ({
    type: STORE.TOGGLE_DELIVERY
})

const searchStore = (data) => ({
    type: STORE.SEARCH_STORE,
    payload: data.toLowerCase()
})

export {fetchProducts, sortProducts, toggleInventory, toggleDelivery, searchStore, fetchCategory, filterGenre, clearGenre}