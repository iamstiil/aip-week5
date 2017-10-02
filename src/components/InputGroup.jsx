/**
 * Import dependencies
 */
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * Component class for inputs
 */
const InputGroup = ({ error, field, label, onChange, type, value }) => (
  <div className="form-group">
    <label htmlFor={field}>{label}</label>
    <input
      className={classnames('form-control', {
        'is-invalid': error,
      })}
      id={field}
      name={field}
      onChange={onChange}
      type={type}
      value={value}
    />
    <div className="invalid-feedback">
      {error}
    </div>
  </div>
);

/**
 * PropTypes
 */
InputGroup.propTypes = {
  error: PropTypes.string,
  field: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

/**
 * DefaultProps
 */
InputGroup.defaultProps = {
  error: '',
};

/**
 * Export
 */
export default InputGroup;
