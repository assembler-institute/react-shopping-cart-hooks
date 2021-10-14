import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { Formik } from "formik";

import Input from "../Input";
import Button from "../Button";

import productSchema from "./product-schema";

function addProductDetails(product) {
  return {
    id: uuid(),
    ...product,
    quantity: 0,
    isFavorite: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    votes: {
      upVotes: {
        upperLimit: 10,
        currentValue: 0,
      },
      downVotes: {
        lowerLimit: 10,
        currentValue: 0,
      },
    },
    author: {
      id: uuid(),
      ...product.author,
    },
  };
}

class NewProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
    };

    this.setSubmitted = this.setSubmitted.bind(this);
  }

  setSubmitted() {
    setTimeout(() => {
      this.setState({
        submitted: true,
      });
    }, 500);
  }

  render() {
    const { submitted } = this.state;
    const { saveNewProduct } = this.props;

    return (
      <>
        <Formik
          initialValues={{
            title: "",
            price: 0,
            img: "",
            shortDescription: "",
            longDescription: "",
            unitsInStock: 0,
            authorFirstName: "",
            authorLastName: "",
            authorEmail: "",
          }}
          validationSchema={productSchema}
          onSubmit={(values, { setSubmitting }) => {
            const newProduct = addProductDetails(values);
            saveNewProduct(newProduct);
            setSubmitting(true);
            this.setSubmitted();
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            errors,
            values,
            touched,
            isValidating,
            isValid,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <Input
                type="text"
                label="Product title"
                id="title"
                value={values.title}
                placeholder="Product title"
                handleChange={handleChange}
                handleBlur={handleBlur}
                hasErrorMessage={touched.title}
                errorMessage={errors.title}
              />
              <Input
                type="number"
                label="Product price"
                id="price"
                value={values.price}
                placeholder="Product price"
                handleChange={handleChange}
                handleBlur={handleBlur}
                hasErrorMessage={touched.price}
                errorMessage={errors.price}
              />
              <Input
                type="text"
                label="Product image url"
                id="img"
                value={values.img}
                placeholder="Product image url"
                handleChange={handleChange}
                handleBlur={handleBlur}
                hasErrorMessage={touched.img}
                errorMessage={errors.img}
              />
              <Input
                type="text"
                label="Short description"
                id="shortDescription"
                value={values.shortDescription}
                placeholder="Short description"
                handleChange={handleChange}
                handleBlur={handleBlur}
                hasErrorMessage={touched.shortDescription}
                errorMessage={errors.shortDescription}
              />
              <Input
                type="text"
                label="Long description"
                id="longDescription"
                value={values.longDescription}
                placeholder="Long description"
                handleChange={handleChange}
                handleBlur={handleBlur}
                hasErrorMessage={touched.longDescription}
                errorMessage={errors.longDescription}
              />
              <Input
                type="number"
                label="Units in stock"
                id="unitsInStock"
                value={values.unitsInStock}
                placeholder="Units in stock"
                handleChange={handleChange}
                handleBlur={handleBlur}
                hasErrorMessage={touched.unitsInStock}
                errorMessage={errors.unitsInStock}
              />
              <Input
                type="text"
                label="Author first name"
                id="authorFirstName"
                value={values.authorFirstName}
                placeholder="Author first name"
                handleChange={handleChange}
                handleBlur={handleBlur}
                hasErrorMessage={touched.authorFirstName}
                errorMessage={errors.authorFirstName}
              />
              <Input
                type="text"
                label="Author last name"
                id="authorLastName"
                value={values.authorLastName}
                placeholder="Author last name"
                handleChange={handleChange}
                handleBlur={handleBlur}
                hasErrorMessage={touched.authorLastName}
                errorMessage={errors.authorLastName}
              />
              <Input
                type="email"
                label="Author email"
                id="authorEmail"
                value={values.authorEmail}
                placeholder="Author email"
                handleChange={handleChange}
                handleBlur={handleBlur}
                hasErrorMessage={touched.authorEmail}
                errorMessage={errors.authorEmail}
              />
              <Button submitButton block disabled={isValidating || !isValid}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </form>
          )}
        </Formik>
        {submitted && <Redirect to="/" />}
      </>
    );
  }
}

export default NewProductForm;
