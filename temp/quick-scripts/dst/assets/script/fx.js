
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
      // var local_user_data = JSON.parse(cc.sys.localStorage.getItem('user_data'));
      var local_user_data = null;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxmeC5qcyJdLCJuYW1lcyI6WyJtZXJnZUpTT04iLCJuIiwibyIsIm9UeXBlIiwiT2JqZWN0IiwicHJvdG90eXBlIiwidG9TdHJpbmciLCJjYWxsIiwiblR5cGUiLCJwIiwiaGFzT3duUHJvcGVydHkiLCJvUFR5cGUiLCJuUFR5cGUiLCJpIiwib0lUeXBlIiwibklUeXBlIiwidXBkYXRhX3VzZXJfZGF0YSIsImxvY2FsX3VzZXJfZGF0YSIsIm5vd191ZCIsInVzZXJfZGF0YSIsImFzc2lnbiIsImNjIiwibG9nIiwibG9hZCIsInNhdmUiLCJlcnIiLCJjYWNoZV91c2VyX2RhdGEiLCJyZW1vdmVfYWxsIiwic3lzIiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJyZW1vdmVJdGVtIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O2VBQ2U7QUFDWDtBQUNBQSxFQUFBQSxTQUZXLHFCQUVEQyxDQUZDLEVBRUVDLENBRkYsRUFFSztBQUNaLFFBQUlDLEtBQUssR0FBR0MsTUFBTSxDQUFDQyxTQUFQLENBQWlCQyxRQUFqQixDQUEwQkMsSUFBMUIsQ0FBK0JMLENBQS9CLENBQVo7QUFDQSxRQUFJTSxLQUFLLEdBQUdKLE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQkMsUUFBakIsQ0FBMEJDLElBQTFCLENBQStCTixDQUEvQixDQUFaOztBQUNBLFFBQUlPLEtBQUssSUFBSSxpQkFBVCxJQUE4QkwsS0FBSyxJQUFJLGlCQUEzQyxFQUE4RDtBQUMxRDtBQUNBLFdBQUssSUFBSU0sQ0FBVCxJQUFjUixDQUFkLEVBQWlCO0FBQ2IsWUFBSUEsQ0FBQyxDQUFDUyxjQUFGLENBQWlCRCxDQUFqQixLQUF1QixDQUFDUCxDQUFDLENBQUNRLGNBQUYsQ0FBaUJELENBQWpCLENBQTVCLEVBQWlEO0FBQzdDO0FBQ0FQLFVBQUFBLENBQUMsQ0FBQ08sQ0FBRCxDQUFELEdBQU9SLENBQUMsQ0FBQ1EsQ0FB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TDtBQUNBTixJQUFBQSxFQUFFLENBQUNPLEdBQUgsQ0FBT0MsWUFBUCxDQUFvQkMsT0FBcEIsQ0FBNEIsV0FBNUIsRUFBeUNDLElBQUksQ0FBQ0MsU0FBTCxDQUFlTixlQUFmLENBQXpDLEVBSGMsQ0FJZDtBQUNBO0FBQ0gsR0FuRVU7QUFvRVg7QUFDQUMsRUFBQUEsVUFBVSxFQUFFLHNCQUFZO0FBQ3BCTixJQUFBQSxFQUFFLENBQUNPLEdBQUgsQ0FBT0MsWUFBUCxDQUFvQkksVUFBcEIsQ0FBK0IsV0FBL0IsRUFEb0IsQ0FFcEI7QUFDSDtBQXhFVSIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHVzZXJfZGF0YSBmcm9tIFwidXNlcl9kYXRhXCI7XG5leHBvcnQgZGVmYXVsdCB7XG4gICAgLy/mm7TmlrDlrZjmoaNcbiAgICBtZXJnZUpTT04obiwgbykge1xuICAgICAgICBsZXQgb1R5cGUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobyk7XG4gICAgICAgIGxldCBuVHlwZSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChuKTtcbiAgICAgICAgaWYgKG5UeXBlID09ICdbb2JqZWN0IE9iamVjdF0nICYmIG9UeXBlID09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgICAgICAgICAvL+WQiOW5tuWxnuaApyhvYmplY3QpXG4gICAgICAgICAgICBmb3IgKGxldCBwIGluIG4pIHtcbiAgICAgICAgICAgICAgICBpZiAobi5oYXNPd25Qcm9wZXJ0eShwKSAmJiAhby5oYXNPd25Qcm9wZXJ0eShwKSkge1xuICAgICAgICAgICAgICAgICAgICAvL+aWsOeahOacie+8jOaXp+eahOayoeaciVxuICAgICAgICAgICAgICAgICAgICBvW3BdID0gbltwXTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG4uaGFzT3duUHJvcGVydHkocCkgJiYgKG8uaGFzT3duUHJvcGVydHkocCkpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8v5Lik6ICF6YO95pyJXG4gICAgICAgICAgICAgICAgICAgIGxldCBvUFR5cGUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob1twXSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBuUFR5cGUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobltwXSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICgoblBUeXBlID09ICdbb2JqZWN0IE9iamVjdF0nICYmIG9QVHlwZSA9PSAnW29iamVjdCBPYmplY3RdJykgfHwgKG5QVHlwZSA9PSAnW29iamVjdCBBcnJheV0nICYmIG9QVHlwZSA9PSAnW29iamVjdCBBcnJheV0nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXJnZUpTT04obltwXSwgb1twXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKG5UeXBlID09ICdbb2JqZWN0IEFycmF5XScgJiYgb1R5cGUgPT0gJ1tvYmplY3QgQXJyYXldJykge1xuICAgICAgICAgICAgLy/lkIjlubblsZ7mgKcoYXJyYXkpXG4gICAgICAgICAgICBmb3IgKGxldCBpIGluIG4pIHtcbiAgICAgICAgICAgICAgICBsZXQgb0lUeXBlID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9baV0pO1xuICAgICAgICAgICAgICAgIGxldCBuSVR5cGUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobltpXSk7XG4gICAgICAgICAgICAgICAgaWYgKChuSVR5cGUgPT0gJ1tvYmplY3QgT2JqZWN0XScgJiYgb0lUeXBlID09ICdbb2JqZWN0IE9iamVjdF0nKSB8fCAobklUeXBlID09ICdbb2JqZWN0IEFycmF5XScgJiYgb0lUeXBlID09ICdbb2JqZWN0IEFycmF5XScpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWVyZ2VKU09OKG5baV0sIG9baV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgLy/lkIjlubblsZ7mgKcob3RoZXIpXG4gICAgICAgIG4gPSBvO1xuICAgICAgICByZXR1cm4gbjtcbiAgICB9LFxuICAgIC8v5Yi35paw5pWw5o2uXG4gICAgdXBkYXRhX3VzZXJfZGF0YTogZnVuY3Rpb24gKGxvY2FsX3VzZXJfZGF0YSkge1xuICAgICAgICAvL+WQiOW5tuWvueixoe+8jOa6kOWvueixoeWQiOW5tuWIsOebruagh+WvueixoVxuICAgICAgICAvL09iamVjdC5hc3NpZ24odGFyZ2V0LHNvdXJjZXMpXG4gICAgICAgIHZhciBub3dfdWQgPSB0aGlzLm1lcmdlSlNPTih1c2VyX2RhdGEudXNlcl9kYXRhLCBsb2NhbF91c2VyX2RhdGEpO1xuICAgICAgICBPYmplY3QuYXNzaWduKHVzZXJfZGF0YS51c2VyX2RhdGEsIG5vd191ZClcbiAgICAgICAgY2MubG9nKHVzZXJfZGF0YS51c2VyX2RhdGEsIFwidXNlcl9kYXRhXCIpO1xuICAgIH0sXG4gICAgLy/or7vlj5bmnKzlnLDmlbDmja5cbiAgICBsb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyB2YXIgbG9jYWxfdXNlcl9kYXRhID0gSlNPTi5wYXJzZShjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJfZGF0YScpKTtcbiAgICAgICAgICAgIHZhciBsb2NhbF91c2VyX2RhdGEgPSBudWxsO1xuICAgICAgICAgICAgaWYgKGxvY2FsX3VzZXJfZGF0YSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRhX3VzZXJfZGF0YShsb2NhbF91c2VyX2RhdGEpO1xuICAgICAgICAgICAgICAgIGNjLmxvZyhcImxvYWQgc3VjY2Vzc2Z1bGxcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2F2ZSgpO1xuICAgICAgICAgICAgICAgIC8v5ZCm5YiZ5bCx5Yid5aeL5YyWXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRoaXMuc2F2ZSgpO1xuICAgICAgICAgICAgY2MubG9nKFwiZXJyb3IgbG9hZCBleGNlcHRpb241XCIpO1xuICAgICAgICAgICAgY2MubG9nKGVycik7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIC8v5bCG57yT5a2Y5pWw5o2u5YaZ5YWl5Yiw5pys5Zyw5LitXG4gICAgc2F2ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY2FjaGVfdXNlcl9kYXRhID0gdXNlcl9kYXRhLnVzZXJfZGF0YTtcbiAgICAgICAgdGhpcy5yZW1vdmVfYWxsKCk7XG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndXNlcl9kYXRhJywgSlNPTi5zdHJpbmdpZnkoY2FjaGVfdXNlcl9kYXRhKSk7XG4gICAgICAgIC8vIGNjLmxvZyhcIuW3suWtmOaho1wiKTtcbiAgICAgICAgLy8gY2MubG9nKEpTT04uc3RyaW5naWZ5KHVzZXJfZGF0YSkpO1xuICAgIH0sXG4gICAgLy/muIXpmaTmiYDmnInmlbDmja5cbiAgICByZW1vdmVfYWxsOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgndXNlcl9kYXRhJyk7XG4gICAgICAgIC8vIGNjLmxvZyhcIua4hemZpOacrOWcsOaJgOacieaVsOaNrlwiKTtcbiAgICB9LFxuXG59O1xuIl19