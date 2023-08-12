import * as yup from 'yup';

export const classSchema = yup.object().shape({
    classname: yup.string().required('Please enter a class name'),
  });