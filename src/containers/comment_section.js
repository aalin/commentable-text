import CommentSection from '../components/comment_section';
import * as COMMENTS from './entities/comments/actions';

function mapStateToProps(state) {
  return {
    comments: state.comments.comments,
    comment: state.comments.newComment
  };
}

function mapDispatchToProps(dispatch) {
  return {
    newComment(text, paragraph, start, end) {
      dispatch(COMMENTS.newComment(text, paragraph, start, end));
    },
    createComment(text, paragraph, start, end, comment) {
      dispatch(COMMENTS.createComment(text, paragraph, start, end, comment));
    },
    discardComment() {
      dispatch(COMMENTS.discardComment());
    },

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
