import PropTypes from 'prop-types';

const tasks = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    userid: PropTypes.string,
  }),
);

export default tasks;
