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
    .required("Please enter a class"),
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
    .required("Please enter a subject"),
});

export const topicSchema = yup.object().shape({
  topic: yup
    .string()
    .test(
      "text name",
      "Subject must be a string not a number",
      checkforValidString
    )
    .nullable()
    .required("Please enter a subject"),
});

export const subTopicSchema = yup.object().shape({
  subtopicTitle: yup
    .string()
    .test(
      "text name",
      "Subject must be a string not a number",
      checkforValidString
    )
    .nullable()
    .required("Please enter a subject"),
  subtopicDescription: yup
    .string()
    .required("Please enter a short description"),
  video: yup.mixed().required("Please upload a video"),
});
