import {increaseQty, decreaseQty, removeItem, addToWish} from '../../context/actions/dataActions'
import {useData} from '../../context/dataContext'
import {useToasts} from 'react-toast-notifications'
export const CartCard = ({ id, name, price, desc, image, qty})=> {
    const {dataDispatch} = useData()
    const {addToast} = useToasts()
    const moveToWish = (data) => {
        dataDispatch(addToWish(data))
        dataDispatch(removeItem(data.id))
        addToast('Moved To Wishlist',{appearance:'success'})
    }
    return (
        <div key={id} className="card Cart-card flex flex--justify_around pr-1 m-1">
            <div className="card__header flex flex--justify_center">
                <img className="card__image" src={image} alt=""/>
            </div>
            <div className="card__content flex flex--column flex--justify_around">
                <h3>{name}</h3>
                <p>{desc}</p>
                <strong>Price: ₹{parseInt(price.mrp)}</strong>
                <span className="flex flex--align_center flex--justify_around">
                    <span>Quantity:</span>
                    <button onClick = {()=> dataDispatch(increaseQty(id))} className="btn btn-icon"><i className="bi bi-plus-circle"></i></button>
                    {qty}
                    <button onClick = {()=> qty === 1 ? dataDispatch(removeItem(id)) : dataDispatch(decreaseQty(id))} className="btn btn-icon"><i className="bi bi-dash-circle"></i></button>
                    <button onClick = {()=> moveToWish({id,name, price, desc,image})}className="btn btn-secondary">Move to wishlist</button>
                    <button onClick = {()=> {
                        dataDispatch(removeItem(id))
                        addToast('Item Removed',{appearance:'warning'})
                    }} className="btn btn-primary">Remove</button>
                </span>
             
                <strong className="badge color-info bg-blue-200">Subtotal: ₹{parseInt(price.mrp,10)*qty}</strong>
              
                
            </div>
        </div>
    )
}