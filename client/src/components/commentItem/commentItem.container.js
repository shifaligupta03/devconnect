import {connect} from 'react-redux';
import CommentItem from './commentItem';
import {deleteComment} from '../../actions/postActions';

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(
  mapStateToProps,
  {deleteComment}
)(CommentItem);
