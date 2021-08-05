import { useData } from '../../context/dataProvider';
import { useAuth } from '../../context/authProvider'
import { useState } from 'react'
import { useWish } from '../../hooks/useWish';
import { useCart } from '../../hooks/useCart';
import { isItemPresent } from '../../helpers/utils';
export const ShopCard = ({ _id: productId, name, price, desc, image, stock_qty, fastDelivery, ratings }) => {

    const product = { _id: productId, name, price, desc, image };
    const [cartLoad, setCartLoad] = useState(false)
    const [wishLoad, setWishLoad] = useState(false)

    const { wishItems, cartItems } = useData()
    const { token } = useAuth()
    const { handleCart } = useCart()
    const { handleWish } = useWish();

    const isWishlisted = isItemPresent(wishItems, productId);
    const cartItem = isItemPresent(cartItems, productId)


    function getButtonStatus(token) {
        if (!token) {
            return "Please Login"
        }
        return stock_qty > 0 ? (cartLoad ? "Adding..." : "Add To Basket") : ("Out of Stock")
    }

    function isFastDelivery() {
        return fastDelivery ? "Fast Delivery" : "Within 3-5 Days"
    }

    return (
        <div key={productId} className="Shop-card card flex flex--justify_around">
            <div className="Shop-card__header card__header flex flex--justify_center">
                <img className="card__image" src={image[0]} alt="" />
            </div>
            <div className="Shop-content card__content flex flex--column flex--justify_around">
                <div className="flex flex--justify_between flex--align_center">
                    <h3 className="Shop-content__title">{name}</h3>
                    <button
                        onClick={
                            () => handleWish({ product, isWishlisted, setWishLoad })
                        }
                        className="btn btn-icon">
                        <i className={`btn-icon bi color-primary ${(wishLoad || token === null || token === undefined) && 'cursor-disable'} ${isWishlisted ? "bi-suit-heart-fill" : "bi-suit-heart"}`}></i>
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
                    className={`btn btn-round--corner ${cartLoad || stock_qty === 0 || token === null || token === undefined ? "bg-blue-200 color-primary cursor-disable" : "btn-secondary"}`}
                    onClick={() => handleCart({ product, cartItem, setCartLoad })}
                >
                    {getButtonStatus(token)}
                </button>

            </div>
        </div>
    )
}