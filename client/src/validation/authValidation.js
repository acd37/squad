import validator from 'validator';
import isEmpty from '../utils/isEmpty';

export const validateRegisterInput = data => {
  let errors = {};

  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';
  data.email = !isEmpty(data.email) ? data.email : '';

  if (validator.isEmpty(data.email)) {
    errors.email = 'Email field is required.';
  }

  if (!validator.isEmail(data.email)) {
    errors.email = 'Email is invalid.';
  }

  if (validator.isEmpty(data.password)) {
    errors.password = 'Password field is required.';
  }

  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be between 6 and 30 characters';
  }

  if (validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm password field is required.';
  }

  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match.';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
