import {connect} from 'react-redux';
import Dashboard from './dashboard';
import {getCurrentProfile, deleteAccount} from '../../actions/profileActions';

function mapStateToProps(state) {
  return {
    userProfile: state.profile,
    auth: state.auth,
  };
}

export default connect(
  mapStateToProps,
  {getCurrentProfile, deleteAccount}
)(Dashboard);
