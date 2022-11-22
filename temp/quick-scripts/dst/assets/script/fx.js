
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxmeC5qcyJdLCJuYW1lcyI6WyJtZXJnZUpTT04iLCJuIiwibyIsIm9UeXBlIiwiT2JqZWN0IiwicHJvdG90eXBlIiwidG9TdHJpbmciLCJjYWxsIiwiblR5cGUiLCJwIiwiaGFzT3duUHJvcGVydHkiLCJvUFR5cGUiLCJuUFR5cGUiLCJpIiwib0lUeXBlIiwibklUeXBlIiwidXBkYXRhX3VzZXJfZGF0YSIsImxvY2FsX3VzZXJfZGF0YSIsIm5vd191ZCIsInVzZXJfZGF0YSIsImFzc2lnbiIsImNjIiwibG9nIiwibG9hZCIsInNhdmUiLCJlcnIiLCJjYWNoZV91c2VyX2RhdGEiLCJyZW1vdmVfYWxsIiwic3lzIiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJyZW1vdmVJdGVtIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O2VBQ2U7QUFDWDtBQUNBQSxFQUFBQSxTQUZXLHFCQUVEQyxDQUZDLEVBRUVDLENBRkYsRUFFSztBQUNaLFFBQUlDLEtBQUssR0FBR0MsTUFBTSxDQUFDQyxTQUFQLENBQWlCQyxRQUFqQixDQUEwQkMsSUFBMUIsQ0FBK0JMLENBQS9CLENBQVo7QUFDQSxRQUFJTSxLQUFLLEdBQUdKLE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQkMsUUFBakIsQ0FBMEJDLElBQTFCLENBQStCTixDQUEvQixDQUFaOztBQUNBLFFBQUlPLEtBQUssSUFBSSxpQkFBVCxJQUE4QkwsS0FBSyxJQUFJLGlCQUEzQyxFQUE4RDtBQUMxRDtBQUNBLFdBQUssSUFBSU0sQ0FBVCxJQUFjUixDQUFkLEVBQWlCO0FBQ2IsWUFBSUEsQ0FBQyxDQUFDUyxjQUFGLENBQWlCRCxDQUFqQixLQUF1QixDQUFDUCxDQUFDLENBQUNRLGNBQUYsQ0FBaUJELENBQWpCLENBQTVCLEVBQWlEO0FBQzdDO0FBQ0FQLFVBQUFBLENBQUMsQ0FBQ08sQ0FBRCxDQUFELEdBQU9SLENBQUMsQ0FBQ1EsQ0FBRCxDQUFSO0FBQ0gsU0FIRCxNQUdPLElBQUlSLENBQUMsQ0FBQ1MsY0FBRixDQUFpQkQsQ0FBakIsS0FBd0JQLENBQUMsQ0FBQ1EsY0FBRixDQUFpQkQsQ0FBakIsQ0FBNUIsRUFBa0Q7QUFDckQ7QUFDQSxjQUFJRSxNQUFNLEdBQUdQLE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQkMsUUFBakIsQ0FBMEJDLElBQTFCLENBQStCTCxDQUFDLENBQUNPLENBQUQsQ0FBaEMsQ0FBYjtBQUNBLGNBQUlHLE1BQU0sR0FBR1IsTUFBTSxDQUFDQyxTQUFQLENBQWlCQyxRQUFqQixDQUEwQkMsSUFBMUIsQ0FBK0JOLENBQUMsQ0FBQ1EsQ0FBRCxDQUFoQyxDQUFiOztBQUNBLGNBQUtHLE1BQU0sSUFBSSxpQkFBVixJQUErQkQsTUFBTSxJQUFJLGlCQUExQyxJQUFpRUMsTUFBTSxJQUFJLGdCQUFWLElBQThCRCxNQUFNLElBQUksZ0JBQTdHLEVBQWdJO0FBQzVILGlCQUFLWCxTQUFMLENBQWVDLENBQUMsQ0FBQ1EsQ0FBRCxDQUFoQixFQUFxQlAsQ0FBQyxDQUFDTyxDQUFELENBQXRCO0FBQ0g7QUFDSjs7QUFBQTtBQUNKO0FBQ0osS0FmRCxNQWVPLElBQUlELEtBQUssSUFBSSxnQkFBVCxJQUE2QkwsS0FBSyxJQUFJLGdCQUExQyxFQUE0RDtBQUMvRDtBQUNBLFdBQUssSUFBSVUsQ0FBVCxJQUFjWixDQUFkLEVBQWlCO0FBQ2IsWUFBSWEsTUFBTSxHQUFHVixNQUFNLENBQUNDLFNBQVAsQ0FBaUJDLFFBQWpCLENBQTBCQyxJQUExQixDQUErQkwsQ0FBQyxDQUFDVyxDQUFELENBQWhDLENBQWI7QUFDQSxZQUFJRSxNQUFNLEdBQUdYLE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQkMsUUFBakIsQ0FBMEJDLElBQTFCLENBQStCTixDQUFDLENBQUNZLENBQUQsQ0FBaEMsQ0FBYjs7QUFDQSxZQUFLRSxNQUFNLElBQUksaUJBQVYsSUFBK0JELE1BQU0sSUFBSSxpQkFBMUMsSUFBaUVDLE1BQU0sSUFBSSxnQkFBVixJQUE4QkQsTUFBTSxJQUFJLGdCQUE3RyxFQUFnSTtBQUM1SCxlQUFLZCxTQUFMLENBQWVDLENBQUMsQ0FBQ1ksQ0FBRCxDQUFoQixFQUFxQlgsQ0FBQyxDQUFDVyxDQUFELENBQXRCO0FBQ0g7QUFDSjtBQUNKOztBQUFBLEtBM0JXLENBNEJaOztBQUNBWixJQUFBQSxDQUFDLEdBQUdDLENBQUo7QUFDQSxXQUFPRCxDQUFQO0FBQ0gsR0FqQ1U7QUFrQ1g7QUFDQWUsRUFBQUEsZ0JBQWdCLEVBQUUsMEJBQVVDLGVBQVYsRUFBMkI7QUFDekM7QUFDQTtBQUNBLFFBQUlDLE1BQU0sR0FBRyxLQUFLbEIsU0FBTCxDQUFlbUIsc0JBQVVBLFNBQXpCLEVBQW9DRixlQUFwQyxDQUFiO0FBQ0FiLElBQUFBLE1BQU0sQ0FBQ2dCLE1BQVAsQ0FBY0Qsc0JBQVVBLFNBQXhCLEVBQW1DRCxNQUFuQztBQUNBRyxJQUFBQSxFQUFFLENBQUNDLEdBQUgsQ0FBT0gsc0JBQVVBLFNBQWpCLEVBQTRCLFdBQTVCO0FBQ0gsR0F6Q1U7QUEwQ1g7QUFDQUksRUFBQUEsSUFBSSxFQUFFLGdCQUFZO0FBQ2QsUUFBSTtBQUNBO0FBQ0EsVUFBSU4sZUFBZSxHQUFHLElBQXRCOztBQUNBLFVBQUlBLGVBQWUsS0FBSyxJQUF4QixFQUE4QjtBQUMxQixhQUFLRCxnQkFBTCxDQUFzQkMsZUFBdEI7QUFDQUksUUFBQUEsRUFBRSxDQUFDQyxHQUFILENBQU8sa0JBQVA7QUFDSCxPQUhELE1BR087QUFDSCxhQUFLRSxJQUFMLEdBREcsQ0FFSDtBQUNIOztBQUFBO0FBQ0osS0FWRCxDQVVFLE9BQU9DLEdBQVAsRUFBWTtBQUNWLFdBQUtELElBQUw7QUFDQUgsTUFBQUEsRUFBRSxDQUFDQyxHQUFILENBQU8sdUJBQVA7QUFDQUQsTUFBQUEsRUFBRSxDQUFDQyxHQUFILENBQU9HLEdBQVA7QUFDSDtBQUNKLEdBM0RVO0FBNERYO0FBQ0FELEVBQUFBLElBQUksRUFBRSxnQkFBWTtBQUNkLFFBQUlFLGVBQWUsR0FBR1Asc0JBQVVBLFNBQWhDO0FBQ0EsU0FBS1EsVUFBTDtBQUNBTixJQUFBQSxFQUFFLENBQUNPLEdBQUgsQ0FBT0MsWUFBUCxDQUFvQkMsT0FBcEIsQ0FBNEIsV0FBNUIsRUFBeUNDLElBQUksQ0FBQ0MsU0FBTCxDQUFlTixlQUFmLENBQXpDLEVBSGMsQ0FJZDtBQUNBO0FBQ0gsR0FuRVU7QUFvRVg7QUFDQUMsRUFBQUEsVUFBVSxFQUFFLHNCQUFZO0FBQ3BCTixJQUFBQSxFQUFFLENBQUNPLEdBQUgsQ0FBT0MsWUFBUCxDQUFvQkksVUFBcEIsQ0FBK0IsV0FBL0IsRUFEb0IsQ0FFcEI7QUFDSDtBQXhFVSIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHVzZXJfZGF0YSBmcm9tIFwidXNlcl9kYXRhXCI7XHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIC8v5pu05paw5a2Y5qGjXHJcbiAgICBtZXJnZUpTT04obiwgbykge1xyXG4gICAgICAgIGxldCBvVHlwZSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKTtcclxuICAgICAgICBsZXQgblR5cGUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobik7XHJcbiAgICAgICAgaWYgKG5UeXBlID09ICdbb2JqZWN0IE9iamVjdF0nICYmIG9UeXBlID09ICdbb2JqZWN0IE9iamVjdF0nKSB7XHJcbiAgICAgICAgICAgIC8v5ZCI5bm25bGe5oCnKG9iamVjdClcclxuICAgICAgICAgICAgZm9yIChsZXQgcCBpbiBuKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobi5oYXNPd25Qcm9wZXJ0eShwKSAmJiAhby5oYXNPd25Qcm9wZXJ0eShwKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5paw55qE5pyJ77yM5pen55qE5rKh5pyJXHJcbiAgICAgICAgICAgICAgICAgICAgb1twXSA9IG5bcF07XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG4uaGFzT3duUHJvcGVydHkocCkgJiYgKG8uaGFzT3duUHJvcGVydHkocCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/kuKTogIXpg73mnIlcclxuICAgICAgICAgICAgICAgICAgICBsZXQgb1BUeXBlID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9bcF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuUFR5cGUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobltwXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKChuUFR5cGUgPT0gJ1tvYmplY3QgT2JqZWN0XScgJiYgb1BUeXBlID09ICdbb2JqZWN0IE9iamVjdF0nKSB8fCAoblBUeXBlID09ICdbb2JqZWN0IEFycmF5XScgJiYgb1BUeXBlID09ICdbb2JqZWN0IEFycmF5XScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWVyZ2VKU09OKG5bcF0sIG9bcF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKG5UeXBlID09ICdbb2JqZWN0IEFycmF5XScgJiYgb1R5cGUgPT0gJ1tvYmplY3QgQXJyYXldJykge1xyXG4gICAgICAgICAgICAvL+WQiOW5tuWxnuaApyhhcnJheSlcclxuICAgICAgICAgICAgZm9yIChsZXQgaSBpbiBuKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgb0lUeXBlID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9baV0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5JVHlwZSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChuW2ldKTtcclxuICAgICAgICAgICAgICAgIGlmICgobklUeXBlID09ICdbb2JqZWN0IE9iamVjdF0nICYmIG9JVHlwZSA9PSAnW29iamVjdCBPYmplY3RdJykgfHwgKG5JVHlwZSA9PSAnW29iamVjdCBBcnJheV0nICYmIG9JVHlwZSA9PSAnW29iamVjdCBBcnJheV0nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWVyZ2VKU09OKG5baV0sIG9baV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvL+WQiOW5tuWxnuaApyhvdGhlcilcclxuICAgICAgICBuID0gbztcclxuICAgICAgICByZXR1cm4gbjtcclxuICAgIH0sXHJcbiAgICAvL+WIt+aWsOaVsOaNrlxyXG4gICAgdXBkYXRhX3VzZXJfZGF0YTogZnVuY3Rpb24gKGxvY2FsX3VzZXJfZGF0YSkge1xyXG4gICAgICAgIC8v5ZCI5bm25a+56LGh77yM5rqQ5a+56LGh5ZCI5bm25Yiw55uu5qCH5a+56LGhXHJcbiAgICAgICAgLy9PYmplY3QuYXNzaWduKHRhcmdldCxzb3VyY2VzKVxyXG4gICAgICAgIHZhciBub3dfdWQgPSB0aGlzLm1lcmdlSlNPTih1c2VyX2RhdGEudXNlcl9kYXRhLCBsb2NhbF91c2VyX2RhdGEpO1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24odXNlcl9kYXRhLnVzZXJfZGF0YSwgbm93X3VkKVxyXG4gICAgICAgIGNjLmxvZyh1c2VyX2RhdGEudXNlcl9kYXRhLCBcInVzZXJfZGF0YVwiKTtcclxuICAgIH0sXHJcbiAgICAvL+ivu+WPluacrOWcsOaVsOaNrlxyXG4gICAgbG9hZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIHZhciBsb2NhbF91c2VyX2RhdGEgPSBKU09OLnBhcnNlKGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlcl9kYXRhJykpO1xyXG4gICAgICAgICAgICB2YXIgbG9jYWxfdXNlcl9kYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgaWYgKGxvY2FsX3VzZXJfZGF0YSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGFfdXNlcl9kYXRhKGxvY2FsX3VzZXJfZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2coXCJsb2FkIHN1Y2Nlc3NmdWxsXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zYXZlKCk7XHJcbiAgICAgICAgICAgICAgICAvL+WQpuWImeWwseWIneWni+WMllxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICB0aGlzLnNhdmUoKTtcclxuICAgICAgICAgICAgY2MubG9nKFwiZXJyb3IgbG9hZCBleGNlcHRpb241XCIpO1xyXG4gICAgICAgICAgICBjYy5sb2coZXJyKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy/lsIbnvJPlrZjmlbDmja7lhpnlhaXliLDmnKzlnLDkuK1cclxuICAgIHNhdmU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgY2FjaGVfdXNlcl9kYXRhID0gdXNlcl9kYXRhLnVzZXJfZGF0YTtcclxuICAgICAgICB0aGlzLnJlbW92ZV9hbGwoKTtcclxuICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3VzZXJfZGF0YScsIEpTT04uc3RyaW5naWZ5KGNhY2hlX3VzZXJfZGF0YSkpO1xyXG4gICAgICAgIC8vIGNjLmxvZyhcIuW3suWtmOaho1wiKTtcclxuICAgICAgICAvLyBjYy5sb2coSlNPTi5zdHJpbmdpZnkodXNlcl9kYXRhKSk7XHJcbiAgICB9LFxyXG4gICAgLy/muIXpmaTmiYDmnInmlbDmja5cclxuICAgIHJlbW92ZV9hbGw6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3VzZXJfZGF0YScpO1xyXG4gICAgICAgIC8vIGNjLmxvZyhcIua4hemZpOacrOWcsOaJgOacieaVsOaNrlwiKTtcclxuICAgIH0sXHJcblxyXG59O1xyXG4iXX0=