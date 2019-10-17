import {connect} from 'react-redux';
import PostItem from './postItem';
import { deletePost, addLike, removeLike } from '../../actions/postActions';

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(
  mapStateToProps,
  { deletePost, addLike, removeLike}
)(PostItem);
