import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import Navbar from './navBar';
import { logoutUser } from '../../actions/authActions';

function mapStateToProps(state) {
    return {
      auth: state.auth,
      errors: state.errors
    };
  }

export default connect(mapStateToProps, {logoutUser})(withRouter(Navbar));