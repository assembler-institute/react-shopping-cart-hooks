import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { useFormik } from "formik";
import Select from "react-select";
import formHeader from "../../../hoc/formHeader";

import Input from "../../Input";
import Button from "../../Button";

import billingSchema from "./billing-schema";
import { ACTIONS } from "../../../context/reducerState";
import { ContextState } from "../../../context/contextState";

function BillingForm() {
  const options = [
    {
      value: "Spain",
      label: "Spain",
    },
    {
      value: "France",
      label: "France",
    },
    {
      value: "England",
      label: "England",
    },
    {
      value: "Portugal",
      label: "Portugal",
    },
  ];

  const value = useContext(ContextState);
  const { dispatch, billing } = value;
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [country, setCountry] = useState();

  const formik = useFormik({
    initialValues: {
      clientAdress: billing.address,
      clientCity: billing.city,
      clientZip: billing.postCode,
      clientCountry: billing.country,
    },
    validationSchema: billingSchema,
    onSubmit: () => {
      setTimeout(() => {
        dispatch({
          type: ACTIONS.ADD_BILLING,
          payload: {
            address: formik.values.clientAdress,
            city: formik.values.clientCity,
            postCode: formik.values.clientZip,
            country: country.value,
          },
        });
        setHasSubmitted(true);
      }, 500);
    },
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Input
          type="text"
          label="Address*"
          id="clientAdress"
          value={formik.values.clientAdress}
          placeholder="Insert your adress"
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          hasErrorMessage={formik.touched.clientAdress}
          errorMessage={formik.errors.clientAdress}
        />
        <Input
          type="text"
          label="City*"
          id="clientCity"
          value={formik.values.clientCity}
          placeholder="Insert yout city"
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          hasErrorMessage={formik.touched.clientCity}
          errorMessage={formik.errors.clientCity}
        />
        <Input
          type="number"
          label="Zip/post code*"
          id="clientZip"
          value={formik.values.clientZip}
          placeholder="insert your zip/post code number"
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          hasErrorMessage={formik.touched.clientZip}
          errorMessage={formik.errors.clientZip}
        />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="clientCountry">Country / region*</label>
        <Select
          className="form-group"
          id="clientCountry"
          options={options}
          value={country}
          onChange={setCountry}
        />
        <div className="d-flex justify-content-between">
          <Link className="btn btn-primary px-5" to="/checkout/step-1">
            Back to account
          </Link>
          <Button
            submitButton
            disabled={formik.isValidating || !formik.isValid}
          >
            {formik.isSubmitting ? "Submitting..." : "Go to Payment"}
          </Button>
        </div>
      </form>
      {hasSubmitted && <Redirect to="/checkout/ThirdStep" />}
    </>
  );
}

export default formHeader(BillingForm);
