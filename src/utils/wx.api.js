
const PromiseMethods = {
  request: 1,
  login:1,
  getUserInfo: 1,
  checkSession:1
  };
  
const wxx = {};
Object.keys(wx).forEach((key) => {
  if (PromiseMethods[key]) {
    // 其余方法自动Promise化
    wxx[key] = function (obj) {
      obj = obj || {};
      return new Promise((resolve, reject) => {
        obj.success = function(res) {
          resolve(res)
        };
        obj.fail = (res) => {
          if (res && res.errMsg) {
            reject(new Error(res.errMsg));
          } else {
            reject(res);
          }
        };
        wx[key](obj);
      });
    };
  }
});

  export default wxx;