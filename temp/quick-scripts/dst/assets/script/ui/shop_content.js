
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
            this.need_level_label.string = "Need " + _config["default"].plant[this.index].need_level + " level unlock";

            if (level >= _config["default"].plant[this.index].need_level) {
              this.cost_label.string = _config["default"].plant[this.index].cost;
              this.need_level_label.string = "";
            } else {
              this.cost_label.string = "???";
            }

            ;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcc2hvcF9jb250ZW50LmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwibmFtZV9sYWJlbCIsIkxhYmVsIiwiY29zdF9sYWJlbCIsIm5lZWRfbGV2ZWxfbGFiZWwiLCJnb2xkX2ljb25fbm9kZSIsIk5vZGUiLCJwbGFudF9pY29uX2ZyYW1lX2FyciIsIlNwcml0ZUZyYW1lIiwibGFuZF9mcmFtZSIsImljb25fc3ByaXRlIiwiU3ByaXRlIiwiaGF2ZV9pY29uX25vZGUiLCJidXR0b25fdGlwc19ub2RlIiwiaW5pX25vZGUiLCJ0eXBlIiwiaW5kZXgiLCJnYW1lX3NjZW5lX2pzIiwiZmluZCIsImdldENvbXBvbmVudCIsImdhbWVfcnVsZXNfanMiLCJzb3VuZF9jb250cm9sIiwiYWN0aXZlIiwidXBkYXRlX2NvbnRlbnQiLCJjYWxsYmFjayIsImdvbGQiLCJ1c2VyX2RhdGEiLCJsZXZlbCIsInN0cmluZyIsImNvbmZpZyIsImxhbmQiLCJuYW1lIiwic3ByaXRlRnJhbWUiLCJoYXZlIiwibm9kZSIsIm5lZWRfbGV2ZWwiLCJjb3N0IiwicGxhbnQiLCJzY2hlZHVsZSIsIm9uX2J1dHRvbl9jbGljayIsInBsYXlfc291bmRfZWZmZWN0IiwiY3JlYXRlX3Nob3BfYnV5X3VpIiwic3RhcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFDQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFVBQVUsRUFBRUosRUFBRSxDQUFDSyxLQURQO0FBRVJDLElBQUFBLFVBQVUsRUFBRU4sRUFBRSxDQUFDSyxLQUZQO0FBR1JFLElBQUFBLGdCQUFnQixFQUFFUCxFQUFFLENBQUNLLEtBSGI7QUFJUkcsSUFBQUEsY0FBYyxFQUFFUixFQUFFLENBQUNTLElBSlg7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QUwsQ0FBaUJzQixXQUE5RTtBQUNILEdBaEdJO0FBaUdMO0FBRUFVLEVBQUFBLEtBbkdLLG1CQW1HRyxDQUVQLENBckdJLENBdUdMOztBQXZHSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdXNlcl9kYXRhIGZyb20gXCJ1c2VyX2RhdGFcIjtcclxuaW1wb3J0IGNvbmZpZyBmcm9tIFwiY29uZmlnXCI7XHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgbmFtZV9sYWJlbDogY2MuTGFiZWwsXHJcbiAgICAgICAgY29zdF9sYWJlbDogY2MuTGFiZWwsXHJcbiAgICAgICAgbmVlZF9sZXZlbF9sYWJlbDogY2MuTGFiZWwsXHJcbiAgICAgICAgZ29sZF9pY29uX25vZGU6IGNjLk5vZGUsXHJcbiAgICAgICAgcGxhbnRfaWNvbl9mcmFtZV9hcnI6IFtjYy5TcHJpdGVGcmFtZV0sXHJcbiAgICAgICAgbGFuZF9mcmFtZTogY2MuU3ByaXRlRnJhbWUsXHJcbiAgICAgICAgaWNvbl9zcHJpdGU6IGNjLlNwcml0ZSxcclxuICAgICAgICBoYXZlX2ljb25fbm9kZTogY2MuTm9kZSxcclxuICAgICAgICBidXR0b25fdGlwc19ub2RlOiBjYy5Ob2RlLFxyXG4gICAgfSxcclxuICAgIC8v5Yid5aeL5YyWXHJcbiAgICBpbmlfbm9kZSh0eXBlLCBpbmRleCkge1xyXG4gICAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcclxuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfc2NlbmVcIik7XHJcbiAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9ydWxlc1wiKTtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wgPSBjYy5maW5kKFwic291bmRfY29udHJvbFwiKS5nZXRDb21wb25lbnQoXCJzb3VuZF9jb250cm9sXCIpO1xyXG4gICAgICAgIHRoaXMuaGF2ZV9pY29uX25vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5idXR0b25fdGlwc19ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlX2NvbnRlbnQoKTtcclxuICAgICAgICAvLyB0aGlzLnVwZGF0ZV9zY2hlZHVsZSgpO1xyXG4gICAgfSxcclxuICAgIC8v5Yi35paw5pWw5o2uXHJcbiAgICB1cGRhdGVfY29udGVudCgpIHtcclxuICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB2YXIgZ29sZCA9IHVzZXJfZGF0YS51c2VyX2RhdGEuZ29sZDtcclxuICAgICAgICAgICAgdmFyIGxldmVsID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5sZXZlbDtcclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLnR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJsYW5kXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uYW1lX2xhYmVsLnN0cmluZyA9IGNvbmZpZy5sYW5kW3RoaXMuaW5kZXhdLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pY29uX3Nwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMubGFuZF9mcmFtZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMuaW5kZXhdLmhhdmUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbl90aXBzX25vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29zdF9sYWJlbC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhdmVfaWNvbl9ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmVlZF9sZXZlbF9sYWJlbC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdvbGRfaWNvbl9ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmVlZF9sZXZlbF9sYWJlbC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ29sZF9pY29uX25vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZWVkX2xldmVsX2xhYmVsLnN0cmluZyA9IFwiTGV2ZWwgXCIgKyBjb25maWcubGFuZFt0aGlzLmluZGV4XS5uZWVkX2xldmVsICsgXCIgdG8gdW5sb2NrXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGV2ZWwgPj0gY29uZmlnLmxhbmRbdGhpcy5pbmRleF0ubmVlZF9sZXZlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb3N0X2xhYmVsLnN0cmluZyA9IGNvbmZpZy5sYW5kW3RoaXMuaW5kZXhdLmNvc3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5lZWRfbGV2ZWxfbGFiZWwuc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29zdF9sYWJlbC5zdHJpbmcgPSBcIj8/P1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/lj6/ku6XotK3kubDnu5nkuI7mj5DnpLpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxldmVsID49IGNvbmZpZy5sYW5kW3RoaXMuaW5kZXhdLm5lZWRfbGV2ZWwgJiYgZ29sZCA+PSBjb25maWcubGFuZFt0aGlzLmluZGV4XS5jb3N0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbl90aXBzX25vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uX3RpcHNfbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInBsYW50XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uYW1lX2xhYmVsLnN0cmluZyA9IGNvbmZpZy5wbGFudFt0aGlzLmluZGV4XS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9zcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLnBsYW50X2ljb25fZnJhbWVfYXJyW3RoaXMuaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLnBsYW50W3RoaXMuaW5kZXhdLmhhdmUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbl90aXBzX25vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29zdF9sYWJlbC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhdmVfaWNvbl9ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmVlZF9sZXZlbF9sYWJlbC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdvbGRfaWNvbl9ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ29sZF9pY29uX25vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZWVkX2xldmVsX2xhYmVsLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZWVkX2xldmVsX2xhYmVsLnN0cmluZyA9IFwiTmVlZCBcIiArIGNvbmZpZy5wbGFudFt0aGlzLmluZGV4XS5uZWVkX2xldmVsICsgXCIgbGV2ZWwgdW5sb2NrXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGV2ZWwgPj0gY29uZmlnLnBsYW50W3RoaXMuaW5kZXhdLm5lZWRfbGV2ZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29zdF9sYWJlbC5zdHJpbmcgPSBjb25maWcucGxhbnRbdGhpcy5pbmRleF0uY29zdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmVlZF9sZXZlbF9sYWJlbC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb3N0X2xhYmVsLnN0cmluZyA9IFwiPz8/XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGV2ZWwgPj0gY29uZmlnLnBsYW50W3RoaXMuaW5kZXhdLm5lZWRfbGV2ZWwgJiYgZ29sZCA+PSBjb25maWcucGxhbnRbdGhpcy5pbmRleF0uY29zdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5idXR0b25fdGlwc19ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbl90aXBzX25vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZShjYWxsYmFjaywgMC4xKTtcclxuICAgIH0sXHJcbiAgICBvbl9idXR0b25fY2xpY2soKSB7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xyXG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfc2hvcF9idXlfdWkodGhpcy50eXBlLCB0aGlzLmluZGV4LCB0aGlzLmljb25fc3ByaXRlLnNwcml0ZUZyYW1lKTtcclxuICAgIH0sXHJcbiAgICAvLyBvbkxvYWQgKCkge30sXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcclxufSk7XHJcbiJdfQ==