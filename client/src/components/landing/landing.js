import React, { useEffect } from 'react';
import './landing.css';
import Proptypes from 'prop-types';
import { Link } from 'react-router-dom';

const Landing = ({ auth, history }) => {
  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push('/feed');
    }
  }, []);

  return (
    <div className="landing">
      <div className="dark-overlay landing-inner text-light">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 className="display-3 mb-4">DevConnect</h1>
              <p className="lead">
                {' '}
                Create a developer profile/portfolio, share posts and get help
                from other developers
            </p>
              <hr />
              <Link className="btn btn-lg btn-info mr-2" to="/register">
                Sign Up
            </Link>
              <Link className="btn btn-lg btn-light" to="/login">
                Login
            </Link>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing;

Landing.proptypes = {
  auth: Proptypes.object.isRequired,
};
