import React, {useState, useEffect, useReducer} from 'react';
import Proptypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/selectListGroup';
import editProfileReducer from './reducer';
import ProfessionOptions from '../common/data/profession';

const editProfile = ({
  errors,
  userProfile: {profile},
  history,
  createProfile,
  getCurrentProfile,
}) => {

  const [state, dispatch] = useReducer(
    editProfileReducer,
    { username: '', company: '', website: '', city: '', province: '', status: '', skills:'', bio:'' }
  )

  let {company, website, city, province, status, skills, bio, username} = state;
  useEffect(() => {
    getCurrentProfile();
    if (profile && profile.username) {
      console.log(profile);
      dispatch({
        type: "edit",
       payload: profile
    });
    }

  }, [profile && profile.username]);
  const handleSubmit = e => {
    e.preventDefault();
    const profileData = {
      company,
      website,
      city,
      province,
      status,
      skills,
      bio,
      username,
    };
  };

  const updateFormInput = (e) =>{
    e.preventDefault();
    dispatch({
      type: 'input',
      name: e.target.name,
      value: e.target.value,
    })
  }
  return (
    <div className="create-profile">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <div className="display-4 text-center">Edit Profile</div>
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
                label="Website"
                name="website"
                value={website}
                onChange={updateFormInput}
                error={errors.website}
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

export default editProfile;

editProfile.proptypes = {
  createProfile: Proptypes.func.isRequired,
  getCurrentProfile: Proptypes.func.isRequired,
  errors: Proptypes.object.isRequired,
  profile: Proptypes.object.isRequired,
};
