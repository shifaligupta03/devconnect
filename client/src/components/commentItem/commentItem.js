import React, {useEffect} from 'react';
import Proptypes from 'prop-types';

const CommentItem = ({comment, postId, auth, deleteComment}) => {
  const handleDelete = (postId, commentId) => {
    deleteComment(postId, commentId);
  };

  return (
    <div className="card card-body mt-1">
      <div className="row">
        <div className="col-md-2">
          <a href="profile.html">
            <img
              width="50"
              height="50"
              className="rounded-circle d-none d-md-block"
              src={comment.avatar}
              alt=""
            />
          </a>
          <br />
        </div>
        <div className="col-md-10">
          {comment.user === auth.user.id ? (
            <button
              onClick={() => handleDelete(postId, comment._id)}
              type="button"
              className="btn btn-danger mr-1"
              style={{float: 'right'}}
            >
              X
            </button>
          ) : null}
          <div>{comment.name}</div>
          <p className="lead">{comment.text}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;

CommentItem.proptypes = {
  deleteComment: Proptypes.func.isRequired,
  comment: Proptypes.object.isRequired,
  auth: Proptypes.object.isRequired,
  postId: Proptypes.string.isRequired,
};
