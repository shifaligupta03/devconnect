import { connect } from "react-redux";
import Post from "./post";
import { getPost } from "../../actions/postActions";

function mapStateToProps(state) {
  console.log(state);
  return {
    post: state.post
  };
}

export default connect(
  mapStateToProps,
  { getPost }
)(Post);
