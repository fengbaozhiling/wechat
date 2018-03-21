import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer, persistCombineReducers } from 'redux-persist';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

/**
 * 创建store
 * @param rootReducer
 * @param rootSaga
 * @returns {*}
 */
export default function (rootReducer, rootSaga) {
  const middleware = [];
  const enhancers = [];
  // saga中间件
  const sagaMiddleware = createSagaMiddleware();
  middleware.push(sagaMiddleware);
  // 合并中间件
  enhancers.push(applyMiddleware(...middleware));
  //const persistedReducer = persistReducer(reduxPersistConfig, rootReducer)

  const store = createStore(rootReducer, compose(...enhancers));
  // kick off root saga
  sagaMiddleware.run(rootSaga);
  return store;
};
