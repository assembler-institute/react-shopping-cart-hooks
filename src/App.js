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
  const [appData, setAppData] = useState({
    products: [],
    cartItems: [],
    isLoading: false,
    hasError: false,
    loadingError: null,
  });

  useEffect(() => {
    const prevItems = loadLocalStorageData();

    if (!prevItems) {
      setAppData((props) => ({
        ...props,
        isLoading: true,
      }));

      api.getProducts().then((data) => {
        setAppData((prevState) => ({
          ...prevState,
          products: data,
          isLoading: false,
        }));
      });
      return;
    }
    setAppData((props) => ({
      ...props,
      cartItems: prevItems.cartItems,
      products: prevItems.products,
    }));
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(appData));
  }, [appData.products, appData.cartItems]);

  function handleAddToCart(productId) {
    //   const { cartItems, products } = this.state;

    const prevCartItem = appData.cartItems.find(
      (item) => item.id === productId,
    );
    const foundProduct = appData.products.find(
      (product) => product.id === productId,
    );
    console.log(prevCartItem);

    if (prevCartItem) {
      const updatedCartItems = appData.cartItems.map((item) => {
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

      setAppData((props) => ({
        ...props,
        cartItems: updatedCartItems,
      }));
      return;
    }

    const updatedProduct = buildNewCartItem(foundProduct);
    setAppData((prevState) => ({
      ...prevState,
      cartItems: [...prevState.cartItems, updatedProduct],
    }));
  }

  function handleChange(event, productId) {
    // const { cartItems } = this.state;

    const updatedCartItems = appData.cartItems.map((item) => {
      if (item.id === productId && item.quantity <= item.unitsInStock) {
        return {
          ...item,
          quantity: Number(event.target.value),
        };
      }

      return item;
    });

    setAppData((props) => ({
      ...props,
      cartItems: updatedCartItems,
    }));
  }

  function handleRemove(productId) {
    // const { cartItems } = this.state;
    const updatedCartItems = appData.cartItems.filter(
      (item) => item.id !== productId,
    );

    setAppData((props) => ({
      ...props,
      cartItems: updatedCartItems,
    }));
  }

  function handleDownVote(productId) {
    // const { products } = this.state;

    const updatedProducts = appData.products.map((product) => {
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

    setAppData((props) => ({
      ...props,
      products: updatedProducts,
    }));
  }

  function handleUpVote(productId) {
    // const { products } = this.state;

    const updatedProducts = appData.products.map((product) => {
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

    setAppData((props) => ({
      ...props,
      products: updatedProducts,
    }));
  }

  function handleSetFavorite(productId) {
    // const { products } = this.state;

    const updatedProducts = appData.products.map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          isFavorite: !product.isFavorite,
        };
      }

      return product;
    });

    setAppData((props) => ({
      ...props,
      products: updatedProducts,
    }));
  }

  function saveNewProduct(newProduct) {
    setAppData((prevState) => ({
      ...prevState,
      products: [newProduct, ...prevState.products],
      newProductFormOpen: !prevState.newProductFormOpen,
    }));
  }

  // render() {
  //   const {
  //     cartItems,
  //     products,
  //     isLoading,
  //     hasError,
  //     loadingError,
  //   } = this.state;

  return (
    <BrowserRouter>
      <Route
        path="/"
        exact
        render={(routeProps) => (
          <Home
            {...routeProps}
            fullWidth
            cartItems={appData.cartItems}
            products={appData.products}
            isLoading={appData.isLoading}
            hasError={appData.hasError}
            loadingError={appData.loadingError}
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
// }

export default App;
