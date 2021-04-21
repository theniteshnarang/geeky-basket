import {addToCart, addToWish, removeWishItem} from '../../context/actions/dataActions';
import {useData} from '../../context/dataContext'
export const ShopCard = ({ _id:id , name, price, desc, image, stock_qty, fastDelivery}) => {
    const {dataDispatch, wishItems} = useData()
    const isWishlisted = wishItems.find(item => item.id === id);
    const toggleWish = (data) => isWishlisted? dataDispatch(removeWishItem(data.id)) : dataDispatch(addToWish(data))
   
    
    return (
        <div key={id} className="Shop-card card flex flex--justify_around pr-1">
            <div className="card__header flex flex--justify_center">
                <img className="card__image" src={image[0]} alt=""/>
            </div>
            <div className="card__content flex flex--column flex--justify_around">
                <div className="flex flex--justify_between flex--align_center">
                    <h3>{name}</h3>
                    <button onClick={()=> toggleWish({id,name,price,desc,image})} className="btn btn-icon">
                        <i className={`bi color-primary ${isWishlisted? "bi-suit-heart-fill": "bi-suit-heart"}`}></i>
                    </button>
                </div>
                <p>{desc}</p>
                <p className="flex flex--justify_between">
                { stock_qty > 0? <span className="color-info">In Stock</span> : <span className="color-error">Out Of Stock</span>}
                {fastDelivery ? <span className="color-info">Fast Delivery</span> : <span className="color-info">Within 3-5 Days</span>}
                </p>
                <span>Price: <strong className="color-info">₹{parseInt(price.mrp,10)}</strong> <span
                    className="card__strike color-gray-500">₹{price.mrp + price.save}</span> <span className="color-red-500">Save
                ₹{price.save}({price.discount}%)</span></span>
                <button onClick={()=> dataDispatch(addToCart({id,name,price,desc,image}))} className="btn btn-secondary btn-round--corner">Add To Basket</button>
            </div>
        </div>
    )
}