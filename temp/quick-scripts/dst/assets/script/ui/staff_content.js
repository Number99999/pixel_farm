
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ui/staff_content.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b44e1RpeK5OAJ+zsWxB1ImR', 'staff_content');
// script/ui/staff_content.js

"use strict";

var user_data = require("user_data");

var config = require("config");

cc.Class({
  "extends": cc.Component,
  properties: {
    icon_sprite: cc.Sprite,
    work_time_label: cc.Label,
    rest_time_label: cc.Label,
    cost_label: cc.Label,
    icon_frame_arr: [cc.SpriteFrame],
    buy_button: cc.Node,
    work_time_buff_label: cc.Label,
    rest_time_buff_label: cc.Label,
    employed_button: cc.Node,
    name_lable: cc.Label,
    introduce_label: cc.Label
  },
  //ini node
  ini_node: function ini_node(staff_index) {
    this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
    this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
    this.ad_control = cc.find("ad_control").getComponent("ad_control");
    this.sound_control = cc.find("sound_control").getComponent("sound_control");
    this.staff_index = staff_index;
    this.update_content(); // this.create_ad_car();
  },
  //刷新数据
  update_content: function update_content() {
    this.icon_sprite.spriteFrame = this.icon_frame_arr[this.staff_index];
    this.work_time_label.string = "Active time:" + config.staff[this.staff_index].work_time + "seconds";
    this.rest_time_label.string = "Free time:" + config.staff[this.staff_index].rest_time + "seconds";
    this.name_lable.string = config.staff[this.staff_index].name;
    this.introduce_label.string = config.staff[this.staff_index].introduce; //技能提示

    if (user_data.user_data.skill["labor_contract"] == 0) {
      this.work_time_buff_label.node.active = false;
    } else {
      this.work_time_buff_label.node.active = true;
      this.work_time_buff_label.string = "+" + user_data.user_data.skill["labor_contract"];
    }

    ;

    if (user_data.user_data.trader["recipes"] == 0) {
      this.rest_time_buff_label.node.active = false;
    } else {
      this.rest_time_buff_label.node.active = true;
      this.rest_time_buff_label.string = "-" + user_data.user_data.trader["recipes"];
    }

    ;
    this.cost_label.string = "Cost:" + config.staff[this.staff_index].cost;

    if (user_data.user_data.staff[this.staff_index].have == 0) {
      this.buy_button.active = true;
      this.employed_button.active = false;
    } else {
      this.buy_button.active = false;
      this.employed_button.active = true;
    }

    ;
  },
  //buy staff
  on_buy_button_click: function on_buy_button_click() {
    if (user_data.user_data.gold >= config.staff[this.staff_index].cost) {
      user_data.user_data.gold -= config.staff[this.staff_index].cost;
      user_data.user_data.staff[this.staff_index].have = 1;
      this.game_rules_js.create_staff(this.staff_index);
      var gold_max = 500 * user_data.user_data.skill["gold_max"] + 500;
      this.game_rules_js.gold_label.getComponent(cc.Label).string = user_data.user_data.gold + "/" + gold_max;
      this.buy_button.active = false;
      this.sound_control.play_sound_effect("button_click");
      this.update_content();
    } else {
      this.sound_control.play_sound_effect("un_click");
      this.game_scene_js.create_tips_ui(this.game_rules_js.node, "no_money_gold");
    }

    ;
  },
  touch_exit: function touch_exit() {
    this.sound_control.play_sound_effect("button_exit");
    this.node.destroy();
  },
  //创建ad_car
  create_ad_car: function create_ad_car() {
    if (user_data.user_data.staff[this.staff_index].have != 1) {
      var gold = user_data.user_data.gold;
      var all_capacity = 500 * user_data.user_data.skill["gold_max"] + 500;
      var cost = config.staff[this.staff_index].cost; //差价

      var price_difference = cost - gold; //大于4/5,且能够拥有，且金币不足

      if (gold >= cost * (4 / 5) && all_capacity >= cost && gold < cost) {
        this.ad_control.hide_bannerAd(); // this.game_scene_js.create_ad_car(this.node, price_difference);
      }

      ;
    } else {
      return;
    }
  },
  onLoad: function onLoad() {},
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcc3RhZmZfY29udGVudC5qcyJdLCJuYW1lcyI6WyJ1c2VyX2RhdGEiLCJyZXF1aXJlIiwiY29uZmlnIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJpY29uX3Nwcml0ZSIsIlNwcml0ZSIsIndvcmtfdGltZV9sYWJlbCIsIkxhYmVsIiwicmVzdF90aW1lX2xhYmVsIiwiY29zdF9sYWJlbCIsImljb25fZnJhbWVfYXJyIiwiU3ByaXRlRnJhbWUiLCJidXlfYnV0dG9uIiwiTm9kZSIsIndvcmtfdGltZV9idWZmX2xhYmVsIiwicmVzdF90aW1lX2J1ZmZfbGFiZWwiLCJlbXBsb3llZF9idXR0b24iLCJuYW1lX2xhYmxlIiwiaW50cm9kdWNlX2xhYmVsIiwiaW5pX25vZGUiLCJzdGFmZl9pbmRleCIsImdhbWVfc2NlbmVfanMiLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwiZ2FtZV9ydWxlc19qcyIsImFkX2NvbnRyb2wiLCJzb3VuZF9jb250cm9sIiwidXBkYXRlX2NvbnRlbnQiLCJzcHJpdGVGcmFtZSIsInN0cmluZyIsInN0YWZmIiwid29ya190aW1lIiwicmVzdF90aW1lIiwibmFtZSIsImludHJvZHVjZSIsInNraWxsIiwibm9kZSIsImFjdGl2ZSIsInRyYWRlciIsImNvc3QiLCJoYXZlIiwib25fYnV5X2J1dHRvbl9jbGljayIsImdvbGQiLCJjcmVhdGVfc3RhZmYiLCJnb2xkX21heCIsImdvbGRfbGFiZWwiLCJwbGF5X3NvdW5kX2VmZmVjdCIsImNyZWF0ZV90aXBzX3VpIiwidG91Y2hfZXhpdCIsImRlc3Ryb3kiLCJjcmVhdGVfYWRfY2FyIiwiYWxsX2NhcGFjaXR5IiwicHJpY2VfZGlmZmVyZW5jZSIsImhpZGVfYmFubmVyQWQiLCJvbkxvYWQiLCJzdGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxTQUFTLEdBQUdDLE9BQU8sQ0FBQyxXQUFELENBQXZCOztB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QUFvRCxDQUF4RCxFQUEyRDtBQUN2RCxVQUFJRSxJQUFJLEdBQUc3QyxTQUFTLENBQUNBLFNBQVYsQ0FBb0I2QyxJQUEvQjtBQUNBLFVBQUlTLFlBQVksR0FBRyxNQUFNdEQsU0FBUyxDQUFDQSxTQUFWLENBQW9Cc0MsS0FBcEIsQ0FBMEIsVUFBMUIsQ0FBTixHQUE4QyxHQUFqRTtBQUNBLFVBQUlJLElBQUksR0FBSXhDLE1BQU0sQ0FBQytCLEtBQVAsQ0FBYSxLQUFLVixXQUFsQixFQUErQm1CLElBQTNDLENBSHVELENBSXZEOztBQUNBLFVBQUlhLGdCQUFnQixHQUFHYixJQUFJLEdBQUdHLElBQTlCLENBTHVELENBTXZEOztBQUNBLFVBQUlBLElBQUksSUFBSUgsSUFBSSxJQUFJLElBQUksQ0FBUixDQUFaLElBQTBCWSxZQUFZLElBQUlaLElBQTFDLElBQWtERyxJQUFJLEdBQUdILElBQTdELEVBQW1FO0FBQy9ELGFBQUtkLFVBQUwsQ0FBZ0I0QixhQUFoQixHQUQrRCxDQUUvRDtBQUNIOztBQUFBO0FBQ0osS0FYRCxNQVdPO0FBQ0g7QUFDSDtBQUVKLEdBN0ZJO0FBOEZMQyxFQUFBQSxNQTlGSyxvQkE4RkksQ0FFUixDQWhHSTtBQWtHTEMsRUFBQUEsS0FsR0ssbUJBa0dHLENBRVAsQ0FwR0ksQ0FzR0w7O0FBdEdLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciB1c2VyX2RhdGEgPSByZXF1aXJlKFwidXNlcl9kYXRhXCIpO1xyXG52YXIgY29uZmlnID0gcmVxdWlyZShcImNvbmZpZ1wiKTtcclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBpY29uX3Nwcml0ZTogY2MuU3ByaXRlLFxyXG4gICAgICAgIHdvcmtfdGltZV9sYWJlbDogY2MuTGFiZWwsXHJcbiAgICAgICAgcmVzdF90aW1lX2xhYmVsOiBjYy5MYWJlbCxcclxuICAgICAgICBjb3N0X2xhYmVsOiBjYy5MYWJlbCxcclxuICAgICAgICBpY29uX2ZyYW1lX2FycjogW2NjLlNwcml0ZUZyYW1lXSxcclxuICAgICAgICBidXlfYnV0dG9uOiBjYy5Ob2RlLFxyXG4gICAgICAgIHdvcmtfdGltZV9idWZmX2xhYmVsOiBjYy5MYWJlbCxcclxuICAgICAgICByZXN0X3RpbWVfYnVmZl9sYWJlbDogY2MuTGFiZWwsXHJcbiAgICAgICAgZW1wbG95ZWRfYnV0dG9uOiBjYy5Ob2RlLFxyXG4gICAgICAgIG5hbWVfbGFibGU6IGNjLkxhYmVsLFxyXG4gICAgICAgIGludHJvZHVjZV9sYWJlbDogY2MuTGFiZWwsXHJcbiAgICB9LFxyXG4gICAgLy9pbmkgbm9kZVxyXG4gICAgaW5pX25vZGU6IGZ1bmN0aW9uIChzdGFmZl9pbmRleCkge1xyXG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfc2NlbmVcIik7XHJcbiAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9ydWxlc1wiKTtcclxuICAgICAgICB0aGlzLmFkX2NvbnRyb2wgPSBjYy5maW5kKFwiYWRfY29udHJvbFwiKS5nZXRDb21wb25lbnQoXCJhZF9jb250cm9sXCIpO1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbCA9IGNjLmZpbmQoXCJzb3VuZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcInNvdW5kX2NvbnRyb2xcIik7XHJcbiAgICAgICAgdGhpcy5zdGFmZl9pbmRleCA9IHN0YWZmX2luZGV4O1xyXG4gICAgICAgIHRoaXMudXBkYXRlX2NvbnRlbnQoKTtcclxuICAgICAgICAvLyB0aGlzLmNyZWF0ZV9hZF9jYXIoKTtcclxuICAgIH0sXHJcbiAgICAvL+WIt+aWsOaVsOaNrlxyXG4gICAgdXBkYXRlX2NvbnRlbnQoKSB7XHJcbiAgICAgICAgdGhpcy5pY29uX3Nwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbdGhpcy5zdGFmZl9pbmRleF07XHJcbiAgICAgICAgdGhpcy53b3JrX3RpbWVfbGFiZWwuc3RyaW5nID0gXCJBY3RpdmUgdGltZTpcIiArIGNvbmZpZy5zdGFmZlt0aGlzLnN0YWZmX2luZGV4XS53b3JrX3RpbWUgKyBcInNlY29uZHNcIjtcclxuICAgICAgICB0aGlzLnJlc3RfdGltZV9sYWJlbC5zdHJpbmcgPSBcIkZyZWUgdGltZTpcIiArIGNvbmZpZy5zdGFmZlt0aGlzLnN0YWZmX2luZGV4XS5yZXN0X3RpbWUgKyBcInNlY29uZHNcIjtcclxuICAgICAgICB0aGlzLm5hbWVfbGFibGUuc3RyaW5nID0gY29uZmlnLnN0YWZmW3RoaXMuc3RhZmZfaW5kZXhdLm5hbWU7XHJcbiAgICAgICAgdGhpcy5pbnRyb2R1Y2VfbGFiZWwuc3RyaW5nID0gY29uZmlnLnN0YWZmW3RoaXMuc3RhZmZfaW5kZXhdLmludHJvZHVjZTtcclxuICAgICAgICAvL+aKgOiDveaPkOekulxyXG4gICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1wibGFib3JfY29udHJhY3RcIl0gPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLndvcmtfdGltZV9idWZmX2xhYmVsLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy53b3JrX3RpbWVfYnVmZl9sYWJlbC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMud29ya190aW1lX2J1ZmZfbGFiZWwuc3RyaW5nID0gXCIrXCIgKyB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1wibGFib3JfY29udHJhY3RcIl07XHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS50cmFkZXJbXCJyZWNpcGVzXCJdID09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5yZXN0X3RpbWVfYnVmZl9sYWJlbC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzdF90aW1lX2J1ZmZfbGFiZWwubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnJlc3RfdGltZV9idWZmX2xhYmVsLnN0cmluZyA9IFwiLVwiICsgdXNlcl9kYXRhLnVzZXJfZGF0YS50cmFkZXJbXCJyZWNpcGVzXCJdO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuY29zdF9sYWJlbC5zdHJpbmcgPSBcIkNvc3Q6XCIgKyBjb25maWcuc3RhZmZbdGhpcy5zdGFmZl9pbmRleF0uY29zdDtcclxuICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5zdGFmZlt0aGlzLnN0YWZmX2luZGV4XS5oYXZlID09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5idXlfYnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuZW1wbG95ZWRfYnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnV5X2J1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5lbXBsb3llZF9idXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8vYnV5IHN0YWZmXHJcbiAgICBvbl9idXlfYnV0dG9uX2NsaWNrOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEuZ29sZCA+PSBjb25maWcuc3RhZmZbdGhpcy5zdGFmZl9pbmRleF0uY29zdCkge1xyXG4gICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQgLT0gY29uZmlnLnN0YWZmW3RoaXMuc3RhZmZfaW5kZXhdLmNvc3Q7XHJcbiAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuc3RhZmZbdGhpcy5zdGFmZl9pbmRleF0uaGF2ZSA9IDE7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcy5jcmVhdGVfc3RhZmYodGhpcy5zdGFmZl9pbmRleCk7XHJcbiAgICAgICAgICAgIHZhciBnb2xkX21heCA9IDUwMCAqIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxbXCJnb2xkX21heFwiXSArIDUwMDtcclxuICAgICAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLmdvbGRfbGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQgKyBcIi9cIiArZ29sZF9tYXg7XHJcbiAgICAgICAgICAgIHRoaXMuYnV5X2J1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZV9jb250ZW50KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwidW5fY2xpY2tcIik7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfcnVsZXNfanMubm9kZSwgXCJub19tb25leV9nb2xkXCIpO1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgdG91Y2hfZXhpdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9leGl0XCIpO1xyXG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XHJcbiAgICB9LFxyXG4gICAgLy/liJvlu7phZF9jYXJcclxuICAgIGNyZWF0ZV9hZF9jYXIoKSB7XHJcbiAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEuc3RhZmZbdGhpcy5zdGFmZl9pbmRleF0uaGF2ZSAhPSAxKSB7XHJcbiAgICAgICAgICAgIHZhciBnb2xkID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkO1xyXG4gICAgICAgICAgICB2YXIgYWxsX2NhcGFjaXR5ID0gNTAwICogdXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbFtcImdvbGRfbWF4XCJdICsgNTAwO1xyXG4gICAgICAgICAgICB2YXIgY29zdCA9IChjb25maWcuc3RhZmZbdGhpcy5zdGFmZl9pbmRleF0uY29zdCk7XHJcbiAgICAgICAgICAgIC8v5beu5Lu3XHJcbiAgICAgICAgICAgIHZhciBwcmljZV9kaWZmZXJlbmNlID0gY29zdCAtIGdvbGQ7XHJcbiAgICAgICAgICAgIC8v5aSn5LqONC81LOS4lOiDveWkn+aLpeacie+8jOS4lOmHkeW4geS4jei2s1xyXG4gICAgICAgICAgICBpZiAoZ29sZCA+PSBjb3N0ICogKDQgLyA1KSAmJiBhbGxfY2FwYWNpdHkgPj0gY29zdCAmJiBnb2xkIDwgY29zdCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZF9jb250cm9sLmhpZGVfYmFubmVyQWQoKTtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfYWRfY2FyKHRoaXMubm9kZSwgcHJpY2VfZGlmZmVyZW5jZSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG4gICAgb25Mb2FkKCkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcclxufSk7XHJcbiJdfQ==