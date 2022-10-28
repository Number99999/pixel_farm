
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/fx.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '01580vcKa1JvoSvyU9rdlxm', 'fx');
// script/fx.js

"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _user_data = _interopRequireDefault(require("user_data"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  //更新存档
  mergeJSON: function mergeJSON(n, o) {
    var oType = Object.prototype.toString.call(o);
    var nType = Object.prototype.toString.call(n);

    if (nType == '[object Object]' && oType == '[object Object]') {
      //合并属性(object)
      for (var p in n) {
        if (n.hasOwnProperty(p) && !o.hasOwnProperty(p)) {
          //新的有，旧的没有
          o[p] = n[p];
        } else if (n.hasOwnProperty(p) && o.hasOwnProperty(p)) {
          //两者都有
          var oPType = Object.prototype.toString.call(o[p]);
          var nPType = Object.prototype.toString.call(n[p]);

          if (nPType == '[object Object]' && oPType == '[object Object]' || nPType == '[object Array]' && oPType == '[object Array]') {
            this.mergeJSON(n[p], o[p]);
          }
        }

        ;
      }
    } else if (nType == '[object Array]' && oType == '[object Array]') {
      //合并属性(array)
      for (var i in n) {
        var oIType = Object.prototype.toString.call(o[i]);
        var nIType = Object.prototype.toString.call(n[i]);

        if (nIType == '[object Object]' && oIType == '[object Object]' || nIType == '[object Array]' && oIType == '[object Array]') {
          this.mergeJSON(n[i], o[i]);
        }
      }
    }

    ; //合并属性(other)

    n = o;
    return n;
  },
  //刷新数据
  updata_user_data: function updata_user_data(local_user_data) {
    //合并对象，源对象合并到目标对象
    //Object.assign(target,sources)
    var now_ud = this.mergeJSON(_user_data["default"].user_data, local_user_data);
    Object.assign(_user_data["default"].user_data, now_ud);
    cc.log(_user_data["default"].user_data, "user_data");
  },
  //读取本地数据
  load: function load() {
    try {
      var local_user_data = JSON.parse(cc.sys.localStorage.getItem('user_data')); // var local_user_data = null;

      if (local_user_data !== null) {
        this.updata_user_data(local_user_data);
        cc.log("load successfull");
      } else {
        this.save(); //否则就初始化
      }

      ;
    } catch (err) {
      this.save();
      cc.log("error load exception5");
      cc.log(err);
    }
  },
  //将缓存数据写入到本地中
  save: function save() {
    var cache_user_data = _user_data["default"].user_data;
    this.remove_all();
    cc.sys.localStorage.setItem('user_data', JSON.stringify(cache_user_data)); // cc.log("已存档");
    // cc.log(JSON.stringify(user_data));
  },
  //清除所有数据
  remove_all: function remove_all() {
    cc.sys.localStorage.removeItem('user_data'); // cc.log("清除本地所有数据");
  }
};
exports["default"] = _default;
module.exports = exports["default"];

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxmeC5qcyJdLCJuYW1lcyI6WyJtZXJnZUpTT04iLCJuIiwibyIsIm9UeXBlIiwiT2JqZWN0IiwicHJvdG90eXBlIiwidG9TdHJpbmciLCJjYWxsIiwiblR5cGUiLCJwIiwiaGFzT3duUHJvcGVydHkiLCJvUFR5cGUiLCJuUFR5cGUiLCJpIiwib0lUeXBlIiwibklUeXBlIiwidXBkYXRhX3VzZXJfZGF0YSIsImxvY2FsX3VzZXJfZGF0YSIsIm5vd191ZCIsInVzZXJfZGF0YSIsImFzc2lnbiIsImNjIiwibG9nIiwibG9hZCIsIkpTT04iLCJwYXJzZSIsInN5cyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJzYXZlIiwiZXJyIiwiY2FjaGVfdXNlcl9kYXRhIiwicmVtb3ZlX2FsbCIsInNldEl0ZW0iLCJzdHJpbmdpZnkiLCJyZW1vdmVJdGVtIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O2VBQ2U7QUFDWDtBQUNBQSxFQUFBQSxTQUZXLHFCQUVEQyxDQUZDLEVBRUVDLENBRkYsRUFFSztBQUNaLFFBQUlDLEtBQUssR0FBR0MsTUFBTSxDQUFDQyxTQUFQLENBQWlCQyxRQUFqQixDQUEwQkMsSUFBMUIsQ0FBK0JMLENBQS9CLENBQVo7QUFDQSxRQUFJTSxLQUFLLEdBQUdKLE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQkMsUUFBakIsQ0FBMEJDLElBQTFCLENBQStCTixDQUEvQixDQUFaOztBQUNBLFFBQUlPLEtBQUssSUFBSSxpQkFBVCxJQUE4QkwsS0FBSyxJQUFJLGlCQUEzQyxFQUE4RDtBQUMxRDtBQUNBLFdBQUssSUFBSU0sQ0FBVCxJQUFjUixDQUFkLEVBQWlCO0FBQ2IsWUFBSUEsQ0FBQyxDQUFDUyxjQUFGLENBQWlCRCxDQUFqQixLQUF1QixDQUFDUCxDQUFDLENBQUNRLGNBQUYsQ0FBaUJELENBQWpCLENBQTVCLEVBQWlEO0FBQzdDO0FBQ0FQLFVBQUFBLENBQUMsQ0FBQ08sQ0FBRCxDQUFELEdB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QUFQO0FBQ0g7QUFDSixHQTNEVTtBQTREWDtBQUNBRCxFQUFBQSxJQUFJLEVBQUUsZ0JBQVk7QUFDZCxRQUFJRSxlQUFlLEdBQUdaLHNCQUFVQSxTQUFoQztBQUNBLFNBQUthLFVBQUw7QUFDQVgsSUFBQUEsRUFBRSxDQUFDSyxHQUFILENBQU9DLFlBQVAsQ0FBb0JNLE9BQXBCLENBQTRCLFdBQTVCLEVBQXlDVCxJQUFJLENBQUNVLFNBQUwsQ0FBZUgsZUFBZixDQUF6QyxFQUhjLENBSWQ7QUFDQTtBQUNILEdBbkVVO0FBb0VYO0FBQ0FDLEVBQUFBLFVBQVUsRUFBRSxzQkFBWTtBQUNwQlgsSUFBQUEsRUFBRSxDQUFDSyxHQUFILENBQU9DLFlBQVAsQ0FBb0JRLFVBQXBCLENBQStCLFdBQS9CLEVBRG9CLENBRXBCO0FBQ0g7QUF4RVUiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB1c2VyX2RhdGEgZnJvbSBcInVzZXJfZGF0YVwiO1xuZXhwb3J0IGRlZmF1bHQge1xuICAgIC8v5pu05paw5a2Y5qGjXG4gICAgbWVyZ2VKU09OKG4sIG8pIHtcbiAgICAgICAgbGV0IG9UeXBlID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pO1xuICAgICAgICBsZXQgblR5cGUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobik7XG4gICAgICAgIGlmIChuVHlwZSA9PSAnW29iamVjdCBPYmplY3RdJyAmJiBvVHlwZSA9PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgICAgICAgICAgLy/lkIjlubblsZ7mgKcob2JqZWN0KVxuICAgICAgICAgICAgZm9yIChsZXQgcCBpbiBuKSB7XG4gICAgICAgICAgICAgICAgaWYgKG4uaGFzT3duUHJvcGVydHkocCkgJiYgIW8uaGFzT3duUHJvcGVydHkocCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy/mlrDnmoTmnInvvIzml6fnmoTmsqHmnIlcbiAgICAgICAgICAgICAgICAgICAgb1twXSA9IG5bcF07XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChuLmhhc093blByb3BlcnR5KHApICYmIChvLmhhc093blByb3BlcnR5KHApKSkge1xuICAgICAgICAgICAgICAgICAgICAvL+S4pOiAhemDveaciVxuICAgICAgICAgICAgICAgICAgICBsZXQgb1BUeXBlID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9bcF0pO1xuICAgICAgICAgICAgICAgICAgICBsZXQgblBUeXBlID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG5bcF0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoKG5QVHlwZSA9PSAnW29iamVjdCBPYmplY3RdJyAmJiBvUFR5cGUgPT0gJ1tvYmplY3QgT2JqZWN0XScpIHx8IChuUFR5cGUgPT0gJ1tvYmplY3QgQXJyYXldJyAmJiBvUFR5cGUgPT0gJ1tvYmplY3QgQXJyYXldJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWVyZ2VKU09OKG5bcF0sIG9bcF0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChuVHlwZSA9PSAnW29iamVjdCBBcnJheV0nICYmIG9UeXBlID09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICAgICAgICAgIC8v5ZCI5bm25bGe5oCnKGFycmF5KVxuICAgICAgICAgICAgZm9yIChsZXQgaSBpbiBuKSB7XG4gICAgICAgICAgICAgICAgbGV0IG9JVHlwZSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvW2ldKTtcbiAgICAgICAgICAgICAgICBsZXQgbklUeXBlID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG5baV0pO1xuICAgICAgICAgICAgICAgIGlmICgobklUeXBlID09ICdbb2JqZWN0IE9iamVjdF0nICYmIG9JVHlwZSA9PSAnW29iamVjdCBPYmplY3RdJykgfHwgKG5JVHlwZSA9PSAnW29iamVjdCBBcnJheV0nICYmIG9JVHlwZSA9PSAnW29iamVjdCBBcnJheV0nKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1lcmdlSlNPTihuW2ldLCBvW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIC8v5ZCI5bm25bGe5oCnKG90aGVyKVxuICAgICAgICBuID0gbztcbiAgICAgICAgcmV0dXJuIG47XG4gICAgfSxcbiAgICAvL+WIt+aWsOaVsOaNrlxuICAgIHVwZGF0YV91c2VyX2RhdGE6IGZ1bmN0aW9uIChsb2NhbF91c2VyX2RhdGEpIHtcbiAgICAgICAgLy/lkIjlubblr7nosaHvvIzmupDlr7nosaHlkIjlubbliLDnm67moIflr7nosaFcbiAgICAgICAgLy9PYmplY3QuYXNzaWduKHRhcmdldCxzb3VyY2VzKVxuICAgICAgICB2YXIgbm93X3VkID0gdGhpcy5tZXJnZUpTT04odXNlcl9kYXRhLnVzZXJfZGF0YSwgbG9jYWxfdXNlcl9kYXRhKTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih1c2VyX2RhdGEudXNlcl9kYXRhLCBub3dfdWQpXG4gICAgICAgIGNjLmxvZyh1c2VyX2RhdGEudXNlcl9kYXRhLCBcInVzZXJfZGF0YVwiKTtcbiAgICB9LFxuICAgIC8v6K+75Y+W5pys5Zyw5pWw5o2uXG4gICAgbG9hZDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIGxvY2FsX3VzZXJfZGF0YSA9IEpTT04ucGFyc2UoY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyX2RhdGEnKSk7XG4gICAgICAgICAgICAvLyB2YXIgbG9jYWxfdXNlcl9kYXRhID0gbnVsbDtcbiAgICAgICAgICAgIGlmIChsb2NhbF91c2VyX2RhdGEgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0YV91c2VyX2RhdGEobG9jYWxfdXNlcl9kYXRhKTtcbiAgICAgICAgICAgICAgICBjYy5sb2coXCJsb2FkIHN1Y2Nlc3NmdWxsXCIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNhdmUoKTtcbiAgICAgICAgICAgICAgICAvL+WQpuWImeWwseWIneWni+WMllxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aGlzLnNhdmUoKTtcbiAgICAgICAgICAgIGNjLmxvZyhcImVycm9yIGxvYWQgZXhjZXB0aW9uNVwiKTtcbiAgICAgICAgICAgIGNjLmxvZyhlcnIpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICAvL+Wwhue8k+WtmOaVsOaNruWGmeWFpeWIsOacrOWcsOS4rVxuICAgIHNhdmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNhY2hlX3VzZXJfZGF0YSA9IHVzZXJfZGF0YS51c2VyX2RhdGE7XG4gICAgICAgIHRoaXMucmVtb3ZlX2FsbCgpO1xuICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3VzZXJfZGF0YScsIEpTT04uc3RyaW5naWZ5KGNhY2hlX3VzZXJfZGF0YSkpO1xuICAgICAgICAvLyBjYy5sb2coXCLlt7LlrZjmoaNcIik7XG4gICAgICAgIC8vIGNjLmxvZyhKU09OLnN0cmluZ2lmeSh1c2VyX2RhdGEpKTtcbiAgICB9LFxuICAgIC8v5riF6Zmk5omA5pyJ5pWw5o2uXG4gICAgcmVtb3ZlX2FsbDogZnVuY3Rpb24gKCkge1xuICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3VzZXJfZGF0YScpO1xuICAgICAgICAvLyBjYy5sb2coXCLmuIXpmaTmnKzlnLDmiYDmnInmlbDmja5cIik7XG4gICAgfSxcblxufTtcbiJdfQ==