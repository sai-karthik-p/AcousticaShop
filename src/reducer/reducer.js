import {
  initializeProducts,
  startLoading,
  stopLoading,
  setError,
  notError,
  toggleWishlist,
  addToCart,
  removeFromCart,
  placeOrder
} from "./products";

const reducer = {
  INIT_PRODUCTS: initializeProducts,
  START_LOADING: startLoading,
  STOP_LOADING: stopLoading,
  SET_ERROR: setError,
  NOT_ERROR: notError,
  TOGGLE_WISHLIST: toggleWishlist,
  ADD_TO_CART: addToCart,
  REMOVE_FROM_CART: removeFromCart,
  PLACE_ORDER: placeOrder
};

export const productReducerFunc = (state, action) => {
  return reducer[action.type](state, action);
};

export const initialState = {
  productList: [],
  showLoading: false,
  isError: false
};
