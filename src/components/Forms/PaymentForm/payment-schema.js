import * as Yup from "yup";

const paymentSchema = Yup.object().shape({
  clientPaymentForm: Yup.string() /* .required("You must select a pay form") */,
  clientCardholderName: Yup.string()
    .min(5, "Your cardholder full-name is too short!")
    .max(50, "Your cardholder full-name is too long!")
    .required("Your cardholder full-name is required"),
  clientCardExpiryDate: Yup.string()
    .min(4, "Your card expiry date is too short!")
    .max(4, "Your card expiry date is too long!")
    .required("Your card expiry date is required"),
  clientCardNumber: Yup.string()
    .min(18, "Your card number is too short!")
    .max(22, "Your card number is too long!")
    .required("Your card number is required"),
  clientCardCvvCode: Yup.string()
    .min(3, "Your card CVV code is too short!")
    .max(3, "Your card CVV code is too long!")
    .required("Your card CVV code is required"),
  clientConsent: Yup.boolean().required("You must accept terms and conditions"),
});

export default paymentSchema;
