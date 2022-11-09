
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcc2hvcF91aS5qcyJdLCJuYW1lcyI6WyJ1c2VyX2RhdGEiLCJyZXF1aXJlIiwiY29uZmlnIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJzY3JvbGxWaWV3X2FycmF5IiwiTm9kZSIsInNob3BfY29udGVudF9wcmVmYWIiLCJQcmVmYWIiLCJjb250ZW50X2FycmF5IiwidGFiX3NlbGVjdCIsImUiLCJpbmRleCIsInNvdW5kX2NvbnRyb2wiLCJwbGF5X3NvdW5kX2VmZmVjdCIsImkiLCJsZW5ndGgiLCJhY3RpdmUiLCJpbmlfbm9kZSIsImdhbWVfc2NlbmVfanMiLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwiZ2FtZV9ydWxlc19qcyIsImFkX2NvbnRyb2wiLCJjcmVhdGVfc2hvcF9jb250ZW50Iiwibm9kZSIsImFyciIsIk9iamVjdCIsImtleXMiLCJsYW5kIiwiaiIsImluc3RhbnRpYXRlIiwicGFyZW50IiwicGxhbnQiLCJ0b3VjaF9leGl0Iiwib25fbm9kZV9raWxsIiwic3RhcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsU0FBUyxHQUFHQyxPQUFPLENBQUMsV0FBRCxDQUF2Qjs7QUFDQSxJQUFJQyxNQUFNLEdBQUdELE9BQU8sQ0FBQyxRQUFELENBQXBCOztBQUNBRSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsZ0JBQWdCLEVBQUUsQ0FBQ0osRUFBRSxDQUFDSyxJQUFKLENBRFY7QUFFUkMsSUFBQUEsbUJBQW1CLEVBQUVOLEVBQUUsQ0FBQ08sTUFGaEI7QUFHUkMsSUFBQUEsYUFBYSxFQUFFLENBQUNSLEVBQUUsQ0FBQ0ssSUFBSjtBQUhQLEdBSFA7QUFRTDtBQUNBSSxFQUFBQSxVQVRLLHNCQVNNQyxDQVROLEVBU1NDLEtBVFQsRUFTZ0I7QUFDakIsU0FB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SUFBckM7QUFDSCxHQXRESTtBQXVETDtBQUVBVyxFQUFBQSxLQXpESyxtQkF5REc7QUFDSixTQUFLWixtQkFBTDtBQUNILEdBM0RJLENBNkRMOztBQTdESyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgdXNlcl9kYXRhID0gcmVxdWlyZShcInVzZXJfZGF0YVwiKTtcclxudmFyIGNvbmZpZyA9IHJlcXVpcmUoXCJjb25maWdcIik7XHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgc2Nyb2xsVmlld19hcnJheTogW2NjLk5vZGVdLFxyXG4gICAgICAgIHNob3BfY29udGVudF9wcmVmYWI6IGNjLlByZWZhYixcclxuICAgICAgICBjb250ZW50X2FycmF5OiBbY2MuTm9kZV0sXHJcbiAgICB9LFxyXG4gICAgLy/pgInpobnljaHliIfmjaJcclxuICAgIHRhYl9zZWxlY3QoZSwgaW5kZXgpIHtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fY2xpY2tcIik7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnNjcm9sbFZpZXdfYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGkgPT0gaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsVmlld19hcnJheVtpXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxWaWV3X2FycmF5W2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLy/liJ3lp4vljJboioLngrlcclxuICAgIGluaV9ub2RlKCkge1xyXG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfc2NlbmVcIik7XHJcbiAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9ydWxlc1wiKTtcclxuICAgICAgICB0aGlzLmFkX2NvbnRyb2wgPSBjYy5maW5kKFwiYWRfY29udHJvbFwiKS5nZXRDb21wb25lbnQoXCJhZF9jb250cm9sXCIpO1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbCA9IGNjLmZpbmQoXCJzb3VuZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcInNvdW5kX2NvbnRyb2xcIik7XHJcbiAgICB9LFxyXG4gICAgY3JlYXRlX3Nob3BfY29udGVudCgpIHtcclxuICAgICAgICB2YXIgbm9kZSA9IG51bGw7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnNjcm9sbFZpZXdfYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgc3dpdGNoIChpKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgLy/liJvlu7psYW5kXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFyciA9IE9iamVjdC5rZXlzKGNvbmZpZy5sYW5kKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGFyci5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5zaG9wX2NvbnRlbnRfcHJlZmFiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMuY29udGVudF9hcnJheVtpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJzaG9wX2NvbnRlbnRcIikuaW5pX25vZGUoXCJsYW5kXCIsIGopO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAvL+WIm+W7unBsYW50XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFyciA9IE9iamVjdC5rZXlzKGNvbmZpZy5wbGFudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBhcnIubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuc2hvcF9jb250ZW50X3ByZWZhYilcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLmNvbnRlbnRfYXJyYXlbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwic2hvcF9jb250ZW50XCIpLmluaV9ub2RlKFwicGxhbnRcIiwgaik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICB0b3VjaF9leGl0KCkge1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9leGl0XCIpO1xyXG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5vbl9ub2RlX2tpbGwodGhpcy5ub2RlKTtcclxuICAgIH0sXHJcbiAgICAvLyBvbkxvYWQgKCkge30sXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVfc2hvcF9jb250ZW50KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxyXG59KTtcclxuIl19