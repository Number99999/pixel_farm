
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ui/shop_content.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e17f8TZG8BKRJjti9x3zL2L', 'shop_content');
// script/ui/shop_content.js

"use strict";

var _user_data = _interopRequireDefault(require("user_data"));

var _config = _interopRequireDefault(require("config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

cc.Class({
  "extends": cc.Component,
  properties: {
    name_label: cc.Label,
    cost_label: cc.Label,
    need_level_label: cc.Label,
    gold_icon_node: cc.Node,
    plant_icon_frame_arr: [cc.SpriteFrame],
    land_frame: cc.SpriteFrame,
    icon_sprite: cc.Sprite,
    have_icon_node: cc.Node,
    button_tips_node: cc.Node
  },
  //初始化
  ini_node: function ini_node(type, index) {
    this.index = index;
    this.type = type;
    this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
    this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
    this.sound_control = cc.find("sound_control").getComponent("sound_control");
    this.have_icon_node.active = false;
    this.button_tips_node.active = false;
    this.update_content();
    this.update_schedule();
  },
  update_schedule: function update_schedule() {
    this.schedule(this.update_content, 0.5);
  },
  //刷新数据
  update_content: function update_content() {
    var gold = _user_data["default"].user_data.gold;
    var level = _user_data["default"].user_data.level;

    switch (this.type) {
      case "land":
        this.name_label.string = _config["default"].land[this.index].name;
        this.icon_sprite.spriteFrame = this.land_frame;

        if (_user_data["default"].user_data.land[this.index].have == 1) {
          this.button_tips_node.active = false;
          this.cost_label.node.active = false;
          this.have_icon_node.active = true;
          this.need_level_label.node.active = false;
          this.gold_icon_node.active = false;
        } else {
          this.need_level_label.node.active = true;
          this.gold_icon_node.active = true;
          this.need_level_label.string = "Level " + _config["default"].land[this.index].need_level + " to unlock";

          if (level >= _config["default"].land[this.index].need_level) {
            this.cost_label.string = _config["default"].land[this.index].cost;
          } else {
            this.cost_label.string = "???";
          }

          ; //可以购买给与提示

          if (level >= _config["default"].land[this.index].need_level && gold >= _config["default"].land[this.index].cost) {
            this.button_tips_node.active = true;
          } else {
            this.button_tips_node.active = false;
          }

          ;
        }

        ;
        break;

      case "plant":
        this.name_label.string = _config["default"].plant[this.index].name;
        this.icon_sprite.spriteFrame = this.plant_icon_frame_arr[this.index];

        if (_user_data["default"].user_data.plant[this.index].have == 1) {
          this.button_tips_node.active = false;
          this.cost_label.node.active = false;
          this.have_icon_node.active = true;
          this.need_level_label.node.active = false;
          this.gold_icon_node.active = false;
        } else {
          this.gold_icon_node.active = true;
          this.need_level_label.node.active = true;
          this.need_level_label.string = "Need " + _config["default"].plant[this.index].need_level + " level unlock"; //等级满足显示金币消耗

          if (level >= _config["default"].plant[this.index].need_level) {
            this.cost_label.string = _config["default"].plant[this.index].cost;
          } else {
            this.cost_label.string = "???";
          }

          ; //可以购买给与提示

          if (level >= _config["default"].plant[this.index].need_level && gold >= _config["default"].plant[this.index].cost) {
            this.button_tips_node.active = true;
          } else {
            this.button_tips_node.active = false;
          }
        }

        ;
        break;
    }

    ;
  },
  on_button_click: function on_button_click() {
    this.sound_control.play_sound_effect("button_click");
    this.game_scene_js.create_shop_buy_ui(this.type, this.index, this.icon_sprite.spriteFrame);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcc2hvcF9jb250ZW50LmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwibmFtZV9sYWJlbCIsIkxhYmVsIiwiY29zdF9sYWJlbCIsIm5lZWRfbGV2ZWxfbGFiZWwiLCJnb2xkX2ljb25fbm9kZSIsIk5vZGUiLCJwbGFudF9pY29uX2ZyYW1lX2FyciIsIlNwcml0ZUZyYW1lIiwibGFuZF9mcmFtZSIsImljb25fc3ByaXRlIiwiU3ByaXRlIiwiaGF2ZV9pY29uX25vZGUiLCJidXR0b25fdGlwc19ub2RlIiwiaW5pX25vZGUiLCJ0eXBlIiwiaW5kZXgiLCJnYW1lX3NjZW5lX2pzIiwiZmluZCIsImdldENvbXBvbmVudCIsImdhbWVfcnVsZXNfanMiLCJzb3VuZF9jb250cm9sIiwiYWN0aXZlIiwidXBkYXRlX2NvbnRlbnQiLCJ1cGRhdGVfc2NoZWR1bGUiLCJzY2hlZHVsZSIsImdvbGQiLCJ1c2VyX2RhdGEiLCJsZXZlbCIsInN0cmluZyIsImNvbmZpZyIsImxhbmQiLCJuYW1lIiwic3ByaXRlRnJhbWUiLCJoYXZlIiwibm9kZSIsIm5lZWRfbGV2ZWwiLCJjb3N0IiwicGxhbnQiLCJvbl9idXR0b25fY2xpY2siLCJwbGF5X3NvdW5kX2VmZmVjdCIsImNyZWF0ZV9zaG9wX2J1eV91aSIsInN0YXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7O0FBQ0FBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxVQUFVLEVBQUVKLEVBQUUsQ0FBQ0ssS0FEUDtBQUVSQyxJQUFBQSxVQUFVLEVBQUVOLEVBQUUsQ0FBQ0ssS0FGUDtBQUdSRSxJQUFBQSxnQkFBZ0IsRUFBRVAsRUFBRSxDQUFDSyxLQUhiO0FBSVJHLElBQUFBLGNBQWMsRUFBRVIsRUFBRSxDQUFD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QVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB1c2VyX2RhdGEgZnJvbSBcInVzZXJfZGF0YVwiO1xyXG5pbXBvcnQgY29uZmlnIGZyb20gXCJjb25maWdcIjtcclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBuYW1lX2xhYmVsOiBjYy5MYWJlbCxcclxuICAgICAgICBjb3N0X2xhYmVsOiBjYy5MYWJlbCxcclxuICAgICAgICBuZWVkX2xldmVsX2xhYmVsOiBjYy5MYWJlbCxcclxuICAgICAgICBnb2xkX2ljb25fbm9kZTogY2MuTm9kZSxcclxuICAgICAgICBwbGFudF9pY29uX2ZyYW1lX2FycjogW2NjLlNwcml0ZUZyYW1lXSxcclxuICAgICAgICBsYW5kX2ZyYW1lOiBjYy5TcHJpdGVGcmFtZSxcclxuICAgICAgICBpY29uX3Nwcml0ZTogY2MuU3ByaXRlLFxyXG4gICAgICAgIGhhdmVfaWNvbl9ub2RlOiBjYy5Ob2RlLFxyXG4gICAgICAgIGJ1dHRvbl90aXBzX25vZGU6IGNjLk5vZGUsXHJcbiAgICB9LFxyXG4gICAgLy/liJ3lp4vljJZcclxuICAgIGluaV9ub2RlKHR5cGUsIGluZGV4KSB7XHJcbiAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xyXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9zY2VuZVwiKTtcclxuICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJnYW1lX3J1bGVzXCIpO1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbCA9IGNjLmZpbmQoXCJzb3VuZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcInNvdW5kX2NvbnRyb2xcIik7XHJcbiAgICAgICAgdGhpcy5oYXZlX2ljb25fbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmJ1dHRvbl90aXBzX25vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy51cGRhdGVfY29udGVudCgpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlX3NjaGVkdWxlKCk7XHJcbiAgICB9LFxyXG4gICAgdXBkYXRlX3NjaGVkdWxlKCkge1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy51cGRhdGVfY29udGVudCwgMC41KTtcclxuICAgIH0sXHJcbiAgICAvL+WIt+aWsOaVsOaNrlxyXG4gICAgdXBkYXRlX2NvbnRlbnQoKSB7XHJcbiAgICAgICAgdmFyIGdvbGQgPSB1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQ7XHJcbiAgICAgICAgdmFyIGxldmVsID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5sZXZlbDtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwibGFuZFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5uYW1lX2xhYmVsLnN0cmluZyA9IGNvbmZpZy5sYW5kW3RoaXMuaW5kZXhdLm5hbWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fc3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5sYW5kX2ZyYW1lO1xyXG4gICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmluZGV4XS5oYXZlID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbl90aXBzX25vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb3N0X2xhYmVsLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXZlX2ljb25fbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmVlZF9sZXZlbF9sYWJlbC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ29sZF9pY29uX25vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmVlZF9sZXZlbF9sYWJlbC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nb2xkX2ljb25fbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmVlZF9sZXZlbF9sYWJlbC5zdHJpbmcgPSBcIkxldmVsIFwiICsgY29uZmlnLmxhbmRbdGhpcy5pbmRleF0ubmVlZF9sZXZlbCArIFwiIHRvIHVubG9ja1wiO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAobGV2ZWwgPj0gY29uZmlnLmxhbmRbdGhpcy5pbmRleF0ubmVlZF9sZXZlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvc3RfbGFiZWwuc3RyaW5nID0gY29uZmlnLmxhbmRbdGhpcy5pbmRleF0uY29zdDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvc3RfbGFiZWwuc3RyaW5nID0gXCI/Pz9cIjtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL+WPr+S7pei0reS5sOe7meS4juaPkOekulxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsZXZlbCA+PSBjb25maWcubGFuZFt0aGlzLmluZGV4XS5uZWVkX2xldmVsICYmIGdvbGQgPj0gY29uZmlnLmxhbmRbdGhpcy5pbmRleF0uY29zdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbl90aXBzX25vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbl90aXBzX25vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInBsYW50XCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5hbWVfbGFiZWwuc3RyaW5nID0gY29uZmlnLnBsYW50W3RoaXMuaW5kZXhdLm5hbWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fc3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5wbGFudF9pY29uX2ZyYW1lX2Fyclt0aGlzLmluZGV4XTtcclxuICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLnBsYW50W3RoaXMuaW5kZXhdLmhhdmUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uX3RpcHNfbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvc3RfbGFiZWwubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhdmVfaWNvbl9ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZWVkX2xldmVsX2xhYmVsLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nb2xkX2ljb25fbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nb2xkX2ljb25fbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmVlZF9sZXZlbF9sYWJlbC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZWVkX2xldmVsX2xhYmVsLnN0cmluZyA9IFwiTmVlZCBcIiArIGNvbmZpZy5wbGFudFt0aGlzLmluZGV4XS5uZWVkX2xldmVsICsgXCIgbGV2ZWwgdW5sb2NrXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8v562J57qn5ruh6Laz5pi+56S66YeR5biB5raI6ICXXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxldmVsID49IGNvbmZpZy5wbGFudFt0aGlzLmluZGV4XS5uZWVkX2xldmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29zdF9sYWJlbC5zdHJpbmcgPSBjb25maWcucGxhbnRbdGhpcy5pbmRleF0uY29zdDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvc3RfbGFiZWwuc3RyaW5nID0gXCI/Pz9cIjtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL+WPr+S7pei0reS5sOe7meS4juaPkOekulxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsZXZlbCA+PSBjb25maWcucGxhbnRbdGhpcy5pbmRleF0ubmVlZF9sZXZlbCAmJiBnb2xkID49IGNvbmZpZy5wbGFudFt0aGlzLmluZGV4XS5jb3N0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uX3RpcHNfbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uX3RpcHNfbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBvbl9idXR0b25fY2xpY2soKSB7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xyXG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfc2hvcF9idXlfdWkodGhpcy50eXBlLCB0aGlzLmluZGV4LCB0aGlzLmljb25fc3ByaXRlLnNwcml0ZUZyYW1lKTtcclxuICAgIH0sXHJcbiAgICAvLyBvbkxvYWQgKCkge30sXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcclxufSk7XHJcbiJdfQ==