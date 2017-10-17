import PropTypes from 'prop-types';

const user = PropTypes.shape({
  email: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  phone: PropTypes.string,
});

export default user;
