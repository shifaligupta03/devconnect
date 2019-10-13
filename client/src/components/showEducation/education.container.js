import {connect} from 'react-redux';
import education from './education';
import {deleteEducation} from '../../actions/profileActions';

export default connect(null, {deleteEducation})(education);
