import { combineReducers } from 'redux';

const r = require.context("./entities", true, /\/reducer\.js$/);

const reducers = r.keys().reduce((obj, file) => {
  const reducer = file.match(/^\.\/(.*?)\//)[1];
  return { ...obj, [reducer]: r(file).default };
}, {});

export default combineReducers(reducers);
