import React, {useState, useEffect} from 'react';
import Proptypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';

const Login = ({auth, errors, loginUser, history}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push('/feed');
    }
  }, [auth.isAuthenticated]);

  const handleSubmit = e => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    loginUser(userData);
  };

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
              <TextFieldGroup
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                error={errors.email}
                required={true}
              />

              <TextFieldGroup
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                error={errors.password}
                required={true}
              />
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

Login.proptypes = {
  loginUser: Proptypes.func.isRequired,
  auth: Proptypes.object.isRequired,
  errors: Proptypes.object.isRequired,
};
