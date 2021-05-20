import { Link } from 'react-router-dom'
import { useStore } from '../../context/storeContext'

const CategoryCard = ({_id:productId, name,image,desc, price}) => {
    return (
        <div key={productId} class="Category-card card card--col flex flex--column">
            <div class="Category-card__header card__header--col pos-rel flex flex--column">
                <img class="card__image" src={image[0]} alt="card-image" />
                {/* <i class="card__icon card__icon--col bi bi-heart-fill color-primary"></i> */}
            </div>
            <div class="Category-card__content card__content--col flex flex--column flex--justify_around">
                <h3 className="Category-name">{name}</h3>
                <span className="Category-price color-secondary">Price: ₹{parseInt(price.mrp)}</span>
                {/* <button class="btn btn-secondary color-light btn-round--corner">Add To Cart</button> */}
            </div>
        </div>
    )
}

const Category = ({ name, _id: categId, products }) => {

    return (
        <div className="Category">
            <h3 className="Category__title mtb-1">{name}</h3>
            <div className="Category__content flex flex--justify_around">
                {products.slice(0,4).map(item => <CategoryCard {...item}/>)}
            </div>
        </div>
    )
}
const Home = ({ loading }) => {
    const { category } = useStore()
    return (
        <>
            <div>
                <img className="Banner" src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&w=1350&q=80" alt="" />
                {loading ?
                    <h1>Loading...</h1> :
                    <div className="Category-container pb-1">
                        {category.map(item => <Category {...item} />)}
                    </div>
                }
            </div>
        </>
    )

}

export default Home;