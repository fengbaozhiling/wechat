import {
  combineReducers
} from 'redux';
import configureStore from './createStore';
import rootSaga from '../sagas/index';
import user from './user'



function createStore() {
  const rootReducer = combineReducers({
    user: user
  });
  return configureStore(rootReducer, rootSaga);
};
export default createStore();
