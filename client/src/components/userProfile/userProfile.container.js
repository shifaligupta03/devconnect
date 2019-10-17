import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import userProfile from './userProfile';
import { getProfileByUsername, sendConnectRequest } from '../../actions/profileActions';

function mapStateToProps(state) {
  return {
    auth: state.auth,
    userProfile: state.profile,
  };
}

export default connect(
  mapStateToProps,
  { getProfileByUsername, sendConnectRequest }
)(withRouter(userProfile));
