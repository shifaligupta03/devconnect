import React, {useReducer, useEffect} from 'react';
import Proptypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import registerReducer from './reducer';

const Register = ({auth, errors, registerUser, history}) => {
  const initialState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const [state, dispatch] = useReducer(registerReducer, initialState);
  let {name, email, password, confirmPassword} = state;

  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [password2, setPassword2] = useState('');

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push('/dashboard');
    }
  }, []);
  const updateFormInput = e => {
    e.preventDefault();
    dispatch({
      type: 'input',
      name: e.target.name,
      value: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    registerUser({...state}, history);
  };

  // const handleSubmit = e => {
  //   e.preventDefault();
  //   const newUser = {
  //     name,
  //     email,
  //     password,
  //     confirmPassword,
  //   };
  //   registerUser(newUser, history);
  // };

  return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Register</h1>
            <p className="lead text-center">Create your DevConnect account</p>
            <form onSubmit={handleSubmit}>
              <TextFieldGroup
                placeholder="Name"
                name="name"
                onChange={updateFormInput}
                value={name}
                error={errors.name}
                required={true}
              />
              <TextFieldGroup
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={updateFormInput}
                error={errors.email}
                required={true}
              />
              <TextFieldGroup
                type="password"
                placeholder="Password"
                name="password"
                onChange={updateFormInput}
                value={password}
                error={errors.password}
                info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                required={true}
              />
              <TextFieldGroup
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                onChange={updateFormInput}
                value={confirmPassword}
                error={errors.confirmPassword}
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

export default Register;

Register.proptypes = {
  registerUser: Proptypes.func.isRequired,
  auth: Proptypes.object.isRequired,
  errors: Proptypes.object.isRequired,
};
