import React, {useEffect} from 'react';
import Proptypes from 'prop-types';
import PostForm from './postForm.container';
import PostFeed from './postFeed.container';
import Spinner from '../common/spinner';

const Posts = ({getPosts, post: {posts, loading}}) => {
  useEffect(() => {
    getPosts();
  }, []);

  let postContent =
    !posts || loading ? <Spinner /> : <PostFeed posts={posts} />;

  return (
    <div className="feed">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <PostForm />
            {postContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;

Posts.proptypes = {
  getPosts: Proptypes.func.isRequired,
  post: Proptypes.object.isRequired,
};
