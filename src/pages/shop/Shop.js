
import { ShopTop } from './ShopTop'
import { ShopProducts } from './ShopProducts'
import { ShopSide } from './ShopSide'
const Shop = () => {

    return (
        <div className="shop">   
            <ShopSide/>
            <ShopProducts />
            <ShopTop />
        </div>
    )
}

export default Shop