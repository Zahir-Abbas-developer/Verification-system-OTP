import * as Yup from 'yup';

export const schema = Yup.object({
  firstName: Yup.string().required('First Name Is Required'),
  lastName: Yup.string().required('Last Name Is Required'),
  uniqueIdentifier: Yup.string().required('Unique Identifier Is Required'),
}).required();
