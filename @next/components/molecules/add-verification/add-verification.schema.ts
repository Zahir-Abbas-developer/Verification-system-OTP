import * as Yup from 'yup';

export const SchemaAddVerification = Yup.object({
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
  integrationId: Yup.string().required('Integration is required'),
  // uniqueIdentifier: Yup.string().required('Unique identifier is required'),
}).required();

export const SchemaAddVerificationSuperAdmin = Yup.object({
  firstName: Yup.string()
    .max(80, 'First name should not exceed more than 80 characters')
    .matches(/^[a-zA-Z ]*$/, 'Please enter valid first name')
    .required('First Name is required')
    .trim(),
  lastName: Yup.string()
    .max(80, 'Last name should not exceed more than 80 characters')
    .matches(/^[a-zA-Z ]*$/, 'Please enter valid last name')
    .required('Last name is required')
    .trim(),
  integrationId: Yup.string().required('Integration is required'),
  // uniqueIdentifier: Yup.string().required('Unique identifier is required'),
  companyId: Yup.string().required('Company is required'),
}).required();
