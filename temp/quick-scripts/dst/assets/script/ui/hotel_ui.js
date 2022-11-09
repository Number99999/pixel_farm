
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcaG90ZWxfdWkuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJsb2NrX2dyb3VwX25vZGUiLCJOb2RlIiwibGFiZWxfZ3JvdXBfbm9kZSIsImhvdGVsX2VqZWN0X25vZGUiLCJidXlfdGl0dGxlX2xhYmVsIiwiTGFiZWwiLCJjb3N0X2xhYmVsIiwiaW9jbl9mcmFtZV9hcnIiLCJTcHJpdGVGcmFtZSIsImJ1eV9idXR0b25fbm9kZSIsImluaV9ub2RlIiwiZ2FtZV9zY2VuZV9qcyIsImZpbmQiLCJnZXRDb21wb25lbnQiLCJnYW1lX3J1bGVzX2pzIiwiYWRfY29udHJvbCIsInNvdW5kX2NvbnRyb2wiLCJhZF9jYXIiLCJpIiwiY2hpbGRyZW4iLCJsZW5ndGgiLCJ1c2VyX2RhdGEiLCJob3RlbCIsImhhdmUiLCJhY3RpdmUiLCJTcHJpdGUiLCJzcHJpdGVGcmFtZSIsIkJ1dHRvbiIsImludGVyYWN0YWJsZSIsInN0cmluZyIsImNvbmZpZyIsIm5lZWRfbGV2ZWwiLCJpbmlfaG90ZWxfZWplY3QiLCJpbmRleCIsInJvb21faW5kZXgiLCJwcm9kdWNlX3RpbWUiLCJwcm9kdWNlIiwiY29zdCIsIm9uX2xvY2tfYnV0dG9uX2NsaWNrIiwiZSIsImxldmVsIiwicGxheV9zb3VuZF9lZmZlY3QiLCJjcmVhdGVfYWRfY2FyIiwiY3JlYXRlX3RpcHNfdWkiLCJub2RlIiwib25fdG91Y2hfZXhpdF9jbGljayIsIm9uX25vZGVfa2lsbCIsIm9uX2hvdGVsX2VqZWN0X2V4aXRfY2xpY2siLCJkZXN0cm95Iiwib25fYnV5X2J1dHRvbl9jbGljayIsImdvbGQiLCJhZGRfZ29sZCIsImhvdGVsX2J1eV9yb29tIiwiYWxsX2NhcGFjaXR5Iiwic2tpbGwiLCJwcmljZV9kaWZmZXJlbmNlIiwic3RhcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFFQUEsRUFB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LGNBQW5CLENBQWtDLEtBQUtoQyxhQUFMLENBQW1CaUMsSUFBckQsRUFBMkQsZUFBM0Q7QUFDSDs7QUFBQTtBQUNKLEdBeEZJO0FBeUZMO0FBQ0FGLEVBQUFBLGFBMUZLLDJCQTBGVztBQUNaLFFBQUlyQixzQkFBVUEsU0FBVixDQUFvQkMsS0FBcEIsQ0FBMEIsS0FBS1ksVUFBL0IsRUFBMkNYLElBQTNDLElBQW1ELENBQXZELEVBQTBEO0FBQ3RELFVBQUkyQixJQUFJLEdBQUc3QixzQkFBVUEsU0FBVixDQUFvQjZCLElBQS9CO0FBQ0EsVUFBSUcsWUFBWSxHQUFHLE1BQU1oQyxzQkFBVUEsU0FBVixDQUFvQmlDLEtBQXBCLENBQTBCLFVBQTFCLENBQU4sR0FBOEMsR0FBakU7QUFDQSxVQUFJakIsSUFBSSxHQUFJUCxtQkFBT1IsS0FBUCxDQUFhLEtBQUtZLFVBQWxCLEVBQThCRyxJQUExQyxDQUhzRCxDQUl0RDs7QUFDQSxVQUFJa0IsZ0JBQWdCLEdBQUdsQixJQUFJLEdBQUdhLElBQTlCLENBTHNELENBTXREOztBQUNBLFVBQUlBLElBQUksSUFBSWIsSUFBSSxJQUFJLElBQUksQ0FBUixDQUFaLElBQTBCZ0IsWUFBWSxJQUFJaEIsSUFBMUMsSUFBa0RhLElBQUksR0FBR2IsSUFBN0QsRUFBbUU7QUFFL0QsYUFBS3BCLE1BQUwsR0FBYyxLQUFLTixhQUFMLENBQW1CK0IsYUFBbkIsQ0FBaUMsS0FBS0UsSUFBdEMsRUFBNENXLGdCQUE1QyxDQUFkO0FBQ0g7O0FBQUE7QUFDSixLQVhELE1BV087QUFDSDtBQUNIO0FBRUosR0ExR0k7QUEyR0w7QUFFQUMsRUFBQUEsS0E3R0ssbUJBNkdHLENBRVAsQ0EvR0ksQ0FpSEw7O0FBakhLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB1c2VyX2RhdGEgZnJvbSBcInVzZXJfZGF0YVwiO1xyXG5pbXBvcnQgY29uZmlnIGZyb20gXCJjb25maWdcIjtcclxuXHJcbmNjLkNsYXNzKHtcclxuXHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGxvY2tfZ3JvdXBfbm9kZTogY2MuTm9kZSxcclxuICAgICAgICBsYWJlbF9ncm91cF9ub2RlOiBjYy5Ob2RlLFxyXG4gICAgICAgIGhvdGVsX2VqZWN0X25vZGU6IGNjLk5vZGUsXHJcbiAgICAgICAgYnV5X3RpdHRsZV9sYWJlbDogY2MuTGFiZWwsXHJcbiAgICAgICAgY29zdF9sYWJlbDogY2MuTGFiZWwsXHJcbiAgICAgICAgaW9jbl9mcmFtZV9hcnI6IFtjYy5TcHJpdGVGcmFtZV0sXHJcbiAgICAgICAgYnV5X2J1dHRvbl9ub2RlOiBjYy5Ob2RlLFxyXG4gICAgfSxcclxuXHJcbiAgICAvL+WIneWni+WMluiKgueCuVxyXG4gICAgaW5pX25vZGUoKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9zY2VuZVwiKTtcclxuICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJnYW1lX3J1bGVzXCIpO1xyXG4gICAgICAgIHRoaXMuYWRfY29udHJvbCA9IGNjLmZpbmQoXCJhZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcImFkX2NvbnRyb2xcIik7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sID0gY2MuZmluZChcInNvdW5kX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwic291bmRfY29udHJvbFwiKTtcclxuICAgICAgICB0aGlzLmFkX2NhciA9IG51bGw7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxvY2tfZ3JvdXBfbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5ob3RlbFtpXS5oYXZlID09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWxfZ3JvdXBfbm9kZS5jaGlsZHJlbltpXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaG90ZWxfZWplY3Rfbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9ja19ncm91cF9ub2RlLmNoaWxkcmVuW2ldLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5pb2NuX2ZyYW1lX2FyclsxXTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWxfZ3JvdXBfbm9kZS5jaGlsZHJlbltpXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2NrX2dyb3VwX25vZGUuY2hpbGRyZW5baV0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmlvY25fZnJhbWVfYXJyWzBdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2NrX2dyb3VwX25vZGUuY2hpbGRyZW5baV0uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWxfZ3JvdXBfbm9kZS5jaGlsZHJlbltpXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGNvbmZpZy5ob3RlbFtpXS5uZWVkX2xldmVsO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgfSxcclxuICAgIC8v5Yid5aeL5YyW5by55Ye655WM6Z2iXHJcbiAgICBpbmlfaG90ZWxfZWplY3QoaW5kZXgpIHtcclxuICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5ob3RlbFtpbmRleF0uaGF2ZSA9PSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnV5X2J1dHRvbl9ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnV5X2J1dHRvbl9ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmJ1eV90aXR0bGVfbGFiZWwuc3RyaW5nID0gXCJSZW50IGEgaG91c2UgZXZlcnkgb3RoZXJcIiArIGNvbmZpZy5ob3RlbFt0aGlzLnJvb21faW5kZXhdLnByb2R1Y2VfdGltZSArIFwic2Vjb25kcyB0byBnZXRcIiArIGNvbmZpZy5ob3RlbFt0aGlzLnJvb21faW5kZXhdLnByb2R1Y2UgKyBcImdvbGRcIjtcclxuICAgICAgICB0aGlzLmNvc3RfbGFiZWwuc3RyaW5nID0gY29uZmlnLmhvdGVsW3RoaXMucm9vbV9pbmRleF0uY29zdDtcclxuICAgIH0sXHJcbiAgICAvL29uIGxvY2sgYnV0dG9uIGNsaWNrXHJcbiAgICBvbl9sb2NrX2J1dHRvbl9jbGljayhlLCBpbmRleCkge1xyXG4gICAgICAgIHRoaXMucm9vbV9pbmRleCA9IGluZGV4O1xyXG4gICAgICAgIHZhciBsZXZlbCA9IHVzZXJfZGF0YS51c2VyX2RhdGEubGV2ZWw7XHJcbiAgICAgICAgaWYgKGxldmVsID49IGNvbmZpZy5ob3RlbFtpbmRleF0ubmVlZF9sZXZlbCkge1xyXG4gICAgICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fY2xpY2tcIik7XHJcbiAgICAgICAgICAgIHRoaXMuaG90ZWxfZWplY3Rfbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmluaV9ob3RlbF9lamVjdChpbmRleCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlX2FkX2NhcigpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcInVuX2NsaWNrXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIFwibm9fbGV2ZWxcIik7XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvL3RvdWNoIGV4aXRcclxuICAgIG9uX3RvdWNoX2V4aXRfY2xpY2soZSkge1xyXG5cclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fZXhpdFwiKTtcclxuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMub25fbm9kZV9raWxsKHRoaXMubm9kZSk7XHJcbiAgICB9LFxyXG4gICAgLy9ob3RlbF9lamVjdCBleGl0XHJcbiAgICBvbl9ob3RlbF9lamVjdF9leGl0X2NsaWNrKCkge1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9leGl0XCIpO1xyXG4gICAgICAgIGlmICh0aGlzLmFkX2NhciAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLmFkX2Nhci5kZXN0cm95KCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmhvdGVsX2VqZWN0X25vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9LFxyXG4gICAgLy/otK3kubDmjInpkq7ooqvngrnlh7tcclxuICAgIG9uX2J1eV9idXR0b25fY2xpY2soKSB7XHJcbiAgICAgICAgdmFyIGdvbGQgPSB1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQ7XHJcbiAgICAgICAgdmFyIGNvc3QgPSBjb25maWcuaG90ZWxbdGhpcy5yb29tX2luZGV4XS5jb3N0XHJcbiAgICAgICAgaWYgKGdvbGQgPj0gY29zdCkge1xyXG4gICAgICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fY2xpY2tcIik7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfc2NlbmVfanMubm9kZSwgXCJidXlfc3VjY2VzXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMuYWRkX2dvbGQoLWNvc3QpO1xyXG4gICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmhvdGVsW3RoaXMucm9vbV9pbmRleF0uaGF2ZSA9IDE7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcy5ob3RlbF9idXlfcm9vbSh0aGlzLnJvb21faW5kZXgpO1xyXG4gICAgICAgICAgICB0aGlzLmluaV9ub2RlKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwidW5fY2xpY2tcIik7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfc2NlbmVfanMubm9kZSwgXCJub19tb25leV9nb2xkXCIpO1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLy/liJvlu7phZF9jYXJcclxuICAgIGNyZWF0ZV9hZF9jYXIoKSB7XHJcbiAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEuaG90ZWxbdGhpcy5yb29tX2luZGV4XS5oYXZlICE9IDEpIHtcclxuICAgICAgICAgICAgdmFyIGdvbGQgPSB1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQ7XHJcbiAgICAgICAgICAgIHZhciBhbGxfY2FwYWNpdHkgPSA1MDAgKiB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1wiZ29sZF9tYXhcIl0gKyA1MDA7XHJcbiAgICAgICAgICAgIHZhciBjb3N0ID0gKGNvbmZpZy5ob3RlbFt0aGlzLnJvb21faW5kZXhdLmNvc3QpO1xyXG4gICAgICAgICAgICAvL+W3ruS7t1xyXG4gICAgICAgICAgICB2YXIgcHJpY2VfZGlmZmVyZW5jZSA9IGNvc3QgLSBnb2xkO1xyXG4gICAgICAgICAgICAvL+Wkp+S6jjQvNSzkuJTog73lpJ/mi6XmnInvvIzkuJTph5HluIHkuI3otrNcclxuICAgICAgICAgICAgaWYgKGdvbGQgPj0gY29zdCAqICg0IC8gNSkgJiYgYWxsX2NhcGFjaXR5ID49IGNvc3QgJiYgZ29sZCA8IGNvc3QpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkX2NhciA9IHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfYWRfY2FyKHRoaXMubm9kZSwgcHJpY2VfZGlmZmVyZW5jZSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG4gICAgLy8gb25Mb2FkICgpIHt9LFxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pO1xyXG4iXX0=