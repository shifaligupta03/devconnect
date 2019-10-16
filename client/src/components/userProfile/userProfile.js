import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Proptypes from "prop-types";
import Spinner from "../common/spinner";
import ProfileHeader from "./profileHeader";
import ProfileAbout from "./profileAbout";
import ProfileCreds from "./profileCreds";

const userProfile = ({
  getProfileByUsername,
  userProfile: { profile, loading },
  ...rest
}) => {
  const { username } = rest.match.params;
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
        <div className="row">
          <div className="col-md-6">
            <Link to="/profiles" className="btn btn-light mb-3 float-left">
              Back To Profiles
            </Link>
          </div>
          <div className="col-md-6" />
        </div>
        <ProfileHeader profile={profile} />
        <ProfileAbout profile={profile} />
        {profile.role === "Employer" ? (
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
  userProfile: Proptypes.object.isRequired
};
