import { useData } from '../../context/dataContext';
import { CartCard } from './CartCard';
import { Checkout } from './Checkout';
import { Link } from 'react-router-dom'
export const Cart = () => {

    const { cartItems } = useData()

    return (
        <div className="Cart-wrapper flex flex--justify_around">
            <div className="Cart flex flex--column">
                <h1 className="ml-1 mt-1 Cart-title">Your Basket</h1>
                <div className="Cart-items">
                    {
                        cartItems && cartItems.map(item => <CartCard key={item.id} {...item} />)
                    }

                </div>
                {cartItems.length === 0 &&
                    <div className="mt-3">
                        <h1>No items in Basket</h1>
                        <h3 className="mt-3">
                            Please visit &nbsp;
                            <Link to="/shop">
                            shop page
                            </Link>
                        </h3>
                    </div>}
            </div>
            { cartItems.length > 0 && <Checkout />}
        </div>
    )
}