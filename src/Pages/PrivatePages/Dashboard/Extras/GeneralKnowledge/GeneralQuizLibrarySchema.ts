import * as yup from "yup";

export const addGeneralQuestionSchema = yup.object().shape({
  class: yup.mixed().required("Please Select A Class"),
  subject: yup.mixed().required("Please Select A Subject"),
  topic: yup.mixed().required("Please Select A Topic"),
  difficulty: yup.mixed().required("Please Select A Difficulty"),
  question: yup.string().required("Please enter a question"),
  explanation: yup.string().required("Please enter an explanation"),
  optionA: yup.string().required("Please enter an option"),
  optionB: yup.string().required("Please enter an option"),
  optionC: yup.string().required("Please enter an option"),
  optionD: yup.string().required("Please enter an option"),
  score: yup.number().required("Please enter a score"),
});

export const createQuizSchema = yup.object().shape({
  name: yup.mixed().required("Please enter a quiz name"),
  class: yup.mixed().required("Please select a class"),
  subject: yup.mixed().required("Please select a subject"),
  topic: yup.mixed().required("Please select a topic"),
  difficulty: yup.mixed().required("Please select a difficulty"),
});

