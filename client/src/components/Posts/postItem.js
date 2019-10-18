import React, {useState, useEffect} from 'react';
import Proptypes from 'prop-types';
import classnames from 'classnames';
import {Link} from 'react-router-dom';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import CommentFeed from '../commentFeed/commentFeed.container';

const PostItem = ({
  addComment,
  deletePost,
  addLike,
  removeLike,
  post: {
    _id: postId,
    avatar: postAvatar,
    name: postName,
    text: postText,
    likes,
    user: postByUserId,
    comments,
  },
  auth: {
    user: {name, avatar, id: authUserId},
  },
  errors,
  showActions,
}) => {
  let [text, setText] = useState('');
  let [render, setRender] = useState(false);
  const onDeleteClick = id => {
    deletePost(id);
  };

  const onLikeClick = id => {
    addLike(id);
  };

  const onUnlikeClick = id => {
    removeLike(id);
  };

  const addCommentInPost = postId => {
    const newComment = {
      text,
      name,
      avatar,
    };
    addComment(postId, newComment);
    setRender(!render);
    setText('');
  };

  const findUserLike = (likes = []) => {
    return likes.filter(like => like.user === authUserId).length > 0
      ? true
      : false;
  };

  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-2">
          <a href="profile.html">
            <img
              width="100"
              height="100"
              className="rounded-circle d-none d-md-block"
              src={postAvatar}
              alt=""
            />
          </a>
          <br />
        </div>
        <div className="col-md-10">
          <p>{postName}</p>
          <p className="lead">{postText}</p>
          {showActions ? (
            <span>
              <button
                onClick={e => onLikeClick(postId)}
                type="button"
                className="btn btn-light mr-1 mb-1"
              >
                <i
                  className={classnames('fas fa-thumbs-up', {
                    'text-info': findUserLike(likes),
                  })}
                />
                <span className="badge badge-light">{likes.length}</span>
              </button>
              <button
                onClick={e => onUnlikeClick(postId)}
                type="button"
                className="btn btn-light mr-1 mb-1"
              >
                <i className="text-secondary fas fa-thumbs-down" />
              </button>
              {/* <Link to={`/post/${postId}`} className="btn btn-info mr-1">
                Comments
              </Link>  */}
              <TextAreaFieldGroup
                name="addComment"
                value={text}
                onChange={e => setText(e.target.value)}
                error={errors.text}
              />

              <button
                onClick={e => addCommentInPost(postId)}
                type="button"
                className="btn btn-info mr-1 mb-3"
              >
                Add Comment
              </button>
              {postByUserId === authUserId ? (
                <button
                  onClick={e => onDeleteClick(postId)}
                  type="button"
                  className="btn btn-danger mr-1 mb-3"
                >
                  Delete Post
                </button>
              ) : null}

              <CommentFeed postId={postId} comments={comments} />
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

PostItem.proptypes = {
  deletePost: Proptypes.func.isRequired,
  addLike: Proptypes.func.isRequired,
  removeLike: Proptypes.func.isRequired,
  auth: Proptypes.object.isRequired,
  post: Proptypes.object.isRequired,
};

export default PostItem;
