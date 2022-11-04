
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ui/hotel_ui.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5bf73DluuJHfry1ENZ/Ms5R', 'hotel_ui');
// script/ui/hotel_ui.js

"use strict";

var _user_data = _interopRequireDefault(require("user_data"));

var _config = _interopRequireDefault(require("config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

cc.Class({
  "extends": cc.Component,
  properties: {
    lock_group_node: cc.Node,
    label_group_node: cc.Node,
    hotel_eject_node: cc.Node,
    buy_tittle_label: cc.Label,
    cost_label: cc.Label,
    iocn_frame_arr: [cc.SpriteFrame],
    buy_button_node: cc.Node
  },
  //初始化节点
  ini_node: function ini_node() {
    this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
    this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
    this.ad_control = cc.find("ad_control").getComponent("ad_control");
    this.sound_control = cc.find("sound_control").getComponent("sound_control");
    this.ad_car = null;

    for (var i = 0; i < this.lock_group_node.children.length; i++) {
      if (_user_data["default"].user_data.hotel[i].have == 1) {
        this.label_group_node.children[i].active = false;
        this.hotel_eject_node.active = false;
        this.lock_group_node.children[i].getComponent(cc.Sprite).spriteFrame = this.iocn_frame_arr[1];
      } else {
        this.label_group_node.children[i].active = true;
        this.lock_group_node.children[i].getComponent(cc.Sprite).spriteFrame = this.iocn_frame_arr[0];
        this.lock_group_node.children[i].getComponent(cc.Button).interactable = true;
        this.label_group_node.children[i].getComponent(cc.Label).string = _config["default"].hotel[i].need_level;
      }

      ;
    }

    ;
    this.ad_control.show_bannerAd();
  },
  //初始化弹出界面
  ini_hotel_eject: function ini_hotel_eject(index) {
    if (_user_data["default"].user_data.hotel[index].have == 1) {
      this.buy_button_node.active = false;
    } else {
      this.buy_button_node.active = true;
    }

    ;
    this.buy_tittle_label.string = "Rent a house every other" + _config["default"].hotel[this.room_index].produce_time + "seconds to get" + _config["default"].hotel[this.room_index].produce + "gold";
    this.cost_label.string = _config["default"].hotel[this.room_index].cost;
  },
  //on lock button click
  on_lock_button_click: function on_lock_button_click(e, index) {
    this.room_index = index;
    var level = _user_data["default"].user_data.level;

    if (level >= _config["default"].hotel[index].need_level) {
      this.sound_control.play_sound_effect("button_click");
      this.hotel_eject_node.active = true;
      this.ini_hotel_eject(index);
      this.create_ad_car();
    } else {
      this.sound_control.play_sound_effect("un_click");
      this.game_scene_js.create_tips_ui(this.game_scene_js.node, "no_level");
    }

    ;
  },
  //touch exit
  on_touch_exit_click: function on_touch_exit_click(e) {
    this.sound_control.play_sound_effect("button_exit");
    this.game_scene_js.on_node_kill(this.node);
  },
  //hotel_eject exit
  on_hotel_eject_exit_click: function on_hotel_eject_exit_click() {
    this.sound_control.play_sound_effect("button_exit");

    if (this.ad_car !== null) {
      this.ad_car.destroy();
    }

    ;
    this.hotel_eject_node.active = false;
  },
  //购买按钮被点击
  on_buy_button_click: function on_buy_button_click() {
    var gold = _user_data["default"].user_data.gold;
    var cost = _config["default"].hotel[this.room_index].cost;

    if (gold >= cost) {
      this.sound_control.play_sound_effect("button_click");
      this.game_scene_js.create_tips_ui(this.game_scene_js.node, "buy_succes");
      this.game_rules_js.add_gold(-cost);
      _user_data["default"].user_data.hotel[this.room_index].have = 1;
      this.game_rules_js.hotel_buy_room(this.room_index);
      this.ini_node();
    } else {
      this.sound_control.play_sound_effect("un_click");
      this.game_scene_js.create_tips_ui(this.game_scene_js.node, "no_money_gold");
    }

    ;
  },
  //创建ad_car
  create_ad_car: function create_ad_car() {
    if (_user_data["default"].user_data.hotel[this.room_index].have != 1) {
      var gold = _user_data["default"].user_data.gold;
      var all_capacity = 500 * _user_data["default"].user_data.skill["gold_max"] + 500;
      var cost = _config["default"].hotel[this.room_index].cost; //差价

      var price_difference = cost - gold; //大于4/5,且能够拥有，且金币不足

      if (gold >= cost * (4 / 5) && all_capacity >= cost && gold < cost) {
        this.ad_car = this.game_scene_js.create_ad_car(this.node, price_difference);
      }

      ;
    } else {
      return;
    }
  },
  // onLoad () {},
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcaG90ZWxfdWkuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJsb2NrX2dyb3VwX25vZGUiLCJOb2RlIiwibGFiZWxfZ3JvdXBfbm9kZSIsImhvdGVsX2VqZWN0X25vZGUiLCJidXlfdGl0dGxlX2xhYmVsIiwiTGFiZWwiLCJjb3N0X2xhYmVsIiwiaW9jbl9mcmFtZV9hcnIiLCJTcHJpdGVGcmFtZSIsImJ1eV9idXR0b25fbm9kZSIsImluaV9ub2RlIiwiZ2FtZV9zY2VuZV9qcyIsImZpbmQiLCJnZXRDb21wb25lbnQiLCJnYW1lX3J1bGVzX2pzIiwiYWRfY29udHJvbCIsInNvdW5kX2NvbnRyb2wiLCJhZF9jYXIiLCJpIiwiY2hpbGRyZW4iLCJsZW5ndGgiLCJ1c2VyX2RhdGEiLCJob3RlbCIsImhhdmUiLCJhY3RpdmUiLCJTcHJpdGUiLCJzcHJpdGVGcmFtZSIsIkJ1dHRvbiIsImludGVyYWN0YWJsZSIsInN0cmluZyIsImNvbmZpZyIsIm5lZWRfbGV2ZWwiLCJzaG93X2Jhbm5lckFkIiwiaW5pX2hvdGVsX2VqZWN0IiwiaW5kZXgiLCJyb29tX2luZGV4IiwicHJvZHVjZV90aW1lIiwicHJvZHVjZSIsImNvc3QiLCJvbl9sb2NrX2J1dHRvbl9jbGljayIsImUiLCJsZXZlbCIsInBsYXlfc291bmRfZWZmZWN0IiwiY3JlYXRlX2FkX2NhciIsImNyZWF0ZV90aXBzX3VpIiwibm9kZSIsIm9uX3RvdWNoX2V4aXRfY2xpY2siLCJvbl9ub2RlX2tpbGwiLCJvbl9ob3RlbF9lamVjdF9leGl0X2NsaWNrIiwiZGVzdHJveSIsIm9uX2J1eV9idXR0b25fY2xpY2siLCJnb2xkIiwiYWRkX2dvbGQiLCJob3RlbF9idXlfcm9vbSIsImFsbF9jYXBhY2l0eSIsInNraWxsIiwicHJpY2VfZGlmZmVyZW5jZSIsInN0YXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztB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QjBCLGlCQUFuQixDQUFxQyxVQUFyQztBQUNBLFdBQUsvQixhQUFMLENBQW1CaUMsY0FBbkIsQ0FBa0MsS0FBS2pDLGFBQUwsQ0FBbUJrQyxJQUFyRCxFQUEyRCxlQUEzRDtBQUNIOztBQUFBO0FBQ0osR0F4Rkk7QUF5Rkw7QUFDQUYsRUFBQUEsYUExRkssMkJBMEZXO0FBQ1osUUFBSXRCLHNCQUFVQSxTQUFWLENBQW9CQyxLQUFwQixDQUEwQixLQUFLYSxVQUEvQixFQUEyQ1osSUFBM0MsSUFBbUQsQ0FBdkQsRUFBMEQ7QUFDdEQsVUFBSTRCLElBQUksR0FBRzlCLHNCQUFVQSxTQUFWLENBQW9COEIsSUFBL0I7QUFDQSxVQUFJRyxZQUFZLEdBQUcsTUFBTWpDLHNCQUFVQSxTQUFWLENBQW9Ca0MsS0FBcEIsQ0FBMEIsVUFBMUIsQ0FBTixHQUE4QyxHQUFqRTtBQUNBLFVBQUlqQixJQUFJLEdBQUlSLG1CQUFPUixLQUFQLENBQWEsS0FBS2EsVUFBbEIsRUFBOEJHLElBQTFDLENBSHNELENBSXREOztBQUNBLFVBQUlrQixnQkFBZ0IsR0FBR2xCLElBQUksR0FBR2EsSUFBOUIsQ0FMc0QsQ0FNdEQ7O0FBQ0EsVUFBSUEsSUFBSSxJQUFJYixJQUFJLElBQUksSUFBSSxDQUFSLENBQVosSUFBMEJnQixZQUFZLElBQUloQixJQUExQyxJQUFrRGEsSUFBSSxHQUFHYixJQUE3RCxFQUFtRTtBQUUvRCxhQUFLckIsTUFBTCxHQUFjLEtBQUtOLGFBQUwsQ0FBbUJnQyxhQUFuQixDQUFpQyxLQUFLRSxJQUF0QyxFQUE0Q1csZ0JBQTVDLENBQWQ7QUFDSDs7QUFBQTtBQUNKLEtBWEQsTUFXTztBQUNIO0FBQ0g7QUFFSixHQTFHSTtBQTJHTDtBQUVBQyxFQUFBQSxLQTdHSyxtQkE2R0csQ0FFUCxDQS9HSSxDQWlITDs7QUFqSEssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHVzZXJfZGF0YSBmcm9tIFwidXNlcl9kYXRhXCI7XHJcbmltcG9ydCBjb25maWcgZnJvbSBcImNvbmZpZ1wiO1xyXG5cclxuY2MuQ2xhc3Moe1xyXG5cclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgbG9ja19ncm91cF9ub2RlOiBjYy5Ob2RlLFxyXG4gICAgICAgIGxhYmVsX2dyb3VwX25vZGU6IGNjLk5vZGUsXHJcbiAgICAgICAgaG90ZWxfZWplY3Rfbm9kZTogY2MuTm9kZSxcclxuICAgICAgICBidXlfdGl0dGxlX2xhYmVsOiBjYy5MYWJlbCxcclxuICAgICAgICBjb3N0X2xhYmVsOiBjYy5MYWJlbCxcclxuICAgICAgICBpb2NuX2ZyYW1lX2FycjogW2NjLlNwcml0ZUZyYW1lXSxcclxuICAgICAgICBidXlfYnV0dG9uX25vZGU6IGNjLk5vZGUsXHJcbiAgICB9LFxyXG5cclxuICAgIC8v5Yid5aeL5YyW6IqC54K5XHJcbiAgICBpbmlfbm9kZSgpIHtcclxuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJnYW1lX3NjZW5lXCIpO1xyXG4gICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfcnVsZXNcIik7XHJcbiAgICAgICAgdGhpcy5hZF9jb250cm9sID0gY2MuZmluZChcImFkX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwiYWRfY29udHJvbFwiKTtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wgPSBjYy5maW5kKFwic291bmRfY29udHJvbFwiKS5nZXRDb21wb25lbnQoXCJzb3VuZF9jb250cm9sXCIpO1xyXG4gICAgICAgIHRoaXMuYWRfY2FyID0gbnVsbDtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubG9ja19ncm91cF9ub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmhvdGVsW2ldLmhhdmUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbF9ncm91cF9ub2RlLmNoaWxkcmVuW2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ob3RlbF9lamVjdF9ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2NrX2dyb3VwX25vZGUuY2hpbGRyZW5baV0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmlvY25fZnJhbWVfYXJyWzFdO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbF9ncm91cF9ub2RlLmNoaWxkcmVuW2ldLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvY2tfZ3JvdXBfbm9kZS5jaGlsZHJlbltpXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuaW9jbl9mcmFtZV9hcnJbMF07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvY2tfZ3JvdXBfbm9kZS5jaGlsZHJlbltpXS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbF9ncm91cF9ub2RlLmNoaWxkcmVuW2ldLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gY29uZmlnLmhvdGVsW2ldLm5lZWRfbGV2ZWw7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmFkX2NvbnRyb2wuc2hvd19iYW5uZXJBZCgpO1xyXG4gICAgfSxcclxuICAgIC8v5Yid5aeL5YyW5by55Ye655WM6Z2iXHJcbiAgICBpbmlfaG90ZWxfZWplY3QoaW5kZXgpIHtcclxuICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5ob3RlbFtpbmRleF0uaGF2ZSA9PSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnV5X2J1dHRvbl9ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnV5X2J1dHRvbl9ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmJ1eV90aXR0bGVfbGFiZWwuc3RyaW5nID0gXCJSZW50IGEgaG91c2UgZXZlcnkgb3RoZXJcIiArIGNvbmZpZy5ob3RlbFt0aGlzLnJvb21faW5kZXhdLnByb2R1Y2VfdGltZSArIFwic2Vjb25kcyB0byBnZXRcIiArIGNvbmZpZy5ob3RlbFt0aGlzLnJvb21faW5kZXhdLnByb2R1Y2UgKyBcImdvbGRcIjtcclxuICAgICAgICB0aGlzLmNvc3RfbGFiZWwuc3RyaW5nID0gY29uZmlnLmhvdGVsW3RoaXMucm9vbV9pbmRleF0uY29zdDtcclxuICAgIH0sXHJcbiAgICAvL29uIGxvY2sgYnV0dG9uIGNsaWNrXHJcbiAgICBvbl9sb2NrX2J1dHRvbl9jbGljayhlLCBpbmRleCkge1xyXG4gICAgICAgIHRoaXMucm9vbV9pbmRleCA9IGluZGV4O1xyXG4gICAgICAgIHZhciBsZXZlbCA9IHVzZXJfZGF0YS51c2VyX2RhdGEubGV2ZWw7XHJcbiAgICAgICAgaWYgKGxldmVsID49IGNvbmZpZy5ob3RlbFtpbmRleF0ubmVlZF9sZXZlbCkge1xyXG4gICAgICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fY2xpY2tcIik7XHJcbiAgICAgICAgICAgIHRoaXMuaG90ZWxfZWplY3Rfbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmluaV9ob3RlbF9lamVjdChpbmRleCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlX2FkX2NhcigpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcInVuX2NsaWNrXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIFwibm9fbGV2ZWxcIik7XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvL3RvdWNoIGV4aXRcclxuICAgIG9uX3RvdWNoX2V4aXRfY2xpY2soZSkge1xyXG5cclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fZXhpdFwiKTtcclxuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMub25fbm9kZV9raWxsKHRoaXMubm9kZSk7XHJcbiAgICB9LFxyXG4gICAgLy9ob3RlbF9lamVjdCBleGl0XHJcbiAgICBvbl9ob3RlbF9lamVjdF9leGl0X2NsaWNrKCkge1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9leGl0XCIpO1xyXG4gICAgICAgIGlmICh0aGlzLmFkX2NhciAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLmFkX2Nhci5kZXN0cm95KCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmhvdGVsX2VqZWN0X25vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9LFxyXG4gICAgLy/otK3kubDmjInpkq7ooqvngrnlh7tcclxuICAgIG9uX2J1eV9idXR0b25fY2xpY2soKSB7XHJcbiAgICAgICAgdmFyIGdvbGQgPSB1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQ7XHJcbiAgICAgICAgdmFyIGNvc3QgPSBjb25maWcuaG90ZWxbdGhpcy5yb29tX2luZGV4XS5jb3N0XHJcbiAgICAgICAgaWYgKGdvbGQgPj0gY29zdCkge1xyXG4gICAgICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fY2xpY2tcIik7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfc2NlbmVfanMubm9kZSwgXCJidXlfc3VjY2VzXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMuYWRkX2dvbGQoLWNvc3QpO1xyXG4gICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmhvdGVsW3RoaXMucm9vbV9pbmRleF0uaGF2ZSA9IDE7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcy5ob3RlbF9idXlfcm9vbSh0aGlzLnJvb21faW5kZXgpO1xyXG4gICAgICAgICAgICB0aGlzLmluaV9ub2RlKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwidW5fY2xpY2tcIik7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfc2NlbmVfanMubm9kZSwgXCJub19tb25leV9nb2xkXCIpO1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLy/liJvlu7phZF9jYXJcclxuICAgIGNyZWF0ZV9hZF9jYXIoKSB7XHJcbiAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEuaG90ZWxbdGhpcy5yb29tX2luZGV4XS5oYXZlICE9IDEpIHtcclxuICAgICAgICAgICAgdmFyIGdvbGQgPSB1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQ7XHJcbiAgICAgICAgICAgIHZhciBhbGxfY2FwYWNpdHkgPSA1MDAgKiB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1wiZ29sZF9tYXhcIl0gKyA1MDA7XHJcbiAgICAgICAgICAgIHZhciBjb3N0ID0gKGNvbmZpZy5ob3RlbFt0aGlzLnJvb21faW5kZXhdLmNvc3QpO1xyXG4gICAgICAgICAgICAvL+W3ruS7t1xyXG4gICAgICAgICAgICB2YXIgcHJpY2VfZGlmZmVyZW5jZSA9IGNvc3QgLSBnb2xkO1xyXG4gICAgICAgICAgICAvL+Wkp+S6jjQvNSzkuJTog73lpJ/mi6XmnInvvIzkuJTph5HluIHkuI3otrNcclxuICAgICAgICAgICAgaWYgKGdvbGQgPj0gY29zdCAqICg0IC8gNSkgJiYgYWxsX2NhcGFjaXR5ID49IGNvc3QgJiYgZ29sZCA8IGNvc3QpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkX2NhciA9IHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfYWRfY2FyKHRoaXMubm9kZSwgcHJpY2VfZGlmZmVyZW5jZSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG4gICAgLy8gb25Mb2FkICgpIHt9LFxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pO1xyXG4iXX0=