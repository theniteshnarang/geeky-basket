// import { v4 as uuid } from 'uuid'
import { CART, WISH } from '../actionGroup';


const addToCart = (data) => ({
    type: CART.ADD_TO_CART,
    payload: { ...data , qty:1}
})


const increaseQty = (data) => ({
    type: CART.INCREASE_QTY,
    payload: data
})

const decreaseQty = (data) => ({
    type: CART.DECREASE_QTY,
    payload: data
})

const removeItem = (data) => ({
    type: CART.REMOVE_ITEM,
    payload: data
})

const addToWish = (data) => ({
    type: WISH.ADD_TO_WISH,
    payload: { ...data }
})

const removeWishItem = (data) => ({
    type: WISH.REMOVE_WISH_ITEM,
    payload:data
})

export {addToCart, increaseQty, decreaseQty, removeItem, addToWish, removeWishItem}