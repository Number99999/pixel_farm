
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcc2hvcF9idXlfdWkuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJpY29uX3Nwcml0ZSIsIlNwcml0ZSIsImludHJvZHVjZV9sYWJlbCIsIkxhYmVsIiwiaW50cm9kdWNlMV9sYWJlbCIsImludHJvZHVjZTJfbGFiZWwiLCJpbnRyb2R1Y2UzX2xhYmVsIiwiaW50cm9kdWNlNF9sYWJlbCIsImJ1eV9idXR0b24iLCJCdXR0b24iLCJjb3N0X2xhYmVsIiwicHJpY2VfZGlmZmVyZW5jZV9sYWJlbCIsImhhdmVfaWNvbiIsIk5vZGUiLCJzdGFyNF9pY29uIiwiaW5pX25vZGUiLCJ0eXBlIiwiaW5kZXgiLCJpY29uX2ZyYW1lIiwic291bmRfY29udHJvbCIsImZpbmQiLCJnZXRDb21wb25lbnQiLCJhZF9jb250cm9sIiwiZ2FtZV9zY2VuZV9qcyIsImdhbWVfcnVsZXNfanMiLCJhZF9jYXIiLCJub2RlIiwiYWN0aXZlIiwidXBkYXRlX25vZGUiLCJjcmVhdGVfYWRfY2FyIiwic3ByaXRlRnJhbWUiLCJsZXZlbCIsInVzZXJfZGF0YSIsImNvbmZpZyIsImxhbmQiLCJuZWVkX2xldmVsIiwic3RyaW5nIiwiaGF2ZSIsInByaWNlX2RpZmZlcmVuY2UiLCJjb3N0IiwiZ29sZCIsImludGVyYWN0YWJsZSIsInBsYW50IiwiaW50cm9kdWNlIiwic2VsbCIsImdyb3dfdGltZSIsImV4cCIsIm9uX2J1eV9idXR0b25fY2xpY2siLCJwbGF5X3NvdW5kX2VmZmVjdCIsImFkZF9nb2xkIiwiY3JlYXRlX3RpcHNfdWkiLCJ1cGRhdGFfbGFuZCIsInVwZGF0ZV9zY2hlZHVsZSIsImNhbGxiYWNrIiwic2NoZWR1bGUiLCJ0b3VjaF9leGl0IiwibG9nIiwiZGVzdHJveSIsIm9uX25vZGVfa2lsbCIsImFsbF9jYXBhY2l0eSIsInNraWxsIiwic3RhcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7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LENBTmlELENBT2pEOztBQUNBLGNBQUlBLElBQUksSUFBSUQsSUFBSSxJQUFJLElBQUksQ0FBUixDQUFaLElBQTBCb0IsWUFBWSxJQUFJcEIsSUFBMUMsSUFBa0RDLElBQUksR0FBR0QsSUFBN0QsRUFBbUU7QUFDL0QsaUJBQUtkLE1BQUwsR0FBYyxLQUFLRixhQUFMLENBQW1CTSxhQUFuQixDQUFpQyxLQUFLSCxJQUF0QyxFQUE0Q1ksZ0JBQTVDLENBQWQ7QUFDSCxXQUZELE1BRU8sQ0FFTjs7QUFBQTtBQUNKLFNBYkQsTUFhTztBQUNIO0FBQ0E7QUFDSDs7QUFDRDtBQXZDUjs7QUF3Q0M7QUFHSixHQXJPSTtBQXNPTDtBQUVBdUIsRUFBQUEsS0F4T0ssbUJBd09HO0FBQ0osU0FBS1QsZUFBTDtBQUNILEdBMU9JLENBNE9MOztBQTVPSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdXNlcl9kYXRhIGZyb20gXCJ1c2VyX2RhdGFcIjtcclxuaW1wb3J0IGNvbmZpZyBmcm9tIFwiY29uZmlnXCI7XHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgaWNvbl9zcHJpdGU6IGNjLlNwcml0ZSxcclxuICAgICAgICBpbnRyb2R1Y2VfbGFiZWw6IGNjLkxhYmVsLFxyXG4gICAgICAgIGludHJvZHVjZTFfbGFiZWw6IGNjLkxhYmVsLFxyXG4gICAgICAgIGludHJvZHVjZTJfbGFiZWw6IGNjLkxhYmVsLFxyXG4gICAgICAgIGludHJvZHVjZTNfbGFiZWw6IGNjLkxhYmVsLFxyXG4gICAgICAgIGludHJvZHVjZTRfbGFiZWw6IGNjLkxhYmVsLFxyXG4gICAgICAgIGJ1eV9idXR0b246IGNjLkJ1dHRvbixcclxuICAgICAgICBjb3N0X2xhYmVsOiBjYy5MYWJlbCxcclxuICAgICAgICBwcmljZV9kaWZmZXJlbmNlX2xhYmVsOiBjYy5MYWJlbCxcclxuICAgICAgICBoYXZlX2ljb246IGNjLk5vZGUsXHJcbiAgICAgICAgc3RhcjRfaWNvbjogY2MuTm9kZSxcclxuICAgIH0sXHJcbiAgICBpbmlfbm9kZSh0eXBlLCBpbmRleCwgaWNvbl9mcmFtZSkge1xyXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xyXG4gICAgICAgIHRoaXMuaWNvbl9mcmFtZSA9IGljb25fZnJhbWU7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sID0gY2MuZmluZChcInNvdW5kX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwic291bmRfY29udHJvbFwiKTtcclxuICAgICAgICB0aGlzLmFkX2NvbnRyb2wgPSBjYy5maW5kKFwiYWRfY29udHJvbFwiKS5nZXRDb21wb25lbnQoXCJhZF9jb250cm9sXCIpO1xyXG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfc2NlbmVcIik7XHJcbiAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9ydWxlc1wiKTtcclxuICAgICAgICB0aGlzLmFkX2NhciA9IG51bGw7XHJcbiAgICAgICAgLy/pu5jorqTnirbmgIFcclxuICAgICAgICB0aGlzLnByaWNlX2RpZmZlcmVuY2VfbGFiZWwubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuYnV5X2J1dHRvbi5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy51cGRhdGVfbm9kZSgpO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlX2FkX2NhcigpO1xyXG4gICAgfSxcclxuICAgIHVwZGF0ZV9ub2RlKCkge1xyXG4gICAgICAgIHRoaXMuaWNvbl9zcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWU7XHJcbiAgICAgICAgdmFyIGxldmVsID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5sZXZlbDtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwibGFuZFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnRyb2R1Y2U0X2xhYmVsLm5vZGUuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFyNF9pY29uLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmIChsZXZlbCA+PSBjb25maWcubGFuZFt0aGlzLmluZGV4XS5uZWVkX2xldmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/ovr7liLDop6PplIHmnaHku7ZcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmludHJvZHVjZV9sYWJlbC5zdHJpbmcgPSBcIkFkZGl0aW9uYWwgcGxhbnRpbmcgYXJlYVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW50cm9kdWNlMV9sYWJlbC5zdHJpbmcgPSBcIk1vcmUgYXJlYSB0byBwbGFudGluZ1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW50cm9kdWNlMl9sYWJlbC5zdHJpbmcgPSBcIlJlbWVtYmVyIHRvIHdhdGVyXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnRyb2R1Y2UzX2xhYmVsLnN0cmluZyA9ICBcIkxldmVsIFwiK2NvbmZpZy5sYW5kW3RoaXMuaW5kZXhdLm5lZWRfbGV2ZWwgK1wiIHVubG9ja1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5pbmRleF0uaGF2ZSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5pyq5oul5pyJXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJpY2VfZGlmZmVyZW5jZSA9IGNvbmZpZy5sYW5kW3RoaXMuaW5kZXhdLmNvc3QgLSB1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29zdF9sYWJlbC5zdHJpbmcgPSBjb25maWcubGFuZFt0aGlzLmluZGV4XS5jb3N0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhdmVfaWNvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEuZ29sZCA+PSBjb25maWcubGFuZFt0aGlzLmluZGV4XS5jb3N0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+mHkeW4gei2s+Wkn1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5idXlfYnV0dG9uLmludGVyYWN0YWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByaWNlX2RpZmZlcmVuY2VfbGFiZWwubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v6YeR5biB5LiN6LazXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1eV9idXR0b24uaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByaWNlX2RpZmZlcmVuY2VfbGFiZWwuc3RyaW5nID0gXCJOb3QgZW5vdWdoIGdvbGQgY29pbnMsIG5vdCBlbm91Z2hcIiArIHRoaXMucHJpY2VfZGlmZmVyZW5jZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+W3suaLpeaciVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhdmVfaWNvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1eV9idXR0b24ubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmljZV9kaWZmZXJlbmNlX2xhYmVsLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/mnKrovr7liLDop6PplIHmnaHku7ZcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmludHJvZHVjZV9sYWJlbC5zdHJpbmcgPSBcIj8/P1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW50cm9kdWNlMV9sYWJlbC5zdHJpbmcgPSBcIj8/P1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW50cm9kdWNlMl9sYWJlbC5zdHJpbmcgPSBcIj8/P1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW50cm9kdWNlM19sYWJlbC5zdHJpbmcgPSBcIkxldmVsIFwiK2NvbmZpZy5sYW5kW3RoaXMuaW5kZXhdLm5lZWRfbGV2ZWwgK1wiIHVubG9ja1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJpY2VfZGlmZmVyZW5jZV9sYWJlbC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29zdF9sYWJlbC5zdHJpbmcgPSBcIj8/P1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnV5X2J1dHRvbi5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhdmVfaWNvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJwbGFudFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnRyb2R1Y2U0X2xhYmVsLm5vZGUuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXI0X2ljb24uYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgICAgICBpZiAobGV2ZWwgPj0gY29uZmlnLnBsYW50W3RoaXMuaW5kZXhdLm5lZWRfbGV2ZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL+i+vuWIsOino+mUgeadoeS7tlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW50cm9kdWNlX2xhYmVsLnN0cmluZyA9IGNvbmZpZy5wbGFudFt0aGlzLmluZGV4XS5pbnRyb2R1Y2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnRyb2R1Y2UxX2xhYmVsLnN0cmluZyA9IFwiU2FsZSB2YWx1ZTogXCIgKyBjb25maWcucGxhbnRbdGhpcy5pbmRleF0uc2VsbDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmludHJvZHVjZTJfbGFiZWwuc3RyaW5nID0gXCJMaXZlc3BhbjogXCIgKyBjb25maWcucGxhbnRbdGhpcy5pbmRleF0uZ3Jvd190aW1lICsgXCJzZWNvbmRcIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmludHJvZHVjZTNfbGFiZWwuc3RyaW5nID0gXCJFeHBlcmllbmNlOiBcIiArIGNvbmZpZy5wbGFudFt0aGlzLmluZGV4XS5leHA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnRyb2R1Y2U0X2xhYmVsLnN0cmluZyA9IFwiTGV2ZWwgXCIrY29uZmlnLnBsYW50W3RoaXMuaW5kZXhdLm5lZWRfbGV2ZWwrXCIgdW5sb2NrXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEucGxhbnRbdGhpcy5pbmRleF0uaGF2ZSA9PSAwKSB7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+acquaLpeaciVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByaWNlX2RpZmZlcmVuY2UgPSBjb25maWcucGxhbnRbdGhpcy5pbmRleF0uY29zdCAtIHVzZXJfZGF0YS51c2VyX2RhdGEuZ29sZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb3N0X2xhYmVsLnN0cmluZyA9IGNvbmZpZy5wbGFudFt0aGlzLmluZGV4XS5jb3N0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhdmVfaWNvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEuZ29sZCA+PSBjb25maWcucGxhbnRbdGhpcy5pbmRleF0uY29zdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/ph5HluIHotrPlpJ9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnV5X2J1dHRvbi5pbnRlcmFjdGFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmljZV9kaWZmZXJlbmNlX2xhYmVsLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+mHkeW4geS4jei2s1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5idXlfYnV0dG9uLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmljZV9kaWZmZXJlbmNlX2xhYmVsLnN0cmluZyA9IFwiTm90IGVub3VnaCBnb2xkIGNvaW5zLCBub3QgZW5vdWdoXCIgKyB0aGlzLnByaWNlX2RpZmZlcmVuY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/lt7Lmi6XmnIlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXZlX2ljb24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5idXlfYnV0dG9uLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJpY2VfZGlmZmVyZW5jZV9sYWJlbC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5pyq6L6+5Yiw6Kej6ZSB5p2h5Lu2XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnRyb2R1Y2VfbGFiZWwuc3RyaW5nID0gXCI/Pz9cIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmludHJvZHVjZTFfbGFiZWwuc3RyaW5nID0gXCI/Pz9cIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmludHJvZHVjZTJfbGFiZWwuc3RyaW5nID0gXCI/Pz9cIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmludHJvZHVjZTNfbGFiZWwuc3RyaW5nID0gXCI/Pz9cIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmludHJvZHVjZTRfbGFiZWwuc3RyaW5nID0gXCJMZXZlbCBcIitjb25maWcucGxhbnRbdGhpcy5pbmRleF0ubmVlZF9sZXZlbCtcIiB1bmxvY2tcIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByaWNlX2RpZmZlcmVuY2VfbGFiZWwubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvc3RfbGFiZWwuc3RyaW5nID0gXCI/Pz9cIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1eV9idXR0b24uaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXZlX2ljb24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvL+i0reS5sOaMiemSruiiq+eCueWHu1xyXG4gICAgb25fYnV5X2J1dHRvbl9jbGljaygpIHtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwibGFuZFwiOlxyXG4gICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmluZGV4XS5oYXZlID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vanVkZ2UgbW9uZXlcclxuICAgICAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkID49IGNvbmZpZy5sYW5kW3RoaXMuaW5kZXhdLmNvc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/ph5HluIHotrPlpJ9cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29zdCA9IGNvbmZpZy5sYW5kW3RoaXMuaW5kZXhdLmNvc3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcy5hZGRfZ29sZCgtY29zdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmluZGV4XS5oYXZlID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9zY2VuZV9qcy5ub2RlLCBcImJ1eV9zdWNjZXNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5Yi35paw5Zyf5ZywXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcy51cGRhdGFfbGFuZCh0aGlzLmluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+mHkeW4geS4jei2s1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJ1bl9jbGlja1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9zY2VuZV9qcy5ub2RlLCBcIm5vX21vbmV5XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJwbGFudFwiOlxyXG4gICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEucGxhbnRbdGhpcy5pbmRleF0uaGF2ZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvL2p1ZGdlIG1vbmV5XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEuZ29sZCA+PSBjb25maWcucGxhbnRbdGhpcy5pbmRleF0uY29zdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+mHkeW4gei2s+Wkn1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fY2xpY2tcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb3N0ID0gY29uZmlnLnBsYW50W3RoaXMuaW5kZXhdLmNvc3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcy5hZGRfZ29sZCgtY29zdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEucGxhbnRbdGhpcy5pbmRleF0uaGF2ZSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfc2NlbmVfanMubm9kZSwgXCJidXlfc3VjY2VzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v6YeR5biB5LiN6LazXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcInVuX2NsaWNrXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIFwibm9fbW9uZXlcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnVwZGF0ZV9ub2RlKCk7XHJcbiAgICB9LFxyXG4gICAgLy/mm7TmlrBzY2hlZHVsZVxyXG4gICAgdXBkYXRlX3NjaGVkdWxlKCkge1xyXG4gICAgICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVfbm9kZSgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZShjYWxsYmFjaywgMSlcclxuICAgIH0sXHJcbiAgICAvL3RvdWNoIGV4aXRcclxuICAgIHRvdWNoX2V4aXQoKSB7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2V4aXRcIik7XHJcbiAgICAgICAgaWYgKHRoaXMuYWRfY2FyICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGNjLmxvZyhcImFkX2NhciBkZXN0cm95XCIpXHJcbiAgICAgICAgICAgIHRoaXMuYWRfY2FyLmRlc3Ryb3koKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5vbl9ub2RlX2tpbGwodGhpcy5ub2RlKTtcclxuICAgIH0sXHJcbiAgICBjcmVhdGVfYWRfY2FyKCkge1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJsYW5kXCI6XHJcbiAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMuaW5kZXhdLmhhdmUgIT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5pyq5oul5pyJ6L+Z5Z2X5ZywXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGdvbGQgPSB1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFsbF9jYXBhY2l0eSA9IDUwMCAqIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxbXCJnb2xkX21heFwiXSArIDUwMDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY29zdCA9IGNvbmZpZy5sYW5kW3RoaXMuaW5kZXhdLmNvc3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/lt67ku7dcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcHJpY2VfZGlmZmVyZW5jZSA9IGNvc3QgLSBnb2xkO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5aSn5LqONC81LOS4lOiDveWkn+aLpeacie+8jOS4lOmHkeW4geS4jei2s1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChnb2xkID49IGNvc3QgKiAoNCAvIDUpICYmIGFsbF9jYXBhY2l0eSA+PSBjb3N0ICYmIGdvbGQgPCBjb3N0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRfY2FyID0gdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9hZF9jYXIodGhpcy5ub2RlLCBwcmljZV9kaWZmZXJlbmNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvL+aLpeaciei/meWdl+WcsFxyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInBsYW50XCI6XHJcbiAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5wbGFudFt0aGlzLmluZGV4XS5oYXZlICE9IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL+acquaLpeaciei/meS4quakjeeJqVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBnb2xkID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhbGxfY2FwYWNpdHkgPSA1MDAgKiB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1wiZ29sZF9tYXhcIl0gKyA1MDA7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvc3QgPSBjb25maWcucGxhbnRbdGhpcy5pbmRleF0uY29zdDtcclxuICAgICAgICAgICAgICAgICAgICAvL+W3ruS7t1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwcmljZV9kaWZmZXJlbmNlID0gY29zdCAtIGdvbGQ7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/lpKfkuo40LzUs5LiU6IO95aSf5oul5pyJ77yM5LiU6YeR5biB5LiN6LazXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdvbGQgPj0gY29zdCAqICg0IC8gNSkgJiYgYWxsX2NhcGFjaXR5ID49IGNvc3QgJiYgZ29sZCA8IGNvc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZF9jYXIgPSB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX2FkX2Nhcih0aGlzLm5vZGUsIHByaWNlX2RpZmZlcmVuY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5oul5pyJ6L+Z5Liq5qSN54mpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfTtcclxuXHJcblxyXG4gICAgfSxcclxuICAgIC8vIG9uTG9hZCAoKSB7fSxcclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZV9zY2hlZHVsZSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcclxufSk7XHJcbiJdfQ==