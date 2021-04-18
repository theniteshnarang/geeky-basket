import {useStore} from '../../context/storeContext'
import {toggleInventory, toggleDelivery} from '../../context/actions/storeActions'
export const ShopSide = () => {
    const {storeDispatch, showInventory, showFastDelivery} = useStore()
    return (
        <div className="Shop-side ml-1">
            <div className="Shop-side--card card card-col flex flex--column">
                <span className="Shop-side--title mb-1">Filters</span>
                <div className="flex flex--align_center mb-1">
                    <input
                        type="checkbox"
                        name="fiters"
                        checked = {showInventory}
                        onChange = {()=>storeDispatch(toggleInventory())}
                    />
                    <label>
                        Include Out of Stock
                    </label>
                </div>
                <div className="flex flex--align_center">
                    <input
                        type="checkbox"
                        name="filters"
                        onChange = {()=>storeDispatch(toggleDelivery())}
                        checked={showFastDelivery}
                    />
                    <label>
                        Fast Delivery Only
                    </label>
                </div>

            </div>

        </div>
    )
}