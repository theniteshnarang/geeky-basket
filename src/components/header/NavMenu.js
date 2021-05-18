import { Link } from 'react-router-dom';
import { useData } from '../../context/dataContext';
// import logo from '../../assets/logo/gblogo.svg';
import { getTotalQty } from '../../helpers/utils';
export const NavMenu = () => {
    const { cartItems } = useData();
    return (
        <>
            <div className="header">
                <div className="header__wrapper flex flex--justify_between flex--align_center">
                    <Link to="/" className="header__brand flex flex--align_center">
                        {/* <img src={logo} alt="" /> */}
                        {/* <img className="header__brand__logo" src={process.env.PUBLIC_URL + "/assets/img/logo.svg"} alt="logo" /> */}
                        <span className="header__brand__title ">Geeky Basket</span>
                    </Link>
                    <nav className="navigation header__nav flex flex--justify_between flex--align_center">
                        <ul className="nav header__list flex flex--justify_between flex--align_center">
                            <li><Link className="header__list__item" to="/">Home</Link></li>
                            <li><Link className="header__list__item" to="/products">Shop</Link></li>
                            {/* <li><Link className="header__list__item" to="/login">Login</Link></li> */}
                            <li><Link className="nav-cart header__list__item" to="/wishlist">
                                <i className="bi bi-suit-heart-fill nav-cart__basket"></i>
                            </Link></li>
                            <li><Link className="nav-cart header__list__item" to="/cart">
                                <div className="nav-cart__item pos-rel">
                                    <span className="nav-cart__counter color-secondary">{getTotalQty(cartItems)}</span>
                                    <i className="bi bi-basket nav-cart__basket"></i>
                                </div>
                            </Link></li>

                        </ul>
                        <ul className="navigation__account flex flex--justify_around flex--align_center color-light flex flex--align_center">
                            
                            <li>Hello, Sign in</li>
                            <li>
                                <img className="avatar"
                                    src="https://images.unsplash.com/photo-1598463166228-c0f90d180918?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=453&q=80"

                                    alt="avatar-img" />
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>)
}
