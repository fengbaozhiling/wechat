import { put } from 'redux-saga/effects';
import request from '../utils/http';
import { userSet, userAfterLoad } from '../redux/user';
import wxx from '../utils/wx.api';


// 获取用户信息
export function* loadUserSaga() {
  try {
    //let res = yield wxx.login();
    let res = yield wxx.getUserInfo();
    yield put(userAfterLoad())
    yield put(userSet(res.userInfo ? res.userInfo : {}));
  } catch (error) {
    console.log('getUserInfo error', error);
  }
}
