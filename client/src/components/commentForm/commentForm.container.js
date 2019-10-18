import {connect} from 'react-redux';
import CommentForm from './commentForm';
import {addComment } from '../../actions/postActions';

function mapStateToProps(state) {
  return {
    auth: state.auth,
    errors: state.errors,
  };
}

export default connect(
  mapStateToProps,
  {addComment}
)(CommentForm);
