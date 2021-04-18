import { Link } from 'react-router-dom'
const Home = () => {

    return (
        <>
            <div>
                <h1>Home Page is under maintenance.</h1>
                <h3 className="mt-3">Please visit <Link to="/shop">
                    shop page
                </Link>
                </h3>
            </div>
        </>
    )

}

export default Home;