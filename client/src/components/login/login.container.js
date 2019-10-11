import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Login from './login';
import {loginUser} from '../../actions/authActions';

function mapStateToProps(state) {
  return {
    auth: state.auth,
    errors: state.errors,
  };
}

export default connect(
  mapStateToProps,
  {loginUser}
)(withRouter(Login));
