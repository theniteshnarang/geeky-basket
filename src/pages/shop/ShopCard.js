import { addToCart, addToWish, removeWishItem } from '../../context/actions/dataActions';
import { useData } from '../../context/dataContext';
import { useToasts } from 'react-toast-notifications';
import axios from 'axios';
import { useState } from 'react'

export const ShopCard = ({ _id: productId, name, price, desc, image, stock_qty, fastDelivery, ratings }) => {
    const { dataDispatch, wishItems, cartItems } = useData()
    const { addToast } = useToasts()
    const [loading, setLoading] = useState(false)
    const isWishlisted = wishItems.find(item => item._id === productId);

    const handleWish = async (data, isWishlisted) => {
        if (isWishlisted) {
            try{
                const remove = await axios.delete(`https://geeky-basket-backend.theniteshnarang.repl.co/wish/${data._id}`)
                if(remove.status === 200){
                    dataDispatch(removeWishItem(data._id))
                    return addToast("Removed from wishlist", { appearance: 'warning' })
                }
            }catch(error){
                console.log('error occured while removing wish item', error)
                return addToast("Please try to remove again", { appearance: 'error' })
            }
        }
        try{
            const postWish = await axios.post(`https://geeky-basket-backend.theniteshnarang.repl.co/wish`,{
                _id: data._id,
                product: data._id
            })
            if(postWish.status === 201){
                dataDispatch(addToWish(data))
                return addToast("Added to wishlist", { appearance: 'success' })
            }    
        }catch(error){
            console.log('error occured while posting wish', error)
            addToast("Please Add to Wish again", { appearance: 'error' })
        }
    }

    const handleCart = async (data, cartItems) => {
        const cartItem = cartItems.find(item => item._id === productId)

        try {
            setLoading(loading => true)
            if (cartItem === undefined) {
                const postedData = await axios.post('https://geeky-basket-backend.theniteshnarang.repl.co/cart', {
                    _id: productId,
                    qty: 1,
                    product: productId
                })
                console.log({ postedData })
                if (postedData.status === 201) {
                    addToast("Added To Basket", { appearance: 'success' })
                    return dataDispatch(addToCart(data))
                }
            }
            const updatedData = await axios.post(`https://geeky-basket-backend.theniteshnarang.repl.co/cart/${cartItem._id}`, {
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
            setLoading(loading => false)
        }
    }
    function getButtonStatus() {
        return stock_qty > 0 ? (loading ? "Adding..." : "Add To Basket") : ("Out of Stock")
    }

    function isFastDelivery() {
        return fastDelivery ? "Fast Delivery" : "Within 3-5 Days"
    }

    return (
        <div key={productId} className="Shop-card card flex flex--justify_around">
            <div className="card__header flex flex--justify_center">
                <img className="card__image" src={image[0]} alt="" />
            </div>
            <div className="card__content flex flex--column flex--justify_around">
                <div className="flex flex--justify_between flex--align_center">
                    <h3>{name}</h3>
                    <button onClick={() => handleWish({ _id: productId, name, price, desc, image }, isWishlisted)} className="btn btn-icon">
                        <i className={`bi color-primary ${isWishlisted ? "bi-suit-heart-fill" : "bi-suit-heart"}`}></i>
                    </button>
                </div>
                <p>{desc}</p>
                <div className="flex flex--justify_between">
                    <div className="rating">
                        <span className="badge bg-secondary color-light">
                            {ratings.avg}&nbsp;<i className="bi bi-star-fill"></i>
                        </span>
                        <span className="color-secondary"> ({ratings.total})</span>
                    </div>
                    <span className="color-secondary">
                        {isFastDelivery()}
                    </span>
                </div>

                <span>Price: <strong>₹{parseInt(price.mrp, 10)}</strong>
                    <span className="card__strike color-gray-500">₹{price.mrp + price.save}</span>
                    <span className="color-secondary">Save ₹{price.save}({price.discount}%)</span>
                </span>

                <button
                    disabled={loading || stock_qty === 0}
                    className={`btn btn-round--corner ${loading || stock_qty === 0 ? "bg-blue-200 color-primary cursor-disable" : "btn-secondary"}`}
                    onClick={() => handleCart({ _id: productId, name, price, desc, image }, cartItems)}
                >
                    {getButtonStatus()}
                </button>

            </div>
        </div>
    )
}