
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxhaVxccGV0X2FpLmpzIl0sIm5hbWVzIjpbImNvbmZpZyIsInJlcXVpcmUiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImJvZHlfbm9kZSIsIk5vZGUiLCJjaGFuZ2VfbW92ZW1lbnRfZGlyZWN0aW9uIiwiY2FsbGJhY2siLCJzdG9wX21vdmUiLCJudW0iLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJhbGxfZGlyZWN0aW9uIiwibGVuZ3RoIiwibW92ZW1lbnRfZGlyZWN0aW9uIiwiYW5pbV9zZWxlY3QiLCJzY2hlZHVsZSIsImFuaW0iLCJnZXRDb21wb25lbnQiLCJBbmltYXRpb24iLCJhbmltX2NsaXBzIiwiZ2V0Q2xpcHMiLCJwbGF5IiwibmFtZSIsIm5vZGUiLCJzY2FsZVgiLCJhaV9tb3ZlIiwiZHQiLCJzIiwibW92ZV9zcGVlZCIsIngiLCJ5Iiwib25Db2xsaXNpb25TdGF5Iiwib3RoZXIiLCJzZWxmIiwiekluZGV4IiwiY3JlYXRlX3Byb2ZpdCIsInBldF9pbmRleCIsInByb2R1Y2VfZXhfdGltZSIsInBldCIsInByb2R1Y2VfZXgiLCJ1c2VyX2RhdGEiLCJoYXZlIiwiZ2FtZV9ydWxlc19qcyIsImFkZF9leCIsImluaV9ub2RlIiwicmFuZG9tWCIsInJhbmRvbVkiLCJnYW1lX3NjZW5lX2pzIiwiZmluZCIsIm9uTG9hZCIsInN0YXJ0IiwidXBkYXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUNBOzs7O0FBREEsSUFBSUEsTUFBTSxHQUFHQyxPQUFPLENBQUMsUUFBRCxDQUFwQjs7QUFFQUMsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFNBQVMsRUFBRUosRUFBRSxDQUFDSztBQUROLEdBSFA7QUFPTDtBQUNBO0FBQ0FDLEVBQUFBLHlCQUF5QixFQUFFLHFDQUFZO0FBQ25D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LFlBQW5CLENBQWdDLFlBQWhDLENBQXJCO0FBQ0EsU0FBS04sYUFBTCxHQUFxQixDQUFDLFFBQUQsRUFBVyxPQUFYLEVBQW9CLFFBQXBCLEVBQThCLE9BQTlCLEVBQXVDLFFBQXZDLEVBQWlELFNBQWpELEVBQTRELFNBQTVELENBQXJCO0FBQ0EsU0FBS0Usa0JBQUwsR0FBMEIsUUFBMUIsQ0FQa0IsQ0FRbEI7O0FBQ0EsU0FBS2UsVUFBTCxHQUFrQixFQUFsQixDQVRrQixDQVVsQjs7QUFDQSxTQUFLdEIsU0FBTCxHQUFpQixLQUFqQjtBQUNBLFNBQUs2QixhQUFMO0FBQ0gsR0FqTkk7QUFrTkxjLEVBQUFBLE1BbE5LLG9CQWtOSTtBQUNMLFNBQUtMLFFBQUw7QUFDQSxTQUFLRixhQUFMLEdBQXFCNUMsRUFBRSxDQUFDa0QsSUFBSCxDQUFRLFNBQVIsRUFBbUIvQixZQUFuQixDQUFnQyxZQUFoQyxDQUFyQjtBQUNILEdBck5JO0FBdU5MaUMsRUFBQUEsS0F2TkssbUJBdU5HO0FBQ0osU0FBSzlDLHlCQUFMO0FBQ0EsU0FBS1UsV0FBTDtBQUNILEdBMU5JO0FBNE5McUMsRUFBQUEsTUE1Tkssa0JBNE5FekIsRUE1TkYsRUE0Tk07QUFDUCxTQUFLRCxPQUFMLENBQWFDLEVBQWI7QUFDSDtBQTlOSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgY29uZmlnID0gcmVxdWlyZShcImNvbmZpZ1wiKTtcbmltcG9ydCB1c2VyX2RhdGEgZnJvbSBcInVzZXJfZGF0YVwiO1xuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgYm9keV9ub2RlOiBjYy5Ob2RlLFxuICAgIH0sXG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcbiAgICAvLyDmr4/pmpTlh6Dnp5LmlLnlj5jnp7vliqjmlrnlkJFcbiAgICBjaGFuZ2VfbW92ZW1lbnRfZGlyZWN0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcF9tb3ZlID0gZmFsc2U7XG4gICAgICAgICAgICB2YXIgbnVtID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5hbGxfZGlyZWN0aW9uLmxlbmd0aCAtIDEpICsgMTtcbiAgICAgICAgICAgIGlmIChudW0gPCAwKSB7XG4gICAgICAgICAgICAgICAgbnVtID0gMDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLm1vdmVtZW50X2RpcmVjdGlvbiA9IHRoaXMuYWxsX2RpcmVjdGlvbltudW1dO1xuICAgICAgICAgICAgdGhpcy5hbmltX3NlbGVjdCgpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNjaGVkdWxlKGNhbGxiYWNrLCBNYXRoLnJhbmRvbSgpICogMyArIDIpO1xuICAgIH0sXG4gICAgLy9hbmltIHNlbGVjdFxuICAgIGFuaW1fc2VsZWN0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhbmltID0gdGhpcy5ib2R5X25vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XG4gICAgICAgIHZhciBhbmltX2NsaXBzID0gYW5pbS5nZXRDbGlwcygpOy8v6I635Y+W5Yqo55S75Ymq6L6RXG4gICAgICAgIHN3aXRjaCAodGhpcy5tb3ZlbWVudF9kaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIGNhc2UgXCJ6X2lkbGVcIjpcbiAgICAgICAgICAgICAgICBhbmltLnBsYXkoYW5pbV9jbGlwc1swXS5uYW1lKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJ6X3J1blwiOlxuICAgICAgICAgICAgICAgIGFuaW0ucGxheShhbmltX2NsaXBzWzFdLm5hbWUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImJfaWRsZVwiOlxuICAgICAgICAgICAgICAgIGFuaW0ucGxheShhbmltX2NsaXBzWzJdLm5hbWUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImJfcnVuXCI6XG4gICAgICAgICAgICAgICAgYW5pbS5wbGF5KGFuaW1fY2xpcHNbM10ubmFtZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiY19pZGxlXCI6XG4gICAgICAgICAgICAgICAgYW5pbS5wbGF5KGFuaW1fY2xpcHNbNF0ubmFtZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiY19ydW5fbFwiOlxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zY2FsZVggPSAxO1xuICAgICAgICAgICAgICAgIGFuaW0ucGxheShhbmltX2NsaXBzWzVdLm5hbWUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImNfcnVuX3JcIjpcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2NhbGVYID0gLTE7XG4gICAgICAgICAgICAgICAgYW5pbS5wbGF5KGFuaW1fY2xpcHNbNV0ubmFtZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvL+maj+acuuafkOS4quaWueWQkeenu+WKqFxuICAgIGFpX21vdmU6IGZ1bmN0aW9uIChkdCkgeyAvL2R05ri45oiP5pe26Ze0XG5cbiAgICAgICAgLy/lvpfliLDmr4/luKfnmoTpgJ/luqZcbiAgICAgICAgdmFyIHMgPSB0aGlzLm1vdmVfc3BlZWQgKiBkdDtcbiAgICAgICAgLy9cbiAgICAgICAgaWYgKHRoaXMubm9kZS54IDw9IC02NSAmJiB0aGlzLnN0b3BfbW92ZSA9PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhpcy5zdG9wX21vdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5tb3ZlbWVudF9kaXJlY3Rpb24gPSBcImNfcnVuX3JcIjtcbiAgICAgICAgICAgIHRoaXMuYW5pbV9zZWxlY3QoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5ub2RlLnggPj0gNjUgJiYgdGhpcy5zdG9wX21vdmUgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcF9tb3ZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMubW92ZW1lbnRfZGlyZWN0aW9uID0gXCJjX3J1bl9sXCI7XG4gICAgICAgICAgICB0aGlzLmFuaW1fc2VsZWN0KCk7XG5cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5ub2RlLnkgPj0gMjkwICYmIHRoaXMuc3RvcF9tb3ZlID09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aGlzLnN0b3BfbW92ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm1vdmVtZW50X2RpcmVjdGlvbiA9IFwiel9ydW5cIjtcbiAgICAgICAgICAgIHRoaXMuYW5pbV9zZWxlY3QoKTtcblxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm5vZGUueSA8PSAtNTI5ICYmIHRoaXMuc3RvcF9tb3ZlID09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aGlzLnN0b3BfbW92ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm1vdmVtZW50X2RpcmVjdGlvbiA9IFwiYl9ydW5cIjtcbiAgICAgICAgICAgIHRoaXMuYW5pbV9zZWxlY3QoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8v5Yeg56eN5LiN5ZCM55qE56e75Yqo562W55WlXG4gICAgICAgIHN3aXRjaCAodGhpcy5tb3ZlbWVudF9kaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIGNhc2UgXCJ6X2lkbGVcIjpcbiAgICAgICAgICAgICAgICBzID0gMDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJ6X3J1blwiOlxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS55IC09IHM7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiYl9pZGxlXCI6XG4gICAgICAgICAgICAgICAgcyA9IDA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiYl9ydW5cIjpcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUueSArPSBzO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImNfaWRsZVwiOlxuICAgICAgICAgICAgICAgIHMgPSAwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImNfcnVuX2xcIjpcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUueCAtPSBzO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImNfcnVuX3JcIjpcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUueCArPSBzO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9O1xuXG4gICAgfSxcbiAgICBvbkNvbGxpc2lvblN0YXk6IGZ1bmN0aW9uIChvdGhlciwgc2VsZikge1xuICAgICAgICAvL+eisOaSnuS6p+eUn+S6huWOu+iwg+eUqOivpeWHveaVsFxuICAgICAgICBpZiAoc2VsZi5ub2RlLnkgPj0gb3RoZXIubm9kZS55KSB7XG4gICAgICAgICAgICBvdGhlci5ub2RlLnpJbmRleCA9IDE7XG4gICAgICAgICAgICBzZWxmLm5vZGUuekluZGV4ID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG90aGVyLm5vZGUuekluZGV4ID0gMDtcbiAgICAgICAgICAgIHNlbGYubm9kZS56SW5kZXggPSAxO1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgLy/oh6rliqjplIDmr4FcbiAgICAvLyBhdXRvX2Rlc3Ryb3koKSB7XG4gICAgLy8gICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAvLyAgICAgICAgIHZhciBub3dfdGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIC8vICAgICAgICAgaWYgKChub3dfdGltZSAtIHVzZXJfZGF0YS51c2VyX2RhdGEucGV0W3RoaXMucGV0X2luZGV4XS5jcmVhdGVfdGltZSkgLyAxMDAwID49IGNvbmZpZy5wZXRbdGhpcy5wZXRfaW5kZXhdLnN0YXlfdGltZSkge1xuICAgIC8vICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEucGV0W3RoaXMucGV0X2luZGV4XS5oYXZlID0gMDtcbiAgICAvLyAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsXCJwZXRfbGVhdmVcIik7XG4gICAgLy8gICAgICAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcbiAgICAvLyAgICAgICAgIH07XG4gICAgLy8gICAgIH07XG4gICAgLy8gICAgIHRoaXMuc2NoZWR1bGUoY2FsbGJhY2ssIDEpXG4gICAgLy8gfSxcbiAgICAvL+S6p+WHuuaUtuebilxuICAgIGNyZWF0ZV9wcm9maXQoKSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5ub2RlLm5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJyYWJiaXRcIjpcbiAgICAgICAgICAgICAgICB0aGlzLnBldF9pbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgdmFyIHByb2R1Y2VfZXhfdGltZSA9IGNvbmZpZy5wZXRbdGhpcy5wZXRfaW5kZXhdLnByb2R1Y2VfZXhfdGltZTtcbiAgICAgICAgICAgICAgICB2YXIgcHJvZHVjZV9leCA9IGNvbmZpZy5wZXRbdGhpcy5wZXRfaW5kZXhdLnByb2R1Y2VfZXg7XG4gICAgICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcHJvZHVjZV9leCA9IGNvbmZpZy5wZXRbdGhpcy5wZXRfaW5kZXhdLnByb2R1Y2VfZXg7XG4gICAgICAgICAgICAgICAgICAgIC8vIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvZHVjZV9leDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX2V4X2VmZmVjdCh0aGlzLm5vZGUsIGkpO1xuICAgICAgICAgICAgICAgICAgICAvLyB9O1xuICAgICAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbdGhpcy5wZXRfaW5kZXhdLmhhdmUgPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLmFkZF9leChwcm9kdWNlX2V4KTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUoY2FsbGJhY2ssIHByb2R1Y2VfZXhfdGltZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwicmFiYml0MlwiOlxuICAgICAgICAgICAgICAgIHRoaXMucGV0X2luZGV4ID0gMTtcbiAgICAgICAgICAgICAgICB2YXIgcHJvZHVjZV9leF90aW1lID0gY29uZmlnLnBldFt0aGlzLnBldF9pbmRleF0ucHJvZHVjZV9leF90aW1lO1xuICAgICAgICAgICAgICAgIHZhciBwcm9kdWNlX2V4ID0gY29uZmlnLnBldFt0aGlzLnBldF9pbmRleF0ucHJvZHVjZV9leDtcbiAgICAgICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwcm9kdWNlX2V4ID0gY29uZmlnLnBldFt0aGlzLnBldF9pbmRleF0ucHJvZHVjZV9leDtcbiAgICAgICAgICAgICAgICAgICAgLy8gZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9kdWNlX2V4OyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfZXhfZWZmZWN0KHRoaXMubm9kZSwgaSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIH07XG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLnBldFt0aGlzLnBldF9pbmRleF0uaGF2ZSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMuYWRkX2V4KHByb2R1Y2VfZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJwZXQgXCIgKyB0aGlzLnBldF9pbmRleCArIFwiIHByb2R1Y2VfZXg6IFwiICsgcHJvZHVjZV9leCk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlKGNhbGxiYWNrLCBwcm9kdWNlX2V4X3RpbWUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInhpYW9iYVwiOlxuICAgICAgICAgICAgICAgIHRoaXMucGV0X2luZGV4ID0gMjsgXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5hdXRvX2Rlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICB2YXIgcHJvZHVjZV9leF90aW1lID0gY29uZmlnLnBldFt0aGlzLnBldF9pbmRleF0ucHJvZHVjZV9leF90aW1lO1xuXG4gICAgICAgICAgICAgICAgdmFyIHByb2R1Y2VfZXggPSBjb25maWcucGV0W3RoaXMucGV0X2luZGV4XS5wcm9kdWNlX2V4Oy8vIGzhu5dpIE5hTlxuICAgICAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdmFyIHByb2R1Y2VfZXggPSBjb25maWcucGV0W3RoaXMucGV0X2luZGV4XS5wcm9kdWNlX2V4O1xuICAgICAgICAgICAgICAgICAgICAvLyBmb3IgKHZhciBpID0gMDsgaSA8IHByb2R1Y2VfZXg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9leF9lZmZlY3QodGhpcy5ub2RlLCBpKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gfTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEucGV0W3RoaXMucGV0X2luZGV4XS5oYXZlID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcy5hZGRfZXgocHJvZHVjZV9leCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInBldCBcIiArIHRoaXMucGV0X2luZGV4ICsgXCIgcHJvZHVjZV9leDogXCIgKyBjb25maWcucGV0W3RoaXMucGV0X2luZGV4XS5wcm9kdWNlX2V4KTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUoY2FsbGJhY2ssIHByb2R1Y2VfZXhfdGltZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwieGlhb3FpXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5wZXRfaW5kZXggPSAzO1xuICAgICAgICAgICAgICAgIC8vIHRoaXMuYXV0b19kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgdmFyIHByb2R1Y2VfZXhfdGltZSA9IGNvbmZpZy5wZXRbdGhpcy5wZXRfaW5kZXhdLnByb2R1Y2VfZXhfdGltZTtcbiAgICAgICAgICAgICAgICB2YXIgcHJvZHVjZV9leCA9IGNvbmZpZy5wZXRbdGhpcy5wZXRfaW5kZXhdLnByb2R1Y2VfZXg7XG4gICAgICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcHJvZHVjZV9leCA9IGNvbmZpZy5wZXRbdGhpcy5wZXRfaW5kZXhdLnByb2R1Y2VfZXg7XG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLnBldFt0aGlzLnBldF9pbmRleF0uaGF2ZSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMuYWRkX2V4KHByb2R1Y2VfZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJwZXQgXCIgKyB0aGlzLnBldF9pbmRleCArIFwiIHByb2R1Y2VfZXg6IFwiICsgcHJvZHVjZV9leCk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlKGNhbGxiYWNrLCBwcm9kdWNlX2V4X3RpbWUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgaW5pX25vZGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJhbmRvbVggPSAoTWF0aC5yYW5kb20oKSA+IDAuNSA/IDEgOiAtMSkgKiAxMDA7XG4gICAgICAgIHZhciByYW5kb21ZID0gKE1hdGgucmFuZG9tKCkgPiAwLjUgPyAxIDogLTEpICogMTAwO1xuICAgICAgICB0aGlzLm5vZGUueCA9IHJhbmRvbVg7XG4gICAgICAgIHRoaXMubm9kZS55ID0gcmFuZG9tWVxuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJnYW1lX3NjZW5lXCIpO1xuICAgICAgICB0aGlzLmFsbF9kaXJlY3Rpb24gPSBbXCJ6X2lkbGVcIiwgXCJ6X3J1blwiLCBcImJfaWRsZVwiLCBcImJfcnVuXCIsIFwiY19pZGxlXCIsIFwiY19ydW5fbFwiLCBcImNfcnVuX3JcIl07XG4gICAgICAgIHRoaXMubW92ZW1lbnRfZGlyZWN0aW9uID0gXCJ6X2lkbGVcIjtcbiAgICAgICAgLy/lsI/kurrnmoTnp7vliqjpgJ/luqZcbiAgICAgICAgdGhpcy5tb3ZlX3NwZWVkID0gMzA7XG4gICAgICAgIC8v5YGc5q2i56e75Yqo77yM6L6557yY5pe26Kem5Y+RXG4gICAgICAgIHRoaXMuc3RvcF9tb3ZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY3JlYXRlX3Byb2ZpdCgpO1xuICAgIH0sXG4gICAgb25Mb2FkKCkge1xuICAgICAgICB0aGlzLmluaV9ub2RlKCk7XG4gICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfcnVsZXNcIik7XG4gICAgfSxcblxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLmNoYW5nZV9tb3ZlbWVudF9kaXJlY3Rpb24oKTtcbiAgICAgICAgdGhpcy5hbmltX3NlbGVjdCgpO1xuICAgIH0sXG5cbiAgICB1cGRhdGUoZHQpIHtcbiAgICAgICAgdGhpcy5haV9tb3ZlKGR0KTtcbiAgICB9LFxufSk7XG4iXX0=