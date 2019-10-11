import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import Proptypes from 'prop-types';

const Register = ({ auth, errors, registerUser, history }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    useEffect(() => {
        if (auth.isAuthenticated) {
            history.push('/dashboard');
        }
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault()
        const newUser = {
            name,
            email,
            password,
            password2
        };
        console.log(newUser);
        registerUser(newUser, history);
    }

    return (
        <div className="register">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Register</h1>
                        <p className="lead text-center">
                            Create your DevConnect account
        </p>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className={classnames('form-control form-control-lg', {
                                        'is-invalid': errors.name,
                                    })}
                                    placeholder="Name"
                                    name="name"
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                />
                                {errors.name && (
                                    <div className="invalid-feedback">{errors.name}</div>
                                )}
                            </div>
                            <div className="form-group">
                                <input
                                    type="email"
                                    className={classnames('form-control form-control-lg', {
                                        'is-invalid': errors.email,
                                    })}
                                    placeholder="Email Address"
                                    name="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
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
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                />
                                {errors.password && (
                                    <div className="invalid-feedback">{errors.password}</div>
                                )}
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    className={classnames('form-control form-control-lg', {
                                        'is-invalid': errors.password2,
                                    })}
                                    placeholder="Confirm Password"
                                    name="password2"
                                    onChange={(e) => setPassword2(e.target.value)}
                                    value={password2}
                                />
                                {errors.password2 && (
                                    <div className="invalid-feedback">{errors.password2}</div>
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


export default Register;

Register.proptypes = {
    registerUser: Proptypes.func.isRequired,
    auth: Proptypes.object.isRequired,
    errors: Proptypes.object.isRequired,
};
