const Validator = require('validator');

module.exports = function validateSignupInput(data) {
  const errors = {};
  const { confirmPassword, email, password, username } = data;

  if (!Validator.isEmail(email)) {
    errors.email = 'Email is not valid';
  }

  if (Validator.isEmpty(email)) {
    errors.email = 'Email is required';
  }

  if (Validator.isEmpty(username)) {
    errors.username = 'Username is required';
  }

  if (!Validator.matches(password, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&()#])[A-Za-z\d$@$!%*?&()#]{8,}/)) {
    errors.password = 'Password needs to have upper and lowercase letters, numbers, special characters and a length of 8';
  }

  if (Validator.isEmpty(password)) {
    errors.password = 'Password is required';
  }

  if (!Validator.equals(password, confirmPassword)) {
    errors.confirmPassword = 'Passwords do not match';
  }

  if (Validator.isEmpty(confirmPassword)) {
    errors.confirmPassword = 'Password need to be confirmed';
  }

  return {
    errors,
    isValid: !Object.keys(errors).length,
  };
};
