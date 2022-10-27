
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
    this.update_content();
    this.create_ad_car();
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
      this.game_rules_js.add_gold(-config.staff[this.staff_index].cost);
      user_data.user_data.staff[this.staff_index].have = 1;
      this.game_rules_js.create_staff(this.staff_index);
      var node = this.game_scene_js.create_tips_ui(this.game_rules_js.node, "empoly_succes");
      this.buy_button.active = false;
      this.sound_control.play_sound_effect("button_click");
      this.update_content();
    } else {
      this.sound_control.play_sound_effect("un_click");
      var node = this.game_scene_js.create_tips_ui(this.game_rules_js.node, "no_money");
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
        this.ad_control.hide_bannerAd();
        this.game_scene_js.create_ad_car(this.node, price_difference);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcc3RhZmZfY29udGVudC5qcyJdLCJuYW1lcyI6WyJ1c2VyX2RhdGEiLCJyZXF1aXJlIiwiY29uZmlnIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJpY29uX3Nwcml0ZSIsIlNwcml0ZSIsIndvcmtfdGltZV9sYWJlbCIsIkxhYmVsIiwicmVzdF90aW1lX2xhYmVsIiwiY29zdF9sYWJlbCIsImljb25fZnJhbWVfYXJyIiwiU3ByaXRlRnJhbWUiLCJidXlfYnV0dG9uIiwiTm9kZSIsIndvcmtfdGltZV9idWZmX2xhYmVsIiwicmVzdF90aW1lX2J1ZmZfbGFiZWwiLCJlbXBsb3llZF9idXR0b24iLCJuYW1lX2xhYmxlIiwiaW50cm9kdWNlX2xhYmVsIiwiaW5pX25vZGUiLCJzdGFmZl9pbmRleCIsImdhbWVfc2NlbmVfanMiLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwiZ2FtZV9ydWxlc19qcyIsImFkX2NvbnRyb2wiLCJzb3VuZF9jb250cm9sIiwidXBkYXRlX2NvbnRlbnQiLCJjcmVhdGVfYWRfY2FyIiwic3ByaXRlRnJhbWUiLCJzdHJpbmciLCJzdGFmZiIsIndvcmtfdGltZSIsInJlc3RfdGltZSIsIm5hbWUiLCJpbnRyb2R1Y2UiLCJza2lsbCIsIm5vZGUiLCJhY3RpdmUiLCJ0cmFkZXIiLCJjb3N0IiwiaGF2ZSIsIm9uX2J1eV9idXR0b25fY2xpY2siLCJnb2xkIiwiYWRkX2dvbGQiLCJjcmVhdGVfc3RhZmYiLCJjcmVhdGVfdGlwc191aSIsInBsYXlfc291bmRfZWZmZWN0IiwidG91Y2hfZXhpdCIsImRlc3Ryb3kiLCJhbGxfY2FwYWNpdHkiLCJwcmljZV9kaWZmZXJlbmNlIiwiaGlkZV9iYW5uZXJBZCIsIm9uTG9hZCIsInN0YXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLFNBQVMsR0FBR0MsT0FBTyxDQUFDLFdBQUQsQ0FBdkI7O0FBQ0EsSUFBSUMsTUFB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Q0FBMEIsVUFBMUIsQ0FBTixHQUE4QyxHQUFqRTtBQUNBLFVBQUlJLElBQUksR0FBSXpDLE1BQU0sQ0FBQ2dDLEtBQVAsQ0FBYSxLQUFLWCxXQUFsQixFQUErQm9CLElBQTNDLENBSHVELENBSXZEOztBQUNBLFVBQUlXLGdCQUFnQixHQUFHWCxJQUFJLEdBQUdHLElBQTlCLENBTHVELENBTXZEOztBQUNBLFVBQUlBLElBQUksSUFBSUgsSUFBSSxJQUFJLElBQUksQ0FBUixDQUFaLElBQTBCVSxZQUFZLElBQUlWLElBQTFDLElBQWtERyxJQUFJLEdBQUdILElBQTdELEVBQW1FO0FBQy9ELGFBQUtmLFVBQUwsQ0FBZ0IyQixhQUFoQjtBQUNBLGFBQUsvQixhQUFMLENBQW1CTyxhQUFuQixDQUFpQyxLQUFLUyxJQUF0QyxFQUE0Q2MsZ0JBQTVDO0FBQ0g7O0FBQUE7QUFDSixLQVhELE1BV087QUFDSDtBQUNIO0FBRUosR0E1Rkk7QUE2RkxFLEVBQUFBLE1BN0ZLLG9CQTZGSSxDQUVSLENBL0ZJO0FBaUdMQyxFQUFBQSxLQWpHSyxtQkFpR0csQ0FFUCxDQW5HSSxDQXFHTDs7QUFyR0ssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHVzZXJfZGF0YSA9IHJlcXVpcmUoXCJ1c2VyX2RhdGFcIik7XG52YXIgY29uZmlnID0gcmVxdWlyZShcImNvbmZpZ1wiKTtcbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGljb25fc3ByaXRlOiBjYy5TcHJpdGUsXG4gICAgICAgIHdvcmtfdGltZV9sYWJlbDogY2MuTGFiZWwsXG4gICAgICAgIHJlc3RfdGltZV9sYWJlbDogY2MuTGFiZWwsXG4gICAgICAgIGNvc3RfbGFiZWw6IGNjLkxhYmVsLFxuICAgICAgICBpY29uX2ZyYW1lX2FycjogW2NjLlNwcml0ZUZyYW1lXSxcbiAgICAgICAgYnV5X2J1dHRvbjogY2MuTm9kZSxcbiAgICAgICAgd29ya190aW1lX2J1ZmZfbGFiZWw6IGNjLkxhYmVsLFxuICAgICAgICByZXN0X3RpbWVfYnVmZl9sYWJlbDogY2MuTGFiZWwsXG4gICAgICAgIGVtcGxveWVkX2J1dHRvbjogY2MuTm9kZSxcbiAgICAgICAgbmFtZV9sYWJsZTogY2MuTGFiZWwsXG4gICAgICAgIGludHJvZHVjZV9sYWJlbDogY2MuTGFiZWwsXG4gICAgfSxcbiAgICAvL2luaSBub2RlXG4gICAgaW5pX25vZGU6IGZ1bmN0aW9uIChzdGFmZl9pbmRleCkge1xuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJnYW1lX3NjZW5lXCIpO1xuICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJnYW1lX3J1bGVzXCIpO1xuICAgICAgICB0aGlzLmFkX2NvbnRyb2wgPSBjYy5maW5kKFwiYWRfY29udHJvbFwiKS5nZXRDb21wb25lbnQoXCJhZF9jb250cm9sXCIpO1xuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wgPSBjYy5maW5kKFwic291bmRfY29udHJvbFwiKS5nZXRDb21wb25lbnQoXCJzb3VuZF9jb250cm9sXCIpO1xuICAgICAgICB0aGlzLnN0YWZmX2luZGV4ID0gc3RhZmZfaW5kZXg7XG4gICAgICAgIHRoaXMudXBkYXRlX2NvbnRlbnQoKTtcbiAgICAgICAgdGhpcy5jcmVhdGVfYWRfY2FyKCk7XG4gICAgfSxcbiAgICAvL+WIt+aWsOaVsOaNrlxuICAgIHVwZGF0ZV9jb250ZW50KCkge1xuICAgICAgICB0aGlzLmljb25fc3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2Fyclt0aGlzLnN0YWZmX2luZGV4XTtcbiAgICAgICAgdGhpcy53b3JrX3RpbWVfbGFiZWwuc3RyaW5nID0gXCJBY3RpdmUgdGltZTpcIiArIGNvbmZpZy5zdGFmZlt0aGlzLnN0YWZmX2luZGV4XS53b3JrX3RpbWUgKyBcInNlY29uZHNcIjtcbiAgICAgICAgdGhpcy5yZXN0X3RpbWVfbGFiZWwuc3RyaW5nID0gXCJGcmVlIHRpbWU6XCIgKyBjb25maWcuc3RhZmZbdGhpcy5zdGFmZl9pbmRleF0ucmVzdF90aW1lICsgXCJzZWNvbmRzXCI7XG4gICAgICAgIHRoaXMubmFtZV9sYWJsZS5zdHJpbmcgPSBjb25maWcuc3RhZmZbdGhpcy5zdGFmZl9pbmRleF0ubmFtZTtcbiAgICAgICAgdGhpcy5pbnRyb2R1Y2VfbGFiZWwuc3RyaW5nID0gY29uZmlnLnN0YWZmW3RoaXMuc3RhZmZfaW5kZXhdLmludHJvZHVjZTtcbiAgICAgICAgLy/mioDog73mj5DnpLpcbiAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxbXCJsYWJvcl9jb250cmFjdFwiXSA9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLndvcmtfdGltZV9idWZmX2xhYmVsLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLndvcmtfdGltZV9idWZmX2xhYmVsLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMud29ya190aW1lX2J1ZmZfbGFiZWwuc3RyaW5nID0gXCIrXCIgKyB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1wibGFib3JfY29udHJhY3RcIl07XG4gICAgICAgIH07XG4gICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLnRyYWRlcltcInJlY2lwZXNcIl0gPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5yZXN0X3RpbWVfYnVmZl9sYWJlbC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZXN0X3RpbWVfYnVmZl9sYWJlbC5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnJlc3RfdGltZV9idWZmX2xhYmVsLnN0cmluZyA9IFwiLVwiICsgdXNlcl9kYXRhLnVzZXJfZGF0YS50cmFkZXJbXCJyZWNpcGVzXCJdO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuY29zdF9sYWJlbC5zdHJpbmcgPSBcIkNvc3Q6XCIgKyBjb25maWcuc3RhZmZbdGhpcy5zdGFmZl9pbmRleF0uY29zdDtcbiAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEuc3RhZmZbdGhpcy5zdGFmZl9pbmRleF0uaGF2ZSA9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmJ1eV9idXR0b24uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZW1wbG95ZWRfYnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5idXlfYnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5lbXBsb3llZF9idXR0b24uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIC8vYnV5IHN0YWZmXG4gICAgb25fYnV5X2J1dHRvbl9jbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkID49IGNvbmZpZy5zdGFmZlt0aGlzLnN0YWZmX2luZGV4XS5jb3N0KSB7XG4gICAgICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMuYWRkX2dvbGQoLWNvbmZpZy5zdGFmZlt0aGlzLnN0YWZmX2luZGV4XS5jb3N0KTtcbiAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuc3RhZmZbdGhpcy5zdGFmZl9pbmRleF0uaGF2ZSA9IDE7XG4gICAgICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMuY3JlYXRlX3N0YWZmKHRoaXMuc3RhZmZfaW5kZXgpO1xuICAgICAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3J1bGVzX2pzLm5vZGUsIFwiZW1wb2x5X3N1Y2Nlc1wiKTtcbiAgICAgICAgICAgIHRoaXMuYnV5X2J1dHRvbi5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9jbGlja1wiKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlX2NvbnRlbnQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcInVuX2NsaWNrXCIpO1xuICAgICAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3J1bGVzX2pzLm5vZGUsIFwibm9fbW9uZXlcIik7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICB0b3VjaF9leGl0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9leGl0XCIpO1xuICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xuICAgIH0sXG4gICAgLy/liJvlu7phZF9jYXJcbiAgICBjcmVhdGVfYWRfY2FyKCkge1xuICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5zdGFmZlt0aGlzLnN0YWZmX2luZGV4XS5oYXZlICE9IDEpIHtcbiAgICAgICAgICAgIHZhciBnb2xkID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkO1xuICAgICAgICAgICAgdmFyIGFsbF9jYXBhY2l0eSA9IDUwMCAqIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxbXCJnb2xkX21heFwiXSArIDUwMDtcbiAgICAgICAgICAgIHZhciBjb3N0ID0gKGNvbmZpZy5zdGFmZlt0aGlzLnN0YWZmX2luZGV4XS5jb3N0KTtcbiAgICAgICAgICAgIC8v5beu5Lu3XG4gICAgICAgICAgICB2YXIgcHJpY2VfZGlmZmVyZW5jZSA9IGNvc3QgLSBnb2xkO1xuICAgICAgICAgICAgLy/lpKfkuo40LzUs5LiU6IO95aSf5oul5pyJ77yM5LiU6YeR5biB5LiN6LazXG4gICAgICAgICAgICBpZiAoZ29sZCA+PSBjb3N0ICogKDQgLyA1KSAmJiBhbGxfY2FwYWNpdHkgPj0gY29zdCAmJiBnb2xkIDwgY29zdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRfY29udHJvbC5oaWRlX2Jhbm5lckFkKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9hZF9jYXIodGhpcy5ub2RlLCBwcmljZV9kaWZmZXJlbmNlKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgIH0sXG4gICAgb25Mb2FkKCkge1xuXG4gICAgfSxcblxuICAgIHN0YXJ0KCkge1xuXG4gICAgfSxcblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxufSk7XG4iXX0=