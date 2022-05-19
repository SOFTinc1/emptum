import React from "react";
import "./homepage-banner2.styles.scss";
import {  } from "react-router-dom";
// import { Link } from "react-router-dom";
// import ShopPage from "../../pages/shop/shop.component";

const HomepageBanner2 = ({ navigate }) => (
    <div className="two">
        <h1>amazing deals <br /> from <br /> manufacturer</h1>
        <div className="bar">
            <span>all categories <span className="slash">|</span> </span>
            <span>shop with ease <span className="slash">|</span></span>
            <span>become a vendor <span className="slash">|</span></span>
            <span>own an account </span>
            <button to="/shop">let's go</button>
            {/* <Link>
                <button to="/shop">let's go</button>
            </Link> */}
        </div>

        <div className='scroll' align="center">
            <div className="icon-scroll"></div>
        </div>
    </div>
)

export default HomepageBanner2;