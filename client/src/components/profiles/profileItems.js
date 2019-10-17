import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProfileItem = ({ profile }) => {
  let {
    user: { avatar, name },
    status,
    company,
    city,
    username,
    skills,
    role,
    industryType
  } = profile;

  return (
    <div className="card card-body bg-light mb-3">
      <div className="row">
        <div className="col-3">
          <img src={avatar} alt="" className="rounded-circle" />
        </div>
        <div className="col-lg-5 col-md-4 col-8">
          <h3>{name}</h3>
          <p>
            {role == "Employer" ? industryType : status}
            {company ? <span>at {company}</span> : null}
          </p>
          <p>{city && <span>{city}</span>}</p>
          <Link to={`/profile/${username}`} className="btn btn-info">
            View Profile
          </Link>
        </div>
        {skills.length > 1 ? (
          <div className="col-md-4 d-none d-md-block">
            <h4>Skill Set</h4>
            <ul className="list-group">
              {skills.slice(0, 4).map((skill, index) => (
                <li key={index} className="list-group-item">
                  <i className="fa fa-check pr-1" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
