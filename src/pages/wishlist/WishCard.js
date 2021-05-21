import {useData} from '../../context/dataContext';
import {addToCart, removeWishItem} from '../../context/actions/dataActions'
import {useToasts} from 'react-toast-notifications'
import axios from 'axios'
import {useState} from 'react'
export const WishCard = ({ _id:wishId, product})=>{
    const {dataDispatch, cartItems} = useData()
    const {addToast} = useToasts();
    const [loading, setLoading] = useState(false)
    const {_id:productId,desc, image, name, price} = product;
    const moveToBasket = async (data, cartItems) => {
        const cartItem = cartItems.find(item => item._id === productId)
        try {
            setLoading(loading => true)
            if (cartItem === undefined) {
                const postedData = await axios.post('https://geeky-basket-backend.theniteshnarang.repl.co/cart', {
                    _id: productId,
                    qty: 1,
                    product: productId
                })
                console.log({ postedData })
                if (postedData.status === 201) {
                    handleRemove(productId)
                    dataDispatch(addToCart(data))
                    return addToast("Moved To Basket", { appearance: 'success' })
                }
            }
            const updatedData = await axios.post(`https://geeky-basket-backend.theniteshnarang.repl.co/cart/${cartItem._id}`, {
                qty: cartItem.qty + 1
            })
            console.log({ updatedData })
            if (updatedData.status === 201) {
                handleRemove(productId);
                dataDispatch(addToCart(data))
                return addToast("Moved To Basket", { appearance: 'success' })
            }
        } catch (error) {
            console.log('error occured while moving the data to basket', error)
            addToast("Please Try Again", { appearance: 'error' })
        } finally {
            setLoading(loading => false)
        }
    }

    const handleRemove = async (id) => {
        try{
            setLoading(loading => true)
            const remove = await axios.delete(`https://geeky-basket-backend.theniteshnarang.repl.co/wish/${id}`)
            console.log({remove})
            if(remove.status === 200){
                dataDispatch(removeWishItem(id))
                return addToast("Removed from wishlist", { appearance: 'warning' })
            }
        }catch(error){
            console.log('error occured while removing wish item', error)
            return addToast("Please try to remove again", { appearance: 'error' })
        }finally{
            setLoading(loading => false)
        }
    }
    const moveToBasketText = (loading) => loading? "Loading..." : "Move To Basket";
    
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
                    <button
                        disabled={loading}
                        onClick={()=> moveToBasket(product, cartItems)}
                        className={`btn btn-secondary ${loading && 'cursor-disable'}`}>
                        {moveToBasketText(loading)}
                    </button>
                    <button
                        disabled={loading}
                        onClick={()=> handleRemove(productId)}
                        className={`ml-1 btn btn-primary ${loading && 'cursor-disable'}`}>
                        Remove
                    </button>
                </div>
                
            </div>
        </div>
    )
}