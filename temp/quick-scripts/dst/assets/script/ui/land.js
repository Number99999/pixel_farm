
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ui/land.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f29fcMddw9Of6PkBASIcaaR', 'land');
// script/ui/land.js

"use strict";

var user_data = require("user_data");

var config = require("config");
/*land state :{
    cut :
    till:
    water:
    plant:
    grow :
};*/


cc.Class({
  "extends": cc.Component,
  properties: {
    tips_node: cc.Node,
    plant_node: cc.Node,
    plant_progress_node: cc.Node,
    water_progress_node: cc.Node,
    plant_progress_label: cc.Label,
    button: cc.Node,
    button_frame_arr: [cc.SpriteFrame],
    land_frame_arr: [cc.SpriteFrame],
    plant0_frame_arr: [cc.SpriteFrame],
    plant1_frame_arr: [cc.SpriteFrame],
    plant2_frame_arr: [cc.SpriteFrame],
    plant3_frame_arr: [cc.SpriteFrame],
    plant4_frame_arr: [cc.SpriteFrame],
    plant5_frame_arr: [cc.SpriteFrame],
    plant6_frame_arr: [cc.SpriteFrame],
    plant7_frame_arr: [cc.SpriteFrame]
  },
  // LIFE-CYCLE CALLBACKS:
  //设置种植的植物
  set_plant: function set_plant() {
    this.plant_node.active = true;
    var alive_stage = user_data.user_data.land[this.land_index].alive_stage;

    for (var i = 0; i < this.plant_node.children.length; i++) {
      this.plant_node.children[i].getComponent(cc.Sprite).spriteFrame = this.plant_frame_arr[this.plant_type][alive_stage];
    }

    ;
    this.plant_grow();
  },
  //植物生长
  plant_grow: function plant_grow() {
    user_data.user_data.land[this.land_index].land_state = "grow"; // note thì growing chạy quá 100%

    var land_state = user_data.user_data.land[this.land_index].land_state;
    this.plant_progress_node.active = true;
    var grow_time = config.plant[this.plant_type].grow_time;
    var now_time = 0;
    var bar = this.plant_progress_node.getComponent(cc.ProgressBar);
    this.watering();

    this.plant_grow_schedule = function () {
      now_time += 0.1 * this.water_buff;

      if (now_time >= grow_time && land_state == "grow") {
        this.unschedule(this.plant_grow_schedule);
        this.plant_progress_label.string = "Waiting for harvest";
        this.wait_next("wait_cut");
        return;
      } else {
        bar.progress = now_time / grow_time;
        var progress_num = parseInt(bar.progress * 100);
        this.plant_progress_label.string = "Growing " + progress_num + "%";
        this.update_plant_alive_stage(progress_num);

        if (progress_num < 25) {
          for (var i = 0; i < this.plant_node.children.length; i++) {
            this.plant_node.children[i].getComponent(cc.Sprite).spriteFrame = this.plant_frame_arr[this.plant_type][0];
          }

          ;
        } else if (progress_num < 50) {
          for (var i = 0; i < this.plant_node.children.length; i++) {
            this.plant_node.children[i].getComponent(cc.Sprite).spriteFrame = this.plant_frame_arr[this.plant_type][1];
          }

          ;
        } else if (progress_num < 75) {
          for (var i = 0; i < this.plant_node.children.length; i++) {
            this.plant_node.children[i].getComponent(cc.Sprite).spriteFrame = this.plant_frame_arr[this.plant_type][2];
          }

          ;
        } else for (var i = 0; i < this.plant_node.children.length; i++) {
          this.plant_node.children[i].getComponent(cc.Sprite).spriteFrame = this.plant_frame_arr[this.plant_type][3];
        }

        ;
      }

      ;
    };

    this.schedule(this.plant_grow_schedule, 0.1);
  },
  //更新植物等级
  update_plant_alive_stage: function update_plant_alive_stage(progress_num) {
    //2的倍数
    var alive_stage = user_data.user_data.land[this.land_index].alive_stage;
    var plantSprite = this.plant_node.children[this.plant_index].getComponent(cc.Sprite).spriteFrame;

    if (plantSprite) {
      plantSprite = this.plant_frame_arr[this.plant_type][alive_stage];
    }

    ;

    if (progress_num >= 25 / 12 * this.plant_count) {
      this.plant_index++;
      this.plant_count++;

      if (this.plant_count > 48) {
        this.plant_count = 48;
      }

      ;

      if (this.plant_index > 11) {
        user_data.user_data.land[this.land_index].alive_stage++;

        if (user_data.user_data.land[this.land_index].alive_stage > 3) {
          user_data.user_data.land[this.land_index].alive_stage = 3;
        }

        ;
        this.plant_index = 0;
      }

      ;
    }

    ;
  },
  //重置植物的生长状态
  rest_plat_alive_stage: function rest_plat_alive_stage() {
    user_data.user_data.land[this.land_index].alive_stage = 0;
    this.plant_index = 0;
    this.plant_count = 0;
    this.unschedule(this.water_schedule);
    this.unschedule(this.plant_grow_schedule);
    this.set_plant();
  },
  //đợi trạng thái tiếp theo
  wait_next: function wait_next(type) {
    this.button.state = type;

    switch (type) {
      case "wait_cut":
        this.button.children[0].getComponent(cc.Sprite).spriteFrame = this.button_frame_arr[0];
        user_data.user_data.land[this.land_index].land_state = "wait_cut";
        break;

      case "plant":
        this.button.children[0].getComponent(cc.Sprite).spriteFrame = this.button_frame_arr[1];
        break;

      case "wait_till":
        this.button.children[0].getComponent(cc.Sprite).spriteFrame = this.button_frame_arr[2];
        break;
    }

    ;
    this.button.active = true;
    this.unschedule(this.water_schedule);
  },
  //cutting
  cut: function cut() {
    if (user_data.user_data.land[this.land_index].land_state !== "wait_cut") {
      return;
    }

    ;
    user_data.user_data.land[this.land_index].land_state = "cuting";
    var land_state = user_data.user_data.land[this.land_index].land_state;
    this.button.active = false;
    var cut_time = config.plant[this.plant_type].cut_time * (1 - user_data.user_data.skill["speed_the_cut"] / 100);
    var now_time = 0;
    var bar = this.plant_progress_node.getComponent(cc.ProgressBar);

    this.cut_schedule = function () {
      now_time += 0.1;

      if (now_time >= cut_time && land_state == "cuting") {
        now_time = 0;
        user_data.user_data.land[this.land_index].land_state = "cut_over";
        this.sound_control.play_sound_effect("cut_over");
        this.unschedule(this.cut_schedule);
        this.rest_plat_alive_stage();
        var node = this.game_scene_js.create_light_effect(this.node, 1, this.plant_type);

        if (node != null) {
          node.getComponent("light").ini_node(this.plant_type, this.node);
        }

        ;
        return;
      } else {
        bar.progress = now_time / cut_time;
        var progress_num = parseInt(bar.progress * 100);
        this.plant_progress_label.string = "Harvesting " + progress_num + "%";
      }

      ;
    };

    this.schedule(this.cut_schedule, 0.1);
  },
  //按钮被点击
  on_button_click: function on_button_click() {
    this.sound_control.play_sound_effect("button_click");

    switch (this.button.state) {
      case "wait_cut":
        this.cut(); // console.log("hello 123 cutt"); // harvesting

        break;

      case "plant":
        var node = this.game_scene_js.create_plant_ui(this.game_scene_js.node);

        if (node != null) {
          node.getComponent("plant_ui").ini_node(this.land_index);
        }

        ; // console.log("hello plant"); // choose plant 

        break;

      case "wait_till":
        user_data.user_data.land[this.land_index].land_state = "wait_till";
        this.till(); // console.log("hello 123");   // planting

        break;

      default:
        return;
    }

    ;
  },
  //浇水
  watering: function watering() {
    this.water_buff = 2;
    this.water_progress_node.active = true;
    var all_water = config.all_water_num;
    var bar = this.water_progress_node.getComponent(cc.ProgressBar);

    this.water_schedule = function () {
      if (user_data.user_data.land[this.land_index].land_state == "grow") {
        var water_num = user_data.user_data.land[this.land_index].water_num;
        user_data.user_data.land[this.land_index].water_num -= 0.1 * (1 - user_data.user_data.skill["water_saving"] / 100);
        water_num = user_data.user_data.land[this.land_index].water_num;
        if (user_data.user_data.land[this.land_index].have_water == 0) water_num = 0;

        if (water_num <= 0) {
          this.unschedule(this.water_schedule);
          this.water_buff = 1;
          user_data.user_data.land[this.land_index].have_water = 0;
          user_data.user_data.land[this.land_index].water_num = 0; // user_data.user_data.land[this.land_index].have_water = 0;   // lưu trạng thái có nước hay k của ô đất
          // console.log("hello " + user_data.user_data.land[this.land_index].have_water)

          return;
        } else {
          if (user_data.user_data.land[this.land_index].have_water == 0) bar.progress = 0;else {
            user_data.user_data.land[this.land_index].have_water = 1;
            bar.progress = water_num / all_water;
          }
        }

        ;
      } else {
        this.unschedule(this.water_schedule);
        return;
      }

      ;
    };

    this.schedule(this.water_schedule, 0.1);
  },
  water_charge: function water_charge() {
    if (this.water_state == null) {
      this.unschedule(this.water_schedule);
      this.water_state = "charge";
      var all_water = config.all_water_num;
      var bar = this.water_progress_node.getComponent(cc.ProgressBar);
      user_data.user_data.land[this.land_index].have_water = 1;

      var callback = function callback() {
        var now_water = user_data.user_data.land[this.land_index].water_num;
        user_data.user_data.land[this.land_index].water_num += 1;

        if (now_water >= all_water) {
          this.unschedule(callback);
          user_data.user_data.land[this.land_index].water_num = all_water;
          this.water_state = null;

          if (user_data.user_data.land[this.land_index].land_state == "cut") {//
          } else {
            this.watering();
          }

          ;
          return;
        }

        ;
        bar.progress = now_water / all_water;
      };

      this.schedule(callback, 0.1);
    } else if (this.water_state == "charge") {
      user_data.user_data.land[this.land_index].water_num += 10;
    }

    ;
  },
  //初始化节点
  ini_node: function ini_node(index) {
    this.sound_control = cc.find("sound_control").getComponent("sound_control");
    var have = user_data.user_data.land[index].have;
    this.land_index = index;
    this.plant_type = user_data.user_data.land[this.land_index].plant_type;
    var land_state = user_data.user_data.land[this.land_index].land_state;
    this.plant_index = 0; //植物索引

    this.plant_count = 0; //生长编号

    this.water_buff = 1; // 初始化水buff

    this.water_state = null;
    this.plant_frame_arr = [this.plant0_frame_arr, this.plant1_frame_arr, this.plant2_frame_arr, this.plant3_frame_arr, this.plant4_frame_arr, this.plant5_frame_arr, this.plant6_frame_arr, this.plant7_frame_arr];

    switch (have) {
      case 0:
        this.tips_node.active = true;
        this.node.getComponent(cc.Sprite).spriteFrame = this.land_frame_arr[0];
        this.plant_node.active = false;
        this.plant_progress_node.active = false;
        this.water_progress_node.active = false;
        break;

      case 1:
        //till state
        this.tips_node.active = false;

        switch (land_state) {
          case "wait_till":
            this.wait_next("wait_till");
            this.plant_node.active = false;
            this.plant_progress_node.active = false;
            this.water_progress_node.active = true;
            this.node.getComponent(cc.Sprite).spriteFrame = this.land_frame_arr[0]; // this.wait_next("wait_till");

            break;

          case "wait_plant":
            this.node.getComponent(cc.Sprite).spriteFrame = this.land_frame_arr[1];
            this.plant_progress_node.active = true;
            this.water_progress_node.active = true; // var bar = this.water_progress_node.getComponent(cc.ProgressBar);
            // if (user_data.user_data.land[this.land_index].have_water == 0) bar.progress = 0;

            this.plant_progress_label.string = "Waiting to be planted";
            this.plant_node.active = false;
            this.wait_next("plant");
            break;

          case "wait_cut":
            this.node.getComponent(cc.Sprite).spriteFrame = this.land_frame_arr[1];
            this.plant_node.active = true;
            this.plant_progress_node.active = true;
            this.water_progress_node.active = true; // var bar = this.water_progress_node.getComponent(cc.ProgressBar);
            // if (user_data.user_data.land[this.land_index].have_water == 0) bar.progress = 0;

            this.plant_progress_label.string = "Waiting for harvest";
            this.plant_progress_node.getComponent(cc.ProgressBar).progress = 1;

            for (var i = 0; i < this.plant_node.children.length; i++) {
              this.plant_node.children[i].getComponent(cc.Sprite).spriteFrame = this.plant_frame_arr[this.plant_type][3];
            }

            ;
            this.wait_next("wait_cut"); // console.log(land_state + " hello");

            break;
          // case "tilling":     // trạng thái chưa trồng cây
          //     this.till();

          default:
            this.set_plant();
            this.node.getComponent(cc.Sprite).spriteFrame = this.land_frame_arr[1]; // cc.log(land_state);

            return;
        }

        ;
        break;
    }

    ;
  },
  //耕地
  till: function till() {
    //只允许触发一次
    if (user_data.user_data.land[this.land_index].land_state !== "tilling") {
      user_data.user_data.land[this.land_index].land_state = "tilling";
      var land_state = user_data.user_data.land[this.land_index].land_state;
      user_data.user_data.land[this.land_index].alive_stage = 0;
      this.plant_index = 0;
      this.plant_count = 0; //停掉所有的计时器

      this.unschedule(this.water_schedule);
      this.unschedule(this.plant_grow_schedule);
      this.unschedule(this.cut_schedule);
      this.unschedule(this.plant_schedule);
      this.plant_node.active = false;
      this.button.active = false;
      var till_time = config.till_time * (1 - user_data.user_data.skill["tool_improve"] / 100);
      var bar = this.plant_progress_node.getComponent(cc.ProgressBar);
      var now_time = 0;
      this.plant_progress_node.active = true;
      this.water_progress_node.active = true;
      this.node.getComponent(cc.Sprite).spriteFrame = this.land_frame_arr[0];

      var callback = function callback() {
        now_time += 0.1;

        if (now_time >= till_time && land_state == "tilling") {
          //                    cc.log("till over");
          this.unschedule(callback);
          this.node.getComponent(cc.Sprite).spriteFrame = this.land_frame_arr[1];
          this.plant_progress_label.string = "Waiting to be planted";
          this.wait_next("plant");
        } else {
          bar.progress = now_time / till_time;
          var progress_num = parseInt(bar.progress * 100);
          this.plant_progress_label.string = "In the ground " + progress_num + "%";
        }

        ;
      };

      this.schedule(callback, 0.1);
    } else {
      return;
    }

    ;
  },
  //种植
  plant: function plant(plant_index) {
    user_data.user_data.land[this.land_index].land_state = "wait_plant";
    user_data.user_data.land[this.land_index].plant_type = plant_index;
    this.plant_type = plant_index;
    user_data.user_data.land[this.land_index].alive_stage = 0;
    var now_time = 0;
    var plant_time = config.plant[plant_index].plant_time * (1 - user_data.user_data.skill["tool_improve"] / 100);
    var bar = this.plant_progress_node.getComponent(cc.ProgressBar);
    this.button.active = false;

    this.plant_schedule = function () {
      now_time += 0.1;

      if (now_time >= plant_time) {
        cc.log("plant_over");
        this.unschedule(this.plant_schedule);
        this.set_plant();
      } else {
        bar.progress = now_time / plant_time;
        var progress_num = parseInt(bar.progress * 100);
        this.plant_progress_label.string = "Planting " + progress_num + "%";
      }

      ;
    };

    this.schedule(this.plant_schedule, 0.1);
  },
  onLoad: function onLoad() {
    this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
  },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcbGFuZC5qcyJdLCJuYW1lcyI6WyJ1c2VyX2RhdGEiLCJyZXF1aXJlIiwiY29uZmlnIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJ0aXBzX25vZGUiLCJOb2RlIiwicGxhbnRfbm9kZSIsInBsYW50X3Byb2dyZXNzX25vZGUiLCJ3YXRlcl9wcm9ncmVzc19ub2RlIiwicGxhbnRfcHJvZ3Jlc3NfbGFiZWwiLCJMYWJlbCIsImJ1dHRvbiIsImJ1dHRvbl9mcmFtZV9hcnIiLCJTcHJpdGVGcmFtZSIsImxhbmRfZnJhbWVfYXJyIiwicGxhbnQwX2ZyYW1lX2FyciIsInBsYW50MV9mcmFtZV9hcnIiLCJwbGFudDJfZnJhbWVfYXJyIiwicGxhbnQzX2ZyYW1lX2FyciIsInBsYW50NF9mcmFtZV9hcnIiLCJwbGFudDVfZnJhbWVfYXJyIiwicGxhbnQ2X2ZyYW1lX2FyciIsInBsYW50N19mcmFtZV9hcnIiLCJzZXRfcGxhbnQiLCJhY3RpdmUiLCJhbGl2ZV9zdGFnZSIsImxhbmQiLCJsYW5kX2luZGV4IiwiaSIsImNoaWxkcmVuIiwibGVuZ3RoIiwiZ2V0Q29tcG9uZW50IiwiU3ByaXRlIiwic3ByaXRlRnJhbWUiLCJwbGFudF9mcmFtZV9hcnIiLCJwbGFudF90eXBlIiwicGxhbnRfZ3JvdyIsImxhbmRfc3RhdGUiLCJncm93X3RpbWUiLCJwbGFudCIsIm5vd190aW1lIiwiYmFyIiwiUHJvZ3Jlc3NCYXIiLCJ3YXRlcmluZyIsInBsYW50X2dyb3dfc2NoZWR1bGUiLCJ3YXRlcl9idWZmIiwidW5zY2hlZHVsZSIsInN0cmluZyIsIndhaXRfbmV4dCIsInByb2dyZXNzIiwicHJvZ3Jlc3NfbnVtIiwicGFyc2VJbnQiLCJ1cGRhdGVfcGxhbnRfYWxpdmVfc3RhZ2UiLCJzY2hlZHVsZSIsInBsYW50U3ByaXRlIiwicGxhbnRfaW5kZXgiLCJwbGFudF9jb3VudCIsInJlc3RfcGxhdF9hbGl2ZV9zdGFnZSIsIndhdGVyX3NjaGVkdWxlIiwidHlwZSIsInN0YXRlIiwiY3V0IiwiY3V0X3RpbWUiLCJza2lsbCIsImN1dF9zY2hlZHVsZSIsInNvdW5kX2NvbnRyb2wiLCJwbGF5X3NvdW5kX2VmZmVjdCIsIm5vZGUiLCJnYW1lX3NjZW5lX2pzIiwiY3JlYXRlX2xpZ2h0X2VmZmVjdCIsImluaV9ub2RlIiwib25fYnV0dG9uX2NsaWNrIiwiY3JlYXRlX3BsYW50X3VpIiwidGlsbCIsImFsbF93YXRlciIsImFsbF93YXRlcl9udW0iLCJ3YXRlcl9udW0iLCJoYXZlX3dhdGVyIiwid2F0ZXJfY2hhcmdlIiwid2F0ZXJfc3RhdGUiLCJjYWxsYmFjayIsIm5vd193YXRlciIsImluZGV4IiwiZmluZCIsImhhdmUiLCJwbGFudF9zY2hlZHVsZSIsInRpbGxfdGltZSIsInBsYW50X3RpbWUiLCJsb2ciLCJvbkxvYWQiLCJzdGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxTQUFTLEdBQUdDLE9BQU8sQ0FBQyxXQUFELENBQXZCOztBQUNBLElBQUlDLE1BQU0sR0FBR0QsT0FBTyxDQUFDLFFBQUQsQ0FBcEI7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUFFLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBRUxDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxTQUFTLEVBQUVKLEVBQUUsQ0FBQ0ssSUFETjtBQUVSQyxJQUFBQSxVQUFVLEVBQUVOLEVBQUUsQ0FBQ0ssSUFGUDtBQUdSRSxJQUFBQSxtQkFBbUIsRUFBRVAsRUFBRSxDQUFDSyxJQUhoQjtBQUlSRyxJQUFBQSxtQkFBbUIsRUFBRVIsRUFBRSxDQUFDSyxJQUpoQjtBQUtSSSxJQUFBQSxvQkFBb0IsRUFBRVQsRUFBRSxDQUFDVSxLQUxqQjtBQU1SQyxJQUFBQSxNQUFNLEVBQUVYLEVBQUUsQ0FBQ0ssSUFOSDtBQU9STyxJQUFBQSxnQkFBZ0IsRUFBRSxDQUFDWixF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STtBQXdZTEksRUFBQUEsTUF4WUssb0JBd1lJO0FBQ0wsU0FBS3JCLGFBQUwsR0FBcUJwRSxFQUFFLENBQUNtRixJQUFILENBQVEsU0FBUixFQUFtQnBELFlBQW5CLENBQWdDLFlBQWhDLENBQXJCO0FBQ0gsR0ExWUk7QUE0WUwyRCxFQUFBQSxLQTVZSyxtQkE0WUcsQ0FDUCxDQTdZSSxDQStZTDs7QUEvWUssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHVzZXJfZGF0YSA9IHJlcXVpcmUoXCJ1c2VyX2RhdGFcIik7XG52YXIgY29uZmlnID0gcmVxdWlyZShcImNvbmZpZ1wiKTtcblxuLypsYW5kIHN0YXRlIDp7XG4gICAgY3V0IDpcbiAgICB0aWxsOlxuICAgIHdhdGVyOlxuICAgIHBsYW50OlxuICAgIGdyb3cgOlxufTsqL1xuXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgdGlwc19ub2RlOiBjYy5Ob2RlLFxuICAgICAgICBwbGFudF9ub2RlOiBjYy5Ob2RlLFxuICAgICAgICBwbGFudF9wcm9ncmVzc19ub2RlOiBjYy5Ob2RlLFxuICAgICAgICB3YXRlcl9wcm9ncmVzc19ub2RlOiBjYy5Ob2RlLFxuICAgICAgICBwbGFudF9wcm9ncmVzc19sYWJlbDogY2MuTGFiZWwsXG4gICAgICAgIGJ1dHRvbjogY2MuTm9kZSxcbiAgICAgICAgYnV0dG9uX2ZyYW1lX2FycjogW2NjLlNwcml0ZUZyYW1lXSxcbiAgICAgICAgbGFuZF9mcmFtZV9hcnI6IFtjYy5TcHJpdGVGcmFtZV0sXG4gICAgICAgIHBsYW50MF9mcmFtZV9hcnI6IFtjYy5TcHJpdGVGcmFtZV0sXG4gICAgICAgIHBsYW50MV9mcmFtZV9hcnI6IFtjYy5TcHJpdGVGcmFtZV0sXG4gICAgICAgIHBsYW50Ml9mcmFtZV9hcnI6IFtjYy5TcHJpdGVGcmFtZV0sXG4gICAgICAgIHBsYW50M19mcmFtZV9hcnI6IFtjYy5TcHJpdGVGcmFtZV0sXG4gICAgICAgIHBsYW50NF9mcmFtZV9hcnI6IFtjYy5TcHJpdGVGcmFtZV0sXG4gICAgICAgIHBsYW50NV9mcmFtZV9hcnI6IFtjYy5TcHJpdGVGcmFtZV0sXG4gICAgICAgIHBsYW50Nl9mcmFtZV9hcnI6IFtjYy5TcHJpdGVGcmFtZV0sXG4gICAgICAgIHBsYW50N19mcmFtZV9hcnI6IFtjYy5TcHJpdGVGcmFtZV0sXG4gICAgfSxcblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG4gICAgLy/orr7nva7np43mpI3nmoTmpI3nialcbiAgICBzZXRfcGxhbnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5wbGFudF9ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHZhciBhbGl2ZV9zdGFnZSA9IHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLmFsaXZlX3N0YWdlO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucGxhbnRfbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5wbGFudF9ub2RlLmNoaWxkcmVuW2ldLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5wbGFudF9mcmFtZV9hcnJbdGhpcy5wbGFudF90eXBlXVthbGl2ZV9zdGFnZV07XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucGxhbnRfZ3JvdygpO1xuICAgIH0sXG4gICAgLy/mpI3niannlJ/plb9cbiAgICBwbGFudF9ncm93OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLmxhbmRfc3RhdGUgPSBcImdyb3dcIjsgLy8gbm90ZSB0aMOsIGdyb3dpbmcgY2jhuqF5IHF1w6EgMTAwJVxuICAgICAgICB2YXIgbGFuZF9zdGF0ZSA9IHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLmxhbmRfc3RhdGU7XG4gICAgICAgIHRoaXMucGxhbnRfcHJvZ3Jlc3Nfbm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB2YXIgZ3Jvd190aW1lID0gY29uZmlnLnBsYW50W3RoaXMucGxhbnRfdHlwZV0uZ3Jvd190aW1lO1xuICAgICAgICB2YXIgbm93X3RpbWUgPSAwO1xuICAgICAgICB2YXIgYmFyID0gdGhpcy5wbGFudF9wcm9ncmVzc19ub2RlLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0Jhcik7XG4gICAgICAgIHRoaXMud2F0ZXJpbmcoKTtcbiAgICAgICAgdGhpcy5wbGFudF9ncm93X3NjaGVkdWxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbm93X3RpbWUgKz0gMC4xICogdGhpcy53YXRlcl9idWZmO1xuICAgICAgICAgICAgaWYgKG5vd190aW1lID49IGdyb3dfdGltZSAmJiBsYW5kX3N0YXRlID09IFwiZ3Jvd1wiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMucGxhbnRfZ3Jvd19zY2hlZHVsZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGFudF9wcm9ncmVzc19sYWJlbC5zdHJpbmcgPSBcIldhaXRpbmcgZm9yIGhhcnZlc3RcIjtcbiAgICAgICAgICAgICAgICB0aGlzLndhaXRfbmV4dChcIndhaXRfY3V0XCIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYmFyLnByb2dyZXNzID0gbm93X3RpbWUgLyBncm93X3RpbWU7XG4gICAgICAgICAgICAgICAgdmFyIHByb2dyZXNzX251bSA9IHBhcnNlSW50KGJhci5wcm9ncmVzcyAqIDEwMCk7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGFudF9wcm9ncmVzc19sYWJlbC5zdHJpbmcgPSBcIkdyb3dpbmcgXCIgKyBwcm9ncmVzc19udW0gKyBcIiVcIjtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZV9wbGFudF9hbGl2ZV9zdGFnZShwcm9ncmVzc19udW0pO1xuICAgICAgICAgICAgICAgIGlmIChwcm9ncmVzc19udW0gPCAyNSkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucGxhbnRfbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGFudF9ub2RlLmNoaWxkcmVuW2ldLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5wbGFudF9mcmFtZV9hcnJbdGhpcy5wbGFudF90eXBlXVswXTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAocHJvZ3Jlc3NfbnVtIDwgNTApIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBsYW50X25vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxhbnRfbm9kZS5jaGlsZHJlbltpXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMucGxhbnRfZnJhbWVfYXJyW3RoaXMucGxhbnRfdHlwZV1bMV07XG5cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAocHJvZ3Jlc3NfbnVtIDwgNzUpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBsYW50X25vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxhbnRfbm9kZS5jaGlsZHJlbltpXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMucGxhbnRfZnJhbWVfYXJyW3RoaXMucGxhbnRfdHlwZV1bMl07XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBsYW50X25vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGFudF9ub2RlLmNoaWxkcmVuW2ldLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5wbGFudF9mcmFtZV9hcnJbdGhpcy5wbGFudF90eXBlXVszXTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLnBsYW50X2dyb3dfc2NoZWR1bGUsIDAuMSk7XG4gICAgfSxcbiAgICAvL+abtOaWsOakjeeJqeetiee6p1xuICAgIHVwZGF0ZV9wbGFudF9hbGl2ZV9zdGFnZTogZnVuY3Rpb24gKHByb2dyZXNzX251bSkge1xuICAgICAgICAvLzLnmoTlgI3mlbBcbiAgICAgICAgdmFyIGFsaXZlX3N0YWdlID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0uYWxpdmVfc3RhZ2U7XG4gICAgICAgIGxldCBwbGFudFNwcml0ZSA9IHRoaXMucGxhbnRfbm9kZS5jaGlsZHJlblt0aGlzLnBsYW50X2luZGV4XS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZTtcbiAgICAgICAgaWYgKHBsYW50U3ByaXRlKSB7XG4gICAgICAgICAgICBwbGFudFNwcml0ZSA9IHRoaXMucGxhbnRfZnJhbWVfYXJyW3RoaXMucGxhbnRfdHlwZV1bYWxpdmVfc3RhZ2VdO1xuICAgICAgICB9O1xuICAgICAgICBpZiAocHJvZ3Jlc3NfbnVtID49IDI1IC8gMTIgKiB0aGlzLnBsYW50X2NvdW50KSB7XG4gICAgICAgICAgICB0aGlzLnBsYW50X2luZGV4Kys7XG4gICAgICAgICAgICB0aGlzLnBsYW50X2NvdW50Kys7XG4gICAgICAgICAgICBpZiAodGhpcy5wbGFudF9jb3VudCA+IDQ4KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGFudF9jb3VudCA9IDQ4O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmICh0aGlzLnBsYW50X2luZGV4ID4gMTEpIHtcbiAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5hbGl2ZV9zdGFnZSsrO1xuICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5hbGl2ZV9zdGFnZSA+IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0uYWxpdmVfc3RhZ2UgPSAzO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdGhpcy5wbGFudF9pbmRleCA9IDA7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgLy/ph43nva7mpI3niannmoTnlJ/plb/nirbmgIFcbiAgICByZXN0X3BsYXRfYWxpdmVfc3RhZ2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0uYWxpdmVfc3RhZ2UgPSAwO1xuICAgICAgICB0aGlzLnBsYW50X2luZGV4ID0gMDtcbiAgICAgICAgdGhpcy5wbGFudF9jb3VudCA9IDA7XG4gICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLndhdGVyX3NjaGVkdWxlKTtcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMucGxhbnRfZ3Jvd19zY2hlZHVsZSk7XG4gICAgICAgIHRoaXMuc2V0X3BsYW50KCk7XG4gICAgfSxcbiAgICAvL8SR4bujaSB0cuG6oW5nIHRow6FpIHRp4bq/cCB0aGVvXG4gICAgd2FpdF9uZXh0OiBmdW5jdGlvbiAodHlwZSkge1xuICAgICAgICB0aGlzLmJ1dHRvbi5zdGF0ZSA9IHR5cGU7XG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSBcIndhaXRfY3V0XCI6XG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b24uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmJ1dHRvbl9mcmFtZV9hcnJbMF07XG4gICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0ubGFuZF9zdGF0ZSA9IFwid2FpdF9jdXRcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJwbGFudFwiOlxuICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5idXR0b25fZnJhbWVfYXJyWzFdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIndhaXRfdGlsbFwiOlxuICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5idXR0b25fZnJhbWVfYXJyWzJdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYnV0dG9uLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLndhdGVyX3NjaGVkdWxlKTtcbiAgICB9LFxuICAgIC8vY3V0dGluZ1xuICAgIGN1dDogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0ubGFuZF9zdGF0ZSAhPT0gXCJ3YWl0X2N1dFwiKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH07XG4gICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLmxhbmRfc3RhdGUgPSBcImN1dGluZ1wiO1xuICAgICAgICB2YXIgbGFuZF9zdGF0ZSA9IHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLmxhbmRfc3RhdGVcbiAgICAgICAgdGhpcy5idXR0b24uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHZhciBjdXRfdGltZSA9IGNvbmZpZy5wbGFudFt0aGlzLnBsYW50X3R5cGVdLmN1dF90aW1lICogKDEgLSB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1wic3BlZWRfdGhlX2N1dFwiXSAvIDEwMCk7XG4gICAgICAgIHZhciBub3dfdGltZSA9IDA7XG4gICAgICAgIHZhciBiYXIgPSB0aGlzLnBsYW50X3Byb2dyZXNzX25vZGUuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKTtcbiAgICAgICAgdGhpcy5jdXRfc2NoZWR1bGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBub3dfdGltZSArPSAwLjE7XG4gICAgICAgICAgICBpZiAobm93X3RpbWUgPj0gY3V0X3RpbWUgJiYgbGFuZF9zdGF0ZSA9PSBcImN1dGluZ1wiKSB7XG4gICAgICAgICAgICAgICAgbm93X3RpbWUgPSAwO1xuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLmxhbmRfc3RhdGUgPSBcImN1dF9vdmVyXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiY3V0X292ZXJcIik7XG4gICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMuY3V0X3NjaGVkdWxlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3RfcGxhdF9hbGl2ZV9zdGFnZSgpO1xuICAgICAgICAgICAgICAgIHZhciBub2RlID0gdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9saWdodF9lZmZlY3QodGhpcy5ub2RlLCAxLCB0aGlzLnBsYW50X3R5cGUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKG5vZGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcImxpZ2h0XCIpLmluaV9ub2RlKHRoaXMucGxhbnRfdHlwZSwgdGhpcy5ub2RlKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYmFyLnByb2dyZXNzID0gbm93X3RpbWUgLyBjdXRfdGltZTtcbiAgICAgICAgICAgICAgICB2YXIgcHJvZ3Jlc3NfbnVtID0gcGFyc2VJbnQoYmFyLnByb2dyZXNzICogMTAwKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYW50X3Byb2dyZXNzX2xhYmVsLnN0cmluZyA9IFwiSGFydmVzdGluZyBcIiArIHByb2dyZXNzX251bSArIFwiJVwiO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLmN1dF9zY2hlZHVsZSwgMC4xKTtcbiAgICB9LFxuICAgIC8v5oyJ6ZKu6KKr54K55Ye7XG4gICAgb25fYnV0dG9uX2NsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9jbGlja1wiKTtcbiAgICAgICAgc3dpdGNoICh0aGlzLmJ1dHRvbi5zdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSBcIndhaXRfY3V0XCI6XG4gICAgICAgICAgICAgICAgdGhpcy5jdXQoKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImhlbGxvIDEyMyBjdXR0XCIpOyAvLyBoYXJ2ZXN0aW5nXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwicGxhbnRcIjpcbiAgICAgICAgICAgICAgICB2YXIgbm9kZSA9IHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfcGxhbnRfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUpO1xuICAgICAgICAgICAgICAgIGlmIChub2RlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJwbGFudF91aVwiKS5pbmlfbm9kZSh0aGlzLmxhbmRfaW5kZXgpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJoZWxsbyBwbGFudFwiKTsgLy8gY2hvb3NlIHBsYW50IFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIndhaXRfdGlsbFwiOlxuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLmxhbmRfc3RhdGUgPSBcIndhaXRfdGlsbFwiO1xuICAgICAgICAgICAgICAgIHRoaXMudGlsbCgpO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiaGVsbG8gMTIzXCIpOyAgIC8vIHBsYW50aW5nXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIC8v5rWH5rC0XG4gICAgd2F0ZXJpbmc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy53YXRlcl9idWZmID0gMjtcbiAgICAgICAgdGhpcy53YXRlcl9wcm9ncmVzc19ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHZhciBhbGxfd2F0ZXIgPSBjb25maWcuYWxsX3dhdGVyX251bTtcbiAgICAgICAgdmFyIGJhciA9IHRoaXMud2F0ZXJfcHJvZ3Jlc3Nfbm9kZS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpO1xuICAgICAgICB0aGlzLndhdGVyX3NjaGVkdWxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLmxhbmRfc3RhdGUgPT0gXCJncm93XCIpIHtcbiAgICAgICAgICAgICAgICB2YXIgd2F0ZXJfbnVtID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0ud2F0ZXJfbnVtO1xuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLndhdGVyX251bSAtPSAwLjEgKiAoMSAtIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxbXCJ3YXRlcl9zYXZpbmdcIl0gLyAxMDApO1xuICAgICAgICAgICAgICAgIHdhdGVyX251bSA9IHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLndhdGVyX251bTtcbiAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0uaGF2ZV93YXRlciA9PSAwKSB3YXRlcl9udW0gPSAwO1xuICAgICAgICAgICAgICAgIGlmICh3YXRlcl9udW0gPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy53YXRlcl9zY2hlZHVsZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2F0ZXJfYnVmZiA9IDE7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLmhhdmVfd2F0ZXIgPSAwO1xuICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS53YXRlcl9udW0gPSAwO1xuICAgICAgICAgICAgICAgICAgICAvLyB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5oYXZlX3dhdGVyID0gMDsgICAvLyBsxrB1IHRy4bqhbmcgdGjDoWkgY8OzIG7GsOG7m2MgaGF5IGsgY+G7p2Egw7QgxJHhuqV0XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiaGVsbG8gXCIgKyB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5oYXZlX3dhdGVyKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLmhhdmVfd2F0ZXIgPT0gMCkgYmFyLnByb2dyZXNzID0gMDtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0uaGF2ZV93YXRlcj0xO1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFyLnByb2dyZXNzID0gd2F0ZXJfbnVtIC8gYWxsX3dhdGVyO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMud2F0ZXJfc2NoZWR1bGUpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy53YXRlcl9zY2hlZHVsZSwgMC4xKTtcbiAgICB9LFxuICAgIHdhdGVyX2NoYXJnZTogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy53YXRlcl9zdGF0ZSA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy53YXRlcl9zY2hlZHVsZSk7XG4gICAgICAgICAgICB0aGlzLndhdGVyX3N0YXRlID0gXCJjaGFyZ2VcIjtcbiAgICAgICAgICAgIHZhciBhbGxfd2F0ZXIgPSBjb25maWcuYWxsX3dhdGVyX251bTtcbiAgICAgICAgICAgIHZhciBiYXIgPSB0aGlzLndhdGVyX3Byb2dyZXNzX25vZGUuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKTtcbiAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLmhhdmVfd2F0ZXIgPSAxO1xuICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBub3dfd2F0ZXIgPSB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS53YXRlcl9udW1cbiAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS53YXRlcl9udW0gKz0gMTtcblxuICAgICAgICAgICAgICAgIGlmIChub3dfd2F0ZXIgPj0gYWxsX3dhdGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZShjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLndhdGVyX251bSA9IGFsbF93YXRlcjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53YXRlcl9zdGF0ZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5sYW5kX3N0YXRlID09IFwiY3V0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndhdGVyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGJhci5wcm9ncmVzcyA9IG5vd193YXRlciAvIGFsbF93YXRlcjtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlKGNhbGxiYWNrLCAwLjEpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMud2F0ZXJfc3RhdGUgPT0gXCJjaGFyZ2VcIikge1xuICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0ud2F0ZXJfbnVtICs9IDEwO1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgLy/liJ3lp4vljJboioLngrlcbiAgICBpbmlfbm9kZTogZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbCA9IGNjLmZpbmQoXCJzb3VuZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcInNvdW5kX2NvbnRyb2xcIik7XG4gICAgICAgIHZhciBoYXZlID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW2luZGV4XS5oYXZlO1xuICAgICAgICB0aGlzLmxhbmRfaW5kZXggPSBpbmRleDtcbiAgICAgICAgdGhpcy5wbGFudF90eXBlID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0ucGxhbnRfdHlwZTtcbiAgICAgICAgdmFyIGxhbmRfc3RhdGUgPSB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5sYW5kX3N0YXRlO1xuICAgICAgICB0aGlzLnBsYW50X2luZGV4ID0gMDsgLy/mpI3nianntKLlvJVcbiAgICAgICAgdGhpcy5wbGFudF9jb3VudCA9IDA7IC8v55Sf6ZW/57yW5Y+3XG4gICAgICAgIHRoaXMud2F0ZXJfYnVmZiA9IDE7ICAvLyDliJ3lp4vljJbmsLRidWZmXG4gICAgICAgIHRoaXMud2F0ZXJfc3RhdGUgPSBudWxsO1xuICAgICAgICB0aGlzLnBsYW50X2ZyYW1lX2FyciA9IFtcbiAgICAgICAgICAgIHRoaXMucGxhbnQwX2ZyYW1lX2FycixcbiAgICAgICAgICAgIHRoaXMucGxhbnQxX2ZyYW1lX2FycixcbiAgICAgICAgICAgIHRoaXMucGxhbnQyX2ZyYW1lX2FycixcbiAgICAgICAgICAgIHRoaXMucGxhbnQzX2ZyYW1lX2FycixcbiAgICAgICAgICAgIHRoaXMucGxhbnQ0X2ZyYW1lX2FycixcbiAgICAgICAgICAgIHRoaXMucGxhbnQ1X2ZyYW1lX2FycixcbiAgICAgICAgICAgIHRoaXMucGxhbnQ2X2ZyYW1lX2FycixcbiAgICAgICAgICAgIHRoaXMucGxhbnQ3X2ZyYW1lX2FycixcbiAgICAgICAgXTtcbiAgICAgICAgc3dpdGNoIChoYXZlKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgdGhpcy50aXBzX25vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmxhbmRfZnJhbWVfYXJyWzBdO1xuICAgICAgICAgICAgICAgIHRoaXMucGxhbnRfbm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYW50X3Byb2dyZXNzX25vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy53YXRlcl9wcm9ncmVzc19ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIC8vdGlsbCBzdGF0ZVxuICAgICAgICAgICAgICAgIHRoaXMudGlwc19ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAobGFuZF9zdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwid2FpdF90aWxsXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndhaXRfbmV4dChcIndhaXRfdGlsbFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxhbnRfbm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxhbnRfcHJvZ3Jlc3Nfbm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud2F0ZXJfcHJvZ3Jlc3Nfbm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5sYW5kX2ZyYW1lX2FyclswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMud2FpdF9uZXh0KFwid2FpdF90aWxsXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ3YWl0X3BsYW50XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmxhbmRfZnJhbWVfYXJyWzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGFudF9wcm9ncmVzc19ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndhdGVyX3Byb2dyZXNzX25vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHZhciBiYXIgPSB0aGlzLndhdGVyX3Byb2dyZXNzX25vZGUuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5oYXZlX3dhdGVyID09IDApIGJhci5wcm9ncmVzcyA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYW50X3Byb2dyZXNzX2xhYmVsLnN0cmluZyA9IFwiV2FpdGluZyB0byBiZSBwbGFudGVkXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYW50X25vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndhaXRfbmV4dChcInBsYW50XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ3YWl0X2N1dFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5sYW5kX2ZyYW1lX2FyclsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxhbnRfbm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGFudF9wcm9ncmVzc19ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndhdGVyX3Byb2dyZXNzX25vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHZhciBiYXIgPSB0aGlzLndhdGVyX3Byb2dyZXNzX25vZGUuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5oYXZlX3dhdGVyID09IDApIGJhci5wcm9ncmVzcyA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYW50X3Byb2dyZXNzX2xhYmVsLnN0cmluZyA9IFwiV2FpdGluZyBmb3IgaGFydmVzdFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGFudF9wcm9ncmVzc19ub2RlLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0JhcikucHJvZ3Jlc3MgPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBsYW50X25vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYW50X25vZGUuY2hpbGRyZW5baV0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnBsYW50X2ZyYW1lX2Fyclt0aGlzLnBsYW50X3R5cGVdWzNdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud2FpdF9uZXh0KFwid2FpdF9jdXRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhsYW5kX3N0YXRlICsgXCIgaGVsbG9cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgLy8gY2FzZSBcInRpbGxpbmdcIjogICAgIC8vIHRy4bqhbmcgdGjDoWkgY2jGsGEgdHLhu5NuZyBjw6J5XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLnRpbGwoKTtcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0X3BsYW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmxhbmRfZnJhbWVfYXJyWzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2MubG9nKGxhbmRfc3RhdGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfTtcblxuICAgIH0sXG4gICAgLy/ogJXlnLBcbiAgICB0aWxsOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8v5Y+q5YWB6K646Kem5Y+R5LiA5qyhXG4gICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5sYW5kX3N0YXRlICE9PSBcInRpbGxpbmdcIikge1xuICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0ubGFuZF9zdGF0ZSA9IFwidGlsbGluZ1wiO1xuICAgICAgICAgICAgdmFyIGxhbmRfc3RhdGUgPSB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5sYW5kX3N0YXRlO1xuICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0uYWxpdmVfc3RhZ2UgPSAwO1xuICAgICAgICAgICAgdGhpcy5wbGFudF9pbmRleCA9IDA7XG4gICAgICAgICAgICB0aGlzLnBsYW50X2NvdW50ID0gMDtcbiAgICAgICAgICAgIC8v5YGc5o6J5omA5pyJ55qE6K6h5pe25ZmoXG4gICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy53YXRlcl9zY2hlZHVsZSk7XG4gICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5wbGFudF9ncm93X3NjaGVkdWxlKTtcbiAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLmN1dF9zY2hlZHVsZSk7XG4gICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5wbGFudF9zY2hlZHVsZSk7XG4gICAgICAgICAgICB0aGlzLnBsYW50X25vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHZhciB0aWxsX3RpbWUgPSBjb25maWcudGlsbF90aW1lICogKDEgLSB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1widG9vbF9pbXByb3ZlXCJdIC8gMTAwKTtcbiAgICAgICAgICAgIHZhciBiYXIgPSB0aGlzLnBsYW50X3Byb2dyZXNzX25vZGUuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKTtcbiAgICAgICAgICAgIHZhciBub3dfdGltZSA9IDA7XG4gICAgICAgICAgICB0aGlzLnBsYW50X3Byb2dyZXNzX25vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMud2F0ZXJfcHJvZ3Jlc3Nfbm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5sYW5kX2ZyYW1lX2FyclswXTtcbiAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBub3dfdGltZSArPSAwLjE7XG4gICAgICAgICAgICAgICAgaWYgKG5vd190aW1lID49IHRpbGxfdGltZSAmJiBsYW5kX3N0YXRlID09IFwidGlsbGluZ1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBjYy5sb2coXCJ0aWxsIG92ZXJcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZShjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMubGFuZF9mcmFtZV9hcnJbMV07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxhbnRfcHJvZ3Jlc3NfbGFiZWwuc3RyaW5nID0gXCJXYWl0aW5nIHRvIGJlIHBsYW50ZWRcIjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53YWl0X25leHQoXCJwbGFudFwiKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBiYXIucHJvZ3Jlc3MgPSBub3dfdGltZSAvIHRpbGxfdGltZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByb2dyZXNzX251bSA9IHBhcnNlSW50KGJhci5wcm9ncmVzcyAqIDEwMCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxhbnRfcHJvZ3Jlc3NfbGFiZWwuc3RyaW5nID0gXCJJbiB0aGUgZ3JvdW5kIFwiICsgcHJvZ3Jlc3NfbnVtICsgXCIlXCI7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlKGNhbGxiYWNrLCAwLjEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgLy/np43mpI1cbiAgICBwbGFudDogZnVuY3Rpb24gKHBsYW50X2luZGV4KSB7XG4gICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLmxhbmRfc3RhdGUgPSBcIndhaXRfcGxhbnRcIjtcbiAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0ucGxhbnRfdHlwZSA9IHBsYW50X2luZGV4O1xuICAgICAgICB0aGlzLnBsYW50X3R5cGUgPSBwbGFudF9pbmRleDtcbiAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0uYWxpdmVfc3RhZ2UgPSAwO1xuICAgICAgICB2YXIgbm93X3RpbWUgPSAwO1xuICAgICAgICB2YXIgcGxhbnRfdGltZSA9IGNvbmZpZy5wbGFudFtwbGFudF9pbmRleF0ucGxhbnRfdGltZSAqICgxIC0gdXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbFtcInRvb2xfaW1wcm92ZVwiXSAvIDEwMCk7XG4gICAgICAgIHZhciBiYXIgPSB0aGlzLnBsYW50X3Byb2dyZXNzX25vZGUuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKTtcbiAgICAgICAgdGhpcy5idXR0b24uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMucGxhbnRfc2NoZWR1bGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBub3dfdGltZSArPSAwLjE7XG4gICAgICAgICAgICBpZiAobm93X3RpbWUgPj0gcGxhbnRfdGltZSkge1xuICAgICAgICAgICAgICAgIGNjLmxvZyhcInBsYW50X292ZXJcIik7XG4gICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMucGxhbnRfc2NoZWR1bGUpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0X3BsYW50KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGJhci5wcm9ncmVzcyA9IG5vd190aW1lIC8gcGxhbnRfdGltZTtcbiAgICAgICAgICAgICAgICB2YXIgcHJvZ3Jlc3NfbnVtID0gcGFyc2VJbnQoYmFyLnByb2dyZXNzICogMTAwKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYW50X3Byb2dyZXNzX2xhYmVsLnN0cmluZyA9IFwiUGxhbnRpbmcgXCIgKyBwcm9ncmVzc19udW0gKyBcIiVcIjtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5wbGFudF9zY2hlZHVsZSwgMC4xKTtcbiAgICB9LFxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9zY2VuZVwiKTtcbiAgICB9LFxuXG4gICAgc3RhcnQoKSB7XG4gICAgfSxcblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxufSk7XG4iXX0=