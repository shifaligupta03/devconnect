import {connect} from 'react-redux';
import experience from './experience';
import {deleteExperience} from '../../actions/profileActions';

export default connect(null,{deleteExperience})(experience);
