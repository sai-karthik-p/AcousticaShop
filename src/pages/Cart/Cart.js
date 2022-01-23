import React from "react";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";
import { useData } from "../../context/DataContext";
import Ratings from "../../components/Ratings/Ratings";
import { NavLink } from "react-router-dom";
// import styles from "./Products.module.css";

export default function Cart() {
  const { productList, showLoading, isError, productDispatch } = useData();

  let wishListCount = 0,
    cartCount = 0,
    cartTotal = 0;

  productList.map(({ isInWishlist }) => {
    if (isInWishlist === true) wishListCount++;
  });

  productList.map(({ isInCart, price }) => {
    if (isInCart === true) {
      cartCount++;
      cartTotal = cartTotal + parseInt(price, 10);
    }
  });

  return (
    <>
      <div>
        {showLoading && <LoadingIndicator />}
        {isError && <span>Oops, Something went wrong!</span>}

        {!cartCount && (
          <>
            <div
              style={{
                fontSize: "2rem",
                margin: "3rem 1rem",
                marginBottom: "0.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <span>Your cart is empty</span>
              <span
                style={{
                  fontSize: "3rem",
                  marginLeft: "0.5rem"
                }}
                className="material-icons-round"
              >
                heart_broken
              </span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <NavLink to="/products">
                <button className="btn btn-simple btn-with-icon">
                  <span className="material-icons md-18">storefront</span>
                  <span className="btn-text">Shop Now!</span>
                </button>
              </NavLink>
            </div>
          </>
        )}

        {cartCount && (
          <div
            style={{
              fontSize: "2rem",
              margin: "3rem 1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <span> Cart Total: ₹ {cartTotal}</span>

            <button
              onClick={() => {
                productDispatch({ type: "PLACE_ORDER" });
                alert("Your order is placed! Thanks for shopping with us!");
              }}
              className="btn btn-simple btn-with-icon"
            >
              <span className="material-icons md-18">{"local_shipping"}</span>
              <span className="btn-text">{"Place Order"}</span>
            </button>
          </div>
        )}

        <div className="card-container">
          {productList.map(
            ({
              id,
              name,
              image,
              price,
              discount,
              inStock,
              level,
              ratings,
              numberOfRatings,
              offer,
              isInWishlist,
              isInCart
            }) =>
              isInCart && (
                <div key={id} className="card card-hover-shadow">
                  {!inStock && (
                    <div className="card-text-overlay">
                      <span> Out of Stock </span>
                    </div>
                  )}

                  <div className="dismiss-container">
                    <div className="dismiss">
                      <button
                        onClick={() => {
                          productDispatch({
                            type: "REMOVE_FROM_CART",
                            payload: id
                          });
                        }}
                        className="btn btn-dismiss"
                      >
                        <span className="material-icons md-30"> cancel </span>
                      </button>
                    </div>
                  </div>

                  <div className="card-header">
                    <img src={image} alt={name} />
                    <p className="ribbon-text">{offer}</p>
                  </div>

                  <div className="card-body">
                    <span
                      className={
                        level === "beginner"
                          ? "colored-tag tag-teal"
                          : level === "intermediate"
                          ? "colored-tag tag-pink"
                          : "colored-tag tag-purple"
                      }
                    >
                      {level}
                    </span>
                    <h4>{name}</h4>
                    <div>
                      <span className="original-price">
                        ₹ {parseInt(price, 10)}
                      </span>
                      <span className="strikethrough-price">
                        ₹ {parseInt((price * 100) / (100 - discount), 10)}
                      </span>
                    </div>

                    <div className="rating-wrapper">
                      <Ratings ratings={ratings} />

                      <span className="card-reviews">
                        {numberOfRatings} reviews
                      </span>
                    </div>

                    <div className="flex-columns">
                      <button
                        onClick={() => {
                          productDispatch({
                            type: "TOGGLE_WISHLIST",
                            payload: id
                          });
                        }}
                        className="btn btn-outline btn-with-icon"
                      >
                        <span className="material-icons-round md-18 fav-span">
                          {isInWishlist ? "favorite" : "favorite_border"}
                        </span>
                      </button>
                      <button
                        onClick={() => {
                          productDispatch({
                            type: "ADD_TO_CART",
                            payload: id
                          });
                        }}
                        className="btn btn-simple btn-with-icon"
                      >
                        <span className="material-icons md-18">
                          {isInCart ? "done" : "add_shopping_cart"}
                        </span>
                        <span className="btn-text">
                          {isInCart ? "In Cart" : "Add to Cart"}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </>
  );
}
