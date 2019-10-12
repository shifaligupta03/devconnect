import React, {useState} from 'react';
import Proptypes from 'prop-types';
import TextFieldGroup from '../FormComponents/TextFieldGroup';
import TextAreaFieldGroup from '../FormComponents/TextAreaFieldGroup';
import InputGroup from '../FormComponents/inputGroup';
import SelectListGroup from '../FormComponents/selectListGroup';

const createProfile = ({errors, profile, history, createProfile}) => {
  const [handle, sethandle] = useState('');
  const [company, setCompany] = useState('');
  const [website, setWebsite] = useState('');
  const [location, setlocation] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [status, setStatus] = useState('');
  const [skills, setSkills] = useState('');
  const [bio, setBio] = useState('');
  // const [errors, seterrors] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const profileData = {
      company,
      website,
      city,
      province,
      status,
      skills,
      bio
    };
    createProfile(profileData, history);
  };

  // Select options for status
  const options = [
    {label: '* Select Professional Status', value: 0},
    {label: 'Developer', value: 'Developer'},
    {label: 'Junior Developer', value: 'Junior Developer'},
    {label: 'Senior Developer', value: 'Senior Developer'},
    {label: 'Manager', value: 'Manager'},
    {label: 'Student or Learning', value: 'Student or Learning'},
    {label: 'Instructor or Teacher', value: 'Instructor or Teacher'},
    {label: 'Intern', value: 'Intern'},
    {label: 'Other', value: 'Other'},
  ];

  return (
    <div className="create-profile">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <div className="display-4 text-center">Create your Profile</div>
            <form onSubmit={handleSubmit}>
              <TextAreaFieldGroup
                label="Bio"
                placeholder="Short Bio"
                name="bio"
                value={bio}
                onChange={e => setBio(e.target.value)}
                error={errors.bio}
                required={true}
              />
              <SelectListGroup
                label="Professional Status"
                placeholder="Status"
                name="status"
                value={status}
                onChange={e => setStatus(e.target.value)}
                options={options}
                error={errors.status}
                required={true}
              />

              <TextFieldGroup
                label="Company"
                placeholder="Company"
                name="company"
                value={company}
                onChange={e => setCompany(e.target.value)}
                error={errors.company}
                required={true}
              />
              <TextFieldGroup
                label="Website"
                name="website"
                value={website}
                onChange={e => setWebsite(e.target.value)}
                error={errors.website}
              />
              <TextFieldGroup
                label="City"
                name="city"
                value={city}
                onChange={e => setCity(e.target.value)}
                error={errors.city}
                required={true}
              />
              <TextFieldGroup
                label="Province"
                name="province"
                value={province}
                onChange={e => setProvince(e.target.value)}
                error={errors.province}
                required={true}
              />
              <TextFieldGroup
                label="Skills"
                name="skills"
                value={skills}
                onChange={e => setSkills(e.target.value)}
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

export default createProfile;

createProfile.proptypes = {
  errors: Proptypes.object.isRequired,
  profile: Proptypes.object.isRequired,
};
