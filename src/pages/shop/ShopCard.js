import {addToCart, addToWish, removeWishItem} from '../../context/actions/dataActions';
import {useData} from '../../context/dataContext'
export const ShopCard = ({ id, name, price, desc, image, inStock, fastDelivery, discount}) => {
    const {dataDispatch, wishItems} = useData()
    const isWishlisted = wishItems.find(item => item.id === id);
    const toggleWish = (data) => isWishlisted? dataDispatch(removeWishItem(data.id)) : dataDispatch(addToWish(data))
   
    
    return (
        <div key={id} className="Shop-card card flex flex--justify_around pr-1">
            <div className="card__header flex">
                <img className="card__image" src={image} alt=""/>
            </div>
            <div className="card__content flex flex--column flex--justify_around">
                <div className="flex flex--justify_between flex--align_center">
                    <h3>{name}</h3>
                    <button onClick={()=> toggleWish({id,name,price,desc,image})} className={`btn btn-icon bi ${isWishlisted? "bi-suit-heart-fill color-secondary": "bi-suit-heart color-primary"}`}></button>
                </div>
                <p>{desc}</p>
                <p className="flex flex--justify_between">
                {inStock ? <span className="color-info">In Stock</span> : <span className="color-error">Out Of Stock</span>}
                {fastDelivery ? <span className="color-info">Fast Delivery</span> : <span className="color-info">Within 3-5 Days</span>}
                </p>
                <span>Price: <strong className="color-info">₹{price - discount[0]}</strong> <span
                    className="card__strike color-gray-500">₹{price}</span> <span className="color-red-500">Save
                ₹{discount[0]}</span></span>
                <button onClick={()=> dataDispatch(addToCart({id,name,price,desc,image,discount}))} className="btn btn-secondary btn-round--corner">Add To Basket</button>
            </div>
        </div>
    )
}