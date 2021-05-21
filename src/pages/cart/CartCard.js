import {increaseQty, decreaseQty, removeItem, addToWish} from '../../context/actions/dataActions'
import {useData} from '../../context/dataContext'
import {useToasts} from 'react-toast-notifications'
import {useState} from 'react'
import axios from 'axios'
export const CartCard = ({ _id: cartId, product, qty})=> {
    const { _id: productId, desc, image,name,price} = product
    const {dataDispatch} = useData()
    const {addToast} = useToasts()
    const [cartLoad, setCartLoad] = useState(false)
    const moveToWish = async (data) => {
        try{
            setCartLoad(cartLoad => true)
            const postWish = await axios.post(`https://geeky-basket-backend.theniteshnarang.repl.co/wish`,{
                _id: data._id,
                product: data._id
            })
            if(postWish.status === 201){
                removeProduct(data._id)
                dataDispatch(addToWish(data))
                return addToast('Moved To Wishlist',{appearance:'success'})
            }   
        }catch(error){
            console.log('error occured while moving to wish', error)
            addToast("Product is already in wishlist", { appearance: 'error' })
        }finally{
            setCartLoad(cartLoad => false)
        }
    }

    const increaseQuantity = async(id, quantity) => {
        try {
            setCartLoad(loading => true)
            const incQty = await axios.post(`https://geeky-basket-backend.theniteshnarang.repl.co/cart/${id}`,{
                qty: quantity + 1
            })
            console.log({incQty})
            if(incQty.status === 201){
                return dataDispatch(increaseQty(id))
            }
        }catch (error){
            console.log('error occured while increasing quantity', error)
        }finally{
            setCartLoad(loading => false)
        }
    }

    const removeProduct = async(id) => {
        try {
            setCartLoad(loading => true)
            const remove = await axios.delete(`https://geeky-basket-backend.theniteshnarang.repl.co/cart/${id}`)
            console.log({remove})
            if(remove.status === 200){
                addToast('Item Removed',{appearance:'warning'})
                return dataDispatch(removeItem(id))
            }
        }catch (error){
            console.log('error occured while removing product', error)
        }finally{
            setCartLoad(loading => false)
        }  
    }

    const decreaseQuantity = async(id, quantity) => {
        if (quantity === 1){
            return removeProduct(id)
        }
        try {
            setCartLoad(loading => true)
            const decQty = await axios.post(`https://geeky-basket-backend.theniteshnarang.repl.co/cart/${id}`,{
                qty: quantity - 1
            })
            console.log({decQty})
            if(decQty.status === 201){
                return dataDispatch(decreaseQty(id))
            }
        }catch (error){
            console.log('error occured while decreasing quantity', error)
        }finally{
            setCartLoad(loading => false)
        }
    }

    const moveToWishText = (cartLoad) => cartLoad ? "Loading..." : "Move To Wishlist";

    return (
        <div key={cartId} className="card Cart-card flex flex--justify_around pr-1 m-1">
            <div className="card__header flex flex--justify_center">
                <img className="card__image" src={image} alt=""/>
            </div>
            <div className="card__content flex flex--column flex--justify_around">
                <h3>{name}</h3>
                <p>{desc}</p>
                <strong>Price: ₹{parseInt(price.mrp)}</strong>
                <div className="flex flex--align_center flex--justify_around">
                    <span>Quantity:</span>
                    <button
                        disabled={cartLoad}
                        onClick = {() =>increaseQuantity(productId, qty)}
                        className={`btn btn-icon ${cartLoad && 'cursor-disable'}`}>
                        <i className="bi bi-plus-circle"></i>
                    </button>
                    {qty}
                    <button
                        disabled={cartLoad}
                        onClick = {()=> decreaseQuantity(productId, qty)}
                        className={`btn btn-icon ${cartLoad && 'cursor-disable'}`}>
                        <i className="bi bi-dash-circle"></i>
                    </button>
                    <button
                        disabled={cartLoad}
                        onClick = {()=> moveToWish(product)}
                        className={`btn btn-secondary ${cartLoad && 'cursor-disable'}`}>
                        {moveToWishText(cartLoad)}
                    </button>
                    <button
                        disabled={cartLoad}
                        onClick = {()=> removeProduct(productId)}
                        className={`btn btn-primary ${cartLoad && 'cursor-disable'}`}>
                        Remove
                    </button>
                </div>
             
                <strong className="badge color-info bg-blue-200">Subtotal: ₹{parseInt(price.mrp,10)*qty}</strong>
              
                
            </div>
        </div>
    )
}