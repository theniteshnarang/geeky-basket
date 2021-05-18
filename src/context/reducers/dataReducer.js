import {CART, WISH} from '../actionGroup'

const reduceCart = (acc, val) => {
    const findEle = acc.find((item) => item._id === val._id); // What val is doing here?
    if (findEle === undefined) {
      return acc.concat(val);
    }
    return acc.map((item) =>
      item._id === findEle._id ? { ...item, qty: item.qty + 1 } : item
    );
  };

const dataReducer = (initState, dispatch)=> {
    const state = initState;
    const cartItems = state.cartItems;
    const wishItems = state.wishItems;
    switch(dispatch.type){
        case CART.ADD_TO_CART: {
          return {
            ...state,
            cartItems: cartItems.concat(dispatch.payload).reduce(reduceCart, [])}
        }
        case CART.INCREASE_QTY: {
          return {
            ...state,
            cartItems: cartItems.map(item => item._id === dispatch.payload.id ? {...item, qty: item.qty + 1} : item)
          }
        }
        case CART.DECREASE_QTY: {
          return {
            ...state,
            cartItems: cartItems.map(item => item._id === dispatch.payload.id ? {...item, qty: item.qty - 1}: item)
          }
        }
        case CART.REMOVE_ITEM: {
          return {
            ...state,
            cartItems: cartItems.filter(item => item._id !== dispatch.payload.id)
          }
        }
        case CART.FETCH_CARTLIST: {
          return {
            ...state,
            cartItems: dispatch.payload.cartItems || []
          }
        }
        case WISH.FETCH_WISHLIST: {
          return {
            ...state,
            wishItems: dispatch.payload || []
          }
        }
        case WISH.ADD_TO_WISH:{
          return {
            ...state,
            wishItems: wishItems.concat(dispatch.payload)
          }
        }
        case WISH.REMOVE_WISH_ITEM: {
          return {
            ...state,
            wishItems: wishItems.filter(item => item._id !== dispatch.payload.id)
          }
        }
        default:
            return {...state}
    }
}

export {dataReducer};
