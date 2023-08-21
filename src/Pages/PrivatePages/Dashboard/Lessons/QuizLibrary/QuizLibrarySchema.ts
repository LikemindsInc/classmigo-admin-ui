import * as yup from "yup";

export const addQuestionSchema = yup.object().shape({
  question: yup.mixed().required("Please enter a question"),
  optionA: yup.mixed().required("Please enter an option"),
  optionB: yup.mixed().required("Please enter an option"),
  optionC: yup.mixed().required("Please enter an option"),
  optionD: yup.mixed().required("Please enter an option"),
  score: yup.number().required("Please enter a score"),
  quizId: yup.number().required("Please enter a score"),
});

export const createQuestionSchema = yup.object().shape({
  name: yup.mixed().required("Please enter a quiz name"),
  class: yup.mixed().required("Please select a class"),
  subject: yup.mixed().required("Please select a subject"),
  topic: yup.mixed().required("Please select a topic"),
  difficulty: yup.mixed().required("Please select a difficulty"),
});
