
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcc3RhZmZfY29udGVudC5qcyJdLCJuYW1lcyI6WyJ1c2VyX2RhdGEiLCJyZXF1aXJlIiwiY29uZmlnIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJpY29uX3Nwcml0ZSIsIlNwcml0ZSIsIndvcmtfdGltZV9sYWJlbCIsIkxhYmVsIiwicmVzdF90aW1lX2xhYmVsIiwiY29zdF9sYWJlbCIsImljb25fZnJhbWVfYXJyIiwiU3ByaXRlRnJhbWUiLCJidXlfYnV0dG9uIiwiTm9kZSIsIndvcmtfdGltZV9idWZmX2xhYmVsIiwicmVzdF90aW1lX2J1ZmZfbGFiZWwiLCJlbXBsb3llZF9idXR0b24iLCJuYW1lX2xhYmxlIiwiaW50cm9kdWNlX2xhYmVsIiwiaW5pX25vZGUiLCJzdGFmZl9pbmRleCIsImdhbWVfc2NlbmVfanMiLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwiZ2FtZV9ydWxlc19qcyIsImFkX2NvbnRyb2wiLCJzb3VuZF9jb250cm9sIiwidXBkYXRlX2NvbnRlbnQiLCJzcHJpdGVGcmFtZSIsInN0cmluZyIsInN0YWZmIiwid29ya190aW1lIiwicmVzdF90aW1lIiwibmFtZSIsImludHJvZHVjZSIsInNraWxsIiwibm9kZSIsImFjdGl2ZSIsInRyYWRlciIsImNvc3QiLCJoYXZlIiwib25fYnV5X2J1dHRvbl9jbGljayIsImdvbGQiLCJjcmVhdGVfc3RhZmYiLCJwbGF5X3NvdW5kX2VmZmVjdCIsImNyZWF0ZV90aXBzX3VpIiwidG91Y2hfZXhpdCIsImRlc3Ryb3kiLCJjcmVhdGVfYWRfY2FyIiwiYWxsX2NhcGFjaXR5IiwicHJpY2VfZGlmZmVyZW5jZSIsImhpZGVfYmFubmVyQWQiLCJvbkxvYWQiLCJzdGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxTQUFTLEdBQUdDLE9BQU8sQ0FBQyxXQUFELENBQXZCOztBQUNBLElBQUlDLE1BQU0sR0FBR0QsT0FB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LEdBQUdYLElBQUksR0FBR0csSUFBOUIsQ0FMdUQsQ0FNdkQ7O0FBQ0EsVUFBSUEsSUFBSSxJQUFJSCxJQUFJLElBQUksSUFBSSxDQUFSLENBQVosSUFBMEJVLFlBQVksSUFBSVYsSUFBMUMsSUFBa0RHLElBQUksR0FBR0gsSUFBN0QsRUFBbUU7QUFDL0QsYUFBS2QsVUFBTCxDQUFnQjBCLGFBQWhCLEdBRCtELENBRS9EO0FBQ0g7O0FBQUE7QUFDSixLQVhELE1BV087QUFDSDtBQUNIO0FBRUosR0EzRkk7QUE0RkxDLEVBQUFBLE1BNUZLLG9CQTRGSSxDQUVSLENBOUZJO0FBZ0dMQyxFQUFBQSxLQWhHSyxtQkFnR0csQ0FFUCxDQWxHSSxDQW9HTDs7QUFwR0ssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHVzZXJfZGF0YSA9IHJlcXVpcmUoXCJ1c2VyX2RhdGFcIik7XHJcbnZhciBjb25maWcgPSByZXF1aXJlKFwiY29uZmlnXCIpO1xyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGljb25fc3ByaXRlOiBjYy5TcHJpdGUsXHJcbiAgICAgICAgd29ya190aW1lX2xhYmVsOiBjYy5MYWJlbCxcclxuICAgICAgICByZXN0X3RpbWVfbGFiZWw6IGNjLkxhYmVsLFxyXG4gICAgICAgIGNvc3RfbGFiZWw6IGNjLkxhYmVsLFxyXG4gICAgICAgIGljb25fZnJhbWVfYXJyOiBbY2MuU3ByaXRlRnJhbWVdLFxyXG4gICAgICAgIGJ1eV9idXR0b246IGNjLk5vZGUsXHJcbiAgICAgICAgd29ya190aW1lX2J1ZmZfbGFiZWw6IGNjLkxhYmVsLFxyXG4gICAgICAgIHJlc3RfdGltZV9idWZmX2xhYmVsOiBjYy5MYWJlbCxcclxuICAgICAgICBlbXBsb3llZF9idXR0b246IGNjLk5vZGUsXHJcbiAgICAgICAgbmFtZV9sYWJsZTogY2MuTGFiZWwsXHJcbiAgICAgICAgaW50cm9kdWNlX2xhYmVsOiBjYy5MYWJlbCxcclxuICAgIH0sXHJcbiAgICAvL2luaSBub2RlXHJcbiAgICBpbmlfbm9kZTogZnVuY3Rpb24gKHN0YWZmX2luZGV4KSB7XHJcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9zY2VuZVwiKTtcclxuICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJnYW1lX3J1bGVzXCIpO1xyXG4gICAgICAgIHRoaXMuYWRfY29udHJvbCA9IGNjLmZpbmQoXCJhZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcImFkX2NvbnRyb2xcIik7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sID0gY2MuZmluZChcInNvdW5kX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwic291bmRfY29udHJvbFwiKTtcclxuICAgICAgICB0aGlzLnN0YWZmX2luZGV4ID0gc3RhZmZfaW5kZXg7XHJcbiAgICAgICAgdGhpcy51cGRhdGVfY29udGVudCgpO1xyXG4gICAgICAgIC8vIHRoaXMuY3JlYXRlX2FkX2NhcigpO1xyXG4gICAgfSxcclxuICAgIC8v5Yi35paw5pWw5o2uXHJcbiAgICB1cGRhdGVfY29udGVudCgpIHtcclxuICAgICAgICB0aGlzLmljb25fc3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2Fyclt0aGlzLnN0YWZmX2luZGV4XTtcclxuICAgICAgICB0aGlzLndvcmtfdGltZV9sYWJlbC5zdHJpbmcgPSBcIkFjdGl2ZSB0aW1lOlwiICsgY29uZmlnLnN0YWZmW3RoaXMuc3RhZmZfaW5kZXhdLndvcmtfdGltZSArIFwic2Vjb25kc1wiO1xyXG4gICAgICAgIHRoaXMucmVzdF90aW1lX2xhYmVsLnN0cmluZyA9IFwiRnJlZSB0aW1lOlwiICsgY29uZmlnLnN0YWZmW3RoaXMuc3RhZmZfaW5kZXhdLnJlc3RfdGltZSArIFwic2Vjb25kc1wiO1xyXG4gICAgICAgIHRoaXMubmFtZV9sYWJsZS5zdHJpbmcgPSBjb25maWcuc3RhZmZbdGhpcy5zdGFmZl9pbmRleF0ubmFtZTtcclxuICAgICAgICB0aGlzLmludHJvZHVjZV9sYWJlbC5zdHJpbmcgPSBjb25maWcuc3RhZmZbdGhpcy5zdGFmZl9pbmRleF0uaW50cm9kdWNlO1xyXG4gICAgICAgIC8v5oqA6IO95o+Q56S6XHJcbiAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxbXCJsYWJvcl9jb250cmFjdFwiXSA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMud29ya190aW1lX2J1ZmZfbGFiZWwubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLndvcmtfdGltZV9idWZmX2xhYmVsLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy53b3JrX3RpbWVfYnVmZl9sYWJlbC5zdHJpbmcgPSBcIitcIiArIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxbXCJsYWJvcl9jb250cmFjdFwiXTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLnRyYWRlcltcInJlY2lwZXNcIl0gPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlc3RfdGltZV9idWZmX2xhYmVsLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yZXN0X3RpbWVfYnVmZl9sYWJlbC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMucmVzdF90aW1lX2J1ZmZfbGFiZWwuc3RyaW5nID0gXCItXCIgKyB1c2VyX2RhdGEudXNlcl9kYXRhLnRyYWRlcltcInJlY2lwZXNcIl07XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5jb3N0X2xhYmVsLnN0cmluZyA9IFwiQ29zdDpcIiArIGNvbmZpZy5zdGFmZlt0aGlzLnN0YWZmX2luZGV4XS5jb3N0O1xyXG4gICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLnN0YWZmW3RoaXMuc3RhZmZfaW5kZXhdLmhhdmUgPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmJ1eV9idXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5lbXBsb3llZF9idXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5idXlfYnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmVtcGxveWVkX2J1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLy9idXkgc3RhZmZcclxuICAgIG9uX2J1eV9idXR0b25fY2xpY2s6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkID49IGNvbmZpZy5zdGFmZlt0aGlzLnN0YWZmX2luZGV4XS5jb3N0KSB7XHJcbiAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuZ29sZCAtPSBjb25maWcuc3RhZmZbdGhpcy5zdGFmZl9pbmRleF0uY29zdDtcclxuICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5zdGFmZlt0aGlzLnN0YWZmX2luZGV4XS5oYXZlID0gMTtcclxuICAgICAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLmNyZWF0ZV9zdGFmZih0aGlzLnN0YWZmX2luZGV4KTtcclxuICAgICAgICAgICAgdGhpcy5idXlfYnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fY2xpY2tcIik7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlX2NvbnRlbnQoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJ1bl9jbGlja1wiKTtcclxuICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9ydWxlc19qcy5ub2RlLCBcIm5vX21vbmV5X2dvbGRcIik7XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICB0b3VjaF9leGl0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2V4aXRcIik7XHJcbiAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcclxuICAgIH0sXHJcbiAgICAvL+WIm+W7umFkX2NhclxyXG4gICAgY3JlYXRlX2FkX2NhcigpIHtcclxuICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5zdGFmZlt0aGlzLnN0YWZmX2luZGV4XS5oYXZlICE9IDEpIHtcclxuICAgICAgICAgICAgdmFyIGdvbGQgPSB1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQ7XHJcbiAgICAgICAgICAgIHZhciBhbGxfY2FwYWNpdHkgPSA1MDAgKiB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1wiZ29sZF9tYXhcIl0gKyA1MDA7XHJcbiAgICAgICAgICAgIHZhciBjb3N0ID0gKGNvbmZpZy5zdGFmZlt0aGlzLnN0YWZmX2luZGV4XS5jb3N0KTtcclxuICAgICAgICAgICAgLy/lt67ku7dcclxuICAgICAgICAgICAgdmFyIHByaWNlX2RpZmZlcmVuY2UgPSBjb3N0IC0gZ29sZDtcclxuICAgICAgICAgICAgLy/lpKfkuo40LzUs5LiU6IO95aSf5oul5pyJ77yM5LiU6YeR5biB5LiN6LazXHJcbiAgICAgICAgICAgIGlmIChnb2xkID49IGNvc3QgKiAoNCAvIDUpICYmIGFsbF9jYXBhY2l0eSA+PSBjb3N0ICYmIGdvbGQgPCBjb3N0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkX2NvbnRyb2wuaGlkZV9iYW5uZXJBZCgpO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9hZF9jYXIodGhpcy5ub2RlLCBwcmljZV9kaWZmZXJlbmNlKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcbiAgICBvbkxvYWQoKSB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCgpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxyXG59KTtcclxuIl19