import { combineReducers } from 'redux';
import entities from './entities';

const reducers = Object.keys(entities).reduce((obj, entity) => {
  return { [entity]: entities[entity].reducer };
}, {});

export default combineReducers(reducers);
