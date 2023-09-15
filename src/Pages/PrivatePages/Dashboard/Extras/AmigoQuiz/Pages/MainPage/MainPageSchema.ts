import * as yup from "yup";

export const scheduleQuizSchema = yup.object().shape({
  class: yup.mixed().required("Please Select A Class"),
  tag: yup.string().required("Please Enter A Tag"),
//   time: yup
//     .number()
//     .nullable()
//     .typeError("Please Enter A Valid Number")
//     .positive("Discount must be a positive number")
//     .integer("Discount must be an integer")
//     .required("Please Enter Duration In Minutes"),
  date: yup.mixed().required("Please Select A Date And Time"),
});
