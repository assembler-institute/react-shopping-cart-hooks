import * as Yup from "yup";

const accountRequirements = Yup.object().shape({
  clientName: Yup.string()
    .min(0, "I can´t wait to meet you. Insert your name here.")
    .max(50, "My bit memory stops at 50.")
    .required("Required"),
  clientEmail: Yup.string()
    .email("Invalid email - Your goodies are miiiiine.")
    .required("We need a valid email address"),
  // clientPhone: Yup.string()
  //   .typeError("Invalid phone number - How can I reach you?")
  //   .positive("Your phone number should not start with a negative")
  //   .integer("Your phone number can´t include a decimal"),
});

export default accountRequirements;
