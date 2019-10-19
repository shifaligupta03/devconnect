import React, {useReducer} from 'react';
import Proptypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import educationReducer from './reducer';

const addEducation = ({errors, profile, history, addEducation}) => {
  const initialState = {
    school: '',
    degree: '',
    fieldOfStudy: '',
    from: '',
    to: '',
    current: false,
    description: '',
    disabled: false,
  };

  const [state, dispatch] = useReducer(educationReducer, initialState);
  let {
    school,
    degree,
    fieldOfStudy,
    from,
    to,
    current,
    description,
    disabled,
  } = state;

  const handleSubmit = e => {
    e.preventDefault();
    addEducation({...state}, history);
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
    <div className="add-education">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Add Education</h1>
            <form onSubmit={handleSubmit}>
              <TextFieldGroup
                label="School"
                name="school"
                value={school}
                onChange={updateFormInput}
                error={errors.school}
                required={true}
              />
              <TextFieldGroup
                label="Degree or Certification"
                name="degree"
                value={degree}
                onChange={updateFormInput}
                error={errors.degree}
                required={true}
              />
              <TextFieldGroup
                label="Field of Study"
                name="fieldOfStudy"
                value={fieldOfStudy}
                onChange={updateFormInput}
                error={errors.fieldOfStudy}
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
                  Currently studying here
                </label>
              </div>
              <TextAreaFieldGroup
                placeholder="Program Description"
                name="description"
                value={description}
                onChange={updateFormInput}
                error={errors.description}
                info="Tell us about the program that you were in"
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

export default addEducation;

addEducation.proptypes = {
  addEducation: Proptypes.func.isRequired,
  errors: Proptypes.object.isRequired,
  profile: Proptypes.object.isRequired,
};
