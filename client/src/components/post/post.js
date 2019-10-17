import React, {useEffect} from 'react';
import Proptypes from 'prop-types';
import PostItem from '../Posts/postItem.container';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';

const Post = ({getPost, post: {post, loading}}) => {
  useEffect(() => {
    getPost();
  }, []);

  let postContent =
    !posts || loading ? (
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
  post: Proptypes.object.isRequired,
};
