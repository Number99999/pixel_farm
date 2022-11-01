
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
    this.update_content(); // this.update_schedule();
  },
  //刷新数据
  update_content: function update_content() {
    var callback = function callback() {
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
              this.need_level_label.string = "";
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
              this.need_level_label.string = "";
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
    };

    this.schedule(callback, 0.1);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcc2hvcF9jb250ZW50LmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwibmFtZV9sYWJlbCIsIkxhYmVsIiwiY29zdF9sYWJlbCIsIm5lZWRfbGV2ZWxfbGFiZWwiLCJnb2xkX2ljb25fbm9kZSIsIk5vZGUiLCJwbGFudF9pY29uX2ZyYW1lX2FyciIsIlNwcml0ZUZyYW1lIiwibGFuZF9mcmFtZSIsImljb25fc3ByaXRlIiwiU3ByaXRlIiwiaGF2ZV9pY29uX25vZGUiLCJidXR0b25fdGlwc19ub2RlIiwiaW5pX25vZGUiLCJ0eXBlIiwiaW5kZXgiLCJnYW1lX3NjZW5lX2pzIiwiZmluZCIsImdldENvbXBvbmVudCIsImdhbWVfcnVsZXNfanMiLCJzb3VuZF9jb250cm9sIiwiYWN0aXZlIiwidXBkYXRlX2NvbnRlbnQiLCJjYWxsYmFjayIsImdvbGQiLCJ1c2VyX2RhdGEiLCJsZXZlbCIsInN0cmluZyIsImNvbmZpZyIsImxhbmQiLCJuYW1lIiwic3ByaXRlRnJhbWUiLCJoYXZlIiwibm9kZSIsIm5lZWRfbGV2ZWwiLCJjb3N0IiwicGxhbnQiLCJzY2hlZHVsZSIsIm9uX2J1dHRvbl9jbGljayIsInBsYXlfc291bmRfZWZmZWN0IiwiY3JlYXRlX3Nob3BfYnV5X3VpIiwic3RhcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFDQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFVBQVUsRUFBRUosRUFBRSxDQUFDSyxLQURQO0FBRVJDLElBQUFBLFVBQVUsRUFBRU4sRUFBRSxDQUFDSyxLQUZQO0FBR1JFLElBQUFBLGdCQUFnQixFQUFFUCxFQUFFLENBQUNLLEtBSGI7QUFJUkcsSUFBQUEsY0FBYyxFQUFFUixFQUFFLENBQUNTLElBSlg7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S0FBdEQsRUFBNkQsS0FBS04sV0FBTCxDQUFpQnNCLFdBQTlFO0FBQ0gsR0FsR0k7QUFtR0w7QUFFQVUsRUFBQUEsS0FyR0ssbUJBcUdHLENBRVAsQ0F2R0ksQ0F5R0w7O0FBekdLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB1c2VyX2RhdGEgZnJvbSBcInVzZXJfZGF0YVwiO1xyXG5pbXBvcnQgY29uZmlnIGZyb20gXCJjb25maWdcIjtcclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBuYW1lX2xhYmVsOiBjYy5MYWJlbCxcclxuICAgICAgICBjb3N0X2xhYmVsOiBjYy5MYWJlbCxcclxuICAgICAgICBuZWVkX2xldmVsX2xhYmVsOiBjYy5MYWJlbCxcclxuICAgICAgICBnb2xkX2ljb25fbm9kZTogY2MuTm9kZSxcclxuICAgICAgICBwbGFudF9pY29uX2ZyYW1lX2FycjogW2NjLlNwcml0ZUZyYW1lXSxcclxuICAgICAgICBsYW5kX2ZyYW1lOiBjYy5TcHJpdGVGcmFtZSxcclxuICAgICAgICBpY29uX3Nwcml0ZTogY2MuU3ByaXRlLFxyXG4gICAgICAgIGhhdmVfaWNvbl9ub2RlOiBjYy5Ob2RlLFxyXG4gICAgICAgIGJ1dHRvbl90aXBzX25vZGU6IGNjLk5vZGUsXHJcbiAgICB9LFxyXG4gICAgLy/liJ3lp4vljJZcclxuICAgIGluaV9ub2RlKHR5cGUsIGluZGV4KSB7XHJcbiAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xyXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9zY2VuZVwiKTtcclxuICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJnYW1lX3J1bGVzXCIpO1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbCA9IGNjLmZpbmQoXCJzb3VuZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcInNvdW5kX2NvbnRyb2xcIik7XHJcbiAgICAgICAgdGhpcy5oYXZlX2ljb25fbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmJ1dHRvbl90aXBzX25vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy51cGRhdGVfY29udGVudCgpO1xyXG4gICAgICAgIC8vIHRoaXMudXBkYXRlX3NjaGVkdWxlKCk7XHJcbiAgICB9LFxyXG4gICAgLy/liLfmlrDmlbDmja5cclxuICAgIHVwZGF0ZV9jb250ZW50KCkge1xyXG4gICAgICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHZhciBnb2xkID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkO1xyXG4gICAgICAgICAgICB2YXIgbGV2ZWwgPSB1c2VyX2RhdGEudXNlcl9kYXRhLmxldmVsO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcImxhbmRcIjpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5hbWVfbGFiZWwuc3RyaW5nID0gY29uZmlnLmxhbmRbdGhpcy5pbmRleF0ubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmljb25fc3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5sYW5kX2ZyYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5pbmRleF0uaGF2ZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uX3RpcHNfbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb3N0X2xhYmVsLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGF2ZV9pY29uX25vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZWVkX2xldmVsX2xhYmVsLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ29sZF9pY29uX25vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZWVkX2xldmVsX2xhYmVsLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nb2xkX2ljb25fbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5lZWRfbGV2ZWxfbGFiZWwuc3RyaW5nID0gXCJMZXZlbCBcIiArIGNvbmZpZy5sYW5kW3RoaXMuaW5kZXhdLm5lZWRfbGV2ZWwgKyBcIiB0byB1bmxvY2tcIjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsZXZlbCA+PSBjb25maWcubGFuZFt0aGlzLmluZGV4XS5uZWVkX2xldmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvc3RfbGFiZWwuc3RyaW5nID0gY29uZmlnLmxhbmRbdGhpcy5pbmRleF0uY29zdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmVlZF9sZXZlbF9sYWJlbC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb3N0X2xhYmVsLnN0cmluZyA9IFwiPz8/XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+WPr+S7pei0reS5sOe7meS4juaPkOekulxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGV2ZWwgPj0gY29uZmlnLmxhbmRbdGhpcy5pbmRleF0ubmVlZF9sZXZlbCAmJiBnb2xkID49IGNvbmZpZy5sYW5kW3RoaXMuaW5kZXhdLmNvc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uX3RpcHNfbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5idXR0b25fdGlwc19ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwicGxhbnRcIjpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5hbWVfbGFiZWwuc3RyaW5nID0gY29uZmlnLnBsYW50W3RoaXMuaW5kZXhdLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pY29uX3Nwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMucGxhbnRfaWNvbl9mcmFtZV9hcnJbdGhpcy5pbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEucGxhbnRbdGhpcy5pbmRleF0uaGF2ZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uX3RpcHNfbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb3N0X2xhYmVsLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGF2ZV9pY29uX25vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZWVkX2xldmVsX2xhYmVsLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ29sZF9pY29uX25vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nb2xkX2ljb25fbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5lZWRfbGV2ZWxfbGFiZWwubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5lZWRfbGV2ZWxfbGFiZWwuc3RyaW5nID0gXCJOZWVkIFwiICsgY29uZmlnLnBsYW50W3RoaXMuaW5kZXhdLm5lZWRfbGV2ZWwgKyBcIiBsZXZlbCB1bmxvY2tcIjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v562J57qn5ruh6Laz5pi+56S66YeR5biB5raI6ICXXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsZXZlbCA+PSBjb25maWcucGxhbnRbdGhpcy5pbmRleF0ubmVlZF9sZXZlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb3N0X2xhYmVsLnN0cmluZyA9IGNvbmZpZy5wbGFudFt0aGlzLmluZGV4XS5jb3N0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZWVkX2xldmVsX2xhYmVsLnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvc3RfbGFiZWwuc3RyaW5nID0gXCI/Pz9cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5Y+v5Lul6LSt5Lmw57uZ5LiO5o+Q56S6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsZXZlbCA+PSBjb25maWcucGxhbnRbdGhpcy5pbmRleF0ubmVlZF9sZXZlbCAmJiBnb2xkID49IGNvbmZpZy5wbGFudFt0aGlzLmluZGV4XS5jb3N0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbl90aXBzX25vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uX3RpcHNfbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlKGNhbGxiYWNrLCAwLjEpO1xyXG4gICAgfSxcclxuICAgIG9uX2J1dHRvbl9jbGljaygpIHtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fY2xpY2tcIik7XHJcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9zaG9wX2J1eV91aSh0aGlzLnR5cGUsIHRoaXMuaW5kZXgsIHRoaXMuaWNvbl9zcHJpdGUuc3ByaXRlRnJhbWUpO1xyXG4gICAgfSxcclxuICAgIC8vIG9uTG9hZCAoKSB7fSxcclxuXHJcbiAgICBzdGFydCgpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxyXG59KTtcclxuIl19