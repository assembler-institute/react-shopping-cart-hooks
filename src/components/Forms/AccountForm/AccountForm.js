import React, { useState, useContext } from "react";
import { Redirect, Link } from "react-router-dom";
import { useFormik } from "formik";
import PhoneInput from "react-phone-number-input";
import formHeader from "../../../hoc/formHeader";
import { ContextState } from "../../../context/contextState";
import { ACTIONS } from "../../../context/reducerState";
import "react-phone-number-input/style.css";

import Input from "../../Input";
import Button from "../../Button";
import accountRequirements from "./account-form-requirements";

function AccountForm() {
  const value = useContext(ContextState);
  const { dispatch, account } = value;
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [phone, setPhone] = useState();

  const formik = useFormik({
    initialValues: {
      clientName: account.userName,
      clientEmail: account.emailAdress,
      clientPhone: account.phoneNumber,
    },
    validationSchema: accountRequirements,
    onSubmit: () => {
      setTimeout(() => {
        dispatch({
          type: ACTIONS.ADD_ACCOUNT,
          payload: {
            name: formik.values.clientName,
            email: formik.values.clientEmail,
            phone: phone,
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
          label="*Your name"
          id="clientName"
          value={formik.values.clientName}
          placeholder="Insert your name"
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          hasErrorMessage={formik.touched.clientName}
          errorMessage={formik.errors.clientName}
        />
        <Input
          type="email"
          label="*Email Adress"
          id="clientEmail"
          value={formik.values.clientEmail}
          placeholder="Receive your delivery status here"
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          hasErrorMessage={formik.touched.clientEmail}
          errorMessage={formik.errors.clientEmail}
        />
        <div className="form-group">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="clientPhone">Mobile phone number</label>
          <PhoneInput
            className="border p-1 rounded"
            id="clientPhone"
            name="clientPhone"
            placeholder="insert your phone number"
            value={phone}
            onChange={setPhone}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className="d-flex justify-content-between">
          <Link className="btn btn-primary px-5" to="/">
            Back Home
          </Link>
          <Button
            submitButton
            disabled={formik.isValidating || !formik.isValid}
          >
            {formik.isSubmitting ? "Submitting..." : "Go to Billing"}
          </Button>
        </div>
      </form>
      {hasSubmitted && <Redirect to="/checkout/SecondStep" />}
    </>
  );
}

export default formHeader(AccountForm);
