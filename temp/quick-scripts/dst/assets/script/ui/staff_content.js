
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

      if (gold >= cost * (4 / 5) && all_capacity >= cost && gold < cost) {// this.game_scene_js.create_ad_car(this.node, price_difference);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcc3RhZmZfY29udGVudC5qcyJdLCJuYW1lcyI6WyJ1c2VyX2RhdGEiLCJyZXF1aXJlIiwiY29uZmlnIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJpY29uX3Nwcml0ZSIsIlNwcml0ZSIsIndvcmtfdGltZV9sYWJlbCIsIkxhYmVsIiwicmVzdF90aW1lX2xhYmVsIiwiY29zdF9sYWJlbCIsImljb25fZnJhbWVfYXJyIiwiU3ByaXRlRnJhbWUiLCJidXlfYnV0dG9uIiwiTm9kZSIsIndvcmtfdGltZV9idWZmX2xhYmVsIiwicmVzdF90aW1lX2J1ZmZfbGFiZWwiLCJlbXBsb3llZF9idXR0b24iLCJuYW1lX2xhYmxlIiwiaW50cm9kdWNlX2xhYmVsIiwiaW5pX25vZGUiLCJzdGFmZl9pbmRleCIsImdhbWVfc2NlbmVfanMiLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwiZ2FtZV9ydWxlc19qcyIsImFkX2NvbnRyb2wiLCJzb3VuZF9jb250cm9sIiwidXBkYXRlX2NvbnRlbnQiLCJzcHJpdGVGcmFtZSIsInN0cmluZyIsInN0YWZmIiwid29ya190aW1lIiwicmVzdF90aW1lIiwibmFtZSIsImludHJvZHVjZSIsInNraWxsIiwibm9kZSIsImFjdGl2ZSIsInRyYWRlciIsImNvc3QiLCJoYXZlIiwib25fYnV5X2J1dHRvbl9jbGljayIsImdvbGQiLCJjcmVhdGVfc3RhZmYiLCJnb2xkX21heCIsImdvbGRfbGFiZWwiLCJwbGF5X3NvdW5kX2VmZmVjdCIsImNyZWF0ZV90aXBzX3VpIiwidG91Y2hfZXhpdCIsImRlc3Ryb3kiLCJjcmVhdGVfYWRfY2FyIiwiYWxsX2NhcGFjaXR5IiwicHJpY2VfZGlmZmVyZW5jZSIsIm9uTG9hZCIsInN0YXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLFNBQVMsR0FBR0MsT0FBTyxDQUFDLFdBQUQsQ0FBdkI7O0FBQ0EsSUFBSUMsTUFBTSxHQUFHRCxPQUFPLENBQUMsUUFBRCxDQUFwQjs7QUFDQUUsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFdBQVcsRUFBRUosRUFBRSxDQUFDSyxNQURSO0FBRVJDLElBQUFBLGVBQWUsRUFBRU4sRUFBRSxDQUFDTyxLQUZaO0FBR1JDLElBQUFBLGVBQWUsRUFBRVIsRUFBRSxDQUFDTyxLQUhaO0FBSVJFLElBQUFBLFVBQVUsRUFBRVQsRUFBRSxDQUFDTyxLQUpQO0FBS1JHLElBQUFBLGNBQWMsRUFBRSxDQUFDVixFQUFFLENBQUNXLFdBQUosQ0FMUjtBQU1SQyxJQUFBQSxVQUFVLEVBQUVaLEVBQUUsQ0FBQ2EsSUFOUDtBQU9SQyxJQUFBQSxvQkFBb0IsRUFBRWQsRUFBRSxDQUFDTyxLQVBqQjtBQVFSUSxJQUFBQSxvQkFBb0IsRUFBRWYsRUFBRSxDQUFDTyxLQVJqQjtBQVNSUyxJQUFBQSxlQUFlLEVBQUVoQixFQUFFLENBQUNhLElBVFo7QUFVUkksSUFBQUEsVUFBVSxFQUFFakIsRUFBRSxDQUFDTyxLQVZQO0FBV1JXLElBQUFBLGVBQWUsRUFBRWxCLEVBQUUsQ0FBQ087QUFYWixHQUhQO0FBZ0JMO0FBQ0FZLEVBQUFBLFFBQVEsRUFBRSxrQkFBVUMsV0FBVixFQUF1QjtBQUM3QixTQUFLQyxhQUFMLEdBQXFCckIsRUFBRSxDQUFDc0IsSUFBSCxDQUFRLFNBQVIsRUFBbUJDLFlBQW5CLENBQWdDLFlBQWhDLENBQXJCO0FBQ0EsU0FBS0MsYUFBTCxHQUFxQnhCLEVBQUUsQ0FBQ3NCLElBQUgsQ0FBUSxTQUFSLEVBQW1CQyxZQUFuQixDQUFnQyxZQUFoQyxDQUFyQjtBQUNBLFNBQUtFLFVBQUwsR0FBa0J6QixFQUFFLENBQUNzQixJQUFILENBQVEsWUFBUixFQUFzQkMsWUFBdEIsQ0FBbUMsWUFBbkMsQ0FBbEI7QUFDQSxTQUFLRyxhQUFMLEdBQXFCMUIsRUFBRSxDQUFDc0IsSUFBSCxDQUFRLGVBQVIsRUFBeUJDLFlBQXpCLENBQXNDLGVBQXRDLENBQXJCO0FBQ0EsU0FBS0gsV0FBTCxHQUFtQkEsV0FBbkI7QUFDQSxTQUFLTyxjQUFMLEdBTjZCLENBTzdCO0FBQ0gsR0F6Qkk7QUEwQkw7QUFDQUEsRUFBQUEsY0EzQkssNEJBMkJZO0FBQ2IsU0FBS3ZCLFdBQUwsQ0FBaUJ3QixXQUFqQixHQUErQixLQUFLbEIsY0FBTCxDQUFvQixLQUFLVSxXQUF6QixDQUEvQjtBQUNBLFNBQUtkLGVBQUwsQ0FBcUJ1QixNQUFyQixHQUE4QixpQkFBaUI5QixNQUFNLENBQUMrQixLQUFQLENBQWEsS0FBS1YsV0FBbEIsRUFBK0JXLFNBQWhELEdBQTRELFNBQTFGO0FBQ0EsU0FBS3ZCLGVBQUwsQ0FBcUJxQixNQUFyQixHQUE4QixlQUFlOUIsTUFBTSxDQUFDK0IsS0FBUCxDQUFhLEtBQUtWLFdBQWxCLEVBQStCWSxTQUE5QyxHQUEwRCxTQUF4RjtBQUNBLFNBQUtmLFVBQUwsQ0FBZ0JZLE1BQWhCLEdBQXlCOUIsTUFBTSxDQUFDK0IsS0FBUCxDQUFhLEtBQUtWLFdBQWxCLEVBQStCYSxJQUF4RDtBQUNBLFNBQUtmLGVBQUwsQ0FBcUJXLE1BQXJCLEdBQThCOUIsTUFBTSxDQUFDK0IsS0FBUCxDQUFhLEtBQUtWLFdBQWxCLEVBQStCYyxTQUE3RCxDQUxhLENBTWI7O0FBQ0EsUUFBSXJDLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQnNDLEtBQXBCLENBQTBCLGdCQUExQixLQUErQyxDQUFuRCxFQUFzRDtBQUNsRCxXQUFLckIsb0JBQUwsQ0FBMEJzQixJQUExQixDQUErQkMsTUFBL0IsR0FBd0MsS0FBeEM7QUFDSCxLQUZELE1BRU87QUFDSCxXQUFLdkIsb0JBQUwsQ0FBMEJzQixJQUExQixDQUErQkMsTUFBL0IsR0FBd0MsSUFBeEM7QUFDQSxXQUFLdkIsb0JBQUwsQ0FBMEJlLE1BQTFCLEdBQW1DLE1BQU1oQyxTQUFTLENBQUNBLFNBQVYsQ0FBb0JzQyxLQUFwQixDQUEwQixnQkFBMUIsQ0FBekM7QUFDSDs7QUFBQTs7QUFDRCxRQUFJdEMsU0FBUyxDQUFDQSxTQUFWLENBQW9CeUMsTUFBcEIsQ0FBMkIsU0FBM0IsS0FBeUMsQ0FBN0MsRUFBZ0Q7QUFDNUMsV0FBS3ZCLG9CQUFMLENBQTBCcUIsSUFBMUIsQ0FBK0JDLE1BQS9CLEdBQXdDLEtBQXhDO0FBQ0gsS0FGRCxNQUVPO0FBQ0gsV0FBS3RCLG9CQUFMLENBQTBCcUIsSUFBMUIsQ0FBK0JDLE1BQS9CLEdBQXdDLElBQXhDO0FBQ0EsV0FBS3RCLG9CQUFMLENBQTBCYyxNQUExQixHQUFtQyxNQUFNaEMsU0FBUyxDQUFDQSxTQUFWLENBQW9CeUMsTUFBcEIsQ0FBMkIsU0FBM0IsQ0FBekM7QUFDSDs7QUFBQTtBQUVELFNBQUs3QixVQUFMLENBQWdCb0IsTUFBaEIsR0FBeUIsVUFBVTlCLE1BQU0sQ0FBQytCLEtBQVAsQ0FBYSxLQUFLVixXQUFsQixFQUErQm1CLElBQWxFOztBQUNBLFFBQUkxQyxTQUFTLENBQUNBLFNBQVYsQ0FBb0JpQyxLQUFwQixDQUEwQixLQUFLVixXQUEvQixFQUE0Q29CLElBQTVDLElBQW9ELENBQXhELEVBQTJEO0FBQ3ZELFdBQUs1QixVQUFMLENBQWdCeUIsTUFBaEIsR0FBeUIsSUFBekI7QUFDQSxXQUFLckIsZUFBTCxDQUFxQnFCLE1BQXJCLEdBQThCLEtBQTlCO0FBQ0gsS0FIRCxNQUdPO0FBQ0gsV0FBS3pCLFVBQUwsQ0FBZ0J5QixNQUFoQixHQUF5QixLQUF6QjtBQUNBLFdBQUtyQixlQUFMLENBQXFCcUIsTUFBckIsR0FBOEIsSUFBOUI7QUFDSDs7QUFBQTtBQUNKLEdBdkRJO0FBd0RMO0FBQ0FJLEVBQUFBLG1CQUFtQixFQUFFLCtCQUFZO0FBQzdCLFFBQUk1QyxTQUFTLENBQUNBLFNBQVYsQ0FBb0I2QyxJQUFwQixJQUE0QjNDLE1BQU0sQ0FBQytCLEtBQVAsQ0FBYSxLQUFLVixXQUFsQixFQUErQm1CLElBQS9ELEVBQXFFO0FBQ2pFMUMsTUFBQUEsU0FBUyxDQUFDQSxTQUFWLENBQW9CNkMsSUFBcEIsSUFBNEIzQyxNQUFNLENBQUMrQixLQUFQLENBQWEsS0FBS1YsV0FBbEIsRUFBK0JtQixJQUEzRDtBQUNBMUMsTUFBQUEsU0FBUyxDQUFDQSxTQUFWLENBQW9CaUMsS0FBcEIsQ0FBMEIsS0FBS1YsV0FBL0IsRUFBNENvQixJQUE1QyxHQUFtRCxDQUFuRDtBQUNBLFdBQUtoQixhQUFMLENBQW1CbUIsWUFBbkIsQ0FBZ0MsS0FBS3ZCLFdBQXJDO0FBQ0EsVUFBSXdCLFFBQVEsR0FBRyxNQUFNL0MsU0FBUyxDQUFDQSxTQUFWLENBQW9Cc0MsS0FBcEIsQ0FBMEIsVUFBMUIsQ0FBTixHQUE4QyxHQUE3RDtBQUNBLFdBQUtYLGFBQUwsQ0FBbUJxQixVQUFuQixDQUE4QnRCLFlBQTlCLENBQTJDdkIsRUFBRSxDQUFDTyxLQUE5QyxFQUFxRHNCLE1BQXJELEdBQThEaEMsU0FBUyxDQUFDQSxTQUFWLENBQW9CNkMsSUFBcEIsR0FBMkIsR0FBM0IsR0FBZ0NFLFFBQTlGO0FBQ0EsV0FBS2hDLFVBQUwsQ0FBZ0J5QixNQUFoQixHQUF5QixLQUF6QjtBQUNBLFdBQUtYLGFBQUwsQ0FBbUJvQixpQkFBbkIsQ0FBcUMsY0FBckM7QUFDQSxXQUFLbkIsY0FBTDtBQUNILEtBVEQsTUFTTztBQUNILFdBQUtELGFBQUwsQ0FBbUJvQixpQkFBbkIsQ0FBcUMsVUFBckM7QUFDQSxXQUFLekIsYUFBTCxDQUFtQjBCLGNBQW5CLENBQWtDLEtBQUt2QixhQUFMLENBQW1CWSxJQUFyRCxFQUEyRCxlQUEzRDtBQUNIOztBQUFBO0FBQ0osR0F2RUk7QUF3RUxZLEVBQUFBLFVBQVUsRUFBRSxzQkFBWTtBQUNwQixTQUFLdEIsYUFBTCxDQUFtQm9CLGlCQUFuQixDQUFxQyxhQUFyQztBQUNBLFNBQUtWLElBQUwsQ0FBVWEsT0FBVjtBQUNILEdBM0VJO0FBNEVMO0FBQ0FDLEVBQUFBLGFBN0VLLDJCQTZFVztBQUNaLFFBQUlyRCxTQUFTLENBQUNBLFNBQVYsQ0FBb0JpQyxLQUFwQixDQUEwQixLQUFLVixXQUEvQixFQUE0Q29CLElBQTVDLElBQW9ELENBQXhELEVBQTJEO0FBQ3ZELFVBQUlFLElBQUksR0FBRzdDLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQjZDLElBQS9CO0FBQ0EsVUFBSVMsWUFBWSxHQUFHLE1BQU10RCxTQUFTLENBQUNBLFNBQVYsQ0FBb0JzQyxLQUFwQixDQUEwQixVQUExQixDQUFOLEdBQThDLEdBQWpFO0FBQ0EsVUFBSUksSUFBSSxHQUFJeEMsTUFBTSxDQUFDK0IsS0FBUCxDQUFhLEtBQUtWLFdBQWxCLEVBQStCbUIsSUFBM0MsQ0FIdUQsQ0FJdkQ7O0FBQ0EsVUFBSWEsZ0JBQWdCLEdBQUdiLElBQUksR0FBR0csSUFBOUIsQ0FMdUQsQ0FNdkQ7O0FBQ0EsVUFBSUEsSUFBSSxJQUFJSCxJQUFJLElBQUksSUFBSSxDQUFSLENBQVosSUFBMEJZLFlBQVksSUFBSVosSUFBMUMsSUFBa0RHLElBQUksR0FBR0gsSUFBN0QsRUFBbUUsQ0FDL0Q7QUFDSDs7QUFBQTtBQUNKLEtBVkQsTUFVTztBQUNIO0FBQ0g7QUFFSixHQTVGSTtBQTZGTGMsRUFBQUEsTUE3Rkssb0JBNkZJLENBRVIsQ0EvRkk7QUFpR0xDLEVBQUFBLEtBakdLLG1CQWlHRyxDQUVQLENBbkdJLENBcUdMOztBQXJHSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgdXNlcl9kYXRhID0gcmVxdWlyZShcInVzZXJfZGF0YVwiKTtcclxudmFyIGNvbmZpZyA9IHJlcXVpcmUoXCJjb25maWdcIik7XHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgaWNvbl9zcHJpdGU6IGNjLlNwcml0ZSxcclxuICAgICAgICB3b3JrX3RpbWVfbGFiZWw6IGNjLkxhYmVsLFxyXG4gICAgICAgIHJlc3RfdGltZV9sYWJlbDogY2MuTGFiZWwsXHJcbiAgICAgICAgY29zdF9sYWJlbDogY2MuTGFiZWwsXHJcbiAgICAgICAgaWNvbl9mcmFtZV9hcnI6IFtjYy5TcHJpdGVGcmFtZV0sXHJcbiAgICAgICAgYnV5X2J1dHRvbjogY2MuTm9kZSxcclxuICAgICAgICB3b3JrX3RpbWVfYnVmZl9sYWJlbDogY2MuTGFiZWwsXHJcbiAgICAgICAgcmVzdF90aW1lX2J1ZmZfbGFiZWw6IGNjLkxhYmVsLFxyXG4gICAgICAgIGVtcGxveWVkX2J1dHRvbjogY2MuTm9kZSxcclxuICAgICAgICBuYW1lX2xhYmxlOiBjYy5MYWJlbCxcclxuICAgICAgICBpbnRyb2R1Y2VfbGFiZWw6IGNjLkxhYmVsLFxyXG4gICAgfSxcclxuICAgIC8vaW5pIG5vZGVcclxuICAgIGluaV9ub2RlOiBmdW5jdGlvbiAoc3RhZmZfaW5kZXgpIHtcclxuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJnYW1lX3NjZW5lXCIpO1xyXG4gICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfcnVsZXNcIik7XHJcbiAgICAgICAgdGhpcy5hZF9jb250cm9sID0gY2MuZmluZChcImFkX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwiYWRfY29udHJvbFwiKTtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wgPSBjYy5maW5kKFwic291bmRfY29udHJvbFwiKS5nZXRDb21wb25lbnQoXCJzb3VuZF9jb250cm9sXCIpO1xyXG4gICAgICAgIHRoaXMuc3RhZmZfaW5kZXggPSBzdGFmZl9pbmRleDtcclxuICAgICAgICB0aGlzLnVwZGF0ZV9jb250ZW50KCk7XHJcbiAgICAgICAgLy8gdGhpcy5jcmVhdGVfYWRfY2FyKCk7XHJcbiAgICB9LFxyXG4gICAgLy/liLfmlrDmlbDmja5cclxuICAgIHVwZGF0ZV9jb250ZW50KCkge1xyXG4gICAgICAgIHRoaXMuaWNvbl9zcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyW3RoaXMuc3RhZmZfaW5kZXhdO1xyXG4gICAgICAgIHRoaXMud29ya190aW1lX2xhYmVsLnN0cmluZyA9IFwiQWN0aXZlIHRpbWU6XCIgKyBjb25maWcuc3RhZmZbdGhpcy5zdGFmZl9pbmRleF0ud29ya190aW1lICsgXCJzZWNvbmRzXCI7XHJcbiAgICAgICAgdGhpcy5yZXN0X3RpbWVfbGFiZWwuc3RyaW5nID0gXCJGcmVlIHRpbWU6XCIgKyBjb25maWcuc3RhZmZbdGhpcy5zdGFmZl9pbmRleF0ucmVzdF90aW1lICsgXCJzZWNvbmRzXCI7XHJcbiAgICAgICAgdGhpcy5uYW1lX2xhYmxlLnN0cmluZyA9IGNvbmZpZy5zdGFmZlt0aGlzLnN0YWZmX2luZGV4XS5uYW1lO1xyXG4gICAgICAgIHRoaXMuaW50cm9kdWNlX2xhYmVsLnN0cmluZyA9IGNvbmZpZy5zdGFmZlt0aGlzLnN0YWZmX2luZGV4XS5pbnRyb2R1Y2U7XHJcbiAgICAgICAgLy/mioDog73mj5DnpLpcclxuICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbFtcImxhYm9yX2NvbnRyYWN0XCJdID09IDApIHtcclxuICAgICAgICAgICAgdGhpcy53b3JrX3RpbWVfYnVmZl9sYWJlbC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMud29ya190aW1lX2J1ZmZfbGFiZWwubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLndvcmtfdGltZV9idWZmX2xhYmVsLnN0cmluZyA9IFwiK1wiICsgdXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbFtcImxhYm9yX2NvbnRyYWN0XCJdO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEudHJhZGVyW1wicmVjaXBlc1wiXSA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzdF90aW1lX2J1ZmZfbGFiZWwubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnJlc3RfdGltZV9idWZmX2xhYmVsLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5yZXN0X3RpbWVfYnVmZl9sYWJlbC5zdHJpbmcgPSBcIi1cIiArIHVzZXJfZGF0YS51c2VyX2RhdGEudHJhZGVyW1wicmVjaXBlc1wiXTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmNvc3RfbGFiZWwuc3RyaW5nID0gXCJDb3N0OlwiICsgY29uZmlnLnN0YWZmW3RoaXMuc3RhZmZfaW5kZXhdLmNvc3Q7XHJcbiAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEuc3RhZmZbdGhpcy5zdGFmZl9pbmRleF0uaGF2ZSA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnV5X2J1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmVtcGxveWVkX2J1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmJ1eV9idXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuZW1wbG95ZWRfYnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvL2J1eSBzdGFmZlxyXG4gICAgb25fYnV5X2J1dHRvbl9jbGljazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQgPj0gY29uZmlnLnN0YWZmW3RoaXMuc3RhZmZfaW5kZXhdLmNvc3QpIHtcclxuICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkIC09IGNvbmZpZy5zdGFmZlt0aGlzLnN0YWZmX2luZGV4XS5jb3N0O1xyXG4gICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnN0YWZmW3RoaXMuc3RhZmZfaW5kZXhdLmhhdmUgPSAxO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMuY3JlYXRlX3N0YWZmKHRoaXMuc3RhZmZfaW5kZXgpO1xyXG4gICAgICAgICAgICB2YXIgZ29sZF9tYXggPSA1MDAgKiB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1wiZ29sZF9tYXhcIl0gKyA1MDA7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcy5nb2xkX2xhYmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkICsgXCIvXCIgK2dvbGRfbWF4O1xyXG4gICAgICAgICAgICB0aGlzLmJ1eV9idXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9jbGlja1wiKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVfY29udGVudCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcInVuX2NsaWNrXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3J1bGVzX2pzLm5vZGUsIFwibm9fbW9uZXlfZ29sZFwiKTtcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIHRvdWNoX2V4aXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fZXhpdFwiKTtcclxuICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgfSxcclxuICAgIC8v5Yib5bu6YWRfY2FyXHJcbiAgICBjcmVhdGVfYWRfY2FyKCkge1xyXG4gICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLnN0YWZmW3RoaXMuc3RhZmZfaW5kZXhdLmhhdmUgIT0gMSkge1xyXG4gICAgICAgICAgICB2YXIgZ29sZCA9IHVzZXJfZGF0YS51c2VyX2RhdGEuZ29sZDtcclxuICAgICAgICAgICAgdmFyIGFsbF9jYXBhY2l0eSA9IDUwMCAqIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxbXCJnb2xkX21heFwiXSArIDUwMDtcclxuICAgICAgICAgICAgdmFyIGNvc3QgPSAoY29uZmlnLnN0YWZmW3RoaXMuc3RhZmZfaW5kZXhdLmNvc3QpO1xyXG4gICAgICAgICAgICAvL+W3ruS7t1xyXG4gICAgICAgICAgICB2YXIgcHJpY2VfZGlmZmVyZW5jZSA9IGNvc3QgLSBnb2xkO1xyXG4gICAgICAgICAgICAvL+Wkp+S6jjQvNSzkuJTog73lpJ/mi6XmnInvvIzkuJTph5HluIHkuI3otrNcclxuICAgICAgICAgICAgaWYgKGdvbGQgPj0gY29zdCAqICg0IC8gNSkgJiYgYWxsX2NhcGFjaXR5ID49IGNvc3QgJiYgZ29sZCA8IGNvc3QpIHtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfYWRfY2FyKHRoaXMubm9kZSwgcHJpY2VfZGlmZmVyZW5jZSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG4gICAgb25Mb2FkKCkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcclxufSk7XHJcbiJdfQ==