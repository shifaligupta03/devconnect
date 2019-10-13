import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Profiles from './profiles';
import {getProfiles} from '../../actions/profileActions';

function mapStateToProps(state) {
  return {
    userProfile: state.profile,
  };
}

export default connect(
  mapStateToProps,
  {getProfiles}
)(withRouter(Profiles));
