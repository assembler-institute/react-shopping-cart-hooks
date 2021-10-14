import React from "react";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import ProductsListing from "../../components/ProductsListing";
import Cart from "../../components/Cart";
import withLayout from "../../hoc/withLayout";

function Home({
  products,
  cartItems,
  isLoading,
  hasError,
  loadingError,
  handleDownVote,
  handleUpVote,
  handleSetFavorite,
  handleAddToCart,
  handleRemove,
  handleChange,
}) {
  return (
    <div className="row">
      <div className="col col-8">
        <div className="row">
          <div className="col col-12">
            <header className="jumbotron">
              <h1 className="display-4">Shoe shop</h1>
              <p className="lead">
                This is the best shoe shop ever, you will never find a better
                one.
              </p>
              <p className="font-weight-bold">Buy now!</p>
            </header>
          </div>
          {isLoading && (
            <Loader
              type="CradleLoader"
              color="#00BFFF"
              height={100}
              width={100}
              timeout={3000}
            />
          )}
          {hasError && (
            <div className="col col-12">
              <h2>
                Give me another chance, please. I am broken, but I can fix
                myself.
              </h2>
              <pre>
                <code>{loadingError}</code>
              </pre>
            </div>
          )}
          {!isLoading && !hasError && (
            <div className="col col-12">
              <ProductsListing
                products={products}
                handleDownVote={handleDownVote}
                handleUpVote={handleUpVote}
                handleSetFavorite={handleSetFavorite}
                handleAddToCart={handleAddToCart}
              />
            </div>
          )}
        </div>
      </div>

      <Cart
        className="col col-4"
        cartItems={cartItems}
        handleRemove={handleRemove}
        handleChange={handleChange}
      />
    </div>
  );
}

export default withLayout(Home);
