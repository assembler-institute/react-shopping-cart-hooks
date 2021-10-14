import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Home from "./pages/Home";
import NewProduct from "./pages/NewProduct";

import * as api from "./api";

const LOCAL_STORAGE_KEY = "react-sc-state";

function loadLocalStorageData() {
  const prevItems = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (!prevItems) {
    return null;
  }

  try {
    return JSON.parse(prevItems);
  } catch (error) {
    return null;
  }
}

function buildNewCartItem(cartItem) {
  if (cartItem.quantity >= cartItem.unitsInStock) {
    return cartItem;
  }

  return {
    id: cartItem.id,
    title: cartItem.title,
    img: cartItem.img,
    price: cartItem.price,
    unitsInStock: cartItem.unitsInStock,
    createdAt: cartItem.createdAt,
    updatedAt: cartItem.updatedAt,
    quantity: cartItem.quantity + 1,
  };
}

function App() {
  const [allStates, setAllStates] = useState({
    products: [],
    cartItems: [],
    isLoading: false,
    hasError: false,
    loadingError: null,
    newProductFormOpen: null,
  });

  useEffect(() => {
    const prevItems = loadLocalStorageData();
    if (!prevItems) {
      setAllStates((allStates.isLoading = true));

      api.getProducts().then((data) => {
        console.log(data);
        setAllStates((allStates.products = data));
        setAllStates((allStates.isLoading = false));
      });
      return;
    }
    setAllStates((allStates.cartItems = prevItems.cartItems));
    setAllStates((allStates.products = prevItems.products));
  }, []);

  useEffect(() => {
    console.log("USEFFECT");
    console.log(allStates, "allstates");
    console.log(allStates.products);

    console.log(allStates.products);
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({
        allStates,
      }),
    );
  }, [allStates.cartItems, allStates.products]);

  const handleAddToCart = (productId) => {
    const prevCartItem = cartItems.find((item) => item.id === productId);
    const foundProduct = products.find((product) => product.id === productId);

    if (prevCartItem) {
      const updatedCartItems = cartItems.map((item) => {
        if (item.id !== productId) {
          return item;
        }

        if (item.quantity >= item.unitsInStock) {
          return item;
        }

        return {
          ...item,
          quantity: item.quantity + 1,
        };
      });
      setAllStates((allStates.cartItems = updatedCartItems));
      return;
    }

    const updatedProduct = buildNewCartItem(foundProduct);

    setAllStates((prevState) => {
      return (allStates.cartItems = [...prevState.cartItems, updatedProduct]);
    });
  };

  const handleChange = (event, productId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === productId && item.quantity <= item.unitsInStock) {
        return {
          ...item,
          quantity: Number(event.target.value),
        };
      }

      return item;
    });
    setAllStates((allStates.cartItems = updatedCartItems));
  };

  const handleRemove = (productId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== productId);
    setAllStates((allStates.cartItems = updatedCartItems));
  };

  const handleDownVote = (productId) => {
    const updatedProducts = products.map((product) => {
      if (
        product.id === productId &&
        product.votes.downVotes.currentValue <
          product.votes.downVotes.lowerLimit
      ) {
        return {
          ...product,
          votes: {
            ...product.votes,
            downVotes: {
              ...product.votes.downVotes,
              currentValue: product.votes.downVotes.currentValue + 1,
            },
          },
        };
      }

      return product;
    });
    setAllStates((allStates.products = updatedProducts));
  };

  const handleUpVote = (productId) => {
    const updatedProducts = products.map((product) => {
      if (
        product.id === productId &&
        product.votes.upVotes.currentValue < product.votes.upVotes.upperLimit
      ) {
        return {
          ...product,
          votes: {
            ...product.votes,
            upVotes: {
              ...product.votes.upVotes,
              currentValue: product.votes.upVotes.currentValue + 1,
            },
          },
        };
      }

      return product;
    });
    setAllStates((allStates.products = updatedProducts));
  };

  const handleSetFavorite = (productId) => {
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          isFavorite: !product.isFavorite,
        };
      }

      return product;
    });

    setAllStates((allStates.products = updatedProducts));
  };

  const saveNewProduct = (newProduct) => {
    setAllStates((prevState) => {
      return (allStates.products = [...prevState.products, newProduct]);
    });
    setAllStates((prevState) => {
      return (allStates.newProductFormOpen = !prevState.newProductFormOpen);
    });
  };
  // console.log(allStates);
  // const { cartItems, products, isLoading, hasError, loadingError } = allStates;

  return (
    <BrowserRouter>
      <Route
        path="/"
        exact
        render={(routeProps) => (
          <Home
            {...routeProps}
            fullWidth
            cartItems={allStates.cartItems}
            products={allStates.products}
            isLoading={allStates.isLoading}
            hasError={allStates.hasError}
            loadingError={allStates.loadingError}
            handleDownVote={handleDownVote}
            handleUpVote={handleUpVote}
            handleSetFavorite={handleSetFavorite}
            handleAddToCart={handleAddToCart}
            handleRemove={handleRemove}
            handleChange={handleChange}
          />
        )}
      />
      <Route
        path="/new-product"
        exact
        render={(routeProps) => (
          <NewProduct {...routeProps} saveNewProduct={saveNewProduct} />
        )}
      />
    </BrowserRouter>
  );
}

export default App;
