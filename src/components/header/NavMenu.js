import { Link } from 'react-router-dom';
import {useData} from '../../context/dataContext';
import {useStore} from '../../context/storeContext';
import {getTotalQty} from '../../helpers/utils';
import {searchStore} from '../../context/actions/storeActions'
export const NavMenu = () => {
    const {cartItems} = useData();
    const {storeDispatch} = useStore();
    return (
        <>
            <div className="header">
                <div className="header__wrapper flex flex--justify_between flex--align_center">
                    <Link to="/" className="header__brand flex flex--align_center">
                        <img className="header__brand__logo" src={process.env.PUBLIC_URL + "/assets/img/logo.svg"} alt="logo" />
                        <span className="header__brand__title">GEEKY BAS<strong className="color-secondary">K8</strong> </span>
                    </Link>
                    <nav className="navigation header__nav flex flex--justify_between flex--align_center">
                        <div className="search-bar pos-rel">
                            <input className="search-bar__input" type="text" name="search"
                                onChange = {(e) => storeDispatch(searchStore(e.target.value))}
                                placeholder="Search for products" />
                            <i className="search-bar__icon bi bi-search"></i>
                        </div>
                        <ul className="nav header__list flex flex--justify_between flex--align_center">
                            <li><Link className="header__list__item" to="/">Home</Link></li>
                            <li><Link className="header__list__item" to="/shop">Shop</Link></li>
                            {/* <li><Link className="header__list__item" to="/login">Login</Link></li> */}
                            <li><Link className="nav-cart header__list__item" to="/wishlist">
                                <i className="bi bi-suit-heart-fill nav-cart__basket"></i>
                            </Link></li>
                            <li><Link className="nav-cart header__list__item flex flex--justify_between" to="/cart">
                                <div className="nav-cart__item pos-rel">
                                    <span className="nav-cart__counter color-secondary">{getTotalQty(cartItems)}</span>
                                    <i className="bi bi-basket nav-cart__basket"></i>
                                </div>
                                <div className="nav-cart__item">
                                    <span>Basket</span>
                                </div>
                            </Link></li>
                            
                        </ul>
                    </nav>
                </div>
            </div>
        </>)
}
