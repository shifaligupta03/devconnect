import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import Register from './register';
import { registerUser } from '../../actions/authActions';

function mapStateToProps(state) {
    return {
      auth: state.auth,
      errors: state.errors
    };
  }

export default connect(mapStateToProps, {registerUser})(withRouter(Register));