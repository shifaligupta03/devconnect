import React from 'react';
import classnames from 'classnames';
import Proptypes from 'prop-types';

const SelectListGroup = ({ name, label, value, error, info, onChange, disabled, required=false, options }) => {
    
    const selectOptions = options.map(option => (
        <option key={option.label} value={option.value}>
          {option.label}
        </option>
      ));
    
    return (
        <div className="form-group">
            {label && (<label>{label}</label>)}
            {required && <span>*</span>}
            <select
                className={classnames('form-control form-control-lg', {
                    'is-invalid': error,
                })}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                required= {required}
            >
                {selectOptions}
            </select>
            {info && <small className="form-text text-muted">{info}</small>}
            {error && (
                <div className="invalid-feedback">{error}</div>
            )}
        </div>
    )
}

export default SelectListGroup;

SelectListGroup.proptypes = {
    name: Proptypes.string.isRequired,
    value: Proptypes.string.isRequired,
    info: Proptypes.string,
    error: Proptypes.string,
    onChange: Proptypes.func.isRequired,
    disabled: Proptypes.string,
    options: Proptypes.array.isRequired,
};

