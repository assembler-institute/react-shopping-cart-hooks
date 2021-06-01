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
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [loadingError, setLoadingError] = useState(null);

  useEffect(() => {
    async function loadData() {
      const prevItems = loadLocalStorageData();
      if (!prevItems) {
        setIsLoading(true);
        try {
          const productResponse = await api.getProducts();
          if (productResponse.data) {
            setProducts(productResponse.data);
            setIsLoading(false);
          }
        } catch (error) {
          setHasError(true);
          setIsLoading(false);
          setLoadingError("Error");
        }
      } else {
        setProducts(prevItems.products);
      }
      setCartItems(prevItems.cartItems);
    }
    loadData();
  }, []);

  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({ cartItems, products }),
    );
  }, [cartItems, products]);

  function handleAddToCart(productId) {
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
      setCartItems(updatedCartItems);
      return;
    }
    const updatedProduct = buildNewCartItem(foundProduct);
    setCartItems([...cartItems, updatedProduct]);
  }
  function handleChange(event, productId) {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === productId && item.quantity <= item.unitsInStock) {
        return {
          ...item,
          quantity: Number(event.target.value),
        };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  }
  function handleRemove(productId) {
    const updatedCartItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCartItems);
  }
  function handleDownVote(productId) {
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
    setProducts(updatedProducts);
  }
  function handleUpVote(productId) {
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
    setProducts(updatedProducts);
  }
  function handleSetFavorite(productId) {
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          isFavorite: !product.isFavorite,
        };
      }
      return product;
    });
    setProducts(updatedProducts);
  }
  function saveNewProduct(newProduct) {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
    // newProductFormOpen: !prevState.newProductFormOpen
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
            cartItems={cartItems}
            products={products}
            isLoading={isLoading}
            hasError={hasError}
            loadingError={loadingError}
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
