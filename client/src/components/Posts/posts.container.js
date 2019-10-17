import {connect} from 'react-redux';
import Posts from './posts';
import {getPosts} from '../../actions/postActions';

function mapStateToProps(state) {
  return {
    post: state.post,
  };
}

export default connect(
  mapStateToProps,
  {getPosts}
)(Posts);
