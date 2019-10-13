import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import addExperienceForm from './add-experience';
import {addExperience} from '../../actions/profileActions';

function mapStateToProps(state) {
  return {
      profile: state.profile,
      errors: state.errors
  };
}

export default connect(mapStateToProps, {addExperience})(withRouter(addExperienceForm));
