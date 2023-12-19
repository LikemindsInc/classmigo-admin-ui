import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const createAdminSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  phoneNumber: yup.string().required("Phone Number is required"),
});

export const resetAdminPasswordSchema = yup.object().shape({
  password: yup.string().required("Password is required"),
});

export const forgotPasswordSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .matches(
      /^\+234\d{10}$/,
      "Phone number must match the format +234XXXXXXXXXX"
    )
    .required("Enter your phone number"),
});

export const newPasswordSchema = yup.object().shape({
  password: yup.string().required("Enter a new password"),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("password"), null as any], "Passwords must match")
    .required("Confirm your password"),
});
