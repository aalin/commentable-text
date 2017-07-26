import { connect } from 'react-redux';
import CommentableText from '../components/commentable_text';
import * as COMMENTS from '../entities/comments/actions';

function mapStateToProps(state) {
  return {
    highlightedComment: state.comments.highlighted,
    text: state.comments.text
  };
}

function mapDispatchToProps(dispatch) {
  return {
    newComment(quote) {
      dispatch(COMMENTS.newComment(quote));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentableText);
