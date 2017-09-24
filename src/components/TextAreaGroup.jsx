import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TextAreaGroup = ({ error, field, label, onChange, rows, value }) => (
  <div className="form-group">
    <label htmlFor={field}>{label}</label>
    <textarea
      className={classnames('form-control', {
        'is-invalid': error,
      })}
      id={field}
      name={field}
      onChange={onChange}
      rows={rows}
      value={value}
    />
    <div className="invalid-feedback">
      {error}
    </div>
  </div>
);

TextAreaGroup.propTypes = {
  error: PropTypes.string,
  field: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  rows: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
};

TextAreaGroup.defaultProps = {
  error: '',
};


export default TextAreaGroup;
