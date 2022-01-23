import React from "react";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";
import { useData } from "../../context/DataContext";
import Ratings from "../../components/Ratings/Ratings";
import { NavLink } from "react-router-dom";
// import styles from "./Products.module.css";

export default function Wishlist() {
  const { productList, showLoading, isError, productDispatch } = useData();

  let wishListCount = 0,
    cartCount = 0;

  productList.map(({ isInWishlist }) => {
    if (isInWishlist === true) wishListCount++;
  });

  productList.map(({ isInCart }) => {
    if (isInCart === true) cartCount++;
  });

  return (
    <>
      <div>
        {showLoading && <LoadingIndicator />}
        {isError && <span>Oops, Something went wrong!</span>}

        {!wishListCount && (
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
              <span>Your wishlist is empty</span>
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
              isInWishlist && (
                <div key={id} className="card card-hover-shadow">
                  {!inStock && (
                    <div className="card-text-overlay">
                      <span> Out of Stock </span>
                    </div>
                  )}

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
