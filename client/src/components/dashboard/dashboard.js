import React, {useEffect} from 'react';
import Proptypes from 'prop-types';
import {Link} from 'react-router-dom';
import Spinner from '../common/spinner';
import ProfileActions from './ProfileActions';
import Experience from '../showExperience/experience.container';
import Education from '../showEducation/education.container';

const Dashboard = ({
  getCurrentProfile,
  userProfile: {loading, profile},
  auth: {user},
  deleteAccount,
}) => {
  const handleDeleteAccount = e => {
    e.preventDefault();
    deleteAccount();
  };

  let dashboardContent;
  useEffect(() => {
    getCurrentProfile();
  }, []);
  dashboardContent =
    profile === null || loading ? (
      <Spinner />
    ) : Object.keys(profile).length > 0 ? (
      <div>
        <p className="lead text-muted">
          Welcome <Link to={`/profile/${profile.username}`}> {user.name} </Link>{' '}
        </p>
        <ProfileActions profile={profile} />
        {profile.headquarters ? null : (
          <React.Fragment>
           <Experience experience={profile.experience} />
           <Education education={profile.education} />
           </React.Fragment>
        )}
        <div style={{marginBottom: '60px'}}>
          <button onClick={handleDeleteAccount} className="btn btn-danger">
            Delete My Account
          </button>
        </div>
      </div>
    ) : (
      <div>
        <p>You have not set up a profile, please add some info</p>
        <Link to="/create-profile" className="btn btn-lg btn-info">
          {' '}
          Create Profile
        </Link>
      </div>
    );

  return (
    <div className="dashboard">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {dashboardContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

Dashboard.proptypes = {
  getCurrentProfile: Proptypes.func.isRequired,
  deleteAccount: Proptypes.func.isRequired,
  auth: Proptypes.object.isRequired,
  profile: Proptypes.object.isRequired,
};
