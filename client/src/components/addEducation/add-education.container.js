import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import addEducationForm from './add-education';
import {addEducation} from '../../actions/profileActions';

function mapStateToProps(state) {
  return {
      profile: state.profile,
      errors: state.errors
  };
}

export default connect(mapStateToProps, {addEducation})(withRouter(addEducationForm));
