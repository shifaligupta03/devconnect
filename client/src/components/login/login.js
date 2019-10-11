import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import Proptypes from 'prop-types';

const Login = ({ auth, errors, loginUser, history }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (auth.isAuthenticated) {
            history.push('/dashboard');
        }
    }, [auth.isAuthenticated]);


    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            email,
            password
        };
        loginUser(userData);
    }

    return (
        <div className="login">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Log In</h1>
                        <p className="lead text-center">
                            Sign in to your DevConnect account
              </p>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input
                                    type="email"
                                    className={classnames('form-control form-control-lg', {
                                        'is-invalid': errors.email,
                                    })}
                                    placeholder="Email Address"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && (
                                    <div className="invalid-feedback">{errors.email}</div>
                                )}
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    className={classnames('form-control form-control-lg', {
                                        'is-invalid': errors.password,
                                    })}
                                    placeholder="Password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {errors.password && (
                                    <div className="invalid-feedback">{errors.password}</div>
                                )}
                            </div>
                            <input type="submit" className="btn btn-info btn-block mt-4" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )

}


export default Login;

Login.proptypes = {
    loginUser: Proptypes.func.isRequired,
    auth: Proptypes.object.isRequired,
    errors: Proptypes.object.isRequired,
  };
