import {useStore} from '../../context/storeContext'
import {ShopCard} from './ShopCard'
export const ShopProducts = () => {
    const {products, showInventory, showFastDelivery, sortBy, searchBy} = useStore()

    const getSortedProducts = (data, sortBy) => {
        switch(sortBy){
            case "lowToHigh":{
                return data.sort((a,b)=> a['price'] - b['price'])
            }
            case "highToLow":{
                return data.sort((a,b)=> b['price'] - a['price'])
            }
            default: return data
        }
    }

    const getFilteredProducts = (data, {showInventory, showFastDelivery}) => {
        return data
            .filter(item => showInventory === true? item : item.inStock)
            .filter(({fastDelivery}) => showFastDelivery? fastDelivery : true)
            .filter(({name}) => searchBy.length > 0 ? name.toLowerCase().startsWith(searchBy) : true)
    }

    const sortedProducts = getSortedProducts(products, sortBy)
    const filteredProducts = getFilteredProducts(sortedProducts, {showInventory, showFastDelivery})
    return (
    <div className="shop-products mt-1">
        {
            filteredProducts && filteredProducts.map((product) => <ShopCard key={product.id} {...product} />)
        }
    </div>)
}