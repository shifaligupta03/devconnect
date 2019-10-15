import React, {useReducer, useEffect} from 'react';
import Proptypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/selectListGroup';
import profileReducer from './reducer';
import ProfessionOptions from '../common/data/profession';

const setProfile = ({
  errors,
  userProfile: {profile},
  auth: {
    user: {role},
  },
  history,
  createProfile,
  getCurrentProfile,
}) => {
  const IndustryTypeOptions = [
    {label: 'Information Services', value: 'Information Services'},
    {label: 'Marketing and Sales', value: 'Marketing and Sales'},
    {label: 'Gaming', value: 'Gaming'},
  ];

  const CompanySizeOptions = [
    {label: '1-50', value: 'lessThanFifty'},
    {label: '50-200', value: 'lessThanTwoHunderd'},
    {label: '200-500', value: 'lessThanFiveHundred'},
    {label: '500-1000', value: 'lessThanThousand'},
    {label: '+1000', value: 'greaterThanThousand'},
  ];
  const initialState = {
    username: '',
    company: '',
    website: '',
    city: '',
    province: '',
    status: ProfessionOptions[0].value || '',
    industryType: IndustryTypeOptions[0].value || '',
    companySize: CompanySizeOptions[0].value || '',
    skills: '',
    bio: '',
    headquarters: '',
    founded: '',
  };
  const [state, dispatch] = useReducer(profileReducer, initialState);

  let {
    company,
    website,
    city,
    province,
    status,
    skills,
    bio,
    username,
    industryType,
    companySize,
    headquarters,
    founded,
  } = state;

  useEffect(() => {
    getCurrentProfile();
  }, []);

  useEffect(() => {
    dispatch({
      type: 'edit',
      payload: profile,
    });
  }, [profile && profile.username]);

  const handleSubmit = e => {
    e.preventDefault();
    // console.log(newState);
    createProfile({role, ...state}, history);
  };

  const updateFormInput = e => {
    e.preventDefault();
    dispatch({
      type: 'input',
      name: e.target.name,
      value: e.target.value,
    });
  };

  const companyProfile = (
    <React.Fragment>
      <SelectListGroup
        label="Industry Type"
        placeholder=""
        name="industryType"
        value={industryType}
        onChange={updateFormInput}
        options={IndustryTypeOptions}
        error={errors.industryType}
        required={true}
      />

      <SelectListGroup
        label="Select Company Size"
        placeholder=""
        name="companySize"
        value={companySize}
        onChange={updateFormInput}
        options={CompanySizeOptions}
        error={errors.companySize}
        required={true}
      />
      <TextFieldGroup
        label="Headquarters"
        placeholder=""
        name="headquarters"
        value={headquarters}
        onChange={updateFormInput}
        error={errors.headquarters}
        required={true}
      />

      <TextFieldGroup
        label="Founded in"
        name="founded"
        type="date"
        value={founded}
        onChange={updateFormInput}
        error={errors.founded}
        required={true}
      />

     
    </React.Fragment>
  );

  const userProfile = (
    <React.Fragment>
      <SelectListGroup
        label="Professional Status"
        placeholder="Status"
        name="status"
        value={status}
        onChange={updateFormInput}
        options={ProfessionOptions}
        error={errors.status}
        required={true}
      />

      <TextFieldGroup
        label="Company"
        placeholder="Company"
        name="company"
        value={company}
        onChange={updateFormInput}
        error={errors.company}
        required={true}
      />
      <TextFieldGroup
        label="City"
        name="city"
        value={city}
        onChange={updateFormInput}
        error={errors.city}
        required={true}
      />
      <TextFieldGroup
        label="Province"
        name="province"
        value={province}
        onChange={updateFormInput}
        error={errors.province}
        required={true}
      />
      <TextFieldGroup
        label="Skills"
        name="skills"
        value={skills}
        onChange={updateFormInput}
        error={errors.skills}
        required={true}
        info="Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP"
      />
    </React.Fragment>
  );

  return (
    <div className="create-profile">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <div className="display-4 text-center">Profile Settings</div>
            <form onSubmit={handleSubmit}>
              <TextFieldGroup
                label="Username"
                placeholder=""
                name="username"
                value={username}
                onChange={updateFormInput}
                error={errors.username}
                required={true}
              />
              <TextAreaFieldGroup
                label="Bio"
                placeholder="Short Bio"
                name="bio"
                value={bio}
                onChange={updateFormInput}
                error={errors.bio}
                required={true}
              />
              <TextFieldGroup
                label="Website"
                name="website"
                value={website}
                onChange={updateFormInput}
                error={errors.website}
              />
              {role == 'Employer' ? companyProfile : userProfile}
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

export default setProfile;

setProfile.proptypes = {
  createProfile: Proptypes.func.isRequired,
  getCurrentProfile: Proptypes.func.isRequired,
  errors: Proptypes.object.isRequired,
  profile: Proptypes.object.isRequired,
};
