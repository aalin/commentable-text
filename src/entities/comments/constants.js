function actions(name, actions) {
  return actions.reduce((acc, action) => {
    acc[action] = `${name}/${action}`;
    return acc;
  }, {})
}

export default actions(
  'COMMENTS', [
    'NEW',
    'CREATE',
    'DISCARD',
    'HIGHLIGHT'
  ]
);
