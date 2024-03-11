import * as yup from "yup";

export const ViewAgentSchema = yup.object().shape({
  fullName: yup.string().required("Enter a fullname"),
  phoneNumber: yup
    .string()
    .required("Enter your mobile number")
    .matches(/^\+\d+$/, "Mobile number should start with a + sign"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.mixed().required("Enter a password"),
  country: yup.mixed().required("Select a country"),
  state: yup.mixed().required("Select a state"),
  lga: yup.mixed().required("Select an Lga"),
  agentCode: yup.string().optional(),
});
