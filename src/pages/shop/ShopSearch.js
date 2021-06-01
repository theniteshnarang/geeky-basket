import React from 'react'
import { searchStore } from '../../context/actions/storeActions';
import { useStore } from '../../context/storeProvider';
export function ShopSearch() {
    const { storeDispatch } = useStore();
    return (
        <div className="Shop-search search-bar pos-rel">
                <input className="search-bar__input" type="text" name="search"
                    onChange={(e) => storeDispatch(searchStore(e.target.value))}
                    placeholder="Search for products" />
                <i className="search-bar__icon bi bi-search"></i>
        </div>
    )
}

