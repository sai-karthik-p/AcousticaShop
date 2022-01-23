import React, { useReducer } from "react";
import axios from "axios";
import {
  getSortedData,
  getFilteredData
} from "../../utils/sortFilterUtilities";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";
import Ratings from "../../components/Ratings/Ratings";
import { useData } from "../../context/DataContext";
// import styles from "./Products.module.css";

function sortFilterReducerFunc(state, action) {
  switch (action.type) {
    case "SORT":
      return { ...state, sortBy: action.payload };

    case "TOGGLE_INVENTORY":
      return { ...state, showInventoryAll: !state.showInventoryAll };

    case "TOGGLE_DELIVERY":
      return { ...state, showFastDeliveryOnly: !state.showFastDeliveryOnly };

    case "CHANGE_PRICE_RANGE":
      return { ...state, priceRange: action.payload };

    default:
      return state;
  }
}

export default function Products() {
  const { productList, showLoading, isError, productDispatch } = useData();

  const [
    { showInventoryAll, showFastDeliveryOnly, sortBy, priceRange },
    sortFilterDispatch
  ] = useReducer(sortFilterReducerFunc, {
    showInventoryAll: true,
    showFastDeliveryOnly: false,
    sortBy: "RELEVANCE",
    priceRange: 1000
  });

  const sortedData = getSortedData(productList, sortBy);
  const filteredData = getFilteredData(sortedData, priceRange, {
    showInventoryAll,
    showFastDeliveryOnly
  });

  let wishListCount, cartCount;

  wishListCount = filteredData.map(({ isInWishlist }) => {
    return isInWishlist ? wishListCount + 1 : wishListCount;
  });

  cartCount = filteredData.map(({ isInCart }) => {
    return isInCart ? cartCount + 1 : cartCount;
  });

  function handleAddOrRemoveFromWishlist(id) {
    productDispatch({
      type: "TOGGLE_WISHLIST",
      payload: id
    });
  }

  function handleAddToCart(id) {
    productDispatch({ type: "ADD_TO_CART", payload: id });
  }

  return (
    <>
      <div>
        <fieldset>
          <legend>Sort By</legend>

          <label>
            <input
              style={{
                marginTop: "0.2rem",
                marginRight: "0.5rem",
                transform: "scale(1.5)"
              }}
              type="radio"
              name="sort"
              onChange={() => {
                sortFilterDispatch({
                  type: "SORT",
                  payload: "RELEVANCE"
                });
              }}
              checked={sortBy && sortBy === "RELEVANCE"}
            ></input>
            <span>Relevance</span>
          </label>

          <label>
            <input
              style={{
                marginLeft: "1rem",
                marginTop: "0.2rem",
                marginRight: "0.5rem",
                transform: "scale(1.5)"
              }}
              type="radio"
              name="sort"
              onChange={() => {
                sortFilterDispatch({
                  type: "SORT",
                  payload: "PRICE_LOW_TO_HIGH"
                });
              }}
              checked={sortBy && sortBy === "PRICE_LOW_TO_HIGH"}
            ></input>
            <span>Price - Low to High</span>
          </label>

          <label>
            <input
              style={{
                marginLeft: "1rem",
                marginTop: "0.2rem",
                marginRight: "0.5rem",
                transform: "scale(1.5)"
              }}
              type="radio"
              name="sort"
              onChange={() => {
                sortFilterDispatch({
                  type: "SORT",
                  payload: "PRICE_HIGH_TO_LOW"
                });
              }}
              checked={sortBy && sortBy === "PRICE_HIGH_TO_LOW"}
            ></input>
            <span>Price - High to Low</span>
          </label>
        </fieldset>

        <fieldset style={{ marginTop: "1rem" }}>
          <legend>Filters</legend>
          <label>
            <input
              style={{
                marginTop: "0.2rem",
                marginRight: "0.5rem"
              }}
              type="checkbox"
              name="filter"
              id="filter"
              checked={showInventoryAll}
              onChange={() => sortFilterDispatch({ type: "TOGGLE_INVENTORY" })}
            ></input>
            <span>Include Out of Stock</span>
          </label>
          <label>
            <input
              style={{
                marginLeft: "1rem",
                marginTop: "0.2rem",
                marginRight: "0.5rem"
              }}
              type="checkbox"
              name="filter"
              id="filter"
              checked={showFastDeliveryOnly}
              onChange={() => sortFilterDispatch({ type: "TOGGLE_DELIVERY" })}
            ></input>
            <span>Fast Delivery Only</span>
          </label>
          <label
            style={{
              display: "block",
              marginTop: "0.5rem",
              padding: "0.5rem 1rem"
            }}
          >
            <span>Price Under</span>
            <input
              style={{ marginLeft: "1rem" }}
              type="range"
              min={50}
              max={1000}
              step={50}
              value={priceRange}
              onChange={(e) =>
                sortFilterDispatch({
                  type: "CHANGE_PRICE_RANGE",
                  payload: Number(e.target.value)
                })
              }
            />
          </label>
          <span
            style={{
              padding: "1rem"
            }}
          >
            {priceRange}
          </span>
        </fieldset>

        {showLoading && <LoadingIndicator />}
        {isError && <span>Oops, Something went wrong!</span>}

        <div className="card-container">
          {filteredData.map(
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
            }) => (
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
                        handleAddOrRemoveFromWishlist(id);
                      }}
                      className="btn btn-outline btn-with-icon"
                    >
                      <span className="material-icons-round md-18 fav-span">
                        {isInWishlist ? "favorite" : "favorite_border"}
                      </span>
                    </button>
                    <button
                      onClick={() => handleAddToCart(id)}
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
