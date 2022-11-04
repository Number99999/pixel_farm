
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcc2hvcF91aS5qcyJdLCJuYW1lcyI6WyJ1c2VyX2RhdGEiLCJyZXF1aXJlIiwiY29uZmlnIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJzY3JvbGxWaWV3X2FycmF5IiwiTm9kZSIsInNob3BfY29udGVudF9wcmVmYWIiLCJQcmVmYWIiLCJjb250ZW50X2FycmF5IiwidGFiX3NlbGVjdCIsImUiLCJpbmRleCIsInNvdW5kX2NvbnRyb2wiLCJwbGF5X3NvdW5kX2VmZmVjdCIsImkiLCJsZW5ndGgiLCJhY3RpdmUiLCJpbmlfbm9kZSIsImdhbWVfc2NlbmVfanMiLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwiZ2FtZV9ydWxlc19qcyIsImFkX2NvbnRyb2wiLCJzaG93X2Jhbm5lckFkIiwiY3JlYXRlX3Nob3BfY29udGVudCIsIm5vZGUiLCJhcnIiLCJPYmplY3QiLCJrZXlzIiwibGFuZCIsImoiLCJpbnN0YW50aWF0ZSIsInBhcmVudCIsInBsYW50IiwidG91Y2hfZXhpdCIsIm9uX25vZGVfa2lsbCIsInN0YXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLFNBQVMsR0FBR0MsT0FBTyxDQUFDLFdBQUQsQ0FBdkI7O0FBQ0EsSUFBSUMsTUFBTSxHQUFHRCxPQUFPLENBQUMsUUFBRCxDQUFwQjs7QUFDQUUsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLGdCQUFnQixFQUFFLENBQUNKLEVBQUUsQ0FBQ0ssSUFBSixDQURWO0FBRVJDLElBQUFBLG1CQUFtQixFQUFFTixFQUFFLENBQUNPLE1BRmhCO0FBR1JDLElBQUFBLGFBQWEsRUFBRSxDQUFDUixFQUFFLENBQUNLLElBQUo7QUFIUCxHQUhQO0FBUUw7QUFDQUksRUFBQUEsVUFUSyxzQkFTTUMsQ0FUTixFQVNTQyxLQVRU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ckM7QUFDQSxTQUFLSyxhQUFMLENBQW1CaUIsWUFBbkIsQ0FBZ0MsS0FBS1YsSUFBckM7QUFDSCxHQXZESTtBQXdETDtBQUVBVyxFQUFBQSxLQTFESyxtQkEwREc7QUFDSixTQUFLWixtQkFBTDtBQUNILEdBNURJLENBOERMOztBQTlESyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgdXNlcl9kYXRhID0gcmVxdWlyZShcInVzZXJfZGF0YVwiKTtcclxudmFyIGNvbmZpZyA9IHJlcXVpcmUoXCJjb25maWdcIik7XHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgc2Nyb2xsVmlld19hcnJheTogW2NjLk5vZGVdLFxyXG4gICAgICAgIHNob3BfY29udGVudF9wcmVmYWI6IGNjLlByZWZhYixcclxuICAgICAgICBjb250ZW50X2FycmF5OiBbY2MuTm9kZV0sXHJcbiAgICB9LFxyXG4gICAgLy/pgInpobnljaHliIfmjaJcclxuICAgIHRhYl9zZWxlY3QoZSwgaW5kZXgpIHtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fY2xpY2tcIik7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnNjcm9sbFZpZXdfYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGkgPT0gaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsVmlld19hcnJheVtpXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxWaWV3X2FycmF5W2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLy/liJ3lp4vljJboioLngrlcclxuICAgIGluaV9ub2RlKCkge1xyXG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfc2NlbmVcIik7XHJcbiAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9ydWxlc1wiKTtcclxuICAgICAgICB0aGlzLmFkX2NvbnRyb2wgPSBjYy5maW5kKFwiYWRfY29udHJvbFwiKS5nZXRDb21wb25lbnQoXCJhZF9jb250cm9sXCIpO1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbCA9IGNjLmZpbmQoXCJzb3VuZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcInNvdW5kX2NvbnRyb2xcIik7XHJcbiAgICAgICAgdGhpcy5hZF9jb250cm9sLnNob3dfYmFubmVyQWQoKTtcclxuICAgIH0sXHJcbiAgICBjcmVhdGVfc2hvcF9jb250ZW50KCkge1xyXG4gICAgICAgIHZhciBub2RlID0gbnVsbDtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuc2Nyb2xsVmlld19hcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGkpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAvL+WIm+W7umxhbmRcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYXJyID0gT2JqZWN0LmtleXMoY29uZmlnLmxhbmQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgYXJyLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnNob3BfY29udGVudF9wcmVmYWIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5jb250ZW50X2FycmF5W2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcInNob3BfY29udGVudFwiKS5pbmlfbm9kZShcImxhbmRcIiwgaik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgIC8v5Yib5bu6cGxhbnRcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYXJyID0gT2JqZWN0LmtleXMoY29uZmlnLnBsYW50KTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGFyci5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5zaG9wX2NvbnRlbnRfcHJlZmFiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMuY29udGVudF9hcnJheVtpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJzaG9wX2NvbnRlbnRcIikuaW5pX25vZGUoXCJwbGFudFwiLCBqKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHRvdWNoX2V4aXQoKSB7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2V4aXRcIik7XHJcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLm9uX25vZGVfa2lsbCh0aGlzLm5vZGUpO1xyXG4gICAgfSxcclxuICAgIC8vIG9uTG9hZCAoKSB7fSxcclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZV9zaG9wX2NvbnRlbnQoKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pO1xyXG4iXX0=