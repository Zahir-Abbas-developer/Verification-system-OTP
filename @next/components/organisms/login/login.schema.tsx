import * as Yup from 'yup';

export const schema = Yup.object({
  email: Yup.string()
    .required('Email is required')
    .email('Please enter valid email'),
  password: Yup.string().required('Password is required').min(8).max(15),
}).required();
