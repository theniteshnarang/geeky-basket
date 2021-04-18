import {useStore} from '../../context/storeContext';
import {sortProducts} from '../../context/actions/storeActions';
export const ShopTop = () => {
    const {storeDispatch} = useStore()
    const handleSort = (e) => {
        return storeDispatch(sortProducts(e.target.value))
    }
    return (
        <div className="shop-top mlr-1 mt-1">
            <fieldset className="shop-top--sort flex flex--center">
                <legend className="ml-3 plr-1">Sort By</legend>
                <label className="mr-2">
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
            </fieldset>
            
        </div>
    )
}