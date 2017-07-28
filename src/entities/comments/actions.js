import CONSTANTS from './constants';

function action(type, payload = {}) {
  return { type, payload };
}

function generateId() {
  const values = new Uint8Array(8);
  window.crypto.getRandomValues(values);
  return Array.from(values).map((i) => i.toString(16).padStart(2, '0'));
}

export
function newComment(quote, paragraph, start, end) {
  return action(CONSTANTS.NEW, { quote, paragraph, start, end });
}

export
function createComment(quote, comment) {
  return action(CONSTANTS.CREATE, { id: generateId(), quote, comment });
}

export
function discardComment() {
  return action(CONSTANTS.DISCARD);
}

export
function highlightComment(comment) {
  return action(CONSTANTS.HIGHLIGHT, comment);
}
