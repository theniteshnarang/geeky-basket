import { useData } from '../../context/dataProvider';
import { CartCard } from './CartCard';
import { Checkout } from './Checkout';
import { EmptyPage } from '../../components/shop/EmptyPage'
export const Cart = () => {

    const { cartItems } = useData()

    return (
        <div className="Cart-wrapper flex flex--column flex--align_center">
            <h1 className="Cart-title ml-3 mt-1 Cart-title">Cart</h1>
            <div className="Cart flex flex--justify_around">
                <div className="Cart-items">
                    {
                        cartItems.length > 0 ? cartItems.map(item => <CartCard key={item._id} {...item} />) : <EmptyPage label="Cart" />
                    }
                </div>
                {cartItems.length > 0 && <Checkout />}
            </div>

        </div>
    )
}