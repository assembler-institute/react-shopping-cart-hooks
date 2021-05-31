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
  // constructor(props) {
  //   super(props);

  // this.state = {
  //   products: [],
  //   cartItems: [],
  //   isLoading: false,
  //   hasError: false,
  //   loadingError: null,
  // };

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [dataState, setDataState] = useState({
    isLoading: false,
    hasError: false,
    loadingError: null,
    newProductFormOpen: false,
  });

  // this.handleAddToCart = this.handleAddToCart.bind(this);
  // this.handleRemove = this.handleRemove.bind(this);
  // this.handleChange = this.handleChange.bind(this);
  // this.handleDownVote = this.handleDownVote.bind(this);
  // this.handleUpVote = this.handleUpVote.bind(this);
  // this.handleSetFavorite = this.handleSetFavorite.bind(this);
  // this.saveNewProduct = this.saveNewProduct.bind(this);
  // }

  // componentDidMount() {
  //   const prevItems = loadLocalStorageData();

  //   if (!prevItems) {
  //     this.setState({
  //       isLoading: true,
  //     });

  //     api.getProducts().then((data) => {
  //       this.setState({
  //         products: data,
  //         isLoading: false,
  //       });
  //     });
  //     return;
  //   }

  //   this.setState({
  //     cartItems: prevItems.cartItems,
  //     products: prevItems.products,
  //   });
  // }

  // componentDidUpdate() {
  //   const { cartItems, products } = this.state;

  //   localStorage.setItem(
  //     LOCAL_STORAGE_KEY,
  //     JSON.stringify({ cartItems, products }),
  //   );
  // }

  // componentDidMount
  useEffect(() => {
    const prevItems = loadLocalStorageData();

    if (!prevItems) {
      setDataState((prevData) => ({ ...prevData, isLoading: true }));

      api.getProducts().then((data) => {
        // this.setState({
        //   products: data,
        //   isLoading: false,
        // });
        setProducts(data);
        setDataState((prevData) => ({ ...prevData, isLoading: false }));
      });
      return;
    }

    setProducts(prevItems.products);
    setCartItems(prevItems.cartItems);

    // this.setState({
    //   cartItems: prevItems.cartItems,
    //   products: prevItems.products,
    // });
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

      // this.setState({ cartItems: updatedCartItems });
      setCartItems(updatedCartItems);
      return;
    }

    const updatedProduct = buildNewCartItem(foundProduct);
    // this.setState((prevState) => ({
    //   cartItems: [...prevState.cartItems, updatedProduct],
    // }));
    setCartItems((prevCartItems) => [...prevCartItems, updatedProduct]);
  }

  function handleChange(event, productId) {
    // const { cartItems } = this.state;

    const updatedCartItems = cartItems.map((item) => {
      if (item.id === productId && item.quantity <= item.unitsInStock) {
        return {
          ...item,
          quantity: Number(event.target.value),
        };
      }

      return item;
    });

    // this.setState({ cartItems: updatedCartItems });
    setCartItems(updatedCartItems);
  }

  function handleRemove(productId) {
    // const { cartItems } = this.state;
    const updatedCartItems = cartItems.filter((item) => item.id !== productId);

    // this.setState({
    //   cartItems: updatedCartItems,
    // });
    setCartItems(updatedCartItems);
  }

  function handleDownVote(productId) {
    // const { products } = this.state;

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

    // this.setState({ products: updatedProducts });
    setProducts(updatedProducts);
  }

  function handleUpVote(productId) {
    // const { products } = this.state;

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

    // this.setState({ products: updatedProducts });
    setProducts(updatedProducts);
  }

  function handleSetFavorite(productId) {
    // const { products } = this.state;

    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          isFavorite: !product.isFavorite,
        };
      }

      return product;
    });

    // this.setState({ products: updatedProducts });
    setProducts(updatedProducts);
  }

  function saveNewProduct(newProduct) {
    // this.setState((prevState) => ({
    //   products: [newProduct, ...prevState.products],
    //   newProductFormOpen: !prevState.newProductFormOpen,
    // }));

    setProducts((prevProducts) => [newProduct, ...prevProducts]);
    setDataState((prevData) => ({
      ...prevData,
      newProductFormOpen: !prevData.newProductFormOpen,
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
            cartItems={cartItems}
            products={products}
            isLoading={dataState.isLoading}
            hasError={dataState.hasError}
            loadingError={dataState.loadingError}
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
  // }
}

export default App;
