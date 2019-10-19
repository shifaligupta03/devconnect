import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Navbar from './navBar';
import {logoutUser} from '../../actions/authActions';
import {clearCurrentProfile} from '../../actions/profileActions';

function mapStateToProps(state) {
  return {
    auth: state.auth,
    errors: state.errors,
    profile: (state.profile && state.profile.profile) || {},
  };
}

export default connect(
  mapStateToProps,
  {logoutUser, clearCurrentProfile}
)(withRouter(Navbar));
