
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ai/staff_ai.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxhaVxcc3RhZmZfYWkuanMiXSwibmFtZXMiOlsidXNlcl9kYXRhIiwicmVxdWlyZSIsImNvbmZpZyIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwicGxheWVyX25vZGUiLCJOb2RlIiwicHVwcGxlX25vZGUiLCJzdGFmZl9ub2RlIiwicHJvZ2Vzc19iYXIiLCJjaGFuZ2VfbW92ZW1lbnRfZGlyZWN0aW9uIiwiY2FsbGJhY2siLCJzdG9wX21vdmUiLCJ3b3JrX3N0YXRlIiwibnVtIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwicmVzdF9kaXJlY3Rpb24iLCJsZW5ndGgiLCJtb3ZlbWVudF9kaXJlY3Rpb24iLCJhbmltX3NlbGVjdCIsImFsbF9kaXJlY3Rpb24iLCJzY2hlZHVsZSIsImFuaW0iLCJnZXRDb21wb25lbnQiLCJBbmltYXRpb24iLCJhbmltX2NsaXBzIiwiZ2V0Q2xpcHMiLCJwbGF5IiwibmFtZSIsIm5vZGUiLCJzY2FsZVgiLCJhaV9tb3ZlIiwiZHQiLCJzIiwibW92ZV9zcGVlZCIsIngiLCJhdXRvX3dvcmsiLCJsYW5kX2pzIiwicGFyZW50IiwibGFuZF9pbmRleCIsImxhbmQiLCJsYW5kX3N0YXRlIiwiY3V0Iiwid2F0ZXJfbnVtIiwid2F0ZXJfY2hhcmdlIiwibWFjcm8iLCJSRVBFQVRfRk9SRVZFUiIsIndvcmtfc2NoZWR1bGUiLCJ3b3JrX3RpbWUiLCJzdGFmZiIsInN0YWZmX2luZGV4Iiwic2tpbGwiLCJ1bnNjaGVkdWxlIiwibm93X3RpbWUiLCJEYXRlIiwiZ2V0VGltZSIsIm92ZXJfdGltZSIsInJlc3Rfc2NoZWR1bGUiLCJvbl9zdGFmZl9ub2RlX3RvdWNoIiwic291bmRfY29udHJvbCIsInBsYXlfc291bmRfZWZmZWN0IiwiZ2FtZV9zY2VuZV9qcyIsImNyZWF0ZV9yZXN0X3VpIiwib24iLCJyZXN0X3RpbWUiLCJ0cmFkZXIiLCJyZWNpcGVzIiwiYWN0aXZlIiwib2ZmIiwiaW5pX25vZGUiLCJmaW5kIiwiYWRzTWFuYWdlcl9qcyIsInN0YWZmX3N0YXRlIiwic2V0UG9zaXRpb24iLCJvbkxvYWQiLCJzdGFydCIsInVwZGF0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxTQUFTLEdBQUdDLE9BQU8sQ0FBQyxXQUFELENBQXZCOztBQUNBLElBQUlDLE1BQU0sR0FBR0QsT0FBTyxDQUFDLFFBQUQsQ0FBcEI7O0FBQ0FFLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxXQUFXLEVBQUVKLEVBQUUsQ0FBQ0ssSUFEUjtBQUVSQyxJQUFBQSxXQUFXLEVBQUVOLEVBQUUsQ0FBQ0ssSUFGUjtBQUdSRSxJQUFBQSxVQUFVLEVBQUVQLEVBQUUsQ0FBQ0ssSUFIUDtBQUlSRyxJQUFBQSxXQUFXLEVBQUVSLEVBQUUsQ0FBQ0s7QUFKUixHQUhQO0FBVUw7QUFDQTtBQUNBSSxFQUFBQSx5QkFBeUIsRUFBRSxxQ0FBWTtBQUNuQyxRQUFJQyxRQUFRLEdBQUcsU0FBWEEsUUFBVyxHQUFZO0FBQ3ZCLFdBQUtDLFNBQUwsR0FBaUIsS0FBakI7O0FBQ0EsVUFBSSxLQUFLQyxVQUFMLElBQW1CLE1BQXZCLEVBQStCO0FBQzNCLFlBQUlDLEdBQUcsR0FBR0MsSUFBSSxDQUFDQyxLQUFMLENBQVdELElBQUksQ0FBQ0UsTUFBTCxLQUFnQixLQUFLQyxjQUFMLENBQW9CQyxNQUFwQyxHQUE2QyxDQUF4RCxJQUE2RCxDQUF2RTs7QUFDQSxZQUFJTCxHQUFHLEdBQUcsQ0FBVixFQUFhO0FBQ1RBLFVBQUFBLEdBQUcsR0FBRyxDQUFOO0FBQ0g7O0FBQUE7QUFDRCxhQUFLTSxrQkFBTCxHQUEwQixLQUFLRixjQUFMLENBQW9CSixHQUFwQixDQUExQjtBQUNBLGFBQUtPLFdBQUw7QUFDSCxPQVBELE1BT087QUFDSCxZQUFJUCxHQUFHLEdBQUdDLElBQUksQ0FBQ0MsS0FBTCxDQUFXRCxJ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SyxrQkF5TkU1QyxFQXpORixFQXlOTTtBQUNQLFNBQUtELE9BQUwsQ0FBYUMsRUFBYjtBQUNIO0FBM05JLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciB1c2VyX2RhdGEgPSByZXF1aXJlKFwidXNlcl9kYXRhXCIpO1xyXG52YXIgY29uZmlnID0gcmVxdWlyZShcImNvbmZpZ1wiKTtcclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBwbGF5ZXJfbm9kZTogY2MuTm9kZSxcclxuICAgICAgICBwdXBwbGVfbm9kZTogY2MuTm9kZSxcclxuICAgICAgICBzdGFmZl9ub2RlOiBjYy5Ob2RlLFxyXG4gICAgICAgIHByb2dlc3NfYmFyOiBjYy5Ob2RlLFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuICAgIC8vIOavj+malOWHoOenkuaUueWPmOenu+WKqOaWueWQkVxyXG4gICAgY2hhbmdlX21vdmVtZW50X2RpcmVjdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5zdG9wX21vdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMud29ya19zdGF0ZSA9PSBcInJlc3RcIikge1xyXG4gICAgICAgICAgICAgICAgdmFyIG51bSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMucmVzdF9kaXJlY3Rpb24ubGVuZ3RoIC0gMSkgKyAxO1xyXG4gICAgICAgICAgICAgICAgaWYgKG51bSA8IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBudW0gPSAwO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHRoaXMubW92ZW1lbnRfZGlyZWN0aW9uID0gdGhpcy5yZXN0X2RpcmVjdGlvbltudW1dO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltX3NlbGVjdCgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIG51bSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuYWxsX2RpcmVjdGlvbi5sZW5ndGggLSAxKSArIDE7XHJcbiAgICAgICAgICAgICAgICBpZiAobnVtIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG51bSA9IDA7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlbWVudF9kaXJlY3Rpb24gPSB0aGlzLmFsbF9kaXJlY3Rpb25bbnVtXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbV9zZWxlY3QoKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUoY2FsbGJhY2ssIE1hdGgucmFuZG9tKCkgKiAzICsgMik7XHJcbiAgICB9LFxyXG4gICAgLy9hbmltIHNlbGVjdFxyXG4gICAgYW5pbV9zZWxlY3Q6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgYW5pbSA9IHRoaXMucGxheWVyX25vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XHJcbiAgICAgICAgdmFyIGFuaW1fY2xpcHMgPSBhbmltLmdldENsaXBzKCk7Ly/ojrflj5bliqjnlLvliarovpFcclxuICAgICAgICBzd2l0Y2ggKHRoaXMubW92ZW1lbnRfZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ6X2lkbGVcIjpcclxuICAgICAgICAgICAgICAgIGFuaW0ucGxheShhbmltX2NsaXBzWzBdLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJjX2lkbGVcIjpcclxuICAgICAgICAgICAgICAgIGFuaW0ucGxheShhbmltX2NsaXBzWzFdLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJjX3J1bl9sXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2NhbGVYID0gMTtcclxuICAgICAgICAgICAgICAgIGFuaW0ucGxheShhbmltX2NsaXBzWzJdLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJjX3J1bl9yXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2NhbGVYID0gLTE7XHJcbiAgICAgICAgICAgICAgICBhbmltLnBsYXkoYW5pbV9jbGlwc1syXS5uYW1lKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLy/pmo/mnLrmn5DkuKrmlrnlkJHnp7vliqhcclxuICAgIGFpX21vdmU6IGZ1bmN0aW9uIChkdCkgeyAvL2R05ri45oiP5pe26Ze0XHJcbiAgICAgICAgLy/lvpfliLDmr4/luKfnmoTpgJ/luqZcclxuICAgICAgICB2YXIgcyA9IHRoaXMubW92ZV9zcGVlZCAqIGR0O1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgaWYgKHRoaXMubm9kZS54IDw9IC0xNTAgJiYgdGhpcy5zdG9wX21vdmUgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgdGhpcy5zdG9wX21vdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVtZW50X2RpcmVjdGlvbiA9IFwiY19ydW5fclwiO1xyXG4gICAgICAgICAgICB0aGlzLmFuaW1fc2VsZWN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLm5vZGUueCA+PSAxMzAgJiYgdGhpcy5zdG9wX21vdmUgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgdGhpcy5zdG9wX21vdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVtZW50X2RpcmVjdGlvbiA9IFwiY19ydW5fbFwiO1xyXG4gICAgICAgICAgICB0aGlzLmFuaW1fc2VsZWN0KCk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+WHoOenjeS4jeWQjOeahOenu+WKqOetlueVpVxyXG4gICAgICAgIHN3aXRjaCAodGhpcy5tb3ZlbWVudF9kaXJlY3Rpb24pIHtcclxuICAgICAgICAgICAgY2FzZSBcInpfaWRsZVwiOlxyXG4gICAgICAgICAgICAgICAgcyA9IDA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImNfaWRsZVwiOlxyXG4gICAgICAgICAgICAgICAgcyA9IDA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImNfcnVuX2xcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS54IC09IHM7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImNfcnVuX3JcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS54ICs9IHM7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9O1xyXG5cclxuICAgIH0sXHJcbiAgICAvL2F1dG8gd29ya1xyXG4gICAgYXV0b193b3JrOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGxhbmRfanMgPSB0aGlzLm5vZGUucGFyZW50LmdldENvbXBvbmVudChcImxhbmRcIik7XHJcbiAgICAgICAgdmFyIGxhbmRfaW5kZXggPSBsYW5kX2pzLmxhbmRfaW5kZXg7XHJcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvL+W3peS9nOeKtuaAgeW3peS9nFxyXG4gICAgICAgICAgICBpZiAodGhpcy53b3JrX3N0YXRlID09IFwid29ya1wiKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFtsYW5kX2luZGV4XS5sYW5kX3N0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIndhaXRfY3V0XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhbmRfanMuY3V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJncm93XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbbGFuZF9pbmRleF0ud2F0ZXJfbnVtIDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhbmRfanMud2F0ZXJfY2hhcmdlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICB9Oy8vZW5kIHN3aXRjaFxyXG4gICAgICAgICAgICAgICAgLy8gY2MubG9nKFwi5bel5L2c5LitXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9OyAvL2VuZCBpZlxyXG5cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUoY2FsbGJhY2ssIDAuNSwgY2MubWFjcm8uUkVQRUFUX0ZPUkVWRVIpO1xyXG4gICAgfSxcclxuICAgIC8v5bel5L2c5a6a5pe25ZmoXHJcbiAgICB3b3JrX3NjaGVkdWxlOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIHRoaXMud29ya19zdGF0ZSA9IFwid29ya1wiO1xyXG5cclxuICAgICAgICB2YXIgd29ya190aW1lID0gY29uZmlnLnN0YWZmW3RoaXMuc3RhZmZfaW5kZXhdLndvcmtfdGltZSArIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxbXCJsYWJvcl9jb250cmFjdFwiXTtcclxuICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHdvcmtfdGltZS0tO1xyXG4gICAgICAgICAgICBpZiAod29ya190aW1lIDw9IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZShjYWxsYmFjayk7XHJcbiAgICAgICAgICAgICAgICAvL+WBnOatouW3peS9nOiuoeaXtuWZqFxyXG4gICAgICAgICAgICAgICAgLy8gY2MubG9nKHRoaXMuc3RhZmZfaW5kZXgsIFwi5Y+35LyR5oGvXCIpO1xyXG4gICAgICAgICAgICAgICAgdmFyIG5vd190aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwO1xyXG4gICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5zdGFmZlt0aGlzLnN0YWZmX2luZGV4XS5vdmVyX3RpbWUgPSBub3dfdGltZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzdF9zY2hlZHVsZSgpO1xyXG4gICAgICAgICAgICB9Oy8vZW5kIGlmXHJcbiAgICAgICAgfTsvL2VuZCBjYWxsYmFja1xyXG5cclxuICAgICAgICB0aGlzLnNjaGVkdWxlKGNhbGxiYWNrLCAxLCBjYy5tYWNyby5SRVBFQVRfRk9SRVZFUik7XHJcbiAgICB9LFxyXG4gICAgLy/kvJHmga/ml7blsI/kurrooqvngrnlh7tcclxuICAgIG9uX3N0YWZmX25vZGVfdG91Y2goKSB7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xyXG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfcmVzdF91aSh0aGlzLmdhbWVfc2NlbmVfanMubm9kZSwgdGhpcy5zdGFmZl9pbmRleCk7XHJcbiAgICB9LFxyXG4gICAgLy/kvJHmga/lrprml7blmahcclxuICAgIHJlc3Rfc2NoZWR1bGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLndvcmtfc3RhdGUgPSBcInJlc3RcIjtcclxuICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLndvcmtfc3RhdGUgPT0gXCJyZXN0XCIpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvL25naGUgZXZcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhZmZfbm9kZS5vbihcInRvdWNoc3RhcnRcIiwgdGhpcy5vbl9zdGFmZl9ub2RlX3RvdWNoLCB0aGlzKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucHVwcGxlX25vZGUub24oXCJ0b3VjaHN0YXJ0XCIsIHRoaXMub25fc3RhZmZfbm9kZV90b3VjaCwgdGhpcylcclxuICAgICAgICAgICAgICAgIHZhciBub3dfdGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMDtcclxuICAgICAgICAgICAgICAgIHZhciBvdmVyX3RpbWUgPSB1c2VyX2RhdGEudXNlcl9kYXRhLnN0YWZmW3RoaXMuc3RhZmZfaW5kZXhdLm92ZXJfdGltZTtcclxuICAgICAgICAgICAgICAgIHZhciByZXN0X3RpbWUgPSBjb25maWcuc3RhZmZbdGhpcy5zdGFmZl9pbmRleF0ucmVzdF90aW1lIC0gdXNlcl9kYXRhLnVzZXJfZGF0YS50cmFkZXIucmVjaXBlcztcclxuXHJcbiAgICAgICAgICAgICAgICAvLyB0Z2lhbiBuZ2jhu4kgbWluIGzDoCAwXHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdF90aW1lIDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN0X3RpbWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL2zDoG0gdmnhu4djXHJcbiAgICAgICAgICAgICAgICBpZiAob3Zlcl90aW1lID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmtfc2NoZWR1bGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnB1cHBsZV9ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZShjYWxsYmFjayk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobm93X3RpbWUgLSBvdmVyX3RpbWUgPj0gcmVzdF90aW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaOG6v3Qgbmdo4buJIGdp4bqjaSBsYW9cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2MubG9nKHRoaXMuc3RhZmZfaW5kZXgsIFwi5byA5aeL5bel5L2cXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnB1cHBsZV9ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUoY2FsbGJhY2spO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmtfc2NoZWR1bGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFmZl9ub2RlLm9mZihcInRvdWNoc3RhcnRcIiwgdGhpcy5vbl9zdGFmZl9ub2RlX3RvdWNoLCB0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wdXBwbGVfbm9kZS5vbihcInRvdWNoc3RhcnRcIiwgdGhpcy5vbl9zdGFmZl9ub2RlX3RvdWNoLCB0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjYy5sb2coXCLkvJHmga9cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud29ya19zdGF0ZSA9IFwicmVzdFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnB1cHBsZV9ub2RlLmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH07Ly9lbmQgaWZcclxuXHJcbiAgICAgICAgICAgICAgICB9Oy8vZW5kIGlmXHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKGNhbGxiYWNrKTtcclxuICAgICAgICAgICAgfTsvLyBlbmQgaWZcclxuXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlKGNhbGxiYWNrLCAwLjEsIGNjLm1hY3JvLlJFUEVBVF9GT1JFVkVSKTtcclxuICAgIH0sXHJcbiAgICBpbmlfbm9kZTogZnVuY3Rpb24gKHN0YWZmX2luZGV4KSB7XHJcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9zY2VuZVwiKTs7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sID0gY2MuZmluZChcInNvdW5kX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwic291bmRfY29udHJvbFwiKTtcclxuICAgICAgICB0aGlzLmFkc01hbmFnZXJfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJBZHNNYW5hZ2VyXCIpO1xyXG4gICAgICAgIHRoaXMuc3RhZmZfaW5kZXggPSBzdGFmZl9pbmRleDtcclxuICAgICAgICB0aGlzLmFsbF9kaXJlY3Rpb24gPSBbXCJ6X2lkbGVcIiwgXCJjX2lkbGVcIiwgXCJjX3J1bl9sXCIsIFwiY19ydW5fclwiXTtcclxuICAgICAgICB0aGlzLnJlc3RfZGlyZWN0aW9uID0gW1wiel9pZGxlXCIsIFwiY19pZGxlXCJdO1xyXG4gICAgICAgIHRoaXMubW92ZW1lbnRfZGlyZWN0aW9uID0gXCJ6X2lkbGVcIjtcclxuICAgICAgICAvL+Wwj+S6uueahOenu+WKqOmAn+W6plxyXG4gICAgICAgIHRoaXMubW92ZV9zcGVlZCA9IDMwO1xyXG4gICAgICAgIC8v5YGc5q2i56e75Yqo77yM6L6557yY5pe26Kem5Y+RXHJcbiAgICAgICAgdGhpcy5zdG9wX21vdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnN0YWZmX3N0YXRlID0gbnVsbDtcclxuICAgICAgICB0aGlzLndvcmtfc3RhdGUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbigwLCAtMTQwKTtcclxuICAgIH0sXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VfbW92ZW1lbnRfZGlyZWN0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5hbmltX3NlbGVjdCgpO1xyXG4gICAgICAgIHRoaXMucmVzdF9zY2hlZHVsZSgpO1xyXG4gICAgICAgIHRoaXMuYXV0b193b3JrKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZShkdCkge1xyXG4gICAgICAgIHRoaXMuYWlfbW92ZShkdCk7XHJcbiAgICB9LFxyXG59KTtcclxuIl19