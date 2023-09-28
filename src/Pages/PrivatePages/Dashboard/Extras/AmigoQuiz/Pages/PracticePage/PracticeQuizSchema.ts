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

export const addQuizQuestionSchema = yup.object().shape({
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
