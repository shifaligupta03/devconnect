import React from 'react';
import Proptypes from 'prop-types';

const ProfileRequests = ({
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
  acceptConnection,
  rejectConnection,
  connectorId,
}) => {
  const requestcontent =
    requests.length &&
    requests.map(req => (
      <div key={req.id} className="row">
        <div className="col-5 m-auto">
          {req.name} wants to be your connection
          <br />
          <button
            onClick={e => acceptConnection(req.id, _id)}
            className="btn btn-primary mr-3"
          >
            Accept
          </button>
          <button
            onClick={e => rejectConnection(req.id, _id)}
            className="btn btn-primary"
          >
            Reject
          </button>
        </div>
      </div>
    ));
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card card-body mb-3">{requestcontent}</div>
      </div>
    </div>
  );
};

ProfileRequests.proptypes = {
  profile: Proptypes.object.isRequired,
};

export default ProfileRequests;

