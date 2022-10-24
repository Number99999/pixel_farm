
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ui/skill_content.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcc2tpbGxfY29udGVudC5qcyJdLCJuYW1lcyI6WyJ1c2VyX2RhdGEiLCJyZXF1aXJlIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJuYW1lX2ZyYW1lIiwiU3ByaXRlIiwiaWNvbl9mcmFtZSIsImJ1dHRvbl9mcmFtZSIsImxldmVsX2xhYmVsIiwiTGFiZWwiLCJpbnRyb2R1Y2VfbGFiZWwiLCJwcm9ncmVzcyIsIlByb2dyZXNzQmFyIiwibmFtZV9mcmFtZV9hcnIiLCJTcHJpdGVGcmFtZSIsImljb25fZnJhbWVfYXJyIiwiYnV0dG9uX2ZyYW1lX2FyciIsImluaV9ub2RlIiwic2tpbGxfaW5kZXgiLCJnYW1lX3NjZW5lX2pzIiwiZmluZCIsImdldENvbXBvbmVudCIsImdhbWVfcnVsZXNfanMiLCJzb3VuZF9jb250cm9sIiwic2V0X2NvbnRlbnQiLCJnb2xkX21heCIsInNraWxsIiwic3BlZWRfdGhlX2N1dCIsIndhdGVyX3NhdmluZyIsInRvb2xfaW1wcm92ZSIsImxhYm9yX2NvbnRyYWN0Iiwib2ZmbGluZV9wcm9maXQiLCJzcHJpdGVGcmFtZSIsInN0cmluZyIsIm5vZGUiLCJhY3RpdmUiLCJ1cGRhdGVfYnV0dG9uIiwic2tpbGxfcG9pbnQiLCJCdXR0b24iLCJpbnRlcmFjdGFibGUiLCJjYWxsYmFjayIsImkiLCJzY2hlZHVsZSIsIm9uX2J1dHRvbl9jbGljayIsInNldF9nb2xkX3Byb2dyZXNzIiwicGxheV9zb3VuZF9lZmZlY3QiLCJjcmVhdGVfdGlwc191aSIsIm9uTG9hZCIsInN0YXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLFNBQVMsR0FBR0MsT0FBTyxDQUFDLFdBQUQsQ0FBdkI7O0FBQ0FDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxVQUFV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S0xDLEVBQUFBLEtBdktLLG1CQXVLRztBQUNKLFNBQUtaLGFBQUw7QUFDSCxHQXpLSSxDQTJLTDs7QUEzS0ssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHVzZXJfZGF0YSA9IHJlcXVpcmUoXCJ1c2VyX2RhdGFcIik7XG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBuYW1lX2ZyYW1lOiBjYy5TcHJpdGUsXG4gICAgICAgIGljb25fZnJhbWU6IGNjLlNwcml0ZSxcbiAgICAgICAgYnV0dG9uX2ZyYW1lOiBjYy5TcHJpdGUsXG4gICAgICAgIGxldmVsX2xhYmVsOiBjYy5MYWJlbCxcbiAgICAgICAgaW50cm9kdWNlX2xhYmVsOiBjYy5MYWJlbCxcbiAgICAgICAgcHJvZ3Jlc3M6IGNjLlByb2dyZXNzQmFyLFxuICAgICAgICBuYW1lX2ZyYW1lX2FycjogW2NjLlNwcml0ZUZyYW1lXSxcbiAgICAgICAgaWNvbl9mcmFtZV9hcnI6IFtjYy5TcHJpdGVGcmFtZV0sXG4gICAgICAgIGJ1dHRvbl9mcmFtZV9hcnI6IFtjYy5TcHJpdGVGcmFtZV0sXG4gICAgfSxcblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuICAgIGluaV9ub2RlOiBmdW5jdGlvbiAoc2tpbGxfaW5kZXgpIHtcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9zY2VuZVwiKTtcbiAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9ydWxlc1wiKTtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sID0gY2MuZmluZChcInNvdW5kX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwic291bmRfY29udHJvbFwiKTtcbiAgICAgICAgdGhpcy5za2lsbF9pbmRleCA9IHNraWxsX2luZGV4O1xuICAgICAgICB0aGlzLnNldF9jb250ZW50KCk7XG4gICAgfSxcbiAgICBzZXRfY29udGVudDogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZ29sZF9tYXggPSB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1wiZ29sZF9tYXhcIl07XG4gICAgICAgIHZhciBzcGVlZF90aGVfY3V0ID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbFtcInNwZWVkX3RoZV9jdXRcIl07XG4gICAgICAgIHZhciB3YXRlcl9zYXZpbmcgPSB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1wid2F0ZXJfc2F2aW5nXCJdO1xuICAgICAgICB2YXIgdG9vbF9pbXByb3ZlID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbFtcInRvb2xfaW1wcm92ZVwiXTtcbiAgICAgICAgdmFyIGxhYm9yX2NvbnRyYWN0ID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbFtcImxhYm9yX2NvbnRyYWN0XCJdO1xuICAgICAgICB2YXIgb2ZmbGluZV9wcm9maXQgPSB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1wib2ZmbGluZV9wcm9maXRcIl07XG4gICAgICAgIHN3aXRjaCAodGhpcy5za2lsbF9pbmRleCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbdGhpcy5za2lsbF9pbmRleF07XG4gICAgICAgICAgICAgICAgdGhpcy5uYW1lX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5uYW1lX2ZyYW1lX2Fyclt0aGlzLnNraWxsX2luZGV4XTtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuYnV0dG9uX2ZyYW1lX2FyclswXTtcbiAgICAgICAgICAgICAgICB0aGlzLmludHJvZHVjZV9sYWJlbC5zdHJpbmcgPSBcIk1heCBnb2xkK1wiICsgKDUwMCAqIGdvbGRfbWF4ICsgNTAwKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxldmVsX2xhYmVsLnN0cmluZyA9IFwibHY6IFwiICsgZ29sZF9tYXg7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzcy5wcm9ncmVzcyA9IGdvbGRfbWF4IC8gMTAwO1xuICAgICAgICAgICAgICAgIGlmIChnb2xkX21heCA+PSAxMDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idXR0b25fZnJhbWUubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB0aGlzLmJ1dHRvbl9mcmFtZS5ub2RlLmFjdGl2ZT10cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbdGhpcy5za2lsbF9pbmRleF07XG4gICAgICAgICAgICAgICAgdGhpcy5uYW1lX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5uYW1lX2ZyYW1lX2Fyclt0aGlzLnNraWxsX2luZGV4XTtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuYnV0dG9uX2ZyYW1lX2FyclswXTtcbiAgICAgICAgICAgICAgICB0aGlzLmludHJvZHVjZV9sYWJlbC5zdHJpbmcgPSBcIkhhcnZlc3QgcGxhbnRzIGZhc3RlciBcIiArIChzcGVlZF90aGVfY3V0ICsgMSkgKyBcIiVcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmxldmVsX2xhYmVsLnN0cmluZyA9IFwibHY6IFwiICsgc3BlZWRfdGhlX2N1dDtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzLnByb2dyZXNzID0gc3BlZWRfdGhlX2N1dCAvIDEwMDtcbiAgICAgICAgICAgICAgICBpZiAoc3BlZWRfdGhlX2N1dCA+PSAxMDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idXR0b25fZnJhbWUubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB0aGlzLmJ1dHRvbl9mcmFtZS5ub2RlLmFjdGl2ZT10cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbdGhpcy5za2lsbF9pbmRleF07XG4gICAgICAgICAgICAgICAgdGhpcy5uYW1lX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5uYW1lX2ZyYW1lX2Fyclt0aGlzLnNraWxsX2luZGV4XTtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuYnV0dG9uX2ZyYW1lX2FyclswXTtcbiAgICAgICAgICAgICAgICB0aGlzLmludHJvZHVjZV9sYWJlbC5zdHJpbmcgPSBcIlBsYW50IGdyb3d0aCBjb25zdW1lcyBsZXNzIHJlc291cmNlIFwiICsgKHdhdGVyX3NhdmluZyArIDEpICsgXCIlXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbF9sYWJlbC5zdHJpbmcgPSBcImx2OiBcIiArIHdhdGVyX3NhdmluZztcbiAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzLnByb2dyZXNzID0gd2F0ZXJfc2F2aW5nIC8gMTAwO1xuICAgICAgICAgICAgICAgIGlmICh3YXRlcl9zYXZpbmcgPj0gMTAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uX2ZyYW1lLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgdGhpcy5idXR0b25fZnJhbWUubm9kZS5hY3RpdmU9dHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyW3RoaXMuc2tpbGxfaW5kZXhdO1xuICAgICAgICAgICAgICAgIHRoaXMubmFtZV9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMubmFtZV9mcmFtZV9hcnJbdGhpcy5za2lsbF9pbmRleF07XG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmJ1dHRvbl9mcmFtZV9hcnJbMF07XG4gICAgICAgICAgICAgICAgdGhpcy5pbnRyb2R1Y2VfbGFiZWwuc3RyaW5nID0gXCJGYXN0ZXIgcGxhbnRpbmcgXCIgKyAodG9vbF9pbXByb3ZlICsgMSkgKyBcIiVcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmxldmVsX2xhYmVsLnN0cmluZyA9IFwibHY6IFwiICsgdG9vbF9pbXByb3ZlO1xuICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3MucHJvZ3Jlc3MgPSB0b29sX2ltcHJvdmUgLyAxMDA7XG4gICAgICAgICAgICAgICAgaWYgKHRvb2xfaW1wcm92ZSA+PSAxMDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idXR0b25fZnJhbWUubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB0aGlzLmJ1dHRvbl9mcmFtZS5ub2RlLmFjdGl2ZT10cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbdGhpcy5za2lsbF9pbmRleF07XG4gICAgICAgICAgICAgICAgdGhpcy5uYW1lX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5uYW1lX2ZyYW1lX2Fyclt0aGlzLnNraWxsX2luZGV4XTtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuYnV0dG9uX2ZyYW1lX2FyclswXTtcbiAgICAgICAgICAgICAgICB0aGlzLmludHJvZHVjZV9sYWJlbC5zdHJpbmcgPSBcIkV4dGVuZCB3b3JrZXIgaG91cnMgXCIgKyAobGFib3JfY29udHJhY3QgKyAxKSArIFwiIFxcbnNlY29uZHNcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmxldmVsX2xhYmVsLnN0cmluZyA9IFwibHY6IFwiICsgbGFib3JfY29udHJhY3Q7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzcy5wcm9ncmVzcyA9IGxhYm9yX2NvbnRyYWN0IC8gMTAwO1xuICAgICAgICAgICAgICAgIGlmIChsYWJvcl9jb250cmFjdCA+PSAxMDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idXR0b25fZnJhbWUubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB0aGlzLmJ1dHRvbl9mcmFtZS5ub2RlLmFjdGl2ZT10cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbdGhpcy5za2lsbF9pbmRleF07XG4gICAgICAgICAgICAgICAgdGhpcy5uYW1lX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5uYW1lX2ZyYW1lX2Fyclt0aGlzLnNraWxsX2luZGV4XTtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuYnV0dG9uX2ZyYW1lX2FyclswXTtcbiAgICAgICAgICAgICAgICB0aGlzLmludHJvZHVjZV9sYWJlbC5zdHJpbmcgPSBcIkV4dHJhIGV2ZXJ5IDUgbWludXRlcyBcIiArIChvZmZsaW5lX3Byb2ZpdCArIDEpICsgXCIgXFxuZ29sZFwiO1xuICAgICAgICAgICAgICAgIHRoaXMubGV2ZWxfbGFiZWwuc3RyaW5nID0gXCJsdjogXCIgKyBvZmZsaW5lX3Byb2ZpdDtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzLnByb2dyZXNzID0gb2ZmbGluZV9wcm9maXQgLyAxMDA7XG4gICAgICAgICAgICAgICAgaWYgKG9mZmxpbmVfcHJvZml0ID49IDEwMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbl9mcmFtZS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHRoaXMuYnV0dG9uX2ZyYW1lLm5vZGUuYWN0aXZlPXRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIC8v5Yi35pawYnV0dG9uXG4gICAgdXBkYXRlX2J1dHRvbigpIHtcbiAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxfcG9pbnQgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmJ1dHRvbl9mcmFtZS5ub2RlLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmJ1dHRvbl9mcmFtZS5ub2RlLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbF9wb2ludCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbl9mcmFtZS5ub2RlLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uX2ZyYW1lLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZm9yKGxldCBpID0wOyBpPDY7IGkrKylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuc2NoZWR1bGUoY2FsbGJhY2ssIDAuNSk7XG4gICAgfSxcbiAgICBvbl9idXR0b25fY2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxfcG9pbnQgPj0gMSkge1xuICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbF9wb2ludC0tO1xuICAgICAgICAgICAgc3dpdGNoICh0aGlzLnNraWxsX2luZGV4KSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1wiZ29sZF9tYXhcIl0rKztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLnNldF9nb2xkX3Byb2dyZXNzKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbFtcInNwZWVkX3RoZV9jdXRcIl0rKztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1wid2F0ZXJfc2F2aW5nXCJdKys7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbFtcInRvb2xfaW1wcm92ZVwiXSsrO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxbXCJsYWJvcl9jb250cmFjdFwiXSsrO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxbXCJvZmZsaW5lX3Byb2ZpdFwiXSsrO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLnNldF9jb250ZW50KCk7XG4gICAgICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fY2xpY2tcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJ1bl9jbGlja1wiKTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfcnVsZXNfanMubm9kZSwgXCJub19za2lsbF9wb2ludFwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfTtcblxuICAgIH0sXG4gICAgb25Mb2FkKCkge1xuXG5cbiAgICB9LFxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMudXBkYXRlX2J1dHRvbigpO1xuICAgIH0sXG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcbn0pO1xuIl19