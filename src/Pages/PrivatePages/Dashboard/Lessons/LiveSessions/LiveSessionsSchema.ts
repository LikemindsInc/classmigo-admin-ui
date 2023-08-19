import * as yup from "yup";

export const liveSessionSchema = yup.object().shape({
    class: yup.mixed().required("Please Select A Class"),
    subject: yup.mixed().required("Please Select A Subject"),
    note: yup.string().required("A note is required"),
    date: yup.string().required("A date is required"),
    liveUrl: yup.string().required("Please Enter a Url"),
});
