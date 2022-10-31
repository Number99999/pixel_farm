
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
          if (user_data.user_data.land[this.land_index].have_water == 0) bar.progress = 0;else bar.progress = water_num / all_water;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcbGFuZC5qcyJdLCJuYW1lcyI6WyJ1c2VyX2RhdGEiLCJyZXF1aXJlIiwiY29uZmlnIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJ0aXBzX25vZGUiLCJOb2RlIiwicGxhbnRfbm9kZSIsInBsYW50X3Byb2dyZXNzX25vZGUiLCJ3YXRlcl9wcm9ncmVzc19ub2RlIiwicGxhbnRfcHJvZ3Jlc3NfbGFiZWwiLCJMYWJlbCIsImJ1dHRvbiIsImJ1dHRvbl9mcmFtZV9hcnIiLCJTcHJpdGVGcmFtZSIsImxhbmRfZnJhbWVfYXJyIiwicGxhbnQwX2ZyYW1lX2FyciIsInBsYW50MV9mcmFtZV9hcnIiLCJwbGFudDJfZnJhbWVfYXJyIiwicGxhbnQzX2ZyYW1lX2FyciIsInBsYW50NF9mcmFtZV9hcnIiLCJwbGFudDVfZnJhbWVfYXJyIiwicGxhbnQ2X2ZyYW1lX2FyciIsInBsYW50N19mcmFtZV9hcnIiLCJzZXRfcGxhbnQiLCJhY3RpdmUiLCJhbGl2ZV9zdGFnZSIsImxhbmQiLCJsYW5kX2luZGV4IiwiaSIsImNoaWxkcmVuIiwibGVuZ3RoIiwiZ2V0Q29tcG9uZW50IiwiU3ByaXRlIiwic3ByaXRlRnJhbWUiLCJwbGFudF9mcmFtZV9hcnIiLCJwbGFudF90eXBlIiwicGxhbnRfZ3JvdyIsImxhbmRfc3RhdGUiLCJncm93X3RpbWUiLCJwbGFudCIsIm5vd190aW1lIiwiYmFyIiwiUHJvZ3Jlc3NCYXIiLCJ3YXRlcmluZyIsInBsYW50X2dyb3dfc2NoZWR1bGUiLCJ3YXRlcl9idWZmIiwidW5zY2hlZHVsZSIsInN0cmluZyIsIndhaXRfbmV4dCIsInByb2dyZXNzIiwicHJvZ3Jlc3NfbnVtIiwicGFyc2VJbnQiLCJ1cGRhdGVfcGxhbnRfYWxpdmVfc3RhZ2UiLCJzY2hlZHVsZSIsInBsYW50U3ByaXRlIiwicGxhbnRfaW5kZXgiLCJwbGFudF9jb3VudCIsInJlc3RfcGxhdF9hbGl2ZV9zdGFnZSIsIndhdGVyX3NjaGVkdWxlIiwidHlwZSIsInN0YXRlIiwiY3V0IiwiY3V0X3RpbWUiLCJza2lsbCIsImN1dF9zY2hlZHVsZSIsInNvdW5kX2NvbnRyb2wiLCJwbGF5X3NvdW5kX2VmZmVjdCIsIm5vZGUiLCJnYW1lX3NjZW5lX2pzIiwiY3JlYXRlX2xpZ2h0X2VmZmVjdCIsImluaV9ub2RlIiwib25fYnV0dG9uX2NsaWNrIiwiY3JlYXRlX3BsYW50X3VpIiwidGlsbCIsImFsbF93YXRlciIsImFsbF93YXRlcl9udW0iLCJ3YXRlcl9udW0iLCJoYXZlX3dhdGVyIiwid2F0ZXJfY2hhcmdlIiwid2F0ZXJfc3RhdGUiLCJjYWxsYmFjayIsIm5vd193YXRlciIsImluZGV4IiwiZmluZCIsImhhdmUiLCJwbGFudF9zY2hlZHVsZSIsInRpbGxfdGltZSIsInBsYW50X3RpbWUiLCJsb2ciLCJvbkxvYWQiLCJzdGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxTQUFTLEdBQUdDLE9BQU8sQ0FBQyxXQUFELENBQXZCOztBQUNBLElBQUlDLE1BQU0sR0FBR0QsT0FBTyxDQUFDLFFBQUQsQ0FBcEI7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUFFLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBRUxDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxTQUFTLEVBQUVKLEVBQUUsQ0FBQ0ssSUFETjtBQUVSQyxJQUFBQSxVQUFVLEVBQUVOLEVBQUUsQ0FBQ0ssSUFGUDtBQUdSRSxJQUFBQSxtQkFBbUIsRUFBRVAsRUFBRSxDQUFDSyxJQUhoQjtBQUlSRyxJQUFBQSxtQkFBbUIsRUFBRVIsRUFBRSxDQUFDSyxJQUpoQjtBQUtSSSxJQUFBQSxvQkFBb0IsRUFBRVQsRUFBRSxDQUFDVSxLQUxqQjtBQU1SQyxJQUFBQSxNQUFNLEVBQUVYLEVBQUUsQ0FBQ0ssSUFOSDtBQU9STyxJQUFBQSxnQkFBZ0IsRUFBRSxDQUFDWixFQUFFLENBQUNhLFdBQUosQ0FQVjtBQVFSQyxJQUFBQSxjQUFjLEVBQUUsQ0FBQ2QsRUFBRSxDQUFDYSxXQUFKLENBUlI7QUFTUkUsSUFBQUEsZ0JBQWdCLEVBQUUsQ0FBQ2YsRUFBRSxDQUFDYSxXQUFKLENBVFY7QUFVUkcsSUFBQUEsZ0JBQWdCLEVBQUUsQ0FBQ2hCLEVBQUUsQ0FBQ2EsV0FBSixDQVZWO0FBV1JJLElBQUFBLGdCQUFnQixFQUFFLENBQUNqQixFQUFFLENBQUNhLFdBQUosQ0FYVjtBQVlSSyxJQUFBQSxnQkFBZ0IsRUFBRSxDQUFDbEIsRUFBRSxDQUFDYSxXQUFKLENBWlY7QUFhUk0sSUFBQUEsZ0JBQWdCLEVBQUUsQ0FBQ25CLEVBQUUsQ0FBQ2EsV0FBSixDQWJWO0FBY1JPLElBQUFBLGdCQUFnQixFQUFFLENBQUNwQixFQUFFLENBQUNhLFdBQUosQ0FkVjtBQWVSUSxJQUFBQSxnQkFBZ0IsRUFBRSxDQUFDckIsRUFBRSxDQUFDYSxXQUFKLENBZlY7QUFnQlJTLElBQUFBLGdCQUFnQixFQUFFLENBQUN0QixFQUFFLENBQUNhLFdBQUo7QUFoQlYsR0FGUDtBQXFCTDtBQUVBO0FBQ0FVLEVBQUFBLFNBQVMsRUFBRSxxQkFBWTtBQUNuQixTQUFLakIsVUFBTCxDQUFnQmtCLE1BQWhCLEdBQXlCLElBQXpCO0FBQ0EsUUFBSUMsV0FBVyxHQUFHNUIsU0FBUyxDQUFDQSxTQUFWLENBQW9CNkIsSUFBcEIsQ0FBeUIsS0FBS0MsVUFBOUIsRUFBMENGLFdBQTVEOztBQUNBLFNBQUssSUFBSUcsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLdEIsVUFBTCxDQUFnQnVCLFFBQWhCLENBQXlCQyxNQUE3QyxFQUFxREYsQ0FBQyxFQUF0RCxFQUEwRDtBQUN0RCxXQUFLdEIsVUFBTCxDQUFnQnVCLFFBQWhCLENBQXlCRCxDQUF6QixFQUE0QkcsWUFBNUIsQ0FBeUMvQixFQUFFLENBQUNnQyxNQUE1QyxFQUFvREMsV0FBcEQsR0FBa0UsS0FBS0MsZUFBTCxDQUFxQixLQUFLQyxVQUExQixFQUFzQ1YsV0FBdEMsQ0FBbEU7QUFDSDs7QUFBQTtBQUNELFNBQUtXLFVBQUw7QUFDSCxHQS9CSTtBQWdDTDtBQUNBQSxFQUFBQSxVQUFVLEVBQUUsc0JBQVk7QUFDcEJ2QyxJQUFBQSxTQUFTLENBQUNBLFNBQVYsQ0FBb0I2QixJQUFwQixDQUF5QixLQUFLQyxVQUE5QixFQUEwQ1UsVUFBMUMsR0FBdUQsTUFBdkQsQ0FEb0IsQ0FDMkM7O0FBQy9ELFFBQUlBLFVBQVUsR0FBR3hDLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQjZCLElBQXBCLENBQXlCLEtBQUtDLFVBQTlCLEVBQTBDVSxVQUEzRDtBQUNBLFNBQUs5QixtQkFBTCxDQUF5QmlCLE1BQXpCLEdBQWtDLElBQWxDO0FBQ0EsUUFBSWMsU0FBUyxHQUFHdkMsTUFBTSxDQUFDd0MsS0FBUCxDQUFhLEtBQUtKLFVBQWxCLEVBQThCRyxTQUE5QztBQUNBLFFBQUlFLFFBQVEsR0FBRyxDQUFmO0FBQ0EsUUFBSUMsR0FBRyxHQUFHLEtBQUtsQyxtQkFBTCxDQUF5QndCLFlBQXpCLENBQXNDL0IsRUFBRSxDQUFDMEMsV0FBekMsQ0FBVjtBQUNBLFNBQUtDLFFBQUw7O0FBQ0EsU0FBS0MsbUJBQUwsR0FBMkIsWUFBWTtBQUNuQ0osTUFBQUEsUUFBUSxJQUFJLE1BQU0sS0FBS0ssVUFBdkI7O0FBQ0EsVUFBSUwsUUFBUSxJQUFJRixTQUFaLElBQXlCRCxVQUFVLElBQUksTUFBM0MsRUFBbUQ7QUFDL0MsYUFBS1MsVUFBTCxDQUFnQixLQUFLRixtQkFBckI7QUFDQSxhQUFLbkMsb0JBQUwsQ0FBMEJzQyxNQUExQixHQUFtQyxxQkFBbkM7QUFDQSxhQUFLQyxTQUFMLENBQWUsVUFBZjtBQUNBO0FBQ0gsT0FMRCxNQUtPO0FBQ0hQLFFBQUFBLEdBQUcsQ0FBQ1EsUUFBSixHQUFlVCxRQUFRLEdBQUdGLFNBQTFCO0FBQ0EsWUFBSVksWUFBWSxHQUFHQyxRQUFRLENBQUNWLEdBQUcsQ0FBQ1EsUUFBSixHQUFlLEdBQWhCLENBQTNCO0FBQ0EsYUFBS3hDLG9CQUFMLENBQTBCc0MsTUFBMUIsR0FBbUMsYUFBYUcsWUFBYixHQUE0QixHQUEvRDtBQUNBLGFBQUtFLHdCQUFMLENBQThCRixZQUE5Qjs7QUFDQSxZQUFJQSxZQUFZLEdBQUcsRUFBbkIsRUFBdUI7QUFDbkIsZUFBSyxJQUFJdEIsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLdEIsVUFBTCxDQUFnQnVCLFFBQWhCLENBQXlCQyxNQUE3QyxFQUFxREYsQ0FBQyxFQUF0RCxFQUEwRDtBQUN0RCxpQkFBS3RCLFVBQUwsQ0FBZ0J1QixRQUFoQixDQUF5QkQsQ0FBekIsRUFBNEJHLFlBQTVCLENBQXlDL0IsRUFBRSxDQUFDZ0MsTUFBNUMsRUFBb0RDLFdBQXBELEdBQWtFLEtBQUtDLGVBQUwsQ0FBcUIsS0FBS0MsVUFBMUIsRUFBc0MsQ0FBdEMsQ0FBbEU7QUFDSDs7QUFBQTtBQUNKLFNBSkQsTUFLSyxJQUFJZSxZQUFZLEdBQUcsRUFBbkIsRUFBdUI7QUFDeEIsZUFBSyxJQUFJdEIsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLdEIsVUFBTCxDQUFnQnVCLFFBQWhCLENBQXlCQyxNQUE3QyxFQUFxREYsQ0FBQyxFQUF0RCxFQUEwRDtBQUN0RCxpQkFBS3RCLFVBQUwsQ0FBZ0J1QixRQUFoQixDQUF5QkQsQ0FBekIsRUFBNEJHLFlBQTVCLENBQXlDL0IsRUFBRSxDQUFDZ0MsTUFBNUMsRUFBb0RDLFdBQXBELEdBQWtFLEtBQUtDLGVBQUwsQ0FBcUIsS0FBS0MsVUFBMUIsRUFBc0MsQ0FBdEMsQ0FBbEU7QUFFSDs7QUFBQTtBQUNKLFNBTEksTUFNQSxJQUFJZSxZQUFZLEdBQUcsRUFBbkIsRUFBdUI7QUFDeEIsZUFBSyxJQUFJdEIsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLdEIsVUFBTCxDQUFnQnVCLFFBQWhCLENBQXlCQyxNQUE3QyxFQUFxREYsQ0FBQyxFQUF0RCxFQUEwRDtBQUN0RCxpQkFBS3RCLFVBQUwsQ0FBZ0J1QixRQUFoQixDQUF5QkQsQ0FBekIsRUFBNEJHLFlBQTVCLENBQXlDL0IsRUFBRSxDQUFDZ0MsTUFBNUMsRUFBb0RDLFdBQXBELEdBQWtFLEtBQUtDLGVBQUwsQ0FBcUIsS0FBS0MsVUFBMUIsRUFBc0MsQ0FBdEMsQ0FBbEU7QUFDSDs7QUFBQTtBQUNKLFNBSkksTUFLQSxLQUFLLElBQUlQLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsS0FBS3RCLFVBQUwsQ0FBZ0J1QixRQUFoQixDQUF5QkMsTUFBN0MsRUFBcURGLENBQUMsRUFBdEQsRUFBMEQ7QUFDM0QsZUFBS3RCLFVBQUwsQ0FBZ0J1QixRQUFoQixDQUF5QkQsQ0FBekIsRUFBNEJHLFlBQTVCLENBQXlDL0IsRUFBRSxDQUFDZ0MsTUFBNUMsRUFBb0RDLFdBQXBELEdBQWtFLEtBQUtDLGVBQUwsQ0FBcUIsS0FBS0MsVUFBMUIsRUFBc0MsQ0FBdEMsQ0FBbEU7QUFDSDs7QUFBQTtBQUNKOztBQUFBO0FBQ0osS0FoQ0Q7O0FBaUNBLFNBQUtrQixRQUFMLENBQWMsS0FBS1QsbUJBQW5CLEVBQXdDLEdBQXhDO0FBQ0gsR0EzRUk7QUE0RUw7QUFDQVEsRUFBQUEsd0JBQXdCLEVBQUUsa0NBQVVGLFlBQVYsRUFBd0I7QUFDOUM7QUFDQSxRQUFJekIsV0FBVyxHQUFHNUIsU0FBUyxDQUFDQSxTQUFWLENBQW9CNkIsSUFBcEIsQ0FBeUIsS0FBS0MsVUFBOUIsRUFBMENGLFdBQTVEO0FBQ0EsUUFBSTZCLFdBQVcsR0FBRyxLQUFLaEQsVUFBTCxDQUFnQnVCLFFBQWhCLENBQXlCLEtBQUswQixXQUE5QixFQUEyQ3hCLFlBQTNDLENBQXdEL0IsRUFBRSxDQUFDZ0MsTUFBM0QsRUFBbUVDLFdBQXJGOztBQUNBLFFBQUlxQixXQUFKLEVBQWlCO0FBQ2JBLE1BQUFBLFdBQVcsR0FBRyxLQUFLcEIsZUFBTCxDQUFxQixLQUFLQyxVQUExQixFQUFzQ1YsV0FBdEMsQ0FBZDtBQUNIOztBQUFBOztBQUNELFFBQUl5QixZQUFZLElBQUksS0FBSyxFQUFMLEdBQVUsS0FBS00sV0FBbkMsRUFBZ0Q7QUFDNUMsV0FBS0QsV0FBTDtBQUNBLFdBQUtDLFdBQUw7O0FBQ0EsVUFBSSxLQUFLQSxXQUFMLEdBQW1CLEVBQXZCLEVBQTJCO0FBQ3ZCLGFBQUtBLFdBQUwsR0FBbUIsRUFBbkI7QUFDSDs7QUFBQTs7QUFDRCxVQUFJLEtBQUtELFdBQUwsR0FBbUIsRUFBdkIsRUFBMkI7QUFDdkIxRCxRQUFBQSxTQUFTLENBQUNBLFNBQVYsQ0FBb0I2QixJQUFwQixDQUF5QixLQUFLQyxVQUE5QixFQUEwQ0YsV0FBMUM7O0FBQ0EsWUFBSTVCLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQjZCLElBQXBCLENBQXlCLEtBQUtDLFVBQTlCLEVBQTBDRixXQUExQyxHQUF3RCxDQUE1RCxFQUErRDtBQUMzRDVCLFVBQUFBLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQjZCLElBQXBCLENBQXlCLEtBQUtDLFVBQTlCLEVBQTBDRixXQUExQyxHQUF3RCxDQUF4RDtBQUNIOztBQUFBO0FBQ0QsYUFBSzhCLFdBQUwsR0FBbUIsQ0FBbkI7QUFDSDs7QUFBQTtBQUNKOztBQUFBO0FBQ0osR0FsR0k7QUFtR0w7QUFDQUUsRUFBQUEscUJBQXFCLEVBQUUsaUNBQVk7QUFDL0I1RCxJQUFBQSxTQUFTLENBQUNBLFNBQVYsQ0FBb0I2QixJQUFwQixDQUF5QixLQUFLQyxVQUE5QixFQUEwQ0YsV0FBMUMsR0FBd0QsQ0FBeEQ7QUFDQSxTQUFLOEIsV0FBTCxHQUFtQixDQUFuQjtBQUNBLFNBQUtDLFdBQUwsR0FBbUIsQ0FBbkI7QUFDQSxTQUFLVixVQUFMLENBQWdCLEtBQUtZLGNBQXJCO0FBQ0EsU0FBS1osVUFBTCxDQUFnQixLQUFLRixtQkFBckI7QUFDQSxTQUFLckIsU0FBTDtBQUNILEdBM0dJO0FBNEdMO0FBQ0F5QixFQUFBQSxTQUFTLEVBQUUsbUJBQVVXLElBQVYsRUFBZ0I7QUFDdkIsU0FBS2hELE1BQUwsQ0FBWWlELEtBQVosR0FBb0JELElBQXBCOztBQUNBLFlBQVFBLElBQVI7QUFDSSxXQUFLLFVBQUw7QUFDSSxhQUFLaEQsTUFBTCxDQUFZa0IsUUFBWixDQUFxQixDQUFyQixFQUF3QkUsWUFBeEIsQ0FBcUMvQixFQUFFLENBQUNnQyxNQUF4QyxFQUFnREMsV0FBaEQsR0FBOEQsS0FBS3JCLGdCQUFMLENBQXNCLENBQXRCLENBQTlEO0FBQ0FmLFFBQUFBLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQjZCLElBQXBCLENBQXlCLEtBQUtDLFVBQTlCLEVBQTBDVSxVQUExQyxHQUF1RCxVQUF2RDtBQUNBOztBQUNKLFdBQUssT0FBTDtBQUNJLGFBQUsxQixNQUFMLENBQVlrQixRQUFaLENBQXFCLENBQXJCLEVBQXdCRSxZQUF4QixDQUFxQy9CLEVBQUUsQ0FBQ2dDLE1BQXhDLEVBQWdEQyxXQUFoRCxHQUE4RCxLQUFLckIsZ0JBQUwsQ0FBc0IsQ0FBdEIsQ0FBOUQ7QUFDQTs7QUFDSixXQUFLLFdBQUw7QUFDSSxhQUFLRCxNQUFMLENBQVlrQixRQUFaLENBQXFCLENBQXJCLEVBQXdCRSxZQUF4QixDQUFxQy9CLEVBQUUsQ0FBQ2dDLE1BQXhDLEVBQWdEQyxXQUFoRCxHQUE4RCxLQUFLckIsZ0JBQUwsQ0FBc0IsQ0FBdEIsQ0FBOUQ7QUFDQTtBQVZSOztBQVlDO0FBQ0QsU0FBS0QsTUFBTCxDQUFZYSxNQUFaLEdBQXFCLElBQXJCO0FBQ0EsU0FBS3NCLFVBQUwsQ0FBZ0IsS0FBS1ksY0FBckI7QUFDSCxHQTlISTtBQStITDtBQUNBRyxFQUFBQSxHQUFHLEVBQUUsZUFBWTtBQUNiLFFBQUloRSxTQUFTLENBQUNBLFNBQVYsQ0FBb0I2QixJQUFwQixDQUF5QixLQUFLQyxVQUE5QixFQUEwQ1UsVUFBMUMsS0FBeUQsVUFBN0QsRUFBeUU7QUFDckU7QUFDSDs7QUFBQTtBQUNEeEMsSUFBQUEsU0FBUyxDQUFDQSxTQUFWLENBQW9CNkIsSUFBcEIsQ0FBeUIsS0FBS0MsVUFBOUIsRUFBMENVLFVBQTFDLEdBQXVELFFBQXZEO0FBQ0EsUUFBSUEsVUFBVSxHQUFHeEMsU0FBUyxDQUFDQSxTQUFWLENBQW9CNkIsSUFBcEIsQ0FBeUIsS0FBS0MsVUFBOUIsRUFBMENVLFVBQTNEO0FBQ0EsU0FBSzFCLE1BQUwsQ0FBWWEsTUFBWixHQUFxQixLQUFyQjtBQUNBLFFBQUlzQyxRQUFRLEdBQUcvRCxNQUFNLENBQUN3QyxLQUFQLENBQWEsS0FBS0osVUFBbEIsRUFBOEIyQixRQUE5QixJQUEwQyxJQUFJakUsU0FBUyxDQUFDQSxTQUFWLENBQW9Ca0UsS0FBcEIsQ0FBMEIsZUFBMUIsSUFBNkMsR0FBM0YsQ0FBZjtBQUNBLFFBQUl2QixRQUFRLEdBQUcsQ0FBZjtBQUNBLFFBQUlDLEdBQUcsR0FBRyxLQUFLbEMsbUJBQUwsQ0FBeUJ3QixZQUF6QixDQUFzQy9CLEVBQUUsQ0FBQzBDLFdBQXpDLENBQVY7O0FBQ0EsU0FBS3NCLFlBQUwsR0FBb0IsWUFBWTtBQUM1QnhCLE1BQUFBLFFBQVEsSUFBSSxHQUFaOztBQUNBLFVBQUlBLFFBQVEsSUFBSXNCLFFBQVosSUFBd0J6QixVQUFVLElBQUksUUFBMUMsRUFBb0Q7QUFDaERHLFFBQUFBLFFBQVEsR0FBRyxDQUFYO0FBQ0EzQyxRQUFBQSxTQUFTLENBQUNBLFNBQVYsQ0FBb0I2QixJQUFwQixDQUF5QixLQUFLQyxVQUE5QixFQUEwQ1UsVUFBMUMsR0FBdUQsVUFBdkQ7QUFDQSxhQUFLNEIsYUFBTCxDQUFtQkMsaUJBQW5CLENBQXFDLFVBQXJDO0FBQ0EsYUFBS3BCLFVBQUwsQ0FBZ0IsS0FBS2tCLFlBQXJCO0FBQ0EsYUFBS1AscUJBQUw7QUFDQSxZQUFJVSxJQUFJLEdBQUcsS0FBS0MsYUFBTCxDQUFtQkMsbUJBQW5CLENBQXVDLEtBQUtGLElBQTVDLEVBQWtELENBQWxELEVBQXFELEtBQUtoQyxVQUExRCxDQUFYOztBQUVBLFlBQUlnQyxJQUFJLElBQUksSUFBWixFQUFrQjtBQUNkQSxVQUFBQSxJQUFJLENBQUNwQyxZQUFMLENBQWtCLE9BQWxCLEVBQTJCdUMsUUFBM0IsQ0FBb0MsS0FBS25DLFVBQXpDLEVBQXFELEtBQUtnQyxJQUExRDtBQUNIOztBQUFBO0FBQ0Q7QUFDSCxPQVpELE1BWU87QUFDSDFCLFFBQUFBLEdBQUcsQ0FBQ1EsUUFBSixHQUFlVCxRQUFRLEdBQUdzQixRQUExQjtBQUNBLFlBQUlaLFlBQVksR0FBR0MsUUFBUSxDQUFDVixHQUFHLENBQUNRLFFBQUosR0FBZSxHQUFoQixDQUEzQjtBQUNBLGFBQUt4QyxvQkFBTCxDQUEwQnNDLE1BQTFCLEdBQW1DLGdCQUFnQkcsWUFBaEIsR0FBK0IsR0FBbEU7QUFDSDs7QUFBQTtBQUNKLEtBbkJEOztBQW9CQSxTQUFLRyxRQUFMLENBQWMsS0FBS1csWUFBbkIsRUFBaUMsR0FBakM7QUFDSCxHQS9KSTtBQWdLTDtBQUNBTyxFQUFBQSxlQUFlLEVBQUUsMkJBQVk7QUFDekIsU0FBS04sYUFBTCxDQUFtQkMsaUJBQW5CLENBQXFDLGNBQXJDOztBQUNBLFlBQVEsS0FBS3ZELE1BQUwsQ0FBWWlELEtBQXBCO0FBQ0ksV0FBSyxVQUFMO0FBQ0ksYUFBS0MsR0FBTCxHQURKLENBRUk7O0FBQ0E7O0FBQ0osV0FBSyxPQUFMO0FBQ0ksWUFBSU0sSUFBSSxHQUFHLEtBQUtDLGFBQUwsQ0FBbUJJLGVBQW5CLENBQW1DLEtBQUtKLGFBQUwsQ0FBbUJELElBQXRELENBQVg7O0FBQ0EsWUFBSUEsSUFBSSxJQUFJLElBQVosRUFBa0I7QUFDZEEsVUFBQUEsSUFBSSxDQUFDcEMsWUFBTCxDQUFrQixVQUFsQixFQUE4QnVDLFFBQTlCLENBQXVDLEtBQUszQyxVQUE1QztBQUNIOztBQUFBLFNBSkwsQ0FLSTs7QUFDQTs7QUFDSixXQUFLLFdBQUw7QUFDSTlCLFFBQUFBLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQjZCLElBQXBCLENBQXlCLEtBQUtDLFVBQTlCLEVBQTBDVSxVQUExQyxHQUF1RCxXQUF2RDtBQUNBLGFBQUtvQyxJQUFMLEdBRkosQ0FHSTs7QUFDQTs7QUFDSjtBQUNJO0FBbEJSOztBQW1CQztBQUNKLEdBdkxJO0FBd0xMO0FBQ0E5QixFQUFBQSxRQUFRLEVBQUUsb0JBQVk7QUFDbEIsU0FBS0UsVUFBTCxHQUFrQixDQUFsQjtBQUNBLFNBQUtyQyxtQkFBTCxDQUF5QmdCLE1BQXpCLEdBQWtDLElBQWxDO0FBQ0EsUUFBSWtELFNBQVMsR0FBRzNFLE1BQU0sQ0FBQzRFLGFBQXZCO0FBQ0EsUUFBSWxDLEdBQUcsR0FBRyxLQUFLakMsbUJBQUwsQ0FBeUJ1QixZQUF6QixDQUFzQy9CLEVBQUUsQ0FBQzBDLFdBQXpDLENBQVY7O0FBQ0EsU0FBS2dCLGNBQUwsR0FBc0IsWUFBWTtBQUM5QixVQUFJN0QsU0FBUyxDQUFDQSxTQUFWLENBQW9CNkIsSUFBcEIsQ0FBeUIsS0FBS0MsVUFBOUIsRUFBMENVLFVBQTFDLElBQXdELE1BQTVELEVBQW9FO0FBQ2hFLFlBQUl1QyxTQUFTLEdBQUcvRSxTQUFTLENBQUNBLFNBQVYsQ0FBb0I2QixJQUFwQixDQUF5QixLQUFLQyxVQUE5QixFQUEwQ2lELFNBQTFEO0FBQ0EvRSxRQUFBQSxTQUFTLENBQUNBLFNBQVYsQ0FBb0I2QixJQUFwQixDQUF5QixLQUFLQyxVQUE5QixFQUEwQ2lELFNBQTFDLElBQXVELE9BQU8sSUFBSS9FLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQmtFLEtBQXBCLENBQTBCLGNBQTFCLElBQTRDLEdBQXZELENBQXZEO0FBQ0FhLFFBQUFBLFNBQVMsR0FBRy9FLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQjZCLElBQXBCLENBQXlCLEtBQUtDLFVBQTlCLEVBQTBDaUQsU0FBdEQ7QUFDQSxZQUFJL0UsU0FBUyxDQUFDQSxTQUFWLENBQW9CNkIsSUFBcEIsQ0FBeUIsS0FBS0MsVUFBOUIsRUFBMENrRCxVQUExQyxJQUF3RCxDQUE1RCxFQUErREQsU0FBUyxHQUFHLENBQVo7O0FBQy9ELFlBQUlBLFNBQVMsSUFBSSxDQUFqQixFQUFvQjtBQUNoQixlQUFLOUIsVUFBTCxDQUFnQixLQUFLWSxjQUFyQjtBQUNBLGVBQUtiLFVBQUwsR0FBa0IsQ0FBbEI7QUFDQWhELFVBQUFBLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQjZCLElBQXBCLENBQXlCLEtBQUtDLFVBQTlCLEVBQTBDa0QsVUFBMUMsR0FBdUQsQ0FBdkQ7QUFDQWhGLFVBQUFBLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQjZCLElBQXBCLENBQXlCLEtBQUtDLFVBQTlCLEVBQTBDaUQsU0FBMUMsR0FBc0QsQ0FBdEQsQ0FKZ0IsQ0FLaEI7QUFDQTs7QUFDQTtBQUNILFNBUkQsTUFRTztBQUNILGNBQUkvRSxTQUFTLENBQUNBLFNBQVYsQ0FBb0I2QixJQUFwQixDQUF5QixLQUFLQyxVQUE5QixFQUEwQ2tELFVBQTFDLElBQXdELENBQTVELEVBQStEcEMsR0FBRyxDQUFDUSxRQUFKLEdBQWUsQ0FBZixDQUEvRCxLQUNLUixHQUFHLENBQUNRLFFBQUosR0FBZTJCLFNBQVMsR0FBR0YsU0FBM0I7QUFDUjs7QUFBQTtBQUNKLE9BakJELE1BaUJPO0FBQ0gsYUFBSzVCLFVBQUwsQ0FBZ0IsS0FBS1ksY0FBckI7QUFDQTtBQUNIOztBQUFBO0FBQ0osS0F0QkQ7O0FBdUJBLFNBQUtMLFFBQUwsQ0FBYyxLQUFLSyxjQUFuQixFQUFtQyxHQUFuQztBQUNILEdBdE5JO0FBdU5Mb0IsRUFBQUEsWUFBWSxFQUFFLHdCQUFZO0FBQ3RCLFFBQUksS0FBS0MsV0FBTCxJQUFvQixJQUF4QixFQUE4QjtBQUMxQixXQUFLakMsVUFBTCxDQUFnQixLQUFLWSxjQUFyQjtBQUNBLFdBQUtxQixXQUFMLEdBQW1CLFFBQW5CO0FBQ0EsVUFBSUwsU0FBUyxHQUFHM0UsTUFBTSxDQUFDNEUsYUFBdkI7QUFDQSxVQUFJbEMsR0FBRyxHQUFHLEtBQUtqQyxtQkFBTCxDQUF5QnVCLFlBQXpCLENBQXNDL0IsRUFBRSxDQUFDMEMsV0FBekMsQ0FBVjtBQUNBN0MsTUFBQUEsU0FBUyxDQUFDQSxTQUFWLENBQW9CNkIsSUFBcEIsQ0FBeUIsS0FBS0MsVUFBOUIsRUFBMENrRCxVQUExQyxHQUF1RCxDQUF2RDs7QUFDQSxVQUFJRyxRQUFRLEdBQUcsU0FBWEEsUUFBVyxHQUFZO0FBQ3ZCLFlBQUlDLFNBQVMsR0FBR3BGLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQjZCLElBQXBCLENBQXlCLEtBQUtDLFVBQTlCLEVBQTBDaUQsU0FBMUQ7QUFDQS9FLFFBQUFBLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQjZCLElBQXBCLENBQXlCLEtBQUtDLFVBQTlCLEVBQTBDaUQsU0FBMUMsSUFBdUQsQ0FBdkQ7O0FBRUEsWUFBSUssU0FBUyxJQUFJUCxTQUFqQixFQUE0QjtBQUN4QixlQUFLNUIsVUFBTCxDQUFnQmtDLFFBQWhCO0FBQ0FuRixVQUFBQSxTQUFTLENBQUNBLFNBQVYsQ0FBb0I2QixJQUFwQixDQUF5QixLQUFLQyxVQUE5QixFQUEwQ2lELFNBQTFDLEdBQXNERixTQUF0RDtBQUNBLGVBQUtLLFdBQUwsR0FBbUIsSUFBbkI7O0FBQ0EsY0FBSWxGLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQjZCLElBQXBCLENBQXlCLEtBQUtDLFVBQTlCLEVBQTBDVSxVQUExQyxJQUF3RCxLQUE1RCxFQUFtRSxDQUMvRDtBQUNILFdBRkQsTUFFTztBQUNILGlCQUFLTSxRQUFMO0FBQ0g7O0FBQUE7QUFDRDtBQUNIOztBQUFBO0FBQ0RGLFFBQUFBLEdBQUcsQ0FBQ1EsUUFBSixHQUFlZ0MsU0FBUyxHQUFHUCxTQUEzQjtBQUNILE9BaEJEOztBQWlCQSxXQUFLckIsUUFBTCxDQUFjMkIsUUFBZCxFQUF3QixHQUF4QjtBQUNILEtBeEJELE1Bd0JPLElBQUksS0FBS0QsV0FBTCxJQUFvQixRQUF4QixFQUFrQztBQUNyQ2xGLE1BQUFBLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQjZCLElBQXBCLENBQXlCLEtBQUtDLFVBQTlCLEVBQTBDaUQsU0FBMUMsSUFBdUQsRUFBdkQ7QUFDSDs7QUFBQTtBQUNKLEdBblBJO0FBb1BMO0FBQ0FOLEVBQUFBLFFBQVEsRUFBRSxrQkFBVVksS0FBVixFQUFpQjtBQUN2QixTQUFLakIsYUFBTCxHQUFxQmpFLEVBQUUsQ0FBQ21GLElBQUgsQ0FBUSxlQUFSLEVBQXlCcEQsWUFBekIsQ0FBc0MsZUFBdEMsQ0FBckI7QUFDQSxRQUFJcUQsSUFBSSxHQUFHdkYsU0FBUyxDQUFDQSxTQUFWLENBQW9CNkIsSUFBcEIsQ0FBeUJ3RCxLQUF6QixFQUFnQ0UsSUFBM0M7QUFDQSxTQUFLekQsVUFBTCxHQUFrQnVELEtBQWxCO0FBQ0EsU0FBSy9DLFVBQUwsR0FBa0J0QyxTQUFTLENBQUNBLFNBQVYsQ0FBb0I2QixJQUFwQixDQUF5QixLQUFLQyxVQUE5QixFQUEwQ1EsVUFBNUQ7QUFDQSxRQUFJRSxVQUFVLEdBQUd4QyxTQUFTLENBQUNBLFNBQVYsQ0FBb0I2QixJQUFwQixDQUF5QixLQUFLQyxVQUE5QixFQUEwQ1UsVUFBM0Q7QUFDQSxTQUFLa0IsV0FBTCxHQUFtQixDQUFuQixDQU51QixDQU1EOztBQUN0QixTQUFLQyxXQUFMLEdBQW1CLENBQW5CLENBUHVCLENBT0Q7O0FBQ3RCLFNBQUtYLFVBQUwsR0FBa0IsQ0FBbEIsQ0FSdUIsQ0FRRDs7QUFDdEIsU0FBS2tDLFdBQUwsR0FBbUIsSUFBbkI7QUFDQSxTQUFLN0MsZUFBTCxHQUF1QixDQUNuQixLQUFLbkIsZ0JBRGMsRUFFbkIsS0FBS0MsZ0JBRmMsRUFHbkIsS0FBS0MsZ0JBSGMsRUFJbkIsS0FBS0MsZ0JBSmMsRUFLbkIsS0FBS0MsZ0JBTGMsRUFNbkIsS0FBS0MsZ0JBTmMsRUFPbkIsS0FBS0MsZ0JBUGMsRUFRbkIsS0FBS0MsZ0JBUmMsQ0FBdkI7O0FBVUEsWUFBUThELElBQVI7QUFDSSxXQUFLLENBQUw7QUFDSSxhQUFLaEYsU0FBTCxDQUFlb0IsTUFBZixHQUF3QixJQUF4QjtBQUNBLGFBQUsyQyxJQUFMLENBQVVwQyxZQUFWLENBQXVCL0IsRUFBRSxDQUFDZ0MsTUFBMUIsRUFBa0NDLFdBQWxDLEdBQWdELEtBQUtuQixjQUFMLENBQW9CLENBQXBCLENBQWhEO0FBQ0EsYUFBS1IsVUFBTCxDQUFnQmtCLE1BQWhCLEdBQXlCLEtBQXpCO0FBQ0EsYUFBS2pCLG1CQUFMLENBQXlCaUIsTUFBekIsR0FBa0MsS0FBbEM7QUFDQSxhQUFLaEIsbUJBQUwsQ0FBeUJnQixNQUF6QixHQUFrQyxLQUFsQztBQUNBOztBQUNKLFdBQUssQ0FBTDtBQUNJO0FBQ0EsYUFBS3BCLFNBQUwsQ0FBZW9CLE1BQWYsR0FBd0IsS0FBeEI7O0FBQ0EsZ0JBQVFhLFVBQVI7QUFDSSxlQUFLLFdBQUw7QUFDSSxpQkFBS1csU0FBTCxDQUFlLFdBQWY7QUFDQSxpQkFBSzFDLFVBQUwsQ0FBZ0JrQixNQUFoQixHQUF5QixLQUF6QjtBQUNBLGlCQUFLakIsbUJBQUwsQ0FBeUJpQixNQUF6QixHQUFrQyxLQUFsQztBQUNBLGlCQUFLaEIsbUJBQUwsQ0FBeUJnQixNQUF6QixHQUFrQyxJQUFsQztBQUNBLGlCQUFLMkMsSUFBTCxDQUFVcEMsWUFBVixDQUF1Qi9CLEVBQUUsQ0FBQ2dDLE1BQTFCLEVBQWtDQyxXQUFsQyxHQUFnRCxLQUFLbkIsY0FBTCxDQUFvQixDQUFwQixDQUFoRCxDQUxKLENBTUk7O0FBQ0E7O0FBQ0osZUFBSyxZQUFMO0FBQ0ksaUJBQUtxRCxJQUFMLENBQVVwQyxZQUFWLENBQXVCL0IsRUFBRSxDQUFDZ0MsTUFBMUIsRUFBa0NDLFdBQWxDLEdBQWdELEtBQUtuQixjQUFMLENBQW9CLENBQXBCLENBQWhEO0FBQ0EsaUJBQUtQLG1CQUFMLENBQXlCaUIsTUFBekIsR0FBa0MsSUFBbEM7QUFDQSxpQkFBS2hCLG1CQUFMLENBQXlCZ0IsTUFBekIsR0FBa0MsSUFBbEMsQ0FISixDQUlJO0FBQ0E7O0FBQ0EsaUJBQUtmLG9CQUFMLENBQTBCc0MsTUFBMUIsR0FBbUMsdUJBQW5DO0FBQ0EsaUJBQUt6QyxVQUFMLENBQWdCa0IsTUFBaEIsR0FBeUIsS0FBekI7QUFDQSxpQkFBS3dCLFNBQUwsQ0FBZSxPQUFmO0FBQ0E7O0FBQ0osZUFBSyxVQUFMO0FBQ0ksaUJBQUttQixJQUFMLENBQVVwQyxZQUFWLENBQXVCL0IsRUFBRSxDQUFDZ0MsTUFBMUIsRUFBa0NDLFdBQWxDLEdBQWdELEtBQUtuQixjQUFMLENBQW9CLENBQXBCLENBQWhEO0FBQ0EsaUJBQUtSLFVBQUwsQ0FBZ0JrQixNQUFoQixHQUF5QixJQUF6QjtBQUNBLGlCQUFLakIsbUJBQUwsQ0FBeUJpQixNQUF6QixHQUFrQyxJQUFsQztBQUNBLGlCQUFLaEIsbUJBQUwsQ0FBeUJnQixNQUF6QixHQUFrQyxJQUFsQyxDQUpKLENBS0k7QUFDQTs7QUFDQSxpQkFBS2Ysb0JBQUwsQ0FBMEJzQyxNQUExQixHQUFtQyxxQkFBbkM7QUFDQSxpQkFBS3hDLG1CQUFMLENBQXlCd0IsWUFBekIsQ0FBc0MvQixFQUFFLENBQUMwQyxXQUF6QyxFQUFzRE8sUUFBdEQsR0FBaUUsQ0FBakU7O0FBQ0EsaUJBQUssSUFBSXJCLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsS0FBS3RCLFVBQUwsQ0FBZ0J1QixRQUFoQixDQUF5QkMsTUFBN0MsRUFBcURGLENBQUMsRUFBdEQsRUFBMEQ7QUFDdEQsbUJBQUt0QixVQUFMLENBQWdCdUIsUUFBaEIsQ0FBeUJELENBQXpCLEVBQTRCRyxZQUE1QixDQUF5Qy9CLEVBQUUsQ0FBQ2dDLE1BQTVDLEVBQW9EQyxXQUFwRCxHQUFrRSxLQUFLQyxlQUFMLENBQXFCLEtBQUtDLFVBQTFCLEVBQXNDLENBQXRDLENBQWxFO0FBQ0g7O0FBQUE7QUFDRCxpQkFBS2EsU0FBTCxDQUFlLFVBQWYsRUFaSixDQWFJOztBQUNBO0FBQ0o7QUFDQTs7QUFDQTtBQUNJLGlCQUFLekIsU0FBTDtBQUNBLGlCQUFLNEMsSUFBTCxDQUFVcEMsWUFBVixDQUF1Qi9CLEVBQUUsQ0FBQ2dDLE1BQTFCLEVBQWtDQyxXQUFsQyxHQUFnRCxLQUFLbkIsY0FBTCxDQUFvQixDQUFwQixDQUFoRCxDQUZKLENBR0k7O0FBQ0E7QUF4Q1I7O0FBMENDO0FBQ0Q7QUF0RFI7O0FBdURDO0FBRUosR0FsVUk7QUFtVUw7QUFDQTJELEVBQUFBLElBQUksRUFBRSxnQkFBWTtBQUNkO0FBQ0EsUUFBSTVFLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQjZCLElBQXBCLENBQXlCLEtBQUtDLFVBQTlCLEVBQTBDVSxVQUExQyxLQUF5RCxTQUE3RCxFQUF3RTtBQUNwRXhDLE1BQUFBLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQjZCLElBQXBCLENBQXlCLEtBQUtDLFVBQTlCLEVBQTBDVSxVQUExQyxHQUF1RCxTQUF2RDtBQUNBLFVBQUlBLFVBQVUsR0FBR3hDLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQjZCLElBQXBCLENBQXlCLEtBQUtDLFVBQTlCLEVBQTBDVSxVQUEzRDtBQUNBeEMsTUFBQUEsU0FBUyxDQUFDQSxTQUFWLENBQW9CNkIsSUFBcEIsQ0FBeUIsS0FBS0MsVUFBOUIsRUFBMENGLFdBQTFDLEdBQXdELENBQXhEO0FBQ0EsV0FBSzhCLFdBQUwsR0FBbUIsQ0FBbkI7QUFDQSxXQUFLQyxXQUFMLEdBQW1CLENBQW5CLENBTG9FLENBTXBFOztBQUNBLFdBQUtWLFVBQUwsQ0FBZ0IsS0FBS1ksY0FBckI7QUFDQSxXQUFLWixVQUFMLENBQWdCLEtBQUtGLG1CQUFyQjtBQUNBLFdBQUtFLFVBQUwsQ0FBZ0IsS0FBS2tCLFlBQXJCO0FBQ0EsV0FBS2xCLFVBQUwsQ0FBZ0IsS0FBS3VDLGNBQXJCO0FBQ0EsV0FBSy9FLFVBQUwsQ0FBZ0JrQixNQUFoQixHQUF5QixLQUF6QjtBQUNBLFdBQUtiLE1BQUwsQ0FBWWEsTUFBWixHQUFxQixLQUFyQjtBQUNBLFVBQUk4RCxTQUFTLEdBQUd2RixNQUFNLENBQUN1RixTQUFQLElBQW9CLElBQUl6RixTQUFTLENBQUNBLFNBQVYsQ0FBb0JrRSxLQUFwQixDQUEwQixjQUExQixJQUE0QyxHQUFwRSxDQUFoQjtBQUNBLFVBQUl0QixHQUFHLEdBQUcsS0FBS2xDLG1CQUFMLENBQXlCd0IsWUFBekIsQ0FBc0MvQixFQUFFLENBQUMwQyxXQUF6QyxDQUFWO0FBQ0EsVUFBSUYsUUFBUSxHQUFHLENBQWY7QUFDQSxXQUFLakMsbUJBQUwsQ0FBeUJpQixNQUF6QixHQUFrQyxJQUFsQztBQUNBLFdBQUtoQixtQkFBTCxDQUF5QmdCLE1BQXpCLEdBQWtDLElBQWxDO0FBQ0EsV0FBSzJDLElBQUwsQ0FBVXBDLFlBQVYsQ0FBdUIvQixFQUFFLENBQUNnQyxNQUExQixFQUFrQ0MsV0FBbEMsR0FBZ0QsS0FBS25CLGNBQUwsQ0FBb0IsQ0FBcEIsQ0FBaEQ7O0FBQ0EsVUFBSWtFLFFBQVEsR0FBRyxTQUFYQSxRQUFXLEdBQVk7QUFDdkJ4QyxRQUFBQSxRQUFRLElBQUksR0FBWjs7QUFDQSxZQUFJQSxRQUFRLElBQUk4QyxTQUFaLElBQXlCakQsVUFBVSxJQUFJLFNBQTNDLEVBQXNEO0FBQ2xEO0FBQ0EsZUFBS1MsVUFBTCxDQUFnQmtDLFFBQWhCO0FBQ0EsZUFBS2IsSUFBTCxDQUFVcEMsWUFBVixDQUF1Qi9CLEVBQUUsQ0FBQ2dDLE1BQTFCLEVBQWtDQyxXQUFsQyxHQUFnRCxLQUFLbkIsY0FBTCxDQUFvQixDQUFwQixDQUFoRDtBQUNBLGVBQUtMLG9CQUFMLENBQTBCc0MsTUFBMUIsR0FBbUMsdUJBQW5DO0FBQ0EsZUFBS0MsU0FBTCxDQUFlLE9BQWY7QUFDSCxTQU5ELE1BTU87QUFDSFAsVUFBQUEsR0FBRyxDQUFDUSxRQUFKLEdBQWVULFFBQVEsR0FBRzhDLFNBQTFCO0FBQ0EsY0FBSXBDLFlBQVksR0FBR0MsUUFBUSxDQUFDVixHQUFHLENBQUNRLFFBQUosR0FBZSxHQUFoQixDQUEzQjtBQUNBLGVBQUt4QyxvQkFBTCxDQUEwQnNDLE1BQTFCLEdBQW1DLG1CQUFtQkcsWUFBbkIsR0FBa0MsR0FBckU7QUFDSDs7QUFBQTtBQUNKLE9BYkQ7O0FBY0EsV0FBS0csUUFBTCxDQUFjMkIsUUFBZCxFQUF3QixHQUF4QjtBQUNILEtBbENELE1Ba0NPO0FBQ0g7QUFDSDs7QUFBQTtBQUNKLEdBM1dJO0FBNFdMO0FBQ0F6QyxFQUFBQSxLQUFLLEVBQUUsZUFBVWdCLFdBQVYsRUFBdUI7QUFDMUIxRCxJQUFBQSxTQUFTLENBQUNBLFNBQVYsQ0FBb0I2QixJQUFwQixDQUF5QixLQUFLQyxVQUE5QixFQUEwQ1UsVUFBMUMsR0FBdUQsWUFBdkQ7QUFDQXhDLElBQUFBLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQjZCLElBQXBCLENBQXlCLEtBQUtDLFVBQTlCLEVBQTBDUSxVQUExQyxHQUF1RG9CLFdBQXZEO0FBQ0EsU0FBS3BCLFVBQUwsR0FBa0JvQixXQUFsQjtBQUNBMUQsSUFBQUEsU0FBUyxDQUFDQSxTQUFWLENBQW9CNkIsSUFBcEIsQ0FBeUIsS0FBS0MsVUFBOUIsRUFBMENGLFdBQTFDLEdBQXdELENBQXhEO0FBQ0EsUUFBSWUsUUFBUSxHQUFHLENBQWY7QUFDQSxRQUFJK0MsVUFBVSxHQUFHeEYsTUFBTSxDQUFDd0MsS0FBUCxDQUFhZ0IsV0FBYixFQUEwQmdDLFVBQTFCLElBQXdDLElBQUkxRixTQUFTLENBQUNBLFNBQVYsQ0FBb0JrRSxLQUFwQixDQUEwQixjQUExQixJQUE0QyxHQUF4RixDQUFqQjtBQUNBLFFBQUl0QixHQUFHLEdBQUcsS0FBS2xDLG1CQUFMLENBQXlCd0IsWUFBekIsQ0FBc0MvQixFQUFFLENBQUMwQyxXQUF6QyxDQUFWO0FBQ0EsU0FBSy9CLE1BQUwsQ0FBWWEsTUFBWixHQUFxQixLQUFyQjs7QUFDQSxTQUFLNkQsY0FBTCxHQUFzQixZQUFZO0FBQzlCN0MsTUFBQUEsUUFBUSxJQUFJLEdBQVo7O0FBQ0EsVUFBSUEsUUFBUSxJQUFJK0MsVUFBaEIsRUFBNEI7QUFDeEJ2RixRQUFBQSxFQUFFLENBQUN3RixHQUFILENBQU8sWUFBUDtBQUNBLGFBQUsxQyxVQUFMLENBQWdCLEtBQUt1QyxjQUFyQjtBQUNBLGFBQUs5RCxTQUFMO0FBQ0gsT0FKRCxNQUlPO0FBQ0hrQixRQUFBQSxHQUFHLENBQUNRLFFBQUosR0FBZVQsUUFBUSxHQUFHK0MsVUFBMUI7QUFDQSxZQUFJckMsWUFBWSxHQUFHQyxRQUFRLENBQUNWLEdBQUcsQ0FBQ1EsUUFBSixHQUFlLEdBQWhCLENBQTNCO0FBQ0EsYUFBS3hDLG9CQUFMLENBQTBCc0MsTUFBMUIsR0FBbUMsY0FBY0csWUFBZCxHQUE2QixHQUFoRTtBQUNIOztBQUFBO0FBQ0osS0FYRDs7QUFZQSxTQUFLRyxRQUFMLENBQWMsS0FBS2dDLGNBQW5CLEVBQW1DLEdBQW5DO0FBQ0gsR0FuWUk7QUFvWUxJLEVBQUFBLE1BcFlLLG9CQW9ZSTtBQUNMLFNBQUtyQixhQUFMLEdBQXFCcEUsRUFBRSxDQUFDbUYsSUFBSCxDQUFRLFNBQVIsRUFBbUJwRCxZQUFuQixDQUFnQyxZQUFoQyxDQUFyQjtBQUNILEdBdFlJO0FBd1lMMkQsRUFBQUEsS0F4WUssbUJBd1lHLENBQ1AsQ0F6WUksQ0EyWUw7O0FBM1lLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciB1c2VyX2RhdGEgPSByZXF1aXJlKFwidXNlcl9kYXRhXCIpO1xyXG52YXIgY29uZmlnID0gcmVxdWlyZShcImNvbmZpZ1wiKTtcclxuXHJcbi8qbGFuZCBzdGF0ZSA6e1xyXG4gICAgY3V0IDpcclxuICAgIHRpbGw6XHJcbiAgICB3YXRlcjpcclxuICAgIHBsYW50OlxyXG4gICAgZ3JvdyA6XHJcbn07Ki9cclxuXHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICB0aXBzX25vZGU6IGNjLk5vZGUsXHJcbiAgICAgICAgcGxhbnRfbm9kZTogY2MuTm9kZSxcclxuICAgICAgICBwbGFudF9wcm9ncmVzc19ub2RlOiBjYy5Ob2RlLFxyXG4gICAgICAgIHdhdGVyX3Byb2dyZXNzX25vZGU6IGNjLk5vZGUsXHJcbiAgICAgICAgcGxhbnRfcHJvZ3Jlc3NfbGFiZWw6IGNjLkxhYmVsLFxyXG4gICAgICAgIGJ1dHRvbjogY2MuTm9kZSxcclxuICAgICAgICBidXR0b25fZnJhbWVfYXJyOiBbY2MuU3ByaXRlRnJhbWVdLFxyXG4gICAgICAgIGxhbmRfZnJhbWVfYXJyOiBbY2MuU3ByaXRlRnJhbWVdLFxyXG4gICAgICAgIHBsYW50MF9mcmFtZV9hcnI6IFtjYy5TcHJpdGVGcmFtZV0sXHJcbiAgICAgICAgcGxhbnQxX2ZyYW1lX2FycjogW2NjLlNwcml0ZUZyYW1lXSxcclxuICAgICAgICBwbGFudDJfZnJhbWVfYXJyOiBbY2MuU3ByaXRlRnJhbWVdLFxyXG4gICAgICAgIHBsYW50M19mcmFtZV9hcnI6IFtjYy5TcHJpdGVGcmFtZV0sXHJcbiAgICAgICAgcGxhbnQ0X2ZyYW1lX2FycjogW2NjLlNwcml0ZUZyYW1lXSxcclxuICAgICAgICBwbGFudDVfZnJhbWVfYXJyOiBbY2MuU3ByaXRlRnJhbWVdLFxyXG4gICAgICAgIHBsYW50Nl9mcmFtZV9hcnI6IFtjYy5TcHJpdGVGcmFtZV0sXHJcbiAgICAgICAgcGxhbnQ3X2ZyYW1lX2FycjogW2NjLlNwcml0ZUZyYW1lXSxcclxuICAgIH0sXHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgLy/orr7nva7np43mpI3nmoTmpI3nialcclxuICAgIHNldF9wbGFudDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMucGxhbnRfbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHZhciBhbGl2ZV9zdGFnZSA9IHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLmFsaXZlX3N0YWdlO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wbGFudF9ub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxhbnRfbm9kZS5jaGlsZHJlbltpXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMucGxhbnRfZnJhbWVfYXJyW3RoaXMucGxhbnRfdHlwZV1bYWxpdmVfc3RhZ2VdO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5wbGFudF9ncm93KCk7XHJcbiAgICB9LFxyXG4gICAgLy/mpI3niannlJ/plb9cclxuICAgIHBsYW50X2dyb3c6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5sYW5kX3N0YXRlID0gXCJncm93XCI7IC8vIG5vdGUgdGjDrCBncm93aW5nIGNo4bqheSBxdcOhIDEwMCVcclxuICAgICAgICB2YXIgbGFuZF9zdGF0ZSA9IHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLmxhbmRfc3RhdGU7XHJcbiAgICAgICAgdGhpcy5wbGFudF9wcm9ncmVzc19ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdmFyIGdyb3dfdGltZSA9IGNvbmZpZy5wbGFudFt0aGlzLnBsYW50X3R5cGVdLmdyb3dfdGltZTtcclxuICAgICAgICB2YXIgbm93X3RpbWUgPSAwO1xyXG4gICAgICAgIHZhciBiYXIgPSB0aGlzLnBsYW50X3Byb2dyZXNzX25vZGUuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKTtcclxuICAgICAgICB0aGlzLndhdGVyaW5nKCk7XHJcbiAgICAgICAgdGhpcy5wbGFudF9ncm93X3NjaGVkdWxlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBub3dfdGltZSArPSAwLjEgKiB0aGlzLndhdGVyX2J1ZmY7XHJcbiAgICAgICAgICAgIGlmIChub3dfdGltZSA+PSBncm93X3RpbWUgJiYgbGFuZF9zdGF0ZSA9PSBcImdyb3dcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMucGxhbnRfZ3Jvd19zY2hlZHVsZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYW50X3Byb2dyZXNzX2xhYmVsLnN0cmluZyA9IFwiV2FpdGluZyBmb3IgaGFydmVzdFwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy53YWl0X25leHQoXCJ3YWl0X2N1dFwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJhci5wcm9ncmVzcyA9IG5vd190aW1lIC8gZ3Jvd190aW1lO1xyXG4gICAgICAgICAgICAgICAgdmFyIHByb2dyZXNzX251bSA9IHBhcnNlSW50KGJhci5wcm9ncmVzcyAqIDEwMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYW50X3Byb2dyZXNzX2xhYmVsLnN0cmluZyA9IFwiR3Jvd2luZyBcIiArIHByb2dyZXNzX251bSArIFwiJVwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVfcGxhbnRfYWxpdmVfc3RhZ2UocHJvZ3Jlc3NfbnVtKTtcclxuICAgICAgICAgICAgICAgIGlmIChwcm9ncmVzc19udW0gPCAyNSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wbGFudF9ub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxhbnRfbm9kZS5jaGlsZHJlbltpXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMucGxhbnRfZnJhbWVfYXJyW3RoaXMucGxhbnRfdHlwZV1bMF07XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHByb2dyZXNzX251bSA8IDUwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBsYW50X25vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGFudF9ub2RlLmNoaWxkcmVuW2ldLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5wbGFudF9mcmFtZV9hcnJbdGhpcy5wbGFudF90eXBlXVsxXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHByb2dyZXNzX251bSA8IDc1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBsYW50X25vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGFudF9ub2RlLmNoaWxkcmVuW2ldLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5wbGFudF9mcmFtZV9hcnJbdGhpcy5wbGFudF90eXBlXVsyXTtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucGxhbnRfbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxhbnRfbm9kZS5jaGlsZHJlbltpXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMucGxhbnRfZnJhbWVfYXJyW3RoaXMucGxhbnRfdHlwZV1bM107XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLnBsYW50X2dyb3dfc2NoZWR1bGUsIDAuMSk7XHJcbiAgICB9LFxyXG4gICAgLy/mm7TmlrDmpI3niannrYnnuqdcclxuICAgIHVwZGF0ZV9wbGFudF9hbGl2ZV9zdGFnZTogZnVuY3Rpb24gKHByb2dyZXNzX251bSkge1xyXG4gICAgICAgIC8vMueahOWAjeaVsFxyXG4gICAgICAgIHZhciBhbGl2ZV9zdGFnZSA9IHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLmFsaXZlX3N0YWdlO1xyXG4gICAgICAgIGxldCBwbGFudFNwcml0ZSA9IHRoaXMucGxhbnRfbm9kZS5jaGlsZHJlblt0aGlzLnBsYW50X2luZGV4XS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZTtcclxuICAgICAgICBpZiAocGxhbnRTcHJpdGUpIHtcclxuICAgICAgICAgICAgcGxhbnRTcHJpdGUgPSB0aGlzLnBsYW50X2ZyYW1lX2Fyclt0aGlzLnBsYW50X3R5cGVdW2FsaXZlX3N0YWdlXTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmIChwcm9ncmVzc19udW0gPj0gMjUgLyAxMiAqIHRoaXMucGxhbnRfY291bnQpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGFudF9pbmRleCsrO1xyXG4gICAgICAgICAgICB0aGlzLnBsYW50X2NvdW50Kys7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBsYW50X2NvdW50ID4gNDgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxhbnRfY291bnQgPSA0ODtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGxhbnRfaW5kZXggPiAxMSkge1xyXG4gICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0uYWxpdmVfc3RhZ2UrKztcclxuICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5hbGl2ZV9zdGFnZSA+IDMpIHtcclxuICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5hbGl2ZV9zdGFnZSA9IDM7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGFudF9pbmRleCA9IDA7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvL+mHjee9ruakjeeJqeeahOeUn+mVv+eKtuaAgVxyXG4gICAgcmVzdF9wbGF0X2FsaXZlX3N0YWdlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0uYWxpdmVfc3RhZ2UgPSAwO1xyXG4gICAgICAgIHRoaXMucGxhbnRfaW5kZXggPSAwO1xyXG4gICAgICAgIHRoaXMucGxhbnRfY291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLndhdGVyX3NjaGVkdWxlKTtcclxuICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5wbGFudF9ncm93X3NjaGVkdWxlKTtcclxuICAgICAgICB0aGlzLnNldF9wbGFudCgpO1xyXG4gICAgfSxcclxuICAgIC8vxJHhu6NpIHRy4bqhbmcgdGjDoWkgdGnhur9wIHRoZW9cclxuICAgIHdhaXRfbmV4dDogZnVuY3Rpb24gKHR5cGUpIHtcclxuICAgICAgICB0aGlzLmJ1dHRvbi5zdGF0ZSA9IHR5cGU7XHJcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ3YWl0X2N1dFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b24uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmJ1dHRvbl9mcmFtZV9hcnJbMF07XHJcbiAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5sYW5kX3N0YXRlID0gXCJ3YWl0X2N1dFwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJwbGFudFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b24uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmJ1dHRvbl9mcmFtZV9hcnJbMV07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIndhaXRfdGlsbFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b24uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmJ1dHRvbl9mcmFtZV9hcnJbMl07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLndhdGVyX3NjaGVkdWxlKTtcclxuICAgIH0sXHJcbiAgICAvL2N1dHRpbmdcclxuICAgIGN1dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5sYW5kX3N0YXRlICE9PSBcIndhaXRfY3V0XCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0ubGFuZF9zdGF0ZSA9IFwiY3V0aW5nXCI7XHJcbiAgICAgICAgdmFyIGxhbmRfc3RhdGUgPSB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5sYW5kX3N0YXRlXHJcbiAgICAgICAgdGhpcy5idXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIGN1dF90aW1lID0gY29uZmlnLnBsYW50W3RoaXMucGxhbnRfdHlwZV0uY3V0X3RpbWUgKiAoMSAtIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxbXCJzcGVlZF90aGVfY3V0XCJdIC8gMTAwKTtcclxuICAgICAgICB2YXIgbm93X3RpbWUgPSAwO1xyXG4gICAgICAgIHZhciBiYXIgPSB0aGlzLnBsYW50X3Byb2dyZXNzX25vZGUuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKTtcclxuICAgICAgICB0aGlzLmN1dF9zY2hlZHVsZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbm93X3RpbWUgKz0gMC4xO1xyXG4gICAgICAgICAgICBpZiAobm93X3RpbWUgPj0gY3V0X3RpbWUgJiYgbGFuZF9zdGF0ZSA9PSBcImN1dGluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICBub3dfdGltZSA9IDA7XHJcbiAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5sYW5kX3N0YXRlID0gXCJjdXRfb3ZlclwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiY3V0X292ZXJcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5jdXRfc2NoZWR1bGUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXN0X3BsYXRfYWxpdmVfc3RhZ2UoKTtcclxuICAgICAgICAgICAgICAgIHZhciBub2RlID0gdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9saWdodF9lZmZlY3QodGhpcy5ub2RlLCAxLCB0aGlzLnBsYW50X3R5cGUpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChub2RlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcImxpZ2h0XCIpLmluaV9ub2RlKHRoaXMucGxhbnRfdHlwZSwgdGhpcy5ub2RlKTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBiYXIucHJvZ3Jlc3MgPSBub3dfdGltZSAvIGN1dF90aW1lO1xyXG4gICAgICAgICAgICAgICAgdmFyIHByb2dyZXNzX251bSA9IHBhcnNlSW50KGJhci5wcm9ncmVzcyAqIDEwMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYW50X3Byb2dyZXNzX2xhYmVsLnN0cmluZyA9IFwiSGFydmVzdGluZyBcIiArIHByb2dyZXNzX251bSArIFwiJVwiO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLmN1dF9zY2hlZHVsZSwgMC4xKTtcclxuICAgIH0sXHJcbiAgICAvL+aMiemSruiiq+eCueWHu1xyXG4gICAgb25fYnV0dG9uX2NsaWNrOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5idXR0b24uc3RhdGUpIHtcclxuICAgICAgICAgICAgY2FzZSBcIndhaXRfY3V0XCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1dCgpO1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJoZWxsbyAxMjMgY3V0dFwiKTsgLy8gaGFydmVzdGluZ1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJwbGFudFwiOlxyXG4gICAgICAgICAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3BsYW50X3VpKHRoaXMuZ2FtZV9zY2VuZV9qcy5ub2RlKTtcclxuICAgICAgICAgICAgICAgIGlmIChub2RlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcInBsYW50X3VpXCIpLmluaV9ub2RlKHRoaXMubGFuZF9pbmRleCk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJoZWxsbyBwbGFudFwiKTsgLy8gY2hvb3NlIHBsYW50IFxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ3YWl0X3RpbGxcIjpcclxuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLmxhbmRfc3RhdGUgPSBcIndhaXRfdGlsbFwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aWxsKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImhlbGxvIDEyM1wiKTsgICAvLyBwbGFudGluZ1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvL+a1h+awtFxyXG4gICAgd2F0ZXJpbmc6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLndhdGVyX2J1ZmYgPSAyO1xyXG4gICAgICAgIHRoaXMud2F0ZXJfcHJvZ3Jlc3Nfbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHZhciBhbGxfd2F0ZXIgPSBjb25maWcuYWxsX3dhdGVyX251bTtcclxuICAgICAgICB2YXIgYmFyID0gdGhpcy53YXRlcl9wcm9ncmVzc19ub2RlLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0Jhcik7XHJcbiAgICAgICAgdGhpcy53YXRlcl9zY2hlZHVsZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLmxhbmRfc3RhdGUgPT0gXCJncm93XCIpIHtcclxuICAgICAgICAgICAgICAgIHZhciB3YXRlcl9udW0gPSB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS53YXRlcl9udW07XHJcbiAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS53YXRlcl9udW0gLT0gMC4xICogKDEgLSB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1wid2F0ZXJfc2F2aW5nXCJdIC8gMTAwKTtcclxuICAgICAgICAgICAgICAgIHdhdGVyX251bSA9IHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLndhdGVyX251bTtcclxuICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5oYXZlX3dhdGVyID09IDApIHdhdGVyX251bSA9IDA7XHJcbiAgICAgICAgICAgICAgICBpZiAod2F0ZXJfbnVtIDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy53YXRlcl9zY2hlZHVsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53YXRlcl9idWZmID0gMTtcclxuICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5oYXZlX3dhdGVyID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS53YXRlcl9udW0gPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLmhhdmVfd2F0ZXIgPSAwOyAgIC8vIGzGsHUgdHLhuqFuZyB0aMOhaSBjw7Mgbsaw4bubYyBoYXkgayBj4bunYSDDtCDEkeG6pXRcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImhlbGxvIFwiICsgdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0uaGF2ZV93YXRlcilcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5oYXZlX3dhdGVyID09IDApIGJhci5wcm9ncmVzcyA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBiYXIucHJvZ3Jlc3MgPSB3YXRlcl9udW0gLyBhbGxfd2F0ZXI7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMud2F0ZXJfc2NoZWR1bGUpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLndhdGVyX3NjaGVkdWxlLCAwLjEpO1xyXG4gICAgfSxcclxuICAgIHdhdGVyX2NoYXJnZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLndhdGVyX3N0YXRlID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMud2F0ZXJfc2NoZWR1bGUpO1xyXG4gICAgICAgICAgICB0aGlzLndhdGVyX3N0YXRlID0gXCJjaGFyZ2VcIjtcclxuICAgICAgICAgICAgdmFyIGFsbF93YXRlciA9IGNvbmZpZy5hbGxfd2F0ZXJfbnVtO1xyXG4gICAgICAgICAgICB2YXIgYmFyID0gdGhpcy53YXRlcl9wcm9ncmVzc19ub2RlLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0Jhcik7XHJcbiAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLmhhdmVfd2F0ZXIgPSAxO1xyXG4gICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbm93X3dhdGVyID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0ud2F0ZXJfbnVtXHJcbiAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS53YXRlcl9udW0gKz0gMTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobm93X3dhdGVyID49IGFsbF93YXRlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZShjYWxsYmFjayk7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0ud2F0ZXJfbnVtID0gYWxsX3dhdGVyO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2F0ZXJfc3RhdGUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5sYW5kX3N0YXRlID09IFwiY3V0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndhdGVyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgYmFyLnByb2dyZXNzID0gbm93X3dhdGVyIC8gYWxsX3dhdGVyO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlKGNhbGxiYWNrLCAwLjEpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy53YXRlcl9zdGF0ZSA9PSBcImNoYXJnZVwiKSB7XHJcbiAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLndhdGVyX251bSArPSAxMDtcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8v5Yid5aeL5YyW6IqC54K5XHJcbiAgICBpbmlfbm9kZTogZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sID0gY2MuZmluZChcInNvdW5kX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwic291bmRfY29udHJvbFwiKTtcclxuICAgICAgICB2YXIgaGF2ZSA9IHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFtpbmRleF0uaGF2ZTtcclxuICAgICAgICB0aGlzLmxhbmRfaW5kZXggPSBpbmRleDtcclxuICAgICAgICB0aGlzLnBsYW50X3R5cGUgPSB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5wbGFudF90eXBlO1xyXG4gICAgICAgIHZhciBsYW5kX3N0YXRlID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0ubGFuZF9zdGF0ZTtcclxuICAgICAgICB0aGlzLnBsYW50X2luZGV4ID0gMDsgLy/mpI3nianntKLlvJVcclxuICAgICAgICB0aGlzLnBsYW50X2NvdW50ID0gMDsgLy/nlJ/plb/nvJblj7dcclxuICAgICAgICB0aGlzLndhdGVyX2J1ZmYgPSAxOyAgLy8g5Yid5aeL5YyW5rC0YnVmZlxyXG4gICAgICAgIHRoaXMud2F0ZXJfc3RhdGUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMucGxhbnRfZnJhbWVfYXJyID0gW1xyXG4gICAgICAgICAgICB0aGlzLnBsYW50MF9mcmFtZV9hcnIsXHJcbiAgICAgICAgICAgIHRoaXMucGxhbnQxX2ZyYW1lX2FycixcclxuICAgICAgICAgICAgdGhpcy5wbGFudDJfZnJhbWVfYXJyLFxyXG4gICAgICAgICAgICB0aGlzLnBsYW50M19mcmFtZV9hcnIsXHJcbiAgICAgICAgICAgIHRoaXMucGxhbnQ0X2ZyYW1lX2FycixcclxuICAgICAgICAgICAgdGhpcy5wbGFudDVfZnJhbWVfYXJyLFxyXG4gICAgICAgICAgICB0aGlzLnBsYW50Nl9mcmFtZV9hcnIsXHJcbiAgICAgICAgICAgIHRoaXMucGxhbnQ3X2ZyYW1lX2FycixcclxuICAgICAgICBdO1xyXG4gICAgICAgIHN3aXRjaCAoaGF2ZSkge1xyXG4gICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpcHNfbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5sYW5kX2ZyYW1lX2FyclswXTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxhbnRfbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxhbnRfcHJvZ3Jlc3Nfbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMud2F0ZXJfcHJvZ3Jlc3Nfbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAvL3RpbGwgc3RhdGVcclxuICAgICAgICAgICAgICAgIHRoaXMudGlwc19ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChsYW5kX3N0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIndhaXRfdGlsbFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndhaXRfbmV4dChcIndhaXRfdGlsbFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGFudF9ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYW50X3Byb2dyZXNzX25vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud2F0ZXJfcHJvZ3Jlc3Nfbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmxhbmRfZnJhbWVfYXJyWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLndhaXRfbmV4dChcIndhaXRfdGlsbFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIndhaXRfcGxhbnRcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5sYW5kX2ZyYW1lX2FyclsxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGFudF9wcm9ncmVzc19ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud2F0ZXJfcHJvZ3Jlc3Nfbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB2YXIgYmFyID0gdGhpcy53YXRlcl9wcm9ncmVzc19ub2RlLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0Jhcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5oYXZlX3dhdGVyID09IDApIGJhci5wcm9ncmVzcyA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxhbnRfcHJvZ3Jlc3NfbGFiZWwuc3RyaW5nID0gXCJXYWl0aW5nIHRvIGJlIHBsYW50ZWRcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGFudF9ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndhaXRfbmV4dChcInBsYW50XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwid2FpdF9jdXRcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5sYW5kX2ZyYW1lX2FyclsxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGFudF9ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxhbnRfcHJvZ3Jlc3Nfbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndhdGVyX3Byb2dyZXNzX25vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdmFyIGJhciA9IHRoaXMud2F0ZXJfcHJvZ3Jlc3Nfbm9kZS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0uaGF2ZV93YXRlciA9PSAwKSBiYXIucHJvZ3Jlc3MgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYW50X3Byb2dyZXNzX2xhYmVsLnN0cmluZyA9IFwiV2FpdGluZyBmb3IgaGFydmVzdFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYW50X3Byb2dyZXNzX25vZGUuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKS5wcm9ncmVzcyA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wbGFudF9ub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYW50X25vZGUuY2hpbGRyZW5baV0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnBsYW50X2ZyYW1lX2Fyclt0aGlzLnBsYW50X3R5cGVdWzNdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndhaXRfbmV4dChcIndhaXRfY3V0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhsYW5kX3N0YXRlICsgXCIgaGVsbG9cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNhc2UgXCJ0aWxsaW5nXCI6ICAgICAvLyB0cuG6oW5nIHRow6FpIGNoxrBhIHRy4buTbmcgY8OieVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLnRpbGwoKTtcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldF9wbGFudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmxhbmRfZnJhbWVfYXJyWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjYy5sb2cobGFuZF9zdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICB9LFxyXG4gICAgLy/ogJXlnLBcclxuICAgIHRpbGw6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvL+WPquWFgeiuuOinpuWPkeS4gOasoVxyXG4gICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5sYW5kX3N0YXRlICE9PSBcInRpbGxpbmdcIikge1xyXG4gICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5sYW5kX3N0YXRlID0gXCJ0aWxsaW5nXCI7XHJcbiAgICAgICAgICAgIHZhciBsYW5kX3N0YXRlID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0ubGFuZF9zdGF0ZTtcclxuICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0uYWxpdmVfc3RhZ2UgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnBsYW50X2luZGV4ID0gMDtcclxuICAgICAgICAgICAgdGhpcy5wbGFudF9jb3VudCA9IDA7XHJcbiAgICAgICAgICAgIC8v5YGc5o6J5omA5pyJ55qE6K6h5pe25ZmoXHJcbiAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLndhdGVyX3NjaGVkdWxlKTtcclxuICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMucGxhbnRfZ3Jvd19zY2hlZHVsZSk7XHJcbiAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLmN1dF9zY2hlZHVsZSk7XHJcbiAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLnBsYW50X3NjaGVkdWxlKTtcclxuICAgICAgICAgICAgdGhpcy5wbGFudF9ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdmFyIHRpbGxfdGltZSA9IGNvbmZpZy50aWxsX3RpbWUgKiAoMSAtIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxbXCJ0b29sX2ltcHJvdmVcIl0gLyAxMDApO1xyXG4gICAgICAgICAgICB2YXIgYmFyID0gdGhpcy5wbGFudF9wcm9ncmVzc19ub2RlLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0Jhcik7XHJcbiAgICAgICAgICAgIHZhciBub3dfdGltZSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMucGxhbnRfcHJvZ3Jlc3Nfbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLndhdGVyX3Byb2dyZXNzX25vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5sYW5kX2ZyYW1lX2FyclswXTtcclxuICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgbm93X3RpbWUgKz0gMC4xO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5vd190aW1lID49IHRpbGxfdGltZSAmJiBsYW5kX3N0YXRlID09IFwidGlsbGluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGNjLmxvZyhcInRpbGwgb3ZlclwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUoY2FsbGJhY2spO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMubGFuZF9mcmFtZV9hcnJbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGFudF9wcm9ncmVzc19sYWJlbC5zdHJpbmcgPSBcIldhaXRpbmcgdG8gYmUgcGxhbnRlZFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2FpdF9uZXh0KFwicGxhbnRcIik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGJhci5wcm9ncmVzcyA9IG5vd190aW1lIC8gdGlsbF90aW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwcm9ncmVzc19udW0gPSBwYXJzZUludChiYXIucHJvZ3Jlc3MgKiAxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxhbnRfcHJvZ3Jlc3NfbGFiZWwuc3RyaW5nID0gXCJJbiB0aGUgZ3JvdW5kIFwiICsgcHJvZ3Jlc3NfbnVtICsgXCIlXCI7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlKGNhbGxiYWNrLCAwLjEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8v56eN5qSNXHJcbiAgICBwbGFudDogZnVuY3Rpb24gKHBsYW50X2luZGV4KSB7XHJcbiAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0ubGFuZF9zdGF0ZSA9IFwid2FpdF9wbGFudFwiO1xyXG4gICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLnBsYW50X3R5cGUgPSBwbGFudF9pbmRleDtcclxuICAgICAgICB0aGlzLnBsYW50X3R5cGUgPSBwbGFudF9pbmRleDtcclxuICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5hbGl2ZV9zdGFnZSA9IDA7XHJcbiAgICAgICAgdmFyIG5vd190aW1lID0gMDtcclxuICAgICAgICB2YXIgcGxhbnRfdGltZSA9IGNvbmZpZy5wbGFudFtwbGFudF9pbmRleF0ucGxhbnRfdGltZSAqICgxIC0gdXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbFtcInRvb2xfaW1wcm92ZVwiXSAvIDEwMCk7XHJcbiAgICAgICAgdmFyIGJhciA9IHRoaXMucGxhbnRfcHJvZ3Jlc3Nfbm9kZS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpO1xyXG4gICAgICAgIHRoaXMuYnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucGxhbnRfc2NoZWR1bGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIG5vd190aW1lICs9IDAuMTtcclxuICAgICAgICAgICAgaWYgKG5vd190aW1lID49IHBsYW50X3RpbWUpIHtcclxuICAgICAgICAgICAgICAgIGNjLmxvZyhcInBsYW50X292ZXJcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5wbGFudF9zY2hlZHVsZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldF9wbGFudCgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYmFyLnByb2dyZXNzID0gbm93X3RpbWUgLyBwbGFudF90aW1lO1xyXG4gICAgICAgICAgICAgICAgdmFyIHByb2dyZXNzX251bSA9IHBhcnNlSW50KGJhci5wcm9ncmVzcyAqIDEwMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYW50X3Byb2dyZXNzX2xhYmVsLnN0cmluZyA9IFwiUGxhbnRpbmcgXCIgKyBwcm9ncmVzc19udW0gKyBcIiVcIjtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5wbGFudF9zY2hlZHVsZSwgMC4xKTtcclxuICAgIH0sXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9zY2VuZVwiKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxyXG59KTtcclxuIl19