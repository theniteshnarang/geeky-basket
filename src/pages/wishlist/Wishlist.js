import { useData } from '../../context/dataProvider';
import { WishCard } from './WishCard'
import { EmptyPage } from '../../components/shop/EmptyPage'
export const Wishlist = () => {
    const { wishItems } = useData()
    return (
        <div className="Wishlist-wrapper flex flex--column flex--align_center">
            <h1 className="Wishlist-title">Wishlist</h1>
            <div className="Wishlist flex flex--column flex--center">
                {
                    wishItems.length > 0 ? wishItems.map(item => <WishCard key={item._id} {...item} />) : <EmptyPage label="Wishlist" />
                }
            </div>
        </div>
    )
}