import React from 'react';
import Proptypes from 'prop-types';

const ProfileHeader = ({
  profile: {
    status,
    city,
    company,
    website,
    role,
    industryType,
    user: {name, avatar},
  },
}) => (
  <div className="row">
    <div className="col-md-12">
      <div className="card card-body bg-info text-white mb-3">
        <div className="row">
          <div className="col-4 col-md-3 m-auto">
            <img className="rounded-circle" src={avatar} alt="" />
          </div>
        </div>
        <div className="text-center">
          <h1 className="display-4 text-center">{name}</h1>
          <p className="lead text-center">
            {role == "Employer" ? industryType : status} 
            {company ? <span>at {company}</span> : null}
          </p>
          {city ? <p>{city}</p> : null}
          <p>
            {website ? (
              <a className="text-white p-2" href={website} target="_blank">
                <i className="fas fa-globe fa-2x" />
              </a>
            ) : null}
          </p>
        </div>
      </div>
    </div>
  </div>
);

ProfileHeader.proptypes = {
  profile: Proptypes.object.isRequired,
};

export default ProfileHeader;
