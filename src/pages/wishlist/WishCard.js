import {useData} from '../../context/dataContext';
import {addToCart, removeWishItem} from '../../context/actions/dataActions'
import {useToasts} from 'react-toast-notifications'

export const WishCard = ({ id, name, price, desc, image})=>{
    const {dataDispatch} = useData()
    const {addToast} = useToasts()
    const moveToBasket = (data) => {
        dataDispatch(addToCart(data))
        dataDispatch(removeWishItem(data.id))
        addToast('Moved To Basket', {appearance:'success'})
    }
    return (
        <div key={id} className="card Wishlist-card flex flex--justify_around pr-1">
            <div className="card__header flex flex--justify_center">
                <img className="card__image" src={image[0]} alt=""/>
            </div>
            <div className="card__content flex flex--column flex--justify_around">
                <div className="flex flex--justify_between flex--align_center">
                    <h3>{name}</h3>
                </div>
                <p>{desc}</p>
                <span>Price: {parseInt(price.mrp)}</span>
                <div>
                    <button onClick={()=> moveToBasket({id,name,price,desc,image})} className="btn btn-secondary">Move To Basket</button>
                    <button onClick={()=>{
                        dataDispatch(removeWishItem(id))
                        addToast('Item Removed', {appearance:'warning'})
                    }} className="ml-1 btn btn-primary">Remove</button>
                </div>
                
            </div>
        </div>
    )
}