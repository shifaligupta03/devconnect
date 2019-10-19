import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import Proptypes from 'prop-types';
import Spinner from '../common/spinner';
import ProfileHeader from './profileHeader';
import ProfileAbout from './profileAbout';
import ProfileCreds from './profileCreds';
import ProfileRequests from './profileRequests';

const userProfile = ({
  sendConnectRequest,
  acceptConnection,
  rejectConnection,
  getProfileByUsername,
  userProfile: {profile, loading},
  auth: {
    user: {id=""},
  },
  ...rest
}) => {
  const {username} = rest.match.params;
  useEffect(() => {
    if (username) {
      getProfileByUsername(username);
    }
  }, []);
  let profileContent =
    !profile || loading ? (
      <Spinner />
    ) : (
      <div>
        <ProfileHeader
          profile={profile}
          connectorId={id}
          sendConnectRequest={sendConnectRequest}
        />
        {profile &&
        profile.user &&
        profile.user.requests &&
        profile.user.requests.length &&
        profile.user._id == id ? (
          <ProfileRequests
            profile={profile}
            acceptConnection={acceptConnection}
            rejectConnection={rejectConnection}
          />
        ) : null}
        <ProfileAbout profile={profile} />
        {profile.role === 'Employee' ? (
          <ProfileCreds
            education={profile.education}
            experience={profile.experience}
          />
        ) : null}
      </div>
    );

  return (
    <div className="profile">
      <div className="container">
        <div className="row">
          <div className="col-md-12">{profileContent}</div>
        </div>
      </div>
    </div>
  );
};

export default userProfile;

userProfile.proptypes = {
  getProfileByUsername: Proptypes.func.isRequired,
  userProfile: Proptypes.object.isRequired,
};
