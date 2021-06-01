import { getTotalQty, getTotalPrice } from '../../helpers/utils'
import { useData } from '../../context/dataProvider'
export const Checkout = () => {
    const { cartItems } = useData()
    return (
        <div className="Checkout mt-1">
            <div className="Checkout-card card card--col flex flex--column flex--justify_between">
                    <h3 className="Checkout-title">PRICE DETAILS</h3>
                    <ul className="Checkout-list flex flex--column">
                        {cartItems && cartItems.map(({_id:cartId, qty, product}) => {
                            return <li key={cartId} className="flex flex--justify_between mt-1">
                                <span>{product.name} * {qty}</span>
                                <span>₹{parseInt(product.price.mrp * qty)}</span>
                            </li>
                        })}
                        <li className="flex flex--justify_between mtb-1"><span>Shipping Charges</span><span>FREE</span></li>
                    </ul>
                    <div className="Checkout-total flex flex--justify_between badge bg-blue-200 color-info">
                        <span>Total Items: {getTotalQty(cartItems)}</span>
                        <span>Total Price: ₹{parseInt(getTotalPrice(cartItems))}</span>
                    </div>
                    <button className="Checkout-cta btn bg-success color-light btn-round">Checkout</button>
            </div>
        </div>
    )
}