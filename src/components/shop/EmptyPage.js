import { Link } from 'react-router-dom'
export const EmptyPage = ({ label }) => {
    return (
        <div className="Empty">
            <div class="Empty-card card flex flex--column flex--center">
                <h1>No items in {label}</h1>
                <p className="Empty-text mt-2">
                    Please do some
                    <Link className="Empty-link color-secondary" to="/products"> shopping.</Link>
                </p>
            </div>
        </div>
    )
}