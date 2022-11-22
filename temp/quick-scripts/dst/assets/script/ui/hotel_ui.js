
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
    this.ad_control.hide_bannerAd();
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
        this.ad_control.hide_bannerAd();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcaG90ZWxfdWkuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJsb2NrX2dyb3VwX25vZGUiLCJOb2RlIiwibGFiZWxfZ3JvdXBfbm9kZSIsImhvdGVsX2VqZWN0X25vZGUiLCJidXlfdGl0dGxlX2xhYmVsIiwiTGFiZWwiLCJjb3N0X2xhYmVsIiwiaW9jbl9mcmFtZV9hcnIiLCJTcHJpdGVGcmFtZSIsImJ1eV9idXR0b25fbm9kZSIsImluaV9ub2RlIiwiZ2FtZV9zY2VuZV9qcyIsImZpbmQiLCJnZXRDb21wb25lbnQiLCJnYW1lX3J1bGVzX2pzIiwiYWRfY29udHJvbCIsInNvdW5kX2NvbnRyb2wiLCJhZF9jYXIiLCJpIiwiY2hpbGRyZW4iLCJsZW5ndGgiLCJ1c2VyX2RhdGEiLCJob3RlbCIsImhhdmUiLCJhY3RpdmUiLCJTcHJpdGUiLCJzcHJpdGVGcmFtZSIsIkJ1dHRvbiIsImludGVyYWN0YWJsZSIsInN0cmluZyIsImNvbmZpZyIsIm5lZWRfbGV2ZWwiLCJzaG93X2Jhbm5lckFkIiwiaW5pX2hvdGVsX2VqZWN0IiwiaW5kZXgiLCJyb29tX2luZGV4IiwicHJvZHVjZV90aW1lIiwicHJvZHVjZSIsImNvc3QiLCJvbl9sb2NrX2J1dHRvbl9jbGljayIsImUiLCJsZXZlbCIsInBsYXlfc291bmRfZWZmZWN0IiwiY3JlYXRlX2FkX2NhciIsImNyZWF0ZV90aXBzX3VpIiwibm9kZSIsIm9uX3RvdWNoX2V4aXRfY2xpY2siLCJoaWRlX2Jhbm5lckFkIiwib25fbm9kZV9raWxsIiwib25faG90ZWxfZWplY3RfZXhpdF9jbGljayIsImRlc3Ryb3kiLCJvbl9idXlfYnV0dG9uX2NsaWNrIiwiZ29sZCIsImFkZF9nb2xkIiwiaG90ZWxfYnV5X3Jvb20iLCJhbGxfY2FwYWNpdHkiLCJza2lsbCIsInByaWNlX2RpZmZlcmVuY2UiLCJzdGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7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cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHVzZXJfZGF0YSBmcm9tIFwidXNlcl9kYXRhXCI7XHJcbmltcG9ydCBjb25maWcgZnJvbSBcImNvbmZpZ1wiO1xyXG5cclxuY2MuQ2xhc3Moe1xyXG5cclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgbG9ja19ncm91cF9ub2RlOiBjYy5Ob2RlLFxyXG4gICAgICAgIGxhYmVsX2dyb3VwX25vZGU6IGNjLk5vZGUsXHJcbiAgICAgICAgaG90ZWxfZWplY3Rfbm9kZTogY2MuTm9kZSxcclxuICAgICAgICBidXlfdGl0dGxlX2xhYmVsOiBjYy5MYWJlbCxcclxuICAgICAgICBjb3N0X2xhYmVsOiBjYy5MYWJlbCxcclxuICAgICAgICBpb2NuX2ZyYW1lX2FycjogW2NjLlNwcml0ZUZyYW1lXSxcclxuICAgICAgICBidXlfYnV0dG9uX25vZGU6IGNjLk5vZGUsXHJcbiAgICB9LFxyXG5cclxuICAgIC8v5Yid5aeL5YyW6IqC54K5XHJcbiAgICBpbmlfbm9kZSgpIHtcclxuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJnYW1lX3NjZW5lXCIpO1xyXG4gICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfcnVsZXNcIik7XHJcbiAgICAgICAgdGhpcy5hZF9jb250cm9sID0gY2MuZmluZChcImFkX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwiYWRfY29udHJvbFwiKTtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wgPSBjYy5maW5kKFwic291bmRfY29udHJvbFwiKS5nZXRDb21wb25lbnQoXCJzb3VuZF9jb250cm9sXCIpO1xyXG4gICAgICAgIHRoaXMuYWRfY2FyID0gbnVsbDtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubG9ja19ncm91cF9ub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmhvdGVsW2ldLmhhdmUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbF9ncm91cF9ub2RlLmNoaWxkcmVuW2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ob3RlbF9lamVjdF9ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2NrX2dyb3VwX25vZGUuY2hpbGRyZW5baV0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmlvY25fZnJhbWVfYXJyWzFdO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbF9ncm91cF9ub2RlLmNoaWxkcmVuW2ldLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvY2tfZ3JvdXBfbm9kZS5jaGlsZHJlbltpXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuaW9jbl9mcmFtZV9hcnJbMF07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvY2tfZ3JvdXBfbm9kZS5jaGlsZHJlbltpXS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbF9ncm91cF9ub2RlLmNoaWxkcmVuW2ldLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gY29uZmlnLmhvdGVsW2ldLm5lZWRfbGV2ZWw7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmFkX2NvbnRyb2wuc2hvd19iYW5uZXJBZCgpO1xyXG4gICAgfSxcclxuICAgIC8v5Yid5aeL5YyW5by55Ye655WM6Z2iXHJcbiAgICBpbmlfaG90ZWxfZWplY3QoaW5kZXgpIHtcclxuICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5ob3RlbFtpbmRleF0uaGF2ZSA9PSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnV5X2J1dHRvbl9ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnV5X2J1dHRvbl9ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmJ1eV90aXR0bGVfbGFiZWwuc3RyaW5nID0gXCJSZW50IGEgaG91c2UgZXZlcnkgb3RoZXJcIiArIGNvbmZpZy5ob3RlbFt0aGlzLnJvb21faW5kZXhdLnByb2R1Y2VfdGltZSArIFwic2Vjb25kcyB0byBnZXRcIiArIGNvbmZpZy5ob3RlbFt0aGlzLnJvb21faW5kZXhdLnByb2R1Y2UgKyBcImdvbGRcIjtcclxuICAgICAgICB0aGlzLmNvc3RfbGFiZWwuc3RyaW5nID0gY29uZmlnLmhvdGVsW3RoaXMucm9vbV9pbmRleF0uY29zdDtcclxuICAgIH0sXHJcbiAgICAvL29uIGxvY2sgYnV0dG9uIGNsaWNrXHJcbiAgICBvbl9sb2NrX2J1dHRvbl9jbGljayhlLCBpbmRleCkge1xyXG4gICAgICAgIHRoaXMucm9vbV9pbmRleCA9IGluZGV4O1xyXG4gICAgICAgIHZhciBsZXZlbCA9IHVzZXJfZGF0YS51c2VyX2RhdGEubGV2ZWw7XHJcbiAgICAgICAgaWYgKGxldmVsID49IGNvbmZpZy5ob3RlbFtpbmRleF0ubmVlZF9sZXZlbCkge1xyXG4gICAgICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fY2xpY2tcIik7XHJcbiAgICAgICAgICAgIHRoaXMuaG90ZWxfZWplY3Rfbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmluaV9ob3RlbF9lamVjdChpbmRleCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlX2FkX2NhcigpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcInVuX2NsaWNrXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIFwibm9fbGV2ZWxcIik7XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvL3RvdWNoIGV4aXRcclxuICAgIG9uX3RvdWNoX2V4aXRfY2xpY2soZSkge1xyXG4gICAgICAgIHRoaXMuYWRfY29udHJvbC5oaWRlX2Jhbm5lckFkKCk7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2V4aXRcIik7XHJcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLm9uX25vZGVfa2lsbCh0aGlzLm5vZGUpO1xyXG4gICAgfSxcclxuICAgIC8vaG90ZWxfZWplY3QgZXhpdFxyXG4gICAgb25faG90ZWxfZWplY3RfZXhpdF9jbGljaygpIHtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fZXhpdFwiKTtcclxuICAgICAgICBpZiAodGhpcy5hZF9jYXIgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5hZF9jYXIuZGVzdHJveSgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5ob3RlbF9lamVjdF9ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfSxcclxuICAgIC8v6LSt5Lmw5oyJ6ZKu6KKr54K55Ye7XHJcbiAgICBvbl9idXlfYnV0dG9uX2NsaWNrKCkge1xyXG4gICAgICAgIHZhciBnb2xkID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkO1xyXG4gICAgICAgIHZhciBjb3N0ID0gY29uZmlnLmhvdGVsW3RoaXMucm9vbV9pbmRleF0uY29zdFxyXG4gICAgICAgIGlmIChnb2xkID49IGNvc3QpIHtcclxuICAgICAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIFwiYnV5X3N1Y2Nlc1wiKTtcclxuICAgICAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLmFkZF9nb2xkKC1jb3N0KTtcclxuICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5ob3RlbFt0aGlzLnJvb21faW5kZXhdLmhhdmUgPSAxO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMuaG90ZWxfYnV5X3Jvb20odGhpcy5yb29tX2luZGV4KTtcclxuICAgICAgICAgICAgdGhpcy5pbmlfbm9kZSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcInVuX2NsaWNrXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIFwibm9fbW9uZXlfZ29sZFwiKTtcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8v5Yib5bu6YWRfY2FyXHJcbiAgICBjcmVhdGVfYWRfY2FyKCkge1xyXG4gICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmhvdGVsW3RoaXMucm9vbV9pbmRleF0uaGF2ZSAhPSAxKSB7XHJcbiAgICAgICAgICAgIHZhciBnb2xkID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkO1xyXG4gICAgICAgICAgICB2YXIgYWxsX2NhcGFjaXR5ID0gNTAwICogdXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbFtcImdvbGRfbWF4XCJdICsgNTAwO1xyXG4gICAgICAgICAgICB2YXIgY29zdCA9IChjb25maWcuaG90ZWxbdGhpcy5yb29tX2luZGV4XS5jb3N0KTtcclxuICAgICAgICAgICAgLy/lt67ku7dcclxuICAgICAgICAgICAgdmFyIHByaWNlX2RpZmZlcmVuY2UgPSBjb3N0IC0gZ29sZDtcclxuICAgICAgICAgICAgLy/lpKfkuo40LzUs5LiU6IO95aSf5oul5pyJ77yM5LiU6YeR5biB5LiN6LazXHJcbiAgICAgICAgICAgIGlmIChnb2xkID49IGNvc3QgKiAoNCAvIDUpICYmIGFsbF9jYXBhY2l0eSA+PSBjb3N0ICYmIGdvbGQgPCBjb3N0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkX2NvbnRyb2wuaGlkZV9iYW5uZXJBZCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZF9jYXIgPSB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX2FkX2Nhcih0aGlzLm5vZGUsIHByaWNlX2RpZmZlcmVuY2UpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuICAgIC8vIG9uTG9hZCAoKSB7fSxcclxuXHJcbiAgICBzdGFydCgpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxyXG59KTtcclxuIl19