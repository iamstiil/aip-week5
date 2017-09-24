import PropTypes from 'prop-types';

const users = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
);

export default users;
