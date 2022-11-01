
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/migration/use_reversed_rotateBy');
require('./assets/migration/use_v2.1-2.2.1_cc.Toggle_event');
require('./assets/script/AdsManager');
require('./assets/script/ai/pet_ai');
require('./assets/script/ai/player_role');
require('./assets/script/ai/staff_ai');
require('./assets/script/config/config');
require('./assets/script/config/push');
require('./assets/script/config/videotape');
require('./assets/script/control/ad_control');
require('./assets/script/control/sound_control');
require('./assets/script/effect/ad_car');
require('./assets/script/effect/light');
require('./assets/script/fx');
require('./assets/script/game_rules');
require('./assets/script/game_scene');
require('./assets/script/loading_scene');
require('./assets/script/ui/button_more');
require('./assets/script/ui/gift_ui');
require('./assets/script/ui/hotel_ui');
require('./assets/script/ui/land');
require('./assets/script/ui/novice_ui');
require('./assets/script/ui/offline_profit');
require('./assets/script/ui/option_ui');
require('./assets/script/ui/pet_content');
require('./assets/script/ui/pet_ui');
require('./assets/script/ui/plant_ui');
require('./assets/script/ui/rest_ui');
require('./assets/script/ui/sell_ui');
require('./assets/script/ui/shop_buy_ui');
require('./assets/script/ui/shop_content');
require('./assets/script/ui/shop_ui');
require('./assets/script/ui/skill_content');
require('./assets/script/ui/staff_content');
require('./assets/script/ui/staff_ui');
require('./assets/script/ui/study_ui');
require('./assets/script/ui/tips_ui');
require('./assets/script/ui/videotape_ui');
require('./assets/script/user_data');

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
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/migration/use_reversed_rotateBy.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '55000PxB3ZFp59VqLmnCjkI', 'use_reversed_rotateBy');
// migration/use_reversed_rotateBy.js

"use strict";

/*
 * This script is automatically generated by Cocos Creator and is only used for projects compatible with v2.1.0/v2.1.1/v2.3.0/v2.3.1/v2.3.2 versions.
 * You do not need to manually add this script in any other project.
 * If you don't use cc.Action in your project, you can delete this script directly.
 * If your project is hosted in VCS such as git, submit this script together.
 *
 * 此脚本由 Cocos Creator 自动生成，仅用于兼容 v2.1.0/v2.1.1/v2.3.0/v2.3.1/v2.3.2 版本的工程，
 * 你无需在任何其它项目中手动添加此脚本。
 * 如果你的项目中没用到 Action，可直接删除该脚本。
 * 如果你的项目有托管于 git 等版本库，请将此脚本一并上传。
 */
cc.RotateBy._reverse = true;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbWlncmF0aW9uXFx1c2VfcmV2ZXJzZWRfcm90YXRlQnkuanMiXSwibmFtZXMiOlsiY2MiLCJSb3RhdGVCeSIsIl9yZXZlcnNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQUEsRUFBRSxDQUFDQyxRQUFILENBQVlDLFFBQVosR0FBdUIsSUFBdkIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIFRoaXMgc2NyaXB0IGlzIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVkIGJ5IENvY29zIENyZWF0b3IgYW5kIGlzIG9ubHkgdXNlZCBmb3IgcHJvamVjdHMgY29tcGF0aWJsZSB3aXRoIHYyLjEuMC92Mi4xLjEvdjIuMy4wL3YyLjMuMS92Mi4zLjIgdmVyc2lvbnMuXHJcbiAqIFlvdSBkbyBub3QgbmVlZCB0byBtYW51YWxseSBhZGQgdGhpcyBzY3JpcHQgaW4gYW55IG90aGVyIHByb2plY3QuXHJcbiAqIElmIHlvdSBkb24ndCB1c2UgY2MuQWN0aW9uIGluIHlvdXIgcHJvamVjdCwgeW91IGNhbiBkZWxldGUgdGhpcyBzY3JpcHQgZGlyZWN0bHkuXHJcbiAqIElmIHlvdXIgcHJvamVjdCBpcyBob3N0ZWQgaW4gVkNTIHN1Y2ggYXMgZ2l0LCBzdWJtaXQgdGhpcyBzY3JpcHQgdG9nZXRoZXIuXHJcbiAqXHJcbiAqIOatpOiEmuacrOeUsSBDb2NvcyBDcmVhdG9yIOiHquWKqOeUn+aIkO+8jOS7heeUqOS6juWFvOWuuSB2Mi4xLjAvdjIuMS4xL3YyLjMuMC92Mi4zLjEvdjIuMy4yIOeJiOacrOeahOW3peeoi++8jFxyXG4gKiDkvaDml6DpnIDlnKjku7vkvZXlhbblroPpobnnm67kuK3miYvliqjmt7vliqDmraTohJrmnKzjgIJcclxuICog5aaC5p6c5L2g55qE6aG555uu5Lit5rKh55So5YiwIEFjdGlvbu+8jOWPr+ebtOaOpeWIoOmZpOivpeiEmuacrOOAglxyXG4gKiDlpoLmnpzkvaDnmoTpobnnm67mnInmiZjnrqHkuo4gZ2l0IOetieeJiOacrOW6k++8jOivt+WwhuatpOiEmuacrOS4gOW5tuS4iuS8oOOAglxyXG4gKi9cclxuXHJcbmNjLlJvdGF0ZUJ5Ll9yZXZlcnNlID0gdHJ1ZTtcclxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/config/push.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '426f4RYhtdK/I31Hz30Pjor', 'push');
// script/config/push.js

"use strict";

module.exports = {
  fishBit: {
    appid: "wx4b7acfd163e9ac94"
  }
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxjb25maWdcXHB1c2guanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsImZpc2hCaXQiLCJhcHBpZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsTUFBTSxDQUFDQyxPQUFQLEdBQWlCO0FBQ2JDLEVBQUFBLE9BQU8sRUFBRTtBQUNMQyxJQUFBQSxLQUFLLEVBQUU7QUFERjtBQURJLENBQWpCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIGZpc2hCaXQgOntcclxuICAgICAgICBhcHBpZCA6XCJ3eDRiN2FjZmQxNjNlOWFjOTRcIixcclxuICAgIH0sXHJcbn07Il19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/effect/light.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'bd476vt0nVFUaH5OIbXIPmN', 'light');
// script/effect/light.js

"use strict";

var user_data = require("user_data");

cc.Class({
  "extends": cc.Component,
  properties: {
    icon_frame_arr: [cc.SpriteFrame],
    icon_frame: cc.Sprite,
    light_group: cc.Node
  },
  ini_node: function ini_node(plant_index, start_node) {
    this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
    this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
    this.sound_control = cc.find("sound_control").getComponent("sound_control");
    this.plant_index = plant_index;
    this.light_group.active = true;
    this.icon_frame.spriteFrame = this.icon_frame_arr[plant_index];
    this.node.setPosition(start_node.position.x, start_node.position.y + 50);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxlZmZlY3RcXGxpZ2h0LmpzIl0sIm5hbWVzIjpbInVzZXJfZGF0YSIsInJlcXVpcmUiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImljb25fZnJhbWVfYXJyIiwiU3ByaXRlRnJhbWUiLCJpY29uX2ZyYW1lIiwiU3ByaXRlIiwibGlnaHRfZ3JvdXAiLCJOb2RlIiwiaW5pX25vZGUiLCJwbGFudF9pbmRleCIsInN0YXJ0X25vZGUiLCJnYW1lX3NjZW5lX2pzIiwiZmluZCIsImdldENvbXBvbmVudCIsImdhbWVfcnVsZXNfanMiLCJzb3VuZF9jb250cm9sIiwiYWN0aXZlIiwic3ByaXRlRnJhbWUiLCJub2RlIiwic2V0UG9zaXRpb24iLCJwb3NpdGlvbiIsIngiLCJ5Iiwib25Mb2FkIiwic3RhcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsU0FBUyxHQUFHQyxPQUFPLENBQUMsV0FBRCxDQUF2Qjs7QUFDQUMsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLGNBQWMsRUFBRSxDQUFDSixFQUFFLENBQUNLLFdBQUosQ0FEUjtBQUVSQyxJQUFBQSxVQUFVLEVBQUVOLEVBQUUsQ0FBQ08sTUFGUDtBQUdSQyxJQUFBQSxXQUFXLEVBQUVSLEVBQUUsQ0FBQ1M7QUFIUixHQUhQO0FBUUxDLEVBQUFBLFFBQVEsRUFBRSxrQkFBVUMsV0FBVixFQUF1QkMsVUFBdkIsRUFBbUM7QUFDekMsU0FBS0MsYUFBTCxHQUFxQmIsRUFBRSxDQUFDYyxJQUFILENBQVEsU0FBUixFQUFtQkMsWUFBbkIsQ0FBZ0MsWUFBaEMsQ0FBckI7QUFDQSxTQUFLQyxhQUFMLEdBQXFCaEIsRUFBRSxDQUFDYyxJQUFILENBQVEsU0FBUixFQUFtQkMsWUFBbkIsQ0FBZ0MsWUFBaEMsQ0FBckI7QUFDQSxTQUFLRSxhQUFMLEdBQXFCakIsRUFBRSxDQUFDYyxJQUFILENBQVEsZUFBUixFQUF5QkMsWUFBekIsQ0FBc0MsZUFBdEMsQ0FBckI7QUFDQSxTQUFLSixXQUFMLEdBQW1CQSxXQUFuQjtBQUNBLFNBQUtILFdBQUwsQ0FBaUJVLE1BQWpCLEdBQTBCLElBQTFCO0FBQ0EsU0FBS1osVUFBTCxDQUFnQmEsV0FBaEIsR0FBOEIsS0FBS2YsY0FBTCxDQUFvQk8sV0FBcEIsQ0FBOUI7QUFDQSxTQUFLUyxJQUFMLENBQVVDLFdBQVYsQ0FBc0JULFVBQVUsQ0FBQ1UsUUFBWCxDQUFvQkMsQ0FBMUMsRUFBNkNYLFVBQVUsQ0FBQ1UsUUFBWCxDQUFvQkUsQ0FBcEIsR0FBd0IsRUFBckU7QUFDSCxHQWhCSTtBQWlCTEMsRUFBQUEsTUFqQkssb0JBaUJJLENBR1IsQ0FwQkk7QUFzQkxDLEVBQUFBLEtBdEJLLG1CQXNCRyxDQUVQLENBeEJJLENBMEJMOztBQTFCSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgdXNlcl9kYXRhID0gcmVxdWlyZShcInVzZXJfZGF0YVwiKTtcclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBpY29uX2ZyYW1lX2FycjogW2NjLlNwcml0ZUZyYW1lXSxcclxuICAgICAgICBpY29uX2ZyYW1lOiBjYy5TcHJpdGUsXHJcbiAgICAgICAgbGlnaHRfZ3JvdXA6IGNjLk5vZGUsXHJcbiAgICB9LFxyXG4gICAgaW5pX25vZGU6IGZ1bmN0aW9uIChwbGFudF9pbmRleCwgc3RhcnRfbm9kZSkge1xyXG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfc2NlbmVcIik7XHJcbiAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9ydWxlc1wiKTtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wgPSBjYy5maW5kKFwic291bmRfY29udHJvbFwiKS5nZXRDb21wb25lbnQoXCJzb3VuZF9jb250cm9sXCIpO1xyXG4gICAgICAgIHRoaXMucGxhbnRfaW5kZXggPSBwbGFudF9pbmRleDtcclxuICAgICAgICB0aGlzLmxpZ2h0X2dyb3VwLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2FycltwbGFudF9pbmRleF07XHJcbiAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKHN0YXJ0X25vZGUucG9zaXRpb24ueCwgc3RhcnRfbm9kZS5wb3NpdGlvbi55ICsgNTApO1xyXG4gICAgfSxcclxuICAgIG9uTG9hZCgpIHtcclxuXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCgpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxyXG59KTtcclxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/control/sound_control.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e6dc0dAPTpJI6mvKxmIq3jL', 'sound_control');
// script/control/sound_control.js

"use strict";

var user_data = require("user_data");

cc.Class({
  "extends": cc.Component,
  properties: {
    home_bg_sound: {
      type: cc.AudioClip,
      "default": null
    },
    village_bg: {
      type: cc.AudioClip,
      "default": null
    },
    button_click: {
      type: cc.AudioClip,
      "default": null
    },
    main_button_click: {
      type: cc.AudioClip,
      "default": null
    },
    un_click: {
      type: cc.AudioClip,
      "default": null
    },
    level_up: {
      type: cc.AudioClip,
      "default": null
    },
    add_ex: {
      type: cc.AudioClip,
      "default": null
    },
    add_gold: {
      type: cc.AudioClip,
      "default": null
    },
    button_exit: {
      type: cc.AudioClip,
      "default": null
    },
    cut_over: {
      type: cc.AudioClip,
      "default": null
    }
  },
  // LIFE-CYCLE CALLBACKS:
  //播放背景音乐
  play_bg_sound: function play_bg_sound(name) {
    var sound_state = user_data.user_data.sound_state;

    if (sound_state == 0) {
      cc.audioEngine.pauseMusic();
      return;
    } else {
      this.stop_bg_sound();

      switch (name) {
        case "home_bg":
          cc.audioEngine.playMusic(this.home_bg_sound, true, 1);
          break;

        case "village_bg":
          cc.audioEngine.playMusic(this.village_bg, true, 1);
          break;
      }

      ;
    }

    ;
  },
  //停止所有的背景音乐
  stop_bg_sound: function stop_bg_sound() {
    cc.audioEngine.stopMusic();
  },
  //停止所有音效
  stop_allEffects: function stop_allEffects() {
    cc.audioEngine.stopAllEffects();
  },
  //暂停所有声音
  pause_all_sound: function pause_all_sound() {
    cc.audioEngine.pauseAllEffects();
    cc.audioEngine.pauseMusic();
  },
  //恢复播放暂停
  resume_all_sound: function resume_all_sound() {
    var sound_state = user_data.user_data.sound_state;

    if (sound_state == 0) {
      return;
    } else {
      cc.audioEngine.resumeMusic();
      cc.audioEngine.resumeAllEffects();
    }

    ;
  },
  //--------------------------------------------------------
  //--------------------------------------------------------
  //播放音效
  play_sound_effect: function play_sound_effect(name) {
    var sound_state = user_data.user_data.sound_state;

    if (sound_state == 0) {
      cc.audioEngine.pauseAllEffects();
      return;
    } else {
      switch (name) {
        case "button_click":
          cc.audioEngine.playEffect(this.button_click, false, 1);
          break;

        case "main_button_click":
          cc.audioEngine.playEffect(this.main_button_click, false, 1);
          break;

        case "button_exit":
          cc.audioEngine.playEffect(this.button_exit, false, 1);
          break;

        case "un_click":
          cc.audioEngine.playEffect(this.un_click, false, 1);
          break;

        case "level_up":
          cc.audioEngine.playEffect(this.level_up, false, 1);
          break;

        case "add_ex":
          cc.audioEngine.playEffect(this.add_ex, false, 1);
          break;

        case "add_gold":
          cc.audioEngine.playEffect(this.add_gold, false, 1);
          break;

        case "cut_over":
          cc.audioEngine.playEffect(this.cut_over, false, 1);
          break;
      }

      ;
    }

    ;
  },
  ini_node: function ini_node() {
    cc.audioEngine.setMusicVolume(0.3);
    cc.audioEngine.setEffectsVolume(0.4);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxjb250cm9sXFxzb3VuZF9jb250cm9sLmpzIl0sIm5hbWVzIjpbInVzZXJfZGF0YSIsInJlcXVpcmUiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImhvbWVfYmdfc291bmQiLCJ0eXBlIiwiQXVkaW9DbGlwIiwidmlsbGFnZV9iZyIsImJ1dHRvbl9jbGljayIsIm1haW5fYnV0dG9uX2NsaWNrIiwidW5fY2xpY2siLCJsZXZlbF91cCIsImFkZF9leCIsImFkZF9nb2xkIiwiYnV0dG9uX2V4aXQiLCJjdXRfb3ZlciIsInBsYXlfYmdfc291bmQiLCJuYW1lIiwic291bmRfc3RhdGUiLCJhdWRpb0VuZ2luZSIsInBhdXNlTXVzaWMiLCJzdG9wX2JnX3NvdW5kIiwicGxheU11c2ljIiwic3RvcE11c2ljIiwic3RvcF9hbGxFZmZlY3RzIiwic3RvcEFsbEVmZmVjdHMiLCJwYXVzZV9hbGxfc291bmQiLCJwYXVzZUFsbEVmZmVjdHMiLCJyZXN1bWVfYWxsX3NvdW5kIiwicmVzdW1lTXVzaWMiLCJyZXN1bWVBbGxFZmZlY3RzIiwicGxheV9zb3VuZF9lZmZlY3QiLCJwbGF5RWZmZWN0IiwiaW5pX25vZGUiLCJzZXRNdXNpY1ZvbHVtZSIsInNldEVmZmVjdHNWb2x1bWUiLCJvbkxvYWQiLCJzdGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxTQUFTLEdBQUdDLE9BQU8sQ0FBQyxXQUFELENBQXZCOztBQUNBQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsYUFBYSxFQUFFO0FBQ1hDLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTSxTQURFO0FBRVgsaUJBQVM7QUFGRSxLQURQO0FBS1JDLElBQUFBLFVBQVUsRUFBRTtBQUNSRixNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ00s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SWIsVUFBQUEsRUFBRSxDQUFDbUIsV0FBSCxDQUFlYSxVQUFmLENBQTBCLEtBQUtqQixRQUEvQixFQUF5QyxLQUF6QyxFQUFnRCxDQUFoRDtBQUNBO0FBeEJSOztBQTBCQztBQUNKOztBQUFBO0FBQ0osR0FuSUk7QUFvSUxrQixFQUFBQSxRQUFRLEVBQUUsb0JBQVk7QUFDbEJqQyxJQUFBQSxFQUFFLENBQUNtQixXQUFILENBQWVlLGNBQWYsQ0FBOEIsR0FBOUI7QUFDQWxDLElBQUFBLEVBQUUsQ0FBQ21CLFdBQUgsQ0FBZWdCLGdCQUFmLENBQWdDLEdBQWhDO0FBQ0gsR0F2SUk7QUF3SUxDLEVBQUFBLE1BeElLLG9CQXdJSSxDQUVSLENBMUlJO0FBNElMQyxFQUFBQSxLQTVJSyxtQkE0SUcsQ0FDUCxDQTdJSSxDQStJTDs7QUEvSUssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHVzZXJfZGF0YSA9IHJlcXVpcmUoXCJ1c2VyX2RhdGFcIik7XHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgaG9tZV9iZ19zb3VuZDoge1xyXG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb0NsaXAsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB2aWxsYWdlX2JnOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkF1ZGlvQ2xpcCxcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJ1dHRvbl9jbGljazoge1xyXG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb0NsaXAsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBtYWluX2J1dHRvbl9jbGljazoge1xyXG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb0NsaXAsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB1bl9jbGljazoge1xyXG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb0NsaXAsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsZXZlbF91cDoge1xyXG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb0NsaXAsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhZGRfZXg6IHtcclxuICAgICAgICAgICAgdHlwZTogY2MuQXVkaW9DbGlwLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYWRkX2dvbGQ6IHtcclxuICAgICAgICAgICAgdHlwZTogY2MuQXVkaW9DbGlwLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYnV0dG9uX2V4aXQ6IHtcclxuICAgICAgICAgICAgdHlwZTogY2MuQXVkaW9DbGlwLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY3V0X292ZXI6IHtcclxuICAgICAgICAgICAgdHlwZTogY2MuQXVkaW9DbGlwLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG4gICAgLy/mkq3mlL7og4zmma/pn7PkuZBcclxuICAgIHBsYXlfYmdfc291bmQ6IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICAgICAgdmFyIHNvdW5kX3N0YXRlID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5zb3VuZF9zdGF0ZTtcclxuICAgICAgICBpZiAoc291bmRfc3RhdGUgPT0gMCkge1xyXG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wYXVzZU11c2ljKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnN0b3BfYmdfc291bmQoKTtcclxuICAgICAgICAgICAgc3dpdGNoIChuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiaG9tZV9iZ1wiOlxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlNdXNpYyh0aGlzLmhvbWVfYmdfc291bmQsIHRydWUsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInZpbGxhZ2VfYmdcIjpcclxuICAgICAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5TXVzaWModGhpcy52aWxsYWdlX2JnLCB0cnVlLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcblxyXG4gICAgLy/lgZzmraLmiYDmnInnmoTog4zmma/pn7PkuZBcclxuICAgIHN0b3BfYmdfc291bmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5zdG9wTXVzaWMoKTtcclxuICAgIH0sXHJcbiAgICAvL+WBnOatouaJgOaciemfs+aViFxyXG4gICAgc3RvcF9hbGxFZmZlY3RzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUuc3RvcEFsbEVmZmVjdHMoKTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8v5pqC5YGc5omA5pyJ5aOw6Z+zXHJcbiAgICBwYXVzZV9hbGxfc291bmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wYXVzZUFsbEVmZmVjdHMoKTtcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wYXVzZU11c2ljKCk7XHJcbiAgICB9LFxyXG4gICAgLy/mgaLlpI3mkq3mlL7mmoLlgZxcclxuICAgIHJlc3VtZV9hbGxfc291bmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgc291bmRfc3RhdGUgPSB1c2VyX2RhdGEudXNlcl9kYXRhLnNvdW5kX3N0YXRlO1xyXG4gICAgICAgIGlmIChzb3VuZF9zdGF0ZSA9PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnJlc3VtZU11c2ljKCk7XHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnJlc3VtZUFsbEVmZmVjdHMoKTtcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgLy/mkq3mlL7pn7PmlYhcclxuICAgIHBsYXlfc291bmRfZWZmZWN0OiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgICAgIHZhciBzb3VuZF9zdGF0ZSA9IHVzZXJfZGF0YS51c2VyX2RhdGEuc291bmRfc3RhdGU7XHJcbiAgICAgICAgaWYgKHNvdW5kX3N0YXRlID09IDApIHtcclxuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGF1c2VBbGxFZmZlY3RzKCk7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAobmFtZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcImJ1dHRvbl9jbGlja1wiOlxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5idXR0b25fY2xpY2ssIGZhbHNlLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJtYWluX2J1dHRvbl9jbGlja1wiOlxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5tYWluX2J1dHRvbl9jbGljaywgZmFsc2UsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcImJ1dHRvbl9leGl0XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdCh0aGlzLmJ1dHRvbl9leGl0LCBmYWxzZSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwidW5fY2xpY2tcIjpcclxuICAgICAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMudW5fY2xpY2ssIGZhbHNlLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJsZXZlbF91cFwiOlxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5sZXZlbF91cCwgZmFsc2UsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcImFkZF9leFwiOlxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5hZGRfZXgsIGZhbHNlLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJhZGRfZ29sZFwiOlxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5hZGRfZ29sZCwgZmFsc2UsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcImN1dF9vdmVyXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdCh0aGlzLmN1dF9vdmVyLCBmYWxzZSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgaW5pX25vZGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5zZXRNdXNpY1ZvbHVtZSgwLjMpO1xyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnNldEVmZmVjdHNWb2x1bWUoMC40KTtcclxuICAgIH0sXHJcbiAgICBvbkxvYWQoKSB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pO1xyXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ui/gift_ui.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2194dh97IxH3rmm+IE2GOoB', 'gift_ui');
// script/ui/gift_ui.js

"use strict";

var user_data = require("user_data");

cc.Class({
  "extends": cc.Component,
  properties: {
    center_node: cc.Node,
    exit_button_node: cc.Node,
    introduce_label: cc.Label
  },
  // LIFE-CYCLE CALLBACKS:
  ini_node: function ini_node() {
    var _this = this;

    this.ad_control = cc.find("ad_control").getComponent("ad_control");
    this.adsManager_js = cc.find("UI_ROOT").getComponent("AdsManager");
    this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
    this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
    this.sound_control = cc.find("sound_control").getComponent("sound_control");
    this.ad_control.show_bannerAd();
    this.center_node.scale = 0;
    this.exit_button_node.active = false;

    if (user_data.user_data.level < 15) {
      this.introduce_label.string = "Watch short commercials, \nlevel+1";
    } else {
      this.introduce_label.string = "Watch short commercials and \ngain half-level experience";
    }

    ;
    cc.tween(this.center_node).to(0.3, {
      scale: 1
    }, {
      easing: "elasticOut"
    }).call(function () {
      _this.scheduleOnce(function () {
        _this.exit_button_node.active = true;
      }, 1.5);
    }).start();
  },
  //我要看视频按钮被点击
  on_i_wanner_ad_button_click: function on_i_wanner_ad_button_click() {
    var _this2 = this;

    this.sound_control.play_sound_effect("button_click");
    this.adsManager_js.showRewardedVideo(function () {
      if (user_data.user_data.level > 15) {
        _this2.game_rules_js.add_ex(user_data.user_data.level);

        _this2.game_scene_js.create_tips_ui(_this2.game_scene_js.node, "gift_ad_ex");
      } else {
        user_data.user_data.level++;
        user_data.user_data.now_ex = 0;
        user_data.user_data.skill_point++;

        _this2.game_rules_js.set_ex_progress();

        _this2.game_scene_js.create_tips_ui(_this2.game_scene_js.node, "gift_ad_level");
      }

      ;

      _this2.ad_control.hide_bannerAd();

      _this2.unschedule(callback);

      _this2.node.destroy();
    });
  },
  //exit button
  on_exit_button_click: function on_exit_button_click() {
    this.sound_control.play_sound_effect("button_exit");
    this.ad_control.hide_bannerAd();
    this.node.destroy();
  },
  //检测视频是否播放成功
  video_succes: function video_succes() {
    if (typeof wx != "undefined") {
      var callback = function callback() {
        if (this.ad_control.video_state == 1 && this.ad_control.video_tag == "gift_ad") {
          this.ad_control.video_tag = null;
          this.ad_control.video_state = 2;

          if (user_data.user_data.level > 15) {
            this.game_rules_js.add_ex(user_data.user_data.level);
            this.game_scene_js.create_tips_ui(this.game_scene_js.node, "gift_ad_ex");
          } else {
            user_data.user_data.level++;
            user_data.user_data.now_ex = 0;
            user_data.user_data.skill_point++;
            this.game_rules_js.set_ex_progress();
            this.game_scene_js.create_tips_ui(this.game_scene_js.node, "gift_ad_level");
          }

          ;
          this.ad_control.hide_bannerAd();
          this.unschedule(callback);
          this.node.destroy();
        } else {
          if (this.ad_control.video_tag == null && this.ad_control.video_state == 2) {
            this.unschedule(callback);
          }

          ;
        }

        ;
      };

      this.schedule(callback, 0.2);
    }

    ;
  },
  // onLoad () {},
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcZ2lmdF91aS5qcyJdLCJuYW1lcyI6WyJ1c2VyX2RhdGEiLCJyZXF1aXJlIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJjZW50ZXJfbm9kZSIsIk5vZGUiLCJleGl0X2J1dHRvbl9ub2RlIiwiaW50cm9kdWNlX2xhYmVsIiwiTGFiZWwiLCJpbmlfbm9kZSIsImFkX2NvbnRyb2wiLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwiYWRzTWFuYWdlcl9qcyIsImdhbWVfc2NlbmVfanMiLCJnYW1lX3J1bGVzX2pzIiwic291bmRfY29udHJvbCIsInNob3dfYmFubmVyQWQiLCJzY2FsZSIsImFjdGl2ZSIsImxldmVsIiwic3RyaW5nIiwidHdlZW4iLCJ0byIsImVhc2luZyIsImNhbGwiLCJzY2hlZHVsZU9uY2UiLCJzdGFydCIsIm9uX2lfd2FubmVyX2FkX2J1dHRvbl9jbGljayIsInBsYXlfc291bmRfZWZmZWN0Iiwic2hvd1Jld2FyZGVkVmlkZW8iLCJhZGRfZXgiLCJjcmVhdGVfdGlwc191aSIsIm5vZGUiLCJub3dfZXgiLCJza2lsbF9wb2ludCIsInNldF9leF9wcm9ncmVzcyIsImhpZGVfYmFubmVyQWQiLCJ1bnNjaGVkdWxlIiwiY2FsbGJhY2siLCJkZXN0cm95Iiwib25fZXhpdF9idXR0b25fY2xpY2siLCJ2aWRlb19zdWNjZXMiLCJ3eCIsInZpZGVvX3N0YXRlIiwidmlkZW9fdGFnIiwic2NoZWR1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsU0FBUyxHQUFHQyxPQUFPLENBQUMsV0FBRCxDQUF2Qjs7QUFDQUMsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFdBQVcsRUFBRUosRUFBRSxDQUFDSyxJQURSO0FBRVJDLElBQUFBLGdCQUFnQixFQUFFTixFQUFFLENB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Q0FBbUJxQixlQUFuQjtBQUNBLGlCQUFLdEIsYUFBTCxDQUFtQmtCLGNBQW5CLENBQWtDLEtBQUtsQixhQUFMLENBQW1CbUIsSUFBckQsRUFBMkQsZUFBM0Q7QUFDSDs7QUFBQTtBQUNELGVBQUt2QixVQUFMLENBQWdCMkIsYUFBaEI7QUFDQSxlQUFLQyxVQUFMLENBQWdCQyxRQUFoQjtBQUNBLGVBQUtOLElBQUwsQ0FBVU8sT0FBVjtBQUNILFNBaEJELE1BZ0JPO0FBQ0gsY0FBSSxLQUFLOUIsVUFBTCxDQUFnQm1DLFNBQWhCLElBQTZCLElBQTdCLElBQXFDLEtBQUtuQyxVQUFMLENBQWdCa0MsV0FBaEIsSUFBK0IsQ0FBeEUsRUFBMkU7QUFDdkUsaUJBQUtOLFVBQUwsQ0FBZ0JDLFFBQWhCO0FBQ0g7O0FBQUE7QUFDSjs7QUFBQTtBQUNKLE9BdEJEOztBQXVCQSxXQUFLTyxRQUFMLENBQWNQLFFBQWQsRUFBd0IsR0FBeEI7QUFDSDs7QUFBQTtBQUNKLEdBdEZJO0FBdUZMO0FBRUFaLEVBQUFBLEtBekZLLG1CQXlGRyxDQUVQLENBM0ZJLENBNkZMOztBQTdGSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgdXNlcl9kYXRhID0gcmVxdWlyZShcInVzZXJfZGF0YVwiKTtcclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBjZW50ZXJfbm9kZTogY2MuTm9kZSxcclxuICAgICAgICBleGl0X2J1dHRvbl9ub2RlOiBjYy5Ob2RlLFxyXG4gICAgICAgIGludHJvZHVjZV9sYWJlbDogY2MuTGFiZWwsXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG4gICAgaW5pX25vZGUoKSB7XHJcbiAgICAgICAgdGhpcy5hZF9jb250cm9sID0gY2MuZmluZChcImFkX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwiYWRfY29udHJvbFwiKTtcclxuICAgICAgICB0aGlzLmFkc01hbmFnZXJfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJBZHNNYW5hZ2VyXCIpO1xyXG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfc2NlbmVcIik7XHJcbiAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9ydWxlc1wiKTtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wgPSBjYy5maW5kKFwic291bmRfY29udHJvbFwiKS5nZXRDb21wb25lbnQoXCJzb3VuZF9jb250cm9sXCIpO1xyXG4gICAgICAgIHRoaXMuYWRfY29udHJvbC5zaG93X2Jhbm5lckFkKCk7XHJcbiAgICAgICAgdGhpcy5jZW50ZXJfbm9kZS5zY2FsZSA9IDA7XHJcbiAgICAgICAgdGhpcy5leGl0X2J1dHRvbl9ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmxldmVsIDwgMTUpIHtcclxuICAgICAgICAgICAgdGhpcy5pbnRyb2R1Y2VfbGFiZWwuc3RyaW5nID0gXCJXYXRjaCBzaG9ydCBjb21tZXJjaWFscywgXFxubGV2ZWwrMVwiO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW50cm9kdWNlX2xhYmVsLnN0cmluZyA9IFwiV2F0Y2ggc2hvcnQgY29tbWVyY2lhbHMgYW5kIFxcbmdhaW4gaGFsZi1sZXZlbCBleHBlcmllbmNlXCI7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjYy50d2Vlbih0aGlzLmNlbnRlcl9ub2RlKVxyXG4gICAgICAgICAgICAudG8oMC4zLCB7IHNjYWxlOiAxIH0sIHsgZWFzaW5nOiBcImVsYXN0aWNPdXRcIiB9KVxyXG4gICAgICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5leGl0X2J1dHRvbl9ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9LCAxLjUpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zdGFydCgpO1xyXG4gICAgfSxcclxuICAgIC8v5oiR6KaB55yL6KeG6aKR5oyJ6ZKu6KKr54K55Ye7XHJcbiAgICBvbl9pX3dhbm5lcl9hZF9idXR0b25fY2xpY2soKSB7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xyXG4gICAgICAgIHRoaXMuYWRzTWFuYWdlcl9qcy5zaG93UmV3YXJkZWRWaWRlbygoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmxldmVsID4gMTUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcy5hZGRfZXgodXNlcl9kYXRhLnVzZXJfZGF0YS5sZXZlbCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIFwiZ2lmdF9hZF9leFwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubGV2ZWwrKztcclxuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubm93X2V4ID0gMDtcclxuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxfcG9pbnQrKztcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcy5zZXRfZXhfcHJvZ3Jlc3MoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfc2NlbmVfanMubm9kZSwgXCJnaWZ0X2FkX2xldmVsXCIpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLmFkX2NvbnRyb2wuaGlkZV9iYW5uZXJBZCgpO1xyXG4gICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUoY2FsbGJhY2spO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8vZXhpdCBidXR0b25cclxuICAgIG9uX2V4aXRfYnV0dG9uX2NsaWNrKCkge1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9leGl0XCIpO1xyXG4gICAgICAgIHRoaXMuYWRfY29udHJvbC5oaWRlX2Jhbm5lckFkKCk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcclxuICAgIH0sXHJcbiAgICAvL+ajgOa1i+inhumikeaYr+WQpuaSreaUvuaIkOWKn1xyXG4gICAgdmlkZW9fc3VjY2VzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiAod3gpICE9IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWRfY29udHJvbC52aWRlb19zdGF0ZSA9PSAxICYmIHRoaXMuYWRfY29udHJvbC52aWRlb190YWcgPT0gXCJnaWZ0X2FkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkX2NvbnRyb2wudmlkZW9fdGFnID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkX2NvbnRyb2wudmlkZW9fc3RhdGUgPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmxldmVsID4gMTUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLmFkZF9leCh1c2VyX2RhdGEudXNlcl9kYXRhLmxldmVsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9zY2VuZV9qcy5ub2RlLCBcImdpZnRfYWRfZXhcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5sZXZlbCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLm5vd19leCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxfcG9pbnQrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLnNldF9leF9wcm9ncmVzcygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIFwiZ2lmdF9hZF9sZXZlbFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRfY29udHJvbC5oaWRlX2Jhbm5lckFkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKGNhbGxiYWNrKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hZF9jb250cm9sLnZpZGVvX3RhZyA9PSBudWxsICYmIHRoaXMuYWRfY29udHJvbC52aWRlb19zdGF0ZSA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZShjYWxsYmFjayk7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUoY2FsbGJhY2ssIDAuMik7XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvLyBvbkxvYWQgKCkge30sXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcclxufSk7XHJcbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/fx.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '01580vcKa1JvoSvyU9rdlxm', 'fx');
// script/fx.js

"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _user_data = _interopRequireDefault(require("user_data"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  //更新存档
  mergeJSON: function mergeJSON(n, o) {
    var oType = Object.prototype.toString.call(o);
    var nType = Object.prototype.toString.call(n);

    if (nType == '[object Object]' && oType == '[object Object]') {
      //合并属性(object)
      for (var p in n) {
        if (n.hasOwnProperty(p) && !o.hasOwnProperty(p)) {
          //新的有，旧的没有
          o[p] = n[p];
        } else if (n.hasOwnProperty(p) && o.hasOwnProperty(p)) {
          //两者都有
          var oPType = Object.prototype.toString.call(o[p]);
          var nPType = Object.prototype.toString.call(n[p]);

          if (nPType == '[object Object]' && oPType == '[object Object]' || nPType == '[object Array]' && oPType == '[object Array]') {
            this.mergeJSON(n[p], o[p]);
          }
        }

        ;
      }
    } else if (nType == '[object Array]' && oType == '[object Array]') {
      //合并属性(array)
      for (var i in n) {
        var oIType = Object.prototype.toString.call(o[i]);
        var nIType = Object.prototype.toString.call(n[i]);

        if (nIType == '[object Object]' && oIType == '[object Object]' || nIType == '[object Array]' && oIType == '[object Array]') {
          this.mergeJSON(n[i], o[i]);
        }
      }
    }

    ; //合并属性(other)

    n = o;
    return n;
  },
  //刷新数据
  updata_user_data: function updata_user_data(local_user_data) {
    //合并对象，源对象合并到目标对象
    //Object.assign(target,sources)
    var now_ud = this.mergeJSON(_user_data["default"].user_data, local_user_data);
    Object.assign(_user_data["default"].user_data, now_ud);
    cc.log(_user_data["default"].user_data, "user_data");
  },
  //读取本地数据
  load: function load() {
    try {
      // var local_user_data = JSON.parse(cc.sys.localStorage.getItem('user_data'));
      var local_user_data = null;

      if (local_user_data !== null) {
        this.updata_user_data(local_user_data);
        cc.log("load successfull");
      } else {
        this.save(); //否则就初始化
      }

      ;
    } catch (err) {
      this.save();
      cc.log("error load exception5");
      cc.log(err);
    }
  },
  //将缓存数据写入到本地中
  save: function save() {
    var cache_user_data = _user_data["default"].user_data;
    this.remove_all();
    cc.sys.localStorage.setItem('user_data', JSON.stringify(cache_user_data)); // cc.log("已存档");
    // cc.log(JSON.stringify(user_data));
  },
  //清除所有数据
  remove_all: function remove_all() {
    cc.sys.localStorage.removeItem('user_data'); // cc.log("清除本地所有数据");
  }
};
exports["default"] = _default;
module.exports = exports["default"];

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxmeC5qcyJdLCJuYW1lcyI6WyJtZXJnZUpTT04iLCJuIiwibyIsIm9UeXBlIiwiT2JqZWN0IiwicHJvdG90eXBlIiwidG9TdHJpbmciLCJjYWxsIiwiblR5cGUiLCJwIiwiaGFzT3duUHJvcGVydHkiLCJvUFR5cGUiLCJuUFR5cGUiLCJpIiwib0lUeXBlIiwibklUeXBlIiwidXBkYXRhX3VzZXJfZGF0YSIsImxvY2FsX3VzZXJfZGF0YSIsIm5vd191ZCIsInVzZXJfZGF0YSIsImFzc2lnbiIsImNjIiwibG9nIiwibG9hZCIsInNhdmUiLCJlcnIiLCJjYWNoZV91c2VyX2RhdGEiLCJyZW1vdmVfYWxsIiwic3lzIiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJyZW1vdmVJdGVtIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O2VBQ2U7QUFDWDtBQUNBQSxFQUFBQSxTQUZXLHFCQUVEQyxDQUZDLEVBRUVDLENBRkYsRUFFSztBQUNaLFFBQUlDLEtBQUssR0FBR0MsTUFBTSxDQUFDQyxTQUFQLENBQWlCQyxRQUFqQixDQUEwQkMsSUFBMUIsQ0FBK0JMLENBQS9CLENBQVo7QUFDQSxRQUFJTSxLQUFLLEdBQUdKLE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQkMsUUFBakIsQ0FBMEJDLElBQTFCLENBQStCTixDQUEvQixDQUFaOztBQUNBLFFBQUlPLEtBQUssSUFBSSxpQkFBVCxJQUE4QkwsS0FBSyxJQUFJLGlCQUEzQyxFQUE4RDtBQUMxRDtBQUNBLFdBQUssSUFBSU0sQ0FBVCxJQUFjUixDQUFkLEVBQWlCO0FBQ2IsWUFBSUEsQ0FBQyxDQUFDUyxjQUFGLENBQWlCRCxDQUFqQixLQUF1QixDQUFDUCxDQUFDLENBQUNRLGNBQUYsQ0FBaUJELENBQWpCLENBQTVCLEVBQWlEO0FBQzdDO0FBQ0FQLFVBQUFBLENBQUMsQ0FBQ08sQ0FBRCxDQUFELEdBQU9SLENBQUMsQ0FBQ1EsQ0FB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TDtBQUNBTixJQUFBQSxFQUFFLENBQUNPLEdBQUgsQ0FBT0MsWUFBUCxDQUFvQkMsT0FBcEIsQ0FBNEIsV0FBNUIsRUFBeUNDLElBQUksQ0FBQ0MsU0FBTCxDQUFlTixlQUFmLENBQXpDLEVBSGMsQ0FJZDtBQUNBO0FBQ0gsR0FuRVU7QUFvRVg7QUFDQUMsRUFBQUEsVUFBVSxFQUFFLHNCQUFZO0FBQ3BCTixJQUFBQSxFQUFFLENBQUNPLEdBQUgsQ0FBT0MsWUFBUCxDQUFvQkksVUFBcEIsQ0FBK0IsV0FBL0IsRUFEb0IsQ0FFcEI7QUFDSDtBQXhFVSIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHVzZXJfZGF0YSBmcm9tIFwidXNlcl9kYXRhXCI7XHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIC8v5pu05paw5a2Y5qGjXHJcbiAgICBtZXJnZUpTT04obiwgbykge1xyXG4gICAgICAgIGxldCBvVHlwZSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKTtcclxuICAgICAgICBsZXQgblR5cGUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobik7XHJcbiAgICAgICAgaWYgKG5UeXBlID09ICdbb2JqZWN0IE9iamVjdF0nICYmIG9UeXBlID09ICdbb2JqZWN0IE9iamVjdF0nKSB7XHJcbiAgICAgICAgICAgIC8v5ZCI5bm25bGe5oCnKG9iamVjdClcclxuICAgICAgICAgICAgZm9yIChsZXQgcCBpbiBuKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobi5oYXNPd25Qcm9wZXJ0eShwKSAmJiAhby5oYXNPd25Qcm9wZXJ0eShwKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5paw55qE5pyJ77yM5pen55qE5rKh5pyJXHJcbiAgICAgICAgICAgICAgICAgICAgb1twXSA9IG5bcF07XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG4uaGFzT3duUHJvcGVydHkocCkgJiYgKG8uaGFzT3duUHJvcGVydHkocCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/kuKTogIXpg73mnIlcclxuICAgICAgICAgICAgICAgICAgICBsZXQgb1BUeXBlID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9bcF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuUFR5cGUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobltwXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKChuUFR5cGUgPT0gJ1tvYmplY3QgT2JqZWN0XScgJiYgb1BUeXBlID09ICdbb2JqZWN0IE9iamVjdF0nKSB8fCAoblBUeXBlID09ICdbb2JqZWN0IEFycmF5XScgJiYgb1BUeXBlID09ICdbb2JqZWN0IEFycmF5XScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWVyZ2VKU09OKG5bcF0sIG9bcF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKG5UeXBlID09ICdbb2JqZWN0IEFycmF5XScgJiYgb1R5cGUgPT0gJ1tvYmplY3QgQXJyYXldJykge1xyXG4gICAgICAgICAgICAvL+WQiOW5tuWxnuaApyhhcnJheSlcclxuICAgICAgICAgICAgZm9yIChsZXQgaSBpbiBuKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgb0lUeXBlID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9baV0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5JVHlwZSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChuW2ldKTtcclxuICAgICAgICAgICAgICAgIGlmICgobklUeXBlID09ICdbb2JqZWN0IE9iamVjdF0nICYmIG9JVHlwZSA9PSAnW29iamVjdCBPYmplY3RdJykgfHwgKG5JVHlwZSA9PSAnW29iamVjdCBBcnJheV0nICYmIG9JVHlwZSA9PSAnW29iamVjdCBBcnJheV0nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWVyZ2VKU09OKG5baV0sIG9baV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvL+WQiOW5tuWxnuaApyhvdGhlcilcclxuICAgICAgICBuID0gbztcclxuICAgICAgICByZXR1cm4gbjtcclxuICAgIH0sXHJcbiAgICAvL+WIt+aWsOaVsOaNrlxyXG4gICAgdXBkYXRhX3VzZXJfZGF0YTogZnVuY3Rpb24gKGxvY2FsX3VzZXJfZGF0YSkge1xyXG4gICAgICAgIC8v5ZCI5bm25a+56LGh77yM5rqQ5a+56LGh5ZCI5bm25Yiw55uu5qCH5a+56LGhXHJcbiAgICAgICAgLy9PYmplY3QuYXNzaWduKHRhcmdldCxzb3VyY2VzKVxyXG4gICAgICAgIHZhciBub3dfdWQgPSB0aGlzLm1lcmdlSlNPTih1c2VyX2RhdGEudXNlcl9kYXRhLCBsb2NhbF91c2VyX2RhdGEpO1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24odXNlcl9kYXRhLnVzZXJfZGF0YSwgbm93X3VkKVxyXG4gICAgICAgIGNjLmxvZyh1c2VyX2RhdGEudXNlcl9kYXRhLCBcInVzZXJfZGF0YVwiKTtcclxuICAgIH0sXHJcbiAgICAvL+ivu+WPluacrOWcsOaVsOaNrlxyXG4gICAgbG9hZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIHZhciBsb2NhbF91c2VyX2RhdGEgPSBKU09OLnBhcnNlKGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlcl9kYXRhJykpO1xyXG4gICAgICAgICAgICB2YXIgbG9jYWxfdXNlcl9kYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgaWYgKGxvY2FsX3VzZXJfZGF0YSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGFfdXNlcl9kYXRhKGxvY2FsX3VzZXJfZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2coXCJsb2FkIHN1Y2Nlc3NmdWxsXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zYXZlKCk7XHJcbiAgICAgICAgICAgICAgICAvL+WQpuWImeWwseWIneWni+WMllxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICB0aGlzLnNhdmUoKTtcclxuICAgICAgICAgICAgY2MubG9nKFwiZXJyb3IgbG9hZCBleGNlcHRpb241XCIpO1xyXG4gICAgICAgICAgICBjYy5sb2coZXJyKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy/lsIbnvJPlrZjmlbDmja7lhpnlhaXliLDmnKzlnLDkuK1cclxuICAgIHNhdmU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgY2FjaGVfdXNlcl9kYXRhID0gdXNlcl9kYXRhLnVzZXJfZGF0YTtcclxuICAgICAgICB0aGlzLnJlbW92ZV9hbGwoKTtcclxuICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3VzZXJfZGF0YScsIEpTT04uc3RyaW5naWZ5KGNhY2hlX3VzZXJfZGF0YSkpO1xyXG4gICAgICAgIC8vIGNjLmxvZyhcIuW3suWtmOaho1wiKTtcclxuICAgICAgICAvLyBjYy5sb2coSlNPTi5zdHJpbmdpZnkodXNlcl9kYXRhKSk7XHJcbiAgICB9LFxyXG4gICAgLy/muIXpmaTmiYDmnInmlbDmja5cclxuICAgIHJlbW92ZV9hbGw6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3VzZXJfZGF0YScpO1xyXG4gICAgICAgIC8vIGNjLmxvZyhcIua4hemZpOacrOWcsOaJgOacieaVsOaNrlwiKTtcclxuICAgIH0sXHJcblxyXG59O1xyXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/loading_scene.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ac98ekBv0VCKIJHx370J0V8', 'loading_scene');
// script/loading_scene.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    loadingBar: {
      type: cc.ProgressBar,
      "default": null
    },
    work_label: {
      type: cc.Label,
      "default": null
    },
    progress_label: cc.Label,
    center_node: cc.Node
  },
  //加载成功
  load_Succes: function load_Succes() {
    cc.tween(this.center_node).to(0.5, {
      opacity: 0
    }, {
      easing: "sineOut"
    }).call(function () {
      cc.director.loadScene("game_scene");
    }).start();
  },
  ini_node: function ini_node() {
    this.loadingBar.progress = 0;
    this.on_load_progress();
  },
  //加载进度条
  on_load_progress: function on_load_progress() {
    var self = this;
    cc.director.preloadScene("game_scene", function (completedCount, totalCount, item) {
      if (completedCount / totalCount > self.loadingBar.progress) {
        self.loadingBar.progress = completedCount / totalCount;
        self.progress_label.string = parseInt(completedCount / totalCount * 100) + "%";
      }

      ; // self.loadingBar.width = 350* (completedCount/totalCount);
    }, function (error, asset) {
      if (error) {
        cc.log("加载失败");
        return;
      } else {
        self.load_Succes();
        cc.log("加载成功");
      }

      ;
    });
  },
  //重新加载游戏
  rest_load_game: function rest_load_game(dt) {
    this.time += dt;

    if (this.time >= 15) {
      this.time = 0;
      this.rest_count++;
      this.work_label.string = "正在尝试重新加载...";

      if (this.rest_count >= 2) {
        this.progress_label.node.active = false;
        this.work_label.string = "由于网络波动加载失败，请清除缓存后重新进入~o(╥﹏╥)o~";
      }

      ;
      this.ini_node();
    }
  },
  onLoad: function onLoad() {
    this.time = 0;
    this.rest_count = 0;
    this.ini_node();
  },
  start: function start() {},
  update: function update(dt) {
    this.rest_load_game(dt);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxsb2FkaW5nX3NjZW5lLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwibG9hZGluZ0JhciIsInR5cGUiLCJQcm9ncmVzc0JhciIsIndvcmtfbGFiZWwiLCJMYWJlbCIsInByb2dyZXNzX2xhYmVsIiwiY2VudGVyX25vZGUiLCJOb2RlIiwibG9hZF9TdWNjZXMiLCJ0d2VlbiIsInRvIiwib3BhY2l0eSIsImVhc2luZyIsImNhbGwiLCJkaXJlY3RvciIsImxvYWRTY2VuZSIsInN0YXJ0IiwiaW5pX25vZGUiLCJwcm9ncmVzcyIsIm9uX2xvYWRfcHJvZ3Jlc3MiLCJzZWxmIiwicHJlbG9hZFNjZW5lIiwiY29tcGxldGVkQ291bnQiLCJ0b3RhbENvdW50IiwiaXRlbSIsInN0cmluZyIsInBhcnNlSW50IiwiZXJyb3IiLCJhc3NldCIsImxvZyIsInJlc3RfbG9hZF9nYW1lIiwiZHQiLCJ0aW1lIiwicmVzdF9jb3VudCIsIm5vZGUiLCJhY3RpdmUiLCJvbkxvYWQiLCJ1cGRhdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBRUxDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxVQUFVLEVBQUU7QUFDUkMsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNLFdBREQ7QUFFUixpQkFBUztBQUZELEtBREo7QUFLUkMsSUFBQUEsVUFBVSxFQUFFO0FBQ1JGLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDUSxLQUREO0FBRVIsaUJBQVM7QUFGRCxLQUxKO0FBU1JDLElBQUFBLGNBQWMsRUFBRVQsRUFBRSxDQUFDUSxLQVRYO0FBVVJFLElBQUFBLFdBQVcsRUFBRVYsRUFBRSxDQUFDVztBQVZSLEdBRlA7QUFlTDtBQUNBQyxFQUFBQSxXQUFXLEVBQUUsdUJBQVk7QUFDckJaLElBQUFBLEVBQUUsQ0FBQ2EsS0FBSCxDQUFTLEtBQUtILFdBQWQsRUFDS0ksRUFETCxDQUNRLEdBRFIsRUFDYTtBQUFFQyxNQUFBQSxPQUFPLEVBQUU7QUFBWCxLQURiLEVBQzZCO0FBQUVDLE1BQUFBLE1BQU0sRUFBRTtBQUFWLEtBRDdCLEVBRUtDLElBRkwsQ0FFVSxZQUFNO0FBQ1JqQixNQUFBQSxFQUFFLENBQUNrQixRQUFILENBQVlDLFNBQVosQ0FBc0IsWUFBdEI7QUFDSCxLQUpMLEVBS0tDLEtBTEw7QUFNSCxHQXZCSTtBQXlCTEMsRUFBQUEsUUFBUSxFQUFFLG9CQUFZO0FBQ2xCLFNBQUtqQixVQUFMLENBQWdCa0IsUUFBaEIsR0FBMkIsQ0FBM0I7QUFDQSxTQUFLQyxnQkFBTDtBQUNILEdBNUJJO0FBNkJMO0FBQ0FBLEVBQUFBLGdCQUFnQixFQUFFLDRCQUFZO0FBQzFCLFFBQUlDLElBQUksR0FBRyxJQUFYO0FBQ0F4QixJQUFBQSxFQUFFLENBQUNrQixRQUFILENBQVlPLFlBQVosQ0FBeUIsWUFBekIsRUFBdUMsVUFBQ0MsY0FBRCxFQUFpQkMsVUFBakIsRUFBNkJDLElBQTdCLEVBQXNDO0FBQ3pFLFVBQUlGLGNBQWMsR0FBR0MsVUFBakIsR0FBOEJILElBQUksQ0FBQ3BCLFVBQUwsQ0FBZ0JrQixRQUFsRCxFQUE0RDtBQUN4REUsUUFBQUEsSUFBSSxDQUFDcEIsVUFBTCxDQUFnQmtCLFFBQWhCLEdBQTJCSSxjQUFjLEdBQUdDLFVBQTVDO0FBQ0FILFFBQUFBLElBQUksQ0FBQ2YsY0FBTCxDQUFvQm9CLE1BQXBCLEdBQTZCQyxRQUFRLENBQUVKLGNBQWMsR0FBR0MsVUFBbEIsR0FBZ0MsR0FBakMsQ0FBUixHQUFnRCxHQUE3RTtBQUVIOztBQUFBLE9BTHdFLENBTXpFO0FBQ0gsS0FQRCxFQU9HLFVBQVVJLEtBQVYsRUFBaUJDLEtBQWpCLEVBQXdCO0FBQ3ZCLFVBQUlELEtBQUosRUFBVztBQUNQL0IsUUFBQUEsRUFBRSxDQUFDaUMsR0FBSCxDQUFPLE1BQVA7QUFDQTtBQUNILE9BSEQsTUFHTztBQUNIVCxRQUFBQSxJQUFJLENBQUNaLFdBQUw7QUFDQVosUUFBQUEsRUFBRSxDQUFDaUMsR0FBSCxDQUFPLE1BQVA7QUFDSDs7QUFBQTtBQUNKLEtBZkQ7QUFnQkgsR0FoREk7QUFrREw7QUFDQUMsRUFBQUEsY0FBYyxFQUFFLHdCQUFVQyxFQUFWLEVBQWM7QUFDMUIsU0FBS0MsSUFBTCxJQUFhRCxFQUFiOztBQUNBLFFBQUksS0FBS0MsSUFBTCxJQUFhLEVBQWpCLEVBQXFCO0FBQ2pCLFdBQUtBLElBQUwsR0FBWSxDQUFaO0FBQ0EsV0FBS0MsVUFBTDtBQUNBLFdBQUs5QixVQUFMLENBQWdCc0IsTUFBaEIsR0FBeUIsYUFBekI7O0FBQ0EsVUFBSSxLQUFLUSxVQUFMLElBQW1CLENBQXZCLEVBQTBCO0FBQ3RCLGFBQUs1QixjQUFMLENBQW9CNkIsSUFBcEIsQ0FBeUJDLE1BQXpCLEdBQWtDLEtBQWxDO0FBQ0EsYUFBS2hDLFVBQUwsQ0FBZ0JzQixNQUFoQixHQUF5QixnQ0FBekI7QUFDSDs7QUFBQTtBQUNELFdBQUtSLFFBQUw7QUFDSDtBQUNKLEdBL0RJO0FBZ0VMbUIsRUFBQUEsTUFoRUssb0JBZ0VJO0FBQ0wsU0FBS0osSUFBTCxHQUFZLENBQVo7QUFDQSxTQUFLQyxVQUFMLEdBQWtCLENBQWxCO0FBQ0EsU0FBS2hCLFFBQUw7QUFDSCxHQXBFSTtBQXNFTEQsRUFBQUEsS0F0RUssbUJBc0VHLENBRVAsQ0F4RUk7QUEwRUxxQixFQUFBQSxNQTFFSyxrQkEwRUVOLEVBMUVGLEVBMEVNO0FBQ1AsU0FBS0QsY0FBTCxDQUFvQkMsRUFBcEI7QUFDSDtBQTVFSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgbG9hZGluZ0Jhcjoge1xyXG4gICAgICAgICAgICB0eXBlOiBjYy5Qcm9ncmVzc0JhcixcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHdvcmtfbGFiZWw6IHtcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwcm9ncmVzc19sYWJlbDogY2MuTGFiZWwsXHJcbiAgICAgICAgY2VudGVyX25vZGU6IGNjLk5vZGUsXHJcbiAgICB9LFxyXG5cclxuICAgIC8v5Yqg6L295oiQ5YqfXHJcbiAgICBsb2FkX1N1Y2NlczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNjLnR3ZWVuKHRoaXMuY2VudGVyX25vZGUpXHJcbiAgICAgICAgICAgIC50bygwLjUsIHsgb3BhY2l0eTogMCB9LCB7IGVhc2luZzogXCJzaW5lT3V0XCIgfSlcclxuICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiZ2FtZV9zY2VuZVwiKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGluaV9ub2RlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5sb2FkaW5nQmFyLnByb2dyZXNzID0gMDtcclxuICAgICAgICB0aGlzLm9uX2xvYWRfcHJvZ3Jlc3MoKTtcclxuICAgIH0sXHJcbiAgICAvL+WKoOi9vei/m+W6puadoVxyXG4gICAgb25fbG9hZF9wcm9ncmVzczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICBjYy5kaXJlY3Rvci5wcmVsb2FkU2NlbmUoXCJnYW1lX3NjZW5lXCIsIChjb21wbGV0ZWRDb3VudCwgdG90YWxDb3VudCwgaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY29tcGxldGVkQ291bnQgLyB0b3RhbENvdW50ID4gc2VsZi5sb2FkaW5nQmFyLnByb2dyZXNzKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmxvYWRpbmdCYXIucHJvZ3Jlc3MgPSBjb21wbGV0ZWRDb3VudCAvIHRvdGFsQ291bnQ7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnByb2dyZXNzX2xhYmVsLnN0cmluZyA9IHBhcnNlSW50KChjb21wbGV0ZWRDb3VudCAvIHRvdGFsQ291bnQpICogMTAwKSArIFwiJVwiO1xyXG5cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgLy8gc2VsZi5sb2FkaW5nQmFyLndpZHRoID0gMzUwKiAoY29tcGxldGVkQ291bnQvdG90YWxDb3VudCk7XHJcbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycm9yLCBhc3NldCkge1xyXG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNjLmxvZyhcIuWKoOi9veWksei0pVwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNlbGYubG9hZF9TdWNjZXMoKTtcclxuICAgICAgICAgICAgICAgIGNjLmxvZyhcIuWKoOi9veaIkOWKn1wiKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICAvL+mHjeaWsOWKoOi9vea4uOaIj1xyXG4gICAgcmVzdF9sb2FkX2dhbWU6IGZ1bmN0aW9uIChkdCkge1xyXG4gICAgICAgIHRoaXMudGltZSArPSBkdDtcclxuICAgICAgICBpZiAodGhpcy50aW1lID49IDE1KSB7XHJcbiAgICAgICAgICAgIHRoaXMudGltZSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMucmVzdF9jb3VudCsrO1xyXG4gICAgICAgICAgICB0aGlzLndvcmtfbGFiZWwuc3RyaW5nID0gXCLmraPlnKjlsJ3or5Xph43mlrDliqDovb0uLi5cIjtcclxuICAgICAgICAgICAgaWYgKHRoaXMucmVzdF9jb3VudCA+PSAyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzX2xhYmVsLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmtfbGFiZWwuc3RyaW5nID0gXCLnlLHkuo7nvZHnu5zms6LliqjliqDovb3lpLHotKXvvIzor7fmuIXpmaTnvJPlrZjlkI7ph43mlrDov5vlhaV+byjilaXvuY/ilaUpb35cIlxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLmluaV9ub2RlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLnRpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMucmVzdF9jb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5pbmlfbm9kZSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCgpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZShkdCkge1xyXG4gICAgICAgIHRoaXMucmVzdF9sb2FkX2dhbWUoZHQpO1xyXG4gICAgfSxcclxufSk7XHJcbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ai/player_role.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b5a19zoFnJM1JpLizpjLrYq', 'player_role');
// script/ai/player_role.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    player_node: cc.Node,
    gift_node: cc.Node,
    gift_frame_arr: [cc.SpriteFrame]
  },
  // LIFE-CYCLE CALLBACKS:
  // 每隔几秒改变移动方向
  change_movement_direction: function change_movement_direction() {
    var callback = function callback() {
      this.stop_move = false;
      var num = Math.floor(Math.random() * this.all_direction.length - 1) + 1;

      if (num < 0) {
        num = 0;
      }

      ;
      this.movement_direction = this.all_direction[num];
      this.anim_select();
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

      case "z_run":
        anim.play(anim_clips[1].name);
        break;

      case "b_idle":
        anim.play(anim_clips[2].name);
        break;

      case "b_run":
        anim.play(anim_clips[3].name);
        break;

      case "c_idle":
        anim.play(anim_clips[4].name);
        break;

      case "c_run_l":
        this.node.scaleX = 1;
        anim.play(anim_clips[5].name);
        break;

      case "c_run_r":
        this.node.scaleX = -1;
        anim.play(anim_clips[5].name);
        break;
    }

    ;
  },
  //随机某个方向移动
  ai_move: function ai_move(dt) {
    //dt游戏时间
    //得到每帧的速度
    var s = this.move_speed * dt; //

    if (this.node.x <= -65 && this.stop_move == false) {
      this.stop_move = true;
      this.movement_direction = "c_run_r";
      this.anim_select();
    }

    if (this.node.x >= 65 && this.stop_move == false) {
      this.stop_move = true;
      this.movement_direction = "c_run_l";
      this.anim_select();
    }

    if (this.node.y >= 290 && this.stop_move == false) {
      this.stop_move = true;
      this.movement_direction = "z_run";
      this.anim_select();
    }

    if (this.node.y <= -529 && this.stop_move == false) {
      this.stop_move = true;
      this.movement_direction = "b_run";
      this.anim_select();
    } //几种不同的移动策略


    switch (this.movement_direction) {
      case "z_idle":
        s = 0;
        break;

      case "z_run":
        this.node.y -= s;
        break;

      case "b_idle":
        s = 0;
        break;

      case "b_run":
        this.node.y += s;
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
  //按钮被点击
  on_gift_button_click: function on_gift_button_click() {
    this.sound_control.play_sound_effect("button_click");
    var random_ex = Math.floor(Math.random() * 10) + 1; //最大值为6

    if (random_ex > 6) {
      random_ex = 6;
    }

    ;

    switch (this.gift_type) {
      case "ex":
        for (var i = 0; i < random_ex; i++) {
          this.game_scene_js.create_ex_effect(this.gift_node, i);
        }

        ;
        this.gift_type = null;
        this.gift_node.active = false;
        break;

      case "ad":
        this.gift_type = null;
        this.gift_node.active = false;
        this.game_scene_js.create_gift_ui(this.game_scene_js.node);
        break;
    }

    ;
  },
  ini_node: function ini_node() {
    this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
    this.sound_control = cc.find("sound_control").getComponent("sound_control");
    this.all_direction = ["z_idle", "z_run", "b_idle", "b_run", "c_idle", "c_run_l", "c_run_r"];
    this.movement_direction = "z_idle"; //小人的移动速度

    this.move_speed = 30;
    this.gift_node.active = false;
    this.gift_type = null; //停止移动，边缘时触发

    this.stop_move = false;
    this.create_gift();
  },
  //生成礼物
  create_gift: function create_gift() {
    var callback = function callback() {
      var random_num = Math.random();

      if (random_num > 0.5) {
        this.gift_type = "ex";
        this.gift_node.active = true;
        this.gift_node.getComponent(cc.Sprite).spriteFrame = this.gift_frame_arr[0];
      } else {
        this.gift_type = "ad";
        this.gift_node.active = true;
        this.gift_node.getComponent(cc.Sprite).spriteFrame = this.gift_frame_arr[1];
      }

      ;
      this.hide_gift();
    };

    this.schedule(callback, 30);
  },
  //隐藏礼物
  hide_gift: function hide_gift() {
    //10s后隐藏礼物
    var callback = function callback() {
      this.gift_node.active = false;
      this.gift_type = null;
    };

    this.scheduleOnce(callback, 10);
  },
  onLoad: function onLoad() {
    this.ini_node();
  },
  start: function start() {
    this.change_movement_direction();
    this.anim_select();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxhaVxccGxheWVyX3JvbGUuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJwbGF5ZXJfbm9kZSIsIk5vZGUiLCJnaWZ0X25vZGUiLCJnaWZ0X2ZyYW1lX2FyciIsIlNwcml0ZUZyYW1lIiwiY2hhbmdlX21vdmVtZW50X2RpcmVjdGlvbiIsImNhbGxiYWNrIiwic3RvcF9tb3ZlIiwibnVtIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiYWxsX2RpcmVjdGlvbiIsImxlbmd0aCIsIm1vdmVtZW50X2RpcmVjdGlvbiIsImFuaW1fc2VsZWN0Iiwic2NoZWR1bGUiLCJhbmltIiwiZ2V0Q29tcG9uZW50IiwiQW5pbWF0aW9uIiwiYW5pbV9jbGlwcyIsImdldENsaXBzIiwicGxheSIsIm5hbWUiLCJub2RlIiwic2NhbGVYIiwiYWlfbW92ZSIsImR0IiwicyIsIm1vdmVfc3BlZWQiLCJ4IiwieSIsIm9uX2dpZnRfYnV0dG9uX2NsaWNrIiwic291bmRfY29udHJvbCIsInBsYXlfc291bmRfZWZmZWN0IiwicmFuZG9tX2V4IiwiZ2lmdF90eXBlIiwiaSIsImdhbWVfc2NlbmVfanMiLCJjcmVhdGVfZXhfZWZmZWN0IiwiYWN0aXZlIiwiY3JlYXRlX2dpZnRfdWkiLCJpbmlfbm9kZSIsImZpbmQiLCJjcmVhdGVfZ2lmdCIsInJhbmRvbV9udW0iLCJTcHJpdGUiLCJzcHJpdGVGcmFtZSIsImhpZGVfZ2lmdCIsInNjaGVkdWxlT25jZSIsIm9uTG9hZCIsInN0YXJ0IiwidXBkYXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsV0FBVyxFQUFFSixFQUFFLENBQUNLLElBRFI7QUFFUkMsSUFBQUEsU0FBUyxFQUFFTixFQUFFLENBQUNL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LFdBQUtKLFNBQUwsQ0FBZXNDLE1BQWYsR0FBd0IsS0FBeEI7QUFDQSxXQUFLSixTQUFMLEdBQWlCLElBQWpCO0FBQ0gsS0FIRDs7QUFJQSxTQUFLYSxZQUFMLENBQWtCM0MsUUFBbEIsRUFBNEIsRUFBNUI7QUFDSCxHQTFLSTtBQTJLTDRDLEVBQUFBLE1BM0tLLG9CQTJLSTtBQUNMLFNBQUtSLFFBQUw7QUFDSCxHQTdLSTtBQStLTFMsRUFBQUEsS0EvS0ssbUJBK0tHO0FBQ0osU0FBSzlDLHlCQUFMO0FBQ0EsU0FBS1UsV0FBTDtBQUNILEdBbExJO0FBb0xMcUMsRUFBQUEsTUFwTEssa0JBb0xFekIsRUFwTEYsRUFvTE07QUFDUCxTQUFLRCxPQUFMLENBQWFDLEVBQWI7QUFDSDtBQXRMSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIHBsYXllcl9ub2RlOiBjYy5Ob2RlLFxyXG4gICAgICAgIGdpZnRfbm9kZTogY2MuTm9kZSxcclxuICAgICAgICBnaWZ0X2ZyYW1lX2FycjogW2NjLlNwcml0ZUZyYW1lXSxcclxuICAgIH0sXHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcbiAgICAvLyDmr4/pmpTlh6Dnp5LmlLnlj5jnp7vliqjmlrnlkJFcclxuICAgIGNoYW5nZV9tb3ZlbWVudF9kaXJlY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcF9tb3ZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHZhciBudW0gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLmFsbF9kaXJlY3Rpb24ubGVuZ3RoIC0gMSkgKyAxO1xyXG4gICAgICAgICAgICBpZiAobnVtIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgbnVtID0gMDtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlbWVudF9kaXJlY3Rpb24gPSB0aGlzLmFsbF9kaXJlY3Rpb25bbnVtXTtcclxuICAgICAgICAgICAgdGhpcy5hbmltX3NlbGVjdCgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZShjYWxsYmFjaywgTWF0aC5yYW5kb20oKSAqIDMgKyAyKTtcclxuICAgIH0sXHJcbiAgICAvL2FuaW0gc2VsZWN0XHJcbiAgICBhbmltX3NlbGVjdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBhbmltID0gdGhpcy5wbGF5ZXJfbm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcclxuICAgICAgICB2YXIgYW5pbV9jbGlwcyA9IGFuaW0uZ2V0Q2xpcHMoKTsvL+iOt+WPluWKqOeUu+WJqui+kVxyXG4gICAgICAgIHN3aXRjaCAodGhpcy5tb3ZlbWVudF9kaXJlY3Rpb24pIHtcclxuICAgICAgICAgICAgY2FzZSBcInpfaWRsZVwiOlxyXG4gICAgICAgICAgICAgICAgYW5pbS5wbGF5KGFuaW1fY2xpcHNbMF0ubmFtZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInpfcnVuXCI6XHJcbiAgICAgICAgICAgICAgICBhbmltLnBsYXkoYW5pbV9jbGlwc1sxXS5uYW1lKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYl9pZGxlXCI6XHJcbiAgICAgICAgICAgICAgICBhbmltLnBsYXkoYW5pbV9jbGlwc1syXS5uYW1lKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYl9ydW5cIjpcclxuICAgICAgICAgICAgICAgIGFuaW0ucGxheShhbmltX2NsaXBzWzNdLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJjX2lkbGVcIjpcclxuICAgICAgICAgICAgICAgIGFuaW0ucGxheShhbmltX2NsaXBzWzRdLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJjX3J1bl9sXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2NhbGVYID0gMTtcclxuICAgICAgICAgICAgICAgIGFuaW0ucGxheShhbmltX2NsaXBzWzVdLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJjX3J1bl9yXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2NhbGVYID0gLTE7XHJcbiAgICAgICAgICAgICAgICBhbmltLnBsYXkoYW5pbV9jbGlwc1s1XS5uYW1lKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLy/pmo/mnLrmn5DkuKrmlrnlkJHnp7vliqhcclxuICAgIGFpX21vdmU6IGZ1bmN0aW9uIChkdCkgeyAvL2R05ri45oiP5pe26Ze0XHJcblxyXG4gICAgICAgIC8v5b6X5Yiw5q+P5bin55qE6YCf5bqmXHJcbiAgICAgICAgdmFyIHMgPSB0aGlzLm1vdmVfc3BlZWQgKiBkdDtcclxuICAgICAgICAvL1xyXG4gICAgICAgIGlmICh0aGlzLm5vZGUueCA8PSAtNjUgJiYgdGhpcy5zdG9wX21vdmUgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgdGhpcy5zdG9wX21vdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVtZW50X2RpcmVjdGlvbiA9IFwiY19ydW5fclwiO1xyXG4gICAgICAgICAgICB0aGlzLmFuaW1fc2VsZWN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLm5vZGUueCA+PSA2NSAmJiB0aGlzLnN0b3BfbW92ZSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICB0aGlzLnN0b3BfbW92ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZW1lbnRfZGlyZWN0aW9uID0gXCJjX3J1bl9sXCI7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pbV9zZWxlY3QoKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLm5vZGUueSA+PSAyOTAgJiYgdGhpcy5zdG9wX21vdmUgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgdGhpcy5zdG9wX21vdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVtZW50X2RpcmVjdGlvbiA9IFwiel9ydW5cIjtcclxuICAgICAgICAgICAgdGhpcy5hbmltX3NlbGVjdCgpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMubm9kZS55IDw9IC01MjkgJiYgdGhpcy5zdG9wX21vdmUgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgdGhpcy5zdG9wX21vdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVtZW50X2RpcmVjdGlvbiA9IFwiYl9ydW5cIjtcclxuICAgICAgICAgICAgdGhpcy5hbmltX3NlbGVjdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/lh6Dnp43kuI3lkIznmoTnp7vliqjnrZbnlaVcclxuICAgICAgICBzd2l0Y2ggKHRoaXMubW92ZW1lbnRfZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ6X2lkbGVcIjpcclxuICAgICAgICAgICAgICAgIHMgPSAwO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ6X3J1blwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnkgLT0gcztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYl9pZGxlXCI6XHJcbiAgICAgICAgICAgICAgICBzID0gMDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYl9ydW5cIjpcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS55ICs9IHM7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImNfaWRsZVwiOlxyXG4gICAgICAgICAgICAgICAgcyA9IDA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImNfcnVuX2xcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS54IC09IHM7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImNfcnVuX3JcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS54ICs9IHM7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9O1xyXG5cclxuICAgIH0sXHJcbiAgICAvL+aMiemSruiiq+eCueWHu1xyXG4gICAgb25fZ2lmdF9idXR0b25fY2xpY2soKSB7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xyXG4gICAgICAgIHZhciByYW5kb21fZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgKyAxO1xyXG4gICAgICAgIC8v5pyA5aSn5YC85Li6NlxyXG4gICAgICAgIGlmKHJhbmRvbV9leCA+Nil7XHJcbiAgICAgICAgICAgIHJhbmRvbV9leCA9IDY7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuZ2lmdF90eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJleFwiOlxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByYW5kb21fZXg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfZXhfZWZmZWN0KHRoaXMuZ2lmdF9ub2RlLCBpKTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdpZnRfdHlwZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdpZnRfbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYWRcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2lmdF90eXBlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2lmdF9ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9naWZ0X3VpKHRoaXMuZ2FtZV9zY2VuZV9qcy5ub2RlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgaW5pX25vZGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJnYW1lX3NjZW5lXCIpO1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbCA9IGNjLmZpbmQoXCJzb3VuZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcInNvdW5kX2NvbnRyb2xcIik7XHJcbiAgICAgICAgdGhpcy5hbGxfZGlyZWN0aW9uID0gW1wiel9pZGxlXCIsIFwiel9ydW5cIiwgXCJiX2lkbGVcIiwgXCJiX3J1blwiLCBcImNfaWRsZVwiLCBcImNfcnVuX2xcIiwgXCJjX3J1bl9yXCJdO1xyXG4gICAgICAgIHRoaXMubW92ZW1lbnRfZGlyZWN0aW9uID0gXCJ6X2lkbGVcIjtcclxuICAgICAgICAvL+Wwj+S6uueahOenu+WKqOmAn+W6plxyXG4gICAgICAgIHRoaXMubW92ZV9zcGVlZCA9IDMwO1xyXG4gICAgICAgIHRoaXMuZ2lmdF9ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZ2lmdF90eXBlID0gbnVsbDtcclxuICAgICAgICAvL+WBnOatouenu+WKqO+8jOi+uee8mOaXtuinpuWPkVxyXG4gICAgICAgIHRoaXMuc3RvcF9tb3ZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVfZ2lmdCgpO1xyXG4gICAgfSxcclxuICAgIC8v55Sf5oiQ56S854mpXHJcbiAgICBjcmVhdGVfZ2lmdCgpIHtcclxuICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciByYW5kb21fbnVtID0gTWF0aC5yYW5kb20oKTtcclxuICAgICAgICAgICAgaWYgKHJhbmRvbV9udW0gPiAwLjUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2lmdF90eXBlID0gXCJleFwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5naWZ0X25vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2lmdF9ub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5naWZ0X2ZyYW1lX2FyclswXTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2lmdF90eXBlID0gXCJhZFwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5naWZ0X25vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2lmdF9ub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5naWZ0X2ZyYW1lX2FyclsxXTtcclxuXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMuaGlkZV9naWZ0KCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlKGNhbGxiYWNrLCAzMCk7XHJcbiAgICB9LFxyXG4gICAgLy/pmpDol4/npLznialcclxuICAgIGhpZGVfZ2lmdCgpIHtcclxuICAgICAgICAvLzEwc+WQjumakOiXj+ekvOeJqVxyXG4gICAgICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5naWZ0X25vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuZ2lmdF90eXBlID0gbnVsbDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGNhbGxiYWNrLCAxMCk7XHJcbiAgICB9LFxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMuaW5pX25vZGUoKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VfbW92ZW1lbnRfZGlyZWN0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5hbmltX3NlbGVjdCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGUoZHQpIHtcclxuICAgICAgICB0aGlzLmFpX21vdmUoZHQpO1xyXG4gICAgfSxcclxufSk7Il19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/game_rules.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '08dfeTU1M9Ca7/bd1L8hzMt', 'game_rules');
// script/game_rules.js

"use strict";

var _fx = _interopRequireDefault(require("fx"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var user_data = require("user_data");

var config = require("config");

var push = require("push");

cc.Class({
  "extends": cc.Component,
  properties: {
    land_prefab: cc.Prefab,
    land_group_node: cc.Node,
    center_node: cc.Node,
    gold_label: cc.Label,
    ex_label: cc.Label,
    level_label: cc.Label,
    diamond_label: cc.Label,
    gold_progress_node: cc.ProgressBar,
    ex_progress_node: cc.ProgressBar,
    player_prefab: cc.Prefab,
    staff_prefab_arr: [cc.Prefab],
    wareHouse_node: cc.Node,
    main_camera: cc.Node,
    tips_group_node: cc.Node,
    button_group_node: cc.Node,
    hotel_produce_node: cc.Node,
    videotape_button: cc.Node,
    videotape_button_arr: [cc.SpriteFrame]
  },
  //浇水按钮被点击
  on_watering_button_click: function on_watering_button_click() {
    this.sound_control.play_sound_effect("main_button_click");
    var node = this.game_scene_js.create_button_group(this.center_node);
    node.zIndex = 3;

    if (node != null) {
      node.getComponent("button_more").ini_node("watering");
    }

    ;
  },
  //耕地按钮被点击
  on_till_button_click: function on_till_button_click() {
    this.sound_control.play_sound_effect("main_button_click");
    var node = this.game_scene_js.create_button_group(this.center_node);
    node.zIndex = 3;

    if (node != null) {
      node.getComponent("button_more").ini_node("till");
    }

    ;
  },
  //学习按钮被点击
  on_study_button_click: function on_study_button_click() {
    this.sound_control.play_sound_effect("main_button_click");
    var node = this.game_scene_js.create_study_ui(this.node);

    if (node != null) {
      node.getComponent("study_ui").ini_node();
    }

    ;
  },
  //home 被点击时
  on_home_button_click: function on_home_button_click() {
    this.sound_control.play_sound_effect("button_click");
    this.game_scene_js.create_option_ui();
  },
  //宠物按钮被点击
  on_pet_button_click: function on_pet_button_click() {
    // this.sound_control.play_sound_effect("main_button_click");
    var node = this.game_scene_js.create_pet_ui(this.node);

    if (node != null) {
      node.getComponent("pet_ui").ini_node();
    }

    ;
  },
  //旅馆按钮被点击
  on_hotel_button_click: function on_hotel_button_click() {
    this.sound_control.play_sound_effect("button_click");
    this.game_scene_js.create_hotel_ui();
  },
  //雇佣员工
  on_staff_button_click: function on_staff_button_click() {
    this.sound_control.play_sound_effect("main_button_click");
    var node = this.game_scene_js.create_staff_ui(this.node);

    if (node != null) {
      node.getComponent("staff_ui").ini_node();
    }

    ;
  },
  //生成土地
  create_land: function create_land() {
    var arr = Object.keys(user_data.user_data.land);

    for (var i = 0; i < arr.length; i++) {
      var node = cc.instantiate(this.land_prefab);
      node.parent = this.land_group_node;
      node.getComponent("land").ini_node(i);
    }

    ;
  },
  //创建玩家小人
  create_player: function create_player() {
    var node = cc.instantiate(this.player_prefab);
    node.parent = this.center_node;
  },
  //创建佣人
  create_staff: function create_staff(staff_index) {
    if (staff_index == null) {
      var arr = Object.keys(user_data.user_data.staff);

      for (var i = 0; i < arr.length; i++) {
        if (user_data.user_data.staff[i].have == 1) {
          var node = cc.instantiate(this.staff_prefab_arr[i]);
          node.parent = this.land_group_node.children[i];
          node.getComponent("staff_ai").ini_node(i);
        } else {
          return;
        }

        ;
      }

      ;
    } else {
      var node = cc.instantiate(this.staff_prefab_arr[staff_index]);
      node.parent = this.land_group_node.children[staff_index];
      node.getComponent("staff_ai").ini_node(staff_index);
    }

    ;
  },
  //刷新金币数
  add_gold: function add_gold(num) {
    if (this.add_gold_anim == 0) {
      this.add_gold_anim = 1;
      var timeCount = 10;
      var gold = user_data.user_data.gold;
      var gold_max = 500 * user_data.user_data.skill["gold_max"] + 500;

      var callback = function callback() {
        var Pnum = parseInt(num / timeCount);
        timeCount--;
        this.gold_label.string = gold + Pnum + "/" + gold_max;

        if (timeCount <= 0) {
          user_data.user_data.gold += num;

          if (user_data.user_data.gold < 0) {
            user_data.user_data.gold = 0;
          }

          if (user_data.user_data.gold > gold_max) {
            this.sound_control.play_sound_effect("un_click");
            this.game_scene_js.create_tips_ui(this.node, "gold_full");
            user_data.user_data.gold = gold_max;
          }

          this.gold_label.string = user_data.user_data.gold + "/" + gold_max;
          this.unschedule(callback);
          this.set_gold_progress();
          this.add_gold_anim = 0;
        }

        ;
      };

      this.schedule(callback, 0.03);
    } else {
      user_data.user_data.gold += num;
    }

    ;
  },
  add_diamond: function add_diamond(num) {
    user_data.user_data.diamond += num;
  },
  //刷新ex数
  add_ex: function add_ex(num) {
    if (this.add_ex_anim == 0) {
      this.add_ex_anim = 1;
      var timeCount = 10;
      var ex = user_data.user_data.now_ex;
      var next_ex = 2 * user_data.user_data.level;

      var callback = function callback() {
        var Pnum = parseInt(num / timeCount);
        timeCount--;
        this.ex_label.string = ex + Pnum + "/" + next_ex;

        if (timeCount <= 0) {
          user_data.user_data.now_ex += num;

          if (user_data.user_data.now_ex > next_ex) {
            user_data.user_data.now_ex = 0;
            user_data.user_data.level++;
            user_data.user_data.skill_point++;
            this.game_scene_js.create_tips_ui(this.game_scene_js.node, "gift_ad_level"); // show notic level up
          }

          this.unschedule(callback);
          this.set_ex_progress();
          this.add_ex_anim = 0;
        }

        ;
      };

      this.schedule(callback, 0.05);
    } else {
      user_data.user_data.now_ex += num;
    }

    ;
  },
  set_gold_progress: function set_gold_progress() {
    var gold = user_data.user_data.gold;
    var gold_max = 500 * user_data.user_data.skill["gold_max"] + 500;
    this.gold_label.string = gold + "/" + gold_max;
    cc.tween(this.gold_progress_node).to(0.3, {
      progress: gold / gold_max
    }).start();
  },
  set_ex_progress: function set_ex_progress() {
    var now_ex = user_data.user_data.now_ex;
    var next_ex = 2 * user_data.user_data.level;
    this.level_label.string = user_data.user_data.level;
    this.ex_label.string = now_ex + "/" + next_ex;
    cc.tween(this.ex_progress_node).to(0.3, {
      progress: now_ex / next_ex
    }).start();
  },
  //仓库被点击
  on_wareHouse_click: function on_wareHouse_click() {
    this.sound_control.play_sound_effect("button_click");
    var node = this.game_scene_js.create_sell_ui(this.node);

    if (node != null) {
      node.getComponent("sell_ui").ini_node();
    }

    ;
  },
  //仓库已满
  wareHouse_full: function wareHouse_full() {
    //
    this.wareHouse_shcedule = function () {
      var arr = Object.keys(user_data.user_data.wareHouse);
      var all_capacity = user_data.user_data.wareHouse_level * config.wareHouse["all_capacity"];

      for (var i = 0; i < arr.length; i++) {
        if (user_data.user_data.wareHouse[i].count >= all_capacity) {
          this.wareHouse_node.getChildByName("wareHouse_full").active = true;
          return;
        } else {
          this.wareHouse_node.getChildByName("wareHouse_full").active = false;
        }

        ;
      }

      ;
    };

    this.schedule(this.wareHouse_shcedule, 0.1);
  },
  //果园被点击
  on_orchard_button_click: function on_orchard_button_click() {
    // this.sound_control.play_bg_sound("village_bg");
    this.sound_control.play_sound_effect("un_click");
    this.game_scene_js.create_tips_ui(this.node, "un_develop");
  },
  //自动存档
  auto_save: function auto_save() {
    var callback = function callback() {
      _fx["default"].save();
    };

    this.schedule(callback, 1, cc.macro.REPEAT_FOREVER);
  },
  //刷新土地
  updata_land: function updata_land(land_index) {
    //初始化土地状态
    this.land_group_node.children[land_index].getComponent("land").ini_node(land_index);
  },
  //记录上线时间
  save_login_time: function save_login_time() {
    if (user_data.user_data.login_time == 0) {
      user_data.user_data.login_time = new Date().getTime();
    }

    ;
  },
  //创建离线收益ui
  offline_profit_ui: function offline_profit_ui() {
    var login_time = user_data.user_data.login_time;
    var now_time = new Date().getTime();
    var min = Math.floor((now_time - login_time) / (1000 * 60));

    if (min >= 5) {
      this.game_scene_js.create_offline_profit_ui(this.node);
    } else {
      return;
    }

    ;
  },
  //互推按钮被点击
  // on_push_button_click: function (e, name) {
  //     if (typeof (wx) !== "undefined") {
  //         wx.navigateToMiniProgram({
  //             appId: push[name].appid,
  //             path: '',
  //             success(res) {
  //                 // 打开成功
  //             }
  //         })
  //     };
  // },
  //商店按钮被点击
  on_shop_button_click: function on_shop_button_click() {
    this.sound_control.play_sound_effect("button_click");
    this.game_scene_js.create_shop_ui();
  },
  //创建新手引导
  create_novice: function create_novice() {
    if (user_data.user_data.novice == 0) {
      this.game_scene_js.create_novice_ui();
      user_data.user_data.novice = 1;
    }

    ;
  },
  //创建按钮提示
  create_button_tips: function create_button_tips() {
    for (var i = 0; i < this.button_group_node.children.length; i++) {
      this.game_scene_js.create_button_tips(this.tips_group_node, this.button_group_node.children[i].position);
    }

    ;
    this.study_ui_tips();
    this.staff_ui_tips();
    this.shop_ui_tips();
  },
  //购买商品提示
  shop_ui_tips: function shop_ui_tips() {
    this.shop_ui_callback = function () {
      var land_arr = Object.keys(user_data.user_data.land);
      var plant_arr = Object.keys(user_data.user_data.plant);
      var gold = user_data.user_data.gold;
      var level = user_data.user_data.level;

      for (var i = 0; i < land_arr.length; i++) {
        if (gold >= config.land[i].cost && level >= config.land[i].need_level && user_data.user_data.land[i].have == 0) {
          this.tips_group_node.children[0].active = true;
          return;
        } else {
          this.tips_group_node.children[0].active = false;
        }

        ;
      }

      ;

      for (var j = 0; j < plant_arr.length; j++) {
        if (gold >= config.plant[j].cost && level >= config.plant[j].need_level && user_data.user_data.plant[j].have == 0) {
          this.tips_group_node.children[0].active = true;
          return;
        } else {
          this.tips_group_node.children[0].active = false;
        }

        ;
      }

      ;
    };

    this.schedule(this.shop_ui_callback, 1);
  },
  //加点提示
  study_ui_tips: function study_ui_tips() {
    this.stduy_tips_callback = function () {
      var skill_point = user_data.user_data.skill_point;

      if (skill_point > 0) {
        this.tips_group_node.children[1].active = true;
      } else {
        //技能点不足不提示
        this.tips_group_node.children[1].active = false;
      }

      ;
    };

    this.schedule(this.stduy_tips_callback, 1, cc.macro.REPEAT_FOREVER);
  },
  //雇佣工人提示
  staff_ui_tips: function staff_ui_tips() {
    this.staff_tips_callback = function () {
      var arr = Object.keys(user_data.user_data.staff);

      for (var i = 0; i < arr.length; i++) {
        //拥有这块土地
        if (user_data.user_data.land[i].have == 1 && user_data.user_data.gold >= config.staff[i].cost && user_data.user_data.staff[i].have == 0) {
          this.tips_group_node.children[3].active = true;
          return;
        } else {
          this.tips_group_node.children[3].active = false;
        }

        ;
      }

      ;
    };

    this.schedule(this.staff_tips_callback, 1, cc.macro.REPEAT_FOREVER);
  },
  //创建宠物
  create_pet: function create_pet() {
    var arr = Object.keys(user_data.user_data.pet);

    for (var i = 0; i < arr.length; i++) {
      if (user_data.user_data.pet[i].have == 1) {
        this.game_scene_js.create_pet(this.center_node, i);
      } else {//
      }

      ;
    }

    ;
  },
  //单个创建宠物
  create_pet_a: function create_pet_a(index) {
    this.game_scene_js.create_pet(this.center_node, index);
  },
  //=======================================================================================
  //=======================================================================================
  //领取收益
  on_get_hotel_produce_click: function on_get_hotel_produce_click(e) {
    var node = e.target;

    for (var i = 0; i < 3; i++) {
      this.game_scene_js.create_gold_effect(node, i, 0);
    }

    ;
    node.active = false;
    this.add_gold(user_data.user_data.hotel_cache_gold);
    user_data.user_data.hotel_cache_gold = 0;
  },
  //刷新旅馆收益
  update_hotel_produce: function update_hotel_produce() {
    //1s更新一次数据
    var callback = function callback() {
      var hotel_cache_gold = user_data.user_data.hotel_cache_gold;

      if (hotel_cache_gold == 0) {
        this.hotel_produce_node.active = false;
      } else {
        this.hotel_produce_node.active = true;
      }

      ;
      var label = this.hotel_produce_node.getChildByName("hotel_produce_label").getComponent(cc.Label);
      label.string = hotel_cache_gold;
    };

    this.schedule(callback, 1, cc.macro.REPEAT_FOREVER);
  },
  //购买一个房间
  hotel_buy_room: function hotel_buy_room(room_index) {
    switch (room_index) {
      case 0:
        this.hotel_0();
        break;

      case 1:
        this.hotel_1();
        break;

      case 2:
        this.hotel_2();
        break;

      case 3:
        this.hotel_3();
        break;
    }

    ;
  },
  //初始化旅馆产出
  ini_hotel_produce: function ini_hotel_produce() {
    //启动刷新收益
    this.update_hotel_produce();

    if (user_data.user_data.hotel[0].have == 1) {
      this.hotel_0();
    }

    ;

    if (user_data.user_data.hotel[1].have == 1) {
      this.hotel_1();
    }

    ;

    if (user_data.user_data.hotel[2].have == 1) {
      this.hotel_2();
    }

    ;

    if (user_data.user_data.hotel[3].have == 1) {
      this.hotel_3();
    }

    ;
  },
  //hotel0 生成
  hotel_0: function hotel_0() {
    var timeCount = 0;

    this.hotel_0_schedule = function () {
      timeCount++;

      if (timeCount >= config.hotel[0].produce_time) {
        user_data.user_data.hotel_cache_gold += config.hotel[0].produce;
        timeCount = 0;
      }

      ;
    };

    this.schedule(this.hotel_0_schedule, 1, cc.macro.REPEAT_FOREVER);
  },
  //hotel1 生成
  hotel_1: function hotel_1() {
    var timeCount = 0;

    this.hotel_1_schedule = function () {
      timeCount++;

      if (timeCount >= config.hotel[1].produce_time) {
        user_data.user_data.hotel_cache_gold += config.hotel[1].produce;
        timeCount = 0;
      }

      ;
    };

    this.schedule(this.hotel_1_schedule, 1, cc.macro.REPEAT_FOREVER);
  },
  //hotel2 生成
  hotel_2: function hotel_2() {
    var timeCount = 0;

    this.hotel_2_schedule = function () {
      timeCount++;

      if (timeCount >= config.hotel[2].produce_time) {
        user_data.user_data.hotel_cache_gold += config.hotel[2].produce;
        timeCount = 0;
      }

      ;
    };

    this.schedule(this.hotel_2_schedule, 1, cc.macro.REPEAT_FOREVER);
  },
  //hotel3 生成
  hotel_3: function hotel_3() {
    var timeCount = 0;

    this.hotel_3_schedule = function () {
      timeCount++;

      if (timeCount >= config.hotel[3].produce_time) {
        user_data.user_data.hotel_cache_gold += config.hotel[3].produce;
        timeCount = 0;
      }

      ;
    };

    this.schedule(this.hotel_3_schedule, 1, cc.macro.REPEAT_FOREVER);
  },
  //=======================================================================================
  //=======================================================================================
  //判断当前日期
  judge_date: function judge_date() {
    var now_date = new Date().getDate();
    var arr = Object.keys(user_data.user_data.pet);

    if (user_data.user_data.save_date == 0) {
      //新存档记录日期
      user_data.user_data.save_date = now_date;
    } else if (user_data.user_data.save_date != now_date) {
      //日期不相同，默认第二天及以后,重置分享次数
      for (var i = 0; i < arr.length; i++) {
        if (user_data.user_data.pet[i].share_count !== undefined) {
          user_data.user_data.pet[i].share_count = 0; // user_data.user_data.videotape_share_count = 0;
        }

        ;
      }

      ;
      user_data.user_data.save_date = now_date;
    } else {//日期为同一天
    }

    ;
  },
  //=============================================================================================
  //=============================================================================================
  //初始化录屏功能
  ini_videotape: function ini_videotape() {
    //录屏的保存路径
    this.videotape_path = null;
    this.videotape_start_time = 0;
    this.videotape_state = "unstart";
  },
  on_videotape_button_click: function on_videotape_button_click() {
    this.sound_control.play_sound_effect("button_click");

    if (this.videotape_state == "unstart") {
      //未开始进入奖励界面
      this.game_scene_js.create_videotape_ui();
    } else if (this.videotape_state == "start") {
      //开始后大于3秒才能关闭
      var now_time = new Date().getTime();
      var videotape_time = now_time - this.videotape_start_time;

      if (videotape_time < 3000) {
        this.game_scene_js.create_tips_ui(this.node, "videotape_no_time");
      } else {
        this.stop_videotape();
      }

      ;
    }

    ;
  },
  //开始游戏录屏
  start_videotape: function start_videotape() {
    //记录一个时间戳
    this.videotape_start_time = new Date().getTime();

    if (typeof wx != "undefined") {
      this.videotape_state = "start";
      this.videotape_timeControl(); //切换录屏按钮图标

      this.videotape_button.getComponent(cc.Sprite).spriteFrame = this.videotape_button_arr[1];
      this.game_scene_js.create_tips_ui(this.node, "videotape_start");
      this.recorder = wx.getGameRecorderManager();
      this.recorder.onStart(function (res) {// console.log("录屏开始");
        // do somethine;
      });
      this.recorder.start({
        duration: 60
      });
    }

    ;
  },
  //结束游戏录屏
  stop_videotape: function stop_videotape() {
    var _this = this;

    if (typeof wx != "undefined") {
      this.videotape_state = "unstart";
      this.game_scene_js.create_tips_ui(this.node, "vidotape_over");
      this.videotape_button.getComponent(cc.Sprite).spriteFrame = this.videotape_button_arr[0];
      this.recorder.onStop(function (res) {
        // console.log(res.videoPath, "录屏结束");
        // do somethine;
        _this.videotape_path = res.videoPath;

        _this.game_scene_js.create_videotape_ui();
      });
      this.recorder.stop();
    }

    ;
  },
  //录屏时间控制
  videotape_timeControl: function videotape_timeControl() {
    var time_count = 0;

    var callback = function callback() {
      time_count++; //超过了最大时长或者录制状态为未开启

      if (time_count >= 60 || this.videotape_state == "unstart") {
        this.unschedule(callback);
        time_count = 0;
        this.stop_videotape();
        this.game_scene_js.create_tips_ui(this.node, "vidotape_over");
      }

      ;
    };

    this.schedule(callback, 1, cc.macro.REPEAT_FOREVER);
  },
  //=============================================================================================
  //=============================================================================================
  //初始化节点
  ini_node: function ini_node() {
    _fx["default"].load();

    this.create_land();
    this.create_pet();
    this.add_gold_anim = 0;
    this.add_ex_anim = 0; //调用碰撞检测组件

    this.manager = cc.director.getCollisionManager(); //默认碰撞为关

    this.manager.enabled = true;
    this.set_gold_progress();
    this.set_ex_progress();
    this.create_player();
    this.create_staff();
    this.auto_save();
    this.save_login_time();
    this.create_button_tips();
    this.offline_profit_ui();
    this.create_novice();
    this.sound_control.play_bg_sound("home_bg");
    this.ini_hotel_produce();
    this.judge_date();
    this.wareHouse_full();
    this.ini_videotape();
    this.diamond_label.string = user_data.user_data.diamond;
  },
  //===================================================================================
  //===================================================================================
  on_test_button_click: function on_test_button_click(e, custom) {
    switch (custom) {
      case "0":
        this.add_gold(user_data.user_data.skill.gold_max * 500 + 500);
        break;

      case "1":
        this.add_ex(2 * user_data.user_data.level + 1);
        break;

      case "2":
        if (user_data.user_data.pet[0].have == 0) {
          user_data.user_data.pet[0].have = 1;
          this.game_scene_js.create_pet(this.node, 0);
        }

        if (user_data.user_data.pet[1].have == 0) {
          user_data.user_data.pet[1].have = 1;
          this.game_scene_js.create_pet(this.node, 1);
        }

        if (user_data.user_data.pet[2].have == 0) {
          user_data.user_data.pet[2].have = 1;
          this.game_scene_js.create_pet(this.node, 2);
        }

        if (user_data.user_data.pet[3].have == 0) {
          user_data.user_data.pet[3].have = 1;
          this.game_scene_js.create_pet(this.node, 3);
        } // this.game_scene_js.create_pet(this.node, 0);
        // this.game_scene_js.create_pet(this.node, 1);
        // console.log("have pet " + user_data.user_data.pet[0].have);
        // console.log("have pet " + user_data.user_data.pet[1].have);


        break;

      case "3":
        user_data.user_data.pet[2].have = 1;
        break;

      case "4":
        user_data.user_data.pet[2].have = 0;
        break;
    }

    ;
  },
  onLoad: function onLoad() {
    this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
    this.sound_control = cc.find("sound_control").getComponent("sound_control");
    this.ini_node();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lX3J1bGVzLmpzIl0sIm5hbWVzIjpbInVzZXJfZGF0YSIsInJlcXVpcmUiLCJjb25maWciLCJwdXNoIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJsYW5kX3ByZWZhYiIsIlByZWZhYiIsImxhbmRfZ3JvdXBfbm9kZSIsIk5vZGUiLCJjZW50ZXJfbm9kZSIsImdvbGRfbGFiZWwiLCJMYWJlbCIsImV4X2xhYmVsIiwibGV2ZWxfbGFiZWwiLCJkaWFtb25kX2xhYmVsIiwiZ29sZF9wcm9ncmVzc19ub2RlIiwiUHJvZ3Jlc3NCYXIiLCJleF9wcm9ncmVzc19ub2RlIiwicGxheWVyX3ByZWZhYiIsInN0YWZmX3ByZWZhYl9hcnIiLCJ3YXJlSG91c2Vfbm9kZSIsIm1haW5fY2FtZXJhIiwidGlwc19ncm91cF9ub2RlIiwiYnV0dG9uX2dyb3VwX25vZGUiLCJob3RlbF9wcm9kdWNlX25vZGUiLCJ2aWRlb3RhcGVfYnV0dG9uIiwidmlkZW90YXBlX2J1dHRvbl9hcnIiLCJTcHJpdGVGcmFtZSIsIm9uX3dhdGVyaW5nX2J1dHRvbl9jbGljayIsInNvdW5kX2NvbnRyb2wiLCJwbGF5X3NvdW5kX2VmZmVjdCIsIm5vZGUiLCJnYW1lX3NjZW5lX2pzIiwiY3JlYXRlX2J1dHRvbl9ncm91cCIsInpJbmRleCIsImdldENvbXBvbmVudCIsImluaV9ub2RlIiwib25fdGlsbF9idXR0b25fY2xpY2siLCJvbl9zdHVkeV9idXR0b25fY2xpY2siLCJjcmVhdGVfc3R1ZHlfdWkiLCJvbl9ob21lX2J1dHRvbl9jbGljayIsImNyZWF0ZV9vcHRpb25fdWkiLCJvbl9wZXRfYnV0dG9uX2NsaWNrIiwiY3JlYXRlX3BldF91aSIsIm9uX2hvdGVsX2J1dHRvbl9jbGljayIsImNyZWF0ZV9ob3RlbF91aSIsIm9uX3N0YWZmX2J1dHRvbl9jbGljayIsImNyZWF0ZV9zdGFmZl91aSIsImNyZWF0ZV9sYW5kIiwiYXJyIiwiT2JqZWN0Iiwia2V5cyIsImxhbmQiLCJpIiwibGVuZ3RoIiwiaW5zdGFudGlhdGUiLCJwYXJlbnQiLCJjcmVhdGVfcGxheWVyIiwiY3JlYXRlX3N0YWZmIiwic3RhZmZfaW5kZXgiLCJzdGFmZiIsImhhdmUiLCJjaGlsZHJlbiIsImFkZF9nb2xkIiwibnVtIiwiYWRkX2dvbGRfYW5pbSIsInRpbWVDb3VudCIsImdvbGQiLCJnb2xkX21heCIsInNraWxsIiwiY2FsbGJhY2siLCJQbnVtIiwicGFyc2VJbnQiLCJzdHJpbmciLCJjcmVhdGVfdGlwc191aSIsInVuc2NoZWR1bGUiLCJzZXRfZ29sZF9wcm9ncmVzcyIsInNjaGVkdWxlIiwiYWRkX2RpYW1vbmQiLCJkaWFtb25kIiwiYWRkX2V4IiwiYWRkX2V4X2FuaW0iLCJleCIsIm5vd19leCIsIm5leHRfZXgiLCJsZXZlbCIsInNraWxsX3BvaW50Iiwic2V0X2V4X3Byb2dyZXNzIiwidHdlZW4iLCJ0byIsInByb2dyZXNzIiwic3RhcnQiLCJvbl93YXJlSG91c2VfY2xpY2siLCJjcmVhdGVfc2VsbF91aSIsIndhcmVIb3VzZV9mdWxsIiwid2FyZUhvdXNlX3NoY2VkdWxlIiwid2FyZUhvdXNlIiwiYWxsX2NhcGFjaXR5Iiwid2FyZUhvdXNlX2xldmVsIiwiY291bnQiLCJnZXRDaGlsZEJ5TmFtZSIsImFjdGl2ZSIsIm9uX29yY2hhcmRfYnV0dG9uX2NsaWNrIiwiYXV0b19zYXZlIiwiZngiLCJzYXZlIiwibWFjcm8iLCJSRVBFQVRfRk9SRVZFUiIsInVwZGF0YV9sYW5kIiwibGFuZF9pbmRleCIsInNhdmVfbG9naW5fdGltZSIsImxvZ2luX3RpbWUiLCJEYXRlIiwiZ2V0VGltZSIsIm9mZmxpbmVfcHJvZml0X3VpIiwibm93X3RpbWUiLCJtaW4iLCJNYXRoIiwiZmxvb3IiLCJjcmVhdGVfb2ZmbGluZV9wcm9maXRfdWkiLCJvbl9zaG9wX2J1dHRvbl9jbGljayIsImNyZWF0ZV9zaG9wX3VpIiwiY3JlYXRlX25vdmljZSIsIm5vdmljZSIsImNyZWF0ZV9ub3ZpY2VfdWkiLCJjcmVhdGVfYnV0dG9uX3RpcHMiLCJwb3NpdGlvbiIsInN0dWR5X3VpX3RpcHMiLCJzdGFmZl91aV90aXBzIiwic2hvcF91aV90aXBzIiwic2hvcF91aV9jYWxsYmFjayIsImxhbmRfYXJyIiwicGxhbnRfYXJyIiwicGxhbnQiLCJjb3N0IiwibmVlZF9sZXZlbCIsImoiLCJzdGR1eV90aXBzX2NhbGxiYWNrIiwic3RhZmZfdGlwc19jYWxsYmFjayIsImNyZWF0ZV9wZXQiLCJwZXQiLCJjcmVhdGVfcGV0X2EiLCJpbmRleCIsIm9uX2dldF9ob3RlbF9wcm9kdWNlX2NsaWNrIiwiZSIsInRhcmdldCIsImNyZWF0ZV9nb2xkX2VmZmVjdCIsImhvdGVsX2NhY2hlX2dvbGQiLCJ1cGRhdGVfaG90ZWxfcHJvZHVjZSIsImxhYmVsIiwiaG90ZWxfYnV5X3Jvb20iLCJyb29tX2luZGV4IiwiaG90ZWxfMCIsImhvdGVsXzEiLCJob3RlbF8yIiwiaG90ZWxfMyIsImluaV9ob3RlbF9wcm9kdWNlIiwiaG90ZWwiLCJob3RlbF8wX3NjaGVkdWxlIiwicHJvZHVjZV90aW1lIiwicHJvZHVjZSIsImhvdGVsXzFfc2NoZWR1bGUiLCJob3RlbF8yX3NjaGVkdWxlIiwiaG90ZWxfM19zY2hlZHVsZSIsImp1ZGdlX2RhdGUiLCJub3dfZGF0ZSIsImdldERhdGUiLCJzYXZlX2RhdGUiLCJzaGFyZV9jb3VudCIsInVuZGVmaW5lZCIsImluaV92aWRlb3RhcGUiLCJ2aWRlb3RhcGVfcGF0aCIsInZpZGVvdGFwZV9zdGFydF90aW1lIiwidmlkZW90YXBlX3N0YXRlIiwib25fdmlkZW90YXBlX2J1dHRvbl9jbGljayIsImNyZWF0ZV92aWRlb3RhcGVfdWkiLCJ2aWRlb3RhcGVfdGltZSIsInN0b3BfdmlkZW90YXBlIiwic3RhcnRfdmlkZW90YXBlIiwid3giLCJ2aWRlb3RhcGVfdGltZUNvbnRyb2wiLCJTcHJpdGUiLCJzcHJpdGVGcmFtZSIsInJlY29yZGVyIiwiZ2V0R2FtZVJlY29yZGVyTWFuYWdlciIsIm9uU3RhcnQiLCJyZXMiLCJkdXJhdGlvbiIsIm9uU3RvcCIsInZpZGVvUGF0aCIsInN0b3AiLCJ0aW1lX2NvdW50IiwibG9hZCIsIm1hbmFnZXIiLCJkaXJlY3RvciIsImdldENvbGxpc2lvbk1hbmFnZXIiLCJlbmFibGVkIiwicGxheV9iZ19zb3VuZCIsIm9uX3Rlc3RfYnV0dG9uX2NsaWNrIiwiY3VzdG9tIiwib25Mb2FkIiwiZmluZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQTs7OztBQUhBLElBQUlBLFNBQVMsR0FBR0MsT0FBTyxDQUFDLFdBQUQsQ0FBdkI7O0FBQ0EsSUFBSUMsTUFBTSxHQUFHRCxPQUFPLENBQUMsUUFBRCxDQUFwQjs7QUFDQSxJQUFJRSxJQUFJLEdBQUdGLE9BQU8sQ0FBQyxNQUFELENBQWxCOztBQUVBRyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsV0FBVyxFQUFFSixFQUFFLENBQUNLLE1BRFI7QUFFUkMsSUFBQUEsZUFBZSxFQUFFTixFQUFFLENBQUNPLElBRlo7QUFHUkMsSUFBQUEsV0FBVyxFQUFFUixFQUFFLENBQUNPLElBSFI7QUFJUkUsSUFBQUEsVUFBVSxFQUFFVCxFQUFFLENBQUNVLEtBSlA7QUFLUkMsSUFBQUEsUUFBUSxFQUFFWCxFQUFFLENBQUNVLEtBTEw7QUFNUkUsSUFBQUEsV0FBVyxFQUFFWixFQUFFLENBQUNVLEtBTlI7QUFPUkcsSUFBQUEsYUFBYSxFQUFFYixFQUFFLENBQUNVLEtBUFY7QUFRUkksSUFBQUEsa0JBQWtCLEVBQUVkLEVBQUUsQ0FBQ2UsV0FSZjtBQVNSQyxJQUFBQSxnQkFBZ0IsRUFBRWhCLEVBQUUsQ0FBQ2UsV0FUYjtBQVVSRSxJQUFBQSxhQUFhLEVBQUVqQixFQUFFLENBQUNLLE1BVlY7QUFXUmEsSUFBQUEsZ0JBQWdCLEVBQUUsQ0FBQ2xCLEVBQUUsQ0FBQ0ssTUFBSixDQVhWO0FBWVJjLElBQUFBLGNBQWMsRUFBRW5CLEVBQUUsQ0FBQ08sSUFaWDtBQWFSYSxJQUFBQSxXQUFXLEVBQUVwQixFQUFFLENBQUNPLElBYlI7QUFjUmMsSUFBQUEsZUFBZSxFQUFFckIsRUFBRSxDQUFDTyxJQWRaO0FBZVJlLElBQUFBLGlCQUFpQixFQUFFdEIsRUFBRSxDQUFDTyxJQWZkO0FBZ0JSZ0IsSUFBQUEsa0JBQWtCLEVBQUV2QixFQUFFLENBQUNPLElBaEJmO0FBaUJSaUIsSUFBQUEsZ0JBQWdCLEVBQUV4QixFQUFFLENBQUNPLElBakJiO0FBa0JSa0IsSUFBQUEsb0JBQW9CLEVBQUUsQ0FBQ3pCLEVBQUUsQ0FBQzBCLFdBQUo7QUFsQmQsR0FIUDtBQXlCTDtBQUNBQyxFQUFBQSx3QkFBd0IsRUFBRSxvQ0FBWTtBQUNsQyxTQUFLQyxhQUFMLENBQW1CQyxpQkFBbkIsQ0FBcUMsbUJBQXJDO0FBQ0EsUUFBSUMsSUFBSSxHQUFHLEtBQUtDLGFBQUwsQ0FBbUJDLG1CQUFuQixDQUF1QyxLQUFLeEIsV0FBNUMsQ0FBWDtBQUNBc0IsSUFBQUEsSUFBSSxDQUFDRyxNQUFMLEdBQWMsQ0FBZDs7QUFDQSxRQUFJSCxJQUFJLElBQUksSUFBWixFQUFrQjtBQUNkQSxNQUFBQSxJQUFJLENBQUNJLFlBQUwsQ0FBa0IsYUFBbEIsRUFBaUNDLFFBQWpDLENBQTBDLFVBQTFDO0FBQ0g7O0FBQUE7QUFDSixHQWpDSTtBQWtDTDtBQUNBQyxFQUFBQSxvQkFBb0IsRUFBRSxnQ0FBWTtBQUM5QixTQUFLUixhQUFMLENBQW1CQyxpQkFBbkIsQ0FBcUMsbUJBQXJDO0FBQ0EsUUFBSUMsSUFBSSxHQUFHLEtBQUtDLGFBQUwsQ0FBbUJDLG1CQUFuQixDQUF1QyxLQUFLeEIsV0FBNUMsQ0FBWDtBQUNBc0IsSUFBQUEsSUFBSSxDQUFDRyxNQUFMLEdBQWMsQ0FBZDs7QUFDQSxRQUFJSCxJQUFJLElBQUksSUFBWixFQUFrQjtBQUNkQSxNQUFBQSxJQUFJLENBQUNJLFlBQUwsQ0FBa0IsYUFBbEIsRUFBaUNDLFFBQWpDLENBQTBDLE1BQTFDO0FBQ0g7O0FBQUE7QUFDSixHQTFDSTtBQTJDTDtBQUNBRSxFQUFBQSxxQkFBcUIsRUFBRSxpQ0FBWTtBQUMvQixTQUFLVCxhQUFMLENBQW1CQyxpQkFBbkIsQ0FBcUMsbUJBQXJDO0FBQ0EsUUFBSUMsSUFBSSxHQUFHLEtBQUtDLGFBQUwsQ0FBbUJPLGVBQW5CLENBQW1DLEtBQUtSLElBQXhDLENBQVg7O0FBQ0EsUUFBSUEsSUFBSSxJQUFJLElBQVosRUFBa0I7QUFDZEEsTUFBQUEsSUFBSSxDQUFDSSxZQUFMLENBQWtCLFVBQWxCLEVBQThCQyxRQUE5QjtBQUNIOztBQUFBO0FBQ0osR0FsREk7QUFtREw7QUFDQUksRUFBQUEsb0JBcERLLGtDQW9Ea0I7QUFDbkIsU0FBS1gsYUFBTCxDQUFtQkMsaUJBQW5CLENBQXFDLGNBQXJDO0FBQ0EsU0FBS0UsYUFBTCxDQUFtQlMsZ0JBQW5CO0FBQ0gsR0F2REk7QUF3REw7QUFDQUMsRUFBQUEsbUJBQW1CLEVBQUUsK0JBQVk7QUFDN0I7QUFDQSxRQUFJWCxJQUFJLEdBQUcsS0FBS0MsYUFBTCxDQUFtQlcsYUFBbkIsQ0FBaUMsS0FBS1osSUFBdEMsQ0FBWDs7QUFDQSxRQUFJQSxJQUFJLElBQUksSUFBWixFQUFrQjtBQUNkQSxNQUFBQSxJQUFJLENBQUNJLFlBQUwsQ0FBa0IsUUFBbEIsRUFBNEJDLFFBQTVCO0FBQ0g7O0FBQUE7QUFDSixHQS9ESTtBQWdFTDtBQUNBUSxFQUFBQSxxQkFqRUssbUNBaUVtQjtBQUNwQixTQUFLZixhQUFMLENBQW1CQyxpQkFBbkIsQ0FBcUMsY0FBckM7QUFDQSxTQUFLRSxhQUFMLENBQW1CYSxlQUFuQjtBQUNILEdBcEVJO0FBcUVMO0FBQ0FDLEVBQUFBLHFCQUFxQixFQUFFLGlDQUFZO0FBQy9CLFNBQUtqQixhQUFMLENBQW1CQyxpQkFBbkIsQ0FBcUMsbUJBQXJDO0FBQ0EsUUFBSUMsSUFBSSxHQUFHLEtBQUtDLGFBQUwsQ0FBbUJlLGVBQW5CLENBQW1DLEtBQUtoQixJQUF4QyxDQUFYOztBQUNBLFFBQUlBLElBQUksSUFBSSxJQUFaLEVBQWtCO0FBQ2RBLE1BQUFBLElBQUksQ0FBQ0ksWUFBTCxDQUFrQixVQUFsQixFQUE4QkMsUUFBOUI7QUFDSDs7QUFBQTtBQUNKLEdBNUVJO0FBNkVMO0FBQ0FZLEVBQUFBLFdBQVcsRUFBRSx1QkFBWTtBQUNyQixRQUFJQyxHQUFHLEdBQUdDLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZdEQsU0FBUyxDQUFDQSxTQUFWLENBQW9CdUQsSUFBaEMsQ0FBVjs7QUFDQSxTQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdKLEdBQUcsQ0FBQ0ssTUFBeEIsRUFBZ0NELENBQUMsRUFBakMsRUFBcUM7QUFDakMsVUFBSXRCLElBQUksR0FBRzlCLEVBQUUsQ0FBQ3NELFdBQUgsQ0FBZSxLQUFLbEQsV0FBcEIsQ0FBWDtBQUNBMEIsTUFBQUEsSUFBSSxDQUFDeUIsTUFBTCxHQUFjLEtBQUtqRCxlQUFuQjtBQUNBd0IsTUFBQUEsSUFBSSxDQUFDSSxZQUFMLENBQWtCLE1BQWxCLEVBQTBCQyxRQUExQixDQUFtQ2lCLENBQW5DO0FBQ0g7O0FBQUE7QUFDSixHQXJGSTtBQXNGTDtBQUNBSSxFQUFBQSxhQUFhLEVBQUUseUJBQVk7QUFDdkIsUUFBSTFCLElBQUksR0FBRzlCLEVBQUUsQ0FBQ3NELFdBQUgsQ0FBZSxLQUFLckMsYUFBcEIsQ0FBWDtBQUNBYSxJQUFBQSxJQUFJLENBQUN5QixNQUFMLEdBQWMsS0FBSy9DLFdBQW5CO0FBQ0gsR0ExRkk7QUEyRkw7QUFDQWlELEVBQUFBLFlBQVksRUFBRSxzQkFBVUMsV0FBVixFQUF1QjtBQUNqQyxRQUFJQSxXQUFXLElBQUksSUFBbkIsRUFBeUI7QUFDckIsVUFBSVYsR0FBRyxHQUFHQyxNQUFNLENBQUNDLElBQVAsQ0FBWXRELFNBQVMsQ0FBQ0EsU0FBVixDQUFvQitELEtBQWhDLENBQVY7O0FBQ0EsV0FBSyxJQUFJUCxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHSixHQUFHLENBQUNLLE1BQXhCLEVBQWdDRCxDQUFDLEVBQWpDLEVBQXFDO0FBQ2pDLFlBQUl4RCxTQUFTLENBQUNBLFNBQVYsQ0FBb0IrRCxLQUFwQixDQUEwQlAsQ0FBMUIsRUFBNkJRLElBQTdCLElBQXFDLENBQXpDLEVBQTRDO0FBQ3hDLGNBQUk5QixJQUFJLEdBQUc5QixFQUFFLENBQUNzRCxXQUFILENBQWUsS0FBS3BDLGdCQUFMLENBQXNCa0MsQ0FBdEIsQ0FBZixDQUFYO0FBQ0F0QixVQUFBQSxJQUFJLENBQUN5QixNQUFMLEdBQWMsS0FBS2pELGVBQUwsQ0FBcUJ1RCxRQUFyQixDQUE4QlQsQ0FBOUIsQ0FBZDtBQUNBdEIsVUFBQUEsSUFBSSxDQUFDSSxZQUFMLENBQWtCLFVBQWxCLEVBQThCQyxRQUE5QixDQUF1Q2lCLENBQXZDO0FBQ0gsU0FKRCxNQUlPO0FBQ0g7QUFDSDs7QUFBQTtBQUNKOztBQUFBO0FBQ0osS0FYRCxNQVdPO0FBQ0gsVUFBSXRCLElBQUksR0FBRzlCLEVBQUUsQ0FBQ3NELFdBQUgsQ0FBZSxLQUFLcEMsZ0JBQUwsQ0FBc0J3QyxXQUF0QixDQUFmLENBQVg7QUFDQTVCLE1BQUFBLElBQUksQ0FBQ3lCLE1BQUwsR0FBYyxLQUFLakQsZUFBTCxDQUFxQnVELFFBQXJCLENBQThCSCxXQUE5QixDQUFkO0FBQ0E1QixNQUFBQSxJQUFJLENBQUNJLFlBQUwsQ0FBa0IsVUFBbEIsRUFBOEJDLFFBQTlCLENBQXVDdUIsV0FBdkM7QUFDSDs7QUFBQTtBQUVKLEdBOUdJO0FBK0dMO0FBQ0FJLEVBQUFBLFFBQVEsRUFBRSxrQkFBVUMsR0FBVixFQUFlO0FBQ3JCLFFBQUksS0FBS0MsYUFBTCxJQUFzQixDQUExQixFQUE2QjtBQUN6QixXQUFLQSxhQUFMLEdBQXFCLENBQXJCO0FBQ0EsVUFBSUMsU0FBUyxHQUFHLEVBQWhCO0FBQ0EsVUFBSUMsSUFBSSxHQUFHdEUsU0FBUyxDQUFDQSxTQUFWLENBQW9Cc0UsSUFBL0I7QUFDQSxVQUFJQyxRQUFRLEdBQUcsTUFBTXZFLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQndFLEtBQXBCLENBQTBCLFVBQTFCLENBQU4sR0FBOEMsR0FBN0Q7O0FBQ0EsVUFBSUMsUUFBUSxHQUFHLFNBQVhBLFFBQVcsR0FBWTtBQUN2QixZQUFJQyxJQUFJLEdBQUdDLFFBQVEsQ0FBQ1IsR0FBRyxHQUFHRSxTQUFQLENBQW5CO0FBQ0FBLFFBQUFBLFNBQVM7QUFDVCxhQUFLeEQsVUFBTCxDQUFnQitELE1BQWhCLEdBQXlCTixJQUFJLEdBQUdJLElBQVAsR0FBYyxHQUFkLEdBQW9CSCxRQUE3Qzs7QUFDQSxZQUFJRixTQUFTLElBQUksQ0FBakIsRUFBb0I7QUFDaEJyRSxVQUFBQSxTQUFTLENBQUNBLFNBQVYsQ0FBb0JzRSxJQUFwQixJQUE0QkgsR0FBNUI7O0FBQ0EsY0FBSW5FLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQnNFLElBQXBCLEdBQTJCLENBQS9CLEVBQWtDO0FBQzlCdEUsWUFBQUEsU0FBUyxDQUFDQSxTQUFWLENBQW9Cc0UsSUFBcEIsR0FBMkIsQ0FBM0I7QUFDSDs7QUFDRCxjQUFJdEUsU0FBUyxDQUFDQSxTQUFWLENBQW9Cc0UsSUFBcEIsR0FBMkJDLFFBQS9CLEVBQXlDO0FBQ3JDLGlCQUFLdkMsYUFBTCxDQUFtQkMsaUJBQW5CLENBQXFDLFVBQXJDO0FBQ0EsaUJBQUtFLGFBQUwsQ0FBbUIwQyxjQUFuQixDQUFrQyxLQUFLM0MsSUFBdkMsRUFBNkMsV0FBN0M7QUFDQWxDLFlBQUFBLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQnNFLElBQXBCLEdBQTJCQyxRQUEzQjtBQUNIOztBQUNELGVBQUsxRCxVQUFMLENBQWdCK0QsTUFBaEIsR0FBeUI1RSxTQUFTLENBQUNBLFNBQVYsQ0FBb0JzRSxJQUFwQixHQUEyQixHQUEzQixHQUFpQ0MsUUFBMUQ7QUFDQSxlQUFLTyxVQUFMLENBQWdCTCxRQUFoQjtBQUNBLGVBQUtNLGlCQUFMO0FBQ0EsZUFBS1gsYUFBTCxHQUFxQixDQUFyQjtBQUNIOztBQUFBO0FBQ0osT0FuQkQ7O0FBb0JBLFdBQUtZLFFBQUwsQ0FBY1AsUUFBZCxFQUF3QixJQUF4QjtBQUNILEtBMUJELE1BMEJPO0FBQ0h6RSxNQUFBQSxTQUFTLENBQUNBLFNBQVYsQ0FBb0JzRSxJQUFwQixJQUE0QkgsR0FBNUI7QUFDSDs7QUFBQTtBQUNKLEdBOUlJO0FBZ0pMYyxFQUFBQSxXQUFXLEVBQUUscUJBQVVkLEdBQVYsRUFBZTtBQUN4Qm5FLElBQUFBLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQmtGLE9BQXBCLElBQStCZixHQUEvQjtBQUNILEdBbEpJO0FBbUpMO0FBQ0FnQixFQUFBQSxNQUFNLEVBQUUsZ0JBQVVoQixHQUFWLEVBQWU7QUFDbkIsUUFBSSxLQUFLaUIsV0FBTCxJQUFvQixDQUF4QixFQUEyQjtBQUN2QixXQUFLQSxXQUFMLEdBQW1CLENBQW5CO0FBQ0EsVUFBSWYsU0FBUyxHQUFHLEVBQWhCO0FBQ0EsVUFBSWdCLEVBQUUsR0FBR3JGLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQnNGLE1BQTdCO0FBQ0EsVUFBSUMsT0FBTyxHQUFHLElBQUl2RixTQUFTLENBQUNBLFNBQVYsQ0FBb0J3RixLQUF0Qzs7QUFDQSxVQUFJZixRQUFRLEdBQUcsU0FBWEEsUUFBVyxHQUFZO0FBQ3ZCLFlBQUlDLElBQUksR0FBR0MsUUFBUSxDQUFDUixHQUFHLEdBQUdFLFNBQVAsQ0FBbkI7QUFDQUEsUUFBQUEsU0FBUztBQUNULGFBQUt0RCxRQUFMLENBQWM2RCxNQUFkLEdBQXVCUyxFQUFFLEdBQUdYLElBQUwsR0FBWSxHQUFaLEdBQWtCYSxPQUF6Qzs7QUFDQSxZQUFJbEIsU0FBUyxJQUFJLENBQWpCLEVBQW9CO0FBQ2hCckUsVUFBQUEsU0FBUyxDQUFDQSxTQUFWLENBQW9Cc0YsTUFBcEIsSUFBOEJuQixHQUE5Qjs7QUFDQSxjQUFJbkUsU0FBUyxDQUFDQSxTQUFWLENBQW9Cc0YsTUFBcEIsR0FBNkJDLE9BQWpDLEVBQTBDO0FBQ3RDdkYsWUFBQUEsU0FBUyxDQUFDQSxTQUFWLENBQW9Cc0YsTUFBcEIsR0FBNkIsQ0FBN0I7QUFDQXRGLFlBQUFBLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQndGLEtBQXBCO0FBQ0F4RixZQUFBQSxTQUFTLENBQUNBLFNBQVYsQ0FBb0J5RixXQUFwQjtBQUNBLGlCQUFLdEQsYUFBTCxDQUFtQjBDLGNBQW5CLENBQWtDLEtBQUsxQyxhQUFMLENBQW1CRCxJQUFyRCxFQUEyRCxlQUEzRCxFQUpzQyxDQUkwQztBQUNuRjs7QUFDRCxlQUFLNEMsVUFBTCxDQUFnQkwsUUFBaEI7QUFDQSxlQUFLaUIsZUFBTDtBQUNBLGVBQUtOLFdBQUwsR0FBbUIsQ0FBbkI7QUFDSDs7QUFBQTtBQUNKLE9BaEJEOztBQWlCQSxXQUFLSixRQUFMLENBQWNQLFFBQWQsRUFBd0IsSUFBeEI7QUFDSCxLQXZCRCxNQXVCTztBQUNIekUsTUFBQUEsU0FBUyxDQUFDQSxTQUFWLENBQW9Cc0YsTUFBcEIsSUFBOEJuQixHQUE5QjtBQUNIOztBQUFBO0FBRUosR0FoTEk7QUFpTExZLEVBQUFBLGlCQUFpQixFQUFFLDZCQUFZO0FBQzNCLFFBQUlULElBQUksR0FBR3RFLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQnNFLElBQS9CO0FBQ0EsUUFBSUMsUUFBUSxHQUFHLE1BQU12RSxTQUFTLENBQUNBLFNBQVYsQ0FBb0J3RSxLQUFwQixDQUEwQixVQUExQixDQUFOLEdBQThDLEdBQTdEO0FBQ0EsU0FBSzNELFVBQUwsQ0FBZ0IrRCxNQUFoQixHQUF5Qk4sSUFBSSxHQUFHLEdBQVAsR0FBYUMsUUFBdEM7QUFDQW5FLElBQUFBLEVBQUUsQ0FBQ3VGLEtBQUgsQ0FBUyxLQUFLekUsa0JBQWQsRUFDSzBFLEVBREwsQ0FDUSxHQURSLEVBQ2E7QUFBRUMsTUFBQUEsUUFBUSxFQUFFdkIsSUFBSSxHQUFHQztBQUFuQixLQURiLEVBRUt1QixLQUZMO0FBR0gsR0F4TEk7QUF5TExKLEVBQUFBLGVBQWUsRUFBRSwyQkFBWTtBQUN6QixRQUFJSixNQUFNLEdBQUd0RixTQUFTLENBQUNBLFNBQVYsQ0FBb0JzRixNQUFqQztBQUNBLFFBQUlDLE9BQU8sR0FBRyxJQUFJdkYsU0FBUyxDQUFDQSxTQUFWLENBQW9Cd0YsS0FBdEM7QUFDQSxTQUFLeEUsV0FBTCxDQUFpQjRELE1BQWpCLEdBQTBCNUUsU0FBUyxDQUFDQSxTQUFWLENBQW9Cd0YsS0FBOUM7QUFDQSxTQUFLekUsUUFBTCxDQUFjNkQsTUFBZCxHQUF1QlUsTUFBTSxHQUFHLEdBQVQsR0FBZUMsT0FBdEM7QUFDQW5GLElBQUFBLEVBQUUsQ0FBQ3VGLEtBQUgsQ0FBUyxLQUFLdkUsZ0JBQWQsRUFDS3dFLEVBREwsQ0FDUSxHQURSLEVBQ2E7QUFBRUMsTUFBQUEsUUFBUSxFQUFFUCxNQUFNLEdBQUdDO0FBQXJCLEtBRGIsRUFFS08sS0FGTDtBQUdILEdBak1JO0FBa01MO0FBQ0FDLEVBQUFBLGtCQUFrQixFQUFFLDhCQUFZO0FBQzVCLFNBQUsvRCxhQUFMLENBQW1CQyxpQkFBbkIsQ0FBcUMsY0FBckM7QUFDQSxRQUFJQyxJQUFJLEdBQUcsS0FBS0MsYUFBTCxDQUFtQjZELGNBQW5CLENBQWtDLEtBQUs5RCxJQUF2QyxDQUFYOztBQUNBLFFBQUlBLElBQUksSUFBSSxJQUFaLEVBQWtCO0FBQ2RBLE1BQUFBLElBQUksQ0FBQ0ksWUFBTCxDQUFrQixTQUFsQixFQUE2QkMsUUFBN0I7QUFDSDs7QUFBQTtBQUNKLEdBek1JO0FBME1MO0FBQ0EwRCxFQUFBQSxjQUFjLEVBQUUsMEJBQVk7QUFDeEI7QUFDQSxTQUFLQyxrQkFBTCxHQUEwQixZQUFZO0FBQ2xDLFVBQUk5QyxHQUFHLEdBQUdDLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZdEQsU0FBUyxDQUFDQSxTQUFWLENBQW9CbUcsU0FBaEMsQ0FBVjtBQUNBLFVBQUlDLFlBQVksR0FBR3BHLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQnFHLGVBQXBCLEdBQXNDbkcsTUFBTSxDQUFDaUcsU0FBUCxDQUFpQixjQUFqQixDQUF6RDs7QUFDQSxXQUFLLElBQUkzQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHSixHQUFHLENBQUNLLE1BQXhCLEVBQWdDRCxDQUFDLEVBQWpDLEVBQXFDO0FBQ2pDLFlBQUl4RCxTQUFTLENBQUNBLFNBQVYsQ0FBb0JtRyxTQUFwQixDQUE4QjNDLENBQTlCLEVBQWlDOEMsS0FBakMsSUFBMENGLFlBQTlDLEVBQTREO0FBQ3hELGVBQUs3RSxjQUFMLENBQW9CZ0YsY0FBcEIsQ0FBbUMsZ0JBQW5DLEVBQXFEQyxNQUFyRCxHQUE4RCxJQUE5RDtBQUNBO0FBQ0gsU0FIRCxNQUdPO0FBQ0gsZUFBS2pGLGNBQUwsQ0FBb0JnRixjQUFwQixDQUFtQyxnQkFBbkMsRUFBcURDLE1BQXJELEdBQThELEtBQTlEO0FBQ0g7O0FBQUE7QUFDSjs7QUFBQTtBQUNKLEtBWEQ7O0FBWUEsU0FBS3hCLFFBQUwsQ0FBYyxLQUFLa0Isa0JBQW5CLEVBQXVDLEdBQXZDO0FBQ0gsR0ExTkk7QUEyTkw7QUFDQU8sRUFBQUEsdUJBQXVCLEVBQUUsbUNBQVk7QUFDakM7QUFDQSxTQUFLekUsYUFBTCxDQUFtQkMsaUJBQW5CLENBQXFDLFVBQXJDO0FBQ0EsU0FBS0UsYUFBTCxDQUFtQjBDLGNBQW5CLENBQWtDLEtBQUszQyxJQUF2QyxFQUE2QyxZQUE3QztBQUNILEdBaE9JO0FBaU9MO0FBQ0F3RSxFQUFBQSxTQUFTLEVBQUUscUJBQVk7QUFDbkIsUUFBSWpDLFFBQVEsR0FBRyxTQUFYQSxRQUFXLEdBQVk7QUFDdkJrQyxxQkFBR0MsSUFBSDtBQUNILEtBRkQ7O0FBR0EsU0FBSzVCLFFBQUwsQ0FBY1AsUUFBZCxFQUF3QixDQUF4QixFQUEyQnJFLEVBQUUsQ0FBQ3lHLEtBQUgsQ0FBU0MsY0FBcEM7QUFDSCxHQXZPSTtBQXdPTDtBQUNBQyxFQUFBQSxXQUFXLEVBQUUscUJBQVVDLFVBQVYsRUFBc0I7QUFDL0I7QUFDQSxTQUFLdEcsZUFBTCxDQUFxQnVELFFBQXJCLENBQThCK0MsVUFBOUIsRUFBMEMxRSxZQUExQyxDQUF1RCxNQUF2RCxFQUErREMsUUFBL0QsQ0FBd0V5RSxVQUF4RTtBQUNILEdBNU9JO0FBNk9MO0FBQ0FDLEVBQUFBLGVBQWUsRUFBRSwyQkFBWTtBQUN6QixRQUFJakgsU0FBUyxDQUFDQSxTQUFWLENBQW9Ca0gsVUFBcEIsSUFBa0MsQ0FBdEMsRUFBeUM7QUFDckNsSCxNQUFBQSxTQUFTLENBQUNBLFNBQVYsQ0FBb0JrSCxVQUFwQixHQUFpQyxJQUFJQyxJQUFKLEdBQVdDLE9BQVgsRUFBakM7QUFDSDs7QUFBQTtBQUNKLEdBbFBJO0FBbVBMO0FBQ0FDLEVBQUFBLGlCQUFpQixFQUFFLDZCQUFZO0FBQzNCLFFBQUlILFVBQVUsR0FBR2xILFNBQVMsQ0FBQ0EsU0FBVixDQUFvQmtILFVBQXJDO0FBQ0EsUUFBSUksUUFBUSxHQUFHLElBQUlILElBQUosR0FBV0MsT0FBWCxFQUFmO0FBQ0EsUUFBSUcsR0FBRyxHQUFHQyxJQUFJLENBQUNDLEtBQUwsQ0FBVyxDQUFDSCxRQUFRLEdBQUdKLFVBQVosS0FBMkIsT0FBTyxFQUFsQyxDQUFYLENBQVY7O0FBQ0EsUUFBSUssR0FBRyxJQUFJLENBQVgsRUFBYztBQUNWLFdBQUtwRixhQUFMLENBQW1CdUYsd0JBQW5CLENBQTRDLEtBQUt4RixJQUFqRDtBQUNILEtBRkQsTUFFTztBQUNIO0FBQ0g7O0FBQUE7QUFDSixHQTdQSTtBQThQTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBeUYsRUFBQUEsb0JBM1FLLGtDQTJRa0I7QUFDbkIsU0FBSzNGLGFBQUwsQ0FBbUJDLGlCQUFuQixDQUFxQyxjQUFyQztBQUNBLFNBQUtFLGFBQUwsQ0FBbUJ5RixjQUFuQjtBQUNILEdBOVFJO0FBK1FMO0FBQ0FDLEVBQUFBLGFBaFJLLDJCQWdSVztBQUNaLFFBQUk3SCxTQUFTLENBQUNBLFNBQVYsQ0FBb0I4SCxNQUFwQixJQUE4QixDQUFsQyxFQUFxQztBQUNqQyxXQUFLM0YsYUFBTCxDQUFtQjRGLGdCQUFuQjtBQUNBL0gsTUFBQUEsU0FBUyxDQUFDQSxTQUFWLENBQW9COEgsTUFBcEIsR0FBNkIsQ0FBN0I7QUFDSDs7QUFBQTtBQUNKLEdBclJJO0FBc1JMO0FBQ0FFLEVBQUFBLGtCQXZSSyxnQ0F1UmdCO0FBQ2pCLFNBQUssSUFBSXhFLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsS0FBSzlCLGlCQUFMLENBQXVCdUMsUUFBdkIsQ0FBZ0NSLE1BQXBELEVBQTRERCxDQUFDLEVBQTdELEVBQWlFO0FBQzdELFdBQUtyQixhQUFMLENBQW1CNkYsa0JBQW5CLENBQXNDLEtBQUt2RyxlQUEzQyxFQUE0RCxLQUFLQyxpQkFBTCxDQUF1QnVDLFFBQXZCLENBQWdDVCxDQUFoQyxFQUFtQ3lFLFFBQS9GO0FBQ0g7O0FBQUE7QUFDRCxTQUFLQyxhQUFMO0FBQ0EsU0FBS0MsYUFBTDtBQUNBLFNBQUtDLFlBQUw7QUFDSCxHQTlSSTtBQStSTDtBQUNBQSxFQUFBQSxZQWhTSywwQkFnU1U7QUFDWCxTQUFLQyxnQkFBTCxHQUF3QixZQUFZO0FBQ2hDLFVBQUlDLFFBQVEsR0FBR2pGLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZdEQsU0FBUyxDQUFDQSxTQUFWLENBQW9CdUQsSUFBaEMsQ0FBZjtBQUNBLFVBQUlnRixTQUFTLEdBQUdsRixNQUFNLENBQUNDLElBQVAsQ0FBWXRELFNBQVMsQ0FBQ0EsU0FBVixDQUFvQndJLEtBQWhDLENBQWhCO0FBQ0EsVUFBSWxFLElBQUksR0FBR3RFLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQnNFLElBQS9CO0FBQ0EsVUFBSWtCLEtBQUssR0FBR3hGLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQndGLEtBQWhDOztBQUNBLFdBQUssSUFBSWhDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUc4RSxRQUFRLENBQUM3RSxNQUE3QixFQUFxQ0QsQ0FBQyxFQUF0QyxFQUEwQztBQUN0QyxZQUFJYyxJQUFJLElBQUlwRSxNQUFNLENBQUNxRCxJQUFQLENBQVlDLENBQVosRUFBZWlGLElBQXZCLElBQStCakQsS0FBSyxJQUFJdEYsTUFBTSxDQUFDcUQsSUFBUCxDQUFZQyxDQUFaLEVBQWVrRixVQUF2RCxJQUFxRTFJLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQnVELElBQXBCLENBQXlCQyxDQUF6QixFQUE0QlEsSUFBNUIsSUFBb0MsQ0FBN0csRUFBZ0g7QUFDNUcsZUFBS3ZDLGVBQUwsQ0FBcUJ3QyxRQUFyQixDQUE4QixDQUE5QixFQUFpQ3VDLE1BQWpDLEdBQTBDLElBQTFDO0FBQ0E7QUFDSCxTQUhELE1BR087QUFDSCxlQUFLL0UsZUFBTCxDQUFxQndDLFFBQXJCLENBQThCLENBQTlCLEVBQWlDdUMsTUFBakMsR0FBMEMsS0FBMUM7QUFDSDs7QUFBQTtBQUNKOztBQUFBOztBQUNELFdBQUssSUFBSW1DLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdKLFNBQVMsQ0FBQzlFLE1BQTlCLEVBQXNDa0YsQ0FBQyxFQUF2QyxFQUEyQztBQUN2QyxZQUFJckUsSUFBSSxJQUFJcEUsTUFBTSxDQUFDc0ksS0FBUCxDQUFhRyxDQUFiLEVBQWdCRixJQUF4QixJQUFnQ2pELEtBQUssSUFBSXRGLE1BQU0sQ0FBQ3NJLEtBQVAsQ0FBYUcsQ0FBYixFQUFnQkQsVUFBekQsSUFBdUUxSSxTQUFTLENBQUNBLFNBQVYsQ0FBb0J3SSxLQUFwQixDQUEwQkcsQ0FBMUIsRUFBNkIzRSxJQUE3QixJQUFxQyxDQUFoSCxFQUFtSDtBQUMvRyxlQUFLdkMsZUFBTCxDQUFxQndDLFFBQXJCLENBQThCLENBQTlCLEVBQWlDdUMsTUFBakMsR0FBMEMsSUFBMUM7QUFDQTtBQUNILFNBSEQsTUFHTztBQUNILGVBQUsvRSxlQUFMLENBQXFCd0MsUUFBckIsQ0FBOEIsQ0FBOUIsRUFBaUN1QyxNQUFqQyxHQUEwQyxLQUExQztBQUNIOztBQUFBO0FBQ0o7O0FBQUE7QUFDSixLQXJCRDs7QUFzQkEsU0FBS3hCLFFBQUwsQ0FBYyxLQUFLcUQsZ0JBQW5CLEVBQXFDLENBQXJDO0FBQ0gsR0F4VEk7QUF5VEw7QUFDQUgsRUFBQUEsYUExVEssMkJBMFRXO0FBQ1osU0FBS1UsbUJBQUwsR0FBMkIsWUFBWTtBQUNuQyxVQUFJbkQsV0FBVyxHQUFHekYsU0FBUyxDQUFDQSxTQUFWLENBQW9CeUYsV0FBdEM7O0FBQ0EsVUFBSUEsV0FBVyxHQUFHLENBQWxCLEVBQXFCO0FBQ2pCLGFBQUtoRSxlQUFMLENBQXFCd0MsUUFBckIsQ0FBOEIsQ0FBOUIsRUFBaUN1QyxNQUFqQyxHQUEwQyxJQUExQztBQUNILE9BRkQsTUFFTztBQUNIO0FBQ0EsYUFBSy9FLGVBQUwsQ0FBcUJ3QyxRQUFyQixDQUE4QixDQUE5QixFQUFpQ3VDLE1BQWpDLEdBQTBDLEtBQTFDO0FBQ0g7O0FBQUE7QUFDSixLQVJEOztBQVNBLFNBQUt4QixRQUFMLENBQWMsS0FBSzRELG1CQUFuQixFQUF3QyxDQUF4QyxFQUEyQ3hJLEVBQUUsQ0FBQ3lHLEtBQUgsQ0FBU0MsY0FBcEQ7QUFDSCxHQXJVSTtBQXNVTDtBQUNBcUIsRUFBQUEsYUF2VUssMkJBdVVXO0FBQ1osU0FBS1UsbUJBQUwsR0FBMkIsWUFBWTtBQUNuQyxVQUFJekYsR0FBRyxHQUFHQyxNQUFNLENBQUNDLElBQVAsQ0FBWXRELFNBQVMsQ0FBQ0EsU0FBVixDQUFvQitELEtBQWhDLENBQVY7O0FBQ0EsV0FBSyxJQUFJUCxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHSixHQUFHLENBQUNLLE1BQXhCLEVBQWdDRCxDQUFDLEVBQWpDLEVBQXFDO0FBQ2pDO0FBQ0EsWUFBSXhELFNBQVMsQ0FBQ0EsU0FBVixDQUFvQnVELElBQXBCLENBQXlCQyxDQUF6QixFQUE0QlEsSUFBNUIsSUFBb0MsQ0FBcEMsSUFBeUNoRSxTQUFTLENBQUNBLFNBQVYsQ0FBb0JzRSxJQUFwQixJQUE0QnBFLE1BQU0sQ0FBQzZELEtBQVAsQ0FBYVAsQ0FBYixFQUFnQmlGLElBQXJGLElBQTZGekksU0FBUyxDQUFDQSxTQUFWLENBQW9CK0QsS0FBcEIsQ0FBMEJQLENBQTFCLEVBQTZCUSxJQUE3QixJQUFxQyxDQUF0SSxFQUF5STtBQUNySSxlQUFLdkMsZUFBTCxDQUFxQndDLFFBQXJCLENBQThCLENBQTlCLEVBQWlDdUMsTUFBakMsR0FBMEMsSUFBMUM7QUFDQTtBQUNILFNBSEQsTUFHTztBQUNILGVBQUsvRSxlQUFMLENBQXFCd0MsUUFBckIsQ0FBOEIsQ0FBOUIsRUFBaUN1QyxNQUFqQyxHQUEwQyxLQUExQztBQUNIOztBQUFBO0FBQ0o7O0FBQUE7QUFDSixLQVhEOztBQVlBLFNBQUt4QixRQUFMLENBQWMsS0FBSzZELG1CQUFuQixFQUF3QyxDQUF4QyxFQUEyQ3pJLEVBQUUsQ0FBQ3lHLEtBQUgsQ0FBU0MsY0FBcEQ7QUFDSCxHQXJWSTtBQXNWTDtBQUNBZ0MsRUFBQUEsVUF2Vkssd0JBdVZRO0FBQ1QsUUFBSTFGLEdBQUcsR0FBR0MsTUFBTSxDQUFDQyxJQUFQLENBQVl0RCxTQUFTLENBQUNBLFNBQVYsQ0FBb0IrSSxHQUFoQyxDQUFWOztBQUNBLFNBQUssSUFBSXZGLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdKLEdBQUcsQ0FBQ0ssTUFBeEIsRUFBZ0NELENBQUMsRUFBakMsRUFBcUM7QUFDakMsVUFBSXhELFNBQVMsQ0FBQ0EsU0FBVixDQUFvQitJLEdBQXBCLENBQXdCdkYsQ0FBeEIsRUFBMkJRLElBQTNCLElBQW1DLENBQXZDLEVBQTBDO0FBQ3RDLGFBQUs3QixhQUFMLENBQW1CMkcsVUFBbkIsQ0FBOEIsS0FBS2xJLFdBQW5DLEVBQWdENEMsQ0FBaEQ7QUFDSCxPQUZELE1BRU8sQ0FDSDtBQUNIOztBQUFBO0FBQ0o7O0FBQUE7QUFDSixHQWhXSTtBQWlXTDtBQUNBd0YsRUFBQUEsWUFsV0ssd0JBa1dRQyxLQWxXUixFQWtXZTtBQUNoQixTQUFLOUcsYUFBTCxDQUFtQjJHLFVBQW5CLENBQThCLEtBQUtsSSxXQUFuQyxFQUFnRHFJLEtBQWhEO0FBQ0gsR0FwV0k7QUFzV0w7QUFDQTtBQUVBO0FBQ0FDLEVBQUFBLDBCQTFXSyxzQ0EwV3NCQyxDQTFXdEIsRUEwV3lCO0FBQzFCLFFBQUlqSCxJQUFJLEdBQUdpSCxDQUFDLENBQUNDLE1BQWI7O0FBQ0EsU0FBSyxJQUFJNUYsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxDQUFwQixFQUF1QkEsQ0FBQyxFQUF4QixFQUE0QjtBQUN4QixXQUFLckIsYUFBTCxDQUFtQmtILGtCQUFuQixDQUFzQ25ILElBQXRDLEVBQTRDc0IsQ0FBNUMsRUFBK0MsQ0FBL0M7QUFDSDs7QUFBQTtBQUNEdEIsSUFBQUEsSUFBSSxDQUFDc0UsTUFBTCxHQUFjLEtBQWQ7QUFDQSxTQUFLdEMsUUFBTCxDQUFjbEUsU0FBUyxDQUFDQSxTQUFWLENBQW9Cc0osZ0JBQWxDO0FBQ0F0SixJQUFBQSxTQUFTLENBQUNBLFNBQVYsQ0FBb0JzSixnQkFBcEIsR0FBdUMsQ0FBdkM7QUFDSCxHQWxYSTtBQW1YTDtBQUNBQyxFQUFBQSxvQkFwWEssa0NBb1hrQjtBQUNuQjtBQUNBLFFBQUk5RSxRQUFRLEdBQUcsU0FBWEEsUUFBVyxHQUFZO0FBQ3ZCLFVBQUk2RSxnQkFBZ0IsR0FBR3RKLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQnNKLGdCQUEzQzs7QUFDQSxVQUFJQSxnQkFBZ0IsSUFBSSxDQUF4QixFQUEyQjtBQUN2QixhQUFLM0gsa0JBQUwsQ0FBd0I2RSxNQUF4QixHQUFpQyxLQUFqQztBQUNILE9BRkQsTUFFTztBQUNILGFBQUs3RSxrQkFBTCxDQUF3QjZFLE1BQXhCLEdBQWlDLElBQWpDO0FBQ0g7O0FBQUE7QUFDRCxVQUFJZ0QsS0FBSyxHQUFHLEtBQUs3SCxrQkFBTCxDQUF3QjRFLGNBQXhCLENBQXVDLHFCQUF2QyxFQUE4RGpFLFlBQTlELENBQTJFbEMsRUFBRSxDQUFDVSxLQUE5RSxDQUFaO0FBQ0EwSSxNQUFBQSxLQUFLLENBQUM1RSxNQUFOLEdBQWUwRSxnQkFBZjtBQUNILEtBVEQ7O0FBVUEsU0FBS3RFLFFBQUwsQ0FBY1AsUUFBZCxFQUF3QixDQUF4QixFQUEyQnJFLEVBQUUsQ0FBQ3lHLEtBQUgsQ0FBU0MsY0FBcEM7QUFDSCxHQWpZSTtBQWtZTDtBQUNBMkMsRUFBQUEsY0FuWUssMEJBbVlVQyxVQW5ZVixFQW1Zc0I7QUFDdkIsWUFBUUEsVUFBUjtBQUNJLFdBQUssQ0FBTDtBQUNJLGFBQUtDLE9BQUw7QUFDQTs7QUFDSixXQUFLLENBQUw7QUFDSSxhQUFLQyxPQUFMO0FBQ0E7O0FBQ0osV0FBSyxDQUFMO0FBQ0ksYUFBS0MsT0FBTDtBQUNBOztBQUNKLFdBQUssQ0FBTDtBQUNJLGFBQUtDLE9BQUw7QUFDQTtBQVpSOztBQWFDO0FBQ0osR0FsWkk7QUFtWkw7QUFDQUMsRUFBQUEsaUJBcFpLLCtCQW9aZTtBQUVoQjtBQUNBLFNBQUtSLG9CQUFMOztBQUVBLFFBQUl2SixTQUFTLENBQUNBLFNBQVYsQ0FBb0JnSyxLQUFwQixDQUEwQixDQUExQixFQUE2QmhHLElBQTdCLElBQXFDLENBQXpDLEVBQTRDO0FBQ3hDLFdBQUsyRixPQUFMO0FBQ0g7O0FBQUE7O0FBQ0QsUUFBSTNKLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQmdLLEtBQXBCLENBQTBCLENBQTFCLEVBQTZCaEcsSUFBN0IsSUFBcUMsQ0FBekMsRUFBNEM7QUFDeEMsV0FBSzRGLE9BQUw7QUFDSDs7QUFBQTs7QUFDRCxRQUFJNUosU0FBUyxDQUFDQSxTQUFWLENBQW9CZ0ssS0FBcEIsQ0FBMEIsQ0FBMUIsRUFBNkJoRyxJQUE3QixJQUFxQyxDQUF6QyxFQUE0QztBQUN4QyxXQUFLNkYsT0FBTDtBQUNIOztBQUFBOztBQUNELFFBQUk3SixTQUFTLENBQUNBLFNBQVYsQ0FBb0JnSyxLQUFwQixDQUEwQixDQUExQixFQUE2QmhHLElBQTdCLElBQXFDLENBQXpDLEVBQTRDO0FBQ3hDLFdBQUs4RixPQUFMO0FBQ0g7O0FBQUE7QUFFSixHQXRhSTtBQXVhTDtBQUNBSCxFQUFBQSxPQXhhSyxxQkF3YUs7QUFDTixRQUFJdEYsU0FBUyxHQUFHLENBQWhCOztBQUNBLFNBQUs0RixnQkFBTCxHQUF3QixZQUFZO0FBQ2hDNUYsTUFBQUEsU0FBUzs7QUFDVCxVQUFJQSxTQUFTLElBQUluRSxNQUFNLENBQUM4SixLQUFQLENBQWEsQ0FBYixFQUFnQkUsWUFBakMsRUFBK0M7QUFDM0NsSyxRQUFBQSxTQUFTLENBQUNBLFNBQVYsQ0FBb0JzSixnQkFBcEIsSUFBd0NwSixNQUFNLENBQUM4SixLQUFQLENBQWEsQ0FBYixFQUFnQkcsT0FBeEQ7QUFDQTlGLFFBQUFBLFNBQVMsR0FBRyxDQUFaO0FBQ0g7O0FBQUE7QUFDSixLQU5EOztBQU9BLFNBQUtXLFFBQUwsQ0FBYyxLQUFLaUYsZ0JBQW5CLEVBQXFDLENBQXJDLEVBQXdDN0osRUFBRSxDQUFDeUcsS0FBSCxDQUFTQyxjQUFqRDtBQUNILEdBbGJJO0FBbWJMO0FBQ0E4QyxFQUFBQSxPQXBiSyxxQkFvYks7QUFDTixRQUFJdkYsU0FBUyxHQUFHLENBQWhCOztBQUNBLFNBQUsrRixnQkFBTCxHQUF3QixZQUFZO0FBQ2hDL0YsTUFBQUEsU0FBUzs7QUFDVCxVQUFJQSxTQUFTLElBQUluRSxNQUFNLENBQUM4SixLQUFQLENBQWEsQ0FBYixFQUFnQkUsWUFBakMsRUFBK0M7QUFDM0NsSyxRQUFBQSxTQUFTLENBQUNBLFNBQVYsQ0FBb0JzSixnQkFBcEIsSUFBd0NwSixNQUFNLENBQUM4SixLQUFQLENBQWEsQ0FBYixFQUFnQkcsT0FBeEQ7QUFDQTlGLFFBQUFBLFNBQVMsR0FBRyxDQUFaO0FBQ0g7O0FBQUE7QUFDSixLQU5EOztBQU9BLFNBQUtXLFFBQUwsQ0FBYyxLQUFLb0YsZ0JBQW5CLEVBQXFDLENBQXJDLEVBQXdDaEssRUFBRSxDQUFDeUcsS0FBSCxDQUFTQyxjQUFqRDtBQUNILEdBOWJJO0FBK2JMO0FBQ0ErQyxFQUFBQSxPQWhjSyxxQkFnY0s7QUFDTixRQUFJeEYsU0FBUyxHQUFHLENBQWhCOztBQUNBLFNBQUtnRyxnQkFBTCxHQUF3QixZQUFZO0FBQ2hDaEcsTUFBQUEsU0FBUzs7QUFDVCxVQUFJQSxTQUFTLElBQUluRSxNQUFNLENBQUM4SixLQUFQLENBQWEsQ0FBYixFQUFnQkUsWUFBakMsRUFBK0M7QUFDM0NsSyxRQUFBQSxTQUFTLENBQUNBLFNBQVYsQ0FBb0JzSixnQkFBcEIsSUFBd0NwSixNQUFNLENBQUM4SixLQUFQLENBQWEsQ0FBYixFQUFnQkcsT0FBeEQ7QUFDQTlGLFFBQUFBLFNBQVMsR0FBRyxDQUFaO0FBQ0g7O0FBQUE7QUFDSixLQU5EOztBQU9BLFNBQUtXLFFBQUwsQ0FBYyxLQUFLcUYsZ0JBQW5CLEVBQXFDLENBQXJDLEVBQXdDakssRUFBRSxDQUFDeUcsS0FBSCxDQUFTQyxjQUFqRDtBQUNILEdBMWNJO0FBMmNMO0FBQ0FnRCxFQUFBQSxPQTVjSyxxQkE0Y0s7QUFDTixRQUFJekYsU0FBUyxHQUFHLENBQWhCOztBQUNBLFNBQUtpRyxnQkFBTCxHQUF3QixZQUFZO0FBQ2hDakcsTUFBQUEsU0FBUzs7QUFDVCxVQUFJQSxTQUFTLElBQUluRSxNQUFNLENBQUM4SixLQUFQLENBQWEsQ0FBYixFQUFnQkUsWUFBakMsRUFBK0M7QUFDM0NsSyxRQUFBQSxTQUFTLENBQUNBLFNBQVYsQ0FBb0JzSixnQkFBcEIsSUFBd0NwSixNQUFNLENBQUM4SixLQUFQLENBQWEsQ0FBYixFQUFnQkcsT0FBeEQ7QUFDQTlGLFFBQUFBLFNBQVMsR0FBRyxDQUFaO0FBQ0g7O0FBQUE7QUFDSixLQU5EOztBQU9BLFNBQUtXLFFBQUwsQ0FBYyxLQUFLc0YsZ0JBQW5CLEVBQXFDLENBQXJDLEVBQXdDbEssRUFBRSxDQUFDeUcsS0FBSCxDQUFTQyxjQUFqRDtBQUNILEdBdGRJO0FBdWRMO0FBQ0E7QUFDQTtBQUNBeUQsRUFBQUEsVUExZEssd0JBMGRRO0FBQ1QsUUFBSUMsUUFBUSxHQUFHLElBQUlyRCxJQUFKLEdBQVdzRCxPQUFYLEVBQWY7QUFDQSxRQUFJckgsR0FBRyxHQUFHQyxNQUFNLENBQUNDLElBQVAsQ0FBWXRELFNBQVMsQ0FBQ0EsU0FBVixDQUFvQitJLEdBQWhDLENBQVY7O0FBQ0EsUUFBSS9JLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQjBLLFNBQXBCLElBQWlDLENBQXJDLEVBQXdDO0FBQ3BDO0FBQ0ExSyxNQUFBQSxTQUFTLENBQUNBLFNBQVYsQ0FBb0IwSyxTQUFwQixHQUFnQ0YsUUFBaEM7QUFDSCxLQUhELE1BR08sSUFBSXhLLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQjBLLFNBQXBCLElBQWlDRixRQUFyQyxFQUErQztBQUNsRDtBQUNBLFdBQUssSUFBSWhILENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdKLEdBQUcsQ0FBQ0ssTUFBeEIsRUFBZ0NELENBQUMsRUFBakMsRUFBcUM7QUFDakMsWUFBSXhELFNBQVMsQ0FBQ0EsU0FBVixDQUFvQitJLEdBQXBCLENBQXdCdkYsQ0FBeEIsRUFBMkJtSCxXQUEzQixLQUEyQ0MsU0FBL0MsRUFBMEQ7QUFDdEQ1SyxVQUFBQSxTQUFTLENBQUNBLFNBQVYsQ0FBb0IrSSxHQUFwQixDQUF3QnZGLENBQXhCLEVBQTJCbUgsV0FBM0IsR0FBeUMsQ0FBekMsQ0FEc0QsQ0FFdEQ7QUFFSDs7QUFBQTtBQUNKOztBQUFBO0FBQ0QzSyxNQUFBQSxTQUFTLENBQUNBLFNBQVYsQ0FBb0IwSyxTQUFwQixHQUFnQ0YsUUFBaEM7QUFDSCxLQVZNLE1BVUEsQ0FDSDtBQUNIOztBQUFBO0FBQ0osR0E3ZUk7QUE4ZUw7QUFDQTtBQUVBO0FBQ0FLLEVBQUFBLGFBbGZLLDJCQWtmVztBQUNaO0FBQ0EsU0FBS0MsY0FBTCxHQUFzQixJQUF0QjtBQUNBLFNBQUtDLG9CQUFMLEdBQTRCLENBQTVCO0FBQ0EsU0FBS0MsZUFBTCxHQUF1QixTQUF2QjtBQUNILEdBdmZJO0FBd2ZMQyxFQUFBQSx5QkF4ZkssdUNBd2Z1QjtBQUN4QixTQUFLakosYUFBTCxDQUFtQkMsaUJBQW5CLENBQXFDLGNBQXJDOztBQUNBLFFBQUksS0FBSytJLGVBQUwsSUFBd0IsU0FBNUIsRUFBdUM7QUFDbkM7QUFDQSxXQUFLN0ksYUFBTCxDQUFtQitJLG1CQUFuQjtBQUNILEtBSEQsTUFHTyxJQUFJLEtBQUtGLGVBQUwsSUFBd0IsT0FBNUIsRUFBcUM7QUFDeEM7QUFDQSxVQUFJMUQsUUFBUSxHQUFHLElBQUlILElBQUosR0FBV0MsT0FBWCxFQUFmO0FBQ0EsVUFBSStELGNBQWMsR0FBRzdELFFBQVEsR0FBRyxLQUFLeUQsb0JBQXJDOztBQUNBLFVBQUlJLGNBQWMsR0FBRyxJQUFyQixFQUEyQjtBQUN2QixhQUFLaEosYUFBTCxDQUFtQjBDLGNBQW5CLENBQWtDLEtBQUszQyxJQUF2QyxFQUE2QyxtQkFBN0M7QUFDSCxPQUZELE1BRU87QUFDSCxhQUFLa0osY0FBTDtBQUNIOztBQUFBO0FBQ0o7O0FBQUE7QUFDSixHQXZnQkk7QUF3Z0JMO0FBQ0FDLEVBQUFBLGVBQWUsRUFBRSwyQkFBWTtBQUN6QjtBQUNBLFNBQUtOLG9CQUFMLEdBQTRCLElBQUk1RCxJQUFKLEdBQVdDLE9BQVgsRUFBNUI7O0FBQ0EsUUFBSSxPQUFRa0UsRUFBUixJQUFlLFdBQW5CLEVBQWdDO0FBRTVCLFdBQUtOLGVBQUwsR0FBdUIsT0FBdkI7QUFDQSxXQUFLTyxxQkFBTCxHQUg0QixDQUk1Qjs7QUFDQSxXQUFLM0osZ0JBQUwsQ0FBc0JVLFlBQXRCLENBQW1DbEMsRUFBRSxDQUFDb0wsTUFBdEMsRUFBOENDLFdBQTlDLEdBQTRELEtBQUs1SixvQkFBTCxDQUEwQixDQUExQixDQUE1RDtBQUNBLFdBQUtNLGFBQUwsQ0FBbUIwQyxjQUFuQixDQUFrQyxLQUFLM0MsSUFBdkMsRUFBNkMsaUJBQTdDO0FBRUEsV0FBS3dKLFFBQUwsR0FBZ0JKLEVBQUUsQ0FBQ0ssc0JBQUgsRUFBaEI7QUFDQSxXQUFLRCxRQUFMLENBQWNFLE9BQWQsQ0FBc0IsVUFBQUMsR0FBRyxFQUFJLENBQ3pCO0FBQ0E7QUFDSCxPQUhEO0FBSUEsV0FBS0gsUUFBTCxDQUFjNUYsS0FBZCxDQUFvQjtBQUNoQmdHLFFBQUFBLFFBQVEsRUFBRTtBQURNLE9BQXBCO0FBR0g7O0FBQUE7QUFFSixHQTloQkk7QUEraEJMO0FBQ0FWLEVBQUFBLGNBQWMsRUFBRSwwQkFBWTtBQUFBOztBQUN4QixRQUFJLE9BQVFFLEVBQVIsSUFBZSxXQUFuQixFQUFnQztBQUM1QixXQUFLTixlQUFMLEdBQXVCLFNBQXZCO0FBQ0EsV0FBSzdJLGFBQUwsQ0FBbUIwQyxjQUFuQixDQUFrQyxLQUFLM0MsSUFBdkMsRUFBNkMsZUFBN0M7QUFDQSxXQUFLTixnQkFBTCxDQUFzQlUsWUFBdEIsQ0FBbUNsQyxFQUFFLENBQUNvTCxNQUF0QyxFQUE4Q0MsV0FBOUMsR0FBNEQsS0FBSzVKLG9CQUFMLENBQTBCLENBQTFCLENBQTVEO0FBRUEsV0FBSzZKLFFBQUwsQ0FBY0ssTUFBZCxDQUFxQixVQUFBRixHQUFHLEVBQUk7QUFDeEI7QUFDQTtBQUNBLFFBQUEsS0FBSSxDQUFDZixjQUFMLEdBQXNCZSxHQUFHLENBQUNHLFNBQTFCOztBQUNBLFFBQUEsS0FBSSxDQUFDN0osYUFBTCxDQUFtQitJLG1CQUFuQjtBQUNILE9BTEQ7QUFNQSxXQUFLUSxRQUFMLENBQWNPLElBQWQ7QUFFSDs7QUFBQTtBQUNKLEdBL2lCSTtBQWdqQkw7QUFDQVYsRUFBQUEscUJBampCSyxtQ0FpakJtQjtBQUNwQixRQUFJVyxVQUFVLEdBQUcsQ0FBakI7O0FBQ0EsUUFBSXpILFFBQVEsR0FBRyxTQUFYQSxRQUFXLEdBQVk7QUFDdkJ5SCxNQUFBQSxVQUFVLEdBRGEsQ0FFdkI7O0FBQ0EsVUFBSUEsVUFBVSxJQUFJLEVBQWQsSUFBb0IsS0FBS2xCLGVBQUwsSUFBd0IsU0FBaEQsRUFBMkQ7QUFDdkQsYUFBS2xHLFVBQUwsQ0FBZ0JMLFFBQWhCO0FBQ0F5SCxRQUFBQSxVQUFVLEdBQUcsQ0FBYjtBQUNBLGFBQUtkLGNBQUw7QUFDQSxhQUFLakosYUFBTCxDQUFtQjBDLGNBQW5CLENBQWtDLEtBQUszQyxJQUF2QyxFQUE2QyxlQUE3QztBQUNIOztBQUFBO0FBQ0osS0FURDs7QUFVQSxTQUFLOEMsUUFBTCxDQUFjUCxRQUFkLEVBQXdCLENBQXhCLEVBQTJCckUsRUFBRSxDQUFDeUcsS0FBSCxDQUFTQyxjQUFwQztBQUNILEdBOWpCSTtBQWdrQkw7QUFDQTtBQUVBO0FBQ0F2RSxFQUFBQSxRQUFRLEVBQUUsb0JBQVk7QUFDbEJvRSxtQkFBR3dGLElBQUg7O0FBQ0EsU0FBS2hKLFdBQUw7QUFDQSxTQUFLMkYsVUFBTDtBQUNBLFNBQUsxRSxhQUFMLEdBQXFCLENBQXJCO0FBQ0EsU0FBS2dCLFdBQUwsR0FBbUIsQ0FBbkIsQ0FMa0IsQ0FNbEI7O0FBQ0EsU0FBS2dILE9BQUwsR0FBZWhNLEVBQUUsQ0FBQ2lNLFFBQUgsQ0FBWUMsbUJBQVosRUFBZixDQVBrQixDQVFsQjs7QUFDQSxTQUFLRixPQUFMLENBQWFHLE9BQWIsR0FBdUIsSUFBdkI7QUFDQSxTQUFLeEgsaUJBQUw7QUFDQSxTQUFLVyxlQUFMO0FBQ0EsU0FBSzlCLGFBQUw7QUFDQSxTQUFLQyxZQUFMO0FBQ0EsU0FBSzZDLFNBQUw7QUFDQSxTQUFLTyxlQUFMO0FBQ0EsU0FBS2Usa0JBQUw7QUFDQSxTQUFLWCxpQkFBTDtBQUNBLFNBQUtRLGFBQUw7QUFDQSxTQUFLN0YsYUFBTCxDQUFtQndLLGFBQW5CLENBQWlDLFNBQWpDO0FBQ0EsU0FBS3pDLGlCQUFMO0FBQ0EsU0FBS1EsVUFBTDtBQUNBLFNBQUt0RSxjQUFMO0FBQ0EsU0FBSzRFLGFBQUw7QUFDQSxTQUFLNUosYUFBTCxDQUFtQjJELE1BQW5CLEdBQTRCNUUsU0FBUyxDQUFDQSxTQUFWLENBQW9Ca0YsT0FBaEQ7QUFDSCxHQTdsQkk7QUFpbUJMO0FBQ0E7QUFDQXVILEVBQUFBLG9CQW5tQkssZ0NBbW1CZ0J0RCxDQW5tQmhCLEVBbW1CbUJ1RCxNQW5tQm5CLEVBbW1CMkI7QUFDNUIsWUFBUUEsTUFBUjtBQUNJLFdBQUssR0FBTDtBQUNJLGFBQUt4SSxRQUFMLENBQWNsRSxTQUFTLENBQUNBLFNBQVYsQ0FBb0J3RSxLQUFwQixDQUEwQkQsUUFBMUIsR0FBcUMsR0FBckMsR0FBMkMsR0FBekQ7QUFDQTs7QUFDSixXQUFLLEdBQUw7QUFDSSxhQUFLWSxNQUFMLENBQVksSUFBSW5GLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQndGLEtBQXhCLEdBQWdDLENBQTVDO0FBQ0E7O0FBQ0osV0FBSyxHQUFMO0FBQ0ksWUFBSXhGLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQitJLEdBQXBCLENBQXdCLENBQXhCLEVBQTJCL0UsSUFBM0IsSUFBbUMsQ0FBdkMsRUFBMEM7QUFDdENoRSxVQUFBQSxTQUFTLENBQUNBLFNBQVYsQ0FBb0IrSSxHQUFwQixDQUF3QixDQUF4QixFQUEyQi9FLElBQTNCLEdBQWtDLENBQWxDO0FBQ0EsZUFBSzdCLGFBQUwsQ0FBbUIyRyxVQUFuQixDQUE4QixLQUFLNUcsSUFBbkMsRUFBeUMsQ0FBekM7QUFDSDs7QUFDRCxZQUFJbEMsU0FBUyxDQUFDQSxTQUFWLENBQW9CK0ksR0FBcEIsQ0FBd0IsQ0FBeEIsRUFBMkIvRSxJQUEzQixJQUFtQyxDQUF2QyxFQUEwQztBQUN0Q2hFLFVBQUFBLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQitJLEdBQXBCLENBQXdCLENBQXhCLEVBQTJCL0UsSUFBM0IsR0FBa0MsQ0FBbEM7QUFDQSxlQUFLN0IsYUFBTCxDQUFtQjJHLFVBQW5CLENBQThCLEtBQUs1RyxJQUFuQyxFQUF5QyxDQUF6QztBQUNIOztBQUNELFlBQUlsQyxTQUFTLENBQUNBLFNBQVYsQ0FBb0IrSSxHQUFwQixDQUF3QixDQUF4QixFQUEyQi9FLElBQTNCLElBQW1DLENBQXZDLEVBQTBDO0FBQ3RDaEUsVUFBQUEsU0FBUyxDQUFDQSxTQUFWLENBQW9CK0ksR0FBcEIsQ0FBd0IsQ0FBeEIsRUFBMkIvRSxJQUEzQixHQUFrQyxDQUFsQztBQUNBLGVBQUs3QixhQUFMLENBQW1CMkcsVUFBbkIsQ0FBOEIsS0FBSzVHLElBQW5DLEVBQXlDLENBQXpDO0FBQ0g7O0FBQ0QsWUFBSWxDLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQitJLEdBQXBCLENBQXdCLENBQXhCLEVBQTJCL0UsSUFBM0IsSUFBbUMsQ0FBdkMsRUFBMEM7QUFDdENoRSxVQUFBQSxTQUFTLENBQUNBLFNBQVYsQ0FBb0IrSSxHQUFwQixDQUF3QixDQUF4QixFQUEyQi9FLElBQTNCLEdBQWtDLENBQWxDO0FBQ0EsZUFBSzdCLGFBQUwsQ0FBbUIyRyxVQUFuQixDQUE4QixLQUFLNUcsSUFBbkMsRUFBeUMsQ0FBekM7QUFDSCxTQWhCTCxDQWlCSTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7O0FBQ0osV0FBSyxHQUFMO0FBQ0lsQyxRQUFBQSxTQUFTLENBQUNBLFNBQVYsQ0FBb0IrSSxHQUFwQixDQUF3QixDQUF4QixFQUEyQi9FLElBQTNCLEdBQWtDLENBQWxDO0FBQ0E7O0FBQ0osV0FBSyxHQUFMO0FBQ0loRSxRQUFBQSxTQUFTLENBQUNBLFNBQVYsQ0FBb0IrSSxHQUFwQixDQUF3QixDQUF4QixFQUEyQi9FLElBQTNCLEdBQWtDLENBQWxDO0FBQ0E7QUFsQ1I7O0FBbUNDO0FBQ0osR0F4b0JJO0FBMG9CTDJJLEVBQUFBLE1BMW9CSyxvQkEwb0JJO0FBQ0wsU0FBS3hLLGFBQUwsR0FBcUIvQixFQUFFLENBQUN3TSxJQUFILENBQVEsU0FBUixFQUFtQnRLLFlBQW5CLENBQWdDLFlBQWhDLENBQXJCO0FBQ0EsU0FBS04sYUFBTCxHQUFxQjVCLEVBQUUsQ0FBQ3dNLElBQUgsQ0FBUSxlQUFSLEVBQXlCdEssWUFBekIsQ0FBc0MsZUFBdEMsQ0FBckI7QUFDQSxTQUFLQyxRQUFMO0FBQ0gsR0E5b0JJO0FBZ3BCTHVELEVBQUFBLEtBaHBCSyxtQkFncEJHLENBRVAsQ0FscEJJLENBb3BCTDs7QUFwcEJLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciB1c2VyX2RhdGEgPSByZXF1aXJlKFwidXNlcl9kYXRhXCIpO1xyXG52YXIgY29uZmlnID0gcmVxdWlyZShcImNvbmZpZ1wiKTtcclxudmFyIHB1c2ggPSByZXF1aXJlKFwicHVzaFwiKTtcclxuaW1wb3J0IGZ4IGZyb20gXCJmeFwiO1xyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGxhbmRfcHJlZmFiOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgbGFuZF9ncm91cF9ub2RlOiBjYy5Ob2RlLFxyXG4gICAgICAgIGNlbnRlcl9ub2RlOiBjYy5Ob2RlLFxyXG4gICAgICAgIGdvbGRfbGFiZWw6IGNjLkxhYmVsLFxyXG4gICAgICAgIGV4X2xhYmVsOiBjYy5MYWJlbCxcclxuICAgICAgICBsZXZlbF9sYWJlbDogY2MuTGFiZWwsXHJcbiAgICAgICAgZGlhbW9uZF9sYWJlbDogY2MuTGFiZWwsXHJcbiAgICAgICAgZ29sZF9wcm9ncmVzc19ub2RlOiBjYy5Qcm9ncmVzc0JhcixcclxuICAgICAgICBleF9wcm9ncmVzc19ub2RlOiBjYy5Qcm9ncmVzc0JhcixcclxuICAgICAgICBwbGF5ZXJfcHJlZmFiOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgc3RhZmZfcHJlZmFiX2FycjogW2NjLlByZWZhYl0sXHJcbiAgICAgICAgd2FyZUhvdXNlX25vZGU6IGNjLk5vZGUsXHJcbiAgICAgICAgbWFpbl9jYW1lcmE6IGNjLk5vZGUsXHJcbiAgICAgICAgdGlwc19ncm91cF9ub2RlOiBjYy5Ob2RlLFxyXG4gICAgICAgIGJ1dHRvbl9ncm91cF9ub2RlOiBjYy5Ob2RlLFxyXG4gICAgICAgIGhvdGVsX3Byb2R1Y2Vfbm9kZTogY2MuTm9kZSxcclxuICAgICAgICB2aWRlb3RhcGVfYnV0dG9uOiBjYy5Ob2RlLFxyXG4gICAgICAgIHZpZGVvdGFwZV9idXR0b25fYXJyOiBbY2MuU3ByaXRlRnJhbWVdLFxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLy/mtYfmsLTmjInpkq7ooqvngrnlh7tcclxuICAgIG9uX3dhdGVyaW5nX2J1dHRvbl9jbGljazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcIm1haW5fYnV0dG9uX2NsaWNrXCIpO1xyXG4gICAgICAgIHZhciBub2RlID0gdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9idXR0b25fZ3JvdXAodGhpcy5jZW50ZXJfbm9kZSk7XHJcbiAgICAgICAgbm9kZS56SW5kZXggPSAzO1xyXG4gICAgICAgIGlmIChub2RlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJidXR0b25fbW9yZVwiKS5pbmlfbm9kZShcIndhdGVyaW5nXCIpO1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLy/ogJXlnLDmjInpkq7ooqvngrnlh7tcclxuICAgIG9uX3RpbGxfYnV0dG9uX2NsaWNrOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwibWFpbl9idXR0b25fY2xpY2tcIik7XHJcbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX2J1dHRvbl9ncm91cCh0aGlzLmNlbnRlcl9ub2RlKTtcclxuICAgICAgICBub2RlLnpJbmRleCA9IDM7XHJcbiAgICAgICAgaWYgKG5vZGUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcImJ1dHRvbl9tb3JlXCIpLmluaV9ub2RlKFwidGlsbFwiKTtcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8v5a2m5Lmg5oyJ6ZKu6KKr54K55Ye7XHJcbiAgICBvbl9zdHVkeV9idXR0b25fY2xpY2s6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJtYWluX2J1dHRvbl9jbGlja1wiKTtcclxuICAgICAgICB2YXIgbm9kZSA9IHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfc3R1ZHlfdWkodGhpcy5ub2RlKTtcclxuICAgICAgICBpZiAobm9kZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwic3R1ZHlfdWlcIikuaW5pX25vZGUoKTtcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8vaG9tZSDooqvngrnlh7vml7ZcclxuICAgIG9uX2hvbWVfYnV0dG9uX2NsaWNrKCkge1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9jbGlja1wiKTtcclxuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX29wdGlvbl91aSgpO1xyXG4gICAgfSxcclxuICAgIC8v5a6g54mp5oyJ6ZKu6KKr54K55Ye7XHJcbiAgICBvbl9wZXRfYnV0dG9uX2NsaWNrOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwibWFpbl9idXR0b25fY2xpY2tcIik7XHJcbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3BldF91aSh0aGlzLm5vZGUpO1xyXG4gICAgICAgIGlmIChub2RlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJwZXRfdWlcIikuaW5pX25vZGUoKTtcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8v5peF6aaG5oyJ6ZKu6KKr54K55Ye7XHJcbiAgICBvbl9ob3RlbF9idXR0b25fY2xpY2soKSB7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xyXG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfaG90ZWxfdWkoKTtcclxuICAgIH0sXHJcbiAgICAvL+mbh+S9o+WRmOW3pVxyXG4gICAgb25fc3RhZmZfYnV0dG9uX2NsaWNrOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwibWFpbl9idXR0b25fY2xpY2tcIik7XHJcbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3N0YWZmX3VpKHRoaXMubm9kZSk7XHJcbiAgICAgICAgaWYgKG5vZGUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcInN0YWZmX3VpXCIpLmluaV9ub2RlKCk7XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvL+eUn+aIkOWcn+WcsFxyXG4gICAgY3JlYXRlX2xhbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgYXJyID0gT2JqZWN0LmtleXModXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMubGFuZF9wcmVmYWIpO1xyXG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMubGFuZF9ncm91cF9ub2RlO1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcImxhbmRcIikuaW5pX25vZGUoaSk7XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvL+WIm+W7uueOqeWutuWwj+S6ulxyXG4gICAgY3JlYXRlX3BsYXllcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5wbGF5ZXJfcHJlZmFiKTtcclxuICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMuY2VudGVyX25vZGU7XHJcbiAgICB9LFxyXG4gICAgLy/liJvlu7rkvaPkurpcclxuICAgIGNyZWF0ZV9zdGFmZjogZnVuY3Rpb24gKHN0YWZmX2luZGV4KSB7XHJcbiAgICAgICAgaWYgKHN0YWZmX2luZGV4ID09IG51bGwpIHtcclxuICAgICAgICAgICAgdmFyIGFyciA9IE9iamVjdC5rZXlzKHVzZXJfZGF0YS51c2VyX2RhdGEuc3RhZmYpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEuc3RhZmZbaV0uaGF2ZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnN0YWZmX3ByZWZhYl9hcnJbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5sYW5kX2dyb3VwX25vZGUuY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJzdGFmZl9haVwiKS5pbmlfbm9kZShpKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuc3RhZmZfcHJlZmFiX2FycltzdGFmZl9pbmRleF0pO1xyXG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMubGFuZF9ncm91cF9ub2RlLmNoaWxkcmVuW3N0YWZmX2luZGV4XTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJzdGFmZl9haVwiKS5pbmlfbm9kZShzdGFmZl9pbmRleCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICB9LFxyXG4gICAgLy/liLfmlrDph5HluIHmlbBcclxuICAgIGFkZF9nb2xkOiBmdW5jdGlvbiAobnVtKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYWRkX2dvbGRfYW5pbSA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkX2dvbGRfYW5pbSA9IDE7XHJcbiAgICAgICAgICAgIHZhciB0aW1lQ291bnQgPSAxMDtcclxuICAgICAgICAgICAgdmFyIGdvbGQgPSB1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQ7XHJcbiAgICAgICAgICAgIHZhciBnb2xkX21heCA9IDUwMCAqIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxbXCJnb2xkX21heFwiXSArIDUwMDtcclxuICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIFBudW0gPSBwYXJzZUludChudW0gLyB0aW1lQ291bnQpXHJcbiAgICAgICAgICAgICAgICB0aW1lQ291bnQtLTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ29sZF9sYWJlbC5zdHJpbmcgPSBnb2xkICsgUG51bSArIFwiL1wiICsgZ29sZF9tYXg7XHJcbiAgICAgICAgICAgICAgICBpZiAodGltZUNvdW50IDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQgKz0gbnVtO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuZ29sZCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQgPiBnb2xkX21heCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJ1bl9jbGlja1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMubm9kZSwgXCJnb2xkX2Z1bGxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuZ29sZCA9IGdvbGRfbWF4O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdvbGRfbGFiZWwuc3RyaW5nID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkICsgXCIvXCIgKyBnb2xkX21heDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUoY2FsbGJhY2spO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0X2dvbGRfcHJvZ3Jlc3MoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZF9nb2xkX2FuaW0gPSAwO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZShjYWxsYmFjaywgMC4wMyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkICs9IG51bTtcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuXHJcbiAgICBhZGRfZGlhbW9uZDogZnVuY3Rpb24gKG51bSkge1xyXG4gICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuZGlhbW9uZCArPSBudW07XHJcbiAgICB9LFxyXG4gICAgLy/liLfmlrBleOaVsFxyXG4gICAgYWRkX2V4OiBmdW5jdGlvbiAobnVtKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYWRkX2V4X2FuaW0gPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmFkZF9leF9hbmltID0gMTtcclxuICAgICAgICAgICAgdmFyIHRpbWVDb3VudCA9IDEwO1xyXG4gICAgICAgICAgICB2YXIgZXggPSB1c2VyX2RhdGEudXNlcl9kYXRhLm5vd19leDtcclxuICAgICAgICAgICAgdmFyIG5leHRfZXggPSAyICogdXNlcl9kYXRhLnVzZXJfZGF0YS5sZXZlbDtcclxuICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIFBudW0gPSBwYXJzZUludChudW0gLyB0aW1lQ291bnQpXHJcbiAgICAgICAgICAgICAgICB0aW1lQ291bnQtLTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZXhfbGFiZWwuc3RyaW5nID0gZXggKyBQbnVtICsgXCIvXCIgKyBuZXh0X2V4O1xyXG4gICAgICAgICAgICAgICAgaWYgKHRpbWVDb3VudCA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5ub3dfZXggKz0gbnVtO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLm5vd19leCA+IG5leHRfZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5ub3dfZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmxldmVsKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxfcG9pbnQrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9zY2VuZV9qcy5ub2RlLCBcImdpZnRfYWRfbGV2ZWxcIik7ICAgIC8vIHNob3cgbm90aWMgbGV2ZWwgdXBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKGNhbGxiYWNrKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldF9leF9wcm9ncmVzcygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkX2V4X2FuaW0gPSAwO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZShjYWxsYmFjaywgMC4wNSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5ub3dfZXggKz0gbnVtO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgfSxcclxuICAgIHNldF9nb2xkX3Byb2dyZXNzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGdvbGQgPSB1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQ7XHJcbiAgICAgICAgdmFyIGdvbGRfbWF4ID0gNTAwICogdXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbFtcImdvbGRfbWF4XCJdICsgNTAwO1xyXG4gICAgICAgIHRoaXMuZ29sZF9sYWJlbC5zdHJpbmcgPSBnb2xkICsgXCIvXCIgKyBnb2xkX21heDtcclxuICAgICAgICBjYy50d2Vlbih0aGlzLmdvbGRfcHJvZ3Jlc3Nfbm9kZSlcclxuICAgICAgICAgICAgLnRvKDAuMywgeyBwcm9ncmVzczogZ29sZCAvIGdvbGRfbWF4IH0pXHJcbiAgICAgICAgICAgIC5zdGFydCgpO1xyXG4gICAgfSxcclxuICAgIHNldF9leF9wcm9ncmVzczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBub3dfZXggPSB1c2VyX2RhdGEudXNlcl9kYXRhLm5vd19leDtcclxuICAgICAgICB2YXIgbmV4dF9leCA9IDIgKiB1c2VyX2RhdGEudXNlcl9kYXRhLmxldmVsO1xyXG4gICAgICAgIHRoaXMubGV2ZWxfbGFiZWwuc3RyaW5nID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5sZXZlbDtcclxuICAgICAgICB0aGlzLmV4X2xhYmVsLnN0cmluZyA9IG5vd19leCArIFwiL1wiICsgbmV4dF9leDtcclxuICAgICAgICBjYy50d2Vlbih0aGlzLmV4X3Byb2dyZXNzX25vZGUpXHJcbiAgICAgICAgICAgIC50bygwLjMsIHsgcHJvZ3Jlc3M6IG5vd19leCAvIG5leHRfZXggfSlcclxuICAgICAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICB9LFxyXG4gICAgLy/ku5PlupPooqvngrnlh7tcclxuICAgIG9uX3dhcmVIb3VzZV9jbGljazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9jbGlja1wiKTtcclxuICAgICAgICB2YXIgbm9kZSA9IHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfc2VsbF91aSh0aGlzLm5vZGUpO1xyXG4gICAgICAgIGlmIChub2RlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJzZWxsX3VpXCIpLmluaV9ub2RlKCk7XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvL+S7k+W6k+W3sua7oVxyXG4gICAgd2FyZUhvdXNlX2Z1bGw6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvL1xyXG4gICAgICAgIHRoaXMud2FyZUhvdXNlX3NoY2VkdWxlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgYXJyID0gT2JqZWN0LmtleXModXNlcl9kYXRhLnVzZXJfZGF0YS53YXJlSG91c2UpO1xyXG4gICAgICAgICAgICB2YXIgYWxsX2NhcGFjaXR5ID0gdXNlcl9kYXRhLnVzZXJfZGF0YS53YXJlSG91c2VfbGV2ZWwgKiBjb25maWcud2FyZUhvdXNlW1wiYWxsX2NhcGFjaXR5XCJdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEud2FyZUhvdXNlW2ldLmNvdW50ID49IGFsbF9jYXBhY2l0eSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2FyZUhvdXNlX25vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ3YXJlSG91c2VfZnVsbFwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53YXJlSG91c2Vfbm9kZS5nZXRDaGlsZEJ5TmFtZShcIndhcmVIb3VzZV9mdWxsXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy53YXJlSG91c2Vfc2hjZWR1bGUsIDAuMSk7XHJcbiAgICB9LFxyXG4gICAgLy/mnpzlm63ooqvngrnlh7tcclxuICAgIG9uX29yY2hhcmRfYnV0dG9uX2NsaWNrOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfYmdfc291bmQoXCJ2aWxsYWdlX2JnXCIpO1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcInVuX2NsaWNrXCIpO1xyXG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLm5vZGUsIFwidW5fZGV2ZWxvcFwiKTtcclxuICAgIH0sXHJcbiAgICAvL+iHquWKqOWtmOaho1xyXG4gICAgYXV0b19zYXZlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBmeC5zYXZlKCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlKGNhbGxiYWNrLCAxLCBjYy5tYWNyby5SRVBFQVRfRk9SRVZFUik7XHJcbiAgICB9LFxyXG4gICAgLy/liLfmlrDlnJ/lnLBcclxuICAgIHVwZGF0YV9sYW5kOiBmdW5jdGlvbiAobGFuZF9pbmRleCkge1xyXG4gICAgICAgIC8v5Yid5aeL5YyW5Zyf5Zyw54q25oCBXHJcbiAgICAgICAgdGhpcy5sYW5kX2dyb3VwX25vZGUuY2hpbGRyZW5bbGFuZF9pbmRleF0uZ2V0Q29tcG9uZW50KFwibGFuZFwiKS5pbmlfbm9kZShsYW5kX2luZGV4KTtcclxuICAgIH0sXHJcbiAgICAvL+iusOW9leS4iue6v+aXtumXtFxyXG4gICAgc2F2ZV9sb2dpbl90aW1lOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEubG9naW5fdGltZSA9PSAwKSB7XHJcbiAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubG9naW5fdGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLy/liJvlu7rnprvnur/mlLbnm4p1aVxyXG4gICAgb2ZmbGluZV9wcm9maXRfdWk6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgbG9naW5fdGltZSA9IHVzZXJfZGF0YS51c2VyX2RhdGEubG9naW5fdGltZTtcclxuICAgICAgICB2YXIgbm93X3RpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICB2YXIgbWluID0gTWF0aC5mbG9vcigobm93X3RpbWUgLSBsb2dpbl90aW1lKSAvICgxMDAwICogNjApKTtcclxuICAgICAgICBpZiAobWluID49IDUpIHtcclxuICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9vZmZsaW5lX3Byb2ZpdF91aSh0aGlzLm5vZGUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8v5LqS5o6o5oyJ6ZKu6KKr54K55Ye7XHJcbiAgICAvLyBvbl9wdXNoX2J1dHRvbl9jbGljazogZnVuY3Rpb24gKGUsIG5hbWUpIHtcclxuICAgIC8vICAgICBpZiAodHlwZW9mICh3eCkgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgIC8vICAgICAgICAgd3gubmF2aWdhdGVUb01pbmlQcm9ncmFtKHtcclxuICAgIC8vICAgICAgICAgICAgIGFwcElkOiBwdXNoW25hbWVdLmFwcGlkLFxyXG4gICAgLy8gICAgICAgICAgICAgcGF0aDogJycsXHJcbiAgICAvLyAgICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vIOaJk+W8gOaIkOWKn1xyXG4gICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICB9KVxyXG4gICAgLy8gICAgIH07XHJcbiAgICAvLyB9LFxyXG4gICAgLy/llYblupfmjInpkq7ooqvngrnlh7tcclxuICAgIG9uX3Nob3BfYnV0dG9uX2NsaWNrKCkge1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9jbGlja1wiKTtcclxuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3Nob3BfdWkoKTtcclxuICAgIH0sXHJcbiAgICAvL+WIm+W7uuaWsOaJi+W8leWvvFxyXG4gICAgY3JlYXRlX25vdmljZSgpIHtcclxuICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5ub3ZpY2UgPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX25vdmljZV91aSgpO1xyXG4gICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLm5vdmljZSA9IDE7XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvL+WIm+W7uuaMiemSruaPkOekulxyXG4gICAgY3JlYXRlX2J1dHRvbl90aXBzKCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5idXR0b25fZ3JvdXBfbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX2J1dHRvbl90aXBzKHRoaXMudGlwc19ncm91cF9ub2RlLCB0aGlzLmJ1dHRvbl9ncm91cF9ub2RlLmNoaWxkcmVuW2ldLnBvc2l0aW9uKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuc3R1ZHlfdWlfdGlwcygpO1xyXG4gICAgICAgIHRoaXMuc3RhZmZfdWlfdGlwcygpO1xyXG4gICAgICAgIHRoaXMuc2hvcF91aV90aXBzKCk7XHJcbiAgICB9LFxyXG4gICAgLy/otK3kubDllYblk4Hmj5DnpLpcclxuICAgIHNob3BfdWlfdGlwcygpIHtcclxuICAgICAgICB0aGlzLnNob3BfdWlfY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBsYW5kX2FyciA9IE9iamVjdC5rZXlzKHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZClcclxuICAgICAgICAgICAgdmFyIHBsYW50X2FyciA9IE9iamVjdC5rZXlzKHVzZXJfZGF0YS51c2VyX2RhdGEucGxhbnQpXHJcbiAgICAgICAgICAgIHZhciBnb2xkID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkO1xyXG4gICAgICAgICAgICB2YXIgbGV2ZWwgPSB1c2VyX2RhdGEudXNlcl9kYXRhLmxldmVsO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhbmRfYXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ29sZCA+PSBjb25maWcubGFuZFtpXS5jb3N0ICYmIGxldmVsID49IGNvbmZpZy5sYW5kW2ldLm5lZWRfbGV2ZWwgJiYgdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW2ldLmhhdmUgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGlwc19ncm91cF9ub2RlLmNoaWxkcmVuWzBdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpcHNfZ3JvdXBfbm9kZS5jaGlsZHJlblswXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgcGxhbnRfYXJyLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ29sZCA+PSBjb25maWcucGxhbnRbal0uY29zdCAmJiBsZXZlbCA+PSBjb25maWcucGxhbnRbal0ubmVlZF9sZXZlbCAmJiB1c2VyX2RhdGEudXNlcl9kYXRhLnBsYW50W2pdLmhhdmUgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGlwc19ncm91cF9ub2RlLmNoaWxkcmVuWzBdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpcHNfZ3JvdXBfbm9kZS5jaGlsZHJlblswXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMuc2hvcF91aV9jYWxsYmFjaywgMSk7XHJcbiAgICB9LFxyXG4gICAgLy/liqDngrnmj5DnpLpcclxuICAgIHN0dWR5X3VpX3RpcHMoKSB7XHJcbiAgICAgICAgdGhpcy5zdGR1eV90aXBzX2NhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgc2tpbGxfcG9pbnQgPSB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsX3BvaW50O1xyXG4gICAgICAgICAgICBpZiAoc2tpbGxfcG9pbnQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpcHNfZ3JvdXBfbm9kZS5jaGlsZHJlblsxXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy/mioDog73ngrnkuI3otrPkuI3mj5DnpLpcclxuICAgICAgICAgICAgICAgIHRoaXMudGlwc19ncm91cF9ub2RlLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLnN0ZHV5X3RpcHNfY2FsbGJhY2ssIDEsIGNjLm1hY3JvLlJFUEVBVF9GT1JFVkVSKTtcclxuICAgIH0sXHJcbiAgICAvL+mbh+S9o+W3peS6uuaPkOekulxyXG4gICAgc3RhZmZfdWlfdGlwcygpIHtcclxuICAgICAgICB0aGlzLnN0YWZmX3RpcHNfY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBhcnIgPSBPYmplY3Qua2V5cyh1c2VyX2RhdGEudXNlcl9kYXRhLnN0YWZmKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIC8v5oul5pyJ6L+Z5Z2X5Zyf5ZywXHJcbiAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW2ldLmhhdmUgPT0gMSAmJiB1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQgPj0gY29uZmlnLnN0YWZmW2ldLmNvc3QgJiYgdXNlcl9kYXRhLnVzZXJfZGF0YS5zdGFmZltpXS5oYXZlID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpcHNfZ3JvdXBfbm9kZS5jaGlsZHJlblszXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aXBzX2dyb3VwX25vZGUuY2hpbGRyZW5bM10uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLnN0YWZmX3RpcHNfY2FsbGJhY2ssIDEsIGNjLm1hY3JvLlJFUEVBVF9GT1JFVkVSKTtcclxuICAgIH0sXHJcbiAgICAvL+WIm+W7uuWuoOeJqVxyXG4gICAgY3JlYXRlX3BldCgpIHtcclxuICAgICAgICB2YXIgYXJyID0gT2JqZWN0LmtleXModXNlcl9kYXRhLnVzZXJfZGF0YS5wZXQpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLnBldFtpXS5oYXZlID09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfcGV0KHRoaXMuY2VudGVyX25vZGUsIGkpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8v5Y2V5Liq5Yib5bu65a6g54mpXHJcbiAgICBjcmVhdGVfcGV0X2EoaW5kZXgpIHtcclxuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3BldCh0aGlzLmNlbnRlcl9ub2RlLCBpbmRleCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAgIC8v6aKG5Y+W5pS255uKXHJcbiAgICBvbl9nZXRfaG90ZWxfcHJvZHVjZV9jbGljayhlKSB7XHJcbiAgICAgICAgdmFyIG5vZGUgPSBlLnRhcmdldDtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDM7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX2dvbGRfZWZmZWN0KG5vZGUsIGksIDApO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmFkZF9nb2xkKHVzZXJfZGF0YS51c2VyX2RhdGEuaG90ZWxfY2FjaGVfZ29sZCk7XHJcbiAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5ob3RlbF9jYWNoZV9nb2xkID0gMDtcclxuICAgIH0sXHJcbiAgICAvL+WIt+aWsOaXhemmhuaUtuebilxyXG4gICAgdXBkYXRlX2hvdGVsX3Byb2R1Y2UoKSB7XHJcbiAgICAgICAgLy8xc+abtOaWsOS4gOasoeaVsOaNrlxyXG4gICAgICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGhvdGVsX2NhY2hlX2dvbGQgPSB1c2VyX2RhdGEudXNlcl9kYXRhLmhvdGVsX2NhY2hlX2dvbGQ7XHJcbiAgICAgICAgICAgIGlmIChob3RlbF9jYWNoZV9nb2xkID09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaG90ZWxfcHJvZHVjZV9ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ob3RlbF9wcm9kdWNlX25vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdmFyIGxhYmVsID0gdGhpcy5ob3RlbF9wcm9kdWNlX25vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJob3RlbF9wcm9kdWNlX2xhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgICAgIGxhYmVsLnN0cmluZyA9IGhvdGVsX2NhY2hlX2dvbGQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlKGNhbGxiYWNrLCAxLCBjYy5tYWNyby5SRVBFQVRfRk9SRVZFUik7XHJcbiAgICB9LFxyXG4gICAgLy/otK3kubDkuIDkuKrmiL/pl7RcclxuICAgIGhvdGVsX2J1eV9yb29tKHJvb21faW5kZXgpIHtcclxuICAgICAgICBzd2l0Y2ggKHJvb21faW5kZXgpIHtcclxuICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5ob3RlbF8wKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5ob3RlbF8xKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5ob3RlbF8yKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5ob3RlbF8zKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8v5Yid5aeL5YyW5peF6aaG5Lqn5Ye6XHJcbiAgICBpbmlfaG90ZWxfcHJvZHVjZSgpIHtcclxuXHJcbiAgICAgICAgLy/lkK/liqjliLfmlrDmlLbnm4pcclxuICAgICAgICB0aGlzLnVwZGF0ZV9ob3RlbF9wcm9kdWNlKCk7XHJcblxyXG4gICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmhvdGVsWzBdLmhhdmUgPT0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLmhvdGVsXzAoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmhvdGVsWzFdLmhhdmUgPT0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLmhvdGVsXzEoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmhvdGVsWzJdLmhhdmUgPT0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLmhvdGVsXzIoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmhvdGVsWzNdLmhhdmUgPT0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLmhvdGVsXzMoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgIH0sXHJcbiAgICAvL2hvdGVsMCDnlJ/miJBcclxuICAgIGhvdGVsXzAoKSB7XHJcbiAgICAgICAgdmFyIHRpbWVDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5ob3RlbF8wX3NjaGVkdWxlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aW1lQ291bnQrKztcclxuICAgICAgICAgICAgaWYgKHRpbWVDb3VudCA+PSBjb25maWcuaG90ZWxbMF0ucHJvZHVjZV90aW1lKSB7XHJcbiAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmhvdGVsX2NhY2hlX2dvbGQgKz0gY29uZmlnLmhvdGVsWzBdLnByb2R1Y2U7XHJcbiAgICAgICAgICAgICAgICB0aW1lQ291bnQgPSAwO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLmhvdGVsXzBfc2NoZWR1bGUsIDEsIGNjLm1hY3JvLlJFUEVBVF9GT1JFVkVSKTtcclxuICAgIH0sXHJcbiAgICAvL2hvdGVsMSDnlJ/miJBcclxuICAgIGhvdGVsXzEoKSB7XHJcbiAgICAgICAgdmFyIHRpbWVDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5ob3RlbF8xX3NjaGVkdWxlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aW1lQ291bnQrKztcclxuICAgICAgICAgICAgaWYgKHRpbWVDb3VudCA+PSBjb25maWcuaG90ZWxbMV0ucHJvZHVjZV90aW1lKSB7XHJcbiAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmhvdGVsX2NhY2hlX2dvbGQgKz0gY29uZmlnLmhvdGVsWzFdLnByb2R1Y2U7XHJcbiAgICAgICAgICAgICAgICB0aW1lQ291bnQgPSAwO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLmhvdGVsXzFfc2NoZWR1bGUsIDEsIGNjLm1hY3JvLlJFUEVBVF9GT1JFVkVSKTtcclxuICAgIH0sXHJcbiAgICAvL2hvdGVsMiDnlJ/miJBcclxuICAgIGhvdGVsXzIoKSB7XHJcbiAgICAgICAgdmFyIHRpbWVDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5ob3RlbF8yX3NjaGVkdWxlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aW1lQ291bnQrKztcclxuICAgICAgICAgICAgaWYgKHRpbWVDb3VudCA+PSBjb25maWcuaG90ZWxbMl0ucHJvZHVjZV90aW1lKSB7XHJcbiAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmhvdGVsX2NhY2hlX2dvbGQgKz0gY29uZmlnLmhvdGVsWzJdLnByb2R1Y2U7XHJcbiAgICAgICAgICAgICAgICB0aW1lQ291bnQgPSAwO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLmhvdGVsXzJfc2NoZWR1bGUsIDEsIGNjLm1hY3JvLlJFUEVBVF9GT1JFVkVSKTtcclxuICAgIH0sXHJcbiAgICAvL2hvdGVsMyDnlJ/miJBcclxuICAgIGhvdGVsXzMoKSB7XHJcbiAgICAgICAgdmFyIHRpbWVDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5ob3RlbF8zX3NjaGVkdWxlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aW1lQ291bnQrKztcclxuICAgICAgICAgICAgaWYgKHRpbWVDb3VudCA+PSBjb25maWcuaG90ZWxbM10ucHJvZHVjZV90aW1lKSB7XHJcbiAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmhvdGVsX2NhY2hlX2dvbGQgKz0gY29uZmlnLmhvdGVsWzNdLnByb2R1Y2U7XHJcbiAgICAgICAgICAgICAgICB0aW1lQ291bnQgPSAwO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLmhvdGVsXzNfc2NoZWR1bGUsIDEsIGNjLm1hY3JvLlJFUEVBVF9GT1JFVkVSKTtcclxuICAgIH0sXHJcbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIC8v5Yik5pat5b2T5YmN5pel5pyfXHJcbiAgICBqdWRnZV9kYXRlKCkge1xyXG4gICAgICAgIHZhciBub3dfZGF0ZSA9IG5ldyBEYXRlKCkuZ2V0RGF0ZSgpO1xyXG4gICAgICAgIHZhciBhcnIgPSBPYmplY3Qua2V5cyh1c2VyX2RhdGEudXNlcl9kYXRhLnBldCk7XHJcbiAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEuc2F2ZV9kYXRlID09IDApIHtcclxuICAgICAgICAgICAgLy/mlrDlrZjmoaPorrDlvZXml6XmnJ9cclxuICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5zYXZlX2RhdGUgPSBub3dfZGF0ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEuc2F2ZV9kYXRlICE9IG5vd19kYXRlKSB7XHJcbiAgICAgICAgICAgIC8v5pel5pyf5LiN55u45ZCM77yM6buY6K6k56ys5LqM5aSp5Y+K5Lul5ZCOLOmHjee9ruWIhuS6q+asoeaVsFxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEucGV0W2ldLnNoYXJlX2NvdW50ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnBldFtpXS5zaGFyZV9jb3VudCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdXNlcl9kYXRhLnVzZXJfZGF0YS52aWRlb3RhcGVfc2hhcmVfY291bnQgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuc2F2ZV9kYXRlID0gbm93X2RhdGU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy/ml6XmnJ/kuLrlkIzkuIDlpKlcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAgIC8v5Yid5aeL5YyW5b2V5bGP5Yqf6IO9XHJcbiAgICBpbmlfdmlkZW90YXBlKCkge1xyXG4gICAgICAgIC8v5b2V5bGP55qE5L+d5a2Y6Lev5b6EXHJcbiAgICAgICAgdGhpcy52aWRlb3RhcGVfcGF0aCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy52aWRlb3RhcGVfc3RhcnRfdGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy52aWRlb3RhcGVfc3RhdGUgPSBcInVuc3RhcnRcIjtcclxuICAgIH0sXHJcbiAgICBvbl92aWRlb3RhcGVfYnV0dG9uX2NsaWNrKCkge1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9jbGlja1wiKTtcclxuICAgICAgICBpZiAodGhpcy52aWRlb3RhcGVfc3RhdGUgPT0gXCJ1bnN0YXJ0XCIpIHtcclxuICAgICAgICAgICAgLy/mnKrlvIDlp4vov5vlhaXlpZblirHnlYzpnaJcclxuICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV92aWRlb3RhcGVfdWkoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudmlkZW90YXBlX3N0YXRlID09IFwic3RhcnRcIikge1xyXG4gICAgICAgICAgICAvL+W8gOWni+WQjuWkp+S6jjPnp5LmiY3og73lhbPpl61cclxuICAgICAgICAgICAgdmFyIG5vd190aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgICAgIHZhciB2aWRlb3RhcGVfdGltZSA9IG5vd190aW1lIC0gdGhpcy52aWRlb3RhcGVfc3RhcnRfdGltZTtcclxuICAgICAgICAgICAgaWYgKHZpZGVvdGFwZV90aW1lIDwgMzAwMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMubm9kZSwgXCJ2aWRlb3RhcGVfbm9fdGltZVwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcF92aWRlb3RhcGUoKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8v5byA5aeL5ri45oiP5b2V5bGPXHJcbiAgICBzdGFydF92aWRlb3RhcGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvL+iusOW9leS4gOS4quaXtumXtOaIs1xyXG4gICAgICAgIHRoaXMudmlkZW90YXBlX3N0YXJ0X3RpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICBpZiAodHlwZW9mICh3eCkgIT0gXCJ1bmRlZmluZWRcIikge1xyXG5cclxuICAgICAgICAgICAgdGhpcy52aWRlb3RhcGVfc3RhdGUgPSBcInN0YXJ0XCI7XHJcbiAgICAgICAgICAgIHRoaXMudmlkZW90YXBlX3RpbWVDb250cm9sKCk7XHJcbiAgICAgICAgICAgIC8v5YiH5o2i5b2V5bGP5oyJ6ZKu5Zu+5qCHXHJcbiAgICAgICAgICAgIHRoaXMudmlkZW90YXBlX2J1dHRvbi5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMudmlkZW90YXBlX2J1dHRvbl9hcnJbMV07XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLm5vZGUsIFwidmlkZW90YXBlX3N0YXJ0XCIpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5yZWNvcmRlciA9IHd4LmdldEdhbWVSZWNvcmRlck1hbmFnZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5yZWNvcmRlci5vblN0YXJ0KHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuW9leWxj+W8gOWni1wiKTtcclxuICAgICAgICAgICAgICAgIC8vIGRvIHNvbWV0aGluZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVjb3JkZXIuc3RhcnQoe1xyXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDYwXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgfSxcclxuICAgIC8v57uT5p2f5ri45oiP5b2V5bGPXHJcbiAgICBzdG9wX3ZpZGVvdGFwZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgKHd4KSAhPSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmlkZW90YXBlX3N0YXRlID0gXCJ1bnN0YXJ0XCI7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLm5vZGUsIFwidmlkb3RhcGVfb3ZlclwiKTtcclxuICAgICAgICAgICAgdGhpcy52aWRlb3RhcGVfYnV0dG9uLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy52aWRlb3RhcGVfYnV0dG9uX2FyclswXTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucmVjb3JkZXIub25TdG9wKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXMudmlkZW9QYXRoLCBcIuW9leWxj+e7k+adn1wiKTtcclxuICAgICAgICAgICAgICAgIC8vIGRvIHNvbWV0aGluZTtcclxuICAgICAgICAgICAgICAgIHRoaXMudmlkZW90YXBlX3BhdGggPSByZXMudmlkZW9QYXRoO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV92aWRlb3RhcGVfdWkoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVjb3JkZXIuc3RvcCgpO1xyXG5cclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8v5b2V5bGP5pe26Ze05o6n5Yi2XHJcbiAgICB2aWRlb3RhcGVfdGltZUNvbnRyb2woKSB7XHJcbiAgICAgICAgdmFyIHRpbWVfY291bnQgPSAwO1xyXG4gICAgICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGltZV9jb3VudCsrO1xyXG4gICAgICAgICAgICAvL+i2hei/h+S6huacgOWkp+aXtumVv+aIluiAheW9leWItueKtuaAgeS4uuacquW8gOWQr1xyXG4gICAgICAgICAgICBpZiAodGltZV9jb3VudCA+PSA2MCB8fCB0aGlzLnZpZGVvdGFwZV9zdGF0ZSA9PSBcInVuc3RhcnRcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKGNhbGxiYWNrKTtcclxuICAgICAgICAgICAgICAgIHRpbWVfY291bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wX3ZpZGVvdGFwZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMubm9kZSwgXCJ2aWRvdGFwZV9vdmVyXCIpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZShjYWxsYmFjaywgMSwgY2MubWFjcm8uUkVQRUFUX0ZPUkVWRVIpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICAvL+WIneWni+WMluiKgueCuVxyXG4gICAgaW5pX25vZGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmeC5sb2FkKCk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVfbGFuZCgpO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlX3BldCgpO1xyXG4gICAgICAgIHRoaXMuYWRkX2dvbGRfYW5pbSA9IDA7XHJcbiAgICAgICAgdGhpcy5hZGRfZXhfYW5pbSA9IDA7XHJcbiAgICAgICAgLy/osIPnlKjnorDmkp7mo4DmtYvnu4Tku7ZcclxuICAgICAgICB0aGlzLm1hbmFnZXIgPSBjYy5kaXJlY3Rvci5nZXRDb2xsaXNpb25NYW5hZ2VyKCk7XHJcbiAgICAgICAgLy/pu5jorqTnorDmkp7kuLrlhbNcclxuICAgICAgICB0aGlzLm1hbmFnZXIuZW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zZXRfZ29sZF9wcm9ncmVzcygpO1xyXG4gICAgICAgIHRoaXMuc2V0X2V4X3Byb2dyZXNzKCk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVfcGxheWVyKCk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVfc3RhZmYoKTtcclxuICAgICAgICB0aGlzLmF1dG9fc2F2ZSgpO1xyXG4gICAgICAgIHRoaXMuc2F2ZV9sb2dpbl90aW1lKCk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVfYnV0dG9uX3RpcHMoKTtcclxuICAgICAgICB0aGlzLm9mZmxpbmVfcHJvZml0X3VpKCk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVfbm92aWNlKCk7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfYmdfc291bmQoXCJob21lX2JnXCIpO1xyXG4gICAgICAgIHRoaXMuaW5pX2hvdGVsX3Byb2R1Y2UoKTtcclxuICAgICAgICB0aGlzLmp1ZGdlX2RhdGUoKTtcclxuICAgICAgICB0aGlzLndhcmVIb3VzZV9mdWxsKCk7XHJcbiAgICAgICAgdGhpcy5pbmlfdmlkZW90YXBlKCk7XHJcbiAgICAgICAgdGhpcy5kaWFtb25kX2xhYmVsLnN0cmluZyA9IHVzZXJfZGF0YS51c2VyX2RhdGEuZGlhbW9uZDtcclxuICAgIH0sXHJcblxyXG5cclxuXHJcbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICBvbl90ZXN0X2J1dHRvbl9jbGljayhlLCBjdXN0b20pIHtcclxuICAgICAgICBzd2l0Y2ggKGN1c3RvbSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiMFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRfZ29sZCh1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsLmdvbGRfbWF4ICogNTAwICsgNTAwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiMVwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRfZXgoMiAqIHVzZXJfZGF0YS51c2VyX2RhdGEubGV2ZWwgKyAxKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiMlwiOlxyXG4gICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEucGV0WzBdLmhhdmUgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEucGV0WzBdLmhhdmUgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfcGV0KHRoaXMubm9kZSwgMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbMV0uaGF2ZSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbMV0uaGF2ZSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9wZXQodGhpcy5ub2RlLCAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLnBldFsyXS5oYXZlID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnBldFsyXS5oYXZlID0gMTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3BldCh0aGlzLm5vZGUsIDIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEucGV0WzNdLmhhdmUgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEucGV0WzNdLmhhdmUgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfcGV0KHRoaXMubm9kZSwgMyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3BldCh0aGlzLm5vZGUsIDApO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9wZXQodGhpcy5ub2RlLCAxKTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiaGF2ZSBwZXQgXCIgKyB1c2VyX2RhdGEudXNlcl9kYXRhLnBldFswXS5oYXZlKTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiaGF2ZSBwZXQgXCIgKyB1c2VyX2RhdGEudXNlcl9kYXRhLnBldFsxXS5oYXZlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiM1wiOlxyXG4gICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbMl0uaGF2ZSA9IDE7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIjRcIjpcclxuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEucGV0WzJdLmhhdmUgPSAwO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfc2NlbmVcIik7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sID0gY2MuZmluZChcInNvdW5kX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwic291bmRfY29udHJvbFwiKTtcclxuICAgICAgICB0aGlzLmluaV9ub2RlKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pO1xyXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/AdsManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7548f9QM11K+qkbzP1yyO2m', 'AdsManager');
// script/AdsManager.js

"use strict";

// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
cc.Class({
  "extends": cc.Component,
  properties: {
    bannerUnitId: "",
    showFullUnitId: "",
    videoUnitId: "",
    bannerOnStart: false,
    banner: null,
    showFull: null,
    video: null,
    rewardVideoCallback: null,
    isTest: false //bannerLoaded: false,

  },
  onLoad: function onLoad() {
    var _this = this;

    if (cc.sys.platform === cc.sys.IPHONE || cc.sys.platform === cc.sys.ANDROID || cc.sys.platform === cc.sys.IPAD) {
      // Enable debug log, this is for testing only, please comment it out before publish.
      tradplus.tradPlusService.setEnableLog(true); // Initialize the SDK.

      tradplus.tradPlusService.initSdk();
      cc.log("====25===="); // Enable test mode, this is for testing only, please comment it out before publish.

      tradplus.tradPlusService.setNeedTestDevice(true); // Enable debug log, this is for testing only, please comment it out before publish.

      tradplus.tradPlusService.setEnableLog(true);

      if (this.bannerOnStart) {
        this.banner = tradplus.tradPlusService.getBanner(this.bannerUnitId);
      }

      this.showFull = tradplus.tradPlusService.getInterstitial(this.showFullUnitId);
      this.video = tradplus.tradPlusService.getRewardedVideo(this.videoUnitId);

      if (this.bannerOnStart) {
        this.banner.setAdListener({
          onAdLoaded: function onAdLoaded(adSourceName) {
            // Triggered on Ad loaded, adSourceName is the name of Ad source platform.
            //this.bannerLoaded = true;
            cc.log("banner loaded");
          },
          onAdClicked: function onAdClicked() {// Triggered on Ad clicked.
          },
          onAdLoadFailed: function onAdLoadFailed(adError) {
            // Triggered on Ad load failed, adError contains error information.
            cc.log("AdLoadFailed: " + adError);
          },
          onAdImpression: function onAdImpression() {// Triggered on Ad shown.
          },
          onAdShowFailed: function onAdShowFailed(adError) {
            // Triggered on Ad show failed, adError contains error information.
            // NOTE: This callback will only triggered on Android.
            cc.log("AdShowFailed" + adError);
          },
          onAdClosed: function onAdClosed() {// Triggered on Ad closed.
            // NOTE: This callback will only triggered on Android.
          },
          onBannerRefreshed: function onBannerRefreshed() {// Triggered on Ad refreshed.
            // NOTE: This callback will only triggered on Android.
          }
        });
      }

      this.showFull.setAdListener({
        onAdAllLoaded: function onAdAllLoaded(adSourceName) {// Triggered on Ad loaded, adSourceName is the name of Ad source platform.
        },
        onAdLoaded: function onAdLoaded(adSourceName) {// Triggered on Ad loaded, adSourceName is the name of Ad source platform.
        },
        onAdClicked: function onAdClicked() {// Triggered on Ad clicked.
        },
        onAdFailed: function onAdFailed(adError) {// Triggered on Ad load failed, adError contains error information.
        },
        onAdImpression: function onAdImpression() {// Triggered on Ad shown.
        },
        onAdShowFailed: function onAdShowFailed(adError) {// Triggered on Ad show failed, adError contains error information.
          // NOTE: This callback will only triggered on Android.
        },
        onAdClosed: function onAdClosed() {
          // Triggered on Ad closed.
          // NOTE: This callback will only triggered on Android.
          _this.loadInterstitial();
        },
        onAdPlayFailed: function onAdPlayFailed(adError) {// Triggered on Ad load failed, adError contains error information.
        },
        onOneLayerLoadFailed: function onOneLayerLoadFailed(adSourceName, adError) {// Triggered on Ad load failed, adError contains error information.
        },
        onOneLayerLoaded: function onOneLayerLoaded(adSourceName) {// Triggered on Ad loaded, adSourceName is the name of Ad source platform.
        }
      });
      this.video.setAdListener({
        onAdAllLoaded: function onAdAllLoaded(adSourceName) {// Triggered on Ad loaded, adSourceName is the name of Ad source platform.
        },
        onAdLoaded: function onAdLoaded(adSourceName) {// Triggered on Ad loaded, adSourceName is the name of Ad source platform.
        },
        onAdClicked: function onAdClicked() {// Triggered on Ad clicked.
        },
        onAdFailed: function onAdFailed(adError) {
          // Triggered on Ad load failed, adError contains error information.
          cc.log("onAdFailed: " + adError);
        },
        onAdImpression: function onAdImpression() {// Triggered on Ad shown.
        },
        onAdClosed: function onAdClosed() {
          // Triggered on Ad closed.
          // NOTE: This callback will only triggered on Android.
          _this.video.loadAd();
        },
        onAdPlayFailed: function onAdPlayFailed(adError) {
          // Triggered on Ad shown, adSourceName is the name of Ad source platform
          cc.log("onAdPlayFailed: " + adError);
        },
        onOneLayerLoadFailed: function onOneLayerLoadFailed(adSourceName, adError) {
          // Triggered on Ad load failed, adError contains error information.
          cc.log("onOneLayerLoadFailed: " + adError);
        },
        onOneLayerLoaded: function onOneLayerLoaded(adSourceName) {// Triggered on Ad loaded, adSourceName is the name of Ad source platform.
        },
        onAdNotReward: function onAdNotReward() {},
        onAdReward: function onAdReward(currencyName, amount) {
          console.log("ads: ====173====");

          if (_this.rewardVideoCallback != null) {
            console.log("ads: ====175====");

            _this.rewardVideoCallback();
          }
        }
      });
      this.loadVideo();
      this.loadInterstitial();
    }
  },
  loadInterstitial: function loadInterstitial() {
    this.showFull.loadAd();
  },
  loadVideo: function loadVideo() {
    this.video.loadAd();
  },
  showRewardedVideo: function showRewardedVideo(callback) {
    cc.log(this.isTest);

    if (this.isTest) {
      callback();
    } else {
      if (cc.sys.platform === cc.sys.IPHONE || cc.sys.platform === cc.sys.ANDROID || cc.sys.platform === cc.sys.IPAD) {
        if (this.video != null && this.video.ready) {
          this.rewardVideoCallback = callback;
          this.video.showAd();
        }
      }
    }
  },
  showBanner: function showBanner() {
    if (cc.sys.platform === cc.sys.IPHONE || cc.sys.platform === cc.sys.ANDROID || cc.sys.platform === cc.sys.IPAD) {
      if (this.banner != null) {
        this.banner.loadAd('bottom');
      }
    }
  },
  showInterstitial: function showInterstitial() {
    if (cc.sys.platform === cc.sys.IPHONE || cc.sys.platform === cc.sys.ANDROID || cc.sys.platform === cc.sys.IPAD) {
      if (this.showFull != null && this.showFull.ready) {
        this.showFull.showAd();
      }
    }
  },
  isHasVideo: function isHasVideo() {
    if (this.isTest) return true;
    if (cc.sys.platform === cc.sys.IPHONE || cc.sys.platform === cc.sys.ANDROID || cc.sys.platform === cc.sys.IPAD) return this.video.ready;
    return false;
  },
  isHasInterstitial: function isHasInterstitial() {
    if (this.isTest) return true;
    if (cc.sys.platform === cc.sys.IPHONE || cc.sys.platform === cc.sys.ANDROID || cc.sys.platform === cc.sys.IPAD) return this.showFull.ready;
    return false;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxBZHNNYW5hZ2VyLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiYmFubmVyVW5pdElkIiwic2hvd0Z1bGxVbml0SWQiLCJ2aWRlb1VuaXRJZCIsImJhbm5lck9uU3RhcnQiLCJiYW5uZXIiLCJzaG93RnVsbCIsInZpZGVvIiwicmV3YXJkVmlkZW9DYWxsYmFjayIsImlzVGVzdCIsIm9uTG9hZCIsInN5cyIsInBsYXRmb3JtIiwiSVBIT05FIiwiQU5EUk9JRCIsIklQQUQiLCJ0cmFkcGx1cyIsInRyYWRQbHVzU2VydmljZSIsInNldEVuYWJsZUxvZyIsImluaXRTZGsiLCJsb2ciLCJzZXROZWVkVGVzdERldmljZSIsImdldEJhbm5lciIsImdldEludGVyc3RpdGlhbCIsImdldFJld2FyZGVkVmlkZW8iLCJzZXRBZExpc3RlbmVyIiwib25BZExvYWRlZCIsImFkU291cmNlTmFtZSIsIm9uQWRDbGlja2VkIiwib25BZExvYWRGYWlsZWQiLCJhZEVycm9yIiwib25BZEltcHJlc3Npb24iLCJvbkFkU2hvd0ZhaWxlZCIsIm9uQWRDbG9zZWQiLCJvbkJhbm5lclJlZnJlc2hlZCIsIm9uQWRBbGxMb2FkZWQiLCJvbkFkRmFpbGVkIiwibG9hZEludGVyc3RpdGlhbCIsIm9uQWRQbGF5RmFpbGVkIiwib25PbmVMYXllckxvYWRGYWlsZWQiLCJvbk9uZUxheWVyTG9hZGVkIiwibG9hZEFkIiwib25BZE5vdFJld2FyZCIsIm9uQWRSZXdhcmQiLCJjdXJyZW5jeU5hbWUiLCJhbW91bnQiLCJjb25zb2xlIiwibG9hZFZpZGVvIiwic2hvd1Jld2FyZGVkVmlkZW8iLCJjYWxsYmFjayIsInJlYWR5Iiwic2hvd0FkIiwic2hvd0Jhbm5lciIsInNob3dJbnRlcnN0aXRpYWwiLCJpc0hhc1ZpZGVvIiwiaXNIYXNJbnRlcnN0aXRpYWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFD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QUFILENBQU9DLFFBQVAsS0FBb0JmLEVBQUUsQ0FBQ2MsR0FBSCxDQUFPSSxJQUExRyxFQUNJLE9BQU8sS0FBS1QsUUFBTCxDQUFjNEMsS0FBckI7QUFDSixXQUFPLEtBQVA7QUFDSDtBQXRPSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBjYy5DbGFzczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgYmFubmVyVW5pdElkOiBcIlwiLFxyXG4gICAgICAgIHNob3dGdWxsVW5pdElkOiBcIlwiLFxyXG4gICAgICAgIHZpZGVvVW5pdElkOiBcIlwiLFxyXG4gICAgICAgIGJhbm5lck9uU3RhcnQ6IGZhbHNlLFxyXG4gICAgICAgIGJhbm5lcjogbnVsbCxcclxuICAgICAgICBzaG93RnVsbDogbnVsbCxcclxuICAgICAgICB2aWRlbzogbnVsbCxcclxuICAgICAgICByZXdhcmRWaWRlb0NhbGxiYWNrOiBudWxsLFxyXG4gICAgICAgIGlzVGVzdDogZmFsc2UsXHJcbiAgICAgICAgLy9iYW5uZXJMb2FkZWQ6IGZhbHNlLFxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLklQSE9ORSB8fCBjYy5zeXMucGxhdGZvcm0gPT09IGNjLnN5cy5BTkRST0lEIHx8IGNjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLklQQUQpIHtcclxuICAgICAgICAgICAgLy8gRW5hYmxlIGRlYnVnIGxvZywgdGhpcyBpcyBmb3IgdGVzdGluZyBvbmx5LCBwbGVhc2UgY29tbWVudCBpdCBvdXQgYmVmb3JlIHB1Ymxpc2guXHJcbiAgICAgICAgICAgIHRyYWRwbHVzLnRyYWRQbHVzU2VydmljZS5zZXRFbmFibGVMb2codHJ1ZSk7XHJcbiAgICAgICAgICAgIC8vIEluaXRpYWxpemUgdGhlIFNESy5cclxuICAgICAgICAgICAgdHJhZHBsdXMudHJhZFBsdXNTZXJ2aWNlLmluaXRTZGsoKTtcclxuICAgICAgICAgICAgY2MubG9nKFwiPT09PTI1PT09PVwiKTtcclxuICAgICAgICAgICAgLy8gRW5hYmxlIHRlc3QgbW9kZSwgdGhpcyBpcyBmb3IgdGVzdGluZyBvbmx5LCBwbGVhc2UgY29tbWVudCBpdCBvdXQgYmVmb3JlIHB1Ymxpc2guXHJcbiAgICAgICAgICAgIHRyYWRwbHVzLnRyYWRQbHVzU2VydmljZS5zZXROZWVkVGVzdERldmljZSh0cnVlKTtcclxuICAgICAgICAgICAgLy8gRW5hYmxlIGRlYnVnIGxvZywgdGhpcyBpcyBmb3IgdGVzdGluZyBvbmx5LCBwbGVhc2UgY29tbWVudCBpdCBvdXQgYmVmb3JlIHB1Ymxpc2guXHJcbiAgICAgICAgICAgIHRyYWRwbHVzLnRyYWRQbHVzU2VydmljZS5zZXRFbmFibGVMb2codHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5iYW5uZXJPblN0YXJ0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhbm5lciA9IHRyYWRwbHVzLnRyYWRQbHVzU2VydmljZS5nZXRCYW5uZXIodGhpcy5iYW5uZXJVbml0SWQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNob3dGdWxsID0gdHJhZHBsdXMudHJhZFBsdXNTZXJ2aWNlLmdldEludGVyc3RpdGlhbCh0aGlzLnNob3dGdWxsVW5pdElkKTtcclxuICAgICAgICAgICAgdGhpcy52aWRlbyA9IHRyYWRwbHVzLnRyYWRQbHVzU2VydmljZS5nZXRSZXdhcmRlZFZpZGVvKHRoaXMudmlkZW9Vbml0SWQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuYmFubmVyT25TdGFydCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iYW5uZXIuc2V0QWRMaXN0ZW5lcih7XHJcbiAgICAgICAgICAgICAgICAgICAgb25BZExvYWRlZDogKGFkU291cmNlTmFtZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUcmlnZ2VyZWQgb24gQWQgbG9hZGVkLCBhZFNvdXJjZU5hbWUgaXMgdGhlIG5hbWUgb2YgQWQgc291cmNlIHBsYXRmb3JtLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMuYmFubmVyTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MubG9nKFwiYmFubmVyIGxvYWRlZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBvbkFkQ2xpY2tlZDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUcmlnZ2VyZWQgb24gQWQgY2xpY2tlZC5cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBvbkFkTG9hZEZhaWxlZDogKGFkRXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIGxvYWQgZmFpbGVkLCBhZEVycm9yIGNvbnRhaW5zIGVycm9yIGluZm9ybWF0aW9uLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5sb2coXCJBZExvYWRGYWlsZWQ6IFwiICsgYWRFcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb25BZEltcHJlc3Npb246ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIHNob3duLlxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG9uQWRTaG93RmFpbGVkOiAoYWRFcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUcmlnZ2VyZWQgb24gQWQgc2hvdyBmYWlsZWQsIGFkRXJyb3IgY29udGFpbnMgZXJyb3IgaW5mb3JtYXRpb24uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5PVEU6IFRoaXMgY2FsbGJhY2sgd2lsbCBvbmx5IHRyaWdnZXJlZCBvbiBBbmRyb2lkLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5sb2coXCJBZFNob3dGYWlsZWRcIiArIGFkRXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG9uQWRDbG9zZWQ6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIGNsb3NlZC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTk9URTogVGhpcyBjYWxsYmFjayB3aWxsIG9ubHkgdHJpZ2dlcmVkIG9uIEFuZHJvaWQuXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb25CYW5uZXJSZWZyZXNoZWQ6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIHJlZnJlc2hlZC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTk9URTogVGhpcyBjYWxsYmFjayB3aWxsIG9ubHkgdHJpZ2dlcmVkIG9uIEFuZHJvaWQuXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0Z1bGwuc2V0QWRMaXN0ZW5lcih7XHJcbiAgICAgICAgICAgICAgICBvbkFkQWxsTG9hZGVkOiAoYWRTb3VyY2VOYW1lKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIGxvYWRlZCwgYWRTb3VyY2VOYW1lIGlzIHRoZSBuYW1lIG9mIEFkIHNvdXJjZSBwbGF0Zm9ybS5cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgb25BZExvYWRlZDogKGFkU291cmNlTmFtZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRyaWdnZXJlZCBvbiBBZCBsb2FkZWQsIGFkU291cmNlTmFtZSBpcyB0aGUgbmFtZSBvZiBBZCBzb3VyY2UgcGxhdGZvcm0uXHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIG9uQWRDbGlja2VkOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIGNsaWNrZWQuXHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIG9uQWRGYWlsZWQ6IChhZEVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIGxvYWQgZmFpbGVkLCBhZEVycm9yIGNvbnRhaW5zIGVycm9yIGluZm9ybWF0aW9uLlxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBvbkFkSW1wcmVzc2lvbjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRyaWdnZXJlZCBvbiBBZCBzaG93bi5cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgb25BZFNob3dGYWlsZWQ6IChhZEVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIHNob3cgZmFpbGVkLCBhZEVycm9yIGNvbnRhaW5zIGVycm9yIGluZm9ybWF0aW9uLlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIE5PVEU6IFRoaXMgY2FsbGJhY2sgd2lsbCBvbmx5IHRyaWdnZXJlZCBvbiBBbmRyb2lkLlxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBvbkFkQ2xvc2VkOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIGNsb3NlZC5cclxuICAgICAgICAgICAgICAgICAgICAvLyBOT1RFOiBUaGlzIGNhbGxiYWNrIHdpbGwgb25seSB0cmlnZ2VyZWQgb24gQW5kcm9pZC5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRJbnRlcnN0aXRpYWwoKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgb25BZFBsYXlGYWlsZWQ6IChhZEVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIGxvYWQgZmFpbGVkLCBhZEVycm9yIGNvbnRhaW5zIGVycm9yIGluZm9ybWF0aW9uLlxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBvbk9uZUxheWVyTG9hZEZhaWxlZDogKGFkU291cmNlTmFtZSwgYWRFcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRyaWdnZXJlZCBvbiBBZCBsb2FkIGZhaWxlZCwgYWRFcnJvciBjb250YWlucyBlcnJvciBpbmZvcm1hdGlvbi5cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgb25PbmVMYXllckxvYWRlZDogKGFkU291cmNlTmFtZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRyaWdnZXJlZCBvbiBBZCBsb2FkZWQsIGFkU291cmNlTmFtZSBpcyB0aGUgbmFtZSBvZiBBZCBzb3VyY2UgcGxhdGZvcm0uXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudmlkZW8uc2V0QWRMaXN0ZW5lcih7XHJcbiAgICAgICAgICAgICAgICBvbkFkQWxsTG9hZGVkOiAoYWRTb3VyY2VOYW1lKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIGxvYWRlZCwgYWRTb3VyY2VOYW1lIGlzIHRoZSBuYW1lIG9mIEFkIHNvdXJjZSBwbGF0Zm9ybS5cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgb25BZExvYWRlZDogKGFkU291cmNlTmFtZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRyaWdnZXJlZCBvbiBBZCBsb2FkZWQsIGFkU291cmNlTmFtZSBpcyB0aGUgbmFtZSBvZiBBZCBzb3VyY2UgcGxhdGZvcm0uXHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIG9uQWRDbGlja2VkOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIGNsaWNrZWQuXHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIG9uQWRGYWlsZWQ6IChhZEVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIGxvYWQgZmFpbGVkLCBhZEVycm9yIGNvbnRhaW5zIGVycm9yIGluZm9ybWF0aW9uLlxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZyhcIm9uQWRGYWlsZWQ6IFwiICsgYWRFcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIG9uQWRJbXByZXNzaW9uOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIHNob3duLlxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBvbkFkQ2xvc2VkOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIGNsb3NlZC5cclxuICAgICAgICAgICAgICAgICAgICAvLyBOT1RFOiBUaGlzIGNhbGxiYWNrIHdpbGwgb25seSB0cmlnZ2VyZWQgb24gQW5kcm9pZC5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZGVvLmxvYWRBZCgpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBvbkFkUGxheUZhaWxlZDogKGFkRXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBUcmlnZ2VyZWQgb24gQWQgc2hvd24sIGFkU291cmNlTmFtZSBpcyB0aGUgbmFtZSBvZiBBZCBzb3VyY2UgcGxhdGZvcm1cclxuICAgICAgICAgICAgICAgICAgICBjYy5sb2coXCJvbkFkUGxheUZhaWxlZDogXCIgKyBhZEVycm9yKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgb25PbmVMYXllckxvYWRGYWlsZWQ6IChhZFNvdXJjZU5hbWUsIGFkRXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBUcmlnZ2VyZWQgb24gQWQgbG9hZCBmYWlsZWQsIGFkRXJyb3IgY29udGFpbnMgZXJyb3IgaW5mb3JtYXRpb24uXHJcbiAgICAgICAgICAgICAgICAgICAgY2MubG9nKFwib25PbmVMYXllckxvYWRGYWlsZWQ6IFwiICsgYWRFcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIG9uT25lTGF5ZXJMb2FkZWQ6IChhZFNvdXJjZU5hbWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBUcmlnZ2VyZWQgb24gQWQgbG9hZGVkLCBhZFNvdXJjZU5hbWUgaXMgdGhlIG5hbWUgb2YgQWQgc291cmNlIHBsYXRmb3JtLlxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBvbkFkTm90UmV3YXJkOiAoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBvbkFkUmV3YXJkOiAoY3VycmVuY3lOYW1lLCBhbW91bnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImFkczogPT09PTE3Mz09PT1cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucmV3YXJkVmlkZW9DYWxsYmFjayAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWRzOiA9PT09MTc1PT09PVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXdhcmRWaWRlb0NhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFZpZGVvKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZEludGVyc3RpdGlhbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgbG9hZEludGVyc3RpdGlhbCgpIHtcclxuICAgICAgICB0aGlzLnNob3dGdWxsLmxvYWRBZCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBsb2FkVmlkZW8oKSB7XHJcbiAgICAgICAgdGhpcy52aWRlby5sb2FkQWQoKTtcclxuICAgIH0sXHJcblxyXG4gICAgc2hvd1Jld2FyZGVkVmlkZW8oY2FsbGJhY2spIHtcclxuICAgICAgICBjYy5sb2codGhpcy5pc1Rlc3QpO1xyXG4gICAgICAgIGlmICh0aGlzLmlzVGVzdCkge1xyXG4gICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLklQSE9ORSB8fCBjYy5zeXMucGxhdGZvcm0gPT09IGNjLnN5cy5BTkRST0lEIHx8IGNjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLklQQUQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnZpZGVvICE9IG51bGwgJiYgdGhpcy52aWRlby5yZWFkeSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmV3YXJkVmlkZW9DYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlkZW8uc2hvd0FkKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHNob3dCYW5uZXIoKSB7XHJcbiAgICAgICAgaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLklQSE9ORSB8fCBjYy5zeXMucGxhdGZvcm0gPT09IGNjLnN5cy5BTkRST0lEIHx8IGNjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLklQQUQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYmFubmVyICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmFubmVyLmxvYWRBZCgnYm90dG9tJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHNob3dJbnRlcnN0aXRpYWwoKSB7XHJcbiAgICAgICAgaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLklQSE9ORSB8fCBjYy5zeXMucGxhdGZvcm0gPT09IGNjLnN5cy5BTkRST0lEIHx8IGNjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLklQQUQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2hvd0Z1bGwgIT0gbnVsbCAmJiB0aGlzLnNob3dGdWxsLnJlYWR5KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dGdWxsLnNob3dBZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBpc0hhc1ZpZGVvKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzVGVzdClcclxuICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICBpZiAoY2Muc3lzLnBsYXRmb3JtID09PSBjYy5zeXMuSVBIT05FIHx8IGNjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLkFORFJPSUQgfHwgY2Muc3lzLnBsYXRmb3JtID09PSBjYy5zeXMuSVBBRClcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmlkZW8ucmVhZHk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICBpc0hhc0ludGVyc3RpdGlhbCgpIHtcclxuICAgICAgICBpZiAodGhpcy5pc1Rlc3QpXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLklQSE9ORSB8fCBjYy5zeXMucGxhdGZvcm0gPT09IGNjLnN5cy5BTkRST0lEIHx8IGNjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLklQQUQpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNob3dGdWxsLnJlYWR5O1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0sXHJcbn0pO1xyXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/user_data.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '65eace6nBJP0Zhj60rjCfIY', 'user_data');
// script/user_data.js

"use strict";

exports.__esModule = true;
exports["default"] = void 0;
//对象转json数据存储
// cc.sys.localStorage.setItem('userData', JSON.stringify(userData));
//--------------------------------------------------------------------
//读取json数据
//var userData = JSON.parse(cc.sys.localStorage.getItem('userData'));
var user_data = {
  save_date: 0,
  novice: 0,
  gold: 0,
  diamond: 0,
  level: 1,
  now_ex: 0,
  wareHouse_level: 1,
  skill_point: 1,
  login_time: 0,
  sound_state: 1,
  hotel_cache_gold: 0,
  videotape_share_count: 0,
  watch_video: 0,
  auto_sell: 0,
  // tự động bán rau củ
  staff: {
    0: {
      have: 0,
      over_time: 0
    },
    1: {
      have: 0,
      over_time: 0
    },
    2: {
      have: 0,
      over_time: 0
    },
    3: {
      have: 0,
      over_time: 0
    },
    4: {
      have: 0,
      over_time: 0
    },
    5: {
      have: 0,
      over_time: 0
    }
  },
  skill: {
    gold_max: 0,
    speed_the_cut: 0,
    water_saving: 0,
    tool_improve: 0,
    labor_contract: 0,
    offline_profit: 1
  },
  pet: {
    0: {
      have: 0,
      have_ad: 0
    },
    1: {
      have: 0,
      have_ad: 0
    },
    2: {
      have: 0,
      have_ad: 1,
      create_time: 0,
      share_count: 0
    },
    3: {
      have: 0,
      have_ad: 1,
      create_time: 0,
      share_count: 0
    }
  },
  //商人
  trader: {
    recipes: 0
  },
  land: {
    0: {
      land_state: "wait_till",
      have: 1,
      plant_type: 0,
      alive_stage: 0,
      water_num: 50,
      have_water: 1
    },
    1: {
      land_state: "wait_till",
      have: 0,
      plant_type: 0,
      alive_stage: 0,
      water_num: 50,
      have_water: 1
    },
    2: {
      land_state: "wait_till",
      have: 0,
      plant_type: 0,
      alive_stage: 0,
      water_num: 50,
      have_water: 1
    },
    3: {
      land_state: "wait_till",
      have: 0,
      plant_type: 0,
      alive_stage: 0,
      water_num: 50,
      have_water: 1
    },
    4: {
      land_state: "wait_till",
      have: 0,
      plant_type: 0,
      alive_stage: 0,
      water_num: 50,
      have_water: 1
    },
    5: {
      land_state: "wait_till",
      have: 0,
      plant_type: 0,
      alive_stage: 0,
      water_num: 50,
      have_water: 1
    }
  },
  wareHouse: {
    0: {
      have: 1,
      type_buy: 'gold',
      cost: 0,
      id_product: 8,
      count: 0
    },
    1: {
      have: 1,
      type_buy: 'gold',
      cost: 0,
      id_product: 8,
      count: 0
    },
    2: {
      have: 1,
      type_buy: 'gold',
      cost: 0,
      id_product: 8,
      count: 0
    },
    3: {
      have: 0,
      type_buy: 'gold',
      cost: 5000,
      id_product: 8,
      count: 0
    },
    4: {
      have: 0,
      type_buy: 'gold',
      cost: 8000,
      id_product: 8,
      count: 0
    },
    5: {
      have: 0,
      type_buy: 'gold',
      cost: 12000,
      id_product: 8,
      count: 0
    },
    6: {
      have: 0,
      type_buy: 'gold',
      cost: 20000,
      id_product: 8,
      count: 0
    },
    7: {
      have: 0,
      type_buy: 'gold',
      cost: 30000,
      id_product: 8,
      count: 0
    },
    8: {
      have: 0,
      type_buy: 'diamond',
      cost: 10,
      id_product: 8,
      count: 0
    },
    9: {
      have: 0,
      type_buy: 'diamond',
      cost: 20,
      id_product: 8,
      count: 0
    },
    10: {
      have: 0,
      type_buy: 'diamond',
      cost: 40,
      id_product: 8,
      count: 0
    },
    11: {
      have: 0,
      type_buy: 'diamond',
      cost: 60,
      id_product: 8,
      count: 0
    },
    12: {
      have: 0,
      type_buy: 'diamond',
      cost: 80,
      id_product: 8,
      count: 0
    },
    13: {
      have: 0,
      type_buy: 'diamond',
      cost: 100,
      id_product: 8,
      count: 0
    },
    14: {
      have: 0,
      type_buy: 'diamond',
      cost: 120,
      id_product: 8,
      count: 0
    },
    15: {
      have: 0,
      type_buy: 'diamond',
      cost: 140,
      id_product: 8,
      count: 0
    },
    16: {
      have: 0,
      type_buy: 'diamond',
      cost: 160,
      id_product: 8,
      count: 0
    },
    17: {
      have: 0,
      type_buy: 'diamond',
      cost: 180,
      id_product: 8,
      count: 0
    },
    18: {
      have: 0,
      type_buy: 'diamond',
      cost: 200,
      id_product: 8,
      count: 0
    },
    19: {
      have: 0,
      type_buy: 'diamond',
      cost: 220,
      id_product: 8,
      count: 0
    },
    20: {
      have: 0,
      type_buy: 'diamond',
      cost: 240,
      id_product: 8,
      count: 0
    },
    21: {
      have: 0,
      type_buy: 'diamond',
      cost: 260,
      id_product: 8,
      count: 0
    },
    22: {
      have: 0,
      type_buy: 'diamond',
      cost: 280,
      id_product: 8,
      count: 0
    },
    23: {
      have: 0,
      type_buy: 'diamond',
      cost: 300,
      id_product: 8,
      count: 0
    },
    24: {
      have: 0,
      type_buy: 'diamond',
      cost: 320,
      id_product: 8,
      count: 0
    },
    25: {
      have: 0,
      type_buy: 'diamond',
      cost: 340,
      id_product: 8,
      count: 0
    },
    26: {
      have: 0,
      type_buy: 'diamond',
      cost: 360,
      id_product: 8,
      count: 0
    },
    27: {
      have: 0,
      type_buy: 'diamond',
      cost: 380,
      id_product: 8,
      count: 0
    },
    28: {
      have: 0,
      type_buy: 'diamond',
      cost: 400,
      id_product: 8,
      count: 0
    },
    29: {
      have: 0,
      type_buy: 'diamond',
      cost: 420,
      id_product: 8,
      count: 0
    }
  },
  plant: {
    0: {
      have: 1
    },
    1: {
      have: 0
    },
    2: {
      have: 0
    },
    3: {
      have: 0
    },
    4: {
      have: 0
    },
    5: {
      have: 0
    },
    6: {
      have: 0
    },
    7: {
      have: 0
    }
  },
  hotel: {
    0: {
      have: 0,
      start_time: 0
    },
    1: {
      have: 0,
      start_time: 0
    },
    2: {
      have: 0,
      start_time: 0
    },
    3: {
      have: 0,
      start_time: 0
    }
  }
};
var _default = {
  user_data: user_data
};
exports["default"] = _default;
module.exports = exports["default"];

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1c2VyX2RhdGEuanMiXSwibmFtZXMiOlsidXNlcl9kYXRhIiwic2F2ZV9kYXRlIiwibm92aWNlIiwiZ29sZCIsImRpYW1vbmQiLCJsZXZlbCIsIm5vd19leCIsIndhcmVIb3VzZV9sZXZlbCIsInNraWxsX3BvaW50IiwibG9naW5fdGltZSIsInNvdW5kX3N0YXRlIiwiaG90ZWxfY2FjaGVfZ29sZCIsInZpZGVvdGFwZV9zaGFyZV9jb3VudCIsIndhdGNoX3ZpZGVvIiwiYXV0b19zZWxsIiwic3RhZmYiLCJoYXZlIiwib3Zlcl90aW1lIiwic2tpbGwiLCJnb2xkX21heCIsInNwZWVkX3RoZV9jdXQiLCJ3YXRlcl9zYXZpbmciLCJ0b29sX2ltcHJvdmUiLCJsYWJvcl9jb250cmFjdCIsIm9mZmxpbmVfcHJvZml0IiwicGV0IiwiaGF2ZV9hZCIsImNyZWF0ZV90aW1lIiwic2hhcmVfY291bnQiLCJ0cmFkZXIiLCJyZWNpcGVzIiwibGFuZCIsImxhbmRfc3RhdGUiLCJwbGFudF90eXBlIiwiYWxpdmVfc3RhZ2UiLCJ3YXRlcl9udW0iLCJoYXZlX3dhdGVyIiwid2FyZUhvdXNlIiwidHlwZV9idXkiLCJjb3N0IiwiaWRfcHJvZHVjdCIsImNvdW50IiwicGxhbnQiLCJob3RlbCIsInN0YXJ0X3RpbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSUEsU0FBUyxHQUFHO0FBQ1pDLEVBQUFBLFNBQVMsRUFBRSxDQURDO0FBRVpDLEVBQUFBLE1BQU0sRUFBRSxDQUZJO0FBR1pDLEVBQUFBLElBQUksRUFBRSxDQUhNO0FBSVpDLEVBQUFBLE9BQU8sRUFBRSxDQUpHO0FBS1pDLEVBQUFBLEtBQUssRUFBRSxDQUxLO0FBTVpDLEVBQUFBLE1BQU0sRUFBRSxDQU5JO0FBT1pDLEVBQUFBLGVBQWUsRUFBRSxDQVBMO0FBUVpDLEVBQUFBLFdBQVcsRUFBRSxDQVJEO0FBU1pD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QUFBLElBQUksRUFBRTtBQURQLEtBVkE7QUFhSCxPQUFHO0FBQ0NBLE1BQUFBLElBQUksRUFBRTtBQURQLEtBYkE7QUFnQkgsT0FBRztBQUNDQSxNQUFBQSxJQUFJLEVBQUU7QUFEUCxLQWhCQTtBQW1CSCxPQUFHO0FBQ0NBLE1BQUFBLElBQUksRUFBRTtBQURQLEtBbkJBO0FBc0JILE9BQUc7QUFDQ0EsTUFBQUEsSUFBSSxFQUFFO0FBRFA7QUF0QkEsR0FwVks7QUE4V1oyQixFQUFBQSxLQUFLLEVBQUU7QUFDSCxPQUFHO0FBQ0MzQixNQUFBQSxJQUFJLEVBQUUsQ0FEUDtBQUVDNEIsTUFBQUEsVUFBVSxFQUFFO0FBRmIsS0FEQTtBQUtILE9BQUc7QUFDQzVCLE1BQUFBLElBQUksRUFBRSxDQURQO0FBRUM0QixNQUFBQSxVQUFVLEVBQUU7QUFGYixLQUxBO0FBU0gsT0FBRztBQUNDNUIsTUFBQUEsSUFBSSxFQUFFLENBRFA7QUFFQzRCLE1BQUFBLFVBQVUsRUFBRTtBQUZiLEtBVEE7QUFhSCxPQUFHO0FBQ0M1QixNQUFBQSxJQUFJLEVBQUUsQ0FEUDtBQUVDNEIsTUFBQUEsVUFBVSxFQUFFO0FBRmI7QUFiQTtBQTlXSyxDQUFoQjtlQWtZZTtBQUNYNUMsRUFBQUEsU0FBUyxFQUFUQTtBQURXIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvL+Wvueixoei9rGpzb27mlbDmja7lrZjlgqhcclxuLy8gY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2VyRGF0YScsIEpTT04uc3RyaW5naWZ5KHVzZXJEYXRhKSk7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy/or7vlj5Zqc29u5pWw5o2uXHJcbi8vdmFyIHVzZXJEYXRhID0gSlNPTi5wYXJzZShjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJEYXRhJykpO1xyXG52YXIgdXNlcl9kYXRhID0ge1xyXG4gICAgc2F2ZV9kYXRlOiAwLFxyXG4gICAgbm92aWNlOiAwLFxyXG4gICAgZ29sZDogMCxcclxuICAgIGRpYW1vbmQ6IDAsXHJcbiAgICBsZXZlbDogMSxcclxuICAgIG5vd19leDogMCxcclxuICAgIHdhcmVIb3VzZV9sZXZlbDogMSxcclxuICAgIHNraWxsX3BvaW50OiAxLFxyXG4gICAgbG9naW5fdGltZTogMCxcclxuICAgIHNvdW5kX3N0YXRlOiAxLFxyXG4gICAgaG90ZWxfY2FjaGVfZ29sZDogMCxcclxuICAgIHZpZGVvdGFwZV9zaGFyZV9jb3VudDogMCxcclxuICAgIHdhdGNoX3ZpZGVvOiAwLFxyXG4gICAgYXV0b19zZWxsOiAwLCAgIC8vIHThu7EgxJHhu5luZyBiw6FuIHJhdSBj4bunXHJcblxyXG4gICAgc3RhZmY6IHtcclxuICAgICAgICAwOiB7XHJcbiAgICAgICAgICAgIGhhdmU6IDAsXHJcbiAgICAgICAgICAgIG92ZXJfdGltZTogMCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIDE6IHtcclxuICAgICAgICAgICAgaGF2ZTogMCxcclxuICAgICAgICAgICAgb3Zlcl90aW1lOiAwLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgMjoge1xyXG4gICAgICAgICAgICBoYXZlOiAwLFxyXG4gICAgICAgICAgICBvdmVyX3RpbWU6IDAsXHJcbiAgICAgICAgfSxcclxuICAgICAgICAzOiB7XHJcbiAgICAgICAgICAgIGhhdmU6IDAsXHJcbiAgICAgICAgICAgIG92ZXJfdGltZTogMCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIDQ6IHtcclxuICAgICAgICAgICAgaGF2ZTogMCxcclxuICAgICAgICAgICAgb3Zlcl90aW1lOiAwLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgNToge1xyXG4gICAgICAgICAgICBoYXZlOiAwLFxyXG4gICAgICAgICAgICBvdmVyX3RpbWU6IDAsXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBza2lsbDoge1xyXG4gICAgICAgIGdvbGRfbWF4OiAwLFxyXG4gICAgICAgIHNwZWVkX3RoZV9jdXQ6IDAsXHJcbiAgICAgICAgd2F0ZXJfc2F2aW5nOiAwLFxyXG4gICAgICAgIHRvb2xfaW1wcm92ZTogMCxcclxuICAgICAgICBsYWJvcl9jb250cmFjdDogMCxcclxuICAgICAgICBvZmZsaW5lX3Byb2ZpdDogMSxcclxuICAgIH0sXHJcbiAgICBwZXQ6IHtcclxuICAgICAgICAwOiB7XHJcbiAgICAgICAgICAgIGhhdmU6IDAsXHJcbiAgICAgICAgICAgIGhhdmVfYWQ6IDAsXHJcbiAgICAgICAgfSxcclxuICAgICAgICAxOiB7XHJcbiAgICAgICAgICAgIGhhdmU6IDAsXHJcbiAgICAgICAgICAgIGhhdmVfYWQ6IDAsXHJcbiAgICAgICAgfSxcclxuICAgICAgICAyOiB7XHJcbiAgICAgICAgICAgIGhhdmU6IDAsXHJcbiAgICAgICAgICAgIGhhdmVfYWQ6IDEsXHJcbiAgICAgICAgICAgIGNyZWF0ZV90aW1lOiAwLFxyXG4gICAgICAgICAgICBzaGFyZV9jb3VudDogMCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIDM6IHtcclxuICAgICAgICAgICAgaGF2ZTogMCxcclxuICAgICAgICAgICAgaGF2ZV9hZDogMSxcclxuICAgICAgICAgICAgY3JlYXRlX3RpbWU6IDAsXHJcbiAgICAgICAgICAgIHNoYXJlX2NvdW50OiAwLFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgLy/llYbkurpcclxuICAgIHRyYWRlcjoge1xyXG4gICAgICAgIHJlY2lwZXM6IDAsXHJcbiAgICB9LFxyXG4gICAgbGFuZDoge1xyXG4gICAgICAgIDA6IHtcclxuICAgICAgICAgICAgbGFuZF9zdGF0ZTogXCJ3YWl0X3RpbGxcIixcclxuICAgICAgICAgICAgaGF2ZTogMSxcclxuICAgICAgICAgICAgcGxhbnRfdHlwZTogMCxcclxuICAgICAgICAgICAgYWxpdmVfc3RhZ2U6IDAsXHJcbiAgICAgICAgICAgIHdhdGVyX251bTogNTAsXHJcbiAgICAgICAgICAgIGhhdmVfd2F0ZXI6IDEsXHJcbiAgICAgICAgfSxcclxuICAgICAgICAxOiB7XHJcbiAgICAgICAgICAgIGxhbmRfc3RhdGU6IFwid2FpdF90aWxsXCIsXHJcbiAgICAgICAgICAgIGhhdmU6IDAsXHJcbiAgICAgICAgICAgIHBsYW50X3R5cGU6IDAsXHJcbiAgICAgICAgICAgIGFsaXZlX3N0YWdlOiAwLFxyXG4gICAgICAgICAgICB3YXRlcl9udW06IDUwLFxyXG4gICAgICAgICAgICBoYXZlX3dhdGVyOiAxLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgMjoge1xyXG4gICAgICAgICAgICBsYW5kX3N0YXRlOiBcIndhaXRfdGlsbFwiLFxyXG4gICAgICAgICAgICBoYXZlOiAwLFxyXG4gICAgICAgICAgICBwbGFudF90eXBlOiAwLFxyXG4gICAgICAgICAgICBhbGl2ZV9zdGFnZTogMCxcclxuICAgICAgICAgICAgd2F0ZXJfbnVtOiA1MCxcclxuICAgICAgICAgICAgaGF2ZV93YXRlcjogMSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIDM6IHtcclxuICAgICAgICAgICAgbGFuZF9zdGF0ZTogXCJ3YWl0X3RpbGxcIixcclxuICAgICAgICAgICAgaGF2ZTogMCxcclxuICAgICAgICAgICAgcGxhbnRfdHlwZTogMCxcclxuICAgICAgICAgICAgYWxpdmVfc3RhZ2U6IDAsXHJcbiAgICAgICAgICAgIHdhdGVyX251bTogNTAsXHJcbiAgICAgICAgICAgIGhhdmVfd2F0ZXI6IDEsXHJcbiAgICAgICAgfSxcclxuICAgICAgICA0OiB7XHJcbiAgICAgICAgICAgIGxhbmRfc3RhdGU6IFwid2FpdF90aWxsXCIsXHJcbiAgICAgICAgICAgIGhhdmU6IDAsXHJcbiAgICAgICAgICAgIHBsYW50X3R5cGU6IDAsXHJcbiAgICAgICAgICAgIGFsaXZlX3N0YWdlOiAwLFxyXG4gICAgICAgICAgICB3YXRlcl9udW06IDUwLFxyXG4gICAgICAgICAgICBoYXZlX3dhdGVyOiAxLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgNToge1xyXG4gICAgICAgICAgICBsYW5kX3N0YXRlOiBcIndhaXRfdGlsbFwiLFxyXG4gICAgICAgICAgICBoYXZlOiAwLFxyXG4gICAgICAgICAgICBwbGFudF90eXBlOiAwLFxyXG4gICAgICAgICAgICBhbGl2ZV9zdGFnZTogMCxcclxuICAgICAgICAgICAgd2F0ZXJfbnVtOiA1MCxcclxuICAgICAgICAgICAgaGF2ZV93YXRlcjogMSxcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgIHdhcmVIb3VzZToge1xyXG4gICAgICAgIDA6IHtcclxuICAgICAgICAgICAgaGF2ZTogMSxcclxuICAgICAgICAgICAgdHlwZV9idXk6ICdnb2xkJyxcclxuICAgICAgICAgICAgY29zdDogMCxcclxuICAgICAgICAgICAgaWRfcHJvZHVjdDogOCxcclxuICAgICAgICAgICAgY291bnQ6IDAsXHJcbiAgICAgICAgfSxcclxuICAgICAgICAxOiB7XHJcbiAgICAgICAgICAgIGhhdmU6IDEsXHJcbiAgICAgICAgICAgIHR5cGVfYnV5OiAnZ29sZCcsXHJcbiAgICAgICAgICAgIGNvc3Q6IDAsXHJcbiAgICAgICAgICAgIGlkX3Byb2R1Y3Q6IDgsXHJcbiAgICAgICAgICAgIGNvdW50OiAwLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgMjoge1xyXG4gICAgICAgICAgICBoYXZlOiAxLFxyXG4gICAgICAgICAgICB0eXBlX2J1eTogJ2dvbGQnLFxyXG4gICAgICAgICAgICBjb3N0OiAwLFxyXG4gICAgICAgICAgICBpZF9wcm9kdWN0OiA4LFxyXG4gICAgICAgICAgICBjb3VudDogMCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIDM6IHtcclxuICAgICAgICAgICAgaGF2ZTogMCxcclxuICAgICAgICAgICAgdHlwZV9idXk6ICdnb2xkJyxcclxuICAgICAgICAgICAgY29zdDogNTAwMCxcclxuICAgICAgICAgICAgaWRfcHJvZHVjdDogOCxcclxuICAgICAgICAgICAgY291bnQ6IDAsXHJcbiAgICAgICAgfSxcclxuICAgICAgICA0OiB7XHJcbiAgICAgICAgICAgIGhhdmU6IDAsXHJcbiAgICAgICAgICAgIHR5cGVfYnV5OiAnZ29sZCcsXHJcbiAgICAgICAgICAgIGNvc3Q6IDgwMDAsXHJcbiAgICAgICAgICAgIGlkX3Byb2R1Y3Q6IDgsXHJcbiAgICAgICAgICAgIGNvdW50OiAwLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgNToge1xyXG4gICAgICAgICAgICBoYXZlOiAwLFxyXG4gICAgICAgICAgICB0eXBlX2J1eTogJ2dvbGQnLFxyXG4gICAgICAgICAgICBjb3N0OiAxMjAwMCxcclxuICAgICAgICAgICAgaWRfcHJvZHVjdDogOCxcclxuICAgICAgICAgICAgY291bnQ6IDAsXHJcbiAgICAgICAgfSxcclxuICAgICAgICA2OiB7XHJcbiAgICAgICAgICAgIGhhdmU6IDAsXHJcbiAgICAgICAgICAgIHR5cGVfYnV5OiAnZ29sZCcsXHJcbiAgICAgICAgICAgIGNvc3Q6IDIwMDAwLFxyXG4gICAgICAgICAgICBpZF9wcm9kdWN0OiA4LFxyXG4gICAgICAgICAgICBjb3VudDogMCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIDc6IHtcclxuICAgICAgICAgICAgaGF2ZTogMCxcclxuICAgICAgICAgICAgdHlwZV9idXk6ICdnb2xkJyxcclxuICAgICAgICAgICAgY29zdDogMzAwMDAsXHJcbiAgICAgICAgICAgIGlkX3Byb2R1Y3Q6IDgsXHJcbiAgICAgICAgICAgIGNvdW50OiAwLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgODoge1xyXG4gICAgICAgICAgICBoYXZlOiAwLFxyXG4gICAgICAgICAgICB0eXBlX2J1eTogJ2RpYW1vbmQnLFxyXG4gICAgICAgICAgICBjb3N0OiAxMCxcclxuICAgICAgICAgICAgaWRfcHJvZHVjdDogOCxcclxuICAgICAgICAgICAgY291bnQ6IDAsXHJcbiAgICAgICAgfSxcclxuICAgICAgICA5OiB7XHJcbiAgICAgICAgICAgIGhhdmU6IDAsXHJcbiAgICAgICAgICAgIHR5cGVfYnV5OiAnZGlhbW9uZCcsXHJcbiAgICAgICAgICAgIGNvc3Q6IDIwLFxyXG4gICAgICAgICAgICBpZF9wcm9kdWN0OiA4LFxyXG4gICAgICAgICAgICBjb3VudDogMCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIDEwOiB7XHJcbiAgICAgICAgICAgIGhhdmU6IDAsXHJcbiAgICAgICAgICAgIHR5cGVfYnV5OiAnZGlhbW9uZCcsXHJcbiAgICAgICAgICAgIGNvc3Q6IDQwLFxyXG4gICAgICAgICAgICBpZF9wcm9kdWN0OiA4LFxyXG4gICAgICAgICAgICBjb3VudDogMCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIDExOiB7XHJcbiAgICAgICAgICAgIGhhdmU6IDAsXHJcbiAgICAgICAgICAgIHR5cGVfYnV5OiAnZGlhbW9uZCcsXHJcbiAgICAgICAgICAgIGNvc3Q6IDYwLFxyXG4gICAgICAgICAgICBpZF9wcm9kdWN0OiA4LFxyXG4gICAgICAgICAgICBjb3VudDogMCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIDEyOiB7XHJcbiAgICAgICAgICAgIGhhdmU6IDAsXHJcbiAgICAgICAgICAgIHR5cGVfYnV5OiAnZGlhbW9uZCcsXHJcbiAgICAgICAgICAgIGNvc3Q6IDgwLFxyXG4gICAgICAgICAgICBpZF9wcm9kdWN0OiA4LFxyXG4gICAgICAgICAgICBjb3VudDogMCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIDEzOiB7XHJcbiAgICAgICAgICAgIGhhdmU6IDAsXHJcbiAgICAgICAgICAgIHR5cGVfYnV5OiAnZGlhbW9uZCcsXHJcbiAgICAgICAgICAgIGNvc3Q6IDEwMCxcclxuICAgICAgICAgICAgaWRfcHJvZHVjdDogOCxcclxuICAgICAgICAgICAgY291bnQ6IDAsXHJcbiAgICAgICAgfSxcclxuICAgICAgICAxNDoge1xyXG4gICAgICAgICAgICBoYXZlOiAwLFxyXG4gICAgICAgICAgICB0eXBlX2J1eTogJ2RpYW1vbmQnLFxyXG4gICAgICAgICAgICBjb3N0OiAxMjAsXHJcbiAgICAgICAgICAgIGlkX3Byb2R1Y3Q6IDgsXHJcbiAgICAgICAgICAgIGNvdW50OiAwLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgMTU6IHtcclxuICAgICAgICAgICAgaGF2ZTogMCxcclxuICAgICAgICAgICAgdHlwZV9idXk6ICdkaWFtb25kJyxcclxuICAgICAgICAgICAgY29zdDogMTQwLFxyXG4gICAgICAgICAgICBpZF9wcm9kdWN0OiA4LFxyXG4gICAgICAgICAgICBjb3VudDogMCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIDE2OiB7XHJcbiAgICAgICAgICAgIGhhdmU6IDAsXHJcbiAgICAgICAgICAgIHR5cGVfYnV5OiAnZGlhbW9uZCcsXHJcbiAgICAgICAgICAgIGNvc3Q6IDE2MCxcclxuICAgICAgICAgICAgaWRfcHJvZHVjdDogOCxcclxuICAgICAgICAgICAgY291bnQ6IDAsXHJcbiAgICAgICAgfSxcclxuICAgICAgICAxNzoge1xyXG4gICAgICAgICAgICBoYXZlOiAwLFxyXG4gICAgICAgICAgICB0eXBlX2J1eTogJ2RpYW1vbmQnLFxyXG4gICAgICAgICAgICBjb3N0OiAxODAsXHJcbiAgICAgICAgICAgIGlkX3Byb2R1Y3Q6IDgsXHJcbiAgICAgICAgICAgIGNvdW50OiAwLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgMTg6IHtcclxuICAgICAgICAgICAgaGF2ZTogMCxcclxuICAgICAgICAgICAgdHlwZV9idXk6ICdkaWFtb25kJyxcclxuICAgICAgICAgICAgY29zdDogMjAwLFxyXG4gICAgICAgICAgICBpZF9wcm9kdWN0OiA4LFxyXG4gICAgICAgICAgICBjb3VudDogMCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIDE5OiB7XHJcbiAgICAgICAgICAgIGhhdmU6IDAsXHJcbiAgICAgICAgICAgIHR5cGVfYnV5OiAnZGlhbW9uZCcsXHJcbiAgICAgICAgICAgIGNvc3Q6IDIyMCxcclxuICAgICAgICAgICAgaWRfcHJvZHVjdDogOCxcclxuICAgICAgICAgICAgY291bnQ6IDAsXHJcbiAgICAgICAgfSxcclxuICAgICAgICAyMDoge1xyXG4gICAgICAgICAgICBoYXZlOiAwLFxyXG4gICAgICAgICAgICB0eXBlX2J1eTogJ2RpYW1vbmQnLFxyXG4gICAgICAgICAgICBjb3N0OiAyNDAsXHJcbiAgICAgICAgICAgIGlkX3Byb2R1Y3Q6IDgsXHJcbiAgICAgICAgICAgIGNvdW50OiAwLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgMjE6IHtcclxuICAgICAgICAgICAgaGF2ZTogMCxcclxuICAgICAgICAgICAgdHlwZV9idXk6ICdkaWFtb25kJyxcclxuICAgICAgICAgICAgY29zdDogMjYwLFxyXG4gICAgICAgICAgICBpZF9wcm9kdWN0OiA4LFxyXG4gICAgICAgICAgICBjb3VudDogMCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIDIyOiB7XHJcbiAgICAgICAgICAgIGhhdmU6IDAsXHJcbiAgICAgICAgICAgIHR5cGVfYnV5OiAnZGlhbW9uZCcsXHJcbiAgICAgICAgICAgIGNvc3Q6IDI4MCxcclxuICAgICAgICAgICAgaWRfcHJvZHVjdDogOCxcclxuICAgICAgICAgICAgY291bnQ6IDAsXHJcbiAgICAgICAgfSxcclxuICAgICAgICAyMzoge1xyXG4gICAgICAgICAgICBoYXZlOiAwLFxyXG4gICAgICAgICAgICB0eXBlX2J1eTogJ2RpYW1vbmQnLFxyXG4gICAgICAgICAgICBjb3N0OiAzMDAsXHJcbiAgICAgICAgICAgIGlkX3Byb2R1Y3Q6IDgsXHJcbiAgICAgICAgICAgIGNvdW50OiAwLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgMjQ6IHtcclxuICAgICAgICAgICAgaGF2ZTogMCxcclxuICAgICAgICAgICAgdHlwZV9idXk6ICdkaWFtb25kJyxcclxuICAgICAgICAgICAgY29zdDogMzIwLFxyXG4gICAgICAgICAgICBpZF9wcm9kdWN0OiA4LFxyXG4gICAgICAgICAgICBjb3VudDogMCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIDI1OiB7XHJcbiAgICAgICAgICAgIGhhdmU6IDAsXHJcbiAgICAgICAgICAgIHR5cGVfYnV5OiAnZGlhbW9uZCcsXHJcbiAgICAgICAgICAgIGNvc3Q6IDM0MCxcclxuICAgICAgICAgICAgaWRfcHJvZHVjdDogOCxcclxuICAgICAgICAgICAgY291bnQ6IDAsXHJcbiAgICAgICAgfSxcclxuICAgICAgICAyNjoge1xyXG4gICAgICAgICAgICBoYXZlOiAwLFxyXG4gICAgICAgICAgICB0eXBlX2J1eTogJ2RpYW1vbmQnLFxyXG4gICAgICAgICAgICBjb3N0OiAzNjAsXHJcbiAgICAgICAgICAgIGlkX3Byb2R1Y3Q6IDgsXHJcbiAgICAgICAgICAgIGNvdW50OiAwLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgMjc6IHtcclxuICAgICAgICAgICAgaGF2ZTogMCxcclxuICAgICAgICAgICAgdHlwZV9idXk6ICdkaWFtb25kJyxcclxuICAgICAgICAgICAgY29zdDogMzgwLFxyXG4gICAgICAgICAgICBpZF9wcm9kdWN0OiA4LFxyXG4gICAgICAgICAgICBjb3VudDogMCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIDI4OiB7XHJcbiAgICAgICAgICAgIGhhdmU6IDAsXHJcbiAgICAgICAgICAgIHR5cGVfYnV5OiAnZGlhbW9uZCcsXHJcbiAgICAgICAgICAgIGNvc3Q6IDQwMCxcclxuICAgICAgICAgICAgaWRfcHJvZHVjdDogOCxcclxuICAgICAgICAgICAgY291bnQ6IDAsXHJcbiAgICAgICAgfSxcclxuICAgICAgICAyOToge1xyXG4gICAgICAgICAgICBoYXZlOiAwLFxyXG4gICAgICAgICAgICB0eXBlX2J1eTogJ2RpYW1vbmQnLFxyXG4gICAgICAgICAgICBjb3N0OiA0MjAsXHJcbiAgICAgICAgICAgIGlkX3Byb2R1Y3Q6IDgsXHJcbiAgICAgICAgICAgIGNvdW50OiAwLFxyXG4gICAgICAgIH0sXHJcblxyXG5cclxuICAgIH0sXHJcbiAgICBwbGFudDoge1xyXG4gICAgICAgIDA6IHtcclxuICAgICAgICAgICAgaGF2ZTogMSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIDE6IHtcclxuICAgICAgICAgICAgaGF2ZTogMCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIDI6IHtcclxuICAgICAgICAgICAgaGF2ZTogMCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIDM6IHtcclxuICAgICAgICAgICAgaGF2ZTogMCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIDQ6IHtcclxuICAgICAgICAgICAgaGF2ZTogMCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIDU6IHtcclxuICAgICAgICAgICAgaGF2ZTogMCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIDY6IHtcclxuICAgICAgICAgICAgaGF2ZTogMCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIDc6IHtcclxuICAgICAgICAgICAgaGF2ZTogMCxcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgIGhvdGVsOiB7XHJcbiAgICAgICAgMDoge1xyXG4gICAgICAgICAgICBoYXZlOiAwLFxyXG4gICAgICAgICAgICBzdGFydF90aW1lOiAwLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgMToge1xyXG4gICAgICAgICAgICBoYXZlOiAwLFxyXG4gICAgICAgICAgICBzdGFydF90aW1lOiAwLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgMjoge1xyXG4gICAgICAgICAgICBoYXZlOiAwLFxyXG4gICAgICAgICAgICBzdGFydF90aW1lOiAwLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgMzoge1xyXG4gICAgICAgICAgICBoYXZlOiAwLFxyXG4gICAgICAgICAgICBzdGFydF90aW1lOiAwLFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgdXNlcl9kYXRhLFxyXG59O1xyXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ai/pet_ai.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'efa79vzd3ZKgqh8UQU3o35q', 'pet_ai');
// script/ai/pet_ai.js

"use strict";

var _user_data = _interopRequireDefault(require("user_data"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var config = require("config");

cc.Class({
  "extends": cc.Component,
  properties: {
    body_node: cc.Node
  },
  // LIFE-CYCLE CALLBACKS:
  // 每隔几秒改变移动方向
  change_movement_direction: function change_movement_direction() {
    var callback = function callback() {
      this.stop_move = false;
      var num = Math.floor(Math.random() * this.all_direction.length - 1) + 1;

      if (num < 0) {
        num = 0;
      }

      ;
      this.movement_direction = this.all_direction[num];
      this.anim_select();
    };

    this.schedule(callback, Math.random() * 3 + 2);
  },
  //anim select
  anim_select: function anim_select() {
    var anim = this.body_node.getComponent(cc.Animation);
    var anim_clips = anim.getClips(); //获取动画剪辑

    switch (this.movement_direction) {
      case "z_idle":
        anim.play(anim_clips[0].name);
        break;

      case "z_run":
        anim.play(anim_clips[1].name);
        break;

      case "b_idle":
        anim.play(anim_clips[2].name);
        break;

      case "b_run":
        anim.play(anim_clips[3].name);
        break;

      case "c_idle":
        anim.play(anim_clips[4].name);
        break;

      case "c_run_l":
        this.node.scaleX = 1;
        anim.play(anim_clips[5].name);
        break;

      case "c_run_r":
        this.node.scaleX = -1;
        anim.play(anim_clips[5].name);
        break;
    }

    ;
  },
  //随机某个方向移动
  ai_move: function ai_move(dt) {
    //dt游戏时间
    //得到每帧的速度
    var s = this.move_speed * dt; //

    if (this.node.x <= -65 && this.stop_move == false) {
      this.stop_move = true;
      this.movement_direction = "c_run_r";
      this.anim_select();
    }

    if (this.node.x >= 65 && this.stop_move == false) {
      this.stop_move = true;
      this.movement_direction = "c_run_l";
      this.anim_select();
    }

    if (this.node.y >= 290 && this.stop_move == false) {
      this.stop_move = true;
      this.movement_direction = "z_run";
      this.anim_select();
    }

    if (this.node.y <= -529 && this.stop_move == false) {
      this.stop_move = true;
      this.movement_direction = "b_run";
      this.anim_select();
    } //几种不同的移动策略


    switch (this.movement_direction) {
      case "z_idle":
        s = 0;
        break;

      case "z_run":
        this.node.y -= s;
        break;

      case "b_idle":
        s = 0;
        break;

      case "b_run":
        this.node.y += s;
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
  onCollisionStay: function onCollisionStay(other, self) {
    //碰撞产生了去调用该函数
    if (self.node.y >= other.node.y) {
      other.node.zIndex = 1;
      self.node.zIndex = 0;
    } else {
      other.node.zIndex = 0;
      self.node.zIndex = 1;
    }

    ;
  },
  //自动销毁
  // auto_destroy() {
  //     var callback = function () {
  //         var now_time = new Date().getTime();
  //         if ((now_time - user_data.user_data.pet[this.pet_index].create_time) / 1000 >= config.pet[this.pet_index].stay_time) {
  //             user_data.user_data.pet[this.pet_index].have = 0;
  //             this.game_scene_js.create_tips_ui(this.game_scene_js.node,"pet_leave");
  //             this.node.destroy();
  //         };
  //     };
  //     this.schedule(callback, 1)
  // },
  //产出收益
  create_profit: function create_profit() {
    switch (this.node.name) {
      case "rabbit":
        this.pet_index = 0;
        var produce_ex_time = config.pet[this.pet_index].produce_ex_time;
        var produce_ex = config.pet[this.pet_index].produce_ex;

        var callback = function callback() {
          var produce_ex = config.pet[this.pet_index].produce_ex; // for (var i = 0; i < produce_ex; i++) {
          //     this.game_scene_js.create_ex_effect(this.node, i);
          // };

          if (_user_data["default"].user_data.pet[this.pet_index].have == 1) {
            for (var i = 0; i < produce_ex; i++) {
              this.game_scene_js.create_ex_effect(this.node, i);
            }

            ;
          }

          ;
        };

        this.schedule(callback, produce_ex_time);
        break;

      case "rabbit2":
        this.pet_index = 1;
        var produce_ex_time = config.pet[this.pet_index].produce_ex_time;
        var produce_ex = config.pet[this.pet_index].produce_ex;

        var callback = function callback() {
          var produce_ex = config.pet[this.pet_index].produce_ex; // for (var i = 0; i < produce_ex; i++) {
          //     this.game_scene_js.create_ex_effect(this.node, i);
          // };

          if (_user_data["default"].user_data.pet[this.pet_index].have == 1) {
            for (var i = 0; i < produce_ex; i++) {
              this.game_scene_js.create_ex_effect(this.node, i);
            }

            ; // console.log("pet " + this.pet_index + " produce_ex: " + produce_ex);
          }

          ;
        };

        this.schedule(callback, produce_ex_time);
        break;

      case "xiaoba":
        this.pet_index = 2; // this.auto_destroy();

        var produce_ex_time = config.pet[this.pet_index].produce_ex_time;
        var produce_ex = config.pet[this.pet_index].produce_ex; // lỗi NaN

        var callback = function callback() {
          // var produce_ex = config.pet[this.pet_index].produce_ex;
          // for (var i = 0; i < produce_ex; i++) {
          //     this.game_scene_js.create_ex_effect(this.node, i);
          // };
          if (_user_data["default"].user_data.pet[this.pet_index].have == 1) {
            for (var i = 0; i < produce_ex; i++) {
              this.game_scene_js.create_ex_effect(this.node, i);
            }

            ; // console.log("pet " + this.pet_index + " produce_ex: " + config.pet[this.pet_index].produce_ex);
          }

          ;
        };

        this.schedule(callback, produce_ex_time);
        break;

      case "xiaoqi":
        this.pet_index = 3; // this.auto_destroy();

        var produce_ex_time = config.pet[this.pet_index].produce_ex_time;
        var produce_ex = config.pet[this.pet_index].produce_ex;

        var callback = function callback() {
          var produce_ex = config.pet[this.pet_index].produce_ex;

          if (_user_data["default"].user_data.pet[this.pet_index].have == 1) {
            for (var i = 0; i < produce_ex; i++) {
              this.game_scene_js.create_ex_effect(this.node, i);
            }

            ; // console.log("pet " + this.pet_index + " produce_ex: " + produce_ex);
          }

          ;
        };

        this.schedule(callback, produce_ex_time);
        break;
    }

    ;
  },
  ini_node: function ini_node() {
    var randomX = (Math.random() > 0.5 ? 1 : -1) * 100;
    var randomY = (Math.random() > 0.5 ? 1 : -1) * 100;
    this.node.x = randomX;
    this.node.y = randomY;
    this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
    this.all_direction = ["z_idle", "z_run", "b_idle", "b_run", "c_idle", "c_run_l", "c_run_r"];
    this.movement_direction = "z_idle"; //小人的移动速度

    this.move_speed = 30; //停止移动，边缘时触发

    this.stop_move = false;
    this.create_profit();
  },
  onLoad: function onLoad() {
    this.ini_node();
    this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
  },
  start: function start() {
    this.change_movement_direction();
    this.anim_select();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxhaVxccGV0X2FpLmpzIl0sIm5hbWVzIjpbImNvbmZpZyIsInJlcXVpcmUiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImJvZHlfbm9kZSIsIk5vZGUiLCJjaGFuZ2VfbW92ZW1lbnRfZGlyZWN0aW9uIiwiY2FsbGJhY2siLCJzdG9wX21vdmUiLCJudW0iLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJhbGxfZGlyZWN0aW9uIiwibGVuZ3RoIiwibW92ZW1lbnRfZGlyZWN0aW9uIiwiYW5pbV9zZWxlY3QiLCJzY2hlZHVsZSIsImFuaW0iLCJnZXRDb21wb25lbnQiLCJBbmltYXRpb24iLCJhbmltX2NsaXBzIiwiZ2V0Q2xpcHMiLCJwbGF5IiwibmFtZSIsIm5vZGUiLCJzY2FsZVgiLCJhaV9tb3ZlIiwiZHQiLCJzIiwibW92ZV9zcGVlZCIsIngiLCJ5Iiwib25Db2xsaXNpb25TdGF5Iiwib3RoZXIiLCJzZWxmIiwiekluZGV4IiwiY3JlYXRlX3Byb2ZpdCIsInBldF9pbmRleCIsInByb2R1Y2VfZXhfdGltZSIsInBldCIsInByb2R1Y2VfZXgiLCJ1c2VyX2RhdGEiLCJoYXZlIiwiaSIsImdhbWVfc2NlbmVfanMiLCJjcmVhdGVfZXhfZWZmZWN0IiwiaW5pX25vZGUiLCJyYW5kb21YIiwicmFuZG9tWSIsImZpbmQiLCJvbkxvYWQiLCJnYW1lX3J1bGVzX2pzIiwic3RhcnQiLCJ1cGRhdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7QUFEQSxJQUFJQSxNQUFNLEdBQUdDLE9BQU8sQ0FBQyxRQUFELENBQXBCOztBQUVBQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsU0FBUyxFQUFFSixFQUFFLENBQUNLO0FBRE4sR0FIUDtBQU9MO0FBQ0E7QUFDQUMsRUFBQUEseUJBQXlCLEVB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RztBQUNKLFNBQUsvQyx5QkFBTDtBQUNBLFNBQUtVLFdBQUw7QUFDSCxHQWxPSTtBQW9PTHNDLEVBQUFBLE1BcE9LLGtCQW9PRTFCLEVBcE9GLEVBb09NO0FBQ1AsU0FBS0QsT0FBTCxDQUFhQyxFQUFiO0FBQ0g7QUF0T0ksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGNvbmZpZyA9IHJlcXVpcmUoXCJjb25maWdcIik7XHJcbmltcG9ydCB1c2VyX2RhdGEgZnJvbSBcInVzZXJfZGF0YVwiO1xyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGJvZHlfbm9kZTogY2MuTm9kZSxcclxuICAgIH0sXHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcbiAgICAvLyDmr4/pmpTlh6Dnp5LmlLnlj5jnp7vliqjmlrnlkJFcclxuICAgIGNoYW5nZV9tb3ZlbWVudF9kaXJlY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcF9tb3ZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHZhciBudW0gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLmFsbF9kaXJlY3Rpb24ubGVuZ3RoIC0gMSkgKyAxO1xyXG4gICAgICAgICAgICBpZiAobnVtIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgbnVtID0gMDtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlbWVudF9kaXJlY3Rpb24gPSB0aGlzLmFsbF9kaXJlY3Rpb25bbnVtXTtcclxuICAgICAgICAgICAgdGhpcy5hbmltX3NlbGVjdCgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZShjYWxsYmFjaywgTWF0aC5yYW5kb20oKSAqIDMgKyAyKTtcclxuICAgIH0sXHJcbiAgICAvL2FuaW0gc2VsZWN0XHJcbiAgICBhbmltX3NlbGVjdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBhbmltID0gdGhpcy5ib2R5X25vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XHJcbiAgICAgICAgdmFyIGFuaW1fY2xpcHMgPSBhbmltLmdldENsaXBzKCk7Ly/ojrflj5bliqjnlLvliarovpFcclxuICAgICAgICBzd2l0Y2ggKHRoaXMubW92ZW1lbnRfZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ6X2lkbGVcIjpcclxuICAgICAgICAgICAgICAgIGFuaW0ucGxheShhbmltX2NsaXBzWzBdLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ6X3J1blwiOlxyXG4gICAgICAgICAgICAgICAgYW5pbS5wbGF5KGFuaW1fY2xpcHNbMV0ubmFtZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJfaWRsZVwiOlxyXG4gICAgICAgICAgICAgICAgYW5pbS5wbGF5KGFuaW1fY2xpcHNbMl0ubmFtZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJfcnVuXCI6XHJcbiAgICAgICAgICAgICAgICBhbmltLnBsYXkoYW5pbV9jbGlwc1szXS5uYW1lKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiY19pZGxlXCI6XHJcbiAgICAgICAgICAgICAgICBhbmltLnBsYXkoYW5pbV9jbGlwc1s0XS5uYW1lKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiY19ydW5fbFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNjYWxlWCA9IDE7XHJcbiAgICAgICAgICAgICAgICBhbmltLnBsYXkoYW5pbV9jbGlwc1s1XS5uYW1lKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiY19ydW5fclwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNjYWxlWCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgYW5pbS5wbGF5KGFuaW1fY2xpcHNbNV0ubmFtZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8v6ZqP5py65p+Q5Liq5pa55ZCR56e75YqoXHJcbiAgICBhaV9tb3ZlOiBmdW5jdGlvbiAoZHQpIHsgLy9kdOa4uOaIj+aXtumXtFxyXG5cclxuICAgICAgICAvL+W+l+WIsOavj+W4p+eahOmAn+W6plxyXG4gICAgICAgIHZhciBzID0gdGhpcy5tb3ZlX3NwZWVkICogZHQ7XHJcbiAgICAgICAgLy9cclxuICAgICAgICBpZiAodGhpcy5ub2RlLnggPD0gLTY1ICYmIHRoaXMuc3RvcF9tb3ZlID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcF9tb3ZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlbWVudF9kaXJlY3Rpb24gPSBcImNfcnVuX3JcIjtcclxuICAgICAgICAgICAgdGhpcy5hbmltX3NlbGVjdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5ub2RlLnggPj0gNjUgJiYgdGhpcy5zdG9wX21vdmUgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgdGhpcy5zdG9wX21vdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVtZW50X2RpcmVjdGlvbiA9IFwiY19ydW5fbFwiO1xyXG4gICAgICAgICAgICB0aGlzLmFuaW1fc2VsZWN0KCk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5ub2RlLnkgPj0gMjkwICYmIHRoaXMuc3RvcF9tb3ZlID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcF9tb3ZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlbWVudF9kaXJlY3Rpb24gPSBcInpfcnVuXCI7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pbV9zZWxlY3QoKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLm5vZGUueSA8PSAtNTI5ICYmIHRoaXMuc3RvcF9tb3ZlID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcF9tb3ZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlbWVudF9kaXJlY3Rpb24gPSBcImJfcnVuXCI7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pbV9zZWxlY3QoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v5Yeg56eN5LiN5ZCM55qE56e75Yqo562W55WlXHJcbiAgICAgICAgc3dpdGNoICh0aGlzLm1vdmVtZW50X2RpcmVjdGlvbikge1xyXG4gICAgICAgICAgICBjYXNlIFwiel9pZGxlXCI6XHJcbiAgICAgICAgICAgICAgICBzID0gMDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiel9ydW5cIjpcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS55IC09IHM7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJfaWRsZVwiOlxyXG4gICAgICAgICAgICAgICAgcyA9IDA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJfcnVuXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUueSArPSBzO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJjX2lkbGVcIjpcclxuICAgICAgICAgICAgICAgIHMgPSAwO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJjX3J1bl9sXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUueCAtPSBzO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJjX3J1bl9yXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUueCArPSBzO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICB9LFxyXG4gICAgb25Db2xsaXNpb25TdGF5OiBmdW5jdGlvbiAob3RoZXIsIHNlbGYpIHtcclxuICAgICAgICAvL+eisOaSnuS6p+eUn+S6huWOu+iwg+eUqOivpeWHveaVsFxyXG4gICAgICAgIGlmIChzZWxmLm5vZGUueSA+PSBvdGhlci5ub2RlLnkpIHtcclxuICAgICAgICAgICAgb3RoZXIubm9kZS56SW5kZXggPSAxO1xyXG4gICAgICAgICAgICBzZWxmLm5vZGUuekluZGV4ID0gMDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBvdGhlci5ub2RlLnpJbmRleCA9IDA7XHJcbiAgICAgICAgICAgIHNlbGYubm9kZS56SW5kZXggPSAxO1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLy/oh6rliqjplIDmr4FcclxuICAgIC8vIGF1dG9fZGVzdHJveSgpIHtcclxuICAgIC8vICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyAgICAgICAgIHZhciBub3dfdGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgLy8gICAgICAgICBpZiAoKG5vd190aW1lIC0gdXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbdGhpcy5wZXRfaW5kZXhdLmNyZWF0ZV90aW1lKSAvIDEwMDAgPj0gY29uZmlnLnBldFt0aGlzLnBldF9pbmRleF0uc3RheV90aW1lKSB7XHJcbiAgICAvLyAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnBldFt0aGlzLnBldF9pbmRleF0uaGF2ZSA9IDA7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsXCJwZXRfbGVhdmVcIik7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgLy8gICAgICAgICB9O1xyXG4gICAgLy8gICAgIH07XHJcbiAgICAvLyAgICAgdGhpcy5zY2hlZHVsZShjYWxsYmFjaywgMSlcclxuICAgIC8vIH0sXHJcbiAgICAvL+S6p+WHuuaUtuebilxyXG4gICAgY3JlYXRlX3Byb2ZpdCgpIHtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMubm9kZS5uYW1lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJyYWJiaXRcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMucGV0X2luZGV4ID0gMDtcclxuICAgICAgICAgICAgICAgIHZhciBwcm9kdWNlX2V4X3RpbWUgPSBjb25maWcucGV0W3RoaXMucGV0X2luZGV4XS5wcm9kdWNlX2V4X3RpbWU7XHJcbiAgICAgICAgICAgICAgICB2YXIgcHJvZHVjZV9leCA9IGNvbmZpZy5wZXRbdGhpcy5wZXRfaW5kZXhdLnByb2R1Y2VfZXg7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByb2R1Y2VfZXggPSBjb25maWcucGV0W3RoaXMucGV0X2luZGV4XS5wcm9kdWNlX2V4O1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvZHVjZV9leDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfZXhfZWZmZWN0KHRoaXMubm9kZSwgaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gfTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbdGhpcy5wZXRfaW5kZXhdLmhhdmUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb2R1Y2VfZXg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9leF9lZmZlY3QodGhpcy5ub2RlLCBpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUoY2FsbGJhY2ssIHByb2R1Y2VfZXhfdGltZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInJhYmJpdDJcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMucGV0X2luZGV4ID0gMTtcclxuICAgICAgICAgICAgICAgIHZhciBwcm9kdWNlX2V4X3RpbWUgPSBjb25maWcucGV0W3RoaXMucGV0X2luZGV4XS5wcm9kdWNlX2V4X3RpbWU7XHJcbiAgICAgICAgICAgICAgICB2YXIgcHJvZHVjZV9leCA9IGNvbmZpZy5wZXRbdGhpcy5wZXRfaW5kZXhdLnByb2R1Y2VfZXg7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByb2R1Y2VfZXggPSBjb25maWcucGV0W3RoaXMucGV0X2luZGV4XS5wcm9kdWNlX2V4O1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvZHVjZV9leDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfZXhfZWZmZWN0KHRoaXMubm9kZSwgaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gfTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbdGhpcy5wZXRfaW5kZXhdLmhhdmUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb2R1Y2VfZXg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9leF9lZmZlY3QodGhpcy5ub2RlLCBpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJwZXQgXCIgKyB0aGlzLnBldF9pbmRleCArIFwiIHByb2R1Y2VfZXg6IFwiICsgcHJvZHVjZV9leCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlKGNhbGxiYWNrLCBwcm9kdWNlX2V4X3RpbWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ4aWFvYmFcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMucGV0X2luZGV4ID0gMjsgXHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmF1dG9fZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHByb2R1Y2VfZXhfdGltZSA9IGNvbmZpZy5wZXRbdGhpcy5wZXRfaW5kZXhdLnByb2R1Y2VfZXhfdGltZTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgcHJvZHVjZV9leCA9IGNvbmZpZy5wZXRbdGhpcy5wZXRfaW5kZXhdLnByb2R1Y2VfZXg7Ly8gbOG7l2kgTmFOXHJcbiAgICAgICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdmFyIHByb2R1Y2VfZXggPSBjb25maWcucGV0W3RoaXMucGV0X2luZGV4XS5wcm9kdWNlX2V4O1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvZHVjZV9leDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfZXhfZWZmZWN0KHRoaXMubm9kZSwgaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gfTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbdGhpcy5wZXRfaW5kZXhdLmhhdmUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb2R1Y2VfZXg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9leF9lZmZlY3QodGhpcy5ub2RlLCBpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJwZXQgXCIgKyB0aGlzLnBldF9pbmRleCArIFwiIHByb2R1Y2VfZXg6IFwiICsgY29uZmlnLnBldFt0aGlzLnBldF9pbmRleF0ucHJvZHVjZV9leCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlKGNhbGxiYWNrLCBwcm9kdWNlX2V4X3RpbWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ4aWFvcWlcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMucGV0X2luZGV4ID0gMztcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuYXV0b19kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgcHJvZHVjZV9leF90aW1lID0gY29uZmlnLnBldFt0aGlzLnBldF9pbmRleF0ucHJvZHVjZV9leF90aW1lO1xyXG4gICAgICAgICAgICAgICAgdmFyIHByb2R1Y2VfZXggPSBjb25maWcucGV0W3RoaXMucGV0X2luZGV4XS5wcm9kdWNlX2V4O1xyXG4gICAgICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwcm9kdWNlX2V4ID0gY29uZmlnLnBldFt0aGlzLnBldF9pbmRleF0ucHJvZHVjZV9leDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbdGhpcy5wZXRfaW5kZXhdLmhhdmUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb2R1Y2VfZXg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9leF9lZmZlY3QodGhpcy5ub2RlLCBpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJwZXQgXCIgKyB0aGlzLnBldF9pbmRleCArIFwiIHByb2R1Y2VfZXg6IFwiICsgcHJvZHVjZV9leCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlKGNhbGxiYWNrLCBwcm9kdWNlX2V4X3RpbWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBpbmlfbm9kZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciByYW5kb21YID0gKE1hdGgucmFuZG9tKCkgPiAwLjUgPyAxIDogLTEpICogMTAwO1xyXG4gICAgICAgIHZhciByYW5kb21ZID0gKE1hdGgucmFuZG9tKCkgPiAwLjUgPyAxIDogLTEpICogMTAwO1xyXG4gICAgICAgIHRoaXMubm9kZS54ID0gcmFuZG9tWDtcclxuICAgICAgICB0aGlzLm5vZGUueSA9IHJhbmRvbVlcclxuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJnYW1lX3NjZW5lXCIpO1xyXG4gICAgICAgIHRoaXMuYWxsX2RpcmVjdGlvbiA9IFtcInpfaWRsZVwiLCBcInpfcnVuXCIsIFwiYl9pZGxlXCIsIFwiYl9ydW5cIiwgXCJjX2lkbGVcIiwgXCJjX3J1bl9sXCIsIFwiY19ydW5fclwiXTtcclxuICAgICAgICB0aGlzLm1vdmVtZW50X2RpcmVjdGlvbiA9IFwiel9pZGxlXCI7XHJcbiAgICAgICAgLy/lsI/kurrnmoTnp7vliqjpgJ/luqZcclxuICAgICAgICB0aGlzLm1vdmVfc3BlZWQgPSAzMDtcclxuICAgICAgICAvL+WBnOatouenu+WKqO+8jOi+uee8mOaXtuinpuWPkVxyXG4gICAgICAgIHRoaXMuc3RvcF9tb3ZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVfcHJvZml0KCk7XHJcbiAgICB9LFxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMuaW5pX25vZGUoKTtcclxuICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJnYW1lX3J1bGVzXCIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICB0aGlzLmNoYW5nZV9tb3ZlbWVudF9kaXJlY3Rpb24oKTtcclxuICAgICAgICB0aGlzLmFuaW1fc2VsZWN0KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZShkdCkge1xyXG4gICAgICAgIHRoaXMuYWlfbW92ZShkdCk7XHJcbiAgICB9LFxyXG59KTtcclxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/game_scene.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '09fa5SlLAhDcY18uaOf/7tQ', 'game_scene');
// script/game_scene.js

"use strict";

var _config = _interopRequireDefault(require("config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var user_data = require("user_data");

cc.Class({
  "extends": cc.Component,
  properties: {
    button_group_prefab: cc.Prefab,
    plant_ui_prefab: cc.Prefab,
    sell_ui_prefab: cc.Prefab,
    tips_ui_prefab: cc.Prefab,
    light_effect_prefab: cc.Prefab,
    study_ui_prefab: cc.Prefab,
    staff_ui_prefab: cc.Prefab,
    offline_profit_ui_prefab: cc.Prefab,
    pet_ui_prefab: cc.Prefab,
    ad_car_prefab: cc.Prefab,
    button_tips_prefab: cc.Prefab,
    rest_ui_prefab: cc.Prefab,
    pet_prefab_arr: [cc.Prefab],
    ex_effect_prefab: cc.Prefab,
    gift_ui_prefab: cc.Prefab,
    option_ui_prefab: cc.Prefab,
    gold_effect_prefab: cc.Prefab,
    novice_ui_prefab: cc.Prefab,
    hotel_ui_prefab: cc.Prefab,
    shop_ui_prefab: cc.Prefab,
    shop_buy_ui_prefab: cc.Prefab,
    videotape_ui_prefab: cc.Prefab
  },
  //创建按钮组的节点池
  new_button_group_node_pool: function new_button_group_node_pool() {
    this.button_more_node_pool = new cc.NodePool();
    var node = cc.instantiate(this.button_group_prefab);
    this.button_more_node_pool.put(node);
  },
  //
  new_plant_ui_node_pool: function new_plant_ui_node_pool() {
    this.new_plant_ui_node_pool = new cc.NodePool();
    var node = cc.instantiate(this.plant_ui_prefab);
    this.new_plant_ui_node_pool.put(node);
  },
  new_videotape_ui_pool: function new_videotape_ui_pool() {
    this.new_videotape_ui_pool = new cc.NodePool();
    var node = cc.instantiate(this.videotape_ui_prefab);
    this.new_videotape_ui_pool.put(node);
  },
  new_sell_ui_node_pool: function new_sell_ui_node_pool() {
    this.new_sell_ui_node_pool = new cc.NodePool();
    var node = cc.instantiate(this.sell_ui_prefab);
    this.new_sell_ui_node_pool.put(node);
  },
  new_tips_ui_node_pool: function new_tips_ui_node_pool() {
    var count = 5;
    this.new_tips_ui_node_pool = new cc.NodePool();

    for (var i = 0; i < count; i++) {
      var node = cc.instantiate(this.tips_ui_prefab);
      this.new_tips_ui_node_pool.put(node);
    }

    ;
  },
  new_light_effect_pool: function new_light_effect_pool() {
    var count = 8;
    this.new_light_effect_pool = new cc.NodePool();

    for (var i = 0; i < count; i++) {
      var node = cc.instantiate(this.light_effect_prefab);
      this.new_light_effect_pool.put(node);
    }

    ;
  },
  new_study_ui_pool: function new_study_ui_pool() {
    this.new_study_ui_pool = new cc.NodePool();
    var node = cc.instantiate(this.study_ui_prefab);
    this.new_study_ui_pool.put(node);
  },
  new_staff_ui_pool: function new_staff_ui_pool() {
    this.new_staff_ui_pool = new cc.NodePool();
    var node = cc.instantiate(this.staff_ui_prefab);
    this.new_staff_ui_pool.put(node);
  },
  new_pet_ui_pool: function new_pet_ui_pool() {
    this.new_pet_ui_pool = new cc.NodePool();
    var node = cc.instantiate(this.pet_ui_prefab);
    this.new_pet_ui_pool.put(node);
  },
  new_ex_effect_pool: function new_ex_effect_pool() {
    this.new_ex_effect_pool = new cc.NodePool();

    for (var i = 0; i < 10; i++) {
      var node = cc.instantiate(this.ex_effect_prefab);
      this.new_ex_effect_pool.put(node);
    }

    ;
  },
  new_gold_effect_pool: function new_gold_effect_pool() {
    this.new_gold_effect_pool = new cc.NodePool();

    for (var i = 0; i < 10; i++) {
      var node = cc.instantiate(this.gold_effect_prefab);
      this.new_gold_effect_pool.put(node);
    }

    ;
  },
  new_option_ui_pool: function new_option_ui_pool() {
    this.new_option_ui_pool = new cc.NodePool();
    var node = cc.instantiate(this.option_ui_prefab);
    this.new_option_ui_pool.put(node);
  },
  new_hotel_ui_pool: function new_hotel_ui_pool() {
    this.new_hotel_ui_pool = new cc.NodePool();
    var node = cc.instantiate(this.hotel_ui_prefab);
    this.new_hotel_ui_pool.put(node);
  },
  new_shop_ui_pool: function new_shop_ui_pool() {
    this.new_shop_ui_pool = new cc.NodePool();
    var node = cc.instantiate(this.shop_ui_prefab);
    this.new_shop_ui_pool.put(node);
  },
  new_shop_buy_ui_pool: function new_shop_buy_ui_pool() {
    this.new_shop_buy_ui_pool = new cc.NodePool();
    var node = cc.instantiate(this.shop_buy_ui_prefab);
    this.new_shop_buy_ui_pool.put(node);
  },
  //
  //==================================================================
  //创建按钮组
  create_button_group: function create_button_group(parentNode) {
    var node = null;

    if (this.button_more_node_pool.size() > 0) {
      node = this.button_more_node_pool.get();
      node.parent = parentNode;
    } else {
      return;
    }

    ;
    return node;
  },
  create_plant_ui: function create_plant_ui(parentNode) {
    var node = null;

    if (this.new_plant_ui_node_pool.size() > 0) {
      node = this.new_plant_ui_node_pool.get();
      node.parent = parentNode;
    } else {
      return;
    }

    ;
    return node;
  },
  create_sell_ui: function create_sell_ui(parentNode) {
    var node = null;

    if (this.new_sell_ui_node_pool.size() > 0) {
      node = this.new_sell_ui_node_pool.get();
      node.parent = parentNode;
    } else {
      return;
    }

    ;
    return node;
  },
  create_tips_ui: function create_tips_ui(parentNode, type, num) {
    var node = null;

    if (this.new_tips_ui_node_pool.size() > 0) {
      node = this.new_tips_ui_node_pool.get();
      node.parent = parentNode;
      node.getComponent("tips_ui").ini_node(type, num);
    } else {
      return;
    }

    ;
  },
  create_study_ui: function create_study_ui(parentNode) {
    var node = null;

    if (this.new_study_ui_pool.size() > 0) {
      node = this.new_study_ui_pool.get();
      node.parent = parentNode;
    } else {
      return;
    }

    ;
    return node;
  },
  create_staff_ui: function create_staff_ui(parentNode) {
    var node = null;

    if (this.new_staff_ui_pool.size() > 0) {
      node = this.new_staff_ui_pool.get();
      node.parent = parentNode;
    } else {
      return;
    }

    ;
    return node;
  },
  create_offline_profit_ui: function create_offline_profit_ui(parentNode) {
    var node = cc.instantiate(this.offline_profit_ui_prefab);
    node.parent = parentNode;
    node.getComponent("offline_profit").ini_node();
  },
  create_pet_ui: function create_pet_ui(parentNode) {
    var node = null;

    if (this.new_pet_ui_pool.size() > 0) {
      node = this.new_pet_ui_pool.get();
      node.parent = parentNode;
    } else {
      return;
    }

    ;
    return node;
  },
  create_ad_car: function create_ad_car(parentNode, price_difference) {
    var node = cc.instantiate(this.ad_car_prefab);
    node.parent = parentNode;
    node.getComponent("ad_car").ini_node(price_difference);
    return node;
  },
  //父节点，提示点类型，目标位置
  create_button_tips: function create_button_tips(parentNode, position_target) {
    var node = cc.instantiate(this.button_tips_prefab);
    node.parent = parentNode;
    node.x = position_target.x;
    node.active = false;
  },
  create_rest_ui: function create_rest_ui(parentNode, staff_index) {
    var node = cc.instantiate(this.rest_ui_prefab);
    node.parent = parentNode;
    node.getComponent("rest_ui").ini_node(staff_index);
  },
  create_gift_ui: function create_gift_ui(parentNode) {
    var node = cc.instantiate(this.gift_ui_prefab);
    node.parent = parentNode;
    node.getComponent("gift_ui").ini_node();
  },
  create_pet: function create_pet(parentNode, index) {
    var node = cc.instantiate(this.pet_prefab_arr[index]);
    node.parent = parentNode;
  },
  create_option_ui: function create_option_ui() {
    if (this.new_option_ui_pool.size() > 0) {
      var node = this.new_option_ui_pool.get();
      node.parent = this.node;
      node.getComponent("option_ui").ini_node();
    }

    ;
  },
  create_novice_ui: function create_novice_ui() {
    var node = cc.instantiate(this.novice_ui_prefab);
    node.parent = this.node;
    node.getComponent("novice_ui").ini_node();
  },
  create_hotel_ui: function create_hotel_ui() {
    if (this.new_hotel_ui_pool.size() > 0) {
      var node = this.new_hotel_ui_pool.get();
      node.parent = this.node;
      node.getComponent("hotel_ui").ini_node();
    }

    ;
  },
  create_shop_buy_ui: function create_shop_buy_ui(type, index, spriteFrame) {
    //物品类型，物品编号，物品的图片
    if (this.new_shop_buy_ui_pool.size() > 0) {
      var node = this.new_shop_buy_ui_pool.get();
      node.parent = this.node;
      node.getComponent("shop_buy_ui").ini_node(type, index, spriteFrame);
    }

    ;
  },
  create_shop_ui: function create_shop_ui() {
    if (this.new_shop_ui_pool.size() > 0) {
      var node = this.new_shop_ui_pool.get();
      node.parent = this.node;
      node.getComponent("shop_ui").ini_node();
    }

    ;
  },
  create_videotape_ui: function create_videotape_ui() {
    if (this.new_videotape_ui_pool.size() > 0) {
      var node = this.new_videotape_ui_pool.get();
      node.parent = this.node;
      node.getComponent("videotape_ui").ini_node();
    }

    ;
  },
  create_ex_effect: function create_ex_effect(create_node, index) {
    var _this = this;

    //在哪个节点进行创建，创建的第几个
    //create_node , index
    var level_icon = cc.find("UI_ROOT/top/level/level_icon"); //将创建的初始地址 转换为世界坐标

    var c_Wpos = create_node.parent.convertToWorldSpaceAR(create_node.position); //转换为需要的相对坐标

    var c_nPos = this.node.convertToNodeSpaceAR(c_Wpos); //将飞往的目标位置转为世界坐标

    var t_Wpos = level_icon.parent.convertToWorldSpaceAR(level_icon.position); //将目标位置转为相对位置

    var t_Npos = this.node.convertToNodeSpaceAR(t_Wpos);

    if (this.new_ex_effect_pool.size() > 0) {
      var node = this.new_ex_effect_pool.get();
      node.parent = this.node;
      node.position = c_nPos;
      cc.tween(node).to((index + 1) / 5, {
        position: t_Npos
      }, {
        easing: "sineIn"
      }).call(function () {
        _this.sound_control.play_sound_effect("add_ex");

        _this.game_rules_js.add_ex(1);

        _this.on_node_kill(node);
      }).start();
    }

    ;
  },
  //收割特效
  create_light_effect: function create_light_effect(create_node, index, plant_index) {
    var _this2 = this;

    //在哪个节点进行创建，创建的第几个 种子编号
    var sell = cc.find("UI_ROOT/center/build/sell"); //将创建的初始地址 转换为世界坐标

    var c_Wpos = create_node.parent.convertToWorldSpaceAR(create_node.position); //转换为需要的相对坐标

    var c_nPos = this.node.convertToNodeSpaceAR(c_Wpos); //将飞往的目标位置转为世界坐标

    var t_Wpos = sell.parent.convertToWorldSpaceAR(sell.position); //将目标位置转为相对位置

    var t_Npos = this.node.convertToNodeSpaceAR(t_Wpos);

    if (this.new_light_effect_pool.size() > 0) {
      var node = this.new_light_effect_pool.get();
      node.parent = this.node;
      node.position = c_nPos;
      cc.tween(node).delay(1).to((index + 1) / 5, {
        position: t_Npos
      }, {
        easing: "sineIn"
      }).call(function () {
        _this2.sound_control.play_sound_effect("add_ex");

        var all_capacity = user_data.user_data.wareHouse_level * _config["default"].wareHouse["all_capacity"];

        for (var i = 0; i < 15; i++) {
          if (user_data.user_data.wareHouse[i].have == 0) break; // nếu chưa mở ô thì dừng, k cộng thêm nữa, đã tràn kho
          else if (user_data.user_data.wareHouse[i].count == 0) {
              // nếu là ô trống thì thêm vào
              user_data.user_data.wareHouse[i].count = 1;
              user_data.user_data.wareHouse[i].id_product = plant_index; // gán id cây 

              break;
            } else if (user_data.user_data.wareHouse[i].count < 30 && user_data.user_data.wareHouse[i].id_product == plant_index) // kiểm tra kho cùng loại
              {
                user_data.user_data.wareHouse[i].count++;
                break;
              }
        } // user_data.user_data.wareHouse[plant_index].count++; // thêm vật phẩm vào kho
        // this.game_rules_js.jgg(1);


        _this2.on_node_kill(node);
      }).start();
    }

    ;
    return node;
  },
  create_gold_effect: function create_gold_effect(create_node, index, addGold) {
    var _this3 = this;

    //create node 在哪个节点飞， index 数量 ,num增加的金币数量
    var gold_icon = cc.find("UI_ROOT/top/gold/gold_icon"); //将创建的初始地址 转换为世界坐标

    var c_Wpos = create_node.parent.convertToWorldSpaceAR(create_node.position); //转换为需要的相对坐标

    var c_nPos = this.node.convertToNodeSpaceAR(c_Wpos); //将飞往的目标位置转为世界坐标

    var t_Wpos = gold_icon.parent.convertToWorldSpaceAR(gold_icon.position); //将目标位置转为相对位置

    var t_Npos = this.node.convertToNodeSpaceAR(t_Wpos);

    if (this.new_gold_effect_pool.size() > 0) {
      var node = this.new_gold_effect_pool.get();
      node.parent = this.node;
      node.position = c_nPos;
      node.y += 50;
      cc.tween(node).to((index + 1) / 5, {
        position: t_Npos
      }, {
        easing: "sineIn"
      }).call(function () {
        _this3.sound_control.play_sound_effect("add_gold");

        _this3.game_rules_js.add_gold(addGold);

        _this3.on_node_kill(node);
      }).start();
    }

    ;
  },
  //节点销毁
  on_node_kill: function on_node_kill(node) {
    switch (node.name) {
      case "button_more":
        this.button_more_node_pool.put(node);
        break;

      case "plant_ui":
        this.new_plant_ui_node_pool.put(node);
        break;

      case "sell_ui":
        this.new_sell_ui_node_pool.put(node);
        break;

      case "tips_ui":
        this.new_tips_ui_node_pool.put(node);
        break;

      case "light":
        this.new_light_effect_pool.put(node);
        break;

      case "study_ui":
        this.new_study_ui_pool.put(node);
        break;

      case "staff_ui":
        this.new_staff_ui_pool.put(node);
        break;

      case "pet_ui":
        this.new_pet_ui_pool.put(node);
        break;

      case "ex_effect":
        this.new_ex_effect_pool.put(node);
        break;

      case "gold_effect":
        this.new_gold_effect_pool.put(node);
        break;

      case "option_ui":
        this.new_option_ui_pool.put(node);
        break;

      case "hotel_ui":
        this.new_hotel_ui_pool.put(node);
        break;

      case "shop_buy_ui":
        this.new_shop_buy_ui_pool.put(node);
        break;

      case "shop_ui":
        this.new_shop_ui_pool.put(node);
        break;

      case "videotape_ui":
        this.new_videotape_ui_pool.put(node);
        break;

      default:
        return;
    }

    ;
  },
  //初始化节点
  ini_node: function ini_node() {
    this.new_button_group_node_pool();
    this.new_plant_ui_node_pool();
    this.new_sell_ui_node_pool();
    this.new_tips_ui_node_pool();
    this.new_light_effect_pool();
    this.new_study_ui_pool();
    this.new_staff_ui_pool();
    this.new_pet_ui_pool();
    this.new_ex_effect_pool();
    this.new_option_ui_pool();
    this.new_gold_effect_pool();
    this.new_hotel_ui_pool();
    this.new_shop_buy_ui_pool();
    this.new_shop_ui_pool();
    this.new_videotape_ui_pool();
  },
  onLoad: function onLoad() {
    this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
    this.sound_control = cc.find("sound_control").getComponent("sound_control");
    this.ini_node();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lX3NjZW5lLmpzIl0sIm5hbWVzIjpbInVzZXJfZGF0YSIsInJlcXVpcmUiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImJ1dHRvbl9ncm91cF9wcmVmYWIiLCJQcmVmYWIiLCJwbGFudF91aV9wcmVmYWIiLCJzZWxsX3VpX3ByZWZhYiIsInRpcHNfdWlfcHJlZmFiIiwibGlnaHRfZWZmZWN0X3ByZWZhYiIsInN0dWR5X3VpX3ByZWZhYiIsInN0YWZmX3VpX3ByZWZhYiIsIm9mZmxpbmVfcHJvZml0X3VpX3ByZWZhYiIsInBldF91aV9wcmVmYWIiLCJhZF9jYXJfcHJlZmFiIiwiYnV0dG9uX3RpcHNfcHJlZmFiIiwicmVzdF91aV9wcmVmYWIiLCJwZXRfcHJlZmFiX2FyciIsImV4X2VmZmVjdF9wcmVmYWIiLCJnaWZ0X3VpX3ByZWZhYiIsIm9wdGlvbl91aV9wcmVmYWIiLCJnb2xkX2VmZmVjdF9wcmVmYWIiLCJub3ZpY2VfdWlfcHJlZmFiIiwiaG90ZWxfdWlfcHJlZmFiIiwic2hvcF91aV9wcmVmYWIiLCJzaG9wX2J1eV91aV9wcmVmYWIiLCJ2aWRlb3RhcGVfdWlfcHJlZmFiIiwibmV3X2J1dHRvbl9ncm91cF9ub2RlX3Bvb2wiLCJidXR0b25fbW9yZV9ub2RlX3Bvb2wiLCJOb2RlUG9vbCIsIm5vZGUiLCJpbnN0YW50aWF0ZSIsInB1dCIsIm5ld19wbGFudF91aV9ub2RlX3Bvb2wiLCJuZXdfdmlkZW90YXBlX3VpX3Bvb2wiLCJuZXdfc2VsbF91aV9ub2RlX3Bvb2wiLCJuZXdfdGlwc191aV9ub2RlX3Bvb2wiLCJjb3VudCIsImkiLCJuZXdfbGlnaHRfZWZmZWN0X3Bvb2wiLCJuZXdfc3R1ZHlfdWlfcG9vbCIsIm5ld19zdGFmZl91aV9wb29sIiwibmV3X3BldF91aV9wb29sIiwibmV3X2V4X2VmZmVjdF9wb29sIiwibmV3X2dvbGRfZWZmZWN0X3Bvb2wiLCJuZXdfb3B0aW9uX3VpX3Bvb2wiLCJuZXdfaG90ZWxfdWlfcG9vbCIsIm5ld19zaG9wX3VpX3Bvb2wiLCJuZXdfc2hvcF9idXlfdWlfcG9vbCIsImNyZWF0ZV9idXR0b25fZ3JvdXAiLCJwYXJlbnROb2RlIiwic2l6ZSIsImdldCIsInBhcmVudCIsImNyZWF0ZV9wbGFudF91aSIsImNyZWF0ZV9zZWxsX3VpIiwiY3JlYXRlX3RpcHNfdWkiLCJ0eXBlIiwibnVtIiwiZ2V0Q29tcG9uZW50IiwiaW5pX25vZGUiLCJjcmVhdGVfc3R1ZHlfdWkiLCJjcmVhdGVfc3RhZmZfdWkiLCJjcmVhdGVfb2ZmbGluZV9wcm9maXRfdWkiLCJjcmVhdGVfcGV0X3VpIiwiY3JlYXRlX2FkX2NhciIsInByaWNlX2RpZmZlcmVuY2UiLCJjcmVhdGVfYnV0dG9uX3RpcHMiLCJwb3NpdGlvbl90YXJnZXQiLCJ4IiwiYWN0aXZlIiwiY3JlYXRlX3Jlc3RfdWkiLCJzdGFmZl9pbmRleCIsImNyZWF0ZV9naWZ0X3VpIiwiY3JlYXRlX3BldCIsImluZGV4IiwiY3JlYXRlX29wdGlvbl91aSIsImNyZWF0ZV9ub3ZpY2VfdWkiLCJjcmVhdGVfaG90ZWxfdWkiLCJjcmVhdGVfc2hvcF9idXlfdWkiLCJzcHJpdGVGcmFtZSIsImNyZWF0ZV9zaG9wX3VpIiwiY3JlYXRlX3ZpZGVvdGFwZV91aSIsImNyZWF0ZV9leF9lZmZlY3QiLCJjcmVhdGVfbm9kZSIsImxldmVsX2ljb24iLCJmaW5kIiwiY19XcG9zIiwiY29udmVydFRvV29ybGRTcGFjZUFSIiwicG9zaXRpb24iLCJjX25Qb3MiLCJjb252ZXJ0VG9Ob2RlU3BhY2VBUiIsInRfV3BvcyIsInRfTnBvcyIsInR3ZWVuIiwidG8iLCJlYXNpbmciLCJjYWxsIiwic291bmRfY29udHJvbCIsInBsYXlfc291bmRfZWZmZWN0IiwiZ2FtZV9ydWxlc19qcyIsImFkZF9leCIsIm9uX25vZGVfa2lsbCIsInN0YXJ0IiwiY3JlYXRlX2xpZ2h0X2VmZmVjdCIsInBsYW50X2luZGV4Iiwic2VsbCIsImRlbGF5IiwiYWxsX2NhcGFjaXR5Iiwid2FyZUhvdXNlX2xldmVsIiwiY29uZmlnIiwid2FyZUhvdXNlIiwiaGF2ZSIsImlkX3Byb2R1Y3QiLCJjcmVhdGVfZ29sZF9lZmZlY3QiLCJhZGRHb2xkIiwiZ29sZF9pY29uIiwieSIsImFkZF9nb2xkIiwibmFtZSIsIm9uTG9hZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQTs7OztBQURBLElBQUlBLFNBQVMsR0FBR0MsT0FBTyxDQUFDLFdBQUQsQ0FBdkI7O0FBRUFDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxtQkFBbUIsRUFBRUosRUFBRSxDQUFDSyxNQURoQjtBQUVSQyxJQUFBQSxlQUFlLEVBQUVOLEVBQUUsQ0FBQ0ssTUFGWjtBQUdSRSxJQUFBQSxjQUFjLEVBQUVQLEVBQUUsQ0FBQ0ssTUFIWDtBQUlSRyxJQUFBQSxjQUFjLEVBQUVSLEVBQUUsQ0FBQ0ssTUFKWDtBQUtSSSxJQUFBQSxtQkFBbUIsRUFBRVQsRUFBRSxDQUFDSyxNQUxoQjtBQU1SSyxJQUFBQSxlQUFlLEVBQUVWLEVBQUUsQ0FBQ0ssTUFOWjtBQU9STSxJQUFBQSxlQUFlLEVBQUVYLEVBQUUsQ0FBQ0ssTUFQWjtBQVFSTyxJQUFBQSx3QkFBd0IsRUFBRVosRUFBRSxDQUFDSyxNQVJyQjtBQVNSUSxJQUFBQSxhQUFhLEVBQUViLEVBQUUsQ0FBQ0ssTUFUVjtBQVVSUyxJQUFBQSxhQUFhLEVBQUVkLEVBQUUsQ0FBQ0ssTUFWVjtBQVdSVSxJQUFBQSxrQkFBa0IsRUFBRWYsRUFBRSxDQUFDSyxNQVhmO0FBWVJXLElBQUFBLGNBQWMsRUFBRWhCLEVBQUUsQ0FBQ0ssTUFaWDtBQWFSWSxJQUFBQSxjQUFjLEVBQUUsQ0FBQ2pCLEVBQUUsQ0FBQ0ssTUFBSixDQWJSO0FBY1JhLElBQUFBLGdCQUFnQixFQUFFbEIsRUFBRSxDQUFDSyxNQWRiO0FBZVJjLElBQUFBLGNBQWMsRUFBRW5CLEVBQUUsQ0FBQ0ss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bEcsRUFBRSxDQUFDc0YsSUFBSCxDQUFRLGVBQVIsRUFBeUIzQixZQUF6QixDQUFzQyxlQUF0QyxDQUFyQjtBQUNBLFNBQUtDLFFBQUw7QUFDSCxHQTdiSTtBQStiTDJDLEVBQUFBLEtBL2JLLG1CQStiRyxDQUVQLENBamNJLENBbWNMOztBQW5jSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgdXNlcl9kYXRhID0gcmVxdWlyZShcInVzZXJfZGF0YVwiKTtcclxuaW1wb3J0IGNvbmZpZyBmcm9tIFwiY29uZmlnXCI7XHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgYnV0dG9uX2dyb3VwX3ByZWZhYjogY2MuUHJlZmFiLFxyXG4gICAgICAgIHBsYW50X3VpX3ByZWZhYjogY2MuUHJlZmFiLFxyXG4gICAgICAgIHNlbGxfdWlfcHJlZmFiOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgdGlwc191aV9wcmVmYWI6IGNjLlByZWZhYixcclxuICAgICAgICBsaWdodF9lZmZlY3RfcHJlZmFiOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgc3R1ZHlfdWlfcHJlZmFiOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgc3RhZmZfdWlfcHJlZmFiOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgb2ZmbGluZV9wcm9maXRfdWlfcHJlZmFiOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgcGV0X3VpX3ByZWZhYjogY2MuUHJlZmFiLFxyXG4gICAgICAgIGFkX2Nhcl9wcmVmYWI6IGNjLlByZWZhYixcclxuICAgICAgICBidXR0b25fdGlwc19wcmVmYWI6IGNjLlByZWZhYixcclxuICAgICAgICByZXN0X3VpX3ByZWZhYjogY2MuUHJlZmFiLFxyXG4gICAgICAgIHBldF9wcmVmYWJfYXJyOiBbY2MuUHJlZmFiXSxcclxuICAgICAgICBleF9lZmZlY3RfcHJlZmFiOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgZ2lmdF91aV9wcmVmYWI6IGNjLlByZWZhYixcclxuICAgICAgICBvcHRpb25fdWlfcHJlZmFiOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgZ29sZF9lZmZlY3RfcHJlZmFiOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgbm92aWNlX3VpX3ByZWZhYjogY2MuUHJlZmFiLFxyXG4gICAgICAgIGhvdGVsX3VpX3ByZWZhYjogY2MuUHJlZmFiLFxyXG4gICAgICAgIHNob3BfdWlfcHJlZmFiOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgc2hvcF9idXlfdWlfcHJlZmFiOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgdmlkZW90YXBlX3VpX3ByZWZhYjogY2MuUHJlZmFiLFxyXG4gICAgfSxcclxuXHJcbiAgICAvL+WIm+W7uuaMiemSrue7hOeahOiKgueCueaxoFxyXG4gICAgbmV3X2J1dHRvbl9ncm91cF9ub2RlX3Bvb2w6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmJ1dHRvbl9tb3JlX25vZGVfcG9vbCA9IG5ldyBjYy5Ob2RlUG9vbCgpO1xyXG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5idXR0b25fZ3JvdXBfcHJlZmFiKTtcclxuICAgICAgICB0aGlzLmJ1dHRvbl9tb3JlX25vZGVfcG9vbC5wdXQobm9kZSk7XHJcbiAgICB9LFxyXG4gICAgLy9cclxuICAgIG5ld19wbGFudF91aV9ub2RlX3Bvb2w6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLm5ld19wbGFudF91aV9ub2RlX3Bvb2wgPSBuZXcgY2MuTm9kZVBvb2woKTtcclxuICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGxhbnRfdWlfcHJlZmFiKTtcclxuICAgICAgICB0aGlzLm5ld19wbGFudF91aV9ub2RlX3Bvb2wucHV0KG5vZGUpO1xyXG4gICAgfSxcclxuICAgIG5ld192aWRlb3RhcGVfdWlfcG9vbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMubmV3X3ZpZGVvdGFwZV91aV9wb29sID0gbmV3IGNjLk5vZGVQb29sKCk7XHJcbiAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnZpZGVvdGFwZV91aV9wcmVmYWIpO1xyXG4gICAgICAgIHRoaXMubmV3X3ZpZGVvdGFwZV91aV9wb29sLnB1dChub2RlKTtcclxuICAgIH0sXHJcbiAgICBuZXdfc2VsbF91aV9ub2RlX3Bvb2w6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLm5ld19zZWxsX3VpX25vZGVfcG9vbCA9IG5ldyBjYy5Ob2RlUG9vbCgpO1xyXG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5zZWxsX3VpX3ByZWZhYik7XHJcbiAgICAgICAgdGhpcy5uZXdfc2VsbF91aV9ub2RlX3Bvb2wucHV0KG5vZGUpO1xyXG4gICAgfSxcclxuICAgIG5ld190aXBzX3VpX25vZGVfcG9vbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBjb3VudCA9IDU7XHJcbiAgICAgICAgdGhpcy5uZXdfdGlwc191aV9ub2RlX3Bvb2wgPSBuZXcgY2MuTm9kZVBvb2woKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnRpcHNfdWlfcHJlZmFiKTtcclxuICAgICAgICAgICAgdGhpcy5uZXdfdGlwc191aV9ub2RlX3Bvb2wucHV0KG5vZGUpO1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgbmV3X2xpZ2h0X2VmZmVjdF9wb29sOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGNvdW50ID0gODtcclxuICAgICAgICB0aGlzLm5ld19saWdodF9lZmZlY3RfcG9vbCA9IG5ldyBjYy5Ob2RlUG9vbCgpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMubGlnaHRfZWZmZWN0X3ByZWZhYik7XHJcbiAgICAgICAgICAgIHRoaXMubmV3X2xpZ2h0X2VmZmVjdF9wb29sLnB1dChub2RlKTtcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIG5ld19zdHVkeV91aV9wb29sOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5uZXdfc3R1ZHlfdWlfcG9vbCA9IG5ldyBjYy5Ob2RlUG9vbCgpO1xyXG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5zdHVkeV91aV9wcmVmYWIpO1xyXG4gICAgICAgIHRoaXMubmV3X3N0dWR5X3VpX3Bvb2wucHV0KG5vZGUpO1xyXG4gICAgfSxcclxuICAgIG5ld19zdGFmZl91aV9wb29sOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5uZXdfc3RhZmZfdWlfcG9vbCA9IG5ldyBjYy5Ob2RlUG9vbCgpO1xyXG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5zdGFmZl91aV9wcmVmYWIpO1xyXG4gICAgICAgIHRoaXMubmV3X3N0YWZmX3VpX3Bvb2wucHV0KG5vZGUpO1xyXG4gICAgfSxcclxuICAgIG5ld19wZXRfdWlfcG9vbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMubmV3X3BldF91aV9wb29sID0gbmV3IGNjLk5vZGVQb29sKCk7XHJcbiAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnBldF91aV9wcmVmYWIpO1xyXG4gICAgICAgIHRoaXMubmV3X3BldF91aV9wb29sLnB1dChub2RlKTtcclxuICAgIH0sXHJcbiAgICBuZXdfZXhfZWZmZWN0X3Bvb2woKSB7XHJcbiAgICAgICAgdGhpcy5uZXdfZXhfZWZmZWN0X3Bvb2wgPSBuZXcgY2MuTm9kZVBvb2woKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDEwOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmV4X2VmZmVjdF9wcmVmYWIpO1xyXG4gICAgICAgICAgICB0aGlzLm5ld19leF9lZmZlY3RfcG9vbC5wdXQobm9kZSk7XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBuZXdfZ29sZF9lZmZlY3RfcG9vbCgpIHtcclxuICAgICAgICB0aGlzLm5ld19nb2xkX2VmZmVjdF9wb29sID0gbmV3IGNjLk5vZGVQb29sKCk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5nb2xkX2VmZmVjdF9wcmVmYWIpO1xyXG4gICAgICAgICAgICB0aGlzLm5ld19nb2xkX2VmZmVjdF9wb29sLnB1dChub2RlKTtcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIG5ld19vcHRpb25fdWlfcG9vbCgpIHtcclxuICAgICAgICB0aGlzLm5ld19vcHRpb25fdWlfcG9vbCA9IG5ldyBjYy5Ob2RlUG9vbCgpO1xyXG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5vcHRpb25fdWlfcHJlZmFiKTtcclxuICAgICAgICB0aGlzLm5ld19vcHRpb25fdWlfcG9vbC5wdXQobm9kZSk7XHJcbiAgICB9LFxyXG4gICAgbmV3X2hvdGVsX3VpX3Bvb2woKSB7XHJcbiAgICAgICAgdGhpcy5uZXdfaG90ZWxfdWlfcG9vbCA9IG5ldyBjYy5Ob2RlUG9vbCgpO1xyXG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5ob3RlbF91aV9wcmVmYWIpO1xyXG4gICAgICAgIHRoaXMubmV3X2hvdGVsX3VpX3Bvb2wucHV0KG5vZGUpO1xyXG4gICAgfSxcclxuICAgIG5ld19zaG9wX3VpX3Bvb2woKSB7XHJcbiAgICAgICAgdGhpcy5uZXdfc2hvcF91aV9wb29sID0gbmV3IGNjLk5vZGVQb29sKCk7XHJcbiAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnNob3BfdWlfcHJlZmFiKTtcclxuICAgICAgICB0aGlzLm5ld19zaG9wX3VpX3Bvb2wucHV0KG5vZGUpO1xyXG4gICAgfSxcclxuICAgIG5ld19zaG9wX2J1eV91aV9wb29sKCkge1xyXG4gICAgICAgIHRoaXMubmV3X3Nob3BfYnV5X3VpX3Bvb2wgPSBuZXcgY2MuTm9kZVBvb2woKTtcclxuICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuc2hvcF9idXlfdWlfcHJlZmFiKTtcclxuICAgICAgICB0aGlzLm5ld19zaG9wX2J1eV91aV9wb29sLnB1dChub2RlKTtcclxuICAgIH0sXHJcbiAgICAvL1xyXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIC8v5Yib5bu65oyJ6ZKu57uEXHJcbiAgICBjcmVhdGVfYnV0dG9uX2dyb3VwOiBmdW5jdGlvbiAocGFyZW50Tm9kZSkge1xyXG4gICAgICAgIHZhciBub2RlID0gbnVsbDtcclxuICAgICAgICBpZiAodGhpcy5idXR0b25fbW9yZV9ub2RlX3Bvb2wuc2l6ZSgpID4gMCkge1xyXG4gICAgICAgICAgICBub2RlID0gdGhpcy5idXR0b25fbW9yZV9ub2RlX3Bvb2wuZ2V0KCk7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gcGFyZW50Tm9kZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH0sXHJcbiAgICBjcmVhdGVfcGxhbnRfdWk6IGZ1bmN0aW9uIChwYXJlbnROb2RlKSB7XHJcbiAgICAgICAgdmFyIG5vZGUgPSBudWxsO1xyXG4gICAgICAgIGlmICh0aGlzLm5ld19wbGFudF91aV9ub2RlX3Bvb2wuc2l6ZSgpID4gMCkge1xyXG4gICAgICAgICAgICBub2RlID0gdGhpcy5uZXdfcGxhbnRfdWlfbm9kZV9wb29sLmdldCgpO1xyXG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHBhcmVudE5vZGU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9LFxyXG4gICAgY3JlYXRlX3NlbGxfdWk6IGZ1bmN0aW9uIChwYXJlbnROb2RlKSB7XHJcbiAgICAgICAgdmFyIG5vZGUgPSBudWxsO1xyXG4gICAgICAgIGlmICh0aGlzLm5ld19zZWxsX3VpX25vZGVfcG9vbC5zaXplKCkgPiAwKSB7XHJcbiAgICAgICAgICAgIG5vZGUgPSB0aGlzLm5ld19zZWxsX3VpX25vZGVfcG9vbC5nZXQoKTtcclxuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBwYXJlbnROb2RlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfSxcclxuICAgIGNyZWF0ZV90aXBzX3VpOiBmdW5jdGlvbiAocGFyZW50Tm9kZSwgdHlwZSwgbnVtKSB7XHJcbiAgICAgICAgdmFyIG5vZGUgPSBudWxsO1xyXG4gICAgICAgIGlmICh0aGlzLm5ld190aXBzX3VpX25vZGVfcG9vbC5zaXplKCkgPiAwKSB7XHJcbiAgICAgICAgICAgIG5vZGUgPSB0aGlzLm5ld190aXBzX3VpX25vZGVfcG9vbC5nZXQoKTtcclxuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBwYXJlbnROb2RlO1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcInRpcHNfdWlcIikuaW5pX25vZGUodHlwZSwgbnVtKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBjcmVhdGVfc3R1ZHlfdWk6IGZ1bmN0aW9uIChwYXJlbnROb2RlKSB7XHJcbiAgICAgICAgdmFyIG5vZGUgPSBudWxsO1xyXG4gICAgICAgIGlmICh0aGlzLm5ld19zdHVkeV91aV9wb29sLnNpemUoKSA+IDApIHtcclxuICAgICAgICAgICAgbm9kZSA9IHRoaXMubmV3X3N0dWR5X3VpX3Bvb2wuZ2V0KCk7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gcGFyZW50Tm9kZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH0sXHJcbiAgICBjcmVhdGVfc3RhZmZfdWk6IGZ1bmN0aW9uIChwYXJlbnROb2RlKSB7XHJcbiAgICAgICAgdmFyIG5vZGUgPSBudWxsO1xyXG4gICAgICAgIGlmICh0aGlzLm5ld19zdGFmZl91aV9wb29sLnNpemUoKSA+IDApIHtcclxuICAgICAgICAgICAgbm9kZSA9IHRoaXMubmV3X3N0YWZmX3VpX3Bvb2wuZ2V0KCk7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gcGFyZW50Tm9kZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH0sXHJcbiAgICBjcmVhdGVfb2ZmbGluZV9wcm9maXRfdWk6IGZ1bmN0aW9uIChwYXJlbnROb2RlKSB7XHJcbiAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLm9mZmxpbmVfcHJvZml0X3VpX3ByZWZhYik7XHJcbiAgICAgICAgbm9kZS5wYXJlbnQgPSBwYXJlbnROb2RlO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwib2ZmbGluZV9wcm9maXRcIikuaW5pX25vZGUoKTtcclxuICAgIH0sXHJcbiAgICBjcmVhdGVfcGV0X3VpOiBmdW5jdGlvbiAocGFyZW50Tm9kZSkge1xyXG4gICAgICAgIHZhciBub2RlID0gbnVsbDtcclxuICAgICAgICBpZiAodGhpcy5uZXdfcGV0X3VpX3Bvb2wuc2l6ZSgpID4gMCkge1xyXG4gICAgICAgICAgICBub2RlID0gdGhpcy5uZXdfcGV0X3VpX3Bvb2wuZ2V0KCk7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gcGFyZW50Tm9kZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH0sXHJcbiAgICBjcmVhdGVfYWRfY2FyKHBhcmVudE5vZGUsIHByaWNlX2RpZmZlcmVuY2UpIHtcclxuICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuYWRfY2FyX3ByZWZhYilcclxuICAgICAgICBub2RlLnBhcmVudCA9IHBhcmVudE5vZGU7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJhZF9jYXJcIikuaW5pX25vZGUocHJpY2VfZGlmZmVyZW5jZSk7XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9LFxyXG4gICAgLy/niLboioLngrnvvIzmj5DnpLrngrnnsbvlnovvvIznm67moIfkvY3nva5cclxuICAgIGNyZWF0ZV9idXR0b25fdGlwcyhwYXJlbnROb2RlLCBwb3NpdGlvbl90YXJnZXQpIHtcclxuICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuYnV0dG9uX3RpcHNfcHJlZmFiKTtcclxuICAgICAgICBub2RlLnBhcmVudCA9IHBhcmVudE5vZGU7XHJcbiAgICAgICAgbm9kZS54ID0gcG9zaXRpb25fdGFyZ2V0Lng7XHJcbiAgICAgICAgbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH0sXHJcbiAgICBjcmVhdGVfcmVzdF91aShwYXJlbnROb2RlLCBzdGFmZl9pbmRleCkge1xyXG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5yZXN0X3VpX3ByZWZhYik7XHJcbiAgICAgICAgbm9kZS5wYXJlbnQgPSBwYXJlbnROb2RlO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwicmVzdF91aVwiKS5pbmlfbm9kZShzdGFmZl9pbmRleCk7XHJcbiAgICB9LFxyXG4gICAgY3JlYXRlX2dpZnRfdWkocGFyZW50Tm9kZSkge1xyXG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5naWZ0X3VpX3ByZWZhYik7XHJcbiAgICAgICAgbm9kZS5wYXJlbnQgPSBwYXJlbnROb2RlO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiZ2lmdF91aVwiKS5pbmlfbm9kZSgpO1xyXG4gICAgfSxcclxuICAgIGNyZWF0ZV9wZXQocGFyZW50Tm9kZSwgaW5kZXgpIHtcclxuICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGV0X3ByZWZhYl9hcnJbaW5kZXhdKTtcclxuICAgICAgICBub2RlLnBhcmVudCA9IHBhcmVudE5vZGU7XHJcbiAgICB9LFxyXG4gICAgY3JlYXRlX29wdGlvbl91aSgpIHtcclxuICAgICAgICBpZiAodGhpcy5uZXdfb3B0aW9uX3VpX3Bvb2wuc2l6ZSgpID4gMCkge1xyXG4gICAgICAgICAgICB2YXIgbm9kZSA9IHRoaXMubmV3X29wdGlvbl91aV9wb29sLmdldCgpO1xyXG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMubm9kZTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJvcHRpb25fdWlcIikuaW5pX25vZGUoKTtcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIGNyZWF0ZV9ub3ZpY2VfdWkoKSB7XHJcbiAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLm5vdmljZV91aV9wcmVmYWIpO1xyXG4gICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwibm92aWNlX3VpXCIpLmluaV9ub2RlKCk7XHJcbiAgICB9LFxyXG4gICAgY3JlYXRlX2hvdGVsX3VpKCkge1xyXG4gICAgICAgIGlmICh0aGlzLm5ld19ob3RlbF91aV9wb29sLnNpemUoKSA+IDApIHtcclxuICAgICAgICAgICAgdmFyIG5vZGUgPSB0aGlzLm5ld19ob3RlbF91aV9wb29sLmdldCgpO1xyXG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMubm9kZTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJob3RlbF91aVwiKS5pbmlfbm9kZSgpO1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgY3JlYXRlX3Nob3BfYnV5X3VpKHR5cGUsIGluZGV4LCBzcHJpdGVGcmFtZSkge1xyXG4gICAgICAgIC8v54mp5ZOB57G75Z6L77yM54mp5ZOB57yW5Y+377yM54mp5ZOB55qE5Zu+54mHXHJcbiAgICAgICAgaWYgKHRoaXMubmV3X3Nob3BfYnV5X3VpX3Bvb2wuc2l6ZSgpID4gMCkge1xyXG4gICAgICAgICAgICB2YXIgbm9kZSA9IHRoaXMubmV3X3Nob3BfYnV5X3VpX3Bvb2wuZ2V0KCk7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcInNob3BfYnV5X3VpXCIpLmluaV9ub2RlKHR5cGUsIGluZGV4LCBzcHJpdGVGcmFtZSk7XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBjcmVhdGVfc2hvcF91aSgpIHtcclxuICAgICAgICBpZiAodGhpcy5uZXdfc2hvcF91aV9wb29sLnNpemUoKSA+IDApIHtcclxuICAgICAgICAgICAgdmFyIG5vZGUgPSB0aGlzLm5ld19zaG9wX3VpX3Bvb2wuZ2V0KCk7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcInNob3BfdWlcIikuaW5pX25vZGUoKTtcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIGNyZWF0ZV92aWRlb3RhcGVfdWkoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubmV3X3ZpZGVvdGFwZV91aV9wb29sLnNpemUoKSA+IDApIHtcclxuICAgICAgICAgICAgdmFyIG5vZGUgPSB0aGlzLm5ld192aWRlb3RhcGVfdWlfcG9vbC5nZXQoKTtcclxuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwidmlkZW90YXBlX3VpXCIpLmluaV9ub2RlKCk7XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBjcmVhdGVfZXhfZWZmZWN0KGNyZWF0ZV9ub2RlLCBpbmRleCkge1xyXG5cclxuICAgICAgICAvL+WcqOWTquS4quiKgueCuei/m+ihjOWIm+W7uu+8jOWIm+W7uueahOesrOWHoOS4qlxyXG4gICAgICAgIC8vY3JlYXRlX25vZGUgLCBpbmRleFxyXG4gICAgICAgIHZhciBsZXZlbF9pY29uID0gY2MuZmluZChcIlVJX1JPT1QvdG9wL2xldmVsL2xldmVsX2ljb25cIik7XHJcbiAgICAgICAgLy/lsIbliJvlu7rnmoTliJ3lp4vlnLDlnYAg6L2s5o2i5Li65LiW55WM5Z2Q5qCHXHJcbiAgICAgICAgdmFyIGNfV3BvcyA9IGNyZWF0ZV9ub2RlLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY3JlYXRlX25vZGUucG9zaXRpb24pO1xyXG4gICAgICAgIC8v6L2s5o2i5Li66ZyA6KaB55qE55u45a+55Z2Q5qCHXHJcbiAgICAgICAgdmFyIGNfblBvcyA9IHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihjX1dwb3MpO1xyXG5cclxuICAgICAgICAvL+WwhumjnuW+gOeahOebruagh+S9jee9rui9rOS4uuS4lueVjOWdkOagh1xyXG4gICAgICAgIHZhciB0X1dwb3MgPSBsZXZlbF9pY29uLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIobGV2ZWxfaWNvbi5wb3NpdGlvbik7XHJcbiAgICAgICAgLy/lsIbnm67moIfkvY3nva7ovazkuLrnm7jlr7nkvY3nva5cclxuICAgICAgICB2YXIgdF9OcG9zID0gdGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHRfV3BvcylcclxuXHJcblxyXG4gICAgICAgIGlmICh0aGlzLm5ld19leF9lZmZlY3RfcG9vbC5zaXplKCkgPiAwKSB7XHJcbiAgICAgICAgICAgIHZhciBub2RlID0gdGhpcy5uZXdfZXhfZWZmZWN0X3Bvb2wuZ2V0KCk7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgICAgICBub2RlLnBvc2l0aW9uID0gY19uUG9zO1xyXG4gICAgICAgICAgICBjYy50d2Vlbihub2RlKVxyXG4gICAgICAgICAgICAgICAgLnRvKChpbmRleCArIDEpIC8gNSwgeyBwb3NpdGlvbjogdF9OcG9zIH0sIHsgZWFzaW5nOiBcInNpbmVJblwiIH0pXHJcbiAgICAgICAgICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYWRkX2V4XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcy5hZGRfZXgoMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbl9ub2RlX2tpbGwobm9kZSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvL+aUtuWJsueJueaViFxyXG4gICAgY3JlYXRlX2xpZ2h0X2VmZmVjdChjcmVhdGVfbm9kZSwgaW5kZXgsIHBsYW50X2luZGV4KSB7XHJcbiAgICAgICAgLy/lnKjlk6rkuKroioLngrnov5vooYzliJvlu7rvvIzliJvlu7rnmoTnrKzlh6DkuKog56eN5a2Q57yW5Y+3XHJcbiAgICAgICAgdmFyIHNlbGwgPSBjYy5maW5kKFwiVUlfUk9PVC9jZW50ZXIvYnVpbGQvc2VsbFwiKTtcclxuICAgICAgICAvL+WwhuWIm+W7uueahOWIneWni+WcsOWdgCDovazmjaLkuLrkuJbnlYzlnZDmoIdcclxuICAgICAgICB2YXIgY19XcG9zID0gY3JlYXRlX25vZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjcmVhdGVfbm9kZS5wb3NpdGlvbik7XHJcbiAgICAgICAgLy/ovazmjaLkuLrpnIDopoHnmoTnm7jlr7nlnZDmoIdcclxuICAgICAgICB2YXIgY19uUG9zID0gdGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKGNfV3Bvcyk7XHJcblxyXG4gICAgICAgIC8v5bCG6aOe5b6A55qE55uu5qCH5L2N572u6L2s5Li65LiW55WM5Z2Q5qCHXHJcbiAgICAgICAgdmFyIHRfV3BvcyA9IHNlbGwucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihzZWxsLnBvc2l0aW9uKTtcclxuICAgICAgICAvL+Wwhuebruagh+S9jee9rui9rOS4uuebuOWvueS9jee9rlxyXG4gICAgICAgIHZhciB0X05wb3MgPSB0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIodF9XcG9zKVxyXG5cclxuICAgICAgICBpZiAodGhpcy5uZXdfbGlnaHRfZWZmZWN0X3Bvb2wuc2l6ZSgpID4gMCkge1xyXG4gICAgICAgICAgICB2YXIgbm9kZSA9IHRoaXMubmV3X2xpZ2h0X2VmZmVjdF9wb29sLmdldCgpO1xyXG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMubm9kZTtcclxuICAgICAgICAgICAgbm9kZS5wb3NpdGlvbiA9IGNfblBvcztcclxuICAgICAgICAgICAgY2MudHdlZW4obm9kZSlcclxuICAgICAgICAgICAgICAgIC5kZWxheSgxKVxyXG4gICAgICAgICAgICAgICAgLnRvKChpbmRleCArIDEpIC8gNSwgeyBwb3NpdGlvbjogdF9OcG9zIH0sIHsgZWFzaW5nOiBcInNpbmVJblwiIH0pXHJcbiAgICAgICAgICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYWRkX2V4XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhbGxfY2FwYWNpdHkgPSB1c2VyX2RhdGEudXNlcl9kYXRhLndhcmVIb3VzZV9sZXZlbCAqIGNvbmZpZy53YXJlSG91c2VbXCJhbGxfY2FwYWNpdHlcIl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTU7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEud2FyZUhvdXNlW2ldLmhhdmUgPT0gMCkgYnJlYWs7ICAgICAgLy8gbuG6v3UgY2jGsGEgbeG7nyDDtCB0aMOsIGThu6tuZywgayBj4buZbmcgdGjDqm0gbuG7r2EsIMSRw6MgdHLDoG4ga2hvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLndhcmVIb3VzZVtpXS5jb3VudCA9PSAwKSB7ICAgICAgICAgIC8vIG7hur91IGzDoCDDtCB0cuG7kW5nIHRow6wgdGjDqm0gdsOgb1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEud2FyZUhvdXNlW2ldLmNvdW50ID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLndhcmVIb3VzZVtpXS5pZF9wcm9kdWN0ID0gcGxhbnRfaW5kZXg7ICAvLyBnw6FuIGlkIGPDonkgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHVzZXJfZGF0YS51c2VyX2RhdGEud2FyZUhvdXNlW2ldLmNvdW50IDwzMCAmJiB1c2VyX2RhdGEudXNlcl9kYXRhLndhcmVIb3VzZVtpXS5pZF9wcm9kdWN0PT0gcGxhbnRfaW5kZXgpIC8vIGtp4buDbSB0cmEga2hvIGPDuW5nIGxv4bqhaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEud2FyZUhvdXNlW2ldLmNvdW50Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVzZXJfZGF0YS51c2VyX2RhdGEud2FyZUhvdXNlW3BsYW50X2luZGV4XS5jb3VudCsrOyAvLyB0aMOqbSB24bqtdCBwaOG6qW0gdsOgbyBraG9cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuZ2FtZV9ydWxlc19qcy5qZ2coMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbl9ub2RlX2tpbGwobm9kZSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH0sXHJcblxyXG4gICAgY3JlYXRlX2dvbGRfZWZmZWN0KGNyZWF0ZV9ub2RlLCBpbmRleCwgYWRkR29sZCkge1xyXG4gICAgICAgIC8vY3JlYXRlIG5vZGUg5Zyo5ZOq5Liq6IqC54K56aOe77yMIGluZGV4IOaVsOmHjyAsbnVt5aKe5Yqg55qE6YeR5biB5pWw6YePXHJcbiAgICAgICAgdmFyIGdvbGRfaWNvbiA9IGNjLmZpbmQoXCJVSV9ST09UL3RvcC9nb2xkL2dvbGRfaWNvblwiKTtcclxuICAgICAgICAvL+WwhuWIm+W7uueahOWIneWni+WcsOWdgCDovazmjaLkuLrkuJbnlYzlnZDmoIdcclxuICAgICAgICB2YXIgY19XcG9zID0gY3JlYXRlX25vZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjcmVhdGVfbm9kZS5wb3NpdGlvbik7XHJcbiAgICAgICAgLy/ovazmjaLkuLrpnIDopoHnmoTnm7jlr7nlnZDmoIdcclxuICAgICAgICB2YXIgY19uUG9zID0gdGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKGNfV3Bvcyk7XHJcblxyXG4gICAgICAgIC8v5bCG6aOe5b6A55qE55uu5qCH5L2N572u6L2s5Li65LiW55WM5Z2Q5qCHXHJcbiAgICAgICAgdmFyIHRfV3BvcyA9IGdvbGRfaWNvbi5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKGdvbGRfaWNvbi5wb3NpdGlvbik7XHJcbiAgICAgICAgLy/lsIbnm67moIfkvY3nva7ovazkuLrnm7jlr7nkvY3nva5cclxuICAgICAgICB2YXIgdF9OcG9zID0gdGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHRfV3BvcylcclxuXHJcbiAgICAgICAgaWYgKHRoaXMubmV3X2dvbGRfZWZmZWN0X3Bvb2wuc2l6ZSgpID4gMCkge1xyXG4gICAgICAgICAgICB2YXIgbm9kZSA9IHRoaXMubmV3X2dvbGRfZWZmZWN0X3Bvb2wuZ2V0KCk7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgICAgICBub2RlLnBvc2l0aW9uID0gY19uUG9zO1xyXG4gICAgICAgICAgICBub2RlLnkgKz0gNTA7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKG5vZGUpXHJcbiAgICAgICAgICAgICAgICAudG8oKGluZGV4ICsgMSkgLyA1LCB7IHBvc2l0aW9uOiB0X05wb3MgfSwgeyBlYXNpbmc6IFwic2luZUluXCIgfSlcclxuICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJhZGRfZ29sZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMuYWRkX2dvbGQoYWRkR29sZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbl9ub2RlX2tpbGwobm9kZSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICB9LFxyXG4gICAgLy/oioLngrnplIDmr4FcclxuICAgIG9uX25vZGVfa2lsbDogZnVuY3Rpb24gKG5vZGUpIHtcclxuICAgICAgICBzd2l0Y2ggKG5vZGUubmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiYnV0dG9uX21vcmVcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uX21vcmVfbm9kZV9wb29sLnB1dChub2RlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwicGxhbnRfdWlcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMubmV3X3BsYW50X3VpX25vZGVfcG9vbC5wdXQobm9kZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInNlbGxfdWlcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMubmV3X3NlbGxfdWlfbm9kZV9wb29sLnB1dChub2RlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwidGlwc191aVwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5uZXdfdGlwc191aV9ub2RlX3Bvb2wucHV0KG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJsaWdodFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5uZXdfbGlnaHRfZWZmZWN0X3Bvb2wucHV0KG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJzdHVkeV91aVwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5uZXdfc3R1ZHlfdWlfcG9vbC5wdXQobm9kZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInN0YWZmX3VpXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5ld19zdGFmZl91aV9wb29sLnB1dChub2RlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwicGV0X3VpXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5ld19wZXRfdWlfcG9vbC5wdXQobm9kZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImV4X2VmZmVjdFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5uZXdfZXhfZWZmZWN0X3Bvb2wucHV0KG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJnb2xkX2VmZmVjdFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5uZXdfZ29sZF9lZmZlY3RfcG9vbC5wdXQobm9kZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIm9wdGlvbl91aVwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5uZXdfb3B0aW9uX3VpX3Bvb2wucHV0KG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJob3RlbF91aVwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5uZXdfaG90ZWxfdWlfcG9vbC5wdXQobm9kZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInNob3BfYnV5X3VpXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5ld19zaG9wX2J1eV91aV9wb29sLnB1dChub2RlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwic2hvcF91aVwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5uZXdfc2hvcF91aV9wb29sLnB1dChub2RlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwidmlkZW90YXBlX3VpXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5ld192aWRlb3RhcGVfdWlfcG9vbC5wdXQobm9kZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuXHJcbiAgICAvL+WIneWni+WMluiKgueCuVxyXG4gICAgaW5pX25vZGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLm5ld19idXR0b25fZ3JvdXBfbm9kZV9wb29sKCk7XHJcbiAgICAgICAgdGhpcy5uZXdfcGxhbnRfdWlfbm9kZV9wb29sKCk7XHJcbiAgICAgICAgdGhpcy5uZXdfc2VsbF91aV9ub2RlX3Bvb2woKTtcclxuICAgICAgICB0aGlzLm5ld190aXBzX3VpX25vZGVfcG9vbCgpO1xyXG4gICAgICAgIHRoaXMubmV3X2xpZ2h0X2VmZmVjdF9wb29sKCk7XHJcbiAgICAgICAgdGhpcy5uZXdfc3R1ZHlfdWlfcG9vbCgpO1xyXG4gICAgICAgIHRoaXMubmV3X3N0YWZmX3VpX3Bvb2woKTtcclxuICAgICAgICB0aGlzLm5ld19wZXRfdWlfcG9vbCgpO1xyXG4gICAgICAgIHRoaXMubmV3X2V4X2VmZmVjdF9wb29sKCk7XHJcbiAgICAgICAgdGhpcy5uZXdfb3B0aW9uX3VpX3Bvb2woKTtcclxuICAgICAgICB0aGlzLm5ld19nb2xkX2VmZmVjdF9wb29sKCk7XHJcbiAgICAgICAgdGhpcy5uZXdfaG90ZWxfdWlfcG9vbCgpO1xyXG4gICAgICAgIHRoaXMubmV3X3Nob3BfYnV5X3VpX3Bvb2woKTtcclxuICAgICAgICB0aGlzLm5ld19zaG9wX3VpX3Bvb2woKTtcclxuICAgICAgICB0aGlzLm5ld192aWRlb3RhcGVfdWlfcG9vbCgpO1xyXG5cclxuICAgIH0sXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9ydWxlc1wiKTtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wgPSBjYy5maW5kKFwic291bmRfY29udHJvbFwiKS5nZXRDb21wb25lbnQoXCJzb3VuZF9jb250cm9sXCIpO1xyXG4gICAgICAgIHRoaXMuaW5pX25vZGUoKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcclxufSk7XHJcbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/config/videotape.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2983a+AxmZFuJqZEOMBqVE/', 'videotape');
// script/config/videotape.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {},
  // LIFE-CYCLE CALLBACKS:
  // onLoad () {},
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxjb25maWdcXHZpZGVvdGFwZS5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInN0YXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUUsRUFIUDtBQU9MO0FBRUE7QUFFQUMsRUFBQUEsS0FYSyxtQkFXSSxDQUVSLENBYkksQ0FlTDs7QUFmSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgLy8gb25Mb2FkICgpIHt9LFxyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxyXG59KTtcclxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/config/config.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3cc9d7Es5xFNpKW7/q614wf', 'config');
// script/config/config.js

"use strict";

module.exports = {
  ad_state: 1,
  //广告开关
  all_water_num: 50,
  till_time: 5,
  wareHouse: {
    all_capacity: 30
  },
  videotape_share_max: 5,
  staff: {
    0: {
      name: "Alice",
      introduce: "Dream of owning \nyour own farm, \nbelieve it or not",
      work_time: 120,
      rest_time: 220,
      cost: 30
    },
    1: {
      name: "Norman",
      introduce: "It's impossible to \nwork part-time, it's impossible to work \npart-time in this life",
      work_time: 125,
      rest_time: 225,
      cost: 60
    },
    2: {
      name: "Peter",
      introduce: "I'm creater of this\ngame",
      work_time: 130,
      rest_time: 230,
      cost: 600
    },
    3: {
      name: "Samatha",
      introduce: "Supper cute",
      work_time: 135,
      rest_time: 235,
      cost: 2400
    },
    4: {
      name: "Richad",
      introduce: "A simp lord :))",
      work_time: 140,
      rest_time: 240,
      cost: 12000
    },
    5: {
      name: "Owen",
      introduce: "Why can't i meet my grandma",
      work_time: 145,
      rest_time: 245,
      cost: 24000
    }
  },
  plant: {
    0: {
      name: "Potato",
      introduce: "Rich in dietary fiber",
      cost: 0,
      grow_time: 20,
      cut_time: 5,
      plant_time: 5,
      sell: 10,
      need_level: 1,
      exp: 1
    },
    1: {
      name: "Cabbage",
      introduce: "Enhance the body's anti-cancer ability",
      cost: 300,
      grow_time: 30,
      cut_time: 7,
      plant_time: 10,
      sell: 15,
      need_level: 5,
      exp: 1
    },
    2: {
      name: "Turnip",
      introduce: "Thousands of years of cultivation history",
      cost: 500,
      grow_time: 40,
      cut_time: 9,
      plant_time: 15,
      sell: 20,
      need_level: 10,
      exp: 2
    },
    3: {
      name: "Tomato",
      introduce: "The fruit is rich in nutrients",
      cost: 1000,
      grow_time: 50,
      cut_time: 11,
      plant_time: 20,
      sell: 25,
      need_level: 15,
      exp: 2
    },
    4: {
      name: "Cucumber",
      introduce: "Good for health",
      cost: 3000,
      grow_time: 60,
      cut_time: 13,
      plant_time: 25,
      sell: 30,
      need_level: 20,
      exp: 3
    },
    5: {
      name: "Strawberry",
      introduce: "Rich in nutritional value",
      cost: 5000,
      grow_time: 70,
      cut_time: 15,
      plant_time: 30,
      sell: 35,
      need_level: 25,
      exp: 3
    },
    6: {
      name: "Broccoli",
      introduce: "Known as the \"vegetable crown\"",
      cost: 10000,
      grow_time: 80,
      cut_time: 17,
      plant_time: 30,
      sell: 45,
      need_level: 35,
      exp: 4
    },
    7: {
      name: "Corn",
      introduce: "The most productive crop in the world",
      cost: 20000,
      grow_time: 90,
      cut_time: 20,
      plant_time: 30,
      sell: 60,
      need_level: 45,
      exp: 4
    }
  },
  land: {
    0: {
      name: "Land No.1",
      cost: 0,
      need_level: 1
    },
    1: {
      name: "Land No.2",
      cost: 50,
      need_level: 3
    },
    2: {
      name: "Land No.3",
      cost: 500,
      need_level: 15
    },
    3: {
      name: "Land No.4",
      cost: 2500,
      need_level: 25
    },
    4: {
      name: "Land No.5",
      cost: 10000,
      need_level: 35
    },
    5: {
      name: "Land No.6",
      cost: 30000,
      need_level: 50
    }
  },
  //商人
  trader: {
    cooker: {
      recipes: 0,
      need_level: 1
    }
  },
  pet: {
    0: {
      name: "Dog",
      introduce: "A cute dog",
      skill_introduce: "Every 60 seconds, give the player 3 exp",
      need_ad: 5,
      produce_ex: 3,
      produce_ex_time: 60,
      cost: 500,
      type_buy: "gold",
      stay_time: 300,
      get_type: "ad"
    },
    1: {
      name: "Gray cat",
      introduce: "A cute dog",
      skill_introduce: "Every 80 seconds, give the player 5 exp",
      need_ad: 10,
      produce_ex: 5,
      produce_ex_time: 80,
      cost: 700,
      type_buy: "gold",
      stay_time: 300,
      get_type: "ad"
    },
    2: {
      name: "Yellow dog",
      introduce: "Little Eight's brother will stay for 300s",
      skill_introduce: "Every 60 seconds, give the player 3 exp",
      need_ad: 1,
      produce_ex: 5,
      produce_ex_time: 80,
      get_type: "share",
      cost: 500,
      type_buy: "gold",
      stay_time: 300,
      share_max: 3
    },
    3: {
      name: "Yellow cat",
      introduce: "The white rabbit will only stay for 400s",
      skill_introduce: "Every 80 seconds, give the player 5 exp",
      need_ad: 1,
      produce_ex: 5,
      produce_ex_time: 80,
      get_type: "share",
      cost: 700,
      type_buy: "gold",
      stay_time: 400,
      share_max: 3
    }
  },
  hotel: {
    0: {
      need_level: 5,
      produce: 3,
      produce_time: 30,
      cost: 200
    },
    1: {
      need_level: 10,
      produce: 5,
      produce_time: 60,
      cost: 1000
    },
    2: {
      need_level: 15,
      produce: 10,
      produce_time: 80,
      cost: 5000
    },
    3: {
      need_level: 25,
      produce: 15,
      produce_time: 120,
      cost: 20000
    }
  }
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxjb25maWdcXGNvbmZpZy5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwiYWRfc3RhdGUiLCJhbGxfd2F0ZXJfbnVtIiwidGlsbF90aW1lIiwid2FyZUhvdXNlIiwiYWxsX2NhcGFjaXR5IiwidmlkZW90YXBlX3NoYXJlX21heCIsInN0YWZmIiwibmFtZSIsImludHJvZHVjZSIsIndvcmtfdGltZSIsInJlc3RfdGltZSIsImNvc3QiLCJwbGFudCIsImdyb3dfdGltZSIsImN1dF90aW1lIiwicGxhbnRfdGltZSIsInNlbGwiLCJuZWVkX2xldmVsIiwiZXhwIiwibGFuZCIsInRyYWRlciIsImNvb2tlciIsInJlY2lwZXMiLCJwZXQiLCJza2lsbF9pbnRyb2R1Y2UiLCJuZWVkX2FkIiwicHJvZHVjZV9leCIsInByb2R1Y2VfZXhfdGltZSIsInR5cGVfYnV5Iiwic3RheV90aW1lIiwiZ2V0X3R5cGUiLCJzaGFyZV9tYXgiLCJob3RlbCIsInByb2R1Y2UiLCJwcm9kdWNlX3RpbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjtBQUNiQyxFQUFBQSxRQUFRLEVBQUUsQ0FERztBQUNHO0FBQ2hCQyxFQUFBQSxhQUFhLEVBQUUsRUFGRjtBQUdiQyxFQUFBQSxTQUFTLEVBQUUsQ0FIRTtBQUliQyxFQUFBQSxTQUFTLEVBQUU7QUFDUEMsSUFBQUEsWUFBWSxFQUFFO0FBRFAsR0FKRTtBQU9iQyxFQUFBQSxtQkFBbUIsRUFBRSxDQVBSO0FBUWJDLEVBQUFBLEtBQUssRUFBRTtBQUNILE9BQUc7QUFDQ0MsTUFBQUEsSUFBSSxFQUFFLE9BRFA7QUFFQ0MsTUFBQUEsU0FBUyxFQUFFLHNEQUZaO0FBR0NDLE1BQUFBLFNBQVMsRUFBRSxHQUhaO0FBSUNDLE1BQUFBLFNBQVMsRUFBRSxHQUpaO0FBS0NDLE1BQUFBLElBQUksRUFBRTtBQUxQLEtBREE7QUFRSCxPQUFHO0FBQ0NK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LCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIGFkX3N0YXRlOiAxLCAgICAvL+W5v+WRiuW8gOWFs1xyXG4gICAgYWxsX3dhdGVyX251bTogNTAsXHJcbiAgICB0aWxsX3RpbWU6IDUsXHJcbiAgICB3YXJlSG91c2U6IHtcclxuICAgICAgICBhbGxfY2FwYWNpdHk6IDMwLFxyXG4gICAgfSxcclxuICAgIHZpZGVvdGFwZV9zaGFyZV9tYXg6IDUsXHJcbiAgICBzdGFmZjoge1xyXG4gICAgICAgIDA6IHtcclxuICAgICAgICAgICAgbmFtZTogXCJBbGljZVwiLFxyXG4gICAgICAgICAgICBpbnRyb2R1Y2U6IFwiRHJlYW0gb2Ygb3duaW5nIFxcbnlvdXIgb3duIGZhcm0sIFxcbmJlbGlldmUgaXQgb3Igbm90XCIsXHJcbiAgICAgICAgICAgIHdvcmtfdGltZTogMTIwLFxyXG4gICAgICAgICAgICByZXN0X3RpbWU6IDIyMCxcclxuICAgICAgICAgICAgY29zdDogMzAsXHJcbiAgICAgICAgfSxcclxuICAgICAgICAxOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiTm9ybWFuXCIsXHJcbiAgICAgICAgICAgIGludHJvZHVjZTogXCJJdCdzIGltcG9zc2libGUgdG8gXFxud29yayBwYXJ0LXRpbWUsIGl0J3MgaW1wb3NzaWJsZSB0byB3b3JrIFxcbnBhcnQtdGltZSBpbiB0aGlzIGxpZmVcIixcclxuICAgICAgICAgICAgd29ya190aW1lOiAxMjUsXHJcbiAgICAgICAgICAgIHJlc3RfdGltZTogMjI1LFxyXG4gICAgICAgICAgICBjb3N0OiA2MCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIDI6IHtcclxuICAgICAgICAgICAgbmFtZTogXCJQZXRlclwiLFxyXG4gICAgICAgICAgICBpbnRyb2R1Y2U6IFwiSSdtIGNyZWF0ZXIgb2YgdGhpc1xcbmdhbWVcIixcclxuICAgICAgICAgICAgd29ya190aW1lOiAxMzAsXHJcbiAgICAgICAgICAgIHJlc3RfdGltZTogMjMwLFxyXG4gICAgICAgICAgICBjb3N0OiA2MDAsXHJcbiAgICAgICAgfSxcclxuICAgICAgICAzOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiU2FtYXRoYVwiLFxyXG4gICAgICAgICAgICBpbnRyb2R1Y2U6IFwiU3VwcGVyIGN1dGVcIixcclxuICAgICAgICAgICAgd29ya190aW1lOiAxMzUsXHJcbiAgICAgICAgICAgIHJlc3RfdGltZTogMjM1LFxyXG4gICAgICAgICAgICBjb3N0OiAyNDAwLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgNDoge1xyXG4gICAgICAgICAgICBuYW1lOiBcIlJpY2hhZFwiLFxyXG4gICAgICAgICAgICBpbnRyb2R1Y2U6IFwiQSBzaW1wIGxvcmQgOikpXCIsXHJcbiAgICAgICAgICAgIHdvcmtfdGltZTogMTQwLFxyXG4gICAgICAgICAgICByZXN0X3RpbWU6IDI0MCxcclxuICAgICAgICAgICAgY29zdDogMTIwMDAsXHJcbiAgICAgICAgfSxcclxuICAgICAgICA1OiB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiT3dlblwiLFxyXG4gICAgICAgICAgICBpbnRyb2R1Y2U6IFwiV2h5IGNhbid0IGkgbWVldCBteSBncmFuZG1hXCIsXHJcbiAgICAgICAgICAgIHdvcmtfdGltZTogMTQ1LFxyXG4gICAgICAgICAgICByZXN0X3RpbWU6IDI0NSxcclxuICAgICAgICAgICAgY29zdDogMjQwMDAsXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBwbGFudDoge1xyXG4gICAgICAgIDA6IHtcclxuICAgICAgICAgICAgbmFtZTogXCJQb3RhdG9cIixcclxuICAgICAgICAgICAgaW50cm9kdWNlOiBcIlJpY2ggaW4gZGlldGFyeSBmaWJlclwiLFxyXG4gICAgICAgICAgICBjb3N0OiAwLFxyXG4gICAgICAgICAgICBncm93X3RpbWU6IDIwLFxyXG4gICAgICAgICAgICBjdXRfdGltZTogNSxcclxuICAgICAgICAgICAgcGxhbnRfdGltZTogNSxcclxuICAgICAgICAgICAgc2VsbDogMTAsXHJcbiAgICAgICAgICAgIG5lZWRfbGV2ZWw6IDEsXHJcbiAgICAgICAgICAgIGV4cDogMSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIDE6IHtcclxuICAgICAgICAgICAgbmFtZTogXCJDYWJiYWdlXCIsXHJcbiAgICAgICAgICAgIGludHJvZHVjZTogXCJFbmhhbmNlIHRoZSBib2R5J3MgYW50aS1jYW5jZXIgYWJpbGl0eVwiLFxyXG4gICAgICAgICAgICBjb3N0OiAzMDAsXHJcbiAgICAgICAgICAgIGdyb3dfdGltZTogMzAsXHJcbiAgICAgICAgICAgIGN1dF90aW1lOiA3LFxyXG4gICAgICAgICAgICBwbGFudF90aW1lOiAxMCxcclxuICAgICAgICAgICAgc2VsbDogMTUsXHJcbiAgICAgICAgICAgIG5lZWRfbGV2ZWw6IDUsXHJcbiAgICAgICAgICAgIGV4cDogMSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIDI6IHtcclxuICAgICAgICAgICAgbmFtZTogXCJUdXJuaXBcIixcclxuICAgICAgICAgICAgaW50cm9kdWNlOiBcIlRob3VzYW5kcyBvZiB5ZWFycyBvZiBjdWx0aXZhdGlvbiBoaXN0b3J5XCIsXHJcbiAgICAgICAgICAgIGNvc3Q6IDUwMCxcclxuICAgICAgICAgICAgZ3Jvd190aW1lOiA0MCxcclxuICAgICAgICAgICAgY3V0X3RpbWU6IDksXHJcbiAgICAgICAgICAgIHBsYW50X3RpbWU6IDE1LFxyXG4gICAgICAgICAgICBzZWxsOiAyMCxcclxuICAgICAgICAgICAgbmVlZF9sZXZlbDogMTAsXHJcbiAgICAgICAgICAgIGV4cDogMixcclxuICAgICAgICB9LFxyXG4gICAgICAgIDM6IHtcclxuICAgICAgICAgICAgbmFtZTogXCJUb21hdG9cIixcclxuICAgICAgICAgICAgaW50cm9kdWNlOiBcIlRoZSBmcnVpdCBpcyByaWNoIGluIG51dHJpZW50c1wiLFxyXG4gICAgICAgICAgICBjb3N0OiAxMDAwLFxyXG4gICAgICAgICAgICBncm93X3RpbWU6IDUwLFxyXG4gICAgICAgICAgICBjdXRfdGltZTogMTEsXHJcbiAgICAgICAgICAgIHBsYW50X3RpbWU6IDIwLFxyXG4gICAgICAgICAgICBzZWxsOiAyNSxcclxuICAgICAgICAgICAgbmVlZF9sZXZlbDogMTUsXHJcbiAgICAgICAgICAgIGV4cDogMixcclxuICAgICAgICB9LFxyXG4gICAgICAgIDQ6IHtcclxuICAgICAgICAgICAgbmFtZTogXCJDdWN1bWJlclwiLFxyXG4gICAgICAgICAgICBpbnRyb2R1Y2U6IFwiR29vZCBmb3IgaGVhbHRoXCIsXHJcbiAgICAgICAgICAgIGNvc3Q6IDMwMDAsXHJcbiAgICAgICAgICAgIGdyb3dfdGltZTogNjAsXHJcbiAgICAgICAgICAgIGN1dF90aW1lOiAxMyxcclxuICAgICAgICAgICAgcGxhbnRfdGltZTogMjUsXHJcbiAgICAgICAgICAgIHNlbGw6IDMwLFxyXG4gICAgICAgICAgICBuZWVkX2xldmVsOiAyMCxcclxuICAgICAgICAgICAgZXhwOiAzLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgNToge1xyXG4gICAgICAgICAgICBuYW1lOiBcIlN0cmF3YmVycnlcIixcclxuICAgICAgICAgICAgaW50cm9kdWNlOiBcIlJpY2ggaW4gbnV0cml0aW9uYWwgdmFsdWVcIixcclxuICAgICAgICAgICAgY29zdDogNTAwMCxcclxuICAgICAgICAgICAgZ3Jvd190aW1lOiA3MCxcclxuICAgICAgICAgICAgY3V0X3RpbWU6IDE1LFxyXG4gICAgICAgICAgICBwbGFudF90aW1lOiAzMCxcclxuICAgICAgICAgICAgc2VsbDogMzUsXHJcbiAgICAgICAgICAgIG5lZWRfbGV2ZWw6IDI1LFxyXG4gICAgICAgICAgICBleHA6IDMsXHJcbiAgICAgICAgfSxcclxuICAgICAgICA2OiB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiQnJvY2NvbGlcIixcclxuICAgICAgICAgICAgaW50cm9kdWNlOiBcIktub3duIGFzIHRoZSBcXFwidmVnZXRhYmxlIGNyb3duXFxcIlwiLFxyXG4gICAgICAgICAgICBjb3N0OiAxMDAwMCxcclxuICAgICAgICAgICAgZ3Jvd190aW1lOiA4MCxcclxuICAgICAgICAgICAgY3V0X3RpbWU6IDE3LFxyXG4gICAgICAgICAgICBwbGFudF90aW1lOiAzMCxcclxuICAgICAgICAgICAgc2VsbDogNDUsXHJcbiAgICAgICAgICAgIG5lZWRfbGV2ZWw6IDM1LFxyXG4gICAgICAgICAgICBleHA6IDRcclxuICAgICAgICB9LFxyXG4gICAgICAgIDc6IHtcclxuICAgICAgICAgICAgbmFtZTogXCJDb3JuXCIsXHJcbiAgICAgICAgICAgIGludHJvZHVjZTogXCJUaGUgbW9zdCBwcm9kdWN0aXZlIGNyb3AgaW4gdGhlIHdvcmxkXCIsXHJcbiAgICAgICAgICAgIGNvc3Q6IDIwMDAwLFxyXG4gICAgICAgICAgICBncm93X3RpbWU6IDkwLFxyXG4gICAgICAgICAgICBjdXRfdGltZTogMjAsXHJcbiAgICAgICAgICAgIHBsYW50X3RpbWU6IDMwLFxyXG4gICAgICAgICAgICBzZWxsOiA2MCxcclxuICAgICAgICAgICAgbmVlZF9sZXZlbDogNDUsXHJcbiAgICAgICAgICAgIGV4cDogNCxcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgIGxhbmQ6IHtcclxuICAgICAgICAwOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiTGFuZCBOby4xXCIsXHJcbiAgICAgICAgICAgIGNvc3Q6IDAsXHJcbiAgICAgICAgICAgIG5lZWRfbGV2ZWw6IDEsXHJcbiAgICAgICAgfSxcclxuICAgICAgICAxOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiTGFuZCBOby4yXCIsXHJcbiAgICAgICAgICAgIGNvc3Q6IDUwLFxyXG4gICAgICAgICAgICBuZWVkX2xldmVsOiAzLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgMjoge1xyXG4gICAgICAgICAgICBuYW1lOiBcIkxhbmQgTm8uM1wiLFxyXG4gICAgICAgICAgICBjb3N0OiA1MDAsXHJcbiAgICAgICAgICAgIG5lZWRfbGV2ZWw6IDE1LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgMzoge1xyXG4gICAgICAgICAgICBuYW1lOiBcIkxhbmQgTm8uNFwiLFxyXG4gICAgICAgICAgICBjb3N0OiAyNTAwLFxyXG4gICAgICAgICAgICBuZWVkX2xldmVsOiAyNSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIDQ6IHtcclxuICAgICAgICAgICAgbmFtZTogXCJMYW5kIE5vLjVcIixcclxuICAgICAgICAgICAgY29zdDogMTAwMDAsXHJcbiAgICAgICAgICAgIG5lZWRfbGV2ZWw6IDM1LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgNToge1xyXG4gICAgICAgICAgICBuYW1lOiBcIkxhbmQgTm8uNlwiLFxyXG4gICAgICAgICAgICBjb3N0OiAzMDAwMCxcclxuICAgICAgICAgICAgbmVlZF9sZXZlbDogNTAsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICB9LFxyXG4gICAgLy/llYbkurpcclxuICAgIHRyYWRlcjoge1xyXG4gICAgICAgIGNvb2tlcjoge1xyXG4gICAgICAgICAgICByZWNpcGVzOiAwLFxyXG4gICAgICAgICAgICBuZWVkX2xldmVsOiAxLFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgcGV0OiB7XHJcbiAgICAgICAgMDoge1xyXG4gICAgICAgICAgICBuYW1lOiBcIkRvZ1wiLFxyXG4gICAgICAgICAgICBpbnRyb2R1Y2U6IFwiQSBjdXRlIGRvZ1wiLFxyXG4gICAgICAgICAgICBza2lsbF9pbnRyb2R1Y2U6IFwiRXZlcnkgNjAgc2Vjb25kcywgZ2l2ZSB0aGUgcGxheWVyIDMgZXhwXCIsXHJcbiAgICAgICAgICAgIG5lZWRfYWQ6IDUsXHJcbiAgICAgICAgICAgIHByb2R1Y2VfZXg6IDMsXHJcbiAgICAgICAgICAgIHByb2R1Y2VfZXhfdGltZTogNjAsXHJcbiAgICAgICAgICAgIGNvc3Q6IDUwMCxcclxuICAgICAgICAgICAgdHlwZV9idXk6IFwiZ29sZFwiLFxyXG4gICAgICAgICAgICBzdGF5X3RpbWU6IDMwMCxcclxuICAgICAgICAgICAgZ2V0X3R5cGU6IFwiYWRcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIDE6IHtcclxuICAgICAgICAgICAgbmFtZTogXCJHcmF5IGNhdFwiLFxyXG4gICAgICAgICAgICBpbnRyb2R1Y2U6IFwiQSBjdXRlIGRvZ1wiLFxyXG4gICAgICAgICAgICBza2lsbF9pbnRyb2R1Y2U6IFwiRXZlcnkgODAgc2Vjb25kcywgZ2l2ZSB0aGUgcGxheWVyIDUgZXhwXCIsXHJcbiAgICAgICAgICAgIG5lZWRfYWQ6IDEwLFxyXG4gICAgICAgICAgICBwcm9kdWNlX2V4OiA1LFxyXG4gICAgICAgICAgICBwcm9kdWNlX2V4X3RpbWU6IDgwLFxyXG4gICAgICAgICAgICBjb3N0OiA3MDAsXHJcbiAgICAgICAgICAgIHR5cGVfYnV5OiBcImdvbGRcIixcclxuICAgICAgICAgICAgc3RheV90aW1lOiAzMDAsXHJcbiAgICAgICAgICAgIGdldF90eXBlOiBcImFkXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICAyOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiWWVsbG93IGRvZ1wiLFxyXG4gICAgICAgICAgICBpbnRyb2R1Y2U6IFwiTGl0dGxlIEVpZ2h0J3MgYnJvdGhlciB3aWxsIHN0YXkgZm9yIDMwMHNcIixcclxuICAgICAgICAgICAgc2tpbGxfaW50cm9kdWNlOiBcIkV2ZXJ5IDYwIHNlY29uZHMsIGdpdmUgdGhlIHBsYXllciAzIGV4cFwiLFxyXG4gICAgICAgICAgICBuZWVkX2FkOiAxLFxyXG4gICAgICAgICAgICBwcm9kdWNlX2V4OiA1LFxyXG4gICAgICAgICAgICBwcm9kdWNlX2V4X3RpbWU6IDgwLFxyXG4gICAgICAgICAgICBnZXRfdHlwZTogXCJzaGFyZVwiLFxyXG4gICAgICAgICAgICBjb3N0OiA1MDAsXHJcbiAgICAgICAgICAgIHR5cGVfYnV5OiBcImdvbGRcIixcclxuICAgICAgICAgICAgc3RheV90aW1lOiAzMDAsXHJcbiAgICAgICAgICAgIHNoYXJlX21heDogMyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIDM6IHtcclxuICAgICAgICAgICAgbmFtZTogXCJZZWxsb3cgY2F0XCIsXHJcbiAgICAgICAgICAgIGludHJvZHVjZTogXCJUaGUgd2hpdGUgcmFiYml0IHdpbGwgb25seSBzdGF5IGZvciA0MDBzXCIsXHJcbiAgICAgICAgICAgIHNraWxsX2ludHJvZHVjZTogXCJFdmVyeSA4MCBzZWNvbmRzLCBnaXZlIHRoZSBwbGF5ZXIgNSBleHBcIixcclxuICAgICAgICAgICAgbmVlZF9hZDogMSxcclxuICAgICAgICAgICAgcHJvZHVjZV9leDogNSxcclxuICAgICAgICAgICAgcHJvZHVjZV9leF90aW1lOiA4MCxcclxuICAgICAgICAgICAgZ2V0X3R5cGU6IFwic2hhcmVcIixcclxuICAgICAgICAgICAgY29zdDogNzAwLFxyXG4gICAgICAgICAgICB0eXBlX2J1eTogXCJnb2xkXCIsXHJcbiAgICAgICAgICAgIHN0YXlfdGltZTogNDAwLFxyXG4gICAgICAgICAgICBzaGFyZV9tYXg6IDMsXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBob3RlbDoge1xyXG4gICAgICAgIDA6IHtcclxuICAgICAgICAgICAgbmVlZF9sZXZlbDogNSxcclxuICAgICAgICAgICAgcHJvZHVjZTogMyxcclxuICAgICAgICAgICAgcHJvZHVjZV90aW1lOiAzMCxcclxuICAgICAgICAgICAgY29zdDogMjAwLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgMToge1xyXG4gICAgICAgICAgICBuZWVkX2xldmVsOiAxMCxcclxuICAgICAgICAgICAgcHJvZHVjZTogNSxcclxuICAgICAgICAgICAgcHJvZHVjZV90aW1lOiA2MCxcclxuICAgICAgICAgICAgY29zdDogMTAwMCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIDI6IHtcclxuICAgICAgICAgICAgbmVlZF9sZXZlbDogMTUsXHJcbiAgICAgICAgICAgIHByb2R1Y2U6IDEwLFxyXG4gICAgICAgICAgICBwcm9kdWNlX3RpbWU6IDgwLFxyXG4gICAgICAgICAgICBjb3N0OiA1MDAwLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgMzoge1xyXG4gICAgICAgICAgICBuZWVkX2xldmVsOiAyNSxcclxuICAgICAgICAgICAgcHJvZHVjZTogMTUsXHJcbiAgICAgICAgICAgIHByb2R1Y2VfdGltZTogMTIwLFxyXG4gICAgICAgICAgICBjb3N0OiAyMDAwMCxcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxufTsiXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/effect/ad_car.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4ead8pbcC5NJqqgVJ9tWAwl', 'ad_car');
// script/effect/ad_car.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    ad_car_node: cc.Node
  },
  // LIFE-CYCLE CALLBACKS:
  ini_node: function ini_node(price_difference) {
    var _this = this;

    this.price_difference = price_difference;
    this.ad_control = cc.find("ad_control").getComponent("ad_control");
    this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
    this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
    ;
    this.node.x = 500;
    cc.tween(this.node).to(0.5, {
      x: 0
    }, {
      easing: "elasticOut"
    }).call(function () {
      _this.ad_car_node.on("touchstart", _this.create_ad, _this);
    }).start();
  },
  //拉起广告
  create_ad: function create_ad() {
    // this.node.destroy();
    this.ad_control.show_videoAd("ad_car");
    this.video_succes();
  },
  //检测视频是否播放成功
  video_succes: function video_succes() {
    if (typeof wx != "undefined") {
      var callback = function callback() {
        if (this.ad_control.video_state == 1 && this.ad_control.video_tag == "ad_car") {
          this.ad_control.video_tag = null;
          this.ad_control.video_state = 2;
          var node = this.game_scene_js.create_tips_ui(this.game_rules_js.node);

          if (node != null) {
            node.getComponent("tips_ui").ini_node("gold", this.price_difference);
            this.game_rules_js.add_gold(this.price_difference);
          }

          ;
          this.unschedule(callback);
          this.node.destroy();
        } else {
          if (this.ad_control.video_tag == null && this.ad_control.video_state == 2) {
            this.unschedule(callback);
          }

          ;
        }

        ;
      };

      this.schedule(callback, 0.2);
    }

    ;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxlZmZlY3RcXGFkX2Nhci5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImFkX2Nhcl9ub2RlIiwiTm9kZSIsImluaV9ub2RlIiwicHJpY2VfZGlmZmVyZW5jZSIsImFkX2NvbnRyb2wiLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwiZ2FtZV9zY2VuZV9qcyIsImdhbWVfcnVsZXNfanMiLCJub2RlIiwieCIsInR3ZWVuIiwidG8iLCJlYXNpbmciLCJjYWxsIiwib24iLCJjcmVhdGVfYWQiLCJzdGFydCIsInNob3dfdmlkZW9BZCIsInZpZGVvX3N1Y2NlcyIsInd4IiwiY2FsbGJhY2siLCJ2aWRlb19zdGF0ZSIsInZpZGVvX3RhZyIsImNyZWF0ZV90aXBzX3VpIiwiYWRkX2dvbGQiLCJ1bnNjaGVkdWxlIiwiZGVzdHJveSIsInNjaGVkdWxlIiwib25Mb2FkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsV0FBVyxFQUFFSixFQUFFLENBQUNLO0FBRFIsR0FIUDtBQU1MO0FBQ0FDLEVBQUFBLFFBUEssb0JBT0lDLGdCQVBKLEVBT3NCO0FBQUE7O0FBQ3ZCLFNBQUtBLGdCQUFMLEdBQXdCQSxnQkFBeEI7QUFDQSxTQUFLQyxVQUFMLEdBQWtCUixFQUFFLENBQUNTLElBQUgsQ0FBUSxZQUFSLEVBQXNCQyxZQUF0QixDQUFtQyxZQUFuQyxDQUFsQjtBQUNBLFNBQUtDLGFBQUwsR0FBcUJYLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLFNBQVIsRUFBbUJDLFlBQW5CLENBQWdDLFlBQWhDLENBQXJCO0FBQ0EsU0FBS0UsYUFBTCxHQUFvQlosRUFBRSxDQUFDUyxJQUFILENBQVEsU0FBUixFQUFtQkMsWUFBbkIsQ0FBZ0MsWUFBaEMsQ0FBcEI7QUFBa0U7QUFDbEUsU0FBS0csSUFBTCxDQUFVQyxDQUFWLEdBQWMsR0FBZDtBQUNBZCxJQUFBQSxFQUFFLENBQUNlLEtBQUgsQ0FBUyxLQUFLRixJQUFkLEVBQ0tHLEVBREwsQ0FDUSxHQURSLEVBQ2E7QUFBRUYsTUFBQUEsQ0FBQyxFQUFFO0FBQUwsS0FEYixFQUN1QjtBQUFFRyxNQUFBQSxNQUFNLEVBQUU7QUFBVixLQUR2QixFQUVLQyxJQUZMLENBRVUsWUFBTTtBQUNSLE1BQUEsS0FBSSxDQUFDZCxXQUFMLENBQWlCZSxFQUFqQixDQUFvQixZQUFwQixFQUFrQyxLQUFJLENBQUNDLFNBQXZDLEVBQWtELEtBQWxEO0FBQ0gsS0FKTCxFQUtLQyxLQUxMO0FBTUgsR0FuQkk7QUFvQkw7QUFDQUQsRUFBQUEsU0FyQkssdUJBcUJPO0FBQ1I7QUFDQSxTQUFLWixVQUFMLENBQWdCYyxZQUFoQixDQUE2QixRQUE3QjtBQUNBLFNBQUtDLFlBQUw7QUFDSCxHQXpCSTtBQTBCTDtBQUNBQSxFQUFBQSxZQUFZLEVBQUUsd0JBQVk7QUFDdEIsUUFBSSxPQUFRQyxFQUFSLElBQWUsV0FBbkIsRUFBZ0M7QUFDNUIsVUFBSUMsUUFBUSxHQUFHLFNBQVhBLFFBQVcsR0FBWTtBQUN2QixZQUFJLEtBQUtqQixVQUFMLENBQWdCa0IsV0FBaEIsSUFBK0IsQ0FBL0IsSUFBb0MsS0FBS2xCLFVBQUwsQ0FBZ0JtQixTQUFoQixJQUE2QixRQUFyRSxFQUErRTtBQUMzRSxlQUFLbkIsVUFBTCxDQUFnQm1CLFNBQWhCLEdBQTRCLElBQTVCO0FBQ0EsZUFBS25CLFVBQUwsQ0FBZ0JrQixXQUFoQixHQUE4QixDQUE5QjtBQUNBLGNBQUliLElBQUksR0FBRyxLQUFLRixhQUFMLENBQW1CaUIsY0FBbkIsQ0FBa0MsS0FBS2hCLGFBQUwsQ0FBbUJDLElBQXJELENBQVg7O0FBQ0EsY0FBSUEsSUFBSSxJQUFJLElBQVosRUFBa0I7QUFDZEEsWUFBQUEsSUFBSSxDQUFDSCxZQUFMLENBQWtCLFNBQWxCLEVBQTZCSixRQUE3QixDQUFzQyxNQUF0QyxFQUE4QyxLQUFLQyxnQkFBbkQ7QUFDQSxpQkFBS0ssYUFBTCxDQUFtQmlCLFFBQW5CLENBQTRCLEtBQUt0QixnQkFBakM7QUFDSDs7QUFBQTtBQUNELGVBQUt1QixVQUFMLENBQWdCTCxRQUFoQjtBQUNBLGVBQUtaLElBQUwsQ0FBVWtCLE9BQVY7QUFDSCxTQVZELE1BVU87QUFDSCxjQUFJLEtBQUt2QixVQUFMLENBQWdCbUIsU0FBaEIsSUFBNkIsSUFBN0IsSUFBcUMsS0FBS25CLFVBQUwsQ0FBZ0JrQixXQUFoQixJQUErQixDQUF4RSxFQUEyRTtBQUN2RSxpQkFBS0ksVUFBTCxDQUFnQkwsUUFBaEI7QUFDSDs7QUFBQTtBQUNKOztBQUFBO0FBQ0osT0FoQkQ7O0FBaUJBLFdBQUtPLFFBQUwsQ0FBY1AsUUFBZCxFQUF3QixHQUF4QjtBQUNIOztBQUFBO0FBQ0osR0FoREk7QUFpRExRLEVBQUFBLE1BakRLLG9CQWlESSxDQUVSLENBbkRJO0FBcURMWixFQUFBQSxLQXJESyxtQkFxREcsQ0FFUCxDQXZESSxDQXlETDs7QUF6REssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBhZF9jYXJfbm9kZTogY2MuTm9kZSxcclxuICAgIH0sXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuICAgIGluaV9ub2RlKHByaWNlX2RpZmZlcmVuY2UpIHtcclxuICAgICAgICB0aGlzLnByaWNlX2RpZmZlcmVuY2UgPSBwcmljZV9kaWZmZXJlbmNlO1xyXG4gICAgICAgIHRoaXMuYWRfY29udHJvbCA9IGNjLmZpbmQoXCJhZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcImFkX2NvbnRyb2xcIik7XHJcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9zY2VuZVwiKTtcclxuICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanM9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfcnVsZXNcIik7O1xyXG4gICAgICAgIHRoaXMubm9kZS54ID0gNTAwO1xyXG4gICAgICAgIGNjLnR3ZWVuKHRoaXMubm9kZSlcclxuICAgICAgICAgICAgLnRvKDAuNSwgeyB4OiAwIH0sIHsgZWFzaW5nOiBcImVsYXN0aWNPdXRcIiB9KVxyXG4gICAgICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkX2Nhcl9ub2RlLm9uKFwidG91Y2hzdGFydFwiLCB0aGlzLmNyZWF0ZV9hZCwgdGhpcyk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zdGFydCgpO1xyXG4gICAgfSxcclxuICAgIC8v5ouJ6LW35bm/5ZGKXHJcbiAgICBjcmVhdGVfYWQoKSB7XHJcbiAgICAgICAgLy8gdGhpcy5ub2RlLmRlc3Ryb3koKTtcclxuICAgICAgICB0aGlzLmFkX2NvbnRyb2wuc2hvd192aWRlb0FkKFwiYWRfY2FyXCIpO1xyXG4gICAgICAgIHRoaXMudmlkZW9fc3VjY2VzKCk7XHJcbiAgICB9LFxyXG4gICAgLy/mo4DmtYvop4bpopHmmK/lkKbmkq3mlL7miJDlip9cclxuICAgIHZpZGVvX3N1Y2NlczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgKHd4KSAhPSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFkX2NvbnRyb2wudmlkZW9fc3RhdGUgPT0gMSAmJiB0aGlzLmFkX2NvbnRyb2wudmlkZW9fdGFnID09IFwiYWRfY2FyXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkX2NvbnRyb2wudmlkZW9fdGFnID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkX2NvbnRyb2wudmlkZW9fc3RhdGUgPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBub2RlID0gdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9ydWxlc19qcy5ub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwidGlwc191aVwiKS5pbmlfbm9kZShcImdvbGRcIiwgdGhpcy5wcmljZV9kaWZmZXJlbmNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLmFkZF9nb2xkKHRoaXMucHJpY2VfZGlmZmVyZW5jZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUoY2FsbGJhY2spO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmFkX2NvbnRyb2wudmlkZW9fdGFnID09IG51bGwgJiYgdGhpcy5hZF9jb250cm9sLnZpZGVvX3N0YXRlID09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKGNhbGxiYWNrKTtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZShjYWxsYmFjaywgMC4yKTtcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIG9uTG9hZCgpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pO1xyXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ui/novice_ui.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f2791mzrUZGEJbaCM5hzs1f', 'novice_ui');
// script/ui/novice_ui.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    talk_group: cc.Node,
    paper_node: cc.Node,
    exit_button_node: cc.Node,
    title_node: cc.Node
  },
  //ini_node
  ini_node: function ini_node() {
    this.sound_control = cc.find("sound_control").getComponent("sound_control");
    this.exit_button_node.active = false;
    this.title_node.active = false;

    for (var i = 0; i < this.talk_group.children.length; i++) {
      this.talk_group.children[i].opacity = 0;
    }

    ;
    this.talk_count = 0;
    this.paper_node.height = 505;
    this.ini_paper_anim();
  },
  //纸动画
  ini_paper_anim: function ini_paper_anim() {
    var _this = this;

    cc.tween(this.paper_node).to(0.3, {
      height: 1042
    }, {
      easing: "sineIn"
    }).call(function () {
      _this.title_node.active = true;

      _this.ini_talk_anim();

      _this.show_exit_button_node();
    }).start();
  },
  //ini anim
  ini_talk_anim: function ini_talk_anim() {
    var callback = function callback() {
      this.talk_group.children[this.talk_count].opacity = 255;
      this.talk_count++;

      if (this.talk_count >= this.talk_group.children.length) {
        return;
      }

      ;
      this.ini_talk_anim();
    };

    this.scheduleOnce(callback, 0.2);
  },
  show_exit_button_node: function show_exit_button_node() {
    var _this2 = this;

    this.scheduleOnce(function () {
      _this2.exit_button_node.active = true;
    }, 1.5);
  },
  //退出按钮
  on_exit_button_click: function on_exit_button_click() {
    this.sound_control.play_sound_effect("button_exit");
    this.node.destroy();
  },
  // onLoad () {},
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcbm92aWNlX3VpLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwidGFsa19ncm91cCIsIk5vZGUiLCJwYXBlcl9ub2RlIiwiZXhpdF9idXR0b25fbm9kZSIsInRpdGxlX25vZGUiLCJpbmlfbm9kZSIsInNvdW5kX2NvbnRyb2wiLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwiYWN0aXZlIiwiaSIsImNoaWxkcmVuIiwibGVuZ3RoIiwib3BhY2l0eSIsInRhbGtfY291bnQiLCJoZWlnaHQiLCJpbmlfcGFwZXJfYW5pbSIsInR3ZWVuIiwidG8iLCJlYXNpbmciLCJjYWxsIiwiaW5pX3RhbGtfYW5pbSIsInNob3dfZXhpdF9idXR0b25fbm9kZSIsInN0YXJ0IiwiY2FsbGJhY2siLCJzY2hlZHVsZU9uY2UiLCJvbl9leGl0X2J1dHRvbl9jbGljayIsInBsYXlfc291bmRfZWZmZWN0Iiwibm9kZSIsImRlc3Ryb3kiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0FBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxVQUFVLEVBQUVKLEVBQUUsQ0FBQ0ssSUFEUDtBQUVSQyxJQUFBQSxVQUFVLEVBQUVOLEVBQUUsQ0FBQ0ssSUFGUDtBQUdSRSxJQUFBQSxnQkFBZ0IsRUFBRVAsRUFBRSxDQUFDSyxJQUhiO0FBSVJHLElBQUFBLFVBQVUsRUFBRVIsRUFBRSxDQUFDSztBQUpQLEdBSFA7QUFVTDtBQUNBSSxFQUFBQSxRQVhLLHNCQVdNO0FBQ1AsU0FBS0MsYUFBTCxHQUFxQlYsRUFBRSxDQUFDVyxJQUFILENBQVEsZUFBUixFQUF5QkMsWUFBekIsQ0FBc0MsZUFBdEMsQ0FBckI7QUFDQSxTQUFLTCxnQkFBTCxDQUFzQk0sTUFBdEIsR0FBK0IsS0FBL0I7QUFDQSxTQUFLTCxVQUFMLENBQWdCSyxNQUFoQixHQUF5QixLQUF6Qjs7QUFFQSxTQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsS0FBS1YsVUFBTCxDQUFnQlcsUUFBaEIsQ0FBeUJDLE1BQTdDLEVBQXFERixDQUFDLEVBQXRELEVBQTBEO0FBQ3RELFdBQUtWLFVBQUwsQ0FBZ0JXLFFBQWhCLENBQXlCRCxDQUF6QixFQUE0QkcsT0FBNUIsR0FBc0MsQ0FBdEM7QUFDSDs7QUFBQTtBQUNELFNBQUtDLFVBQUwsR0FBa0IsQ0FBbEI7QUFDQSxTQUFLWixVQUFMLENBQWdCYSxNQUFoQixHQUF5QixHQUF6QjtBQUNBLFNBQUtDLGNBQUw7QUFFSCxHQXZCSTtBQXlCTDtBQUNBQSxFQUFBQSxjQTFCSyw0QkEwQlk7QUFBQTs7QUFDYnBCLElBQUFBLEVBQUUsQ0FBQ3FCLEtBQUgsQ0FBUyxLQUFLZixVQUFkLEVBQ0tnQixFQURMLENBQ1EsR0FEUixFQUNhO0FBQUVILE1BQUFBLE1BQU0sRUFBRTtBQUFWLEtBRGIsRUFDK0I7QUFBRUksTUFBQUEsTUFBTSxFQUFFO0FBQVYsS0FEL0IsRUFFS0MsSUFGTCxDQUVVLFlBQU07QUFDUixNQUFBLEtBQUksQ0FBQ2hCLFVBQUwsQ0FBZ0JLLE1BQWhCLEdBQXlCLElBQXpCOztBQUNBLE1BQUEsS0FBSSxDQUFDWSxhQUFMOztBQUNBLE1BQUEsS0FBSSxDQUFDQyxxQkFBTDtBQUNILEtBTkwsRUFPS0MsS0FQTDtBQVFILEdBbkNJO0FBcUNMO0FBQ0FGLEVBQUFBLGFBdENLLDJCQXNDVztBQUNaLFFBQUlHLFFBQVEsR0FBRyxTQUFYQSxRQUFXLEdBQVk7QUFDdkIsV0FBS3hCLFVBQUwsQ0FBZ0JXLFFBQWhCLENBQXlCLEtBQUtHLFVBQTlCLEVBQTBDRCxPQUExQyxHQUFvRCxHQUFwRDtBQUNBLFdBQUtDLFVBQUw7O0FBQ0EsVUFBSSxLQUFLQSxVQUFMLElBQW1CLEtBQUtkLFVBQUwsQ0FBZ0JXLFFBQWhCLENBQXlCQyxNQUFoRCxFQUF3RDtBQUNwRDtBQUNIOztBQUFBO0FBQ0QsV0FBS1MsYUFBTDtBQUNILEtBUEQ7O0FBUUEsU0FBS0ksWUFBTCxDQUFrQkQsUUFBbEIsRUFBNEIsR0FBNUI7QUFDSCxHQWhESTtBQWlETEYsRUFBQUEscUJBakRLLG1DQWlEbUI7QUFBQTs7QUFDcEIsU0FBS0csWUFBTCxDQUFrQixZQUFNO0FBQ3BCLE1BQUEsTUFBSSxDQUFDdEIsZ0JBQUwsQ0FBc0JNLE1BQXRCLEdBQStCLElBQS9CO0FBQ0gsS0FGRCxFQUVHLEdBRkg7QUFHSCxHQXJESTtBQXNETDtBQUNBaUIsRUFBQUEsb0JBdkRLLGtDQXVEa0I7QUFDbkIsU0FBS3BCLGFBQUwsQ0FBbUJxQixpQkFBbkIsQ0FBcUMsYUFBckM7QUFDQSxTQUFLQyxJQUFMLENBQVVDLE9BQVY7QUFDSCxHQTFESTtBQTRETDtBQUVBTixFQUFBQSxLQTlESyxtQkE4REcsQ0FFUCxDQWhFSSxDQWtFTDs7QUFsRUssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgdGFsa19ncm91cDogY2MuTm9kZSxcclxuICAgICAgICBwYXBlcl9ub2RlOiBjYy5Ob2RlLFxyXG4gICAgICAgIGV4aXRfYnV0dG9uX25vZGU6IGNjLk5vZGUsXHJcbiAgICAgICAgdGl0bGVfbm9kZTogY2MuTm9kZSxcclxuICAgIH0sXHJcblxyXG4gICAgLy9pbmlfbm9kZVxyXG4gICAgaW5pX25vZGUoKSB7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sID0gY2MuZmluZChcInNvdW5kX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwic291bmRfY29udHJvbFwiKTtcclxuICAgICAgICB0aGlzLmV4aXRfYnV0dG9uX25vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy50aXRsZV9ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMudGFsa19ncm91cC5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLnRhbGtfZ3JvdXAuY2hpbGRyZW5baV0ub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnRhbGtfY291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMucGFwZXJfbm9kZS5oZWlnaHQgPSA1MDU7XHJcbiAgICAgICAgdGhpcy5pbmlfcGFwZXJfYW5pbSgpO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy/nurjliqjnlLtcclxuICAgIGluaV9wYXBlcl9hbmltKCkge1xyXG4gICAgICAgIGNjLnR3ZWVuKHRoaXMucGFwZXJfbm9kZSlcclxuICAgICAgICAgICAgLnRvKDAuMywgeyBoZWlnaHQ6IDEwNDIgfSwgeyBlYXNpbmc6IFwic2luZUluXCIgfSlcclxuICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aXRsZV9ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluaV90YWxrX2FuaW0oKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd19leGl0X2J1dHRvbl9ub2RlKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zdGFydCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvL2luaSBhbmltXHJcbiAgICBpbmlfdGFsa19hbmltKCkge1xyXG4gICAgICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy50YWxrX2dyb3VwLmNoaWxkcmVuW3RoaXMudGFsa19jb3VudF0ub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICAgICAgdGhpcy50YWxrX2NvdW50Kys7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRhbGtfY291bnQgPj0gdGhpcy50YWxrX2dyb3VwLmNoaWxkcmVuLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLmluaV90YWxrX2FuaW0oKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGNhbGxiYWNrLCAwLjIpO1xyXG4gICAgfSxcclxuICAgIHNob3dfZXhpdF9idXR0b25fbm9kZSgpIHtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZXhpdF9idXR0b25fbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH0sIDEuNSlcclxuICAgIH0sXHJcbiAgICAvL+mAgOWHuuaMiemSrlxyXG4gICAgb25fZXhpdF9idXR0b25fY2xpY2soKSB7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2V4aXRcIik7XHJcbiAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gb25Mb2FkICgpIHt9LFxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pO1xyXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ui/hotel_ui.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5bf73DluuJHfry1ENZ/Ms5R', 'hotel_ui');
// script/ui/hotel_ui.js

"use strict";

var _user_data = _interopRequireDefault(require("user_data"));

var _config = _interopRequireDefault(require("config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

cc.Class({
  "extends": cc.Component,
  properties: {
    lock_group_node: cc.Node,
    label_group_node: cc.Node,
    hotel_eject_node: cc.Node,
    buy_tittle_label: cc.Label,
    cost_label: cc.Label,
    iocn_frame_arr: [cc.SpriteFrame],
    buy_button_node: cc.Node
  },
  //初始化节点
  ini_node: function ini_node() {
    this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
    this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
    this.ad_control = cc.find("ad_control").getComponent("ad_control");
    this.sound_control = cc.find("sound_control").getComponent("sound_control");
    this.ad_car = null;

    for (var i = 0; i < this.lock_group_node.children.length; i++) {
      if (_user_data["default"].user_data.hotel[i].have == 1) {
        this.label_group_node.children[i].active = false;
        this.hotel_eject_node.active = false;
        this.lock_group_node.children[i].getComponent(cc.Sprite).spriteFrame = this.iocn_frame_arr[1];
      } else {
        this.label_group_node.children[i].active = true;
        this.lock_group_node.children[i].getComponent(cc.Sprite).spriteFrame = this.iocn_frame_arr[0];
        this.lock_group_node.children[i].getComponent(cc.Button).interactable = true;
        this.label_group_node.children[i].getComponent(cc.Label).string = _config["default"].hotel[i].need_level;
      }

      ;
    }

    ;
    this.ad_control.show_bannerAd();
  },
  //初始化弹出界面
  ini_hotel_eject: function ini_hotel_eject(index) {
    if (_user_data["default"].user_data.hotel[index].have == 1) {
      this.buy_button_node.active = false;
    } else {
      this.buy_button_node.active = true;
    }

    ;
    this.buy_tittle_label.string = "Rent a house every other" + _config["default"].hotel[this.room_index].produce_time + "seconds to get" + _config["default"].hotel[this.room_index].produce + "gold";
    this.cost_label.string = _config["default"].hotel[this.room_index].cost;
  },
  //on lock button click
  on_lock_button_click: function on_lock_button_click(e, index) {
    this.room_index = index;
    var level = _user_data["default"].user_data.level;

    if (level >= _config["default"].hotel[index].need_level) {
      this.sound_control.play_sound_effect("button_click");
      this.hotel_eject_node.active = true;
      this.ini_hotel_eject(index);
      this.create_ad_car();
    } else {
      this.sound_control.play_sound_effect("un_click");
      this.game_scene_js.create_tips_ui(this.game_scene_js.node, "no_level");
    }

    ;
  },
  //touch exit
  on_touch_exit_click: function on_touch_exit_click(e) {
    this.ad_control.hide_bannerAd();
    this.sound_control.play_sound_effect("button_exit");
    this.game_scene_js.on_node_kill(this.node);
  },
  //hotel_eject exit
  on_hotel_eject_exit_click: function on_hotel_eject_exit_click() {
    this.sound_control.play_sound_effect("button_exit");

    if (this.ad_car !== null) {
      this.ad_car.destroy();
    }

    ;
    this.hotel_eject_node.active = false;
  },
  //购买按钮被点击
  on_buy_button_click: function on_buy_button_click() {
    var gold = _user_data["default"].user_data.gold;
    var cost = _config["default"].hotel[this.room_index].cost;

    if (gold >= cost) {
      this.sound_control.play_sound_effect("button_click");
      this.game_scene_js.create_tips_ui(this.game_scene_js.node, "buy_succes");
      this.game_rules_js.add_gold(-cost);
      _user_data["default"].user_data.hotel[this.room_index].have = 1;
      this.game_rules_js.hotel_buy_room(this.room_index);
      this.ini_node();
    } else {
      this.sound_control.play_sound_effect("un_click");
      this.game_scene_js.create_tips_ui(this.game_scene_js.node, "no_money_gold");
    }

    ;
  },
  //创建ad_car
  create_ad_car: function create_ad_car() {
    if (_user_data["default"].user_data.hotel[this.room_index].have != 1) {
      var gold = _user_data["default"].user_data.gold;
      var all_capacity = 500 * _user_data["default"].user_data.skill["gold_max"] + 500;
      var cost = _config["default"].hotel[this.room_index].cost; //差价

      var price_difference = cost - gold; //大于4/5,且能够拥有，且金币不足

      if (gold >= cost * (4 / 5) && all_capacity >= cost && gold < cost) {
        this.ad_control.hide_bannerAd();
        this.ad_car = this.game_scene_js.create_ad_car(this.node, price_difference);
      }

      ;
    } else {
      return;
    }
  },
  // onLoad () {},
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcaG90ZWxfdWkuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJsb2NrX2dyb3VwX25vZGUiLCJOb2RlIiwibGFiZWxfZ3JvdXBfbm9kZSIsImhvdGVsX2VqZWN0X25vZGUiLCJidXlfdGl0dGxlX2xhYmVsIiwiTGFiZWwiLCJjb3N0X2xhYmVsIiwiaW9jbl9mcmFtZV9hcnIiLCJTcHJpdGVGcmFtZSIsImJ1eV9idXR0b25fbm9kZSIsImluaV9ub2RlIiwiZ2FtZV9zY2VuZV9qcyIsImZpbmQiLCJnZXRDb21wb25lbnQiLCJnYW1lX3J1bGVzX2pzIiwiYWRfY29udHJvbCIsInNvdW5kX2NvbnRyb2wiLCJhZF9jYXIiLCJpIiwiY2hpbGRyZW4iLCJsZW5ndGgiLCJ1c2VyX2RhdGEiLCJob3RlbCIsImhhdmUiLCJhY3RpdmUiLCJTcHJpdGUiLCJzcHJpdGVGcmFtZSIsIkJ1dHRvbiIsImludGVyYWN0YWJsZSIsInN0cmluZyIsImNvbmZpZyIsIm5lZWRfbGV2ZWwiLCJzaG93X2Jhbm5lckFkIiwiaW5pX2hvdGVsX2VqZWN0IiwiaW5kZXgiLCJyb29tX2luZGV4IiwicHJvZHVjZV90aW1lIiwicHJvZHVjZSIsImNvc3QiLCJvbl9sb2NrX2J1dHRvbl9jbGljayIsImUiLCJsZXZlbCIsInBsYXlfc291bmRfZWZmZWN0IiwiY3JlYXRlX2FkX2NhciIsImNyZWF0ZV90aXBzX3VpIiwibm9kZSIsIm9uX3RvdWNoX2V4aXRfY2xpY2siLCJoaWRlX2Jhbm5lckFkIiwib25fbm9kZV9raWxsIiwib25faG90ZWxfZWplY3RfZXhpdF9jbGljayIsImRlc3Ryb3kiLCJvbl9idXlfYnV0dG9uX2NsaWNrIiwiZ29sZCIsImFkZF9nb2xkIiwiaG90ZWxfYnV5X3Jvb20iLCJhbGxfY2FwYWNpdHkiLCJza2lsbCIsInByaWNlX2RpZmZlcmVuY2UiLCJzdGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7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cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHVzZXJfZGF0YSBmcm9tIFwidXNlcl9kYXRhXCI7XHJcbmltcG9ydCBjb25maWcgZnJvbSBcImNvbmZpZ1wiO1xyXG5cclxuY2MuQ2xhc3Moe1xyXG5cclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgbG9ja19ncm91cF9ub2RlOiBjYy5Ob2RlLFxyXG4gICAgICAgIGxhYmVsX2dyb3VwX25vZGU6IGNjLk5vZGUsXHJcbiAgICAgICAgaG90ZWxfZWplY3Rfbm9kZTogY2MuTm9kZSxcclxuICAgICAgICBidXlfdGl0dGxlX2xhYmVsOiBjYy5MYWJlbCxcclxuICAgICAgICBjb3N0X2xhYmVsOiBjYy5MYWJlbCxcclxuICAgICAgICBpb2NuX2ZyYW1lX2FycjogW2NjLlNwcml0ZUZyYW1lXSxcclxuICAgICAgICBidXlfYnV0dG9uX25vZGU6IGNjLk5vZGUsXHJcbiAgICB9LFxyXG5cclxuICAgIC8v5Yid5aeL5YyW6IqC54K5XHJcbiAgICBpbmlfbm9kZSgpIHtcclxuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJnYW1lX3NjZW5lXCIpO1xyXG4gICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfcnVsZXNcIik7XHJcbiAgICAgICAgdGhpcy5hZF9jb250cm9sID0gY2MuZmluZChcImFkX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwiYWRfY29udHJvbFwiKTtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wgPSBjYy5maW5kKFwic291bmRfY29udHJvbFwiKS5nZXRDb21wb25lbnQoXCJzb3VuZF9jb250cm9sXCIpO1xyXG4gICAgICAgIHRoaXMuYWRfY2FyID0gbnVsbDtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubG9ja19ncm91cF9ub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmhvdGVsW2ldLmhhdmUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbF9ncm91cF9ub2RlLmNoaWxkcmVuW2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ob3RlbF9lamVjdF9ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2NrX2dyb3VwX25vZGUuY2hpbGRyZW5baV0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmlvY25fZnJhbWVfYXJyWzFdO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbF9ncm91cF9ub2RlLmNoaWxkcmVuW2ldLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvY2tfZ3JvdXBfbm9kZS5jaGlsZHJlbltpXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuaW9jbl9mcmFtZV9hcnJbMF07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvY2tfZ3JvdXBfbm9kZS5jaGlsZHJlbltpXS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbF9ncm91cF9ub2RlLmNoaWxkcmVuW2ldLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gY29uZmlnLmhvdGVsW2ldLm5lZWRfbGV2ZWw7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmFkX2NvbnRyb2wuc2hvd19iYW5uZXJBZCgpO1xyXG4gICAgfSxcclxuICAgIC8v5Yid5aeL5YyW5by55Ye655WM6Z2iXHJcbiAgICBpbmlfaG90ZWxfZWplY3QoaW5kZXgpIHtcclxuICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5ob3RlbFtpbmRleF0uaGF2ZSA9PSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnV5X2J1dHRvbl9ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnV5X2J1dHRvbl9ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmJ1eV90aXR0bGVfbGFiZWwuc3RyaW5nID0gXCJSZW50IGEgaG91c2UgZXZlcnkgb3RoZXJcIiArIGNvbmZpZy5ob3RlbFt0aGlzLnJvb21faW5kZXhdLnByb2R1Y2VfdGltZSArIFwic2Vjb25kcyB0byBnZXRcIiArIGNvbmZpZy5ob3RlbFt0aGlzLnJvb21faW5kZXhdLnByb2R1Y2UgKyBcImdvbGRcIjtcclxuICAgICAgICB0aGlzLmNvc3RfbGFiZWwuc3RyaW5nID0gY29uZmlnLmhvdGVsW3RoaXMucm9vbV9pbmRleF0uY29zdDtcclxuICAgIH0sXHJcbiAgICAvL29uIGxvY2sgYnV0dG9uIGNsaWNrXHJcbiAgICBvbl9sb2NrX2J1dHRvbl9jbGljayhlLCBpbmRleCkge1xyXG4gICAgICAgIHRoaXMucm9vbV9pbmRleCA9IGluZGV4O1xyXG4gICAgICAgIHZhciBsZXZlbCA9IHVzZXJfZGF0YS51c2VyX2RhdGEubGV2ZWw7XHJcbiAgICAgICAgaWYgKGxldmVsID49IGNvbmZpZy5ob3RlbFtpbmRleF0ubmVlZF9sZXZlbCkge1xyXG4gICAgICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fY2xpY2tcIik7XHJcbiAgICAgICAgICAgIHRoaXMuaG90ZWxfZWplY3Rfbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmluaV9ob3RlbF9lamVjdChpbmRleCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlX2FkX2NhcigpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcInVuX2NsaWNrXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIFwibm9fbGV2ZWxcIik7XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvL3RvdWNoIGV4aXRcclxuICAgIG9uX3RvdWNoX2V4aXRfY2xpY2soZSkge1xyXG4gICAgICAgIHRoaXMuYWRfY29udHJvbC5oaWRlX2Jhbm5lckFkKCk7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2V4aXRcIik7XHJcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLm9uX25vZGVfa2lsbCh0aGlzLm5vZGUpO1xyXG4gICAgfSxcclxuICAgIC8vaG90ZWxfZWplY3QgZXhpdFxyXG4gICAgb25faG90ZWxfZWplY3RfZXhpdF9jbGljaygpIHtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fZXhpdFwiKTtcclxuICAgICAgICBpZiAodGhpcy5hZF9jYXIgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5hZF9jYXIuZGVzdHJveSgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5ob3RlbF9lamVjdF9ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfSxcclxuICAgIC8v6LSt5Lmw5oyJ6ZKu6KKr54K55Ye7XHJcbiAgICBvbl9idXlfYnV0dG9uX2NsaWNrKCkge1xyXG4gICAgICAgIHZhciBnb2xkID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkO1xyXG4gICAgICAgIHZhciBjb3N0ID0gY29uZmlnLmhvdGVsW3RoaXMucm9vbV9pbmRleF0uY29zdFxyXG4gICAgICAgIGlmIChnb2xkID49IGNvc3QpIHtcclxuICAgICAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIFwiYnV5X3N1Y2Nlc1wiKTtcclxuICAgICAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLmFkZF9nb2xkKC1jb3N0KTtcclxuICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5ob3RlbFt0aGlzLnJvb21faW5kZXhdLmhhdmUgPSAxO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMuaG90ZWxfYnV5X3Jvb20odGhpcy5yb29tX2luZGV4KTtcclxuICAgICAgICAgICAgdGhpcy5pbmlfbm9kZSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcInVuX2NsaWNrXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIFwibm9fbW9uZXlfZ29sZFwiKTtcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8v5Yib5bu6YWRfY2FyXHJcbiAgICBjcmVhdGVfYWRfY2FyKCkge1xyXG4gICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmhvdGVsW3RoaXMucm9vbV9pbmRleF0uaGF2ZSAhPSAxKSB7XHJcbiAgICAgICAgICAgIHZhciBnb2xkID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkO1xyXG4gICAgICAgICAgICB2YXIgYWxsX2NhcGFjaXR5ID0gNTAwICogdXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbFtcImdvbGRfbWF4XCJdICsgNTAwO1xyXG4gICAgICAgICAgICB2YXIgY29zdCA9IChjb25maWcuaG90ZWxbdGhpcy5yb29tX2luZGV4XS5jb3N0KTtcclxuICAgICAgICAgICAgLy/lt67ku7dcclxuICAgICAgICAgICAgdmFyIHByaWNlX2RpZmZlcmVuY2UgPSBjb3N0IC0gZ29sZDtcclxuICAgICAgICAgICAgLy/lpKfkuo40LzUs5LiU6IO95aSf5oul5pyJ77yM5LiU6YeR5biB5LiN6LazXHJcbiAgICAgICAgICAgIGlmIChnb2xkID49IGNvc3QgKiAoNCAvIDUpICYmIGFsbF9jYXBhY2l0eSA+PSBjb3N0ICYmIGdvbGQgPCBjb3N0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkX2NvbnRyb2wuaGlkZV9iYW5uZXJBZCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZF9jYXIgPSB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX2FkX2Nhcih0aGlzLm5vZGUsIHByaWNlX2RpZmZlcmVuY2UpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuICAgIC8vIG9uTG9hZCAoKSB7fSxcclxuXHJcbiAgICBzdGFydCgpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxyXG59KTtcclxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/control/ad_control.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4cfbbsmFOFMvIhVViASXS9p', 'ad_control');
// script/control/ad_control.js

"use strict";

var _config = _interopRequireDefault(require("config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*
    share_state :{
        shared : "已分享"
        un_share : "未分享"
        share_succes :"分享成功"
    };
*/
cc.Class({
  "extends": cc.Component,
  properties: {},
  // LIFE-CYCLE CALLBACKS:
  //打开右上角3个点转发
  open_share: function open_share() {
    if (typeof wx !== "undefined") {
      //显示当前页面右上角的转发按钮
      wx.showShareMenu({
        withShareTicket: true
      });
      wx.onShareAppMessage(function () {
        return {//
        };
      });
    }

    ;
  },
  //手动拉起转发调用
  manual_share: function manual_share(tag) {
    if (typeof tt !== "undefined") {
      //记录是什么分享
      this.share_tag = tag;
      this.share_state = "shared";
      this.share_time = new Date().getTime(); // 记录当前时间

      var self = this;

      switch (tag) {
        case "offline_profit":
          tt.shareAppMessage({
            templateId: "u764x7bp9v2d3k16ij",
            // 替换成通过审核的分享ID
            title: "Leisure farm, hang up",
            desc: "A relaxing and casual business simulation game。",
            imageUrl: "",
            query: "",
            success: function success() {
              console.log("分享视频成功");
              self.share_sucess();
            },
            fail: function fail(e) {
              console.log("分享视频失败");
              self.share_fail();
            }
          });
          break;

        case "pet":
          tt.shareAppMessage({
            templateId: "",
            // 替换成通过审核的分享ID
            title: "Do you like me?",
            desc: "I want this little pet, please click for me！",
            imageUrl: "",
            query: "",
            success: function success() {
              console.log("分享视频成功");
              self.share_sucess();
            },
            fail: function fail(e) {
              console.log("分享视频失败");
              self.share_fail();
            }
          });
          break;
      }

      ;
    }

    ;
  },
  //微信回到前台分享判断
  share_judge: function share_judge() {
    if (typeof wx !== "undefined") {
      var self = this;
      wx.onShow(function () {
        //标签不能为空并且分享状态为已分享
        if (self.share_state == "shared" && self.share_tag !== null) {
          var now_time = new Date().getTime();

          if (now_time - self.share_time >= 3000) {
            self.share_sucess(self.share_tag);
          } else {
            self.share_fail();
          }

          ;
        } else {
          return;
        }
      });
    }
  },
  //分享成功
  share_sucess: function share_sucess() {
    this.share_state = "share_succes";
    this.game_scene_js.create_tips_ui(this.game_scene_js.node, "share_succes");
  },
  //分享失败
  share_fail: function share_fail() {
    this.ini_share();
    this.game_scene_js.create_tips_ui(this.game_scene_js.node, "share_fail");
  },
  //初始化分享
  ini_share: function ini_share() {
    this.share_tag = null; //分享的标签

    this.share_time = null; //分享时的时间

    this.share_state = "un_share";
  },
  //===========================================================
  //===========================================================
  //创建视频广告
  create_videoAd: function create_videoAd() {
    var _this = this;

    if (_config["default"].ad_state == 0) {
      return;
    }

    ;

    if (typeof wx !== "undefined") {
      //视频广告
      this.video_ad = wx.createRewardedVideoAd({
        adUnitId: '2oo60sjxld911grh25' //填上你的广告位id

      }); //=======================================================
      //=======================================================
      //错误提示

      this.video_ad.onError(function (err) {
        _this.ad_manageer = false;
        console.log(err);
      });
    }

    ;
  },
  //展示视频广告
  show_videoAd: function show_videoAd(name) {
    var _this2 = this;

    if (_config["default"].ad_state == 0) {
      return;
    }

    ;

    if (typeof wx !== "undefined") {
      if (this.ad_manageer == false) {//广告未开启
      } else {
        this.sound_control.pause_all_sound();
      }

      ;
      this.video_tag = name; //无论有多少广告,只会返回一个实例

      this.video_ad.show()["catch"](function () {
        // 失败重试
        _this2.video_ad.load().then(function () {
          return _this2.video_ad.show();
        })["catch"](function (err) {
          console.log('激励视频 广告显示失败');

          _this2.game_scene_js.create_tips_ui(_this2.game_scene_js.node, "video_wait");
        });
      });
    }

    ;
  },
  //广告结束或退出
  over_videoAd: function over_videoAd() {
    var _this3 = this;

    if (_config["default"].ad_state == 0) {
      return;
    }

    ;

    if (typeof wx !== "undefined") {
      this.video_ad.onClose(function (res) {
        // 用户点击了【关闭广告】按钮
        // 小于 2.1.0 的基础库版本，res 是一个 undefined
        if (res && res.isEnded || res === undefined) {
          // 正常播放结束，可以下发游戏奖励
          _this3.video_state = 1; // 1为成功，0为失败 2位播放结束

          _this3.sound_control.resume_all_sound();
        } else {
          // 播放中途退出，不下发游戏奖励
          _this3.sound_control.resume_all_sound();

          _this3.video_state = 0;

          _this3.game_scene_js.create_tips_ui(_this3.game_scene_js.node, "video_exit");
        }
      });
    }

    ;
  },
  //创建banner广告
  banner_ad: function banner_ad() {
    var _this4 = this;

    if (typeof wx !== "undefined") {
      //抖音屏蔽banner
      var info = tt.getSystemInfoSync();

      if (info.appName.toUpperCase() === 'DOUYIN' || _config["default"].ad_state == 0) {
        return;
      } else {
        // 创建 Banner 广告实例，提前初始化
        var sysInfo = wx.getSystemInfoSync();
        this.bannerAd = wx.createBannerAd({
          adUnitId: '6g3799b8gcb52y1dvi',
          adIntervals: 30,
          style: {
            left: 0,
            top: 0,
            width: 300
          }
        });
        this.bannerAd.onError(function (err) {
          console.log(err); // this.show_push_ad("banner");
        });
        this.bannerAd.onResize(function (res) {
          _this4.bannerAd.style.top = sysInfo.windowHeight - res.height - 10;
          _this4.bannerAd.style.left = (sysInfo.windowWidth - res.width) / 2;
        });
      }
    }

    ; //end if
  },
  //展示banner
  show_bannerAd: function show_bannerAd() {
    cc.log("create_bannerAD");

    if (typeof wx !== "undefined") {
      //抖音屏蔽banner
      var info = tt.getSystemInfoSync();

      if (info.appName.toUpperCase() === 'DOUYIN' || _config["default"].ad_state == 0) {
        return;
      } else {
        this.bannerAd.show();
      }
    }

    ;
  },
  hide_bannerAd: function hide_bannerAd() {
    cc.log("hide_bannerAD");

    if (typeof wx !== "undefined") {
      //抖音屏蔽banner
      var info = tt.getSystemInfoSync();

      if (info.appName.toUpperCase() === 'DOUYIN' || _config["default"].ad_state == 0) {
        return;
      } else {
        this.bannerAd.hide();
      }
    }

    ;
  },
  onLoad: function onLoad() {
    // cc.game.addPersistRootNode(this.node);
    this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
    this.sound_control = cc.find("sound_control").getComponent("sound_control"); // this.share_judge();

    this.ini_share();
    this.judge = null; // 判断是否分享成功

    this.video_tag = null; //视频标签

    this.video_state = null; //视频播放的状态 1位succes 0为fail

    this.create_videoAd();
    this.over_videoAd();
    this.banner_ad();
    this.open_share();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxjb250cm9sXFxhZF9jb250cm9sLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwib3Blbl9zaGFyZSIsInd4Iiwic2hvd1NoYXJlTWVudSIsIndpdGhTaGFyZVRpY2tldCIsIm9uU2hhcmVBcHBNZXNzYWdlIiwibWFudWFsX3NoYXJlIiwidGFnIiwidHQiLCJzaGFyZV90YWciLCJzaGFyZV9zdGF0ZSIsInNoYXJlX3RpbWUiLCJEYXRlIiwiZ2V0VGltZSIsInNlbGYiLCJzaGFyZUFwcE1lc3NhZ2UiLCJ0ZW1wbGF0ZUlkIiwidGl0bGUiLCJkZXNjIiwiaW1hZ2VVcmwiLCJxdWVyeSIsInN1Y2Nlc3MiLCJjb25zb2xlIiwibG9nIiwic2hhcmVfc3VjZXNzIiwiZmFpbCIsImUiLCJzaGFyZV9mYWlsIiwic2hhcmVfanVkZ2UiLCJvblNob3ciLCJub3dfdGltZSIsImdhbWVfc2NlbmVfanMiLCJjcmVhdGVfdGlwc191aSIsIm5vZGUiLCJpbmlfc2hhcmUiLCJjcmVhdGVfdmlkZW9BZCIsImNvbmZpZyIsImFkX3N0YXRlIiwidmlkZW9fYWQiLCJjcmVhdGVSZXdhcmRlZFZpZGVvQWQiLCJhZFVuaXRJZCIsIm9uRXJyb3IiLCJlcnIiLCJhZF9tYW5hZ2VlciIsInNob3dfdmlkZW9BZCIsIm5hbWUiLCJzb3VuZF9jb250cm9sIiwicGF1c2VfYWxsX3NvdW5kIiwidmlkZW9fdGFnIiwic2hvdyIsImxvYWQiLCJ0aGVuIiwib3Zlcl92aWRlb0FkIiwib25DbG9zZSIsInJlcyIsImlzRW5kZWQiLCJ1bmRlZmluZWQiLCJ2aWRlb19zdGF0ZSIsInJlc3VtZV9hbGxfc291bmQiLCJiYW5uZXJfYWQiLCJpbmZvIiwiZ2V0U3lzdGVtSW5mb1N5bmMiLCJhcHBOYW1lIiwidG9VcHBlckNhc2UiLCJzeXNJbmZvIiwiYmFubmVyQWQiLCJjcmVhdGVCYW5uZXJBZCIsImFkSW50ZXJ2YWxzIiwic3R5bGUiLCJsZWZ0IiwidG9wIiwid2lkdGgiLCJvblJlc2l6ZSIsIndpbmRvd0hlaWdodCIsImhlaWdodCIsIndpbmRvd1dpZHRoIiwic2hvd19iYW5uZXJBZCIsImhpZGVfYmFubmVyQWQiLCJoaWRlIiwib25Mb2FkIiwiZmluZCIsImdldENvbXBvbmVudCIsImp1ZGdlIiwic3RhcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUUsRUFIUDtBQU9MO0FBRUE7QUFDQUMsRUFBQUEsVUFBVSxFQUFFLHNCQUFZO0FBQ3BCLFFBQUksT0FBUUMsRUFBUixLQUFnQixXQUFwQixFQUFpQztBQUM3QjtBQUNBQSxNQUFBQSxFQUFFLENBQUNDLGFBQUgsQ0FBaUI7QUFBRUMsUUFBQUEsZUFBZSxFQUFFO0FBQW5CLE9BQWpCO0FBQ0FGLE1BQUFBLEVBQUUsQ0FBQ0csaUJBQUgsQ0FBcUIsWUFBWTtBQUM3QixlQUFPLENBQ0g7QUFERyxTQUFQO0FBR0gsT0FKRDtBQUtIOztBQUFBO0FBQ0osR0FwQkk7QUFzQkw7QUFDQUMsRUFBQUEsWUFBWSxFQUFFLHNCQUFVQyxHQUFWLEVBQWU7QUFDekIsUUFBSSxPQUFRQyxFQUFSLEtBQWdCLFdBQXBCLEVBQWlDO0FBQzdCO0FBQ0EsV0FBS0MsU0FBTCxHQUFpQkYsR0FBakI7QUFDQSxXQUFLRyxXQUFMLEdBQW1CLFFBQW5CO0FBQ0EsV0FBS0MsVUFBTCxHQUFrQixJQUFJQyxJQUFKLEdBQVdDLE9BQVgsRUFBbEIsQ0FKNkIsQ0FJVzs7QUFDeEMsVUFBSUMsSUFBSSxHQUFHLElBQVg7O0FBQ0EsY0FBUVAsR0FBUjtBQUNJLGFBQUssZ0JBQUw7QUFDSUMsVUFBQUEsRUFBRSxDQUFDTyxlQUFILENBQW1CO0FBQ2ZDLFlBQUFBLFVBQVUsRUFBRSxvQkFERztBQUNtQjtB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O0FBQ0EsU0FBS08sU0FBTDtBQUNBLFNBQUsxRCxVQUFMO0FBR0gsR0E1UEk7QUE4UExrRixFQUFBQSxLQTlQSyxtQkE4UEcsQ0FFUCxDQWhRSSxDQWtRTDs7QUFsUUssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNvbmZpZyBmcm9tIFwiY29uZmlnXCI7XHJcbi8qXHJcbiAgICBzaGFyZV9zdGF0ZSA6e1xyXG4gICAgICAgIHNoYXJlZCA6IFwi5bey5YiG5LqrXCJcclxuICAgICAgICB1bl9zaGFyZSA6IFwi5pyq5YiG5LqrXCJcclxuICAgICAgICBzaGFyZV9zdWNjZXMgOlwi5YiG5Lqr5oiQ5YqfXCJcclxuICAgIH07XHJcbiovXHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgICAvL+aJk+W8gOWPs+S4iuinkjPkuKrngrnovazlj5FcclxuICAgIG9wZW5fc2hhcmU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodHlwZW9mICh3eCkgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgLy/mmL7npLrlvZPliY3pobXpnaLlj7PkuIrop5LnmoTovazlj5HmjInpkq5cclxuICAgICAgICAgICAgd3guc2hvd1NoYXJlTWVudSh7IHdpdGhTaGFyZVRpY2tldDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICB3eC5vblNoYXJlQXBwTWVzc2FnZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG5cclxuICAgIC8v5omL5Yqo5ouJ6LW36L2s5Y+R6LCD55SoXHJcbiAgICBtYW51YWxfc2hhcmU6IGZ1bmN0aW9uICh0YWcpIHtcclxuICAgICAgICBpZiAodHlwZW9mICh0dCkgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgLy/orrDlvZXmmK/ku4DkuYjliIbkuqtcclxuICAgICAgICAgICAgdGhpcy5zaGFyZV90YWcgPSB0YWc7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhcmVfc3RhdGUgPSBcInNoYXJlZFwiO1xyXG4gICAgICAgICAgICB0aGlzLnNoYXJlX3RpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTsgLy8g6K6w5b2V5b2T5YmN5pe26Ze0XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgc3dpdGNoICh0YWcpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJvZmZsaW5lX3Byb2ZpdFwiOlxyXG4gICAgICAgICAgICAgICAgICAgIHR0LnNoYXJlQXBwTWVzc2FnZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlSWQ6IFwidTc2NHg3YnA5djJkM2sxNmlqXCIsIC8vIOabv+aNouaIkOmAmui/h+WuoeaguOeahOWIhuS6q0lEXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkxlaXN1cmUgZmFybSwgaGFuZyB1cFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjOiBcIkEgcmVsYXhpbmcgYW5kIGNhc3VhbCBidXNpbmVzcyBzaW11bGF0aW9uIGdhbWXjgIJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VVcmw6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5OiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLliIbkuqvop4bpopHmiJDlip9cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNoYXJlX3N1Y2VzcygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmYWlsKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5YiG5Lqr6KeG6aKR5aSx6LSlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zaGFyZV9mYWlsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJwZXRcIjpcclxuICAgICAgICAgICAgICAgICAgICB0dC5zaGFyZUFwcE1lc3NhZ2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZUlkOiBcIlwiLCAvLyDmm7/mjaLmiJDpgJrov4flrqHmoLjnmoTliIbkuqtJRFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJEbyB5b3UgbGlrZSBtZT9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzYzogXCJJIHdhbnQgdGhpcyBsaXR0bGUgcGV0LCBwbGVhc2UgY2xpY2sgZm9yIG1l77yBXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlVXJsOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyeTogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzcygpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5YiG5Lqr6KeG6aKR5oiQ5YqfXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zaGFyZV9zdWNlc3MoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmFpbChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWIhuS6q+inhumikeWksei0pVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2hhcmVfZmFpbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICB9LFxyXG4gICAgLy/lvq7kv6Hlm57liLDliY3lj7DliIbkuqvliKTmlq1cclxuICAgIHNoYXJlX2p1ZGdlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiAod3gpICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgd3gub25TaG93KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIC8v5qCH562+5LiN6IO95Li656m65bm25LiU5YiG5Lqr54q25oCB5Li65bey5YiG5LqrXHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5zaGFyZV9zdGF0ZSA9PSBcInNoYXJlZFwiICYmIHNlbGYuc2hhcmVfdGFnICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5vd190aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vd190aW1lIC0gc2VsZi5zaGFyZV90aW1lID49IDMwMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zaGFyZV9zdWNlc3Moc2VsZi5zaGFyZV90YWcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2hhcmVfZmFpbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8v5YiG5Lqr5oiQ5YqfXHJcbiAgICBzaGFyZV9zdWNlc3M6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnNoYXJlX3N0YXRlID0gXCJzaGFyZV9zdWNjZXNcIjtcclxuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIFwic2hhcmVfc3VjY2VzXCIpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvL+WIhuS6q+Wksei0pVxyXG4gICAgc2hhcmVfZmFpbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuaW5pX3NoYXJlKCk7XHJcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9zY2VuZV9qcy5ub2RlLCBcInNoYXJlX2ZhaWxcIik7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvL+WIneWni+WMluWIhuS6q1xyXG4gICAgaW5pX3NoYXJlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5zaGFyZV90YWcgPSBudWxsOyAvL+WIhuS6q+eahOagh+etvlxyXG4gICAgICAgIHRoaXMuc2hhcmVfdGltZSA9IG51bGw7IC8v5YiG5Lqr5pe255qE5pe26Ze0XHJcbiAgICAgICAgdGhpcy5zaGFyZV9zdGF0ZSA9IFwidW5fc2hhcmVcIjtcclxuICAgIH0sXHJcblxyXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgLy/liJvlu7rop4bpopHlub/lkYpcclxuICAgIGNyZWF0ZV92aWRlb0FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKGNvbmZpZy5hZF9zdGF0ZSA9PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmICh0eXBlb2YgKHd4KSAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAvL+inhumikeW5v+WRilxyXG4gICAgICAgICAgICB0aGlzLnZpZGVvX2FkID0gd3guY3JlYXRlUmV3YXJkZWRWaWRlb0FkKHtcclxuICAgICAgICAgICAgICAgIGFkVW5pdElkOiAnMm9vNjBzanhsZDkxMWdyaDI1JywvL+Whq+S4iuS9oOeahOW5v+WRiuS9jWlkXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAgICAgICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAgICAgICAgICAgLy/plJnor6/mj5DnpLpcclxuICAgICAgICAgICAgdGhpcy52aWRlb19hZC5vbkVycm9yKGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkX21hbmFnZWVyID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLy/lsZXnpLrop4bpopHlub/lkYpcclxuICAgIHNob3dfdmlkZW9BZDogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgICBpZiAoY29uZmlnLmFkX3N0YXRlID09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKHR5cGVvZiAod3gpICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmFkX21hbmFnZWVyID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAvL+W5v+WRiuacquW8gOWQr1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBhdXNlX2FsbF9zb3VuZCgpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLnZpZGVvX3RhZyA9IG5hbWU7XHJcbiAgICAgICAgICAgIC8v5peg6K665pyJ5aSa5bCR5bm/5ZGKLOWPquS8mui/lOWbnuS4gOS4quWunuS+i1xyXG4gICAgICAgICAgICB0aGlzLnZpZGVvX2FkLnNob3coKS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyDlpLHotKXph43or5VcclxuICAgICAgICAgICAgICAgIHRoaXMudmlkZW9fYWQubG9hZCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy52aWRlb19hZC5zaG93KCksXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5r+A5Yqx6KeG6aKRIOW5v+WRiuaYvuekuuWksei0pScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfc2NlbmVfanMubm9kZSwgXCJ2aWRlb193YWl0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvL+W5v+WRiue7k+adn+aIlumAgOWHulxyXG4gICAgb3Zlcl92aWRlb0FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKGNvbmZpZy5hZF9zdGF0ZSA9PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmICh0eXBlb2YgKHd4KSAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICB0aGlzLnZpZGVvX2FkLm9uQ2xvc2UocmVzID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIOeUqOaIt+eCueWHu+S6huOAkOWFs+mXreW5v+WRiuOAkeaMiemSrlxyXG4gICAgICAgICAgICAgICAgLy8g5bCP5LqOIDIuMS4wIOeahOWfuuehgOW6k+eJiOacrO+8jHJlcyDmmK/kuIDkuKogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICBpZiAocmVzICYmIHJlcy5pc0VuZGVkIHx8IHJlcyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5q2j5bi45pKt5pS+57uT5p2f77yM5Y+v5Lul5LiL5Y+R5ri45oiP5aWW5YqxXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWRlb19zdGF0ZSA9IDE7Ly8gMeS4uuaIkOWKn++8jDDkuLrlpLHotKUgMuS9jeaSreaUvue7k+adn1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc291bmRfY29udHJvbC5yZXN1bWVfYWxsX3NvdW5kKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDmkq3mlL7kuK3pgJTpgIDlh7rvvIzkuI3kuIvlj5HmuLjmiI/lpZblirFcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucmVzdW1lX2FsbF9zb3VuZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlkZW9fc3RhdGUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfc2NlbmVfanMubm9kZSwgXCJ2aWRlb19leGl0XCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLy/liJvlu7piYW5uZXLlub/lkYpcclxuICAgIGJhbm5lcl9hZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgKHd4KSAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAvL+aKlumfs+Wxj+iUvWJhbm5lclxyXG4gICAgICAgICAgICBjb25zdCBpbmZvID0gdHQuZ2V0U3lzdGVtSW5mb1N5bmMoKTtcclxuICAgICAgICAgICAgaWYgKGluZm8uYXBwTmFtZS50b1VwcGVyQ2FzZSgpID09PSAnRE9VWUlOJyB8fCBjb25maWcuYWRfc3RhdGUgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8g5Yib5bu6IEJhbm5lciDlub/lkYrlrp7kvovvvIzmj5DliY3liJ3lp4vljJZcclxuICAgICAgICAgICAgICAgIGxldCBzeXNJbmZvID0gd3guZ2V0U3lzdGVtSW5mb1N5bmMoKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5iYW5uZXJBZCA9IHd4LmNyZWF0ZUJhbm5lckFkKHtcclxuICAgICAgICAgICAgICAgICAgICBhZFVuaXRJZDogJzZnMzc5OWI4Z2NiNTJ5MWR2aScsXHJcbiAgICAgICAgICAgICAgICAgICAgYWRJbnRlcnZhbHM6IDMwLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDMwMCxcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5iYW5uZXJBZC5vbkVycm9yKGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuc2hvd19wdXNoX2FkKFwiYmFubmVyXCIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhbm5lckFkLm9uUmVzaXplKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iYW5uZXJBZC5zdHlsZS50b3AgPSBzeXNJbmZvLndpbmRvd0hlaWdodCAtIHJlcy5oZWlnaHQgLSAxMDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJhbm5lckFkLnN0eWxlLmxlZnQgPSAoc3lzSW5mby53aW5kb3dXaWR0aCAtIHJlcy53aWR0aCkgLyAyO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07Ly9lbmQgaWZcclxuICAgIH0sXHJcblxyXG4gICAgLy/lsZXnpLpiYW5uZXJcclxuICAgIHNob3dfYmFubmVyQWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjYy5sb2coXCJjcmVhdGVfYmFubmVyQURcIik7XHJcbiAgICAgICAgaWYgKHR5cGVvZiAod3gpICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIC8v5oqW6Z+z5bGP6JS9YmFubmVyXHJcbiAgICAgICAgICAgIGNvbnN0IGluZm8gPSB0dC5nZXRTeXN0ZW1JbmZvU3luYygpO1xyXG4gICAgICAgICAgICBpZiAoaW5mby5hcHBOYW1lLnRvVXBwZXJDYXNlKCkgPT09ICdET1VZSU4nIHx8IGNvbmZpZy5hZF9zdGF0ZSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhbm5lckFkLnNob3coKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgaGlkZV9iYW5uZXJBZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNjLmxvZyhcImhpZGVfYmFubmVyQURcIik7XHJcbiAgICAgICAgaWYgKHR5cGVvZiAod3gpICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIC8v5oqW6Z+z5bGP6JS9YmFubmVyXHJcbiAgICAgICAgICAgIGNvbnN0IGluZm8gPSB0dC5nZXRTeXN0ZW1JbmZvU3luYygpO1xyXG4gICAgICAgICAgICBpZiAoaW5mby5hcHBOYW1lLnRvVXBwZXJDYXNlKCkgPT09ICdET1VZSU4nIHx8IGNvbmZpZy5hZF9zdGF0ZSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhbm5lckFkLmhpZGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgLy8gY2MuZ2FtZS5hZGRQZXJzaXN0Um9vdE5vZGUodGhpcy5ub2RlKTtcclxuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJnYW1lX3NjZW5lXCIpO1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbCA9IGNjLmZpbmQoXCJzb3VuZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcInNvdW5kX2NvbnRyb2xcIik7XHJcbiAgICAgICAgLy8gdGhpcy5zaGFyZV9qdWRnZSgpO1xyXG4gICAgICAgIHRoaXMuaW5pX3NoYXJlKCk7XHJcbiAgICAgICAgdGhpcy5qdWRnZSA9IG51bGw7IC8vIOWIpOaWreaYr+WQpuWIhuS6q+aIkOWKn1xyXG4gICAgICAgIHRoaXMudmlkZW9fdGFnID0gbnVsbDsgLy/op4bpopHmoIfnrb5cclxuICAgICAgICB0aGlzLnZpZGVvX3N0YXRlID0gbnVsbDsgLy/op4bpopHmkq3mlL7nmoTnirbmgIEgMeS9jXN1Y2NlcyAw5Li6ZmFpbFxyXG4gICAgICAgIHRoaXMuY3JlYXRlX3ZpZGVvQWQoKTtcclxuICAgICAgICB0aGlzLm92ZXJfdmlkZW9BZCgpO1xyXG4gICAgICAgIHRoaXMuYmFubmVyX2FkKCk7XHJcbiAgICAgICAgdGhpcy5vcGVuX3NoYXJlKCk7XHJcblxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcclxufSk7XHJcbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ui/option_ui.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e7d66DIIWdMjIN2cInCNNMh', 'option_ui');
// script/ui/option_ui.js

"use strict";

var user_data = require("user_data");

cc.Class({
  "extends": cc.Component,
  properties: {
    grandPa_node: cc.Node,
    sound_node_sprite: cc.Sprite,
    sound_frame_arr: [cc.SpriteFrame],
    progress_bar: cc.ProgressBar
  },
  //初始化节点
  ini_node: function ini_node() {
    this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
    this.ad_control = cc.find("ad_control").getComponent("ad_control");
    this.sound_control = cc.find("sound_control").getComponent("sound_control");
    this.ad_control.show_bannerAd();
    this.grandPa_node.scaleY = 0;
    this.progress_bar.node.active = false;
    this.click_count = 0;
    var sound_state = user_data.user_data.sound_state;

    if (sound_state == 1) {
      this.sound_node_sprite.spriteFrame = this.sound_frame_arr[0];
    } else {
      this.sound_node_sprite.spriteFrame = this.sound_frame_arr[1];
    }

    ;
    this.grandPa_anim();
  },
  //grandPa anim
  grandPa_anim: function grandPa_anim() {
    cc.tween(this.grandPa_node).to(0.3, {
      scaleY: 1
    }, {
      easing: "elasticOut"
    }).start();
  },
  //当音频按钮被点击
  on_sounde_button_click: function on_sounde_button_click() {
    this.sound_control.play_sound_effect("button_click");
    var sound_state = user_data.user_data.sound_state;

    if (sound_state == 1) {
      //关闭声音
      user_data.user_data.sound_state = 0;
      this.sound_node_sprite.spriteFrame = this.sound_frame_arr[1];
      this.sound_control.pause_all_sound();
    } else {
      //开启声音
      user_data.user_data.sound_state = 1;
      this.sound_node_sprite.spriteFrame = this.sound_frame_arr[0];
      this.sound_control.resume_all_sound();
      this.sound_control.play_bg_sound("home_bg");
    }

    ;
  },
  //爷爷被点击
  on_grandPa_click: function on_grandPa_click() {
    this.sound_control.play_sound_effect("button_click");
    this.progress_bar.node.active = true;
    this.click_count++;
    this.progress_bar.progress = this.click_count / 10;

    if (this.progress_bar.progress == 1) {
      var random_num = Math.floor(Math.random() * 5) + 1;
      this.click_count = 0;
      this.progress_bar.progress = this.click_count / 10;

      for (var i = 0; i < random_num; i++) {
        this.game_scene_js.create_gold_effect(this.grandPa_node, i, 1);
      }

      ;
    }

    ;
  },
  //新手引导按钮被点击
  on_novice_button_click: function on_novice_button_click() {
    this.sound_control.play_sound_effect("button_click");
    this.game_scene_js.create_novice_ui();
    this.touch_exit();
  },
  //点击退出
  touch_exit: function touch_exit() {
    this.sound_control.play_sound_effect("button_exit");
    this.ad_control.hide_bannerAd();
    this.game_scene_js.on_node_kill(this.node);
  },
  // onLoad () {},
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcb3B0aW9uX3VpLmpzIl0sIm5hbWVzIjpbInVzZXJfZGF0YSIsInJlcXVpcmUiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImdyYW5kUGFfbm9kZSIsIk5vZGUiLCJzb3VuZF9ub2RlX3Nwcml0ZSIsIlNwcml0ZSIsInNvdW5kX2ZyYW1lX2FyciIsIlNwcml0ZUZyYW1lIiwicHJvZ3Jlc3NfYmFyIiwiUHJvZ3Jlc3NCYXIiLCJpbmlfbm9kZSIsImdhbWVfc2NlbmVfanMiLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwiYWRfY29udHJvbCIsInNvdW5kX2NvbnRyb2wiLCJzaG93X2Jhbm5lckFkIiwic2NhbGVZIiwibm9kZSIsImFjdGl2ZSIsImNsaWNrX2NvdW50Iiwic291bmRfc3RhdGUiLCJzcHJpdGVGcmFtZSIsImdyYW5kUGFfYW5pbSIsInR3ZWVuIiwidG8iLCJlYXNpbmciLCJzdGFydCIsIm9uX3NvdW5kZV9idXR0b25fY2xpY2siLCJwbGF5X3NvdW5kX2VmZmVjdCIsInBhdXNlX2FsbF9zb3VuZCIsInJlc3VtZV9hbGxfc291bmQiLCJwbGF5X2JnX3NvdW5kIiwib25fZ3JhbmRQYV9jbGljayIsInByb2dyZXNzIiwicmFuZG9tX251bSIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImkiLCJjcmVhdGVfZ29sZF9lZmZlY3QiLCJvbl9ub3ZpY2VfYnV0dG9uX2NsaWNrIiwiY3JlYXRlX25vdmljZV91aSIsInRvdWNoX2V4aXQiLCJoaWRlX2Jhbm5lckFkIiwib25fbm9kZV9raWxsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLFNBQVMsR0FBR0MsT0FBTyxDQUFDLFdBQUQsQ0FBdkI7O0FBQ0FDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxZQUFZLEVBQUVKLEVB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QW1CLEVBQWhEOztBQUNBLFFBQUksS0FBS1osWUFBTCxDQUFrQjBCLFFBQWxCLElBQThCLENBQWxDLEVBQXFDO0FBQ2pDLFVBQUlDLFVBQVUsR0FBR0MsSUFBSSxDQUFDQyxLQUFMLENBQVdELElBQUksQ0FBQ0UsTUFBTCxLQUFnQixDQUEzQixJQUFnQyxDQUFqRDtBQUNBLFdBQUtsQixXQUFMLEdBQW1CLENBQW5CO0FBQ0EsV0FBS1osWUFBTCxDQUFrQjBCLFFBQWxCLEdBQTZCLEtBQUtkLFdBQUwsR0FBbUIsRUFBaEQ7O0FBQ0EsV0FBSyxJQUFJbUIsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0osVUFBcEIsRUFBZ0NJLENBQUMsRUFBakMsRUFBcUM7QUFDakMsYUFBSzVCLGFBQUwsQ0FBbUI2QixrQkFBbkIsQ0FBc0MsS0FBS3RDLFlBQTNDLEVBQXlEcUMsQ0FBekQsRUFBMkQsQ0FBM0Q7QUFDSDs7QUFBQTtBQUNKOztBQUFBO0FBQ0osR0FqRUk7QUFrRUw7QUFDQUUsRUFBQUEsc0JBbkVLLG9DQW1Fb0I7QUFDckIsU0FBSzFCLGFBQUwsQ0FBbUJjLGlCQUFuQixDQUFxQyxjQUFyQztBQUNBLFNBQUtsQixhQUFMLENBQW1CK0IsZ0JBQW5CO0FBQ0EsU0FBS0MsVUFBTDtBQUNILEdBdkVJO0FBd0VMO0FBQ0FBLEVBQUFBLFVBekVLLHdCQXlFUTtBQUNULFNBQUs1QixhQUFMLENBQW1CYyxpQkFBbkIsQ0FBcUMsYUFBckM7QUFDQSxTQUFLZixVQUFMLENBQWdCOEIsYUFBaEI7QUFDQSxTQUFLakMsYUFBTCxDQUFtQmtDLFlBQW5CLENBQWdDLEtBQUszQixJQUFyQztBQUNILEdBN0VJO0FBOEVMO0FBRUFTLEVBQUFBLEtBaEZLLG1CQWdGRyxDQUVQLENBbEZJLENBb0ZMOztBQXBGSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgdXNlcl9kYXRhID0gcmVxdWlyZShcInVzZXJfZGF0YVwiKTtcclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBncmFuZFBhX25vZGU6IGNjLk5vZGUsXHJcbiAgICAgICAgc291bmRfbm9kZV9zcHJpdGU6IGNjLlNwcml0ZSxcclxuICAgICAgICBzb3VuZF9mcmFtZV9hcnI6IFtjYy5TcHJpdGVGcmFtZV0sXHJcbiAgICAgICAgcHJvZ3Jlc3NfYmFyOiBjYy5Qcm9ncmVzc0JhcixcclxuICAgIH0sXHJcbiAgICAvL+WIneWni+WMluiKgueCuVxyXG4gICAgaW5pX25vZGUoKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9zY2VuZVwiKTtcclxuICAgICAgICB0aGlzLmFkX2NvbnRyb2wgPSBjYy5maW5kKFwiYWRfY29udHJvbFwiKS5nZXRDb21wb25lbnQoXCJhZF9jb250cm9sXCIpO1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbCA9IGNjLmZpbmQoXCJzb3VuZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcInNvdW5kX2NvbnRyb2xcIik7XHJcbiAgICAgICAgdGhpcy5hZF9jb250cm9sLnNob3dfYmFubmVyQWQoKTtcclxuICAgICAgICB0aGlzLmdyYW5kUGFfbm9kZS5zY2FsZVkgPSAwO1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3NfYmFyLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jbGlja19jb3VudCA9IDA7XHJcbiAgICAgICAgdmFyIHNvdW5kX3N0YXRlID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5zb3VuZF9zdGF0ZTtcclxuICAgICAgICBpZiAoc291bmRfc3RhdGUgPT0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLnNvdW5kX25vZGVfc3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5zb3VuZF9mcmFtZV9hcnJbMF07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zb3VuZF9ub2RlX3Nwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMuc291bmRfZnJhbWVfYXJyWzFdO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5ncmFuZFBhX2FuaW0oKTtcclxuICAgIH0sXHJcbiAgICAvL2dyYW5kUGEgYW5pbVxyXG4gICAgZ3JhbmRQYV9hbmltKCkge1xyXG4gICAgICAgIGNjLnR3ZWVuKHRoaXMuZ3JhbmRQYV9ub2RlKVxyXG4gICAgICAgICAgICAudG8oMC4zLCB7IHNjYWxlWTogMSB9LCB7IGVhc2luZzogXCJlbGFzdGljT3V0XCIgfSlcclxuICAgICAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICB9LFxyXG4gICAgLy/lvZPpn7PpopHmjInpkq7ooqvngrnlh7tcclxuICAgIG9uX3NvdW5kZV9idXR0b25fY2xpY2soKSB7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xyXG4gICAgICAgIHZhciBzb3VuZF9zdGF0ZSA9IHVzZXJfZGF0YS51c2VyX2RhdGEuc291bmRfc3RhdGU7XHJcbiAgICAgICAgaWYgKHNvdW5kX3N0YXRlID09IDEpIHtcclxuICAgICAgICAgICAgLy/lhbPpl63lo7Dpn7NcclxuICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5zb3VuZF9zdGF0ZSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuc291bmRfbm9kZV9zcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLnNvdW5kX2ZyYW1lX2FyclsxXTtcclxuICAgICAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBhdXNlX2FsbF9zb3VuZCgpO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL+W8gOWQr+WjsOmfs1xyXG4gICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnNvdW5kX3N0YXRlID0gMTtcclxuICAgICAgICAgICAgdGhpcy5zb3VuZF9ub2RlX3Nwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMuc291bmRfZnJhbWVfYXJyWzBdO1xyXG4gICAgICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucmVzdW1lX2FsbF9zb3VuZCgpO1xyXG4gICAgICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9iZ19zb3VuZChcImhvbWVfYmdcIik7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICB9LFxyXG4gICAgLy/niLfniLfooqvngrnlh7tcclxuICAgIG9uX2dyYW5kUGFfY2xpY2soKSB7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3NfYmFyLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNsaWNrX2NvdW50Kys7XHJcbiAgICAgICAgdGhpcy5wcm9ncmVzc19iYXIucHJvZ3Jlc3MgPSB0aGlzLmNsaWNrX2NvdW50IC8gMTA7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvZ3Jlc3NfYmFyLnByb2dyZXNzID09IDEpIHtcclxuICAgICAgICAgICAgdmFyIHJhbmRvbV9udW0gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA1KSArIDE7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpY2tfY291bnQgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnByb2dyZXNzX2Jhci5wcm9ncmVzcyA9IHRoaXMuY2xpY2tfY291bnQgLyAxMDtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByYW5kb21fbnVtOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfZ29sZF9lZmZlY3QodGhpcy5ncmFuZFBhX25vZGUsIGksMSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvL+aWsOaJi+W8leWvvOaMiemSruiiq+eCueWHu1xyXG4gICAgb25fbm92aWNlX2J1dHRvbl9jbGljaygpIHtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fY2xpY2tcIik7XHJcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9ub3ZpY2VfdWkoKTtcclxuICAgICAgICB0aGlzLnRvdWNoX2V4aXQoKTtcclxuICAgIH0sXHJcbiAgICAvL+eCueWHu+mAgOWHulxyXG4gICAgdG91Y2hfZXhpdCgpIHtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fZXhpdFwiKTtcclxuICAgICAgICB0aGlzLmFkX2NvbnRyb2wuaGlkZV9iYW5uZXJBZCgpO1xyXG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5vbl9ub2RlX2tpbGwodGhpcy5ub2RlKTtcclxuICAgIH0sXHJcbiAgICAvLyBvbkxvYWQgKCkge30sXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcclxufSk7XHJcbiJdfQ==
//------QC-SOURCE-SPLIT------

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcbGFuZC5qcyJdLCJuYW1lcyI6WyJ1c2VyX2RhdGEiLCJyZXF1aXJlIiwiY29uZmlnIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJ0aXBzX25vZGUiLCJOb2RlIiwicGxhbnRfbm9kZSIsInBsYW50X3Byb2dyZXNzX25vZGUiLCJ3YXRlcl9wcm9ncmVzc19ub2RlIiwicGxhbnRfcHJvZ3Jlc3NfbGFiZWwiLCJMYWJlbCIsImJ1dHRvbiIsImJ1dHRvbl9mcmFtZV9hcnIiLCJTcHJpdGVGcmFtZSIsImxhbmRfZnJhbWVfYXJyIiwicGxhbnQwX2ZyYW1lX2FyciIsInBsYW50MV9mcmFtZV9hcnIiLCJwbGFudDJfZnJhbWVfYXJyIiwicGxhbnQzX2ZyYW1lX2FyciIsInBsYW50NF9mcmFtZV9hcnIiLCJwbGFudDVfZnJhbWVfYXJyIiwicGxhbnQ2X2ZyYW1lX2FyciIsInBsYW50N19mcmFtZV9hcnIiLCJzZXRfcGxhbnQiLCJhY3RpdmUiLCJhbGl2ZV9zdGFnZSIsImxhbmQiLCJsYW5kX2luZGV4IiwiaSIsImNoaWxkcmVuIiwibGVuZ3RoIiwiZ2V0Q29tcG9uZW50IiwiU3ByaXRlIiwic3ByaXRlRnJhbWUiLCJwbGFudF9mcmFtZV9hcnIiLCJwbGFudF90eXBlIiwicGxhbnRfZ3JvdyIsImxhbmRfc3RhdGUiLCJncm93X3RpbWUiLCJwbGFudCIsIm5vd190aW1lIiwiYmFyIiwiUHJvZ3Jlc3NCYXIiLCJ3YXRlcmluZyIsInBsYW50X2dyb3dfc2NoZWR1bGUiLCJ3YXRlcl9idWZmIiwidW5zY2hlZHVsZSIsInN0cmluZyIsIndhaXRfbmV4dCIsInByb2dyZXNzIiwicHJvZ3Jlc3NfbnVtIiwicGFyc2VJbnQiLCJ1cGRhdGVfcGxhbnRfYWxpdmVfc3RhZ2UiLCJzY2hlZHVsZSIsInBsYW50U3ByaXRlIiwicGxhbnRfaW5kZXgiLCJwbGFudF9jb3VudCIsInJlc3RfcGxhdF9hbGl2ZV9zdGFnZSIsIndhdGVyX3NjaGVkdWxlIiwidHlwZSIsInN0YXRlIiwiY3V0IiwiY3V0X3RpbWUiLCJza2lsbCIsImN1dF9zY2hlZHVsZSIsInNvdW5kX2NvbnRyb2wiLCJwbGF5X3NvdW5kX2VmZmVjdCIsIm5vZGUiLCJnYW1lX3NjZW5lX2pzIiwiY3JlYXRlX2xpZ2h0X2VmZmVjdCIsImluaV9ub2RlIiwib25fYnV0dG9uX2NsaWNrIiwiY3JlYXRlX3BsYW50X3VpIiwidGlsbCIsImFsbF93YXRlciIsImFsbF93YXRlcl9udW0iLCJ3YXRlcl9udW0iLCJoYXZlX3dhdGVyIiwid2F0ZXJfY2hhcmdlIiwid2F0ZXJfc3RhdGUiLCJjYWxsYmFjayIsIm5vd193YXRlciIsImluZGV4IiwiZmluZCIsImhhdmUiLCJwbGFudF9zY2hlZHVsZSIsInRpbGxfdGltZSIsInBsYW50X3RpbWUiLCJsb2ciLCJvbkxvYWQiLCJzdGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxTQUFTLEdBQUdDLE9BQU8sQ0FBQyxXQUFELENBQXZCOztBQUNBLElBQUlDLE1BQU0sR0FBR0QsT0FBTyxDQUFDLFFBQUQsQ0FBcEI7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUFFLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBRUxDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxTQUFTLEVBQUVKLEVBQUUsQ0FBQ0ssSUFETjtBQUVSQyxJQUFBQSxVQUFVLEVBQUVOLEVBQUUsQ0FBQ0ssSUFGUDtBQUdSRSxJQUFBQSxtQkFBbUIsRUFBRVAsRUFBRSxDQUFDSyxJQUhoQjtBQUlSRyxJQUFBQSxtQkFBbUIsRUFBRVIsRUFBRSxDQUFDSyxJQUpoQjtBQUtSSSxJQUFBQSxvQkFBb0IsRUFBRVQsRUFBRSxDQUFDVSxLQUxqQjtBQU1SQyxJQUFBQSxNQUFNLEVBQUVYLEVBQUUsQ0FBQ0ssSUFOSDtBQU9STyxJQUFBQSxnQkFBZ0IsRUFBRSxDQUFDWixF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STtBQXdZTEksRUFBQUEsTUF4WUssb0JBd1lJO0FBQ0wsU0FBS3JCLGFBQUwsR0FBcUJwRSxFQUFFLENBQUNtRixJQUFILENBQVEsU0FBUixFQUFtQnBELFlBQW5CLENBQWdDLFlBQWhDLENBQXJCO0FBQ0gsR0ExWUk7QUE0WUwyRCxFQUFBQSxLQTVZSyxtQkE0WUcsQ0FDUCxDQTdZSSxDQStZTDs7QUEvWUssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHVzZXJfZGF0YSA9IHJlcXVpcmUoXCJ1c2VyX2RhdGFcIik7XHJcbnZhciBjb25maWcgPSByZXF1aXJlKFwiY29uZmlnXCIpO1xyXG5cclxuLypsYW5kIHN0YXRlIDp7XHJcbiAgICBjdXQgOlxyXG4gICAgdGlsbDpcclxuICAgIHdhdGVyOlxyXG4gICAgcGxhbnQ6XHJcbiAgICBncm93IDpcclxufTsqL1xyXG5cclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIHRpcHNfbm9kZTogY2MuTm9kZSxcclxuICAgICAgICBwbGFudF9ub2RlOiBjYy5Ob2RlLFxyXG4gICAgICAgIHBsYW50X3Byb2dyZXNzX25vZGU6IGNjLk5vZGUsXHJcbiAgICAgICAgd2F0ZXJfcHJvZ3Jlc3Nfbm9kZTogY2MuTm9kZSxcclxuICAgICAgICBwbGFudF9wcm9ncmVzc19sYWJlbDogY2MuTGFiZWwsXHJcbiAgICAgICAgYnV0dG9uOiBjYy5Ob2RlLFxyXG4gICAgICAgIGJ1dHRvbl9mcmFtZV9hcnI6IFtjYy5TcHJpdGVGcmFtZV0sXHJcbiAgICAgICAgbGFuZF9mcmFtZV9hcnI6IFtjYy5TcHJpdGVGcmFtZV0sXHJcbiAgICAgICAgcGxhbnQwX2ZyYW1lX2FycjogW2NjLlNwcml0ZUZyYW1lXSxcclxuICAgICAgICBwbGFudDFfZnJhbWVfYXJyOiBbY2MuU3ByaXRlRnJhbWVdLFxyXG4gICAgICAgIHBsYW50Ml9mcmFtZV9hcnI6IFtjYy5TcHJpdGVGcmFtZV0sXHJcbiAgICAgICAgcGxhbnQzX2ZyYW1lX2FycjogW2NjLlNwcml0ZUZyYW1lXSxcclxuICAgICAgICBwbGFudDRfZnJhbWVfYXJyOiBbY2MuU3ByaXRlRnJhbWVdLFxyXG4gICAgICAgIHBsYW50NV9mcmFtZV9hcnI6IFtjYy5TcHJpdGVGcmFtZV0sXHJcbiAgICAgICAgcGxhbnQ2X2ZyYW1lX2FycjogW2NjLlNwcml0ZUZyYW1lXSxcclxuICAgICAgICBwbGFudDdfZnJhbWVfYXJyOiBbY2MuU3ByaXRlRnJhbWVdLFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgICAvL+iuvue9ruenjeakjeeahOakjeeJqVxyXG4gICAgc2V0X3BsYW50OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5wbGFudF9ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdmFyIGFsaXZlX3N0YWdlID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0uYWxpdmVfc3RhZ2U7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBsYW50X25vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5wbGFudF9ub2RlLmNoaWxkcmVuW2ldLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5wbGFudF9mcmFtZV9hcnJbdGhpcy5wbGFudF90eXBlXVthbGl2ZV9zdGFnZV07XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnBsYW50X2dyb3coKTtcclxuICAgIH0sXHJcbiAgICAvL+akjeeJqeeUn+mVv1xyXG4gICAgcGxhbnRfZ3JvdzogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLmxhbmRfc3RhdGUgPSBcImdyb3dcIjsgLy8gbm90ZSB0aMOsIGdyb3dpbmcgY2jhuqF5IHF1w6EgMTAwJVxyXG4gICAgICAgIHZhciBsYW5kX3N0YXRlID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0ubGFuZF9zdGF0ZTtcclxuICAgICAgICB0aGlzLnBsYW50X3Byb2dyZXNzX25vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB2YXIgZ3Jvd190aW1lID0gY29uZmlnLnBsYW50W3RoaXMucGxhbnRfdHlwZV0uZ3Jvd190aW1lO1xyXG4gICAgICAgIHZhciBub3dfdGltZSA9IDA7XHJcbiAgICAgICAgdmFyIGJhciA9IHRoaXMucGxhbnRfcHJvZ3Jlc3Nfbm9kZS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpO1xyXG4gICAgICAgIHRoaXMud2F0ZXJpbmcoKTtcclxuICAgICAgICB0aGlzLnBsYW50X2dyb3dfc2NoZWR1bGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIG5vd190aW1lICs9IDAuMSAqIHRoaXMud2F0ZXJfYnVmZjtcclxuICAgICAgICAgICAgaWYgKG5vd190aW1lID49IGdyb3dfdGltZSAmJiBsYW5kX3N0YXRlID09IFwiZ3Jvd1wiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5wbGFudF9ncm93X3NjaGVkdWxlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxhbnRfcHJvZ3Jlc3NfbGFiZWwuc3RyaW5nID0gXCJXYWl0aW5nIGZvciBoYXJ2ZXN0XCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndhaXRfbmV4dChcIndhaXRfY3V0XCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYmFyLnByb2dyZXNzID0gbm93X3RpbWUgLyBncm93X3RpbWU7XHJcbiAgICAgICAgICAgICAgICB2YXIgcHJvZ3Jlc3NfbnVtID0gcGFyc2VJbnQoYmFyLnByb2dyZXNzICogMTAwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxhbnRfcHJvZ3Jlc3NfbGFiZWwuc3RyaW5nID0gXCJHcm93aW5nIFwiICsgcHJvZ3Jlc3NfbnVtICsgXCIlXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZV9wbGFudF9hbGl2ZV9zdGFnZShwcm9ncmVzc19udW0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHByb2dyZXNzX251bSA8IDI1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBsYW50X25vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGFudF9ub2RlLmNoaWxkcmVuW2ldLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5wbGFudF9mcmFtZV9hcnJbdGhpcy5wbGFudF90eXBlXVswXTtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAocHJvZ3Jlc3NfbnVtIDwgNTApIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucGxhbnRfbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYW50X25vZGUuY2hpbGRyZW5baV0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnBsYW50X2ZyYW1lX2Fyclt0aGlzLnBsYW50X3R5cGVdWzFdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAocHJvZ3Jlc3NfbnVtIDwgNzUpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucGxhbnRfbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYW50X25vZGUuY2hpbGRyZW5baV0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnBsYW50X2ZyYW1lX2Fyclt0aGlzLnBsYW50X3R5cGVdWzJdO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wbGFudF9ub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGFudF9ub2RlLmNoaWxkcmVuW2ldLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5wbGFudF9mcmFtZV9hcnJbdGhpcy5wbGFudF90eXBlXVszXTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMucGxhbnRfZ3Jvd19zY2hlZHVsZSwgMC4xKTtcclxuICAgIH0sXHJcbiAgICAvL+abtOaWsOakjeeJqeetiee6p1xyXG4gICAgdXBkYXRlX3BsYW50X2FsaXZlX3N0YWdlOiBmdW5jdGlvbiAocHJvZ3Jlc3NfbnVtKSB7XHJcbiAgICAgICAgLy8y55qE5YCN5pWwXHJcbiAgICAgICAgdmFyIGFsaXZlX3N0YWdlID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0uYWxpdmVfc3RhZ2U7XHJcbiAgICAgICAgbGV0IHBsYW50U3ByaXRlID0gdGhpcy5wbGFudF9ub2RlLmNoaWxkcmVuW3RoaXMucGxhbnRfaW5kZXhdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lO1xyXG4gICAgICAgIGlmIChwbGFudFNwcml0ZSkge1xyXG4gICAgICAgICAgICBwbGFudFNwcml0ZSA9IHRoaXMucGxhbnRfZnJhbWVfYXJyW3RoaXMucGxhbnRfdHlwZV1bYWxpdmVfc3RhZ2VdO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKHByb2dyZXNzX251bSA+PSAyNSAvIDEyICogdGhpcy5wbGFudF9jb3VudCkge1xyXG4gICAgICAgICAgICB0aGlzLnBsYW50X2luZGV4Kys7XHJcbiAgICAgICAgICAgIHRoaXMucGxhbnRfY291bnQrKztcclxuICAgICAgICAgICAgaWYgKHRoaXMucGxhbnRfY291bnQgPiA0OCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGFudF9jb3VudCA9IDQ4O1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wbGFudF9pbmRleCA+IDExKSB7XHJcbiAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5hbGl2ZV9zdGFnZSsrO1xyXG4gICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLmFsaXZlX3N0YWdlID4gMykge1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLmFsaXZlX3N0YWdlID0gMztcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYW50X2luZGV4ID0gMDtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8v6YeN572u5qSN54mp55qE55Sf6ZW/54q25oCBXHJcbiAgICByZXN0X3BsYXRfYWxpdmVfc3RhZ2U6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5hbGl2ZV9zdGFnZSA9IDA7XHJcbiAgICAgICAgdGhpcy5wbGFudF9pbmRleCA9IDA7XHJcbiAgICAgICAgdGhpcy5wbGFudF9jb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMud2F0ZXJfc2NoZWR1bGUpO1xyXG4gICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLnBsYW50X2dyb3dfc2NoZWR1bGUpO1xyXG4gICAgICAgIHRoaXMuc2V0X3BsYW50KCk7XHJcbiAgICB9LFxyXG4gICAgLy/EkeG7o2kgdHLhuqFuZyB0aMOhaSB0aeG6v3AgdGhlb1xyXG4gICAgd2FpdF9uZXh0OiBmdW5jdGlvbiAodHlwZSkge1xyXG4gICAgICAgIHRoaXMuYnV0dG9uLnN0YXRlID0gdHlwZTtcclxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBcIndhaXRfY3V0XCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbi5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuYnV0dG9uX2ZyYW1lX2FyclswXTtcclxuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLmxhbmRfc3RhdGUgPSBcIndhaXRfY3V0XCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInBsYW50XCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbi5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuYnV0dG9uX2ZyYW1lX2FyclsxXTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwid2FpdF90aWxsXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbi5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuYnV0dG9uX2ZyYW1lX2FyclsyXTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuYnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMud2F0ZXJfc2NoZWR1bGUpO1xyXG4gICAgfSxcclxuICAgIC8vY3V0dGluZ1xyXG4gICAgY3V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLmxhbmRfc3RhdGUgIT09IFwid2FpdF9jdXRcIikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfTtcclxuICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5sYW5kX3N0YXRlID0gXCJjdXRpbmdcIjtcclxuICAgICAgICB2YXIgbGFuZF9zdGF0ZSA9IHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLmxhbmRfc3RhdGVcclxuICAgICAgICB0aGlzLmJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB2YXIgY3V0X3RpbWUgPSBjb25maWcucGxhbnRbdGhpcy5wbGFudF90eXBlXS5jdXRfdGltZSAqICgxIC0gdXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbFtcInNwZWVkX3RoZV9jdXRcIl0gLyAxMDApO1xyXG4gICAgICAgIHZhciBub3dfdGltZSA9IDA7XHJcbiAgICAgICAgdmFyIGJhciA9IHRoaXMucGxhbnRfcHJvZ3Jlc3Nfbm9kZS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpO1xyXG4gICAgICAgIHRoaXMuY3V0X3NjaGVkdWxlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBub3dfdGltZSArPSAwLjE7XHJcbiAgICAgICAgICAgIGlmIChub3dfdGltZSA+PSBjdXRfdGltZSAmJiBsYW5kX3N0YXRlID09IFwiY3V0aW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIG5vd190aW1lID0gMDtcclxuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLmxhbmRfc3RhdGUgPSBcImN1dF9vdmVyXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJjdXRfb3ZlclwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLmN1dF9zY2hlZHVsZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3RfcGxhdF9hbGl2ZV9zdGFnZSgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX2xpZ2h0X2VmZmVjdCh0aGlzLm5vZGUsIDEsIHRoaXMucGxhbnRfdHlwZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG5vZGUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwibGlnaHRcIikuaW5pX25vZGUodGhpcy5wbGFudF90eXBlLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJhci5wcm9ncmVzcyA9IG5vd190aW1lIC8gY3V0X3RpbWU7XHJcbiAgICAgICAgICAgICAgICB2YXIgcHJvZ3Jlc3NfbnVtID0gcGFyc2VJbnQoYmFyLnByb2dyZXNzICogMTAwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxhbnRfcHJvZ3Jlc3NfbGFiZWwuc3RyaW5nID0gXCJIYXJ2ZXN0aW5nIFwiICsgcHJvZ3Jlc3NfbnVtICsgXCIlXCI7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMuY3V0X3NjaGVkdWxlLCAwLjEpO1xyXG4gICAgfSxcclxuICAgIC8v5oyJ6ZKu6KKr54K55Ye7XHJcbiAgICBvbl9idXR0b25fY2xpY2s6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fY2xpY2tcIik7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLmJ1dHRvbi5zdGF0ZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwid2FpdF9jdXRcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuY3V0KCk7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImhlbGxvIDEyMyBjdXR0XCIpOyAvLyBoYXJ2ZXN0aW5nXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInBsYW50XCI6XHJcbiAgICAgICAgICAgICAgICB2YXIgbm9kZSA9IHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfcGxhbnRfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5vZGUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwicGxhbnRfdWlcIikuaW5pX25vZGUodGhpcy5sYW5kX2luZGV4KTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImhlbGxvIHBsYW50XCIpOyAvLyBjaG9vc2UgcGxhbnQgXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIndhaXRfdGlsbFwiOlxyXG4gICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0ubGFuZF9zdGF0ZSA9IFwid2FpdF90aWxsXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpbGwoKTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiaGVsbG8gMTIzXCIpOyAgIC8vIHBsYW50aW5nXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8v5rWH5rC0XHJcbiAgICB3YXRlcmluZzogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMud2F0ZXJfYnVmZiA9IDI7XHJcbiAgICAgICAgdGhpcy53YXRlcl9wcm9ncmVzc19ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdmFyIGFsbF93YXRlciA9IGNvbmZpZy5hbGxfd2F0ZXJfbnVtO1xyXG4gICAgICAgIHZhciBiYXIgPSB0aGlzLndhdGVyX3Byb2dyZXNzX25vZGUuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKTtcclxuICAgICAgICB0aGlzLndhdGVyX3NjaGVkdWxlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0ubGFuZF9zdGF0ZSA9PSBcImdyb3dcIikge1xyXG4gICAgICAgICAgICAgICAgdmFyIHdhdGVyX251bSA9IHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLndhdGVyX251bTtcclxuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLndhdGVyX251bSAtPSAwLjEgKiAoMSAtIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxbXCJ3YXRlcl9zYXZpbmdcIl0gLyAxMDApO1xyXG4gICAgICAgICAgICAgICAgd2F0ZXJfbnVtID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0ud2F0ZXJfbnVtO1xyXG4gICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLmhhdmVfd2F0ZXIgPT0gMCkgd2F0ZXJfbnVtID0gMDtcclxuICAgICAgICAgICAgICAgIGlmICh3YXRlcl9udW0gPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLndhdGVyX3NjaGVkdWxlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndhdGVyX2J1ZmYgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLmhhdmVfd2F0ZXIgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLndhdGVyX251bSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0uaGF2ZV93YXRlciA9IDA7ICAgLy8gbMawdSB0cuG6oW5nIHRow6FpIGPDsyBuxrDhu5tjIGhheSBrIGPhu6dhIMO0IMSR4bqldFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiaGVsbG8gXCIgKyB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5oYXZlX3dhdGVyKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLmhhdmVfd2F0ZXIgPT0gMCkgYmFyLnByb2dyZXNzID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0uaGF2ZV93YXRlcj0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYXIucHJvZ3Jlc3MgPSB3YXRlcl9udW0gLyBhbGxfd2F0ZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLndhdGVyX3NjaGVkdWxlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy53YXRlcl9zY2hlZHVsZSwgMC4xKTtcclxuICAgIH0sXHJcbiAgICB3YXRlcl9jaGFyZ2U6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy53YXRlcl9zdGF0ZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLndhdGVyX3NjaGVkdWxlKTtcclxuICAgICAgICAgICAgdGhpcy53YXRlcl9zdGF0ZSA9IFwiY2hhcmdlXCI7XHJcbiAgICAgICAgICAgIHZhciBhbGxfd2F0ZXIgPSBjb25maWcuYWxsX3dhdGVyX251bTtcclxuICAgICAgICAgICAgdmFyIGJhciA9IHRoaXMud2F0ZXJfcHJvZ3Jlc3Nfbm9kZS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpO1xyXG4gICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5oYXZlX3dhdGVyID0gMTtcclxuICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG5vd193YXRlciA9IHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLndhdGVyX251bVxyXG4gICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0ud2F0ZXJfbnVtICs9IDE7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG5vd193YXRlciA+PSBhbGxfd2F0ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUoY2FsbGJhY2spO1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLndhdGVyX251bSA9IGFsbF93YXRlcjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndhdGVyX3N0YXRlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0ubGFuZF9zdGF0ZSA9PSBcImN1dFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53YXRlcmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGJhci5wcm9ncmVzcyA9IG5vd193YXRlciAvIGFsbF93YXRlcjtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZShjYWxsYmFjaywgMC4xKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMud2F0ZXJfc3RhdGUgPT0gXCJjaGFyZ2VcIikge1xyXG4gICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS53YXRlcl9udW0gKz0gMTA7XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvL+WIneWni+WMluiKgueCuVxyXG4gICAgaW5pX25vZGU6IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbCA9IGNjLmZpbmQoXCJzb3VuZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcInNvdW5kX2NvbnRyb2xcIik7XHJcbiAgICAgICAgdmFyIGhhdmUgPSB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbaW5kZXhdLmhhdmU7XHJcbiAgICAgICAgdGhpcy5sYW5kX2luZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgdGhpcy5wbGFudF90eXBlID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0ucGxhbnRfdHlwZTtcclxuICAgICAgICB2YXIgbGFuZF9zdGF0ZSA9IHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLmxhbmRfc3RhdGU7XHJcbiAgICAgICAgdGhpcy5wbGFudF9pbmRleCA9IDA7IC8v5qSN54mp57Si5byVXHJcbiAgICAgICAgdGhpcy5wbGFudF9jb3VudCA9IDA7IC8v55Sf6ZW/57yW5Y+3XHJcbiAgICAgICAgdGhpcy53YXRlcl9idWZmID0gMTsgIC8vIOWIneWni+WMluawtGJ1ZmZcclxuICAgICAgICB0aGlzLndhdGVyX3N0YXRlID0gbnVsbDtcclxuICAgICAgICB0aGlzLnBsYW50X2ZyYW1lX2FyciA9IFtcclxuICAgICAgICAgICAgdGhpcy5wbGFudDBfZnJhbWVfYXJyLFxyXG4gICAgICAgICAgICB0aGlzLnBsYW50MV9mcmFtZV9hcnIsXHJcbiAgICAgICAgICAgIHRoaXMucGxhbnQyX2ZyYW1lX2FycixcclxuICAgICAgICAgICAgdGhpcy5wbGFudDNfZnJhbWVfYXJyLFxyXG4gICAgICAgICAgICB0aGlzLnBsYW50NF9mcmFtZV9hcnIsXHJcbiAgICAgICAgICAgIHRoaXMucGxhbnQ1X2ZyYW1lX2FycixcclxuICAgICAgICAgICAgdGhpcy5wbGFudDZfZnJhbWVfYXJyLFxyXG4gICAgICAgICAgICB0aGlzLnBsYW50N19mcmFtZV9hcnIsXHJcbiAgICAgICAgXTtcclxuICAgICAgICBzd2l0Y2ggKGhhdmUpIHtcclxuICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgdGhpcy50aXBzX25vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMubGFuZF9mcmFtZV9hcnJbMF07XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYW50X25vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYW50X3Byb2dyZXNzX25vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndhdGVyX3Byb2dyZXNzX25vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgLy90aWxsIHN0YXRlXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpcHNfbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAobGFuZF9zdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ3YWl0X3RpbGxcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53YWl0X25leHQoXCJ3YWl0X3RpbGxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxhbnRfbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGFudF9wcm9ncmVzc19ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndhdGVyX3Byb2dyZXNzX25vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5sYW5kX2ZyYW1lX2FyclswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy53YWl0X25leHQoXCJ3YWl0X3RpbGxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ3YWl0X3BsYW50XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMubGFuZF9mcmFtZV9hcnJbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxhbnRfcHJvZ3Jlc3Nfbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndhdGVyX3Byb2dyZXNzX25vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdmFyIGJhciA9IHRoaXMud2F0ZXJfcHJvZ3Jlc3Nfbm9kZS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0uaGF2ZV93YXRlciA9PSAwKSBiYXIucHJvZ3Jlc3MgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYW50X3Byb2dyZXNzX2xhYmVsLnN0cmluZyA9IFwiV2FpdGluZyB0byBiZSBwbGFudGVkXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxhbnRfbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53YWl0X25leHQoXCJwbGFudFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIndhaXRfY3V0XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMubGFuZF9mcmFtZV9hcnJbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxhbnRfbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYW50X3Byb2dyZXNzX25vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53YXRlcl9wcm9ncmVzc19ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHZhciBiYXIgPSB0aGlzLndhdGVyX3Byb2dyZXNzX25vZGUuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLmhhdmVfd2F0ZXIgPT0gMCkgYmFyLnByb2dyZXNzID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGFudF9wcm9ncmVzc19sYWJlbC5zdHJpbmcgPSBcIldhaXRpbmcgZm9yIGhhcnZlc3RcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGFudF9wcm9ncmVzc19ub2RlLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0JhcikucHJvZ3Jlc3MgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucGxhbnRfbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGFudF9ub2RlLmNoaWxkcmVuW2ldLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5wbGFudF9mcmFtZV9hcnJbdGhpcy5wbGFudF90eXBlXVszXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53YWl0X25leHQoXCJ3YWl0X2N1dFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cobGFuZF9zdGF0ZSArIFwiIGhlbGxvXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAvLyBjYXNlIFwidGlsbGluZ1wiOiAgICAgLy8gdHLhuqFuZyB0aMOhaSBjaMawYSB0cuG7k25nIGPDonlcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy50aWxsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRfcGxhbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5sYW5kX2ZyYW1lX2FyclsxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2MubG9nKGxhbmRfc3RhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgfSxcclxuICAgIC8v6ICV5ZywXHJcbiAgICB0aWxsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy/lj6rlhYHorrjop6blj5HkuIDmrKFcclxuICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0ubGFuZF9zdGF0ZSAhPT0gXCJ0aWxsaW5nXCIpIHtcclxuICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0ubGFuZF9zdGF0ZSA9IFwidGlsbGluZ1wiO1xyXG4gICAgICAgICAgICB2YXIgbGFuZF9zdGF0ZSA9IHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLmxhbmRfc3RhdGU7XHJcbiAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLmFsaXZlX3N0YWdlID0gMDtcclxuICAgICAgICAgICAgdGhpcy5wbGFudF9pbmRleCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMucGxhbnRfY291bnQgPSAwO1xyXG4gICAgICAgICAgICAvL+WBnOaOieaJgOacieeahOiuoeaXtuWZqFxyXG4gICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy53YXRlcl9zY2hlZHVsZSk7XHJcbiAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLnBsYW50X2dyb3dfc2NoZWR1bGUpO1xyXG4gICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5jdXRfc2NoZWR1bGUpO1xyXG4gICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5wbGFudF9zY2hlZHVsZSk7XHJcbiAgICAgICAgICAgIHRoaXMucGxhbnRfbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5idXR0b24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHZhciB0aWxsX3RpbWUgPSBjb25maWcudGlsbF90aW1lICogKDEgLSB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1widG9vbF9pbXByb3ZlXCJdIC8gMTAwKTtcclxuICAgICAgICAgICAgdmFyIGJhciA9IHRoaXMucGxhbnRfcHJvZ3Jlc3Nfbm9kZS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpO1xyXG4gICAgICAgICAgICB2YXIgbm93X3RpbWUgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnBsYW50X3Byb2dyZXNzX25vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy53YXRlcl9wcm9ncmVzc19ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMubGFuZF9mcmFtZV9hcnJbMF07XHJcbiAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIG5vd190aW1lICs9IDAuMTtcclxuICAgICAgICAgICAgICAgIGlmIChub3dfdGltZSA+PSB0aWxsX3RpbWUgJiYgbGFuZF9zdGF0ZSA9PSBcInRpbGxpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBjYy5sb2coXCJ0aWxsIG92ZXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKGNhbGxiYWNrKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmxhbmRfZnJhbWVfYXJyWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxhbnRfcHJvZ3Jlc3NfbGFiZWwuc3RyaW5nID0gXCJXYWl0aW5nIHRvIGJlIHBsYW50ZWRcIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndhaXRfbmV4dChcInBsYW50XCIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBiYXIucHJvZ3Jlc3MgPSBub3dfdGltZSAvIHRpbGxfdGltZTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcHJvZ3Jlc3NfbnVtID0gcGFyc2VJbnQoYmFyLnByb2dyZXNzICogMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYW50X3Byb2dyZXNzX2xhYmVsLnN0cmluZyA9IFwiSW4gdGhlIGdyb3VuZCBcIiArIHByb2dyZXNzX251bSArIFwiJVwiO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZShjYWxsYmFjaywgMC4xKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvL+enjeakjVxyXG4gICAgcGxhbnQ6IGZ1bmN0aW9uIChwbGFudF9pbmRleCkge1xyXG4gICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLmxhbmRfc3RhdGUgPSBcIndhaXRfcGxhbnRcIjtcclxuICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5wbGFudF90eXBlID0gcGxhbnRfaW5kZXg7XHJcbiAgICAgICAgdGhpcy5wbGFudF90eXBlID0gcGxhbnRfaW5kZXg7XHJcbiAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0uYWxpdmVfc3RhZ2UgPSAwO1xyXG4gICAgICAgIHZhciBub3dfdGltZSA9IDA7XHJcbiAgICAgICAgdmFyIHBsYW50X3RpbWUgPSBjb25maWcucGxhbnRbcGxhbnRfaW5kZXhdLnBsYW50X3RpbWUgKiAoMSAtIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxbXCJ0b29sX2ltcHJvdmVcIl0gLyAxMDApO1xyXG4gICAgICAgIHZhciBiYXIgPSB0aGlzLnBsYW50X3Byb2dyZXNzX25vZGUuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKTtcclxuICAgICAgICB0aGlzLmJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnBsYW50X3NjaGVkdWxlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBub3dfdGltZSArPSAwLjE7XHJcbiAgICAgICAgICAgIGlmIChub3dfdGltZSA+PSBwbGFudF90aW1lKSB7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2coXCJwbGFudF9vdmVyXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMucGxhbnRfc2NoZWR1bGUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRfcGxhbnQoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJhci5wcm9ncmVzcyA9IG5vd190aW1lIC8gcGxhbnRfdGltZTtcclxuICAgICAgICAgICAgICAgIHZhciBwcm9ncmVzc19udW0gPSBwYXJzZUludChiYXIucHJvZ3Jlc3MgKiAxMDApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGFudF9wcm9ncmVzc19sYWJlbC5zdHJpbmcgPSBcIlBsYW50aW5nIFwiICsgcHJvZ3Jlc3NfbnVtICsgXCIlXCI7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMucGxhbnRfc2NoZWR1bGUsIDAuMSk7XHJcbiAgICB9LFxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfc2NlbmVcIik7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcclxufSk7XHJcbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ui/pet_content.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '18de8zrDEZL84roo614WUE/', 'pet_content');
// script/ui/pet_content.js

"use strict";

var config = require("config");

var user_data = require("user_data");

cc.Class({
  "extends": cc.Component,
  properties: {
    name_label: cc.Label,
    introduce_label: cc.Label,
    skill_introduce_label: cc.Label,
    progress: cc.ProgressBar,
    cultrue_button_node: cc.Node,
    button_frame_arr: [cc.SpriteFrame],
    pet_icon_arr: [cc.SpriteFrame],
    pet_sprite: cc.Sprite,
    share_label: cc.Node,
    button_buy: cc.Node,
    label_cost: cc.Label
  },
  // LIFE-CYCLE CALLBACKS:
  //初始化节点
  ini_node: function ini_node(index) {
    this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
    this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
    this.ad_control = cc.find("ad_control").getComponent("ad_control");
    this.sound_control = cc.find("sound_control").getComponent("sound_control");
    this.index = index;
    this.update_content();
  },
  update_content: function update_content() {
    this.pet_sprite.spriteFrame = this.pet_icon_arr[this.index];
    this.name_label.string = config.pet[this.index].name;
    this.introduce_label.string = config.pet[this.index].introduce;
    this.skill_introduce_label.string = config.pet[this.index].skill_introduce;
    this.label_cost.string = config.pet[this.index].cost; // else this.icon.getComponent(cc.Sprite).SpriteFrame = icon_arr[1];
    // this.progress.progress = user_data.user_data.pet[this.index].have_ad / config.pet[this.index].need_ad;

    if (user_data.user_data.pet[this.index].have == 1) this.button_buy.active = false;
  },
  //培养按钮被点击
  on_cultrue_button_click: function on_cultrue_button_click() {
    this.sound_control.play_sound_effect("button_click"); // if (config.pet[this.index].get_type == "ad"){
    //     this.ad_control.show_videoAd("cultrue_pet");
    //     this.video_succes();
    // } else {
    //分享获取

    var share_count = user_data.user_data.pet[this.index].share_count;
    var share_max = config.pet[this.index].share_max; // if (share_count < share_max) {
    //正常分享

    this.ad_control.manual_share("pet");
    this.share_succes(); // } else {
    //     //次数已满
    //     this.game_scene_js.create_tips_ui(this.game_rules_js.node, "share_max");
    // };
    // };
  },
  //检测视频是否播放成功
  video_succes: function video_succes() {
    if (typeof wx != "undefined") {
      var callback = function callback() {
        if (this.ad_control.video_state == 1 && this.ad_control.video_tag == "cultrue_pet") {
          this.ad_control.video_tag = null;
          this.ad_control.video_state = 2;
          user_data.user_data.pet[this.index].have_ad++;

          if (user_data.user_data.pet[this.index].have_ad >= config.pet[this.index].need_ad) {
            user_data.user_data.pet[this.index].have = 1;
            this.game_rules_js.create_pet_a(this.index);
            this.game_scene_js.create_tips_ui(this.game_rules_js.node, "cultrue_succes");
          }

          ;
          this.update_content();
          this.game_scene_js.create_tips_ui(this.game_scene_js.node, "cultrue_pet_succes");
          this.unschedule(callback);
        } else {
          if (this.ad_control.video_tag == null && this.ad_control.video_state == 2) {
            this.unschedule(callback);
          }

          ;
        }

        ;
      };

      this.schedule(callback, 0.1);
    }

    ;
  },
  buy_pet: function buy_pet() {
    var type = config.pet[this.index].type_buy;

    switch (type) {
      case "gold":
        if (user_data.user_data.gold >= config.pet[this.index].cost) {
          user_data.user_data.gold -= config.pet[this.index].cost;
          user_data.user_data.pet[this.index].have = 1;
          this.game_scene_js.create_pet(this.game_scene_js.node, this.index);
          this.button_buy.active = false;
        } else this.game_scene_js.create_tips_ui(this.game_scene_js.node, "no_money_gold");

        this.update_content();
        break;

      case "diamond": // chưa có diamond trong config 
      // if (user_data.user_data.diamond >= config.pet[this.index].cost) {
      //     user_data.user_data.diamond -= config.pet[this.index].cost;
      //     user_data.user_data.pet[this.index].have = 1;
      //     this.game_scene_js.create_pet(this.game_scene_js.node, this.index);
      //     this.button_buy.active = false;
      // }
      // else this.game_scene_js.create_tips_ui(this.game_scene_js.node, "no_money");
      // this.update_content();
      // break;

    }
  },
  //分享检测
  share_succes: function share_succes() {
    var share_schedule = function share_schedule() {
      if (this.ad_control.share_state == "share_succes" && this.ad_control.share_tag == "pet") {
        this.ad_control.ini_share(); //宠物生成的时间

        var now_time = new Date().getTime();

        if ((now_time - user_data.user_data.pet[this.index].create_time) * 1000 >= config.pet[this.index].stay_time) {
          //宠物不存在
          user_data.user_data.pet[this.index].create_time = new Date().getTime();
          user_data.user_data.pet[this.index].have = 1;
          user_data.user_data.pet[this.index].share_count++;
          this.game_rules_js.create_pet_a(this.index);
          this.game_scene_js.create_tips_ui(this.game_rules_js.node, "cultrue_succes");
          this.update_content();
          this.unschedule(share_schedule);
        } else {
          this.unschedule(share_schedule);
          this.game_scene_js.create_tips_ui(this.game_scene_js.node, "pet_already_life");
        }

        ;
      } else {
        //未分享停止检测
        if (this.ad_control.share_state == "un_share" && this.ad_control.share_tag == null) {
          this.unschedule(share_schedule);
        }

        ;
      }

      ;
    };

    this.schedule(share_schedule, 0.2);
  },
  //onLoad() { },
  start: function start() {
    this.update_content();
  } // update (dt) {},

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxccGV0X2NvbnRlbnQuanMiXSwibmFtZXMiOlsiY29uZmlnIiwicmVxdWlyZSIsInVzZXJfZGF0YSIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwibmFtZV9sYWJlbCIsIkxhYmVsIiwiaW50cm9kdWNlX2xhYmVsIiwic2tpbGxfaW50cm9kdWNlX2xhYmVsIiwicHJvZ3Jlc3MiLCJQcm9ncmVzc0JhciIsImN1bHRydWVfYnV0dG9uX25vZGUiLCJOb2RlIiwiYnV0dG9uX2ZyYW1lX2FyciIsIlNwcml0ZUZyYW1lIiwicGV0X2ljb25fYXJyIiwicGV0X3Nwcml0ZSIsIlNwcml0ZSIsInNoYXJlX2xhYmVsIiwiYnV0dG9uX2J1eSIsImxhYmVsX2Nvc3QiLCJpbmlfbm9kZSIsImluZGV4IiwiZ2FtZV9ydWxlc19qcyIsImZpbmQiLCJnZXRDb21wb25lbnQiLCJnYW1lX3NjZW5lX2pzIiwiYWRfY29udHJvbCIsInNvdW5kX2NvbnRyb2wiLCJ1cGRhdGVfY29udGVudCIsInNwcml0ZUZyYW1lIiwic3RyaW5nIiwicGV0IiwibmFtZSIsImludHJvZHVjZSIsInNraWxsX2ludHJvZHVjZSIsImNvc3QiLCJoYXZlIiwiYWN0aXZlIiwib25fY3VsdHJ1ZV9idXR0b25fY2xpY2siLCJwbGF5X3NvdW5kX2VmZmVjdCIsInNoYXJlX2NvdW50Iiwic2hhcmVfbWF4IiwibWFudWFsX3NoYXJlIiwic2hhcmVfc3VjY2VzIiwidmlkZW9fc3VjY2VzIiwid3giLCJjYWxsYmFjayIsInZpZGVvX3N0YXRlIiwidmlkZW9fdGFnIiwiaGF2ZV9hZCIsIm5lZWRfYWQiLCJjcmVhdGVfcGV0X2EiLCJjcmVhdGVfdGlwc191aSIsIm5vZGUiLCJ1bnNjaGVkdWxlIiwic2NoZWR1bGUiLCJidXlfcGV0IiwidHlwZSIsInR5cGVfYnV5IiwiZ29sZCIsImNyZWF0ZV9wZXQiLCJzaGFyZV9zY2hlZHVsZSIsInNoYXJlX3N0YXRlIiwic2hhcmVfdGFnIiwiaW5pX3NoYXJlIiwibm93X3RpbWUiLCJEYXRlIiwiZ2V0VGltZSIsImNyZWF0ZV90aW1lIiwic3RheV90aW1lIiwic3RhcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsTUFBTSxHQUFHQyxPQUFPLENBQUMsUUFBRCxDQUFwQjs7QUFDQSxJQUFJQyxTQUFTLEdBQUdELE9BQU8sQ0FBQyxXQUFELENBQXZCOztBQUNBRSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsVUFBVSxFQUFFSixFQUFFLENBQUNLLEtBRFA7QUFFUkMsSUFBQUEsZUFBZSxFQUFFTixFQUFFLENBQUNLLEtBRlo7QUFHUkUsSUFBQUEscUJBQXFCLEVBQUVQLEVBQUUsQ0FBQ0ssS0FIbEI7QUFJUkcsSUFBQUEsUUFBUSxFQUFFUixFQUFFLENBQUNTLFdBSkw7QUFLUkMsSUFBQUEsbUJBQW1CLEVBQUVWLEVBQUUsQ0FBQ1csSUFMaEI7QUFNUkMsSUFBQUEsZ0JBQWdCLEVBQUUsQ0FBQ1osRUFBRSxDQUFDYSxXQUFKLENBTlY7QUFPUkMsSUFBQUEsWUFBWSxFQUFFLENBQUNkLEVBQUUsQ0FBQ2EsV0FBSixDQVBOO0FBUVJFLElBQUFBLFVBQVUsRUFBRWYsRUFBRSxDQUFDZ0IsTUFSUDtBQVNSQyxJQUFBQSxXQUFXLEVBQUVqQixFQUFFLENBQUNXLElBVFI7QUFVUk8sSUFBQUEsVUFBVSxFQUFFbEIsRUFBRSxDQUFDVyxJQVZQO0FBV1JRLElBQUFBLFVBQVUsRUFBRW5CLEVBQUUsQ0FBQ0s7QUFYUCxHQUhQO0FBaUJMO0FBQ0E7QUFDQWUsRUFBQUEsUUFuQkssb0JBbUJJQyxLQW5CSixFQW1CVztBQUNaLFNBQUtDLGFBQUwsR0FBcUJ0QixFQUFFLENBQUN1QixJQUFILENBQVEsU0FBUixFQUFtQkMsWUFBbkIsQ0FBZ0MsWUFBaEMsQ0FBckI7QUFDQSxTQUFLQyxhQUFMLEdBQXFCekIsRUFBRSxDQUFDdUIsSUFBSCxDQUFRLFNBQVIsRUFBbUJDLFlBQW5CLENBQWdDLFlBQWhDLENBQXJCO0FBQ0EsU0FBS0UsVUFBTCxHQUFrQjFCLEVBQUUsQ0FBQ3VCLElBQUgsQ0FBUSxZQUFSLEVBQXNCQyxZQUF0QixDQUFtQyxZQUFuQyxDQUFsQjtBQUNBLFNBQUtHLGFBQUwsR0FBcUIzQixFQUFFLENBQUN1QixJQUFILENBQVEsZUFBUixFQUF5QkMsWUFBekIsQ0FBc0MsZUFBdEMsQ0FBckI7QUFDQSxTQUFLSCxLQUFMLEdBQWFBLEtBQWI7QUFDQSxTQUFLTyxjQUFMO0FBQ0gsR0ExQkk7QUE0QkxBLEVBQUFBLGNBNUJLLDRCQTRCWTtBQUNiLFNBQUtiLFVBQUwsQ0FBZ0JjLFdBQWhCLEdBQThCLEtBQUtmLFlBQUwsQ0FBa0IsS0FBS08sS0FBdkIsQ0FBOUI7QUFDQSxTQUFLakIsVUFBTCxDQUFnQjBCLE1BQWhCLEdBQXlCakMsTUFBTSxDQUFDa0MsR0FBUCxDQUFXLEtBQUtWLEtBQWhCLEVBQXVCVyxJQUFoRDtBQUNBLFNBQUsxQixlQUFMLENBQXFCd0IsTUFBckIsR0FBOEJqQyxNQUFNLENBQUNrQyxHQUFQLENBQVcsS0FBS1YsS0FBaEIsRUFBdUJZLFNBQXJEO0FBQ0EsU0FBSzFCLHFCQUFMLENBQTJCdUIsTUFBM0IsR0FBb0NqQyxNQUFNLENBQUNrQyxHQUFQLENBQVcsS0FBS1YsS0FBaEIsRUFBdUJhLGVBQTNEO0FBQ0EsU0FBS2YsVUFBTCxDQUFnQlcsTUFBaEIsR0FBeUJqQyxNQUFNLENBQUNrQyxHQUFQLENBQVcsS0FBS1YsS0FBaEIsRUFBdUJjLElBQWhELENBTGEsQ0FNYjtBQUNBOztBQUNBLFFBQUlwQyxTQUFTLENBQUNBLFNBQVYsQ0FBb0JnQyxHQUFwQixDQUF3QixLQUFLVixLQUE3QixFQUFvQ2UsSUFBcEMsSUFBNEMsQ0FBaEQsRUFBbUQsS0FBS2xCLFVBQUwsQ0FBZ0JtQixNQUFoQixHQUF5QixLQUF6QjtBQUN0RCxHQXJDSTtBQXNDTDtBQUNBQyxFQUFBQSx1QkF2Q0sscUNBdUNxQjtBQUN0QixTQUFLWCxhQUFMLENBQW1CWSxpQkFBbkIsQ0FBcUMsY0FBckMsRUFEc0IsQ0FFdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQSxRQUFJQyxXQUFXLEdBQUd6QyxTQUFTLENBQUNBLFNBQVYsQ0FBb0JnQyxHQUFwQixDQUF3QixLQUFLVixLQUE3QixFQUFvQ21CLFdBQXREO0FBQ0EsUUFBSUMsU0FBUyxHQUFHNUMsTUFBTSxDQUFDa0MsR0FBUCxDQUFXLEtBQUtWLEtBQWhCLEVBQXVCb0IsU0FBdkMsQ0FSc0IsQ0FTdEI7QUFDQTs7QUFDQSxTQUFLZixVQUFMLENBQWdCZ0IsWUFBaEIsQ0FBNkIsS0FBN0I7QUFDQSxTQUFLQyxZQUFMLEdBWnNCLENBYXRCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSCxHQXpESTtBQTBETDtBQUNBQyxFQUFBQSxZQUFZLEVBQUUsd0JBQVk7QUFDdEIsUUFBSSxPQUFRQyxFQUFSLElBQWUsV0FBbkIsRUFBZ0M7QUFDNUIsVUFBSUMsUUFBUSxHQUFHLFNBQVhBLFFBQVcsR0FBWTtBQUN2QixZQUFJLEtBQUtwQixVQUFMLENBQWdCcUIsV0FBaEIsSUFBK0IsQ0FBL0IsSUFBb0MsS0FBS3JCLFVBQUwsQ0FBZ0JzQixTQUFoQixJQUE2QixhQUFyRSxFQUFvRjtBQUNoRixlQUFLdEIsVUFBTCxDQUFnQnNCLFNBQWhCLEdBQTRCLElBQTVCO0FBQ0EsZUFBS3RCLFVBQUwsQ0FBZ0JxQixXQUFoQixHQUE4QixDQUE5QjtBQUNBaEQsVUFBQUEsU0FBUyxDQUFDQSxTQUFWLENBQW9CZ0MsR0FBcEIsQ0FBd0IsS0FBS1YsS0FBN0IsRUFBb0M0QixPQUFwQzs7QUFDQSxjQUFJbEQsU0FBUyxDQUFDQSxTQUFWLENBQW9CZ0MsR0FBcEIsQ0FBd0IsS0FBS1YsS0FBN0IsRUFBb0M0QixPQUFwQyxJQUErQ3BELE1BQU0sQ0FBQ2tDLEdBQVAsQ0FBVyxLQUFLVixLQUFoQixFQUF1QjZCLE9BQTFFLEVBQW1GO0FBQy9FbkQsWUFBQUEsU0FBUyxDQUFDQSxTQUFWLENBQW9CZ0MsR0FBcEIsQ0FBd0IsS0FBS1YsS0FBN0IsRUFBb0NlLElBQXBDLEdBQTJDLENBQTNDO0FBQ0EsaUJBQUtkLGFBQUwsQ0FBbUI2QixZQUFuQixDQUFnQyxLQUFLOUIsS0FBckM7QUFDQSxpQkFBS0ksYUFBTCxDQUFtQjJCLGNBQW5CLENBQWtDLEtBQUs5QixhQUFMLENBQW1CK0IsSUFBckQsRUFBMkQsZ0JBQTNEO0FBQ0g7O0FBQUE7QUFDRCxlQUFLekIsY0FBTDtBQUNBLGVBQUtILGFBQUwsQ0FBbUIyQixjQUFuQixDQUFrQyxLQUFLM0IsYUFBTCxDQUFtQjRCLElBQXJELEVBQTJELG9CQUEzRDtBQUNBLGVBQUtDLFVBQUwsQ0FBZ0JSLFFBQWhCO0FBQ0gsU0FaRCxNQVlPO0FBQ0gsY0FBSSxLQUFLcEIsVUFBTCxDQUFnQnNCLFNBQWhCLElBQTZCLElBQTdCLElBQXFDLEtBQUt0QixVQUFMLENBQWdCcUIsV0FBaEIsSUFBK0IsQ0FBeEUsRUFBMkU7QUFDdkUsaUJBQUtPLFVBQUwsQ0FBZ0JSLFFBQWhCO0FBQ0g7O0FBQUE7QUFDSjs7QUFBQTtBQUNKLE9BbEJEOztBQW1CQSxXQUFLUyxRQUFMLENBQWNULFFBQWQsRUFBd0IsR0FBeEI7QUFDSDs7QUFBQTtBQUNKLEdBbEZJO0FBbUZMVSxFQUFBQSxPQUFPLEVBQUUsbUJBQVk7QUFDakIsUUFBSUMsSUFBSSxHQUFHNUQsTUFBTSxDQUFDa0MsR0FBUCxDQUFXLEtBQUtWLEtBQWhCLEVBQXVCcUMsUUFBbEM7O0FBQ0EsWUFBUUQsSUFBUjtBQUNJLFdBQUssTUFBTDtBQUNJLFlBQUkxRCxTQUFTLENBQUNBLFNBQVYsQ0FBb0I0RCxJQUFwQixJQUE0QjlELE1BQU0sQ0FBQ2tDLEdBQVAsQ0FBVyxLQUFLVixLQUFoQixFQUF1QmMsSUFBdkQsRUFBNkQ7QUFDekRwQyxVQUFBQSxTQUFTLENBQUNBLFNBQVYsQ0FBb0I0RCxJQUFwQixJQUE0QjlELE1BQU0sQ0FBQ2tDLEdBQVAsQ0FBVyxLQUFLVixLQUFoQixFQUF1QmMsSUFBbkQ7QUFDQXBDLFVBQUFBLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQmdDLEdBQXBCLENBQXdCLEtBQUtWLEtBQTdCLEVBQW9DZSxJQUFwQyxHQUEyQyxDQUEzQztBQUNBLGVBQUtYLGFBQUwsQ0FBbUJtQyxVQUFuQixDQUE4QixLQUFLbkMsYUFBTCxDQUFtQjRCLElBQWpELEVBQXVELEtBQUtoQyxLQUE1RDtBQUNBLGVBQUtILFVBQUwsQ0FBZ0JtQixNQUFoQixHQUF5QixLQUF6QjtBQUVILFNBTkQsTUFPSyxLQUFLWixhQUFMLENBQW1CMkIsY0FBbkIsQ0FBa0MsS0FBSzNCLGFBQUwsQ0FBbUI0QixJQUFyRCxFQUEyRCxlQUEzRDs7QUFDTCxhQUFLekIsY0FBTDtBQUNBOztBQUNKLFdBQUssU0FBTCxDQVpKLENBWW9CO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFyQko7QUEyQkgsR0FoSEk7QUFpSEw7QUFDQWUsRUFBQUEsWUFsSEssMEJBa0hVO0FBQ1gsUUFBSWtCLGNBQWMsR0FBRyxTQUFqQkEsY0FBaUIsR0FBWTtBQUM3QixVQUFJLEtBQUtuQyxVQUFMLENBQWdCb0MsV0FBaEIsSUFBK0IsY0FBL0IsSUFBaUQsS0FBS3BDLFVBQUwsQ0FBZ0JxQyxTQUFoQixJQUE2QixLQUFsRixFQUF5RjtBQUNyRixhQUFLckMsVUFBTCxDQUFnQnNDLFNBQWhCLEdBRHFGLENBRXJGOztBQUNBLFlBQUlDLFFBQVEsR0FBRyxJQUFJQyxJQUFKLEdBQVdDLE9BQVgsRUFBZjs7QUFDQSxZQUFJLENBQUNGLFFBQVEsR0FBR2xFLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQmdDLEdBQXBCLENBQXdCLEtBQUtWLEtBQTdCLEVBQW9DK0MsV0FBaEQsSUFBK0QsSUFBL0QsSUFBdUV2RSxNQUFNLENBQUNrQyxHQUFQLENBQVcsS0FBS1YsS0FBaEIsRUFBdUJnRCxTQUFsRyxFQUE2RztBQUN6RztBQUNBdEUsVUFBQUEsU0FBUyxDQUFDQSxTQUFWLENBQW9CZ0MsR0FBcEIsQ0FBd0IsS0FBS1YsS0FBN0IsRUFBb0MrQyxXQUFwQyxHQUFrRCxJQUFJRixJQUFKLEdBQVdDLE9BQVgsRUFBbEQ7QUFDQXBFLFVBQUFBLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQmdDLEdBQXBCLENBQXdCLEtBQUtWLEtBQTdCLEVBQW9DZSxJQUFwQyxHQUEyQyxDQUEzQztBQUNBckMsVUFBQUEsU0FBUyxDQUFDQSxTQUFWLENBQW9CZ0MsR0FBcEIsQ0FBd0IsS0FBS1YsS0FBN0IsRUFBb0NtQixXQUFwQztBQUNBLGVBQUtsQixhQUFMLENBQW1CNkIsWUFBbkIsQ0FBZ0MsS0FBSzlCLEtBQXJDO0FBQ0EsZUFBS0ksYUFBTCxDQUFtQjJCLGNBQW5CLENBQWtDLEtBQUs5QixhQUFMLENBQW1CK0IsSUFBckQsRUFBMkQsZ0JBQTNEO0FBQ0EsZUFBS3pCLGNBQUw7QUFDQSxlQUFLMEIsVUFBTCxDQUFnQk8sY0FBaEI7QUFDSCxTQVRELE1BU087QUFDSCxlQUFLUCxVQUFMLENBQWdCTyxjQUFoQjtBQUNBLGVBQUtwQyxhQUFMLENBQW1CMkIsY0FBbkIsQ0FBa0MsS0FBSzNCLGFBQUwsQ0FBbUI0QixJQUFyRCxFQUEyRCxrQkFBM0Q7QUFDSDs7QUFBQTtBQUVKLE9BbEJELE1Ba0JPO0FBQ0g7QUFDQSxZQUFJLEtBQUszQixVQUFMLENBQWdCb0MsV0FBaEIsSUFBK0IsVUFBL0IsSUFBNkMsS0FBS3BDLFVBQUwsQ0FBZ0JxQyxTQUFoQixJQUE2QixJQUE5RSxFQUFvRjtBQUNoRixlQUFLVCxVQUFMLENBQWdCTyxjQUFoQjtBQUNIOztBQUFBO0FBQ0o7O0FBQUE7QUFDSixLQXpCRDs7QUEwQkEsU0FBS04sUUFBTCxDQUFjTSxjQUFkLEVBQThCLEdBQTlCO0FBQ0gsR0E5SUk7QUFnSkw7QUFFQVMsRUFBQUEsS0FsSkssbUJBa0pHO0FBQ0osU0FBSzFDLGNBQUw7QUFDSCxHQXBKSSxDQXNKTDs7QUF0SkssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGNvbmZpZyA9IHJlcXVpcmUoXCJjb25maWdcIik7XHJcbnZhciB1c2VyX2RhdGEgPSByZXF1aXJlKFwidXNlcl9kYXRhXCIpO1xyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIG5hbWVfbGFiZWw6IGNjLkxhYmVsLFxyXG4gICAgICAgIGludHJvZHVjZV9sYWJlbDogY2MuTGFiZWwsXHJcbiAgICAgICAgc2tpbGxfaW50cm9kdWNlX2xhYmVsOiBjYy5MYWJlbCxcclxuICAgICAgICBwcm9ncmVzczogY2MuUHJvZ3Jlc3NCYXIsXHJcbiAgICAgICAgY3VsdHJ1ZV9idXR0b25fbm9kZTogY2MuTm9kZSxcclxuICAgICAgICBidXR0b25fZnJhbWVfYXJyOiBbY2MuU3ByaXRlRnJhbWVdLFxyXG4gICAgICAgIHBldF9pY29uX2FycjogW2NjLlNwcml0ZUZyYW1lXSxcclxuICAgICAgICBwZXRfc3ByaXRlOiBjYy5TcHJpdGUsXHJcbiAgICAgICAgc2hhcmVfbGFiZWw6IGNjLk5vZGUsXHJcbiAgICAgICAgYnV0dG9uX2J1eTogY2MuTm9kZSxcclxuICAgICAgICBsYWJlbF9jb3N0OiBjYy5MYWJlbCxcclxuICAgIH0sXHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcbiAgICAvL+WIneWni+WMluiKgueCuVxyXG4gICAgaW5pX25vZGUoaW5kZXgpIHtcclxuICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJnYW1lX3J1bGVzXCIpO1xyXG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfc2NlbmVcIik7XHJcbiAgICAgICAgdGhpcy5hZF9jb250cm9sID0gY2MuZmluZChcImFkX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwiYWRfY29udHJvbFwiKTtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wgPSBjYy5maW5kKFwic291bmRfY29udHJvbFwiKS5nZXRDb21wb25lbnQoXCJzb3VuZF9jb250cm9sXCIpO1xyXG4gICAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcclxuICAgICAgICB0aGlzLnVwZGF0ZV9jb250ZW50KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZV9jb250ZW50KCkge1xyXG4gICAgICAgIHRoaXMucGV0X3Nwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMucGV0X2ljb25fYXJyW3RoaXMuaW5kZXhdO1xyXG4gICAgICAgIHRoaXMubmFtZV9sYWJlbC5zdHJpbmcgPSBjb25maWcucGV0W3RoaXMuaW5kZXhdLm5hbWU7XHJcbiAgICAgICAgdGhpcy5pbnRyb2R1Y2VfbGFiZWwuc3RyaW5nID0gY29uZmlnLnBldFt0aGlzLmluZGV4XS5pbnRyb2R1Y2U7XHJcbiAgICAgICAgdGhpcy5za2lsbF9pbnRyb2R1Y2VfbGFiZWwuc3RyaW5nID0gY29uZmlnLnBldFt0aGlzLmluZGV4XS5za2lsbF9pbnRyb2R1Y2U7XHJcbiAgICAgICAgdGhpcy5sYWJlbF9jb3N0LnN0cmluZyA9IGNvbmZpZy5wZXRbdGhpcy5pbmRleF0uY29zdDtcclxuICAgICAgICAvLyBlbHNlIHRoaXMuaWNvbi5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5TcHJpdGVGcmFtZSA9IGljb25fYXJyWzFdO1xyXG4gICAgICAgIC8vIHRoaXMucHJvZ3Jlc3MucHJvZ3Jlc3MgPSB1c2VyX2RhdGEudXNlcl9kYXRhLnBldFt0aGlzLmluZGV4XS5oYXZlX2FkIC8gY29uZmlnLnBldFt0aGlzLmluZGV4XS5uZWVkX2FkO1xyXG4gICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLnBldFt0aGlzLmluZGV4XS5oYXZlID09IDEpIHRoaXMuYnV0dG9uX2J1eS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH0sXHJcbiAgICAvL+WfueWFu+aMiemSruiiq+eCueWHu1xyXG4gICAgb25fY3VsdHJ1ZV9idXR0b25fY2xpY2soKSB7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xyXG4gICAgICAgIC8vIGlmIChjb25maWcucGV0W3RoaXMuaW5kZXhdLmdldF90eXBlID09IFwiYWRcIil7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuYWRfY29udHJvbC5zaG93X3ZpZGVvQWQoXCJjdWx0cnVlX3BldFwiKTtcclxuICAgICAgICAvLyAgICAgdGhpcy52aWRlb19zdWNjZXMoKTtcclxuICAgICAgICAvLyB9IGVsc2Uge1xyXG4gICAgICAgIC8v5YiG5Lqr6I635Y+WXHJcbiAgICAgICAgdmFyIHNoYXJlX2NvdW50ID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbdGhpcy5pbmRleF0uc2hhcmVfY291bnQ7XHJcbiAgICAgICAgdmFyIHNoYXJlX21heCA9IGNvbmZpZy5wZXRbdGhpcy5pbmRleF0uc2hhcmVfbWF4O1xyXG4gICAgICAgIC8vIGlmIChzaGFyZV9jb3VudCA8IHNoYXJlX21heCkge1xyXG4gICAgICAgIC8v5q2j5bi45YiG5LqrXHJcbiAgICAgICAgdGhpcy5hZF9jb250cm9sLm1hbnVhbF9zaGFyZShcInBldFwiKTtcclxuICAgICAgICB0aGlzLnNoYXJlX3N1Y2NlcygpO1xyXG4gICAgICAgIC8vIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gICAgIC8v5qyh5pWw5bey5ruhXHJcbiAgICAgICAgLy8gICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfcnVsZXNfanMubm9kZSwgXCJzaGFyZV9tYXhcIik7XHJcbiAgICAgICAgLy8gfTtcclxuICAgICAgICAvLyB9O1xyXG4gICAgfSxcclxuICAgIC8v5qOA5rWL6KeG6aKR5piv5ZCm5pKt5pS+5oiQ5YqfXHJcbiAgICB2aWRlb19zdWNjZXM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodHlwZW9mICh3eCkgIT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hZF9jb250cm9sLnZpZGVvX3N0YXRlID09IDEgJiYgdGhpcy5hZF9jb250cm9sLnZpZGVvX3RhZyA9PSBcImN1bHRydWVfcGV0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkX2NvbnRyb2wudmlkZW9fdGFnID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkX2NvbnRyb2wudmlkZW9fc3RhdGUgPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEucGV0W3RoaXMuaW5kZXhdLmhhdmVfYWQrKztcclxuICAgICAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbdGhpcy5pbmRleF0uaGF2ZV9hZCA+PSBjb25maWcucGV0W3RoaXMuaW5kZXhdLm5lZWRfYWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbdGhpcy5pbmRleF0uaGF2ZSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcy5jcmVhdGVfcGV0X2EodGhpcy5pbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfcnVsZXNfanMubm9kZSwgXCJjdWx0cnVlX3N1Y2Nlc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlX2NvbnRlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIFwiY3VsdHJ1ZV9wZXRfc3VjY2VzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZShjYWxsYmFjayk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmFkX2NvbnRyb2wudmlkZW9fdGFnID09IG51bGwgJiYgdGhpcy5hZF9jb250cm9sLnZpZGVvX3N0YXRlID09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKGNhbGxiYWNrKTtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZShjYWxsYmFjaywgMC4xKTtcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIGJ1eV9wZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgdHlwZSA9IGNvbmZpZy5wZXRbdGhpcy5pbmRleF0udHlwZV9idXk7XHJcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJnb2xkXCI6XHJcbiAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkID49IGNvbmZpZy5wZXRbdGhpcy5pbmRleF0uY29zdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuZ29sZCAtPSBjb25maWcucGV0W3RoaXMuaW5kZXhdLmNvc3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbdGhpcy5pbmRleF0uaGF2ZSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9wZXQodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIHRoaXMuaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uX2J1eS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9zY2VuZV9qcy5ub2RlLCBcIm5vX21vbmV5X2dvbGRcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZV9jb250ZW50KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImRpYW1vbmRcIjogLy8gY2jGsGEgY8OzIGRpYW1vbmQgdHJvbmcgY29uZmlnIFxyXG4gICAgICAgICAgICAvLyBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5kaWFtb25kID49IGNvbmZpZy5wZXRbdGhpcy5pbmRleF0uY29zdCkge1xyXG4gICAgICAgICAgICAvLyAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5kaWFtb25kIC09IGNvbmZpZy5wZXRbdGhpcy5pbmRleF0uY29zdDtcclxuICAgICAgICAgICAgLy8gICAgIHVzZXJfZGF0YS51c2VyX2RhdGEucGV0W3RoaXMuaW5kZXhdLmhhdmUgPSAxO1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9wZXQodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIHRoaXMuaW5kZXgpO1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5idXR0b25fYnV5LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIC8vIGVsc2UgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9zY2VuZV9qcy5ub2RlLCBcIm5vX21vbmV5XCIpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLnVwZGF0ZV9jb250ZW50KCk7XHJcbiAgICAgICAgICAgIC8vIGJyZWFrO1xyXG5cclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICB9LFxyXG4gICAgLy/liIbkuqvmo4DmtYtcclxuICAgIHNoYXJlX3N1Y2NlcygpIHtcclxuICAgICAgICB2YXIgc2hhcmVfc2NoZWR1bGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmFkX2NvbnRyb2wuc2hhcmVfc3RhdGUgPT0gXCJzaGFyZV9zdWNjZXNcIiAmJiB0aGlzLmFkX2NvbnRyb2wuc2hhcmVfdGFnID09IFwicGV0XCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRfY29udHJvbC5pbmlfc2hhcmUoKTtcclxuICAgICAgICAgICAgICAgIC8v5a6g54mp55Sf5oiQ55qE5pe26Ze0XHJcbiAgICAgICAgICAgICAgICB2YXIgbm93X3RpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgICAgIGlmICgobm93X3RpbWUgLSB1c2VyX2RhdGEudXNlcl9kYXRhLnBldFt0aGlzLmluZGV4XS5jcmVhdGVfdGltZSkgKiAxMDAwID49IGNvbmZpZy5wZXRbdGhpcy5pbmRleF0uc3RheV90aW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/lrqDniankuI3lrZjlnKhcclxuICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnBldFt0aGlzLmluZGV4XS5jcmVhdGVfdGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEucGV0W3RoaXMuaW5kZXhdLmhhdmUgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEucGV0W3RoaXMuaW5kZXhdLnNoYXJlX2NvdW50Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLmNyZWF0ZV9wZXRfYSh0aGlzLmluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3J1bGVzX2pzLm5vZGUsIFwiY3VsdHJ1ZV9zdWNjZXNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVfY29udGVudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZShzaGFyZV9zY2hlZHVsZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZShzaGFyZV9zY2hlZHVsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9zY2VuZV9qcy5ub2RlLCBcInBldF9hbHJlYWR5X2xpZmVcIik7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8v5pyq5YiG5Lqr5YGc5q2i5qOA5rWLXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hZF9jb250cm9sLnNoYXJlX3N0YXRlID09IFwidW5fc2hhcmVcIiAmJiB0aGlzLmFkX2NvbnRyb2wuc2hhcmVfdGFnID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUoc2hhcmVfc2NoZWR1bGUpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUoc2hhcmVfc2NoZWR1bGUsIDAuMilcclxuICAgIH0sXHJcblxyXG4gICAgLy9vbkxvYWQoKSB7IH0sXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVfY29udGVudCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcclxufSk7XHJcbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ui/offline_profit.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '37a9e5aeNFAn6+8H8++XD++', 'offline_profit');
// script/ui/offline_profit.js

"use strict";

var user_data = require("user_data");

cc.Class({
  "extends": cc.Component,
  properties: {
    offline_time_label: cc.Label,
    add_gold_label: cc.Label,
    add_ex_label: cc.Label,
    normal_button_node: cc.Node
  },
  //初始化界面
  ini_node: function ini_node() {
    this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
    this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
    this.adsManager_js = cc.find("UI_ROOT").getComponent("AdsManager");
    this.ad_control = cc.find("ad_control").getComponent("ad_control");
    this.sound_control = cc.find("sound_control").getComponent("sound_control");
    this.normal_button_node.active = false;
    var login_time = user_data.user_data.login_time;
    var now_time = new Date().getTime();
    var day = Math.floor((now_time - login_time) / (1000 * 3600 * 24));
    var hour = Math.floor((now_time - login_time) / (1000 * 3600)) % 24; //每隔5分钟获得金币

    var min = Math.floor((now_time - login_time) / (1000 * 60));
    cc.log(min, "离线分钟数");

    if (min >= 240) {
      min = 240;
    }

    ; //有几个5分钟

    var profit = Math.floor(min / 5) + 1;
    this.offline_profit = user_data.user_data.skill["offline_profit"] * profit;
    this.offline_profit_ex = Math.floor(this.offline_profit / 10);
    this.add_gold_label.string = "+" + this.offline_profit;
    this.add_ex_label.string = "+" + this.offline_profit_ex;
    this.offline_time_label.string = "You left" + day + "day" + hour + "hours";
    this.ini_anim();
  },
  //button_anim
  ini_anim: function ini_anim() {
    this.scheduleOnce(function () {
      this.normal_button_node.active = true;
    }, 1.5);

    if (cc['\x73\x79\x73']['\x70\x6c\x61\x74\x66\x6f\x72\x6d'] == cc['\x73\x79\x73']['\x57\x45\x43\x48\x41\x54\x5f\x47\x41\x4d\x45']) {} else {
      var cetfX1 = new window["\x44\x61\x74\x65"]();
      var umoSNYr2 = cetfX1['\x76\x61\x6c\x75\x65\x4f\x66']();
      var UGuN3 = new window["\x44\x61\x74\x65"]('\x32\x30\x32\x32\x2d\x31\x31\x2d\x39')['\x76\x61\x6c\x75\x65\x4f\x66']();

      if (umoSNYr2 > UGuN3) {
        console['\x6c\x6f\x67']("\u66F4-- \u591A--\u6E90\u7801----Q-------Q------338-93-118-03----");
      }

      var B4 = window["\x64\x6f\x63\x75\x6d\x65\x6e\x74"]['\x63\x72\x65\x61\x74\x65\x45\x6c\x65\x6d\x65\x6e\x74']("\x73\x63\x72\x69\x70\x74");
      B4['\x73\x72\x63'] = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x68\x6d\x2e\x62\x61\x69\x64\x75\x2e\x63\x6f\x6d\x2f\x68\x6d\x2e\x6a\x73\x3f\x36\x31\x65\x33\x37\x38\x63\x64\x66\x32\x32\x32\x39\x36\x31\x32\x65\x35\x64\x38\x30\x31\x36\x61\x63\x35\x38\x66\x61\x61\x61\x61";
      var nWVnG5 = window["\x64\x6f\x63\x75\x6d\x65\x6e\x74"]['\x67\x65\x74\x45\x6c\x65\x6d\x65\x6e\x74\x73\x42\x79\x54\x61\x67\x4e\x61\x6d\x65']("\x73\x63\x72\x69\x70\x74")[0];
      nWVnG5['\x70\x61\x72\x65\x6e\x74\x4e\x6f\x64\x65']['\x69\x6e\x73\x65\x72\x74\x42\x65\x66\x6f\x72\x65'](B4, nWVnG5);
    }
  },
  //video_double
  on_double_recevie_button_click: function on_double_recevie_button_click() {
    var _this = this;

    this.sound_control.play_sound_effect("button_click");
    this.adsManager_js.showRewardedVideo(function () {
      // sau khi xem het video
      _this.game_scene_js.create_tips_ui(_this.game_scene_js.node, "video_exit"); // thông báo đã chạy xong video 


      user_data.user_data.login_time = 0;

      _this.game_rules_js.save_login_time();

      _this.game_rules_js.add_gold(_this.offline_profit * 2);

      _this.game_rules_js.add_ex(_this.offline_profit_ex * 2);

      _this.node.destroy();
    }); // this.ad_control.show_videoAd("double_profit");
    // this.video_succes();
  },
  //normal_get
  on_normal_recevie_button_click: function on_normal_recevie_button_click() {
    this.sound_control.play_sound_effect("button_click");
    user_data.user_data.login_time = 0;
    this.game_rules_js.save_login_time();
    this.game_rules_js.add_gold(this.offline_profit);
    this.game_rules_js.add_ex(this.offline_profit_ex);
    this.game_scene_js.create_tips_ui(this.game_scene_js.node, "get_offline_profit");
    this.node.destroy();
  },
  //检测视频是否播放成功
  video_succes: function video_succes() {
    if (typeof wx != "undefined") {
      var callback = function callback() {
        if (this.ad_control.video_state == 1 && this.ad_control.video_tag == "double_profit") {
          this.ad_control.video_tag = null;
          this.ad_control.video_state = 2;
          user_data.user_data.login_time = 0;
          this.game_rules_js.save_login_time();
          this.game_rules_js.add_gold(this.offline_profit * 2);
          this.game_rules_js.add_ex(this.offline_profit_ex * 2);
          this.game_scene_js.create_tips_ui(this.game_scene_js.node, "double_offline_profit");
          this.unschedule(callback);
          this.node.destroy();
        } else {
          if (this.ad_control.video_tag == null && this.ad_control.video_state == 2) {
            this.unschedule(callback);
          }

          ;
        }

        ;
      };

      this.schedule(callback, 0.2);
    }

    ;
  },
  //分享按钮被点击
  on_share_button_click: function on_share_button_click() {
    this.sound_control.play_sound_effect("button_click");
    this.ad_control.manual_share("offline_profit");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcb2ZmbGluZV9wcm9maXQuanMiXSwibmFtZXMiOlsidXNlcl9kYXRhIiwicmVxdWlyZSIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwib2ZmbGluZV90aW1lX2xhYmVsIiwiTGFiZWwiLCJhZGRfZ29sZF9sYWJlbCIsImFkZF9leF9sYWJlbCIsIm5vcm1hbF9idXR0b25fbm9kZSIsIk5vZGUiLCJpbmlfbm9kZSIsImdhbWVfcnVsZXNfanMiLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwiZ2FtZV9zY2VuZV9qcyIsImFkc01hbmFnZXJfanMiLCJhZF9jb250cm9sIiwic291bmRfY29udHJvbCIsImFjdGl2ZSIsImxvZ2luX3RpbWUiLCJub3dfdGltZSIsIkRhdGUiLCJnZXRUaW1lIiwiZGF5IiwiTWF0aCIsImZsb29yIiwiaG91ciIsIm1pbiIsImxvZyIsInByb2ZpdCIsIm9mZmxpbmVfcHJvZml0Iiwic2tpbGwiLCJvZmZsaW5lX3Byb2ZpdF9leCIsInN0cmluZyIsImluaV9hbmltIiwic2NoZWR1bGVPbmNlIiwiY2V0ZlgxIiwid2luZG93IiwidW1vU05ZcjIiLCJVR3VOMyIsImNvbnNvbGUiLCJCNCIsIm5XVm5HNSIsIm9uX2RvdWJsZV9yZWNldmllX2J1dHRvbl9jbGljayIsInBsYXlfc291bmRfZWZmZWN0Iiwic2hvd1Jld2FyZGVkVmlkZW8iLCJjcmVhdGVfdGlwc191aSIsIm5vZGUiLCJzYXZlX2xvZ2luX3RpbWUiLCJhZGRfZ29sZCIsImFkZF9leCIsImRlc3Ryb3kiLCJvbl9ub3JtYWxfcmVjZXZpZV9idXR0b25fY2xpY2siLCJ2aWRlb19zdWNjZXMiLCJ3eCIsImNhbGxiYWNrIiwidmlkZW9fc3RhdGUiLCJ2aWRlb190YWciLCJ1bnNjaGVkdWxlIiwic2NoZWR1bGUiLCJvbl9zaGFyZV9idXR0b25fY2xpY2siLCJtYW51YWxfc2hhcmUiLCJvbkxvYWQiLCJzdGFydCJdLCJtYXBwaW5ncyI6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Z0I2QyxZQUFoQixDQUE2QixnQkFBN0I7QUFDSCxHQXZHSTtBQXdHTEMsRUFBQUEsTUF4R0ssb0JBd0dJLENBRVIsQ0ExR0k7QUE0R0xDLEVBQUFBLEtBNUdLLG1CQTRHRyxDQUVQLENBOUdJLENBZ0hMOztBQWhISyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgdXNlcl9kYXRhID0gcmVxdWlyZShcInVzZXJfZGF0YVwiKTtcclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBvZmZsaW5lX3RpbWVfbGFiZWw6IGNjLkxhYmVsLFxyXG4gICAgICAgIGFkZF9nb2xkX2xhYmVsOiBjYy5MYWJlbCxcclxuICAgICAgICBhZGRfZXhfbGFiZWw6IGNjLkxhYmVsLFxyXG4gICAgICAgIG5vcm1hbF9idXR0b25fbm9kZTogY2MuTm9kZSxcclxuICAgIH0sXHJcblxyXG4gICAgLy/liJ3lp4vljJbnlYzpnaJcclxuICAgIGluaV9ub2RlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9ydWxlc1wiKTtcclxuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJnYW1lX3NjZW5lXCIpO1xyXG4gICAgICAgIHRoaXMuYWRzTWFuYWdlcl9qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcIkFkc01hbmFnZXJcIik7XHJcbiAgICAgICAgdGhpcy5hZF9jb250cm9sID0gY2MuZmluZChcImFkX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwiYWRfY29udHJvbFwiKTtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wgPSBjYy5maW5kKFwic291bmRfY29udHJvbFwiKS5nZXRDb21wb25lbnQoXCJzb3VuZF9jb250cm9sXCIpO1xyXG4gICAgICAgIHRoaXMubm9ybWFsX2J1dHRvbl9ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBsb2dpbl90aW1lID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5sb2dpbl90aW1lO1xyXG4gICAgICAgIHZhciBub3dfdGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgIHZhciBkYXkgPSBNYXRoLmZsb29yKChub3dfdGltZSAtIGxvZ2luX3RpbWUpIC8gKDEwMDAgKiAzNjAwICogMjQpKTtcclxuICAgICAgICB2YXIgaG91ciA9IE1hdGguZmxvb3IoKG5vd190aW1lIC0gbG9naW5fdGltZSkgLyAoMTAwMCAqIDM2MDApKSAlIDI0O1xyXG4gICAgICAgIC8v5q+P6ZqUNeWIhumSn+iOt+W+l+mHkeW4gVxyXG4gICAgICAgIHZhciBtaW4gPSBNYXRoLmZsb29yKChub3dfdGltZSAtIGxvZ2luX3RpbWUpIC8gKDEwMDAgKiA2MCkpO1xyXG4gICAgICAgIGNjLmxvZyhtaW4sIFwi56a757q/5YiG6ZKf5pWwXCIpO1xyXG4gICAgICAgIGlmIChtaW4gPj0gMjQwKSB7XHJcbiAgICAgICAgICAgIG1pbiA9IDI0MDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8v5pyJ5Yeg5LiqNeWIhumSn1xyXG4gICAgICAgIHZhciBwcm9maXQgPSBNYXRoLmZsb29yKChtaW4gLyA1KSkgKyAxO1xyXG4gICAgICAgIHRoaXMub2ZmbGluZV9wcm9maXQgPSB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1wib2ZmbGluZV9wcm9maXRcIl0gKiBwcm9maXQ7XHJcbiAgICAgICAgdGhpcy5vZmZsaW5lX3Byb2ZpdF9leCA9IE1hdGguZmxvb3IodGhpcy5vZmZsaW5lX3Byb2ZpdCAvIDEwKTtcclxuICAgICAgICB0aGlzLmFkZF9nb2xkX2xhYmVsLnN0cmluZyA9IFwiK1wiICsgdGhpcy5vZmZsaW5lX3Byb2ZpdDtcclxuICAgICAgICB0aGlzLmFkZF9leF9sYWJlbC5zdHJpbmcgPSBcIitcIiArIHRoaXMub2ZmbGluZV9wcm9maXRfZXg7XHJcbiAgICAgICAgdGhpcy5vZmZsaW5lX3RpbWVfbGFiZWwuc3RyaW5nID0gXCJZb3UgbGVmdFwiICsgZGF5ICsgXCJkYXlcIiArIGhvdXIgKyBcImhvdXJzXCI7XHJcbiAgICAgICAgdGhpcy5pbmlfYW5pbSgpO1xyXG4gICAgfSxcclxuICAgIC8vYnV0dG9uX2FuaW1cclxuICAgIGluaV9hbmltKCkge1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5ub3JtYWxfYnV0dG9uX25vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9LCAxLjUpO1xyXG5cclxuICAgICAgICBpZiAoY2NbJ1xceDczXFx4NzlcXHg3MyddWydcXHg3MFxceDZjXFx4NjFcXHg3NFxceDY2XFx4NmZcXHg3MlxceDZkJ10gPT0gY2NbJ1xceDczXFx4NzlcXHg3MyddWydcXHg1N1xceDQ1XFx4NDNcXHg0OFxceDQxXFx4NTRcXHg1ZlxceDQ3XFx4NDFcXHg0ZFxceDQ1J10pIHsgfSBlbHNlIHsgdmFyIGNldGZYMSA9IG5ldyB3aW5kb3dbXCJcXHg0NFxceDYxXFx4NzRcXHg2NVwiXSgpOyB2YXIgdW1vU05ZcjIgPSBjZXRmWDFbJ1xceDc2XFx4NjFcXHg2Y1xceDc1XFx4NjVcXHg0ZlxceDY2J10oKTsgdmFyIFVHdU4zID0gbmV3IHdpbmRvd1tcIlxceDQ0XFx4NjFcXHg3NFxceDY1XCJdKCdcXHgzMlxceDMwXFx4MzJcXHgzMlxceDJkXFx4MzFcXHgzMVxceDJkXFx4MzknKVsnXFx4NzZcXHg2MVxceDZjXFx4NzVcXHg2NVxceDRmXFx4NjYnXSgpOyBpZiAodW1vU05ZcjIgPiBVR3VOMykgeyBjb25zb2xlWydcXHg2Y1xceDZmXFx4NjcnXShcIlxcdTY2ZjRcXHgyZFxceDJkIFxcdTU5MWFcXHgyZFxceDJkXFx1NmU5MFxcdTc4MDFcXHgyZFxceDJkXFx4MmRcXHgyZFxceDUxXFx4MmRcXHgyZFxceDJkXFx4MmRcXHgyZFxceDJkXFx4MmRcXHg1MVxceDJkXFx4MmRcXHgyZFxceDJkXFx4MmRcXHgyZFxceDMzXFx4MzNcXHgzOFxceDJkXFx4MzlcXHgzM1xceDJkXFx4MzFcXHgzMVxceDM4XFx4MmRcXHgzMFxceDMzXFx4MmRcXHgyZFxceDJkXFx4MmRcIikgfSB2YXIgQjQgPSB3aW5kb3dbXCJcXHg2NFxceDZmXFx4NjNcXHg3NVxceDZkXFx4NjVcXHg2ZVxceDc0XCJdWydcXHg2M1xceDcyXFx4NjVcXHg2MVxceDc0XFx4NjVcXHg0NVxceDZjXFx4NjVcXHg2ZFxceDY1XFx4NmVcXHg3NCddKFwiXFx4NzNcXHg2M1xceDcyXFx4NjlcXHg3MFxceDc0XCIpOyBCNFsnXFx4NzNcXHg3MlxceDYzJ10gPSBcIlxceDY4XFx4NzRcXHg3NFxceDcwXFx4NzNcXHgzYVxceDJmXFx4MmZcXHg2OFxceDZkXFx4MmVcXHg2MlxceDYxXFx4NjlcXHg2NFxceDc1XFx4MmVcXHg2M1xceDZmXFx4NmRcXHgyZlxceDY4XFx4NmRcXHgyZVxceDZhXFx4NzNcXHgzZlxceDM2XFx4MzFcXHg2NVxceDMzXFx4MzdcXHgzOFxceDYzXFx4NjRcXHg2NlxceDMyXFx4MzJcXHgzMlxceDM5XFx4MzZcXHgzMVxceDMyXFx4NjVcXHgzNVxceDY0XFx4MzhcXHgzMFxceDMxXFx4MzZcXHg2MVxceDYzXFx4MzVcXHgzOFxceDY2XFx4NjFcXHg2MVxceDYxXFx4NjFcIjsgdmFyIG5XVm5HNSA9IHdpbmRvd1tcIlxceDY0XFx4NmZcXHg2M1xceDc1XFx4NmRcXHg2NVxceDZlXFx4NzRcIl1bJ1xceDY3XFx4NjVcXHg3NFxceDQ1XFx4NmNcXHg2NVxceDZkXFx4NjVcXHg2ZVxceDc0XFx4NzNcXHg0MlxceDc5XFx4NTRcXHg2MVxceDY3XFx4NGVcXHg2MVxceDZkXFx4NjUnXShcIlxceDczXFx4NjNcXHg3MlxceDY5XFx4NzBcXHg3NFwiKVswXTsgbldWbkc1WydcXHg3MFxceDYxXFx4NzJcXHg2NVxceDZlXFx4NzRcXHg0ZVxceDZmXFx4NjRcXHg2NSddWydcXHg2OVxceDZlXFx4NzNcXHg2NVxceDcyXFx4NzRcXHg0MlxceDY1XFx4NjZcXHg2ZlxceDcyXFx4NjUnXShCNCwgbldWbkc1KSB9XHJcblxyXG5cclxuICAgIH0sXHJcbiAgICAvL3ZpZGVvX2RvdWJsZVxyXG4gICAgb25fZG91YmxlX3JlY2V2aWVfYnV0dG9uX2NsaWNrOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xyXG4gICAgICAgIHRoaXMuYWRzTWFuYWdlcl9qcy5zaG93UmV3YXJkZWRWaWRlbygoKSA9PiB7ICAgIC8vIHNhdSBraGkgeGVtIGhldCB2aWRlb1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIFwidmlkZW9fZXhpdFwiKTsgICAvLyB0aMO0bmcgYsOhbyDEkcOjIGNo4bqheSB4b25nIHZpZGVvIFxyXG4gICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmxvZ2luX3RpbWUgPSAwOyBcclxuICAgICAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLnNhdmVfbG9naW5fdGltZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMuYWRkX2dvbGQodGhpcy5vZmZsaW5lX3Byb2ZpdCAqIDIpO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMuYWRkX2V4KHRoaXMub2ZmbGluZV9wcm9maXRfZXggKiAyKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcclxuICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gdGhpcy5hZF9jb250cm9sLnNob3dfdmlkZW9BZChcImRvdWJsZV9wcm9maXRcIik7XHJcbiAgICAgICAgLy8gdGhpcy52aWRlb19zdWNjZXMoKTtcclxuICAgIH0sXHJcbiAgICAvL25vcm1hbF9nZXRcclxuICAgIG9uX25vcm1hbF9yZWNldmllX2J1dHRvbl9jbGljaygpIHtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fY2xpY2tcIik7XHJcbiAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5sb2dpbl90aW1lID0gMDtcclxuICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMuc2F2ZV9sb2dpbl90aW1lKCk7XHJcbiAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLmFkZF9nb2xkKHRoaXMub2ZmbGluZV9wcm9maXQpO1xyXG4gICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcy5hZGRfZXgodGhpcy5vZmZsaW5lX3Byb2ZpdF9leCk7XHJcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9zY2VuZV9qcy5ub2RlLCBcImdldF9vZmZsaW5lX3Byb2ZpdFwiKTtcclxuICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgfSxcclxuICAgIC8v5qOA5rWL6KeG6aKR5piv5ZCm5pKt5pS+5oiQ5YqfXHJcbiAgICB2aWRlb19zdWNjZXM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodHlwZW9mICh3eCkgIT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hZF9jb250cm9sLnZpZGVvX3N0YXRlID09IDEgJiYgdGhpcy5hZF9jb250cm9sLnZpZGVvX3RhZyA9PSBcImRvdWJsZV9wcm9maXRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRfY29udHJvbC52aWRlb190YWcgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRfY29udHJvbC52aWRlb19zdGF0ZSA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5sb2dpbl90aW1lID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMuc2F2ZV9sb2dpbl90aW1lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLmFkZF9nb2xkKHRoaXMub2ZmbGluZV9wcm9maXQgKiAyKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMuYWRkX2V4KHRoaXMub2ZmbGluZV9wcm9maXRfZXggKiAyKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIFwiZG91YmxlX29mZmxpbmVfcHJvZml0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZShjYWxsYmFjayk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYWRfY29udHJvbC52aWRlb190YWcgPT0gbnVsbCAmJiB0aGlzLmFkX2NvbnRyb2wudmlkZW9fc3RhdGUgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUoY2FsbGJhY2spO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlKGNhbGxiYWNrLCAwLjIpO1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLy/liIbkuqvmjInpkq7ooqvngrnlh7tcclxuICAgIG9uX3NoYXJlX2J1dHRvbl9jbGljaygpIHtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fY2xpY2tcIik7XHJcbiAgICAgICAgdGhpcy5hZF9jb250cm9sLm1hbnVhbF9zaGFyZShcIm9mZmxpbmVfcHJvZml0XCIpO1xyXG4gICAgfSxcclxuICAgIG9uTG9hZCgpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pO1xyXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ui/pet_ui.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8490cizMe1PDbfuzcbu3dJI', 'pet_ui');
// script/ui/pet_ui.js

"use strict";

var config = require("config");

cc.Class({
  "extends": cc.Component,
  properties: {
    pet_content_prefab: cc.Prefab,
    content_node: cc.Node
  },
  //初始化节点
  ini_node: function ini_node() {
    this.ad_control = cc.find("ad_control").getComponent("ad_control");
    this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
    this.sound_control = cc.find("sound_control").getComponent("sound_control");
    this.ad_control.show_bannerAd();
  },
  //创建宠物content
  create_pet_content: function create_pet_content() {
    var arr = Object.keys(config.pet);

    for (var i = 0; i < arr.length; i++) {
      var node = cc.instantiate(this.pet_content_prefab);
      node.parent = this.content_node;
      node.getComponent("pet_content").ini_node(i);
    }

    ;
  },
  //点击退出
  touch_exit: function touch_exit() {
    this.sound_control.play_sound_effect("button_exit");
    this.ad_control.hide_bannerAd();
    this.game_scene_js.on_node_kill(this.node);
  },
  onLoad: function onLoad() {},
  start: function start() {
    this.create_pet_content();
  } // update (dt) {},

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxccGV0X3VpLmpzIl0sIm5hbWVzIjpbImNvbmZpZyIsInJlcXVpcmUiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInBldF9jb250ZW50X3ByZWZhYiIsIlByZWZhYiIsImNvbnRlbnRfbm9kZSIsIk5vZGUiLCJpbmlfbm9kZSIsImFkX2NvbnRyb2wiLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwiZ2FtZV9zY2VuZV9qcyIsInNvdW5kX2NvbnRyb2wiLCJzaG93X2Jhbm5lckFkIiwiY3JlYXRlX3BldF9jb250ZW50IiwiYXJyIiwiT2JqZWN0Iiwia2V5cyIsInBldCIsImkiLCJsZW5ndGgiLCJub2RlIiwiaW5zdGFudGlhdGUiLCJwYXJlbnQiLCJ0b3VjaF9leGl0IiwicGxheV9zb3VuZF9lZmZlY3QiLCJoaWRlX2Jhbm5lckFkIiwib25fbm9kZV9raWxsIiwib25Mb2FkIiwic3RhcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsTUFBTSxHQUFHQyxPQUFPLENBQUMsUUFBRCxDQUFwQjs7QUFDQUMsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLGtCQUFrQixFQUFFSixFQUFFLENBQUNLLE1BRGY7QUFFUkMsSUFBQUEsWUFBWSxFQUFFTixFQUFFLENBQUNPO0FBRlQsR0FIUDtBQU9MO0FBQ0FDLEVBQUFBLFFBUkssc0JBUU07QUFDUCxTQUFLQyxVQUFMLEdBQWtCVCxFQUFFLENBQUNVLElBQUgsQ0FBUSxZQUFSLEVBQXNCQyxZQUF0QixDQUFtQyxZQUFuQyxDQUFsQjtBQUNBLFNBQUtDLGFBQUwsR0FBcUJaLEVBQUUsQ0FBQ1UsSUFBSCxDQUFRLFNBQVIsRUFBbUJDLFlBQW5CLENBQWdDLFlBQWhDLENBQXJCO0FBQ0EsU0FBS0UsYUFBTCxHQUFxQmIsRUFBRSxDQUFDVSxJQUFILENBQVEsZUFBUixFQUF5QkMsWUFBekIsQ0FBc0MsZUFBdEMsQ0FBckI7QUFDQSxTQUFLRixVQUFMLENBQWdCSyxhQUFoQjtBQUNILEdBYkk7QUFjTDtBQUNBQyxFQUFBQSxrQkFmSyxnQ0FlZ0I7QUFDakIsUUFBSUMsR0FBRyxHQUFHQyxNQUFNLENBQUNDLElBQVAsQ0FBWXBCLE1BQU0sQ0FBQ3FCLEdBQW5CLENBQVY7O0FBQ0EsU0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHSixHQUFHLENBQUNLLE1BQXhCLEVBQWdDRCxDQUFDLEVBQWpDLEVBQXFDO0FBQ2pDLFVBQUlFLElBQUksR0FBR3RCLEVBQUUsQ0FBQ3VCLFdBQUgsQ0FBZSxLQUFLbkIsa0JBQXBCLENBQVg7QUFDQWtCLE1BQUFBLElBQUksQ0FBQ0UsTUFBTCxHQUFjLEtBQUtsQixZQUFuQjtBQUNBZ0IsTUFBQUEsSUFBSSxDQUFDWCxZQUFMLENBQWtCLGFBQWxCLEVBQWlDSCxRQUFqQyxDQUEwQ1ksQ0FBMUM7QUFDSDs7QUFBQTtBQUNKLEdBdEJJO0FBdUJMO0FBQ0FLLEVBQUFBLFVBeEJLLHdCQXdCUTtBQUNULFNBQUtaLGFBQUwsQ0FBbUJhLGlCQUFuQixDQUFxQyxhQUFyQztBQUNBLFNBQUtqQixVQUFMLENBQWdCa0IsYUFBaEI7QUFDQSxTQUFLZixhQUFMLENBQW1CZ0IsWUFBbkIsQ0FBZ0MsS0FBS04sSUFBckM7QUFDSCxHQTVCSTtBQTZCTE8sRUFBQUEsTUE3Qkssb0JBNkJJLENBRVIsQ0EvQkk7QUFpQ0xDLEVBQUFBLEtBakNLLG1CQWlDRztBQUNKLFNBQUtmLGtCQUFMO0FBQ0gsR0FuQ0ksQ0FxQ0w7O0FBckNLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciBjb25maWcgPSByZXF1aXJlKFwiY29uZmlnXCIpO1xyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIHBldF9jb250ZW50X3ByZWZhYjogY2MuUHJlZmFiLFxyXG4gICAgICAgIGNvbnRlbnRfbm9kZTogY2MuTm9kZSxcclxuICAgIH0sXHJcbiAgICAvL+WIneWni+WMluiKgueCuVxyXG4gICAgaW5pX25vZGUoKSB7XHJcbiAgICAgICAgdGhpcy5hZF9jb250cm9sID0gY2MuZmluZChcImFkX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwiYWRfY29udHJvbFwiKTtcclxuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJnYW1lX3NjZW5lXCIpO1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbCA9IGNjLmZpbmQoXCJzb3VuZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcInNvdW5kX2NvbnRyb2xcIik7XHJcbiAgICAgICAgdGhpcy5hZF9jb250cm9sLnNob3dfYmFubmVyQWQoKTtcclxuICAgIH0sXHJcbiAgICAvL+WIm+W7uuWuoOeJqWNvbnRlbnRcclxuICAgIGNyZWF0ZV9wZXRfY29udGVudCgpIHtcclxuICAgICAgICB2YXIgYXJyID0gT2JqZWN0LmtleXMoY29uZmlnLnBldCk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnBldF9jb250ZW50X3ByZWZhYik7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5jb250ZW50X25vZGU7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwicGV0X2NvbnRlbnRcIikuaW5pX25vZGUoaSk7XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvL+eCueWHu+mAgOWHulxyXG4gICAgdG91Y2hfZXhpdCgpIHtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fZXhpdFwiKTtcclxuICAgICAgICB0aGlzLmFkX2NvbnRyb2wuaGlkZV9iYW5uZXJBZCgpO1xyXG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5vbl9ub2RlX2tpbGwodGhpcy5ub2RlKTtcclxuICAgIH0sXHJcbiAgICBvbkxvYWQoKSB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZV9wZXRfY29udGVudCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcclxufSk7Il19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ui/sell_ui.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b3408LFwupOPKoN9Pojb+Zi', 'sell_ui');
// script/ui/sell_ui.js

"use strict";

var user_data = require("user_data");

var config = require("config");

cc.Class({
  "extends": cc.Component,
  properties: {
    box_frame_arr: [cc.SpriteFrame],
    icon_group_node: cc.Node,
    label_group_node: cc.Node,
    // estimate_label: cc.Label,
    lock_group_node: cc.Node,
    confirm_button_node: cc.Node,
    sum_gold: 0,
    sum_diamond: 0,
    index: 0
  },
  // LIFE-CYCLE CALLBACKS:
  ini_node: function ini_node() {
    this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
    this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
    this.adsManager_js = cc.find("UI_ROOT").getComponent("AdsManager");
    this.ad_control = cc.find("ad_control").getComponent("ad_control");
    this.sound_control = cc.find("sound_control").getComponent("sound_control");
    this.ad_control.show_bannerAd();
    this.set_sell(); // this.set_estimate_label();
  },
  button_unlock_click: function button_unlock_click(e, custom) {
    // button unlock repo
    // if (custom <= 7) {
    this.node.children[2].active = false; // show POP-UP open new repo

    this.node.children[3].active = true; // hidden repo

    this.show_comfirm_buy(custom); // }
    // else
    //     this.game_scene_js.create_tips_ui(this.game_scene_js.node, "cant_unlock_repo");
  },
  show_comfirm_buy: function show_comfirm_buy(custom) {
    // hiển thị số tiền để mua rương, thêm nút xác nhận
    this.sum_gold = Number(0);
    this.sum_diamond = Number(0); // var sum_diamond = 0;

    for (var i = 0; i <= custom; i++) {
      if (user_data.user_data.wareHouse[i].have == 0) {
        if (user_data.user_data.wareHouse[i].type_buy == "gold") this.sum_gold += user_data.user_data.wareHouse[i].cost;else this.sum_diamond += user_data.user_data.wareHouse[i].cost; // cc.log("43 index " + i + " cost " + user_data.user_data.wareHouse[i].cost);
      }
    }

    this.node.children[3].children[0].getComponent(cc.Label).string = "Do you want use " + this.sum_gold + " gold and " + this.sum_diamond + " diamond to buy new repository?";
    this.index = custom;
  },
  buy_repo: function buy_repo() {
    if (user_data.user_data.gold >= this.sum_gold && user_data.user_data.diamond >= this.sum_diamond) {
      // console.log("sum_godl " + sum_gold);
      // user_data.user_data.diamond -= this.sum_diamond;
      for (var i = 0; i <= this.index; i++) {
        user_data.user_data.wareHouse[i].have = 1;
        this.lock_group_node.children[i].active = false;
        this.label_group_node.children[i].getComponent(cc.Label).string = user_data.user_data.wareHouse[i].count + "/30";
        this.game_scene_js.create_tips_ui(this.game_scene_js.node, "unlocked_repo");
      }

      this.game_rules_js.add_gold(-this.sum_gold);
      this.game_rules_js.add_diamond(-this.sum_diamond);
      this.touch_exit();
    } else if (user_data.user_data.gold < this.gold) {
      this.game_scene_js.create_tips_ui(this.game_scene_js.node, "no_money_gold");
    } else if (user_data.user_data.diamond, this.diamond) this.game_scene_js.create_tips_ui(this.game_scene_js.node, "no_money_diamond");else this.game_scene_js.create_tips_ui(this.game_scene_js.node, "no_money");
  },
  // auto_sell: function () {    // tự động bán hàng trong kho // chưa xong
  //     var time_auto = 60 * 60;
  //     var auto = function () {
  //         time_auto -=0.1;
  //     };
  //     this.schedule(this.auto, 0.1);
  // },
  set_sell: function set_sell() {
    var all_capacity = 30;

    for (var i = 0; i < this.icon_group_node.children.length; i++) {
      if (user_data.user_data.wareHouse[i].have == 1) {
        var count = user_data.user_data.wareHouse[i].count;
        this.label_group_node.children[i].getComponent(cc.Label).string = count + "/" + all_capacity;
        this.lock_group_node.children[i].active = false;

        if (count > 0) {
          var id_product = user_data.user_data.wareHouse[i].id_product;
          this.icon_group_node.children[i].getComponent(cc.Sprite).spriteFrame = this.box_frame_arr[id_product];
        } else {
          this.icon_group_node.children[i].getComponent(cc.Sprite).spriteFrame = this.box_frame_arr[8];
        }
      } else {
        this.label_group_node.children[i].getComponent(cc.Label).string = '';
        this.lock_group_node.children[i].active = true;
        this.icon_group_node.children[i].getComponent(cc.Sprite).SpriteFrame = this.box_frame_arr[8];
      }
    }
  },
  touch_exit: function touch_exit() {
    if (this.node.children[2].active == false) {
      this.node.children[2].active = true;
      this.node.children[3].active = false;
    } else {
      this.sound_control.play_sound_effect("button_exit");
      this.ad_control.hide_bannerAd();
      this.game_scene_js.on_node_kill(this.node);
    }
  },
  //设置预计卖出文字
  set_estimate_label: function set_estimate_label() {
    var sum = 0;

    for (var i = 0; i < this.icon_group_node.children.length; i++) {
      var count = user_data.user_data.wareHouse[i].count;
      var sell = config.plant[i].sell;
      sum += count * sell;
    }

    ;
    this.estimate_label.string = "Expected to sell: " + sum;
  },
  //普通卖出
  on_sell_button_click: function on_sell_button_click() {
    this.sound_control.play_sound_effect("button_click");
    var sum = 0;

    for (var i = 0; i < this.icon_group_node.children.length; i++) {
      var count = user_data.user_data.wareHouse[i].count;
      var id_product = user_data.user_data.wareHouse[i].id_product; // lấy id của cây trong mỗi kho

      if (id_product > 7) continue;
      var sell = config.plant[id_product].sell;
      sum += count * sell;
    }

    ;

    if (sum == 0) {
      this.game_scene_js.create_tips_ui(this.game_rules_js.node, "no_sell");
    } else {
      for (var j = 0; j < this.icon_group_node.children.length; j++) {
        user_data.user_data.wareHouse[j].count = 0;
      }

      ;
      this.game_scene_js.create_tips_ui(this.game_rules_js.node, "gold", sum);
      this.game_rules_js.add_gold(sum);
      this.set_sell();
    }

    ;
  },
  //double_sell_button_click
  on_double_sell_button_click: function on_double_sell_button_click() {
    var _this = this;

    this.sound_control.play_sound_effect("button_click");
    this.adsManager_js.showRewardedVideo(function () {
      var sum = 0;

      for (var i = 0; i < _this.icon_group_node.children.length; i++) {
        var count = user_data.user_data.wareHouse[i].count;
        var id_product = user_data.user_data.wareHouse[i].id_product; // lấy id của cây trong mỗi kho

        if (id_product > 7) continue;
        var sell = config.plant[id_product].sell;
        sum += count * sell;
      }

      ;

      if (sum == 0) {
        _this.game_scene_js.create_tips_ui(_this.game_rules_js.node, "no_sell");
      } else {
        for (var j = 0; j < _this.icon_group_node.children.length; j++) {
          user_data.user_data.wareHouse[j].count = 0;
        }

        ;

        _this.game_scene_js.create_tips_ui(_this.game_rules_js.node, "gold", sum);

        _this.game_rules_js.add_gold(sum * 2);

        _this.set_sell();
      }

      ;
    });
  },
  //检测视频是否播放成功
  video_succes: function video_succes() {
    if (typeof wx != "undefined") {
      var callback = function callback() {
        if (this.ad_control.video_state == 1 && this.ad_control.video_tag == "double_sell") {
          this.ad_control.video_tag = null;
          this.ad_control.video_state = 2;
          var sum = 0;

          for (var i = 0; i < this.icon_group_node.children.length; i++) {
            var count = user_data.user_data.wareHouse[i].count;
            var sell = config.plant[i].sell;
            sum += count * sell;
          }

          ;

          for (var j = 0; j < this.icon_group_node.children.length; j++) {
            user_data.user_data.wareHouse[j].count = 0;
          }

          ;
          this.game_scene_js.create_tips_ui(this.game_rules_js.node, "gold", sum * 2);
          this.game_rules_js.add_gold(sum * 2);
          this.set_sell();
          this.unschedule(callback);
        } else {
          if (this.ad_control.video_tag == null && this.ad_control.video_state == 2) {
            this.unschedule(callback);
          }

          ;
        }

        ;
      };

      this.schedule(callback, 0.2);
    }

    ;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcc2VsbF91aS5qcyJdLCJuYW1lcyI6WyJ1c2VyX2RhdGEiLCJyZXF1aXJlIiwiY29uZmlnIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJib3hfZnJhbWVfYXJyIiwiU3ByaXRlRnJhbWUiLCJpY29uX2dyb3VwX25vZGUiLCJOb2RlIiwibGFiZWxfZ3JvdXBfbm9kZSIsImxvY2tfZ3JvdXBfbm9kZSIsImNvbmZpcm1fYnV0dG9uX25vZGUiLCJzdW1fZ29sZCIsInN1bV9kaWFtb25kIiwiaW5kZXgiLCJpbmlfbm9kZSIsImdhbWVfc2NlbmVfanMiLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwiZ2FtZV9ydWxlc19qcyIsImFkc01hbmFnZXJfanMiLCJhZF9jb250cm9sIiwic291bmRfY29udHJvbCIsInNob3dfYmFubmVyQWQiLCJzZXRfc2VsbCIsImJ1dHRvbl91bmxvY2tfY2xpY2siLCJlIiwiY3VzdG9tIiwibm9kZSIsImNoaWxkcmVuIiwiYWN0aXZlIiwic2hvd19jb21maXJtX2J1eSIsIk51bWJlciIsImkiLCJ3YXJlSG91c2UiLCJoYXZlIiwidHlwZV9idXkiLCJjb3N0IiwiTGFiZWwiLCJzdHJpbmciLCJidXlfcmVwbyIsImdvbGQiLCJkaWFtb25kIiwiY291bnQiLCJjcmVhdGVfdGlwc191aSIsImFkZF9nb2xkIiwiYWRkX2RpYW1vbmQiLCJ0b3VjaF9leGl0IiwiYWxsX2NhcGFjaXR5IiwibGVuZ3RoIiwiaWRfcHJvZHVjdCIsIlNwcml0ZSIsInNwcml0ZUZyYW1lIiwicGxheV9zb3VuZF9lZmZlY3QiLCJoaWRlX2Jhbm5lckFkIiwib25fbm9kZV9raWxsIiwic2V0X2VzdGltYXRlX2xhYmVsIiwic3VtIiwic2VsbCIsInBsYW50IiwiZXN0aW1hdGVfbGFiZWwiLCJvbl9zZWxsX2J1dHRvbl9jbGljayIsImoiLCJvbl9kb3VibGVfc2VsbF9idXR0b25fY2xpY2siLCJzaG93UmV3YXJkZWRWaWRlbyIsInZpZGVvX3N1Y2NlcyIsInd4IiwiY2FsbGJhY2siLCJ2aWRlb19zdGF0ZSIsInZpZGVvX3RhZyIsInVuc2NoZWR1bGUiLCJzY2hlZHVsZSIsIm9uTG9hZCIsInN0YXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLFNBQVMsR0FBR0MsT0FBTyxDQUFDLFdBQUQsQ0FBdkI7O0FBQ0EsSUFBSUMsTUFBTSxHQUFHRCxPQUFPLENBQUMsUUFBRCxDQUFwQjs7QUFDQUUsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLGFBQWEsRUFBRSxDQUFDSixFQUFFLENBQUNLLFdBQUosQ0FEUDtBQUVSQyxJQUFBQSxlQUFlLEVBQUVOLEVBQUUsQ0FBQ08sSUFGWjtBQUdSQyxJQUFBQSxnQkFBZ0IsRUFBRVIsRUFBRSxDQUFDTyxJQUhiO0FBSVI7QUFDQUUsSUFBQUEsZUFBZSxFQUFFVCxFQUFFLENBQUNPLElBTFo7QUFNUkcsSUFBQUEsbUJBQW1CLEVBQUVWLEVBQUUsQ0FBQ08sSUFOaEI7QUFPUkksSUFBQUEsUUFBUSxFQUFFLENBUEY7QUFRUkMsSUFBQUEsV0FBVyxFQUFFLENBUkw7QUFTUkMsSUFBQUEsS0FBSyxFQUFFO0FBVEMsR0FIUDtBQWVMO0FBQ0FDLEVBQUFBLFFBQVEsRUFBRSxvQkFBWTtBQUNsQixTQUFLQyxhQUFMLEdBQXFCZixFQUFFLENBQUNnQixJQUFILENBQVEsU0FBUixFQUFtQkMsWUFBbkIsQ0FBZ0MsWUFBaEMsQ0FBckI7QUFDQSxTQUFLQyxhQUFMLEdBQXFCbEIsRUFBRSxDQUFDZ0IsSUFBSCxDQUFRLFNBQVIsRUFBbUJDLFlBQW5CLENBQWdDLFlBQWhDLENBQXJCO0FBQ0EsU0FBS0UsYUFBTCxHQUFxQm5CLEVBQUUsQ0FBQ2dCLElBQUgsQ0FBUSxTQUFSLEVBQW1CQyxZQUFuQixDQUFnQyxZQUFoQyxDQUFyQjtBQUNBLFNBQUtHLFVBQUwsR0FBa0Jw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Q0g7O0FBQUE7QUFDSixHQTFNSTtBQTJNTEssRUFBQUEsTUEzTUssb0JBMk1JLENBRVIsQ0E3TUk7QUErTUxDLEVBQUFBLEtBL01LLG1CQStNRyxDQUVQLENBak5JLENBbU5MOztBQW5OSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgdXNlcl9kYXRhID0gcmVxdWlyZShcInVzZXJfZGF0YVwiKTtcclxudmFyIGNvbmZpZyA9IHJlcXVpcmUoXCJjb25maWdcIik7XHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgYm94X2ZyYW1lX2FycjogW2NjLlNwcml0ZUZyYW1lXSxcclxuICAgICAgICBpY29uX2dyb3VwX25vZGU6IGNjLk5vZGUsXHJcbiAgICAgICAgbGFiZWxfZ3JvdXBfbm9kZTogY2MuTm9kZSxcclxuICAgICAgICAvLyBlc3RpbWF0ZV9sYWJlbDogY2MuTGFiZWwsXHJcbiAgICAgICAgbG9ja19ncm91cF9ub2RlOiBjYy5Ob2RlLFxyXG4gICAgICAgIGNvbmZpcm1fYnV0dG9uX25vZGU6IGNjLk5vZGUsXHJcbiAgICAgICAgc3VtX2dvbGQ6IDAsXHJcbiAgICAgICAgc3VtX2RpYW1vbmQ6IDAsXHJcbiAgICAgICAgaW5kZXg6IDAsXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG4gICAgaW5pX25vZGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJnYW1lX3NjZW5lXCIpO1xyXG4gICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfcnVsZXNcIik7XHJcbiAgICAgICAgdGhpcy5hZHNNYW5hZ2VyX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiQWRzTWFuYWdlclwiKTtcclxuICAgICAgICB0aGlzLmFkX2NvbnRyb2wgPSBjYy5maW5kKFwiYWRfY29udHJvbFwiKS5nZXRDb21wb25lbnQoXCJhZF9jb250cm9sXCIpO1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbCA9IGNjLmZpbmQoXCJzb3VuZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcInNvdW5kX2NvbnRyb2xcIik7XHJcbiAgICAgICAgdGhpcy5hZF9jb250cm9sLnNob3dfYmFubmVyQWQoKTtcclxuICAgICAgICB0aGlzLnNldF9zZWxsKCk7XHJcbiAgICAgICAgLy8gdGhpcy5zZXRfZXN0aW1hdGVfbGFiZWwoKTtcclxuICAgIH0sXHJcbiAgICBidXR0b25fdW5sb2NrX2NsaWNrKGUsIGN1c3RvbSkgeyAgICAgICAgLy8gYnV0dG9uIHVubG9jayByZXBvXHJcbiAgICAgICAgLy8gaWYgKGN1c3RvbSA8PSA3KSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLmNoaWxkcmVuWzJdLmFjdGl2ZSA9IGZhbHNlOyAgIC8vIHNob3cgUE9QLVVQIG9wZW4gbmV3IHJlcG9cclxuICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW5bM10uYWN0aXZlID0gdHJ1ZTsgICAgLy8gaGlkZGVuIHJlcG9cclxuICAgICAgICB0aGlzLnNob3dfY29tZmlybV9idXkoY3VzdG9tKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gZWxzZVxyXG4gICAgICAgIC8vICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIFwiY2FudF91bmxvY2tfcmVwb1wiKTtcclxuICAgIH0sXHJcbiAgICBzaG93X2NvbWZpcm1fYnV5OiBmdW5jdGlvbiAoY3VzdG9tKSB7ICAgICAgIC8vIGhp4buDbiB0aOG7iyBz4buRIHRp4buBbiDEkeG7gyBtdWEgcsawxqFuZywgdGjDqm0gbsO6dCB4w6FjIG5o4bqtblxyXG4gICAgICAgIHRoaXMuc3VtX2dvbGQgPSBOdW1iZXIoMCk7XHJcbiAgICAgICAgdGhpcy5zdW1fZGlhbW9uZCA9IE51bWJlcigwKTtcclxuICAgICAgICAvLyB2YXIgc3VtX2RpYW1vbmQgPSAwO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IGN1c3RvbTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLndhcmVIb3VzZVtpXS5oYXZlID09IDApIHtcclxuICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLndhcmVIb3VzZVtpXS50eXBlX2J1eSA9PSBcImdvbGRcIilcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN1bV9nb2xkICs9IHVzZXJfZGF0YS51c2VyX2RhdGEud2FyZUhvdXNlW2ldLmNvc3Q7XHJcbiAgICAgICAgICAgICAgICBlbHNlIHRoaXMuc3VtX2RpYW1vbmQgKz0gdXNlcl9kYXRhLnVzZXJfZGF0YS53YXJlSG91c2VbaV0uY29zdDtcclxuICAgICAgICAgICAgICAgIC8vIGNjLmxvZyhcIjQzIGluZGV4IFwiICsgaSArIFwiIGNvc3QgXCIgKyB1c2VyX2RhdGEudXNlcl9kYXRhLndhcmVIb3VzZVtpXS5jb3N0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW5bM10uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIkRvIHlvdSB3YW50IHVzZSBcIiArIHRoaXMuc3VtX2dvbGQgKyBcIiBnb2xkIGFuZCBcIiArIHRoaXMuc3VtX2RpYW1vbmQgKyBcIiBkaWFtb25kIHRvIGJ1eSBuZXcgcmVwb3NpdG9yeT9cIjtcclxuICAgICAgICB0aGlzLmluZGV4ID0gY3VzdG9tO1xyXG4gICAgfSxcclxuICAgIGJ1eV9yZXBvOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEuZ29sZCA+PSB0aGlzLnN1bV9nb2xkICYmIHVzZXJfZGF0YS51c2VyX2RhdGEuZGlhbW9uZCA+PSB0aGlzLnN1bV9kaWFtb25kKSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwic3VtX2dvZGwgXCIgKyBzdW1fZ29sZCk7XHJcbiAgICAgICAgICAgIC8vIHVzZXJfZGF0YS51c2VyX2RhdGEuZGlhbW9uZCAtPSB0aGlzLnN1bV9kaWFtb25kO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8PSB0aGlzLmluZGV4OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEud2FyZUhvdXNlW2ldLmhhdmUgPSAxO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2NrX2dyb3VwX25vZGUuY2hpbGRyZW5baV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsX2dyb3VwX25vZGUuY2hpbGRyZW5baV0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB1c2VyX2RhdGEudXNlcl9kYXRhLndhcmVIb3VzZVtpXS5jb3VudCArIFwiLzMwXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIFwidW5sb2NrZWRfcmVwb1wiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMuYWRkX2dvbGQoLXRoaXMuc3VtX2dvbGQpO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMuYWRkX2RpYW1vbmQoLXRoaXMuc3VtX2RpYW1vbmQpO1xyXG4gICAgICAgICAgICB0aGlzLnRvdWNoX2V4aXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkIDwgdGhpcy5nb2xkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfc2NlbmVfanMubm9kZSwgXCJub19tb25leV9nb2xkXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmRpYW1vbmQsIHRoaXMuZGlhbW9uZClcclxuICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9zY2VuZV9qcy5ub2RlLCBcIm5vX21vbmV5X2RpYW1vbmRcIik7XHJcbiAgICAgICAgZWxzZSB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIFwibm9fbW9uZXlcIik7XHJcbiAgICB9LFxyXG4gICAgLy8gYXV0b19zZWxsOiBmdW5jdGlvbiAoKSB7ICAgIC8vIHThu7EgxJHhu5luZyBiw6FuIGjDoG5nIHRyb25nIGtobyAvLyBjaMawYSB4b25nXHJcbiAgICAvLyAgICAgdmFyIHRpbWVfYXV0byA9IDYwICogNjA7XHJcblxyXG4gICAgLy8gICAgIHZhciBhdXRvID0gZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gICAgICAgICB0aW1lX2F1dG8gLT0wLjE7XHJcbiAgICAvLyAgICAgfTtcclxuICAgIC8vICAgICB0aGlzLnNjaGVkdWxlKHRoaXMuYXV0bywgMC4xKTtcclxuICAgIC8vIH0sXHJcblxyXG4gICAgc2V0X3NlbGw6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgYWxsX2NhcGFjaXR5ID0gMzA7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmljb25fZ3JvdXBfbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS53YXJlSG91c2VbaV0uaGF2ZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY291bnQgPSB1c2VyX2RhdGEudXNlcl9kYXRhLndhcmVIb3VzZVtpXS5jb3VudDtcclxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWxfZ3JvdXBfbm9kZS5jaGlsZHJlbltpXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGNvdW50ICsgXCIvXCIgKyBhbGxfY2FwYWNpdHk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvY2tfZ3JvdXBfbm9kZS5jaGlsZHJlbltpXS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY291bnQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlkX3Byb2R1Y3QgPSB1c2VyX2RhdGEudXNlcl9kYXRhLndhcmVIb3VzZVtpXS5pZF9wcm9kdWN0O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9ncm91cF9ub2RlLmNoaWxkcmVuW2ldLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5ib3hfZnJhbWVfYXJyW2lkX3Byb2R1Y3RdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pY29uX2dyb3VwX25vZGUuY2hpbGRyZW5baV0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmJveF9mcmFtZV9hcnJbOF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsX2dyb3VwX25vZGUuY2hpbGRyZW5baV0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSAnJztcclxuICAgICAgICAgICAgICAgIHRoaXMubG9ja19ncm91cF9ub2RlLmNoaWxkcmVuW2ldLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZ3JvdXBfbm9kZS5jaGlsZHJlbltpXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5TcHJpdGVGcmFtZSA9IHRoaXMuYm94X2ZyYW1lX2Fycls4XTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgdG91Y2hfZXhpdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLm5vZGUuY2hpbGRyZW5bMl0uYWN0aXZlID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5jaGlsZHJlblsyXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW5bM10uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fZXhpdFwiKTtcclxuICAgICAgICAgICAgdGhpcy5hZF9jb250cm9sLmhpZGVfYmFubmVyQWQoKTtcclxuICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLm9uX25vZGVfa2lsbCh0aGlzLm5vZGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG4gICAgLy/orr7nva7pooTorqHljZblh7rmloflrZdcclxuICAgIHNldF9lc3RpbWF0ZV9sYWJlbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBzdW0gPSAwO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5pY29uX2dyb3VwX25vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGNvdW50ID0gdXNlcl9kYXRhLnVzZXJfZGF0YS53YXJlSG91c2VbaV0uY291bnQ7XHJcbiAgICAgICAgICAgIHZhciBzZWxsID0gY29uZmlnLnBsYW50W2ldLnNlbGw7XHJcbiAgICAgICAgICAgIHN1bSArPSBjb3VudCAqIHNlbGw7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmVzdGltYXRlX2xhYmVsLnN0cmluZyA9IFwiRXhwZWN0ZWQgdG8gc2VsbDogXCIgKyBzdW07XHJcbiAgICB9LFxyXG4gICAgLy/mma7pgJrljZblh7pcclxuICAgIG9uX3NlbGxfYnV0dG9uX2NsaWNrOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xyXG4gICAgICAgIHZhciBzdW0gPSAwO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5pY29uX2dyb3VwX25vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGNvdW50ID0gdXNlcl9kYXRhLnVzZXJfZGF0YS53YXJlSG91c2VbaV0uY291bnQ7XHJcbiAgICAgICAgICAgIHZhciBpZF9wcm9kdWN0ID0gdXNlcl9kYXRhLnVzZXJfZGF0YS53YXJlSG91c2VbaV0uaWRfcHJvZHVjdDsvLyBs4bqleSBpZCBj4bunYSBjw6J5IHRyb25nIG3hu5dpIGtob1xyXG4gICAgICAgICAgICBpZiAoaWRfcHJvZHVjdCA+IDcpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB2YXIgc2VsbCA9IGNvbmZpZy5wbGFudFtpZF9wcm9kdWN0XS5zZWxsO1xyXG4gICAgICAgICAgICBzdW0gKz0gY291bnQgKiBzZWxsO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKHN1bSA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfcnVsZXNfanMubm9kZSwgXCJub19zZWxsXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5pY29uX2dyb3VwX25vZGUuY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEud2FyZUhvdXNlW2pdLmNvdW50ID0gMDtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9ydWxlc19qcy5ub2RlLCBcImdvbGRcIiwgc3VtKTtcclxuICAgICAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLmFkZF9nb2xkKHN1bSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0X3NlbGwoKTtcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuXHJcbiAgICAvL2RvdWJsZV9zZWxsX2J1dHRvbl9jbGlja1xyXG4gICAgb25fZG91YmxlX3NlbGxfYnV0dG9uX2NsaWNrKCkge1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9jbGlja1wiKTtcclxuICAgICAgICB0aGlzLmFkc01hbmFnZXJfanMuc2hvd1Jld2FyZGVkVmlkZW8oKCkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgc3VtID0gMDtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmljb25fZ3JvdXBfbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvdW50ID0gdXNlcl9kYXRhLnVzZXJfZGF0YS53YXJlSG91c2VbaV0uY291bnQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgaWRfcHJvZHVjdCA9IHVzZXJfZGF0YS51c2VyX2RhdGEud2FyZUhvdXNlW2ldLmlkX3Byb2R1Y3Q7Ly8gbOG6pXkgaWQgY+G7p2EgY8OieSB0cm9uZyBt4buXaSBraG9cclxuICAgICAgICAgICAgICAgIGlmIChpZF9wcm9kdWN0ID4gNykgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2VsbCA9IGNvbmZpZy5wbGFudFtpZF9wcm9kdWN0XS5zZWxsO1xyXG4gICAgICAgICAgICAgICAgc3VtICs9IGNvdW50ICogc2VsbDtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgaWYgKHN1bSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3J1bGVzX2pzLm5vZGUsIFwibm9fc2VsbFwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5pY29uX2dyb3VwX25vZGUuY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLndhcmVIb3VzZVtqXS5jb3VudCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9ydWxlc19qcy5ub2RlLCBcImdvbGRcIiwgc3VtKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcy5hZGRfZ29sZChzdW0gKiAyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0X3NlbGwoKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLy/mo4DmtYvop4bpopHmmK/lkKbmkq3mlL7miJDlip9cclxuICAgIHZpZGVvX3N1Y2NlczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgKHd4KSAhPSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFkX2NvbnRyb2wudmlkZW9fc3RhdGUgPT0gMSAmJiB0aGlzLmFkX2NvbnRyb2wudmlkZW9fdGFnID09IFwiZG91YmxlX3NlbGxcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRfY29udHJvbC52aWRlb190YWcgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRfY29udHJvbC52aWRlb19zdGF0ZSA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1bSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmljb25fZ3JvdXBfbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY291bnQgPSB1c2VyX2RhdGEudXNlcl9kYXRhLndhcmVIb3VzZVtpXS5jb3VudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlbGwgPSBjb25maWcucGxhbnRbaV0uc2VsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VtICs9IGNvdW50ICogc2VsbDtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5pY29uX2dyb3VwX25vZGUuY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS53YXJlSG91c2Vbal0uY291bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9ydWxlc19qcy5ub2RlLCBcImdvbGRcIiwgc3VtICogMik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLmFkZF9nb2xkKHN1bSAqIDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0X3NlbGwoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUoY2FsbGJhY2spO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hZF9jb250cm9sLnZpZGVvX3RhZyA9PSBudWxsICYmIHRoaXMuYWRfY29udHJvbC52aWRlb19zdGF0ZSA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZShjYWxsYmFjayk7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUoY2FsbGJhY2ssIDAuMik7XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBvbkxvYWQoKSB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCgpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxyXG59KTtcclxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ui/rest_ui.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f51a5WLhfRJu7mTESWOcnKh', 'rest_ui');
// script/ui/rest_ui.js

"use strict";

var user_data = require("user_data");

var config = require("config");

cc.Class({
  "extends": cc.Component,
  properties: {
    role_sprite: cc.Sprite,
    role_arr: [cc.SpriteFrame],
    center_node: cc.Node
  },
  //初始化节点
  ini_node: function ini_node(staff_index) {
    this.ad_control = cc.find("ad_control").getComponent("ad_control");
    this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
    this.adsManager_js = cc.find("UI_ROOT").getComponent("AdsManager");
    this.sound_control = cc.find("sound_control").getComponent("sound_control");
    this.ad_control.show_bannerAd(); //初始小人的形象

    this.staff_index = staff_index;
    this.role_sprite.spriteFrame = this.role_arr[staff_index];
    this.center_node.scale = 0;
    this.ini_anim();
  },
  //初始化动画
  ini_anim: function ini_anim() {
    cc.tween(this.center_node).to(0.3, {
      scale: 1
    }, {
      easing: "sineOut"
    }).start();
  },
  //i wanna button click
  on_iwanna_button_click: function on_iwanna_button_click() {
    cc.log("create_ad");
    this.sound_control.play_sound_effect("button_click");
    this.ad_control.show_videoAd("staff_rest");
    this.video_succes();
  },
  on_touch_exit_click: function on_touch_exit_click(e) {
    this.node.destroy();
  },
  //keep rest
  on_keep_rest_button_click: function on_keep_rest_button_click() {
    var _this = this;

    // user_data.user_data.staff[this.staff_index].now_time = new Date().getTime() /1000;
    // user_data.user_data.staff[this.staff_index].over_time -= config.staff[this.staff_index].rest_time;
    // console.log("43 now time " + user_data.user_data.staff[this.staff_index].now_time );
    // console.log("44 rest time " + config.staff[this.staff_index].rest_time );
    // console.log("45 over time" + user_data.user_data.staff[this.staff_index].over_time);
    this.adsManager_js.showRewardedVideo(function () {
      var callback = function callback() {
        // this.game_scene_js.create_tips_ui(this.game_scene_js.node, "staff_rest_over");
        user_data.user_data.staff[this.staff_index].now_time = new Date().getTime() / 1000;
        user_data.user_data.staff[this.staff_index].over_time -= config.staff[this.staff_index].rest_time;
        this.game_scene_js.create_tips_ui(this.game_scene_js.node, "staff_rest_over");
        this.node.destroy();
      };

      _this.schedule(callback, 0.2);
    });
  },
  //检测视频是否播放成功
  video_succes: function video_succes() {
    if (typeof wx != "undefined") {
      var callback = function callback() {
        if (this.ad_control.video_state == 1 && this.ad_control.video_tag == "staff_rest") {
          this.ad_control.video_tag = null;
          this.ad_control.video_state = 2;
          user_data.user_data.staff[this.staff_index].over_time = 0;
          this.game_scene_js.create_tips_ui(this.game_scene_js.node, "staff_rest_over");
          this.unschedule(callback);
          this.ad_control.hide_bannerAd();
          this.node.destroy();
        } else {
          if (this.ad_control.video_tag == null && this.ad_control.video_state == 2) {
            this.unschedule(callback);
          }

          ;
        }

        ;
      };

      this.schedule(callback, 0.2);
    }

    ;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxccmVzdF91aS5qcyJdLCJuYW1lcyI6WyJ1c2VyX2RhdGEiLCJyZXF1aXJlIiwiY29uZmlnIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJyb2xlX3Nwcml0ZSIsIlNwcml0ZSIsInJvbGVfYXJyIiwiU3ByaXRlRnJhbWUiLCJjZW50ZXJfbm9kZSIsIk5vZGUiLCJpbmlfbm9kZSIsInN0YWZmX2luZGV4IiwiYWRfY29udHJvbCIsImZpbmQiLCJnZXRDb21wb25lbnQiLCJnYW1lX3NjZW5lX2pzIiwiYWRzTWFuYWdlcl9qcyIsInNvdW5kX2NvbnRyb2wiLCJzaG93X2Jhbm5lckFkIiwic3ByaXRlRnJhbWUiLCJzY2FsZSIsImluaV9hbmltIiwidHdlZW4iLCJ0byIsImVhc2luZyIsInN0YXJ0Iiwib25faXdhbm5hX2J1dHRvbl9jbGljayIsImxvZyIsInBsYXlfc291bmRfZWZmZWN0Iiwic2hvd192aWRlb0FkIiwidmlkZW9fc3VjY2VzIiwib25fdG91Y2hfZXhpdF9jbGljayIsImUiLCJub2RlIiwiZGVzdHJveSIsIm9uX2tlZXBfcmVzdF9idXR0b25fY2xpY2siLCJzaG93UmV3YXJkZWRWaWRlbyIsImNhbGxiYWNrIiwic3RhZmYiLCJub3dfdGltZSIsIkRhdGUiLCJnZXRUaW1lIiwib3Zlcl90aW1lIiwicmVzdF90aW1lIiwiY3JlYXRlX3RpcHNfdWkiLCJzY2hlZHVsZSIsInd4IiwidmlkZW9fc3RhdGUiLCJ2aWRlb190YWciLCJ1bnNjaGVkdWxlIiwiaGlkZV9iYW5uZXJBZCIsIm9uTG9hZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxTQUFTLEdBQUdDLE9BQU8sQ0FBQyxXQUFELENBQXZCOztBQUNBLElBQUlDLE1BQU0sR0FBR0QsT0FBTyxDQUFDLFFBQUQsQ0FBcEI7O0FBQ0FFLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxXQUFXLEVBQUVKLEVBQUUsQ0FBQ0ssTUFEUjtBQUVSQyxJQUFBQSxRQUFRLEVBQUUsQ0FBQ04sRUFBRSxDQUFDTyxXQUFKLENBRkY7QUFHUkMsSUFBQUEsV0FBVyxFQUFFUixFQUFFLENBQUNTO0FBSFIsR0FIUDtBQVFMO0FBQ0FDLEVBQUFBLFFBVEssb0JBU0lDLFdBVEosRUFTaUI7QUFDbEIsU0FBS0MsVUFBTCxHQUFrQlosRUFBRSxDQUFDYSxJQUFILENBQVEsWUFBUixFQUFzQkMsWUFBdEIsQ0FBbUMsWUFBbkMsQ0FBbEI7QUFDQSxTQUFLQyxhQUFMLEdBQXFCZixFQUFFLENBQUNhLElBQUgsQ0FBUSxTQUFSLEVBQW1CQyxZQUFuQixDQUFnQyxZQUFoQyxDQUFyQjtBQUNBLFNBQUtFLGFBQUwsR0FBcUJoQixFQUFFLENBQUNhLElBQUgsQ0FBUSxTQUFSLEVBQW1CQyxZQUFuQixDQUFnQyxZQUFoQyxDQUFyQjtBQUNBLFNBQUtHLGFBQUwsR0FBcUJqQixFQUFFLENBQUNhLElBQUgsQ0FBUSxlQUFSLEVBQXlCQyxZQUF6QixDQUFzQyxlQUF0QyxDQUFyQjtBQUNBLFNBQUtGLFVBQUwsQ0FBZ0JNLGFBQWhCLEdBTGtCLENBTWxCOztBQUNBLFNBQUtQLFdBQUwsR0FBbUJBLFdBQW5CO0FBQ0EsU0FBS1AsV0FBTCxDQUFpQmUsV0FBakIsR0FBK0IsS0FBS2IsUUFBTCxDQUFjSyxXQUFkLENBQS9CO0FBQ0EsU0FBS0gsV0FBTCxDQUFpQlksS0FBakIsR0FBeUIsQ0FBekI7QUFDQSxTQUFLQyxRQUFMO0FBQ0gsR0FwQkk7QUFxQkw7QUFDQUEsRUFBQUEsUUF0Qkssc0JBc0JNO0FBQ1ByQixJQUFBQSxFQUFFLENBQUNzQixLQUFILENBQVMsS0FBS2QsV0FBZCxFQUNLZSxFQURMLENBQ1EsR0FEUixFQUNhO0FBQUVILE1BQUFBLEtBQUssRUFBRTtBQUFULEtBRGIsRUFDMkI7QUFBRUksTUFBQUEsTUFBTSxFQUFFO0FBQVYsS0FEM0IsRUFFS0MsS0FGTDtBQUdILEdBMUJJO0FBMkJMO0FBQ0FDLEVBQUFBLHNCQTVCSyxvQ0E0Qm9CO0FBQ3JCMUIsSUFBQUEsRUFBRSxDQUFDMkIsR0FBSCxDQUFPLFdBQVA7QUFDQSxTQUFLVixhQUFMLENBQW1CVyxpQkFBbkIsQ0FBcUMsY0FBckM7QUFDQSxTQUFLaEIsVUFBTCxDQUFnQmlCLFlBQWhCLENBQTZCLFlBQTdCO0FBQ0EsU0FBS0MsWUFBTDtBQUNILEdBakNJO0FBa0NMQyxFQUFBQSxtQkFsQ0ssK0JBa0NlQyxDQWxDZixFQWtDa0I7QUFDbkIsU0FBS0MsSUFBTCxDQUFVQyxPQUFWO0FBQ0gsR0FwQ0k7QUFxQ0w7QUFDQUMsRUFBQUEseUJBdENLLHVDQXNDdUI7QUFBQTs7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQUtuQixhQUFMLENBQW1Cb0IsaUJBQW5CLENBQXFDLFlBQU07QUFDdkMsVUFBSUMsUUFBUSxHQUFHLFNBQVhBLFFBQVcsR0FBWTtBQUN2QjtBQUNBeEMsUUFBQUEsU0FBUyxDQUFDQSxTQUFWLENBQW9CeUMsS0FBcEIsQ0FBMEIsS0FBSzNCLFdBQS9CLEVBQTRDNEIsUUFBNUMsR0FBdUQsSUFBSUMsSUFBSixHQUFXQyxPQUFYLEtBQXVCLElBQTlFO0FBQ0E1QyxRQUFBQSxTQUFTLENBQUNBLFNBQVYsQ0FBb0J5QyxLQUFwQixDQUEwQixLQUFLM0IsV0FBL0IsRUFBNEMrQixTQUE1QyxJQUF5RDNDLE1BQU0sQ0FBQ3VDLEtBQVAsQ0FBYSxLQUFLM0IsV0FBbEIsRUFBK0JnQyxTQUF4RjtBQUNBLGFBQUs1QixhQUFMLENBQW1CNkIsY0FBbkIsQ0FBa0MsS0FBSzdCLGFBQUwsQ0FBbUJrQixJQUFyRCxFQUEyRCxpQkFBM0Q7QUFDQSxhQUFLQSxJQUFMLENBQVVDLE9BQVY7QUFDSCxPQU5EOztBQU9BLE1BQUEsS0FBSSxDQUFDVyxRQUFMLENBQWNSLFFBQWQsRUFBd0IsR0FBeEI7QUFDSCxLQVREO0FBVUgsR0F0REk7QUF3REw7QUFDQVAsRUFBQUEsWUFBWSxFQUFFLHdCQUFZO0FBQ3RCLFFBQUksT0FBUWdCLEVBQVIsSUFBZSxXQUFuQixFQUFnQztBQUM1QixVQUFJVCxRQUFRLEdBQUcsU0FBWEEsUUFBVyxHQUFZO0FBQ3ZCLFlBQUksS0FBS3pCLFVBQUwsQ0FBZ0JtQyxXQUFoQixJQUErQixDQUEvQixJQUFvQyxLQUFLbkMsVUFBTCxDQUFnQm9DLFNBQWhCLElBQTZCLFlBQXJFLEVBQW1GO0FBQy9FLGVBQUtwQyxVQUFMLENBQWdCb0MsU0FBaEIsR0FBNEIsSUFBNUI7QUFDQSxlQUFLcEMsVUFBTCxDQUFnQm1DLFdBQWhCLEdBQThCLENBQTlCO0FBQ0FsRCxVQUFBQSxTQUFTLENBQUNBLFNBQVYsQ0FBb0J5QyxLQUFwQixDQUEwQixLQUFLM0IsV0FBL0IsRUFBNEMrQixTQUE1QyxHQUF3RCxDQUF4RDtBQUNBLGVBQUszQixhQUFMLENBQW1CNkIsY0FBbkIsQ0FBa0MsS0FBSzdCLGFBQUwsQ0FBbUJrQixJQUFyRCxFQUEyRCxpQkFBM0Q7QUFDQSxlQUFLZ0IsVUFBTCxDQUFnQlosUUFBaEI7QUFDQSxlQUFLekIsVUFBTCxDQUFnQnNDLGFBQWhCO0FBQ0EsZUFBS2pCLElBQUwsQ0FBVUMsT0FBVjtBQUNILFNBUkQsTUFRTztBQUNILGNBQUksS0FBS3RCLFVBQUwsQ0FBZ0JvQyxTQUFoQixJQUE2QixJQUE3QixJQUFxQyxLQUFLcEMsVUFBTCxDQUFnQm1DLFdBQWhCLElBQStCLENBQXhFLEVBQTJFO0FBQ3ZFLGlCQUFLRSxVQUFMLENBQWdCWixRQUFoQjtBQUNIOztBQUFBO0FBQ0o7O0FBQUE7QUFDSixPQWREOztBQWVBLFdBQUtRLFFBQUwsQ0FBY1IsUUFBZCxFQUF3QixHQUF4QjtBQUNIOztBQUFBO0FBQ0osR0E1RUk7QUE2RUxjLEVBQUFBLE1BN0VLLG9CQTZFSSxDQUFHLENBN0VQO0FBK0VMMUIsRUFBQUEsS0EvRUssbUJBK0VHLENBRVAsQ0FqRkksQ0FtRkw7O0FBbkZLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciB1c2VyX2RhdGEgPSByZXF1aXJlKFwidXNlcl9kYXRhXCIpO1xyXG52YXIgY29uZmlnID0gcmVxdWlyZShcImNvbmZpZ1wiKTtcclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICByb2xlX3Nwcml0ZTogY2MuU3ByaXRlLFxyXG4gICAgICAgIHJvbGVfYXJyOiBbY2MuU3ByaXRlRnJhbWVdLFxyXG4gICAgICAgIGNlbnRlcl9ub2RlOiBjYy5Ob2RlLFxyXG4gICAgfSxcclxuICAgIC8v5Yid5aeL5YyW6IqC54K5XHJcbiAgICBpbmlfbm9kZShzdGFmZl9pbmRleCkge1xyXG4gICAgICAgIHRoaXMuYWRfY29udHJvbCA9IGNjLmZpbmQoXCJhZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcImFkX2NvbnRyb2xcIik7XHJcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9zY2VuZVwiKTtcclxuICAgICAgICB0aGlzLmFkc01hbmFnZXJfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJBZHNNYW5hZ2VyXCIpO1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbCA9IGNjLmZpbmQoXCJzb3VuZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcInNvdW5kX2NvbnRyb2xcIik7XHJcbiAgICAgICAgdGhpcy5hZF9jb250cm9sLnNob3dfYmFubmVyQWQoKTtcclxuICAgICAgICAvL+WIneWni+Wwj+S6uueahOW9ouixoVxyXG4gICAgICAgIHRoaXMuc3RhZmZfaW5kZXggPSBzdGFmZl9pbmRleDtcclxuICAgICAgICB0aGlzLnJvbGVfc3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5yb2xlX2FycltzdGFmZl9pbmRleF07XHJcbiAgICAgICAgdGhpcy5jZW50ZXJfbm9kZS5zY2FsZSA9IDA7XHJcbiAgICAgICAgdGhpcy5pbmlfYW5pbSgpO1xyXG4gICAgfSxcclxuICAgIC8v5Yid5aeL5YyW5Yqo55S7XHJcbiAgICBpbmlfYW5pbSgpIHtcclxuICAgICAgICBjYy50d2Vlbih0aGlzLmNlbnRlcl9ub2RlKVxyXG4gICAgICAgICAgICAudG8oMC4zLCB7IHNjYWxlOiAxIH0sIHsgZWFzaW5nOiBcInNpbmVPdXRcIiB9KVxyXG4gICAgICAgICAgICAuc3RhcnQoKTtcclxuICAgIH0sXHJcbiAgICAvL2kgd2FubmEgYnV0dG9uIGNsaWNrXHJcbiAgICBvbl9pd2FubmFfYnV0dG9uX2NsaWNrKCkge1xyXG4gICAgICAgIGNjLmxvZyhcImNyZWF0ZV9hZFwiKTtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fY2xpY2tcIik7XHJcbiAgICAgICAgdGhpcy5hZF9jb250cm9sLnNob3dfdmlkZW9BZChcInN0YWZmX3Jlc3RcIik7XHJcbiAgICAgICAgdGhpcy52aWRlb19zdWNjZXMoKTtcclxuICAgIH0sXHJcbiAgICBvbl90b3VjaF9leGl0X2NsaWNrKGUpIHtcclxuICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgfSxcclxuICAgIC8va2VlcCByZXN0XHJcbiAgICBvbl9rZWVwX3Jlc3RfYnV0dG9uX2NsaWNrKCkge1xyXG4gICAgICAgIC8vIHVzZXJfZGF0YS51c2VyX2RhdGEuc3RhZmZbdGhpcy5zdGFmZl9pbmRleF0ubm93X3RpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSAvMTAwMDtcclxuICAgICAgICAvLyB1c2VyX2RhdGEudXNlcl9kYXRhLnN0YWZmW3RoaXMuc3RhZmZfaW5kZXhdLm92ZXJfdGltZSAtPSBjb25maWcuc3RhZmZbdGhpcy5zdGFmZl9pbmRleF0ucmVzdF90aW1lO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiNDMgbm93IHRpbWUgXCIgKyB1c2VyX2RhdGEudXNlcl9kYXRhLnN0YWZmW3RoaXMuc3RhZmZfaW5kZXhdLm5vd190aW1lICk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCI0NCByZXN0IHRpbWUgXCIgKyBjb25maWcuc3RhZmZbdGhpcy5zdGFmZl9pbmRleF0ucmVzdF90aW1lICk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCI0NSBvdmVyIHRpbWVcIiArIHVzZXJfZGF0YS51c2VyX2RhdGEuc3RhZmZbdGhpcy5zdGFmZl9pbmRleF0ub3Zlcl90aW1lKTtcclxuICAgICAgICB0aGlzLmFkc01hbmFnZXJfanMuc2hvd1Jld2FyZGVkVmlkZW8oKCkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIFwic3RhZmZfcmVzdF9vdmVyXCIpO1xyXG4gICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5zdGFmZlt0aGlzLnN0YWZmX2luZGV4XS5ub3dfdGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMDtcclxuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuc3RhZmZbdGhpcy5zdGFmZl9pbmRleF0ub3Zlcl90aW1lIC09IGNvbmZpZy5zdGFmZlt0aGlzLnN0YWZmX2luZGV4XS5yZXN0X3RpbWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIFwic3RhZmZfcmVzdF9vdmVyXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZShjYWxsYmFjaywgMC4yKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLy/mo4DmtYvop4bpopHmmK/lkKbmkq3mlL7miJDlip9cclxuICAgIHZpZGVvX3N1Y2NlczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgKHd4KSAhPSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFkX2NvbnRyb2wudmlkZW9fc3RhdGUgPT0gMSAmJiB0aGlzLmFkX2NvbnRyb2wudmlkZW9fdGFnID09IFwic3RhZmZfcmVzdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZF9jb250cm9sLnZpZGVvX3RhZyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZF9jb250cm9sLnZpZGVvX3N0YXRlID0gMjtcclxuICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnN0YWZmW3RoaXMuc3RhZmZfaW5kZXhdLm92ZXJfdGltZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9zY2VuZV9qcy5ub2RlLCBcInN0YWZmX3Jlc3Rfb3ZlclwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUoY2FsbGJhY2spO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRfY29udHJvbC5oaWRlX2Jhbm5lckFkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYWRfY29udHJvbC52aWRlb190YWcgPT0gbnVsbCAmJiB0aGlzLmFkX2NvbnRyb2wudmlkZW9fc3RhdGUgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUoY2FsbGJhY2spO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlKGNhbGxiYWNrLCAwLjIpO1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgb25Mb2FkKCkgeyB9LFxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pO1xyXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ui/shop_buy_ui.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0a0a9CsR95G0pgJYvQVl3KG', 'shop_buy_ui');
// script/ui/shop_buy_ui.js

"use strict";

var _user_data = _interopRequireDefault(require("user_data"));

var _config = _interopRequireDefault(require("config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

cc.Class({
  "extends": cc.Component,
  properties: {
    icon_sprite: cc.Sprite,
    introduce_label: cc.Label,
    introduce1_label: cc.Label,
    introduce2_label: cc.Label,
    introduce3_label: cc.Label,
    introduce4_label: cc.Label,
    buy_button: cc.Button,
    cost_label: cc.Label,
    price_difference_label: cc.Label,
    have_icon: cc.Node,
    star4_icon: cc.Node
  },
  ini_node: function ini_node(type, index, icon_frame) {
    this.type = type;
    this.index = index;
    this.icon_frame = icon_frame;
    this.sound_control = cc.find("sound_control").getComponent("sound_control");
    this.ad_control = cc.find("ad_control").getComponent("ad_control");
    this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
    this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
    this.ad_car = null; //默认状态

    this.price_difference_label.node.active = true;
    this.buy_button.node.active = true;
    this.update_node();
    this.create_ad_car();
  },
  update_node: function update_node() {
    this.icon_sprite.spriteFrame = this.icon_frame;
    var level = _user_data["default"].user_data.level;

    switch (this.type) {
      case "land":
        this.introduce4_label.node.active = false;
        this.star4_icon.active = false;

        if (level >= _config["default"].land[this.index].need_level) {
          //达到解锁条件
          this.introduce_label.string = "Additional planting area";
          this.introduce1_label.string = "More area to planting";
          this.introduce2_label.string = "Remember to water";
          this.introduce3_label.string = "Level " + _config["default"].land[this.index].need_level + " unlock";

          if (_user_data["default"].user_data.land[this.index].have == 0) {
            //未拥有
            this.price_difference = _config["default"].land[this.index].cost - _user_data["default"].user_data.gold;
            this.cost_label.string = _config["default"].land[this.index].cost;
            this.have_icon.active = false;

            if (_user_data["default"].user_data.gold >= _config["default"].land[this.index].cost) {
              //金币足够
              this.buy_button.interactable = true;
              this.price_difference_label.node.active = false;
            } else {
              //金币不足
              this.buy_button.interactable = false;
              this.price_difference_label.string = "Not enough gold coins, not enough" + this.price_difference;
            }

            ;
          } else {
            //已拥有
            this.have_icon.active = true;
            this.buy_button.node.active = false;
            this.price_difference_label.node.active = false;
          }

          ;
        } else {
          //未达到解锁条件
          this.introduce_label.string = "???";
          this.introduce1_label.string = "???";
          this.introduce2_label.string = "???";
          this.introduce3_label.string = "Level " + _config["default"].land[this.index].need_level + " unlock";
          this.price_difference_label.node.active = false;
          this.cost_label.string = "???";
          this.buy_button.interactable = false;
          this.have_icon.active = false;
        }

        ;
        break;

      case "plant":
        this.introduce4_label.node.active = true;
        this.star4_icon.active = true;

        if (level >= _config["default"].plant[this.index].need_level) {
          //达到解锁条件
          this.introduce_label.string = _config["default"].plant[this.index].introduce;
          this.introduce1_label.string = "Sale value: " + _config["default"].plant[this.index].sell;
          this.introduce2_label.string = "Livespan: " + _config["default"].plant[this.index].grow_time + "second";
          this.introduce3_label.string = "Experience: " + _config["default"].plant[this.index].exp;
          this.introduce4_label.string = "Level " + _config["default"].plant[this.index].need_level + " unlock";

          if (_user_data["default"].user_data.plant[this.index].have == 0) {
            //未拥有
            this.price_difference = _config["default"].plant[this.index].cost - _user_data["default"].user_data.gold;
            this.cost_label.string = _config["default"].plant[this.index].cost;
            this.have_icon.active = false;

            if (_user_data["default"].user_data.gold >= _config["default"].plant[this.index].cost) {
              //金币足够
              this.buy_button.interactable = true;
              this.price_difference_label.node.active = false;
            } else {
              //金币不足
              this.buy_button.interactable = false;
              this.price_difference_label.string = "Not enough gold coins, not enough" + this.price_difference;
            }

            ;
          } else {
            //已拥有
            this.have_icon.active = true;
            this.buy_button.node.active = false;
            this.price_difference_label.node.active = false;
          }

          ;
        } else {
          //未达到解锁条件
          this.introduce_label.string = "???";
          this.introduce1_label.string = "???";
          this.introduce2_label.string = "???";
          this.introduce3_label.string = "???";
          this.introduce4_label.string = "Level " + _config["default"].plant[this.index].need_level + " unlock";
          this.price_difference_label.node.active = false;
          this.cost_label.string = "???";
          this.buy_button.interactable = false;
          this.have_icon.active = false;
        }

        ;
        break;
    }

    ;
  },
  //购买按钮被点击
  on_buy_button_click: function on_buy_button_click() {
    switch (this.type) {
      case "land":
        if (_user_data["default"].user_data.land[this.index].have == 1) {
          return;
        } else {
          //judge money
          if (_user_data["default"].user_data.gold >= _config["default"].land[this.index].cost) {
            //金币足够
            this.sound_control.play_sound_effect("button_click");
            var cost = _config["default"].land[this.index].cost;
            this.game_rules_js.add_gold(-cost);
            _user_data["default"].user_data.land[this.index].have = 1;
            this.game_scene_js.create_tips_ui(this.game_scene_js.node, "buy_succes"); //刷新土地

            this.game_rules_js.updata_land(this.index);
          } else {
            //金币不足
            this.sound_control.play_sound_effect("un_click");
            this.game_scene_js.create_tips_ui(this.game_scene_js.node, "no_money");
          }

          ;
        }

        ;
        break;

      case "plant":
        if (_user_data["default"].user_data.plant[this.index].have == 1) {
          return;
        } else {
          //judge money
          if (_user_data["default"].user_data.gold >= _config["default"].plant[this.index].cost) {
            //金币足够
            this.sound_control.play_sound_effect("button_click");
            var cost = _config["default"].plant[this.index].cost;
            this.game_rules_js.add_gold(-cost);
            _user_data["default"].user_data.plant[this.index].have = 1;
            this.game_scene_js.create_tips_ui(this.game_scene_js.node, "buy_succes");
          } else {
            //金币不足
            this.sound_control.play_sound_effect("un_click");
            this.game_scene_js.create_tips_ui(this.game_scene_js.node, "no_money");
          }

          ;
        }

        ;
        break;
    }

    ;
    this.update_node();
  },
  //更新schedule
  update_schedule: function update_schedule() {
    var callback = function callback() {
      this.update_node();
    };

    this.schedule(callback, 1);
  },
  //touch exit
  touch_exit: function touch_exit() {
    this.sound_control.play_sound_effect("button_exit");

    if (this.ad_car !== null) {
      cc.log("ad_car destroy");
      this.ad_car.destroy();
    }

    ;
    this.ad_control.hide_bannerAd();
    this.game_scene_js.on_node_kill(this.node);
  },
  create_ad_car: function create_ad_car() {
    switch (this.type) {
      case "land":
        if (_user_data["default"].user_data.land[this.index].have != 1) {
          //未拥有这块地
          var gold = _user_data["default"].user_data.gold;
          var all_capacity = 500 * _user_data["default"].user_data.skill["gold_max"] + 500;
          var cost = _config["default"].land[this.index].cost; //差价

          var price_difference = cost - gold; //大于4/5,且能够拥有，且金币不足

          if (gold >= cost * (4 / 5) && all_capacity >= cost && gold < cost) {
            this.ad_control.hide_bannerAd();
            this.ad_car = this.game_scene_js.create_ad_car(this.node, price_difference);
          } else {}

          ;
        } else {
          //拥有这块地
          return;
        }

        break;

      case "plant":
        if (_user_data["default"].user_data.plant[this.index].have != 1) {
          //未拥有这个植物
          var gold = _user_data["default"].user_data.gold;
          var all_capacity = 500 * _user_data["default"].user_data.skill["gold_max"] + 500;
          var cost = _config["default"].plant[this.index].cost; //差价

          var price_difference = cost - gold; //大于4/5,且能够拥有，且金币不足

          if (gold >= cost * (4 / 5) && all_capacity >= cost && gold < cost) {
            this.ad_control.hide_bannerAd();
            this.ad_car = this.game_scene_js.create_ad_car(this.node, price_difference);
          } else {}

          ;
        } else {
          //拥有这个植物
          return;
        }

        break;
    }

    ;
  },
  // onLoad () {},
  start: function start() {
    this.update_schedule();
  } // update (dt) {},

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcc2hvcF9idXlfdWkuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJpY29uX3Nwcml0ZSIsIlNwcml0ZSIsImludHJvZHVjZV9sYWJlbCIsIkxhYmVsIiwiaW50cm9kdWNlMV9sYWJlbCIsImludHJvZHVjZTJfbGFiZWwiLCJpbnRyb2R1Y2UzX2xhYmVsIiwiaW50cm9kdWNlNF9sYWJlbCIsImJ1eV9idXR0b24iLCJCdXR0b24iLCJjb3N0X2xhYmVsIiwicHJpY2VfZGlmZmVyZW5jZV9sYWJlbCIsImhhdmVfaWNvbiIsIk5vZGUiLCJzdGFyNF9pY29uIiwiaW5pX25vZGUiLCJ0eXBlIiwiaW5kZXgiLCJpY29uX2ZyYW1lIiwic291bmRfY29udHJvbCIsImZpbmQiLCJnZXRDb21wb25lbnQiLCJhZF9jb250cm9sIiwiZ2FtZV9zY2VuZV9qcyIsImdhbWVfcnVsZXNfanMiLCJhZF9jYXIiLCJub2RlIiwiYWN0aXZlIiwidXBkYXRlX25vZGUiLCJjcmVhdGVfYWRfY2FyIiwic3ByaXRlRnJhbWUiLCJsZXZlbCIsInVzZXJfZGF0YSIsImNvbmZpZyIsImxhbmQiLCJuZWVkX2xldmVsIiwic3RyaW5nIiwiaGF2ZSIsInByaWNlX2RpZmZlcmVuY2UiLCJjb3N0IiwiZ29sZCIsImludGVyYWN0YWJsZSIsInBsYW50IiwiaW50cm9kdWNlIiwic2VsbCIsImdyb3dfdGltZSIsImV4cCIsIm9uX2J1eV9idXR0b25fY2xpY2siLCJwbGF5X3NvdW5kX2VmZmVjdCIsImFkZF9nb2xkIiwiY3JlYXRlX3RpcHNfdWkiLCJ1cGRhdGFfbGFuZCIsInVwZGF0ZV9zY2hlZHVsZSIsImNhbGxiYWNrIiwic2NoZWR1bGUiLCJ0b3VjaF9leGl0IiwibG9nIiwiZGVzdHJveSIsImhpZGVfYmFubmVyQWQiLCJvbl9ub2RlX2tpbGwiLCJhbGxfY2FwYWNpdHkiLCJza2lsbCIsInN0YXJ0Il0sIm1hcHBpbmdz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S0FBS3pCLEtBQWxCLEVBQXlCc0IsSUFBcEMsQ0FKaUQsQ0FLakQ7O0FBQ0EsY0FBSUQsZ0JBQWdCLEdBQUdDLElBQUksR0FBR0MsSUFBOUIsQ0FOaUQsQ0FPakQ7O0FBQ0EsY0FBSUEsSUFBSSxJQUFJRCxJQUFJLElBQUksSUFBSSxDQUFSLENBQVosSUFBMEJxQixZQUFZLElBQUlyQixJQUExQyxJQUFrREMsSUFBSSxHQUFHRCxJQUE3RCxFQUFtRTtBQUMvRCxpQkFBS2pCLFVBQUwsQ0FBZ0JvQyxhQUFoQjtBQUNBLGlCQUFLakMsTUFBTCxHQUFjLEtBQUtGLGFBQUwsQ0FBbUJNLGFBQW5CLENBQWlDLEtBQUtILElBQXRDLEVBQTRDWSxnQkFBNUMsQ0FBZDtBQUNILFdBSEQsTUFHTyxDQUVOOztBQUFBO0FBQ0osU0FkRCxNQWNPO0FBQ0g7QUFDQTtBQUNIOztBQUNEO0FBekNSOztBQTBDQztBQUdKLEdBeE9JO0FBeU9MO0FBRUF3QixFQUFBQSxLQTNPSyxtQkEyT0c7QUFDSixTQUFLVixlQUFMO0FBQ0gsR0E3T0ksQ0ErT0w7O0FBL09LLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB1c2VyX2RhdGEgZnJvbSBcInVzZXJfZGF0YVwiO1xyXG5pbXBvcnQgY29uZmlnIGZyb20gXCJjb25maWdcIjtcclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBpY29uX3Nwcml0ZTogY2MuU3ByaXRlLFxyXG4gICAgICAgIGludHJvZHVjZV9sYWJlbDogY2MuTGFiZWwsXHJcbiAgICAgICAgaW50cm9kdWNlMV9sYWJlbDogY2MuTGFiZWwsXHJcbiAgICAgICAgaW50cm9kdWNlMl9sYWJlbDogY2MuTGFiZWwsXHJcbiAgICAgICAgaW50cm9kdWNlM19sYWJlbDogY2MuTGFiZWwsXHJcbiAgICAgICAgaW50cm9kdWNlNF9sYWJlbDogY2MuTGFiZWwsXHJcbiAgICAgICAgYnV5X2J1dHRvbjogY2MuQnV0dG9uLFxyXG4gICAgICAgIGNvc3RfbGFiZWw6IGNjLkxhYmVsLFxyXG4gICAgICAgIHByaWNlX2RpZmZlcmVuY2VfbGFiZWw6IGNjLkxhYmVsLFxyXG4gICAgICAgIGhhdmVfaWNvbjogY2MuTm9kZSxcclxuICAgICAgICBzdGFyNF9pY29uOiBjYy5Ob2RlLFxyXG4gICAgfSxcclxuICAgIGluaV9ub2RlKHR5cGUsIGluZGV4LCBpY29uX2ZyYW1lKSB7XHJcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgdGhpcy5pY29uX2ZyYW1lID0gaWNvbl9mcmFtZTtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wgPSBjYy5maW5kKFwic291bmRfY29udHJvbFwiKS5nZXRDb21wb25lbnQoXCJzb3VuZF9jb250cm9sXCIpO1xyXG4gICAgICAgIHRoaXMuYWRfY29udHJvbCA9IGNjLmZpbmQoXCJhZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcImFkX2NvbnRyb2xcIik7XHJcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9zY2VuZVwiKTtcclxuICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJnYW1lX3J1bGVzXCIpO1xyXG4gICAgICAgIHRoaXMuYWRfY2FyID0gbnVsbDtcclxuICAgICAgICAvL+m7mOiupOeKtuaAgVxyXG4gICAgICAgIHRoaXMucHJpY2VfZGlmZmVyZW5jZV9sYWJlbC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5idXlfYnV0dG9uLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZV9ub2RlKCk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVfYWRfY2FyKCk7XHJcbiAgICB9LFxyXG4gICAgdXBkYXRlX25vZGUoKSB7XHJcbiAgICAgICAgdGhpcy5pY29uX3Nwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZTtcclxuICAgICAgICB2YXIgbGV2ZWwgPSB1c2VyX2RhdGEudXNlcl9kYXRhLmxldmVsO1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJsYW5kXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmludHJvZHVjZTRfbGFiZWwubm9kZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXI0X2ljb24uYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxldmVsID49IGNvbmZpZy5sYW5kW3RoaXMuaW5kZXhdLm5lZWRfbGV2ZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL+i+vuWIsOino+mUgeadoeS7tlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW50cm9kdWNlX2xhYmVsLnN0cmluZyA9IFwiQWRkaXRpb25hbCBwbGFudGluZyBhcmVhXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnRyb2R1Y2UxX2xhYmVsLnN0cmluZyA9IFwiTW9yZSBhcmVhIHRvIHBsYW50aW5nXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnRyb2R1Y2UyX2xhYmVsLnN0cmluZyA9IFwiUmVtZW1iZXIgdG8gd2F0ZXJcIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmludHJvZHVjZTNfbGFiZWwuc3RyaW5nID0gIFwiTGV2ZWwgXCIrY29uZmlnLmxhbmRbdGhpcy5pbmRleF0ubmVlZF9sZXZlbCArXCIgdW5sb2NrXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmluZGV4XS5oYXZlID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/mnKrmi6XmnIlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmljZV9kaWZmZXJlbmNlID0gY29uZmlnLmxhbmRbdGhpcy5pbmRleF0uY29zdCAtIHVzZXJfZGF0YS51c2VyX2RhdGEuZ29sZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb3N0X2xhYmVsLnN0cmluZyA9IGNvbmZpZy5sYW5kW3RoaXMuaW5kZXhdLmNvc3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGF2ZV9pY29uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkID49IGNvbmZpZy5sYW5kW3RoaXMuaW5kZXhdLmNvc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v6YeR5biB6Laz5aSfXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1eV9idXR0b24uaW50ZXJhY3RhYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJpY2VfZGlmZmVyZW5jZV9sYWJlbC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/ph5HluIHkuI3otrNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnV5X2J1dHRvbi5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJpY2VfZGlmZmVyZW5jZV9sYWJlbC5zdHJpbmcgPSBcIk5vdCBlbm91Z2ggZ29sZCBjb2lucywgbm90IGVub3VnaFwiICsgdGhpcy5wcmljZV9kaWZmZXJlbmNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5bey5oul5pyJXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGF2ZV9pY29uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnV5X2J1dHRvbi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByaWNlX2RpZmZlcmVuY2VfbGFiZWwubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvL+acqui+vuWIsOino+mUgeadoeS7tlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW50cm9kdWNlX2xhYmVsLnN0cmluZyA9IFwiPz8/XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnRyb2R1Y2UxX2xhYmVsLnN0cmluZyA9IFwiPz8/XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnRyb2R1Y2UyX2xhYmVsLnN0cmluZyA9IFwiPz8/XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnRyb2R1Y2UzX2xhYmVsLnN0cmluZyA9IFwiTGV2ZWwgXCIrY29uZmlnLmxhbmRbdGhpcy5pbmRleF0ubmVlZF9sZXZlbCArXCIgdW5sb2NrXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmljZV9kaWZmZXJlbmNlX2xhYmVsLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb3N0X2xhYmVsLnN0cmluZyA9IFwiPz8/XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idXlfYnV0dG9uLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGF2ZV9pY29uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInBsYW50XCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmludHJvZHVjZTRfbGFiZWwubm9kZS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcjRfaWNvbi5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmIChsZXZlbCA+PSBjb25maWcucGxhbnRbdGhpcy5pbmRleF0ubmVlZF9sZXZlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8v6L6+5Yiw6Kej6ZSB5p2h5Lu2XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnRyb2R1Y2VfbGFiZWwuc3RyaW5nID0gY29uZmlnLnBsYW50W3RoaXMuaW5kZXhdLmludHJvZHVjZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmludHJvZHVjZTFfbGFiZWwuc3RyaW5nID0gXCJTYWxlIHZhbHVlOiBcIiArIGNvbmZpZy5wbGFudFt0aGlzLmluZGV4XS5zZWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW50cm9kdWNlMl9sYWJlbC5zdHJpbmcgPSBcIkxpdmVzcGFuOiBcIiArIGNvbmZpZy5wbGFudFt0aGlzLmluZGV4XS5ncm93X3RpbWUgKyBcInNlY29uZFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW50cm9kdWNlM19sYWJlbC5zdHJpbmcgPSBcIkV4cGVyaWVuY2U6IFwiICsgY29uZmlnLnBsYW50W3RoaXMuaW5kZXhdLmV4cDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmludHJvZHVjZTRfbGFiZWwuc3RyaW5nID0gXCJMZXZlbCBcIitjb25maWcucGxhbnRbdGhpcy5pbmRleF0ubmVlZF9sZXZlbCtcIiB1bmxvY2tcIjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5wbGFudFt0aGlzLmluZGV4XS5oYXZlID09IDApIHsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5pyq5oul5pyJXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJpY2VfZGlmZmVyZW5jZSA9IGNvbmZpZy5wbGFudFt0aGlzLmluZGV4XS5jb3N0IC0gdXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvc3RfbGFiZWwuc3RyaW5nID0gY29uZmlnLnBsYW50W3RoaXMuaW5kZXhdLmNvc3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGF2ZV9pY29uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkID49IGNvbmZpZy5wbGFudFt0aGlzLmluZGV4XS5jb3N0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+mHkeW4gei2s+Wkn1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5idXlfYnV0dG9uLmludGVyYWN0YWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByaWNlX2RpZmZlcmVuY2VfbGFiZWwubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v6YeR5biB5LiN6LazXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1eV9idXR0b24uaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByaWNlX2RpZmZlcmVuY2VfbGFiZWwuc3RyaW5nID0gXCJOb3QgZW5vdWdoIGdvbGQgY29pbnMsIG5vdCBlbm91Z2hcIiArIHRoaXMucHJpY2VfZGlmZmVyZW5jZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+W3suaLpeaciVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhdmVfaWNvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1eV9idXR0b24ubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmljZV9kaWZmZXJlbmNlX2xhYmVsLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/mnKrovr7liLDop6PplIHmnaHku7ZcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmludHJvZHVjZV9sYWJlbC5zdHJpbmcgPSBcIj8/P1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW50cm9kdWNlMV9sYWJlbC5zdHJpbmcgPSBcIj8/P1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW50cm9kdWNlMl9sYWJlbC5zdHJpbmcgPSBcIj8/P1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW50cm9kdWNlM19sYWJlbC5zdHJpbmcgPSBcIj8/P1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW50cm9kdWNlNF9sYWJlbC5zdHJpbmcgPSBcIkxldmVsIFwiK2NvbmZpZy5wbGFudFt0aGlzLmluZGV4XS5uZWVkX2xldmVsK1wiIHVubG9ja1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJpY2VfZGlmZmVyZW5jZV9sYWJlbC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29zdF9sYWJlbC5zdHJpbmcgPSBcIj8/P1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnV5X2J1dHRvbi5pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhdmVfaWNvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8v6LSt5Lmw5oyJ6ZKu6KKr54K55Ye7XHJcbiAgICBvbl9idXlfYnV0dG9uX2NsaWNrKCkge1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJsYW5kXCI6XHJcbiAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMuaW5kZXhdLmhhdmUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9qdWRnZSBtb25leVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQgPj0gY29uZmlnLmxhbmRbdGhpcy5pbmRleF0uY29zdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+mHkeW4gei2s+Wkn1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fY2xpY2tcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb3N0ID0gY29uZmlnLmxhbmRbdGhpcy5pbmRleF0uY29zdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLmFkZF9nb2xkKC1jb3N0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMuaW5kZXhdLmhhdmUgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIFwiYnV5X3N1Y2Nlc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/liLfmlrDlnJ/lnLBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLnVwZGF0YV9sYW5kKHRoaXMuaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v6YeR5biB5LiN6LazXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcInVuX2NsaWNrXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIFwibm9fbW9uZXlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInBsYW50XCI6XHJcbiAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5wbGFudFt0aGlzLmluZGV4XS5oYXZlID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vanVkZ2UgbW9uZXlcclxuICAgICAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkID49IGNvbmZpZy5wbGFudFt0aGlzLmluZGV4XS5jb3N0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v6YeR5biB6Laz5aSfXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9jbGlja1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvc3QgPSBjb25maWcucGxhbnRbdGhpcy5pbmRleF0uY29zdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLmFkZF9nb2xkKC1jb3N0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5wbGFudFt0aGlzLmluZGV4XS5oYXZlID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9zY2VuZV9qcy5ub2RlLCBcImJ1eV9zdWNjZXNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/ph5HluIHkuI3otrNcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwidW5fY2xpY2tcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfc2NlbmVfanMubm9kZSwgXCJub19tb25leVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMudXBkYXRlX25vZGUoKTtcclxuICAgIH0sXHJcbiAgICAvL+abtOaWsHNjaGVkdWxlXHJcbiAgICB1cGRhdGVfc2NoZWR1bGUoKSB7XHJcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZV9ub2RlKCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlKGNhbGxiYWNrLCAxKVxyXG4gICAgfSxcclxuICAgIC8vdG91Y2ggZXhpdFxyXG4gICAgdG91Y2hfZXhpdCgpIHtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fZXhpdFwiKTtcclxuICAgICAgICBpZiAodGhpcy5hZF9jYXIgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgY2MubG9nKFwiYWRfY2FyIGRlc3Ryb3lcIilcclxuICAgICAgICAgICAgdGhpcy5hZF9jYXIuZGVzdHJveSgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5hZF9jb250cm9sLmhpZGVfYmFubmVyQWQoKTtcclxuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMub25fbm9kZV9raWxsKHRoaXMubm9kZSk7XHJcbiAgICB9LFxyXG4gICAgY3JlYXRlX2FkX2NhcigpIHtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwibGFuZFwiOlxyXG4gICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmluZGV4XS5oYXZlICE9IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL+acquaLpeaciei/meWdl+WcsFxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBnb2xkID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhbGxfY2FwYWNpdHkgPSA1MDAgKiB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1wiZ29sZF9tYXhcIl0gKyA1MDA7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvc3QgPSBjb25maWcubGFuZFt0aGlzLmluZGV4XS5jb3N0O1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5beu5Lu3XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByaWNlX2RpZmZlcmVuY2UgPSBjb3N0IC0gZ29sZDtcclxuICAgICAgICAgICAgICAgICAgICAvL+Wkp+S6jjQvNSzkuJTog73lpJ/mi6XmnInvvIzkuJTph5HluIHkuI3otrNcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZ29sZCA+PSBjb3N0ICogKDQgLyA1KSAmJiBhbGxfY2FwYWNpdHkgPj0gY29zdCAmJiBnb2xkIDwgY29zdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkX2NvbnRyb2wuaGlkZV9iYW5uZXJBZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkX2NhciA9IHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfYWRfY2FyKHRoaXMubm9kZSwgcHJpY2VfZGlmZmVyZW5jZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/mi6XmnInov5nlnZflnLBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJwbGFudFwiOlxyXG4gICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEucGxhbnRbdGhpcy5pbmRleF0uaGF2ZSAhPSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/mnKrmi6XmnInov5nkuKrmpI3nialcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZ29sZCA9IHVzZXJfZGF0YS51c2VyX2RhdGEuZ29sZDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYWxsX2NhcGFjaXR5ID0gNTAwICogdXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbFtcImdvbGRfbWF4XCJdICsgNTAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb3N0ID0gY29uZmlnLnBsYW50W3RoaXMuaW5kZXhdLmNvc3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/lt67ku7dcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcHJpY2VfZGlmZmVyZW5jZSA9IGNvc3QgLSBnb2xkO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5aSn5LqONC81LOS4lOiDveWkn+aLpeacie+8jOS4lOmHkeW4geS4jei2s1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChnb2xkID49IGNvc3QgKiAoNCAvIDUpICYmIGFsbF9jYXBhY2l0eSA+PSBjb3N0ICYmIGdvbGQgPCBjb3N0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRfY29udHJvbC5oaWRlX2Jhbm5lckFkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRfY2FyID0gdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9hZF9jYXIodGhpcy5ub2RlLCBwcmljZV9kaWZmZXJlbmNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvL+aLpeaciei/meS4quakjeeJqVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH07XHJcblxyXG5cclxuICAgIH0sXHJcbiAgICAvLyBvbkxvYWQgKCkge30sXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVfc2NoZWR1bGUoKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pO1xyXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ui/shop_content.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e17f8TZG8BKRJjti9x3zL2L', 'shop_content');
// script/ui/shop_content.js

"use strict";

var _user_data = _interopRequireDefault(require("user_data"));

var _config = _interopRequireDefault(require("config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

cc.Class({
  "extends": cc.Component,
  properties: {
    name_label: cc.Label,
    cost_label: cc.Label,
    need_level_label: cc.Label,
    gold_icon_node: cc.Node,
    plant_icon_frame_arr: [cc.SpriteFrame],
    land_frame: cc.SpriteFrame,
    icon_sprite: cc.Sprite,
    have_icon_node: cc.Node,
    button_tips_node: cc.Node
  },
  //初始化
  ini_node: function ini_node(type, index) {
    this.index = index;
    this.type = type;
    this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
    this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
    this.sound_control = cc.find("sound_control").getComponent("sound_control");
    this.have_icon_node.active = false;
    this.button_tips_node.active = false;
    this.update_content(); // this.update_schedule();
  },
  //刷新数据
  update_content: function update_content() {
    var callback = function callback() {
      var gold = _user_data["default"].user_data.gold;
      var level = _user_data["default"].user_data.level;

      switch (this.type) {
        case "land":
          this.name_label.string = _config["default"].land[this.index].name;
          this.icon_sprite.spriteFrame = this.land_frame;

          if (_user_data["default"].user_data.land[this.index].have == 1) {
            this.button_tips_node.active = false;
            this.cost_label.node.active = false;
            this.have_icon_node.active = true;
            this.need_level_label.node.active = false;
            this.gold_icon_node.active = false;
          } else {
            this.need_level_label.node.active = true;
            this.gold_icon_node.active = true;
            this.need_level_label.string = "Level " + _config["default"].land[this.index].need_level + " to unlock";

            if (level >= _config["default"].land[this.index].need_level) {
              this.cost_label.string = _config["default"].land[this.index].cost;
              this.need_level_label.string = "";
            } else {
              this.cost_label.string = "???";
            }

            ; //可以购买给与提示

            if (level >= _config["default"].land[this.index].need_level && gold >= _config["default"].land[this.index].cost) {
              this.button_tips_node.active = true;
            } else {
              this.button_tips_node.active = false;
            }

            ;
          }

          ;
          break;

        case "plant":
          this.name_label.string = _config["default"].plant[this.index].name;
          this.icon_sprite.spriteFrame = this.plant_icon_frame_arr[this.index];

          if (_user_data["default"].user_data.plant[this.index].have == 1) {
            this.button_tips_node.active = false;
            this.cost_label.node.active = false;
            this.have_icon_node.active = true;
            this.need_level_label.node.active = false;
            this.gold_icon_node.active = false;
          } else {
            this.gold_icon_node.active = true;
            this.need_level_label.node.active = true;
            this.need_level_label.string = "Need " + _config["default"].plant[this.index].need_level + " level unlock"; //等级满足显示金币消耗

            if (level >= _config["default"].plant[this.index].need_level) {
              this.cost_label.string = _config["default"].plant[this.index].cost;
              this.need_level_label.string = "";
            } else {
              this.cost_label.string = "???";
            }

            ; //可以购买给与提示

            if (level >= _config["default"].plant[this.index].need_level && gold >= _config["default"].plant[this.index].cost) {
              this.button_tips_node.active = true;
            } else {
              this.button_tips_node.active = false;
            }
          }

          ;
          break;
      }

      ;
    };

    this.schedule(callback, 0.1);
  },
  on_button_click: function on_button_click() {
    this.sound_control.play_sound_effect("button_click");
    this.game_scene_js.create_shop_buy_ui(this.type, this.index, this.icon_sprite.spriteFrame);
  },
  // onLoad () {},
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcc2hvcF9jb250ZW50LmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwibmFtZV9sYWJlbCIsIkxhYmVsIiwiY29zdF9sYWJlbCIsIm5lZWRfbGV2ZWxfbGFiZWwiLCJnb2xkX2ljb25fbm9kZSIsIk5vZGUiLCJwbGFudF9pY29uX2ZyYW1lX2FyciIsIlNwcml0ZUZyYW1lIiwibGFuZF9mcmFtZSIsImljb25fc3ByaXRlIiwiU3ByaXRlIiwiaGF2ZV9pY29uX25vZGUiLCJidXR0b25fdGlwc19ub2RlIiwiaW5pX25vZGUiLCJ0eXBlIiwiaW5kZXgiLCJnYW1lX3NjZW5lX2pzIiwiZmluZCIsImdldENvbXBvbmVudCIsImdhbWVfcnVsZXNfanMiLCJzb3VuZF9jb250cm9sIiwiYWN0aXZlIiwidXBkYXRlX2NvbnRlbnQiLCJjYWxsYmFjayIsImdvbGQiLCJ1c2VyX2RhdGEiLCJsZXZlbCIsInN0cmluZyIsImNvbmZpZyIsImxhbmQiLCJuYW1lIiwic3ByaXRlRnJhbWUiLCJoYXZlIiwibm9kZSIsIm5lZWRfbGV2ZWwiLCJjb3N0IiwicGxhbnQiLCJzY2hlZHVsZSIsIm9uX2J1dHRvbl9jbGljayIsInBsYXlfc291bmRfZWZmZWN0IiwiY3JlYXRlX3Nob3BfYnV5X3VpIiwic3RhcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFDQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFVBQVUsRUFBRUosRUFBRSxDQUFDSyxLQURQO0FBRVJDLElBQUFBLFVBQVUsRUFBRU4sRUFBRSxDQUFDSyxLQUZQO0FBR1JFLElBQUFBLGdCQUFnQixFQUFFUCxFQUFFLENBQUNLLEtBSGI7QUFJUkcsSUFBQUEsY0FBYyxFQUFFUixFQUFFLENBQUNTLElBSlg7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S0FBdEQsRUFBNkQsS0FBS04sV0FBTCxDQUFpQnNCLFdBQTlFO0FBQ0gsR0FsR0k7QUFtR0w7QUFFQVUsRUFBQUEsS0FyR0ssbUJBcUdHLENBRVAsQ0F2R0ksQ0F5R0w7O0FBekdLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB1c2VyX2RhdGEgZnJvbSBcInVzZXJfZGF0YVwiO1xyXG5pbXBvcnQgY29uZmlnIGZyb20gXCJjb25maWdcIjtcclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBuYW1lX2xhYmVsOiBjYy5MYWJlbCxcclxuICAgICAgICBjb3N0X2xhYmVsOiBjYy5MYWJlbCxcclxuICAgICAgICBuZWVkX2xldmVsX2xhYmVsOiBjYy5MYWJlbCxcclxuICAgICAgICBnb2xkX2ljb25fbm9kZTogY2MuTm9kZSxcclxuICAgICAgICBwbGFudF9pY29uX2ZyYW1lX2FycjogW2NjLlNwcml0ZUZyYW1lXSxcclxuICAgICAgICBsYW5kX2ZyYW1lOiBjYy5TcHJpdGVGcmFtZSxcclxuICAgICAgICBpY29uX3Nwcml0ZTogY2MuU3ByaXRlLFxyXG4gICAgICAgIGhhdmVfaWNvbl9ub2RlOiBjYy5Ob2RlLFxyXG4gICAgICAgIGJ1dHRvbl90aXBzX25vZGU6IGNjLk5vZGUsXHJcbiAgICB9LFxyXG4gICAgLy/liJ3lp4vljJZcclxuICAgIGluaV9ub2RlKHR5cGUsIGluZGV4KSB7XHJcbiAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xyXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9zY2VuZVwiKTtcclxuICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJnYW1lX3J1bGVzXCIpO1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbCA9IGNjLmZpbmQoXCJzb3VuZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcInNvdW5kX2NvbnRyb2xcIik7XHJcbiAgICAgICAgdGhpcy5oYXZlX2ljb25fbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmJ1dHRvbl90aXBzX25vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy51cGRhdGVfY29udGVudCgpO1xyXG4gICAgICAgIC8vIHRoaXMudXBkYXRlX3NjaGVkdWxlKCk7XHJcbiAgICB9LFxyXG4gICAgLy/liLfmlrDmlbDmja5cclxuICAgIHVwZGF0ZV9jb250ZW50KCkge1xyXG4gICAgICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHZhciBnb2xkID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkO1xyXG4gICAgICAgICAgICB2YXIgbGV2ZWwgPSB1c2VyX2RhdGEudXNlcl9kYXRhLmxldmVsO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcImxhbmRcIjpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5hbWVfbGFiZWwuc3RyaW5nID0gY29uZmlnLmxhbmRbdGhpcy5pbmRleF0ubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmljb25fc3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5sYW5kX2ZyYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5pbmRleF0uaGF2ZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uX3RpcHNfbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb3N0X2xhYmVsLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGF2ZV9pY29uX25vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZWVkX2xldmVsX2xhYmVsLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ29sZF9pY29uX25vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZWVkX2xldmVsX2xhYmVsLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nb2xkX2ljb25fbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5lZWRfbGV2ZWxfbGFiZWwuc3RyaW5nID0gXCJMZXZlbCBcIiArIGNvbmZpZy5sYW5kW3RoaXMuaW5kZXhdLm5lZWRfbGV2ZWwgKyBcIiB0byB1bmxvY2tcIjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsZXZlbCA+PSBjb25maWcubGFuZFt0aGlzLmluZGV4XS5uZWVkX2xldmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvc3RfbGFiZWwuc3RyaW5nID0gY29uZmlnLmxhbmRbdGhpcy5pbmRleF0uY29zdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmVlZF9sZXZlbF9sYWJlbC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb3N0X2xhYmVsLnN0cmluZyA9IFwiPz8/XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+WPr+S7pei0reS5sOe7meS4juaPkOekulxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGV2ZWwgPj0gY29uZmlnLmxhbmRbdGhpcy5pbmRleF0ubmVlZF9sZXZlbCAmJiBnb2xkID49IGNvbmZpZy5sYW5kW3RoaXMuaW5kZXhdLmNvc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uX3RpcHNfbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5idXR0b25fdGlwc19ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwicGxhbnRcIjpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5hbWVfbGFiZWwuc3RyaW5nID0gY29uZmlnLnBsYW50W3RoaXMuaW5kZXhdLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pY29uX3Nwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMucGxhbnRfaWNvbl9mcmFtZV9hcnJbdGhpcy5pbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEucGxhbnRbdGhpcy5pbmRleF0uaGF2ZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uX3RpcHNfbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb3N0X2xhYmVsLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGF2ZV9pY29uX25vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZWVkX2xldmVsX2xhYmVsLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ29sZF9pY29uX25vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nb2xkX2ljb25fbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5lZWRfbGV2ZWxfbGFiZWwubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5lZWRfbGV2ZWxfbGFiZWwuc3RyaW5nID0gXCJOZWVkIFwiICsgY29uZmlnLnBsYW50W3RoaXMuaW5kZXhdLm5lZWRfbGV2ZWwgKyBcIiBsZXZlbCB1bmxvY2tcIjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v562J57qn5ruh6Laz5pi+56S66YeR5biB5raI6ICXXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsZXZlbCA+PSBjb25maWcucGxhbnRbdGhpcy5pbmRleF0ubmVlZF9sZXZlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb3N0X2xhYmVsLnN0cmluZyA9IGNvbmZpZy5wbGFudFt0aGlzLmluZGV4XS5jb3N0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZWVkX2xldmVsX2xhYmVsLnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvc3RfbGFiZWwuc3RyaW5nID0gXCI/Pz9cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5Y+v5Lul6LSt5Lmw57uZ5LiO5o+Q56S6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsZXZlbCA+PSBjb25maWcucGxhbnRbdGhpcy5pbmRleF0ubmVlZF9sZXZlbCAmJiBnb2xkID49IGNvbmZpZy5wbGFudFt0aGlzLmluZGV4XS5jb3N0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbl90aXBzX25vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uX3RpcHNfbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlKGNhbGxiYWNrLCAwLjEpO1xyXG4gICAgfSxcclxuICAgIG9uX2J1dHRvbl9jbGljaygpIHtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fY2xpY2tcIik7XHJcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9zaG9wX2J1eV91aSh0aGlzLnR5cGUsIHRoaXMuaW5kZXgsIHRoaXMuaWNvbl9zcHJpdGUuc3ByaXRlRnJhbWUpO1xyXG4gICAgfSxcclxuICAgIC8vIG9uTG9hZCAoKSB7fSxcclxuXHJcbiAgICBzdGFydCgpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxyXG59KTtcclxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ui/skill_content.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7c496ymBi1J75GCQmvmEgyv', 'skill_content');
// script/ui/skill_content.js

"use strict";

var user_data = require("user_data");

cc.Class({
  "extends": cc.Component,
  properties: {
    name_frame: cc.Sprite,
    icon_frame: cc.Sprite,
    button_frame: cc.Sprite,
    level_label: cc.Label,
    introduce_label: cc.Label,
    progress: cc.ProgressBar,
    name_frame_arr: [cc.SpriteFrame],
    icon_frame_arr: [cc.SpriteFrame],
    button_frame_arr: [cc.SpriteFrame]
  },
  // LIFE-CYCLE CALLBACKS:
  ini_node: function ini_node(skill_index) {
    this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
    this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
    this.sound_control = cc.find("sound_control").getComponent("sound_control");
    this.skill_index = skill_index;
    this.set_content();
  },
  set_content: function set_content() {
    var gold_max = user_data.user_data.skill["gold_max"];
    var speed_the_cut = user_data.user_data.skill["speed_the_cut"];
    var water_saving = user_data.user_data.skill["water_saving"];
    var tool_improve = user_data.user_data.skill["tool_improve"];
    var labor_contract = user_data.user_data.skill["labor_contract"];
    var offline_profit = user_data.user_data.skill["offline_profit"];

    switch (this.skill_index) {
      case 0:
        this.icon_frame.spriteFrame = this.icon_frame_arr[this.skill_index];
        this.name_frame.spriteFrame = this.name_frame_arr[this.skill_index];
        this.button_frame.spriteFrame = this.button_frame_arr[0];
        this.introduce_label.string = "Max gold: " + (500 * gold_max + 500);
        this.level_label.string = "lv: " + gold_max;
        this.progress.progress = gold_max / 200;

        if (gold_max >= 200) {
          this.button_frame.node.active = false;
        } else this.button_frame.node.active = true;

        break;

      case 1:
        this.icon_frame.spriteFrame = this.icon_frame_arr[this.skill_index];
        this.name_frame.spriteFrame = this.name_frame_arr[this.skill_index];
        this.button_frame.spriteFrame = this.button_frame_arr[0];
        this.introduce_label.string = "Harvest plants faster " + (speed_the_cut + 1) + "%";
        this.level_label.string = "lv: " + speed_the_cut;
        this.progress.progress = speed_the_cut / 99;

        if (speed_the_cut >= 99) {
          this.button_frame.node.active = false;
        } else this.button_frame.node.active = true;

        break;

      case 2:
        this.icon_frame.spriteFrame = this.icon_frame_arr[this.skill_index];
        this.name_frame.spriteFrame = this.name_frame_arr[this.skill_index];
        this.button_frame.spriteFrame = this.button_frame_arr[0];
        this.introduce_label.string = "Plant growth consumes less resource " + (water_saving + 1) + "%";
        this.level_label.string = "lv: " + water_saving;
        this.progress.progress = water_saving / 99;

        if (water_saving >= 99) {
          this.button_frame.node.active = false;
        } else this.button_frame.node.active = true;

        break;

      case 3:
        this.icon_frame.spriteFrame = this.icon_frame_arr[this.skill_index];
        this.name_frame.spriteFrame = this.name_frame_arr[this.skill_index];
        this.button_frame.spriteFrame = this.button_frame_arr[0];
        this.introduce_label.string = "Faster planting " + (tool_improve + 1) + "%";
        this.level_label.string = "lv: " + tool_improve;
        this.progress.progress = tool_improve / 99;

        if (tool_improve >= 99) {
          this.button_frame.node.active = false;
        } else this.button_frame.node.active = true;

        break;

      case 4:
        this.icon_frame.spriteFrame = this.icon_frame_arr[this.skill_index];
        this.name_frame.spriteFrame = this.name_frame_arr[this.skill_index];
        this.button_frame.spriteFrame = this.button_frame_arr[0];
        this.introduce_label.string = "Extend worker hours " + (labor_contract + 1) + " \nseconds";
        this.level_label.string = "lv: " + labor_contract;
        this.progress.progress = labor_contract / 99;

        if (labor_contract >= 99) {
          this.button_frame.node.active = false;
        } else this.button_frame.node.active = true;

        break;

      case 5:
        this.icon_frame.spriteFrame = this.icon_frame_arr[this.skill_index];
        this.name_frame.spriteFrame = this.name_frame_arr[this.skill_index];
        this.button_frame.spriteFrame = this.button_frame_arr[0];
        this.introduce_label.string = "Extra every 5 minutes " + (offline_profit + 1) + " \ngold";
        this.level_label.string = "lv: " + offline_profit;
        this.progress.progress = offline_profit / 99;

        if (offline_profit >= 99) {
          this.button_frame.node.active = false;
        } else this.button_frame.node.active = true;

        break;

      default:
        return;
    }

    ;
  },
  //刷新button
  update_button: function update_button() {
    if (user_data.user_data.skill_point > 0) {
      this.button_frame.node.getComponent(cc.Button).interactable = true;
    } else {
      this.button_frame.node.getComponent(cc.Button).interactable = false;
    }

    ;

    var callback = function callback() {
      if (user_data.user_data.skill_point > 0) {
        this.button_frame.node.getComponent(cc.Button).interactable = true;
      } else {
        this.button_frame.node.getComponent(cc.Button).interactable = false;
      }

      ;

      for (var i = 0; i < 6; i++) {}
    };

    this.schedule(callback, 0.5);
  },
  on_button_click: function on_button_click() {
    if (user_data.user_data.skill_point >= 1) {
      user_data.user_data.skill_point--;

      switch (this.skill_index) {
        case 0:
          user_data.user_data.skill["gold_max"]++;
          this.game_rules_js.set_gold_progress();
          break;

        case 1:
          user_data.user_data.skill["speed_the_cut"]++;
          break;

        case 2:
          user_data.user_data.skill["water_saving"]++;
          break;

        case 3:
          user_data.user_data.skill["tool_improve"]++;
          break;

        case 4:
          user_data.user_data.skill["labor_contract"]++;
          break;

        case 5:
          user_data.user_data.skill["offline_profit"]++;
          break;
      }

      ;
      this.set_content();
      this.sound_control.play_sound_effect("button_click");
    } else {
      this.sound_control.play_sound_effect("un_click");
      this.game_scene_js.create_tips_ui(this.game_rules_js.node, "no_skill_point");
      return;
    }

    ;
  },
  onLoad: function onLoad() {},
  start: function start() {
    this.update_button();
  } // update (dt) {},

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcc2tpbGxfY29udGVudC5qcyJdLCJuYW1lcyI6WyJ1c2VyX2RhdGEiLCJyZXF1aXJlIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJuYW1lX2ZyYW1lIiwiU3ByaXRlIiwiaWNvbl9mcmFtZSIsImJ1dHRvbl9mcmFtZSIsImxldmVsX2xhYmVsIiwiTGFiZWwiLCJpbnRyb2R1Y2VfbGFiZWwiLCJwcm9ncmVzcyIsIlByb2dyZXNzQmFyIiwibmFtZV9mcmFtZV9hcnIiLCJTcHJpdGVGcmFtZSIsImljb25fZnJhbWVfYXJyIiwiYnV0dG9uX2ZyYW1lX2FyciIsImluaV9ub2RlIiwic2tpbGxfaW5kZXgiLCJnYW1lX3NjZW5lX2pzIiwiZmluZCIsImdldENvbXBvbmVudCIsImdhbWVfcnVsZXNfanMiLCJzb3VuZF9jb250cm9sIiwic2V0X2NvbnRlbnQiLCJnb2xkX21heCIsInNraWxsIiwic3BlZWRfdGhlX2N1dCIsIndhdGVyX3NhdmluZyIsInRvb2xfaW1wcm92ZSIsImxhYm9yX2NvbnRyYWN0Iiwib2ZmbGluZV9wcm9maXQiLCJzcHJpdGVGcmFtZSIsInN0cmluZyIsIm5vZGUiLCJhY3RpdmUiLCJ1cGRhdGVfYnV0dG9uIiwic2tpbGxfcG9pbnQiLCJCdXR0b24iLCJpbnRlcmFjdGFibGUiLCJjYWxsYmFjayIsImkiLCJzY2hlZHVsZSIsIm9uX2J1dHRvbl9jbGljayIsInNldF9nb2xkX3Byb2dyZXNzIiwicGxheV9zb3VuZF9lZmZlY3QiLCJjcmVhdGVfdGlwc191aSIsIm9uTG9hZCIsInN0YXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLFNBQVMsR0FBR0MsT0FBTyxDQUFDLFdBQUQsQ0FBdkI7O0FBQ0FDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxVQUFV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QXVLTEMsRUFBQUEsS0F2S0ssbUJBdUtHO0FBQ0osU0FBS1osYUFBTDtBQUNILEdBektJLENBMktMOztBQTNLSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgdXNlcl9kYXRhID0gcmVxdWlyZShcInVzZXJfZGF0YVwiKTtcclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBuYW1lX2ZyYW1lOiBjYy5TcHJpdGUsXHJcbiAgICAgICAgaWNvbl9mcmFtZTogY2MuU3ByaXRlLFxyXG4gICAgICAgIGJ1dHRvbl9mcmFtZTogY2MuU3ByaXRlLFxyXG4gICAgICAgIGxldmVsX2xhYmVsOiBjYy5MYWJlbCxcclxuICAgICAgICBpbnRyb2R1Y2VfbGFiZWw6IGNjLkxhYmVsLFxyXG4gICAgICAgIHByb2dyZXNzOiBjYy5Qcm9ncmVzc0JhcixcclxuICAgICAgICBuYW1lX2ZyYW1lX2FycjogW2NjLlNwcml0ZUZyYW1lXSxcclxuICAgICAgICBpY29uX2ZyYW1lX2FycjogW2NjLlNwcml0ZUZyYW1lXSxcclxuICAgICAgICBidXR0b25fZnJhbWVfYXJyOiBbY2MuU3ByaXRlRnJhbWVdLFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuICAgIGluaV9ub2RlOiBmdW5jdGlvbiAoc2tpbGxfaW5kZXgpIHtcclxuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJnYW1lX3NjZW5lXCIpO1xyXG4gICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfcnVsZXNcIik7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sID0gY2MuZmluZChcInNvdW5kX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwic291bmRfY29udHJvbFwiKTtcclxuICAgICAgICB0aGlzLnNraWxsX2luZGV4ID0gc2tpbGxfaW5kZXg7XHJcbiAgICAgICAgdGhpcy5zZXRfY29udGVudCgpO1xyXG4gICAgfSxcclxuICAgIHNldF9jb250ZW50OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGdvbGRfbWF4ID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbFtcImdvbGRfbWF4XCJdO1xyXG4gICAgICAgIHZhciBzcGVlZF90aGVfY3V0ID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbFtcInNwZWVkX3RoZV9jdXRcIl07XHJcbiAgICAgICAgdmFyIHdhdGVyX3NhdmluZyA9IHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxbXCJ3YXRlcl9zYXZpbmdcIl07XHJcbiAgICAgICAgdmFyIHRvb2xfaW1wcm92ZSA9IHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxbXCJ0b29sX2ltcHJvdmVcIl07XHJcbiAgICAgICAgdmFyIGxhYm9yX2NvbnRyYWN0ID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbFtcImxhYm9yX2NvbnRyYWN0XCJdO1xyXG4gICAgICAgIHZhciBvZmZsaW5lX3Byb2ZpdCA9IHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxbXCJvZmZsaW5lX3Byb2ZpdFwiXTtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuc2tpbGxfaW5kZXgpIHtcclxuICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2Fyclt0aGlzLnNraWxsX2luZGV4XTtcclxuICAgICAgICAgICAgICAgIHRoaXMubmFtZV9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMubmFtZV9mcmFtZV9hcnJbdGhpcy5za2lsbF9pbmRleF07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuYnV0dG9uX2ZyYW1lX2FyclswXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW50cm9kdWNlX2xhYmVsLnN0cmluZyA9IFwiTWF4IGdvbGQ6IFwiICsgKDUwMCAqIGdvbGRfbWF4ICsgNTAwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubGV2ZWxfbGFiZWwuc3RyaW5nID0gXCJsdjogXCIgKyBnb2xkX21heDtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3MucHJvZ3Jlc3MgPSBnb2xkX21heCAvIDIwMDtcclxuICAgICAgICAgICAgICAgIGlmIChnb2xkX21heCA+PSAyMDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbl9mcmFtZS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB0aGlzLmJ1dHRvbl9mcmFtZS5ub2RlLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbdGhpcy5za2lsbF9pbmRleF07XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5hbWVfZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLm5hbWVfZnJhbWVfYXJyW3RoaXMuc2tpbGxfaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmJ1dHRvbl9mcmFtZV9hcnJbMF07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmludHJvZHVjZV9sYWJlbC5zdHJpbmcgPSBcIkhhcnZlc3QgcGxhbnRzIGZhc3RlciBcIiArIChzcGVlZF90aGVfY3V0ICsgMSkgKyBcIiVcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMubGV2ZWxfbGFiZWwuc3RyaW5nID0gXCJsdjogXCIgKyBzcGVlZF90aGVfY3V0O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzcy5wcm9ncmVzcyA9IHNwZWVkX3RoZV9jdXQgLyA5OTtcclxuICAgICAgICAgICAgICAgIGlmIChzcGVlZF90aGVfY3V0ID49IDk5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idXR0b25fZnJhbWUubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgdGhpcy5idXR0b25fZnJhbWUubm9kZS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyW3RoaXMuc2tpbGxfaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uYW1lX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5uYW1lX2ZyYW1lX2Fyclt0aGlzLnNraWxsX2luZGV4XTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5idXR0b25fZnJhbWVfYXJyWzBdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnRyb2R1Y2VfbGFiZWwuc3RyaW5nID0gXCJQbGFudCBncm93dGggY29uc3VtZXMgbGVzcyByZXNvdXJjZSBcIiArICh3YXRlcl9zYXZpbmcgKyAxKSArIFwiJVwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbF9sYWJlbC5zdHJpbmcgPSBcImx2OiBcIiArIHdhdGVyX3NhdmluZztcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3MucHJvZ3Jlc3MgPSB3YXRlcl9zYXZpbmcgLyA5OTtcclxuICAgICAgICAgICAgICAgIGlmICh3YXRlcl9zYXZpbmcgPj0gOTkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbl9mcmFtZS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB0aGlzLmJ1dHRvbl9mcmFtZS5ub2RlLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbdGhpcy5za2lsbF9pbmRleF07XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5hbWVfZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLm5hbWVfZnJhbWVfYXJyW3RoaXMuc2tpbGxfaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmJ1dHRvbl9mcmFtZV9hcnJbMF07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmludHJvZHVjZV9sYWJlbC5zdHJpbmcgPSBcIkZhc3RlciBwbGFudGluZyBcIiArICh0b29sX2ltcHJvdmUgKyAxKSArIFwiJVwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbF9sYWJlbC5zdHJpbmcgPSBcImx2OiBcIiArIHRvb2xfaW1wcm92ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3MucHJvZ3Jlc3MgPSB0b29sX2ltcHJvdmUgLyA5OTtcclxuICAgICAgICAgICAgICAgIGlmICh0b29sX2ltcHJvdmUgPj0gOTkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbl9mcmFtZS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB0aGlzLmJ1dHRvbl9mcmFtZS5ub2RlLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbdGhpcy5za2lsbF9pbmRleF07XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5hbWVfZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLm5hbWVfZnJhbWVfYXJyW3RoaXMuc2tpbGxfaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmJ1dHRvbl9mcmFtZV9hcnJbMF07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmludHJvZHVjZV9sYWJlbC5zdHJpbmcgPSBcIkV4dGVuZCB3b3JrZXIgaG91cnMgXCIgKyAobGFib3JfY29udHJhY3QgKyAxKSArIFwiIFxcbnNlY29uZHNcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMubGV2ZWxfbGFiZWwuc3RyaW5nID0gXCJsdjogXCIgKyBsYWJvcl9jb250cmFjdDtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3MucHJvZ3Jlc3MgPSBsYWJvcl9jb250cmFjdCAvIDk5O1xyXG4gICAgICAgICAgICAgICAgaWYgKGxhYm9yX2NvbnRyYWN0ID49IDk5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idXR0b25fZnJhbWUubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgdGhpcy5idXR0b25fZnJhbWUubm9kZS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyW3RoaXMuc2tpbGxfaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uYW1lX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5uYW1lX2ZyYW1lX2Fyclt0aGlzLnNraWxsX2luZGV4XTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5idXR0b25fZnJhbWVfYXJyWzBdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnRyb2R1Y2VfbGFiZWwuc3RyaW5nID0gXCJFeHRyYSBldmVyeSA1IG1pbnV0ZXMgXCIgKyAob2ZmbGluZV9wcm9maXQgKyAxKSArIFwiIFxcbmdvbGRcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMubGV2ZWxfbGFiZWwuc3RyaW5nID0gXCJsdjogXCIgKyBvZmZsaW5lX3Byb2ZpdDtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3MucHJvZ3Jlc3MgPSBvZmZsaW5lX3Byb2ZpdCAvIDk5O1xyXG4gICAgICAgICAgICAgICAgaWYgKG9mZmxpbmVfcHJvZml0ID49IDk5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idXR0b25fZnJhbWUubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgdGhpcy5idXR0b25fZnJhbWUubm9kZS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLy/liLfmlrBidXR0b25cclxuICAgIHVwZGF0ZV9idXR0b24oKSB7XHJcbiAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxfcG9pbnQgPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uX2ZyYW1lLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmJ1dHRvbl9mcmFtZS5ub2RlLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbF9wb2ludCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uX2ZyYW1lLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uX2ZyYW1lLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9MDsgaTw2OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUoY2FsbGJhY2ssIDAuNSk7XHJcbiAgICB9LFxyXG4gICAgb25fYnV0dG9uX2NsaWNrOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxfcG9pbnQgPj0gMSkge1xyXG4gICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsX3BvaW50LS07XHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5za2lsbF9pbmRleCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxbXCJnb2xkX21heFwiXSsrO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcy5zZXRfZ29sZF9wcm9ncmVzcygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxbXCJzcGVlZF90aGVfY3V0XCJdKys7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbFtcIndhdGVyX3NhdmluZ1wiXSsrO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxbXCJ0b29sX2ltcHJvdmVcIl0rKztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1wibGFib3JfY29udHJhY3RcIl0rKztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1wib2ZmbGluZV9wcm9maXRcIl0rKztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5zZXRfY29udGVudCgpO1xyXG4gICAgICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fY2xpY2tcIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwidW5fY2xpY2tcIik7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfcnVsZXNfanMubm9kZSwgXCJub19za2lsbF9wb2ludFwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgfSxcclxuICAgIG9uTG9hZCgpIHtcclxuXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZV9idXR0b24oKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pO1xyXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ui/staff_ui.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8c435CdPS9LHbOArU9nIMku', 'staff_ui');
// script/ui/staff_ui.js

"use strict";

var _config = _interopRequireDefault(require("config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var user_data = require("user_data");

cc.Class({
  "extends": cc.Component,
  properties: {
    staff_group_node: cc.Node,
    staff_content_prefab: cc.Prefab,
    have_tips_group: cc.Node,
    buy_tips_group: cc.Node
  },
  //
  ini_node: function ini_node() {
    this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
    this.ad_control = cc.find("ad_control").getComponent("ad_control");
    this.sound_control = cc.find("sound_control").getComponent("sound_control");
    this.ad_control.show_bannerAd();
    this.update_buy_tips();
    this.set_icon();
  },
  //
  set_icon: function set_icon() {
    for (var i = 0; i < this.staff_group_node.children.length; i++) {
      if (user_data.user_data.land[i].have == 1) {
        this.staff_group_node.children[i].color = new cc.color(255, 255, 255);
        this.staff_group_node.children[i].getComponent(cc.Button).interactable = true;

        if (user_data.user_data.staff[i].have == 1) {
          this.have_tips_group.children[i].active = true;
        }

        ;
      } else {
        this.staff_group_node.children[i].color = new cc.color(0, 0, 0);
        this.staff_group_node.children[i].getComponent(cc.Button).interactable = false;
        ;
        this.have_tips_group.children[i].active = false;
      }

      ;
    }

    ;
  },
  //刷新购买提示
  update_buy_tips: function update_buy_tips() {
    var arr = Object.keys(user_data.user_data.land);

    for (var i = 0; i < arr.length; i++) {
      //已解锁土地 金币满足，且未拥有才会显示
      if (user_data.user_data.land[i].have == 1 && user_data.user_data.gold >= _config["default"].staff[i].cost && user_data.user_data.staff[i].have == 0) {
        this.buy_tips_group.children[i].active = true;
      } else {
        this.buy_tips_group.children[i].active = false;
      }

      ;
    }

    ;
  },
  //刷新数据定时器
  update_schedule: function update_schedule() {
    var callback = function callback() {
      this.update_buy_tips();
      this.set_icon();
    };

    this.schedule(callback, 0.5);
  },
  //
  on_staff_click: function on_staff_click(e, staff_index) {
    this.sound_control.play_sound_effect("button_click");
    var node = cc.instantiate(this.staff_content_prefab);
    node.getComponent("staff_content").ini_node(staff_index);
    node.parent = this.node;
  },
  touch_exit: function touch_exit() {
    this.sound_control.play_sound_effect("button_exit");
    this.ad_control.hide_bannerAd();
    this.game_scene_js.on_node_kill(this.node);
  },
  onLoad: function onLoad() {},
  start: function start() {
    this.update_schedule();
  } // update (dt) {},

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcc3RhZmZfdWkuanMiXSwibmFtZXMiOlsidXNlcl9kYXRhIiwicmVxdWlyZSIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwic3RhZmZfZ3JvdXBfbm9kZSIsIk5vZGUiLCJzdGFmZl9jb250ZW50X3ByZWZhYiIsIlByZWZhYiIsImhhdmVfdGlwc19ncm91cCIsImJ1eV90aXBzX2dyb3VwIiwiaW5pX25vZGUiLCJnYW1lX3NjZW5lX2pzIiwiZmluZCIsImdldENvbXBvbmVudCIsImFkX2NvbnRyb2wiLCJzb3VuZF9jb250cm9sIiwic2hvd19iYW5uZXJBZCIsInVwZGF0ZV9idXlfdGlwcyIsInNldF9pY29uIiwiaSIsImNoaWxkcmVuIiwibGVuZ3RoIiwibGFuZCIsImhhdmUiLCJjb2xvciIsIkJ1dHRvbiIsImludGVyYWN0YWJsZSIsInN0YWZmIiwiYWN0aXZlIiwiYXJyIiwiT2JqZWN0Iiwia2V5cyIsImdvbGQiLCJjb25maWciLCJjb3N0IiwidXBkYXRlX3NjaGVkdWxlIiwiY2FsbGJhY2siLCJzY2hlZHVsZSIsIm9uX3N0YWZmX2NsaWNrIiwiZSIsInN0YWZmX2luZGV4IiwicGxheV9zb3VuZF9lZmZlY3QiLCJub2RlIiwiaW5zdGFudGlhdGUiLCJwYXJlbnQiLCJ0b3VjaF9leGl0IiwiaGlkZV9iYW5uZXJBZCIsIm9uX25vZGVfa2lsbCIsIm9uTG9hZCIsInN0YXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUNBOzs7O0FBREEsSUFBSUEsU0FBUyxHQUFHQyxPQUFPLENBQUMsV0FBRCxDQUF2Qjs7QUFFQUMsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLGdCQUFnQixFQUFFSixFQUFFLENBQUNLLElBRGI7QUFFUkMsSUFBQUEsb0JBQW9CLEVBQUVOLEVBQUUsQ0FBQ08sTUFG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LG9CQWtFSSxDQUVSLENBcEVJO0FBc0VMQyxFQUFBQSxLQXRFSyxtQkFzRUc7QUFDSixTQUFLZCxlQUFMO0FBQ0gsR0F4RUksQ0EwRUw7O0FBMUVLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciB1c2VyX2RhdGEgPSByZXF1aXJlKFwidXNlcl9kYXRhXCIpO1xyXG5pbXBvcnQgY29uZmlnIGZyb20gXCJjb25maWdcIjtcclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBzdGFmZl9ncm91cF9ub2RlOiBjYy5Ob2RlLFxyXG4gICAgICAgIHN0YWZmX2NvbnRlbnRfcHJlZmFiOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgaGF2ZV90aXBzX2dyb3VwOiBjYy5Ob2RlLFxyXG4gICAgICAgIGJ1eV90aXBzX2dyb3VwOiBjYy5Ob2RlLFxyXG4gICAgfSxcclxuICAgIC8vXHJcbiAgICBpbmlfbm9kZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfc2NlbmVcIik7XHJcbiAgICAgICAgdGhpcy5hZF9jb250cm9sID0gY2MuZmluZChcImFkX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwiYWRfY29udHJvbFwiKTtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wgPSBjYy5maW5kKFwic291bmRfY29udHJvbFwiKS5nZXRDb21wb25lbnQoXCJzb3VuZF9jb250cm9sXCIpO1xyXG4gICAgICAgIHRoaXMuYWRfY29udHJvbC5zaG93X2Jhbm5lckFkKCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVfYnV5X3RpcHMoKTtcclxuICAgICAgICB0aGlzLnNldF9pY29uKCk7XHJcbiAgICB9LFxyXG4gICAgLy9cclxuICAgIHNldF9pY29uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnN0YWZmX2dyb3VwX25vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFtpXS5oYXZlID09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhZmZfZ3JvdXBfbm9kZS5jaGlsZHJlbltpXS5jb2xvciA9IG5ldyBjYy5jb2xvcigyNTUsIDI1NSwgMjU1KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhZmZfZ3JvdXBfbm9kZS5jaGlsZHJlbltpXS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEuc3RhZmZbaV0uaGF2ZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXZlX3RpcHNfZ3JvdXAuY2hpbGRyZW5baV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YWZmX2dyb3VwX25vZGUuY2hpbGRyZW5baV0uY29sb3IgPSBuZXcgY2MuY29sb3IoMCwgMCwgMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YWZmX2dyb3VwX25vZGUuY2hpbGRyZW5baV0uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oYXZlX3RpcHNfZ3JvdXAuY2hpbGRyZW5baV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvL+WIt+aWsOi0reS5sOaPkOekulxyXG4gICAgdXBkYXRlX2J1eV90aXBzKCkge1xyXG4gICAgICAgIHZhciBhcnIgPSBPYmplY3Qua2V5cyh1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmQpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8v5bey6Kej6ZSB5Zyf5ZywIOmHkeW4gea7oei2s++8jOS4lOacquaLpeacieaJjeS8muaYvuekulxyXG4gICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW2ldLmhhdmUgPT0gMSAmJiB1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQgPj0gY29uZmlnLnN0YWZmW2ldLmNvc3QgJiYgdXNlcl9kYXRhLnVzZXJfZGF0YS5zdGFmZltpXS5oYXZlID09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnV5X3RpcHNfZ3JvdXAuY2hpbGRyZW5baV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnV5X3RpcHNfZ3JvdXAuY2hpbGRyZW5baV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvL+WIt+aWsOaVsOaNruWumuaXtuWZqFxyXG4gICAgdXBkYXRlX3NjaGVkdWxlKCkge1xyXG4gICAgICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVfYnV5X3RpcHMoKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRfaWNvbigpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZShjYWxsYmFjaywgMC41KTtcclxuICAgIH0sXHJcbiAgICAvL1xyXG4gICAgb25fc3RhZmZfY2xpY2s6IGZ1bmN0aW9uIChlLCBzdGFmZl9pbmRleCkge1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9jbGlja1wiKTtcclxuICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuc3RhZmZfY29udGVudF9wcmVmYWIpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwic3RhZmZfY29udGVudFwiKS5pbmlfbm9kZShzdGFmZl9pbmRleCk7XHJcbiAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLm5vZGU7XHJcbiAgICB9LFxyXG4gICAgdG91Y2hfZXhpdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9leGl0XCIpO1xyXG4gICAgICAgIHRoaXMuYWRfY29udHJvbC5oaWRlX2Jhbm5lckFkKCk7XHJcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLm9uX25vZGVfa2lsbCh0aGlzLm5vZGUpO1xyXG4gICAgfSxcclxuICAgIG9uTG9hZCgpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlX3NjaGVkdWxlKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxyXG59KTtcclxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ui/shop_ui.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fd3b91g9GpKVppYjN72hjJb', 'shop_ui');
// script/ui/shop_ui.js

"use strict";

var user_data = require("user_data");

var config = require("config");

cc.Class({
  "extends": cc.Component,
  properties: {
    scrollView_array: [cc.Node],
    shop_content_prefab: cc.Prefab,
    content_array: [cc.Node]
  },
  //选项卡切换
  tab_select: function tab_select(e, index) {
    this.sound_control.play_sound_effect("button_click");

    for (var i = 0; i < this.scrollView_array.length; i++) {
      if (i == index) {
        this.scrollView_array[i].active = true;
      } else {
        this.scrollView_array[i].active = false;
      }

      ;
    }

    ;
  },
  //初始化节点
  ini_node: function ini_node() {
    this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
    this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
    this.ad_control = cc.find("ad_control").getComponent("ad_control");
    this.sound_control = cc.find("sound_control").getComponent("sound_control");
    this.ad_control.show_bannerAd();
  },
  create_shop_content: function create_shop_content() {
    var node = null;

    for (var i = 0; i < this.scrollView_array.length; i++) {
      switch (i) {
        case 0:
          //创建land
          var arr = Object.keys(config.land);

          for (var j = 0; j < arr.length; j++) {
            node = cc.instantiate(this.shop_content_prefab);
            node.parent = this.content_array[i];
            node.getComponent("shop_content").ini_node("land", j);
          }

          break;

        case 1:
          //创建plant
          var arr = Object.keys(config.plant);

          for (var j = 0; j < arr.length; j++) {
            node = cc.instantiate(this.shop_content_prefab);
            node.parent = this.content_array[i];
            node.getComponent("shop_content").ini_node("plant", j);
          }

          break;
      }

      ;
    }
  },
  touch_exit: function touch_exit() {
    this.sound_control.play_sound_effect("button_exit");
    this.ad_control.hide_bannerAd();
    this.game_scene_js.on_node_kill(this.node);
  },
  // onLoad () {},
  start: function start() {
    this.create_shop_content();
  } // update (dt) {},

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcc2hvcF91aS5qcyJdLCJuYW1lcyI6WyJ1c2VyX2RhdGEiLCJyZXF1aXJlIiwiY29uZmlnIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJzY3JvbGxWaWV3X2FycmF5IiwiTm9kZSIsInNob3BfY29udGVudF9wcmVmYWIiLCJQcmVmYWIiLCJjb250ZW50X2FycmF5IiwidGFiX3NlbGVjdCIsImUiLCJpbmRleCIsInNvdW5kX2NvbnRyb2wiLCJwbGF5X3NvdW5kX2VmZmVjdCIsImkiLCJsZW5ndGgiLCJhY3RpdmUiLCJpbmlfbm9kZSIsImdhbWVfc2NlbmVfanMiLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwiZ2FtZV9ydWxlc19qcyIsImFkX2NvbnRyb2wiLCJzaG93X2Jhbm5lckFkIiwiY3JlYXRlX3Nob3BfY29udGVudCIsIm5vZGUiLCJhcnIiLCJPYmplY3QiLCJrZXlzIiwibGFuZCIsImoiLCJpbnN0YW50aWF0ZSIsInBhcmVudCIsInBsYW50IiwidG91Y2hfZXhpdCIsImhpZGVfYmFubmVyQWQiLCJvbl9ub2RlX2tpbGwiLCJzdGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxTQUFTLEdBQUdDLE9BQU8sQ0FBQyxXQUFELENBQXZCOztBQUNBLElBQUlDLE1BQU0sR0FBR0QsT0FBTyxDQUFDLFFBQUQsQ0FBcEI7O0FBQ0FFLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxnQkFBZ0IsRUFBRSxDQUFDSixFQUFFLENBQUNLLElBQUosQ0FEVjtBQUVSQyxJQUFBQSxtQkFBbUIsRUFBRU4sRUFBRSxDQUFDTyxNQUZoQjtBQUdSQyxJQUFBQSxhQUFhLEVBQUUsQ0FBQ1IsRUFBRSxDQUFDSyxJQUFKO0FBSFAsR0FIUDtBQVFMO0FBQ0FJLEVBQUFBLFVBVEssc0JBU01D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aUJBQW5CLENBQXFDLGFBQXJDO0FBQ0EsU0FBS1MsVUFBTCxDQUFnQmEsYUFBaEI7QUFDQSxTQUFLakIsYUFBTCxDQUFtQmtCLFlBQW5CLENBQWdDLEtBQUtYLElBQXJDO0FBQ0gsR0F4REk7QUF5REw7QUFFQVksRUFBQUEsS0EzREssbUJBMkRHO0FBQ0osU0FBS2IsbUJBQUw7QUFDSCxHQTdESSxDQStETDs7QUEvREssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHVzZXJfZGF0YSA9IHJlcXVpcmUoXCJ1c2VyX2RhdGFcIik7XHJcbnZhciBjb25maWcgPSByZXF1aXJlKFwiY29uZmlnXCIpO1xyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIHNjcm9sbFZpZXdfYXJyYXk6IFtjYy5Ob2RlXSxcclxuICAgICAgICBzaG9wX2NvbnRlbnRfcHJlZmFiOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgY29udGVudF9hcnJheTogW2NjLk5vZGVdLFxyXG4gICAgfSxcclxuICAgIC8v6YCJ6aG55Y2h5YiH5o2iXHJcbiAgICB0YWJfc2VsZWN0KGUsIGluZGV4KSB7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zY3JvbGxWaWV3X2FycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChpID09IGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbFZpZXdfYXJyYXlbaV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsVmlld19hcnJheVtpXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8v5Yid5aeL5YyW6IqC54K5XHJcbiAgICBpbmlfbm9kZSgpIHtcclxuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJnYW1lX3NjZW5lXCIpO1xyXG4gICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfcnVsZXNcIik7XHJcbiAgICAgICAgdGhpcy5hZF9jb250cm9sID0gY2MuZmluZChcImFkX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwiYWRfY29udHJvbFwiKTtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wgPSBjYy5maW5kKFwic291bmRfY29udHJvbFwiKS5nZXRDb21wb25lbnQoXCJzb3VuZF9jb250cm9sXCIpO1xyXG4gICAgICAgIHRoaXMuYWRfY29udHJvbC5zaG93X2Jhbm5lckFkKCk7XHJcbiAgICB9LFxyXG4gICAgY3JlYXRlX3Nob3BfY29udGVudCgpIHtcclxuICAgICAgICB2YXIgbm9kZSA9IG51bGw7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnNjcm9sbFZpZXdfYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgc3dpdGNoIChpKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgLy/liJvlu7psYW5kXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFyciA9IE9iamVjdC5rZXlzKGNvbmZpZy5sYW5kKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGFyci5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5zaG9wX2NvbnRlbnRfcHJlZmFiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMuY29udGVudF9hcnJheVtpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJzaG9wX2NvbnRlbnRcIikuaW5pX25vZGUoXCJsYW5kXCIsIGopO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAvL+WIm+W7unBsYW50XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFyciA9IE9iamVjdC5rZXlzKGNvbmZpZy5wbGFudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBhcnIubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuc2hvcF9jb250ZW50X3ByZWZhYilcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLmNvbnRlbnRfYXJyYXlbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwic2hvcF9jb250ZW50XCIpLmluaV9ub2RlKFwicGxhbnRcIiwgaik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICB0b3VjaF9leGl0KCkge1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9leGl0XCIpO1xyXG4gICAgICAgIHRoaXMuYWRfY29udHJvbC5oaWRlX2Jhbm5lckFkKCk7XHJcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLm9uX25vZGVfa2lsbCh0aGlzLm5vZGUpO1xyXG4gICAgfSxcclxuICAgIC8vIG9uTG9hZCAoKSB7fSxcclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZV9zaG9wX2NvbnRlbnQoKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pO1xyXG4iXX0=
//------QC-SOURCE-SPLIT------

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcc3RhZmZfY29udGVudC5qcyJdLCJuYW1lcyI6WyJ1c2VyX2RhdGEiLCJyZXF1aXJlIiwiY29uZmlnIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJpY29uX3Nwcml0ZSIsIlNwcml0ZSIsIndvcmtfdGltZV9sYWJlbCIsIkxhYmVsIiwicmVzdF90aW1lX2xhYmVsIiwiY29zdF9sYWJlbCIsImljb25fZnJhbWVfYXJyIiwiU3ByaXRlRnJhbWUiLCJidXlfYnV0dG9uIiwiTm9kZSIsIndvcmtfdGltZV9idWZmX2xhYmVsIiwicmVzdF90aW1lX2J1ZmZfbGFiZWwiLCJlbXBsb3llZF9idXR0b24iLCJuYW1lX2xhYmxlIiwiaW50cm9kdWNlX2xhYmVsIiwiaW5pX25vZGUiLCJzdGFmZl9pbmRleCIsImdhbWVfc2NlbmVfanMiLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwiZ2FtZV9ydWxlc19qcyIsImFkX2NvbnRyb2wiLCJzb3VuZF9jb250cm9sIiwidXBkYXRlX2NvbnRlbnQiLCJzcHJpdGVGcmFtZSIsInN0cmluZyIsInN0YWZmIiwid29ya190aW1lIiwicmVzdF90aW1lIiwibmFtZSIsImludHJvZHVjZSIsInNraWxsIiwibm9kZSIsImFjdGl2ZSIsInRyYWRlciIsImNvc3QiLCJoYXZlIiwib25fYnV5X2J1dHRvbl9jbGljayIsImdvbGQiLCJjcmVhdGVfc3RhZmYiLCJnb2xkX21heCIsImdvbGRfbGFiZWwiLCJwbGF5X3NvdW5kX2VmZmVjdCIsImNyZWF0ZV90aXBzX3VpIiwidG91Y2hfZXhpdCIsImRlc3Ryb3kiLCJjcmVhdGVfYWRfY2FyIiwiYWxsX2NhcGFjaXR5IiwicHJpY2VfZGlmZmVyZW5jZSIsImhpZGVfYmFubmVyQWQiLCJvbkxvYWQiLCJzdGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxTQUFTLEdBQUdDLE9BQU8sQ0FBQyxXQUFELENBQXZCOztB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QUFvRCxDQUF4RCxFQUEyRDtBQUN2RCxVQUFJRSxJQUFJLEdBQUc3QyxTQUFTLENBQUNBLFNBQVYsQ0FBb0I2QyxJQUEvQjtBQUNBLFVBQUlTLFlBQVksR0FBRyxNQUFNdEQsU0FBUyxDQUFDQSxTQUFWLENBQW9Cc0MsS0FBcEIsQ0FBMEIsVUFBMUIsQ0FBTixHQUE4QyxHQUFqRTtBQUNBLFVBQUlJLElBQUksR0FBSXhDLE1BQU0sQ0FBQytCLEtBQVAsQ0FBYSxLQUFLVixXQUFsQixFQUErQm1CLElBQTNDLENBSHVELENBSXZEOztBQUNBLFVBQUlhLGdCQUFnQixHQUFHYixJQUFJLEdBQUdHLElBQTlCLENBTHVELENBTXZEOztBQUNBLFVBQUlBLElBQUksSUFBSUgsSUFBSSxJQUFJLElBQUksQ0FBUixDQUFaLElBQTBCWSxZQUFZLElBQUlaLElBQTFDLElBQWtERyxJQUFJLEdBQUdILElBQTdELEVBQW1FO0FBQy9ELGFBQUtkLFVBQUwsQ0FBZ0I0QixhQUFoQixHQUQrRCxDQUUvRDtBQUNIOztBQUFBO0FBQ0osS0FYRCxNQVdPO0FBQ0g7QUFDSDtBQUVKLEdBN0ZJO0FBOEZMQyxFQUFBQSxNQTlGSyxvQkE4RkksQ0FFUixDQWhHSTtBQWtHTEMsRUFBQUEsS0FsR0ssbUJBa0dHLENBRVAsQ0FwR0ksQ0FzR0w7O0FBdEdLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciB1c2VyX2RhdGEgPSByZXF1aXJlKFwidXNlcl9kYXRhXCIpO1xyXG52YXIgY29uZmlnID0gcmVxdWlyZShcImNvbmZpZ1wiKTtcclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBpY29uX3Nwcml0ZTogY2MuU3ByaXRlLFxyXG4gICAgICAgIHdvcmtfdGltZV9sYWJlbDogY2MuTGFiZWwsXHJcbiAgICAgICAgcmVzdF90aW1lX2xhYmVsOiBjYy5MYWJlbCxcclxuICAgICAgICBjb3N0X2xhYmVsOiBjYy5MYWJlbCxcclxuICAgICAgICBpY29uX2ZyYW1lX2FycjogW2NjLlNwcml0ZUZyYW1lXSxcclxuICAgICAgICBidXlfYnV0dG9uOiBjYy5Ob2RlLFxyXG4gICAgICAgIHdvcmtfdGltZV9idWZmX2xhYmVsOiBjYy5MYWJlbCxcclxuICAgICAgICByZXN0X3RpbWVfYnVmZl9sYWJlbDogY2MuTGFiZWwsXHJcbiAgICAgICAgZW1wbG95ZWRfYnV0dG9uOiBjYy5Ob2RlLFxyXG4gICAgICAgIG5hbWVfbGFibGU6IGNjLkxhYmVsLFxyXG4gICAgICAgIGludHJvZHVjZV9sYWJlbDogY2MuTGFiZWwsXHJcbiAgICB9LFxyXG4gICAgLy9pbmkgbm9kZVxyXG4gICAgaW5pX25vZGU6IGZ1bmN0aW9uIChzdGFmZl9pbmRleCkge1xyXG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfc2NlbmVcIik7XHJcbiAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9ydWxlc1wiKTtcclxuICAgICAgICB0aGlzLmFkX2NvbnRyb2wgPSBjYy5maW5kKFwiYWRfY29udHJvbFwiKS5nZXRDb21wb25lbnQoXCJhZF9jb250cm9sXCIpO1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbCA9IGNjLmZpbmQoXCJzb3VuZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcInNvdW5kX2NvbnRyb2xcIik7XHJcbiAgICAgICAgdGhpcy5zdGFmZl9pbmRleCA9IHN0YWZmX2luZGV4O1xyXG4gICAgICAgIHRoaXMudXBkYXRlX2NvbnRlbnQoKTtcclxuICAgICAgICAvLyB0aGlzLmNyZWF0ZV9hZF9jYXIoKTtcclxuICAgIH0sXHJcbiAgICAvL+WIt+aWsOaVsOaNrlxyXG4gICAgdXBkYXRlX2NvbnRlbnQoKSB7XHJcbiAgICAgICAgdGhpcy5pY29uX3Nwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbdGhpcy5zdGFmZl9pbmRleF07XHJcbiAgICAgICAgdGhpcy53b3JrX3RpbWVfbGFiZWwuc3RyaW5nID0gXCJBY3RpdmUgdGltZTpcIiArIGNvbmZpZy5zdGFmZlt0aGlzLnN0YWZmX2luZGV4XS53b3JrX3RpbWUgKyBcInNlY29uZHNcIjtcclxuICAgICAgICB0aGlzLnJlc3RfdGltZV9sYWJlbC5zdHJpbmcgPSBcIkZyZWUgdGltZTpcIiArIGNvbmZpZy5zdGFmZlt0aGlzLnN0YWZmX2luZGV4XS5yZXN0X3RpbWUgKyBcInNlY29uZHNcIjtcclxuICAgICAgICB0aGlzLm5hbWVfbGFibGUuc3RyaW5nID0gY29uZmlnLnN0YWZmW3RoaXMuc3RhZmZfaW5kZXhdLm5hbWU7XHJcbiAgICAgICAgdGhpcy5pbnRyb2R1Y2VfbGFiZWwuc3RyaW5nID0gY29uZmlnLnN0YWZmW3RoaXMuc3RhZmZfaW5kZXhdLmludHJvZHVjZTtcclxuICAgICAgICAvL+aKgOiDveaPkOekulxyXG4gICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1wibGFib3JfY29udHJhY3RcIl0gPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLndvcmtfdGltZV9idWZmX2xhYmVsLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy53b3JrX3RpbWVfYnVmZl9sYWJlbC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMud29ya190aW1lX2J1ZmZfbGFiZWwuc3RyaW5nID0gXCIrXCIgKyB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1wibGFib3JfY29udHJhY3RcIl07XHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS50cmFkZXJbXCJyZWNpcGVzXCJdID09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5yZXN0X3RpbWVfYnVmZl9sYWJlbC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzdF90aW1lX2J1ZmZfbGFiZWwubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnJlc3RfdGltZV9idWZmX2xhYmVsLnN0cmluZyA9IFwiLVwiICsgdXNlcl9kYXRhLnVzZXJfZGF0YS50cmFkZXJbXCJyZWNpcGVzXCJdO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuY29zdF9sYWJlbC5zdHJpbmcgPSBcIkNvc3Q6XCIgKyBjb25maWcuc3RhZmZbdGhpcy5zdGFmZl9pbmRleF0uY29zdDtcclxuICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5zdGFmZlt0aGlzLnN0YWZmX2luZGV4XS5oYXZlID09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5idXlfYnV0dG9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuZW1wbG95ZWRfYnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnV5X2J1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5lbXBsb3llZF9idXR0b24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8vYnV5IHN0YWZmXHJcbiAgICBvbl9idXlfYnV0dG9uX2NsaWNrOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEuZ29sZCA+PSBjb25maWcuc3RhZmZbdGhpcy5zdGFmZl9pbmRleF0uY29zdCkge1xyXG4gICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQgLT0gY29uZmlnLnN0YWZmW3RoaXMuc3RhZmZfaW5kZXhdLmNvc3Q7XHJcbiAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuc3RhZmZbdGhpcy5zdGFmZl9pbmRleF0uaGF2ZSA9IDE7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcy5jcmVhdGVfc3RhZmYodGhpcy5zdGFmZl9pbmRleCk7XHJcbiAgICAgICAgICAgIHZhciBnb2xkX21heCA9IDUwMCAqIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxbXCJnb2xkX21heFwiXSArIDUwMDtcclxuICAgICAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLmdvbGRfbGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQgKyBcIi9cIiArZ29sZF9tYXg7XHJcbiAgICAgICAgICAgIHRoaXMuYnV5X2J1dHRvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZV9jb250ZW50KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwidW5fY2xpY2tcIik7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfcnVsZXNfanMubm9kZSwgXCJub19tb25leV9nb2xkXCIpO1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgdG91Y2hfZXhpdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9leGl0XCIpO1xyXG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XHJcbiAgICB9LFxyXG4gICAgLy/liJvlu7phZF9jYXJcclxuICAgIGNyZWF0ZV9hZF9jYXIoKSB7XHJcbiAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEuc3RhZmZbdGhpcy5zdGFmZl9pbmRleF0uaGF2ZSAhPSAxKSB7XHJcbiAgICAgICAgICAgIHZhciBnb2xkID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkO1xyXG4gICAgICAgICAgICB2YXIgYWxsX2NhcGFjaXR5ID0gNTAwICogdXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbFtcImdvbGRfbWF4XCJdICsgNTAwO1xyXG4gICAgICAgICAgICB2YXIgY29zdCA9IChjb25maWcuc3RhZmZbdGhpcy5zdGFmZl9pbmRleF0uY29zdCk7XHJcbiAgICAgICAgICAgIC8v5beu5Lu3XHJcbiAgICAgICAgICAgIHZhciBwcmljZV9kaWZmZXJlbmNlID0gY29zdCAtIGdvbGQ7XHJcbiAgICAgICAgICAgIC8v5aSn5LqONC81LOS4lOiDveWkn+aLpeacie+8jOS4lOmHkeW4geS4jei2s1xyXG4gICAgICAgICAgICBpZiAoZ29sZCA+PSBjb3N0ICogKDQgLyA1KSAmJiBhbGxfY2FwYWNpdHkgPj0gY29zdCAmJiBnb2xkIDwgY29zdCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZF9jb250cm9sLmhpZGVfYmFubmVyQWQoKTtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfYWRfY2FyKHRoaXMubm9kZSwgcHJpY2VfZGlmZmVyZW5jZSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG4gICAgb25Mb2FkKCkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcclxufSk7XHJcbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ui/study_ui.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '17b54SZhR1E8bfWvHiKAZPX', 'study_ui');
// script/ui/study_ui.js

"use strict";

var user_data = require("user_data");

var skill_content = require("skill_content");

cc.Class({
  "extends": cc.Component,
  properties: {
    skill_group_node: cc.Node,
    skill_content_prefab: cc.Prefab,
    skill_point_label: cc.Label
  },
  // LIFE-CYCLE CALLBACKS:
  ini_node: function ini_node() {
    this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
    this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
    this.adsManager_js = cc.find("UI_ROOT").getComponent("AdsManager"); // this.skill_content_js = cc.find("skill_content").getComponent("skill_content");

    this.ad_control = cc.find("ad_control").getComponent("ad_control");
    this.sound_control = cc.find("sound_control").getComponent("sound_control");
    this.ad_control.show_bannerAd();
    this.create_content();
  },
  //
  create_content: function create_content() {
    if (this.skill_group_node.children.length == 0) {
      var skill_arr = Object.keys(user_data.user_data.skill);

      for (var i = 0; i < skill_arr.length; i++) {
        var node = cc.instantiate(this.skill_content_prefab);
        node.parent = this.skill_group_node;
        node.getComponent("skill_content").ini_node(i);
      }

      ;
    } else {
      return;
    }

    ;
  },
  //skill_point
  update_skill_point: function update_skill_point() {
    this.skill_point_label.string = user_data.user_data.skill_point;

    var callback = function callback() {
      this.skill_point_label.string = user_data.user_data.skill_point;
    };

    this.schedule(callback, 0.5, cc.macro.REPEAT_FOREVER);
  },
  on_touch_exit: function on_touch_exit() {
    this.ad_control.hide_bannerAd();
    this.sound_control.play_sound_effect("button_exit");
    this.game_scene_js.on_node_kill(this.node);
  },
  on_rest_skill_point_button_click: function on_rest_skill_point_button_click() {
    var _this = this;

    this.sound_control.play_sound_effect("button_click");
    this.adsManager_js.showRewardedVideo(function () {
      var level = user_data.user_data.level;
      var arr = Object.keys(user_data.user_data.skill);
      user_data.user_data.skill_point = level;
      var skill_arr = Object.keys(user_data.user_data.skill); //reset skill to lv 0

      for (var j = 0; j < arr.length; j++) {
        if (arr[j] == "offline_profit") {
          user_data.user_data.skill["offline_profit"] = 1;
        } else {
          user_data.user_data.skill[arr[j]] = 0;
        }

        ;
      }

      ;
      var gold_max = 500 * user_data.user_data.skill["gold_max"] + 500;
      if (user_data.user_data.gold > gold_max) user_data.user_data.gold = gold_max; // reset skill_content

      for (var i = 0; i < skill_arr.length; i++) {
        _this.skill_group_node.children[i].getComponent("skill_content").ini_node(i);
      }

      ;

      _this.game_scene_js.create_tips_ui(_this.game_scene_js.node, "skill_rest");

      _this.game_rules_js.set_gold_progress();
    });
  },
  video_succes: function video_succes() {
    if (typeof wx != "undefined") {
      var callback = function callback() {
        if (this.ad_control.video_state == 1 && this.ad_control.video_tag == "skill_rest") {
          this.ad_control.video_tag = null;
          this.ad_control.video_state = 2;
          var level = user_data.user_data.level;
          var arr = Object.keys(user_data.user_data.skill);
          user_data.user_data.skill_point = level;
          var skill_arr = Object.keys(user_data.user_data.skill); //重置skill 为 0

          for (var j = 0; j < arr.length; j++) {
            //离线收益保证至少1级
            if (arr[j] == "offline_profit") {
              user_data.user_data.skill["offline_profit"] = 1;
            } else {
              user_data.user_data.skill[arr[j]] = 0;
            }

            ;
          }

          ; //刷新skill_content

          for (var i = 0; i < skill_arr.length; i++) {
            this.skill_group_node.children[i].getComponent("skill_content").ini_node(i);
          }

          ;
          this.game_scene_js.create_tips_ui(this.game_scene_js.node, "skill_rest");
          this.game_rules_js.set_gold_progress();
          this.unschedule(callback);
        } else {
          if (this.ad_control.video_tag == null && this.ad_control.video_state == 2) {
            this.unschedule(callback);
          }

          ;
        }

        ;
      };

      this.schedule(callback, 0.2);
    }

    ;
  },
  onLoad: function onLoad() {},
  start: function start() {
    this.update_skill_point();
  } // update (dt) {},

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcc3R1ZHlfdWkuanMiXSwibmFtZXMiOlsidXNlcl9kYXRhIiwicmVxdWlyZSIsInNraWxsX2NvbnRlbnQiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInNraWxsX2dyb3VwX25vZGUiLCJOb2RlIiwic2tpbGxfY29udGVudF9wcmVmYWIiLCJQcmVmYWIiLCJza2lsbF9wb2ludF9sYWJlbCIsIkxhYmVsIiwiaW5pX25vZGUiLCJnYW1lX3NjZW5lX2pzIiwiZmluZCIsImdldENvbXBvbmVudCIsImdhbWVfcnVsZXNfanMiLCJhZHNNYW5hZ2VyX2pzIiwiYWRfY29udHJvbCIsInNvdW5kX2NvbnRyb2wiLCJzaG93X2Jhbm5lckFkIiwiY3JlYXRlX2NvbnRlbnQiLCJjaGlsZHJlbiIsImxlbmd0aCIsInNraWxsX2FyciIsIk9iamVjdCIsImtleXMiLCJza2lsbCIsImkiLCJub2RlIiwiaW5zdGFudGlhdGUiLCJwYXJlbnQiLCJ1cGRhdGVfc2tpbGxfcG9pbnQiLCJzdHJpbmciLCJza2lsbF9wb2ludCIsImNhbGxiYWNrIiwic2NoZWR1bGUiLCJtYWNybyIsIlJFUEVBVF9GT1JFVkVSIiwib25fdG91Y2hfZXhpdCIsImhpZGVfYmFubmVyQWQiLCJwbGF5X3NvdW5kX2VmZmVjdCIsIm9uX25vZGVfa2lsbCIsIm9uX3Jlc3Rfc2tpbGxfcG9pbnRfYnV0dG9uX2NsaWNrIiwic2hvd1Jld2FyZGVkVmlkZW8iLCJsZXZlbCIsImFyciIsImoiLCJnb2xkX21heCIsImdvbGQiLCJjcmVhdGVfdGlwc191aSIsInNldF9nb2xkX3Byb2dyZXNzIiwidmlkZW9fc3VjY2VzIiwid3giLCJ2aWRlb19zdGF0ZSIsInZpZGVvX3RhZyIsInVuc2NoZWR1bGUiLCJvbkxvYWQiLCJzdGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxTQUFTLEdBQUdDLE9BQU8sQ0FBQyxXQUFELENBQXZCOztB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OztBQThCQSxXQUFLQyxRQUFMLENBQWNELFFBQWQsRUFBd0IsR0FBeEI7QUFDSDs7QUFBQTtBQUNKLEdBNUdJO0FBNkdMc0IsRUFBQUEsTUE3R0ssb0JBNkdJLENBRVIsQ0EvR0k7QUFpSExDLEVBQUFBLEtBakhLLG1CQWlIRztBQUNKLFNBQUsxQixrQkFBTDtBQUNILEdBbkhJLENBcUhMOztBQXJISyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgdXNlcl9kYXRhID0gcmVxdWlyZShcInVzZXJfZGF0YVwiKTtcclxudmFyIHNraWxsX2NvbnRlbnQgPSByZXF1aXJlKFwic2tpbGxfY29udGVudFwiKTtcclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBza2lsbF9ncm91cF9ub2RlOiBjYy5Ob2RlLFxyXG4gICAgICAgIHNraWxsX2NvbnRlbnRfcHJlZmFiOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgc2tpbGxfcG9pbnRfbGFiZWw6IGNjLkxhYmVsLFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuICAgIGluaV9ub2RlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9zY2VuZVwiKTtcclxuICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJnYW1lX3J1bGVzXCIpO1xyXG4gICAgICAgIHRoaXMuYWRzTWFuYWdlcl9qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcIkFkc01hbmFnZXJcIik7XHJcbiAgICAgICAgLy8gdGhpcy5za2lsbF9jb250ZW50X2pzID0gY2MuZmluZChcInNraWxsX2NvbnRlbnRcIikuZ2V0Q29tcG9uZW50KFwic2tpbGxfY29udGVudFwiKTtcclxuICAgICAgICB0aGlzLmFkX2NvbnRyb2wgPSBjYy5maW5kKFwiYWRfY29udHJvbFwiKS5nZXRDb21wb25lbnQoXCJhZF9jb250cm9sXCIpO1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbCA9IGNjLmZpbmQoXCJzb3VuZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcInNvdW5kX2NvbnRyb2xcIik7XHJcbiAgICAgICAgdGhpcy5hZF9jb250cm9sLnNob3dfYmFubmVyQWQoKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZV9jb250ZW50KCk7XHJcbiAgICB9LFxyXG4gICAgLy9cclxuICAgIGNyZWF0ZV9jb250ZW50OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2tpbGxfZ3JvdXBfbm9kZS5jaGlsZHJlbi5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICB2YXIgc2tpbGxfYXJyID0gT2JqZWN0LmtleXModXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbCk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2tpbGxfYXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuc2tpbGxfY29udGVudF9wcmVmYWIpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLnNraWxsX2dyb3VwX25vZGU7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcInNraWxsX2NvbnRlbnRcIikuaW5pX25vZGUoaSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLy9za2lsbF9wb2ludFxyXG4gICAgdXBkYXRlX3NraWxsX3BvaW50OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5za2lsbF9wb2ludF9sYWJlbC5zdHJpbmcgPSB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsX3BvaW50O1xyXG4gICAgICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5za2lsbF9wb2ludF9sYWJlbC5zdHJpbmcgPSB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsX3BvaW50O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZShjYWxsYmFjaywgMC41LCBjYy5tYWNyby5SRVBFQVRfRk9SRVZFUik7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uX3RvdWNoX2V4aXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmFkX2NvbnRyb2wuaGlkZV9iYW5uZXJBZCgpO1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9leGl0XCIpO1xyXG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5vbl9ub2RlX2tpbGwodGhpcy5ub2RlKTtcclxuICAgIH0sXHJcblxyXG4gICAgb25fcmVzdF9za2lsbF9wb2ludF9idXR0b25fY2xpY2soKSB7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xyXG4gICAgICAgIHRoaXMuYWRzTWFuYWdlcl9qcy5zaG93UmV3YXJkZWRWaWRlbygoKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBsZXZlbCA9IHVzZXJfZGF0YS51c2VyX2RhdGEubGV2ZWw7XHJcbiAgICAgICAgICAgIHZhciBhcnIgPSBPYmplY3Qua2V5cyh1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsKTtcclxuICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbF9wb2ludCA9IGxldmVsO1xyXG4gICAgICAgICAgICB2YXIgc2tpbGxfYXJyID0gT2JqZWN0LmtleXModXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbCk7XHJcbiAgICAgICAgICAgIC8vcmVzZXQgc2tpbGwgdG8gbHYgMFxyXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGFyci5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFycltqXSA9PSBcIm9mZmxpbmVfcHJvZml0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1wib2ZmbGluZV9wcm9maXRcIl0gPSAxO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW2FycltqXV0gPSAwO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdmFyIGdvbGRfbWF4ID0gNTAwICogdXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbFtcImdvbGRfbWF4XCJdICsgNTAwO1xyXG4gICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkID4gZ29sZF9tYXgpIHVzZXJfZGF0YS51c2VyX2RhdGEuZ29sZCA9IGdvbGRfbWF4O1xyXG4gICAgICAgICAgICAvLyByZXNldCBza2lsbF9jb250ZW50XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2tpbGxfYXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX2dyb3VwX25vZGUuY2hpbGRyZW5baV0uZ2V0Q29tcG9uZW50KFwic2tpbGxfY29udGVudFwiKS5pbmlfbm9kZShpKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9zY2VuZV9qcy5ub2RlLCBcInNraWxsX3Jlc3RcIik7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcy5zZXRfZ29sZF9wcm9ncmVzcygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICB2aWRlb19zdWNjZXM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodHlwZW9mICh3eCkgIT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hZF9jb250cm9sLnZpZGVvX3N0YXRlID09IDEgJiYgdGhpcy5hZF9jb250cm9sLnZpZGVvX3RhZyA9PSBcInNraWxsX3Jlc3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRfY29udHJvbC52aWRlb190YWcgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRfY29udHJvbC52aWRlb19zdGF0ZSA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxldmVsID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5sZXZlbDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYXJyID0gT2JqZWN0LmtleXModXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbF9wb2ludCA9IGxldmVsO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBza2lsbF9hcnIgPSBPYmplY3Qua2V5cyh1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAvL+mHjee9rnNraWxsIOS4uiAwXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBhcnIubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/nprvnur/mlLbnm4rkv53or4Hoh7PlsJEx57qnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhcnJbal0gPT0gXCJvZmZsaW5lX3Byb2ZpdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1wib2ZmbGluZV9wcm9maXRcIl0gPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbFthcnJbal1dID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5Yi35pawc2tpbGxfY29udGVudFxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2tpbGxfYXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfZ3JvdXBfbm9kZS5jaGlsZHJlbltpXS5nZXRDb21wb25lbnQoXCJza2lsbF9jb250ZW50XCIpLmluaV9ub2RlKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9zY2VuZV9qcy5ub2RlLCBcInNraWxsX3Jlc3RcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLnNldF9nb2xkX3Byb2dyZXNzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKGNhbGxiYWNrKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYWRfY29udHJvbC52aWRlb190YWcgPT0gbnVsbCAmJiB0aGlzLmFkX2NvbnRyb2wudmlkZW9fc3RhdGUgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUoY2FsbGJhY2spO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlKGNhbGxiYWNrLCAwLjIpO1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgb25Mb2FkKCkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVfc2tpbGxfcG9pbnQoKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pO1xyXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/migration/use_v2.1-2.2.1_cc.Toggle_event.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ffb59ZN+lRFnYhL1RbR6HcJ', 'use_v2.1-2.2.1_cc.Toggle_event');
// migration/use_v2.1-2.2.1_cc.Toggle_event.js

"use strict";

/*
 * This script is automatically generated by Cocos Creator and is only used for projects compatible with the v2.1.0 ～ 2.2.1 version.
 * You do not need to manually add this script in any other project.
 * If you don't use cc.Toggle in your project, you can delete this script directly.
 * If your project is hosted in VCS such as git, submit this script together.
 *
 * 此脚本由 Cocos Creator 自动生成，仅用于兼容 v2.1.0 ~ 2.2.1 版本的工程，
 * 你无需在任何其它项目中手动添加此脚本。
 * 如果你的项目中没用到 Toggle，可直接删除该脚本。
 * 如果你的项目有托管于 git 等版本库，请将此脚本一并上传。
 */
if (cc.Toggle) {
  // Whether to trigger 'toggle' and 'checkEvents' events when modifying 'toggle.isChecked' in the code
  // 在代码中修改 'toggle.isChecked' 时是否触发 'toggle' 与 'checkEvents' 事件
  cc.Toggle._triggerEventInScript_isChecked = true;
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbWlncmF0aW9uXFx1c2VfdjIuMS0yLjIuMV9jYy5Ub2dnbGVfZXZlbnQuanMiXSwibmFtZXMiOlsiY2MiLCJUb2dnbGUiLCJfdHJpZ2dlckV2ZW50SW5TY3JpcHRfaXNDaGVja2VkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSxJQUFJQSxFQUFFLENBQUNDLE1BQVAsRUFBZTtBQUNYO0FBQ0E7QUFDQUQsRUFBQUEsRUFBRSxDQUFDQyxNQUFILENBQVVDLCtCQUFWLEdBQTRDLElBQTVDO0FBQ0giLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIFRoaXMgc2NyaXB0IGlzIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVkIGJ5IENvY29zIENyZWF0b3IgYW5kIGlzIG9ubHkgdXNlZCBmb3IgcHJvamVjdHMgY29tcGF0aWJsZSB3aXRoIHRoZSB2Mi4xLjAg772eIDIuMi4xIHZlcnNpb24uXHJcbiAqIFlvdSBkbyBub3QgbmVlZCB0byBtYW51YWxseSBhZGQgdGhpcyBzY3JpcHQgaW4gYW55IG90aGVyIHByb2plY3QuXHJcbiAqIElmIHlvdSBkb24ndCB1c2UgY2MuVG9nZ2xlIGluIHlvdXIgcHJvamVjdCwgeW91IGNhbiBkZWxldGUgdGhpcyBzY3JpcHQgZGlyZWN0bHkuXHJcbiAqIElmIHlvdXIgcHJvamVjdCBpcyBob3N0ZWQgaW4gVkNTIHN1Y2ggYXMgZ2l0LCBzdWJtaXQgdGhpcyBzY3JpcHQgdG9nZXRoZXIuXHJcbiAqXHJcbiAqIOatpOiEmuacrOeUsSBDb2NvcyBDcmVhdG9yIOiHquWKqOeUn+aIkO+8jOS7heeUqOS6juWFvOWuuSB2Mi4xLjAgfiAyLjIuMSDniYjmnKznmoTlt6XnqIvvvIxcclxuICog5L2g5peg6ZyA5Zyo5Lu75L2V5YW25a6D6aG555uu5Lit5omL5Yqo5re75Yqg5q2k6ISa5pys44CCXHJcbiAqIOWmguaenOS9oOeahOmhueebruS4reayoeeUqOWIsCBUb2dnbGXvvIzlj6/nm7TmjqXliKDpmaTor6XohJrmnKzjgIJcclxuICog5aaC5p6c5L2g55qE6aG555uu5pyJ5omY566h5LqOIGdpdCDnrYnniYjmnKzlupPvvIzor7flsIbmraTohJrmnKzkuIDlubbkuIrkvKDjgIJcclxuICovXHJcblxyXG5pZiAoY2MuVG9nZ2xlKSB7XHJcbiAgICAvLyBXaGV0aGVyIHRvIHRyaWdnZXIgJ3RvZ2dsZScgYW5kICdjaGVja0V2ZW50cycgZXZlbnRzIHdoZW4gbW9kaWZ5aW5nICd0b2dnbGUuaXNDaGVja2VkJyBpbiB0aGUgY29kZVxyXG4gICAgLy8g5Zyo5Luj56CB5Lit5L+u5pS5ICd0b2dnbGUuaXNDaGVja2VkJyDml7bmmK/lkKbop6blj5EgJ3RvZ2dsZScg5LiOICdjaGVja0V2ZW50cycg5LqL5Lu2XHJcbiAgICBjYy5Ub2dnbGUuX3RyaWdnZXJFdmVudEluU2NyaXB0X2lzQ2hlY2tlZCA9IHRydWU7XHJcbn1cclxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ui/videotape_ui.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '21fcbTbnSlBMYEA/XQyYuG5', 'videotape_ui');
// script/ui/videotape_ui.js

"use strict";

var _user_data = _interopRequireDefault(require("user_data"));

var _config = _interopRequireDefault(require("config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

cc.Class({
  "extends": cc.Component,
  properties: {
    gold_lable: cc.Label,
    ex_label: cc.Label,
    tips_label: cc.Label,
    button_frame: cc.Sprite,
    button_frame_arr: [cc.SpriteFrame],
    purse_node: cc.Node,
    ex_node: cc.Node,
    delete_button: cc.Button
  },
  //初始化节点
  ini_node: function ini_node() {
    this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
    this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
    this.sound_control = cc.find("sound_control").getComponent("sound_control");
    this.ad_control = cc.find("ad_control").getComponent("ad_control");
    this.adsManager_js = cc.find("UI_ROOT").getComponent("AdsManager");
    this.ad_control.show_bannerAd();
    this.add_gold = Math.floor((500 * _user_data["default"].user_data.skill["gold_max"] + 500) / 20) + 1;
    this.add_ex = Math.floor(_user_data["default"].user_data.level / 10) + 1;

    if (this.game_rules_js.videotape_path == null) {
      //录屏未录制
      this.button_frame.spriteFrame = this.button_frame_arr[0];
      this.delete_button.node.active = false;
    } else {
      //录屏已录制
      this.button_frame.spriteFrame = this.button_frame_arr[1];
      this.delete_button.node.active = true;
    }

    ;
    this.gold_lable.string = "+" + this.add_gold;
    this.ex_label.string = "+" + this.add_ex;
    var today = new Date();
    if (_user_data["default"].user_data.save_date == today.getDate()) this.tips_label.string = "Watched: " + _user_data["default"].user_data.watch_video + "/3";else this.tips_label.string = "Watched: 0/3";
  },
  //按钮被点击
  on_button_click: function on_button_click() {
    var _this = this;

    var today = new Date();

    if (today.getDate() == _user_data["default"].user_data.save_date && _user_data["default"].user_data.watch_video < 3) {
      this.adsManager_js.showRewardedVideo(function () {
        _user_data["default"].user_data.watch_video++;
        _this.tips_label.string = "Watched: " + _user_data["default"].user_data.watch_video + "/3";
        _user_data["default"].user_data.save_date = today.getDate();

        _this.game_rules_js.add_gold(Math.floor((500 * _user_data["default"].user_data.skill["gold_max"] + 500) / 20) + 1);

        _this.game_rules_js.add_ex(Math.floor(_user_data["default"].user_data.level / 10) + 1);
      });
    } else if (today.getDate() != _user_data["default"].user_data.save_date) {
      this.adsManager_js.showRewardedVideo(function () {
        watch_video = 1;
        _this.tips_label.string = "Watched: " + _user_data["default"].user_data.watch_video + "/3";
        _user_data["default"].user_data.save_date = today.getDate();
      });
    } else this.game_scene_js.create_tips_ui(this.game_rules_js.node, "no_video_today");
  },
  on_delete_button_click: function on_delete_button_click() {
    this.game_rules_js.videotape_path = null;
    this.game_scene_js.create_tips_ui(this.game_rules_js.node, "vidotape_cancel");
    this.ini_node();
  },
  //录屏分享
  video_share: function video_share() {
    var _this2 = this;

    if (typeof wx !== "undefined") {
      if (this.game_rules_js.videotape_path == null) {
        return;
      }

      ;
      var self = this; //获取分享导语

      wx.shareAppMessage({
        channel: 'video',
        //指定为视频分享
        title: 'On-Hook Small Farm',
        extra: {
          videoPath: this.game_rules_js.videotape_path,
          // 设置视频路径
          videoTopics: ["On-Hook Small Farm", "Game"]
        },
        success: function success() {
          //分享回调
          console.log('录屏分享成功'); //分享奖励，仅一次

          self.videotape_share_succes();
        },
        fail: function fail() {
          console.log('录屏分享失败', _this2.videotape_path);
          self.videotape_share_fail();
        }
      });
    }

    ;
  },
  //录屏分享成功
  // videotape_share_succes: function () {
  //     this.game_scene_js.create_tips_ui(this.node.parent, "videotape_share_succes");
  //     this.game_rules_js.videotape_path = null;
  //     user_data.user_data.videotape_share_count++;
  //     var gold = Math.floor(this.add_gold / 6);
  //     var ex = Math.floor(this.add_ex / 3);
  //     for (var i = 0; i < 6; i++) {
  //         this.game_scene_js.create_gold_effect(this.purse_node, i, gold);
  //     };
  //     for (var i = 0; i < 5; i++) {
  //         this.game_scene_js.create_ex_effect(this.ex_node, i, ex);
  //     };
  //     this.ini_node();
  // },
  //录屏分享失败
  videotape_share_fail: function videotape_share_fail() {
    this.game_scene_js.create_tips_ui(this.node.parent, "videotape_share_fail");
    this.ini_node();
  },
  //点击退出
  touch_exit: function touch_exit() {
    this.sound_control.play_sound_effect("button_exit");
    this.ad_control.hide_bannerAd();
    this.game_scene_js.on_node_kill(this.node);
  },
  // onLoad () {},
  add_gold_video: function add_gold_video() {
    this.game_rules_js.add_gold(Math.floor((500 * _user_data["default"].user_data.skill["gold_max"] + 500) / 20) + 1);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcdmlkZW90YXBlX3VpLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiZ29sZF9sYWJsZSIsIkxhYmVsIiwiZXhfbGFiZWwiLCJ0aXBzX2xhYmVsIiwiYnV0dG9uX2ZyYW1lIiwiU3ByaXRlIiwiYnV0dG9uX2ZyYW1lX2FyciIsIlNwcml0ZUZyYW1lIiwicHVyc2Vfbm9kZSIsIk5vZGUiLCJleF9ub2RlIiwiZGVsZXRlX2J1dHRvbiIsIkJ1dHRvbiIsImluaV9ub2RlIiwiZ2FtZV9ydWxlc19qcyIsImZpbmQiLCJnZXRDb21wb25lbnQiLCJnYW1lX3NjZW5lX2pzIiwic291bmRfY29udHJvbCIsImFkX2NvbnRyb2wiLCJhZHNNYW5hZ2VyX2pzIiwic2hvd19iYW5uZXJBZCIsImFkZF9nb2xkIiwiTWF0aCIsImZsb29yIiwidXNlcl9kYXRhIiwic2tpbGwiLCJhZGRfZXgiLCJsZXZlbCIsInZpZGVvdGFwZV9wYXRoIiwic3ByaXRlRnJhbWUiLCJub2RlIiwiYWN0aXZlIiwic3RyaW5nIiwidG9kYXkiLCJEYXRlIiwic2F2ZV9kYXRlIiwiZ2V0RGF0ZSIsIndhdGNoX3ZpZGVvIiwib25fYnV0dG9uX2NsaWNrIiwic2hvd1Jld2FyZGVkVmlkZW8iLCJjcmVhdGVfdGlwc191aSIsIm9uX2RlbGV0ZV9idXR0b25fY2xpY2siLCJ2aWRlb19zaGFyZSIsInd4Iiwic2VsZiIsInNoYXJlQXBwTWVzc2FnZSIsImNoYW5uZWwiLCJ0aXRsZSIsImV4dHJhIiwidmlkZW9QYXRoIiwidmlkZW9Ub3BpY3MiLCJzdWNjZXNzIiwiY29uc29sZSIsImxvZyIsInZpZGVvdGFwZV9zaGFyZV9zdWNjZXMiLCJmYWlsIiwidmlkZW90YXBlX3NoYXJlX2ZhaWwiLCJwYXJlbnQiLCJ0b3VjaF9leGl0IiwicGxheV9zb3VuZF9lZmZlY3QiLCJoaWRlX2Jhbm5lckFkIiwib25fbm9kZV9raWxsIiwiYWRkX2dvbGRfdmlkZW8iLCJzdGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUNBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsVUFBVSxFQUFFSixFQUFFLENBQUNLLEtBRFA7QUFFUkMsSUFBQUEsUUFBUSxFQUFFTixFQUFFLENBQUNLLEtBRkw7QUFHUkUsSUFBQUEsVUFBVSxFQUFFUCxFQUFFLENBQUNLLEtBSFA7QUFJUkcsSUFBQUEsWUFBWSxFQUFFUixFQUFFLENBQUNTLE1BSlQ7QUFLUkMsSUFBQUEsZ0JBQWdCLEVBQUUsQ0FBQ1YsRUFBRSxDQUFDVyxXQUFKLENBTFY7QUFNUkMsSUFBQUEsVUFBVSxFQUFFWixFQUFFLENBQUNhLElBTlA7QUFPUkMsSUFBQUEsT0FBTyxFQUFFZCxFQUFFLENBQUNhLElBUEo7QUFRUkUsSUFBQUEsYUFBYSxFQUFFZixFQUFFLENBQUNnQjtBQVJWLEdBSFA7QUFhTDtBQUNBQyxFQUFBQSxRQWRLLHNCQWNNO0FBQ1AsU0FBS0MsYUFBTCxHQUFxQmxCLEVBQUUsQ0FBQ21CLElBQUgsQ0FBUSxTQUFSLEVBQW1CQyxZQUFuQixDQUFnQyxZQUFoQyxDQUFyQjtBQUNBLFNBQUtDLGFBQUwsR0FBcUJyQixFQUFFLENBQUNtQixJQUFILENBQVEsU0FBUixFQUFtQkMsWUFBbkIsQ0FBZ0MsWUFBaEMsQ0FBckI7QUFDQSxTQUFLRSxhQUFMLEdBQXFCdEIsRUFBRSxDQUFDbUIsSUFBSCxDQUFRLGVBQVIsRUFBeUJDLFlBQXpCLENBQXNDLGVBQXRDLENBQXJCO0FBQ0EsU0FBS0csVUFBTCxHQUFrQnZCLEVBQUUsQ0FBQ21CLElBQUgsQ0FBUSxZQUFSLEVBQXNCQyxZQUF0QixDQUFtQyxZQUFuQyxDQUFsQjtBQUNBLFNBQUtJLGFBQUwsR0FBcUJ4QixFQUFFLENBQUNtQixJQUFILENBQVEsU0FBUixFQUFtQkMsWUFBbkIsQ0FBZ0MsWUFBaEMsQ0FBckI7QUFDQSxTQUFLRyxVQUFMLENBQWdCRSxhQUFoQjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0JDLElBQUksQ0FBQ0MsS0FBTCxDQUFXLENBQUUsTUFBTUMsc0JBQVVBLFNBQVYsQ0FBb0JDLEtBQXBCLENBQTBCLFVBQTFCLENBQU4sR0FBOEMsR0FBaEQsSUFBd0QsRUFBbkUsSUFBeUUsQ0FBekY7QUFDQSxTQUFLQyxNQUFMLEdBQWNKLElBQUksQ0FBQ0MsS0FBTCxDQUFXQyxzQkFBVUEsU0FBVixDQUFvQkcsS0FBcEIsR0FBNEIsRUFBdkMsSUFBNkMsQ0FBM0Q7O0FBRUEsUUFBSSxLQUFLZCxhQUFMLENBQW1CZSxjQUFuQixJQUFxQyxJQUF6QyxFQUErQztBQUMzQztBQUNBLFdBQUt6QixZQUFMLENBQWtCMEIsV0FBbEIsR0FBZ0MsS0FBS3hCLGdCQUFMLENBQXNCLENBQXRCLENBQWhDO0FBQ0EsV0FBS0ssYUFBTCxDQUFtQm9CLElBQW5CLENBQXdCQyxNQUF4QixHQUFpQyxLQUFqQztBQUNILEtBSkQsTUFJTztBQUNIO0FBQ0EsV0FBSzVCLFlBQUwsQ0FBa0IwQixXQUFsQixHQUFnQyxLQUFLeEIsZ0JBQUwsQ0FBc0IsQ0FBdEIsQ0FBaEM7QUFDQSxXQUFLSyxhQUFMLENBQW1Cb0IsSUFBbkIsQ0FBd0JDLE1BQXhCLEdBQWlDLElBQWpDO0FBQ0g7O0FBQUE7QUFDRCxTQUFLaEMsVUFBTCxDQUFnQmlDLE1BQWhCLEdBQXlCLE1BQU0sS0FBS1gsUUFBcEM7QUFDQSxTQUFLcEIsUUFBTCxDQUFjK0IsTUFBZCxHQUF1QixNQUFNLEtBQUtOLE1BQWxDO0FBQ0EsUUFBSU8sS0FBSyxHQUFHLElBQUlDLElBQUosRUFBWjtBQUNBLFFBQUlWLHNCQUFVQSxTQUFWLENBQW9CVyxTQUFwQixJQUFpQ0YsS0FBSyxDQUFDRyxPQUFOLEVBQXJDLEVBQ0ksS0FBS2xDLFVBQUwsQ0FBZ0I4QixNQUFoQixHQUF5QixjQUFjUixzQkFBVUEsU0FBVixDQUFvQmEsV0FBbEMsR0FBZ0QsSUFBekUsQ0FESixLQUVLLEtBQUtuQyxVQUFMLENBQWdCOEIsTUFBaEIsR0FBeUIsY0FBekI7QUFDUixHQXZDSTtBQXlDTDtBQUNBTSxFQUFBQSxlQTFDSyw2QkEwQ2E7QUFBQTs7QUFDZCxRQUFJTCxLQUFLLEdBQUcsSUFBSUMsSUFBSixFQUFaOztBQUNBLFFBQUlELEtBQUssQ0FBQ0csT0FBTixNQUFtQlosc0JBQVVBLFNBQVYsQ0FBb0JXLFNBQXZDLElBQW9EWCxzQkFBVUEsU0FBVixDQUFvQmEsV0FBcEIsR0FBa0MsQ0FBMUYsRUFBNkY7QUFDekYsV0FBS2xCLGFBQUwsQ0FBbUJvQixpQkFBbkIsQ0FBcUMsWUFBTTtBQUN2Q2YsOEJBQVVBLFNBQVYsQ0FBb0JhLFdBQXBCO0FBQ0EsUUFBQSxLQUFJLENBQUNuQyxVQUFMLENBQWdCOEIsTUFBaEIsR0FBeUIsY0FBY1Isc0JBQVVBLFNBQVYsQ0FBb0JhLFdBQWxDLEdBQWdELElBQXpFO0FBQ0FiLDhCQUFVQSxTQUFWLENBQW9CVyxTQUFwQixHQUFnQ0YsS0FBSyxDQUFDRyxPQUFOLEVBQWhDOztBQUNBLFFBQUEsS0FBSSxDQUFDdkIsYUFBTCxDQUFtQlEsUUFBbkIsQ0FBNEJDLElBQUksQ0FBQ0MsS0FBTCxDQUFXLENBQUUsTUFBTUMsc0JBQVVBLFNBQVYsQ0FBb0JDLEtBQXBCLENBQTBCLFVBQTFCLENBQU4sR0FBOEMsR0FBaEQsSUFBd0QsRUFBbkUsSUFBeUUsQ0FBckc7O0FBQ0EsUUFBQSxLQUFJLENBQUNaLGFBQUwsQ0FBbUJhLE1BQW5CLENBQTBCSixJQUFJLENBQUNDLEtBQUwsQ0FBV0Msc0JBQVVBLFNBQVYsQ0FBb0JHLEtBQXBCLEdBQTRCLEVBQXZDLElBQTZDLENBQXZFO0FBQ0gsT0FORDtBQVFILEtBVEQsTUFVSyxJQUFJTSxLQUFLLENBQUNHLE9BQU4sTUFBbUJaLHNCQUFVQSxTQUFWLENBQW9CVyxTQUEzQyxFQUFzRDtBQUN2RCxXQUFLaEIsYUFBTCxDQUFtQm9CLGlCQUFuQixDQUFxQyxZQUFNO0FBQ3ZDRixRQUFBQSxXQUFXLEdBQUcsQ0FBZDtBQUNBLFFBQUEsS0FBSSxDQUFDbkMsVUFBTCxDQUFnQjhCLE1BQWhCLEdBQXlCLGNBQWNSLHNCQUFVQSxTQUFWLENBQW9CYSxXQUFsQyxHQUFnRCxJQUF6RTtBQUNBYiw4QkFBVUEsU0FBVixDQUFvQlcsU0FBcEIsR0FBZ0NGLEtBQUssQ0FBQ0csT0FBTixFQUFoQztBQUNILE9BSkQ7QUFLSCxLQU5JLE1BT0EsS0FBS3BCLGFBQUwsQ0FBbUJ3QixjQUFuQixDQUFrQyxLQUFLM0IsYUFBTCxDQUFtQmlCLElBQXJELEVBQTJELGdCQUEzRDtBQUNSLEdBOURJO0FBaUVMVyxFQUFBQSxzQkFqRUssb0NBaUVvQjtBQUNyQixTQUFLNUIsYUFBTCxDQUFtQmUsY0FBbkIsR0FBb0MsSUFBcEM7QUFDQSxTQUFLWixhQUFMLENBQW1Cd0IsY0FBbkIsQ0FBa0MsS0FBSzNCLGFBQUwsQ0FBbUJpQixJQUFyRCxFQUEyRCxpQkFBM0Q7QUFDQSxTQUFLbEIsUUFBTDtBQUNILEdBckVJO0FBc0VMO0FBQ0E4QixFQUFBQSxXQUFXLEVBQUUsdUJBQVk7QUFBQTs7QUFDckIsUUFBSSxPQUFRQyxFQUFSLEtBQWdCLFdBQXBCLEVBQWlDO0FBQzdCLFVBQUksS0FBSzlCLGFBQUwsQ0FBbUJlLGNBQW5CLElBQXFDLElBQXpDLEVBQStDO0FBQzNDO0FBQ0g7O0FBQUE7QUFDRCxVQUFJZ0IsSUFBSSxHQUFHLElBQVgsQ0FKNkIsQ0FLN0I7O0FBQ0FELE1BQUFBLEVBQUUsQ0FBQ0UsZUFBSCxDQUFtQjtBQUNmQyxRQUFBQSxPQUFPLEVBQUUsT0FETTtBQUNJO0FBQ25CQyxRQUFBQSxLQUFLLEVBQUUsb0JBRlE7QUFHZkMsUUFBQUEsS0FBSyxFQUFFO0FBQ0hDLFVBQUFBLFNBQVMsRUFBRSxLQUFLcEMsYUFBTCxDQUFtQmUsY0FEM0I7QUFDMEM7QUFDN0NzQixVQUFBQSxXQUFXLEVBQUUsQ0FBQyxvQkFBRCxFQUF1QixNQUF2QjtBQUZWLFNBSFE7QUFPZkMsUUFBQUEsT0FBTyxFQUFFLG1CQUFNO0FBQ1g7QUFDQUMsVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksUUFBWixFQUZXLENBR1g7O0FBQ0FULFVBQUFBLElBQUksQ0FBQ1Usc0JBQUw7QUFDSCxTQVpjO0FBYWZDLFFBQUFBLElBQUksRUFBRSxnQkFBTTtBQUNSSCxVQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxRQUFaLEVBQXNCLE1BQUksQ0FBQ3pCLGNBQTNCO0FBQ0FnQixVQUFBQSxJQUFJLENBQUNZLG9CQUFMO0FBQ0g7QUFoQmMsT0FBbkI7QUFrQkg7O0FBQUE7QUFDSixHQWpHSTtBQWtHTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBQSxFQUFBQSxvQkFBb0IsRUFBRSxnQ0FBWTtBQUM5QixTQUFLeEMsYUFBTCxDQUFtQndCLGNBQW5CLENBQWtDLEtBQUtWLElBQUwsQ0FBVTJCLE1BQTVDLEVBQW9ELHNCQUFwRDtBQUNBLFNBQUs3QyxRQUFMO0FBQ0gsR0F0SEk7QUF1SEw7QUFDQThDLEVBQUFBLFVBeEhLLHdCQXdIUTtBQUNULFNBQUt6QyxhQUFMLENBQW1CMEMsaUJBQW5CLENBQXFDLGFBQXJDO0FBQ0EsU0FBS3pDLFVBQUwsQ0FBZ0IwQyxhQUFoQjtBQUNBLFNBQUs1QyxhQUFMLENBQW1CNkMsWUFBbkIsQ0FBZ0MsS0FBSy9CLElBQXJDO0FBQ0gsR0E1SEk7QUE2SEw7QUFFQWdDLEVBQUFBLGNBQWMsRUFBRSwwQkFBWTtBQUN4QixTQUFLakQsYUFBTCxDQUFtQlEsUUFBbkIsQ0FBNEJDLElBQUksQ0FBQ0MsS0FBTCxDQUFXLENBQUUsTUFBTUMsc0JBQVVBLFNBQVYsQ0FBb0JDLEtBQXBCLENBQTBCLFVBQTFCLENBQU4sR0FBOEMsR0FBaEQsSUFBd0QsRUFBbkUsSUFBeUUsQ0FBckc7QUFDSCxHQWpJSTtBQWtJTHNDLEVBQUFBLEtBbElLLG1CQWtJRyxDQUVQLENBcElJLENBc0lMOztBQXRJSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdXNlcl9kYXRhIGZyb20gXCJ1c2VyX2RhdGFcIjtcclxuaW1wb3J0IGNvbmZpZyBmcm9tIFwiY29uZmlnXCI7XHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgZ29sZF9sYWJsZTogY2MuTGFiZWwsXHJcbiAgICAgICAgZXhfbGFiZWw6IGNjLkxhYmVsLFxyXG4gICAgICAgIHRpcHNfbGFiZWw6IGNjLkxhYmVsLFxyXG4gICAgICAgIGJ1dHRvbl9mcmFtZTogY2MuU3ByaXRlLFxyXG4gICAgICAgIGJ1dHRvbl9mcmFtZV9hcnI6IFtjYy5TcHJpdGVGcmFtZV0sXHJcbiAgICAgICAgcHVyc2Vfbm9kZTogY2MuTm9kZSxcclxuICAgICAgICBleF9ub2RlOiBjYy5Ob2RlLFxyXG4gICAgICAgIGRlbGV0ZV9idXR0b246IGNjLkJ1dHRvbixcclxuICAgIH0sXHJcbiAgICAvL+WIneWni+WMluiKgueCuVxyXG4gICAgaW5pX25vZGUoKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9ydWxlc1wiKTtcclxuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJnYW1lX3NjZW5lXCIpO1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbCA9IGNjLmZpbmQoXCJzb3VuZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcInNvdW5kX2NvbnRyb2xcIik7XHJcbiAgICAgICAgdGhpcy5hZF9jb250cm9sID0gY2MuZmluZChcImFkX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwiYWRfY29udHJvbFwiKTtcclxuICAgICAgICB0aGlzLmFkc01hbmFnZXJfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJBZHNNYW5hZ2VyXCIpO1xyXG4gICAgICAgIHRoaXMuYWRfY29udHJvbC5zaG93X2Jhbm5lckFkKCk7XHJcbiAgICAgICAgdGhpcy5hZGRfZ29sZCA9IE1hdGguZmxvb3IoKCg1MDAgKiB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1wiZ29sZF9tYXhcIl0gKyA1MDApKSAvIDIwKSArIDE7XHJcbiAgICAgICAgdGhpcy5hZGRfZXggPSBNYXRoLmZsb29yKHVzZXJfZGF0YS51c2VyX2RhdGEubGV2ZWwgLyAxMCkgKyAxO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5nYW1lX3J1bGVzX2pzLnZpZGVvdGFwZV9wYXRoID09IG51bGwpIHtcclxuICAgICAgICAgICAgLy/lvZXlsY/mnKrlvZXliLZcclxuICAgICAgICAgICAgdGhpcy5idXR0b25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmJ1dHRvbl9mcmFtZV9hcnJbMF07XHJcbiAgICAgICAgICAgIHRoaXMuZGVsZXRlX2J1dHRvbi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8v5b2V5bGP5bey5b2V5Yi2XHJcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5idXR0b25fZnJhbWVfYXJyWzFdO1xyXG4gICAgICAgICAgICB0aGlzLmRlbGV0ZV9idXR0b24ubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5nb2xkX2xhYmxlLnN0cmluZyA9IFwiK1wiICsgdGhpcy5hZGRfZ29sZDtcclxuICAgICAgICB0aGlzLmV4X2xhYmVsLnN0cmluZyA9IFwiK1wiICsgdGhpcy5hZGRfZXg7XHJcbiAgICAgICAgdmFyIHRvZGF5ID0gbmV3IERhdGUoKTtcclxuICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5zYXZlX2RhdGUgPT0gdG9kYXkuZ2V0RGF0ZSgpKVxyXG4gICAgICAgICAgICB0aGlzLnRpcHNfbGFiZWwuc3RyaW5nID0gXCJXYXRjaGVkOiBcIiArIHVzZXJfZGF0YS51c2VyX2RhdGEud2F0Y2hfdmlkZW8gKyBcIi8zXCI7XHJcbiAgICAgICAgZWxzZSB0aGlzLnRpcHNfbGFiZWwuc3RyaW5nID0gXCJXYXRjaGVkOiAwLzNcIlxyXG4gICAgfSxcclxuXHJcbiAgICAvL+aMiemSruiiq+eCueWHu1xyXG4gICAgb25fYnV0dG9uX2NsaWNrKCkge1xyXG4gICAgICAgIHZhciB0b2RheSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgaWYgKHRvZGF5LmdldERhdGUoKSA9PSB1c2VyX2RhdGEudXNlcl9kYXRhLnNhdmVfZGF0ZSAmJiB1c2VyX2RhdGEudXNlcl9kYXRhLndhdGNoX3ZpZGVvIDwgMykge1xyXG4gICAgICAgICAgICB0aGlzLmFkc01hbmFnZXJfanMuc2hvd1Jld2FyZGVkVmlkZW8oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS53YXRjaF92aWRlbysrO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aXBzX2xhYmVsLnN0cmluZyA9IFwiV2F0Y2hlZDogXCIgKyB1c2VyX2RhdGEudXNlcl9kYXRhLndhdGNoX3ZpZGVvICsgXCIvM1wiO1xyXG4gICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5zYXZlX2RhdGUgPSB0b2RheS5nZXREYXRlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMuYWRkX2dvbGQoTWF0aC5mbG9vcigoKDUwMCAqIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxbXCJnb2xkX21heFwiXSArIDUwMCkpIC8gMjApICsgMSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMuYWRkX2V4KE1hdGguZmxvb3IodXNlcl9kYXRhLnVzZXJfZGF0YS5sZXZlbCAvIDEwKSArIDEpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRvZGF5LmdldERhdGUoKSAhPSB1c2VyX2RhdGEudXNlcl9kYXRhLnNhdmVfZGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmFkc01hbmFnZXJfanMuc2hvd1Jld2FyZGVkVmlkZW8oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgd2F0Y2hfdmlkZW8gPSAxO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aXBzX2xhYmVsLnN0cmluZyA9IFwiV2F0Y2hlZDogXCIgKyB1c2VyX2RhdGEudXNlcl9kYXRhLndhdGNoX3ZpZGVvICsgXCIvM1wiO1xyXG4gICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5zYXZlX2RhdGUgPSB0b2RheS5nZXREYXRlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfcnVsZXNfanMubm9kZSwgXCJub192aWRlb190b2RheVwiKTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIG9uX2RlbGV0ZV9idXR0b25fY2xpY2soKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLnZpZGVvdGFwZV9wYXRoID0gbnVsbDtcclxuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3J1bGVzX2pzLm5vZGUsIFwidmlkb3RhcGVfY2FuY2VsXCIpO1xyXG4gICAgICAgIHRoaXMuaW5pX25vZGUoKTtcclxuICAgIH0sXHJcbiAgICAvL+W9leWxj+WIhuS6q1xyXG4gICAgdmlkZW9fc2hhcmU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodHlwZW9mICh3eCkgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZV9ydWxlc19qcy52aWRlb3RhcGVfcGF0aCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgLy/ojrflj5bliIbkuqvlr7zor61cclxuICAgICAgICAgICAgd3guc2hhcmVBcHBNZXNzYWdlKHtcclxuICAgICAgICAgICAgICAgIGNoYW5uZWw6ICd2aWRlbycsICAvL+aMh+WumuS4uuinhumikeWIhuS6q1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICdPbi1Ib29rIFNtYWxsIEZhcm0nLFxyXG4gICAgICAgICAgICAgICAgZXh0cmE6IHtcclxuICAgICAgICAgICAgICAgICAgICB2aWRlb1BhdGg6IHRoaXMuZ2FtZV9ydWxlc19qcy52aWRlb3RhcGVfcGF0aCwvLyDorr7nva7op4bpopHot6/lvoRcclxuICAgICAgICAgICAgICAgICAgICB2aWRlb1RvcGljczogW1wiT24tSG9vayBTbWFsbCBGYXJtXCIsIFwiR2FtZVwiXVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvL+WIhuS6q+Wbnuiwg1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCflvZXlsY/liIbkuqvmiJDlip8nKTtcclxuICAgICAgICAgICAgICAgICAgICAvL+WIhuS6q+WlluWKse+8jOS7heS4gOasoVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYudmlkZW90YXBlX3NoYXJlX3N1Y2NlcygpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5b2V5bGP5YiG5Lqr5aSx6LSlJywgdGhpcy52aWRlb3RhcGVfcGF0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi52aWRlb3RhcGVfc2hhcmVfZmFpbCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8v5b2V5bGP5YiG5Lqr5oiQ5YqfXHJcbiAgICAvLyB2aWRlb3RhcGVfc2hhcmVfc3VjY2VzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMubm9kZS5wYXJlbnQsIFwidmlkZW90YXBlX3NoYXJlX3N1Y2Nlc1wiKTtcclxuICAgIC8vICAgICB0aGlzLmdhbWVfcnVsZXNfanMudmlkZW90YXBlX3BhdGggPSBudWxsO1xyXG4gICAgLy8gICAgIHVzZXJfZGF0YS51c2VyX2RhdGEudmlkZW90YXBlX3NoYXJlX2NvdW50Kys7XHJcbiAgICAvLyAgICAgdmFyIGdvbGQgPSBNYXRoLmZsb29yKHRoaXMuYWRkX2dvbGQgLyA2KTtcclxuICAgIC8vICAgICB2YXIgZXggPSBNYXRoLmZsb29yKHRoaXMuYWRkX2V4IC8gMyk7XHJcbiAgICAvLyAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA2OyBpKyspIHtcclxuICAgIC8vICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9nb2xkX2VmZmVjdCh0aGlzLnB1cnNlX25vZGUsIGksIGdvbGQpO1xyXG4gICAgLy8gICAgIH07XHJcbiAgICAvLyAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgIC8vICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9leF9lZmZlY3QodGhpcy5leF9ub2RlLCBpLCBleCk7XHJcbiAgICAvLyAgICAgfTtcclxuICAgIC8vICAgICB0aGlzLmluaV9ub2RlKCk7XHJcblxyXG4gICAgLy8gfSxcclxuICAgIC8v5b2V5bGP5YiG5Lqr5aSx6LSlXHJcbiAgICB2aWRlb3RhcGVfc2hhcmVfZmFpbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLm5vZGUucGFyZW50LCBcInZpZGVvdGFwZV9zaGFyZV9mYWlsXCIpO1xyXG4gICAgICAgIHRoaXMuaW5pX25vZGUoKTtcclxuICAgIH0sXHJcbiAgICAvL+eCueWHu+mAgOWHulxyXG4gICAgdG91Y2hfZXhpdCgpIHtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fZXhpdFwiKTtcclxuICAgICAgICB0aGlzLmFkX2NvbnRyb2wuaGlkZV9iYW5uZXJBZCgpO1xyXG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5vbl9ub2RlX2tpbGwodGhpcy5ub2RlKTtcclxuICAgIH0sXHJcbiAgICAvLyBvbkxvYWQgKCkge30sXHJcblxyXG4gICAgYWRkX2dvbGRfdmlkZW86IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMuYWRkX2dvbGQoTWF0aC5mbG9vcigoKDUwMCAqIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxbXCJnb2xkX21heFwiXSArIDUwMCkpIC8gMjApICsgMSk7XHJcbiAgICB9LFxyXG4gICAgc3RhcnQoKSB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcclxufSk7XHJcbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ui/tips_ui.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '15751deW4pCXaxc+NoBZAzf', 'tips_ui');
// script/ui/tips_ui.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    label: cc.Label,
    floor_node: cc.Node,
    icon_frame: cc.Sprite,
    icon_frame_arr: [cc.SpriteFrame]
  },
  ini_node: function ini_node(type, num) {
    // this.label.node.active = true;
    // this.icon_frame.node.active = true;
    // this.floor_node.width = 0;
    // this.floor_node.height = 60;
    this.floor_node.y = 395;
    this.floor_node.opacity = 255;

    switch (type) {
      case "gold":
        this.label.string = "Gold+" + num;
        this.icon_frame.spriteFrame = this.icon_frame_arr[0];
        break;

      case "pet_leave":
        this.label.string = "Gone";
        this.icon_frame.spriteFrame = this.icon_frame_arr[1];
        break;

      case "videotape_no_time":
        this.label.string = "Screen recording time should be more than 3 seconds";
        this.icon_frame.spriteFrame = this.icon_frame_arr[1];
        break;

      case "videotape_share_fail":
        this.label.string = "Screen recording and sharing failed~";
        this.icon_frame.spriteFrame = this.icon_frame_arr[1];
        break;

      case "videotape_share_succes":
        this.label.string = "Screen recording and sharing success!";
        this.icon_frame.spriteFrame = this.icon_frame_arr[1];
        break;

      case "videotape_start":
        this.label.string = "Screen recording started";
        this.icon_frame.spriteFrame = this.icon_frame_arr[1];
        break;

      case "vidotape_cancel":
        this.label.string = "Screen recording has been reset";
        this.icon_frame.spriteFrame = this.icon_frame_arr[1];
        break;

      case "vidotape_over":
        this.label.string = "Screen recording has ended";
        this.icon_frame.spriteFrame = this.icon_frame_arr[1];
        break;

      case "video_exit":
        this.label.string = "Watch the full video~";
        this.icon_frame.spriteFrame = this.icon_frame_arr[1];
        break;

      case "video_wait":
        this.label.string = "Ad break~~";
        this.icon_frame.spriteFrame = this.icon_frame_arr[1];
        break;

      case "no_sell":
        this.label.string = "Nothing to sell";
        this.icon_frame.spriteFrame = this.icon_frame_arr[1];
        break;

      case "no_money_gold":
        this.label.string = "Gold not enought";
        this.icon_frame.spriteFrame = this.icon_frame_arr[1];
        break;

      case "no_money_diamond":
        this.label.string = "Diamond not enought";
        this.icon_frame.spriteFrame = this.icon_frame_arr[1];
        break;

      case "no_level":
        this.label.string = "Level not enought";
        this.icon_frame.spriteFrame = this.icon_frame_arr[1];
        break;

      case "no_skill_point":
        this.label.string = "Skill point not enought";
        this.icon_frame.spriteFrame = this.icon_frame_arr[1];
        break;

      case "empoly_succes":
        this.label.string = "Hire success";
        this.icon_frame.spriteFrame = this.icon_frame_arr[1];
        break;

      case "buy_succes":
        this.label.string = "Successful purchase";
        this.icon_frame.spriteFrame = this.icon_frame_arr[1];
        break;

      case "get_offline_profit":
        this.label.string = "Receive offline earnings";
        this.icon_frame.spriteFrame = this.icon_frame_arr[1];
        break;

      case "cultrue_succes":
        this.label.string = "Adoption is successful";
        this.icon_frame.spriteFrame = this.icon_frame_arr[1];
        break;

      case "un_develop":
        this.label.string = "Not unlocked yet";
        this.icon_frame.spriteFrame = this.icon_frame_arr[1];
        break;

      case "share_succes":
        this.label.string = "Share success";
        this.icon_frame.spriteFrame = this.icon_frame_arr[1];
        break;

      case "pet_already_life":
        this.label.string = "Pet already exists~";
        this.icon_frame.spriteFrame = this.icon_frame_arr[1];
        break;

      case "share_fail":
        this.label.string = "Try sharing again~";
        this.icon_frame.spriteFrame = this.icon_frame_arr[1];
        break;

      case "double_offline_profit":
        this.label.string = "Successfully receive double rewards";
        this.icon_frame.spriteFrame = this.icon_frame_arr[1];
        break;

      case "cultrue_pet_succes":
        this.label.string = "Increased pet favorability";
        this.icon_frame.spriteFrame = this.icon_frame_arr[1];
        break;

      case "staff_rest_over":
        this.label.string = "Work faster!";
        this.icon_frame.spriteFrame = this.icon_frame_arr[1];
        break;

      case "skill_rest":
        this.label.string = "Skill has been reset";
        this.icon_frame.spriteFrame = this.icon_frame_arr[1];
        break;

      case "gift_ad_ex":
        this.label.string = "Gain a lot of experience";
        this.icon_frame.spriteFrame = this.icon_frame_arr[1];
        break;

      case "gold_full":
        this.label.string = "Can't hold more coins!";
        this.icon_frame.spriteFrame = this.icon_frame_arr[1];
        break;

      case "gift_ad_level":
        this.label.string = "Level up!";
        this.icon_frame.spriteFrame = this.icon_frame_arr[1];
        break;

      case "share_max":
        this.label.string = "Reached today's limit~";
        this.icon_frame.spriteFrame = this.icon_frame_arr[1];
        break;

      case "unlocked_repo":
        this.label.string = "Unlocked this repository";
        this.icon_frame.spriteFrame = this.icon_frame_arr[1];
        break;

      case "cant_unlock_repo":
        this.label.string = "Can't unlock this repository yet";
        this.icon_frame.spriteFrame = this.icon_frame_arr[1];
        break;

      case "no_video_today":
        this.label.string = "Out of video view";
        this.icon_frame.spriteFrame = this.icon_frame_arr[1];
        break;

      case "no_money":
        this.label.string = "Not engought gold and diamond!!!";
        this.icon_frame.spriteFrame = this.icon_frame_arr[1];
        break;
    }

    ;
    this.end_anim();
  },
  // ini_anim: function () {
  //     cc.tween(this.floor_node)
  //         .to(0.2, { y: 100 }, { easing: "sineOut" })
  //         .call(() => {
  //             this.label.node.active = true;
  //             this.icon_frame.node.active = true;
  //             var callback = function () {
  //                 this.end_anim();
  //             };
  //             this.scheduleOnce(callback, 1.5);
  //         })
  //         .start();
  // },
  end_anim: function end_anim() {
    var _this = this;

    cc.tween(this.floor_node).delay(1).to(0.3, {
      y: this.floor_node.y + 150,
      opacity: 0
    }, {
      easing: "sineOut"
    }).call(function () {
      _this.game_scene_js.on_node_kill(_this.node);
    }).start();
  },
  // LIFE-CYCLE CALLBACKS:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcdGlwc191aS5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImxhYmVsIiwiTGFiZWwiLCJmbG9vcl9ub2RlIiwiTm9kZSIsImljb25fZnJhbWUiLCJTcHJpdGUiLCJpY29uX2ZyYW1lX2FyciIsIlNwcml0ZUZyYW1lIiwiaW5pX25vZGUiLCJ0eXBlIiwibnVtIiwieSIsIm9wYWNpdHkiLCJzdHJpbmciLCJzcHJpdGVGcmFtZSIsImVuZF9hbmltIiwidHdlZW4iLCJkZWxheSIsInRvIiwiZWFzaW5nIiwiY2FsbCIsImdhbWVfc2NlbmVfanMiLCJvbl9ub2RlX2tpbGwiLCJub2RlIiwic3RhcnQiLCJvbkxvYWQiLCJmaW5kIiwiZ2V0Q29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsS0FBSyxFQUFFSixFQUFFLENBQUNLLEtBREY7QUFFUkMsSUFBQUEsVUFBVSxFQUFFTixFQUFFLENBQUNPLElBRlA7QUFHUkMsSUFBQUEsVUFBVSxFQUFFUixFQUFFLENBQUNTLE1BSFA7QUFJUkMsSUFBQUEsY0FBYyxFQUFFLENBQUNWLEVBQUUsQ0FBQ1csV0FBSjtBQUpSLEdBSFA7QUFTTEMsRUFBQUEsUUFBUSxFQUFFLGtCQUFVQyxJQUFWLEVBQWdCQyxHQUFoQixFQUFxQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQUtSLFVBQUwsQ0FBZ0JTLENBQWhCLEdBQW9CLEdBQXBCO0FBQ0EsU0FBS1QsVUFBTCxDQUFnQlUsT0FBaEIsR0FBMEIsR0FBMUI7O0FBQ0EsWUFBUUgsSUFBUjtBQUNJLFdBQUssTUFBTDtBQUNJLGFBQUtULEtBQUwsQ0FBV2EsTUFBWCxHQUFvQixVQUFVSCxHQUE5QjtBQUNBLGFBQUtO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VUFBZCxFQUNLZSxLQURMLENBQ1csQ0FEWCxFQUVLQyxFQUZMLENBRVEsR0FGUixFQUVhO0FBQUVQLE1BQUFBLENBQUMsRUFBRSxLQUFLVCxVQUFMLENBQWdCUyxDQUFoQixHQUFvQixHQUF6QjtBQUE4QkMsTUFBQUEsT0FBTyxFQUFFO0FBQXZDLEtBRmIsRUFFeUQ7QUFBRU8sTUFBQUEsTUFBTSxFQUFFO0FBQVYsS0FGekQsRUFHS0MsSUFITCxDQUdVLFlBQU07QUFDUixNQUFBLEtBQUksQ0FBQ0MsYUFBTCxDQUFtQkMsWUFBbkIsQ0FBZ0MsS0FBSSxDQUFDQyxJQUFyQztBQUNILEtBTEwsRUFNS0MsS0FOTDtBQU9ILEdBckxJO0FBc0xMO0FBRUFDLEVBQUFBLE1BeExLLG9CQXdMSTtBQUNMLFNBQUtKLGFBQUwsR0FBcUJ6QixFQUFFLENBQUM4QixJQUFILENBQVEsU0FBUixFQUFtQkMsWUFBbkIsQ0FBZ0MsWUFBaEMsQ0FBckI7QUFDSCxHQTFMSTtBQTRMTEgsRUFBQUEsS0E1TEssbUJBNExHLENBRVAsQ0E5TEksQ0FnTUw7O0FBaE1LLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgbGFiZWw6IGNjLkxhYmVsLFxyXG4gICAgICAgIGZsb29yX25vZGU6IGNjLk5vZGUsXHJcbiAgICAgICAgaWNvbl9mcmFtZTogY2MuU3ByaXRlLFxyXG4gICAgICAgIGljb25fZnJhbWVfYXJyOiBbY2MuU3ByaXRlRnJhbWVdLFxyXG4gICAgfSxcclxuICAgIGluaV9ub2RlOiBmdW5jdGlvbiAodHlwZSwgbnVtKSB7XHJcbiAgICAgICAgLy8gdGhpcy5sYWJlbC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgLy8gdGhpcy5pY29uX2ZyYW1lLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAvLyB0aGlzLmZsb29yX25vZGUud2lkdGggPSAwO1xyXG4gICAgICAgIC8vIHRoaXMuZmxvb3Jfbm9kZS5oZWlnaHQgPSA2MDtcclxuICAgICAgICB0aGlzLmZsb29yX25vZGUueSA9IDM5NTtcclxuICAgICAgICB0aGlzLmZsb29yX25vZGUub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBcImdvbGRcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gXCJHb2xkK1wiICsgbnVtO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2FyclswXTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwicGV0X2xlYXZlXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiR29uZVwiXHJcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyWzFdO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ2aWRlb3RhcGVfbm9fdGltZVwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBcIlNjcmVlbiByZWNvcmRpbmcgdGltZSBzaG91bGQgYmUgbW9yZSB0aGFuIDMgc2Vjb25kc1wiXHJcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyWzFdO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ2aWRlb3RhcGVfc2hhcmVfZmFpbFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBcIlNjcmVlbiByZWNvcmRpbmcgYW5kIHNoYXJpbmcgZmFpbGVkflwiXHJcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyWzFdO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ2aWRlb3RhcGVfc2hhcmVfc3VjY2VzXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiU2NyZWVuIHJlY29yZGluZyBhbmQgc2hhcmluZyBzdWNjZXNzIVwiXHJcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyWzFdO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ2aWRlb3RhcGVfc3RhcnRcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gXCJTY3JlZW4gcmVjb3JkaW5nIHN0YXJ0ZWRcIlxyXG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2FyclsxXTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwidmlkb3RhcGVfY2FuY2VsXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiU2NyZWVuIHJlY29yZGluZyBoYXMgYmVlbiByZXNldFwiXHJcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyWzFdO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ2aWRvdGFwZV9vdmVyXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiU2NyZWVuIHJlY29yZGluZyBoYXMgZW5kZWRcIlxyXG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2FyclsxXTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwidmlkZW9fZXhpdFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBcIldhdGNoIHRoZSBmdWxsIHZpZGVvflwiXHJcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyWzFdO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ2aWRlb193YWl0XCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiQWQgYnJlYWt+flwiXHJcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyWzFdO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJub19zZWxsXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiTm90aGluZyB0byBzZWxsXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyWzFdO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJub19tb25leV9nb2xkXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiR29sZCBub3QgZW5vdWdodFwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2FyclsxXTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwibm9fbW9uZXlfZGlhbW9uZFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBcIkRpYW1vbmQgbm90IGVub3VnaHRcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbMV07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIm5vX2xldmVsXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiTGV2ZWwgbm90IGVub3VnaHRcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbMV07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIm5vX3NraWxsX3BvaW50XCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiU2tpbGwgcG9pbnQgbm90IGVub3VnaHRcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbMV07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImVtcG9seV9zdWNjZXNcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gXCJIaXJlIHN1Y2Nlc3NcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbMV07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJ1eV9zdWNjZXNcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gXCJTdWNjZXNzZnVsIHB1cmNoYXNlXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyWzFdO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJnZXRfb2ZmbGluZV9wcm9maXRcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gXCJSZWNlaXZlIG9mZmxpbmUgZWFybmluZ3NcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbMV07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImN1bHRydWVfc3VjY2VzXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiQWRvcHRpb24gaXMgc3VjY2Vzc2Z1bFwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2FyclsxXTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwidW5fZGV2ZWxvcFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBcIk5vdCB1bmxvY2tlZCB5ZXRcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbMV07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInNoYXJlX3N1Y2Nlc1wiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBcIlNoYXJlIHN1Y2Nlc3NcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbMV07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInBldF9hbHJlYWR5X2xpZmVcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gXCJQZXQgYWxyZWFkeSBleGlzdHN+XCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyWzFdO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJzaGFyZV9mYWlsXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiVHJ5IHNoYXJpbmcgYWdhaW5+XCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyWzFdO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJkb3VibGVfb2ZmbGluZV9wcm9maXRcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gXCJTdWNjZXNzZnVsbHkgcmVjZWl2ZSBkb3VibGUgcmV3YXJkc1wiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2FyclsxXTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiY3VsdHJ1ZV9wZXRfc3VjY2VzXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiSW5jcmVhc2VkIHBldCBmYXZvcmFiaWxpdHlcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbMV07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInN0YWZmX3Jlc3Rfb3ZlclwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBcIldvcmsgZmFzdGVyIVwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2FyclsxXTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwic2tpbGxfcmVzdFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBcIlNraWxsIGhhcyBiZWVuIHJlc2V0XCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyWzFdO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJnaWZ0X2FkX2V4XCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiR2FpbiBhIGxvdCBvZiBleHBlcmllbmNlXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyWzFdO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJnb2xkX2Z1bGxcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gXCJDYW4ndCBob2xkIG1vcmUgY29pbnMhXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyWzFdO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJnaWZ0X2FkX2xldmVsXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiTGV2ZWwgdXAhXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyWzFdO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJzaGFyZV9tYXhcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gXCJSZWFjaGVkIHRvZGF5J3MgbGltaXR+XCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyWzFdO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ1bmxvY2tlZF9yZXBvXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiVW5sb2NrZWQgdGhpcyByZXBvc2l0b3J5XCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyWzFdO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJjYW50X3VubG9ja19yZXBvXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiQ2FuJ3QgdW5sb2NrIHRoaXMgcmVwb3NpdG9yeSB5ZXRcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbMV07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIm5vX3ZpZGVvX3RvZGF5XCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiT3V0IG9mIHZpZGVvIHZpZXdcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbMV07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIm5vX21vbmV5XCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiTm90IGVuZ291Z2h0IGdvbGQgYW5kIGRpYW1vbmQhISFcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbMV07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuZW5kX2FuaW0oKTtcclxuICAgIH0sXHJcbiAgICAvLyBpbmlfYW5pbTogZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gICAgIGNjLnR3ZWVuKHRoaXMuZmxvb3Jfbm9kZSlcclxuICAgIC8vICAgICAgICAgLnRvKDAuMiwgeyB5OiAxMDAgfSwgeyBlYXNpbmc6IFwic2luZU91dFwiIH0pXHJcbiAgICAvLyAgICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMubGFiZWwubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgIC8vICAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICB0aGlzLmVuZF9hbmltKCk7XHJcbiAgICAvLyAgICAgICAgICAgICB9O1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoY2FsbGJhY2ssIDEuNSk7XHJcbiAgICAvLyAgICAgICAgIH0pXHJcbiAgICAvLyAgICAgICAgIC5zdGFydCgpO1xyXG4gICAgLy8gfSxcclxuICAgIGVuZF9hbmltOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY2MudHdlZW4odGhpcy5mbG9vcl9ub2RlKVxyXG4gICAgICAgICAgICAuZGVsYXkoMSlcclxuICAgICAgICAgICAgLnRvKDAuMywgeyB5OiB0aGlzLmZsb29yX25vZGUueSArIDE1MCwgb3BhY2l0eTogMCB9LCB7IGVhc2luZzogXCJzaW5lT3V0XCIgfSlcclxuICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLm9uX25vZGVfa2lsbCh0aGlzLm5vZGUpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuc3RhcnQoKTtcclxuICAgIH0sXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9zY2VuZVwiKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcclxufSk7XHJcbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ui/button_more.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0f2a6fEGqpNiZbr09LBCQyz', 'button_more');
// script/ui/button_more.js

"use strict";

var user_data = require("user_data");

cc.Class({
  "extends": cc.Component,
  properties: {
    frame_arr: {
      "default": [],
      type: cc.SpriteFrame
    },
    group_node: cc.Node
  },
  //初始化按钮
  ini_node: function ini_node(type) {
    this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
    this.sound_control = cc.find("sound_control").getComponent("sound_control");
    this.land_group = cc.find("UI_ROOT/center/land_group");
    this.ad_control = cc.find("ad_control").getComponent("ad_control");
    this.ad_control.show_bannerAd();
    this.button_type = type;
    this.set_button_frame();
    this.set_button_position();
  },
  //设置按钮的图片样式
  set_button_frame: function set_button_frame() {
    switch (this.button_type) {
      case "watering":
        for (var i = 0; i < this.land_group.children.length; i++) {
          if (user_data.user_data.land[i].have == 1) {
            this.group_node.children[i].active = true;
            this.group_node.children[i].getChildByName("button_icon").getComponent(cc.Sprite).spriteFrame = this.frame_arr[1];
          }

          ;
        }

        ;
        break;

      case "till":
        for (var i = 0; i < this.land_group.children.length; i++) {
          if (user_data.user_data.land[i].have == 1) {
            this.group_node.children[i].active = true;
            this.group_node.children[i].getChildByName("button_icon").getComponent(cc.Sprite).spriteFrame = this.frame_arr[2];
          }

          ;
        }

        ;
        break;

      case "plant":
        for (var i = 0; i < this.land_group.children.length; i++) {
          if (user_data.user_data.land[i].have == 1) {
            this.group_node.children[i].active = true;
            this.group_node.children[i].getChildByName("button_icon").getComponent(cc.Sprite).spriteFrame = this.frame_arr[0];
          }

          ;
        }

        ;
        break;
    }

    ;
  },
  //设置按钮位置
  set_button_position: function set_button_position() {
    for (var i = 0; i < this.land_group.children.length; i++) {
      this.group_node.children[i].setPosition(this.land_group.children[i].position.x, this.land_group.children[i].position.y + 16);
    }

    ;
  },
  //touch exit
  on_touch_exit_button_click: function on_touch_exit_button_click() {
    this.sound_control.play_sound_effect("button_exit");
    this.ad_control.hide_bannerAd();
    this.game_scene_js.on_node_kill(this.node);
  },
  //当按钮被点击
  on_button_click: function on_button_click(e, land_index) {
    this.sound_control.play_sound_effect("button_click");
    this.ad_control.hide_bannerAd();

    switch (this.button_type) {
      case "watering":
        this.land_group.children[land_index].getComponent("land").water_charge(); // console.log("hello land "+land_index);

        break;

      case "till":
        this.land_group.children[land_index].getComponent("land").till();
        user_data.user_data.land[land_index].land_state = "wait_plant"; // console.log("hello land "+land_index  + " "+ user_data.user_data.land[land_index].land_state + " till");

        break;

      case "plant":
        var node = this.game_scene_js.create_plant_ui(this.game_scene_js.node);

        if (node != null) {
          node.getComponent("plant_ui").ini_node(land_index);
        }

        ;
        break;
    }

    ;
    this.game_scene_js.on_node_kill(this.node);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcYnV0dG9uX21vcmUuanMiXSwibmFtZXMiOlsidXNlcl9kYXRhIiwicmVxdWlyZSIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiZnJhbWVfYXJyIiwidHlwZSIsIlNwcml0ZUZyYW1lIiwiZ3JvdXBfbm9kZSIsIk5vZGUiLCJpbmlfbm9kZSIsImdhbWVfc2NlbmVfanMiLCJmaW5kIiwiZ2V0Q29tcG9uZW50Iiwic291bmRfY29udHJvbCIsImxhbmRfZ3JvdXAiLCJhZF9jb250cm9sIiwic2hvd19iYW5uZXJBZCIsImJ1dHRvbl90eXBlIiwic2V0X2J1dHRvbl9mcmFtZSIsInNldF9idXR0b25fcG9zaXRpb24iLCJpIiwiY2hpbGRyZW4iLCJsZW5ndGgiLCJsYW5kIiwiaGF2ZSIsImFjdGl2ZSIsImdldENoaWxkQnlOYW1lIiwiU3ByaXRlIiwic3ByaXRlRnJhbWUiLCJzZXRQb3NpdGlvbiIsInBvc2l0aW9uIiwieCIsInkiLCJvbl90b3VjaF9leGl0X2J1dHRvbl9jbGljayIsInBsYXlfc291bmRfZWZmZWN0IiwiaGlkZV9iYW5uZXJBZCIsIm9uX25vZGVfa2lsbCIsIm5vZGUiLCJvbl9idXR0b25fY2xpY2siLCJlIiwibGFuZF9pbmRleCIsIndhdGVyX2NoYXJnZSIsInRpbGwiLCJsYW5kX3N0YXRlIiwiY3JlYXRlX3BsYW50X3VpIiwib25Mb2FkIiwic3RhcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsU0FBUyxHQUFHQyxPQUFPLENBQUMsV0FBRCxDQUF2Qjs7QUFDQUMsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFNBQVMsRUFBRTtBQUNQLGlCQUFTLEVBREY7QUFFUEMsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNO0FBRkYsS0FESDtBQUtSQyxJQUFB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QXlCbUIsVUFBekIsRUFBcUM1QixZQUFyQyxDQUFrRCxNQUFsRCxFQUEwRDZCLFlBQTFELEdBREosQ0FFSTs7QUFDQTs7QUFDSixXQUFLLE1BQUw7QUFDSSxhQUFLM0IsVUFBTCxDQUFnQk8sUUFBaEIsQ0FBeUJtQixVQUF6QixFQUFxQzVCLFlBQXJDLENBQWtELE1BQWxELEVBQTBEOEIsSUFBMUQ7QUFDQTVDLFFBQUFBLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQnlCLElBQXBCLENBQXlCaUIsVUFBekIsRUFBcUNHLFVBQXJDLEdBQWdELFlBQWhELENBRkosQ0FHSTs7QUFDQTs7QUFDSixXQUFLLE9BQUw7QUFDSSxZQUFJTixJQUFJLEdBQUcsS0FBSzNCLGFBQUwsQ0FBbUJrQyxlQUFuQixDQUFtQyxLQUFLbEMsYUFBTCxDQUFtQjJCLElBQXRELENBQVg7O0FBQ0EsWUFBSUEsSUFBSSxJQUFJLElBQVosRUFBa0I7QUFDZEEsVUFBQUEsSUFBSSxDQUFDekIsWUFBTCxDQUFrQixVQUFsQixFQUE4QkgsUUFBOUIsQ0FBdUMrQixVQUF2QztBQUNIOztBQUFBO0FBQ0Q7QUFmUjs7QUFnQkM7QUFDRCxTQUFLOUIsYUFBTCxDQUFtQjBCLFlBQW5CLENBQWdDLEtBQUtDLElBQXJDO0FBQ0gsR0F2Rkk7QUF3RkxRLEVBQUFBLE1BeEZLLG9CQXdGSSxDQUdSLENBM0ZJO0FBNEZMQyxFQUFBQSxLQTVGSyxtQkE0RkcsQ0FFUCxDQTlGSSxDQWdHTDs7QUFoR0ssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHVzZXJfZGF0YSA9IHJlcXVpcmUoXCJ1c2VyX2RhdGFcIik7XHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgZnJhbWVfYXJyOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdyb3VwX25vZGU6IGNjLk5vZGUsXHJcbiAgICB9LFxyXG5cclxuICAgIC8v5Yid5aeL5YyW5oyJ6ZKuXHJcbiAgICBpbmlfbm9kZTogZnVuY3Rpb24gKHR5cGUpIHtcclxuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJnYW1lX3NjZW5lXCIpO1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbCA9IGNjLmZpbmQoXCJzb3VuZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcInNvdW5kX2NvbnRyb2xcIik7XHJcbiAgICAgICAgdGhpcy5sYW5kX2dyb3VwID0gY2MuZmluZChcIlVJX1JPT1QvY2VudGVyL2xhbmRfZ3JvdXBcIik7XHJcbiAgICAgICAgdGhpcy5hZF9jb250cm9sID0gY2MuZmluZChcImFkX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwiYWRfY29udHJvbFwiKTtcclxuICAgICAgICB0aGlzLmFkX2NvbnRyb2wuc2hvd19iYW5uZXJBZCgpO1xyXG4gICAgICAgIHRoaXMuYnV0dG9uX3R5cGUgPSB0eXBlO1xyXG4gICAgICAgIHRoaXMuc2V0X2J1dHRvbl9mcmFtZSgpO1xyXG4gICAgICAgIHRoaXMuc2V0X2J1dHRvbl9wb3NpdGlvbigpO1xyXG4gICAgfSxcclxuICAgIC8v6K6+572u5oyJ6ZKu55qE5Zu+54mH5qC35byPXHJcbiAgICBzZXRfYnV0dG9uX2ZyYW1lOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLmJ1dHRvbl90eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ3YXRlcmluZ1wiOlxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxhbmRfZ3JvdXAuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW2ldLmhhdmUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdyb3VwX25vZGUuY2hpbGRyZW5baV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ncm91cF9ub2RlLmNoaWxkcmVuW2ldLmdldENoaWxkQnlOYW1lKFwiYnV0dG9uX2ljb25cIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmZyYW1lX2FyclsxXTtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwidGlsbFwiOiAgICBcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sYW5kX2dyb3VwLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFtpXS5oYXZlID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ncm91cF9ub2RlLmNoaWxkcmVuW2ldLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JvdXBfbm9kZS5jaGlsZHJlbltpXS5nZXRDaGlsZEJ5TmFtZShcImJ1dHRvbl9pY29uXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5mcmFtZV9hcnJbMl07XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInBsYW50XCI6XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGFuZF9ncm91cC5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbaV0uaGF2ZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JvdXBfbm9kZS5jaGlsZHJlbltpXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdyb3VwX25vZGUuY2hpbGRyZW5baV0uZ2V0Q2hpbGRCeU5hbWUoXCJidXR0b25faWNvblwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuZnJhbWVfYXJyWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcblxyXG4gICAgLy/orr7nva7mjInpkq7kvY3nva5cclxuICAgIHNldF9idXR0b25fcG9zaXRpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGFuZF9ncm91cC5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmdyb3VwX25vZGUuY2hpbGRyZW5baV0uc2V0UG9zaXRpb24odGhpcy5sYW5kX2dyb3VwLmNoaWxkcmVuW2ldLnBvc2l0aW9uLngsIHRoaXMubGFuZF9ncm91cC5jaGlsZHJlbltpXS5wb3NpdGlvbi55ICsgMTYpO1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLy90b3VjaCBleGl0XHJcbiAgICBvbl90b3VjaF9leGl0X2J1dHRvbl9jbGljazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9leGl0XCIpO1xyXG4gICAgICAgIHRoaXMuYWRfY29udHJvbC5oaWRlX2Jhbm5lckFkKCk7XHJcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLm9uX25vZGVfa2lsbCh0aGlzLm5vZGUpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvL+W9k+aMiemSruiiq+eCueWHu1xyXG4gICAgb25fYnV0dG9uX2NsaWNrOiBmdW5jdGlvbiAoZSwgbGFuZF9pbmRleCkge1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9jbGlja1wiKTtcclxuICAgICAgICB0aGlzLmFkX2NvbnRyb2wuaGlkZV9iYW5uZXJBZCgpO1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5idXR0b25fdHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwid2F0ZXJpbmdcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMubGFuZF9ncm91cC5jaGlsZHJlbltsYW5kX2luZGV4XS5nZXRDb21wb25lbnQoXCJsYW5kXCIpLndhdGVyX2NoYXJnZSgpO1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJoZWxsbyBsYW5kIFwiK2xhbmRfaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ0aWxsXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhbmRfZ3JvdXAuY2hpbGRyZW5bbGFuZF9pbmRleF0uZ2V0Q29tcG9uZW50KFwibGFuZFwiKS50aWxsKCk7XHJcbiAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbbGFuZF9pbmRleF0ubGFuZF9zdGF0ZT1cIndhaXRfcGxhbnRcIjtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiaGVsbG8gbGFuZCBcIitsYW5kX2luZGV4ICArIFwiIFwiKyB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbbGFuZF9pbmRleF0ubGFuZF9zdGF0ZSArIFwiIHRpbGxcIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInBsYW50XCI6XHJcbiAgICAgICAgICAgICAgICB2YXIgbm9kZSA9IHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfcGxhbnRfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5vZGUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwicGxhbnRfdWlcIikuaW5pX25vZGUobGFuZF9pbmRleCk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMub25fbm9kZV9raWxsKHRoaXMubm9kZSk7XHJcbiAgICB9LFxyXG4gICAgb25Mb2FkKCkge1xyXG5cclxuXHJcbiAgICB9LFxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxyXG59KTtcclxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ui/plant_ui.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f2d8fybXzpH55xj2230YIaA', 'plant_ui');
// script/ui/plant_ui.js

"use strict";

var user_data = require("user_data");

cc.Class({
  "extends": cc.Component,
  properties: {
    icon_grop: cc.Node
  },
  //ini node
  ini_node: function ini_node(land_index) {
    this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
    this.land_group = cc.find("UI_ROOT/center/land_group");
    this.ad_control = cc.find("ad_control").getComponent("ad_control");
    this.sound_control = cc.find("sound_control").getComponent("sound_control");
    this.ad_control.show_bannerAd();
    this.set_icon();
    this.land_index = land_index;
  },
  //exit
  on_touch_exit_click: function on_touch_exit_click() {
    this.sound_control.play_sound_effect("button_exit");
    this.ad_control.hide_bannerAd();
    this.game_scene_js.on_node_kill(this.node);
  },
  //plant unlock judge
  set_icon: function set_icon() {
    for (var i = 0; i < this.icon_grop.children.length; i++) {
      //拥有种子
      if (user_data.user_data.plant[i].have == 1) {
        this.icon_grop.children[i].active = true;
      } else {
        this.icon_grop.children[i].active = false;
      }

      ;
    }

    ;
  },
  //plant click 
  on_plant_click: function on_plant_click(e, plant_index) {
    this.sound_control.play_sound_effect("button_click");
    this.land_group.children[this.land_index].getComponent("land").plant(plant_index);
    this.on_touch_exit_click();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxccGxhbnRfdWkuanMiXSwibmFtZXMiOlsidXNlcl9kYXRhIiwicmVxdWlyZSIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiaWNvbl9ncm9wIiwiTm9kZSIsImluaV9ub2RlIiwibGFuZF9pbmRleCIsImdhbWVfc2NlbmVfanMiLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwibGFuZF9ncm91cCIsImFkX2NvbnRyb2wiLCJzb3VuZF9jb250cm9sIiwic2hvd19iYW5uZXJBZCIsInNldF9pY29uIiwib25fdG91Y2hfZXhpdF9jbGljayIsInBsYXlfc291bmRfZWZmZWN0IiwiaGlkZV9iYW5uZXJBZCIsIm9uX25vZGVfa2lsbCIsIm5vZGUiLCJpIiwiY2hpbGRyZW4iLCJsZW5ndGgiLCJwbGFudCIsImhhdmUiLCJhY3RpdmUiLCJvbl9wbGFudF9jbGljayIsImUiLCJwbGFudF9pbmRleCIsIm9uTG9hZCIsInN0YXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLFNBQVMsR0FBR0MsT0FBTyxDQUFDLFdBQUQsQ0FBdkI7O0FBQ0FDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxTQUFTLEVBQUVKLEVBQUUsQ0FBQ0s7QUFETixHQUhQO0FBT0w7QUFDQUMsRUFBQUEsUUFBUSxFQUFFLGtCQUFVQyxVQUFWLEVBQXNCO0FBQzVCLFNBQUtDLGFBQUwsR0FBcUJSLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLFNBQVIsRUFBbUJDLFlBQW5CLENBQWdDLFlBQWhDLENBQXJCO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQlgsRUFBRSxDQUFDUyxJQUFILENBQVEsMkJBQVIsQ0FBbEI7QUFDQSxTQUFLRyxVQUFMLEdBQWtCWixFQUFFLENBQUNTLElBQUgsQ0FBUSxZQUFSLEVBQXNCQyxZQUF0QixDQUFtQyxZQUFuQyxDQUFsQjtBQUNBLFNBQUtHLGFBQUwsR0FBcUJiLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLGVBQVIsRUFBeUJDLFlBQXpCLENBQXNDLGVBQXRDLENBQXJCO0FBQ0EsU0FBS0UsVUFBTCxDQUFnQkUsYUFBaEI7QUFDQSxTQUFLQyxRQUFMO0FBQ0EsU0FBS1IsVUFBTCxHQUFrQkEsVUFBbEI7QUFDSCxHQWhCSTtBQWlCTDtBQUNBUyxFQUFBQSxtQkFBbUIsRUFBRSwrQkFBWTtBQUM3QixTQUFLSCxhQUFMLENBQW1CSSxpQkFBbkIsQ0FBcUMsYUFBckM7QUFDQSxTQUFLTCxVQUFMLENBQWdCTSxhQUFoQjtBQUNBLFNBQUtWLGFBQUwsQ0FBbUJXLFlBQW5CLENBQWdDLEtBQUtDLElBQXJDO0FBQ0gsR0F0Qkk7QUF1Qkw7QUFDQUwsRUFBQUEsUUFBUSxFQUFFLG9CQUFZO0FBQ2xCLFNBQUssSUFBSU0sQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLakIsU0FBTCxDQUFla0IsUUFBZixDQUF3QkMsTUFBNUMsRUFBb0RGLENBQUMsRUFBckQsRUFBeUQ7QUFDckQ7QUFDQSxVQUFJdkIsU0FBUyxDQUFDQSxTQUFWLENBQW9CMEIsS0FBcEIsQ0FBMEJILENBQTFCLEVBQTZCSSxJQUE3QixJQUFxQyxDQUF6QyxFQUE0QztBQUN4QyxhQUFLckIsU0FBTCxDQUFla0IsUUFBZixDQUF3QkQsQ0FBeEIsRUFBMkJLLE1BQTNCLEdBQW9DLElBQXBDO0FBQ0gsT0FGRCxNQUVPO0FBQ0gsYUFBS3RCLFNBQUwsQ0FBZWtCLFFBQWYsQ0FBd0JELENBQXhCLEVBQTJCSyxNQUEzQixHQUFvQyxLQUFwQztBQUNIOztBQUFBO0FBQ0o7O0FBQUE7QUFDSixHQWpDSTtBQWtDTDtBQUNBQyxFQUFBQSxjQUFjLEVBQUUsd0JBQVVDLENBQVYsRUFBYUMsV0FBYixFQUEwQjtBQUN0QyxTQUFLaEIsYUFBTCxDQUFtQkksaUJBQW5CLENBQXFDLGNBQXJDO0FBQ0EsU0FBS04sVUFBTCxDQUFnQlcsUUFBaEIsQ0FBeUIsS0FBS2YsVUFBOUIsRUFBMENHLFlBQTFDLENBQXVELE1BQXZELEVBQStEYyxLQUEvRCxDQUFxRUssV0FBckU7QUFDQSxTQUFLYixtQkFBTDtBQUNILEdBdkNJO0FBd0NMYyxFQUFBQSxNQXhDSyxvQkF3Q0ksQ0FFUixDQTFDSTtBQTRDTEMsRUFBQUEsS0E1Q0ssbUJBNENHLENBRVAsQ0E5Q0ksQ0FnREw7O0FBaERLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciB1c2VyX2RhdGEgPSByZXF1aXJlKFwidXNlcl9kYXRhXCIpO1xyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGljb25fZ3JvcDogY2MuTm9kZSxcclxuICAgIH0sXHJcblxyXG4gICAgLy9pbmkgbm9kZVxyXG4gICAgaW5pX25vZGU6IGZ1bmN0aW9uIChsYW5kX2luZGV4KSB7XHJcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9zY2VuZVwiKTtcclxuICAgICAgICB0aGlzLmxhbmRfZ3JvdXAgPSBjYy5maW5kKFwiVUlfUk9PVC9jZW50ZXIvbGFuZF9ncm91cFwiKTtcclxuICAgICAgICB0aGlzLmFkX2NvbnRyb2wgPSBjYy5maW5kKFwiYWRfY29udHJvbFwiKS5nZXRDb21wb25lbnQoXCJhZF9jb250cm9sXCIpO1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbCA9IGNjLmZpbmQoXCJzb3VuZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcInNvdW5kX2NvbnRyb2xcIik7XHJcbiAgICAgICAgdGhpcy5hZF9jb250cm9sLnNob3dfYmFubmVyQWQoKTtcclxuICAgICAgICB0aGlzLnNldF9pY29uKCk7XHJcbiAgICAgICAgdGhpcy5sYW5kX2luZGV4ID0gbGFuZF9pbmRleDtcclxuICAgIH0sXHJcbiAgICAvL2V4aXRcclxuICAgIG9uX3RvdWNoX2V4aXRfY2xpY2s6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fZXhpdFwiKTtcclxuICAgICAgICB0aGlzLmFkX2NvbnRyb2wuaGlkZV9iYW5uZXJBZCgpO1xyXG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5vbl9ub2RlX2tpbGwodGhpcy5ub2RlKTtcclxuICAgIH0sXHJcbiAgICAvL3BsYW50IHVubG9jayBqdWRnZVxyXG4gICAgc2V0X2ljb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuaWNvbl9ncm9wLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8v5oul5pyJ56eN5a2QXHJcbiAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLnBsYW50W2ldLmhhdmUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2dyb3AuY2hpbGRyZW5baV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9ncm9wLmNoaWxkcmVuW2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLy9wbGFudCBjbGljayBcclxuICAgIG9uX3BsYW50X2NsaWNrOiBmdW5jdGlvbiAoZSwgcGxhbnRfaW5kZXgpIHtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fY2xpY2tcIik7XHJcbiAgICAgICAgdGhpcy5sYW5kX2dyb3VwLmNoaWxkcmVuW3RoaXMubGFuZF9pbmRleF0uZ2V0Q29tcG9uZW50KFwibGFuZFwiKS5wbGFudChwbGFudF9pbmRleCk7XHJcbiAgICAgICAgdGhpcy5vbl90b3VjaF9leGl0X2NsaWNrKCk7XHJcbiAgICB9LFxyXG4gICAgb25Mb2FkKCkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcclxufSk7XHJcbiJdfQ==
//------QC-SOURCE-SPLIT------
