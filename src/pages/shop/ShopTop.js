import { useStore } from '../../context/storeProvider';
import { sortProducts } from '../../context/actions/storeActions';
export const ShopTop = () => {
    const { storeDispatch, sortBy } = useStore()
    const handleSort = (e) => {
        return storeDispatch(sortProducts(e.target.value))
    }
    return (
        <div className="Shop-top flex flex--justify_end">
            <div className="Shop-top--sort">
                <label for="sortBy">Sort By: </label>
                <select
                    name="sortBy"
                    id="sortBy"
                    value={sortBy}
                    onChange={(e) => handleSort(e)}
                >
                    <option value="popularity">Popularity</option>
                    <option value="lowToHigh">Price: Low To High</option>
                    <option value="highToLow">Price: High To Low</option>
                    <option value="ratings">Average</option>
                </select>
            </div>
        </div>
    )
}