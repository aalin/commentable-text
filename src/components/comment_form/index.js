import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

function createHandler(onCreate, quote, e) {
  e.preventDefault();
  onCreate(quote, e.target.form['comment'].value);
}

function preventDefault(cb = null) {
  return (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    };

    cb && cb();
  }
}

export default
function CommentForm({ createComment, discardComment, newComment = null }) {
  if (newComment === null) {
    return null;
  }

  return (
    <div>
      <div className={styles.outer} onClick={discardComment} />
      <div className={styles.form}>
        <form>
          <h3>New comment</h3>
          <blockquote className={styles.quote}>{newComment.quote.text}</blockquote>
          <textarea name="comment" />
          <button
            className={styles.submitButton}
            onClick={createHandler.bind(null, createComment, newComment.quote)}
          >Submit</button>
          <button
            className={styles.discardButton}
            onClick={preventDefault(discardComment)}
          >Discard</button>
        </form>
      </div>
    </div>
  );
}

CommentForm.propTypes = {
  discardComment: PropTypes.func.isRequired,
  createComment: PropTypes.func.isRequired,
  newComment: PropTypes.shape({
    quote: PropTypes.object
  })
}
