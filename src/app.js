import React from 'react';
import { connect } from 'react-redux';
import CommentableText from './components/commentable_text';
import CommentForm from './components/comment_form';
import CommentSection from './components/comment_section';
import styles from './app.css';

const TEXT = `
The oncilla (Leopardus tigrinus), also known as the northern tiger cat and tigrillo, is a small spotted cat ranging from Central America up to central Brazil. It is listed as Vulnerable on the IUCN Red List because the population is threatened by deforestation and conversion of habitat to agriculture.[1]

In 2013, it was proposed to assign the population in southern Brazil to a new species L. guttulus, after it was found not to be interbreeding with the L. tigrinus population in northeast Brazil.[3]

The oncilla resembles the margay and the ocelot,[4] but it is smaller, with a slender build and narrower muzzle. It grows to 38 to 59 centimetres (15 to 23 in) long, plus a 20 to 42 centimetres (7.9 to 16.5 in) tail.[5] While this is somewhat longer than the average domestic cat, Leopardus tigrinus is generally lighter, weighing 1.5 to 3 kilograms (3.3 to 6.6 lb).[6]

The fur is thick and soft, ranging from light brown to dark ochre, with numerous dark rosettes across the back and flanks. The underside is pale with dark spots and the tail is ringed. The backs of the ears are black with bold ocelli. The rosettes are black or brown, open in the center, and irregularly shaped. The legs have medium-sized spots tapering to smaller spots near the paws. This coloration helps the oncilla blend in with the mottled sunlight of the tropical forest understory. The oncilla's jaw is shortened, with fewer teeth, but with well-developed carnassials and canines.[4]`;

function App({ newComment, createComment, discardComment, goToComment, comment, comments, highlightedComment }) {
  return (
    <div className={styles.app}>
      <CommentableText
        text={TEXT}
        newComment={newComment}
        highlightedComment={highlightedComment}
      />
      <CommentForm
        comment={comment}
        createComment={createComment}
        discardComment={discardComment}
      />
      <CommentSection
        comments={comments}
        goToComment={goToComment}
      />
    </div>
  );
}

import * as COMMENTS from './entities/comments/actions';

function mapStateToProps(state) {
  return {
    comments: state.comments.comments,
    comment: state.comments.newComment,
    highlightedComment: state.comments.highlighted
  };
}

function mapDispatchToProps(dispatch) {
  return {
    newComment(quote, paragraph, start, end) {
      dispatch(COMMENTS.newComment(quote, paragraph, start, end));
    },
    createComment(quote, paragraph, start, end, body) {
      dispatch(COMMENTS.createComment(quote, paragraph, start, end, body));
    },
    discardComment() {
      dispatch(COMMENTS.discardComment());
    },
    goToComment(comment, e) {
      e.preventDefault();
      dispatch(COMMENTS.highlightComment(comment));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);