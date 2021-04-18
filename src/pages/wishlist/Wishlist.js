import { useData } from '../../context/dataContext';
import { WishCard } from './WishCard'
import {Link} from 'react-router-dom'
export const Wishlist = () => {
    const { wishItems } = useData()
    return (
        <div className="Wishlist-wrapper flex flex--column flex--align_center">
            <div className="Wishlist">
                <h1 className="Wishlist-title ml-1 mt-1">Wishlist</h1>
                <div className="Wishlist-content flex flex--column flex--align_center">
                    {
                        wishItems && wishItems.map(item => <WishCard key={item.id} {...item} />)
                    }
                    {
                        wishItems.length === 0 && <div className="mt-3">
                            <h1>No items in Wishlist</h1>
                            <h3 className="mt-3">
                                Please visit &nbsp;
                                <Link to="/shop">
                                    shop page
                                </Link>
                            </h3>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}