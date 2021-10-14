import * as Yup from "yup";

const clientSchema = Yup.object().shape({
  clientName: Yup.string()
    .min(1, "You should write your full-name ")
    .max(50, "Isn´t your name too long?")
    .required("Please, we need your full-name."),
  clientEmail: Yup.string()
    .email("Invalid email, please try again")
    .required("Your e-mail is required"),
  clientPhone: Yup.number()
    .typeError("That doesn't look like a phone number")
    .positive("Your phone number can't start with a minus")
    .integer("Your phone number is including a decimal point")
    .required("Your phone number is required"),
  clientAdress: Yup.string()
    .min(8, "Your adress is too short!")
    .max(20, "Your adress is too long!")
    .required("Your adress is required"),
  clientCity: Yup.string()
    .min(3, "Your city is too short!")
    .max(10, "Your city is too long!")
    .required("Your city is required"),
  clientZip: Yup.string()
    .min(3, "Your zip/post code is too short!")
    .max(10, "Your zip/post code is too long!")
    .required("Your zip/post code is required"),
  clientCountry: Yup.string()
    .min(3, "Your country/region is too short!")
    .max(10, "Your country/region is too long!")
    .required("Your country/region is required"),
  clientCardholderName: Yup.string()
    .min(5, "Your cardholder full-name is too short!")
    .max(50, "Your cardholder full-name is too long!")
    .required("Your cardholder full-name is required"),
  clientCardExpiryDate: Yup.string()
    .min(4, "Your card expiry date is too short!")
    .max(4, "Your card expiry date is too long!")
    .required("Your card expiry date is required"),
  clientCardNumber: Yup.string()
    .min(5, "Your card number is too short!")
    .max(50, "Your card number is too long!")
    .required("Your card number is required"),
  clientCardCvvCode: Yup.string()
    .min(3, "Your card CVV code is too short!")
    .max(3, "Your card CVV code is too long!")
    .required("Your card CVV code is required"),
  clientConsent: Yup.string()
    .min(2, "The author first name is too short!")
    .required("The author first name is required"),
});

export default clientSchema;
