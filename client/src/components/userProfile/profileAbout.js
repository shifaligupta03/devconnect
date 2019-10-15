import React from 'react';
import Proptypes from 'prop-types';

const ProfileAbout = ({
  profile: {
    skills,
    bio,
    user: {name},
  },
}) => {
  // Get first name
  const firstName = name.trim().split(' ')[0];

  // Skill List
  const UserSkills = skills.map((skill, index) => (
    <div key={index} className="p-3">
      <i className="fa fa-check" /> {skill}
    </div>
  ));
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card card-body bg-light mb-3">
          <h3 className="text-center text-info">{firstName}'s Bio</h3>
          <p className="lead">
            {bio ? (
              <span>{bio}</span>
            ) : (
              <span>{firstName} does not have a bio</span>
            )}
          </p>
          <hr />
          <h3 className="text-center text-info">Skill Set</h3>
          <div className="row">
            <div className="d-flex flex-wrap justify-content-center align-items-center">
              {UserSkills}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
ProfileAbout.proptypes = {
  profile: Proptypes.object.isRequired,
};

export default ProfileAbout;
