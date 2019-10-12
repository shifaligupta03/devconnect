import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import createProfileForm from './createProfile';
import {createProfile} from '../../actions/profileActions';

function mapStateToProps(state) {
  return {
      profile: state.profile,
      errors: state.errors
  };
}

export default connect(mapStateToProps,{createProfile})(withRouter(createProfileForm));
