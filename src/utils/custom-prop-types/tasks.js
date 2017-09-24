import PropTypes from 'prop-types';

const tasks = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    userid: PropTypes.number,
  }),
);

export default tasks;
