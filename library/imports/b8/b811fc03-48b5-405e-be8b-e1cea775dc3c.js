"use strict";
cc._RF.push(module, 'b811fwDSLVAXr6L4c6nddw8', 'staff_ai');
// script/ai/staff_ai.js

"use strict";

var user_data = require("user_data");

var config = require("config");

cc.Class({
  "extends": cc.Component,
  properties: {
    player_node: cc.Node,
    pupple_node: cc.Node,
    staff_node: cc.Node,
    progess_bar: cc.Node
  },
  // LIFE-CYCLE CALLBACKS:
  // 每隔几秒改变移动方向
  change_movement_direction: function change_movement_direction() {
    var callback = function callback() {
      this.stop_move = false;

      if (this.work_state == "rest") {
        var num = Math.floor(Math.random() * this.rest_direction.length - 1) + 1;

        if (num < 0) {
          num = 0;
        }

        ;
        this.movement_direction = this.rest_direction[num];
        this.anim_select();
      } else {
        var num = Math.floor(Math.random() * this.all_direction.length - 1) + 1;

        if (num < 0) {
          num = 0;
        }

        ;
        this.movement_direction = this.all_direction[num];
        this.anim_select();
      }

      ;
    };

    this.schedule(callback, Math.random() * 3 + 2);
  },
  //anim select
  anim_select: function anim_select() {
    var anim = this.player_node.getComponent(cc.Animation);
    var anim_clips = anim.getClips(); //获取动画剪辑

    switch (this.movement_direction) {
      case "z_idle":
        anim.play(anim_clips[0].name);
        break;

      case "c_idle":
        anim.play(anim_clips[1].name);
        break;

      case "c_run_l":
        this.node.scaleX = 1;
        anim.play(anim_clips[2].name);
        break;

      case "c_run_r":
        this.node.scaleX = -1;
        anim.play(anim_clips[2].name);
        break;
    }

    ;
  },
  //随机某个方向移动
  ai_move: function ai_move(dt) {
    //dt游戏时间
    //得到每帧的速度
    var s = this.move_speed * dt; //

    if (this.node.x <= -150 && this.stop_move == false) {
      this.stop_move = true;
      this.movement_direction = "c_run_r";
      this.anim_select();
    }

    if (this.node.x >= 130 && this.stop_move == false) {
      this.stop_move = true;
      this.movement_direction = "c_run_l";
      this.anim_select();
    } //几种不同的移动策略


    switch (this.movement_direction) {
      case "z_idle":
        s = 0;
        break;

      case "c_idle":
        s = 0;
        break;

      case "c_run_l":
        this.node.x -= s;
        break;

      case "c_run_r":
        this.node.x += s;
        break;
    }

    ;
  },
  //auto work
  auto_work: function auto_work() {
    var land_js = this.node.parent.getComponent("land");
    var land_index = land_js.land_index;

    var callback = function callback() {
      //工作状态工作
      if (this.work_state == "work") {
        switch (user_data.user_data.land[land_index].land_state) {
          case "wait_cut":
            land_js.cut();
            break;

          case "grow":
            if (user_data.user_data.land[land_index].water_num <= 0) {
              land_js.water_charge();
            }

            ;
            break;

          default:
            return;
        }

        ; //end switch
        // cc.log("工作中");
      } else {
        return;
      }

      ; //end if
    };

    this.schedule(callback, 0.5, cc.macro.REPEAT_FOREVER);
  },
  //工作定时器
  work_schedule: function work_schedule() {
    this.work_state = "work";
    var work_time = config.staff[this.staff_index].work_time + user_data.user_data.skill["labor_contract"];

    var callback = function callback() {
      work_time--;

      if (work_time <= 0) {
        this.unschedule(callback); //停止工作计时器
        // cc.log(this.staff_index, "号休息");

        var now_time = new Date().getTime() / 1000;
        user_data.user_data.staff[this.staff_index].over_time = now_time;
        this.rest_schedule();
      }

      ; //end if
    }; //end callback


    this.schedule(callback, 1, cc.macro.REPEAT_FOREVER);
  },
  //休息时小人被点击
  on_staff_node_touch: function on_staff_node_touch() {
    this.sound_control.play_sound_effect("button_click");
    this.game_scene_js.create_rest_ui(this.game_scene_js.node, this.staff_index);
  },
  //休息定时器
  rest_schedule: function rest_schedule() {
    this.work_state = "rest";

    var callback = function callback() {
      if (this.work_state == "rest") {
        //nghe ev
        this.staff_node.on("touchstart", this.on_staff_node_touch, this);
        this.pupple_node.on("touchstart", this.on_staff_node_touch, this);
        var now_time = new Date().getTime() / 1000;
        var over_time = user_data.user_data.staff[this.staff_index].over_time;
        var rest_time = config.staff[this.staff_index].rest_time - user_data.user_data.trader.recipes; // tgian nghỉ min là 0

        if (rest_time <= 0) {
          rest_time = 0;
        }

        ; //làm việc

        if (over_time == 0) {
          this.work_schedule();
          this.pupple_node.active = false;
          this.unschedule(callback);
          return;
        } else {
          if (now_time - over_time >= rest_time) {
            //hết nghỉ giải lao
            // cc.log(this.staff_index, "开始工作");
            this.pupple_node.active = false;
            this.unschedule(callback);
            this.work_schedule();
            this.staff_node.off("touchstart", this.on_staff_node_touch, this);
            this.pupple_node.on("touchstart", this.on_staff_node_touch, this);
          } else {
            // cc.log("休息");
            this.work_state = "rest";
            this.pupple_node.active = true;
          }

          ; //end if
        }

        ; //end if
      } else {
        this.unschedule(callback);
      }

      ; // end if
    };

    this.schedule(callback, 0.1, cc.macro.REPEAT_FOREVER);
  },
  ini_node: function ini_node(staff_index) {
    this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
    ;
    this.sound_control = cc.find("sound_control").getComponent("sound_control");
    this.adsManager_js = cc.find("UI_ROOT").getComponent("AdsManager");
    this.staff_index = staff_index;
    this.all_direction = ["z_idle", "c_idle", "c_run_l", "c_run_r"];
    this.rest_direction = ["z_idle", "c_idle"];
    this.movement_direction = "z_idle"; //小人的移动速度

    this.move_speed = 30; //停止移动，边缘时触发

    this.stop_move = false;
    this.staff_state = null;
    this.work_state = null;
    this.node.setPosition(0, -140);
  },
  onLoad: function onLoad() {},
  start: function start() {
    this.change_movement_direction();
    this.anim_select();
    this.rest_schedule();
    this.auto_work();
  },
  update: function update(dt) {
    this.ai_move(dt);
  }
});

cc._RF.pop();