import { Link } from 'react-router-dom'
export const EmptyPage = ({ label }) => {
    return (
        <div className="Empty mt-3">
            <h1>No items in {label}</h1>
            <p className="Empty-content">
                Please do some
                <span>
                    <Link className="Empty-link color-secondary" to="/shop"> shopping.
                </Link>
                </span>
            </p>

        </div>
    )
}