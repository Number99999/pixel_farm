
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ui/plant_ui.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f2d8fybXzpH55xj2230YIaA', 'plant_ui');
// script/ui/plant_ui.js

"use strict";

var user_data = require("user_data");

cc.Class({
  "extends": cc.Component,
  properties: {
    icon_grop: cc.Node
  },
  //ini node
  ini_node: function ini_node(land_index) {
    this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
    this.land_group = cc.find("UI_ROOT/center/land_group");
    this.ad_control = cc.find("ad_control").getComponent("ad_control");
    this.sound_control = cc.find("sound_control").getComponent("sound_control");
    this.ad_control.show_bannerAd();
    this.set_icon();
    this.land_index = land_index;
  },
  //exit
  on_touch_exit_click: function on_touch_exit_click() {
    this.sound_control.play_sound_effect("button_exit");
    this.game_scene_js.on_node_kill(this.node);
  },
  //plant unlock judge
  set_icon: function set_icon() {
    for (var i = 0; i < this.icon_grop.children.length; i++) {
      //拥有种子
      if (user_data.user_data.plant[i].have == 1) {
        this.icon_grop.children[i].active = true;
      } else {
        this.icon_grop.children[i].active = false;
      }

      ;
    }

    ;
  },
  //plant click 
  on_plant_click: function on_plant_click(e, plant_index) {
    this.sound_control.play_sound_effect("button_click");
    this.land_group.children[this.land_index].getComponent("land").plant(plant_index);
    this.on_touch_exit_click();
  },
  onLoad: function onLoad() {},
  start: function start() {} // update (dt) {},

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxccGxhbnRfdWkuanMiXSwibmFtZXMiOlsidXNlcl9kYXRhIiwicmVxdWlyZSIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiaWNvbl9ncm9wIiwiTm9kZSIsImluaV9ub2RlIiwibGFuZF9pbmRleCIsImdhbWVfc2NlbmVfanMiLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwibGFuZF9ncm91cCIsImFkX2NvbnRyb2wiLCJzb3VuZF9jb250cm9sIiwic2hvd19iYW5uZXJBZCIsInNldF9pY29uIiwib25fdG91Y2hfZXhpdF9jbGljayIsInBsYXlfc291bmRfZWZmZWN0Iiwib25fbm9kZV9raWxsIiwibm9kZSIsImkiLCJjaGlsZHJlbiIsImxlbmd0aCIsInBsYW50IiwiaGF2ZSIsImFjdGl2ZSIsIm9uX3BsYW50X2NsaWNrIiwiZSIsInBsYW50X2luZGV4Iiwib25Mb2FkIiwic3RhcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsU0FBUyxHQUFHQyxPQUFPLENBQUMsV0FBRCxDQUF2Qjs7QUFDQUMsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFNBQVMsRUFBRUosRUFBRSxDQUFDSztBQUROLEdBSFA7QUFPTDtBQUNBQyxFQUFBQSxRQUFRLEVBQUUsa0JBQVVDLFVBQVYsRUFBc0I7QUFDNUIsU0FBS0MsYUFBTCxHQUFxQlIsRUFBRSxDQUFDUyxJQUFILENBQVEsU0FBUixFQUFtQkMsWUFBbkIsQ0FBZ0MsWUFBaEMsQ0FBckI7QUFDQSxTQUFLQyxVQUFMLEdBQWtCWCxFQUFFLENBQUNTLElBQUgsQ0FBUSwyQkFBUixDQUFsQjtBQUNBLFNBQUtHLFVBQUwsR0FBa0JaLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLFlBQVIsRUFBc0JDLFlBQXRCLENBQW1DLFlBQW5DLENBQWxCO0FBQ0EsU0FBS0csYUFBTCxHQUFxQmIsRUFBRSxDQUFDUyxJQUFILENBQVEsZUFBUixFQUF5QkMsWUFBekIsQ0FBc0MsZUFBdEMsQ0FBckI7QUFDQSxTQUFLRSxVQUFMLENBQWdCRSxhQUFoQjtBQUNBLFNBQUtDLFFBQUw7QUFDQSxTQUFLUixVQUFMLEdBQWtCQSxVQUFsQjtBQUNILEdBaEJJO0FBaUJMO0FBQ0FTLEVBQUFBLG1CQUFtQixFQUFFLCtCQUFZO0FBQzdCLFNBQUtILGFBQUwsQ0FBbUJJLGlCQUFuQixDQUFxQyxhQUFyQztBQUNBLFNBQUtULGFBQUwsQ0FBbUJVLFlBQW5CLENBQWdDLEtBQUtDLElBQXJDO0FBQ0gsR0FyQkk7QUFzQkw7QUFDQUosRUFBQUEsUUFBUSxFQUFFLG9CQUFZO0FBQ2xCLFNBQUssSUFBSUssQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLaEIsU0FBTCxDQUFlaUIsUUFBZixDQUF3QkMsTUFBNUMsRUFBb0RGLENBQUMsRUFBckQsRUFBeUQ7QUFDckQ7QUFDQSxVQUFJdEIsU0FBUyxDQUFDQSxTQUFWLENBQW9CeUIsS0FBcEIsQ0FBMEJILENBQTFCLEVBQTZCSSxJQUE3QixJQUFxQyxDQUF6QyxFQUE0QztBQUN4QyxhQUFLcEIsU0FBTCxDQUFlaUIsUUFBZixDQUF3QkQsQ0FBeEIsRUFBMkJLLE1BQTNCLEdBQW9DLElBQXBDO0FBQ0gsT0FGRCxNQUVPO0FBQ0gsYUFBS3JCLFNBQUwsQ0FBZWlCLFFBQWYsQ0FBd0JELENBQXhCLEVBQTJCSyxNQUEzQixHQUFvQyxLQUFwQztBQUNIOztBQUFBO0FBQ0o7O0FBQUE7QUFDSixHQWhDSTtBQWlDTDtBQUNBQyxFQUFBQSxjQUFjLEVBQUUsd0JBQVVDLENBQVYsRUFBYUMsV0FBYixFQUEwQjtBQUN0QyxTQUFLZixhQUFMLENBQW1CSSxpQkFBbkIsQ0FBcUMsY0FBckM7QUFDQSxTQUFLTixVQUFMLENBQWdCVSxRQUFoQixDQUF5QixLQUFLZCxVQUE5QixFQUEwQ0csWUFBMUMsQ0FBdUQsTUFBdkQsRUFBK0RhLEtBQS9ELENBQXFFSyxXQUFyRTtBQUNBLFNBQUtaLG1CQUFMO0FBQ0gsR0F0Q0k7QUF1Q0xhLEVBQUFBLE1BdkNLLG9CQXVDSSxDQUVSLENBekNJO0FBMkNMQyxFQUFBQSxLQTNDSyxtQkEyQ0csQ0FFUCxDQTdDSSxDQStDTDs7QUEvQ0ssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHVzZXJfZGF0YSA9IHJlcXVpcmUoXCJ1c2VyX2RhdGFcIik7XHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgaWNvbl9ncm9wOiBjYy5Ob2RlLFxyXG4gICAgfSxcclxuXHJcbiAgICAvL2luaSBub2RlXHJcbiAgICBpbmlfbm9kZTogZnVuY3Rpb24gKGxhbmRfaW5kZXgpIHtcclxuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJnYW1lX3NjZW5lXCIpO1xyXG4gICAgICAgIHRoaXMubGFuZF9ncm91cCA9IGNjLmZpbmQoXCJVSV9ST09UL2NlbnRlci9sYW5kX2dyb3VwXCIpO1xyXG4gICAgICAgIHRoaXMuYWRfY29udHJvbCA9IGNjLmZpbmQoXCJhZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcImFkX2NvbnRyb2xcIik7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sID0gY2MuZmluZChcInNvdW5kX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwic291bmRfY29udHJvbFwiKTtcclxuICAgICAgICB0aGlzLmFkX2NvbnRyb2wuc2hvd19iYW5uZXJBZCgpO1xyXG4gICAgICAgIHRoaXMuc2V0X2ljb24oKTtcclxuICAgICAgICB0aGlzLmxhbmRfaW5kZXggPSBsYW5kX2luZGV4O1xyXG4gICAgfSxcclxuICAgIC8vZXhpdFxyXG4gICAgb25fdG91Y2hfZXhpdF9jbGljazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9leGl0XCIpO1xyXG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5vbl9ub2RlX2tpbGwodGhpcy5ub2RlKTtcclxuICAgIH0sXHJcbiAgICAvL3BsYW50IHVubG9jayBqdWRnZVxyXG4gICAgc2V0X2ljb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuaWNvbl9ncm9wLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8v5oul5pyJ56eN5a2QXHJcbiAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLnBsYW50W2ldLmhhdmUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2dyb3AuY2hpbGRyZW5baV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9ncm9wLmNoaWxkcmVuW2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLy9wbGFudCBjbGljayBcclxuICAgIG9uX3BsYW50X2NsaWNrOiBmdW5jdGlvbiAoZSwgcGxhbnRfaW5kZXgpIHtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fY2xpY2tcIik7XHJcbiAgICAgICAgdGhpcy5sYW5kX2dyb3VwLmNoaWxkcmVuW3RoaXMubGFuZF9pbmRleF0uZ2V0Q29tcG9uZW50KFwibGFuZFwiKS5wbGFudChwbGFudF9pbmRleCk7XHJcbiAgICAgICAgdGhpcy5vbl90b3VjaF9leGl0X2NsaWNrKCk7XHJcbiAgICB9LFxyXG4gICAgb25Mb2FkKCkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcclxufSk7XHJcbiJdfQ==