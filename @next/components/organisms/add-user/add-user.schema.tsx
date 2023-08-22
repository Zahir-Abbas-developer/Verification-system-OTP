import * as Yup from 'yup';

export const addUserValidationSchema = Yup.object({
  firstName: Yup.string()
    .max(80, 'First name should not exceed more than 80 characters')
    .matches(/^[a-zA-Z]*$/, 'Please enter valid first name')
    .required('First name is required')
    .trim(),
  lastName: Yup.string()
    .max(80, 'Last name should not exceed more than 80 characters')
    .matches(/^[a-zA-Z]*$/, 'Please Enter valid last name')
    .required('Last name is required')
    .trim(),
  email: Yup.string()
    .email('Email address is invalid')
    .required('Company email is required'),
  defaultRole: Yup.string().required('Role is required'),
});
