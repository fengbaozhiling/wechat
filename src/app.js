import {
  camelCase
} from 'lodash';
import {bindActionCreators} from 'redux';
import {
  getStore
} from './pages/store';

import store from './redux/index';
import { setStore } from './pages/store';


setStore(store);
App({
  onLaunch() {
  
  }
});
