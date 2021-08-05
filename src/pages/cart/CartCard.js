import { useCart } from '../../hooks/useCart.js'
import { useWish } from '../../hooks/useWish'
import { useState } from 'react'
export const CartCard = ({ _id: cartId, product, qty }) => {

    const { _id: productId, desc, image, name, price } = product
    const { increaseQuantity, decreaseQuantity, removeProduct } = useCart()
    const { moveToWish } = useWish()
    const [cartLoad, setCartLoad] = useState(false)

    const moveToWishText = (cartLoad) => cartLoad ? "Loading..." : "Move To Wishlist";

    return (
        <div key={cartId} className="card Cart-card flex flex--justify_around">
            <div className="card__header flex flex--justify_center">
                <img className="card__image" src={image} alt="" />
            </div>
            <div className="card__content flex flex--column flex--justify_around">
                <h3 className="card__content-title">{name}</h3>
                <p className="card__content-desc">{desc}</p>
                <strong className="card__content-price">Price: ₹{parseInt(price.mrp)}</strong>
                <div className="Cart-cta">
                    <div className="Cart-cta__qty">
                        <span>Quantity: </span>
                        <button
                            disabled={cartLoad}
                            onClick={() => increaseQuantity({ productId, qty, setCartLoad })}
                            className={`btn btn-icon ${cartLoad && 'cursor-disable'}`}>
                            <i className="bi bi-plus-circle"></i>
                        </button>
                        <span>{qty}</span>
                        <button
                            disabled={cartLoad}
                            onClick={() => decreaseQuantity({ productId, qty, setCartLoad })}
                            className={`btn btn-icon ${cartLoad && 'cursor-disable'}`}>
                            <i className="bi bi-dash-circle"></i>
                        </button>
                    </div>

                    <button
                        disabled={cartLoad}
                        onClick={() => moveToWish({ product, setCartLoad, removeProduct })}
                        className={`btn ${cartLoad ? 'bg-blue-200 color-primary cursor-disable' : 'btn-secondary'}`}>
                        {moveToWishText(cartLoad)}
                    </button>
                    <button
                        disabled={cartLoad}
                        onClick={() => removeProduct({ productId, setCartLoad })}
                        className={`btn btn-primary ${cartLoad && 'cursor-disable'}`}>
                        Remove
                    </button>
                </div>

                <strong className="badge color-info bg-blue-200">Subtotal: ₹{parseInt(price.mrp, 10) * qty}</strong>


            </div>
        </div>
    )
}