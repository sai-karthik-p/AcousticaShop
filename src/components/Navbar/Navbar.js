import styles from "./Navbar.module.css";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import logoWhite from "../../assets/acoustica-logo-white.png";

import React, { useReducer, useEffect } from "react";
import { useData } from "../../context/DataContext";

export default function Navbar() {
  const { productList } = useData();

  let wishListCount = 0,
    cartCount = 0;

  productList.map(({ isInWishlist }) => {
    if (isInWishlist === true) wishListCount++;
  });

  productList.map(({ isInCart }) => {
    if (isInCart === true) cartCount++;
  });

  return (
    <div className={`${styles.navOuter}`}>
      <div className="container row items-center">
        <NavLink to="/" className={`ml-4 h-full ${styles.logoContainer}`}>
          <span className={styles.logoText}>Acoustica Shop</span>
        </NavLink>

        <div className="row ml-auto">
          <NavLink to="/products">
            <button className={`btn btn-simple mx-0`}>Shop</button>
          </NavLink>

          <NavLink to="/wishlist">
            <button className={`btn btn-simple mx-0`}>
              <span className="wishlist-with-badge">
                <span className="material-icons md-24"> favorite_border </span>
                <span className={`${styles.badgeNumber}`}>{wishListCount}</span>
              </span>
            </button>
          </NavLink>

          <NavLink to="/cart">
            <button className={`btn btn-simple`}>
              <span className="cart-with-badge">
                <span className="material-icons-outlined md-24">
                  shopping_cart
                </span>
                <span className={`${styles.badgeNumber}`}>{cartCount}</span>
              </span>
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
