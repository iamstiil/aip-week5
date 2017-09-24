import PropTypes from 'prop-types';

const users = PropTypes.arrayOf(
  PropTypes.shape({
    email: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
  }),
);

export default users;
