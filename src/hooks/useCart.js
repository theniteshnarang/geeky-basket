import axios from 'axios';
import { increaseQty, decreaseQty, removeItem, addToCart } from '../context/actions/dataActions'
import { useData } from '../context/dataProvider';
import { useToasts } from 'react-toast-notifications';

export const useCart = () => {
    const { dataDispatch } = useData();
    const { addToast } = useToasts();

    const handleCart = async ({ product, cartItem, setCartLoad }) => {
        try {
            setCartLoad(loading => true)
            if (cartItem === undefined) {
                const postedData = await axios.post(`${global.config.url}cart/u`, {
                    cartlist: {
                        product: product._id
                    }
                })
                if (postedData.status === 201) {
                    addToast("Added To Basket", { appearance: 'success' })
                    return dataDispatch(addToCart(product))
                }
            }
            const updatedData = await axios.post(`${global.config.url}cart/u/${cartItem._id}`, {
                qty: cartItem.qty + 1
            })
            if (updatedData.status === 201) {
                addToast("Added To Basket", { appearance: 'success' })
                return dataDispatch(addToCart(product))
            }
        } catch (error) {
            console.log('Error occured while posting product', error)
            addToast("Please Try Again", { appearance: 'error' })
        } finally {
            setCartLoad(loading => false)
        }
    }

    const decreaseQuantity = async ({ productId, qty, setCartLoad }) => {
        if (qty === 1) {
            return removeProduct({ productId, setCartLoad })
        }
        try {
            setCartLoad(loading => true)
            const decQty = await axios.post(`${global.config.url}cart/u/${productId}`, {
                qty: qty - 1
            })
            if (decQty.status === 201) {
                return dataDispatch(decreaseQty(productId))
            }
        } catch (error) {
            console.log('Error occured while decreasing qty', error)
        } finally {
            setCartLoad(loading => false)
        }
    }

    const increaseQuantity = async ({ productId, qty, setCartLoad }) => {
        try {
            setCartLoad(loading => true)
            const incQty = await axios.post(`${global.config.url}cart/u/${productId}`, {
                qty: qty + 1
            })
            if (incQty.status === 201) {
                return dataDispatch(increaseQty(productId))
            }
        } catch (error) {
            console.log('Error occured while increasing qty', error)
        } finally {
            setCartLoad(loading => false)
        }
    }

    const removeProduct = async ({ productId, setCartLoad }) => {
        try {
            setCartLoad(loading => true)
            const remove = await axios.delete(`${global.config.url}cart/u/${productId}`)
            if (remove.status === 200) {
                dataDispatch(removeItem(productId))
                addToast('Item Removed', { appearance: 'warning' })
            }
        } catch (error) {
            console.log('Error occured while removing product', error)
        } finally {
            setCartLoad(loading => false)
        }
    }

    const moveToBasket = async ({ product, cartItem, setLoading, handleRemove }) => {
        try {
            setLoading(loading => true)
            if (cartItem === undefined) {
                const postedData = await axios.post(`${global.config.url}cart/u`, {
                    cartlist: {
                        product: product._id
                    }
                })
                if (postedData.status === 201) {
                    handleRemove({ productId: product._id, setLoading });
                    dataDispatch(addToCart(product));
                    return addToast("Moved To Basket", { appearance: 'success' })
                }
            }
            const updatedData = await axios.post(`${global.config.url}cart/u/${cartItem._id}`, {
                qty: cartItem.qty + 1
            })
            if (updatedData.status === 201) {
                handleRemove({ productId: product._id, setLoading });
                dataDispatch(addToCart(product))
                return addToast("Moved To Basket", { appearance: 'success' })
            }
        } catch (error) {
            console.log('Error occured while moving the product to basket', error)
            addToast("Please Try Again", { appearance: 'error' })
        } finally {
            setLoading(loading => false)
        }
    }

    return { increaseQuantity, decreaseQuantity, removeProduct, moveToBasket, handleCart }
}