
import { ShopTop } from './ShopTop'
import { ShopProducts } from './ShopProducts'
import { ShopSide } from './ShopSide'
const Shop = ({loading}) => {

    return (
        <div className="Shop">
            <ShopTop/> 
            <ShopSide/>
            <ShopProducts loading={loading}/>
        </div>
    )
}

export default Shop