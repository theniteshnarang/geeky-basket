
import { ShopTop } from './ShopTop'
import { ShopProducts } from './ShopProducts'
import { ShopSide } from './ShopSide'
const Shop = () => {

    return (
        <div className="Shop">
            <ShopTop/> 
            <ShopSide/>
            <ShopProducts/>
        </div>
    )
}

export default Shop