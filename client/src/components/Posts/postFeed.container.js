import {connect} from 'react-redux';
import PostFeed from './postFeed';
import {getPost} from '../../actions/postActions';

function mapStateToProps(state) {
  return {
    posts: state.post.posts,
  };
}

export default connect(
  mapStateToProps,
  {getPost}
)(PostFeed);
