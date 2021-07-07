import axios from 'axios'
import { addToWish, removeWishItem } from '../context/actions/dataActions'
import { useData } from '../context/dataProvider'
import { useToasts } from 'react-toast-notifications'

export const useWish = () => {
    const { dataDispatch } = useData()
    const { addToast } = useToasts()

    const handleWish = async ({ product, isWishlisted, setWishLoad }) => {
        try {
            setWishLoad(loading => true)
            if (isWishlisted) {
                const remove = await axios.delete(`${global.config.url}wish/u/${product._id}`)
                if (remove.status === 200) {
                    dataDispatch(removeWishItem(product._id))
                    return addToast("Removed from wishlist", { appearance: 'warning' })
                }
            }
            const postWish = await axios.post(`${global.config.url}wish/u`, {
                wishlist: {
                    product: product._id
                }
            })
            if (postWish.status === 201) {
                dataDispatch(addToWish(product))
                return addToast("Added to wishlist", { appearance: 'success' })
            }
        } catch (error) {
            console.log('error occured while adding or removing wish item', error)
            return addToast("Please try again", { appearance: 'error' })
        } finally {
            setWishLoad(loading => false)
        }
    }

    const moveToWish = async ({ product, setCartLoad, removeProduct }) => {
        try {
            setCartLoad(cartLoad => true)
            const postWish = await axios.post(`${global.config.url}wish/u`, {
                wishlist: {
                    product: product._id
                }
            })
            if (postWish.status === 201) {
                dataDispatch(addToWish(product))
                removeProduct({ productId: product._id, setCartLoad })
                return addToast('Moved To Wishlist', { appearance: 'success' })
            }
        } catch (error) {
            console.log('Error occured while moving to wish', error)
            addToast("Product is already in wishlist", { appearance: 'error' })
        } finally {
            setCartLoad(cartLoad => false)
        }
    }

    const handleRemove = async ({ productId, setLoading }) => {
        try {
            setLoading(loading => true)
            const remove = await axios.delete(`${global.config.url}wish/u/${productId}`)
            if (remove.status === 200) {
                dataDispatch(removeWishItem(productId))
                return addToast("Removed from wishlist", { appearance: 'warning' })
            }
        } catch (error) {
            console.log('error occured while removing wish item', error)
            return addToast("Please try to remove again", { appearance: 'error' })
        } finally {
            setLoading(loading => false)
        }
    }
    return { moveToWish, handleRemove, handleWish }
}