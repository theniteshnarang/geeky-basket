import {increaseQty, decreaseQty, removeItem, addToWish} from '../../context/actions/dataActions'
import {useData} from '../../context/dataContext'
import {useToasts} from 'react-toast-notifications'
import axios from 'axios'
export const CartCard = ({ _id: cartId, product, qty})=> {
    const { _id: productId, desc, image,name,price} = product
    const {dataDispatch} = useData()
    const {addToast} = useToasts()
    
    const moveToWish = (data) => {
        dataDispatch(addToWish(data))
        dataDispatch(removeItem(data.id))
        addToast('Moved To Wishlist',{appearance:'success'})
    }

    const increaseQuantity = async(id, quantity) => {
        try {
            const incQty = await axios.post(`https://geeky-basket-backend.theniteshnarang.repl.co/cart/${id}`,{
                qty: quantity + 1
            })
            console.log({incQty})
            if(incQty.status === 201){
                return dataDispatch(increaseQty(id))
            }
        }catch (error){
            console.log('error occured while increasing quantity', error)
        }
    }

    const removeProduct = async(id) => {
        try {
            const remove = await axios.delete(`https://geeky-basket-backend.theniteshnarang.repl.co/cart/${id}`)
            console.log({remove})
            if(remove.status === 200){
                addToast('Item Removed',{appearance:'warning'})
                return dataDispatch(removeItem(id))
            }
        }catch (error){
            console.log('error occured while removing product', error)
        }  
    }

    const decreaseQuantity = async(id, quantity) => {
        if (quantity === 1){
            return removeProduct(id)
        }
        try {
            const decQty = await axios.post(`https://geeky-basket-backend.theniteshnarang.repl.co/cart/${id}`,{
                qty: quantity - 1
            })
            console.log({decQty})
            if(decQty.status === 201){
                return dataDispatch(decreaseQty(id))
            }
        }catch (error){
            console.log('error occured while decreasing quantity', error)
        }
        // return qty === 1 ? dataDispatch(removeItem(id)) : dataDispatch(decreaseQty(id))
    }

    return (
        <div key={cartId} className="card Cart-card flex flex--justify_around pr-1 m-1">
            <div className="card__header flex flex--justify_center">
                <img className="card__image" src={image} alt=""/>
            </div>
            <div className="card__content flex flex--column flex--justify_around">
                <h3>{name}</h3>
                <p>{desc}</p>
                <strong>Price: ₹{parseInt(price.mrp)}</strong>
                <span className="flex flex--align_center flex--justify_around">
                    <span>Quantity:</span>
                    <button
                        onClick = {() =>increaseQuantity(productId, qty)}
                        className="btn btn-icon">
                        <i className="bi bi-plus-circle"></i>
                    </button>
                    {qty}
                    <button
                        onClick = {()=> decreaseQuantity(productId, qty)}
                        className="btn btn-icon">
                        <i className="bi bi-dash-circle"></i>
                    </button>
                    <button
                        onClick = {()=> moveToWish({productId,name, price, desc,image})}
                        className="btn btn-secondary">
                            Move to wishlist
                    </button>
                    <button onClick = {()=> removeProduct(productId)} className="btn btn-primary">Remove</button>
                </span>
             
                <strong className="badge color-info bg-blue-200">Subtotal: ₹{parseInt(price.mrp,10)*qty}</strong>
              
                
            </div>
        </div>
    )
}