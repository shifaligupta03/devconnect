import React from 'react';
import Proptypes from 'prop-types';
import { Link } from 'react-router-dom';

const Navbar = ({ auth, logoutUser, clearCurrentProfile, history }) => {
  const { isAuthenticated, user } = auth;
  const authLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <a
          href="#"
          onClick={() => {
            clearCurrentProfile();
            logoutUser(history);
          }}
          className="nav-link"
        >
          <img
            className="rounded-circle"
            style={{ width: '25px', marginRight: '5px' }}
            src={user.avatar}
            alt={user.name}
          />
          Logout
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/register">
          Register
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </li>
    </ul>
  );


  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <a className="navbar-brand" href="landing.html">
            DevConnect
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href="profiles.html">
                  {' '}
                  Developers
                </a>
              </li>
            </ul>

            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;

Navbar.proptypes = {
  logoutUser: Proptypes.func.isRequired,
  clearCurrentProfile: Proptypes.func.isRequired,
  auth: Proptypes.object.isRequired,
};
