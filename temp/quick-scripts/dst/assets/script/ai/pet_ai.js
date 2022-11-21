
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxhaVxccGV0X2FpLmpzIl0sIm5hbWVzIjpbImNvbmZpZyIsInJlcXVpcmUiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImJvZHlfbm9kZSIsIk5vZGUiLCJjaGFuZ2VfbW92ZW1lbnRfZGlyZWN0aW9uIiwiY2FsbGJhY2siLCJzdG9wX21vdmUiLCJudW0iLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJhbGxfZGlyZWN0aW9uIiwibGVuZ3RoIiwibW92ZW1lbnRfZGlyZWN0aW9uIiwiYW5pbV9zZWxlY3QiLCJzY2hlZHVsZSIsImFuaW0iLCJnZXRDb21wb25lbnQiLCJBbmltYXRpb24iLCJhbmltX2NsaXBzIiwiZ2V0Q2xpcHMiLCJwbGF5IiwibmFtZSIsIm5vZGUiLCJzY2FsZVgiLCJhaV9tb3ZlIiwiZHQiLCJzIiwibW92ZV9zcGVlZCIsIngiLCJ5Iiwib25Db2xsaXNpb25TdGF5Iiwib3RoZXIiLCJzZWxmIiwiekluZGV4IiwiY3JlYXRlX3Byb2ZpdCIsInBldF9pbmRleCIsInByb2R1Y2VfZXhfdGltZSIsInBldCIsInByb2R1Y2VfZXgiLCJ1c2VyX2RhdGEiLCJoYXZlIiwiaSIsImdhbWVfc2NlbmVfanMiLCJjcmVhdGVfZXhfZWZmZWN0IiwiaW5pX25vZGUiLCJyYW5kb21YIiwicmFuZG9tWSIsImZpbmQiLCJvbkxvYWQiLCJnYW1lX3J1bGVzX2pzIiwic3RhcnQiLCJ1cGRhdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7QUFEQSxJQUFJQSxNQUFNLEdBQUdDLE9BQU8sQ0FBQyxRQUFELENBQXBCOztBQUVBQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsU0FBUyxFQUFFSixFQUFFLENBQUNLO0FBRE4sR0FIUDtBQU9MO0FBQ0E7QUFDQUMsRUFBQUEseUJBQXlCLEVB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RztBQUNKLFNBQUsvQyx5QkFBTDtBQUNBLFNBQUtVLFdBQUw7QUFDSCxHQWxPSTtBQW9PTHNDLEVBQUFBLE1BcE9LLGtCQW9PRTFCLEVBcE9GLEVBb09NO0FBQ1AsU0FBS0QsT0FBTCxDQUFhQyxFQUFiO0FBQ0g7QUF0T0ksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGNvbmZpZyA9IHJlcXVpcmUoXCJjb25maWdcIik7XG5pbXBvcnQgdXNlcl9kYXRhIGZyb20gXCJ1c2VyX2RhdGFcIjtcbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGJvZHlfbm9kZTogY2MuTm9kZSxcbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG4gICAgLy8g5q+P6ZqU5Yeg56eS5pS55Y+Y56e75Yqo5pa55ZCRXG4gICAgY2hhbmdlX21vdmVtZW50X2RpcmVjdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnN0b3BfbW92ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdmFyIG51bSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuYWxsX2RpcmVjdGlvbi5sZW5ndGggLSAxKSArIDE7XG4gICAgICAgICAgICBpZiAobnVtIDwgMCkge1xuICAgICAgICAgICAgICAgIG51bSA9IDA7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5tb3ZlbWVudF9kaXJlY3Rpb24gPSB0aGlzLmFsbF9kaXJlY3Rpb25bbnVtXTtcbiAgICAgICAgICAgIHRoaXMuYW5pbV9zZWxlY3QoKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZShjYWxsYmFjaywgTWF0aC5yYW5kb20oKSAqIDMgKyAyKTtcbiAgICB9LFxuICAgIC8vYW5pbSBzZWxlY3RcbiAgICBhbmltX3NlbGVjdDogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYW5pbSA9IHRoaXMuYm9keV9ub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xuICAgICAgICB2YXIgYW5pbV9jbGlwcyA9IGFuaW0uZ2V0Q2xpcHMoKTsvL+iOt+WPluWKqOeUu+WJqui+kVxuICAgICAgICBzd2l0Y2ggKHRoaXMubW92ZW1lbnRfZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICBjYXNlIFwiel9pZGxlXCI6XG4gICAgICAgICAgICAgICAgYW5pbS5wbGF5KGFuaW1fY2xpcHNbMF0ubmFtZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiel9ydW5cIjpcbiAgICAgICAgICAgICAgICBhbmltLnBsYXkoYW5pbV9jbGlwc1sxXS5uYW1lKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJiX2lkbGVcIjpcbiAgICAgICAgICAgICAgICBhbmltLnBsYXkoYW5pbV9jbGlwc1syXS5uYW1lKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJiX3J1blwiOlxuICAgICAgICAgICAgICAgIGFuaW0ucGxheShhbmltX2NsaXBzWzNdLm5hbWUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImNfaWRsZVwiOlxuICAgICAgICAgICAgICAgIGFuaW0ucGxheShhbmltX2NsaXBzWzRdLm5hbWUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImNfcnVuX2xcIjpcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2NhbGVYID0gMTtcbiAgICAgICAgICAgICAgICBhbmltLnBsYXkoYW5pbV9jbGlwc1s1XS5uYW1lKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJjX3J1bl9yXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNjYWxlWCA9IC0xO1xuICAgICAgICAgICAgICAgIGFuaW0ucGxheShhbmltX2NsaXBzWzVdLm5hbWUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgLy/pmo/mnLrmn5DkuKrmlrnlkJHnp7vliqhcbiAgICBhaV9tb3ZlOiBmdW5jdGlvbiAoZHQpIHsgLy9kdOa4uOaIj+aXtumXtFxuXG4gICAgICAgIC8v5b6X5Yiw5q+P5bin55qE6YCf5bqmXG4gICAgICAgIHZhciBzID0gdGhpcy5tb3ZlX3NwZWVkICogZHQ7XG4gICAgICAgIC8vXG4gICAgICAgIGlmICh0aGlzLm5vZGUueCA8PSAtNjUgJiYgdGhpcy5zdG9wX21vdmUgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcF9tb3ZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMubW92ZW1lbnRfZGlyZWN0aW9uID0gXCJjX3J1bl9yXCI7XG4gICAgICAgICAgICB0aGlzLmFuaW1fc2VsZWN0KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMubm9kZS54ID49IDY1ICYmIHRoaXMuc3RvcF9tb3ZlID09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aGlzLnN0b3BfbW92ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm1vdmVtZW50X2RpcmVjdGlvbiA9IFwiY19ydW5fbFwiO1xuICAgICAgICAgICAgdGhpcy5hbmltX3NlbGVjdCgpO1xuXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMubm9kZS55ID49IDI5MCAmJiB0aGlzLnN0b3BfbW92ZSA9PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhpcy5zdG9wX21vdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5tb3ZlbWVudF9kaXJlY3Rpb24gPSBcInpfcnVuXCI7XG4gICAgICAgICAgICB0aGlzLmFuaW1fc2VsZWN0KCk7XG5cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5ub2RlLnkgPD0gLTUyOSAmJiB0aGlzLnN0b3BfbW92ZSA9PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhpcy5zdG9wX21vdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5tb3ZlbWVudF9kaXJlY3Rpb24gPSBcImJfcnVuXCI7XG4gICAgICAgICAgICB0aGlzLmFuaW1fc2VsZWN0KCk7XG4gICAgICAgIH1cblxuICAgICAgICAvL+WHoOenjeS4jeWQjOeahOenu+WKqOetlueVpVxuICAgICAgICBzd2l0Y2ggKHRoaXMubW92ZW1lbnRfZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICBjYXNlIFwiel9pZGxlXCI6XG4gICAgICAgICAgICAgICAgcyA9IDA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiel9ydW5cIjpcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUueSAtPSBzO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImJfaWRsZVwiOlxuICAgICAgICAgICAgICAgIHMgPSAwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImJfcnVuXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnkgKz0gcztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJjX2lkbGVcIjpcbiAgICAgICAgICAgICAgICBzID0gMDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJjX3J1bl9sXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnggLT0gcztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJjX3J1bl9yXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnggKz0gcztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfTtcblxuICAgIH0sXG4gICAgb25Db2xsaXNpb25TdGF5OiBmdW5jdGlvbiAob3RoZXIsIHNlbGYpIHtcbiAgICAgICAgLy/norDmkp7kuqfnlJ/kuobljrvosIPnlKjor6Xlh73mlbBcbiAgICAgICAgaWYgKHNlbGYubm9kZS55ID49IG90aGVyLm5vZGUueSkge1xuICAgICAgICAgICAgb3RoZXIubm9kZS56SW5kZXggPSAxO1xuICAgICAgICAgICAgc2VsZi5ub2RlLnpJbmRleCA9IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvdGhlci5ub2RlLnpJbmRleCA9IDA7XG4gICAgICAgICAgICBzZWxmLm5vZGUuekluZGV4ID0gMTtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIC8v6Ieq5Yqo6ZSA5q+BXG4gICAgLy8gYXV0b19kZXN0cm95KCkge1xuICAgIC8vICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgLy8gICAgICAgICB2YXIgbm93X3RpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAvLyAgICAgICAgIGlmICgobm93X3RpbWUgLSB1c2VyX2RhdGEudXNlcl9kYXRhLnBldFt0aGlzLnBldF9pbmRleF0uY3JlYXRlX3RpbWUpIC8gMTAwMCA+PSBjb25maWcucGV0W3RoaXMucGV0X2luZGV4XS5zdGF5X3RpbWUpIHtcbiAgICAvLyAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnBldFt0aGlzLnBldF9pbmRleF0uaGF2ZSA9IDA7XG4gICAgLy8gICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9zY2VuZV9qcy5ub2RlLFwicGV0X2xlYXZlXCIpO1xuICAgIC8vICAgICAgICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgLy8gICAgICAgICB9O1xuICAgIC8vICAgICB9O1xuICAgIC8vICAgICB0aGlzLnNjaGVkdWxlKGNhbGxiYWNrLCAxKVxuICAgIC8vIH0sXG4gICAgLy/kuqflh7rmlLbnm4pcbiAgICBjcmVhdGVfcHJvZml0KCkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMubm9kZS5uYW1lKSB7XG4gICAgICAgICAgICBjYXNlIFwicmFiYml0XCI6XG4gICAgICAgICAgICAgICAgdGhpcy5wZXRfaW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIHZhciBwcm9kdWNlX2V4X3RpbWUgPSBjb25maWcucGV0W3RoaXMucGV0X2luZGV4XS5wcm9kdWNlX2V4X3RpbWU7XG4gICAgICAgICAgICAgICAgdmFyIHByb2R1Y2VfZXggPSBjb25maWcucGV0W3RoaXMucGV0X2luZGV4XS5wcm9kdWNlX2V4O1xuICAgICAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByb2R1Y2VfZXggPSBjb25maWcucGV0W3RoaXMucGV0X2luZGV4XS5wcm9kdWNlX2V4O1xuICAgICAgICAgICAgICAgICAgICAvLyBmb3IgKHZhciBpID0gMDsgaSA8IHByb2R1Y2VfZXg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9leF9lZmZlY3QodGhpcy5ub2RlLCBpKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gfTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEucGV0W3RoaXMucGV0X2luZGV4XS5oYXZlID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvZHVjZV9leDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9leF9lZmZlY3QodGhpcy5ub2RlLCBpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlKGNhbGxiYWNrLCBwcm9kdWNlX2V4X3RpbWUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInJhYmJpdDJcIjpcbiAgICAgICAgICAgICAgICB0aGlzLnBldF9pbmRleCA9IDE7XG4gICAgICAgICAgICAgICAgdmFyIHByb2R1Y2VfZXhfdGltZSA9IGNvbmZpZy5wZXRbdGhpcy5wZXRfaW5kZXhdLnByb2R1Y2VfZXhfdGltZTtcbiAgICAgICAgICAgICAgICB2YXIgcHJvZHVjZV9leCA9IGNvbmZpZy5wZXRbdGhpcy5wZXRfaW5kZXhdLnByb2R1Y2VfZXg7XG4gICAgICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcHJvZHVjZV9leCA9IGNvbmZpZy5wZXRbdGhpcy5wZXRfaW5kZXhdLnByb2R1Y2VfZXg7XG4gICAgICAgICAgICAgICAgICAgIC8vIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvZHVjZV9leDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX2V4X2VmZmVjdCh0aGlzLm5vZGUsIGkpO1xuICAgICAgICAgICAgICAgICAgICAvLyB9O1xuICAgICAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbdGhpcy5wZXRfaW5kZXhdLmhhdmUgPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9kdWNlX2V4OyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX2V4X2VmZmVjdCh0aGlzLm5vZGUsIGkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwicGV0IFwiICsgdGhpcy5wZXRfaW5kZXggKyBcIiBwcm9kdWNlX2V4OiBcIiArIHByb2R1Y2VfZXgpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZShjYWxsYmFjaywgcHJvZHVjZV9leF90aW1lKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJ4aWFvYmFcIjpcbiAgICAgICAgICAgICAgICB0aGlzLnBldF9pbmRleCA9IDI7IFxuICAgICAgICAgICAgICAgIC8vIHRoaXMuYXV0b19kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgdmFyIHByb2R1Y2VfZXhfdGltZSA9IGNvbmZpZy5wZXRbdGhpcy5wZXRfaW5kZXhdLnByb2R1Y2VfZXhfdGltZTtcblxuICAgICAgICAgICAgICAgIHZhciBwcm9kdWNlX2V4ID0gY29uZmlnLnBldFt0aGlzLnBldF9pbmRleF0ucHJvZHVjZV9leDsvLyBs4buXaSBOYU5cbiAgICAgICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHZhciBwcm9kdWNlX2V4ID0gY29uZmlnLnBldFt0aGlzLnBldF9pbmRleF0ucHJvZHVjZV9leDtcbiAgICAgICAgICAgICAgICAgICAgLy8gZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9kdWNlX2V4OyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfZXhfZWZmZWN0KHRoaXMubm9kZSwgaSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIH07XG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLnBldFt0aGlzLnBldF9pbmRleF0uaGF2ZSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb2R1Y2VfZXg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfZXhfZWZmZWN0KHRoaXMubm9kZSwgaSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJwZXQgXCIgKyB0aGlzLnBldF9pbmRleCArIFwiIHByb2R1Y2VfZXg6IFwiICsgY29uZmlnLnBldFt0aGlzLnBldF9pbmRleF0ucHJvZHVjZV9leCk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlKGNhbGxiYWNrLCBwcm9kdWNlX2V4X3RpbWUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInhpYW9xaVwiOlxuICAgICAgICAgICAgICAgIHRoaXMucGV0X2luZGV4ID0gMztcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmF1dG9fZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIHZhciBwcm9kdWNlX2V4X3RpbWUgPSBjb25maWcucGV0W3RoaXMucGV0X2luZGV4XS5wcm9kdWNlX2V4X3RpbWU7XG4gICAgICAgICAgICAgICAgdmFyIHByb2R1Y2VfZXggPSBjb25maWcucGV0W3RoaXMucGV0X2luZGV4XS5wcm9kdWNlX2V4O1xuICAgICAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByb2R1Y2VfZXggPSBjb25maWcucGV0W3RoaXMucGV0X2luZGV4XS5wcm9kdWNlX2V4O1xuICAgICAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbdGhpcy5wZXRfaW5kZXhdLmhhdmUgPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9kdWNlX2V4OyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX2V4X2VmZmVjdCh0aGlzLm5vZGUsIGkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwicGV0IFwiICsgdGhpcy5wZXRfaW5kZXggKyBcIiBwcm9kdWNlX2V4OiBcIiArIHByb2R1Y2VfZXgpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZShjYWxsYmFjaywgcHJvZHVjZV9leF90aW1lKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGluaV9ub2RlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciByYW5kb21YID0gKE1hdGgucmFuZG9tKCkgPiAwLjUgPyAxIDogLTEpICogMTAwO1xuICAgICAgICB2YXIgcmFuZG9tWSA9IChNYXRoLnJhbmRvbSgpID4gMC41ID8gMSA6IC0xKSAqIDEwMDtcbiAgICAgICAgdGhpcy5ub2RlLnggPSByYW5kb21YO1xuICAgICAgICB0aGlzLm5vZGUueSA9IHJhbmRvbVlcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9zY2VuZVwiKTtcbiAgICAgICAgdGhpcy5hbGxfZGlyZWN0aW9uID0gW1wiel9pZGxlXCIsIFwiel9ydW5cIiwgXCJiX2lkbGVcIiwgXCJiX3J1blwiLCBcImNfaWRsZVwiLCBcImNfcnVuX2xcIiwgXCJjX3J1bl9yXCJdO1xuICAgICAgICB0aGlzLm1vdmVtZW50X2RpcmVjdGlvbiA9IFwiel9pZGxlXCI7XG4gICAgICAgIC8v5bCP5Lq655qE56e75Yqo6YCf5bqmXG4gICAgICAgIHRoaXMubW92ZV9zcGVlZCA9IDMwO1xuICAgICAgICAvL+WBnOatouenu+WKqO+8jOi+uee8mOaXtuinpuWPkVxuICAgICAgICB0aGlzLnN0b3BfbW92ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNyZWF0ZV9wcm9maXQoKTtcbiAgICB9LFxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5pbmlfbm9kZSgpO1xuICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJnYW1lX3J1bGVzXCIpO1xuICAgIH0sXG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VfbW92ZW1lbnRfZGlyZWN0aW9uKCk7XG4gICAgICAgIHRoaXMuYW5pbV9zZWxlY3QoKTtcbiAgICB9LFxuXG4gICAgdXBkYXRlKGR0KSB7XG4gICAgICAgIHRoaXMuYWlfbW92ZShkdCk7XG4gICAgfSxcbn0pO1xuIl19