
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ui/shop_buy_ui.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0a0a9CsR95G0pgJYvQVl3KG', 'shop_buy_ui');
// script/ui/shop_buy_ui.js

"use strict";

var _user_data = _interopRequireDefault(require("user_data"));

var _config = _interopRequireDefault(require("config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

cc.Class({
  "extends": cc.Component,
  properties: {
    icon_sprite: cc.Sprite,
    introduce_label: cc.Label,
    introduce1_label: cc.Label,
    introduce2_label: cc.Label,
    introduce3_label: cc.Label,
    introduce4_label: cc.Label,
    buy_button: cc.Button,
    cost_label: cc.Label,
    price_difference_label: cc.Label,
    have_icon: cc.Node,
    star4_icon: cc.Node
  },
  ini_node: function ini_node(type, index, icon_frame) {
    this.type = type;
    this.index = index;
    this.icon_frame = icon_frame;
    this.sound_control = cc.find("sound_control").getComponent("sound_control");
    this.ad_control = cc.find("ad_control").getComponent("ad_control");
    this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
    this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
    this.ad_car = null; //默认状态

    this.price_difference_label.node.active = true;
    this.buy_button.node.active = true;
    this.update_node();
    this.create_ad_car();
  },
  update_node: function update_node() {
    this.icon_sprite.spriteFrame = this.icon_frame;
    var level = _user_data["default"].user_data.level;

    switch (this.type) {
      case "land":
        this.introduce4_label.node.active = false;
        this.star4_icon.active = false;

        if (level >= _config["default"].land[this.index].need_level) {
          //达到解锁条件
          this.introduce_label.string = "Additional planting area";
          this.introduce1_label.string = "More area to planting";
          this.introduce2_label.string = "Remember to water";
          this.introduce3_label.string = "Level " + _config["default"].land[this.index].need_level + " unlock";

          if (_user_data["default"].user_data.land[this.index].have == 0) {
            //未拥有
            this.price_difference = _config["default"].land[this.index].cost - _user_data["default"].user_data.gold;
            this.cost_label.string = _config["default"].land[this.index].cost;
            this.have_icon.active = false;

            if (_user_data["default"].user_data.gold >= _config["default"].land[this.index].cost) {
              //金币足够
              this.buy_button.interactable = true;
              this.price_difference_label.node.active = false;
            } else {
              //金币不足
              this.buy_button.interactable = false;
              this.price_difference_label.string = "Not enough gold coins, not enough" + this.price_difference;
            }

            ;
          } else {
            //已拥有
            this.have_icon.active = true;
            this.buy_button.node.active = false;
            this.price_difference_label.node.active = false;
          }

          ;
        } else {
          //未达到解锁条件
          this.introduce_label.string = "???";
          this.introduce1_label.string = "???";
          this.introduce2_label.string = "???";
          this.introduce3_label.string = "Level " + _config["default"].land[this.index].need_level + " unlock";
          this.price_difference_label.node.active = false;
          this.cost_label.string = "???";
          this.buy_button.interactable = false;
          this.have_icon.active = false;
        }

        ;
        break;

      case "plant":
        this.introduce4_label.node.active = true;
        this.star4_icon.active = true;

        if (level >= _config["default"].plant[this.index].need_level) {
          //达到解锁条件
          this.introduce_label.string = _config["default"].plant[this.index].introduce;
          this.introduce1_label.string = "Sale value: " + _config["default"].plant[this.index].sell;
          this.introduce2_label.string = "Livespan: " + _config["default"].plant[this.index].grow_time + "second";
          this.introduce3_label.string = "Experience: " + _config["default"].plant[this.index].exp;
          this.introduce4_label.string = "Level " + _config["default"].plant[this.index].need_level + " unlock";

          if (_user_data["default"].user_data.plant[this.index].have == 0) {
            //未拥有
            this.price_difference = _config["default"].plant[this.index].cost - _user_data["default"].user_data.gold;
            this.cost_label.string = _config["default"].plant[this.index].cost;
            this.have_icon.active = false;

            if (_user_data["default"].user_data.gold >= _config["default"].plant[this.index].cost) {
              //金币足够
              this.buy_button.interactable = true;
              this.price_difference_label.node.active = false;
            } else {
              //金币不足
              this.buy_button.interactable = false;
              this.price_difference_label.string = "Not enough gold coins, not enough" + this.price_difference;
            }

            ;
          } else {
            //已拥有
            this.have_icon.active = true;
            this.buy_button.node.active = false;
            this.price_difference_label.node.active = false;
          }

          ;
        } else {
          //未达到解锁条件
          this.introduce_label.string = "???";
          this.introduce1_label.string = "???";
          this.introduce2_label.string = "???";
          this.introduce3_label.string = "???";
          this.introduce4_label.string = "Level " + _config["default"].plant[this.index].need_level + " unlock";
          this.price_difference_label.node.active = false;
          this.cost_label.string = "???";
          this.buy_button.interactable = false;
          this.have_icon.active = false;
        }

        ;
        break;
    }

    ;
  },
  //购买按钮被点击
  on_buy_button_click: function on_buy_button_click() {
    switch (this.type) {
      case "land":
        if (_user_data["default"].user_data.land[this.index].have == 1) {
          return;
        } else {
          //judge money
          if (_user_data["default"].user_data.gold >= _config["default"].land[this.index].cost) {
            //金币足够
            this.sound_control.play_sound_effect("button_click");
            var cost = _config["default"].land[this.index].cost;
            this.game_rules_js.add_gold(-cost);
            _user_data["default"].user_data.land[this.index].have = 1;
            this.game_scene_js.create_tips_ui(this.game_scene_js.node, "buy_succes"); //刷新土地

            this.game_rules_js.updata_land(this.index);
          } else {
            //金币不足
            this.sound_control.play_sound_effect("un_click");
            this.game_scene_js.create_tips_ui(this.game_scene_js.node, "no_money");
          }

          ;
        }

        ;
        break;

      case "plant":
        if (_user_data["default"].user_data.plant[this.index].have == 1) {
          return;
        } else {
          //judge money
          if (_user_data["default"].user_data.gold >= _config["default"].plant[this.index].cost) {
            //金币足够
            this.sound_control.play_sound_effect("button_click");
            var cost = _config["default"].plant[this.index].cost;
            this.game_rules_js.add_gold(-cost);
            _user_data["default"].user_data.plant[this.index].have = 1;
            this.game_scene_js.create_tips_ui(this.game_scene_js.node, "buy_succes");
          } else {
            //金币不足
            this.sound_control.play_sound_effect("un_click");
            this.game_scene_js.create_tips_ui(this.game_scene_js.node, "no_money");
          }

          ;
        }

        ;
        break;
    }

    ;
    this.update_node();
  },
  //更新schedule
  update_schedule: function update_schedule() {
    var callback = function callback() {
      this.update_node();
    };

    this.schedule(callback, 1);
  },
  //touch exit
  touch_exit: function touch_exit() {
    this.sound_control.play_sound_effect("button_exit");

    if (this.ad_car !== null) {
      cc.log("ad_car destroy");
      this.ad_car.destroy();
    }

    ;
    this.ad_control.hide_bannerAd();
    this.game_scene_js.on_node_kill(this.node);
  },
  create_ad_car: function create_ad_car() {
    switch (this.type) {
      case "land":
        if (_user_data["default"].user_data.land[this.index].have != 1) {
          //未拥有这块地
          var gold = _user_data["default"].user_data.gold;
          var all_capacity = 500 * _user_data["default"].user_data.skill["gold_max"] + 500;
          var cost = _config["default"].land[this.index].cost; //差价

          var price_difference = cost - gold; //大于4/5,且能够拥有，且金币不足

          if (gold >= cost * (4 / 5) && all_capacity >= cost && gold < cost) {
            this.ad_control.hide_bannerAd();
            this.ad_car = this.game_scene_js.create_ad_car(this.node, price_difference);
          } else {}

          ;
        } else {
          //拥有这块地
          return;
        }

        break;

      case "plant":
        if (_user_data["default"].user_data.plant[this.index].have != 1) {
          //未拥有这个植物
          var gold = _user_data["default"].user_data.gold;
          var all_capacity = 500 * _user_data["default"].user_data.skill["gold_max"] + 500;
          var cost = _config["default"].plant[this.index].cost; //差价

          var price_difference = cost - gold; //大于4/5,且能够拥有，且金币不足

          if (gold >= cost * (4 / 5) && all_capacity >= cost && gold < cost) {
            this.ad_control.hide_bannerAd();
            this.ad_car = this.game_scene_js.create_ad_car(this.node, price_difference);
          } else {}

          ;
        } else {
          //拥有这个植物
          return;
        }

        break;
    }

    ;
  },
  // onLoad () {},
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcc2hvcF9idXlfdWkuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJpY29uX3Nwcml0ZSIsIlNwcml0ZSIsImludHJvZHVjZV9sYWJlbCIsIkxhYmVsIiwiaW50cm9kdWNlMV9sYWJlbCIsImludHJvZHVjZTJfbGFiZWwiLCJpbnRyb2R1Y2UzX2xhYmVsIiwiaW50cm9kdWNlNF9sYWJlbCIsImJ1eV9idXR0b24iLCJCdXR0b24iLCJjb3N0X2xhYmVsIiwicHJpY2VfZGlmZmVyZW5jZV9sYWJlbCIsImhhdmVfaWNvbiIsIk5vZGUiLCJzdGFyNF9pY29uIiwiaW5pX25vZGUiLCJ0eXBlIiwiaW5kZXgiLCJpY29uX2ZyYW1lIiwic291bmRfY29udHJvbCIsImZpbmQiLCJnZXRDb21wb25lbnQiLCJhZF9jb250cm9sIiwiZ2FtZV9zY2VuZV9qcyIsImdhbWVfcnVsZXNfanMiLCJhZF9jYXIiLCJub2RlIiwiYWN0aXZlIiwidXBkYXRlX25vZGUiLCJjcmVhdGVfYWRfY2FyIiwic3ByaXRlRnJhbWUiLCJsZXZlbCIsInVzZXJfZGF0YSIsImNvbmZpZyIsImxhbmQiLCJuZWVkX2xldmVsIiwic3RyaW5nIiwiaGF2ZSIsInByaWNlX2RpZmZlcmVuY2UiLCJjb3N0IiwiZ29sZCIsImludGVyYWN0YWJsZSIsInBsYW50IiwiaW50cm9kdWNlIiwic2VsbCIsImdyb3dfdGltZSIsImV4cCIsIm9uX2J1eV9idXR0b25fY2xpY2siLCJwbGF5X3NvdW5kX2VmZmVjdCIsImFkZF9nb2xkIiwiY3JlYXRlX3RpcHNfdWkiLCJ1cGRhdGFfbGFuZCIsInVwZGF0ZV9zY2hlZHVsZSIsImNhbGxiYWNrIiwic2NoZWR1bGUiLCJ0b3VjaF9leGl0IiwibG9nIiwiZGVzdHJveSIsImhpZGVfYmFubmVyQWQiLCJvbl9ub2RlX2tpbGwiLCJhbGxfY2FwYWNpdHkiLCJza2lsbCIsInN0YXJ0Il0sIm1hcHBpbmdz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S0FBS3pCLEtBQWxCLEVBQXlCc0IsSUFBcEMsQ0FKaUQsQ0FLakQ7O0FBQ0EsY0FBSUQsZ0JBQWdCLEdBQUdDLElBQUksR0FBR0MsSUFBOUIsQ0FOaUQsQ0FPakQ7O0FBQ0EsY0FBSUEsSUFBSSxJQUFJRCxJQUFJLElBQUksSUFBSSxDQUFSLENBQVosSUFBMEJxQixZQUFZLElBQUlyQixJQUExQyxJQUFrREMsSUFBSSxHQUFHRCxJQUE3RCxFQUFtRTtBQUMvRCxpQkFBS2pCLFVBQUwsQ0FBZ0JvQyxhQUFoQjtBQUNBLGlCQUFLakMsTUFBTCxHQUFjLEtBQUtGLGFBQUwsQ0FBbUJNLGFBQW5CLENBQWlDLEtBQUtILElBQXRDLEVBQTRDWSxnQkFBNUMsQ0FBZDtBQUNILFdBSEQsTUFHTyxDQUVOOztBQUFBO0FBQ0osU0FkRCxNQWNPO0FBQ0g7QUFDQTtBQUNIOztBQUNEO0FBekNSOztBQTBDQztBQUdKLEdBeE9JO0FBeU9MO0FBRUF3QixFQUFBQSxLQTNPSyxtQkEyT0c7QUFDSixTQUFLVixlQUFMO0FBQ0gsR0E3T0ksQ0ErT0w7O0FBL09LLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB1c2VyX2RhdGEgZnJvbSBcInVzZXJfZGF0YVwiO1xyXG5pbXBvcnQgY29uZmlnIGZyb20gXCJjb25maWdcIjtcclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBpY29uX3Nwcml0ZTogY2MuU3ByaXRlLFxyXG4gICAgICAgIGludHJvZHVjZV9sYWJlbDogY2MuTGFiZWwsXHJcbiAgICAgICAgaW50cm9kdWNlMV9sYWJlbDogY2MuTGFiZWwsXHJcbiAgICAgICAgaW50cm9kdWNlMl9sYWJlbDogY2MuTGFiZWwsXHJcbiAgICAgICAgaW50cm9kdWNlM19sYWJlbDogY2MuTGFiZWwsXHJcbiAgICAgICAgaW50cm9kdWNlNF9sYWJlbDogY2MuTGFiZWwsXHJcbiAgICAgICAgYnV5X2J1dHRvbjogY2MuQnV0dG9uLFxyXG4gICAgICAgIGNvc3RfbGFiZWw6IGNjLkxhYmVsLFxyXG4gICAgICAgIHByaWNlX2RpZmZlcmVuY2VfbGFiZWw6IGNjLkxhYmVsLFxyXG4gICAgICAgIGhhdmVfaWNvbjogY2MuTm9kZSxcclxuICAgICAgICBzdGFyNF9pY29uOiBjYy5Ob2RlLFxyXG4gICAgfSxcclxuICAgIGluaV9ub2RlKHR5cGUsIGluZGV4LCBpY29uX2ZyYW1lKSB7XHJcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgdGhpcy5pY29uX2ZyYW1lID0gaWNvbl9mcmFtZTtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wgPSBjYy5maW5kKFwic291bmRfY29udHJvbFwiKS5nZXRDb21wb25lbnQoXCJzb3VuZF9jb250cm9sXCIpO1xyXG4gICAgICAgIHRoaXMuYWRfY29udHJvbCA9IGNjLmZpbmQoXCJhZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcImFkX2NvbnRyb2xcIik7XHJcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9zY2VuZVwiKTtcclxuICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJnYW1lX3J1bGVzXCIpO1xyXG4gICAgICAgIHRoaXMuYWRfY2FyID0gbnVsbDtcclxuICAgICAgICAvL+m7mOiupOeKtuaAgVxyXG4gICAgICAgIHRoaXMucHJpY2VfZGlmZmVyZW5jZV9sYWJlbC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5idXlfYnV0dG9uLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZV9ub2RlKCk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVfYWRfY2FyKCk7XHJcbiAgICB9LFxyXG4gICAgdXBkYXRlX25vZGUoKSB7XHJcbiAgICAgICAgdGhpcy5pY29uX3Nwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZTtcclxuICAgICAgICB2YXIgbGV2ZWwgPSB1c2VyX2RhdGEudXNlcl9kYXRhLmxldmVsO1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJsYW5kXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmludHJvZHVjZTRfbGFiZWwubm9kZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXI0X2ljb24uYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxldmVsID49IGNvbmZpZy5sYW5kW3RoaXMuaW5kZXhdLm5lZWRfbGV2ZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL+i+vuWIsOino+mUgeadoeS7tlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW50cm9kdWNlX2xhYmVsLnN0cmluZyA9IFwiQWRkaXRpb25hbCBwbGFudGluZyBhcmVhXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnRyb2R1Y2UxX2xhYmVsLnN0cmluZyA9IFwiTW9yZSBhcmVhIHRvIHBsYW50aW5nXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnRyb2R1Y2UyX2xhYmVsLnN0cmluZyA9IFwiUmVtZW1iZXIgdG8gd2F0ZXJcIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmludHJvZHVjZTNfbGFiZWwuc3RyaW5nID0gIFwiTGV2ZWwgXCIrY29uZmlnLmxhbmRbdGhpcy5pbmRleF0ubmVlZF9sZXZlbCArXCIgdW5sb2NrXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmluZGV4XS5oYXZlID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/mnKrmi6XmnIlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmljZV9kaWZmZXJlbmNlID0gY29uZmlnLmxhbmRbdGhpcy5pbmRleF0uY29zdCAtIHVzZXJfZGF0YS51c2VyX2RhdGEuZ29sZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb3N0X2xhYmVsLnN0cmluZyA9IGNvbmZpZy5sYW5kW3RoaXMuaW5kZXhdLmNvc3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGF2ZV9pY29uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkID49IGNvbmZpZy5sYW5kW3RoaXMuaW5kZXhdLmNvc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v6YeR5biB6Laz5aSfXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1eV9idXR0b24uaW50ZXJhY3RhYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJpY2VfZGlmZmVyZW5jZV9sYWJlbC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/ph5HluIHkuI3otrNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnV5X2J1dHRvbi5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJpY2VfZGlmZmVyZW5jZV9sYWJlbC5zdHJpbmcgPSBcIk5vdCBlbm91Z2ggZ29sZCBjb2lucywgbm90IGVub3VnaFwiICsgdGhpcy5wcmljZV9kaWZmZXJlbmNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5bey5oul5pyJXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGF2ZV9pY29uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnV5X2J1dHRvbi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByaWNlX2RpZmZlcmVuY2VfbGFiZWwubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvL+acqui+vuWIsOino+mUgeadoeS7tlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW50cm9kdWNlX2xhYmVsLnN0cmluZyA9IFwiPz8/XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnRyb2R1Y2UxX2xhYmVsLnN0cmluZyA9IFwiPz8/XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnRyb2R1Y2UyX2xhYmVsLnN0cmluZyA9IFwiPz8/XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnRyb2R1Y2UzX2xhYmVsLnN0cmluZyA9IFwiTGV2ZWwgXCIrY29uZmlnLmxhbmRbdGhpcy5pbmRleF0ubmVlZF9sZXZlbCArXCIgdW5sb2NrXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmljZV9kaWZmZXJlbmNlX2xhYmVsLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb3N0X2xhYmVsLnN0cmluZyA9IFwiPz8/XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idXlfYnV0dG9uLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGF2ZV9pY29uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInBsYW50XCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmludHJvZHVjZTRfbGFiZWwubm9kZS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcjRfaWNvbi5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmIChsZXZlbCA+PSBjb25maWcucGxhbnRbdGhpcy5pbmRleF0ubmVlZF9sZXZlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8v6L6+5Yiw6Kej6ZSB5p2h5Lu2XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnRyb2R1Y2VfbGFiZWwuc3RyaW5nID0gY29uZmlnLnBsYW50W3RoaXMuaW5kZXhdLmludHJvZHVjZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmludHJvZHVjZTFfbGFiZWwuc3RyaW5nID0gXCJTYWxlIHZhbHVlOiBcIiArIGNvbmZpZy5wbGFudFt0aGlzLmluZGV4XS5zZWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW50cm9kdWNlMl9sYWJlbC5zdHJpbmcgPSBcIkxpdmVzcGFuOiBcIiArIGNvbmZpZy5wbGFudFt0aGlzLmluZGV4XS5ncm93X3RpbWUgKyBcInNlY29uZFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW50cm9kdWNlM19sYWJlbC5zdHJpbmcgPSBcIkV4cGVyaWVuY2U6IFwiICsgY29uZmlnLnBsYW50W3RoaXMuaW5kZXhdLmV4cDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmludHJvZHVjZTRfbGFiZWwuc3RyaW5nID0gXCJMZXZlbCBcIitjb25maWcucGxhbnRbdGhpcy5pbmRleF0ubmVlZF9sZXZlbCtcIiB1bmxvY2tcIjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5wbGFudFt0aGlzLmluZGV4XS5oYXZlID09IDApIHsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5pyq5oul5pyJXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJpY2VfZGlmZmVyZW5jZSA9IGNvbmZpZy5wbGFudFt0aGlzLmluZGV4XS5jb3N0IC0gdXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvc3RfbGFiZWwuc3RyaW5nID0gY29uZmlnLnBsYW50W3RoaXMuaW5kZXhdLmNvc3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGF2ZV9pY29uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkID49IGNvbmZpZy5wbGFudFt0aGlzLmluZGV4XS5jb3N0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+mHkeW4gei2s+Wkn1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5idXlfYnV0dG9uLmludGVyYWN0YWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByaWNlX2RpZmZlcmVuY2VfbGFiZWwubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v6YeR5biB5LiN6LazXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1eV9idXR0b24uaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByaWNlX2RpZmZlcmVuY2VfbGFiZWwuc3RyaW5nID0gXCJOb3QgZW5vdWdoIGdvbGQgY29pbnMsIG5vdCBlbm91Z2hcIiArIHRoaXMucHJpY2VfZGlmZmVyZW5jZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+W3suaLpeaciVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhdmVfaWNvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1eV9idXR0b24ubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmljZV9kaWZmZXJlbmNlX2xhYmVsLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/mnKrovr7liLDop6PplIHmnaHku7ZcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmludHJvZHVjZV9sYWJlbC5zdHJpbmcgPSBcIj8/P1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW50cm9kdWNlMV9sYWJlbC5zdHJpbmcgPSBcIj8/P1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW50cm9kdWNlMl9sYWJlbC5zdHJpbmcgPSBcIj8/P1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW50cm9kdWNlM19sYWJlbC5zdHJpbmcgPSBcIj8/P1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW50cm9kdWNlNF9sYWJlbC5zdHJpbmcgPSBcIkxldmVsIFwiK2NvbmZpZy5wbGFudFt0aGlzLmluZGV4XS5uZWVkX2xldmVsK1wiIHVubG9ja1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJpY2VfZGlmZmVyZW5jZV9sYWJlbC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29zdF9sYWJlbC5zdHJpbmcgPSBcIj8/P1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnV5X2J1dHRvbi5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhdmVfaWNvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8v6LSt5Lmw5oyJ6ZKu6KKr54K55Ye7XHJcbiAgICBvbl9idXlfYnV0dG9uX2NsaWNrKCkge1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJsYW5kXCI6XHJcbiAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMuaW5kZXhdLmhhdmUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9qdWRnZSBtb25leVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQgPj0gY29uZmlnLmxhbmRbdGhpcy5pbmRleF0uY29zdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+mHkeW4gei2s+Wkn1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fY2xpY2tcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb3N0ID0gY29uZmlnLmxhbmRbdGhpcy5pbmRleF0uY29zdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLmFkZF9nb2xkKC1jb3N0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMuaW5kZXhdLmhhdmUgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIFwiYnV5X3N1Y2Nlc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/liLfmlrDlnJ/lnLBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLnVwZGF0YV9sYW5kKHRoaXMuaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v6YeR5biB5LiN6LazXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcInVuX2NsaWNrXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIFwibm9fbW9uZXlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInBsYW50XCI6XHJcbiAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5wbGFudFt0aGlzLmluZGV4XS5oYXZlID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vanVkZ2UgbW9uZXlcclxuICAgICAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkID49IGNvbmZpZy5wbGFudFt0aGlzLmluZGV4XS5jb3N0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v6YeR5biB6Laz5aSfXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9jbGlja1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvc3QgPSBjb25maWcucGxhbnRbdGhpcy5pbmRleF0uY29zdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLmFkZF9nb2xkKC1jb3N0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5wbGFudFt0aGlzLmluZGV4XS5oYXZlID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9zY2VuZV9qcy5ub2RlLCBcImJ1eV9zdWNjZXNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/ph5HluIHkuI3otrNcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwidW5fY2xpY2tcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfc2NlbmVfanMubm9kZSwgXCJub19tb25leVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMudXBkYXRlX25vZGUoKTtcclxuICAgIH0sXHJcbiAgICAvL+abtOaWsHNjaGVkdWxlXHJcbiAgICB1cGRhdGVfc2NoZWR1bGUoKSB7XHJcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZV9ub2RlKCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlKGNhbGxiYWNrLCAxKVxyXG4gICAgfSxcclxuICAgIC8vdG91Y2ggZXhpdFxyXG4gICAgdG91Y2hfZXhpdCgpIHtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fZXhpdFwiKTtcclxuICAgICAgICBpZiAodGhpcy5hZF9jYXIgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgY2MubG9nKFwiYWRfY2FyIGRlc3Ryb3lcIilcclxuICAgICAgICAgICAgdGhpcy5hZF9jYXIuZGVzdHJveSgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5hZF9jb250cm9sLmhpZGVfYmFubmVyQWQoKTtcclxuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMub25fbm9kZV9raWxsKHRoaXMubm9kZSk7XHJcbiAgICB9LFxyXG4gICAgY3JlYXRlX2FkX2NhcigpIHtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwibGFuZFwiOlxyXG4gICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmluZGV4XS5oYXZlICE9IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL+acquaLpeaciei/meWdl+WcsFxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBnb2xkID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhbGxfY2FwYWNpdHkgPSA1MDAgKiB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1wiZ29sZF9tYXhcIl0gKyA1MDA7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvc3QgPSBjb25maWcubGFuZFt0aGlzLmluZGV4XS5jb3N0O1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5beu5Lu3XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByaWNlX2RpZmZlcmVuY2UgPSBjb3N0IC0gZ29sZDtcclxuICAgICAgICAgICAgICAgICAgICAvL+Wkp+S6jjQvNSzkuJTog73lpJ/mi6XmnInvvIzkuJTph5HluIHkuI3otrNcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZ29sZCA+PSBjb3N0ICogKDQgLyA1KSAmJiBhbGxfY2FwYWNpdHkgPj0gY29zdCAmJiBnb2xkIDwgY29zdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkX2NvbnRyb2wuaGlkZV9iYW5uZXJBZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkX2NhciA9IHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfYWRfY2FyKHRoaXMubm9kZSwgcHJpY2VfZGlmZmVyZW5jZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/mi6XmnInov5nlnZflnLBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJwbGFudFwiOlxyXG4gICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEucGxhbnRbdGhpcy5pbmRleF0uaGF2ZSAhPSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/mnKrmi6XmnInov5nkuKrmpI3nialcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZ29sZCA9IHVzZXJfZGF0YS51c2VyX2RhdGEuZ29sZDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYWxsX2NhcGFjaXR5ID0gNTAwICogdXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbFtcImdvbGRfbWF4XCJdICsgNTAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb3N0ID0gY29uZmlnLnBsYW50W3RoaXMuaW5kZXhdLmNvc3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/lt67ku7dcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcHJpY2VfZGlmZmVyZW5jZSA9IGNvc3QgLSBnb2xkO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5aSn5LqONC81LOS4lOiDveWkn+aLpeacie+8jOS4lOmHkeW4geS4jei2s1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChnb2xkID49IGNvc3QgKiAoNCAvIDUpICYmIGFsbF9jYXBhY2l0eSA+PSBjb3N0ICYmIGdvbGQgPCBjb3N0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRfY29udHJvbC5oaWRlX2Jhbm5lckFkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRfY2FyID0gdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9hZF9jYXIodGhpcy5ub2RlLCBwcmljZV9kaWZmZXJlbmNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvL+aLpeaciei/meS4quakjeeJqVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH07XHJcblxyXG5cclxuICAgIH0sXHJcbiAgICAvLyBvbkxvYWQgKCkge30sXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVfc2NoZWR1bGUoKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pO1xyXG4iXX0=