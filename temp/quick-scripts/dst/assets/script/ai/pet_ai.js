
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
            this.game_rules_js.add_ex(produce_ex);
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
            this.game_rules_js.add_ex(produce_ex); // console.log("pet " + this.pet_index + " produce_ex: " + produce_ex);
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
            this.game_rules_js.add_ex(produce_ex); // console.log("pet " + this.pet_index + " produce_ex: " + config.pet[this.pet_index].produce_ex);
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
            this.game_rules_js.add_ex(produce_ex); // console.log("pet " + this.pet_index + " produce_ex: " + produce_ex);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxhaVxccGV0X2FpLmpzIl0sIm5hbWVzIjpbImNvbmZpZyIsInJlcXVpcmUiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImJvZHlfbm9kZSIsIk5vZGUiLCJjaGFuZ2VfbW92ZW1lbnRfZGlyZWN0aW9uIiwiY2FsbGJhY2siLCJzdG9wX21vdmUiLCJudW0iLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJhbGxfZGlyZWN0aW9uIiwibGVuZ3RoIiwibW92ZW1lbnRfZGlyZWN0aW9uIiwiYW5pbV9zZWxlY3QiLCJzY2hlZHVsZSIsImFuaW0iLCJnZXRDb21wb25lbnQiLCJBbmltYXRpb24iLCJhbmltX2NsaXBzIiwiZ2V0Q2xpcHMiLCJwbGF5IiwibmFtZSIsIm5vZGUiLCJzY2FsZVgiLCJhaV9tb3ZlIiwiZHQiLCJzIiwibW92ZV9zcGVlZCIsIngiLCJ5Iiwib25Db2xsaXNpb25TdGF5Iiwib3RoZXIiLCJzZWxmIiwiekluZGV4IiwiY3JlYXRlX3Byb2ZpdCIsInBldF9pbmRleCIsInByb2R1Y2VfZXhfdGltZSIsInBldCIsInByb2R1Y2VfZXgiLCJ1c2VyX2RhdGEiLCJoYXZlIiwiZ2FtZV9ydWxlc19qcyIsImFkZF9leCIsImluaV9ub2RlIiwicmFuZG9tWCIsInJhbmRvbVkiLCJnYW1lX3NjZW5lX2pzIiwiZmluZCIsIm9uTG9hZCIsInN0YXJ0IiwidXBkYXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUNBOzs7O0FBREEsSUFBSUEsTUFBTSxHQUFHQyxPQUFPLENBQUMsUUFBRCxDQUFwQjs7QUFFQUMsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFNBQVMsRUFBRUosRUFBRSxDQUFDSztBQUROLEdBSFA7QUFPTDtBQUNBO0FBQ0FDLEVBQUFBLHlCQUF5QixFQUFFLHFDQUFZO0FBQ25D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LFlBQW5CLENBQWdDLFlBQWhDLENBQXJCO0FBQ0EsU0FBS04sYUFBTCxHQUFxQixDQUFDLFFBQUQsRUFBVyxPQUFYLEVBQW9CLFFBQXBCLEVBQThCLE9BQTlCLEVBQXVDLFFBQXZDLEVBQWlELFNBQWpELEVBQTRELFNBQTVELENBQXJCO0FBQ0EsU0FBS0Usa0JBQUwsR0FBMEIsUUFBMUIsQ0FQa0IsQ0FRbEI7O0FBQ0EsU0FBS2UsVUFBTCxHQUFrQixFQUFsQixDQVRrQixDQVVsQjs7QUFDQSxTQUFLdEIsU0FBTCxHQUFpQixLQUFqQjtBQUNBLFNBQUs2QixhQUFMO0FBQ0gsR0FqTkk7QUFrTkxjLEVBQUFBLE1BbE5LLG9CQWtOSTtBQUNMLFNBQUtMLFFBQUw7QUFDQSxTQUFLRixhQUFMLEdBQXFCNUMsRUFBRSxDQUFDa0QsSUFBSCxDQUFRLFNBQVIsRUFBbUIvQixZQUFuQixDQUFnQyxZQUFoQyxDQUFyQjtBQUNILEdBck5JO0FBdU5MaUMsRUFBQUEsS0F2TkssbUJBdU5HO0FBQ0osU0FBSzlDLHlCQUFMO0FBQ0EsU0FBS1UsV0FBTDtBQUNILEdBMU5JO0FBNE5McUMsRUFBQUEsTUE1Tkssa0JBNE5FekIsRUE1TkYsRUE0Tk07QUFDUCxTQUFLRCxPQUFMLENBQWFDLEVBQWI7QUFDSDtBQTlOSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgY29uZmlnID0gcmVxdWlyZShcImNvbmZpZ1wiKTtcclxuaW1wb3J0IHVzZXJfZGF0YSBmcm9tIFwidXNlcl9kYXRhXCI7XHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgYm9keV9ub2RlOiBjYy5Ob2RlLFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuICAgIC8vIOavj+malOWHoOenkuaUueWPmOenu+WKqOaWueWQkVxyXG4gICAgY2hhbmdlX21vdmVtZW50X2RpcmVjdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5zdG9wX21vdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdmFyIG51bSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuYWxsX2RpcmVjdGlvbi5sZW5ndGggLSAxKSArIDE7XHJcbiAgICAgICAgICAgIGlmIChudW0gPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBudW0gPSAwO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVtZW50X2RpcmVjdGlvbiA9IHRoaXMuYWxsX2RpcmVjdGlvbltudW1dO1xyXG4gICAgICAgICAgICB0aGlzLmFuaW1fc2VsZWN0KCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlKGNhbGxiYWNrLCBNYXRoLnJhbmRvbSgpICogMyArIDIpO1xyXG4gICAgfSxcclxuICAgIC8vYW5pbSBzZWxlY3RcclxuICAgIGFuaW1fc2VsZWN0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGFuaW0gPSB0aGlzLmJvZHlfbm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcclxuICAgICAgICB2YXIgYW5pbV9jbGlwcyA9IGFuaW0uZ2V0Q2xpcHMoKTsvL+iOt+WPluWKqOeUu+WJqui+kVxyXG4gICAgICAgIHN3aXRjaCAodGhpcy5tb3ZlbWVudF9kaXJlY3Rpb24pIHtcclxuICAgICAgICAgICAgY2FzZSBcInpfaWRsZVwiOlxyXG4gICAgICAgICAgICAgICAgYW5pbS5wbGF5KGFuaW1fY2xpcHNbMF0ubmFtZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInpfcnVuXCI6XHJcbiAgICAgICAgICAgICAgICBhbmltLnBsYXkoYW5pbV9jbGlwc1sxXS5uYW1lKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYl9pZGxlXCI6XHJcbiAgICAgICAgICAgICAgICBhbmltLnBsYXkoYW5pbV9jbGlwc1syXS5uYW1lKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYl9ydW5cIjpcclxuICAgICAgICAgICAgICAgIGFuaW0ucGxheShhbmltX2NsaXBzWzNdLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJjX2lkbGVcIjpcclxuICAgICAgICAgICAgICAgIGFuaW0ucGxheShhbmltX2NsaXBzWzRdLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJjX3J1bl9sXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2NhbGVYID0gMTtcclxuICAgICAgICAgICAgICAgIGFuaW0ucGxheShhbmltX2NsaXBzWzVdLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJjX3J1bl9yXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2NhbGVYID0gLTE7XHJcbiAgICAgICAgICAgICAgICBhbmltLnBsYXkoYW5pbV9jbGlwc1s1XS5uYW1lKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLy/pmo/mnLrmn5DkuKrmlrnlkJHnp7vliqhcclxuICAgIGFpX21vdmU6IGZ1bmN0aW9uIChkdCkgeyAvL2R05ri45oiP5pe26Ze0XHJcblxyXG4gICAgICAgIC8v5b6X5Yiw5q+P5bin55qE6YCf5bqmXHJcbiAgICAgICAgdmFyIHMgPSB0aGlzLm1vdmVfc3BlZWQgKiBkdDtcclxuICAgICAgICAvL1xyXG4gICAgICAgIGlmICh0aGlzLm5vZGUueCA8PSAtNjUgJiYgdGhpcy5zdG9wX21vdmUgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgdGhpcy5zdG9wX21vdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVtZW50X2RpcmVjdGlvbiA9IFwiY19ydW5fclwiO1xyXG4gICAgICAgICAgICB0aGlzLmFuaW1fc2VsZWN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLm5vZGUueCA+PSA2NSAmJiB0aGlzLnN0b3BfbW92ZSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICB0aGlzLnN0b3BfbW92ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZW1lbnRfZGlyZWN0aW9uID0gXCJjX3J1bl9sXCI7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pbV9zZWxlY3QoKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLm5vZGUueSA+PSAyOTAgJiYgdGhpcy5zdG9wX21vdmUgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgdGhpcy5zdG9wX21vdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVtZW50X2RpcmVjdGlvbiA9IFwiel9ydW5cIjtcclxuICAgICAgICAgICAgdGhpcy5hbmltX3NlbGVjdCgpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMubm9kZS55IDw9IC01MjkgJiYgdGhpcy5zdG9wX21vdmUgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgdGhpcy5zdG9wX21vdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVtZW50X2RpcmVjdGlvbiA9IFwiYl9ydW5cIjtcclxuICAgICAgICAgICAgdGhpcy5hbmltX3NlbGVjdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/lh6Dnp43kuI3lkIznmoTnp7vliqjnrZbnlaVcclxuICAgICAgICBzd2l0Y2ggKHRoaXMubW92ZW1lbnRfZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ6X2lkbGVcIjpcclxuICAgICAgICAgICAgICAgIHMgPSAwO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ6X3J1blwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnkgLT0gcztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYl9pZGxlXCI6XHJcbiAgICAgICAgICAgICAgICBzID0gMDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYl9ydW5cIjpcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS55ICs9IHM7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImNfaWRsZVwiOlxyXG4gICAgICAgICAgICAgICAgcyA9IDA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImNfcnVuX2xcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS54IC09IHM7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImNfcnVuX3JcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS54ICs9IHM7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9O1xyXG5cclxuICAgIH0sXHJcbiAgICBvbkNvbGxpc2lvblN0YXk6IGZ1bmN0aW9uIChvdGhlciwgc2VsZikge1xyXG4gICAgICAgIC8v56Kw5pKe5Lqn55Sf5LqG5Y676LCD55So6K+l5Ye95pWwXHJcbiAgICAgICAgaWYgKHNlbGYubm9kZS55ID49IG90aGVyLm5vZGUueSkge1xyXG4gICAgICAgICAgICBvdGhlci5ub2RlLnpJbmRleCA9IDE7XHJcbiAgICAgICAgICAgIHNlbGYubm9kZS56SW5kZXggPSAwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG90aGVyLm5vZGUuekluZGV4ID0gMDtcclxuICAgICAgICAgICAgc2VsZi5ub2RlLnpJbmRleCA9IDE7XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvL+iHquWKqOmUgOavgVxyXG4gICAgLy8gYXV0b19kZXN0cm95KCkge1xyXG4gICAgLy8gICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vICAgICAgICAgdmFyIG5vd190aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAvLyAgICAgICAgIGlmICgobm93X3RpbWUgLSB1c2VyX2RhdGEudXNlcl9kYXRhLnBldFt0aGlzLnBldF9pbmRleF0uY3JlYXRlX3RpbWUpIC8gMTAwMCA+PSBjb25maWcucGV0W3RoaXMucGV0X2luZGV4XS5zdGF5X3RpbWUpIHtcclxuICAgIC8vICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEucGV0W3RoaXMucGV0X2luZGV4XS5oYXZlID0gMDtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfc2NlbmVfanMubm9kZSxcInBldF9sZWF2ZVwiKTtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XHJcbiAgICAvLyAgICAgICAgIH07XHJcbiAgICAvLyAgICAgfTtcclxuICAgIC8vICAgICB0aGlzLnNjaGVkdWxlKGNhbGxiYWNrLCAxKVxyXG4gICAgLy8gfSxcclxuICAgIC8v5Lqn5Ye65pS255uKXHJcbiAgICBjcmVhdGVfcHJvZml0KCkge1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5ub2RlLm5hbWUpIHtcclxuICAgICAgICAgICAgY2FzZSBcInJhYmJpdFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5wZXRfaW5kZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgdmFyIHByb2R1Y2VfZXhfdGltZSA9IGNvbmZpZy5wZXRbdGhpcy5wZXRfaW5kZXhdLnByb2R1Y2VfZXhfdGltZTtcclxuICAgICAgICAgICAgICAgIHZhciBwcm9kdWNlX2V4ID0gY29uZmlnLnBldFt0aGlzLnBldF9pbmRleF0ucHJvZHVjZV9leDtcclxuICAgICAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcHJvZHVjZV9leCA9IGNvbmZpZy5wZXRbdGhpcy5wZXRfaW5kZXhdLnByb2R1Y2VfZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9kdWNlX2V4OyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9leF9lZmZlY3QodGhpcy5ub2RlLCBpKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLnBldFt0aGlzLnBldF9pbmRleF0uaGF2ZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcy5hZGRfZXgocHJvZHVjZV9leCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlKGNhbGxiYWNrLCBwcm9kdWNlX2V4X3RpbWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJyYWJiaXQyXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBldF9pbmRleCA9IDE7XHJcbiAgICAgICAgICAgICAgICB2YXIgcHJvZHVjZV9leF90aW1lID0gY29uZmlnLnBldFt0aGlzLnBldF9pbmRleF0ucHJvZHVjZV9leF90aW1lO1xyXG4gICAgICAgICAgICAgICAgdmFyIHByb2R1Y2VfZXggPSBjb25maWcucGV0W3RoaXMucGV0X2luZGV4XS5wcm9kdWNlX2V4O1xyXG4gICAgICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwcm9kdWNlX2V4ID0gY29uZmlnLnBldFt0aGlzLnBldF9pbmRleF0ucHJvZHVjZV9leDtcclxuICAgICAgICAgICAgICAgICAgICAvLyBmb3IgKHZhciBpID0gMDsgaSA8IHByb2R1Y2VfZXg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX2V4X2VmZmVjdCh0aGlzLm5vZGUsIGkpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIH07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEucGV0W3RoaXMucGV0X2luZGV4XS5oYXZlID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLmFkZF9leChwcm9kdWNlX2V4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJwZXQgXCIgKyB0aGlzLnBldF9pbmRleCArIFwiIHByb2R1Y2VfZXg6IFwiICsgcHJvZHVjZV9leCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlKGNhbGxiYWNrLCBwcm9kdWNlX2V4X3RpbWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ4aWFvYmFcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMucGV0X2luZGV4ID0gMjsgXHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmF1dG9fZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHByb2R1Y2VfZXhfdGltZSA9IGNvbmZpZy5wZXRbdGhpcy5wZXRfaW5kZXhdLnByb2R1Y2VfZXhfdGltZTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgcHJvZHVjZV9leCA9IGNvbmZpZy5wZXRbdGhpcy5wZXRfaW5kZXhdLnByb2R1Y2VfZXg7Ly8gbOG7l2kgTmFOXHJcbiAgICAgICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdmFyIHByb2R1Y2VfZXggPSBjb25maWcucGV0W3RoaXMucGV0X2luZGV4XS5wcm9kdWNlX2V4O1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvZHVjZV9leDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfZXhfZWZmZWN0KHRoaXMubm9kZSwgaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gfTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbdGhpcy5wZXRfaW5kZXhdLmhhdmUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMuYWRkX2V4KHByb2R1Y2VfZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInBldCBcIiArIHRoaXMucGV0X2luZGV4ICsgXCIgcHJvZHVjZV9leDogXCIgKyBjb25maWcucGV0W3RoaXMucGV0X2luZGV4XS5wcm9kdWNlX2V4KTtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUoY2FsbGJhY2ssIHByb2R1Y2VfZXhfdGltZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInhpYW9xaVwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5wZXRfaW5kZXggPSAzO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5hdXRvX2Rlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIHZhciBwcm9kdWNlX2V4X3RpbWUgPSBjb25maWcucGV0W3RoaXMucGV0X2luZGV4XS5wcm9kdWNlX2V4X3RpbWU7XHJcbiAgICAgICAgICAgICAgICB2YXIgcHJvZHVjZV9leCA9IGNvbmZpZy5wZXRbdGhpcy5wZXRfaW5kZXhdLnByb2R1Y2VfZXg7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByb2R1Y2VfZXggPSBjb25maWcucGV0W3RoaXMucGV0X2luZGV4XS5wcm9kdWNlX2V4O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLnBldFt0aGlzLnBldF9pbmRleF0uaGF2ZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcy5hZGRfZXgocHJvZHVjZV9leCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwicGV0IFwiICsgdGhpcy5wZXRfaW5kZXggKyBcIiBwcm9kdWNlX2V4OiBcIiArIHByb2R1Y2VfZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZShjYWxsYmFjaywgcHJvZHVjZV9leF90aW1lKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgaW5pX25vZGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgcmFuZG9tWCA9IChNYXRoLnJhbmRvbSgpID4gMC41ID8gMSA6IC0xKSAqIDEwMDtcclxuICAgICAgICB2YXIgcmFuZG9tWSA9IChNYXRoLnJhbmRvbSgpID4gMC41ID8gMSA6IC0xKSAqIDEwMDtcclxuICAgICAgICB0aGlzLm5vZGUueCA9IHJhbmRvbVg7XHJcbiAgICAgICAgdGhpcy5ub2RlLnkgPSByYW5kb21ZXHJcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9zY2VuZVwiKTtcclxuICAgICAgICB0aGlzLmFsbF9kaXJlY3Rpb24gPSBbXCJ6X2lkbGVcIiwgXCJ6X3J1blwiLCBcImJfaWRsZVwiLCBcImJfcnVuXCIsIFwiY19pZGxlXCIsIFwiY19ydW5fbFwiLCBcImNfcnVuX3JcIl07XHJcbiAgICAgICAgdGhpcy5tb3ZlbWVudF9kaXJlY3Rpb24gPSBcInpfaWRsZVwiO1xyXG4gICAgICAgIC8v5bCP5Lq655qE56e75Yqo6YCf5bqmXHJcbiAgICAgICAgdGhpcy5tb3ZlX3NwZWVkID0gMzA7XHJcbiAgICAgICAgLy/lgZzmraLnp7vliqjvvIzovrnnvJjml7bop6blj5FcclxuICAgICAgICB0aGlzLnN0b3BfbW92ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlX3Byb2ZpdCgpO1xyXG4gICAgfSxcclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLmluaV9ub2RlKCk7XHJcbiAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9ydWxlc1wiKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VfbW92ZW1lbnRfZGlyZWN0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5hbmltX3NlbGVjdCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGUoZHQpIHtcclxuICAgICAgICB0aGlzLmFpX21vdmUoZHQpO1xyXG4gICAgfSxcclxufSk7XHJcbiJdfQ==