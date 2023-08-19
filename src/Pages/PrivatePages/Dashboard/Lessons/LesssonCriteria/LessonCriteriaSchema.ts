import * as yup from "yup";
import { checkforValidString } from "../../../../../utils/utilFns";

export const classSchema = yup.object().shape({
  name: yup
    .string()
    .test(
      "text name",
      "Class must be a string not a number",
      checkforValidString
    )
    .nullable()
    .required("Please enter a class")
});

export const subjectSchema = yup.object().shape({
  name: yup
    .string()
    .test(
      "text name",
      "Subject must be a string not a number",
      checkforValidString
    )
    .nullable()
    .required("Please enter a subject")
});
