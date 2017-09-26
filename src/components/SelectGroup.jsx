/**
 * Import dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * Component class for select fields
 */
const SelectGroup = ({ children, error, field, label, onChange, value }) => (
  <div className="form-group">
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
  error: '',
};

/**
 * Export
 */
export default SelectGroup;
