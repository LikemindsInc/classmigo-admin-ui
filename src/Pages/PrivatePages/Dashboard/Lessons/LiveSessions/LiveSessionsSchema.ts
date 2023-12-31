import * as yup from "yup";

export const liveSessionSchema = yup.object().shape({
  class: yup.mixed().required("Please Select A Class"),
  subject: yup.mixed().required("Please Select A Subject"),
  note: yup.string().required("A note is required"),
  title: yup.string().required("A title is required"),
  date: yup.string().required("A date is required"),
  liveUrl: yup.string().required("Please Enter a Url"),
  durationInMinutes: yup
    .number()
    .nullable()
    .typeError("Please Enter A Valid Number")
    .positive("Discount must be a positive number")
    .integer("Discount must be an integer")
    .required("Please Enter Duration In Minutes"),
});
