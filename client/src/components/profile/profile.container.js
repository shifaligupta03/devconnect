import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import profileForm from './profile';
import {createProfile, getCurrentProfile} from '../../actions/profileActions';

function mapStateToProps(state) {
  return {
    userProfile: state.profile,
    errors: state.errors,
  };
}

export default connect(
  mapStateToProps,
  {createProfile, getCurrentProfile}
)(withRouter(profileForm));
