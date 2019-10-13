import React, {useReducer, useEffect} from 'react';
import Proptypes from 'prop-types';
// import TextFieldGroup from '../common/TextFieldGroup';
// import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
// import SelectListGroup from '../common/selectListGroup';
// import profileReducer from './reducer';
// import ProfessionOptions from '../common/data/profession';
import Spinner from '../common/spinner';

const Profiles = ({
  errors,
  history,
  userProfile: {profiles, loading, profile},
  getProfiles,
}) => {
  useEffect(() => {
    getProfiles();
  }, []);

  let profileItems;
  if (profile === null || loading) {
    profileItems = <Spinner />;
  } else {
    if (profiles.length > 0) {
      profileItems = profiles.map(profile => (
        <ProfileItem key={profile._id} profile={profile} />
      ));
    } else {
      profileItems = <h4>No Profiles Found</h4>;
    }
  }

  return (
    <div className="profiles">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4 text-center">Developer Profiles</h1>
            <p className="lead text-center">
              Browse and connect with developers
            </p>
            {profileItems}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profiles;

Profiles.proptypes = {
  getProfiles: Proptypes.func.isRequired,
  userProfile: Proptypes.object.isRequired,
};
