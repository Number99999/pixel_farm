
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
    this.ad_control.show_bannerAd();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcc3RhZmZfdWkuanMiXSwibmFtZXMiOlsidXNlcl9kYXRhIiwicmVxdWlyZSIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwic3RhZmZfZ3JvdXBfbm9kZSIsIk5vZGUiLCJzdGFmZl9jb250ZW50X3ByZWZhYiIsIlByZWZhYiIsImhhdmVfdGlwc19ncm91cCIsImJ1eV90aXBzX2dyb3VwIiwiaW5pX25vZGUiLCJnYW1lX3NjZW5lX2pzIiwiZmluZCIsImdldENvbXBvbmVudCIsImFkX2NvbnRyb2wiLCJzb3VuZF9jb250cm9sIiwic2hvd19iYW5uZXJBZCIsInVwZGF0ZV9idXlfdGlwcyIsInNldF9pY29uIiwiaSIsImNoaWxkcmVuIiwibGVuZ3RoIiwibGFuZCIsImhhdmUiLCJjb2xvciIsIkJ1dHRvbiIsImludGVyYWN0YWJsZSIsInN0YWZmIiwiYWN0aXZlIiwiYXJyIiwiT2JqZWN0Iiwia2V5cyIsImdvbGQiLCJjb25maWciLCJjb3N0IiwidXBkYXRlX3NjaGVkdWxlIiwiY2FsbGJhY2siLCJzY2hlZHVsZSIsIm9uX3N0YWZmX2NsaWNrIiwiZSIsInN0YWZmX2luZGV4IiwicGxheV9zb3VuZF9lZmZlY3QiLCJub2RlIiwiaW5zdGFudGlhdGUiLCJwYXJlbnQiLCJ0b3VjaF9leGl0Iiwib25fbm9kZV9raWxsIiwib25Mb2FkIiwic3RhcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7QUFEQSxJQUFJQSxTQUFTLEdBQUdDLE9BQU8sQ0FBQyxXQUFELENBQXZCOztBQUVBQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsZ0JBQWdCLEVBQUVKLEVBQUUsQ0FBQ0ssSUFEYjtBQUVSQyxJQUFBQSxvQkFBb0IsRUFBRU4sRUFBRSxDQUFDTyxNQUZqQjtBQUdSQyxJQUFBQSxl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Q0osU0FBS2IsZUFBTDtBQUNILEdBeEVJLENBMEVMOztBQTFFSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgdXNlcl9kYXRhID0gcmVxdWlyZShcInVzZXJfZGF0YVwiKTtcclxuaW1wb3J0IGNvbmZpZyBmcm9tIFwiY29uZmlnXCI7XHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgc3RhZmZfZ3JvdXBfbm9kZTogY2MuTm9kZSxcclxuICAgICAgICBzdGFmZl9jb250ZW50X3ByZWZhYjogY2MuUHJlZmFiLFxyXG4gICAgICAgIGhhdmVfdGlwc19ncm91cDogY2MuTm9kZSxcclxuICAgICAgICBidXlfdGlwc19ncm91cDogY2MuTm9kZSxcclxuICAgIH0sXHJcbiAgICAvL1xyXG4gICAgaW5pX25vZGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJnYW1lX3NjZW5lXCIpO1xyXG4gICAgICAgIHRoaXMuYWRfY29udHJvbCA9IGNjLmZpbmQoXCJhZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcImFkX2NvbnRyb2xcIik7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sID0gY2MuZmluZChcInNvdW5kX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwic291bmRfY29udHJvbFwiKTtcclxuICAgICAgICB0aGlzLmFkX2NvbnRyb2wuc2hvd19iYW5uZXJBZCgpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlX2J1eV90aXBzKCk7XHJcbiAgICAgICAgdGhpcy5zZXRfaWNvbigpO1xyXG4gICAgfSxcclxuICAgIC8vXHJcbiAgICBzZXRfaWNvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zdGFmZl9ncm91cF9ub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbaV0uaGF2ZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YWZmX2dyb3VwX25vZGUuY2hpbGRyZW5baV0uY29sb3IgPSBuZXcgY2MuY29sb3IoMjU1LCAyNTUsIDI1NSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YWZmX2dyb3VwX25vZGUuY2hpbGRyZW5baV0uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLnN0YWZmW2ldLmhhdmUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGF2ZV90aXBzX2dyb3VwLmNoaWxkcmVuW2ldLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFmZl9ncm91cF9ub2RlLmNoaWxkcmVuW2ldLmNvbG9yID0gbmV3IGNjLmNvbG9yKDAsIDAsIDApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFmZl9ncm91cF9ub2RlLmNoaWxkcmVuW2ldLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlOztcclxuICAgICAgICAgICAgICAgIHRoaXMuaGF2ZV90aXBzX2dyb3VwLmNoaWxkcmVuW2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLy/liLfmlrDotK3kubDmj5DnpLpcclxuICAgIHVwZGF0ZV9idXlfdGlwcygpIHtcclxuICAgICAgICB2YXIgYXJyID0gT2JqZWN0LmtleXModXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAvL+W3suino+mUgeWcn+WcsCDph5HluIHmu6HotrPvvIzkuJTmnKrmi6XmnInmiY3kvJrmmL7npLpcclxuICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFtpXS5oYXZlID09IDEgJiYgdXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkID49IGNvbmZpZy5zdGFmZltpXS5jb3N0ICYmIHVzZXJfZGF0YS51c2VyX2RhdGEuc3RhZmZbaV0uaGF2ZSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ1eV90aXBzX2dyb3VwLmNoaWxkcmVuW2ldLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ1eV90aXBzX2dyb3VwLmNoaWxkcmVuW2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLy/liLfmlrDmlbDmja7lrprml7blmahcclxuICAgIHVwZGF0ZV9zY2hlZHVsZSgpIHtcclxuICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlX2J1eV90aXBzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0X2ljb24oKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUoY2FsbGJhY2ssIDAuNSk7XHJcbiAgICB9LFxyXG4gICAgLy9cclxuICAgIG9uX3N0YWZmX2NsaWNrOiBmdW5jdGlvbiAoZSwgc3RhZmZfaW5kZXgpIHtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fY2xpY2tcIik7XHJcbiAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnN0YWZmX2NvbnRlbnRfcHJlZmFiKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChcInN0YWZmX2NvbnRlbnRcIikuaW5pX25vZGUoc3RhZmZfaW5kZXgpO1xyXG4gICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5ub2RlO1xyXG4gICAgfSxcclxuICAgIHRvdWNoX2V4aXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fZXhpdFwiKTtcclxuXHJcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLm9uX25vZGVfa2lsbCh0aGlzLm5vZGUpO1xyXG4gICAgfSxcclxuICAgIG9uTG9hZCgpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlX3NjaGVkdWxlKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxyXG59KTtcclxuIl19