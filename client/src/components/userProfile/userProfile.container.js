import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import userProfile from './userProfile';
import { getProfileByUsername } from '../../actions/profileActions';

function mapStateToProps(state) {
  console.log(state);
  return {
    userProfile: state.profile,
  };
}

export default connect(
  mapStateToProps,
  { getProfileByUsername }
)(withRouter(userProfile));
