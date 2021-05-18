import {useData} from '../../context/dataContext';
import {addToCart, removeWishItem} from '../../context/actions/dataActions'
import {useToasts} from 'react-toast-notifications'
import axios from 'axios'
export const WishCard = ({ _id:wishId, product})=>{
    const {dataDispatch} = useData()
    const {addToast} = useToasts()
    const {_id:productId,desc, image, name, price} = product;
    const moveToBasket = (data) => {
        dataDispatch(addToCart(data))
        dataDispatch(removeWishItem(data.id))
        addToast('Moved To Basket', {appearance:'success'})
    }

    const handleRemove = async (id) => {
        try{
            const remove = await axios.delete(`https://geeky-basket-backend.theniteshnarang.repl.co/wish/${id}`)
            console.log({remove})
            if(remove.status === 200){
                dataDispatch(removeWishItem(id))
                return addToast("Removed from wishlist", { appearance: 'warning' })
            }
        }catch(error){
            console.log('error occured while removing wish item', error)
            return addToast("Please try to remove again", { appearance: 'error' })
        }
    }
    return (
        <div key={wishId} className="card Wishlist-card flex flex--justify_around pr-1">
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
                    <button onClick={()=> moveToBasket({_id:productId,name,price,desc,image})} className="btn btn-secondary">Move To Basket</button>
                    <button onClick={()=> handleRemove(productId)} className="ml-1 btn btn-primary">Remove</button>
                </div>
                
            </div>
        </div>
    )
}