import React, {useReducer} from 'react';
import {Link} from 'react-router-dom';
import Proptypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import experienceReducer from './reducer';

const addExperience = ({errors, profile, history, addExperience}) => {

  const initialState = {
    title: '',
    company: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: '',
    disabled: false,
  };

  const [state, dispatch] = useReducer(experienceReducer, initialState);
  let {
    title,
    company,
    location,
    from,
    to,
    current,
    description,
    disabled,
  } = state;

  const handleSubmit = e => {
    e.preventDefault();
    addExperience({...state}, history);
  };

  const updateFormInput = e => {
    e.preventDefault();
    dispatch({
      type: 'input',
      name: e.target.name,
      value: e.target.value,
    });
  };
  const onCheck = e => {
    dispatch({
      type: 'current',
      payload: {
        disabled: !disabled,
        current: !current,
      },
    });
  };

  return (
    <div className="add-experience">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light">
              Go Back
            </Link>
            <h1 className="display-4 text-center">Add Experience</h1>
            <form onSubmit={handleSubmit}>
              <TextFieldGroup
                label="Company"
                name="company"
                value={company}
                onChange={updateFormInput}
                error={errors.company}
                required={true}
              />
              <TextFieldGroup
                label="Job Title"
                name="title"
                value={title}
                onChange={updateFormInput}
                error={errors.title}
                required={true}
              />
              <TextFieldGroup
                label="Location"
                name="location"
                value={location}
                onChange={updateFormInput}
                error={errors.location}
                required={true}
              />
              <TextFieldGroup
                label="From Date"
                name="from"
                type="date"
                value={from}
                onChange={updateFormInput}
                error={errors.from}
              />
              <TextFieldGroup
                label="To Date"
                name="to"
                type="date"
                value={to}
                onChange={updateFormInput}
                error={errors.to}
                disabled={disabled ? 'disabled' : ''}
              />
              <div className="form-check mb-4">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="current"
                  value={current}
                  checked={current}
                  onChange={onCheck}
                  id="current"
                />
                <label htmlFor="current" className="form-check-label">
                  Current Job
                </label>
              </div>
              <TextAreaFieldGroup
                label="Job Description"
                name="description"
                value={description}
                onChange={updateFormInput}
                error={errors.description}
                info="Tell us about the the position"
              />
              <input
                type="submit"
                value="Submit"
                className="btn btn-info btn-block mt-4"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default addExperience;

addExperience.proptypes = {
  addExperience: Proptypes.func.isRequired,
  errors: Proptypes.object.isRequired,
  profile: Proptypes.object.isRequired,
};
