import React from 'react';
import CommentableText from './containers/commentable_text';
import CommentForm from './containers/comment_form';
import CommentSection from './containers/comment_section';
import styles from './app.css';

export default function App() {
  return (
    <div className={styles.app}>
      <CommentableText />
      <CommentForm />
      <CommentSection />
    </div>
  );
}
