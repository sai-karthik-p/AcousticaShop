import { useEffect, useContext, createContext, useReducer } from "react";
import axios from "axios";
import { initialState, productReducerFunc } from "../reducer/reducer";

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export function DataProvider({ children }) {
  const [state, productDispatch] = useReducer(productReducerFunc, initialState);

  useEffect(() => {
    const fetchData = async () => {
      productDispatch({ type: "START_LOADING" });

      try {
        const {
          data: { products: productsFromAPI }
        } = await axios.get("/api/products");
        productDispatch({ type: "STOP_LOADING" });
        productDispatch({ type: "INIT_PRODUCTS", payload: productsFromAPI });
        console.log(productsFromAPI);
      } catch {
        productDispatch({ type: "SET_ERROR" });
        productDispatch({ type: "STOP_LOADING" });
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        productList: state.productList,
        showLoading: state.showLoading,
        isError: state.isError,
        productDispatch
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
