import {connect} from 'react-redux';
import Dashboard from './dashboard';
import { getCurrentProfile } from '../../actions/profileActions';

function mapStateToProps(state) {
  return {
      profile: state.profile,
      auth: state.auth
  };
}

export default connect(mapStateToProps, {getCurrentProfile})(Dashboard);
