import { useStore } from '../../context/storeProvider'
import { toggleInventory, toggleDelivery, filterGenre } from '../../context/actions/storeActions'
const FilterCard = ({ _id: genreId, name }) => {
    const { storeDispatch, genreItems } = useStore()
    return (
        <div key={genreId} className="flex flex--align_center mtb-1">
            <input
                type="checkbox"
                name="fiters"
                checked={genreItems.includes(name)}
                onChange={() => storeDispatch(filterGenre({ name }))}
            />
            <label>
                {name}
            </label>
        </div>
    )
}
export const ShopSide = () => {
    const { storeDispatch, showInventory, showFastDelivery, category } = useStore()
    return (
        <div className="Shop-side">
            <div className="Shop-side--card card card-col flex flex--column">
                <div>
                    <span className="Shop-side--title mb-1">Filters</span>
                    <div className="flex flex--align_center mtb-1">
                        <input
                            type="checkbox"
                            name="fiters"
                            checked={showInventory}
                            onChange={() => storeDispatch(toggleInventory())}
                        />
                        <label>
                            Include Out of Stock
                        </label>
                    </div>
                    <div className="flex flex--align_center">
                        <input
                            type="checkbox"
                            name="filters"
                            onChange={() => storeDispatch(toggleDelivery())}
                            checked={showFastDelivery}
                        />
                        <label>
                            Fast Delivery Only
                        </label>
                    </div>
                </div>
                <div className="mt-1">
                    <span className="Shop-side--title">By Genre</span>
                    {category && category.map(item => <FilterCard key={item._id} {...item} />)}
                </div>
            </div>

        </div>
    )
}