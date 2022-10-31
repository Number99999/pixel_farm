
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ui/shop_ui.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fd3b91g9GpKVppYjN72hjJb', 'shop_ui');
// script/ui/shop_ui.js

"use strict";

var user_data = require("user_data");

var config = require("config");

cc.Class({
  "extends": cc.Component,
  properties: {
    scrollView_array: [cc.Node],
    shop_content_prefab: cc.Prefab,
    content_array: [cc.Node]
  },
  //选项卡切换
  tab_select: function tab_select(e, index) {
    this.sound_control.play_sound_effect("button_click");

    for (var i = 0; i < this.scrollView_array.length; i++) {
      if (i == index) {
        this.scrollView_array[i].active = true;
      } else {
        this.scrollView_array[i].active = false;
      }

      ;
    }

    ;
  },
  //初始化节点
  ini_node: function ini_node() {
    this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
    this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
    this.ad_control = cc.find("ad_control").getComponent("ad_control");
    this.sound_control = cc.find("sound_control").getComponent("sound_control");
    this.ad_control.show_bannerAd();
  },
  create_shop_content: function create_shop_content() {
    var node = null;

    for (var i = 0; i < this.scrollView_array.length; i++) {
      switch (i) {
        case 0:
          //创建land
          var arr = Object.keys(config.land);

          for (var j = 0; j < arr.length; j++) {
            node = cc.instantiate(this.shop_content_prefab);
            node.parent = this.content_array[i];
            node.getComponent("shop_content").ini_node("land", j);
          }

          break;

        case 1:
          //创建plant
          var arr = Object.keys(config.plant);

          for (var j = 0; j < arr.length; j++) {
            node = cc.instantiate(this.shop_content_prefab);
            node.parent = this.content_array[i];
            node.getComponent("shop_content").ini_node("plant", j);
          }

          break;
      }

      ;
    }
  },
  touch_exit: function touch_exit() {
    this.sound_control.play_sound_effect("button_exit");
    this.ad_control.hide_bannerAd();
    this.game_scene_js.on_node_kill(this.node);
  },
  // onLoad () {},
  start: function start() {
    this.create_shop_content();
  } // update (dt) {},

});

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcc2hvcF91aS5qcyJdLCJuYW1lcyI6WyJ1c2VyX2RhdGEiLCJyZXF1aXJlIiwiY29uZmlnIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJzY3JvbGxWaWV3X2FycmF5IiwiTm9kZSIsInNob3BfY29udGVudF9wcmVmYWIiLCJQcmVmYWIiLCJjb250ZW50X2FycmF5IiwidGFiX3NlbGVjdCIsImUiLCJpbmRleCIsInNvdW5kX2NvbnRyb2wiLCJwbGF5X3NvdW5kX2VmZmVjdCIsImkiLCJsZW5ndGgiLCJhY3RpdmUiLCJpbmlfbm9kZSIsImdhbWVfc2NlbmVfanMiLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwiZ2FtZV9ydWxlc19qcyIsImFkX2NvbnRyb2wiLCJzaG93X2Jhbm5lckFkIiwiY3JlYXRlX3Nob3BfY29udGVudCIsIm5vZGUiLCJhcnIiLCJPYmplY3QiLCJrZXlzIiwibGFuZCIsImoiLCJpbnN0YW50aWF0ZSIsInBhcmVudCIsInBsYW50IiwidG91Y2hfZXhpdCIsImhpZGVfYmFubmVyQWQiLCJvbl9ub2RlX2tpbGwiLCJzdGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxTQUFTLEdBQUdDLE9BQU8sQ0FBQyxXQUFELENBQXZCOztBQUNBLElBQUlDLE1BQU0sR0FBR0QsT0FBTyxDQUFDLFFBQUQsQ0FBcEI7O0FBQ0FFLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxnQkFBZ0IsRUFBRSxDQUFDSixFQUFFLENBQUNLLElBQUosQ0FEVjtBQUVSQyxJQUFBQSxtQkFBbUIsRUFBRU4sRUFBRSxDQUFDTyxNQUZoQjtBQUdSQyxJQUFBQSxhQUFhLEVBQUUsQ0FBQ1IsRUFBRSxDQUFDSyxJQUFKO0FBSFAsR0FIUDtBQVFMO0FBQ0FJLEVBQUFBLFVBVEssc0JBU01D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aUJBQW5CLENBQXFDLGFBQXJDO0FBQ0EsU0FBS1MsVUFBTCxDQUFnQmEsYUFBaEI7QUFDQSxTQUFLakIsYUFBTCxDQUFtQmtCLFlBQW5CLENBQWdDLEtBQUtYLElBQXJDO0FBQ0gsR0F4REk7QUF5REw7QUFFQVksRUFBQUEsS0EzREssbUJBMkRHO0FBQ0osU0FBS2IsbUJBQUw7QUFDSCxHQTdESSxDQStETDs7QUEvREssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHVzZXJfZGF0YSA9IHJlcXVpcmUoXCJ1c2VyX2RhdGFcIik7XHJcbnZhciBjb25maWcgPSByZXF1aXJlKFwiY29uZmlnXCIpO1xyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIHNjcm9sbFZpZXdfYXJyYXk6IFtjYy5Ob2RlXSxcclxuICAgICAgICBzaG9wX2NvbnRlbnRfcHJlZmFiOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgY29udGVudF9hcnJheTogW2NjLk5vZGVdLFxyXG4gICAgfSxcclxuICAgIC8v6YCJ6aG55Y2h5YiH5o2iXHJcbiAgICB0YWJfc2VsZWN0KGUsIGluZGV4KSB7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zY3JvbGxWaWV3X2FycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChpID09IGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbFZpZXdfYXJyYXlbaV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsVmlld19hcnJheVtpXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8v5Yid5aeL5YyW6IqC54K5XHJcbiAgICBpbmlfbm9kZSgpIHtcclxuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJnYW1lX3NjZW5lXCIpO1xyXG4gICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfcnVsZXNcIik7XHJcbiAgICAgICAgdGhpcy5hZF9jb250cm9sID0gY2MuZmluZChcImFkX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwiYWRfY29udHJvbFwiKTtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wgPSBjYy5maW5kKFwic291bmRfY29udHJvbFwiKS5nZXRDb21wb25lbnQoXCJzb3VuZF9jb250cm9sXCIpO1xyXG4gICAgICAgIHRoaXMuYWRfY29udHJvbC5zaG93X2Jhbm5lckFkKCk7XHJcbiAgICB9LFxyXG4gICAgY3JlYXRlX3Nob3BfY29udGVudCgpIHtcclxuICAgICAgICB2YXIgbm9kZSA9IG51bGw7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnNjcm9sbFZpZXdfYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgc3dpdGNoIChpKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgLy/liJvlu7psYW5kXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFyciA9IE9iamVjdC5rZXlzKGNvbmZpZy5sYW5kKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGFyci5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5zaG9wX2NvbnRlbnRfcHJlZmFiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMuY29udGVudF9hcnJheVtpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJzaG9wX2NvbnRlbnRcIikuaW5pX25vZGUoXCJsYW5kXCIsIGopO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAvL+WIm+W7unBsYW50XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFyciA9IE9iamVjdC5rZXlzKGNvbmZpZy5wbGFudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBhcnIubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuc2hvcF9jb250ZW50X3ByZWZhYilcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLmNvbnRlbnRfYXJyYXlbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwic2hvcF9jb250ZW50XCIpLmluaV9ub2RlKFwicGxhbnRcIiwgaik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICB0b3VjaF9leGl0KCkge1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9leGl0XCIpO1xyXG4gICAgICAgIHRoaXMuYWRfY29udHJvbC5oaWRlX2Jhbm5lckFkKCk7XHJcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLm9uX25vZGVfa2lsbCh0aGlzLm5vZGUpO1xyXG4gICAgfSxcclxuICAgIC8vIG9uTG9hZCAoKSB7fSxcclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZV9zaG9wX2NvbnRlbnQoKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pO1xyXG4iXX0=