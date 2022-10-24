
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

    cc.log("this.movement_direction: ", this.movement_direction);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxhaVxccGxheWVyX3JvbGUuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJwbGF5ZXJfbm9kZSIsIk5vZGUiLCJnaWZ0X25vZGUiLCJnaWZ0X2ZyYW1lX2FyciIsIlNwcml0ZUZyYW1lIiwiY2hhbmdlX21vdmVtZW50X2RpcmVjdGlvbiIsImNhbGxiYWNrIiwic3RvcF9tb3ZlIiwibnVtIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiYWxsX2RpcmVjdGlvbiIsImxlbmd0aCIsIm1vdmVtZW50X2RpcmVjdGlvbiIsImFuaW1fc2VsZWN0Iiwic2NoZWR1bGUiLCJhbmltIiwiZ2V0Q29tcG9uZW50IiwiQW5pbWF0aW9uIiwiYW5pbV9jbGlwcyIsImdldENsaXBzIiwibG9nIiwicGxheSIsIm5hbWUiLCJub2RlIiwic2NhbGVYIiwiYWlfbW92ZSIsImR0IiwicyIsIm1vdmVfc3BlZWQiLCJ4IiwieSIsIm9uX2dpZnRfYnV0dG9uX2NsaWNrIiwic291bmRfY29udHJvbCIsInBsYXlfc291bmRfZWZmZWN0IiwicmFuZG9tX2V4IiwiZ2lmdF90eXBlIiwiaSIsImdhbWVfc2NlbmVfanMiLCJjcmVhdGVfZXhfZWZmZWN0IiwiYWN0aXZlIiwiY3JlYXRlX2dpZnRfdWkiLCJpbmlfbm9kZSIsImZpbmQiLCJjcmVhdGVfZ2lmdCIsInJhbmRvbV9udW0iLCJTcHJpdGUiLCJzcHJpdGVGcmFtZSIsImhpZGVfZ2lmdCIsInNjaGVkdWxlT25jZSIsIm9uTG9hZCIsInN0YXJ0IiwidXBkYXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsV0FBVyxFQUFFSixFQUFFLENBQUNLLElBRFI7QUFFUkMsSUFBQUEsU0FBUyxFQUFFTixFQUFF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QyxFQUFBQSxTQXBLSyx1QkFvS087QUFDUjtBQUNBLFFBQUkzQyxRQUFRLEdBQUcsU0FBWEEsUUFBVyxHQUFZO0FBQ3ZCLFdBQUtKLFNBQUwsQ0FBZXVDLE1BQWYsR0FBd0IsS0FBeEI7QUFDQSxXQUFLSixTQUFMLEdBQWlCLElBQWpCO0FBQ0gsS0FIRDs7QUFJQSxTQUFLYSxZQUFMLENBQWtCNUMsUUFBbEIsRUFBNEIsRUFBNUI7QUFDSCxHQTNLSTtBQTRLTDZDLEVBQUFBLE1BNUtLLG9CQTRLSTtBQUNMLFNBQUtSLFFBQUw7QUFDSCxHQTlLSTtBQWdMTFMsRUFBQUEsS0FoTEssbUJBZ0xHO0FBQ0osU0FBSy9DLHlCQUFMO0FBQ0EsU0FBS1UsV0FBTDtBQUNILEdBbkxJO0FBcUxMc0MsRUFBQUEsTUFyTEssa0JBcUxFekIsRUFyTEYsRUFxTE07QUFDUCxTQUFLRCxPQUFMLENBQWFDLEVBQWI7QUFDSDtBQXZMSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBwbGF5ZXJfbm9kZTogY2MuTm9kZSxcbiAgICAgICAgZ2lmdF9ub2RlOiBjYy5Ob2RlLFxuICAgICAgICBnaWZ0X2ZyYW1lX2FycjogW2NjLlNwcml0ZUZyYW1lXSxcbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG4gICAgLy8g5q+P6ZqU5Yeg56eS5pS55Y+Y56e75Yqo5pa55ZCRXG4gICAgY2hhbmdlX21vdmVtZW50X2RpcmVjdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnN0b3BfbW92ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdmFyIG51bSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuYWxsX2RpcmVjdGlvbi5sZW5ndGggLSAxKSArIDE7XG4gICAgICAgICAgICBpZiAobnVtIDwgMCkge1xuICAgICAgICAgICAgICAgIG51bSA9IDA7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5tb3ZlbWVudF9kaXJlY3Rpb24gPSB0aGlzLmFsbF9kaXJlY3Rpb25bbnVtXTtcbiAgICAgICAgICAgIHRoaXMuYW5pbV9zZWxlY3QoKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZShjYWxsYmFjaywgTWF0aC5yYW5kb20oKSAqIDMgKyAyKTtcbiAgICB9LFxuICAgIC8vYW5pbSBzZWxlY3RcbiAgICBhbmltX3NlbGVjdDogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYW5pbSA9IHRoaXMucGxheWVyX25vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XG4gICAgICAgIHZhciBhbmltX2NsaXBzID0gYW5pbS5nZXRDbGlwcygpOy8v6I635Y+W5Yqo55S75Ymq6L6RXG4gICAgICAgIGNjLmxvZyhcInRoaXMubW92ZW1lbnRfZGlyZWN0aW9uOiBcIiwgdGhpcy5tb3ZlbWVudF9kaXJlY3Rpb24pO1xuICAgICAgICBzd2l0Y2ggKHRoaXMubW92ZW1lbnRfZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICBjYXNlIFwiel9pZGxlXCI6XG4gICAgICAgICAgICAgICAgYW5pbS5wbGF5KGFuaW1fY2xpcHNbMF0ubmFtZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiel9ydW5cIjpcbiAgICAgICAgICAgICAgICBhbmltLnBsYXkoYW5pbV9jbGlwc1sxXS5uYW1lKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJiX2lkbGVcIjpcbiAgICAgICAgICAgICAgICBhbmltLnBsYXkoYW5pbV9jbGlwc1syXS5uYW1lKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJiX3J1blwiOlxuICAgICAgICAgICAgICAgIGFuaW0ucGxheShhbmltX2NsaXBzWzNdLm5hbWUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImNfaWRsZVwiOlxuICAgICAgICAgICAgICAgIGFuaW0ucGxheShhbmltX2NsaXBzWzRdLm5hbWUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImNfcnVuX2xcIjpcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2NhbGVYID0gMTtcbiAgICAgICAgICAgICAgICBhbmltLnBsYXkoYW5pbV9jbGlwc1s1XS5uYW1lKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJjX3J1bl9yXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNjYWxlWCA9IC0xO1xuICAgICAgICAgICAgICAgIGFuaW0ucGxheShhbmltX2NsaXBzWzVdLm5hbWUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgLy/pmo/mnLrmn5DkuKrmlrnlkJHnp7vliqhcbiAgICBhaV9tb3ZlOiBmdW5jdGlvbiAoZHQpIHsgLy9kdOa4uOaIj+aXtumXtFxuXG4gICAgICAgIC8v5b6X5Yiw5q+P5bin55qE6YCf5bqmXG4gICAgICAgIHZhciBzID0gdGhpcy5tb3ZlX3NwZWVkICogZHQ7XG4gICAgICAgIC8vXG4gICAgICAgIGlmICh0aGlzLm5vZGUueCA8PSAtNjUgJiYgdGhpcy5zdG9wX21vdmUgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcF9tb3ZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMubW92ZW1lbnRfZGlyZWN0aW9uID0gXCJjX3J1bl9yXCI7XG4gICAgICAgICAgICB0aGlzLmFuaW1fc2VsZWN0KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMubm9kZS54ID49IDY1ICYmIHRoaXMuc3RvcF9tb3ZlID09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aGlzLnN0b3BfbW92ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm1vdmVtZW50X2RpcmVjdGlvbiA9IFwiY19ydW5fbFwiO1xuICAgICAgICAgICAgdGhpcy5hbmltX3NlbGVjdCgpO1xuXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMubm9kZS55ID49IDI5MCAmJiB0aGlzLnN0b3BfbW92ZSA9PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhpcy5zdG9wX21vdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5tb3ZlbWVudF9kaXJlY3Rpb24gPSBcInpfcnVuXCI7XG4gICAgICAgICAgICB0aGlzLmFuaW1fc2VsZWN0KCk7XG5cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5ub2RlLnkgPD0gLTUyOSAmJiB0aGlzLnN0b3BfbW92ZSA9PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhpcy5zdG9wX21vdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5tb3ZlbWVudF9kaXJlY3Rpb24gPSBcImJfcnVuXCI7XG4gICAgICAgICAgICB0aGlzLmFuaW1fc2VsZWN0KCk7XG4gICAgICAgIH1cblxuICAgICAgICAvL+WHoOenjeS4jeWQjOeahOenu+WKqOetlueVpVxuICAgICAgICBzd2l0Y2ggKHRoaXMubW92ZW1lbnRfZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICBjYXNlIFwiel9pZGxlXCI6XG4gICAgICAgICAgICAgICAgcyA9IDA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiel9ydW5cIjpcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUueSAtPSBzO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImJfaWRsZVwiOlxuICAgICAgICAgICAgICAgIHMgPSAwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImJfcnVuXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnkgKz0gcztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJjX2lkbGVcIjpcbiAgICAgICAgICAgICAgICBzID0gMDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJjX3J1bl9sXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnggLT0gcztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJjX3J1bl9yXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnggKz0gcztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfTtcblxuICAgIH0sXG4gICAgLy/mjInpkq7ooqvngrnlh7tcbiAgICBvbl9naWZ0X2J1dHRvbl9jbGljaygpIHtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xuICAgICAgICB2YXIgcmFuZG9tX2V4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApICsgMTtcbiAgICAgICAgLy/mnIDlpKflgLzkuLo2XG4gICAgICAgIGlmKHJhbmRvbV9leCA+Nil7XG4gICAgICAgICAgICByYW5kb21fZXggPSA2O1xuICAgICAgICB9O1xuICAgICAgICBzd2l0Y2ggKHRoaXMuZ2lmdF90eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFwiZXhcIjpcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJhbmRvbV9leDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfZXhfZWZmZWN0KHRoaXMuZ2lmdF9ub2RlLCBpKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRoaXMuZ2lmdF90eXBlID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLmdpZnRfbm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJhZFwiOlxuICAgICAgICAgICAgICAgIHRoaXMuZ2lmdF90eXBlID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLmdpZnRfbm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX2dpZnRfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgaW5pX25vZGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9zY2VuZVwiKTtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sID0gY2MuZmluZChcInNvdW5kX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwic291bmRfY29udHJvbFwiKTtcbiAgICAgICAgdGhpcy5hbGxfZGlyZWN0aW9uID0gW1wiel9pZGxlXCIsIFwiel9ydW5cIiwgXCJiX2lkbGVcIiwgXCJiX3J1blwiLCBcImNfaWRsZVwiLCBcImNfcnVuX2xcIiwgXCJjX3J1bl9yXCJdO1xuICAgICAgICB0aGlzLm1vdmVtZW50X2RpcmVjdGlvbiA9IFwiel9pZGxlXCI7XG4gICAgICAgIC8v5bCP5Lq655qE56e75Yqo6YCf5bqmXG4gICAgICAgIHRoaXMubW92ZV9zcGVlZCA9IDMwO1xuICAgICAgICB0aGlzLmdpZnRfbm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5naWZ0X3R5cGUgPSBudWxsO1xuICAgICAgICAvL+WBnOatouenu+WKqO+8jOi+uee8mOaXtuinpuWPkVxuICAgICAgICB0aGlzLnN0b3BfbW92ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNyZWF0ZV9naWZ0KCk7XG4gICAgfSxcbiAgICAvL+eUn+aIkOekvOeJqVxuICAgIGNyZWF0ZV9naWZ0KCkge1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcmFuZG9tX251bSA9IE1hdGgucmFuZG9tKCk7XG4gICAgICAgICAgICBpZiAocmFuZG9tX251bSA+IDAuNSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2lmdF90eXBlID0gXCJleFwiO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2lmdF9ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5naWZ0X25vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmdpZnRfZnJhbWVfYXJyWzBdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdpZnRfdHlwZSA9IFwiYWRcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmdpZnRfbm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2lmdF9ub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5naWZ0X2ZyYW1lX2FyclsxXTtcblxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuaGlkZV9naWZ0KCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2NoZWR1bGUoY2FsbGJhY2ssIDMwKTtcbiAgICB9LFxuICAgIC8v6ZqQ6JeP56S854mpXG4gICAgaGlkZV9naWZ0KCkge1xuICAgICAgICAvLzEwc+WQjumakOiXj+ekvOeJqVxuICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmdpZnRfbm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuZ2lmdF90eXBlID0gbnVsbDtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoY2FsbGJhY2ssIDEwKTtcbiAgICB9LFxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5pbmlfbm9kZSgpO1xuICAgIH0sXG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VfbW92ZW1lbnRfZGlyZWN0aW9uKCk7XG4gICAgICAgIHRoaXMuYW5pbV9zZWxlY3QoKTtcbiAgICB9LFxuXG4gICAgdXBkYXRlKGR0KSB7XG4gICAgICAgIHRoaXMuYWlfbW92ZShkdCk7XG4gICAgfSxcbn0pOyJdfQ==