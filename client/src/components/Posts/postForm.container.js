import {connect} from 'react-redux';
import PostForm from './postForm';
import {addPost} from '../../actions/postActions';

function mapStateToProps(state) {
  return {
    auth: state.auth,
    errors: state.errors,
  };
}

export default connect(
  mapStateToProps,
  {addPost}
)(PostForm);
