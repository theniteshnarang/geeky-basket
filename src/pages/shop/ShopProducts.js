import { useStore } from '../../context/storeProvider'
import { ShopCard } from './ShopCard'
import Loader from 'react-loader-spinner'
export const ShopProducts = ({ loading }) => {
    const { products, showInventory, showFastDelivery, sortBy, searchBy, genreItems } = useStore()
    const getSortedProducts = (data, sortBy) => {
        switch (sortBy) {
            case "lowToHigh": {
                return [...data].sort((a, b) => a['price']['mrp'] - b['price']['mrp'])
            }
            case "highToLow": {
                return [...data].sort((a, b) => b['price']['mrp'] - a['price']['mrp'])
            }
            case "popularity": {
                return [...data].sort((a, b) => b['ratings']['total'] - a['ratings']['total'])
            }
            case "ratings": {
                return [...data].sort((a, b) => b['ratings']['avg'] - a['ratings']['avg'])
            }
            default: return data
        }
    }

    const handleGenre = (genre, genreItems) => {
        for (let i = 0; i < genre.length; i++) {
            if (genreItems.includes(genre[i])) {
                return true
            }
        }
        return false
    }

    const getFilteredProducts = (data, { showInventory, showFastDelivery }) => {
        return data
            .filter(item => showInventory === true ? item : item.stock_qty > 0)
            .filter(({ fastDelivery }) => showFastDelivery ? fastDelivery : true)
            .filter(({ name }) => searchBy.length > 0 ? name.toLowerCase().includes(searchBy.toLowerCase()) : true)
            .filter(({ genre }) => genreItems.length > 0 ? handleGenre(genre, genreItems) : true)
    }

    const sortedProducts = getSortedProducts(products, sortBy)
    const filteredProducts = getFilteredProducts(sortedProducts, { showInventory, showFastDelivery })
    return (
        <>
            {loading ? (<div className="Shop-products flex flex--center"><Loader type="Circles" color="#00BFFF" height={80} width={80} /></div>)
                : (<div className="Shop-products">
                    {
                        filteredProducts && filteredProducts.map((product) => <ShopCard key={product._id} {...product} />)
                    }
                </div>)}
        </>
    )
}