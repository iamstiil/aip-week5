/**
 * Import dependencies
 */
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * Component class for select fields
 */
const SelectGroup = ({ children, className, error, field, label, onChange, value }) => (
  <div className={classnames('form-group', className)}>
    <label htmlFor={field}>{label}</label>
    <select
      className={classnames('form-control', {
        'is-invalid': error,
      })}
      name={field}
      onChange={onChange}
      value={value}
    >
      {children}
    </select>
    <div className="invalid-feedback">
      {error}
    </div>
  </div>
);

/**
 * PropTypes
 */
SelectGroup.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  className: PropTypes.string,
  error: PropTypes.string,
  field: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

/**
 * DefaultProps
 */
SelectGroup.defaultProps = {
  className: '',
  error: '',
};

/**
 * Export
 */
export default SelectGroup;
