export const initializeProducts = (state, { payload }) => {
  return { ...state, productList: payload };
};

export const startLoading = (state) => {
  return { ...state, showLoading: true };
};

export const stopLoading = (state) => {
  return { ...state, showLoading: false };
};

export const setError = (state) => {
  return { ...state, isError: true };
};

export const notError = (state) => {
  return { ...state, isError: false };
};

export const toggleWishlist = (state, { payload }) => {
  return {
    ...state,
    productList: state.productList.map((item) =>
      item.id === payload ? { ...item, isInWishlist: !item.isInWishlist } : item
    )
  };
};

export const addToCart = (state, { payload }) => {
  return {
    ...state,
    productList: state.productList.map((item) =>
      item.id === payload ? { ...item, isInCart: true } : item
    )
  };
};

export const removeFromCart = (state, { payload }) => {
  return {
    ...state,
    productList: state.productList.map((item) =>
      item.id === payload ? { ...item, isInCart: false } : item
    )
  };
};

export const placeOrder = (state) => {
  return {
    ...state,
    productList: state.productList.map(
      (item) => item && { ...item, isInCart: false }
    )
  };
};
