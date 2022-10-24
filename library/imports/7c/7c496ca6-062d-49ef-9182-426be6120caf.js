"use strict";
cc._RF.push(module, '7c496ymBi1J75GCQmvmEgyv', 'skill_content');
// script/ui/skill_content.js

"use strict";

var user_data = require("user_data");

cc.Class({
  "extends": cc.Component,
  properties: {
    name_frame: cc.Sprite,
    icon_frame: cc.Sprite,
    button_frame: cc.Sprite,
    level_label: cc.Label,
    introduce_label: cc.Label,
    progress: cc.ProgressBar,
    name_frame_arr: [cc.SpriteFrame],
    icon_frame_arr: [cc.SpriteFrame],
    button_frame_arr: [cc.SpriteFrame]
  },
  // LIFE-CYCLE CALLBACKS:
  ini_node: function ini_node(skill_index) {
    this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
    this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
    this.sound_control = cc.find("sound_control").getComponent("sound_control");
    this.skill_index = skill_index;
    this.set_content();
  },
  set_content: function set_content() {
    var gold_max = user_data.user_data.skill["gold_max"];
    var speed_the_cut = user_data.user_data.skill["speed_the_cut"];
    var water_saving = user_data.user_data.skill["water_saving"];
    var tool_improve = user_data.user_data.skill["tool_improve"];
    var labor_contract = user_data.user_data.skill["labor_contract"];
    var offline_profit = user_data.user_data.skill["offline_profit"];

    switch (this.skill_index) {
      case 0:
        this.icon_frame.spriteFrame = this.icon_frame_arr[this.skill_index];
        this.name_frame.spriteFrame = this.name_frame_arr[this.skill_index];
        this.button_frame.spriteFrame = this.button_frame_arr[0];
        this.introduce_label.string = "Max gold+" + (500 * gold_max + 500);
        this.level_label.string = "lv: " + gold_max;
        this.progress.progress = gold_max / 100;

        if (gold_max >= 100) {
          this.button_frame.node.active = false;
        } else this.button_frame.node.active = true;

        break;

      case 1:
        this.icon_frame.spriteFrame = this.icon_frame_arr[this.skill_index];
        this.name_frame.spriteFrame = this.name_frame_arr[this.skill_index];
        this.button_frame.spriteFrame = this.button_frame_arr[0];
        this.introduce_label.string = "Harvest plants faster " + (speed_the_cut + 1) + "%";
        this.level_label.string = "lv: " + speed_the_cut;
        this.progress.progress = speed_the_cut / 100;

        if (speed_the_cut >= 100) {
          this.button_frame.node.active = false;
        } else this.button_frame.node.active = true;

        break;

      case 2:
        this.icon_frame.spriteFrame = this.icon_frame_arr[this.skill_index];
        this.name_frame.spriteFrame = this.name_frame_arr[this.skill_index];
        this.button_frame.spriteFrame = this.button_frame_arr[0];
        this.introduce_label.string = "Plant growth consumes less resource " + (water_saving + 1) + "%";
        this.level_label.string = "lv: " + water_saving;
        this.progress.progress = water_saving / 100;

        if (water_saving >= 100) {
          this.button_frame.node.active = false;
        } else this.button_frame.node.active = true;

        break;

      case 3:
        this.icon_frame.spriteFrame = this.icon_frame_arr[this.skill_index];
        this.name_frame.spriteFrame = this.name_frame_arr[this.skill_index];
        this.button_frame.spriteFrame = this.button_frame_arr[0];
        this.introduce_label.string = "Faster planting " + (tool_improve + 1) + "%";
        this.level_label.string = "lv: " + tool_improve;
        this.progress.progress = tool_improve / 100;

        if (tool_improve >= 100) {
          this.button_frame.node.active = false;
        } else this.button_frame.node.active = true;

        break;

      case 4:
        this.icon_frame.spriteFrame = this.icon_frame_arr[this.skill_index];
        this.name_frame.spriteFrame = this.name_frame_arr[this.skill_index];
        this.button_frame.spriteFrame = this.button_frame_arr[0];
        this.introduce_label.string = "Extend worker hours " + (labor_contract + 1) + " \nseconds";
        this.level_label.string = "lv: " + labor_contract;
        this.progress.progress = labor_contract / 100;

        if (labor_contract >= 100) {
          this.button_frame.node.active = false;
        } else this.button_frame.node.active = true;

        break;

      case 5:
        this.icon_frame.spriteFrame = this.icon_frame_arr[this.skill_index];
        this.name_frame.spriteFrame = this.name_frame_arr[this.skill_index];
        this.button_frame.spriteFrame = this.button_frame_arr[0];
        this.introduce_label.string = "Extra every 5 minutes " + (offline_profit + 1) + " \ngold";
        this.level_label.string = "lv: " + offline_profit;
        this.progress.progress = offline_profit / 100;

        if (offline_profit >= 100) {
          this.button_frame.node.active = false;
        } else this.button_frame.node.active = true;

        break;

      default:
        return;
    }

    ;
  },
  //刷新button
  update_button: function update_button() {
    if (user_data.user_data.skill_point > 0) {
      this.button_frame.node.getComponent(cc.Button).interactable = true;
    } else {
      this.button_frame.node.getComponent(cc.Button).interactable = false;
    }

    ;

    var callback = function callback() {
      if (user_data.user_data.skill_point > 0) {
        this.button_frame.node.getComponent(cc.Button).interactable = true;
      } else {
        this.button_frame.node.getComponent(cc.Button).interactable = false;
      }

      ;

      for (var i = 0; i < 6; i++) {}
    };

    this.schedule(callback, 0.5);
  },
  on_button_click: function on_button_click() {
    if (user_data.user_data.skill_point >= 1) {
      user_data.user_data.skill_point--;

      switch (this.skill_index) {
        case 0:
          user_data.user_data.skill["gold_max"]++;
          this.game_rules_js.set_gold_progress();
          break;

        case 1:
          user_data.user_data.skill["speed_the_cut"]++;
          break;

        case 2:
          user_data.user_data.skill["water_saving"]++;
          break;

        case 3:
          user_data.user_data.skill["tool_improve"]++;
          break;

        case 4:
          user_data.user_data.skill["labor_contract"]++;
          break;

        case 5:
          user_data.user_data.skill["offline_profit"]++;
          break;
      }

      ;
      this.set_content();
      this.sound_control.play_sound_effect("button_click");
    } else {
      this.sound_control.play_sound_effect("un_click");
      this.game_scene_js.create_tips_ui(this.game_rules_js.node, "no_skill_point");
      return;
    }

    ;
  },
  onLoad: function onLoad() {},
  start: function start() {
    this.update_button();
  } // update (dt) {},

});

cc._RF.pop();