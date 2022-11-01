
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