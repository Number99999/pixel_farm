
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
      cc.log("雇佣工人");
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
      cc.log("金币不足");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcc3RhZmZfY29udGVudC5qcyJdLCJuYW1lcyI6WyJ1c2VyX2RhdGEiLCJyZXF1aXJlIiwiY29uZmlnIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJpY29uX3Nwcml0ZSIsIlNwcml0ZSIsIndvcmtfdGltZV9sYWJlbCIsIkxhYmVsIiwicmVzdF90aW1lX2xhYmVsIiwiY29zdF9sYWJlbCIsImljb25fZnJhbWVfYXJyIiwiU3ByaXRlRnJhbWUiLCJidXlfYnV0dG9uIiwiTm9kZSIsIndvcmtfdGltZV9idWZmX2xhYmVsIiwicmVzdF90aW1lX2J1ZmZfbGFiZWwiLCJlbXBsb3llZF9idXR0b24iLCJuYW1lX2xhYmxlIiwiaW50cm9kdWNlX2xhYmVsIiwiaW5pX25vZGUiLCJzdGFmZl9pbmRleCIsImdhbWVfc2NlbmVfanMiLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwiZ2FtZV9ydWxlc19qcyIsImFkX2NvbnRyb2wiLCJzb3VuZF9jb250cm9sIiwidXBkYXRlX2NvbnRlbnQiLCJjcmVhdGVfYWRfY2FyIiwic3ByaXRlRnJhbWUiLCJzdHJpbmciLCJzdGFmZiIsIndvcmtfdGltZSIsInJlc3RfdGltZSIsIm5hbWUiLCJpbnRyb2R1Y2UiLCJza2lsbCIsIm5vZGUiLCJhY3RpdmUiLCJ0cmFkZXIiLCJjb3N0IiwiaGF2ZSIsIm9uX2J1eV9idXR0b25fY2xpY2siLCJnb2xkIiwibG9nIiwiYWRkX2dvbGQiLCJjcmVhdGVfc3RhZmYiLCJjcmVhdGVfdGlwc191aSIsInBsYXlfc291bmRfZWZmZWN0IiwidG91Y2hfZXhpdCIsImRlc3Ryb3kiLCJhbGxfY2FwYWNpdHkiLCJwcmljZV9kaWZmZXJlbmNlIiwiaGlkZV9iYW5uZXJBZCIsIm9uTG9hZCIsInN0YXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLFNBQVMsR0FBR0MsT0FBTyxDQUFDLFdBQUQsQ0FBdkI7O0FBQ0EsSUFB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QVMsQ0FBQ0EsU0FBVixDQUFvQjhDLElBQS9CO0FBQ0EsVUFBSVEsWUFBWSxHQUFHLE1BQU10RCxTQUFTLENBQUNBLFNBQVYsQ0FBb0J1QyxLQUFwQixDQUEwQixVQUExQixDQUFOLEdBQThDLEdBQWpFO0FBQ0EsVUFBSUksSUFBSSxHQUFJekMsTUFBTSxDQUFDZ0MsS0FBUCxDQUFhLEtBQUtYLFdBQWxCLEVBQStCb0IsSUFBM0MsQ0FIdUQsQ0FJdkQ7O0FBQ0EsVUFBSVksZ0JBQWdCLEdBQUdaLElBQUksR0FBR0csSUFBOUIsQ0FMdUQsQ0FNdkQ7O0FBQ0EsVUFBSUEsSUFBSSxJQUFJSCxJQUFJLElBQUksSUFBSSxDQUFSLENBQVosSUFBMEJXLFlBQVksSUFBSVgsSUFBMUMsSUFBa0RHLElBQUksR0FBR0gsSUFBN0QsRUFBbUU7QUFDL0QsYUFBS2YsVUFBTCxDQUFnQjRCLGFBQWhCO0FBQ0EsYUFBS2hDLGFBQUwsQ0FBbUJPLGFBQW5CLENBQWlDLEtBQUtTLElBQXRDLEVBQTRDZSxnQkFBNUM7QUFDSDs7QUFBQTtBQUNKLEtBWEQsTUFXTztBQUNIO0FBQ0g7QUFFSixHQTlGSTtBQStGTEUsRUFBQUEsTUEvRkssb0JBK0ZJLENBRVIsQ0FqR0k7QUFtR0xDLEVBQUFBLEtBbkdLLG1CQW1HRyxDQUVQLENBckdJLENBdUdMOztBQXZHSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgdXNlcl9kYXRhID0gcmVxdWlyZShcInVzZXJfZGF0YVwiKTtcbnZhciBjb25maWcgPSByZXF1aXJlKFwiY29uZmlnXCIpO1xuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgaWNvbl9zcHJpdGU6IGNjLlNwcml0ZSxcbiAgICAgICAgd29ya190aW1lX2xhYmVsOiBjYy5MYWJlbCxcbiAgICAgICAgcmVzdF90aW1lX2xhYmVsOiBjYy5MYWJlbCxcbiAgICAgICAgY29zdF9sYWJlbDogY2MuTGFiZWwsXG4gICAgICAgIGljb25fZnJhbWVfYXJyOiBbY2MuU3ByaXRlRnJhbWVdLFxuICAgICAgICBidXlfYnV0dG9uOiBjYy5Ob2RlLFxuICAgICAgICB3b3JrX3RpbWVfYnVmZl9sYWJlbDogY2MuTGFiZWwsXG4gICAgICAgIHJlc3RfdGltZV9idWZmX2xhYmVsOiBjYy5MYWJlbCxcbiAgICAgICAgZW1wbG95ZWRfYnV0dG9uOiBjYy5Ob2RlLFxuICAgICAgICBuYW1lX2xhYmxlOiBjYy5MYWJlbCxcbiAgICAgICAgaW50cm9kdWNlX2xhYmVsOiBjYy5MYWJlbCxcbiAgICB9LFxuICAgIC8vaW5pIG5vZGVcbiAgICBpbmlfbm9kZTogZnVuY3Rpb24gKHN0YWZmX2luZGV4KSB7XG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfc2NlbmVcIik7XG4gICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfcnVsZXNcIik7XG4gICAgICAgIHRoaXMuYWRfY29udHJvbCA9IGNjLmZpbmQoXCJhZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcImFkX2NvbnRyb2xcIik7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbCA9IGNjLmZpbmQoXCJzb3VuZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcInNvdW5kX2NvbnRyb2xcIik7XG4gICAgICAgIHRoaXMuc3RhZmZfaW5kZXggPSBzdGFmZl9pbmRleDtcbiAgICAgICAgdGhpcy51cGRhdGVfY29udGVudCgpO1xuICAgICAgICB0aGlzLmNyZWF0ZV9hZF9jYXIoKTtcbiAgICB9LFxuICAgIC8v5Yi35paw5pWw5o2uXG4gICAgdXBkYXRlX2NvbnRlbnQoKSB7XG4gICAgICAgIHRoaXMuaWNvbl9zcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyW3RoaXMuc3RhZmZfaW5kZXhdO1xuICAgICAgICB0aGlzLndvcmtfdGltZV9sYWJlbC5zdHJpbmcgPSBcIkFjdGl2ZSB0aW1lOlwiICsgY29uZmlnLnN0YWZmW3RoaXMuc3RhZmZfaW5kZXhdLndvcmtfdGltZSArIFwic2Vjb25kc1wiO1xuICAgICAgICB0aGlzLnJlc3RfdGltZV9sYWJlbC5zdHJpbmcgPSBcIkZyZWUgdGltZTpcIiArIGNvbmZpZy5zdGFmZlt0aGlzLnN0YWZmX2luZGV4XS5yZXN0X3RpbWUgKyBcInNlY29uZHNcIjtcbiAgICAgICAgdGhpcy5uYW1lX2xhYmxlLnN0cmluZyA9IGNvbmZpZy5zdGFmZlt0aGlzLnN0YWZmX2luZGV4XS5uYW1lO1xuICAgICAgICB0aGlzLmludHJvZHVjZV9sYWJlbC5zdHJpbmcgPSBjb25maWcuc3RhZmZbdGhpcy5zdGFmZl9pbmRleF0uaW50cm9kdWNlO1xuICAgICAgICAvL+aKgOiDveaPkOekulxuICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbFtcImxhYm9yX2NvbnRyYWN0XCJdID09IDApIHtcbiAgICAgICAgICAgIHRoaXMud29ya190aW1lX2J1ZmZfbGFiZWwubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMud29ya190aW1lX2J1ZmZfbGFiZWwubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy53b3JrX3RpbWVfYnVmZl9sYWJlbC5zdHJpbmcgPSBcIitcIiArIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxbXCJsYWJvcl9jb250cmFjdFwiXTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEudHJhZGVyW1wicmVjaXBlc1wiXSA9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnJlc3RfdGltZV9idWZmX2xhYmVsLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlc3RfdGltZV9idWZmX2xhYmVsLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMucmVzdF90aW1lX2J1ZmZfbGFiZWwuc3RyaW5nID0gXCItXCIgKyB1c2VyX2RhdGEudXNlcl9kYXRhLnRyYWRlcltcInJlY2lwZXNcIl07XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5jb3N0X2xhYmVsLnN0cmluZyA9IFwiQ29zdDpcIiArIGNvbmZpZy5zdGFmZlt0aGlzLnN0YWZmX2luZGV4XS5jb3N0O1xuICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5zdGFmZlt0aGlzLnN0YWZmX2luZGV4XS5oYXZlID09IDApIHtcbiAgICAgICAgICAgIHRoaXMuYnV5X2J1dHRvbi5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5lbXBsb3llZF9idXR0b24uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmJ1eV9idXR0b24uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmVtcGxveWVkX2J1dHRvbi5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgLy9idXkgc3RhZmZcbiAgICBvbl9idXlfYnV0dG9uX2NsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQgPj0gY29uZmlnLnN0YWZmW3RoaXMuc3RhZmZfaW5kZXhdLmNvc3QpIHtcbiAgICAgICAgICAgIGNjLmxvZyhcIumbh+S9o+W3peS6ulwiKTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcy5hZGRfZ29sZCgtY29uZmlnLnN0YWZmW3RoaXMuc3RhZmZfaW5kZXhdLmNvc3QpO1xuICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5zdGFmZlt0aGlzLnN0YWZmX2luZGV4XS5oYXZlID0gMTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcy5jcmVhdGVfc3RhZmYodGhpcy5zdGFmZl9pbmRleCk7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfcnVsZXNfanMubm9kZSwgXCJlbXBvbHlfc3VjY2VzXCIpO1xuICAgICAgICAgICAgdGhpcy5idXlfYnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVfY29udGVudCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwidW5fY2xpY2tcIik7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfcnVsZXNfanMubm9kZSwgXCJub19tb25leVwiKTtcbiAgICAgICAgICAgIGNjLmxvZyhcIumHkeW4geS4jei2s1wiKTtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIHRvdWNoX2V4aXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2V4aXRcIik7XG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgfSxcbiAgICAvL+WIm+W7umFkX2NhclxuICAgIGNyZWF0ZV9hZF9jYXIoKSB7XG4gICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLnN0YWZmW3RoaXMuc3RhZmZfaW5kZXhdLmhhdmUgIT0gMSkge1xuICAgICAgICAgICAgdmFyIGdvbGQgPSB1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQ7XG4gICAgICAgICAgICB2YXIgYWxsX2NhcGFjaXR5ID0gNTAwICogdXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbFtcImdvbGRfbWF4XCJdICsgNTAwO1xuICAgICAgICAgICAgdmFyIGNvc3QgPSAoY29uZmlnLnN0YWZmW3RoaXMuc3RhZmZfaW5kZXhdLmNvc3QpO1xuICAgICAgICAgICAgLy/lt67ku7dcbiAgICAgICAgICAgIHZhciBwcmljZV9kaWZmZXJlbmNlID0gY29zdCAtIGdvbGQ7XG4gICAgICAgICAgICAvL+Wkp+S6jjQvNSzkuJTog73lpJ/mi6XmnInvvIzkuJTph5HluIHkuI3otrNcbiAgICAgICAgICAgIGlmIChnb2xkID49IGNvc3QgKiAoNCAvIDUpICYmIGFsbF9jYXBhY2l0eSA+PSBjb3N0ICYmIGdvbGQgPCBjb3N0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZF9jb250cm9sLmhpZGVfYmFubmVyQWQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX2FkX2Nhcih0aGlzLm5vZGUsIHByaWNlX2RpZmZlcmVuY2UpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgfSxcbiAgICBvbkxvYWQoKSB7XG5cbiAgICB9LFxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9LFxuXG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTtcbiJdfQ==