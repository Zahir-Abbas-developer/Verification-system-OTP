import * as Yup from 'yup';

export const signUpValidationSchema = Yup.object({
  firstName: Yup.string()
    .max(80, 'First name should not exceed more than 80 characters')
    .matches(/^[a-zA-Z ]*$/, 'Please enter valid first name')
    .required('First name is required')
    .trim(),
  lastName: Yup.string()
    .max(80, 'Last name should not exceed more than 80 characters')
    .matches(/^[a-zA-Z ]*$/, 'Please enter valid last name')
    .required('Last name is required')
    .trim(),
  email: Yup.string()
    .email('Email address is invalid')
    .required('Company email is required'),
  contactNumber: Yup.string()
    .matches(/^\+44\d{10}$/, 'Please enter valid contact number, i.e including +44xxxxxxxxxx')
    .required('Contact number is required')
    .trim(),
  companyId: Yup.object().nullable().required('Product title is required'),
  termsAndConditions: Yup.boolean().required().oneOf([true]),
});
