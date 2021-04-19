import { useData } from '../../context/dataContext';
import { WishCard } from './WishCard'
import { EmptyPage } from '../../components/shop/EmptyPage'
export const Wishlist = () => {
    const { wishItems } = useData()
    return (
        <div className="Wishlist-wrapper flex flex--column flex--align_center">
            <h1 className="Wishlist-title ml-3 mt-1">Wishlist</h1>
            <div className="Wishlist flex flex--column flex--center">
                {
                    wishItems.length > 0 ? wishItems.map(item => <WishCard key={item.id} {...item} />) : <EmptyPage label="Wishlist" />
                }
            </div>
        </div>
    )
}