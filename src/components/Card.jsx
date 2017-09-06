import React from 'react';
import PropTypes from 'prop-types';
import './Card.scss';

/**
 * Component Class for Cards
 */
const Card = props => (
  <div className="card mb-3" role="link" tabIndex={0}>
    <div className="card-body">
      <h4 className="card-title">{props.title}</h4>
      <p className="card-text">{props.children}</p>
    </div>
  </div>
);

Card.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default Card;