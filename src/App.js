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
    console.log("...Mounting");
    const prevItems = loadLocalStorageData();
    if (!prevItems) {
      console.log("...Dentro ");
      setAllStates((prevState) => ({ ...prevState, isLoading: true }));

      api.getProducts().then((data) => {
        setAllStates((prevState) => ({ ...prevState, products: data }));
        setAllStates((prevState) => ({ ...prevState, isLoading: false }));
        console.log(allStates);
      });
      return;
    }
    setAllStates((prevState) => ({
      ...prevState,
      cartItems: prevItems.cartItems,
    }));
    setAllStates((prevState) => ({
      ...prevState,
      products: prevItems.products,
    }));
  }, []);

  useEffect(() => {
    const { cartItems, products } = allStates;
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({
        cartItems,
        products,
      }),
    );
  }, [allStates.cartItems, allStates.products]);

  const handleAddToCart = (productId) => {
    const prevCartItem = allStates.cartItems.find(
      (item) => item.id === productId,
    );
    const foundProduct = allStates.products.find(
      (product) => product.id === productId,
    );

    if (prevCartItem) {
      const updatedCartItems = allStates.cartItems.map((item) => {
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
      setAllStates((prevState) => ({
        ...prevState,
        cartItems: updatedCartItems,
      }));

      return;
    }

    const updatedProduct = buildNewCartItem(foundProduct);

    setAllStates((prevState) => ({
      ...prevState,
      cartItems: updatedProduct,
    }));
  };

  const handleChange = (event, productId) => {
    const updatedCartItems = allStates.cartItems.map((item) => {
      if (item.id === productId && item.quantity <= item.unitsInStock) {
        return {
          ...item,
          quantity: Number(event.target.value),
        };
      }

      return item;
    });
    setAllStates((prevState) => ({
      ...prevState,
      cartItems: updatedCartItems,
    }));
  };

  const handleRemove = (productId) => {
    const updatedCartItems = allStates.cartItems.filter(
      (item) => item.id !== productId,
    );
    setAllStates((prevState) => ({
      ...prevState,
      cartItems: updatedCartItems,
    }));
  };

  const handleDownVote = (productId) => {
    const updatedProducts = allStates.products.map((product) => {
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
    setAllStates((prevState) => ({
      ...prevState,
      products: updatedProducts,
    }));
  };

  const handleUpVote = (productId) => {
    const updatedProducts = allStates.products.map((product) => {
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
    setAllStates((prevState) => ({
      ...prevState,
      cartItems: updatedProducts,
    }));
  };

  const handleSetFavorite = (productId) => {
    const updatedProducts = allStates.products.map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          isFavorite: !product.isFavorite,
        };
      }

      return product;
    });

    setAllStates((prevState) => ({
      ...prevState,
      cartItems: updatedProducts,
    }));
  };

  const saveNewProduct = (newProduct) => {
    setAllStates((prevState) => {
      return { ...prevState, products: [...prevState.products, newProduct] };
    });
    setAllStates((prevState) => ({
      ...prevState,
      newProductFormOpen: !prevState.newProductFormOpen,
    }));
  };

  console.log(allStates.products, "productos");
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
