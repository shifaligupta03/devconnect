import {connect} from 'react-redux';
import PrivateRoute from './privateRoute';

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
  }

export default connect(mapStateToProps)(PrivateRoute);
