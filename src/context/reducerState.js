const cartItems = JSON.parse(localStorage.getItem("react-sc-state-cart-items"));

export const initialState = {
  cartItems: cartItems,
  account: {
    userName: "",
    emailAdress: "",
    phoneNumber: "",
    userInfo: false,
  },
  billing: {
    address: "",
    city: "",
    postCode: "",
    country: "",
    billingInfo: false,
  },
  payment: {
    paymentType: "",
    cardholderName: "",
    cardNumber: "",
    cardExpiryDate: "",
    cvvCode: "",
    conditions: false,
    paymentInfo: false,
  },
  currentStep: 0,
};

export const ACTIONS = {
  ADD_PRODUCTS: "add-products",
  ADD_ACCOUNT: "add-account",
  ADD_BILLING: "add-billing",
  ADD_PAYMENT: "add-payment",
  CLEAR_INFO: "clear-info",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_PRODUCTS:
      return {
        ...state,
        cartItems: action.payload,
        currentStep: 1,
      };
    case ACTIONS.ADD_ACCOUNT:
      return {
        ...state,
        account: {
          userName: action.payload.name,
          emailAdress: action.payload.email,
          phoneNumber: action.payload.phone,
          userInfo: true,
        },
        currentStep: 2,
      };
    case ACTIONS.ADD_BILLING:
      return {
        ...state,
        billing: {
          address: action.payload.address,
          city: action.payload.city,
          postCode: action.payload.postCode,
          country: action.payload.country,
          billingInfo: true,
        },
        currentStep: 3,
      };
    case ACTIONS.ADD_PAYMENT:
      return {
        ...state,
        payment: {
          paymentType: action.payload.paymentType,
          cardholderName: action.payload.cardholderName,
          cardNumber: action.payload.cardNumber,
          cardExpiryDate: action.payload.cardExpiryDate,
          cvvCode: action.payload.cvvCode,
          conditions: action.payload.conditions,
          paymentInfo: true,
        },
        currentStep: 4,
      };
    case ACTIONS.CLEAR_INFO:
      return {
        cartItems: [],
        account: {
          userName: "",
          emailAdress: "",
          phoneNumber: "",
          userInfo: false,
        },
        billing: {
          address: "",
          city: "",
          postCode: "",
          country: "",
          billingInfo: false,
        },
        payment: {
          paymentType: "",
          cardholderName: "",
          cardNumber: "",
          cardExpiryDate: "",
          cvvCode: "",
          conditions: false,
          paymentInfo: false,
        },
        currentStep: 0,
      };
    default:
      return state;
  }
};
