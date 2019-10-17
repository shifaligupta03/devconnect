import React from "react";
import Proptypes from "prop-types";
import { Link } from "react-router-dom";

const Navbar = ({ auth, logoutUser, clearCurrentProfile, history, profile:{ username }={} }) => {
  const { isAuthenticated, user } = auth;
  const authLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to={`/profile/${username}`}>
          {username}
        </Link>
      </li>
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
            style={{ width: "25px", marginRight: "5px" }}
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
          Sign Up
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
          <Link to="/" className="navbar-brand">
            DevConnect
          </Link>
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
                <Link to="/profiles" className="nav-link">
                  {" "}
                  Developers
                </Link>
              </li>
            </ul>

            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

Navbar.proptypes = {
  logoutUser: Proptypes.func.isRequired,
  clearCurrentProfile: Proptypes.func.isRequired,
  auth: Proptypes.object.isRequired
};
