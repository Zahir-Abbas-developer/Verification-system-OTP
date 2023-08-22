import * as Yup from 'yup';

export const schemaForgotPassword = Yup.object({
  email: Yup.string()
    .required('Email not found, please try again!')
    .email('Please enter valid email'),
}).required();
