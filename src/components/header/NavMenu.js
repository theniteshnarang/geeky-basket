import { NavLink } from 'react-router-dom';
import { useData } from '../../context/dataProvider';
import { useAuth } from '../../context/authProvider'
// import logo from '../../assets/logo/gblogo.svg';
import { getTotalQty } from '../../helpers/utils';
export const NavMenu = () => {
    const { cartItems } = useData();
    const { user, handleLogout, token } = useAuth()
    return (
        <>
            <div className="header">
                <div className="header__wrapper flex flex--justify_between flex--align_center">
                    <NavLink to="/" className="header__brand flex flex--align_center">
                        {/* <img src={logo} alt="" /> */}
                        {/* <img className="header__brand__logo" src={process.env.PUBLIC_URL + "/assets/img/logo.svg"} alt="logo" /> */}
                        <span className="header__brand__title ">Geeky<span className="color-secondary">Basket</span></span>
                    </NavLink>
                    <nav className="navigation header__nav flex flex--justify_between flex--align_center">
                        <ul className="nav header__list flex flex--justify_between flex--align_center">
                            <li><NavLink className="header__list__item" to="/" end>Home</NavLink></li>
                            <li><NavLink className="header__list__item" to="/products">Shop</NavLink></li>
                            {/* <li><NavLink className="header__list__item" to="/login">Login</NavLink></li> */}
                            <li><NavLink className="nav-cart header__list__item" to="/wishlist">
                                <i className="bi bi-suit-heart-fill nav-cart__basket"></i>
                            </NavLink></li>
                            <li><NavLink className="nav-cart header__list__item" to="/cart">
                                <div className="nav-cart__item pos-rel">
                                    <span className="nav-cart__counter color-secondary">{getTotalQty(cartItems)}</span>
                                    <i className="bi bi-basket nav-cart__basket"></i>
                                </div>
                            </NavLink></li>

                        </ul>
                        <ul className="navigation__account flex flex--justify_around flex--align_center color-light flex flex--align_center">
                            <li><NavLink to="/login" className="color-light">Hello, {user?.name ? user.name : "Sign In"}</NavLink></li>
                            {token ?
                                <li>
                                    <button onClick={handleLogout} className="btn btn-secondary btn-sm">logout</button>
                                </li>
                                :
                                <li>
                                    <img className="avatar"
                                        src="https://images.unsplash.com/photo-1526653054275-5a4f37ea1c64?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"

                                        alt="avatar-img" />
                                </li>
                            }
                        </ul>
                    </nav>
                </div>
            </div>
        </>)
}
