import {useStore} from '../../context/storeContext'
import {ShopCard} from './ShopCard'
export const ShopProducts = () => {
    const {products, showInventory, showFastDelivery, sortBy, searchBy} = useStore()

    const getSortedProducts = (data, sortBy) => {
        switch(sortBy){
            case "lowToHigh":{
                return data.sort((a,b)=> a['price']['mrp'] - b['price']['mrp'])
            }
            case "highToLow":{
                return data.sort((a,b)=> b['price']['mrp'] - a['price']['mrp'])
            }
            case "popularity":{
                return data.sort((a,b)=> b['ratings']['total']- a['ratings']['total'])
            }
            case "ratings":{
                return data.sort((a,b)=> b['ratings']['avg'] - a['ratings']['avg'])
            }
            default: return data
        }
    }

    const getFilteredProducts = (data, {showInventory, showFastDelivery}) => {
        return data
            .filter(item => showInventory === true? item : item.stock_qty > 0)
            .filter(({fastDelivery}) => showFastDelivery? fastDelivery : true)
            .filter(({name}) => searchBy.length > 0 ? name.toLowerCase().startsWith(searchBy) : true)
    }

    const sortedProducts = getSortedProducts(products, sortBy)
    const filteredProducts = getFilteredProducts(sortedProducts, {showInventory, showFastDelivery})
    return (
    <div className="Shop-products">
        {
            filteredProducts && filteredProducts.map((product) => <ShopCard key={product._id} {...product} />)
        }
    </div>)
}