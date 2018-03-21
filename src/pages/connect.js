import {
  getStore
} from './store';

const defaultMapStateToProps = () => ({});
const defaultMergeProps = (stateProps, dispatchProps, parentProps) => {
  return ({
    ...parentProps,
    ...stateProps,
    ...dispatchProps
  })
};

export default function connect(mapStateToProps, mapDispatchToProps, mergeProps) {
  const shouldSubscribe = !!mapStateToProps;
  mapStateToProps = mapStateToProps || defaultMapStateToProps;
  mapDispatchToProps = mapDispatchToProps || defaultMapStateToProps;
  mergeProps = mergeProps || defaultMergeProps;
  return function wrapWithConnect(component) {
    if (!shouldSubscribe && mapDispatchToProps === defaultMapStateToProps) {
      return component;
    }
    let unSubscribe;
    let temp = Object.create(component.prototype);
    let onLoad = temp.onLoad ? temp.onLoad : null;
    let onUnload = temp.onUnload ? temp.onUnload : null;
    component.prototype.onStateChange = function () {
      const store = getStore();
      let mappedProps = mapStateToProps(store.getState());
      let dispatchProps = mapDispatchToProps(store.dispatch);
      let nextProps = mergeProps(mappedProps, dispatchProps, this.props);
      this.props = nextProps;
      if(this.$$updateData) {
        this.$$updateData({props: nextProps});
      }
    }
    component.prototype.$$onLoad = function (...args) {
      let store = getStore();
      if (!store) {
        console.error('store对象不存在,请前往"app.js"文件中使用"redux"创建store,并传参到"labrador-redux"的setStore()方法中');
      };
      if (shouldSubscribe) {
        // 如果指定了 mapDispatchToProps 参数才监听store
        unSubscribe = store.subscribe(this.onStateChange);
      }
      this.onStateChange();
      if (onLoad) {
        onLoad.apply(this, args);
      }
    };

    component.prototype.onUnload = function () {
      if (unSubscribe) {
        unSubscribe();
      }
      if (onUnload) {
        onUnload.call(this);
      }
    };
    return component;
  };
}
