
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ui/staff_ui.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8c435CdPS9LHbOArU9nIMku', 'staff_ui');
// script/ui/staff_ui.js

"use strict";

var _config = _interopRequireDefault(require("config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var user_data = require("user_data");

cc.Class({
  "extends": cc.Component,
  properties: {
    staff_group_node: cc.Node,
    staff_content_prefab: cc.Prefab,
    have_tips_group: cc.Node,
    buy_tips_group: cc.Node
  },
  //
  ini_node: function ini_node() {
    this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
    this.ad_control = cc.find("ad_control").getComponent("ad_control");
    this.sound_control = cc.find("sound_control").getComponent("sound_control");
    this.update_buy_tips();
    this.set_icon();
  },
  //
  set_icon: function set_icon() {
    for (var i = 0; i < this.staff_group_node.children.length; i++) {
      if (user_data.user_data.land[i].have == 1) {
        this.staff_group_node.children[i].color = new cc.color(255, 255, 255);
        this.staff_group_node.children[i].getComponent(cc.Button).interactable = true;

        if (user_data.user_data.staff[i].have == 1) {
          this.have_tips_group.children[i].active = true;
        }

        ;
      } else {
        this.staff_group_node.children[i].color = new cc.color(0, 0, 0);
        this.staff_group_node.children[i].getComponent(cc.Button).interactable = false;
        ;
        this.have_tips_group.children[i].active = false;
      }

      ;
    }

    ;
  },
  //刷新购买提示
  update_buy_tips: function update_buy_tips() {
    var arr = Object.keys(user_data.user_data.land);

    for (var i = 0; i < arr.length; i++) {
      //已解锁土地 金币满足，且未拥有才会显示
      if (user_data.user_data.land[i].have == 1 && user_data.user_data.gold >= _config["default"].staff[i].cost && user_data.user_data.staff[i].have == 0) {
        this.buy_tips_group.children[i].active = true;
      } else {
        this.buy_tips_group.children[i].active = false;
      }

      ;
    }

    ;
  },
  //刷新数据定时器
  update_schedule: function update_schedule() {
    var callback = function callback() {
      this.update_buy_tips();
      this.set_icon();
    };

    this.schedule(callback, 0.5);
  },
  //
  on_staff_click: function on_staff_click(e, staff_index) {
    this.sound_control.play_sound_effect("button_click");
    var node = cc.instantiate(this.staff_content_prefab);
    node.getComponent("staff_content").ini_node(staff_index);
    node.parent = this.node;
  },
  touch_exit: function touch_exit() {
    this.sound_control.play_sound_effect("button_exit");
    this.game_scene_js.on_node_kill(this.node);
  },
  onLoad: function onLoad() {},
  start: function start() {
    this.update_schedule();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcc3RhZmZfdWkuanMiXSwibmFtZXMiOlsidXNlcl9kYXRhIiwicmVxdWlyZSIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwic3RhZmZfZ3JvdXBfbm9kZSIsIk5vZGUiLCJzdGFmZl9jb250ZW50X3ByZWZhYiIsIlByZWZhYiIsImhhdmVfdGlwc19ncm91cCIsImJ1eV90aXBzX2dyb3VwIiwiaW5pX25vZGUiLCJnYW1lX3NjZW5lX2pzIiwiZmluZCIsImdldENvbXBvbmVudCIsImFkX2NvbnRyb2wiLCJzb3VuZF9jb250cm9sIiwidXBkYXRlX2J1eV90aXBzIiwic2V0X2ljb24iLCJpIiwiY2hpbGRyZW4iLCJsZW5ndGgiLCJsYW5kIiwiaGF2ZSIsImNvbG9yIiwiQnV0dG9uIiwiaW50ZXJhY3RhYmxlIiwic3RhZmYiLCJhY3RpdmUiLCJhcnIiLCJPYmplY3QiLCJrZXlzIiwiZ29sZCIsImNvbmZpZyIsImNvc3QiLCJ1cGRhdGVfc2NoZWR1bGUiLCJjYWxsYmFjayIsInNjaGVkdWxlIiwib25fc3RhZmZfY2xpY2siLCJlIiwic3RhZmZfaW5kZXgiLCJwbGF5X3NvdW5kX2VmZmVjdCIsIm5vZGUiLCJpbnN0YW50aWF0ZSIsInBhcmVudCIsInRvdWNoX2V4aXQiLCJvbl9ub2RlX2tpbGwiLCJvbkxvYWQiLCJzdGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQTs7OztBQURBLElBQUlBLFNBQVMsR0FBR0MsT0FBTyxDQUFDLFdBQUQsQ0FBdkI7O0FBRUFDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxnQkFBZ0IsRUFBRUosRUFBRSxDQUFDSyxJQURiO0FBRVJDLElBQUFBLG9CQUFvQixFQUFFTixFQUFFLENBQUNPLE1BRmpCO0FBR1JDLElBQUFBLGVBQWUsRUFBRVIsRUFBRSxD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ZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHVzZXJfZGF0YSA9IHJlcXVpcmUoXCJ1c2VyX2RhdGFcIik7XHJcbmltcG9ydCBjb25maWcgZnJvbSBcImNvbmZpZ1wiO1xyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIHN0YWZmX2dyb3VwX25vZGU6IGNjLk5vZGUsXHJcbiAgICAgICAgc3RhZmZfY29udGVudF9wcmVmYWI6IGNjLlByZWZhYixcclxuICAgICAgICBoYXZlX3RpcHNfZ3JvdXA6IGNjLk5vZGUsXHJcbiAgICAgICAgYnV5X3RpcHNfZ3JvdXA6IGNjLk5vZGUsXHJcbiAgICB9LFxyXG4gICAgLy9cclxuICAgIGluaV9ub2RlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9zY2VuZVwiKTtcclxuICAgICAgICB0aGlzLmFkX2NvbnRyb2wgPSBjYy5maW5kKFwiYWRfY29udHJvbFwiKS5nZXRDb21wb25lbnQoXCJhZF9jb250cm9sXCIpO1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbCA9IGNjLmZpbmQoXCJzb3VuZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcInNvdW5kX2NvbnRyb2xcIik7XHJcbiAgICAgICAgdGhpcy51cGRhdGVfYnV5X3RpcHMoKTtcclxuICAgICAgICB0aGlzLnNldF9pY29uKCk7XHJcbiAgICB9LFxyXG4gICAgLy9cclxuICAgIHNldF9pY29uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnN0YWZmX2dyb3VwX25vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFtpXS5oYXZlID09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhZmZfZ3JvdXBfbm9kZS5jaGlsZHJlbltpXS5jb2xvciA9IG5ldyBjYy5jb2xvcigyNTUsIDI1NSwgMjU1KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhZmZfZ3JvdXBfbm9kZS5jaGlsZHJlbltpXS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEuc3RhZmZbaV0uaGF2ZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXZlX3RpcHNfZ3JvdXAuY2hpbGRyZW5baV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YWZmX2dyb3VwX25vZGUuY2hpbGRyZW5baV0uY29sb3IgPSBuZXcgY2MuY29sb3IoMCwgMCwgMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YWZmX2dyb3VwX25vZGUuY2hpbGRyZW5baV0uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oYXZlX3RpcHNfZ3JvdXAuY2hpbGRyZW5baV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvL+WIt+aWsOi0reS5sOaPkOekulxyXG4gICAgdXBkYXRlX2J1eV90aXBzKCkge1xyXG4gICAgICAgIHZhciBhcnIgPSBPYmplY3Qua2V5cyh1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmQpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8v5bey6Kej6ZSB5Zyf5ZywIOmHkeW4gea7oei2s++8jOS4lOacquaLpeacieaJjeS8muaYvuekulxyXG4gICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW2ldLmhhdmUgPT0gMSAmJiB1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQgPj0gY29uZmlnLnN0YWZmW2ldLmNvc3QgJiYgdXNlcl9kYXRhLnVzZXJfZGF0YS5zdGFmZltpXS5oYXZlID09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnV5X3RpcHNfZ3JvdXAuY2hpbGRyZW5baV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnV5X3RpcHNfZ3JvdXAuY2hpbGRyZW5baV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvL+WIt+aWsOaVsOaNruWumuaXtuWZqFxyXG4gICAgdXBkYXRlX3NjaGVkdWxlKCkge1xyXG4gICAgICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVfYnV5X3RpcHMoKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRfaWNvbigpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZShjYWxsYmFjaywgMC41KTtcclxuICAgIH0sXHJcbiAgICAvL1xyXG4gICAgb25fc3RhZmZfY2xpY2s6IGZ1bmN0aW9uIChlLCBzdGFmZl9pbmRleCkge1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9jbGlja1wiKTtcclxuICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuc3RhZmZfY29udGVudF9wcmVmYWIpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwic3RhZmZfY29udGVudFwiKS5pbmlfbm9kZShzdGFmZl9pbmRleCk7XHJcbiAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLm5vZGU7XHJcbiAgICB9LFxyXG4gICAgdG91Y2hfZXhpdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9leGl0XCIpO1xyXG5cclxuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMub25fbm9kZV9raWxsKHRoaXMubm9kZSk7XHJcbiAgICB9LFxyXG4gICAgb25Mb2FkKCkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVfc2NoZWR1bGUoKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pO1xyXG4iXX0=