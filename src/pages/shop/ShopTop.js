import {useStore} from '../../context/storeContext';
import {sortProducts} from '../../context/actions/storeActions';
export const ShopTop = () => {
    const {storeDispatch} = useStore()
    const handleSort = (e) => {
        return storeDispatch(sortProducts(e.target.value))
    }
    return (
        <div className="Shop-top">
            <fieldset className="Shop-top--sort flex flex--justify_around flex--align_center">
                <legend className="ml-3 plr-1">Sort By</legend>
                <label>
                    <input
                        type="radio"
                        name="sort"
                        value="highToLow"
                        onChange = {(e)=> handleSort(e)}
                    />
                Popularity
                </label>
                <label>
                    <input
                        type="radio"
                        name="sort"
                        value="lowToHigh"
                        onChange = {(e)=> handleSort(e)}
                    />
                Price - Low to High
                </label>
                <label>
                    <input
                        type="radio"
                        name="sort"
                        value="highToLow"
                        onChange = {(e)=> handleSort(e)}
                    />
                Price - High to Low
                </label>
                <label>
                    <input
                        type="radio"
                        name="sort"
                        value="highToLow"
                        onChange = {(e)=> handleSort(e)}
                    />
                Average Reviews
                </label>
            </fieldset>
            
        </div>
    )
}