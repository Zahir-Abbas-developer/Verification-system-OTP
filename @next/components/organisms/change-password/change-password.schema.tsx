import * as Yup from 'yup';
const passwordValidationReg =
  /^.*(?=.{8,})((?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;

export const schemaChangePassword = Yup.object({
  currentPassword: Yup.string().required('Password is required'),
  newPassword: Yup.string()
    .required('Please enter your new password')
    .matches(
      passwordValidationReg,
      'Password must contain at least 8 characters, one uppercase, one number and one special character',
    )
    .min(8)
    .max(15),
  confirmPassword: Yup.string()
    .required('Please enter your confirm password')
    .oneOf([Yup.ref('newPassword'), null], `Password does't match, Please try again with same password`),
}).required();
