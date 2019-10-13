import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../../utils/setAuthToken';
import { setCurrentUser, logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';
import store from '../../store';
import { Provider } from 'react-redux';
import Navbar from '../navBar/navBar.container';
import Landing from '../landing/landing.container';
import Footer from '../footer/footer';
import Register from '../register/register.container';
import Login from '../login/login.container';
import Dashboard from '../dashboard/dashboard.container';
import Profile from '../profile/profile.container';
import Profiles from '../profiles/profiles.container';
import AddExperience from '../addExperience/add-experience.container';
import AddEducation from '../addEducation/add-education.container';
import PrivateRoute from '../privateRoute/privateRoute.container';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(clearCurrentProfile());
    store.dispatch(logoutUser());
    //TODO: clear current Profile
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Switch>
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <PrivateRoute path="/create-profile" component={Profile} />
              <PrivateRoute path="/edit-profile" component={Profile} />
              <PrivateRoute path="/add-experience" component={AddExperience} />
              <PrivateRoute path="/add-education" component={AddEducation} />
              <Route path="/profiles" component={Profiles} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
