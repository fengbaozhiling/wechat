import { takeLatest, takeEvery } from 'redux-saga';



import { loadUserSaga } from './user';
import { USER_LOAD } from '../redux/user';




// 当action触发时，执行特定saga
export default function * () {
  yield [
    takeLatest(USER_LOAD, loadUserSaga)
  ];
}
