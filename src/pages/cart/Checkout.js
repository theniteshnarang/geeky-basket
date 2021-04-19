import { getTotalQty, getTotalPrice } from '../../helpers/utils'
import { useData } from '../../context/dataContext'
export const Checkout = () => {
    const { cartItems } = useData()
    return (
        <div className="Checkout flex flex--column flex--align_center mt-4">
            <div className="Checkout-card card card--col flex flex--column flex--justify_around">
                    <h3 className="mt-1 Checkout-title">PRICE DETAILS</h3>
                    <ul className="Checkout-list flex flex--column">
                        {cartItems && cartItems.map(item => {
                            return <li key={item.id} className="flex flex--justify_between mt-1">
                                <span>{item.name} * {item.qty}</span>
                                <span>₹{item.price - item.discount[0]}</span>
                            </li>
                        })}
                        <li className="flex flex--justify_between mtb-1"><span>Shipping Charges</span><span>FREE</span></li>
                    </ul>
                    <div className="flex flex--justify_between badge bg-blue-200 color-info">
                        <span>Total Items: {getTotalQty(cartItems)}</span>
                        <span>Total Price: ₹{getTotalPrice(cartItems)}</span>
                    </div>
                    <button className="Checkout-cta btn bg-success color-light btn-round">Checkout</button>
            </div>
        </div>
    )
}