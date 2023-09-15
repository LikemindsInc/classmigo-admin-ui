import * as yup from "yup";

export const subscriptionSchema = yup.object().shape({
  type: yup.mixed().required("Please Select A Subscription Type"),
  duration: yup
    .number()
    .typeError("Please Enter A Valid Number")
    .required("Please Enter A Subscription Duration")
    .positive("Duration must be a positive number")
    .integer("Duration must be an integer"),
  price: yup
    .number()
    .typeError("Please Enter A Valid Number")
    .required("Please Enter A Subscription Duration")
    .integer("Price must be an integer")
    .min(0, "Price cannot be negative"),
  subscriptionName: yup.string().required("Please Enter A Subscription Name"),
});
