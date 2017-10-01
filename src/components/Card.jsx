/**
 * Import dependencies
 */
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import './Card.scss';

/**
 * Component Class for Cards
 */
const Card = ({ children, className, link, subtitle, title }) => (
  <div className={classnames('card mb-3', className)} {...link && { role: 'link' }}>
    <div className="card-body">
      <h4 className="card-title">{title}</h4>
      {subtitle && (<h6 className="card-subtitle mb-2 text-muted">{subtitle}</h6>)}
      <div className="card-text">{children}</div>
    </div>
  </div>
);

/**
 * PropTypes
 */
Card.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  className: PropTypes.string,
  link: PropTypes.bool,
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired,
};

/**
 * Default props
 */
Card.defaultProps = {
  className: '',
  link: false,
  subtitle: '',
};

/**
 * Export
 */
export default Card;
