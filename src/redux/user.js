import {
    createAction,
    handleActions
    
  } from 'redux-actions';
  import immutable from 'seamless-immutable';

  export const USER_LOAD = 'USER_LOAD';
  export const USER_SET = 'USER_SET';
  export const USER_AFTER_LOAD = 'USER_AFTER_LOAD';

  export const userLoad = createAction(USER_LOAD);
  export const userSet = createAction(USER_SET);
  export const userAfterLoad = createAction(USER_AFTER_LOAD);

  // 初始state
export const INITIAL_STATE = immutable({
    isOnLoading: false,
    userInfo: {
        nickName:'',
        avatarUrl:''
    }
});


  
  
export default handleActions({
    
    [USER_LOAD]: (state, {payload}) => {
      return state.merge({
        isOnLoading: true
      })
    },
    [USER_SET]: (state, {payload}) => {
        return state.merge({
            userInfo: state.userInfo.merge(payload)
        })
    },
    [USER_AFTER_LOAD]: (state, {payload}) => {
        return state.merge({
            isOnLoading: false
        })
    }
  }, INITIAL_STATE)