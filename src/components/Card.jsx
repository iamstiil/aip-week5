/**
 * Import dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import './Card.scss';

/**
 * Component Class for Cards
 */
const Card = ({ children, title }) => (
  <div className="card mb-3" role="link" tabIndex={0}>
    <div className="card-body">
      <h4 className="card-title">{title}</h4>
      <p className="card-text">{children}</p>
    </div>
  </div>
);

/**
 * PropTypes
 */
Card.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

/**
 * Export
 */
export default Card;
