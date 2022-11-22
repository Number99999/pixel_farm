
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
    this.ad_control.hide_bannerAd();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxccGxhbnRfdWkuanMiXSwibmFtZXMiOlsidXNlcl9kYXRhIiwicmVxdWlyZSIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiaWNvbl9ncm9wIiwiTm9kZSIsImluaV9ub2RlIiwibGFuZF9pbmRleCIsImdhbWVfc2NlbmVfanMiLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwibGFuZF9ncm91cCIsImFkX2NvbnRyb2wiLCJzb3VuZF9jb250cm9sIiwic2hvd19iYW5uZXJBZCIsInNldF9pY29uIiwib25fdG91Y2hfZXhpdF9jbGljayIsInBsYXlfc291bmRfZWZmZWN0IiwiaGlkZV9iYW5uZXJBZCIsIm9uX25vZGVfa2lsbCIsIm5vZGUiLCJpIiwiY2hpbGRyZW4iLCJsZW5ndGgiLCJwbGFudCIsImhhdmUiLCJhY3RpdmUiLCJvbl9wbGFudF9jbGljayIsImUiLCJwbGFudF9pbmRleCIsIm9uTG9hZCIsInN0YXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLFNBQVMsR0FBR0MsT0FBTyxDQUFDLFdBQUQsQ0FBdkI7O0FBQ0FDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxTQUFTLEVBQUVKLEVBQUUsQ0FBQ0s7QUFETixHQUhQO0FBT0w7QUFDQUMsRUFBQUEsUUFBUSxFQUFFLGtCQUFVQyxVQUFWLEVBQXNCO0FBQzVCLFNBQUtDLGFBQUwsR0FBcUJSLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLFNBQVIsRUFBbUJDLFlBQW5CLENBQWdDLFlBQWhDLENBQXJCO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQlgsRUFBRSxDQUFDUyxJQUFILENBQVEsMkJBQVIsQ0FBbEI7QUFDQSxTQUFLRyxVQUFMLEdBQWtCWixFQUFFLENBQUNTLElBQUgsQ0FBUSxZQUFSLEVBQXNCQyxZQUF0QixDQUFtQyxZQUFuQyxDQUFsQjtBQUNBLFNBQUtHLGFBQUwsR0FBcUJiLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLGVBQVIsRUFBeUJDLFlBQXpCLENBQXNDLGVBQXRDLENBQXJCO0FBQ0EsU0FBS0UsVUFBTCxDQUFnQkUsYUFBaEI7QUFDQSxTQUFLQyxRQUFMO0FBQ0EsU0FBS1IsVUFBTCxHQUFrQkEsVUFBbEI7QUFDSCxHQWhCSTtBQWlCTDtBQUNBUyxFQUFBQSxtQkFBbUIsRUFBRSwrQkFBWTtBQUM3QixTQUFLSCxhQUFMLENBQW1CSSxpQkFBbkIsQ0FBcUMsYUFBckM7QUFDQSxTQUFLTCxVQUFMLENBQWdCTSxhQUFoQjtBQUNBLFNBQUtWLGFBQUwsQ0FBbUJXLFlBQW5CLENBQWdDLEtBQUtDLElBQXJDO0FBQ0gsR0F0Qkk7QUF1Qkw7QUFDQUwsRUFBQUEsUUFBUSxFQUFFLG9CQUFZO0FBQ2xCLFNBQUssSUFBSU0sQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLakIsU0FBTCxDQUFla0IsUUFBZixDQUF3QkMsTUFBNUMsRUFBb0RGLENBQUMsRUFBckQsRUFBeUQ7QUFDckQ7QUFDQSxVQUFJdkIsU0FBUyxDQUFDQSxTQUFWLENBQW9CMEIsS0FBcEIsQ0FBMEJILENBQTFCLEVBQTZCSSxJQUE3QixJQUFxQyxDQUF6QyxFQUE0QztBQUN4QyxhQUFLckIsU0FBTCxDQUFla0IsUUFBZixDQUF3QkQsQ0FBeEIsRUFBMkJLLE1BQTNCLEdBQW9DLElBQXBDO0FBQ0gsT0FGRCxNQUVPO0FBQ0gsYUFBS3RCLFNBQUwsQ0FBZWtCLFFBQWYsQ0FBd0JELENBQXhCLEVBQTJCSyxNQUEzQixHQUFvQyxLQUFwQztBQUNIOztBQUFBO0FBQ0o7O0FBQUE7QUFDSixHQWpDSTtBQWtDTDtBQUNBQyxFQUFBQSxjQUFjLEVBQUUsd0JBQVVDLENBQVYsRUFBYUMsV0FBYixFQUEwQjtBQUN0QyxTQUFLaEIsYUFBTCxDQUFtQkksaUJBQW5CLENBQXFDLGNBQXJDO0FBQ0EsU0FBS04sVUFBTCxDQUFnQlcsUUFBaEIsQ0FBeUIsS0FBS2YsVUFBOUIsRUFBMENHLFlBQTFDLENBQXVELE1BQXZELEVBQStEYyxLQUEvRCxDQUFxRUssV0FBckU7QUFDQSxTQUFLYixtQkFBTDtBQUNILEdBdkNJO0FBd0NMYyxFQUFBQSxNQXhDSyxvQkF3Q0ksQ0FFUixDQTFDSTtBQTRDTEMsRUFBQUEsS0E1Q0ssbUJBNENHLENBRVAsQ0E5Q0ksQ0FnREw7O0FBaERLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciB1c2VyX2RhdGEgPSByZXF1aXJlKFwidXNlcl9kYXRhXCIpO1xyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGljb25fZ3JvcDogY2MuTm9kZSxcclxuICAgIH0sXHJcblxyXG4gICAgLy9pbmkgbm9kZVxyXG4gICAgaW5pX25vZGU6IGZ1bmN0aW9uIChsYW5kX2luZGV4KSB7XHJcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9zY2VuZVwiKTtcclxuICAgICAgICB0aGlzLmxhbmRfZ3JvdXAgPSBjYy5maW5kKFwiVUlfUk9PVC9jZW50ZXIvbGFuZF9ncm91cFwiKTtcclxuICAgICAgICB0aGlzLmFkX2NvbnRyb2wgPSBjYy5maW5kKFwiYWRfY29udHJvbFwiKS5nZXRDb21wb25lbnQoXCJhZF9jb250cm9sXCIpO1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbCA9IGNjLmZpbmQoXCJzb3VuZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcInNvdW5kX2NvbnRyb2xcIik7XHJcbiAgICAgICAgdGhpcy5hZF9jb250cm9sLnNob3dfYmFubmVyQWQoKTtcclxuICAgICAgICB0aGlzLnNldF9pY29uKCk7XHJcbiAgICAgICAgdGhpcy5sYW5kX2luZGV4ID0gbGFuZF9pbmRleDtcclxuICAgIH0sXHJcbiAgICAvL2V4aXRcclxuICAgIG9uX3RvdWNoX2V4aXRfY2xpY2s6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fZXhpdFwiKTtcclxuICAgICAgICB0aGlzLmFkX2NvbnRyb2wuaGlkZV9iYW5uZXJBZCgpO1xyXG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5vbl9ub2RlX2tpbGwodGhpcy5ub2RlKTtcclxuICAgIH0sXHJcbiAgICAvL3BsYW50IHVubG9jayBqdWRnZVxyXG4gICAgc2V0X2ljb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuaWNvbl9ncm9wLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8v5oul5pyJ56eN5a2QXHJcbiAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLnBsYW50W2ldLmhhdmUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2dyb3AuY2hpbGRyZW5baV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9ncm9wLmNoaWxkcmVuW2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLy9wbGFudCBjbGljayBcclxuICAgIG9uX3BsYW50X2NsaWNrOiBmdW5jdGlvbiAoZSwgcGxhbnRfaW5kZXgpIHtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fY2xpY2tcIik7XHJcbiAgICAgICAgdGhpcy5sYW5kX2dyb3VwLmNoaWxkcmVuW3RoaXMubGFuZF9pbmRleF0uZ2V0Q29tcG9uZW50KFwibGFuZFwiKS5wbGFudChwbGFudF9pbmRleCk7XHJcbiAgICAgICAgdGhpcy5vbl90b3VjaF9leGl0X2NsaWNrKCk7XHJcbiAgICB9LFxyXG4gICAgb25Mb2FkKCkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcclxufSk7XHJcbiJdfQ==