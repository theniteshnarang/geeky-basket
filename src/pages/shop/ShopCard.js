import { addToCart, addToWish, removeWishItem } from '../../context/actions/dataActions';
import { useData } from '../../context/dataContext';
import { useToasts } from 'react-toast-notifications';
import axios from 'axios';
import { useState } from 'react'

export const ShopCard = ({ _id: productId, name, price, desc, image, stock_qty, fastDelivery, ratings }) => {
    const { dataDispatch, wishItems, cartItems } = useData()
    const { addToast } = useToasts()
    const [cartLoad, setCartLoad] = useState(false)
    const [wishLoad, setWishLoad] = useState(false)
    const isWishlisted = wishItems.find(item => item._id === productId);

    const handleWish = async (data, isWishlisted) => {
        try {
            setWishLoad(loading => true)
            if (isWishlisted) {
                const remove = await axios.delete(`https://geeky-basket-backend.theniteshnarang.repl.co/wish/60af2497674b50016f37c237/${data._id}`)
                if (remove.status === 200) {
                    dataDispatch(removeWishItem(data._id))
                    return addToast("Removed from wishlist", { appearance: 'warning' })
                }
            }
            const postWish = await axios.post(`https://geeky-basket-backend.theniteshnarang.repl.co/wish/60af2497674b50016f37c237`, {
                wishlist : {
                    _id: data._id,
                    product: data._id
                }
            })
            if (postWish.status === 201) {
                dataDispatch(addToWish(data))
                return addToast("Added to wishlist", { appearance: 'success' })
            }
        } catch (error) {
            console.log('error occured while adding or removing wish item', error)
            return addToast("Please try again", { appearance: 'error' })
        } finally {
            setWishLoad(loading => false)
        }
    }

    const handleCart = async (data, cartItems) => {
        const cartItem = cartItems.find(item => item._id === productId)

        try {
            setCartLoad(loading => true)
            if (cartItem === undefined) {
                const postedData = await axios.post('https://geeky-basket-backend.theniteshnarang.repl.co/cart/60af2497674b50016f37c237', {
                    cartlist: {
                        _id: productId,
                        product: productId
                    }
                })
                console.log({ postedData })
                if (postedData.status === 201) {
                    addToast("Added To Basket", { appearance: 'success' })
                    return dataDispatch(addToCart(data))
                }
            }
            const updatedData = await axios.post(`https://geeky-basket-backend.theniteshnarang.repl.co/cart/60af2497674b50016f37c237/${cartItem._id}`, {
                qty: cartItem.qty + 1
            })
            console.log({ updatedData })
            if (updatedData.status === 201) {
                addToast("Added To Basket", { appearance: 'success' })
                return dataDispatch(addToCart(data))
            }
        } catch (error) {
            console.log('error occured while posting data', error)
            addToast("Please Try Again", { appearance: 'error' })
        } finally {
            setCartLoad(loading => false)
        }
    }
    function getButtonStatus() {
        return stock_qty > 0 ? (cartLoad ? "Adding..." : "Add To Basket") : ("Out of Stock")
    }

    function isFastDelivery() {
        return fastDelivery ? "Fast Delivery" : "Within 3-5 Days"
    }

    return (
        <div key={productId} className="Shop-card card flex flex--justify_around">
            <div className="card__header flex flex--justify_center">
                <img className="card__image" src={image[0]} alt="" />
            </div>
            <div className="Shop-content card__content flex flex--column flex--justify_around">
                <div className="flex flex--justify_between flex--align_center">
                    <h3 className="Shop-content__title">{name}</h3>
                    <button onClick={() => handleWish({ _id: productId, name, price, desc, image }, isWishlisted)} className="btn btn-icon">
                        <i className={`btn-icon bi color-primary ${wishLoad && 'cursor-disable'} ${isWishlisted ? "bi-suit-heart-fill" : "bi-suit-heart"}`}></i>
                    </button>
                </div>
                <p className="Shop-content__desc">{desc}</p>
                <div className="Shop-content__ratings flex flex--justify_between">
                    <div className="rating">
                        <span className="badge bg-primary color-light">
                            {ratings.avg}&nbsp;<i className="bi bi-star-fill"></i>
                        </span>
                        &nbsp;
                        <span>({ratings.total})</span>
                    </div>
                    <span>
                        {isFastDelivery()}
                    </span>
                </div>

                <span className="Shop-content__price">Price: <strong>₹{parseInt(price.mrp, 10)}</strong>&nbsp;
                    <span className="card__strike color-gray-500">₹{price.mrp + price.save}</span>&nbsp;
                    <span className="color-secondary">Save ₹{price.save}({price.discount}%)</span>
                </span>

                <button
                    disabled={cartLoad || stock_qty === 0}
                    className={`btn btn-round--corner ${cartLoad || stock_qty === 0 ? "bg-blue-200 color-primary cursor-disable" : "btn-secondary"}`}
                    onClick={() => handleCart({ _id: productId, name, price, desc, image }, cartItems)}
                >
                    {getButtonStatus()}
                </button>

            </div>
        </div>
    )
}