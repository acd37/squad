const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.bio = !isEmpty(data.bio) ? data.bio : '';
  data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
  data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
  data.phone = !isEmpty(data.phone) ? data.phone : '';
  data.city = !isEmpty(data.city) ? data.city : '';
  data.state = !isEmpty(data.state) ? data.state : '';
  data.company = !isEmpty(data.company) ? data.company : '';
  data.site = !isEmpty(data.site) ? data.site : '';

  if (validator.isEmpty(data.handle)) {
    errors.handle = 'Handle field is required.';
  }

  if (validator.isEmpty(data.firstName)) {
    errors.firstName = 'First name field is required.';
  }

  if (validator.isEmpty(data.lastName)) {
    errors.lastName = 'Last name field is required.';
  }

  if (validator.isEmpty(data.phone)) {
    errors.phone = 'Phone field is required.';
  }

  if (validator.isEmpty(data.state)) {
    errors.state = 'State field is required.';
  }

  if (validator.isEmpty(data.city)) {
    errors.city = 'City field is required.';
  }

  if (validator.isEmpty(data.company)) {
    errors.company = 'Company field is required.';
  }

  if (validator.isEmpty(data.site)) {
    errors.site = 'Website field is required.';
  }

  if (validator.isEmpty(data.bio)) {
    errors.bio = 'Biography is required.';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
