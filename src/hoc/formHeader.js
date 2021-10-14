import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import Main from "../components/Main";
import { ContextState } from "../context/contextState";

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

/* eslint no-param-reassign: [2, { "props": false }] */
function formHeader(WrappedComponent) {
  WrappedComponent.displayName = `withLayout(${getDisplayName(
    WrappedComponent,
  )})`;

  function WrapperComponent({ ...props }) {
    const path = useLocation();
    const value = useContext(ContextState);
    const { currentStep } = value;

    return (
      <div className="col col-8">
        <header className="mt-4 mb-4 p-0 d-flex container" {...props}>
          <h6
            className={
              currentStep >= 1
                ? "mr-3 text-primary font-weight-bold"
                : "mr-3 text-primary"
            }
          >
            1. Account
          </h6>
          <h6
            className={
              currentStep >= 2
                ? "mr-3 text-primary font-weight-bold"
                : "mr-3 text-muted"
            }
          >
            2. Billing
          </h6>
          <h6
            className={
              currentStep >= 3
                ? "mr-3 text-primary font-weight-bold"
                : "mr-3 text-muted"
            }
          >
            3. Payment
          </h6>
          <h6
            className={
              currentStep >= 4
                ? "mr-3 text-primary font-weight-bold"
                : "mr-3 text-muted"
            }
          >
            4. Resume
          </h6>
        </header>
        {path.pathname === "/checkout/FirstStep" && (
          <h3 className="mb-3 pb-2 border-bottom text-primary">Your details</h3>
        )}
        {path.pathname === "/checkout/SecondStep" && (
          <h3 className="mb-3 pb-2 border-bottom text-primary">
            Billing details
          </h3>
        )}
        {path.pathname === "/checkout/ThirdStep" && (
          <h3 className="mb-3 pb-2 border-bottom text-primary">
            Payment details
          </h3>
        )}
        {path.pathname === "/checkout/LastStep" && (
          <h3 className="mb-3 pb-2 border-bottom text-primary">
            Your order have been completed!
          </h3>
        )}
        <Main className="border-bottom pb-3">
          <WrappedComponent {...props} />
        </Main>
      </div>
    );
  }

  return WrapperComponent;
}

export default formHeader;
