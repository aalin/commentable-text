import CONSTANTS from './constants';

function action(type, payload = {}) {
  return { type, payload };
}

export
function newComment(quote, paragraph, start, end) {
  return action(CONSTANTS.NEW, { quote, paragraph, start, end });
}

export
function createComment(quote, paragraph, start, end, body) {
  return action(CONSTANTS.CREATE, { quote, paragraph, start, end, body });
}

export
function discardComment() {
  return action(CONSTANTS.DISCARD);
}

export
function highlightComment(comment) {
  return action(CONSTANTS.HIGHLIGHT, comment);
}
