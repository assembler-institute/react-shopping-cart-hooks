import { React, useReducer, createContext } from "react";
import { reducer, initialState } from "./reducerState";

export const ContextState = createContext();

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { cartItems, account, billing, payment, currentStep } = state;
  return (
    <ContextState.Provider
      value={{
        cartItems: cartItems,
        account: account,
        billing: billing,
        payment: payment,
        dispatch: dispatch,
        currentStep: currentStep,
      }}
    >
      {children}
    </ContextState.Provider>
  );
};

export default StateProvider;
