import _set from 'lodash/set';
import _get from 'lodash/get';

/**
 * 构建列表数据项
 * @param list   原始列表
 * @param item   新列表
 * @returns {{_: *}}
 */
function buildListItem(list, item) {
  if (list && list.length && item.__k !== undefined) {
    for (let t of list) {
      if (t.__k !== undefined && t.__k === item.__k) {
        return Object.assign({}, t, item);
      }
    }
  }
  return item;
}

/**
 * 判断是否需要更新
 * @param {Object} original  原有对象
 * @param {Object} append    新增数据
 * @returns {boolean}
 */
export function shouldUpdate(original, append) {
    if (original === append) return false;
    for (let key in append) {
      let value = append[key];
      if (typeof value === 'object' && value) {
        if (!value.asMutable || original[key] !== value) {
          return true;
        }
      } else if (original[key] !== value) {
        //bool string number null
        return true;
      }
    }
    return false;
  }
  
export default function creatorPage(ComponentClass) {
  let config = {};
  let page;
  config._inited = false;
  ComponentClass.prototype.$$updateData = function (newData) {
    let data = config.data;
    Object.keys(newData).forEach((path) => {
      let dataMap = newData[path];
      if (Array.isArray(dataMap)) {
        let list = _get(data, path);
        let newList = dataMap.map((item) => buildListItem(list, item));
        _set(data, path, newList);
      } else {
        _set(data, path.split('.'), dataMap);
      }
    });
    page.setData(data);
}
ComponentClass.prototype.$$setState = function(nextState, callback) {
    let stateOld = this.data.state;
    console.log(stateOld,'stateOldstateOldstateOld')
    console.log(nextState,'nextStatenextStatenextStatenextState')
      let stateChanged = false;
        if (shouldUpdate(stateOld, nextState)) {
            stateChanged = true;
        }
      if (!stateChanged) return;
      console.log('Object.assign({}, stateOld, nextState)', Object.assign({}, stateOld, nextState))
      this.$$updateData({
          state: Object.assign({}, stateOld, nextState)
      });
      stateChanged = false;
  }

  ComponentClass.prototype.$$init = function() {
    if (this._inited) return;
    if (!this.state) {
      this.state = {};
    } else {
        this.$$updateData({
            state: this.state
        });
    }
    this._inited = true;
  }
  config = Object.assign(config, ComponentClass.prototype, new ComponentClass);

  let onLoad = config.$$onLoad ? config.$$onLoad : null;
  config.data = {};
    config.name = '';
    config._inited = false;
 
    config.onLoad = function (options) {
        page = this;
        page.root = new ComponentClass
        config.$$init.call(page)
        this.$$updateData({
            state: page.root.state
        })
        onLoad.call(page, options)
      };
  return  config
  ;
}
