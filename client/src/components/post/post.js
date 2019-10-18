import React, { useEffect } from "react";
import Proptypes from "prop-types";
import { Link } from "react-router-dom";
import PostItem from "../Posts/postItem.container";
import CommentForm from "../commentForm/commentForm.container";
import CommentFeed from "../commentFeed/commentFeed.container";
import Spinner from '../common/spinner';

const Post = ({ getPost, post: { post, loading }, ...rest }) => {
  console.log(post);
  const postId = rest.match.params.id;
  useEffect(() => {
    getPost(postId);
  }, []);

  let postContent =
    !post || loading || Object.keys(post).length === 0 ? (
      <Spinner />
    ) : (
      <div>
        <PostItem post={post} showActions={false} />
        <CommentForm postId={post._id} />
        <CommentFeed postId={post._id} comments={post.comments} />
      </div>
    );

  return (
    <div className="post">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Link to="/feed" className="btn btn-light mb-3">
              Back To Feed
            </Link>
            {postContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;

Post.proptypes = {
  getPosts: Proptypes.func.isRequired,
  post: Proptypes.object.isRequired
};
