import { useData } from '../../context/dataProvider';
import { useWish } from '../../hooks/useWish';
import { useState } from 'react'
import { useCart } from '../../hooks/useCart';
import { isItemPresent } from '../../helpers/utils'
export const WishCard = ({ _id: wishId, product }) => {

    const [loading, setLoading] = useState(false)
    const { cartItems } = useData()
    const { handleRemove } = useWish()
    const { moveToBasket } = useCart()

    const { _id: productId, desc, image, name, price } = product;

    const cartItem = isItemPresent(cartItems, productId)

    const moveToBasketText = (loading) => loading ? "Loading..." : "Move To Basket";

    return (
        <div key={productId} className="card Wishlist-card flex flex--justify_around pr-1">
            <div className="card__header flex flex--justify_center">
                <img className="card__image" src={image[0]} alt="" />
            </div>
            <div className="card__content flex flex--column flex--justify_around">
                <div className="flex flex--justify_between flex--align_center">
                    <h3>{name}</h3>
                </div>
                <p>{desc}</p>
                <span>Price: {parseInt(price.mrp)}</span>
                <div>
                    <button
                        disabled={loading}
                        onClick={() => moveToBasket({ product, cartItem, setLoading, handleRemove })}
                        className={`btn ${loading ? 'bg-blue-200 color-primary cursor-disable' : 'btn-secondary'}`}>
                        {moveToBasketText(loading)}
                    </button>
                    <button
                        disabled={loading}
                        onClick={() => handleRemove({ productId, setLoading })}
                        className={`ml-1 btn btn-primary ${loading && 'cursor-disable'}`}>
                        Remove
                    </button>
                </div>

            </div>
        </div>
    )
}