import { connect } from 'react-redux';
import CommentSection from '../components/comment_section';
import * as COMMENTS from '../entities/comments/actions';

function mapStateToProps(state) {
  return {
    comments: state.comments.comments
  };
}

function mapDispatchToProps(dispatch) {
  return {
    goToComment(comment, e) {
      if (e && e.preventDefault) {
        e.preventDefault();
      }

      dispatch(COMMENTS.highlightComment(comment));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentSection);
