import React from 'react';
import PropTypes from 'prop-types';

function Comment({ quote, comment, onClick }) {
  return (
    <li>
      <p><a href="#" onClick={onClick}>{quote.text}</a></p>
      <p>{comment}</p>
    </li>
  );
}

export default
function CommentSection({ comments, goToComment }) {
  return (
    <div>
      <h3>Comments</h3>
      <ul>
        {comments.map((c, i) => <Comment key={i} {...c} onClick={goToComment.bind(null, c)} />)}
      </ul>
    </div>
  );
}

CommentSection.propTypes = {
  comments: PropTypes.array.isRequired,
  goToComment: PropTypes.func.isRequired
};
