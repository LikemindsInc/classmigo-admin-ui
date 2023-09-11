import * as yup from "yup";
import { checkforValidString } from "../../../../../utils/utilFns";

export const classSchema = yup.object().shape({
  classname: yup
    .string()
    .test(
      "text name",
      `Subject must be a string, not contain "/", or not a number`,
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
      `Subject must be a string, not contain "/", or not a number`,
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
      `Subject must be a string, not contain "/", or not a number`,
      checkforValidString
    )
    .nullable()
    .required("Please enter a subject"),
    description: yup
    .string()
    .required("Please enter a description"),
    video: yup
    .mixed()
    .required("Please upload an intro video"),
});


export const subTopicSchema = yup.object().shape({
  subtopicTitle: yup
    .string()
    .test(
      "text name",
      `Subject must be a string, not contain "/", or not a number`,
      checkforValidString
    )
    .nullable()
    .required("Please enter a subject"),
  subtopicDescription: yup
    .string()
    .required("Please enter a short description"),
  video: yup
    .mixed()
    .test(
      "file-or-url",
      "Please upload a video",
      function (value) {
        if (this.parent.videoUrl) {
          return true; // No need to validate if there's a video URL
        }
        if (value) {
          return true; // No need to validate if there's a file
        }
        return false; // Both file and URL are missing
      }
    ),
    // .required("Please upload a video"),
  videoUrl: yup
    .string()
    .test(
      "file-or-url",
      "Please upload a video or provide a video URL",
      function (value) {
        if (this.parent.video) {
          return true; // No need to validate if there's a file
        }
        if (value) {
          return true; // No need to validate if there's a video URL
        }
        return false; // Both file and URL are missing
      }
    )
});

// export const subTopicSchema = yup.object().shape({
//   subtopicTitle: yup
//     .string()
//     .test(
//       "text name",
//       `Subject must be a string, not contain "/", or not a number`,
//       checkforValidString
//     )
//     .nullable()
//     .required("Please enter a subject"),
//   subtopicDescription: yup
//     .string()
//     .required("Please enter a short description"),
//   video: yup.mixed().required("Please upload a video"),
//   videoUrl: yup.mixed()
// });
