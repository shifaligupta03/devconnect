import React from 'react';
import Proptypes from 'prop-types';
import classnames from 'classnames';
import {Link} from 'react-router-dom';

const PostItem = ({
  deletePost,
  addLike,
  removeLike,
  post,
  auth,
  showActions,
}) => {
  console.log({post, auth});
  const onDeleteClick = id => {
    deletePost(id);
  };

  const onLikeClick = id => {
    addLike(id);
  };

  const onUnlikeClick = id => {
    removeLike(id);
  };

  const findUserLike = (likes = []) => {
    return likes.filter(like => like.user === auth.user.id).length > 0
      ? true
      : false;
  };

  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-2">
          <a href="profile.html">
            <img width="100" height="100"
              className="rounded-circle d-none d-md-block"
              src={post.avatar}
              alt=""
            />
          </a>
          <br />
          <p style={{marginLeft:'15%'}}>{post.name}</p>
        </div>
        <div className="col-md-10">
          <p className="lead">{post.text}</p>
         {showActions ? ( 
          <span>
            <button
              onClick={e => onLikeClick(post._id)}
              type="button"
              className="btn btn-light mr-1"
            >
              <i
                className={classnames('fas fa-thumbs-up', {
                  'text-info': findUserLike(post.likes),
                })}
              />
              <span className="badge badge-light">{post.likes.length}</span>
            </button>
            <button
              onClick={e => onUnlikeClick(post._id)}
              type="button"
              className="btn btn-light mr-1"
            >
              <i className="text-secondary fas fa-thumbs-down" />
            </button>
            <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
              Comments
            </Link>
            {post && auth && post.user === auth.user.id ? (
              <button
                onClick={e => onDeleteClick(post._id)}
                type="button"
                className="btn btn-danger mr-1"
              >
                <i className="fas fa-times" />
              </button>
            ) : null}
          </span>
          ) : null} 
        </div>
      </div>
    </div>
  );
};

PostItem.defaultProps={
  showActions: true
}

PostItem.proptypes = {
  deletePost: Proptypes.func.isRequired,
  addLike: Proptypes.func.isRequired,
  removeLike: Proptypes.func.isRequired,
  auth: Proptypes.object.isRequired,
  post: Proptypes.object.isRequired,
};

export default PostItem;
