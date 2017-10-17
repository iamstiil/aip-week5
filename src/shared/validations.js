const Validator = require('validator');

function validatePassword(data) {
  const errors = {};
  const { password, confirmPassword } = data;

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
}

function validateSignupInput(data) {
  const passwordValidation = validatePassword(data);
  const errors = passwordValidation.errors;
  const { email, username } = data;

  if (!Validator.isEmail(email)) {
    errors.email = 'Email is not valid';
  }

  if (Validator.isEmpty(email)) {
    errors.email = 'Email is required';
  }

  if (Validator.isEmpty(username)) {
    errors.username = 'Username is required';
  }

  return {
    errors,
    isValid: !Object.keys(errors).length,
  };
}

function validateTaskCreation(task) {
  const errors = {};
  const { title, user } = task;

  if (Validator.isEmpty(title)) {
    errors.title = 'Title is required';
  }

  if (!Validator.matches(user, /^[a-f\d]{24}$/)) {
    errors.user = 'User is invalid.';
  }

  if (Validator.isEmpty(user)) {
    errors.user = 'User is required';
  }

  return {
    errors,
    isValid: !Object.keys(errors).length,
  };
}

function validateUser(user) {
  const errors = {};
  const { phone, role } = user;

  if (phone && !Validator.isEmpty(phone) && !Validator.isMobilePhone(phone, 'any')) {
    errors.phone = 'Phone number is not valid';
  }

  if (role && !Validator.isEmpty(role) && !Validator.isIn(['User', 'Administrator'])) {
    errors.role = 'Role is not valid';
  }

  return {
    errors,
    isValid: !Object.keys(errors).length,
  };
}

module.exports = {
  validatePassword,
  validateSignupInput,
  validateTaskCreation,
  validateUser,
};
