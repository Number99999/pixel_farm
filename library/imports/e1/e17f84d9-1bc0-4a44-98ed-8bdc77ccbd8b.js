"use strict";
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