
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
        this.cut();
        break;

      case "plant":
        var node = this.game_scene_js.create_plant_ui(this.game_scene_js.node);

        if (node != null) {
          node.getComponent("plant_ui").ini_node(this.land_index);
        }

        ;
        break;

      case "wait_till":
        user_data.user_data.land[this.land_index].land_state = "wait_till";
        this.till();
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
        var water_num = user_data.user_data.land[this.land_index].water_num; // if (user_data.user_data.land[this.land_index].have_water == 0) water_num = 0;//ktra xem ô đất còn nước k

        user_data.user_data.land[this.land_index].water_num -= 0.1 * (1 - user_data.user_data.skill["water_saving"] / 100);
        water_num = user_data.user_data.land[this.land_index].water_num;

        if (water_num <= 0) {
          this.unschedule(this.water_schedule);
          this.water_buff = 1;
          user_data.user_data.land[this.land_index].water_num = 0; // user_data.user_data.land[this.land_index].have_water = 0;   // lưu trạng thái có nước hay k của ô đất
          // console.log("hello " + user_data.user_data.land[this.land_index].have_water)

          return;
        } else {
          bar.progress = water_num / all_water;
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

      var callback = function callback() {
        var now_water = user_data.user_data.land[this.land_index].water_num;
        user_data.user_data.land[this.land_index].water_num += 1;
        user_data.user_data.land[this.land_index].have_water = 1;

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
            this.plant_node.active = false;
            this.plant_progress_node.active = false;
            this.water_progress_node.active = false;
            this.node.getComponent(cc.Sprite).spriteFrame = this.land_frame_arr[0];
            this.wait_next("wait_till");
            break;

          case "wait_plant":
            this.node.getComponent(cc.Sprite).spriteFrame = this.land_frame_arr[1];
            this.plant_progress_node.active = true;
            this.water_progress_node.active = true; // var bar = this.water_progress_node.getComponent(cc.ProgressBar);
            // if (user_data.user_data.land[this.land_index].have_water == 0) bar.progress = 0;

            this.plant_progress_label.string = "Waiting to be planted";
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
            this.wait_next("wait_cut");
            break;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcbGFuZC5qcyJdLCJuYW1lcyI6WyJ1c2VyX2RhdGEiLCJyZXF1aXJlIiwiY29uZmlnIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJ0aXBzX25vZGUiLCJOb2RlIiwicGxhbnRfbm9kZSIsInBsYW50X3Byb2dyZXNzX25vZGUiLCJ3YXRlcl9wcm9ncmVzc19ub2RlIiwicGxhbnRfcHJvZ3Jlc3NfbGFiZWwiLCJMYWJlbCIsImJ1dHRvbiIsImJ1dHRvbl9mcmFtZV9hcnIiLCJTcHJpdGVGcmFtZSIsImxhbmRfZnJhbWVfYXJyIiwicGxhbnQwX2ZyYW1lX2FyciIsInBsYW50MV9mcmFtZV9hcnIiLCJwbGFudDJfZnJhbWVfYXJyIiwicGxhbnQzX2ZyYW1lX2FyciIsInBsYW50NF9mcmFtZV9hcnIiLCJwbGFudDVfZnJhbWVfYXJyIiwicGxhbnQ2X2ZyYW1lX2FyciIsInBsYW50N19mcmFtZV9hcnIiLCJzZXRfcGxhbnQiLCJhY3RpdmUiLCJhbGl2ZV9zdGFnZSIsImxhbmQiLCJsYW5kX2luZGV4IiwiaSIsImNoaWxkcmVuIiwibGVuZ3RoIiwiZ2V0Q29tcG9uZW50IiwiU3ByaXRlIiwic3ByaXRlRnJhbWUiLCJwbGFudF9mcmFtZV9hcnIiLCJwbGFudF90eXBlIiwicGxhbnRfZ3JvdyIsImxhbmRfc3RhdGUiLCJncm93X3RpbWUiLCJwbGFudCIsIm5vd190aW1lIiwiYmFyIiwiUHJvZ3Jlc3NCYXIiLCJ3YXRlcmluZyIsInBsYW50X2dyb3dfc2NoZWR1bGUiLCJ3YXRlcl9idWZmIiwidW5zY2hlZHVsZSIsInN0cmluZyIsIndhaXRfbmV4dCIsInByb2dyZXNzIiwicHJvZ3Jlc3NfbnVtIiwicGFyc2VJbnQiLCJ1cGRhdGVfcGxhbnRfYWxpdmVfc3RhZ2UiLCJzY2hlZHVsZSIsInBsYW50U3ByaXRlIiwicGxhbnRfaW5kZXgiLCJwbGFudF9jb3VudCIsInJlc3RfcGxhdF9hbGl2ZV9zdGFnZSIsIndhdGVyX3NjaGVkdWxlIiwidHlwZSIsInN0YXRlIiwiY3V0IiwiY3V0X3RpbWUiLCJza2lsbCIsImN1dF9zY2hlZHVsZSIsInNvdW5kX2NvbnRyb2wiLCJwbGF5X3NvdW5kX2VmZmVjdCIsIm5vZGUiLCJnYW1lX3NjZW5lX2pzIiwiY3JlYXRlX2xpZ2h0X2VmZmVjdCIsImluaV9ub2RlIiwib25fYnV0dG9uX2NsaWNrIiwiY3JlYXRlX3BsYW50X3VpIiwidGlsbCIsImFsbF93YXRlciIsImFsbF93YXRlcl9udW0iLCJ3YXRlcl9udW0iLCJ3YXRlcl9jaGFyZ2UiLCJ3YXRlcl9zdGF0ZSIsImNhbGxiYWNrIiwibm93X3dhdGVyIiwiaGF2ZV93YXRlciIsImluZGV4IiwiZmluZCIsImhhdmUiLCJwbGFudF9zY2hlZHVsZSIsInRpbGxfdGltZSIsInBsYW50X3RpbWUiLCJsb2ciLCJvbkxvYWQiLCJzdGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxTQUFTLEdBQUdDLE9BQU8sQ0FBQyxXQUFELENBQXZCOztBQUNBLElBQUlDLE1BQU0sR0FBR0QsT0FBTyxDQUFDLFFBQUQsQ0FBcEI7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUFFLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBRUxDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxTQUFTLEVBQUVKLEVBQUUsQ0FBQ0ssSUFETjtBQUVSQyxJQUFBQSxVQUFVLEVBQUVOLEVBQUUsQ0FBQ0ssSUFGUDtBQUdSRSxJQUFBQSxtQkFBbUIsRUFBRVAsRUFBRSxDQUFDSyxJQUhoQjtBQUlSRyxJQUFBQSxtQkFBbUIsRUFBRVIsRUFBRSxDQUFDSyxJQUpoQjtBQUtSSSxJQUFBQSxvQkFBb0IsRUFBRVQsRUFBRSxDQUFDVSxLQUxqQjtBQU1SQyxJQUFBQSxNQUFNLEVBQUVYLEVBQUUsQ0FBQ0ssSUFOSDtBQU9STyxJQUFBQSxnQkFBZ0IsRUFBRSxDQUFDWixF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SStDLFVBQWhCLEVBQTRCO0FBQ3hCdkYsUUFBQUEsRUFBRSxDQUFDd0YsR0FBSCxDQUFPLFlBQVA7QUFDQSxhQUFLMUMsVUFBTCxDQUFnQixLQUFLdUMsY0FBckI7QUFDQSxhQUFLOUQsU0FBTDtBQUNILE9BSkQsTUFJTztBQUNIa0IsUUFBQUEsR0FBRyxDQUFDUSxRQUFKLEdBQWVULFFBQVEsR0FBRytDLFVBQTFCO0FBQ0EsWUFBSXJDLFlBQVksR0FBR0MsUUFBUSxDQUFDVixHQUFHLENBQUNRLFFBQUosR0FBZSxHQUFoQixDQUEzQjtBQUNBLGFBQUt4QyxvQkFBTCxDQUEwQnNDLE1BQTFCLEdBQW1DLGNBQWNHLFlBQWQsR0FBNkIsR0FBaEU7QUFDSDs7QUFBQTtBQUNKLEtBWEQ7O0FBWUEsU0FBS0csUUFBTCxDQUFjLEtBQUtnQyxjQUFuQixFQUFtQyxHQUFuQztBQUNILEdBeFhJO0FBeVhMSSxFQUFBQSxNQXpYSyxvQkF5WEk7QUFDTCxTQUFLckIsYUFBTCxHQUFxQnBFLEVBQUUsQ0FBQ21GLElBQUgsQ0FBUSxTQUFSLEVBQW1CcEQsWUFBbkIsQ0FBZ0MsWUFBaEMsQ0FBckI7QUFFSCxHQTVYSTtBQThYTDJELEVBQUFBLEtBOVhLLG1CQThYRyxDQUNQLENBL1hJLENBaVlMOztBQWpZSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgdXNlcl9kYXRhID0gcmVxdWlyZShcInVzZXJfZGF0YVwiKTtcbnZhciBjb25maWcgPSByZXF1aXJlKFwiY29uZmlnXCIpO1xuXG4vKmxhbmQgc3RhdGUgOntcbiAgICBjdXQgOlxuICAgIHRpbGw6XG4gICAgd2F0ZXI6XG4gICAgcGxhbnQ6XG4gICAgZ3JvdyA6XG59OyovXG5cbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICB0aXBzX25vZGU6IGNjLk5vZGUsXG4gICAgICAgIHBsYW50X25vZGU6IGNjLk5vZGUsXG4gICAgICAgIHBsYW50X3Byb2dyZXNzX25vZGU6IGNjLk5vZGUsXG4gICAgICAgIHdhdGVyX3Byb2dyZXNzX25vZGU6IGNjLk5vZGUsXG4gICAgICAgIHBsYW50X3Byb2dyZXNzX2xhYmVsOiBjYy5MYWJlbCxcbiAgICAgICAgYnV0dG9uOiBjYy5Ob2RlLFxuICAgICAgICBidXR0b25fZnJhbWVfYXJyOiBbY2MuU3ByaXRlRnJhbWVdLFxuICAgICAgICBsYW5kX2ZyYW1lX2FycjogW2NjLlNwcml0ZUZyYW1lXSxcbiAgICAgICAgcGxhbnQwX2ZyYW1lX2FycjogW2NjLlNwcml0ZUZyYW1lXSxcbiAgICAgICAgcGxhbnQxX2ZyYW1lX2FycjogW2NjLlNwcml0ZUZyYW1lXSxcbiAgICAgICAgcGxhbnQyX2ZyYW1lX2FycjogW2NjLlNwcml0ZUZyYW1lXSxcbiAgICAgICAgcGxhbnQzX2ZyYW1lX2FycjogW2NjLlNwcml0ZUZyYW1lXSxcbiAgICAgICAgcGxhbnQ0X2ZyYW1lX2FycjogW2NjLlNwcml0ZUZyYW1lXSxcbiAgICAgICAgcGxhbnQ1X2ZyYW1lX2FycjogW2NjLlNwcml0ZUZyYW1lXSxcbiAgICAgICAgcGxhbnQ2X2ZyYW1lX2FycjogW2NjLlNwcml0ZUZyYW1lXSxcbiAgICAgICAgcGxhbnQ3X2ZyYW1lX2FycjogW2NjLlNwcml0ZUZyYW1lXSxcbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICAvL+iuvue9ruenjeakjeeahOakjeeJqVxuICAgIHNldF9wbGFudDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnBsYW50X25vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdmFyIGFsaXZlX3N0YWdlID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0uYWxpdmVfc3RhZ2U7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wbGFudF9ub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnBsYW50X25vZGUuY2hpbGRyZW5baV0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnBsYW50X2ZyYW1lX2Fyclt0aGlzLnBsYW50X3R5cGVdW2FsaXZlX3N0YWdlXTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5wbGFudF9ncm93KCk7XG4gICAgfSxcbiAgICAvL+akjeeJqeeUn+mVv1xuICAgIHBsYW50X2dyb3c6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0ubGFuZF9zdGF0ZSA9IFwiZ3Jvd1wiOyAvLyBub3RlIHRow6wgZ3Jvd2luZyBjaOG6oXkgcXXDoSAxMDAlXG4gICAgICAgIHZhciBsYW5kX3N0YXRlID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0ubGFuZF9zdGF0ZTtcbiAgICAgICAgdGhpcy5wbGFudF9wcm9ncmVzc19ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHZhciBncm93X3RpbWUgPSBjb25maWcucGxhbnRbdGhpcy5wbGFudF90eXBlXS5ncm93X3RpbWU7XG4gICAgICAgIHZhciBub3dfdGltZSA9IDA7XG4gICAgICAgIHZhciBiYXIgPSB0aGlzLnBsYW50X3Byb2dyZXNzX25vZGUuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKTtcbiAgICAgICAgdGhpcy53YXRlcmluZygpO1xuICAgICAgICB0aGlzLnBsYW50X2dyb3dfc2NoZWR1bGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBub3dfdGltZSArPSAwLjEgKiB0aGlzLndhdGVyX2J1ZmY7XG4gICAgICAgICAgICBpZiAobm93X3RpbWUgPj0gZ3Jvd190aW1lICYmIGxhbmRfc3RhdGUgPT0gXCJncm93XCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5wbGFudF9ncm93X3NjaGVkdWxlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYW50X3Byb2dyZXNzX2xhYmVsLnN0cmluZyA9IFwiV2FpdGluZyBmb3IgaGFydmVzdFwiO1xuICAgICAgICAgICAgICAgIHRoaXMud2FpdF9uZXh0KFwid2FpdF9jdXRcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBiYXIucHJvZ3Jlc3MgPSBub3dfdGltZSAvIGdyb3dfdGltZTtcbiAgICAgICAgICAgICAgICB2YXIgcHJvZ3Jlc3NfbnVtID0gcGFyc2VJbnQoYmFyLnByb2dyZXNzICogMTAwKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYW50X3Byb2dyZXNzX2xhYmVsLnN0cmluZyA9IFwiR3Jvd2luZyBcIiArIHByb2dyZXNzX251bSArIFwiJVwiO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlX3BsYW50X2FsaXZlX3N0YWdlKHByb2dyZXNzX251bSk7XG4gICAgICAgICAgICAgICAgaWYgKHByb2dyZXNzX251bSA8IDI1KSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wbGFudF9ub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYW50X25vZGUuY2hpbGRyZW5baV0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnBsYW50X2ZyYW1lX2Fyclt0aGlzLnBsYW50X3R5cGVdWzBdO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChwcm9ncmVzc19udW0gPCA1MCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucGxhbnRfbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGFudF9ub2RlLmNoaWxkcmVuW2ldLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5wbGFudF9mcmFtZV9hcnJbdGhpcy5wbGFudF90eXBlXVsxXTtcblxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChwcm9ncmVzc19udW0gPCA3NSkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucGxhbnRfbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGFudF9ub2RlLmNoaWxkcmVuW2ldLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5wbGFudF9mcmFtZV9hcnJbdGhpcy5wbGFudF90eXBlXVsyXTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucGxhbnRfbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYW50X25vZGUuY2hpbGRyZW5baV0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnBsYW50X2ZyYW1lX2Fyclt0aGlzLnBsYW50X3R5cGVdWzNdO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMucGxhbnRfZ3Jvd19zY2hlZHVsZSwgMC4xKTtcbiAgICB9LFxuICAgIC8v5pu05paw5qSN54mp562J57qnXG4gICAgdXBkYXRlX3BsYW50X2FsaXZlX3N0YWdlOiBmdW5jdGlvbiAocHJvZ3Jlc3NfbnVtKSB7XG4gICAgICAgIC8vMueahOWAjeaVsFxuICAgICAgICB2YXIgYWxpdmVfc3RhZ2UgPSB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5hbGl2ZV9zdGFnZTtcbiAgICAgICAgbGV0IHBsYW50U3ByaXRlID0gdGhpcy5wbGFudF9ub2RlLmNoaWxkcmVuW3RoaXMucGxhbnRfaW5kZXhdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lO1xuICAgICAgICBpZiAocGxhbnRTcHJpdGUpIHtcbiAgICAgICAgICAgIHBsYW50U3ByaXRlID0gdGhpcy5wbGFudF9mcmFtZV9hcnJbdGhpcy5wbGFudF90eXBlXVthbGl2ZV9zdGFnZV07XG4gICAgICAgIH07XG4gICAgICAgIGlmIChwcm9ncmVzc19udW0gPj0gMjUgLyAxMiAqIHRoaXMucGxhbnRfY291bnQpIHtcbiAgICAgICAgICAgIHRoaXMucGxhbnRfaW5kZXgrKztcbiAgICAgICAgICAgIHRoaXMucGxhbnRfY291bnQrKztcbiAgICAgICAgICAgIGlmICh0aGlzLnBsYW50X2NvdW50ID4gNDgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYW50X2NvdW50ID0gNDg7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKHRoaXMucGxhbnRfaW5kZXggPiAxMSkge1xuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLmFsaXZlX3N0YWdlKys7XG4gICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLmFsaXZlX3N0YWdlID4gMykge1xuICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5hbGl2ZV9zdGFnZSA9IDM7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYW50X2luZGV4ID0gMDtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvL+mHjee9ruakjeeJqeeahOeUn+mVv+eKtuaAgVxuICAgIHJlc3RfcGxhdF9hbGl2ZV9zdGFnZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5hbGl2ZV9zdGFnZSA9IDA7XG4gICAgICAgIHRoaXMucGxhbnRfaW5kZXggPSAwO1xuICAgICAgICB0aGlzLnBsYW50X2NvdW50ID0gMDtcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMud2F0ZXJfc2NoZWR1bGUpO1xuICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5wbGFudF9ncm93X3NjaGVkdWxlKTtcbiAgICAgICAgdGhpcy5zZXRfcGxhbnQoKTtcbiAgICB9LFxuICAgIC8vxJHhu6NpIHRy4bqhbmcgdGjDoWkgdGnhur9wIHRoZW9cbiAgICB3YWl0X25leHQ6IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICAgIHRoaXMuYnV0dG9uLnN0YXRlID0gdHlwZTtcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFwid2FpdF9jdXRcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbi5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuYnV0dG9uX2ZyYW1lX2FyclswXTtcbiAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5sYW5kX3N0YXRlID0gXCJ3YWl0X2N1dFwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInBsYW50XCI6XG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b24uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmJ1dHRvbl9mcmFtZV9hcnJbMV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwid2FpdF90aWxsXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b24uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmJ1dHRvbl9mcmFtZV9hcnJbMl07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5idXR0b24uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMud2F0ZXJfc2NoZWR1bGUpO1xuICAgIH0sXG4gICAgLy9jdXR0aW5nXG4gICAgY3V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5sYW5kX3N0YXRlICE9PSBcIndhaXRfY3V0XCIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfTtcbiAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0ubGFuZF9zdGF0ZSA9IFwiY3V0aW5nXCI7XG4gICAgICAgIHZhciBsYW5kX3N0YXRlID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0ubGFuZF9zdGF0ZVxuICAgICAgICB0aGlzLmJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdmFyIGN1dF90aW1lID0gY29uZmlnLnBsYW50W3RoaXMucGxhbnRfdHlwZV0uY3V0X3RpbWUgKiAoMSAtIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxbXCJzcGVlZF90aGVfY3V0XCJdIC8gMTAwKTtcbiAgICAgICAgdmFyIG5vd190aW1lID0gMDtcbiAgICAgICAgdmFyIGJhciA9IHRoaXMucGxhbnRfcHJvZ3Jlc3Nfbm9kZS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpO1xuICAgICAgICB0aGlzLmN1dF9zY2hlZHVsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIG5vd190aW1lICs9IDAuMTtcbiAgICAgICAgICAgIGlmIChub3dfdGltZSA+PSBjdXRfdGltZSAmJiBsYW5kX3N0YXRlID09IFwiY3V0aW5nXCIpIHtcbiAgICAgICAgICAgICAgICBub3dfdGltZSA9IDA7XG4gICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0ubGFuZF9zdGF0ZSA9IFwiY3V0X292ZXJcIjtcbiAgICAgICAgICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJjdXRfb3ZlclwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5jdXRfc2NoZWR1bGUpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVzdF9wbGF0X2FsaXZlX3N0YWdlKCk7XG4gICAgICAgICAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX2xpZ2h0X2VmZmVjdCh0aGlzLm5vZGUsIDEsIHRoaXMucGxhbnRfdHlwZSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKG5vZGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcImxpZ2h0XCIpLmluaV9ub2RlKHRoaXMucGxhbnRfdHlwZSwgdGhpcy5ub2RlKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYmFyLnByb2dyZXNzID0gbm93X3RpbWUgLyBjdXRfdGltZTtcbiAgICAgICAgICAgICAgICB2YXIgcHJvZ3Jlc3NfbnVtID0gcGFyc2VJbnQoYmFyLnByb2dyZXNzICogMTAwKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYW50X3Byb2dyZXNzX2xhYmVsLnN0cmluZyA9IFwiSGFydmVzdGluZyBcIiArIHByb2dyZXNzX251bSArIFwiJVwiO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLmN1dF9zY2hlZHVsZSwgMC4xKTtcbiAgICB9LFxuICAgIC8v5oyJ6ZKu6KKr54K55Ye7XG4gICAgb25fYnV0dG9uX2NsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9jbGlja1wiKTtcbiAgICAgICAgc3dpdGNoICh0aGlzLmJ1dHRvbi5zdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSBcIndhaXRfY3V0XCI6XG4gICAgICAgICAgICAgICAgdGhpcy5jdXQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJwbGFudFwiOlxuICAgICAgICAgICAgICAgIHZhciBub2RlID0gdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9wbGFudF91aSh0aGlzLmdhbWVfc2NlbmVfanMubm9kZSk7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcInBsYW50X3VpXCIpLmluaV9ub2RlKHRoaXMubGFuZF9pbmRleCk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJ3YWl0X3RpbGxcIjpcbiAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5sYW5kX3N0YXRlID0gXCJ3YWl0X3RpbGxcIjtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbGwoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgLy/mtYfmsLRcbiAgICB3YXRlcmluZzogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLndhdGVyX2J1ZmYgPSAyO1xuICAgICAgICB0aGlzLndhdGVyX3Byb2dyZXNzX25vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdmFyIGFsbF93YXRlciA9IGNvbmZpZy5hbGxfd2F0ZXJfbnVtO1xuICAgICAgICB2YXIgYmFyID0gdGhpcy53YXRlcl9wcm9ncmVzc19ub2RlLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0Jhcik7XG4gICAgICAgIHRoaXMud2F0ZXJfc2NoZWR1bGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0ubGFuZF9zdGF0ZSA9PSBcImdyb3dcIikge1xuICAgICAgICAgICAgICAgIHZhciB3YXRlcl9udW0gPSB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS53YXRlcl9udW07XG4gICAgICAgICAgICAgICAgLy8gaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLmhhdmVfd2F0ZXIgPT0gMCkgd2F0ZXJfbnVtID0gMDsvL2t0cmEgeGVtIMO0IMSR4bqldCBjw7JuIG7GsOG7m2Mga1xuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLndhdGVyX251bSAtPSAwLjEgKiAoMSAtIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxbXCJ3YXRlcl9zYXZpbmdcIl0gLyAxMDApO1xuICAgICAgICAgICAgICAgIHdhdGVyX251bSA9IHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLndhdGVyX251bTtcbiAgICAgICAgICAgICAgICBpZiAod2F0ZXJfbnVtIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMud2F0ZXJfc2NoZWR1bGUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLndhdGVyX2J1ZmYgPSAxO1xuICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS53YXRlcl9udW0gPSAwO1xuICAgICAgICAgICAgICAgICAgICAvLyB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5oYXZlX3dhdGVyID0gMDsgICAvLyBsxrB1IHRy4bqhbmcgdGjDoWkgY8OzIG7GsOG7m2MgaGF5IGsgY+G7p2Egw7QgxJHhuqV0XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiaGVsbG8gXCIgKyB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5oYXZlX3dhdGVyKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYmFyLnByb2dyZXNzID0gd2F0ZXJfbnVtIC8gYWxsX3dhdGVyO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLndhdGVyX3NjaGVkdWxlKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMud2F0ZXJfc2NoZWR1bGUsIDAuMSk7XG4gICAgfSxcbiAgICB3YXRlcl9jaGFyZ2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMud2F0ZXJfc3RhdGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMud2F0ZXJfc2NoZWR1bGUpO1xuICAgICAgICAgICAgdGhpcy53YXRlcl9zdGF0ZSA9IFwiY2hhcmdlXCI7XG4gICAgICAgICAgICB2YXIgYWxsX3dhdGVyID0gY29uZmlnLmFsbF93YXRlcl9udW07XG4gICAgICAgICAgICB2YXIgYmFyID0gdGhpcy53YXRlcl9wcm9ncmVzc19ub2RlLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0Jhcik7XG4gICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5vd193YXRlciA9IHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLndhdGVyX251bVxuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLndhdGVyX251bSArPSAxO1xuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLmhhdmVfd2F0ZXIgPSAxO1xuICAgICAgICAgICAgICAgIGlmIChub3dfd2F0ZXIgPj0gYWxsX3dhdGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZShjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLndhdGVyX251bSA9IGFsbF93YXRlcjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53YXRlcl9zdGF0ZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5sYW5kX3N0YXRlID09IFwiY3V0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndhdGVyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGJhci5wcm9ncmVzcyA9IG5vd193YXRlciAvIGFsbF93YXRlcjtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlKGNhbGxiYWNrLCAwLjEpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMud2F0ZXJfc3RhdGUgPT0gXCJjaGFyZ2VcIikge1xuICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0ud2F0ZXJfbnVtICs9IDEwO1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgLy/liJ3lp4vljJboioLngrlcbiAgICBpbmlfbm9kZTogZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbCA9IGNjLmZpbmQoXCJzb3VuZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcInNvdW5kX2NvbnRyb2xcIik7XG4gICAgICAgIHZhciBoYXZlID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW2luZGV4XS5oYXZlO1xuICAgICAgICB0aGlzLmxhbmRfaW5kZXggPSBpbmRleDtcbiAgICAgICAgdGhpcy5wbGFudF90eXBlID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0ucGxhbnRfdHlwZTtcbiAgICAgICAgdmFyIGxhbmRfc3RhdGUgPSB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5sYW5kX3N0YXRlO1xuICAgICAgICB0aGlzLnBsYW50X2luZGV4ID0gMDsgLy/mpI3nianntKLlvJVcbiAgICAgICAgdGhpcy5wbGFudF9jb3VudCA9IDA7IC8v55Sf6ZW/57yW5Y+3XG4gICAgICAgIHRoaXMud2F0ZXJfYnVmZiA9IDE7ICAvLyDliJ3lp4vljJbmsLRidWZmXG4gICAgICAgIHRoaXMud2F0ZXJfc3RhdGUgPSBudWxsO1xuICAgICAgICB0aGlzLnBsYW50X2ZyYW1lX2FyciA9IFtcbiAgICAgICAgICAgIHRoaXMucGxhbnQwX2ZyYW1lX2FycixcbiAgICAgICAgICAgIHRoaXMucGxhbnQxX2ZyYW1lX2FycixcbiAgICAgICAgICAgIHRoaXMucGxhbnQyX2ZyYW1lX2FycixcbiAgICAgICAgICAgIHRoaXMucGxhbnQzX2ZyYW1lX2FycixcbiAgICAgICAgICAgIHRoaXMucGxhbnQ0X2ZyYW1lX2FycixcbiAgICAgICAgICAgIHRoaXMucGxhbnQ1X2ZyYW1lX2FycixcbiAgICAgICAgICAgIHRoaXMucGxhbnQ2X2ZyYW1lX2FycixcbiAgICAgICAgICAgIHRoaXMucGxhbnQ3X2ZyYW1lX2FycixcbiAgICAgICAgXTtcbiAgICAgICAgc3dpdGNoIChoYXZlKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgdGhpcy50aXBzX25vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmxhbmRfZnJhbWVfYXJyWzBdO1xuICAgICAgICAgICAgICAgIHRoaXMucGxhbnRfbm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYW50X3Byb2dyZXNzX25vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy53YXRlcl9wcm9ncmVzc19ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIC8vdGlsbCBzdGF0ZVxuICAgICAgICAgICAgICAgIHRoaXMudGlwc19ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAobGFuZF9zdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwid2FpdF90aWxsXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYW50X25vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYW50X3Byb2dyZXNzX25vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndhdGVyX3Byb2dyZXNzX25vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmxhbmRfZnJhbWVfYXJyWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53YWl0X25leHQoXCJ3YWl0X3RpbGxcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIndhaXRfcGxhbnRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMubGFuZF9mcmFtZV9hcnJbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYW50X3Byb2dyZXNzX25vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud2F0ZXJfcHJvZ3Jlc3Nfbm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdmFyIGJhciA9IHRoaXMud2F0ZXJfcHJvZ3Jlc3Nfbm9kZS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLmhhdmVfd2F0ZXIgPT0gMCkgYmFyLnByb2dyZXNzID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxhbnRfcHJvZ3Jlc3NfbGFiZWwuc3RyaW5nID0gXCJXYWl0aW5nIHRvIGJlIHBsYW50ZWRcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud2FpdF9uZXh0KFwicGxhbnRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIndhaXRfY3V0XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmxhbmRfZnJhbWVfYXJyWzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGFudF9ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYW50X3Byb2dyZXNzX25vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud2F0ZXJfcHJvZ3Jlc3Nfbm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdmFyIGJhciA9IHRoaXMud2F0ZXJfcHJvZ3Jlc3Nfbm9kZS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLmhhdmVfd2F0ZXIgPT0gMCkgYmFyLnByb2dyZXNzID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxhbnRfcHJvZ3Jlc3NfbGFiZWwuc3RyaW5nID0gXCJXYWl0aW5nIGZvciBoYXJ2ZXN0XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYW50X3Byb2dyZXNzX25vZGUuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKS5wcm9ncmVzcyA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucGxhbnRfbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxhbnRfbm9kZS5jaGlsZHJlbltpXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMucGxhbnRfZnJhbWVfYXJyW3RoaXMucGxhbnRfdHlwZV1bM107XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53YWl0X25leHQoXCJ3YWl0X2N1dFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRfcGxhbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMubGFuZF9mcmFtZV9hcnJbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjYy5sb2cobGFuZF9zdGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9O1xuXG4gICAgfSxcbiAgICAvL+iAleWcsFxuICAgIHRpbGw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy/lj6rlhYHorrjop6blj5HkuIDmrKFcbiAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLmxhbmRfc3RhdGUgIT09IFwidGlsbGluZ1wiKSB7XG4gICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5sYW5kX3N0YXRlID0gXCJ0aWxsaW5nXCI7XG4gICAgICAgICAgICB2YXIgbGFuZF9zdGF0ZSA9IHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLmxhbmRfc3RhdGU7XG4gICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5hbGl2ZV9zdGFnZSA9IDA7XG4gICAgICAgICAgICB0aGlzLnBsYW50X2luZGV4ID0gMDtcbiAgICAgICAgICAgIHRoaXMucGxhbnRfY291bnQgPSAwO1xuICAgICAgICAgICAgLy/lgZzmjonmiYDmnInnmoTorqHml7blmahcbiAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLndhdGVyX3NjaGVkdWxlKTtcbiAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLnBsYW50X2dyb3dfc2NoZWR1bGUpO1xuICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMuY3V0X3NjaGVkdWxlKTtcbiAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLnBsYW50X3NjaGVkdWxlKTtcbiAgICAgICAgICAgIHRoaXMucGxhbnRfbm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdmFyIHRpbGxfdGltZSA9IGNvbmZpZy50aWxsX3RpbWUgKiAoMSAtIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxbXCJ0b29sX2ltcHJvdmVcIl0gLyAxMDApO1xuICAgICAgICAgICAgdmFyIGJhciA9IHRoaXMucGxhbnRfcHJvZ3Jlc3Nfbm9kZS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpO1xuICAgICAgICAgICAgdmFyIG5vd190aW1lID0gMDtcbiAgICAgICAgICAgIHRoaXMucGxhbnRfcHJvZ3Jlc3Nfbm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy53YXRlcl9wcm9ncmVzc19ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmxhbmRfZnJhbWVfYXJyWzBdO1xuICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIG5vd190aW1lICs9IDAuMTtcbiAgICAgICAgICAgICAgICBpZiAobm93X3RpbWUgPj0gdGlsbF90aW1lICYmIGxhbmRfc3RhdGUgPT0gXCJ0aWxsaW5nXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGNjLmxvZyhcInRpbGwgb3ZlclwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5sYW5kX2ZyYW1lX2FyclsxXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGFudF9wcm9ncmVzc19sYWJlbC5zdHJpbmcgPSBcIldhaXRpbmcgdG8gYmUgcGxhbnRlZFwiO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLndhaXRfbmV4dChcInBsYW50XCIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGJhci5wcm9ncmVzcyA9IG5vd190aW1lIC8gdGlsbF90aW1lO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcHJvZ3Jlc3NfbnVtID0gcGFyc2VJbnQoYmFyLnByb2dyZXNzICogMTAwKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGFudF9wcm9ncmVzc19sYWJlbC5zdHJpbmcgPSBcIkluIHRoZSBncm91bmQgXCIgKyBwcm9ncmVzc19udW0gKyBcIiVcIjtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUoY2FsbGJhY2ssIDAuMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvL+enjeakjVxuICAgIHBsYW50OiBmdW5jdGlvbiAocGxhbnRfaW5kZXgpIHtcbiAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0ubGFuZF9zdGF0ZSA9IFwid2FpdF9wbGFudFwiO1xuICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5wbGFudF90eXBlID0gcGxhbnRfaW5kZXg7XG4gICAgICAgIHRoaXMucGxhbnRfdHlwZSA9IHBsYW50X2luZGV4O1xuICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5hbGl2ZV9zdGFnZSA9IDA7XG4gICAgICAgIHZhciBub3dfdGltZSA9IDA7XG4gICAgICAgIHZhciBwbGFudF90aW1lID0gY29uZmlnLnBsYW50W3BsYW50X2luZGV4XS5wbGFudF90aW1lICogKDEgLSB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1widG9vbF9pbXByb3ZlXCJdIC8gMTAwKTtcbiAgICAgICAgdmFyIGJhciA9IHRoaXMucGxhbnRfcHJvZ3Jlc3Nfbm9kZS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpO1xuICAgICAgICB0aGlzLmJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5wbGFudF9zY2hlZHVsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIG5vd190aW1lICs9IDAuMTtcbiAgICAgICAgICAgIGlmIChub3dfdGltZSA+PSBwbGFudF90aW1lKSB7XG4gICAgICAgICAgICAgICAgY2MubG9nKFwicGxhbnRfb3ZlclwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5wbGFudF9zY2hlZHVsZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRfcGxhbnQoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYmFyLnByb2dyZXNzID0gbm93X3RpbWUgLyBwbGFudF90aW1lO1xuICAgICAgICAgICAgICAgIHZhciBwcm9ncmVzc19udW0gPSBwYXJzZUludChiYXIucHJvZ3Jlc3MgKiAxMDApO1xuICAgICAgICAgICAgICAgIHRoaXMucGxhbnRfcHJvZ3Jlc3NfbGFiZWwuc3RyaW5nID0gXCJQbGFudGluZyBcIiArIHByb2dyZXNzX251bSArIFwiJVwiO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLnBsYW50X3NjaGVkdWxlLCAwLjEpO1xuICAgIH0sXG4gICAgb25Mb2FkKCkge1xuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJnYW1lX3NjZW5lXCIpO1xuXG4gICAgfSxcblxuICAgIHN0YXJ0KCkge1xuICAgIH0sXG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcbn0pO1xuIl19