import React, { useState, useEffect } from 'react';
import Proptypes from 'prop-types';
import TextFieldGroup from '../FormComponents/TextFieldGroup';

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
                            <TextFieldGroup
                                placeholder="Name"
                                placeholder="Name"
                                name="name"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                error={errors.name}
                            />
                            <TextFieldGroup
                                placeholder="Email Address"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={errors.email}
                            />
                            <TextFieldGroup
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                error={errors.password}
                                info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                            />
                            <TextFieldGroup
                                type="password"
                                placeholder="Confirm Password"
                                name="password2"
                                onChange={(e) => setPassword2(e.target.value)}
                                value={password2}
                                error={errors.password2}
                            />
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
