import React from 'react'
import { searchStore } from '../../context/actions/storeActions';
import { useStore } from '../../context/storeProvider';
import { debounce } from 'lodash';
export function ShopSearch() {
    const { storeDispatch } = useStore();
    const handleSearch = (e) => {
        storeDispatch(searchStore(e.target.value))
    }
    const debounced = debounce(handleSearch, 300)
    return (
        <div className="Shop-search search-bar pos-rel">
            <input className="search-bar__input" type="text" name="search"
                onChange={(e) => debounced(e)}
                placeholder="Search for products" />
            <i className="search-bar__icon bi bi-search"></i>
        </div>
    )
}

