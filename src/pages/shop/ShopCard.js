import { addToCart, addToWish, removeWishItem } from '../../context/actions/dataActions';
import { useData } from '../../context/dataContext';
import { useToasts } from 'react-toast-notifications'
export const ShopCard = ({ _id: id, name, price, desc, image, stock_qty, fastDelivery, ratings }) => {
    const { dataDispatch, wishItems } = useData()
    const { addToast } = useToasts()
    const isWishlisted = wishItems.find(item => item.id === id);

    const toggleWish = (data) => isWishlisted ? (
        dataDispatch(removeWishItem(data.id)),
        addToast("Removed from wishlist", { appearance: 'warning' })
    ) : (
        dataDispatch(addToWish(data)),
        addToast("Added to wishlist", { appearance: 'success' })
    )


    return (
        <div key={id} className="Shop-card card flex flex--justify_around pr-1">
            <div className="card__header flex flex--justify_center">
                <img className="card__image" src={image[0]} alt="" />
            </div>
            <div className="card__content flex flex--column flex--justify_around">
                <div className="flex flex--justify_between flex--align_center">
                    <h3>{name}</h3>
                    <button onClick={() => toggleWish({ id, name, price, desc, image })} className="btn btn-icon">
                        <i className={`bi color-primary ${isWishlisted ? "bi-suit-heart-fill" : "bi-suit-heart"}`}></i>
                    </button>
                </div>
                <p>{desc}</p>
                <div className="flex flex--justify_between">
                    <div className="rating">
                        <span className="badge bg-secondary color-light">{ratings.avg} 
                         &nbsp;<i className="bi bi-star-fill"></i>
                        </span>
                        <span className="color-secondary"> ({ratings.total})</span>
                    </div>
                    {fastDelivery ? <span className="color-secondary">Fast Delivery</span> : <span className="color-secondary">Within 3-5 Days</span>}
                </div>
                <span>Price: <strong>₹{parseInt(price.mrp, 10)}</strong> <span
                    className="card__strike color-gray-500">₹{price.mrp + price.save}</span> <span className="color-secondary">Save
                ₹{price.save}({price.discount}%)</span></span>
                {stock_qty > 0 ? <button onClick={() => {
                    dataDispatch(addToCart({ id, name, price, desc, image }))
                    addToast("Added To Basket", { appearance: 'success' })
                }} className="btn btn-secondary btn-round--corner">Add To Basket</button> :
                    <button disabled className="btn bg-blue-200 color-primary btn-round--corner">
                        Out of Stock
                </button>
                }

            </div>
        </div>
    )
}