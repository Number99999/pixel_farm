
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcc3RhZmZfY29udGVudC5qcyJdLCJuYW1lcyI6WyJ1c2VyX2RhdGEiLCJyZXF1aXJlIiwiY29uZmlnIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJpY29uX3Nwcml0ZSIsIlNwcml0ZSIsIndvcmtfdGltZV9sYWJlbCIsIkxhYmVsIiwicmVzdF90aW1lX2xhYmVsIiwiY29zdF9sYWJlbCIsImljb25fZnJhbWVfYXJyIiwiU3ByaXRlRnJhbWUiLCJidXlfYnV0dG9uIiwiTm9kZSIsIndvcmtfdGltZV9idWZmX2xhYmVsIiwicmVzdF90aW1lX2J1ZmZfbGFiZWwiLCJlbXBsb3llZF9idXR0b24iLCJuYW1lX2xhYmxlIiwiaW50cm9kdWNlX2xhYmVsIiwiaW5pX25vZGUiLCJzdGFmZl9pbmRleCIsImdhbWVfc2NlbmVfanMiLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwiZ2FtZV9ydWxlc19qcyIsImFkX2NvbnRyb2wiLCJzb3VuZF9jb250cm9sIiwidXBkYXRlX2NvbnRlbnQiLCJzcHJpdGVGcmFtZSIsInN0cmluZyIsInN0YWZmIiwid29ya190aW1lIiwicmVzdF90aW1lIiwibmFtZSIsImludHJvZHVjZSIsInNraWxsIiwibm9kZSIsImFjdGl2ZSIsInRyYWRlciIsImNvc3QiLCJoYXZlIiwib25fYnV5X2J1dHRvbl9jbGljayIsImdvbGQiLCJjcmVhdGVfc3RhZmYiLCJnb2xkX21heCIsImdvbGRfbGFiZWwiLCJwbGF5X3NvdW5kX2VmZmVjdCIsImNyZWF0ZV90aXBzX3VpIiwidG91Y2hfZXhpdCIsImRlc3Ryb3kiLCJjcmVhdGVfYWRfY2FyIiwiYWxsX2NhcGFjaXR5IiwicHJpY2VfZGlmZmVyZW5jZSIsImhpZGVfYmFubmVyQWQiLCJvbkxvYWQiLCJzdGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxTQUFTLEdBQUdDLE9BQU8sQ0FBQyxXQUFELENBQXZCOztB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QUFvRCxDQUF4RCxFQUEyRDtBQUN2RCxVQUFJRSxJQUFJLEdBQUc3QyxTQUFTLENBQUNBLFNBQVYsQ0FBb0I2QyxJQUEvQjtBQUNBLFVBQUlTLFlBQVksR0FBRyxNQUFNdEQsU0FBUyxDQUFDQSxTQUFWLENBQW9Cc0MsS0FBcEIsQ0FBMEIsVUFBMUIsQ0FBTixHQUE4QyxHQUFqRTtBQUNBLFVBQUlJLElBQUksR0FBSXhDLE1BQU0sQ0FBQytCLEtBQVAsQ0FBYSxLQUFLVixXQUFsQixFQUErQm1CLElBQTNDLENBSHVELENBSXZEOztBQUNBLFVBQUlhLGdCQUFnQixHQUFHYixJQUFJLEdBQUdHLElBQTlCLENBTHVELENBTXZEOztBQUNBLFVBQUlBLElBQUksSUFBSUgsSUFBSSxJQUFJLElBQUksQ0FBUixDQUFaLElBQTBCWSxZQUFZLElBQUlaLElBQTFDLElBQWtERyxJQUFJLEdBQUdILElBQTdELEVBQW1FO0FBQy9ELGFBQUtkLFVBQUwsQ0FBZ0I0QixhQUFoQixHQUQrRCxDQUUvRDtBQUNIOztBQUFBO0FBQ0osS0FYRCxNQVdPO0FBQ0g7QUFDSDtBQUVKLEdBN0ZJO0FBOEZMQyxFQUFBQSxNQTlGSyxvQkE4RkksQ0FFUixDQWhHSTtBQWtHTEMsRUFBQUEsS0FsR0ssbUJBa0dHLENBRVAsQ0FwR0ksQ0FzR0w7O0FBdEdLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciB1c2VyX2RhdGEgPSByZXF1aXJlKFwidXNlcl9kYXRhXCIpO1xudmFyIGNvbmZpZyA9IHJlcXVpcmUoXCJjb25maWdcIik7XG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBpY29uX3Nwcml0ZTogY2MuU3ByaXRlLFxuICAgICAgICB3b3JrX3RpbWVfbGFiZWw6IGNjLkxhYmVsLFxuICAgICAgICByZXN0X3RpbWVfbGFiZWw6IGNjLkxhYmVsLFxuICAgICAgICBjb3N0X2xhYmVsOiBjYy5MYWJlbCxcbiAgICAgICAgaWNvbl9mcmFtZV9hcnI6IFtjYy5TcHJpdGVGcmFtZV0sXG4gICAgICAgIGJ1eV9idXR0b246IGNjLk5vZGUsXG4gICAgICAgIHdvcmtfdGltZV9idWZmX2xhYmVsOiBjYy5MYWJlbCxcbiAgICAgICAgcmVzdF90aW1lX2J1ZmZfbGFiZWw6IGNjLkxhYmVsLFxuICAgICAgICBlbXBsb3llZF9idXR0b246IGNjLk5vZGUsXG4gICAgICAgIG5hbWVfbGFibGU6IGNjLkxhYmVsLFxuICAgICAgICBpbnRyb2R1Y2VfbGFiZWw6IGNjLkxhYmVsLFxuICAgIH0sXG4gICAgLy9pbmkgbm9kZVxuICAgIGluaV9ub2RlOiBmdW5jdGlvbiAoc3RhZmZfaW5kZXgpIHtcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9zY2VuZVwiKTtcbiAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9ydWxlc1wiKTtcbiAgICAgICAgdGhpcy5hZF9jb250cm9sID0gY2MuZmluZChcImFkX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwiYWRfY29udHJvbFwiKTtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sID0gY2MuZmluZChcInNvdW5kX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwic291bmRfY29udHJvbFwiKTtcbiAgICAgICAgdGhpcy5zdGFmZl9pbmRleCA9IHN0YWZmX2luZGV4O1xuICAgICAgICB0aGlzLnVwZGF0ZV9jb250ZW50KCk7XG4gICAgICAgIC8vIHRoaXMuY3JlYXRlX2FkX2NhcigpO1xuICAgIH0sXG4gICAgLy/liLfmlrDmlbDmja5cbiAgICB1cGRhdGVfY29udGVudCgpIHtcbiAgICAgICAgdGhpcy5pY29uX3Nwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbdGhpcy5zdGFmZl9pbmRleF07XG4gICAgICAgIHRoaXMud29ya190aW1lX2xhYmVsLnN0cmluZyA9IFwiQWN0aXZlIHRpbWU6XCIgKyBjb25maWcuc3RhZmZbdGhpcy5zdGFmZl9pbmRleF0ud29ya190aW1lICsgXCJzZWNvbmRzXCI7XG4gICAgICAgIHRoaXMucmVzdF90aW1lX2xhYmVsLnN0cmluZyA9IFwiRnJlZSB0aW1lOlwiICsgY29uZmlnLnN0YWZmW3RoaXMuc3RhZmZfaW5kZXhdLnJlc3RfdGltZSArIFwic2Vjb25kc1wiO1xuICAgICAgICB0aGlzLm5hbWVfbGFibGUuc3RyaW5nID0gY29uZmlnLnN0YWZmW3RoaXMuc3RhZmZfaW5kZXhdLm5hbWU7XG4gICAgICAgIHRoaXMuaW50cm9kdWNlX2xhYmVsLnN0cmluZyA9IGNvbmZpZy5zdGFmZlt0aGlzLnN0YWZmX2luZGV4XS5pbnRyb2R1Y2U7XG4gICAgICAgIC8v5oqA6IO95o+Q56S6XG4gICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1wibGFib3JfY29udHJhY3RcIl0gPT0gMCkge1xuICAgICAgICAgICAgdGhpcy53b3JrX3RpbWVfYnVmZl9sYWJlbC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy53b3JrX3RpbWVfYnVmZl9sYWJlbC5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLndvcmtfdGltZV9idWZmX2xhYmVsLnN0cmluZyA9IFwiK1wiICsgdXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbFtcImxhYm9yX2NvbnRyYWN0XCJdO1xuICAgICAgICB9O1xuICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS50cmFkZXJbXCJyZWNpcGVzXCJdID09IDApIHtcbiAgICAgICAgICAgIHRoaXMucmVzdF90aW1lX2J1ZmZfbGFiZWwubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVzdF90aW1lX2J1ZmZfbGFiZWwubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5yZXN0X3RpbWVfYnVmZl9sYWJlbC5zdHJpbmcgPSBcIi1cIiArIHVzZXJfZGF0YS51c2VyX2RhdGEudHJhZGVyW1wicmVjaXBlc1wiXTtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmNvc3RfbGFiZWwuc3RyaW5nID0gXCJDb3N0OlwiICsgY29uZmlnLnN0YWZmW3RoaXMuc3RhZmZfaW5kZXhdLmNvc3Q7XG4gICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLnN0YWZmW3RoaXMuc3RhZmZfaW5kZXhdLmhhdmUgPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5idXlfYnV0dG9uLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmVtcGxveWVkX2J1dHRvbi5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYnV5X2J1dHRvbi5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuZW1wbG95ZWRfYnV0dG9uLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvL2J1eSBzdGFmZlxuICAgIG9uX2J1eV9idXR0b25fY2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEuZ29sZCA+PSBjb25maWcuc3RhZmZbdGhpcy5zdGFmZl9pbmRleF0uY29zdCkge1xuICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkIC09IGNvbmZpZy5zdGFmZlt0aGlzLnN0YWZmX2luZGV4XS5jb3N0O1xuICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5zdGFmZlt0aGlzLnN0YWZmX2luZGV4XS5oYXZlID0gMTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcy5jcmVhdGVfc3RhZmYodGhpcy5zdGFmZl9pbmRleCk7XG4gICAgICAgICAgICB2YXIgZ29sZF9tYXggPSA1MDAgKiB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1wiZ29sZF9tYXhcIl0gKyA1MDA7XG4gICAgICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMuZ29sZF9sYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHVzZXJfZGF0YS51c2VyX2RhdGEuZ29sZCArIFwiL1wiICtnb2xkX21heDtcbiAgICAgICAgICAgIHRoaXMuYnV5X2J1dHRvbi5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9jbGlja1wiKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlX2NvbnRlbnQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcInVuX2NsaWNrXCIpO1xuICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9ydWxlc19qcy5ub2RlLCBcIm5vX21vbmV5X2dvbGRcIik7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICB0b3VjaF9leGl0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9leGl0XCIpO1xuICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xuICAgIH0sXG4gICAgLy/liJvlu7phZF9jYXJcbiAgICBjcmVhdGVfYWRfY2FyKCkge1xuICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5zdGFmZlt0aGlzLnN0YWZmX2luZGV4XS5oYXZlICE9IDEpIHtcbiAgICAgICAgICAgIHZhciBnb2xkID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkO1xuICAgICAgICAgICAgdmFyIGFsbF9jYXBhY2l0eSA9IDUwMCAqIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxbXCJnb2xkX21heFwiXSArIDUwMDtcbiAgICAgICAgICAgIHZhciBjb3N0ID0gKGNvbmZpZy5zdGFmZlt0aGlzLnN0YWZmX2luZGV4XS5jb3N0KTtcbiAgICAgICAgICAgIC8v5beu5Lu3XG4gICAgICAgICAgICB2YXIgcHJpY2VfZGlmZmVyZW5jZSA9IGNvc3QgLSBnb2xkO1xuICAgICAgICAgICAgLy/lpKfkuo40LzUs5LiU6IO95aSf5oul5pyJ77yM5LiU6YeR5biB5LiN6LazXG4gICAgICAgICAgICBpZiAoZ29sZCA+PSBjb3N0ICogKDQgLyA1KSAmJiBhbGxfY2FwYWNpdHkgPj0gY29zdCAmJiBnb2xkIDwgY29zdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRfY29udHJvbC5oaWRlX2Jhbm5lckFkKCk7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9hZF9jYXIodGhpcy5ub2RlLCBwcmljZV9kaWZmZXJlbmNlKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgIH0sXG4gICAgb25Mb2FkKCkge1xuXG4gICAgfSxcblxuICAgIHN0YXJ0KCkge1xuXG4gICAgfSxcblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxufSk7XG4iXX0=