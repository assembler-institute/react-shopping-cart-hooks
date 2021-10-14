import React, { useEffect, useState } from "react";
import * as api from "../../api/getProducts";

function useApp(loadLocalStorageData, LOCAL_STORAGE_KEY) {
  const [products, setProducts] = useState([]);

  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [loadingError, setLoadingError] = useState(null);

  useEffect(() => {
    const prevItems = loadLocalStorageData();

    if (!prevItems) {
      setIsLoading(true);

      api.getProducts().then((data) => {
        setProducts(data);
        setIsLoading(false);
      });
      return;
    }

    setProducts(prevItems.products);
    setCartItems(prevItems.cartItems);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({ cartItems, products }),
    );
  }, [products, cartItems]);

  return {
    products: products,
    cartItems: cartItems,
    isLoading: isLoading,
    hasError: hasError,
    loadingError: loadingError,
    setCartItems: setCartItems,
    setProducts: setProducts,
  };
}

export default useApp;
