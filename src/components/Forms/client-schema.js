import * as Yup from "yup";

const clientSchema = Yup.object().shape({
  clientName: Yup.string()
    .min(5, "You should write your full-name ")
    .max(50, "Your full-name is too long")
    .required("Your full-name is required"),
  clientEmail: Yup.string()
    .email("Invalid email, please try again")
    .required("Your e-mail is required"),
  clientPhone: Yup.number()
    .typeError("That doesn't look like a phone number")
    .positive("Your phone number can't start with a minus")
    .integer("Your phone number can't include a decimal point")
    .required("Your phone number is required"),
});

export default clientSchema;
