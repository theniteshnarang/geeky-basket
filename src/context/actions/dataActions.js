import { CART, WISH, CLEAR_DATA} from '../actionGroup';
// import { v4 as uuid} from 'uuid'
const addToCart = (data) => ({
    type: CART.ADD_TO_CART,
    payload: { _id: data._id, qty:1, product: data}
})

const clearData = () => ({
    type: CLEAR_DATA
})
const increaseQty = (data) => ({
    type: CART.INCREASE_QTY,
    payload: {id:data}
})

const fetchCartData = (data) => ({
    type: CART.FETCH_CARTLIST,
    payload: { cartItems: data}
})

const fetchWishData = (data) => ({
    type: WISH.FETCH_WISHLIST,
    payload:data
})
const decreaseQty = (data) => ({
    type: CART.DECREASE_QTY,
    payload: {id:data}
})

const removeItem = (data) =>({
    type: CART.REMOVE_ITEM,
    payload: {id: data}
})

const addToWish = (data) => ({
    type: WISH.ADD_TO_WISH,
    payload: { _id: data._id, product: data}
})

const removeWishItem = (data) => ({
    type: WISH.REMOVE_WISH_ITEM,
    payload: {id: data}
})

export {addToCart, increaseQty, decreaseQty, removeItem, addToWish, removeWishItem, fetchCartData, fetchWishData, clearData}