import {connect} from 'react-redux';
import PostItem from './postItem';
import {
  deletePost,
  addLike,
  removeLike,
  addComment,
} from '../../actions/postActions';

function mapStateToProps(state) {
  return {
    auth: state.auth,
    errors: state.errors,
  };
}

export default connect(
  mapStateToProps,
  {deletePost, addLike, removeLike, addComment}
)(PostItem);
