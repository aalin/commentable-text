import React from 'react';
import PropTypes from 'prop-types';
import styles from './comment_form.css';

function clickHandler(onClick, comment, e) {
  e.preventDefault();
  onClick(comment.quote, comment.paragraph, comment.start, comment.end, e.target.form['comment'].value);
}

export default
function CommentForm({ createComment, discardComment, comment = null }) {
  if (comment === null) {
    return null;
  }

  return (
    <div>
      <div className={styles.outer} onClick={discardComment} />
      <div className={styles.form}>
        <form>
          <h3>New comment</h3>
          <blockquote className={styles.quote}>{comment.quote}</blockquote>
          <textarea name="comment" />
          <button
            className={styles.submitButton}
            onClick={clickHandler.bind(null, createComment, comment)}
          >Submit</button>
          <button
            className={styles.discardButton}
            onClick={clickHandler.bind(null, discardComment, comment)}
          >Discard</button>
        </form>
      </div>
    </div>
  );
}

CommentForm.propTypes = {
  discardComment: PropTypes.func.isRequired,
  createComment: PropTypes.func.isRequired,
  comment: PropTypes.shape({
    quote: PropTypes.string
  })
}
