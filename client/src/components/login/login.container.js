import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Login from './login';
import {loginUser} from '../../actions/authActions';
import {getCurrentProfile} from '../../actions/profileActions';

function mapStateToProps(state) {
  return {
    profile: state.profile,
    auth: state.auth,
    errors: state.errors,
  };
}

export default connect(
  mapStateToProps,
  {loginUser, getCurrentProfile}
)(withRouter(Login));
