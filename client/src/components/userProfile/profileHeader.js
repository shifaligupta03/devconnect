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
    user: {
      _id = '',
      name = '',
      avatar = '',
      requests = [],
      connections = [],
    } = {},
  },
  sendConnectRequest,
  connectorId,
}) => {
  let alreadySentConnectionRequest =
    requests.filter(req => req.id == connectorId).length > 0;

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card card-body bg-info text-white mb-3">
          <div className="row">
            <div className="col-4 col-md-3 m-auto">
              <img className="rounded-circle" src={avatar} alt="" />
            </div>
          </div>
          <div className="text-center">
            <h1 className="display-4 text-center">{name} </h1>
            <p className="lead text-center">
              {role == 'Employer' ? industryType : status}
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
            {connectorId && connectorId != _id ? (
              <button
                onClick={e => sendConnectRequest(connectorId, _id)}
                className="btn btn-primary"
                disabled={alreadySentConnectionRequest}
              >
                {alreadySentConnectionRequest
                  ? 'Connection Request Sent'
                  : 'Connect'}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileHeader.proptypes = {
  profile: Proptypes.object.isRequired,
};

export default ProfileHeader;
