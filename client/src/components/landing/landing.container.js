import {connect} from 'react-redux';
import Landing from './landing';

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Landing);
