import { Link } from 'react-router-dom'
import { useStore } from '../../context/storeProvider'
import { useEffect } from 'react'
import { filterGenre, clearGenre } from '../../context/actions/storeActions'
const CategoryCard = ({ _id: productId, name, image, desc, price }) => {
    return (
        <div key={productId} className="Category-card card card--col flex flex--column">
            <div className="Category-card__header card__header--col pos-rel flex flex--column">
                <img className="card__image" src={image[0]} alt="book cover" />
                {/* <i className="card__icon card__icon--col bi bi-heart-fill color-primary"></i> */}
            </div>
            <div className="Category-card__content card__content--col flex flex--column flex--justify_around">
                <h3 className="Category-name">{name}</h3>
                <span className="Category-price color-secondary">Price: ₹{parseInt(price.mrp)}</span>
                {/* <button className="btn btn-secondary color-light btn-round--corner">Add To Cart</button> */}
            </div>
        </div>
    )
}

const Category = ({ name, _id: categId, products }) => {
    const { storeDispatch } = useStore()
    return (
        <div className="Category pb-1">
            <h3 className="Category__title mtb-1">{name}</h3>
            <div className="Category__content flex flex--justify_around">
                {products.slice(0, 4).map(item => <CategoryCard key={item._id} {...item} />)}
            </div>
            <Link to="/products">
                <button className="Category__cta btn btn-primary" onClick={() => storeDispatch(filterGenre({ name }))}>Show More</button>
            </Link>
        </div>
    )
}
const Home = ({ loading }) => {
    const { category, storeDispatch } = useStore()
    useEffect(() => {
        storeDispatch(clearGenre())
    }, [storeDispatch])
    return (
        <>
            <div>
                <img className="Banner" src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&w=1350&q=80" alt="" />
                {loading ?
                    <h1>Loading...</h1> :
                    <div className="Category-container pb-1">
                        {category.map(item => <Category key={item._id} {...item} />)}
                    </div>
                }
            </div>
        </>
    )

}

export default Home;