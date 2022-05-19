import React from "react";

import "./header.styles.scss";

import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { auth } from '../../firebase/firebase.utils';

import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

import { createStructuredSelector } from "reselect";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";

import { ReactComponent as Logo } from "../../assets/images/emptum.svg";



const Header = ({ currentUser, hidden }) => (
    <div className="header">
        <Link className="logo-container" to="/">
            <Logo className="logo" />
        </Link>
        <div className="options">
            <Link className="option" to="/shop"> shop </Link>
            <Link className="option" to="/contact"> contact </Link>
            { 
                currentUser ?
                <div className="option" onClick={() => auth.signOut()}>sign out</div>
                :
                <Link className="option" to="/signin">sign in</Link> 
            }
            <CartIcon />
        </div>
        { hidden ? null : <CartDropdown /> }     
    </div>
)

const mapStateToProps =  createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);