"use strict";
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