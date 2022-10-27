
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

            console.log("new land");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcbGFuZC5qcyJdLCJuYW1lcyI6WyJ1c2VyX2RhdGEiLCJyZXF1aXJlIiwiY29uZmlnIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJ0aXBzX25vZGUiLCJOb2RlIiwicGxhbnRfbm9kZSIsInBsYW50X3Byb2dyZXNzX25vZGUiLCJ3YXRlcl9wcm9ncmVzc19ub2RlIiwicGxhbnRfcHJvZ3Jlc3NfbGFiZWwiLCJMYWJlbCIsImJ1dHRvbiIsImJ1dHRvbl9mcmFtZV9hcnIiLCJTcHJpdGVGcmFtZSIsImxhbmRfZnJhbWVfYXJyIiwicGxhbnQwX2ZyYW1lX2FyciIsInBsYW50MV9mcmFtZV9hcnIiLCJwbGFudDJfZnJhbWVfYXJyIiwicGxhbnQzX2ZyYW1lX2FyciIsInBsYW50NF9mcmFtZV9hcnIiLCJwbGFudDVfZnJhbWVfYXJyIiwicGxhbnQ2X2ZyYW1lX2FyciIsInBsYW50N19mcmFtZV9hcnIiLCJzZXRfcGxhbnQiLCJhY3RpdmUiLCJhbGl2ZV9zdGFnZSIsImxhbmQiLCJsYW5kX2luZGV4IiwiaSIsImNoaWxkcmVuIiwibGVuZ3RoIiwiZ2V0Q29tcG9uZW50IiwiU3ByaXRlIiwic3ByaXRlRnJhbWUiLCJwbGFudF9mcmFtZV9hcnIiLCJwbGFudF90eXBlIiwicGxhbnRfZ3JvdyIsImxhbmRfc3RhdGUiLCJncm93X3RpbWUiLCJwbGFudCIsIm5vd190aW1lIiwiYmFyIiwiUHJvZ3Jlc3NCYXIiLCJ3YXRlcmluZyIsInBsYW50X2dyb3dfc2NoZWR1bGUiLCJ3YXRlcl9idWZmIiwidW5zY2hlZHVsZSIsInN0cmluZyIsIndhaXRfbmV4dCIsInByb2dyZXNzIiwicHJvZ3Jlc3NfbnVtIiwicGFyc2VJbnQiLCJ1cGRhdGVfcGxhbnRfYWxpdmVfc3RhZ2UiLCJzY2hlZHVsZSIsInBsYW50U3ByaXRlIiwicGxhbnRfaW5kZXgiLCJwbGFudF9jb3VudCIsInJlc3RfcGxhdF9hbGl2ZV9zdGFnZSIsIndhdGVyX3NjaGVkdWxlIiwidHlwZSIsInN0YXRlIiwiY3V0IiwiY3V0X3RpbWUiLCJza2lsbCIsImN1dF9zY2hlZHVsZSIsInNvdW5kX2NvbnRyb2wiLCJwbGF5X3NvdW5kX2VmZmVjdCIsIm5vZGUiLCJnYW1lX3NjZW5lX2pzIiwiY3JlYXRlX2xpZ2h0X2VmZmVjdCIsImluaV9ub2RlIiwib25fYnV0dG9uX2NsaWNrIiwiY3JlYXRlX3BsYW50X3VpIiwidGlsbCIsImFsbF93YXRlciIsImFsbF93YXRlcl9udW0iLCJ3YXRlcl9udW0iLCJoYXZlX3dhdGVyIiwid2F0ZXJfY2hhcmdlIiwid2F0ZXJfc3RhdGUiLCJjYWxsYmFjayIsIm5vd193YXRlciIsImluZGV4IiwiZmluZCIsImhhdmUiLCJjb25zb2xlIiwibG9nIiwicGxhbnRfc2NoZWR1bGUiLCJ0aWxsX3RpbWUiLCJwbGFudF90aW1lIiwib25Mb2FkIiwic3RhcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsU0FBUyxHQUFHQyxPQUFPLENBQUMsV0FBRCxDQUF2Qjs7QUFDQSxJQUFJQyxNQUFNLEdBQUdELE9BQU8sQ0FBQyxRQUFELENBQXBCO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBRSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUVMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsU0FBUyxFQUFFSixFQUFFLENBQUNLLElBRE47QUFFUkMsSUFBQUEsVUFBVSxFQUFFTixFQUFFLENBQUNLLElBRlA7QUFHUkUsSUFBQUEsbUJBQW1CLEVBQUVQLEVBQUUsQ0FBQ0ssSUFIaEI7QUFJUkcsSUFBQUEsbUJBQW1CLEVBQUVSLEVBQUUsQ0FBQ0ssSUFKaEI7QUFLUkksSUFBQUEsb0JBQW9CLEVBQUVULEVBQUUsQ0FBQ1UsS0FMakI7QUFNUkMsSUFBQUEsTUFBTSxFQUFFWCxFQUFFLENBQUNLLElBTkg7QUFPUk8sSUFBQUEsZ0JBQWdCLEVB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RSxDQUFDbUYsSUFBSCxDQUFRLFNBQVIsRUFBbUJwRCxZQUFuQixDQUFnQyxZQUFoQyxDQUFyQjtBQUNILEdBdllJO0FBeVlMNEQsRUFBQUEsS0F6WUssbUJBeVlHLENBQ1AsQ0ExWUksQ0E0WUw7O0FBNVlLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciB1c2VyX2RhdGEgPSByZXF1aXJlKFwidXNlcl9kYXRhXCIpO1xudmFyIGNvbmZpZyA9IHJlcXVpcmUoXCJjb25maWdcIik7XG5cbi8qbGFuZCBzdGF0ZSA6e1xuICAgIGN1dCA6XG4gICAgdGlsbDpcbiAgICB3YXRlcjpcbiAgICBwbGFudDpcbiAgICBncm93IDpcbn07Ki9cblxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHRpcHNfbm9kZTogY2MuTm9kZSxcbiAgICAgICAgcGxhbnRfbm9kZTogY2MuTm9kZSxcbiAgICAgICAgcGxhbnRfcHJvZ3Jlc3Nfbm9kZTogY2MuTm9kZSxcbiAgICAgICAgd2F0ZXJfcHJvZ3Jlc3Nfbm9kZTogY2MuTm9kZSxcbiAgICAgICAgcGxhbnRfcHJvZ3Jlc3NfbGFiZWw6IGNjLkxhYmVsLFxuICAgICAgICBidXR0b246IGNjLk5vZGUsXG4gICAgICAgIGJ1dHRvbl9mcmFtZV9hcnI6IFtjYy5TcHJpdGVGcmFtZV0sXG4gICAgICAgIGxhbmRfZnJhbWVfYXJyOiBbY2MuU3ByaXRlRnJhbWVdLFxuICAgICAgICBwbGFudDBfZnJhbWVfYXJyOiBbY2MuU3ByaXRlRnJhbWVdLFxuICAgICAgICBwbGFudDFfZnJhbWVfYXJyOiBbY2MuU3ByaXRlRnJhbWVdLFxuICAgICAgICBwbGFudDJfZnJhbWVfYXJyOiBbY2MuU3ByaXRlRnJhbWVdLFxuICAgICAgICBwbGFudDNfZnJhbWVfYXJyOiBbY2MuU3ByaXRlRnJhbWVdLFxuICAgICAgICBwbGFudDRfZnJhbWVfYXJyOiBbY2MuU3ByaXRlRnJhbWVdLFxuICAgICAgICBwbGFudDVfZnJhbWVfYXJyOiBbY2MuU3ByaXRlRnJhbWVdLFxuICAgICAgICBwbGFudDZfZnJhbWVfYXJyOiBbY2MuU3ByaXRlRnJhbWVdLFxuICAgICAgICBwbGFudDdfZnJhbWVfYXJyOiBbY2MuU3ByaXRlRnJhbWVdLFxuICAgIH0sXG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcblxuICAgIC8v6K6+572u56eN5qSN55qE5qSN54mpXG4gICAgc2V0X3BsYW50OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMucGxhbnRfbm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB2YXIgYWxpdmVfc3RhZ2UgPSB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5hbGl2ZV9zdGFnZTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBsYW50X25vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMucGxhbnRfbm9kZS5jaGlsZHJlbltpXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMucGxhbnRfZnJhbWVfYXJyW3RoaXMucGxhbnRfdHlwZV1bYWxpdmVfc3RhZ2VdO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnBsYW50X2dyb3coKTtcbiAgICB9LFxuICAgIC8v5qSN54mp55Sf6ZW/XG4gICAgcGxhbnRfZ3JvdzogZnVuY3Rpb24gKCkge1xuICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5sYW5kX3N0YXRlID0gXCJncm93XCI7IC8vIG5vdGUgdGjDrCBncm93aW5nIGNo4bqheSBxdcOhIDEwMCVcbiAgICAgICAgdmFyIGxhbmRfc3RhdGUgPSB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5sYW5kX3N0YXRlO1xuICAgICAgICB0aGlzLnBsYW50X3Byb2dyZXNzX25vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdmFyIGdyb3dfdGltZSA9IGNvbmZpZy5wbGFudFt0aGlzLnBsYW50X3R5cGVdLmdyb3dfdGltZTtcbiAgICAgICAgdmFyIG5vd190aW1lID0gMDtcbiAgICAgICAgdmFyIGJhciA9IHRoaXMucGxhbnRfcHJvZ3Jlc3Nfbm9kZS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpO1xuICAgICAgICB0aGlzLndhdGVyaW5nKCk7XG4gICAgICAgIHRoaXMucGxhbnRfZ3Jvd19zY2hlZHVsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIG5vd190aW1lICs9IDAuMSAqIHRoaXMud2F0ZXJfYnVmZjtcbiAgICAgICAgICAgIGlmIChub3dfdGltZSA+PSBncm93X3RpbWUgJiYgbGFuZF9zdGF0ZSA9PSBcImdyb3dcIikge1xuICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLnBsYW50X2dyb3dfc2NoZWR1bGUpO1xuICAgICAgICAgICAgICAgIHRoaXMucGxhbnRfcHJvZ3Jlc3NfbGFiZWwuc3RyaW5nID0gXCJXYWl0aW5nIGZvciBoYXJ2ZXN0XCI7XG4gICAgICAgICAgICAgICAgdGhpcy53YWl0X25leHQoXCJ3YWl0X2N1dFwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGJhci5wcm9ncmVzcyA9IG5vd190aW1lIC8gZ3Jvd190aW1lO1xuICAgICAgICAgICAgICAgIHZhciBwcm9ncmVzc19udW0gPSBwYXJzZUludChiYXIucHJvZ3Jlc3MgKiAxMDApO1xuICAgICAgICAgICAgICAgIHRoaXMucGxhbnRfcHJvZ3Jlc3NfbGFiZWwuc3RyaW5nID0gXCJHcm93aW5nIFwiICsgcHJvZ3Jlc3NfbnVtICsgXCIlXCI7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVfcGxhbnRfYWxpdmVfc3RhZ2UocHJvZ3Jlc3NfbnVtKTtcbiAgICAgICAgICAgICAgICBpZiAocHJvZ3Jlc3NfbnVtIDwgMjUpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBsYW50X25vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxhbnRfbm9kZS5jaGlsZHJlbltpXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMucGxhbnRfZnJhbWVfYXJyW3RoaXMucGxhbnRfdHlwZV1bMF07XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHByb2dyZXNzX251bSA8IDUwKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wbGFudF9ub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYW50X25vZGUuY2hpbGRyZW5baV0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnBsYW50X2ZyYW1lX2Fyclt0aGlzLnBsYW50X3R5cGVdWzFdO1xuXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHByb2dyZXNzX251bSA8IDc1KSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wbGFudF9ub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYW50X25vZGUuY2hpbGRyZW5baV0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnBsYW50X2ZyYW1lX2Fyclt0aGlzLnBsYW50X3R5cGVdWzJdO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wbGFudF9ub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxhbnRfbm9kZS5jaGlsZHJlbltpXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMucGxhbnRfZnJhbWVfYXJyW3RoaXMucGxhbnRfdHlwZV1bM107XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5wbGFudF9ncm93X3NjaGVkdWxlLCAwLjEpO1xuICAgIH0sXG4gICAgLy/mm7TmlrDmpI3niannrYnnuqdcbiAgICB1cGRhdGVfcGxhbnRfYWxpdmVfc3RhZ2U6IGZ1bmN0aW9uIChwcm9ncmVzc19udW0pIHtcbiAgICAgICAgLy8y55qE5YCN5pWwXG4gICAgICAgIHZhciBhbGl2ZV9zdGFnZSA9IHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLmFsaXZlX3N0YWdlO1xuICAgICAgICBsZXQgcGxhbnRTcHJpdGUgPSB0aGlzLnBsYW50X25vZGUuY2hpbGRyZW5bdGhpcy5wbGFudF9pbmRleF0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU7XG4gICAgICAgIGlmIChwbGFudFNwcml0ZSkge1xuICAgICAgICAgICAgcGxhbnRTcHJpdGUgPSB0aGlzLnBsYW50X2ZyYW1lX2Fyclt0aGlzLnBsYW50X3R5cGVdW2FsaXZlX3N0YWdlXTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHByb2dyZXNzX251bSA+PSAyNSAvIDEyICogdGhpcy5wbGFudF9jb3VudCkge1xuICAgICAgICAgICAgdGhpcy5wbGFudF9pbmRleCsrO1xuICAgICAgICAgICAgdGhpcy5wbGFudF9jb3VudCsrO1xuICAgICAgICAgICAgaWYgKHRoaXMucGxhbnRfY291bnQgPiA0OCkge1xuICAgICAgICAgICAgICAgIHRoaXMucGxhbnRfY291bnQgPSA0ODtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAodGhpcy5wbGFudF9pbmRleCA+IDExKSB7XG4gICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0uYWxpdmVfc3RhZ2UrKztcbiAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0uYWxpdmVfc3RhZ2UgPiAzKSB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLmFsaXZlX3N0YWdlID0gMztcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRoaXMucGxhbnRfaW5kZXggPSAwO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIC8v6YeN572u5qSN54mp55qE55Sf6ZW/54q25oCBXG4gICAgcmVzdF9wbGF0X2FsaXZlX3N0YWdlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLmFsaXZlX3N0YWdlID0gMDtcbiAgICAgICAgdGhpcy5wbGFudF9pbmRleCA9IDA7XG4gICAgICAgIHRoaXMucGxhbnRfY291bnQgPSAwO1xuICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy53YXRlcl9zY2hlZHVsZSk7XG4gICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLnBsYW50X2dyb3dfc2NoZWR1bGUpO1xuICAgICAgICB0aGlzLnNldF9wbGFudCgpO1xuICAgIH0sXG4gICAgLy/EkeG7o2kgdHLhuqFuZyB0aMOhaSB0aeG6v3AgdGhlb1xuICAgIHdhaXRfbmV4dDogZnVuY3Rpb24gKHR5cGUpIHtcbiAgICAgICAgdGhpcy5idXR0b24uc3RhdGUgPSB0eXBlO1xuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJ3YWl0X2N1dFwiOlxuICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5idXR0b25fZnJhbWVfYXJyWzBdO1xuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLmxhbmRfc3RhdGUgPSBcIndhaXRfY3V0XCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwicGxhbnRcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbi5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuYnV0dG9uX2ZyYW1lX2FyclsxXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJ3YWl0X3RpbGxcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbi5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuYnV0dG9uX2ZyYW1lX2FyclsyXTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmJ1dHRvbi5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy53YXRlcl9zY2hlZHVsZSk7XG4gICAgfSxcbiAgICAvL2N1dHRpbmdcbiAgICBjdXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLmxhbmRfc3RhdGUgIT09IFwid2FpdF9jdXRcIikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9O1xuICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5sYW5kX3N0YXRlID0gXCJjdXRpbmdcIjtcbiAgICAgICAgdmFyIGxhbmRfc3RhdGUgPSB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5sYW5kX3N0YXRlXG4gICAgICAgIHRoaXMuYnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB2YXIgY3V0X3RpbWUgPSBjb25maWcucGxhbnRbdGhpcy5wbGFudF90eXBlXS5jdXRfdGltZSAqICgxIC0gdXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbFtcInNwZWVkX3RoZV9jdXRcIl0gLyAxMDApO1xuICAgICAgICB2YXIgbm93X3RpbWUgPSAwO1xuICAgICAgICB2YXIgYmFyID0gdGhpcy5wbGFudF9wcm9ncmVzc19ub2RlLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0Jhcik7XG4gICAgICAgIHRoaXMuY3V0X3NjaGVkdWxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbm93X3RpbWUgKz0gMC4xO1xuICAgICAgICAgICAgaWYgKG5vd190aW1lID49IGN1dF90aW1lICYmIGxhbmRfc3RhdGUgPT0gXCJjdXRpbmdcIikge1xuICAgICAgICAgICAgICAgIG5vd190aW1lID0gMDtcbiAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5sYW5kX3N0YXRlID0gXCJjdXRfb3ZlclwiO1xuICAgICAgICAgICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImN1dF9vdmVyXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLmN1dF9zY2hlZHVsZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXN0X3BsYXRfYWxpdmVfc3RhZ2UoKTtcbiAgICAgICAgICAgICAgICB2YXIgbm9kZSA9IHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfbGlnaHRfZWZmZWN0KHRoaXMubm9kZSwgMSwgdGhpcy5wbGFudF90eXBlKTtcblxuICAgICAgICAgICAgICAgIGlmIChub2RlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJsaWdodFwiKS5pbmlfbm9kZSh0aGlzLnBsYW50X3R5cGUsIHRoaXMubm9kZSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGJhci5wcm9ncmVzcyA9IG5vd190aW1lIC8gY3V0X3RpbWU7XG4gICAgICAgICAgICAgICAgdmFyIHByb2dyZXNzX251bSA9IHBhcnNlSW50KGJhci5wcm9ncmVzcyAqIDEwMCk7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGFudF9wcm9ncmVzc19sYWJlbC5zdHJpbmcgPSBcIkhhcnZlc3RpbmcgXCIgKyBwcm9ncmVzc19udW0gKyBcIiVcIjtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5jdXRfc2NoZWR1bGUsIDAuMSk7XG4gICAgfSxcbiAgICAvL+aMiemSruiiq+eCueWHu1xuICAgIG9uX2J1dHRvbl9jbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fY2xpY2tcIik7XG4gICAgICAgIHN3aXRjaCAodGhpcy5idXR0b24uc3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJ3YWl0X2N1dFwiOlxuICAgICAgICAgICAgICAgIHRoaXMuY3V0KCk7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJoZWxsbyAxMjMgY3V0dFwiKTsgLy8gaGFydmVzdGluZ1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInBsYW50XCI6XG4gICAgICAgICAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3BsYW50X3VpKHRoaXMuZ2FtZV9zY2VuZV9qcy5ub2RlKTtcbiAgICAgICAgICAgICAgICBpZiAobm9kZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwicGxhbnRfdWlcIikuaW5pX25vZGUodGhpcy5sYW5kX2luZGV4KTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiaGVsbG8gcGxhbnRcIik7IC8vIGNob29zZSBwbGFudCBcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJ3YWl0X3RpbGxcIjpcbiAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5sYW5kX3N0YXRlID0gXCJ3YWl0X3RpbGxcIjtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbGwoKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImhlbGxvIDEyM1wiKTsgICAvLyBwbGFudGluZ1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvL+a1h+awtFxuICAgIHdhdGVyaW5nOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMud2F0ZXJfYnVmZiA9IDI7XG4gICAgICAgIHRoaXMud2F0ZXJfcHJvZ3Jlc3Nfbm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB2YXIgYWxsX3dhdGVyID0gY29uZmlnLmFsbF93YXRlcl9udW07XG4gICAgICAgIHZhciBiYXIgPSB0aGlzLndhdGVyX3Byb2dyZXNzX25vZGUuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKTtcbiAgICAgICAgdGhpcy53YXRlcl9zY2hlZHVsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5sYW5kX3N0YXRlID09IFwiZ3Jvd1wiKSB7XG4gICAgICAgICAgICAgICAgdmFyIHdhdGVyX251bSA9IHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLndhdGVyX251bTtcbiAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS53YXRlcl9udW0gLT0gMC4xICogKDEgLSB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1wid2F0ZXJfc2F2aW5nXCJdIC8gMTAwKTtcbiAgICAgICAgICAgICAgICB3YXRlcl9udW0gPSB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS53YXRlcl9udW07XG4gICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLmhhdmVfd2F0ZXIgPT0gMCkgd2F0ZXJfbnVtID0gMDtcbiAgICAgICAgICAgICAgICBpZiAod2F0ZXJfbnVtIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMud2F0ZXJfc2NoZWR1bGUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLndhdGVyX2J1ZmYgPSAxO1xuICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5oYXZlX3dhdGVyID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0ud2F0ZXJfbnVtID0gMDtcbiAgICAgICAgICAgICAgICAgICAgLy8gdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0uaGF2ZV93YXRlciA9IDA7ICAgLy8gbMawdSB0cuG6oW5nIHRow6FpIGPDsyBuxrDhu5tjIGhheSBrIGPhu6dhIMO0IMSR4bqldFxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImhlbGxvIFwiICsgdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0uaGF2ZV93YXRlcilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5oYXZlX3dhdGVyID09IDApIGJhci5wcm9ncmVzcyA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgYmFyLnByb2dyZXNzID0gd2F0ZXJfbnVtIC8gYWxsX3dhdGVyO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLndhdGVyX3NjaGVkdWxlKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMud2F0ZXJfc2NoZWR1bGUsIDAuMSk7XG4gICAgfSxcbiAgICB3YXRlcl9jaGFyZ2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMud2F0ZXJfc3RhdGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMud2F0ZXJfc2NoZWR1bGUpO1xuICAgICAgICAgICAgdGhpcy53YXRlcl9zdGF0ZSA9IFwiY2hhcmdlXCI7XG4gICAgICAgICAgICB2YXIgYWxsX3dhdGVyID0gY29uZmlnLmFsbF93YXRlcl9udW07XG4gICAgICAgICAgICB2YXIgYmFyID0gdGhpcy53YXRlcl9wcm9ncmVzc19ub2RlLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0Jhcik7XG4gICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5oYXZlX3dhdGVyID0gMTtcbiAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgbm93X3dhdGVyID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0ud2F0ZXJfbnVtXG4gICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0ud2F0ZXJfbnVtICs9IDE7XG5cbiAgICAgICAgICAgICAgICBpZiAobm93X3dhdGVyID49IGFsbF93YXRlcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUoY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS53YXRlcl9udW0gPSBhbGxfd2F0ZXI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2F0ZXJfc3RhdGUgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0ubGFuZF9zdGF0ZSA9PSBcImN1dFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53YXRlcmluZygpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBiYXIucHJvZ3Jlc3MgPSBub3dfd2F0ZXIgLyBhbGxfd2F0ZXI7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZShjYWxsYmFjaywgMC4xKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLndhdGVyX3N0YXRlID09IFwiY2hhcmdlXCIpIHtcbiAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLndhdGVyX251bSArPSAxMDtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIC8v5Yid5aeL5YyW6IqC54K5XG4gICAgaW5pX25vZGU6IGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wgPSBjYy5maW5kKFwic291bmRfY29udHJvbFwiKS5nZXRDb21wb25lbnQoXCJzb3VuZF9jb250cm9sXCIpO1xuICAgICAgICB2YXIgaGF2ZSA9IHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFtpbmRleF0uaGF2ZTtcbiAgICAgICAgdGhpcy5sYW5kX2luZGV4ID0gaW5kZXg7XG4gICAgICAgIHRoaXMucGxhbnRfdHlwZSA9IHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLnBsYW50X3R5cGU7XG4gICAgICAgIHZhciBsYW5kX3N0YXRlID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0ubGFuZF9zdGF0ZTtcbiAgICAgICAgdGhpcy5wbGFudF9pbmRleCA9IDA7IC8v5qSN54mp57Si5byVXG4gICAgICAgIHRoaXMucGxhbnRfY291bnQgPSAwOyAvL+eUn+mVv+e8luWPt1xuICAgICAgICB0aGlzLndhdGVyX2J1ZmYgPSAxOyAgLy8g5Yid5aeL5YyW5rC0YnVmZlxuICAgICAgICB0aGlzLndhdGVyX3N0YXRlID0gbnVsbDtcbiAgICAgICAgdGhpcy5wbGFudF9mcmFtZV9hcnIgPSBbXG4gICAgICAgICAgICB0aGlzLnBsYW50MF9mcmFtZV9hcnIsXG4gICAgICAgICAgICB0aGlzLnBsYW50MV9mcmFtZV9hcnIsXG4gICAgICAgICAgICB0aGlzLnBsYW50Ml9mcmFtZV9hcnIsXG4gICAgICAgICAgICB0aGlzLnBsYW50M19mcmFtZV9hcnIsXG4gICAgICAgICAgICB0aGlzLnBsYW50NF9mcmFtZV9hcnIsXG4gICAgICAgICAgICB0aGlzLnBsYW50NV9mcmFtZV9hcnIsXG4gICAgICAgICAgICB0aGlzLnBsYW50Nl9mcmFtZV9hcnIsXG4gICAgICAgICAgICB0aGlzLnBsYW50N19mcmFtZV9hcnIsXG4gICAgICAgIF07XG4gICAgICAgIHN3aXRjaCAoaGF2ZSkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHRoaXMudGlwc19ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5sYW5kX2ZyYW1lX2FyclswXTtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYW50X25vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGFudF9wcm9ncmVzc19ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMud2F0ZXJfcHJvZ3Jlc3Nfbm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAvL3RpbGwgc3RhdGVcbiAgICAgICAgICAgICAgICB0aGlzLnRpcHNfbm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGxhbmRfc3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIndhaXRfdGlsbFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53YWl0X25leHQoXCJ3YWl0X3RpbGxcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYW50X25vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYW50X3Byb2dyZXNzX25vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndhdGVyX3Byb2dyZXNzX25vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMubGFuZF9mcmFtZV9hcnJbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLndhaXRfbmV4dChcIndhaXRfdGlsbFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwid2FpdF9wbGFudFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5sYW5kX2ZyYW1lX2FyclsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxhbnRfcHJvZ3Jlc3Nfbm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53YXRlcl9wcm9ncmVzc19ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB2YXIgYmFyID0gdGhpcy53YXRlcl9wcm9ncmVzc19ub2RlLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0Jhcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0uaGF2ZV93YXRlciA9PSAwKSBiYXIucHJvZ3Jlc3MgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGFudF9wcm9ncmVzc19sYWJlbC5zdHJpbmcgPSBcIldhaXRpbmcgdG8gYmUgcGxhbnRlZFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGFudF9ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53YWl0X25leHQoXCJwbGFudFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwid2FpdF9jdXRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMubGFuZF9mcmFtZV9hcnJbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYW50X25vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxhbnRfcHJvZ3Jlc3Nfbm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53YXRlcl9wcm9ncmVzc19ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB2YXIgYmFyID0gdGhpcy53YXRlcl9wcm9ncmVzc19ub2RlLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0Jhcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0uaGF2ZV93YXRlciA9PSAwKSBiYXIucHJvZ3Jlc3MgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGFudF9wcm9ncmVzc19sYWJlbC5zdHJpbmcgPSBcIldhaXRpbmcgZm9yIGhhcnZlc3RcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxhbnRfcHJvZ3Jlc3Nfbm9kZS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpLnByb2dyZXNzID0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wbGFudF9ub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGFudF9ub2RlLmNoaWxkcmVuW2ldLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5wbGFudF9mcmFtZV9hcnJbdGhpcy5wbGFudF90eXBlXVszXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndhaXRfbmV4dChcIndhaXRfY3V0XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cobGFuZF9zdGF0ZSArIFwiIGhlbGxvXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNhc2UgXCJ0aWxsaW5nXCI6ICAgICAvLyB0cuG6oW5nIHRow6FpIGNoxrBhIHRy4buTbmcgY8OieVxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy50aWxsKCk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldF9wbGFudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5sYW5kX2ZyYW1lX2FyclsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNjLmxvZyhsYW5kX3N0YXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibmV3IGxhbmRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9O1xuXG4gICAgfSxcbiAgICAvL+iAleWcsFxuICAgIHRpbGw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy/lj6rlhYHorrjop6blj5HkuIDmrKFcbiAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLmxhbmRfc3RhdGUgIT09IFwidGlsbGluZ1wiKSB7XG4gICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5sYW5kX3N0YXRlID0gXCJ0aWxsaW5nXCI7XG4gICAgICAgICAgICB2YXIgbGFuZF9zdGF0ZSA9IHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLmxhbmRfc3RhdGU7XG4gICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5hbGl2ZV9zdGFnZSA9IDA7XG4gICAgICAgICAgICB0aGlzLnBsYW50X2luZGV4ID0gMDtcbiAgICAgICAgICAgIHRoaXMucGxhbnRfY291bnQgPSAwO1xuICAgICAgICAgICAgLy/lgZzmjonmiYDmnInnmoTorqHml7blmahcbiAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLndhdGVyX3NjaGVkdWxlKTtcbiAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLnBsYW50X2dyb3dfc2NoZWR1bGUpO1xuICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMuY3V0X3NjaGVkdWxlKTtcbiAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLnBsYW50X3NjaGVkdWxlKTtcbiAgICAgICAgICAgIHRoaXMucGxhbnRfbm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdmFyIHRpbGxfdGltZSA9IGNvbmZpZy50aWxsX3RpbWUgKiAoMSAtIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxbXCJ0b29sX2ltcHJvdmVcIl0gLyAxMDApO1xuICAgICAgICAgICAgdmFyIGJhciA9IHRoaXMucGxhbnRfcHJvZ3Jlc3Nfbm9kZS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpO1xuICAgICAgICAgICAgdmFyIG5vd190aW1lID0gMDtcbiAgICAgICAgICAgIHRoaXMucGxhbnRfcHJvZ3Jlc3Nfbm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy53YXRlcl9wcm9ncmVzc19ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmxhbmRfZnJhbWVfYXJyWzBdO1xuICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIG5vd190aW1lICs9IDAuMTtcbiAgICAgICAgICAgICAgICBpZiAobm93X3RpbWUgPj0gdGlsbF90aW1lICYmIGxhbmRfc3RhdGUgPT0gXCJ0aWxsaW5nXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGNjLmxvZyhcInRpbGwgb3ZlclwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5sYW5kX2ZyYW1lX2FyclsxXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGFudF9wcm9ncmVzc19sYWJlbC5zdHJpbmcgPSBcIldhaXRpbmcgdG8gYmUgcGxhbnRlZFwiO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLndhaXRfbmV4dChcInBsYW50XCIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGJhci5wcm9ncmVzcyA9IG5vd190aW1lIC8gdGlsbF90aW1lO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcHJvZ3Jlc3NfbnVtID0gcGFyc2VJbnQoYmFyLnByb2dyZXNzICogMTAwKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGFudF9wcm9ncmVzc19sYWJlbC5zdHJpbmcgPSBcIkluIHRoZSBncm91bmQgXCIgKyBwcm9ncmVzc19udW0gKyBcIiVcIjtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUoY2FsbGJhY2ssIDAuMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvL+enjeakjVxuICAgIHBsYW50OiBmdW5jdGlvbiAocGxhbnRfaW5kZXgpIHtcbiAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0ubGFuZF9zdGF0ZSA9IFwid2FpdF9wbGFudFwiO1xuICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5wbGFudF90eXBlID0gcGxhbnRfaW5kZXg7XG4gICAgICAgIHRoaXMucGxhbnRfdHlwZSA9IHBsYW50X2luZGV4O1xuICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5hbGl2ZV9zdGFnZSA9IDA7XG4gICAgICAgIHZhciBub3dfdGltZSA9IDA7XG4gICAgICAgIHZhciBwbGFudF90aW1lID0gY29uZmlnLnBsYW50W3BsYW50X2luZGV4XS5wbGFudF90aW1lICogKDEgLSB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1widG9vbF9pbXByb3ZlXCJdIC8gMTAwKTtcbiAgICAgICAgdmFyIGJhciA9IHRoaXMucGxhbnRfcHJvZ3Jlc3Nfbm9kZS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpO1xuICAgICAgICB0aGlzLmJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5wbGFudF9zY2hlZHVsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIG5vd190aW1lICs9IDAuMTtcbiAgICAgICAgICAgIGlmIChub3dfdGltZSA+PSBwbGFudF90aW1lKSB7XG4gICAgICAgICAgICAgICAgY2MubG9nKFwicGxhbnRfb3ZlclwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5wbGFudF9zY2hlZHVsZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRfcGxhbnQoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYmFyLnByb2dyZXNzID0gbm93X3RpbWUgLyBwbGFudF90aW1lO1xuICAgICAgICAgICAgICAgIHZhciBwcm9ncmVzc19udW0gPSBwYXJzZUludChiYXIucHJvZ3Jlc3MgKiAxMDApO1xuICAgICAgICAgICAgICAgIHRoaXMucGxhbnRfcHJvZ3Jlc3NfbGFiZWwuc3RyaW5nID0gXCJQbGFudGluZyBcIiArIHByb2dyZXNzX251bSArIFwiJVwiO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLnBsYW50X3NjaGVkdWxlLCAwLjEpO1xuICAgIH0sXG4gICAgb25Mb2FkKCkge1xuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJnYW1lX3NjZW5lXCIpO1xuICAgIH0sXG5cbiAgICBzdGFydCgpIHtcbiAgICB9LFxuXG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTtcbiJdfQ==