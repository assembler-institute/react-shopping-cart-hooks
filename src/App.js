import React, { useEffect, useState } from "react";
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
  /**
   *  Global state for the e-commerce 
   */
  const [data, setData] = useState({
    products: [],
    cartItems: [],
    isLoading: false,
    hasError: false,
    loadingError: null
  })

  /**
   *  OnMount
   */
  useEffect(() => {
    const prevItems = loadLocalStorageData();

    if (!prevItems) {
      setData((prevState) => ({...prevState, isLoading: true}));

      api.getProducts().then((data) => {
        setData((prevState) => ({
          ...prevState, 
          products: data, 
          isLoading: false
        }))
      });
      return;
    }

    setData((prevState) => ({
      ...prevState, 
      cartItems: prevItems.cartItems, 
      products: prevItems.products
    }))

  }, [])

  /**
   * On Update
   */
  useEffect(() => {
    const {cartItems, products} = data
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({ cartItems, products }),
    );
  }, [data.products, data.cartItems])

  /**
   *  Methods
   */
  function handleAddToCart(productId) {
    const { cartItems, products } = data;

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

      setData((prevState) => ({...prevState, cartItems: updatedCartItems }));
      return;
    }

    const updatedProduct = buildNewCartItem(foundProduct);
    setData((prevState) => ({...prevState, cartItems: [...prevState.cartItems, updatedProduct]}))
  }
  
  function handleRemove(productId) {
    const { cartItems } = data;
    const updatedCartItems = cartItems.filter((item) => item.id !== productId);

    setData((prevState) => ({...prevState, cartItems: updatedCartItems}));
  }

  function handleChange(event, productId) {
    const { cartItems } = data;

    const updatedCartItems = cartItems.map((item) => {
      if (item.id === productId && item.quantity <= item.unitsInStock) {
        return {
          ...item,
          quantity: Number(event.target.value),
        };
      }

      return item;
    });

    setData((prevState) => ({...prevState,  cartItems: updatedCartItems }))
  }

  function handleDownVote(productId) {
    const { products } = data;

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

    setData((prevState) => ({...prevState, products: updatedProducts}))
  }

  function handleUpVote(productId) {
    const { products } = data;

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

    setData((prevState) => ({...prevState, products: updatedProducts}))
  }

  function handleSetFavorite(productId) {
    const { products } = data;

    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          isFavorite: !product.isFavorite,
        };
      }

      return product;
    });

    setData((prevState) => ({...prevState, products: updatedProducts}))
  }

  function saveNewProduct(newProduct) {
    setData((prevState) => ({
      products: [newProduct, ...prevState.products],
      newProductFormOpen: !prevState.newProductFormOpen,
    }));
  }

  return (
    <BrowserRouter>
    <Route
      path="/"
      exact
      render={(routeProps) => (
        <Home
          {...routeProps}
          fullWidth
          cartItems={data.cartItems}
          products={data.products}
          isLoading={data.isLoading}
          hasError={data.hasError}
          loadingError={data.loadingError}
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
  )
}

export default App;
