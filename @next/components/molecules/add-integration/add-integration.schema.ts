import * as Yup from 'yup';

export const SchemaAddVerification = Yup.object({
  name: Yup.string()
    .max(80, 'Integration name should not exceed more than 80 characters')
    .matches(/^[a-zA-Z ]*$/, 'Please enter valid integration name')
    .required('Integration name is required')
    .trim(),
  type: Yup.string().required('Integration type is required'),
});
