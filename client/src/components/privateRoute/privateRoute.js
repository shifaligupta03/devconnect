import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Proptypes from 'prop-types';

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
    <Route
        {...rest}
        render={props => (auth.isAuthenticated === true) ? (<Component {...props} />) : <Redirect to="/login" />}
    />
)

export default PrivateRoute;

PrivateRoute.proptypes = {
    auth: Proptypes.object.isRequired,
};