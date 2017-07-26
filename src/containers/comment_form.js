import { connect } from 'react-redux';
import CommentForm from '../components/comment_form';
import * as COMMENTS from '../entities/comments/actions';

function mapStateToProps(state) {
  return {
    newComment: state.comments.newComment,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createComment(quote, comment) {
      dispatch(COMMENTS.createComment(quote, comment));
    },
    discardComment() {
      dispatch(COMMENTS.discardComment());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
