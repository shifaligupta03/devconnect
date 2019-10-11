import React, { useEffect } from 'react';
import Proptypes from 'prop-types';
import { Link } from 'react-router-dom';
import Spinner from '../FormComponents/spinner';

const Dashboard = ({ getCurrentProfile, profile, profile: { loading }, auth: { user } }) => {
    let dashboardContent;
    useEffect(() => {
        getCurrentProfile();
    }, []);

    if (profile === null || loading) {
        dashboardContent = <Spinner />;
    } else {
        if (Object.keys(profile).length > 0) {
            dashboardContent = <h4>TO DO: Display Profile</h4>
        } else {
            dashboardContent = (
                <div>
                    <p className="lead text-muted">Welcome {user.name}</p>
                    <p>You have not set up a profile, please add some info</p>
                    <Link to="/create-profile" className="btn btn-lg btn-info"> Create Profile</Link>
                </div>
            )
        }
    }

    return (
        <div className="dashboard">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="display-4"> Dashboard</h1>
                        {dashboardContent}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;

Dashboard.proptypes = {
    getCurrentProfile: Proptypes.func.isRequired,
    auth: Proptypes.object.isRequired,
    profile: Proptypes.object.isRequired,
};
