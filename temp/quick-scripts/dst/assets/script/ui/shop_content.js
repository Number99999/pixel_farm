
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcc2hvcF9jb250ZW50LmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwibmFtZV9sYWJlbCIsIkxhYmVsIiwiY29zdF9sYWJlbCIsIm5lZWRfbGV2ZWxfbGFiZWwiLCJnb2xkX2ljb25fbm9kZSIsIk5vZGUiLCJwbGFudF9pY29uX2ZyYW1lX2FyciIsIlNwcml0ZUZyYW1lIiwibGFuZF9mcmFtZSIsImljb25fc3ByaXRlIiwiU3ByaXRlIiwiaGF2ZV9pY29uX25vZGUiLCJidXR0b25fdGlwc19ub2RlIiwiaW5pX25vZGUiLCJ0eXBlIiwiaW5kZXgiLCJnYW1lX3NjZW5lX2pzIiwiZmluZCIsImdldENvbXBvbmVudCIsImdhbWVfcnVsZXNfanMiLCJzb3VuZF9jb250cm9sIiwiYWN0aXZlIiwidXBkYXRlX2NvbnRlbnQiLCJ1cGRhdGVfc2NoZWR1bGUiLCJzY2hlZHVsZSIsImdvbGQiLCJ1c2VyX2RhdGEiLCJsZXZlbCIsInN0cmluZyIsImNvbmZpZyIsImxhbmQiLCJuYW1lIiwic3ByaXRlRnJhbWUiLCJoYXZlIiwibm9kZSIsIm5lZWRfbGV2ZWwiLCJjb3N0IiwicGxhbnQiLCJvbl9idXR0b25fY2xpY2siLCJwbGF5X3NvdW5kX2VmZmVjdCIsImNyZWF0ZV9zaG9wX2J1eV91aSIsInN0YXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7O0FBQ0FBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxVQUFVLEVBQUVKLEVBQUUsQ0FBQ0ssS0FEUDtBQUVSQyxJQUFBQSxVQUFVLEVBQUVOLEVBQUUsQ0FBQ0ssS0FGUDtBQUdSRSxJQUFBQSxnQkFBZ0IsRUFBRVAsRUFBRSxDQUFDSyxLQUhiO0FBSVJHLElBQUFBLGNBQWMsRUFBRVIsRUFBRSxDQUFD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QVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB1c2VyX2RhdGEgZnJvbSBcInVzZXJfZGF0YVwiO1xuaW1wb3J0IGNvbmZpZyBmcm9tIFwiY29uZmlnXCI7XG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBuYW1lX2xhYmVsOiBjYy5MYWJlbCxcbiAgICAgICAgY29zdF9sYWJlbDogY2MuTGFiZWwsXG4gICAgICAgIG5lZWRfbGV2ZWxfbGFiZWw6IGNjLkxhYmVsLFxuICAgICAgICBnb2xkX2ljb25fbm9kZTogY2MuTm9kZSxcbiAgICAgICAgcGxhbnRfaWNvbl9mcmFtZV9hcnI6IFtjYy5TcHJpdGVGcmFtZV0sXG4gICAgICAgIGxhbmRfZnJhbWU6IGNjLlNwcml0ZUZyYW1lLFxuICAgICAgICBpY29uX3Nwcml0ZTogY2MuU3ByaXRlLFxuICAgICAgICBoYXZlX2ljb25fbm9kZTogY2MuTm9kZSxcbiAgICAgICAgYnV0dG9uX3RpcHNfbm9kZTogY2MuTm9kZSxcbiAgICB9LFxuICAgIC8v5Yid5aeL5YyWXG4gICAgaW5pX25vZGUodHlwZSwgaW5kZXgpIHtcbiAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJnYW1lX3NjZW5lXCIpO1xuICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJnYW1lX3J1bGVzXCIpO1xuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wgPSBjYy5maW5kKFwic291bmRfY29udHJvbFwiKS5nZXRDb21wb25lbnQoXCJzb3VuZF9jb250cm9sXCIpO1xuICAgICAgICB0aGlzLmhhdmVfaWNvbl9ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmJ1dHRvbl90aXBzX25vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMudXBkYXRlX2NvbnRlbnQoKTtcbiAgICAgICAgdGhpcy51cGRhdGVfc2NoZWR1bGUoKTtcbiAgICB9LFxuICAgIHVwZGF0ZV9zY2hlZHVsZSgpIHtcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLnVwZGF0ZV9jb250ZW50LCAwLjUpO1xuICAgIH0sXG4gICAgLy/liLfmlrDmlbDmja5cbiAgICB1cGRhdGVfY29udGVudCgpIHtcbiAgICAgICAgdmFyIGdvbGQgPSB1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQ7XG4gICAgICAgIHZhciBsZXZlbCA9IHVzZXJfZGF0YS51c2VyX2RhdGEubGV2ZWw7XG4gICAgICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFwibGFuZFwiOlxuICAgICAgICAgICAgICAgIHRoaXMubmFtZV9sYWJlbC5zdHJpbmcgPSBjb25maWcubGFuZFt0aGlzLmluZGV4XS5uYW1lO1xuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9zcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLmxhbmRfZnJhbWU7XG4gICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmluZGV4XS5oYXZlID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idXR0b25fdGlwc19ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvc3RfbGFiZWwubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXZlX2ljb25fbm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5lZWRfbGV2ZWxfbGFiZWwubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nb2xkX2ljb25fbm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5lZWRfbGV2ZWxfbGFiZWwubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdvbGRfaWNvbl9ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmVlZF9sZXZlbF9sYWJlbC5zdHJpbmcgPSBcIkxldmVsIFwiICsgY29uZmlnLmxhbmRbdGhpcy5pbmRleF0ubmVlZF9sZXZlbCArIFwiIHRvIHVubG9ja1wiO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChsZXZlbCA+PSBjb25maWcubGFuZFt0aGlzLmluZGV4XS5uZWVkX2xldmVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvc3RfbGFiZWwuc3RyaW5nID0gY29uZmlnLmxhbmRbdGhpcy5pbmRleF0uY29zdDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29zdF9sYWJlbC5zdHJpbmcgPSBcIj8/P1wiO1xuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIC8v5Y+v5Lul6LSt5Lmw57uZ5LiO5o+Q56S6XG4gICAgICAgICAgICAgICAgICAgIGlmIChsZXZlbCA+PSBjb25maWcubGFuZFt0aGlzLmluZGV4XS5uZWVkX2xldmVsICYmIGdvbGQgPj0gY29uZmlnLmxhbmRbdGhpcy5pbmRleF0uY29zdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5idXR0b25fdGlwc19ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbl90aXBzX25vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJwbGFudFwiOlxuICAgICAgICAgICAgICAgIHRoaXMubmFtZV9sYWJlbC5zdHJpbmcgPSBjb25maWcucGxhbnRbdGhpcy5pbmRleF0ubmFtZTtcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fc3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5wbGFudF9pY29uX2ZyYW1lX2Fyclt0aGlzLmluZGV4XTtcbiAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5wbGFudFt0aGlzLmluZGV4XS5oYXZlID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idXR0b25fdGlwc19ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvc3RfbGFiZWwubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXZlX2ljb25fbm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5lZWRfbGV2ZWxfbGFiZWwubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nb2xkX2ljb25fbm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdvbGRfaWNvbl9ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmVlZF9sZXZlbF9sYWJlbC5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmVlZF9sZXZlbF9sYWJlbC5zdHJpbmcgPSBcIk5lZWQgXCIgKyBjb25maWcucGxhbnRbdGhpcy5pbmRleF0ubmVlZF9sZXZlbCArIFwiIGxldmVsIHVubG9ja1wiO1xuXG4gICAgICAgICAgICAgICAgICAgIC8v562J57qn5ruh6Laz5pi+56S66YeR5biB5raI6ICXXG4gICAgICAgICAgICAgICAgICAgIGlmIChsZXZlbCA+PSBjb25maWcucGxhbnRbdGhpcy5pbmRleF0ubmVlZF9sZXZlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb3N0X2xhYmVsLnN0cmluZyA9IGNvbmZpZy5wbGFudFt0aGlzLmluZGV4XS5jb3N0O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb3N0X2xhYmVsLnN0cmluZyA9IFwiPz8/XCI7XG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgLy/lj6/ku6XotK3kubDnu5nkuI7mj5DnpLpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxldmVsID49IGNvbmZpZy5wbGFudFt0aGlzLmluZGV4XS5uZWVkX2xldmVsICYmIGdvbGQgPj0gY29uZmlnLnBsYW50W3RoaXMuaW5kZXhdLmNvc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uX3RpcHNfbm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5idXR0b25fdGlwc19ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIG9uX2J1dHRvbl9jbGljaygpIHtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3Nob3BfYnV5X3VpKHRoaXMudHlwZSwgdGhpcy5pbmRleCwgdGhpcy5pY29uX3Nwcml0ZS5zcHJpdGVGcmFtZSk7XG4gICAgfSxcbiAgICAvLyBvbkxvYWQgKCkge30sXG5cbiAgICBzdGFydCgpIHtcblxuICAgIH0sXG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcbn0pO1xuIl19