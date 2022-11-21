
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
        this.introduce_label.string = "Max gold: " + (500 * gold_max + 500);
        this.level_label.string = "lv: " + gold_max;
        this.progress.progress = gold_max / 200;

        if (gold_max >= 200) {
          this.button_frame.node.active = false;
        } else this.button_frame.node.active = true;

        break;

      case 1:
        this.icon_frame.spriteFrame = this.icon_frame_arr[this.skill_index];
        this.name_frame.spriteFrame = this.name_frame_arr[this.skill_index];
        this.button_frame.spriteFrame = this.button_frame_arr[0];
        this.introduce_label.string = "Harvest plants faster " + (speed_the_cut + 1) + "%";
        this.level_label.string = "lv: " + speed_the_cut;
        this.progress.progress = speed_the_cut / 99;

        if (speed_the_cut >= 99) {
          this.button_frame.node.active = false;
        } else this.button_frame.node.active = true;

        break;

      case 2:
        this.icon_frame.spriteFrame = this.icon_frame_arr[this.skill_index];
        this.name_frame.spriteFrame = this.name_frame_arr[this.skill_index];
        this.button_frame.spriteFrame = this.button_frame_arr[0];
        this.introduce_label.string = "Plant growth consumes less resource " + (water_saving + 1) + "%";
        this.level_label.string = "lv: " + water_saving;
        this.progress.progress = water_saving / 99;

        if (water_saving >= 99) {
          this.button_frame.node.active = false;
        } else this.button_frame.node.active = true;

        break;

      case 3:
        this.icon_frame.spriteFrame = this.icon_frame_arr[this.skill_index];
        this.name_frame.spriteFrame = this.name_frame_arr[this.skill_index];
        this.button_frame.spriteFrame = this.button_frame_arr[0];
        this.introduce_label.string = "Faster planting " + (tool_improve + 1) + "%";
        this.level_label.string = "lv: " + tool_improve;
        this.progress.progress = tool_improve / 99;

        if (tool_improve >= 99) {
          this.button_frame.node.active = false;
        } else this.button_frame.node.active = true;

        break;

      case 4:
        this.icon_frame.spriteFrame = this.icon_frame_arr[this.skill_index];
        this.name_frame.spriteFrame = this.name_frame_arr[this.skill_index];
        this.button_frame.spriteFrame = this.button_frame_arr[0];
        this.introduce_label.string = "Extend worker hours " + (labor_contract + 1) + " \nseconds";
        this.level_label.string = "lv: " + labor_contract;
        this.progress.progress = labor_contract / 99;

        if (labor_contract >= 99) {
          this.button_frame.node.active = false;
        } else this.button_frame.node.active = true;

        break;

      case 5:
        this.icon_frame.spriteFrame = this.icon_frame_arr[this.skill_index];
        this.name_frame.spriteFrame = this.name_frame_arr[this.skill_index];
        this.button_frame.spriteFrame = this.button_frame_arr[0];
        this.introduce_label.string = "Extra every 5 minutes " + (offline_profit + 1) + " \ngold";
        this.level_label.string = "lv: " + offline_profit;
        this.progress.progress = offline_profit / 99;

        if (offline_profit >= 99) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcc2tpbGxfY29udGVudC5qcyJdLCJuYW1lcyI6WyJ1c2VyX2RhdGEiLCJyZXF1aXJlIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJuYW1lX2ZyYW1lIiwiU3ByaXRlIiwiaWNvbl9mcmFtZSIsImJ1dHRvbl9mcmFtZSIsImxldmVsX2xhYmVsIiwiTGFiZWwiLCJpbnRyb2R1Y2VfbGFiZWwiLCJwcm9ncmVzcyIsIlByb2dyZXNzQmFyIiwibmFtZV9mcmFtZV9hcnIiLCJTcHJpdGVGcmFtZSIsImljb25fZnJhbWVfYXJyIiwiYnV0dG9uX2ZyYW1lX2FyciIsImluaV9ub2RlIiwic2tpbGxfaW5kZXgiLCJnYW1lX3NjZW5lX2pzIiwiZmluZCIsImdldENvbXBvbmVudCIsImdhbWVfcnVsZXNfanMiLCJzb3VuZF9jb250cm9sIiwic2V0X2NvbnRlbnQiLCJnb2xkX21heCIsInNraWxsIiwic3BlZWRfdGhlX2N1dCIsIndhdGVyX3NhdmluZyIsInRvb2xfaW1wcm92ZSIsImxhYm9yX2NvbnRyYWN0Iiwib2ZmbGluZV9wcm9maXQiLCJzcHJpdGVGcmFtZSIsInN0cmluZyIsIm5vZGUiLCJhY3RpdmUiLCJ1cGRhdGVfYnV0dG9uIiwic2tpbGxfcG9pbnQiLCJCdXR0b24iLCJpbnRlcmFjdGFibGUiLCJjYWxsYmFjayIsImkiLCJzY2hlZHVsZSIsIm9uX2J1dHRvbl9jbGljayIsInNldF9nb2xkX3Byb2dyZXNzIiwicGxheV9zb3VuZF9lZmZlY3QiLCJjcmVhdGVfdGlwc191aSIsIm9uTG9hZCIsInN0YXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLFNBQVMsR0FBR0MsT0FBTyxDQUFDLFdBQUQsQ0FBdkI7O0FBQ0FDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxVQUFV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QXVLTEMsRUFBQUEsS0F2S0ssbUJBdUtHO0FBQ0osU0FBS1osYUFBTDtBQUNILEdBektJLENBMktMOztBQTNLSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgdXNlcl9kYXRhID0gcmVxdWlyZShcInVzZXJfZGF0YVwiKTtcbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIG5hbWVfZnJhbWU6IGNjLlNwcml0ZSxcbiAgICAgICAgaWNvbl9mcmFtZTogY2MuU3ByaXRlLFxuICAgICAgICBidXR0b25fZnJhbWU6IGNjLlNwcml0ZSxcbiAgICAgICAgbGV2ZWxfbGFiZWw6IGNjLkxhYmVsLFxuICAgICAgICBpbnRyb2R1Y2VfbGFiZWw6IGNjLkxhYmVsLFxuICAgICAgICBwcm9ncmVzczogY2MuUHJvZ3Jlc3NCYXIsXG4gICAgICAgIG5hbWVfZnJhbWVfYXJyOiBbY2MuU3ByaXRlRnJhbWVdLFxuICAgICAgICBpY29uX2ZyYW1lX2FycjogW2NjLlNwcml0ZUZyYW1lXSxcbiAgICAgICAgYnV0dG9uX2ZyYW1lX2FycjogW2NjLlNwcml0ZUZyYW1lXSxcbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG4gICAgaW5pX25vZGU6IGZ1bmN0aW9uIChza2lsbF9pbmRleCkge1xuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJnYW1lX3NjZW5lXCIpO1xuICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJnYW1lX3J1bGVzXCIpO1xuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wgPSBjYy5maW5kKFwic291bmRfY29udHJvbFwiKS5nZXRDb21wb25lbnQoXCJzb3VuZF9jb250cm9sXCIpO1xuICAgICAgICB0aGlzLnNraWxsX2luZGV4ID0gc2tpbGxfaW5kZXg7XG4gICAgICAgIHRoaXMuc2V0X2NvbnRlbnQoKTtcbiAgICB9LFxuICAgIHNldF9jb250ZW50OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBnb2xkX21heCA9IHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxbXCJnb2xkX21heFwiXTtcbiAgICAgICAgdmFyIHNwZWVkX3RoZV9jdXQgPSB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1wic3BlZWRfdGhlX2N1dFwiXTtcbiAgICAgICAgdmFyIHdhdGVyX3NhdmluZyA9IHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxbXCJ3YXRlcl9zYXZpbmdcIl07XG4gICAgICAgIHZhciB0b29sX2ltcHJvdmUgPSB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1widG9vbF9pbXByb3ZlXCJdO1xuICAgICAgICB2YXIgbGFib3JfY29udHJhY3QgPSB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1wibGFib3JfY29udHJhY3RcIl07XG4gICAgICAgIHZhciBvZmZsaW5lX3Byb2ZpdCA9IHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxbXCJvZmZsaW5lX3Byb2ZpdFwiXTtcbiAgICAgICAgc3dpdGNoICh0aGlzLnNraWxsX2luZGV4KSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2Fyclt0aGlzLnNraWxsX2luZGV4XTtcbiAgICAgICAgICAgICAgICB0aGlzLm5hbWVfZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLm5hbWVfZnJhbWVfYXJyW3RoaXMuc2tpbGxfaW5kZXhdO1xuICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5idXR0b25fZnJhbWVfYXJyWzBdO1xuICAgICAgICAgICAgICAgIHRoaXMuaW50cm9kdWNlX2xhYmVsLnN0cmluZyA9IFwiTWF4IGdvbGQ6IFwiICsgKDUwMCAqIGdvbGRfbWF4ICsgNTAwKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxldmVsX2xhYmVsLnN0cmluZyA9IFwibHY6IFwiICsgZ29sZF9tYXg7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzcy5wcm9ncmVzcyA9IGdvbGRfbWF4IC8gMjAwO1xuICAgICAgICAgICAgICAgIGlmIChnb2xkX21heCA+PSAyMDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idXR0b25fZnJhbWUubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB0aGlzLmJ1dHRvbl9mcmFtZS5ub2RlLmFjdGl2ZT10cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbdGhpcy5za2lsbF9pbmRleF07XG4gICAgICAgICAgICAgICAgdGhpcy5uYW1lX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5uYW1lX2ZyYW1lX2Fyclt0aGlzLnNraWxsX2luZGV4XTtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuYnV0dG9uX2ZyYW1lX2FyclswXTtcbiAgICAgICAgICAgICAgICB0aGlzLmludHJvZHVjZV9sYWJlbC5zdHJpbmcgPSBcIkhhcnZlc3QgcGxhbnRzIGZhc3RlciBcIiArIChzcGVlZF90aGVfY3V0ICsgMSkgKyBcIiVcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmxldmVsX2xhYmVsLnN0cmluZyA9IFwibHY6IFwiICsgc3BlZWRfdGhlX2N1dDtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzLnByb2dyZXNzID0gc3BlZWRfdGhlX2N1dCAvIDk5O1xuICAgICAgICAgICAgICAgIGlmIChzcGVlZF90aGVfY3V0ID49IDk5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uX2ZyYW1lLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgdGhpcy5idXR0b25fZnJhbWUubm9kZS5hY3RpdmU9dHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyW3RoaXMuc2tpbGxfaW5kZXhdO1xuICAgICAgICAgICAgICAgIHRoaXMubmFtZV9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMubmFtZV9mcmFtZV9hcnJbdGhpcy5za2lsbF9pbmRleF07XG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmJ1dHRvbl9mcmFtZV9hcnJbMF07XG4gICAgICAgICAgICAgICAgdGhpcy5pbnRyb2R1Y2VfbGFiZWwuc3RyaW5nID0gXCJQbGFudCBncm93dGggY29uc3VtZXMgbGVzcyByZXNvdXJjZSBcIiArICh3YXRlcl9zYXZpbmcgKyAxKSArIFwiJVwiO1xuICAgICAgICAgICAgICAgIHRoaXMubGV2ZWxfbGFiZWwuc3RyaW5nID0gXCJsdjogXCIgKyB3YXRlcl9zYXZpbmc7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzcy5wcm9ncmVzcyA9IHdhdGVyX3NhdmluZyAvIDk5O1xuICAgICAgICAgICAgICAgIGlmICh3YXRlcl9zYXZpbmcgPj0gOTkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idXR0b25fZnJhbWUubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB0aGlzLmJ1dHRvbl9mcmFtZS5ub2RlLmFjdGl2ZT10cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbdGhpcy5za2lsbF9pbmRleF07XG4gICAgICAgICAgICAgICAgdGhpcy5uYW1lX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5uYW1lX2ZyYW1lX2Fyclt0aGlzLnNraWxsX2luZGV4XTtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuYnV0dG9uX2ZyYW1lX2FyclswXTtcbiAgICAgICAgICAgICAgICB0aGlzLmludHJvZHVjZV9sYWJlbC5zdHJpbmcgPSBcIkZhc3RlciBwbGFudGluZyBcIiArICh0b29sX2ltcHJvdmUgKyAxKSArIFwiJVwiO1xuICAgICAgICAgICAgICAgIHRoaXMubGV2ZWxfbGFiZWwuc3RyaW5nID0gXCJsdjogXCIgKyB0b29sX2ltcHJvdmU7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzcy5wcm9ncmVzcyA9IHRvb2xfaW1wcm92ZSAvIDk5O1xuICAgICAgICAgICAgICAgIGlmICh0b29sX2ltcHJvdmUgPj0gOTkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idXR0b25fZnJhbWUubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB0aGlzLmJ1dHRvbl9mcmFtZS5ub2RlLmFjdGl2ZT10cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbdGhpcy5za2lsbF9pbmRleF07XG4gICAgICAgICAgICAgICAgdGhpcy5uYW1lX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5uYW1lX2ZyYW1lX2Fyclt0aGlzLnNraWxsX2luZGV4XTtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuYnV0dG9uX2ZyYW1lX2FyclswXTtcbiAgICAgICAgICAgICAgICB0aGlzLmludHJvZHVjZV9sYWJlbC5zdHJpbmcgPSBcIkV4dGVuZCB3b3JrZXIgaG91cnMgXCIgKyAobGFib3JfY29udHJhY3QgKyAxKSArIFwiIFxcbnNlY29uZHNcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmxldmVsX2xhYmVsLnN0cmluZyA9IFwibHY6IFwiICsgbGFib3JfY29udHJhY3Q7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzcy5wcm9ncmVzcyA9IGxhYm9yX2NvbnRyYWN0IC8gOTk7XG4gICAgICAgICAgICAgICAgaWYgKGxhYm9yX2NvbnRyYWN0ID49IDk5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uX2ZyYW1lLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgdGhpcy5idXR0b25fZnJhbWUubm9kZS5hY3RpdmU9dHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyW3RoaXMuc2tpbGxfaW5kZXhdO1xuICAgICAgICAgICAgICAgIHRoaXMubmFtZV9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMubmFtZV9mcmFtZV9hcnJbdGhpcy5za2lsbF9pbmRleF07XG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmJ1dHRvbl9mcmFtZV9hcnJbMF07XG4gICAgICAgICAgICAgICAgdGhpcy5pbnRyb2R1Y2VfbGFiZWwuc3RyaW5nID0gXCJFeHRyYSBldmVyeSA1IG1pbnV0ZXMgXCIgKyAob2ZmbGluZV9wcm9maXQgKyAxKSArIFwiIFxcbmdvbGRcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmxldmVsX2xhYmVsLnN0cmluZyA9IFwibHY6IFwiICsgb2ZmbGluZV9wcm9maXQ7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzcy5wcm9ncmVzcyA9IG9mZmxpbmVfcHJvZml0IC8gOTk7XG4gICAgICAgICAgICAgICAgaWYgKG9mZmxpbmVfcHJvZml0ID49IDk5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uX2ZyYW1lLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgdGhpcy5idXR0b25fZnJhbWUubm9kZS5hY3RpdmU9dHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgLy/liLfmlrBidXR0b25cbiAgICB1cGRhdGVfYnV0dG9uKCkge1xuICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbF9wb2ludCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uX2ZyYW1lLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uX2ZyYW1lLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsX3BvaW50ID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uX2ZyYW1lLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b25fZnJhbWUubm9kZS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBmb3IobGV0IGkgPTA7IGk8NjsgaSsrKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5zY2hlZHVsZShjYWxsYmFjaywgMC41KTtcbiAgICB9LFxuICAgIG9uX2J1dHRvbl9jbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbF9wb2ludCA+PSAxKSB7XG4gICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsX3BvaW50LS07XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuc2tpbGxfaW5kZXgpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxbXCJnb2xkX21heFwiXSsrO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMuc2V0X2dvbGRfcHJvZ3Jlc3MoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1wic3BlZWRfdGhlX2N1dFwiXSsrO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxbXCJ3YXRlcl9zYXZpbmdcIl0rKztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1widG9vbF9pbXByb3ZlXCJdKys7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbFtcImxhYm9yX2NvbnRyYWN0XCJdKys7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbFtcIm9mZmxpbmVfcHJvZml0XCJdKys7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuc2V0X2NvbnRlbnQoKTtcbiAgICAgICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9jbGlja1wiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcInVuX2NsaWNrXCIpO1xuICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9ydWxlc19qcy5ub2RlLCBcIm5vX3NraWxsX3BvaW50XCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9O1xuXG4gICAgfSxcbiAgICBvbkxvYWQoKSB7XG5cblxuICAgIH0sXG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgdGhpcy51cGRhdGVfYnV0dG9uKCk7XG4gICAgfSxcblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxufSk7XG4iXX0=