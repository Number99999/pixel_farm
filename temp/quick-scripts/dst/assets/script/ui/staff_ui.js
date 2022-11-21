
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
    this.ad_control.hide_bannerAd();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcc3RhZmZfdWkuanMiXSwibmFtZXMiOlsidXNlcl9kYXRhIiwicmVxdWlyZSIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwic3RhZmZfZ3JvdXBfbm9kZSIsIk5vZGUiLCJzdGFmZl9jb250ZW50X3ByZWZhYiIsIlByZWZhYiIsImhhdmVfdGlwc19ncm91cCIsImJ1eV90aXBzX2dyb3VwIiwiaW5pX25vZGUiLCJnYW1lX3NjZW5lX2pzIiwiZmluZCIsImdldENvbXBvbmVudCIsImFkX2NvbnRyb2wiLCJzb3VuZF9jb250cm9sIiwic2hvd19iYW5uZXJBZCIsInVwZGF0ZV9idXlfdGlwcyIsInNldF9pY29uIiwiaSIsImNoaWxkcmVuIiwibGVuZ3RoIiwibGFuZCIsImhhdmUiLCJjb2xvciIsIkJ1dHRvbiIsImludGVyYWN0YWJsZSIsInN0YWZmIiwiYWN0aXZlIiwiYXJyIiwiT2JqZWN0Iiwia2V5cyIsImdvbGQiLCJjb25maWciLCJjb3N0IiwidXBkYXRlX3NjaGVkdWxlIiwiY2FsbGJhY2siLCJzY2hlZHVsZSIsIm9uX3N0YWZmX2NsaWNrIiwiZSIsInN0YWZmX2luZGV4IiwicGxheV9zb3VuZF9lZmZlY3QiLCJub2RlIiwiaW5zdGFudGlhdGUiLCJwYXJlbnQiLCJ0b3VjaF9leGl0IiwiaGlkZV9iYW5uZXJBZCIsIm9uX25vZGVfa2lsbCIsIm9uTG9hZCIsInN0YXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUNBOzs7O0FBREEsSUFBSUEsU0FBUyxHQUFHQyxPQUFPLENBQUMsV0FBRCxDQUF2Qjs7QUFFQUMsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLGdCQUFnQixFQUFFSixFQUFFLENBQUNLLElBRGI7QUFFUkMsSUFBQUEsb0JBQW9CLEVBQUVOLEVBQUUsQ0FBQ08sTUFG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LG9CQWtFSSxDQUVSLENBcEVJO0FBc0VMQyxFQUFBQSxLQXRFSyxtQkFzRUc7QUFDSixTQUFLZCxlQUFMO0FBQ0gsR0F4RUksQ0EwRUw7O0FBMUVLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciB1c2VyX2RhdGEgPSByZXF1aXJlKFwidXNlcl9kYXRhXCIpO1xuaW1wb3J0IGNvbmZpZyBmcm9tIFwiY29uZmlnXCI7XG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBzdGFmZl9ncm91cF9ub2RlOiBjYy5Ob2RlLFxuICAgICAgICBzdGFmZl9jb250ZW50X3ByZWZhYjogY2MuUHJlZmFiLFxuICAgICAgICBoYXZlX3RpcHNfZ3JvdXA6IGNjLk5vZGUsXG4gICAgICAgIGJ1eV90aXBzX2dyb3VwOiBjYy5Ob2RlLFxuICAgIH0sXG4gICAgLy9cbiAgICBpbmlfbm9kZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJnYW1lX3NjZW5lXCIpO1xuICAgICAgICB0aGlzLmFkX2NvbnRyb2wgPSBjYy5maW5kKFwiYWRfY29udHJvbFwiKS5nZXRDb21wb25lbnQoXCJhZF9jb250cm9sXCIpO1xuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wgPSBjYy5maW5kKFwic291bmRfY29udHJvbFwiKS5nZXRDb21wb25lbnQoXCJzb3VuZF9jb250cm9sXCIpO1xuICAgICAgICB0aGlzLmFkX2NvbnRyb2wuc2hvd19iYW5uZXJBZCgpO1xuICAgICAgICB0aGlzLnVwZGF0ZV9idXlfdGlwcygpO1xuICAgICAgICB0aGlzLnNldF9pY29uKCk7XG4gICAgfSxcbiAgICAvL1xuICAgIHNldF9pY29uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zdGFmZl9ncm91cF9ub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW2ldLmhhdmUgPT0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhZmZfZ3JvdXBfbm9kZS5jaGlsZHJlbltpXS5jb2xvciA9IG5ldyBjYy5jb2xvcigyNTUsIDI1NSwgMjU1KTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YWZmX2dyb3VwX25vZGUuY2hpbGRyZW5baV0uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5zdGFmZltpXS5oYXZlID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXZlX3RpcHNfZ3JvdXAuY2hpbGRyZW5baV0uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YWZmX2dyb3VwX25vZGUuY2hpbGRyZW5baV0uY29sb3IgPSBuZXcgY2MuY29sb3IoMCwgMCwgMCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGFmZl9ncm91cF9ub2RlLmNoaWxkcmVuW2ldLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlOztcbiAgICAgICAgICAgICAgICB0aGlzLmhhdmVfdGlwc19ncm91cC5jaGlsZHJlbltpXS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvL+WIt+aWsOi0reS5sOaPkOekulxuICAgIHVwZGF0ZV9idXlfdGlwcygpIHtcbiAgICAgICAgdmFyIGFyciA9IE9iamVjdC5rZXlzKHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAvL+W3suino+mUgeWcn+WcsCDph5HluIHmu6HotrPvvIzkuJTmnKrmi6XmnInmiY3kvJrmmL7npLpcbiAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbaV0uaGF2ZSA9PSAxICYmIHVzZXJfZGF0YS51c2VyX2RhdGEuZ29sZCA+PSBjb25maWcuc3RhZmZbaV0uY29zdCAmJiB1c2VyX2RhdGEudXNlcl9kYXRhLnN0YWZmW2ldLmhhdmUgPT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYnV5X3RpcHNfZ3JvdXAuY2hpbGRyZW5baV0uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5idXlfdGlwc19ncm91cC5jaGlsZHJlbltpXS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvL+WIt+aWsOaVsOaNruWumuaXtuWZqFxuICAgIHVwZGF0ZV9zY2hlZHVsZSgpIHtcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVfYnV5X3RpcHMoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0X2ljb24oKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZShjYWxsYmFjaywgMC41KTtcbiAgICB9LFxuICAgIC8vXG4gICAgb25fc3RhZmZfY2xpY2s6IGZ1bmN0aW9uIChlLCBzdGFmZl9pbmRleCkge1xuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fY2xpY2tcIik7XG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5zdGFmZl9jb250ZW50X3ByZWZhYik7XG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwic3RhZmZfY29udGVudFwiKS5pbmlfbm9kZShzdGFmZl9pbmRleCk7XG4gICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5ub2RlO1xuICAgIH0sXG4gICAgdG91Y2hfZXhpdDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fZXhpdFwiKTtcbiAgICAgICAgdGhpcy5hZF9jb250cm9sLmhpZGVfYmFubmVyQWQoKTtcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLm9uX25vZGVfa2lsbCh0aGlzLm5vZGUpO1xuICAgIH0sXG4gICAgb25Mb2FkKCkge1xuXG4gICAgfSxcblxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLnVwZGF0ZV9zY2hlZHVsZSgpO1xuICAgIH0sXG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcbn0pO1xuIl19