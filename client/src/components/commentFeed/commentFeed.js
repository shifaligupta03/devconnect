import React from 'react';
import Proptypes from 'prop-types';
import CommentItem from '../commentItem/commentItem.container';

const CommentFeed = ({comments, postId}) =>
  comments.map(comment => (
    <CommentItem key={comment._id} comment={comment} postId={postId} />
  ));

export default CommentFeed;

CommentItem.proptypes = {
  comments: Proptypes.array.isRequired,
  postId: Proptypes.string.isRequired,
};
