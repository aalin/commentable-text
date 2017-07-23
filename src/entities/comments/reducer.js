import CONSTANTS from './constants';

function getInitialState() {
  return {
    comments: [],
    newComment: null,
  };
}

export default function (state = getInitialState(), action) {
  switch (action.type) {
    case CONSTANTS.NEW:
      return {
        ...state,
        newComment: { ...action.payload }
      };
    case CONSTANTS.DISCARD:
      return {
        ...state,
        newComment: null
      };
    case CONSTANTS.CREATE:
      return {
        ...state,
        comments: state.comments.concat([action.payload]),
        newComment: null
      };
    case CONSTANTS.HIGHLIGHT:
      return {
        ...state,
        highlighted: action.payload
      };
    default:
      return state;
  }
}
