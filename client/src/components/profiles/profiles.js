import React, { useReducer, useEffect } from 'react';
import Proptypes from 'prop-types';
import Spinner from '../common/spinner';
import ProfileItem from './profileItems';

const Profiles = ({
  userProfile: { profiles, loading },
  getProfiles,
}) => {
  useEffect(() => {
    getProfiles();
  }, []);

  let profileItems = ((!profiles || loading) ? <Spinner /> : ((profiles.length > 0) ? (profiles.map(profile => (
    <ProfileItem key={profile._id} profile={profile} />
  ))) : <h4>No Profiles Found</h4>))

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
