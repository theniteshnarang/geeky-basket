
import { ShopTop } from './ShopTop'
import { ShopProducts } from './ShopProducts'
import { ShopSide } from './ShopSide'
import { ShopSearch } from './ShopSearch'
const Shop = ({loading}) => {

    return (
        <div className="Shop">
            <ShopTop/>
            <ShopSearch/> 
            <ShopSide/>
            <ShopProducts loading={loading}/>
        </div>
    )
}

export default Shop