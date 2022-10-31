
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