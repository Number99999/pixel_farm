
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
require('./assets/script/AdMob');
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
require('./assets/script/ui/repo_ui');
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
    // bannerUnitId: "",
    showFullUnitId: "",
    videoUnitId: "",
    banner: null,
    showFull: null,
    video: null,
    rewardVideoCallback: null //bannerLoaded: false,

  },
  onLoad: function onLoad() {
    var _this = this;

    if (cc.sys.platform === cc.sys.IPHONE || cc.sys.platform === cc.sys.ANDROID || cc.sys.platform === cc.sys.IPAD) {
      // Enable debug log, this is for testing only, please comment it out before publish.
      tradplus.tradPlusService.setEnableLog(true); // Initialize the SDK.

      tradplus.tradPlusService.initSdk(); // Enable test mode, this is for testing only, please comment it out before publish.

      tradplus.tradPlusService.setNeedTestDevice(true); // Enable debug log, this is for testing only, please comment it out before publish.

      tradplus.tradPlusService.setEnableLog(true);
      this.banner = tradplus.tradPlusService.getBanner(this.bannerUnitId);
      this.showFull = tradplus.tradPlusService.getInterstitial(this.showFullUnitId);
      this.video = tradplus.tradPlusService.getRewardedVideo(this.videoUnitId);
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
        onAdFailed: function onAdFailed(adError) {// Triggered on Ad load failed, adError contains error information.
          // cc.log("onAdFailed: " + adError);
        },
        onAdImpression: function onAdImpression() {// Triggered on Ad shown.
        },
        onAdClosed: function onAdClosed() {
          // Triggered on Ad closed.
          // NOTE: This callback will only triggered on Android.
          _this.video.loadAd();
        },
        onAdPlayFailed: function onAdPlayFailed(adError) {// Triggered on Ad shown, adSourceName is the name of Ad source platform
          // cc.log("onAdPlayFailed: " + adError);
        },
        onOneLayerLoadFailed: function onOneLayerLoadFailed(adSourceName, adError) {// Triggered on Ad load failed, adError contains error information.
          // cc.log("onOneLayerLoadFailed: " + adError);
        },
        onOneLayerLoaded: function onOneLayerLoaded(adSourceName) {// Triggered on Ad loaded, adSourceName is the name of Ad source platform.
        },
        onAdNotReward: function onAdNotReward() {},
        onAdReward: function onAdReward(currencyName, amount) {
          if (_this.rewardVideoCallback != null) {
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
    if (cc.sys.platform === cc.sys.IPHONE || cc.sys.platform === cc.sys.ANDROID || cc.sys.platform === cc.sys.IPAD) {
      if (this.showFull != null && this.video.ready) {
        this.rewardVideoCallback = callback;
        this.video.showAd();
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
    return this.video.ready;
  },
  isHasInterstitial: function isHasInterstitial() {
    return this.showFull.ready;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxBZHNNYW5hZ2VyLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwic2hvd0Z1bGxVbml0SWQiLCJ2aWRlb1VuaXRJZCIsImJhbm5lciIsInNob3dGdWxsIiwidmlkZW8iLCJyZXdhcmRWaWRlb0NhbGxiYWNrIiwib25Mb2FkIiwic3lzIiwicGxhdGZvcm0iLCJJUEhPTkUiLCJBTkRST0lEIiwiSVBBRCIsInRyYWRwbHVzIiwidHJhZFBsdXNTZXJ2aWNlIiwic2V0RW5hYmxlTG9nIiwiaW5pdFNkayIsInNldE5lZWRUZXN0RGV2aWNlIiwiZ2V0QmFubmVyIiwiYmFubmVyVW5pdElkIiwiZ2V0SW50ZXJzdGl0aWFsIiwiZ2V0UmV3YXJkZWRWaWRlbyIsInNldEFkTGlzdGVuZXIiLCJvbkFkTG9hZGVkIiwiYWRTb3VyY2VOYW1lIiwibG9nIiwib25BZENsaWNrZWQiLCJvbkFkTG9hZEZhaWxlZCIsImFkRXJyb3IiLCJvbkFkSW1wcmVzc2lvbiIsIm9uQWRTaG93RmFpbGVkIiwib25BZENsb3NlZCIsIm9uQmFubmVyUmVmcmVzaGVkIiwib25BZEFsbExvYWRlZCIsIm9uQWRGYWlsZWQiLCJsb2FkSW50ZXJzdGl0aWFsIiwib25BZFBsYXlGYWlsZWQiLCJvbk9uZUxheWVyTG9hZEZhaWxlZCIsIm9uT25lTGF5ZXJMb2FkZWQiLCJsb2FkQWQiLCJvbkFkTm90UmV3YXJkIiwib25BZFJld2FyZCIsImN1cnJlbmN5TmFtZSIsImFtb3VudCIsImxvYWRWaWRlbyIsInNob3dSZXdhcmRlZFZpZGVvIiwiY2FsbGJhY2siLCJyZWFkeSIsInNob3dBZCIsInNob3dCYW5uZXIiLCJzaG93SW50ZXJzdGl0aWFsIiwiaXNIYXNWaWRlbyIsImlzSGFzSW50ZXJzdGl0aWFsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBQSxFQUFFLENB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LEVBQUUsQ0FBQ1csR0FBSCxDQUFPQyxRQUFQLEtBQWtCWixFQUFFLENBQUNXLEdBQUgsQ0FBT0UsTUFBekIsSUFBbUNiLEVBQUUsQ0FBQ1csR0FBSCxDQUFPQyxRQUFQLEtBQWtCWixFQUFFLENBQUNXLEdBQUgsQ0FBT0csT0FBNUQsSUFBdUVkLEVBQUUsQ0FBQ1csR0FBSCxDQUFPQyxRQUFQLEtBQWtCWixFQUFFLENBQUNXLEdBQUgsQ0FBT0ksSUFBbkcsRUFDQTtBQUNJLFVBQUcsS0FBS1QsTUFBTCxJQUFlLElBQWxCLEVBQ0E7QUFDSSxhQUFLQSxNQUFMLENBQVlvQyxNQUFaLENBQW1CLFFBQW5CO0FBQ0g7QUFDSjtBQUNKLEdBcE1JO0FBc01MVyxFQUFBQSxnQkF0TUssOEJBc01jO0FBQ2YsUUFBR3JELEVBQUUsQ0FBQ1csR0FBSCxDQUFPQyxRQUFQLEtBQWtCWixFQUFFLENBQUNXLEdBQUgsQ0FBT0UsTUFBekIsSUFBbUNiLEVBQUUsQ0FBQ1csR0FBSCxDQUFPQyxRQUFQLEtBQWtCWixFQUFFLENBQUNXLEdBQUgsQ0FBT0csT0FBNUQsSUFBdUVkLEVBQUUsQ0FBQ1csR0FBSCxDQUFPQyxRQUFQLEtBQWtCWixFQUFFLENBQUNXLEdBQUgsQ0FBT0ksSUFBbkcsRUFDQTtBQUNJLFVBQUcsS0FBS1IsUUFBTCxJQUFpQixJQUFqQixJQUF5QixLQUFLQSxRQUFMLENBQWMyQyxLQUExQyxFQUNBO0FBQ0ksYUFBSzNDLFFBQUwsQ0FBYzRDLE1BQWQ7QUFDSDtBQUNKO0FBQ0osR0E5TUk7QUFnTkxHLEVBQUFBLFVBaE5LLHdCQWdOTztBQUNSLFdBQU8sS0FBSzlDLEtBQUwsQ0FBVzBDLEtBQWxCO0FBQ0gsR0FsTkk7QUFvTkxLLEVBQUFBLGlCQXBOSywrQkFvTmM7QUFDZixXQUFPLEtBQUtoRCxRQUFMLENBQWMyQyxLQUFyQjtBQUNIO0FBdE5JLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICAvLyBiYW5uZXJVbml0SWQ6IFwiXCIsXHJcbiAgICAgICAgc2hvd0Z1bGxVbml0SWQ6IFwiXCIsXHJcbiAgICAgICAgdmlkZW9Vbml0SWQ6IFwiXCIsXHJcbiAgICAgICAgYmFubmVyOiBudWxsLFxyXG4gICAgICAgIHNob3dGdWxsOiBudWxsLFxyXG4gICAgICAgIHZpZGVvOiBudWxsLFxyXG4gICAgICAgIHJld2FyZFZpZGVvQ2FsbGJhY2s6IG51bGwsXHJcbiAgICAgICAgLy9iYW5uZXJMb2FkZWQ6IGZhbHNlLFxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgaWYgKGNjLnN5cy5wbGF0Zm9ybT09PWNjLnN5cy5JUEhPTkUgfHwgY2Muc3lzLnBsYXRmb3JtPT09Y2Muc3lzLkFORFJPSUQgfHwgY2Muc3lzLnBsYXRmb3JtPT09Y2Muc3lzLklQQUQpIHtcclxuICAgICAgICAgICAgLy8gRW5hYmxlIGRlYnVnIGxvZywgdGhpcyBpcyBmb3IgdGVzdGluZyBvbmx5LCBwbGVhc2UgY29tbWVudCBpdCBvdXQgYmVmb3JlIHB1Ymxpc2guXHJcbiAgICAgICAgICAgIHRyYWRwbHVzLnRyYWRQbHVzU2VydmljZS5zZXRFbmFibGVMb2codHJ1ZSk7XHJcbiAgICAgICAgICAgIC8vIEluaXRpYWxpemUgdGhlIFNESy5cclxuICAgICAgICAgICAgdHJhZHBsdXMudHJhZFBsdXNTZXJ2aWNlLmluaXRTZGsoKTtcclxuICAgICAgICAgICAgLy8gRW5hYmxlIHRlc3QgbW9kZSwgdGhpcyBpcyBmb3IgdGVzdGluZyBvbmx5LCBwbGVhc2UgY29tbWVudCBpdCBvdXQgYmVmb3JlIHB1Ymxpc2guXHJcbiAgICAgICAgICAgIHRyYWRwbHVzLnRyYWRQbHVzU2VydmljZS5zZXROZWVkVGVzdERldmljZSh0cnVlKTtcclxuICAgICAgICAgICAgLy8gRW5hYmxlIGRlYnVnIGxvZywgdGhpcyBpcyBmb3IgdGVzdGluZyBvbmx5LCBwbGVhc2UgY29tbWVudCBpdCBvdXQgYmVmb3JlIHB1Ymxpc2guXHJcbiAgICAgICAgICAgIHRyYWRwbHVzLnRyYWRQbHVzU2VydmljZS5zZXRFbmFibGVMb2codHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmJhbm5lciA9IHRyYWRwbHVzLnRyYWRQbHVzU2VydmljZS5nZXRCYW5uZXIodGhpcy5iYW5uZXJVbml0SWQpO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dGdWxsID0gdHJhZHBsdXMudHJhZFBsdXNTZXJ2aWNlLmdldEludGVyc3RpdGlhbCh0aGlzLnNob3dGdWxsVW5pdElkKTtcclxuICAgICAgICAgICAgdGhpcy52aWRlbyA9IHRyYWRwbHVzLnRyYWRQbHVzU2VydmljZS5nZXRSZXdhcmRlZFZpZGVvKHRoaXMudmlkZW9Vbml0SWQpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5iYW5uZXIuc2V0QWRMaXN0ZW5lcih7XHJcbiAgICAgICAgICAgICAgICBvbkFkTG9hZGVkOiAoYWRTb3VyY2VOYW1lKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIGxvYWRlZCwgYWRTb3VyY2VOYW1lIGlzIHRoZSBuYW1lIG9mIEFkIHNvdXJjZSBwbGF0Zm9ybS5cclxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuYmFubmVyTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBjYy5sb2coXCJiYW5uZXIgbG9hZGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBvbkFkQ2xpY2tlZDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRyaWdnZXJlZCBvbiBBZCBjbGlja2VkLlxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBvbkFkTG9hZEZhaWxlZDogKGFkRXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBUcmlnZ2VyZWQgb24gQWQgbG9hZCBmYWlsZWQsIGFkRXJyb3IgY29udGFpbnMgZXJyb3IgaW5mb3JtYXRpb24uXHJcbiAgICAgICAgICAgICAgICAgICAgY2MubG9nKFwiQWRMb2FkRmFpbGVkOiBcIiArIGFkRXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBvbkFkSW1wcmVzc2lvbjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRyaWdnZXJlZCBvbiBBZCBzaG93bi5cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgb25BZFNob3dGYWlsZWQ6IChhZEVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIHNob3cgZmFpbGVkLCBhZEVycm9yIGNvbnRhaW5zIGVycm9yIGluZm9ybWF0aW9uLlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIE5PVEU6IFRoaXMgY2FsbGJhY2sgd2lsbCBvbmx5IHRyaWdnZXJlZCBvbiBBbmRyb2lkLlxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZyhcIkFkU2hvd0ZhaWxlZFwiICsgYWRFcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIG9uQWRDbG9zZWQ6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBUcmlnZ2VyZWQgb24gQWQgY2xvc2VkLlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIE5PVEU6IFRoaXMgY2FsbGJhY2sgd2lsbCBvbmx5IHRyaWdnZXJlZCBvbiBBbmRyb2lkLlxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBvbkJhbm5lclJlZnJlc2hlZDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRyaWdnZXJlZCBvbiBBZCByZWZyZXNoZWQuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTk9URTogVGhpcyBjYWxsYmFjayB3aWxsIG9ubHkgdHJpZ2dlcmVkIG9uIEFuZHJvaWQuXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0Z1bGwuc2V0QWRMaXN0ZW5lcih7XHJcbiAgICAgICAgICAgICAgICBvbkFkQWxsTG9hZGVkOiAoYWRTb3VyY2VOYW1lKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIGxvYWRlZCwgYWRTb3VyY2VOYW1lIGlzIHRoZSBuYW1lIG9mIEFkIHNvdXJjZSBwbGF0Zm9ybS5cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgb25BZExvYWRlZDogKGFkU291cmNlTmFtZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRyaWdnZXJlZCBvbiBBZCBsb2FkZWQsIGFkU291cmNlTmFtZSBpcyB0aGUgbmFtZSBvZiBBZCBzb3VyY2UgcGxhdGZvcm0uXHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIG9uQWRDbGlja2VkOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIGNsaWNrZWQuXHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIG9uQWRGYWlsZWQ6IChhZEVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIGxvYWQgZmFpbGVkLCBhZEVycm9yIGNvbnRhaW5zIGVycm9yIGluZm9ybWF0aW9uLlxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBvbkFkSW1wcmVzc2lvbjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRyaWdnZXJlZCBvbiBBZCBzaG93bi5cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgb25BZFNob3dGYWlsZWQ6IChhZEVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIHNob3cgZmFpbGVkLCBhZEVycm9yIGNvbnRhaW5zIGVycm9yIGluZm9ybWF0aW9uLlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIE5PVEU6IFRoaXMgY2FsbGJhY2sgd2lsbCBvbmx5IHRyaWdnZXJlZCBvbiBBbmRyb2lkLlxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBvbkFkQ2xvc2VkOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIGNsb3NlZC5cclxuICAgICAgICAgICAgICAgICAgICAvLyBOT1RFOiBUaGlzIGNhbGxiYWNrIHdpbGwgb25seSB0cmlnZ2VyZWQgb24gQW5kcm9pZC5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRJbnRlcnN0aXRpYWwoKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgb25BZFBsYXlGYWlsZWQ6IChhZEVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIGxvYWQgZmFpbGVkLCBhZEVycm9yIGNvbnRhaW5zIGVycm9yIGluZm9ybWF0aW9uLlxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBvbk9uZUxheWVyTG9hZEZhaWxlZDogKGFkU291cmNlTmFtZSwgYWRFcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRyaWdnZXJlZCBvbiBBZCBsb2FkIGZhaWxlZCwgYWRFcnJvciBjb250YWlucyBlcnJvciBpbmZvcm1hdGlvbi5cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgb25PbmVMYXllckxvYWRlZDogKGFkU291cmNlTmFtZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRyaWdnZXJlZCBvbiBBZCBsb2FkZWQsIGFkU291cmNlTmFtZSBpcyB0aGUgbmFtZSBvZiBBZCBzb3VyY2UgcGxhdGZvcm0uXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudmlkZW8uc2V0QWRMaXN0ZW5lcih7XHJcbiAgICAgICAgICAgICAgICBvbkFkQWxsTG9hZGVkOiAoYWRTb3VyY2VOYW1lKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIGxvYWRlZCwgYWRTb3VyY2VOYW1lIGlzIHRoZSBuYW1lIG9mIEFkIHNvdXJjZSBwbGF0Zm9ybS5cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgb25BZExvYWRlZDogKGFkU291cmNlTmFtZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRyaWdnZXJlZCBvbiBBZCBsb2FkZWQsIGFkU291cmNlTmFtZSBpcyB0aGUgbmFtZSBvZiBBZCBzb3VyY2UgcGxhdGZvcm0uXHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIG9uQWRDbGlja2VkOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIGNsaWNrZWQuXHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIG9uQWRGYWlsZWQ6IChhZEVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIGxvYWQgZmFpbGVkLCBhZEVycm9yIGNvbnRhaW5zIGVycm9yIGluZm9ybWF0aW9uLlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNjLmxvZyhcIm9uQWRGYWlsZWQ6IFwiICsgYWRFcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIG9uQWRJbXByZXNzaW9uOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIHNob3duLlxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBvbkFkQ2xvc2VkOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlcmVkIG9uIEFkIGNsb3NlZC5cclxuICAgICAgICAgICAgICAgICAgICAvLyBOT1RFOiBUaGlzIGNhbGxiYWNrIHdpbGwgb25seSB0cmlnZ2VyZWQgb24gQW5kcm9pZC5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZGVvLmxvYWRBZCgpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBvbkFkUGxheUZhaWxlZDogKGFkRXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBUcmlnZ2VyZWQgb24gQWQgc2hvd24sIGFkU291cmNlTmFtZSBpcyB0aGUgbmFtZSBvZiBBZCBzb3VyY2UgcGxhdGZvcm1cclxuICAgICAgICAgICAgICAgICAgICAvLyBjYy5sb2coXCJvbkFkUGxheUZhaWxlZDogXCIgKyBhZEVycm9yKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgb25PbmVMYXllckxvYWRGYWlsZWQ6IChhZFNvdXJjZU5hbWUsIGFkRXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBUcmlnZ2VyZWQgb24gQWQgbG9hZCBmYWlsZWQsIGFkRXJyb3IgY29udGFpbnMgZXJyb3IgaW5mb3JtYXRpb24uXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY2MubG9nKFwib25PbmVMYXllckxvYWRGYWlsZWQ6IFwiICsgYWRFcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIG9uT25lTGF5ZXJMb2FkZWQ6IChhZFNvdXJjZU5hbWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBUcmlnZ2VyZWQgb24gQWQgbG9hZGVkLCBhZFNvdXJjZU5hbWUgaXMgdGhlIG5hbWUgb2YgQWQgc291cmNlIHBsYXRmb3JtLlxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBvbkFkTm90UmV3YXJkOiAoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBvbkFkUmV3YXJkOiAoY3VycmVuY3lOYW1lLCBhbW91bnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnJld2FyZFZpZGVvQ2FsbGJhY2sgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmV3YXJkVmlkZW9DYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRWaWRlbygpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRJbnRlcnN0aXRpYWwoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGxvYWRJbnRlcnN0aXRpYWwoKXtcclxuICAgICAgICB0aGlzLnNob3dGdWxsLmxvYWRBZCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBsb2FkVmlkZW8oKXtcclxuICAgICAgICB0aGlzLnZpZGVvLmxvYWRBZCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzaG93UmV3YXJkZWRWaWRlbyhjYWxsYmFjaykge1xyXG4gICAgICAgIGlmKGNjLnN5cy5wbGF0Zm9ybT09PWNjLnN5cy5JUEhPTkUgfHwgY2Muc3lzLnBsYXRmb3JtPT09Y2Muc3lzLkFORFJPSUQgfHwgY2Muc3lzLnBsYXRmb3JtPT09Y2Muc3lzLklQQUQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLnNob3dGdWxsICE9IG51bGwgJiYgdGhpcy52aWRlby5yZWFkeSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXdhcmRWaWRlb0NhbGxiYWNrID0gY2FsbGJhY2s7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZpZGVvLnNob3dBZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzaG93QmFubmVyKCkge1xyXG4gICAgICAgIGlmKGNjLnN5cy5wbGF0Zm9ybT09PWNjLnN5cy5JUEhPTkUgfHwgY2Muc3lzLnBsYXRmb3JtPT09Y2Muc3lzLkFORFJPSUQgfHwgY2Muc3lzLnBsYXRmb3JtPT09Y2Muc3lzLklQQUQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLmJhbm5lciAhPSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhbm5lci5sb2FkQWQoJ2JvdHRvbScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzaG93SW50ZXJzdGl0aWFsKCkge1xyXG4gICAgICAgIGlmKGNjLnN5cy5wbGF0Zm9ybT09PWNjLnN5cy5JUEhPTkUgfHwgY2Muc3lzLnBsYXRmb3JtPT09Y2Muc3lzLkFORFJPSUQgfHwgY2Muc3lzLnBsYXRmb3JtPT09Y2Muc3lzLklQQUQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLnNob3dGdWxsICE9IG51bGwgJiYgdGhpcy5zaG93RnVsbC5yZWFkeSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93RnVsbC5zaG93QWQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgaXNIYXNWaWRlbygpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZpZGVvLnJlYWR5O1xyXG4gICAgfSxcclxuXHJcbiAgICBpc0hhc0ludGVyc3RpdGlhbCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNob3dGdWxsLnJlYWR5O1xyXG4gICAgfSxcclxufSk7XHJcbiJdfQ==
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbWlncmF0aW9uXFx1c2VfcmV2ZXJzZWRfcm90YXRlQnkuanMiXSwibmFtZXMiOlsiY2MiLCJSb3RhdGVCeSIsIl9yZXZlcnNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQUEsRUFBRSxDQUFDQyxRQUFILENBQVlDLFFBQVosR0FBdUIsSUFBdkIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBUaGlzIHNjcmlwdCBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBieSBDb2NvcyBDcmVhdG9yIGFuZCBpcyBvbmx5IHVzZWQgZm9yIHByb2plY3RzIGNvbXBhdGlibGUgd2l0aCB2Mi4xLjAvdjIuMS4xL3YyLjMuMC92Mi4zLjEvdjIuMy4yIHZlcnNpb25zLlxuICogWW91IGRvIG5vdCBuZWVkIHRvIG1hbnVhbGx5IGFkZCB0aGlzIHNjcmlwdCBpbiBhbnkgb3RoZXIgcHJvamVjdC5cbiAqIElmIHlvdSBkb24ndCB1c2UgY2MuQWN0aW9uIGluIHlvdXIgcHJvamVjdCwgeW91IGNhbiBkZWxldGUgdGhpcyBzY3JpcHQgZGlyZWN0bHkuXG4gKiBJZiB5b3VyIHByb2plY3QgaXMgaG9zdGVkIGluIFZDUyBzdWNoIGFzIGdpdCwgc3VibWl0IHRoaXMgc2NyaXB0IHRvZ2V0aGVyLlxuICpcbiAqIOatpOiEmuacrOeUsSBDb2NvcyBDcmVhdG9yIOiHquWKqOeUn+aIkO+8jOS7heeUqOS6juWFvOWuuSB2Mi4xLjAvdjIuMS4xL3YyLjMuMC92Mi4zLjEvdjIuMy4yIOeJiOacrOeahOW3peeoi++8jFxuICog5L2g5peg6ZyA5Zyo5Lu75L2V5YW25a6D6aG555uu5Lit5omL5Yqo5re75Yqg5q2k6ISa5pys44CCXG4gKiDlpoLmnpzkvaDnmoTpobnnm67kuK3msqHnlKjliLAgQWN0aW9u77yM5Y+v55u05o6l5Yig6Zmk6K+l6ISa5pys44CCXG4gKiDlpoLmnpzkvaDnmoTpobnnm67mnInmiZjnrqHkuo4gZ2l0IOetieeJiOacrOW6k++8jOivt+WwhuatpOiEmuacrOS4gOW5tuS4iuS8oOOAglxuICovXG5cbmNjLlJvdGF0ZUJ5Ll9yZXZlcnNlID0gdHJ1ZTtcbiJdfQ==
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxjb25maWdcXHB1c2guanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsImZpc2hCaXQiLCJhcHBpZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsTUFBTSxDQUFDQyxPQUFQLEdBQWlCO0FBQ2JDLEVBQUFBLE9BQU8sRUFBRTtBQUNMQyxJQUFBQSxLQUFLLEVBQUU7QUFERjtBQURJLENBQWpCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBmaXNoQml0IDp7XG4gICAgICAgIGFwcGlkIDpcInd4NGI3YWNmZDE2M2U5YWM5NFwiLFxuICAgIH0sXG59OyJdfQ==
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxjb250cm9sXFxhZF9jb250cm9sLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwib3Blbl9zaGFyZSIsInd4Iiwic2hvd1NoYXJlTWVudSIsIndpdGhTaGFyZVRpY2tldCIsIm9uU2hhcmVBcHBNZXNzYWdlIiwibWFudWFsX3NoYXJlIiwidGFnIiwidHQiLCJzaGFyZV90YWciLCJzaGFyZV9zdGF0ZSIsInNoYXJlX3RpbWUiLCJEYXRlIiwiZ2V0VGltZSIsInNlbGYiLCJzaGFyZUFwcE1lc3NhZ2UiLCJ0ZW1wbGF0ZUlkIiwidGl0bGUiLCJkZXNjIiwiaW1hZ2VVcmwiLCJxdWVyeSIsInN1Y2Nlc3MiLCJjb25zb2xlIiwibG9nIiwic2hhcmVfc3VjZXNzIiwiZmFpbCIsImUiLCJzaGFyZV9mYWlsIiwic2hhcmVfanVkZ2UiLCJvblNob3ciLCJub3dfdGltZSIsImdhbWVfc2NlbmVfanMiLCJjcmVhdGVfdGlwc191aSIsIm5vZGUiLCJpbmlfc2hhcmUiLCJjcmVhdGVfdmlkZW9BZCIsImNvbmZpZyIsImFkX3N0YXRlIiwidmlkZW9fYWQiLCJjcmVhdGVSZXdhcmRlZFZpZGVvQWQiLCJhZFVuaXRJZCIsIm9uRXJyb3IiLCJlcnIiLCJhZF9tYW5hZ2VlciIsInNob3dfdmlkZW9BZCIsIm5hbWUiLCJzb3VuZF9jb250cm9sIiwicGF1c2VfYWxsX3NvdW5kIiwidmlkZW9fdGFnIiwic2hvdyIsImxvYWQiLCJ0aGVuIiwib3Zlcl92aWRlb0FkIiwib25DbG9zZSIsInJlcyIsImlzRW5kZWQiLCJ1bmRlZmluZWQiLCJ2aWRlb19zdGF0ZSIsInJlc3VtZV9hbGxfc291bmQiLCJiYW5uZXJfYWQiLCJpbmZvIiwiZ2V0U3lzdGVtSW5mb1N5bmMiLCJhcHBOYW1lIiwidG9VcHBlckNhc2UiLCJzeXNJbmZvIiwiYmFubmVyQWQiLCJjcmVhdGVCYW5uZXJBZCIsImFkSW50ZXJ2YWxzIiwic3R5bGUiLCJsZWZ0IiwidG9wIiwid2lkdGgiLCJvblJlc2l6ZSIsIndpbmRvd0hlaWdodCIsImhlaWdodCIsIndpbmRvd1dpZHRoIiwic2hvd19iYW5uZXJBZCIsImhpZGVfYmFubmVyQWQiLCJoaWRlIiwib25Mb2FkIiwiZmluZCIsImdldENvbXBvbmVudCIsImp1ZGdlIiwic3RhcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUUsRUFIUDtBQU9MO0FBRUE7QUFDQUMsRUFBQUEsVUFBVSxFQUFFLHNCQUFZO0FBQ3BCLFFBQUksT0FBUUMsRUFBUixLQUFnQixXQUFwQixFQUFpQztBQUM3QjtBQUNBQSxNQUFBQSxFQUFFLENBQUNDLGFBQUgsQ0FBaUI7QUFBRUMsUUFBQUEsZUFBZSxFQUFFO0FBQW5CLE9BQWpCO0FBQ0FGLE1BQUFBLEVBQUUsQ0FBQ0csaUJBQUgsQ0FBcUIsWUFBWTtBQUM3QixlQUFPLENBQ0g7QUFERyxTQUFQO0FBR0gsT0FKRDtBQUtIOztBQUFBO0FBQ0osR0FwQkk7QUFzQkw7QUFDQUMsRUFBQUEsWUFBWSxFQUFFLHNCQUFVQyxHQUFWLEVBQWU7QUFDekIsUUFBSSxPQUFRQyxFQUFSLEtBQWdCLFdBQXBCLEVBQWlDO0FBQzdCO0FBQ0EsV0FBS0MsU0FBTCxHQUFpQkYsR0FBakI7QUFDQSxXQUFLRyxXQUFMLEdBQW1CLFFBQW5CO0FBQ0EsV0FBS0MsVUFBTCxHQUFrQixJQUFJQyxJQUFKLEdBQVdDLE9BQVgsRUFBbEIsQ0FKNkIsQ0FJVzs7QUFDeEMsVUFBSUMsSUFBSSxHQUFHLElBQVg7O0FBQ0EsY0FBUVAsR0FBUjtBQUNJLGFBQUssZ0JBQUw7QUFDSUMsVUFBQUEsRUFBRSxDQUFDTyxlQUFILENBQW1CO0FBQ2ZDLFlBQUFBLFVBQVUsRUFBRSxvQkFERztBQUNtQjtB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O0FBQ0EsU0FBS08sU0FBTDtBQUNBLFNBQUsxRCxVQUFMO0FBR0gsR0E1UEk7QUE4UExrRixFQUFBQSxLQTlQSyxtQkE4UEcsQ0FFUCxDQWhRSSxDQWtRTDs7QUFsUUssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNvbmZpZyBmcm9tIFwiY29uZmlnXCI7XG4vKlxuICAgIHNoYXJlX3N0YXRlIDp7XG4gICAgICAgIHNoYXJlZCA6IFwi5bey5YiG5LqrXCJcbiAgICAgICAgdW5fc2hhcmUgOiBcIuacquWIhuS6q1wiXG4gICAgICAgIHNoYXJlX3N1Y2NlcyA6XCLliIbkuqvmiJDlip9cIlxuICAgIH07XG4qL1xuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcblxuICAgIH0sXG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcblxuICAgIC8v5omT5byA5Y+z5LiK6KeSM+S4queCuei9rOWPkVxuICAgIG9wZW5fc2hhcmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiAod3gpICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICAvL+aYvuekuuW9k+WJjemhtemdouWPs+S4iuinkueahOi9rOWPkeaMiemSrlxuICAgICAgICAgICAgd3guc2hvd1NoYXJlTWVudSh7IHdpdGhTaGFyZVRpY2tldDogdHJ1ZSB9KVxuICAgICAgICAgICAgd3gub25TaGFyZUFwcE1lc3NhZ2UoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIC8v5omL5Yqo5ouJ6LW36L2s5Y+R6LCD55SoXG4gICAgbWFudWFsX3NoYXJlOiBmdW5jdGlvbiAodGFnKSB7XG4gICAgICAgIGlmICh0eXBlb2YgKHR0KSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgLy/orrDlvZXmmK/ku4DkuYjliIbkuqtcbiAgICAgICAgICAgIHRoaXMuc2hhcmVfdGFnID0gdGFnO1xuICAgICAgICAgICAgdGhpcy5zaGFyZV9zdGF0ZSA9IFwic2hhcmVkXCI7XG4gICAgICAgICAgICB0aGlzLnNoYXJlX3RpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTsgLy8g6K6w5b2V5b2T5YmN5pe26Ze0XG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICBzd2l0Y2ggKHRhZykge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJvZmZsaW5lX3Byb2ZpdFwiOlxuICAgICAgICAgICAgICAgICAgICB0dC5zaGFyZUFwcE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVJZDogXCJ1NzY0eDdicDl2MmQzazE2aWpcIiwgLy8g5pu/5o2i5oiQ6YCa6L+H5a6h5qC455qE5YiG5LqrSURcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkxlaXN1cmUgZmFybSwgaGFuZyB1cFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzYzogXCJBIHJlbGF4aW5nIGFuZCBjYXN1YWwgYnVzaW5lc3Mgc2ltdWxhdGlvbiBnYW1l44CCXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWFnZVVybDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5OiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzcygpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWIhuS6q+inhumikeaIkOWKn1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNoYXJlX3N1Y2VzcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhaWwoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5YiG5Lqr6KeG6aKR5aSx6LSlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2hhcmVfZmFpbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInBldFwiOlxuICAgICAgICAgICAgICAgICAgICB0dC5zaGFyZUFwcE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVJZDogXCJcIiwgLy8g5pu/5o2i5oiQ6YCa6L+H5a6h5qC455qE5YiG5LqrSURcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkRvIHlvdSBsaWtlIG1lP1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzYzogXCJJIHdhbnQgdGhpcyBsaXR0bGUgcGV0LCBwbGVhc2UgY2xpY2sgZm9yIG1l77yBXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWFnZVVybDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5OiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzcygpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWIhuS6q+inhumikeaIkOWKn1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNoYXJlX3N1Y2VzcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhaWwoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5YiG5Lqr6KeG6aKR5aSx6LSlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2hhcmVfZmFpbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuXG4gICAgfSxcbiAgICAvL+W+ruS/oeWbnuWIsOWJjeWPsOWIhuS6q+WIpOaWrVxuICAgIHNoYXJlX2p1ZGdlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0eXBlb2YgKHd4KSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgd3gub25TaG93KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAvL+agh+etvuS4jeiDveS4uuepuuW5tuS4lOWIhuS6q+eKtuaAgeS4uuW3suWIhuS6q1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLnNoYXJlX3N0YXRlID09IFwic2hhcmVkXCIgJiYgc2VsZi5zaGFyZV90YWcgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5vd190aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChub3dfdGltZSAtIHNlbGYuc2hhcmVfdGltZSA+PSAzMDAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNoYXJlX3N1Y2VzcyhzZWxmLnNoYXJlX3RhZyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNoYXJlX2ZhaWwoKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIC8v5YiG5Lqr5oiQ5YqfXG4gICAgc2hhcmVfc3VjZXNzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc2hhcmVfc3RhdGUgPSBcInNoYXJlX3N1Y2Nlc1wiO1xuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIFwic2hhcmVfc3VjY2VzXCIpO1xuICAgIH0sXG5cbiAgICAvL+WIhuS6q+Wksei0pVxuICAgIHNoYXJlX2ZhaWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5pbmlfc2hhcmUoKTtcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9zY2VuZV9qcy5ub2RlLCBcInNoYXJlX2ZhaWxcIik7XG5cbiAgICB9LFxuXG4gICAgLy/liJ3lp4vljJbliIbkuqtcbiAgICBpbmlfc2hhcmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5zaGFyZV90YWcgPSBudWxsOyAvL+WIhuS6q+eahOagh+etvlxuICAgICAgICB0aGlzLnNoYXJlX3RpbWUgPSBudWxsOyAvL+WIhuS6q+aXtueahOaXtumXtFxuICAgICAgICB0aGlzLnNoYXJlX3N0YXRlID0gXCJ1bl9zaGFyZVwiO1xuICAgIH0sXG5cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8v5Yib5bu66KeG6aKR5bm/5ZGKXG4gICAgY3JlYXRlX3ZpZGVvQWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGNvbmZpZy5hZF9zdGF0ZSA9PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH07XG4gICAgICAgIGlmICh0eXBlb2YgKHd4KSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgLy/op4bpopHlub/lkYpcbiAgICAgICAgICAgIHRoaXMudmlkZW9fYWQgPSB3eC5jcmVhdGVSZXdhcmRlZFZpZGVvQWQoe1xuICAgICAgICAgICAgICAgIGFkVW5pdElkOiAnMm9vNjBzanhsZDkxMWdyaDI1JywvL+Whq+S4iuS9oOeahOW5v+WRiuS9jWlkXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgICAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgICAgICAgICAgLy/plJnor6/mj5DnpLpcbiAgICAgICAgICAgIHRoaXMudmlkZW9fYWQub25FcnJvcihlcnIgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRfbWFuYWdlZXIgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIC8v5bGV56S66KeG6aKR5bm/5ZGKXG4gICAgc2hvd192aWRlb0FkOiBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICBpZiAoY29uZmlnLmFkX3N0YXRlID09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHR5cGVvZiAod3gpICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hZF9tYW5hZ2VlciA9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIC8v5bm/5ZGK5pyq5byA5ZCvXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wYXVzZV9hbGxfc291bmQoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLnZpZGVvX3RhZyA9IG5hbWU7XG4gICAgICAgICAgICAvL+aXoOiuuuacieWkmuWwkeW5v+WRiizlj6rkvJrov5Tlm57kuIDkuKrlrp7kvotcbiAgICAgICAgICAgIHRoaXMudmlkZW9fYWQuc2hvdygpLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyDlpLHotKXph43or5VcbiAgICAgICAgICAgICAgICB0aGlzLnZpZGVvX2FkLmxvYWQoKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLnZpZGVvX2FkLnNob3coKSxcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfmv4DlirHop4bpopEg5bm/5ZGK5pi+56S65aSx6LSlJylcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfc2NlbmVfanMubm9kZSwgXCJ2aWRlb193YWl0XCIpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIC8v5bm/5ZGK57uT5p2f5oiW6YCA5Ye6XG4gICAgb3Zlcl92aWRlb0FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChjb25maWcuYWRfc3RhdGUgPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9O1xuICAgICAgICBpZiAodHlwZW9mICh3eCkgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHRoaXMudmlkZW9fYWQub25DbG9zZShyZXMgPT4ge1xuICAgICAgICAgICAgICAgIC8vIOeUqOaIt+eCueWHu+S6huOAkOWFs+mXreW5v+WRiuOAkeaMiemSrlxuICAgICAgICAgICAgICAgIC8vIOWwj+S6jiAyLjEuMCDnmoTln7rnoYDlupPniYjmnKzvvIxyZXMg5piv5LiA5LiqIHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgIGlmIChyZXMgJiYgcmVzLmlzRW5kZWQgfHwgcmVzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g5q2j5bi45pKt5pS+57uT5p2f77yM5Y+v5Lul5LiL5Y+R5ri45oiP5aWW5YqxXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlkZW9fc3RhdGUgPSAxOy8vIDHkuLrmiJDlip/vvIww5Li65aSx6LSlIDLkvY3mkq3mlL7nu5PmnZ9cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnJlc3VtZV9hbGxfc291bmQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOaSreaUvuS4remAlOmAgOWHuu+8jOS4jeS4i+WPkea4uOaIj+WlluWKsVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucmVzdW1lX2FsbF9zb3VuZCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZGVvX3N0YXRlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9zY2VuZV9qcy5ub2RlLCBcInZpZGVvX2V4aXRcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIC8v5Yib5bu6YmFubmVy5bm/5ZGKXG4gICAgYmFubmVyX2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0eXBlb2YgKHd4KSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgLy/mipbpn7PlsY/olL1iYW5uZXJcbiAgICAgICAgICAgIGNvbnN0IGluZm8gPSB0dC5nZXRTeXN0ZW1JbmZvU3luYygpO1xuICAgICAgICAgICAgaWYgKGluZm8uYXBwTmFtZS50b1VwcGVyQ2FzZSgpID09PSAnRE9VWUlOJyB8fCBjb25maWcuYWRfc3RhdGUgPT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8g5Yib5bu6IEJhbm5lciDlub/lkYrlrp7kvovvvIzmj5DliY3liJ3lp4vljJZcbiAgICAgICAgICAgICAgICBsZXQgc3lzSW5mbyA9IHd4LmdldFN5c3RlbUluZm9TeW5jKClcbiAgICAgICAgICAgICAgICB0aGlzLmJhbm5lckFkID0gd3guY3JlYXRlQmFubmVyQWQoe1xuICAgICAgICAgICAgICAgICAgICBhZFVuaXRJZDogJzZnMzc5OWI4Z2NiNTJ5MWR2aScsXG4gICAgICAgICAgICAgICAgICAgIGFkSW50ZXJ2YWxzOiAzMCxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3A6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzAwLFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB0aGlzLmJhbm5lckFkLm9uRXJyb3IoZXJyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnNob3dfcHVzaF9hZChcImJhbm5lclwiKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmJhbm5lckFkLm9uUmVzaXplKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmFubmVyQWQuc3R5bGUudG9wID0gc3lzSW5mby53aW5kb3dIZWlnaHQgLSByZXMuaGVpZ2h0IC0gMTA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmFubmVyQWQuc3R5bGUubGVmdCA9IChzeXNJbmZvLndpbmRvd1dpZHRoIC0gcmVzLndpZHRoKSAvIDI7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTsvL2VuZCBpZlxuICAgIH0sXG5cbiAgICAvL+WxleekumJhbm5lclxuICAgIHNob3dfYmFubmVyQWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2MubG9nKFwiY3JlYXRlX2Jhbm5lckFEXCIpO1xuICAgICAgICBpZiAodHlwZW9mICh3eCkgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIC8v5oqW6Z+z5bGP6JS9YmFubmVyXG4gICAgICAgICAgICBjb25zdCBpbmZvID0gdHQuZ2V0U3lzdGVtSW5mb1N5bmMoKTtcbiAgICAgICAgICAgIGlmIChpbmZvLmFwcE5hbWUudG9VcHBlckNhc2UoKSA9PT0gJ0RPVVlJTicgfHwgY29uZmlnLmFkX3N0YXRlID09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuYmFubmVyQWQuc2hvdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0sXG4gICAgaGlkZV9iYW5uZXJBZDogZnVuY3Rpb24gKCkge1xuICAgICAgICBjYy5sb2coXCJoaWRlX2Jhbm5lckFEXCIpO1xuICAgICAgICBpZiAodHlwZW9mICh3eCkgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIC8v5oqW6Z+z5bGP6JS9YmFubmVyXG4gICAgICAgICAgICBjb25zdCBpbmZvID0gdHQuZ2V0U3lzdGVtSW5mb1N5bmMoKTtcbiAgICAgICAgICAgIGlmIChpbmZvLmFwcE5hbWUudG9VcHBlckNhc2UoKSA9PT0gJ0RPVVlJTicgfHwgY29uZmlnLmFkX3N0YXRlID09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuYmFubmVyQWQuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0sXG5cblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgLy8gY2MuZ2FtZS5hZGRQZXJzaXN0Um9vdE5vZGUodGhpcy5ub2RlKTtcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9zY2VuZVwiKTtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sID0gY2MuZmluZChcInNvdW5kX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwic291bmRfY29udHJvbFwiKTtcbiAgICAgICAgLy8gdGhpcy5zaGFyZV9qdWRnZSgpO1xuICAgICAgICB0aGlzLmluaV9zaGFyZSgpO1xuICAgICAgICB0aGlzLmp1ZGdlID0gbnVsbDsgLy8g5Yik5pat5piv5ZCm5YiG5Lqr5oiQ5YqfXG4gICAgICAgIHRoaXMudmlkZW9fdGFnID0gbnVsbDsgLy/op4bpopHmoIfnrb5cbiAgICAgICAgdGhpcy52aWRlb19zdGF0ZSA9IG51bGw7IC8v6KeG6aKR5pKt5pS+55qE54q25oCBIDHkvY1zdWNjZXMgMOS4umZhaWxcbiAgICAgICAgdGhpcy5jcmVhdGVfdmlkZW9BZCgpO1xuICAgICAgICB0aGlzLm92ZXJfdmlkZW9BZCgpO1xuICAgICAgICB0aGlzLmJhbm5lcl9hZCgpO1xuICAgICAgICB0aGlzLm9wZW5fc2hhcmUoKTtcblxuXG4gICAgfSxcblxuICAgIHN0YXJ0KCkge1xuXG4gICAgfSxcblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxufSk7XG4iXX0=
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
      this.game_scene_js.create_tips_ui(this.game_scene_js.node, "no_money");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcaG90ZWxfdWkuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJsb2NrX2dyb3VwX25vZGUiLCJOb2RlIiwibGFiZWxfZ3JvdXBfbm9kZSIsImhvdGVsX2VqZWN0X25vZGUiLCJidXlfdGl0dGxlX2xhYmVsIiwiTGFiZWwiLCJjb3N0X2xhYmVsIiwiaW9jbl9mcmFtZV9hcnIiLCJTcHJpdGVGcmFtZSIsImJ1eV9idXR0b25fbm9kZSIsImluaV9ub2RlIiwiZ2FtZV9zY2VuZV9qcyIsImZpbmQiLCJnZXRDb21wb25lbnQiLCJnYW1lX3J1bGVzX2pzIiwiYWRfY29udHJvbCIsInNvdW5kX2NvbnRyb2wiLCJhZF9jYXIiLCJpIiwiY2hpbGRyZW4iLCJsZW5ndGgiLCJ1c2VyX2RhdGEiLCJob3RlbCIsImhhdmUiLCJhY3RpdmUiLCJTcHJpdGUiLCJzcHJpdGVGcmFtZSIsIkJ1dHRvbiIsImludGVyYWN0YWJsZSIsInN0cmluZyIsImNvbmZpZyIsIm5lZWRfbGV2ZWwiLCJzaG93X2Jhbm5lckFkIiwiaW5pX2hvdGVsX2VqZWN0IiwiaW5kZXgiLCJyb29tX2luZGV4IiwicHJvZHVjZV90aW1lIiwicHJvZHVjZSIsImNvc3QiLCJvbl9sb2NrX2J1dHRvbl9jbGljayIsImUiLCJsZXZlbCIsInBsYXlfc291bmRfZWZmZWN0IiwiY3JlYXRlX2FkX2NhciIsImNyZWF0ZV90aXBzX3VpIiwibm9kZSIsIm9uX3RvdWNoX2V4aXRfY2xpY2siLCJoaWRlX2Jhbm5lckFkIiwib25fbm9kZV9raWxsIiwib25faG90ZWxfZWplY3RfZXhpdF9jbGljayIsImRlc3Ryb3kiLCJvbl9idXlfYnV0dG9uX2NsaWNrIiwiZ29sZCIsImFkZF9nb2xkIiwiaG90ZWxfYnV5X3Jvb20iLCJhbGxfY2FwYWNpdHkiLCJza2lsbCIsInByaWNlX2RpZmZlcmVuY2UiLCJzdGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUVBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUVMLGFBQVNELEVBQUUsQ0FBQ0UsU0FGUDtBQUlMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsZUFBZSxFQUFFSixFQUFFLENBQUNLLElBRFo7QUFFUkMsSUFBQUEsZ0JBQWdCLEVBQUVOLEVBQUUsQ0FBQ0ssSUFGYjtBQUdSRSxJQUFBQSxnQkFBZ0IsRUFBRVAsRUFBRSxDQUFDSyxJQUhiO0FBSVJHLElBQUFBLGdCQUFnQixFQUFFUixFQUFFLENBQUNTLEtBSmI7QUFLUkMsSUFBQUEsVUFBVSxFQUFFVixFQUFFLENBQUNTLEtBTFA7QUFNUkUsSUFBQUEsY0FBYyxFQUFFLENBQUNYLEVBQUUsQ0FBQ1ksV0FBSixDQU5SO0FBT1JDLElBQUFBLGVBQWUsRUFBRWIsRUFBRSxDQUFDSztBQVBaLEdBSlA7QUFjTDtBQUNBUyxFQUFBQSxRQWZLLHNCQWVNO0FBQ1AsU0FBS0MsYUFBTCxHQUFxQmYsRUFBRSxDQUFDZ0IsSUFBSCxDQUFRLFNBQVIsRUFBbUJDLFlBQW5CLENBQWdDLFlBQWhDLENBQXJCO0FBQ0EsU0FBS0MsYUFBTCxHQUFxQmxCLEVBQUUsQ0FBQ2dCLElBQUgsQ0FBUSxTQUFSLEVBQW1CQyxZQUFuQixDQUFnQyxZQUFoQyxDQUFyQjtBQUNBLFNBQUtFLFVBQUwsR0FBa0JuQixFQUFFLENBQUNnQixJQUFILENBQVEsWUFBUixFQUFzQkMsWUFBdEIsQ0FBbUMsWUFBbkMsQ0FBbEI7QUFDQSxTQUFLRyxhQUFMLEdBQXFCcEIsRUFBRSxDQUFDZ0IsSUFBSCxDQUFRLGVBQVIsRUFBeUJDLFlBQXpCLENBQXNDLGVBQXRDLENBQXJCO0FBQ0EsU0FBS0ksTUFBTCxHQUFjLElBQWQ7O0FBQ0EsU0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEtBQUtsQixlQUFMLENBQXFCbUIsUUFBckIsQ0FBOEJDLE1BQWxELEVBQTBERixDQUFDLEVBQTNELEVBQStEO0FBQzNELFVBQUlHLHNCQUFVQSxTQUFWLENBQW9CQyxLQUFwQixDQUEwQkosQ0FBMUIsRUFBNkJLLElBQTdCLElBQXFDLENBQXpDLEVBQTRDO0FBQ3hDLGFBQUtyQixnQkFBTCxDQUFzQmlCLFFBQXRCLENBQStCRCxDQUEvQixFQUFrQ00sTUFBbEMsR0FBMkMsS0FBM0M7QUFDQSxhQUFLckIsZ0JBQUwsQ0FBc0JxQixNQUF0QixHQUErQixLQUEvQjtBQUNBLGFBQUt4QixlQUFMLENBQXFCbUIsUUFBckIsQ0FBOEJELENBQTlCLEVBQWlDTCxZQUFqQyxDQUE4Q2pCLEVBQUUsQ0FBQzZCLE1BQWpELEVBQXlEQyxXQUF6RCxHQUF1RSxLQUFLbkIsY0FBTCxDQUFvQixDQUFwQixDQUF2RTtBQUNILE9BSkQsTUFJTztBQUNILGFBQUtMLGdCQUFMLENBQXNCaUIsUUFBdEIsQ0FBK0JELENBQS9CLEVBQWtDTSxNQUFsQyxHQUEyQyxJQUEzQztBQUNBLGFBQUt4QixlQUFMLENBQXFCbUIsUUFBckIsQ0FBOEJELENBQTlCLEVBQWlDTCxZQUFqQyxDQUE4Q2pCLEVBQUUsQ0FBQzZCLE1BQWpELEVBQXlEQyxXQUF6RCxHQUF1RSxLQUFLbkIsY0FBTCxDQUFvQixDQUFwQixDQUF2RTtBQUNBLGFBQUtQLGVBQUwsQ0FBcUJtQixRQUFyQixDQUE4QkQsQ0FBOUIsRUFBaUNMLFlBQWpDLENBQThDakIsRUFBRSxDQUFDK0IsTUFBakQsRUFBeURDLFlBQXpELEdBQXdFLElBQXhFO0FBQ0EsYUFBSzFCLGdCQUFMLENBQXNCaUIsUUFBdEIsQ0FBK0JELENBQS9CLEVBQWtDTCxZQUFsQyxDQUErQ2pCLEVBQUUsQ0FBQ1MsS0FBbEQsRUFBeUR3QixNQUF6RCxHQUFrRUMsbUJBQU9SLEtBQVAsQ0FBYUosQ0FBYixFQUFnQmEsVUFBbEY7QUFDSDs7QUFBQTtBQUNKOztBQUFBO0FBQ0QsU0FBS2hCLFVBQUwsQ0FBZ0JpQixhQUFoQjtBQUNILEdBbENJO0FBbUNMO0FBQ0FDLEVBQUFBLGVBcENLLDJCQW9DV0MsS0FwQ1gsRUFvQ2tCO0FBQ25CLFFBQUliLHNCQUFVQSxTQUFWLENBQW9CQyxLQUFwQixDQUEwQlksS0FBMUIsRUFBaUNYLElBQWpDLElBQXlDLENBQTdDLEVBQWdEO0FBQzVDLFdBQUtkLGVBQUwsQ0FBcUJlLE1BQXJCLEdBQThCLEtBQTlCO0FBQ0gsS0FGRCxNQUVPO0FBQ0gsV0FBS2YsZUFBTCxDQUFxQmUsTUFBckIsR0FBOEIsSUFBOUI7QUFDSDs7QUFBQTtBQUNELFNBQUtwQixnQkFBTCxDQUFzQnlCLE1BQXRCLEdBQStCLDZCQUE2QkMsbUJBQU9SLEtBQVAsQ0FBYSxLQUFLYSxVQUFsQixFQUE4QkMsWUFBM0QsR0FBMEUsZ0JBQTFFLEdBQTZGTixtQkFBT1IsS0FBUCxDQUFhLEtBQUthLFVBQWxCLEVBQThCRSxPQUEzSCxHQUFxSSxNQUFwSztBQUNBLFNBQUsvQixVQUFMLENBQWdCdUIsTUFBaEIsR0FBeUJDLG1CQUFPUixLQUFQLENBQWEsS0FBS2EsVUFBbEIsRUFBOEJHLElBQXZEO0FBQ0gsR0E1Q0k7QUE2Q0w7QUFDQUMsRUFBQUEsb0JBOUNLLGdDQThDZ0JDLENBOUNoQixFQThDbUJOLEtBOUNuQixFQThDMEI7QUFDM0IsU0FBS0MsVUFBTCxHQUFrQkQsS0FBbEI7QUFDQSxRQUFJTyxLQUFLLEdBQUdwQixzQkFBVUEsU0FBVixDQUFvQm9CLEtBQWhDOztBQUNBLFFBQUlBLEtBQUssSUFBSVgsbUJBQU9SLEtBQVAsQ0FBYVksS0FBYixFQUFvQkgsVUFBakMsRUFBNkM7QUFDekMsV0FBS2YsYUFBTCxDQUFtQjBCLGlCQUFuQixDQUFxQyxjQUFyQztBQUNBLFdBQUt2QyxnQkFBTCxDQUFzQnFCLE1BQXRCLEdBQStCLElBQS9CO0FBQ0EsV0FBS1MsZUFBTCxDQUFxQkMsS0FBckI7QUFDQSxXQUFLUyxhQUFMO0FBQ0gsS0FMRCxNQUtPO0FBQ0gsV0FBSzNCLGFBQUwsQ0FBbUIwQixpQkFBbkIsQ0FBcUMsVUFBckM7QUFDQSxXQUFLL0IsYUFBTCxDQUFtQmlDLGNBQW5CLENBQWtDLEtBQUtqQyxhQUFMLENBQW1Ca0MsSUFBckQsRUFBMkQsVUFBM0Q7QUFDSDs7QUFBQTtBQUNKLEdBMURJO0FBMkRMO0FBQ0FDLEVBQUFBLG1CQTVESywrQkE0RGVOLENBNURmLEVBNERrQjtBQUNuQixTQUFLekIsVUFBTCxDQUFnQmdDLGFBQWhCO0FBQ0EsU0FBSy9CLGFBQUwsQ0FBbUIwQixpQkFBbkIsQ0FBcUMsYUFBckM7QUFDQSxTQUFLL0IsYUFBTCxDQUFtQnFDLFlBQW5CLENBQWdDLEtBQUtILElBQXJDO0FBQ0gsR0FoRUk7QUFpRUw7QUFDQUksRUFBQUEseUJBbEVLLHVDQWtFdUI7QUFDeEIsU0FBS2pDLGFBQUwsQ0FBbUIwQixpQkFBbkIsQ0FBcUMsYUFBckM7O0FBQ0EsUUFBSSxLQUFLekIsTUFBTCxLQUFnQixJQUFwQixFQUEwQjtBQUN0QixXQUFLQSxNQUFMLENBQVlpQyxPQUFaO0FBQ0g7O0FBQUE7QUFDRCxTQUFLL0MsZ0JBQUwsQ0FBc0JxQixNQUF0QixHQUErQixLQUEvQjtBQUNILEdBeEVJO0FBeUVMO0FBQ0EyQixFQUFBQSxtQkExRUssaUNBMEVpQjtBQUNsQixRQUFJQyxJQUFJLEdBQUcvQixzQkFBVUEsU0FBVixDQUFvQitCLElBQS9CO0FBQ0EsUUFBSWQsSUFBSSxHQUFHUixtQkFBT1IsS0FBUCxDQUFhLEtBQUthLFVBQWxCLEVBQThCRyxJQUF6Qzs7QUFDQSxRQUFJYyxJQUFJLElBQUlkLElBQVosRUFBa0I7QUFDZCxXQUFLdEIsYUFBTCxDQUFtQjBCLGlCQUFuQixDQUFxQyxjQUFyQztBQUNBLFdBQUsvQixhQUFMLENBQW1CaUMsY0FBbkIsQ0FBa0MsS0FBS2pDLGFBQUwsQ0FBbUJrQyxJQUFyRCxFQUEyRCxZQUEzRDtBQUNBLFdBQUsvQixhQUFMLENBQW1CdUMsUUFBbkIsQ0FBNEIsQ0FBQ2YsSUFBN0I7QUFDQWpCLDRCQUFVQSxTQUFWLENBQW9CQyxLQUFwQixDQUEwQixLQUFLYSxVQUEvQixFQUEyQ1osSUFBM0MsR0FBa0QsQ0FBbEQ7QUFDQSxXQUFLVCxhQUFMLENBQW1Cd0MsY0FBbkIsQ0FBa0MsS0FBS25CLFVBQXZDO0FBQ0EsV0FBS3pCLFFBQUw7QUFDSCxLQVBELE1BT087QUFDSCxXQUFLTSxhQUFMLENBQW1CMEIsaUJBQW5CLENBQXFDLFVBQXJDO0FBQ0EsV0FBSy9CLGFBQUwsQ0FBbUJpQyxjQUFuQixDQUFrQyxLQUFLakMsYUFBTCxDQUFtQmtDLElBQXJELEVBQTJELFVBQTNEO0FBQ0g7O0FBQUE7QUFDSixHQXhGSTtBQXlGTDtBQUNBRixFQUFBQSxhQTFGSywyQkEwRlc7QUFDWixRQUFJdEIsc0JBQVVBLFNBQVYsQ0FBb0JDLEtBQXBCLENBQTBCLEtBQUthLFVBQS9CLEVBQTJDWixJQUEzQyxJQUFtRCxDQUF2RCxFQUEwRDtBQUN0RCxVQUFJNkIsSUFBSSxHQUFHL0Isc0JBQVVBLFNBQVYsQ0FBb0IrQixJQUEvQjtBQUNBLFVBQUlHLFlBQVksR0FBRyxNQUFNbEMsc0JBQVVBLFNBQVYsQ0FBb0JtQyxLQUFwQixDQUEwQixVQUExQixDQUFOLEdBQThDLEdBQWpFO0FBQ0EsVUFBSWxCLElBQUksR0FBSVIsbUJBQU9SLEtBQVAsQ0FBYSxLQUFLYSxVQUFsQixFQUE4QkcsSUFBMUMsQ0FIc0QsQ0FJdEQ7O0FBQ0EsVUFBSW1CLGdCQUFnQixHQUFHbkIsSUFBSSxHQUFHYyxJQUE5QixDQUxzRCxDQU10RDs7QUFDQSxVQUFJQSxJQUFJLElBQUlkLElBQUksSUFBSSxJQUFJLENBQVIsQ0FBWixJQUEwQmlCLFlBQVksSUFBSWpCLElBQTFDLElBQWtEYyxJQUFJLEdBQUdkLElBQTdELEVBQW1FO0FBQy9ELGFBQUt2QixVQUFMLENBQWdCZ0MsYUFBaEI7QUFDQSxhQUFLOUIsTUFBTCxHQUFjLEtBQUtOLGFBQUwsQ0FBbUJnQyxhQUFuQixDQUFpQyxLQUFLRSxJQUF0QyxFQUE0Q1ksZ0JBQTVDLENBQWQ7QUFDSDs7QUFBQTtBQUNKLEtBWEQsTUFXTztBQUNIO0FBQ0g7QUFFSixHQTFHSTtBQTJHTDtBQUVBQyxFQUFBQSxLQTdHSyxtQkE2R0csQ0FFUCxDQS9HSSxDQWlITDs7QUFqSEssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHVzZXJfZGF0YSBmcm9tIFwidXNlcl9kYXRhXCI7XG5pbXBvcnQgY29uZmlnIGZyb20gXCJjb25maWdcIjtcblxuY2MuQ2xhc3Moe1xuXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBsb2NrX2dyb3VwX25vZGU6IGNjLk5vZGUsXG4gICAgICAgIGxhYmVsX2dyb3VwX25vZGU6IGNjLk5vZGUsXG4gICAgICAgIGhvdGVsX2VqZWN0X25vZGU6IGNjLk5vZGUsXG4gICAgICAgIGJ1eV90aXR0bGVfbGFiZWw6IGNjLkxhYmVsLFxuICAgICAgICBjb3N0X2xhYmVsOiBjYy5MYWJlbCxcbiAgICAgICAgaW9jbl9mcmFtZV9hcnI6IFtjYy5TcHJpdGVGcmFtZV0sXG4gICAgICAgIGJ1eV9idXR0b25fbm9kZTogY2MuTm9kZSxcbiAgICB9LFxuXG4gICAgLy/liJ3lp4vljJboioLngrlcbiAgICBpbmlfbm9kZSgpIHtcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9zY2VuZVwiKTtcbiAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9ydWxlc1wiKTtcbiAgICAgICAgdGhpcy5hZF9jb250cm9sID0gY2MuZmluZChcImFkX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwiYWRfY29udHJvbFwiKTtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sID0gY2MuZmluZChcInNvdW5kX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwic291bmRfY29udHJvbFwiKTtcbiAgICAgICAgdGhpcy5hZF9jYXIgPSBudWxsO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubG9ja19ncm91cF9ub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5ob3RlbFtpXS5oYXZlID09IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsX2dyb3VwX25vZGUuY2hpbGRyZW5baV0uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5ob3RlbF9lamVjdF9ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMubG9ja19ncm91cF9ub2RlLmNoaWxkcmVuW2ldLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5pb2NuX2ZyYW1lX2FyclsxXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbF9ncm91cF9ub2RlLmNoaWxkcmVuW2ldLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2NrX2dyb3VwX25vZGUuY2hpbGRyZW5baV0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmlvY25fZnJhbWVfYXJyWzBdO1xuICAgICAgICAgICAgICAgIHRoaXMubG9ja19ncm91cF9ub2RlLmNoaWxkcmVuW2ldLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbF9ncm91cF9ub2RlLmNoaWxkcmVuW2ldLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gY29uZmlnLmhvdGVsW2ldLm5lZWRfbGV2ZWw7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFkX2NvbnRyb2wuc2hvd19iYW5uZXJBZCgpO1xuICAgIH0sXG4gICAgLy/liJ3lp4vljJblvLnlh7rnlYzpnaJcbiAgICBpbmlfaG90ZWxfZWplY3QoaW5kZXgpIHtcbiAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEuaG90ZWxbaW5kZXhdLmhhdmUgPT0gMSkge1xuICAgICAgICAgICAgdGhpcy5idXlfYnV0dG9uX25vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmJ1eV9idXR0b25fbm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmJ1eV90aXR0bGVfbGFiZWwuc3RyaW5nID0gXCJSZW50IGEgaG91c2UgZXZlcnkgb3RoZXJcIiArIGNvbmZpZy5ob3RlbFt0aGlzLnJvb21faW5kZXhdLnByb2R1Y2VfdGltZSArIFwic2Vjb25kcyB0byBnZXRcIiArIGNvbmZpZy5ob3RlbFt0aGlzLnJvb21faW5kZXhdLnByb2R1Y2UgKyBcImdvbGRcIjtcbiAgICAgICAgdGhpcy5jb3N0X2xhYmVsLnN0cmluZyA9IGNvbmZpZy5ob3RlbFt0aGlzLnJvb21faW5kZXhdLmNvc3Q7XG4gICAgfSxcbiAgICAvL29uIGxvY2sgYnV0dG9uIGNsaWNrXG4gICAgb25fbG9ja19idXR0b25fY2xpY2soZSwgaW5kZXgpIHtcbiAgICAgICAgdGhpcy5yb29tX2luZGV4ID0gaW5kZXg7XG4gICAgICAgIHZhciBsZXZlbCA9IHVzZXJfZGF0YS51c2VyX2RhdGEubGV2ZWw7XG4gICAgICAgIGlmIChsZXZlbCA+PSBjb25maWcuaG90ZWxbaW5kZXhdLm5lZWRfbGV2ZWwpIHtcbiAgICAgICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9jbGlja1wiKTtcbiAgICAgICAgICAgIHRoaXMuaG90ZWxfZWplY3Rfbm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5pbmlfaG90ZWxfZWplY3QoaW5kZXgpO1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVfYWRfY2FyKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJ1bl9jbGlja1wiKTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfc2NlbmVfanMubm9kZSwgXCJub19sZXZlbFwiKTtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIC8vdG91Y2ggZXhpdFxuICAgIG9uX3RvdWNoX2V4aXRfY2xpY2soZSkge1xuICAgICAgICB0aGlzLmFkX2NvbnRyb2wuaGlkZV9iYW5uZXJBZCgpO1xuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fZXhpdFwiKTtcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLm9uX25vZGVfa2lsbCh0aGlzLm5vZGUpO1xuICAgIH0sXG4gICAgLy9ob3RlbF9lamVjdCBleGl0XG4gICAgb25faG90ZWxfZWplY3RfZXhpdF9jbGljaygpIHtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2V4aXRcIik7XG4gICAgICAgIGlmICh0aGlzLmFkX2NhciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5hZF9jYXIuZGVzdHJveSgpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmhvdGVsX2VqZWN0X25vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgfSxcbiAgICAvL+i0reS5sOaMiemSruiiq+eCueWHu1xuICAgIG9uX2J1eV9idXR0b25fY2xpY2soKSB7XG4gICAgICAgIHZhciBnb2xkID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkO1xuICAgICAgICB2YXIgY29zdCA9IGNvbmZpZy5ob3RlbFt0aGlzLnJvb21faW5kZXhdLmNvc3RcbiAgICAgICAgaWYgKGdvbGQgPj0gY29zdCkge1xuICAgICAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xuICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9zY2VuZV9qcy5ub2RlLCBcImJ1eV9zdWNjZXNcIik7XG4gICAgICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMuYWRkX2dvbGQoLWNvc3QpO1xuICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5ob3RlbFt0aGlzLnJvb21faW5kZXhdLmhhdmUgPSAxO1xuICAgICAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLmhvdGVsX2J1eV9yb29tKHRoaXMucm9vbV9pbmRleCk7XG4gICAgICAgICAgICB0aGlzLmluaV9ub2RlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJ1bl9jbGlja1wiKTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfc2NlbmVfanMubm9kZSwgXCJub19tb25leVwiKTtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIC8v5Yib5bu6YWRfY2FyXG4gICAgY3JlYXRlX2FkX2NhcigpIHtcbiAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEuaG90ZWxbdGhpcy5yb29tX2luZGV4XS5oYXZlICE9IDEpIHtcbiAgICAgICAgICAgIHZhciBnb2xkID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkO1xuICAgICAgICAgICAgdmFyIGFsbF9jYXBhY2l0eSA9IDUwMCAqIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxbXCJnb2xkX21heFwiXSArIDUwMDtcbiAgICAgICAgICAgIHZhciBjb3N0ID0gKGNvbmZpZy5ob3RlbFt0aGlzLnJvb21faW5kZXhdLmNvc3QpO1xuICAgICAgICAgICAgLy/lt67ku7dcbiAgICAgICAgICAgIHZhciBwcmljZV9kaWZmZXJlbmNlID0gY29zdCAtIGdvbGQ7XG4gICAgICAgICAgICAvL+Wkp+S6jjQvNSzkuJTog73lpJ/mi6XmnInvvIzkuJTph5HluIHkuI3otrNcbiAgICAgICAgICAgIGlmIChnb2xkID49IGNvc3QgKiAoNCAvIDUpICYmIGFsbF9jYXBhY2l0eSA+PSBjb3N0ICYmIGdvbGQgPCBjb3N0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZF9jb250cm9sLmhpZGVfYmFubmVyQWQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFkX2NhciA9IHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfYWRfY2FyKHRoaXMubm9kZSwgcHJpY2VfZGlmZmVyZW5jZSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICB9LFxuICAgIC8vIG9uTG9hZCAoKSB7fSxcblxuICAgIHN0YXJ0KCkge1xuXG4gICAgfSxcblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxufSk7XG4iXX0=
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxlZmZlY3RcXGxpZ2h0LmpzIl0sIm5hbWVzIjpbInVzZXJfZGF0YSIsInJlcXVpcmUiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImljb25fZnJhbWVfYXJyIiwiU3ByaXRlRnJhbWUiLCJpY29uX2ZyYW1lIiwiU3ByaXRlIiwibGlnaHRfZ3JvdXAiLCJOb2RlIiwiaW5pX25vZGUiLCJwbGFudF9pbmRleCIsInN0YXJ0X25vZGUiLCJnYW1lX3NjZW5lX2pzIiwiZmluZCIsImdldENvbXBvbmVudCIsImdhbWVfcnVsZXNfanMiLCJzb3VuZF9jb250cm9sIiwiYWN0aXZlIiwic3ByaXRlRnJhbWUiLCJub2RlIiwic2V0UG9zaXRpb24iLCJwb3NpdGlvbiIsIngiLCJ5Iiwib25Mb2FkIiwic3RhcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsU0FBUyxHQUFHQyxPQUFPLENBQUMsV0FBRCxDQUF2Qjs7QUFDQUMsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLGNBQWMsRUFBRSxDQUFDSixFQUFFLENBQUNLLFdBQUosQ0FEUjtBQUVSQyxJQUFBQSxVQUFVLEVBQUVOLEVBQUUsQ0FBQ08sTUFGUDtBQUdSQyxJQUFBQSxXQUFXLEVBQUVSLEVBQUUsQ0FBQ1M7QUFIUixHQUhQO0FBUUxDLEVBQUFBLFFBQVEsRUFBRSxrQkFBVUMsV0FBVixFQUF1QkMsVUFBdkIsRUFBbUM7QUFDekMsU0FBS0MsYUFBTCxHQUFxQmIsRUFBRSxDQUFDYyxJQUFILENBQVEsU0FBUixFQUFtQkMsWUFBbkIsQ0FBZ0MsWUFBaEMsQ0FBckI7QUFDQSxTQUFLQyxhQUFMLEdBQXFCaEIsRUFBRSxDQUFDYyxJQUFILENBQVEsU0FBUixFQUFtQkMsWUFBbkIsQ0FBZ0MsWUFBaEMsQ0FBckI7QUFDQSxTQUFLRSxhQUFMLEdBQXFCakIsRUFBRSxDQUFDYyxJQUFILENBQVEsZUFBUixFQUF5QkMsWUFBekIsQ0FBc0MsZUFBdEMsQ0FBckI7QUFDQSxTQUFLSixXQUFMLEdBQW1CQSxXQUFuQjtBQUNBLFNBQUtILFdBQUwsQ0FBaUJVLE1BQWpCLEdBQTBCLElBQTFCO0FBQ0EsU0FBS1osVUFBTCxDQUFnQmEsV0FBaEIsR0FBOEIsS0FBS2YsY0FBTCxDQUFvQk8sV0FBcEIsQ0FBOUI7QUFDQSxTQUFLUyxJQUFMLENBQVVDLFdBQVYsQ0FBc0JULFVBQVUsQ0FBQ1UsUUFBWCxDQUFvQkMsQ0FBMUMsRUFBNkNYLFVBQVUsQ0FBQ1UsUUFBWCxDQUFvQkUsQ0FBcEIsR0FBd0IsRUFBckU7QUFDSCxHQWhCSTtBQWlCTEMsRUFBQUEsTUFqQkssb0JBaUJJLENBR1IsQ0FwQkk7QUFzQkxDLEVBQUFBLEtBdEJLLG1CQXNCRyxDQUVQLENBeEJJLENBMEJMOztBQTFCSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgdXNlcl9kYXRhID0gcmVxdWlyZShcInVzZXJfZGF0YVwiKTtcbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGljb25fZnJhbWVfYXJyOiBbY2MuU3ByaXRlRnJhbWVdLFxuICAgICAgICBpY29uX2ZyYW1lOiBjYy5TcHJpdGUsXG4gICAgICAgIGxpZ2h0X2dyb3VwOiBjYy5Ob2RlLFxuICAgIH0sXG4gICAgaW5pX25vZGU6IGZ1bmN0aW9uIChwbGFudF9pbmRleCwgc3RhcnRfbm9kZSkge1xuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJnYW1lX3NjZW5lXCIpO1xuICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJnYW1lX3J1bGVzXCIpO1xuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wgPSBjYy5maW5kKFwic291bmRfY29udHJvbFwiKS5nZXRDb21wb25lbnQoXCJzb3VuZF9jb250cm9sXCIpO1xuICAgICAgICB0aGlzLnBsYW50X2luZGV4ID0gcGxhbnRfaW5kZXg7XG4gICAgICAgIHRoaXMubGlnaHRfZ3JvdXAuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2FycltwbGFudF9pbmRleF07XG4gICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbihzdGFydF9ub2RlLnBvc2l0aW9uLngsIHN0YXJ0X25vZGUucG9zaXRpb24ueSArIDUwKTtcbiAgICB9LFxuICAgIG9uTG9hZCgpIHtcblxuXG4gICAgfSxcblxuICAgIHN0YXJ0KCkge1xuXG4gICAgfSxcblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxufSk7XG4iXX0=
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
    this.sound_control.play_sound_effect("main_button_click");
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
          }

          this.unschedule(callback);
          this.set_ex_progress();
          this.add_ex_anim = 0;
        }

        ;
      };

      this.schedule(callback, 0.03);
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

    this.schedule(this.wareHouse_shcedule, 0.5);
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

    this.schedule(callback, 10, cc.macro.REPEAT_FOREVER);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lX3J1bGVzLmpzIl0sIm5hbWVzIjpbInVzZXJfZGF0YSIsInJlcXVpcmUiLCJjb25maWciLCJwdXNoIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJsYW5kX3ByZWZhYiIsIlByZWZhYiIsImxhbmRfZ3JvdXBfbm9kZSIsIk5vZGUiLCJjZW50ZXJfbm9kZSIsImdvbGRfbGFiZWwiLCJMYWJlbCIsImV4X2xhYmVsIiwibGV2ZWxfbGFiZWwiLCJnb2xkX3Byb2dyZXNzX25vZGUiLCJQcm9ncmVzc0JhciIsImV4X3Byb2dyZXNzX25vZGUiLCJwbGF5ZXJfcHJlZmFiIiwic3RhZmZfcHJlZmFiX2FyciIsIndhcmVIb3VzZV9ub2RlIiwibWFpbl9jYW1lcmEiLCJ0aXBzX2dyb3VwX25vZGUiLCJidXR0b25fZ3JvdXBfbm9kZSIsImhvdGVsX3Byb2R1Y2Vfbm9kZSIsInZpZGVvdGFwZV9idXR0b24iLCJ2aWRlb3RhcGVfYnV0dG9uX2FyciIsIlNwcml0ZUZyYW1lIiwib25fd2F0ZXJpbmdfYnV0dG9uX2NsaWNrIiwic291bmRfY29udHJvbCIsInBsYXlfc291bmRfZWZmZWN0Iiwibm9kZSIsImdhbWVfc2NlbmVfanMiLCJjcmVhdGVfYnV0dG9uX2dyb3VwIiwiekluZGV4IiwiZ2V0Q29tcG9uZW50IiwiaW5pX25vZGUiLCJvbl90aWxsX2J1dHRvbl9jbGljayIsIm9uX3N0dWR5X2J1dHRvbl9jbGljayIsImNyZWF0ZV9zdHVkeV91aSIsIm9uX2hvbWVfYnV0dG9uX2NsaWNrIiwiY3JlYXRlX29wdGlvbl91aSIsIm9uX3BldF9idXR0b25fY2xpY2siLCJjcmVhdGVfcGV0X3VpIiwib25faG90ZWxfYnV0dG9uX2NsaWNrIiwiY3JlYXRlX2hvdGVsX3VpIiwib25fc3RhZmZfYnV0dG9uX2NsaWNrIiwiY3JlYXRlX3N0YWZmX3VpIiwiY3JlYXRlX2xhbmQiLCJhcnIiLCJPYmplY3QiLCJrZXlzIiwibGFuZCIsImkiLCJsZW5ndGgiLCJpbnN0YW50aWF0ZSIsInBhcmVudCIsImNyZWF0ZV9wbGF5ZXIiLCJjcmVhdGVfc3RhZmYiLCJzdGFmZl9pbmRleCIsInN0YWZmIiwiaGF2ZSIsImNoaWxkcmVuIiwiYWRkX2dvbGQiLCJudW0iLCJhZGRfZ29sZF9hbmltIiwidGltZUNvdW50IiwiZ29sZCIsImdvbGRfbWF4Iiwic2tpbGwiLCJjYWxsYmFjayIsIlBudW0iLCJwYXJzZUludCIsInN0cmluZyIsImNyZWF0ZV90aXBzX3VpIiwidW5zY2hlZHVsZSIsInNldF9nb2xkX3Byb2dyZXNzIiwic2NoZWR1bGUiLCJhZGRfZXgiLCJhZGRfZXhfYW5pbSIsImV4Iiwibm93X2V4IiwibmV4dF9leCIsImxldmVsIiwic2tpbGxfcG9pbnQiLCJzZXRfZXhfcHJvZ3Jlc3MiLCJ0d2VlbiIsInRvIiwicHJvZ3Jlc3MiLCJzdGFydCIsIm9uX3dhcmVIb3VzZV9jbGljayIsImNyZWF0ZV9zZWxsX3VpIiwid2FyZUhvdXNlX2Z1bGwiLCJ3YXJlSG91c2Vfc2hjZWR1bGUiLCJ3YXJlSG91c2UiLCJhbGxfY2FwYWNpdHkiLCJ3YXJlSG91c2VfbGV2ZWwiLCJjb3VudCIsImdldENoaWxkQnlOYW1lIiwiYWN0aXZlIiwib25fb3JjaGFyZF9idXR0b25fY2xpY2siLCJhdXRvX3NhdmUiLCJmeCIsInNhdmUiLCJtYWNybyIsIlJFUEVBVF9GT1JFVkVSIiwidXBkYXRhX2xhbmQiLCJsYW5kX2luZGV4Iiwic2F2ZV9sb2dpbl90aW1lIiwibG9naW5fdGltZSIsIkRhdGUiLCJnZXRUaW1lIiwib2ZmbGluZV9wcm9maXRfdWkiLCJub3dfdGltZSIsIm1pbiIsIk1hdGgiLCJmbG9vciIsImNyZWF0ZV9vZmZsaW5lX3Byb2ZpdF91aSIsIm9uX3Nob3BfYnV0dG9uX2NsaWNrIiwiY3JlYXRlX3Nob3BfdWkiLCJjcmVhdGVfbm92aWNlIiwibm92aWNlIiwiY3JlYXRlX25vdmljZV91aSIsImNyZWF0ZV9idXR0b25fdGlwcyIsInBvc2l0aW9uIiwic3R1ZHlfdWlfdGlwcyIsInN0YWZmX3VpX3RpcHMiLCJzaG9wX3VpX3RpcHMiLCJzaG9wX3VpX2NhbGxiYWNrIiwibGFuZF9hcnIiLCJwbGFudF9hcnIiLCJwbGFudCIsImNvc3QiLCJuZWVkX2xldmVsIiwiaiIsInN0ZHV5X3RpcHNfY2FsbGJhY2siLCJzdGFmZl90aXBzX2NhbGxiYWNrIiwiY3JlYXRlX3BldCIsInBldCIsImNyZWF0ZV9wZXRfYSIsImluZGV4Iiwib25fZ2V0X2hvdGVsX3Byb2R1Y2VfY2xpY2siLCJlIiwidGFyZ2V0IiwiY3JlYXRlX2dvbGRfZWZmZWN0IiwiaG90ZWxfY2FjaGVfZ29sZCIsInVwZGF0ZV9ob3RlbF9wcm9kdWNlIiwibGFiZWwiLCJob3RlbF9idXlfcm9vbSIsInJvb21faW5kZXgiLCJob3RlbF8wIiwiaG90ZWxfMSIsImhvdGVsXzIiLCJob3RlbF8zIiwiaW5pX2hvdGVsX3Byb2R1Y2UiLCJob3RlbCIsImhvdGVsXzBfc2NoZWR1bGUiLCJwcm9kdWNlX3RpbWUiLCJwcm9kdWNlIiwiaG90ZWxfMV9zY2hlZHVsZSIsImhvdGVsXzJfc2NoZWR1bGUiLCJob3RlbF8zX3NjaGVkdWxlIiwianVkZ2VfZGF0ZSIsIm5vd19kYXRlIiwiZ2V0RGF0ZSIsInNhdmVfZGF0ZSIsInNoYXJlX2NvdW50IiwidW5kZWZpbmVkIiwiaW5pX3ZpZGVvdGFwZSIsInZpZGVvdGFwZV9wYXRoIiwidmlkZW90YXBlX3N0YXJ0X3RpbWUiLCJ2aWRlb3RhcGVfc3RhdGUiLCJvbl92aWRlb3RhcGVfYnV0dG9uX2NsaWNrIiwiY3JlYXRlX3ZpZGVvdGFwZV91aSIsInZpZGVvdGFwZV90aW1lIiwic3RvcF92aWRlb3RhcGUiLCJzdGFydF92aWRlb3RhcGUiLCJ3eCIsInZpZGVvdGFwZV90aW1lQ29udHJvbCIsIlNwcml0ZSIsInNwcml0ZUZyYW1lIiwicmVjb3JkZXIiLCJnZXRHYW1lUmVjb3JkZXJNYW5hZ2VyIiwib25TdGFydCIsInJlcyIsImR1cmF0aW9uIiwib25TdG9wIiwidmlkZW9QYXRoIiwic3RvcCIsInRpbWVfY291bnQiLCJsb2FkIiwibWFuYWdlciIsImRpcmVjdG9yIiwiZ2V0Q29sbGlzaW9uTWFuYWdlciIsImVuYWJsZWQiLCJwbGF5X2JnX3NvdW5kIiwib25fdGVzdF9idXR0b25fY2xpY2siLCJjdXN0b20iLCJvbkxvYWQiLCJmaW5kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUdBOzs7O0FBSEEsSUFBSUEsU0FBUyxHQUFHQyxPQUFPLENBQUMsV0FBRCxDQUF2Qjs7QUFDQSxJQUFJQyxNQUFNLEdBQUdELE9BQU8sQ0FBQyxRQUFELENBQXBCOztBQUNBLElBQUlFLElBQUksR0FBR0YsT0FBTyxDQUFDLE1BQUQsQ0FBbEI7O0FBRUFHLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxXQUFXLEVBQUVKLEVBQUUsQ0FBQ0ssTUFEUjtBQUVSQyxJQUFBQSxlQUFlLEVBQUVOLEVBQUUsQ0FBQ08sSUFGWjtBQUdSQyxJQUFBQSxXQUFXLEVBQUVSLEVBQUUsQ0FBQ08sSUFIUjtBQUlSRSxJQUFBQSxVQUFVLEVBQUVULEVBQUUsQ0FBQ1UsS0FKUDtBQUtSQyxJQUFBQSxRQUFRLEVBQUVYLEVBQUUsQ0FBQ1UsS0FMTDtBQU1SRSxJQUFBQSxXQUFXLEVBQUVaLEVBQUUsQ0FBQ1UsS0FOUjtBQU9SRyxJQUFBQSxrQkFBa0IsRUFBRWIsRUFBRSxDQUFDYyxXQVBmO0FBUVJDLElBQUFBLGdCQUFnQixFQUFFZixFQUFFLENBQUNjLFdBUmI7QUFTUkUsSUFBQUEsYUFBYSxFQUFFaEIsRUFBRSxDQUFDSyxNQVRWO0FBVVJZLElBQUFBLGdCQUFnQixFQUFFLENBQUNqQixFQUFFLENBQUNLLE1BQUosQ0FWVjtBQVdSYSxJQUFBQSxjQUFjLEVBQUVsQixFQUFFLENBQUNPLElBWFg7QUFZUlksSUFBQUEsV0FBVyxFQUFFbkIsRUFBRSxDQUFDTyxJQVpSO0FBYVJhLElBQUFBLGVBQWUsRUFBRXBC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Q0E1b0JJLENBOG9CTDs7QUE5b0JLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciB1c2VyX2RhdGEgPSByZXF1aXJlKFwidXNlcl9kYXRhXCIpO1xudmFyIGNvbmZpZyA9IHJlcXVpcmUoXCJjb25maWdcIik7XG52YXIgcHVzaCA9IHJlcXVpcmUoXCJwdXNoXCIpO1xuaW1wb3J0IGZ4IGZyb20gXCJmeFwiO1xuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgbGFuZF9wcmVmYWI6IGNjLlByZWZhYixcbiAgICAgICAgbGFuZF9ncm91cF9ub2RlOiBjYy5Ob2RlLFxuICAgICAgICBjZW50ZXJfbm9kZTogY2MuTm9kZSxcbiAgICAgICAgZ29sZF9sYWJlbDogY2MuTGFiZWwsXG4gICAgICAgIGV4X2xhYmVsOiBjYy5MYWJlbCxcbiAgICAgICAgbGV2ZWxfbGFiZWw6IGNjLkxhYmVsLFxuICAgICAgICBnb2xkX3Byb2dyZXNzX25vZGU6IGNjLlByb2dyZXNzQmFyLFxuICAgICAgICBleF9wcm9ncmVzc19ub2RlOiBjYy5Qcm9ncmVzc0JhcixcbiAgICAgICAgcGxheWVyX3ByZWZhYjogY2MuUHJlZmFiLFxuICAgICAgICBzdGFmZl9wcmVmYWJfYXJyOiBbY2MuUHJlZmFiXSxcbiAgICAgICAgd2FyZUhvdXNlX25vZGU6IGNjLk5vZGUsXG4gICAgICAgIG1haW5fY2FtZXJhOiBjYy5Ob2RlLFxuICAgICAgICB0aXBzX2dyb3VwX25vZGU6IGNjLk5vZGUsXG4gICAgICAgIGJ1dHRvbl9ncm91cF9ub2RlOiBjYy5Ob2RlLFxuICAgICAgICBob3RlbF9wcm9kdWNlX25vZGU6IGNjLk5vZGUsXG4gICAgICAgIHZpZGVvdGFwZV9idXR0b246IGNjLk5vZGUsXG4gICAgICAgIHZpZGVvdGFwZV9idXR0b25fYXJyOiBbY2MuU3ByaXRlRnJhbWVdLFxuICAgIH0sXG5cblxuICAgIC8v5rWH5rC05oyJ6ZKu6KKr54K55Ye7XG4gICAgb25fd2F0ZXJpbmdfYnV0dG9uX2NsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcIm1haW5fYnV0dG9uX2NsaWNrXCIpO1xuICAgICAgICB2YXIgbm9kZSA9IHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfYnV0dG9uX2dyb3VwKHRoaXMuY2VudGVyX25vZGUpO1xuICAgICAgICBub2RlLnpJbmRleCA9IDM7XG4gICAgICAgIGlmIChub2RlICE9IG51bGwpIHtcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiYnV0dG9uX21vcmVcIikuaW5pX25vZGUoXCJ3YXRlcmluZ1wiKTtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIC8v6ICV5Zyw5oyJ6ZKu6KKr54K55Ye7XG4gICAgb25fdGlsbF9idXR0b25fY2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwibWFpbl9idXR0b25fY2xpY2tcIik7XG4gICAgICAgIHZhciBub2RlID0gdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9idXR0b25fZ3JvdXAodGhpcy5jZW50ZXJfbm9kZSk7XG4gICAgICAgIG5vZGUuekluZGV4ID0gMztcbiAgICAgICAgaWYgKG5vZGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJidXR0b25fbW9yZVwiKS5pbmlfbm9kZShcInRpbGxcIik7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvL+WtpuS5oOaMiemSruiiq+eCueWHu1xuICAgIG9uX3N0dWR5X2J1dHRvbl9jbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJtYWluX2J1dHRvbl9jbGlja1wiKTtcbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3N0dWR5X3VpKHRoaXMubm9kZSk7XG4gICAgICAgIGlmIChub2RlICE9IG51bGwpIHtcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwic3R1ZHlfdWlcIikuaW5pX25vZGUoKTtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIC8vaG9tZSDooqvngrnlh7vml7ZcbiAgICBvbl9ob21lX2J1dHRvbl9jbGljaygpIHtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX29wdGlvbl91aSgpO1xuICAgIH0sXG4gICAgLy/lrqDnianmjInpkq7ooqvngrnlh7tcbiAgICBvbl9wZXRfYnV0dG9uX2NsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcIm1haW5fYnV0dG9uX2NsaWNrXCIpO1xuICAgICAgICB2YXIgbm9kZSA9IHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfcGV0X3VpKHRoaXMubm9kZSk7XG4gICAgICAgIGlmIChub2RlICE9IG51bGwpIHtcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwicGV0X3VpXCIpLmluaV9ub2RlKCk7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvL+aXhemmhuaMiemSruiiq+eCueWHu1xuICAgIG9uX2hvdGVsX2J1dHRvbl9jbGljaygpIHtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX2hvdGVsX3VpKCk7XG4gICAgfSxcbiAgICAvL+mbh+S9o+WRmOW3pVxuICAgIG9uX3N0YWZmX2J1dHRvbl9jbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJtYWluX2J1dHRvbl9jbGlja1wiKTtcbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3N0YWZmX3VpKHRoaXMubm9kZSk7XG4gICAgICAgIGlmIChub2RlICE9IG51bGwpIHtcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwic3RhZmZfdWlcIikuaW5pX25vZGUoKTtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIC8v55Sf5oiQ5Zyf5ZywXG4gICAgY3JlYXRlX2xhbmQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFyciA9IE9iamVjdC5rZXlzKHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMubGFuZF9wcmVmYWIpO1xuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLmxhbmRfZ3JvdXBfbm9kZTtcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwibGFuZFwiKS5pbmlfbm9kZShpKTtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIC8v5Yib5bu6546p5a625bCP5Lq6XG4gICAgY3JlYXRlX3BsYXllcjogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGxheWVyX3ByZWZhYik7XG4gICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5jZW50ZXJfbm9kZTtcbiAgICB9LFxuICAgIC8v5Yib5bu65L2j5Lq6XG4gICAgY3JlYXRlX3N0YWZmOiBmdW5jdGlvbiAoc3RhZmZfaW5kZXgpIHtcbiAgICAgICAgaWYgKHN0YWZmX2luZGV4ID09IG51bGwpIHtcbiAgICAgICAgICAgIHZhciBhcnIgPSBPYmplY3Qua2V5cyh1c2VyX2RhdGEudXNlcl9kYXRhLnN0YWZmKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEuc3RhZmZbaV0uaGF2ZSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5zdGFmZl9wcmVmYWJfYXJyW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLmxhbmRfZ3JvdXBfbm9kZS5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJzdGFmZl9haVwiKS5pbmlfbm9kZShpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuc3RhZmZfcHJlZmFiX2FycltzdGFmZl9pbmRleF0pO1xuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLmxhbmRfZ3JvdXBfbm9kZS5jaGlsZHJlbltzdGFmZl9pbmRleF07XG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcInN0YWZmX2FpXCIpLmluaV9ub2RlKHN0YWZmX2luZGV4KTtcbiAgICAgICAgfTtcblxuICAgIH0sXG4gICAgLy/liLfmlrDph5HluIHmlbBcbiAgICBhZGRfZ29sZDogZnVuY3Rpb24gKG51bSkge1xuICAgICAgICBpZiAodGhpcy5hZGRfZ29sZF9hbmltID09IDApIHtcbiAgICAgICAgICAgIHRoaXMuYWRkX2dvbGRfYW5pbSA9IDE7XG4gICAgICAgICAgICB2YXIgdGltZUNvdW50ID0gMTA7XG4gICAgICAgICAgICB2YXIgZ29sZCA9IHVzZXJfZGF0YS51c2VyX2RhdGEuZ29sZDtcbiAgICAgICAgICAgIHZhciBnb2xkX21heCA9IDUwMCAqIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxbXCJnb2xkX21heFwiXSArIDUwMDtcbiAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgUG51bSA9IHBhcnNlSW50KG51bSAvIHRpbWVDb3VudClcbiAgICAgICAgICAgICAgICB0aW1lQ291bnQtLTtcbiAgICAgICAgICAgICAgICB0aGlzLmdvbGRfbGFiZWwuc3RyaW5nID0gZ29sZCArIFBudW0gKyBcIi9cIiArIGdvbGRfbWF4O1xuICAgICAgICAgICAgICAgIGlmICh0aW1lQ291bnQgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQgKz0gbnVtO1xuICAgICAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkID4gZ29sZF9tYXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcInVuX2NsaWNrXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMubm9kZSwgXCJnb2xkX2Z1bGxcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQgPSBnb2xkX21heDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdvbGRfbGFiZWwuc3RyaW5nID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkICsgXCIvXCIgKyBnb2xkX21heDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRfZ29sZF9wcm9ncmVzcygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZF9nb2xkX2FuaW0gPSAwO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZShjYWxsYmFjaywgMC4wMyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQgKz0gbnVtO1xuICAgICAgICB9O1xuXG4gICAgfSxcbiAgICAvL+WIt+aWsGV45pWwXG4gICAgYWRkX2V4OiBmdW5jdGlvbiAobnVtKSB7XG4gICAgICAgIGlmICh0aGlzLmFkZF9leF9hbmltID09IDApIHtcbiAgICAgICAgICAgIHRoaXMuYWRkX2V4X2FuaW0gPSAxO1xuICAgICAgICAgICAgdmFyIHRpbWVDb3VudCA9IDEwO1xuICAgICAgICAgICAgdmFyIGV4ID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5ub3dfZXg7XG4gICAgICAgICAgICB2YXIgbmV4dF9leCA9IDIgKiB1c2VyX2RhdGEudXNlcl9kYXRhLmxldmVsO1xuICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBQbnVtID0gcGFyc2VJbnQobnVtIC8gdGltZUNvdW50KVxuICAgICAgICAgICAgICAgIHRpbWVDb3VudC0tO1xuICAgICAgICAgICAgICAgIHRoaXMuZXhfbGFiZWwuc3RyaW5nID0gZXggKyBQbnVtICsgXCIvXCIgKyBuZXh0X2V4O1xuICAgICAgICAgICAgICAgIGlmICh0aW1lQ291bnQgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLm5vd19leCArPSBudW07XG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLm5vd19leCA+IG5leHRfZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubm93X2V4ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubGV2ZWwrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxfcG9pbnQrKztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUoY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldF9leF9wcm9ncmVzcygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZF9leF9hbmltID0gMDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUoY2FsbGJhY2ssIDAuMDMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5ub3dfZXggKz0gbnVtO1xuICAgICAgICB9O1xuXG4gICAgfSxcbiAgICBzZXRfZ29sZF9wcm9ncmVzczogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZ29sZCA9IHVzZXJfZGF0YS51c2VyX2RhdGEuZ29sZDtcbiAgICAgICAgdmFyIGdvbGRfbWF4ID0gNTAwICogdXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbFtcImdvbGRfbWF4XCJdICsgNTAwO1xuICAgICAgICB0aGlzLmdvbGRfbGFiZWwuc3RyaW5nID0gZ29sZCArIFwiL1wiICsgZ29sZF9tYXg7XG4gICAgICAgIGNjLnR3ZWVuKHRoaXMuZ29sZF9wcm9ncmVzc19ub2RlKVxuICAgICAgICAgICAgLnRvKDAuMywgeyBwcm9ncmVzczogZ29sZCAvIGdvbGRfbWF4IH0pXG4gICAgICAgICAgICAuc3RhcnQoKTtcbiAgICB9LFxuICAgIHNldF9leF9wcm9ncmVzczogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbm93X2V4ID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5ub3dfZXg7XG4gICAgICAgIHZhciBuZXh0X2V4ID0gMiAqIHVzZXJfZGF0YS51c2VyX2RhdGEubGV2ZWw7XG4gICAgICAgIHRoaXMubGV2ZWxfbGFiZWwuc3RyaW5nID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5sZXZlbDtcbiAgICAgICAgdGhpcy5leF9sYWJlbC5zdHJpbmcgPSBub3dfZXggKyBcIi9cIiArIG5leHRfZXg7XG4gICAgICAgIGNjLnR3ZWVuKHRoaXMuZXhfcHJvZ3Jlc3Nfbm9kZSlcbiAgICAgICAgICAgIC50bygwLjMsIHsgcHJvZ3Jlc3M6IG5vd19leCAvIG5leHRfZXggfSlcbiAgICAgICAgICAgIC5zdGFydCgpO1xuICAgIH0sXG4gICAgLy/ku5PlupPooqvngrnlh7tcbiAgICBvbl93YXJlSG91c2VfY2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xuICAgICAgICB2YXIgbm9kZSA9IHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfc2VsbF91aSh0aGlzLm5vZGUpO1xuICAgICAgICBpZiAobm9kZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcInNlbGxfdWlcIikuaW5pX25vZGUoKTtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIC8v5LuT5bqT5bey5ruhXG4gICAgd2FyZUhvdXNlX2Z1bGw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy9cbiAgICAgICAgdGhpcy53YXJlSG91c2Vfc2hjZWR1bGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgYXJyID0gT2JqZWN0LmtleXModXNlcl9kYXRhLnVzZXJfZGF0YS53YXJlSG91c2UpO1xuICAgICAgICAgICAgdmFyIGFsbF9jYXBhY2l0eSA9IHVzZXJfZGF0YS51c2VyX2RhdGEud2FyZUhvdXNlX2xldmVsICogY29uZmlnLndhcmVIb3VzZVtcImFsbF9jYXBhY2l0eVwiXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEud2FyZUhvdXNlW2ldLmNvdW50ID49IGFsbF9jYXBhY2l0eSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLndhcmVIb3VzZV9ub2RlLmdldENoaWxkQnlOYW1lKFwid2FyZUhvdXNlX2Z1bGxcIikuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2FyZUhvdXNlX25vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ3YXJlSG91c2VfZnVsbFwiKS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLndhcmVIb3VzZV9zaGNlZHVsZSwgMC41KTtcbiAgICB9LFxuICAgIC8v5p6c5Zut6KKr54K55Ye7XG4gICAgb25fb3JjaGFyZF9idXR0b25fY2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfYmdfc291bmQoXCJ2aWxsYWdlX2JnXCIpO1xuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJ1bl9jbGlja1wiKTtcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMubm9kZSwgXCJ1bl9kZXZlbG9wXCIpO1xuICAgIH0sXG4gICAgLy/oh6rliqjlrZjmoaNcbiAgICBhdXRvX3NhdmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZnguc2F2ZSgpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNjaGVkdWxlKGNhbGxiYWNrLCAxMCwgY2MubWFjcm8uUkVQRUFUX0ZPUkVWRVIpO1xuICAgIH0sXG4gICAgLy/liLfmlrDlnJ/lnLBcbiAgICB1cGRhdGFfbGFuZDogZnVuY3Rpb24gKGxhbmRfaW5kZXgpIHtcbiAgICAgICAgLy/liJ3lp4vljJblnJ/lnLDnirbmgIFcbiAgICAgICAgdGhpcy5sYW5kX2dyb3VwX25vZGUuY2hpbGRyZW5bbGFuZF9pbmRleF0uZ2V0Q29tcG9uZW50KFwibGFuZFwiKS5pbmlfbm9kZShsYW5kX2luZGV4KTtcbiAgICB9LFxuICAgIC8v6K6w5b2V5LiK57q/5pe26Ze0XG4gICAgc2F2ZV9sb2dpbl90aW1lOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmxvZ2luX3RpbWUgPT0gMCkge1xuICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5sb2dpbl90aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvL+WIm+W7uuemu+e6v+aUtuebinVpXG4gICAgb2ZmbGluZV9wcm9maXRfdWk6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGxvZ2luX3RpbWUgPSB1c2VyX2RhdGEudXNlcl9kYXRhLmxvZ2luX3RpbWU7XG4gICAgICAgIHZhciBub3dfdGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICB2YXIgbWluID0gTWF0aC5mbG9vcigobm93X3RpbWUgLSBsb2dpbl90aW1lKSAvICgxMDAwICogNjApKTtcbiAgICAgICAgaWYgKG1pbiA+PSA1KSB7XG4gICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX29mZmxpbmVfcHJvZml0X3VpKHRoaXMubm9kZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvL+S6kuaOqOaMiemSruiiq+eCueWHu1xuICAgIC8vIG9uX3B1c2hfYnV0dG9uX2NsaWNrOiBmdW5jdGlvbiAoZSwgbmFtZSkge1xuICAgIC8vICAgICBpZiAodHlwZW9mICh3eCkgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAvLyAgICAgICAgIHd4Lm5hdmlnYXRlVG9NaW5pUHJvZ3JhbSh7XG4gICAgLy8gICAgICAgICAgICAgYXBwSWQ6IHB1c2hbbmFtZV0uYXBwaWQsXG4gICAgLy8gICAgICAgICAgICAgcGF0aDogJycsXG4gICAgLy8gICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8g5omT5byA5oiQ5YqfXG4gICAgLy8gICAgICAgICAgICAgfVxuICAgIC8vICAgICAgICAgfSlcbiAgICAvLyAgICAgfTtcbiAgICAvLyB9LFxuICAgIC8v5ZWG5bqX5oyJ6ZKu6KKr54K55Ye7XG4gICAgb25fc2hvcF9idXR0b25fY2xpY2soKSB7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9jbGlja1wiKTtcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9zaG9wX3VpKCk7XG4gICAgfSxcbiAgICAvL+WIm+W7uuaWsOaJi+W8leWvvFxuICAgIGNyZWF0ZV9ub3ZpY2UoKSB7XG4gICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLm5vdmljZSA9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX25vdmljZV91aSgpO1xuICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5ub3ZpY2UgPSAxO1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgLy/liJvlu7rmjInpkq7mj5DnpLpcbiAgICBjcmVhdGVfYnV0dG9uX3RpcHMoKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5idXR0b25fZ3JvdXBfbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9idXR0b25fdGlwcyh0aGlzLnRpcHNfZ3JvdXBfbm9kZSwgdGhpcy5idXR0b25fZ3JvdXBfbm9kZS5jaGlsZHJlbltpXS5wb3NpdGlvbik7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc3R1ZHlfdWlfdGlwcygpO1xuICAgICAgICB0aGlzLnN0YWZmX3VpX3RpcHMoKTtcbiAgICAgICAgdGhpcy5zaG9wX3VpX3RpcHMoKTtcbiAgICB9LFxuICAgIC8v6LSt5Lmw5ZWG5ZOB5o+Q56S6XG4gICAgc2hvcF91aV90aXBzKCkge1xuICAgICAgICB0aGlzLnNob3BfdWlfY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgbGFuZF9hcnIgPSBPYmplY3Qua2V5cyh1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmQpXG4gICAgICAgICAgICB2YXIgcGxhbnRfYXJyID0gT2JqZWN0LmtleXModXNlcl9kYXRhLnVzZXJfZGF0YS5wbGFudClcbiAgICAgICAgICAgIHZhciBnb2xkID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkO1xuICAgICAgICAgICAgdmFyIGxldmVsID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5sZXZlbDtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFuZF9hcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoZ29sZCA+PSBjb25maWcubGFuZFtpXS5jb3N0ICYmIGxldmVsID49IGNvbmZpZy5sYW5kW2ldLm5lZWRfbGV2ZWwgJiYgdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW2ldLmhhdmUgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpcHNfZ3JvdXBfbm9kZS5jaGlsZHJlblswXS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aXBzX2dyb3VwX25vZGUuY2hpbGRyZW5bMF0uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHBsYW50X2Fyci5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIGlmIChnb2xkID49IGNvbmZpZy5wbGFudFtqXS5jb3N0ICYmIGxldmVsID49IGNvbmZpZy5wbGFudFtqXS5uZWVkX2xldmVsICYmIHVzZXJfZGF0YS51c2VyX2RhdGEucGxhbnRbal0uaGF2ZSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGlwc19ncm91cF9ub2RlLmNoaWxkcmVuWzBdLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpcHNfZ3JvdXBfbm9kZS5jaGlsZHJlblswXS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLnNob3BfdWlfY2FsbGJhY2ssIDEpO1xuICAgIH0sXG4gICAgLy/liqDngrnmj5DnpLpcbiAgICBzdHVkeV91aV90aXBzKCkge1xuICAgICAgICB0aGlzLnN0ZHV5X3RpcHNfY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgc2tpbGxfcG9pbnQgPSB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsX3BvaW50O1xuICAgICAgICAgICAgaWYgKHNraWxsX3BvaW50ID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMudGlwc19ncm91cF9ub2RlLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8v5oqA6IO954K55LiN6Laz5LiN5o+Q56S6XG4gICAgICAgICAgICAgICAgdGhpcy50aXBzX2dyb3VwX25vZGUuY2hpbGRyZW5bMV0uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMuc3RkdXlfdGlwc19jYWxsYmFjaywgMSwgY2MubWFjcm8uUkVQRUFUX0ZPUkVWRVIpO1xuICAgIH0sXG4gICAgLy/pm4fkvaPlt6Xkurrmj5DnpLpcbiAgICBzdGFmZl91aV90aXBzKCkge1xuICAgICAgICB0aGlzLnN0YWZmX3RpcHNfY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgYXJyID0gT2JqZWN0LmtleXModXNlcl9kYXRhLnVzZXJfZGF0YS5zdGFmZik7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIC8v5oul5pyJ6L+Z5Z2X5Zyf5ZywXG4gICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFtpXS5oYXZlID09IDEgJiYgdXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkID49IGNvbmZpZy5zdGFmZltpXS5jb3N0ICYmIHVzZXJfZGF0YS51c2VyX2RhdGEuc3RhZmZbaV0uaGF2ZSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGlwc19ncm91cF9ub2RlLmNoaWxkcmVuWzNdLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpcHNfZ3JvdXBfbm9kZS5jaGlsZHJlblszXS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLnN0YWZmX3RpcHNfY2FsbGJhY2ssIDEsIGNjLm1hY3JvLlJFUEVBVF9GT1JFVkVSKTtcbiAgICB9LFxuICAgIC8v5Yib5bu65a6g54mpXG4gICAgY3JlYXRlX3BldCgpIHtcbiAgICAgICAgdmFyIGFyciA9IE9iamVjdC5rZXlzKHVzZXJfZGF0YS51c2VyX2RhdGEucGV0KTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLnBldFtpXS5oYXZlID09IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3BldCh0aGlzLmNlbnRlcl9ub2RlLCBpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvL+WNleS4quWIm+W7uuWuoOeJqVxuICAgIGNyZWF0ZV9wZXRfYShpbmRleCkge1xuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3BldCh0aGlzLmNlbnRlcl9ub2RlLCBpbmRleCk7XG4gICAgfSxcblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgIC8v6aKG5Y+W5pS255uKXG4gICAgb25fZ2V0X2hvdGVsX3Byb2R1Y2VfY2xpY2soZSkge1xuICAgICAgICB2YXIgbm9kZSA9IGUudGFyZ2V0O1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9nb2xkX2VmZmVjdChub2RlLCBpLCAwKTtcbiAgICAgICAgfTtcbiAgICAgICAgbm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5hZGRfZ29sZCh1c2VyX2RhdGEudXNlcl9kYXRhLmhvdGVsX2NhY2hlX2dvbGQpO1xuICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmhvdGVsX2NhY2hlX2dvbGQgPSAwO1xuICAgIH0sXG4gICAgLy/liLfmlrDml4XppobmlLbnm4pcbiAgICB1cGRhdGVfaG90ZWxfcHJvZHVjZSgpIHtcbiAgICAgICAgLy8xc+abtOaWsOS4gOasoeaVsOaNrlxuICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgaG90ZWxfY2FjaGVfZ29sZCA9IHVzZXJfZGF0YS51c2VyX2RhdGEuaG90ZWxfY2FjaGVfZ29sZDtcbiAgICAgICAgICAgIGlmIChob3RlbF9jYWNoZV9nb2xkID09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhvdGVsX3Byb2R1Y2Vfbm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ob3RlbF9wcm9kdWNlX25vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB2YXIgbGFiZWwgPSB0aGlzLmhvdGVsX3Byb2R1Y2Vfbm9kZS5nZXRDaGlsZEJ5TmFtZShcImhvdGVsX3Byb2R1Y2VfbGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcbiAgICAgICAgICAgIGxhYmVsLnN0cmluZyA9IGhvdGVsX2NhY2hlX2dvbGQ7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2NoZWR1bGUoY2FsbGJhY2ssIDEsIGNjLm1hY3JvLlJFUEVBVF9GT1JFVkVSKTtcbiAgICB9LFxuICAgIC8v6LSt5Lmw5LiA5Liq5oi/6Ze0XG4gICAgaG90ZWxfYnV5X3Jvb20ocm9vbV9pbmRleCkge1xuICAgICAgICBzd2l0Y2ggKHJvb21faW5kZXgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICB0aGlzLmhvdGVsXzAoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICB0aGlzLmhvdGVsXzEoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICB0aGlzLmhvdGVsXzIoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICB0aGlzLmhvdGVsXzMoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIC8v5Yid5aeL5YyW5peF6aaG5Lqn5Ye6XG4gICAgaW5pX2hvdGVsX3Byb2R1Y2UoKSB7XG5cbiAgICAgICAgLy/lkK/liqjliLfmlrDmlLbnm4pcbiAgICAgICAgdGhpcy51cGRhdGVfaG90ZWxfcHJvZHVjZSgpO1xuXG4gICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmhvdGVsWzBdLmhhdmUgPT0gMSkge1xuICAgICAgICAgICAgdGhpcy5ob3RlbF8wKCk7XG4gICAgICAgIH07XG4gICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmhvdGVsWzFdLmhhdmUgPT0gMSkge1xuICAgICAgICAgICAgdGhpcy5ob3RlbF8xKCk7XG4gICAgICAgIH07XG4gICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmhvdGVsWzJdLmhhdmUgPT0gMSkge1xuICAgICAgICAgICAgdGhpcy5ob3RlbF8yKCk7XG4gICAgICAgIH07XG4gICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmhvdGVsWzNdLmhhdmUgPT0gMSkge1xuICAgICAgICAgICAgdGhpcy5ob3RlbF8zKCk7XG4gICAgICAgIH07XG5cbiAgICB9LFxuICAgIC8vaG90ZWwwIOeUn+aIkFxuICAgIGhvdGVsXzAoKSB7XG4gICAgICAgIHZhciB0aW1lQ291bnQgPSAwO1xuICAgICAgICB0aGlzLmhvdGVsXzBfc2NoZWR1bGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aW1lQ291bnQrKztcbiAgICAgICAgICAgIGlmICh0aW1lQ291bnQgPj0gY29uZmlnLmhvdGVsWzBdLnByb2R1Y2VfdGltZSkge1xuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuaG90ZWxfY2FjaGVfZ29sZCArPSBjb25maWcuaG90ZWxbMF0ucHJvZHVjZTtcbiAgICAgICAgICAgICAgICB0aW1lQ291bnQgPSAwO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLmhvdGVsXzBfc2NoZWR1bGUsIDEsIGNjLm1hY3JvLlJFUEVBVF9GT1JFVkVSKTtcbiAgICB9LFxuICAgIC8vaG90ZWwxIOeUn+aIkFxuICAgIGhvdGVsXzEoKSB7XG4gICAgICAgIHZhciB0aW1lQ291bnQgPSAwO1xuICAgICAgICB0aGlzLmhvdGVsXzFfc2NoZWR1bGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aW1lQ291bnQrKztcbiAgICAgICAgICAgIGlmICh0aW1lQ291bnQgPj0gY29uZmlnLmhvdGVsWzFdLnByb2R1Y2VfdGltZSkge1xuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuaG90ZWxfY2FjaGVfZ29sZCArPSBjb25maWcuaG90ZWxbMV0ucHJvZHVjZTtcbiAgICAgICAgICAgICAgICB0aW1lQ291bnQgPSAwO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLmhvdGVsXzFfc2NoZWR1bGUsIDEsIGNjLm1hY3JvLlJFUEVBVF9GT1JFVkVSKTtcbiAgICB9LFxuICAgIC8vaG90ZWwyIOeUn+aIkFxuICAgIGhvdGVsXzIoKSB7XG4gICAgICAgIHZhciB0aW1lQ291bnQgPSAwO1xuICAgICAgICB0aGlzLmhvdGVsXzJfc2NoZWR1bGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aW1lQ291bnQrKztcbiAgICAgICAgICAgIGlmICh0aW1lQ291bnQgPj0gY29uZmlnLmhvdGVsWzJdLnByb2R1Y2VfdGltZSkge1xuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuaG90ZWxfY2FjaGVfZ29sZCArPSBjb25maWcuaG90ZWxbMl0ucHJvZHVjZTtcbiAgICAgICAgICAgICAgICB0aW1lQ291bnQgPSAwO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLmhvdGVsXzJfc2NoZWR1bGUsIDEsIGNjLm1hY3JvLlJFUEVBVF9GT1JFVkVSKTtcbiAgICB9LFxuICAgIC8vaG90ZWwzIOeUn+aIkFxuICAgIGhvdGVsXzMoKSB7XG4gICAgICAgIHZhciB0aW1lQ291bnQgPSAwO1xuICAgICAgICB0aGlzLmhvdGVsXzNfc2NoZWR1bGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aW1lQ291bnQrKztcbiAgICAgICAgICAgIGlmICh0aW1lQ291bnQgPj0gY29uZmlnLmhvdGVsWzNdLnByb2R1Y2VfdGltZSkge1xuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuaG90ZWxfY2FjaGVfZ29sZCArPSBjb25maWcuaG90ZWxbM10ucHJvZHVjZTtcbiAgICAgICAgICAgICAgICB0aW1lQ291bnQgPSAwO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLmhvdGVsXzNfc2NoZWR1bGUsIDEsIGNjLm1hY3JvLlJFUEVBVF9GT1JFVkVSKTtcbiAgICB9LFxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAvL+WIpOaWreW9k+WJjeaXpeacn1xuICAgIGp1ZGdlX2RhdGUoKSB7XG4gICAgICAgIHZhciBub3dfZGF0ZSA9IG5ldyBEYXRlKCkuZ2V0RGF0ZSgpO1xuICAgICAgICB2YXIgYXJyID0gT2JqZWN0LmtleXModXNlcl9kYXRhLnVzZXJfZGF0YS5wZXQpO1xuICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5zYXZlX2RhdGUgPT0gMCkge1xuICAgICAgICAgICAgLy/mlrDlrZjmoaPorrDlvZXml6XmnJ9cbiAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuc2F2ZV9kYXRlID0gbm93X2RhdGU7XG4gICAgICAgIH0gZWxzZSBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5zYXZlX2RhdGUgIT0gbm93X2RhdGUpIHtcbiAgICAgICAgICAgIC8v5pel5pyf5LiN55u45ZCM77yM6buY6K6k56ys5LqM5aSp5Y+K5Lul5ZCOLOmHjee9ruWIhuS6q+asoeaVsFxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbaV0uc2hhcmVfY291bnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnBldFtpXS5zaGFyZV9jb3VudCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIC8vIHVzZXJfZGF0YS51c2VyX2RhdGEudmlkZW90YXBlX3NoYXJlX2NvdW50ID0gMDtcblxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5zYXZlX2RhdGUgPSBub3dfZGF0ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8v5pel5pyf5Li65ZCM5LiA5aSpXG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgICAvL+WIneWni+WMluW9leWxj+WKn+iDvVxuICAgIGluaV92aWRlb3RhcGUoKSB7XG4gICAgICAgIC8v5b2V5bGP55qE5L+d5a2Y6Lev5b6EXG4gICAgICAgIHRoaXMudmlkZW90YXBlX3BhdGggPSBudWxsO1xuICAgICAgICB0aGlzLnZpZGVvdGFwZV9zdGFydF90aW1lID0gMDtcbiAgICAgICAgdGhpcy52aWRlb3RhcGVfc3RhdGUgPSBcInVuc3RhcnRcIjtcbiAgICB9LFxuICAgIG9uX3ZpZGVvdGFwZV9idXR0b25fY2xpY2soKSB7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9jbGlja1wiKTtcbiAgICAgICAgaWYgKHRoaXMudmlkZW90YXBlX3N0YXRlID09IFwidW5zdGFydFwiKSB7XG4gICAgICAgICAgICAvL+acquW8gOWni+i/m+WFpeWlluWKseeVjOmdolxuICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV92aWRlb3RhcGVfdWkoKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnZpZGVvdGFwZV9zdGF0ZSA9PSBcInN0YXJ0XCIpIHtcbiAgICAgICAgICAgIC8v5byA5aeL5ZCO5aSn5LqOM+enkuaJjeiDveWFs+mXrVxuICAgICAgICAgICAgdmFyIG5vd190aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgICAgICB2YXIgdmlkZW90YXBlX3RpbWUgPSBub3dfdGltZSAtIHRoaXMudmlkZW90YXBlX3N0YXJ0X3RpbWU7XG4gICAgICAgICAgICBpZiAodmlkZW90YXBlX3RpbWUgPCAzMDAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMubm9kZSwgXCJ2aWRlb3RhcGVfbm9fdGltZVwiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wX3ZpZGVvdGFwZSgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIC8v5byA5aeL5ri45oiP5b2V5bGPXG4gICAgc3RhcnRfdmlkZW90YXBlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8v6K6w5b2V5LiA5Liq5pe26Ze05oizXG4gICAgICAgIHRoaXMudmlkZW90YXBlX3N0YXJ0X3RpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgaWYgKHR5cGVvZiAod3gpICE9IFwidW5kZWZpbmVkXCIpIHtcblxuICAgICAgICAgICAgdGhpcy52aWRlb3RhcGVfc3RhdGUgPSBcInN0YXJ0XCI7XG4gICAgICAgICAgICB0aGlzLnZpZGVvdGFwZV90aW1lQ29udHJvbCgpO1xuICAgICAgICAgICAgLy/liIfmjaLlvZXlsY/mjInpkq7lm77moIdcbiAgICAgICAgICAgIHRoaXMudmlkZW90YXBlX2J1dHRvbi5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMudmlkZW90YXBlX2J1dHRvbl9hcnJbMV07XG4gICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5ub2RlLCBcInZpZGVvdGFwZV9zdGFydFwiKTtcblxuICAgICAgICAgICAgdGhpcy5yZWNvcmRlciA9IHd4LmdldEdhbWVSZWNvcmRlck1hbmFnZXIoKTtcbiAgICAgICAgICAgIHRoaXMucmVjb3JkZXIub25TdGFydChyZXMgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwi5b2V5bGP5byA5aeLXCIpO1xuICAgICAgICAgICAgICAgIC8vIGRvIHNvbWV0aGluZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5yZWNvcmRlci5zdGFydCh7XG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDYwXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgIH0sXG4gICAgLy/nu5PmnZ/muLjmiI/lvZXlsY9cbiAgICBzdG9wX3ZpZGVvdGFwZTogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodHlwZW9mICh3eCkgIT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgdGhpcy52aWRlb3RhcGVfc3RhdGUgPSBcInVuc3RhcnRcIjtcbiAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLm5vZGUsIFwidmlkb3RhcGVfb3ZlclwiKTtcbiAgICAgICAgICAgIHRoaXMudmlkZW90YXBlX2J1dHRvbi5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMudmlkZW90YXBlX2J1dHRvbl9hcnJbMF07XG5cbiAgICAgICAgICAgIHRoaXMucmVjb3JkZXIub25TdG9wKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzLnZpZGVvUGF0aCwgXCLlvZXlsY/nu5PmnZ9cIik7XG4gICAgICAgICAgICAgICAgLy8gZG8gc29tZXRoaW5lO1xuICAgICAgICAgICAgICAgIHRoaXMudmlkZW90YXBlX3BhdGggPSByZXMudmlkZW9QYXRoO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdmlkZW90YXBlX3VpKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMucmVjb3JkZXIuc3RvcCgpO1xuXG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvL+W9leWxj+aXtumXtOaOp+WItlxuICAgIHZpZGVvdGFwZV90aW1lQ29udHJvbCgpIHtcbiAgICAgICAgdmFyIHRpbWVfY291bnQgPSAwO1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aW1lX2NvdW50Kys7XG4gICAgICAgICAgICAvL+i2hei/h+S6huacgOWkp+aXtumVv+aIluiAheW9leWItueKtuaAgeS4uuacquW8gOWQr1xuICAgICAgICAgICAgaWYgKHRpbWVfY291bnQgPj0gNjAgfHwgdGhpcy52aWRlb3RhcGVfc3RhdGUgPT0gXCJ1bnN0YXJ0XCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUoY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgIHRpbWVfY291bnQgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RvcF92aWRlb3RhcGUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5ub2RlLCBcInZpZG90YXBlX292ZXJcIik7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNjaGVkdWxlKGNhbGxiYWNrLCAxLCBjYy5tYWNyby5SRVBFQVRfRk9SRVZFUik7XG4gICAgfSxcblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgIC8v5Yid5aeL5YyW6IqC54K5XG4gICAgaW5pX25vZGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZngubG9hZCgpO1xuICAgICAgICB0aGlzLmNyZWF0ZV9sYW5kKCk7XG4gICAgICAgIHRoaXMuY3JlYXRlX3BldCgpO1xuICAgICAgICB0aGlzLmFkZF9nb2xkX2FuaW0gPSAwO1xuICAgICAgICB0aGlzLmFkZF9leF9hbmltID0gMDtcbiAgICAgICAgLy/osIPnlKjnorDmkp7mo4DmtYvnu4Tku7ZcbiAgICAgICAgdGhpcy5tYW5hZ2VyID0gY2MuZGlyZWN0b3IuZ2V0Q29sbGlzaW9uTWFuYWdlcigpO1xuICAgICAgICAvL+m7mOiupOeisOaSnuS4uuWFs1xuICAgICAgICB0aGlzLm1hbmFnZXIuZW5hYmxlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuc2V0X2dvbGRfcHJvZ3Jlc3MoKTtcbiAgICAgICAgdGhpcy5zZXRfZXhfcHJvZ3Jlc3MoKTtcbiAgICAgICAgdGhpcy5jcmVhdGVfcGxheWVyKCk7XG4gICAgICAgIHRoaXMuY3JlYXRlX3N0YWZmKCk7XG4gICAgICAgIHRoaXMuYXV0b19zYXZlKCk7XG4gICAgICAgIHRoaXMuc2F2ZV9sb2dpbl90aW1lKCk7XG4gICAgICAgIHRoaXMuY3JlYXRlX2J1dHRvbl90aXBzKCk7XG4gICAgICAgIHRoaXMub2ZmbGluZV9wcm9maXRfdWkoKTtcbiAgICAgICAgdGhpcy5jcmVhdGVfbm92aWNlKCk7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X2JnX3NvdW5kKFwiaG9tZV9iZ1wiKTtcbiAgICAgICAgdGhpcy5pbmlfaG90ZWxfcHJvZHVjZSgpO1xuICAgICAgICB0aGlzLmp1ZGdlX2RhdGUoKTtcbiAgICAgICAgdGhpcy53YXJlSG91c2VfZnVsbCgpO1xuICAgICAgICB0aGlzLmluaV92aWRlb3RhcGUoKTtcbiAgICB9LFxuXG5cblxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgb25fdGVzdF9idXR0b25fY2xpY2soZSwgY3VzdG9tKSB7XG4gICAgICAgIHN3aXRjaCAoY3VzdG9tKSB7XG4gICAgICAgICAgICBjYXNlIFwiMFwiOlxuICAgICAgICAgICAgICAgIHRoaXMuYWRkX2dvbGQodXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbC5nb2xkX21heCAqIDUwMCArIDUwMCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiMVwiOlxuICAgICAgICAgICAgICAgIHRoaXMuYWRkX2V4KDIgKiB1c2VyX2RhdGEudXNlcl9kYXRhLmxldmVsICsgMSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiMlwiOlxuICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLnBldFswXS5oYXZlID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbMF0uaGF2ZSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfcGV0KHRoaXMubm9kZSwgMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLnBldFsxXS5oYXZlID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbMV0uaGF2ZSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfcGV0KHRoaXMubm9kZSwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLnBldFsyXS5oYXZlID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbMl0uaGF2ZSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfcGV0KHRoaXMubm9kZSwgMik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLnBldFszXS5oYXZlID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbM10uaGF2ZSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfcGV0KHRoaXMubm9kZSwgMyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfcGV0KHRoaXMubm9kZSwgMCk7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9wZXQodGhpcy5ub2RlLCAxKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImhhdmUgcGV0IFwiICsgdXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbMF0uaGF2ZSk7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJoYXZlIHBldCBcIiArIHVzZXJfZGF0YS51c2VyX2RhdGEucGV0WzFdLmhhdmUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIjNcIjpcbiAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnBldFsyXS5oYXZlID0gMTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCI0XCI6XG4gICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbMl0uaGF2ZSA9IDA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9zY2VuZVwiKTtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sID0gY2MuZmluZChcInNvdW5kX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwic291bmRfY29udHJvbFwiKTtcbiAgICAgICAgdGhpcy5pbmlfbm9kZSgpO1xuICAgIH0sXG5cbiAgICBzdGFydCgpIHtcblxuICAgIH0sXG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcbn0pO1xuIl19
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


        _this2.game_rules_js.add_ex(1);

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
    cc.log(node.name, "放入节点池");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lX3NjZW5lLmpzIl0sIm5hbWVzIjpbInVzZXJfZGF0YSIsInJlcXVpcmUiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImJ1dHRvbl9ncm91cF9wcmVmYWIiLCJQcmVmYWIiLCJwbGFudF91aV9wcmVmYWIiLCJzZWxsX3VpX3ByZWZhYiIsInRpcHNfdWlfcHJlZmFiIiwibGlnaHRfZWZmZWN0X3ByZWZhYiIsInN0dWR5X3VpX3ByZWZhYiIsInN0YWZmX3VpX3ByZWZhYiIsIm9mZmxpbmVfcHJvZml0X3VpX3ByZWZhYiIsInBldF91aV9wcmVmYWIiLCJhZF9jYXJfcHJlZmFiIiwiYnV0dG9uX3RpcHNfcHJlZmFiIiwicmVzdF91aV9wcmVmYWIiLCJwZXRfcHJlZmFiX2FyciIsImV4X2VmZmVjdF9wcmVmYWIiLCJnaWZ0X3VpX3ByZWZhYiIsIm9wdGlvbl91aV9wcmVmYWIiLCJnb2xkX2VmZmVjdF9wcmVmYWIiLCJub3ZpY2VfdWlfcHJlZmFiIiwiaG90ZWxfdWlfcHJlZmFiIiwic2hvcF91aV9wcmVmYWIiLCJzaG9wX2J1eV91aV9wcmVmYWIiLCJ2aWRlb3RhcGVfdWlfcHJlZmFiIiwibmV3X2J1dHRvbl9ncm91cF9ub2RlX3Bvb2wiLCJidXR0b25fbW9yZV9ub2RlX3Bvb2wiLCJOb2RlUG9vbCIsIm5vZGUiLCJpbnN0YW50aWF0ZSIsInB1dCIsIm5ld19wbGFudF91aV9ub2RlX3Bvb2wiLCJuZXdfdmlkZW90YXBlX3VpX3Bvb2wiLCJuZXdfc2VsbF91aV9ub2RlX3Bvb2wiLCJuZXdfdGlwc191aV9ub2RlX3Bvb2wiLCJjb3VudCIsImkiLCJuZXdfbGlnaHRfZWZmZWN0X3Bvb2wiLCJuZXdfc3R1ZHlfdWlfcG9vbCIsIm5ld19zdGFmZl91aV9wb29sIiwibmV3X3BldF91aV9wb29sIiwibmV3X2V4X2VmZmVjdF9wb29sIiwibmV3X2dvbGRfZWZmZWN0X3Bvb2wiLCJuZXdfb3B0aW9uX3VpX3Bvb2wiLCJuZXdfaG90ZWxfdWlfcG9vbCIsIm5ld19zaG9wX3VpX3Bvb2wiLCJuZXdfc2hvcF9idXlfdWlfcG9vbCIsImNyZWF0ZV9idXR0b25fZ3JvdXAiLCJwYXJlbnROb2RlIiwic2l6ZSIsImdldCIsInBhcmVudCIsImNyZWF0ZV9wbGFudF91aSIsImNyZWF0ZV9zZWxsX3VpIiwiY3JlYXRlX3RpcHNfdWkiLCJ0eXBlIiwibnVtIiwiZ2V0Q29tcG9uZW50IiwiaW5pX25vZGUiLCJjcmVhdGVfc3R1ZHlfdWkiLCJjcmVhdGVfc3RhZmZfdWkiLCJjcmVhdGVfb2ZmbGluZV9wcm9maXRfdWkiLCJjcmVhdGVfcGV0X3VpIiwiY3JlYXRlX2FkX2NhciIsInByaWNlX2RpZmZlcmVuY2UiLCJjcmVhdGVfYnV0dG9uX3RpcHMiLCJwb3NpdGlvbl90YXJnZXQiLCJ4IiwiYWN0aXZlIiwiY3JlYXRlX3Jlc3RfdWkiLCJzdGFmZl9pbmRleCIsImNyZWF0ZV9naWZ0X3VpIiwiY3JlYXRlX3BldCIsImluZGV4IiwiY3JlYXRlX29wdGlvbl91aSIsImNyZWF0ZV9ub3ZpY2VfdWkiLCJjcmVhdGVfaG90ZWxfdWkiLCJjcmVhdGVfc2hvcF9idXlfdWkiLCJzcHJpdGVGcmFtZSIsImNyZWF0ZV9zaG9wX3VpIiwiY3JlYXRlX3ZpZGVvdGFwZV91aSIsImNyZWF0ZV9leF9lZmZlY3QiLCJjcmVhdGVfbm9kZSIsImxldmVsX2ljb24iLCJmaW5kIiwiY19XcG9zIiwiY29udmVydFRvV29ybGRTcGFjZUFSIiwicG9zaXRpb24iLCJjX25Qb3MiLCJjb252ZXJ0VG9Ob2RlU3BhY2VBUiIsInRfV3BvcyIsInRfTnBvcyIsInR3ZWVuIiwidG8iLCJlYXNpbmciLCJjYWxsIiwic291bmRfY29udHJvbCIsInBsYXlfc291bmRfZWZmZWN0IiwiZ2FtZV9ydWxlc19qcyIsImFkZF9leCIsIm9uX25vZGVfa2lsbCIsInN0YXJ0IiwiY3JlYXRlX2xpZ2h0X2VmZmVjdCIsInBsYW50X2luZGV4Iiwic2VsbCIsImRlbGF5IiwiYWxsX2NhcGFjaXR5Iiwid2FyZUhvdXNlX2xldmVsIiwiY29uZmlnIiwid2FyZUhvdXNlIiwiaGF2ZSIsImlkX3Byb2R1Y3QiLCJjcmVhdGVfZ29sZF9lZmZlY3QiLCJhZGRHb2xkIiwiZ29sZF9pY29uIiwieSIsImFkZF9nb2xkIiwibmFtZSIsImxvZyIsIm9uTG9hZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQTs7OztBQURBLElBQUlBLFNBQVMsR0FBR0MsT0FBTyxDQUFDLFdBQUQsQ0FBdkI7O0FBRUFDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxtQkFBbUIsRUFBRUosRUFBRSxDQUFDSyxNQURoQjtBQUVSQyxJQUFBQSxlQUFlLEVBQUVOLEVBQUUsQ0FBQ0ssTUFGWjtBQUdSRSxJQUFBQSxjQUFjLEVBQUVQLEVBQUUsQ0FBQ0ssTUFIWDtBQUlSRyxJQUFBQSxjQUFjLEVBQUVSLEVBQUUsQ0FBQ0ssTUFKWDtBQUtSSSxJQUFBQSxtQkFBbUIsRUFBRVQsRUFBRSxDQUFDSyxNQUxoQjtBQU1SSyxJQUFBQSxlQUFlLEVBQUVWLEVBQUUsQ0FBQ0ssTUFOWjtBQU9STSxJQUFBQSxlQUFlLEVBQUVYLEVBQUUsQ0FBQ0ssTUFQWjtBQVFSTyxJQUFBQSx3QkFBd0IsRUFBRVosRUFBRSxDQUFDSyxNQVJyQjtBQVNSUSxJQUFBQSxhQUFhLEVBQUViLEVBQUUsQ0FBQ0ssTUFUVjtBQVVSUyxJQUFBQSxhQUFhLEVBQUVkLEVBQUUsQ0FBQ0ssTUFWVjtBQVdSVSxJQUFBQSxrQkFBa0IsRUFBRWYsRUFBRSxDQUFDSyxNQVhmO0FBWVJXLElBQUFBLGNBQWMsRUFBRWhCLEVBQUUsQ0FBQ0ssTUFaWDtBQWFSWSxJQUFBQSxjQUFjLEVBQUUsQ0FBQ2pCLEVBQUUsQ0FBQ0ssTUFBSixDQWJSO0FBY1JhLElBQUFBLGdCQUFnQixFQUFFbEIsRUFBRSxDQUFDSyxNQWRiO0FBZVJjLElBQUFBLGNBQWMsRUFBRW5CLEVBQUUs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TUF6Ykssb0JBeWJJO0FBQ0wsU0FBS3JCLGFBQUwsR0FBcUJwRyxFQUFFLENBQUNzRixJQUFILENBQVEsU0FBUixFQUFtQjNCLFlBQW5CLENBQWdDLFlBQWhDLENBQXJCO0FBQ0EsU0FBS3VDLGFBQUwsR0FBcUJsRyxFQUFFLENBQUNzRixJQUFILENBQVEsZUFBUixFQUF5QjNCLFlBQXpCLENBQXNDLGVBQXRDLENBQXJCO0FBQ0EsU0FBS0MsUUFBTDtBQUNILEdBN2JJO0FBK2JMMkMsRUFBQUEsS0EvYkssbUJBK2JHLENBRVAsQ0FqY0ksQ0FtY0w7O0FBbmNLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciB1c2VyX2RhdGEgPSByZXF1aXJlKFwidXNlcl9kYXRhXCIpO1xuaW1wb3J0IGNvbmZpZyBmcm9tIFwiY29uZmlnXCI7XG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBidXR0b25fZ3JvdXBfcHJlZmFiOiBjYy5QcmVmYWIsXG4gICAgICAgIHBsYW50X3VpX3ByZWZhYjogY2MuUHJlZmFiLFxuICAgICAgICBzZWxsX3VpX3ByZWZhYjogY2MuUHJlZmFiLFxuICAgICAgICB0aXBzX3VpX3ByZWZhYjogY2MuUHJlZmFiLFxuICAgICAgICBsaWdodF9lZmZlY3RfcHJlZmFiOiBjYy5QcmVmYWIsXG4gICAgICAgIHN0dWR5X3VpX3ByZWZhYjogY2MuUHJlZmFiLFxuICAgICAgICBzdGFmZl91aV9wcmVmYWI6IGNjLlByZWZhYixcbiAgICAgICAgb2ZmbGluZV9wcm9maXRfdWlfcHJlZmFiOiBjYy5QcmVmYWIsXG4gICAgICAgIHBldF91aV9wcmVmYWI6IGNjLlByZWZhYixcbiAgICAgICAgYWRfY2FyX3ByZWZhYjogY2MuUHJlZmFiLFxuICAgICAgICBidXR0b25fdGlwc19wcmVmYWI6IGNjLlByZWZhYixcbiAgICAgICAgcmVzdF91aV9wcmVmYWI6IGNjLlByZWZhYixcbiAgICAgICAgcGV0X3ByZWZhYl9hcnI6IFtjYy5QcmVmYWJdLFxuICAgICAgICBleF9lZmZlY3RfcHJlZmFiOiBjYy5QcmVmYWIsXG4gICAgICAgIGdpZnRfdWlfcHJlZmFiOiBjYy5QcmVmYWIsXG4gICAgICAgIG9wdGlvbl91aV9wcmVmYWI6IGNjLlByZWZhYixcbiAgICAgICAgZ29sZF9lZmZlY3RfcHJlZmFiOiBjYy5QcmVmYWIsXG4gICAgICAgIG5vdmljZV91aV9wcmVmYWI6IGNjLlByZWZhYixcbiAgICAgICAgaG90ZWxfdWlfcHJlZmFiOiBjYy5QcmVmYWIsXG4gICAgICAgIHNob3BfdWlfcHJlZmFiOiBjYy5QcmVmYWIsXG4gICAgICAgIHNob3BfYnV5X3VpX3ByZWZhYjogY2MuUHJlZmFiLFxuICAgICAgICB2aWRlb3RhcGVfdWlfcHJlZmFiOiBjYy5QcmVmYWIsXG4gICAgfSxcblxuICAgIC8v5Yib5bu65oyJ6ZKu57uE55qE6IqC54K55rGgXG4gICAgbmV3X2J1dHRvbl9ncm91cF9ub2RlX3Bvb2w6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5idXR0b25fbW9yZV9ub2RlX3Bvb2wgPSBuZXcgY2MuTm9kZVBvb2woKTtcbiAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmJ1dHRvbl9ncm91cF9wcmVmYWIpO1xuICAgICAgICB0aGlzLmJ1dHRvbl9tb3JlX25vZGVfcG9vbC5wdXQobm9kZSk7XG4gICAgfSxcbiAgICAvL1xuICAgIG5ld19wbGFudF91aV9ub2RlX3Bvb2w6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5uZXdfcGxhbnRfdWlfbm9kZV9wb29sID0gbmV3IGNjLk5vZGVQb29sKCk7XG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5wbGFudF91aV9wcmVmYWIpO1xuICAgICAgICB0aGlzLm5ld19wbGFudF91aV9ub2RlX3Bvb2wucHV0KG5vZGUpO1xuICAgIH0sXG4gICAgbmV3X3ZpZGVvdGFwZV91aV9wb29sOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMubmV3X3ZpZGVvdGFwZV91aV9wb29sID0gbmV3IGNjLk5vZGVQb29sKCk7XG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy52aWRlb3RhcGVfdWlfcHJlZmFiKTtcbiAgICAgICAgdGhpcy5uZXdfdmlkZW90YXBlX3VpX3Bvb2wucHV0KG5vZGUpO1xuICAgIH0sXG4gICAgbmV3X3NlbGxfdWlfbm9kZV9wb29sOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMubmV3X3NlbGxfdWlfbm9kZV9wb29sID0gbmV3IGNjLk5vZGVQb29sKCk7XG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5zZWxsX3VpX3ByZWZhYik7XG4gICAgICAgIHRoaXMubmV3X3NlbGxfdWlfbm9kZV9wb29sLnB1dChub2RlKTtcbiAgICB9LFxuICAgIG5ld190aXBzX3VpX25vZGVfcG9vbDogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY291bnQgPSA1O1xuICAgICAgICB0aGlzLm5ld190aXBzX3VpX25vZGVfcG9vbCA9IG5ldyBjYy5Ob2RlUG9vbCgpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy50aXBzX3VpX3ByZWZhYik7XG4gICAgICAgICAgICB0aGlzLm5ld190aXBzX3VpX25vZGVfcG9vbC5wdXQobm9kZSk7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICBuZXdfbGlnaHRfZWZmZWN0X3Bvb2w6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNvdW50ID0gODtcbiAgICAgICAgdGhpcy5uZXdfbGlnaHRfZWZmZWN0X3Bvb2wgPSBuZXcgY2MuTm9kZVBvb2woKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMubGlnaHRfZWZmZWN0X3ByZWZhYik7XG4gICAgICAgICAgICB0aGlzLm5ld19saWdodF9lZmZlY3RfcG9vbC5wdXQobm9kZSk7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICBuZXdfc3R1ZHlfdWlfcG9vbDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLm5ld19zdHVkeV91aV9wb29sID0gbmV3IGNjLk5vZGVQb29sKCk7XG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5zdHVkeV91aV9wcmVmYWIpO1xuICAgICAgICB0aGlzLm5ld19zdHVkeV91aV9wb29sLnB1dChub2RlKTtcbiAgICB9LFxuICAgIG5ld19zdGFmZl91aV9wb29sOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMubmV3X3N0YWZmX3VpX3Bvb2wgPSBuZXcgY2MuTm9kZVBvb2woKTtcbiAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnN0YWZmX3VpX3ByZWZhYik7XG4gICAgICAgIHRoaXMubmV3X3N0YWZmX3VpX3Bvb2wucHV0KG5vZGUpO1xuICAgIH0sXG4gICAgbmV3X3BldF91aV9wb29sOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMubmV3X3BldF91aV9wb29sID0gbmV3IGNjLk5vZGVQb29sKCk7XG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5wZXRfdWlfcHJlZmFiKTtcbiAgICAgICAgdGhpcy5uZXdfcGV0X3VpX3Bvb2wucHV0KG5vZGUpO1xuICAgIH0sXG4gICAgbmV3X2V4X2VmZmVjdF9wb29sKCkge1xuICAgICAgICB0aGlzLm5ld19leF9lZmZlY3RfcG9vbCA9IG5ldyBjYy5Ob2RlUG9vbCgpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5leF9lZmZlY3RfcHJlZmFiKTtcbiAgICAgICAgICAgIHRoaXMubmV3X2V4X2VmZmVjdF9wb29sLnB1dChub2RlKTtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIG5ld19nb2xkX2VmZmVjdF9wb29sKCkge1xuICAgICAgICB0aGlzLm5ld19nb2xkX2VmZmVjdF9wb29sID0gbmV3IGNjLk5vZGVQb29sKCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmdvbGRfZWZmZWN0X3ByZWZhYik7XG4gICAgICAgICAgICB0aGlzLm5ld19nb2xkX2VmZmVjdF9wb29sLnB1dChub2RlKTtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIG5ld19vcHRpb25fdWlfcG9vbCgpIHtcbiAgICAgICAgdGhpcy5uZXdfb3B0aW9uX3VpX3Bvb2wgPSBuZXcgY2MuTm9kZVBvb2woKTtcbiAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLm9wdGlvbl91aV9wcmVmYWIpO1xuICAgICAgICB0aGlzLm5ld19vcHRpb25fdWlfcG9vbC5wdXQobm9kZSk7XG4gICAgfSxcbiAgICBuZXdfaG90ZWxfdWlfcG9vbCgpIHtcbiAgICAgICAgdGhpcy5uZXdfaG90ZWxfdWlfcG9vbCA9IG5ldyBjYy5Ob2RlUG9vbCgpO1xuICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuaG90ZWxfdWlfcHJlZmFiKTtcbiAgICAgICAgdGhpcy5uZXdfaG90ZWxfdWlfcG9vbC5wdXQobm9kZSk7XG4gICAgfSxcbiAgICBuZXdfc2hvcF91aV9wb29sKCkge1xuICAgICAgICB0aGlzLm5ld19zaG9wX3VpX3Bvb2wgPSBuZXcgY2MuTm9kZVBvb2woKTtcbiAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnNob3BfdWlfcHJlZmFiKTtcbiAgICAgICAgdGhpcy5uZXdfc2hvcF91aV9wb29sLnB1dChub2RlKTtcbiAgICB9LFxuICAgIG5ld19zaG9wX2J1eV91aV9wb29sKCkge1xuICAgICAgICB0aGlzLm5ld19zaG9wX2J1eV91aV9wb29sID0gbmV3IGNjLk5vZGVQb29sKCk7XG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5zaG9wX2J1eV91aV9wcmVmYWIpO1xuICAgICAgICB0aGlzLm5ld19zaG9wX2J1eV91aV9wb29sLnB1dChub2RlKTtcbiAgICB9LFxuICAgIC8vXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAvL+WIm+W7uuaMiemSrue7hFxuICAgIGNyZWF0ZV9idXR0b25fZ3JvdXA6IGZ1bmN0aW9uIChwYXJlbnROb2RlKSB7XG4gICAgICAgIHZhciBub2RlID0gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMuYnV0dG9uX21vcmVfbm9kZV9wb29sLnNpemUoKSA+IDApIHtcbiAgICAgICAgICAgIG5vZGUgPSB0aGlzLmJ1dHRvbl9tb3JlX25vZGVfcG9vbC5nZXQoKTtcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gcGFyZW50Tm9kZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfSxcbiAgICBjcmVhdGVfcGxhbnRfdWk6IGZ1bmN0aW9uIChwYXJlbnROb2RlKSB7XG4gICAgICAgIHZhciBub2RlID0gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMubmV3X3BsYW50X3VpX25vZGVfcG9vbC5zaXplKCkgPiAwKSB7XG4gICAgICAgICAgICBub2RlID0gdGhpcy5uZXdfcGxhbnRfdWlfbm9kZV9wb29sLmdldCgpO1xuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBwYXJlbnROb2RlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9LFxuICAgIGNyZWF0ZV9zZWxsX3VpOiBmdW5jdGlvbiAocGFyZW50Tm9kZSkge1xuICAgICAgICB2YXIgbm9kZSA9IG51bGw7XG4gICAgICAgIGlmICh0aGlzLm5ld19zZWxsX3VpX25vZGVfcG9vbC5zaXplKCkgPiAwKSB7XG4gICAgICAgICAgICBub2RlID0gdGhpcy5uZXdfc2VsbF91aV9ub2RlX3Bvb2wuZ2V0KCk7XG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHBhcmVudE5vZGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH0sXG4gICAgY3JlYXRlX3RpcHNfdWk6IGZ1bmN0aW9uIChwYXJlbnROb2RlLCB0eXBlLCBudW0pIHtcbiAgICAgICAgdmFyIG5vZGUgPSBudWxsO1xuICAgICAgICBpZiAodGhpcy5uZXdfdGlwc191aV9ub2RlX3Bvb2wuc2l6ZSgpID4gMCkge1xuICAgICAgICAgICAgbm9kZSA9IHRoaXMubmV3X3RpcHNfdWlfbm9kZV9wb29sLmdldCgpO1xuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBwYXJlbnROb2RlO1xuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJ0aXBzX3VpXCIpLmluaV9ub2RlKHR5cGUsIG51bSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH07XG4gICAgfSxcbiAgICBjcmVhdGVfc3R1ZHlfdWk6IGZ1bmN0aW9uIChwYXJlbnROb2RlKSB7XG4gICAgICAgIHZhciBub2RlID0gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMubmV3X3N0dWR5X3VpX3Bvb2wuc2l6ZSgpID4gMCkge1xuICAgICAgICAgICAgbm9kZSA9IHRoaXMubmV3X3N0dWR5X3VpX3Bvb2wuZ2V0KCk7XG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHBhcmVudE5vZGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH0sXG4gICAgY3JlYXRlX3N0YWZmX3VpOiBmdW5jdGlvbiAocGFyZW50Tm9kZSkge1xuICAgICAgICB2YXIgbm9kZSA9IG51bGw7XG4gICAgICAgIGlmICh0aGlzLm5ld19zdGFmZl91aV9wb29sLnNpemUoKSA+IDApIHtcbiAgICAgICAgICAgIG5vZGUgPSB0aGlzLm5ld19zdGFmZl91aV9wb29sLmdldCgpO1xuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBwYXJlbnROb2RlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9LFxuICAgIGNyZWF0ZV9vZmZsaW5lX3Byb2ZpdF91aTogZnVuY3Rpb24gKHBhcmVudE5vZGUpIHtcbiAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLm9mZmxpbmVfcHJvZml0X3VpX3ByZWZhYik7XG4gICAgICAgIG5vZGUucGFyZW50ID0gcGFyZW50Tm9kZTtcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJvZmZsaW5lX3Byb2ZpdFwiKS5pbmlfbm9kZSgpO1xuICAgIH0sXG4gICAgY3JlYXRlX3BldF91aTogZnVuY3Rpb24gKHBhcmVudE5vZGUpIHtcbiAgICAgICAgdmFyIG5vZGUgPSBudWxsO1xuICAgICAgICBpZiAodGhpcy5uZXdfcGV0X3VpX3Bvb2wuc2l6ZSgpID4gMCkge1xuICAgICAgICAgICAgbm9kZSA9IHRoaXMubmV3X3BldF91aV9wb29sLmdldCgpO1xuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBwYXJlbnROb2RlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9LFxuICAgIGNyZWF0ZV9hZF9jYXIocGFyZW50Tm9kZSwgcHJpY2VfZGlmZmVyZW5jZSkge1xuICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuYWRfY2FyX3ByZWZhYilcbiAgICAgICAgbm9kZS5wYXJlbnQgPSBwYXJlbnROb2RlO1xuICAgICAgICBub2RlLmdldENvbXBvbmVudChcImFkX2NhclwiKS5pbmlfbm9kZShwcmljZV9kaWZmZXJlbmNlKTtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfSxcbiAgICAvL+eItuiKgueCue+8jOaPkOekuueCueexu+Wei++8jOebruagh+S9jee9rlxuICAgIGNyZWF0ZV9idXR0b25fdGlwcyhwYXJlbnROb2RlLCBwb3NpdGlvbl90YXJnZXQpIHtcbiAgICAgICAgdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmJ1dHRvbl90aXBzX3ByZWZhYik7XG4gICAgICAgIG5vZGUucGFyZW50ID0gcGFyZW50Tm9kZTtcbiAgICAgICAgbm9kZS54ID0gcG9zaXRpb25fdGFyZ2V0Lng7XG4gICAgICAgIG5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgfSxcbiAgICBjcmVhdGVfcmVzdF91aShwYXJlbnROb2RlLCBzdGFmZl9pbmRleCkge1xuICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMucmVzdF91aV9wcmVmYWIpO1xuICAgICAgICBub2RlLnBhcmVudCA9IHBhcmVudE5vZGU7XG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwicmVzdF91aVwiKS5pbmlfbm9kZShzdGFmZl9pbmRleCk7XG4gICAgfSxcbiAgICBjcmVhdGVfZ2lmdF91aShwYXJlbnROb2RlKSB7XG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5naWZ0X3VpX3ByZWZhYik7XG4gICAgICAgIG5vZGUucGFyZW50ID0gcGFyZW50Tm9kZTtcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJnaWZ0X3VpXCIpLmluaV9ub2RlKCk7XG4gICAgfSxcbiAgICBjcmVhdGVfcGV0KHBhcmVudE5vZGUsIGluZGV4KSB7XG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5wZXRfcHJlZmFiX2FycltpbmRleF0pO1xuICAgICAgICBub2RlLnBhcmVudCA9IHBhcmVudE5vZGU7XG4gICAgfSxcbiAgICBjcmVhdGVfb3B0aW9uX3VpKCkge1xuICAgICAgICBpZiAodGhpcy5uZXdfb3B0aW9uX3VpX3Bvb2wuc2l6ZSgpID4gMCkge1xuICAgICAgICAgICAgdmFyIG5vZGUgPSB0aGlzLm5ld19vcHRpb25fdWlfcG9vbC5nZXQoKTtcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5ub2RlO1xuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJvcHRpb25fdWlcIikuaW5pX25vZGUoKTtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGNyZWF0ZV9ub3ZpY2VfdWkoKSB7XG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5ub3ZpY2VfdWlfcHJlZmFiKTtcbiAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLm5vZGU7XG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwibm92aWNlX3VpXCIpLmluaV9ub2RlKCk7XG4gICAgfSxcbiAgICBjcmVhdGVfaG90ZWxfdWkoKSB7XG4gICAgICAgIGlmICh0aGlzLm5ld19ob3RlbF91aV9wb29sLnNpemUoKSA+IDApIHtcbiAgICAgICAgICAgIHZhciBub2RlID0gdGhpcy5uZXdfaG90ZWxfdWlfcG9vbC5nZXQoKTtcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5ub2RlO1xuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJob3RlbF91aVwiKS5pbmlfbm9kZSgpO1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgY3JlYXRlX3Nob3BfYnV5X3VpKHR5cGUsIGluZGV4LCBzcHJpdGVGcmFtZSkge1xuICAgICAgICAvL+eJqeWTgeexu+Wei++8jOeJqeWTgee8luWPt++8jOeJqeWTgeeahOWbvueJh1xuICAgICAgICBpZiAodGhpcy5uZXdfc2hvcF9idXlfdWlfcG9vbC5zaXplKCkgPiAwKSB7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IHRoaXMubmV3X3Nob3BfYnV5X3VpX3Bvb2wuZ2V0KCk7XG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMubm9kZTtcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwic2hvcF9idXlfdWlcIikuaW5pX25vZGUodHlwZSwgaW5kZXgsIHNwcml0ZUZyYW1lKTtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGNyZWF0ZV9zaG9wX3VpKCkge1xuICAgICAgICBpZiAodGhpcy5uZXdfc2hvcF91aV9wb29sLnNpemUoKSA+IDApIHtcbiAgICAgICAgICAgIHZhciBub2RlID0gdGhpcy5uZXdfc2hvcF91aV9wb29sLmdldCgpO1xuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLm5vZGU7XG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcInNob3BfdWlcIikuaW5pX25vZGUoKTtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGNyZWF0ZV92aWRlb3RhcGVfdWkoKSB7XG4gICAgICAgIGlmICh0aGlzLm5ld192aWRlb3RhcGVfdWlfcG9vbC5zaXplKCkgPiAwKSB7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IHRoaXMubmV3X3ZpZGVvdGFwZV91aV9wb29sLmdldCgpO1xuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLm5vZGU7XG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcInZpZGVvdGFwZV91aVwiKS5pbmlfbm9kZSgpO1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgY3JlYXRlX2V4X2VmZmVjdChjcmVhdGVfbm9kZSwgaW5kZXgpIHtcblxuICAgICAgICAvL+WcqOWTquS4quiKgueCuei/m+ihjOWIm+W7uu+8jOWIm+W7uueahOesrOWHoOS4qlxuICAgICAgICAvL2NyZWF0ZV9ub2RlICwgaW5kZXhcbiAgICAgICAgdmFyIGxldmVsX2ljb24gPSBjYy5maW5kKFwiVUlfUk9PVC90b3AvbGV2ZWwvbGV2ZWxfaWNvblwiKTtcbiAgICAgICAgLy/lsIbliJvlu7rnmoTliJ3lp4vlnLDlnYAg6L2s5o2i5Li65LiW55WM5Z2Q5qCHXG4gICAgICAgIHZhciBjX1dwb3MgPSBjcmVhdGVfbm9kZS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKGNyZWF0ZV9ub2RlLnBvc2l0aW9uKTtcbiAgICAgICAgLy/ovazmjaLkuLrpnIDopoHnmoTnm7jlr7nlnZDmoIdcbiAgICAgICAgdmFyIGNfblBvcyA9IHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihjX1dwb3MpO1xuXG4gICAgICAgIC8v5bCG6aOe5b6A55qE55uu5qCH5L2N572u6L2s5Li65LiW55WM5Z2Q5qCHXG4gICAgICAgIHZhciB0X1dwb3MgPSBsZXZlbF9pY29uLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIobGV2ZWxfaWNvbi5wb3NpdGlvbik7XG4gICAgICAgIC8v5bCG55uu5qCH5L2N572u6L2s5Li655u45a+55L2N572uXG4gICAgICAgIHZhciB0X05wb3MgPSB0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIodF9XcG9zKVxuXG5cbiAgICAgICAgaWYgKHRoaXMubmV3X2V4X2VmZmVjdF9wb29sLnNpemUoKSA+IDApIHtcbiAgICAgICAgICAgIHZhciBub2RlID0gdGhpcy5uZXdfZXhfZWZmZWN0X3Bvb2wuZ2V0KCk7XG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMubm9kZTtcbiAgICAgICAgICAgIG5vZGUucG9zaXRpb24gPSBjX25Qb3M7XG4gICAgICAgICAgICBjYy50d2Vlbihub2RlKVxuICAgICAgICAgICAgICAgIC50bygoaW5kZXggKyAxKSAvIDUsIHsgcG9zaXRpb246IHRfTnBvcyB9LCB7IGVhc2luZzogXCJzaW5lSW5cIiB9KVxuICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYWRkX2V4XCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMuYWRkX2V4KDEpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uX25vZGVfa2lsbChub2RlKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5zdGFydCgpO1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgLy/mlLblibLnibnmlYhcbiAgICBjcmVhdGVfbGlnaHRfZWZmZWN0KGNyZWF0ZV9ub2RlLCBpbmRleCwgcGxhbnRfaW5kZXgpIHtcbiAgICAgICAgLy/lnKjlk6rkuKroioLngrnov5vooYzliJvlu7rvvIzliJvlu7rnmoTnrKzlh6DkuKog56eN5a2Q57yW5Y+3XG4gICAgICAgIHZhciBzZWxsID0gY2MuZmluZChcIlVJX1JPT1QvY2VudGVyL2J1aWxkL3NlbGxcIik7XG4gICAgICAgIC8v5bCG5Yib5bu655qE5Yid5aeL5Zyw5Z2AIOi9rOaNouS4uuS4lueVjOWdkOagh1xuICAgICAgICB2YXIgY19XcG9zID0gY3JlYXRlX25vZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjcmVhdGVfbm9kZS5wb3NpdGlvbik7XG4gICAgICAgIC8v6L2s5o2i5Li66ZyA6KaB55qE55u45a+55Z2Q5qCHXG4gICAgICAgIHZhciBjX25Qb3MgPSB0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIoY19XcG9zKTtcblxuICAgICAgICAvL+WwhumjnuW+gOeahOebruagh+S9jee9rui9rOS4uuS4lueVjOWdkOagh1xuICAgICAgICB2YXIgdF9XcG9zID0gc2VsbC5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKHNlbGwucG9zaXRpb24pO1xuICAgICAgICAvL+Wwhuebruagh+S9jee9rui9rOS4uuebuOWvueS9jee9rlxuICAgICAgICB2YXIgdF9OcG9zID0gdGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHRfV3BvcylcblxuICAgICAgICBpZiAodGhpcy5uZXdfbGlnaHRfZWZmZWN0X3Bvb2wuc2l6ZSgpID4gMCkge1xuICAgICAgICAgICAgdmFyIG5vZGUgPSB0aGlzLm5ld19saWdodF9lZmZlY3RfcG9vbC5nZXQoKTtcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5ub2RlO1xuICAgICAgICAgICAgbm9kZS5wb3NpdGlvbiA9IGNfblBvcztcbiAgICAgICAgICAgIGNjLnR3ZWVuKG5vZGUpXG4gICAgICAgICAgICAgICAgLmRlbGF5KDEpXG4gICAgICAgICAgICAgICAgLnRvKChpbmRleCArIDEpIC8gNSwgeyBwb3NpdGlvbjogdF9OcG9zIH0sIHsgZWFzaW5nOiBcInNpbmVJblwiIH0pXG4gICAgICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJhZGRfZXhcIik7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhbGxfY2FwYWNpdHkgPSB1c2VyX2RhdGEudXNlcl9kYXRhLndhcmVIb3VzZV9sZXZlbCAqIGNvbmZpZy53YXJlSG91c2VbXCJhbGxfY2FwYWNpdHlcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDE1OyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS53YXJlSG91c2VbaV0uaGF2ZSA9PSAwKSBicmVhazsgICAgICAvLyBu4bq/dSBjaMawYSBt4bufIMO0IHRow6wgZOG7q25nLCBrIGPhu5luZyB0aMOqbSBu4buvYSwgxJHDoyB0csOgbiBraG9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLndhcmVIb3VzZVtpXS5jb3VudCA9PSAwKSB7ICAgICAgICAgIC8vIG7hur91IGzDoCDDtCB0cuG7kW5nIHRow6wgdGjDqm0gdsOgb1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLndhcmVIb3VzZVtpXS5jb3VudCA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEud2FyZUhvdXNlW2ldLmlkX3Byb2R1Y3QgPSBwbGFudF9pbmRleDsgIC8vIGfDoW4gaWQgY8OieSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodXNlcl9kYXRhLnVzZXJfZGF0YS53YXJlSG91c2VbaV0uY291bnQgPDMwICYmIHVzZXJfZGF0YS51c2VyX2RhdGEud2FyZUhvdXNlW2ldLmlkX3Byb2R1Y3Q9PSBwbGFudF9pbmRleCkgLy8ga2nhu4NtIHRyYSBraG8gY8O5bmcgbG/huqFpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLndhcmVIb3VzZVtpXS5jb3VudCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVzZXJfZGF0YS51c2VyX2RhdGEud2FyZUhvdXNlW3BsYW50X2luZGV4XS5jb3VudCsrOyAvLyB0aMOqbSB24bqtdCBwaOG6qW0gdsOgbyBraG9cblxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcy5hZGRfZXgoMSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25fbm9kZV9raWxsKG5vZGUpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnN0YXJ0KCk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH0sXG5cbiAgICBjcmVhdGVfZ29sZF9lZmZlY3QoY3JlYXRlX25vZGUsIGluZGV4LCBhZGRHb2xkKSB7XG4gICAgICAgIC8vY3JlYXRlIG5vZGUg5Zyo5ZOq5Liq6IqC54K56aOe77yMIGluZGV4IOaVsOmHjyAsbnVt5aKe5Yqg55qE6YeR5biB5pWw6YePXG4gICAgICAgIHZhciBnb2xkX2ljb24gPSBjYy5maW5kKFwiVUlfUk9PVC90b3AvZ29sZC9nb2xkX2ljb25cIik7XG4gICAgICAgIC8v5bCG5Yib5bu655qE5Yid5aeL5Zyw5Z2AIOi9rOaNouS4uuS4lueVjOWdkOagh1xuICAgICAgICB2YXIgY19XcG9zID0gY3JlYXRlX25vZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjcmVhdGVfbm9kZS5wb3NpdGlvbik7XG4gICAgICAgIC8v6L2s5o2i5Li66ZyA6KaB55qE55u45a+55Z2Q5qCHXG4gICAgICAgIHZhciBjX25Qb3MgPSB0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIoY19XcG9zKTtcblxuICAgICAgICAvL+WwhumjnuW+gOeahOebruagh+S9jee9rui9rOS4uuS4lueVjOWdkOagh1xuICAgICAgICB2YXIgdF9XcG9zID0gZ29sZF9pY29uLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoZ29sZF9pY29uLnBvc2l0aW9uKTtcbiAgICAgICAgLy/lsIbnm67moIfkvY3nva7ovazkuLrnm7jlr7nkvY3nva5cbiAgICAgICAgdmFyIHRfTnBvcyA9IHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0X1dwb3MpXG5cbiAgICAgICAgaWYgKHRoaXMubmV3X2dvbGRfZWZmZWN0X3Bvb2wuc2l6ZSgpID4gMCkge1xuICAgICAgICAgICAgdmFyIG5vZGUgPSB0aGlzLm5ld19nb2xkX2VmZmVjdF9wb29sLmdldCgpO1xuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLm5vZGU7XG4gICAgICAgICAgICBub2RlLnBvc2l0aW9uID0gY19uUG9zO1xuICAgICAgICAgICAgbm9kZS55ICs9IDUwO1xuICAgICAgICAgICAgY2MudHdlZW4obm9kZSlcbiAgICAgICAgICAgICAgICAudG8oKGluZGV4ICsgMSkgLyA1LCB7IHBvc2l0aW9uOiB0X05wb3MgfSwgeyBlYXNpbmc6IFwic2luZUluXCIgfSlcbiAgICAgICAgICAgICAgICAuY2FsbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImFkZF9nb2xkXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMuYWRkX2dvbGQoYWRkR29sZCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25fbm9kZV9raWxsKG5vZGUpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnN0YXJ0KCk7XG4gICAgICAgIH07XG5cbiAgICB9LFxuICAgIC8v6IqC54K56ZSA5q+BXG4gICAgb25fbm9kZV9raWxsOiBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICBzd2l0Y2ggKG5vZGUubmFtZSkge1xuICAgICAgICAgICAgY2FzZSBcImJ1dHRvbl9tb3JlXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b25fbW9yZV9ub2RlX3Bvb2wucHV0KG5vZGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInBsYW50X3VpXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5uZXdfcGxhbnRfdWlfbm9kZV9wb29sLnB1dChub2RlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJzZWxsX3VpXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5uZXdfc2VsbF91aV9ub2RlX3Bvb2wucHV0KG5vZGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInRpcHNfdWlcIjpcbiAgICAgICAgICAgICAgICB0aGlzLm5ld190aXBzX3VpX25vZGVfcG9vbC5wdXQobm9kZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwibGlnaHRcIjpcbiAgICAgICAgICAgICAgICB0aGlzLm5ld19saWdodF9lZmZlY3RfcG9vbC5wdXQobm9kZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwic3R1ZHlfdWlcIjpcbiAgICAgICAgICAgICAgICB0aGlzLm5ld19zdHVkeV91aV9wb29sLnB1dChub2RlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJzdGFmZl91aVwiOlxuICAgICAgICAgICAgICAgIHRoaXMubmV3X3N0YWZmX3VpX3Bvb2wucHV0KG5vZGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInBldF91aVwiOlxuICAgICAgICAgICAgICAgIHRoaXMubmV3X3BldF91aV9wb29sLnB1dChub2RlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJleF9lZmZlY3RcIjpcbiAgICAgICAgICAgICAgICB0aGlzLm5ld19leF9lZmZlY3RfcG9vbC5wdXQobm9kZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiZ29sZF9lZmZlY3RcIjpcbiAgICAgICAgICAgICAgICB0aGlzLm5ld19nb2xkX2VmZmVjdF9wb29sLnB1dChub2RlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJvcHRpb25fdWlcIjpcbiAgICAgICAgICAgICAgICB0aGlzLm5ld19vcHRpb25fdWlfcG9vbC5wdXQobm9kZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiaG90ZWxfdWlcIjpcbiAgICAgICAgICAgICAgICB0aGlzLm5ld19ob3RlbF91aV9wb29sLnB1dChub2RlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJzaG9wX2J1eV91aVwiOlxuICAgICAgICAgICAgICAgIHRoaXMubmV3X3Nob3BfYnV5X3VpX3Bvb2wucHV0KG5vZGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInNob3BfdWlcIjpcbiAgICAgICAgICAgICAgICB0aGlzLm5ld19zaG9wX3VpX3Bvb2wucHV0KG5vZGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInZpZGVvdGFwZV91aVwiOlxuICAgICAgICAgICAgICAgIHRoaXMubmV3X3ZpZGVvdGFwZV91aV9wb29sLnB1dChub2RlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9O1xuICAgICAgICBjYy5sb2cobm9kZS5uYW1lLCBcIuaUvuWFpeiKgueCueaxoFwiKTtcbiAgICB9LFxuICAgIC8v5Yid5aeL5YyW6IqC54K5XG4gICAgaW5pX25vZGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5uZXdfYnV0dG9uX2dyb3VwX25vZGVfcG9vbCgpO1xuICAgICAgICB0aGlzLm5ld19wbGFudF91aV9ub2RlX3Bvb2woKTtcbiAgICAgICAgdGhpcy5uZXdfc2VsbF91aV9ub2RlX3Bvb2woKTtcbiAgICAgICAgdGhpcy5uZXdfdGlwc191aV9ub2RlX3Bvb2woKTtcbiAgICAgICAgdGhpcy5uZXdfbGlnaHRfZWZmZWN0X3Bvb2woKTtcbiAgICAgICAgdGhpcy5uZXdfc3R1ZHlfdWlfcG9vbCgpO1xuICAgICAgICB0aGlzLm5ld19zdGFmZl91aV9wb29sKCk7XG4gICAgICAgIHRoaXMubmV3X3BldF91aV9wb29sKCk7XG4gICAgICAgIHRoaXMubmV3X2V4X2VmZmVjdF9wb29sKCk7XG4gICAgICAgIHRoaXMubmV3X29wdGlvbl91aV9wb29sKCk7XG4gICAgICAgIHRoaXMubmV3X2dvbGRfZWZmZWN0X3Bvb2woKTtcbiAgICAgICAgdGhpcy5uZXdfaG90ZWxfdWlfcG9vbCgpO1xuICAgICAgICB0aGlzLm5ld19zaG9wX2J1eV91aV9wb29sKCk7XG4gICAgICAgIHRoaXMubmV3X3Nob3BfdWlfcG9vbCgpO1xuICAgICAgICB0aGlzLm5ld192aWRlb3RhcGVfdWlfcG9vbCgpO1xuXG4gICAgfSxcbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfcnVsZXNcIik7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbCA9IGNjLmZpbmQoXCJzb3VuZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcInNvdW5kX2NvbnRyb2xcIik7XG4gICAgICAgIHRoaXMuaW5pX25vZGUoKTtcbiAgICB9LFxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9LFxuXG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTtcbiJdfQ==
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
      var local_user_data = JSON.parse(cc.sys.localStorage.getItem('user_data')); // var local_user_data = null;

      if (local_user_data !== null) {
        this.updata_user_data(local_user_data);
        cc.log("error load");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxmeC5qcyJdLCJuYW1lcyI6WyJtZXJnZUpTT04iLCJuIiwibyIsIm9UeXBlIiwiT2JqZWN0IiwicHJvdG90eXBlIiwidG9TdHJpbmciLCJjYWxsIiwiblR5cGUiLCJwIiwiaGFzT3duUHJvcGVydHkiLCJvUFR5cGUiLCJuUFR5cGUiLCJpIiwib0lUeXBlIiwibklUeXBlIiwidXBkYXRhX3VzZXJfZGF0YSIsImxvY2FsX3VzZXJfZGF0YSIsIm5vd191ZCIsInVzZXJfZGF0YSIsImFzc2lnbiIsImNjIiwibG9nIiwibG9hZCIsIkpTT04iLCJwYXJzZSIsInN5cyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJzYXZlIiwiZXJyIiwiY2FjaGVfdXNlcl9kYXRhIiwicmVtb3ZlX2FsbCIsInNldEl0ZW0iLCJzdHJpbmdpZnkiLCJyZW1vdmVJdGVtIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O2VBQ2U7QUFDWDtBQUNBQSxFQUFBQSxTQUZXLHFCQUVEQyxDQUZDLEVBRUVDLENBRkYsRUFFSztBQUNaLFFBQUlDLEtBQUssR0FBR0MsTUFBTSxDQUFDQyxTQUFQLENBQWlCQyxRQUFqQixDQUEwQkMsSUFBMUIsQ0FBK0JMLENBQS9CLENBQVo7QUFDQSxRQUFJTSxLQUFLLEdBQUdKLE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQkMsUUFBakIsQ0FBMEJDLElBQTFCLENBQStCTixDQUEvQixDQUFaOztBQUNBLFFBQUlPLEtBQUssSUFBSSxpQkFBVCxJQUE4QkwsS0FBSyxJQUFJLGlCQUEzQyxFQUE4RDtBQUMxRDtBQUNBLFdBQUssSUFBSU0sQ0FBVCxJQUFjUixDQUFkLEVBQWlCO0FBQ2IsWUFBSUEsQ0FBQyxDQUFDUyxjQUFGLENBQWlCRCxDQUFqQixLQUF1QixDQUFDUCxDQUFDLENBQUNRLGNBQUYsQ0FBaUJELENBQWpCLENBQTVCLEVBQWlEO0FBQzdDO0FBQ0FQLFVBQUFBLENBQUMsQ0FBQ08sQ0FBRCxDQUFELEdB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QVA7QUFDSDtBQUNKLEdBM0RVO0FBNERYO0FBQ0FELEVBQUFBLElBQUksRUFBRSxnQkFBWTtBQUNkLFFBQUlFLGVBQWUsR0FBR1osc0JBQVVBLFNBQWhDO0FBQ0EsU0FBS2EsVUFBTDtBQUNBWCxJQUFBQSxFQUFFLENBQUNLLEdBQUgsQ0FBT0MsWUFBUCxDQUFvQk0sT0FBcEIsQ0FBNEIsV0FBNUIsRUFBeUNULElBQUksQ0FBQ1UsU0FBTCxDQUFlSCxlQUFmLENBQXpDLEVBSGMsQ0FJZDtBQUNBO0FBQ0gsR0FuRVU7QUFvRVg7QUFDQUMsRUFBQUEsVUFBVSxFQUFFLHNCQUFZO0FBQ3BCWCxJQUFBQSxFQUFFLENBQUNLLEdBQUgsQ0FBT0MsWUFBUCxDQUFvQlEsVUFBcEIsQ0FBK0IsV0FBL0IsRUFEb0IsQ0FFcEI7QUFDSDtBQXhFVSIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHVzZXJfZGF0YSBmcm9tIFwidXNlcl9kYXRhXCI7XG5leHBvcnQgZGVmYXVsdCB7XG4gICAgLy/mm7TmlrDlrZjmoaNcbiAgICBtZXJnZUpTT04obiwgbykge1xuICAgICAgICBsZXQgb1R5cGUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobyk7XG4gICAgICAgIGxldCBuVHlwZSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChuKTtcbiAgICAgICAgaWYgKG5UeXBlID09ICdbb2JqZWN0IE9iamVjdF0nICYmIG9UeXBlID09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgICAgICAgICAvL+WQiOW5tuWxnuaApyhvYmplY3QpXG4gICAgICAgICAgICBmb3IgKGxldCBwIGluIG4pIHtcbiAgICAgICAgICAgICAgICBpZiAobi5oYXNPd25Qcm9wZXJ0eShwKSAmJiAhby5oYXNPd25Qcm9wZXJ0eShwKSkge1xuICAgICAgICAgICAgICAgICAgICAvL+aWsOeahOacie+8jOaXp+eahOayoeaciVxuICAgICAgICAgICAgICAgICAgICBvW3BdID0gbltwXTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG4uaGFzT3duUHJvcGVydHkocCkgJiYgKG8uaGFzT3duUHJvcGVydHkocCkpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8v5Lik6ICF6YO95pyJXG4gICAgICAgICAgICAgICAgICAgIGxldCBvUFR5cGUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob1twXSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBuUFR5cGUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobltwXSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICgoblBUeXBlID09ICdbb2JqZWN0IE9iamVjdF0nICYmIG9QVHlwZSA9PSAnW29iamVjdCBPYmplY3RdJykgfHwgKG5QVHlwZSA9PSAnW29iamVjdCBBcnJheV0nICYmIG9QVHlwZSA9PSAnW29iamVjdCBBcnJheV0nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXJnZUpTT04obltwXSwgb1twXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKG5UeXBlID09ICdbb2JqZWN0IEFycmF5XScgJiYgb1R5cGUgPT0gJ1tvYmplY3QgQXJyYXldJykge1xuICAgICAgICAgICAgLy/lkIjlubblsZ7mgKcoYXJyYXkpXG4gICAgICAgICAgICBmb3IgKGxldCBpIGluIG4pIHtcbiAgICAgICAgICAgICAgICBsZXQgb0lUeXBlID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9baV0pO1xuICAgICAgICAgICAgICAgIGxldCBuSVR5cGUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobltpXSk7XG4gICAgICAgICAgICAgICAgaWYgKChuSVR5cGUgPT0gJ1tvYmplY3QgT2JqZWN0XScgJiYgb0lUeXBlID09ICdbb2JqZWN0IE9iamVjdF0nKSB8fCAobklUeXBlID09ICdbb2JqZWN0IEFycmF5XScgJiYgb0lUeXBlID09ICdbb2JqZWN0IEFycmF5XScpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWVyZ2VKU09OKG5baV0sIG9baV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgLy/lkIjlubblsZ7mgKcob3RoZXIpXG4gICAgICAgIG4gPSBvO1xuICAgICAgICByZXR1cm4gbjtcbiAgICB9LFxuICAgIC8v5Yi35paw5pWw5o2uXG4gICAgdXBkYXRhX3VzZXJfZGF0YTogZnVuY3Rpb24gKGxvY2FsX3VzZXJfZGF0YSkge1xuICAgICAgICAvL+WQiOW5tuWvueixoe+8jOa6kOWvueixoeWQiOW5tuWIsOebruagh+WvueixoVxuICAgICAgICAvL09iamVjdC5hc3NpZ24odGFyZ2V0LHNvdXJjZXMpXG4gICAgICAgIHZhciBub3dfdWQgPSB0aGlzLm1lcmdlSlNPTih1c2VyX2RhdGEudXNlcl9kYXRhLCBsb2NhbF91c2VyX2RhdGEpO1xuICAgICAgICBPYmplY3QuYXNzaWduKHVzZXJfZGF0YS51c2VyX2RhdGEsIG5vd191ZClcbiAgICAgICAgY2MubG9nKHVzZXJfZGF0YS51c2VyX2RhdGEsIFwidXNlcl9kYXRhXCIpO1xuICAgIH0sXG4gICAgLy/or7vlj5bmnKzlnLDmlbDmja5cbiAgICBsb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgbG9jYWxfdXNlcl9kYXRhID0gSlNPTi5wYXJzZShjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJfZGF0YScpKTtcbiAgICAgICAgICAgIC8vIHZhciBsb2NhbF91c2VyX2RhdGEgPSBudWxsO1xuICAgICAgICAgICAgaWYgKGxvY2FsX3VzZXJfZGF0YSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRhX3VzZXJfZGF0YShsb2NhbF91c2VyX2RhdGEpO1xuICAgICAgICAgICAgICAgIGNjLmxvZyhcImVycm9yIGxvYWRcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2F2ZSgpO1xuICAgICAgICAgICAgICAgIC8v5ZCm5YiZ5bCx5Yid5aeL5YyWXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRoaXMuc2F2ZSgpO1xuICAgICAgICAgICAgY2MubG9nKFwiZXJyb3IgbG9hZCBleGNlcHRpb241XCIpO1xuICAgICAgICAgICAgY2MubG9nKGVycik7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIC8v5bCG57yT5a2Y5pWw5o2u5YaZ5YWl5Yiw5pys5Zyw5LitXG4gICAgc2F2ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY2FjaGVfdXNlcl9kYXRhID0gdXNlcl9kYXRhLnVzZXJfZGF0YTtcbiAgICAgICAgdGhpcy5yZW1vdmVfYWxsKCk7XG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndXNlcl9kYXRhJywgSlNPTi5zdHJpbmdpZnkoY2FjaGVfdXNlcl9kYXRhKSk7XG4gICAgICAgIC8vIGNjLmxvZyhcIuW3suWtmOaho1wiKTtcbiAgICAgICAgLy8gY2MubG9nKEpTT04uc3RyaW5naWZ5KHVzZXJfZGF0YSkpO1xuICAgIH0sXG4gICAgLy/muIXpmaTmiYDmnInmlbDmja5cbiAgICByZW1vdmVfYWxsOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgndXNlcl9kYXRhJyk7XG4gICAgICAgIC8vIGNjLmxvZyhcIua4hemZpOacrOWcsOaJgOacieaVsOaNrlwiKTtcbiAgICB9LFxuXG59O1xuIl19
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxsb2FkaW5nX3NjZW5lLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwibG9hZGluZ0JhciIsInR5cGUiLCJQcm9ncmVzc0JhciIsIndvcmtfbGFiZWwiLCJMYWJlbCIsInByb2dyZXNzX2xhYmVsIiwiY2VudGVyX25vZGUiLCJOb2RlIiwibG9hZF9TdWNjZXMiLCJ0d2VlbiIsInRvIiwib3BhY2l0eSIsImVhc2luZyIsImNhbGwiLCJkaXJlY3RvciIsImxvYWRTY2VuZSIsInN0YXJ0IiwiaW5pX25vZGUiLCJwcm9ncmVzcyIsIm9uX2xvYWRfcHJvZ3Jlc3MiLCJzZWxmIiwicHJlbG9hZFNjZW5lIiwiY29tcGxldGVkQ291bnQiLCJ0b3RhbENvdW50IiwiaXRlbSIsInN0cmluZyIsInBhcnNlSW50IiwiZXJyb3IiLCJhc3NldCIsImxvZyIsInJlc3RfbG9hZF9nYW1lIiwiZHQiLCJ0aW1lIiwicmVzdF9jb3VudCIsIm5vZGUiLCJhY3RpdmUiLCJvbkxvYWQiLCJ1cGRhdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBRUxDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxVQUFVLEVBQUU7QUFDUkMsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNLFdBREQ7QUFFUixpQkFBUztBQUZELEtBREo7QUFLUkMsSUFBQUEsVUFBVSxFQUFFO0FBQ1JGLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDUSxLQUREO0FBRVIsaUJBQVM7QUFGRCxLQUxKO0FBU1JDLElBQUFBLGNBQWMsRUFBRVQsRUFBRSxDQUFDUSxLQVRYO0FBVVJFLElBQUFBLFdBQVcsRUFBRVYsRUFBRSxDQUFDVztBQVZSLEdBRlA7QUFlTDtBQUNBQyxFQUFBQSxXQUFXLEVBQUUsdUJBQVk7QUFDckJaLElBQUFBLEVBQUUsQ0FBQ2EsS0FBSCxDQUFTLEtBQUtILFdBQWQsRUFDS0ksRUFETCxDQUNRLEdBRFIsRUFDYTtBQUFFQyxNQUFBQSxPQUFPLEVBQUU7QUFBWCxLQURiLEVBQzZCO0FBQUVDLE1BQUFBLE1BQU0sRUFBRTtBQUFWLEtBRDdCLEVBRUtDLElBRkwsQ0FFVSxZQUFNO0FBQ1JqQixNQUFBQSxFQUFFLENBQUNrQixRQUFILENBQVlDLFNBQVosQ0FBc0IsWUFBdEI7QUFDSCxLQUpMLEVBS0tDLEtBTEw7QUFNSCxHQXZCSTtBQXlCTEMsRUFBQUEsUUFBUSxFQUFFLG9CQUFZO0FBQ2xCLFNBQUtqQixVQUFMLENBQWdCa0IsUUFBaEIsR0FBMkIsQ0FBM0I7QUFDQSxTQUFLQyxnQkFBTDtBQUNILEdBNUJJO0FBNkJMO0FBQ0FBLEVBQUFBLGdCQUFnQixFQUFFLDRCQUFZO0FBQzFCLFFBQUlDLElBQUksR0FBRyxJQUFYO0FBQ0F4QixJQUFBQSxFQUFFLENBQUNrQixRQUFILENBQVlPLFlBQVosQ0FBeUIsWUFBekIsRUFBdUMsVUFBQ0MsY0FBRCxFQUFpQkMsVUFBakIsRUFBNkJDLElBQTdCLEVBQXNDO0FBQ3pFLFVBQUlGLGNBQWMsR0FBR0MsVUFBakIsR0FBOEJILElBQUksQ0FBQ3BCLFVBQUwsQ0FBZ0JrQixRQUFsRCxFQUE0RDtBQUN4REUsUUFBQUEsSUFBSSxDQUFDcEIsVUFBTCxDQUFnQmtCLFFBQWhCLEdBQTJCSSxjQUFjLEdBQUdDLFVBQTVDO0FBQ0FILFFBQUFBLElBQUksQ0FBQ2YsY0FBTCxDQUFvQm9CLE1BQXBCLEdBQTZCQyxRQUFRLENBQUVKLGNBQWMsR0FBR0MsVUFBbEIsR0FBZ0MsR0FBakMsQ0FBUixHQUFnRCxHQUE3RTtBQUVIOztBQUFBLE9BTHdFLENBTXpFO0FBQ0gsS0FQRCxFQU9HLFVBQVVJLEtBQVYsRUFBaUJDLEtBQWpCLEVBQXdCO0FBQ3ZCLFVBQUlELEtBQUosRUFBVztBQUNQL0IsUUFBQUEsRUFBRSxDQUFDaUMsR0FBSCxDQUFPLE1BQVA7QUFDQTtBQUNILE9BSEQsTUFHTztBQUNIVCxRQUFBQSxJQUFJLENBQUNaLFdBQUw7QUFDQVosUUFBQUEsRUFBRSxDQUFDaUMsR0FBSCxDQUFPLE1BQVA7QUFDSDs7QUFBQTtBQUNKLEtBZkQ7QUFnQkgsR0FoREk7QUFrREw7QUFDQUMsRUFBQUEsY0FBYyxFQUFFLHdCQUFVQyxFQUFWLEVBQWM7QUFDMUIsU0FBS0MsSUFBTCxJQUFhRCxFQUFiOztBQUNBLFFBQUksS0FBS0MsSUFBTCxJQUFhLEVBQWpCLEVBQXFCO0FBQ2pCLFdBQUtBLElBQUwsR0FBWSxDQUFaO0FBQ0EsV0FBS0MsVUFBTDtBQUNBLFdBQUs5QixVQUFMLENBQWdCc0IsTUFBaEIsR0FBeUIsYUFBekI7O0FBQ0EsVUFBSSxLQUFLUSxVQUFMLElBQW1CLENBQXZCLEVBQTBCO0FBQ3RCLGFBQUs1QixjQUFMLENBQW9CNkIsSUFBcEIsQ0FBeUJDLE1BQXpCLEdBQWtDLEtBQWxDO0FBQ0EsYUFBS2hDLFVBQUwsQ0FBZ0JzQixNQUFoQixHQUF5QixnQ0FBekI7QUFDSDs7QUFBQTtBQUNELFdBQUtSLFFBQUw7QUFDSDtBQUNKLEdBL0RJO0FBZ0VMbUIsRUFBQUEsTUFoRUssb0JBZ0VJO0FBQ0wsU0FBS0osSUFBTCxHQUFZLENBQVo7QUFDQSxTQUFLQyxVQUFMLEdBQWtCLENBQWxCO0FBQ0EsU0FBS2hCLFFBQUw7QUFDSCxHQXBFSTtBQXNFTEQsRUFBQUEsS0F0RUssbUJBc0VHLENBRVAsQ0F4RUk7QUEwRUxxQixFQUFBQSxNQTFFSyxrQkEwRUVOLEVBMUVGLEVBMEVNO0FBQ1AsU0FBS0QsY0FBTCxDQUFvQkMsRUFBcEI7QUFDSDtBQTVFSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgbG9hZGluZ0Jhcjoge1xuICAgICAgICAgICAgdHlwZTogY2MuUHJvZ3Jlc3NCYXIsXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICB9LFxuICAgICAgICB3b3JrX2xhYmVsOiB7XG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgIH0sXG4gICAgICAgIHByb2dyZXNzX2xhYmVsOiBjYy5MYWJlbCxcbiAgICAgICAgY2VudGVyX25vZGU6IGNjLk5vZGUsXG4gICAgfSxcblxuICAgIC8v5Yqg6L295oiQ5YqfXG4gICAgbG9hZF9TdWNjZXM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2MudHdlZW4odGhpcy5jZW50ZXJfbm9kZSlcbiAgICAgICAgICAgIC50bygwLjUsIHsgb3BhY2l0eTogMCB9LCB7IGVhc2luZzogXCJzaW5lT3V0XCIgfSlcbiAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJnYW1lX3NjZW5lXCIpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGFydCgpO1xuICAgIH0sXG5cbiAgICBpbmlfbm9kZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmxvYWRpbmdCYXIucHJvZ3Jlc3MgPSAwO1xuICAgICAgICB0aGlzLm9uX2xvYWRfcHJvZ3Jlc3MoKTtcbiAgICB9LFxuICAgIC8v5Yqg6L296L+b5bqm5p2hXG4gICAgb25fbG9hZF9wcm9ncmVzczogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIGNjLmRpcmVjdG9yLnByZWxvYWRTY2VuZShcImdhbWVfc2NlbmVcIiwgKGNvbXBsZXRlZENvdW50LCB0b3RhbENvdW50LCBpdGVtKSA9PiB7XG4gICAgICAgICAgICBpZiAoY29tcGxldGVkQ291bnQgLyB0b3RhbENvdW50ID4gc2VsZi5sb2FkaW5nQmFyLnByb2dyZXNzKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5sb2FkaW5nQmFyLnByb2dyZXNzID0gY29tcGxldGVkQ291bnQgLyB0b3RhbENvdW50O1xuICAgICAgICAgICAgICAgIHNlbGYucHJvZ3Jlc3NfbGFiZWwuc3RyaW5nID0gcGFyc2VJbnQoKGNvbXBsZXRlZENvdW50IC8gdG90YWxDb3VudCkgKiAxMDApICsgXCIlXCI7XG5cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAvLyBzZWxmLmxvYWRpbmdCYXIud2lkdGggPSAzNTAqIChjb21wbGV0ZWRDb3VudC90b3RhbENvdW50KTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycm9yLCBhc3NldCkge1xuICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY2MubG9nKFwi5Yqg6L295aSx6LSlXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZi5sb2FkX1N1Y2NlcygpO1xuICAgICAgICAgICAgICAgIGNjLmxvZyhcIuWKoOi9veaIkOWKn1wiKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pXG4gICAgfSxcblxuICAgIC8v6YeN5paw5Yqg6L295ri45oiPXG4gICAgcmVzdF9sb2FkX2dhbWU6IGZ1bmN0aW9uIChkdCkge1xuICAgICAgICB0aGlzLnRpbWUgKz0gZHQ7XG4gICAgICAgIGlmICh0aGlzLnRpbWUgPj0gMTUpIHtcbiAgICAgICAgICAgIHRoaXMudGltZSA9IDA7XG4gICAgICAgICAgICB0aGlzLnJlc3RfY291bnQrKztcbiAgICAgICAgICAgIHRoaXMud29ya19sYWJlbC5zdHJpbmcgPSBcIuato+WcqOWwneivlemHjeaWsOWKoOi9vS4uLlwiO1xuICAgICAgICAgICAgaWYgKHRoaXMucmVzdF9jb3VudCA+PSAyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzc19sYWJlbC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMud29ya19sYWJlbC5zdHJpbmcgPSBcIueUseS6jue9kee7nOazouWKqOWKoOi9veWksei0pe+8jOivt+a4hemZpOe8k+WtmOWQjumHjeaWsOi/m+WFpX5vKOKVpe+5j+KVpSlvflwiXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5pbmlfbm9kZSgpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMudGltZSA9IDA7XG4gICAgICAgIHRoaXMucmVzdF9jb3VudCA9IDA7XG4gICAgICAgIHRoaXMuaW5pX25vZGUoKTtcbiAgICB9LFxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9LFxuXG4gICAgdXBkYXRlKGR0KSB7XG4gICAgICAgIHRoaXMucmVzdF9sb2FkX2dhbWUoZHQpO1xuICAgIH0sXG59KTtcbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/AdMob.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '421691hC8FIY7NsvX/7RhYr', 'AdMob');
// script/AdMob.js

"use strict";

cc.Class({
  "extends": cc.Component,
  onLoad: function onLoad() {
    //Add this line to onLoad
    this.admobInit();
  },
  admobInit: function admobInit() {
    if (cc.sys.isMobile) {
      var self = this;
      sdkbox.PluginAdMob.setListener({
        adViewDidReceiveAd: function adViewDidReceiveAd(name) {
          self.showInfo('adViewDidReceiveAd name=' + name);
        },
        adViewDidFailToReceiveAdWithError: function adViewDidFailToReceiveAdWithError(name, msg) {
          self.showInfo('adViewDidFailToReceiveAdWithError name=' + name + ' msg=' + msg);
        },
        adViewWillPresentScreen: function adViewWillPresentScreen(name) {
          self.showInfo('adViewWillPresentScreen name=' + name);
        },
        adViewDidDismissScreen: function adViewDidDismissScreen(name) {
          self.showInfo('adViewDidDismissScreen name=' + name);
        },
        adViewWillDismissScreen: function adViewWillDismissScreen(name) {
          self.showInfo('adViewWillDismissScreen=' + name);
        },
        adViewWillLeaveApplication: function adViewWillLeaveApplication(name) {
          self.showInfo('adViewWillLeaveApplication=' + name);
        } // reward: function(name, currency, amount) {
        //     self.log('reward:'+name+':'+currency+':'+amount);
        // }

      });
      sdkbox.PluginAdMob.init();
    }
  },
  showInfo: function showInfo(string) {
    cc.log(string);
  },
  cacheInterstitial: function cacheInterstitial() {
    if (cc.sys.isMobile) {
      sdkbox.PluginAdMob.cache('interstitial');
    }
  },
  showInterstitial: function showInterstitial() {
    if (cc.sys.isMobile) {
      sdkbox.PluginAdMob.show('interstitial');
    }
  },
  showVideo: function showVideo() {
    if (cc.sys.isMobile) {
      sdkbox.PluginAdMob.show('reward');
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxBZE1vYi5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50Iiwib25Mb2FkIiwiYWRtb2JJbml0Iiwic3lzIiwiaXNNb2JpbGUiLCJzZWxmIiwic2RrYm94IiwiUGx1Z2luQWRNb2IiLCJzZXRMaXN0ZW5lciIsImFkVmlld0RpZFJlY2VpdmVBZCIsIm5hbWUiLCJzaG93SW5mbyIsImFkVmlld0RpZEZhaWxUb1JlY2VpdmVBZFdpdGhFcnJvciIsIm1zZyIsImFkVmlld1dpbGxQcmVzZW50U2NyZWVuIiwiYWRWaWV3RGlkRGlzbWlzc1NjcmVlbiIsImFkVmlld1dpbGxEaXNtaXNzU2NyZWVuIiwiYWRWaWV3V2lsbExlYXZlQXBwbGljYXRpb24iLCJpbml0Iiwic3RyaW5nIiwibG9nIiwiY2FjaGVJbnRlcnN0aXRpYWwiLCJjYWNoZSIsInNob3dJbnRlcnN0aXRpYWwiLCJzaG93Iiwic2hvd1ZpZGVvIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUVMQyxFQUFBQSxNQUFNLEVBQUUsa0JBQVk7QUFDaEI7QUFDQSxTQUFLQyxTQUFMO0FBQ0gsR0FMSTtBQU9MQSxFQUFBQSxTQUFTLEVBQUUscUJBQVk7QUFDbkIsUUFBSUosRUFBRSxDQUFDSyxHQUFILENBQU9DLFFBQVgsRUFBcUI7QUFDakIsVUFBSUMsSUFBSSxHQUFHLElBQVg7QUFDQUMsTUFBQUEsTUFBTSxDQUFDQyxXQUFQLENBQW1CQyxXQUFuQixDQUErQjtBQUMzQkMsUUFBQUEsa0JBQWtCLEVBQUUsNEJBQVVDLElBQVYsRUFBZ0I7QUFDaENMLFVBQUFBLElBQUksQ0FBQ00sUUFBTCxDQUFjLDZCQUE2QkQsSUFBM0M7QUFDSCxTQUgwQjtBQUkzQkUsUUFBQUEsaUNBQWlDLEVBQUUsMkNBQVVGLElBQVYsRUFBZ0JHLEdBQWhCLEVBQXFCO0FBQ3BEUixVQUFBQSxJQUFJLENBQUNNLFFBQUwsQ0FBYyw0Q0FBNENELElBQTVDLEdBQW1ELE9BQW5ELEdBQTZERyxHQUEzRTtBQUNILFNBTjBCO0FBTzNCQyxRQUFBQSx1QkFBdUIsRUFBRSxpQ0FBVUosSUFBVixFQUFnQjtBQUNyQ0wsVUFBQUEsSUFBSSxDQUFDTSxRQUFMLENBQWMsa0NBQWtDRCxJQUFoRDtBQUNILFNBVDBCO0FBVTNCSyxRQUFBQSxzQkFBc0IsRUFBRSxnQ0FBVUwsSUFBVixFQUFnQjtBQUNwQ0wsVUFBQUEsSUFBSSxDQUFDTSxRQUFMLENBQWMsaUNBQWlDRCxJQUEvQztBQUNILFNBWjBCO0FBYTNCTSxRQUFBQSx1QkFBdUIsRUFBRSxpQ0FBVU4sSUFBVixFQUFnQjtBQUNyQ0wsVUFBQUEsSUFBSSxDQUFDTSxRQUFMLENBQWMsNkJBQTZCRCxJQUEzQztBQUNILFNBZjBCO0FBZ0IzQk8sUUFBQUEsMEJBQTBCLEVBQUUsb0NBQVVQLElBQVYsRUFBZ0I7QUFDeENMLFVBQUFBLElBQUksQ0FBQ00sUUFBTCxDQUFjLGdDQUFnQ0QsSUFBOUM7QUFDSCxTQWxCMEIsQ0FtQjNCO0FBQ0E7QUFDQTs7QUFyQjJCLE9BQS9CO0FBdUJBSixNQUFBQSxNQUFNLENBQUNDLFdBQVAsQ0FBbUJXLElBQW5CO0FBQ0g7QUFDSixHQW5DSTtBQXFDTFAsRUFBQUEsUUFBUSxFQUFFLGtCQUFTUSxNQUFULEVBQWdCO0FBQ3RCckIsSUFBQUEsRUFBRSxDQUFDc0IsR0FBSCxDQUFPRCxNQUFQO0FBQ0gsR0F2Q0k7QUF3Q0xFLEVBQUFBLGlCQUFpQixFQUFFLDZCQUFZO0FBQzNCLFFBQUl2QixFQUFFLENBQUNLLEdBQUgsQ0FBT0MsUUFBWCxFQUFxQjtBQUNqQkUsTUFBQUEsTUFBTSxDQUFDQyxXQUFQLENBQW1CZSxLQUFuQixDQUF5QixjQUF6QjtBQUVIO0FBQ0osR0E3Q0k7QUErQ0xDLEVBQUFBLGdCQUFnQixFQUFFLDRCQUFZO0FBQzFCLFFBQUl6QixFQUFFLENBQUNLLEdBQUgsQ0FBT0MsUUFBWCxFQUFxQjtBQUNqQkUsTUFBQUEsTUFBTSxDQUFDQyxXQUFQLENBQW1CaUIsSUFBbkIsQ0FBd0IsY0FBeEI7QUFFSDtBQUNKLEdBcERJO0FBc0RMQyxFQUFBQSxTQUFTLEVBQUUscUJBQVk7QUFDbkIsUUFBSTNCLEVBQUUsQ0FBQ0ssR0FBSCxDQUFPQyxRQUFYLEVBQXFCO0FBQ2pCRSxNQUFBQSxNQUFNLENBQUNDLFdBQVAsQ0FBbUJpQixJQUFuQixDQUF3QixRQUF4QjtBQUNIO0FBRUo7QUEzREksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy9BZGQgdGhpcyBsaW5lIHRvIG9uTG9hZFxyXG4gICAgICAgIHRoaXMuYWRtb2JJbml0KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGFkbW9iSW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmIChjYy5zeXMuaXNNb2JpbGUpIHtcclxuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIHNka2JveC5QbHVnaW5BZE1vYi5zZXRMaXN0ZW5lcih7XHJcbiAgICAgICAgICAgICAgICBhZFZpZXdEaWRSZWNlaXZlQWQ6IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zaG93SW5mbygnYWRWaWV3RGlkUmVjZWl2ZUFkIG5hbWU9JyArIG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFkVmlld0RpZEZhaWxUb1JlY2VpdmVBZFdpdGhFcnJvcjogZnVuY3Rpb24gKG5hbWUsIG1zZykge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2hvd0luZm8oJ2FkVmlld0RpZEZhaWxUb1JlY2VpdmVBZFdpdGhFcnJvciBuYW1lPScgKyBuYW1lICsgJyBtc2c9JyArIG1zZyk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWRWaWV3V2lsbFByZXNlbnRTY3JlZW46IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zaG93SW5mbygnYWRWaWV3V2lsbFByZXNlbnRTY3JlZW4gbmFtZT0nICsgbmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWRWaWV3RGlkRGlzbWlzc1NjcmVlbjogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNob3dJbmZvKCdhZFZpZXdEaWREaXNtaXNzU2NyZWVuIG5hbWU9JyArIG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFkVmlld1dpbGxEaXNtaXNzU2NyZWVuOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2hvd0luZm8oJ2FkVmlld1dpbGxEaXNtaXNzU2NyZWVuPScgKyBuYW1lKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhZFZpZXdXaWxsTGVhdmVBcHBsaWNhdGlvbjogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNob3dJbmZvKCdhZFZpZXdXaWxsTGVhdmVBcHBsaWNhdGlvbj0nICsgbmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgLy8gcmV3YXJkOiBmdW5jdGlvbihuYW1lLCBjdXJyZW5jeSwgYW1vdW50KSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgc2VsZi5sb2coJ3Jld2FyZDonK25hbWUrJzonK2N1cnJlbmN5Kyc6JythbW91bnQpO1xyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgc2RrYm94LlBsdWdpbkFkTW9iLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHNob3dJbmZvOiBmdW5jdGlvbihzdHJpbmcpe1xyXG4gICAgICAgIGNjLmxvZyhzdHJpbmcpO1xyXG4gICAgfSxcclxuICAgIGNhY2hlSW50ZXJzdGl0aWFsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKGNjLnN5cy5pc01vYmlsZSkge1xyXG4gICAgICAgICAgICBzZGtib3guUGx1Z2luQWRNb2IuY2FjaGUoJ2ludGVyc3RpdGlhbCcpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHNob3dJbnRlcnN0aXRpYWw6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoY2Muc3lzLmlzTW9iaWxlKSB7XHJcbiAgICAgICAgICAgIHNka2JveC5QbHVnaW5BZE1vYi5zaG93KCdpbnRlcnN0aXRpYWwnKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzaG93VmlkZW86IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoY2Muc3lzLmlzTW9iaWxlKSB7XHJcbiAgICAgICAgICAgIHNka2JveC5QbHVnaW5BZE1vYi5zaG93KCdyZXdhcmQnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufSk7Il19
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
      type_bye: 'gold',
      cost: 500,
      id_product: 8,
      count: 0
    },
    1: {
      have: 1,
      type_bye: 'gold',
      cost: 500,
      id_product: 8,
      count: 0
    },
    2: {
      have: 1,
      type_bye: 'gold',
      cost: 500,
      id_product: 8,
      count: 0
    },
    3: {
      have: 0,
      type_bye: 'gold',
      cost: 500,
      id_product: 8,
      count: 0
    },
    4: {
      have: 0,
      type_bye: 'gold',
      cost: 500,
      id_product: 8,
      count: 0
    },
    5: {
      have: 0,
      type_bye: 'gold',
      cost: 500,
      id_product: 8,
      count: 0
    },
    6: {
      have: 0,
      type_bye: 'gold',
      cost: 500,
      id_product: 8,
      count: 0
    },
    7: {
      have: 0,
      type_bye: 'gold',
      cost: 500,
      id_product: 8,
      count: 0
    },
    8: {
      have: 0,
      type_bye: 'gold',
      cost: 500,
      id_product: 8,
      count: 0
    },
    9: {
      have: 0,
      type_bye: 'gold',
      cost: 500,
      id_product: 8,
      count: 0
    },
    10: {
      have: 0,
      type_bye: 'gold',
      cost: 500,
      id_product: 8,
      count: 0
    },
    11: {
      have: 0,
      type_bye: 'gold',
      cost: 500,
      id_product: 8,
      count: 0
    },
    12: {
      have: 0,
      type_bye: 'gold',
      cost: 500,
      id_product: 8,
      count: 0
    },
    13: {
      have: 0,
      type_bye: 'gold',
      cost: 500,
      id_product: 8,
      count: 0
    },
    14: {
      have: 0,
      type_bye: 'gold',
      cost: 500,
      id_product: 8,
      count: 0
    },
    15: {
      have: 0,
      type_bye: 'gold',
      cost: 500,
      id_product: 8,
      count: 0
    },
    16: {
      have: 0,
      type_bye: 'gold',
      cost: 500,
      id_product: 8,
      count: 0
    },
    17: {
      have: 0,
      type_bye: 'gold',
      cost: 500,
      id_product: 8,
      count: 0
    },
    18: {
      have: 0,
      type_bye: 'gold',
      cost: 500,
      id_product: 8,
      count: 0
    },
    19: {
      have: 0,
      type_bye: 'gold',
      cost: 500,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1c2VyX2RhdGEuanMiXSwibmFtZXMiOlsidXNlcl9kYXRhIiwic2F2ZV9kYXRlIiwibm92aWNlIiwiZ29sZCIsImRpYW1vbmQiLCJsZXZlbCIsIm5vd19leCIsIndhcmVIb3VzZV9sZXZlbCIsInNraWxsX3BvaW50IiwibG9naW5fdGltZSIsInNvdW5kX3N0YXRlIiwiaG90ZWxfY2FjaGVfZ29sZCIsInZpZGVvdGFwZV9zaGFyZV9jb3VudCIsImF1dG9fc2VsbCIsInN0YWZmIiwiaGF2ZSIsIm92ZXJfdGltZSIsInNraWxsIiwiZ29sZF9tYXgiLCJzcGVlZF90aGVfY3V0Iiwid2F0ZXJfc2F2aW5nIiwidG9vbF9pbXByb3ZlIiwibGFib3JfY29udHJhY3QiLCJvZmZsaW5lX3Byb2ZpdCIsInBldCIsImhhdmVfYWQiLCJjcmVhdGVfdGltZSIsInNoYXJlX2NvdW50IiwidHJhZGVyIiwicmVjaXBlcyIsImxhbmQiLCJsYW5kX3N0YXRlIiwicGxhbnRfdHlwZSIsImFsaXZlX3N0YWdlIiwid2F0ZXJfbnVtIiwiaGF2ZV93YXRlciIsIndhcmVIb3VzZSIsInR5cGVfYnllIiwiY29zdCIsImlkX3Byb2R1Y3QiLCJjb3VudCIsInBsYW50IiwiaG90ZWwiLCJzdGFydF90aW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUlBLFNBQVMsR0FBRztBQUNaQyxFQUFBQSxTQUFTLEVBQUUsQ0FEQztBQUVaQyxFQUFBQSxNQUFNLEVBQUUsQ0FGSTtBQUdaQyxFQUFBQSxJQUFJLEVBQUUsQ0FITTtBQUlaQyxFQUFBQSxPQUFPLEVBQUUsQ0FKRztBQUtaQyxFQUFBQSxLQUFLLEVBQUUsQ0FMSztBQU1aQyxFQUFBQSxNQUFNLEVBQUUsQ0FOSTtBQU9aQyxFQUFBQSxlQUFlLEVBQUUsQ0FQTDtBQVFaQyxFQUFBQSxXQUFXLEVBQUUsQ0FSRDtBQVNaQyxFQUFBQSxVQUFVLEVB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LEVBQUUsQ0FKWjtBQUtBQyxNQUFBQSxLQUFLLEVBQUU7QUFMUDtBQXRJRyxHQTVIQztBQTBRWkMsRUFBQUEsS0FBSyxFQUFFO0FBQ0gsT0FBRztBQUNDMUIsTUFBQUEsSUFBSSxFQUFFO0FBRFAsS0FEQTtBQUlILE9BQUc7QUFDQ0EsTUFBQUEsSUFBSSxFQUFFO0FBRFAsS0FKQTtBQU9ILE9BQUc7QUFDQ0EsTUFBQUEsSUFBSSxFQUFFO0FBRFAsS0FQQTtBQVVILE9BQUc7QUFDQ0EsTUFBQUEsSUFBSSxFQUFFO0FBRFAsS0FWQTtBQWFILE9BQUc7QUFDQ0EsTUFBQUEsSUFBSSxFQUFFO0FBRFAsS0FiQTtBQWdCSCxPQUFHO0FBQ0NBLE1BQUFBLElBQUksRUFBRTtBQURQLEtBaEJBO0FBbUJILE9BQUc7QUFDQ0EsTUFBQUEsSUFBSSxFQUFFO0FBRFAsS0FuQkE7QUFzQkgsT0FBRztBQUNDQSxNQUFBQSxJQUFJLEVBQUU7QUFEUDtBQXRCQSxHQTFRSztBQW9TWjJCLEVBQUFBLEtBQUssRUFBRTtBQUNILE9BQUc7QUFDQzNCLE1BQUFBLElBQUksRUFBRSxDQURQO0FBRUM0QixNQUFBQSxVQUFVLEVBQUU7QUFGYixLQURBO0FBS0gsT0FBRztBQUNDNUIsTUFBQUEsSUFBSSxFQUFFLENBRFA7QUFFQzRCLE1BQUFBLFVBQVUsRUFBRTtBQUZiLEtBTEE7QUFTSCxPQUFHO0FBQ0M1QixNQUFBQSxJQUFJLEVBQUUsQ0FEUDtBQUVDNEIsTUFBQUEsVUFBVSxFQUFFO0FBRmIsS0FUQTtBQWFILE9BQUc7QUFDQzVCLE1BQUFBLElBQUksRUFBRSxDQURQO0FBRUM0QixNQUFBQSxVQUFVLEVBQUU7QUFGYjtBQWJBO0FBcFNLLENBQWhCO2VBd1RlO0FBQ1gzQyxFQUFBQSxTQUFTLEVBQVRBO0FBRFciLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8v5a+56LGh6L2sanNvbuaVsOaNruWtmOWCqFxuLy8gY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2VyRGF0YScsIEpTT04uc3RyaW5naWZ5KHVzZXJEYXRhKSk7XG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vL+ivu+WPlmpzb27mlbDmja5cbi8vdmFyIHVzZXJEYXRhID0gSlNPTi5wYXJzZShjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJEYXRhJykpO1xudmFyIHVzZXJfZGF0YSA9IHtcbiAgICBzYXZlX2RhdGU6IDAsXG4gICAgbm92aWNlOiAwLFxuICAgIGdvbGQ6IDAsXG4gICAgZGlhbW9uZDogMCxcbiAgICBsZXZlbDogMSxcbiAgICBub3dfZXg6IDAsXG4gICAgd2FyZUhvdXNlX2xldmVsOiAxLFxuICAgIHNraWxsX3BvaW50OiAxLFxuICAgIGxvZ2luX3RpbWU6IDAsXG4gICAgc291bmRfc3RhdGU6IDEsXG4gICAgaG90ZWxfY2FjaGVfZ29sZDogMCxcbiAgICB2aWRlb3RhcGVfc2hhcmVfY291bnQ6IDAsXG4gICAgYXV0b19zZWxsOiAwLCAgIC8vIHThu7EgxJHhu5luZyBiw6FuIHJhdSBj4bunXG4gICAgc3RhZmY6IHtcbiAgICAgICAgMDoge1xuICAgICAgICAgICAgaGF2ZTogMCxcbiAgICAgICAgICAgIG92ZXJfdGltZTogMCxcbiAgICAgICAgfSxcbiAgICAgICAgMToge1xuICAgICAgICAgICAgaGF2ZTogMCxcbiAgICAgICAgICAgIG92ZXJfdGltZTogMCxcbiAgICAgICAgfSxcbiAgICAgICAgMjoge1xuICAgICAgICAgICAgaGF2ZTogMCxcbiAgICAgICAgICAgIG92ZXJfdGltZTogMCxcbiAgICAgICAgfSxcbiAgICAgICAgMzoge1xuICAgICAgICAgICAgaGF2ZTogMCxcbiAgICAgICAgICAgIG92ZXJfdGltZTogMCxcbiAgICAgICAgfSxcbiAgICAgICAgNDoge1xuICAgICAgICAgICAgaGF2ZTogMCxcbiAgICAgICAgICAgIG92ZXJfdGltZTogMCxcbiAgICAgICAgfSxcbiAgICAgICAgNToge1xuICAgICAgICAgICAgaGF2ZTogMCxcbiAgICAgICAgICAgIG92ZXJfdGltZTogMCxcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIHNraWxsOiB7XG4gICAgICAgIGdvbGRfbWF4OiAwLFxuICAgICAgICBzcGVlZF90aGVfY3V0OiAwLFxuICAgICAgICB3YXRlcl9zYXZpbmc6IDAsXG4gICAgICAgIHRvb2xfaW1wcm92ZTogMCxcbiAgICAgICAgbGFib3JfY29udHJhY3Q6IDAsXG4gICAgICAgIG9mZmxpbmVfcHJvZml0OiAxLFxuICAgIH0sXG4gICAgcGV0OiB7XG4gICAgICAgIDA6IHtcbiAgICAgICAgICAgIGhhdmU6IDAsXG4gICAgICAgICAgICBoYXZlX2FkOiAwLFxuICAgICAgICB9LFxuICAgICAgICAxOiB7XG4gICAgICAgICAgICBoYXZlOiAwLFxuICAgICAgICAgICAgaGF2ZV9hZDogMCxcbiAgICAgICAgfSxcbiAgICAgICAgMjoge1xuICAgICAgICAgICAgaGF2ZTogMCxcbiAgICAgICAgICAgIGhhdmVfYWQ6IDEsXG4gICAgICAgICAgICBjcmVhdGVfdGltZTogMCxcbiAgICAgICAgICAgIHNoYXJlX2NvdW50OiAwLFxuICAgICAgICB9LFxuICAgICAgICAzOiB7XG4gICAgICAgICAgICBoYXZlOiAwLFxuICAgICAgICAgICAgaGF2ZV9hZDogMSxcbiAgICAgICAgICAgIGNyZWF0ZV90aW1lOiAwLFxuICAgICAgICAgICAgc2hhcmVfY291bnQ6IDAsXG4gICAgICAgIH0sXG4gICAgfSxcbiAgICAvL+WVhuS6ulxuICAgIHRyYWRlcjoge1xuICAgICAgICByZWNpcGVzOiAwLFxuICAgIH0sXG4gICAgbGFuZDoge1xuICAgICAgICAwOiB7XG4gICAgICAgICAgICBsYW5kX3N0YXRlOiBcIndhaXRfdGlsbFwiLFxuICAgICAgICAgICAgaGF2ZTogMSxcbiAgICAgICAgICAgIHBsYW50X3R5cGU6IDAsXG4gICAgICAgICAgICBhbGl2ZV9zdGFnZTogMCxcbiAgICAgICAgICAgIHdhdGVyX251bTogNTAsXG4gICAgICAgICAgICBoYXZlX3dhdGVyOiAxLFxuICAgICAgICB9LFxuICAgICAgICAxOiB7XG4gICAgICAgICAgICBsYW5kX3N0YXRlOiBcIndhaXRfdGlsbFwiLFxuICAgICAgICAgICAgaGF2ZTogMCxcbiAgICAgICAgICAgIHBsYW50X3R5cGU6IDAsXG4gICAgICAgICAgICBhbGl2ZV9zdGFnZTogMCxcbiAgICAgICAgICAgIHdhdGVyX251bTogNTAsXG4gICAgICAgICAgICBoYXZlX3dhdGVyOiAxLFxuICAgICAgICB9LFxuICAgICAgICAyOiB7XG4gICAgICAgICAgICBsYW5kX3N0YXRlOiBcIndhaXRfdGlsbFwiLFxuICAgICAgICAgICAgaGF2ZTogMCxcbiAgICAgICAgICAgIHBsYW50X3R5cGU6IDAsXG4gICAgICAgICAgICBhbGl2ZV9zdGFnZTogMCxcbiAgICAgICAgICAgIHdhdGVyX251bTogNTAsXG4gICAgICAgICAgICBoYXZlX3dhdGVyOiAxLFxuICAgICAgICB9LFxuICAgICAgICAzOiB7XG4gICAgICAgICAgICBsYW5kX3N0YXRlOiBcIndhaXRfdGlsbFwiLFxuICAgICAgICAgICAgaGF2ZTogMCxcbiAgICAgICAgICAgIHBsYW50X3R5cGU6IDAsXG4gICAgICAgICAgICBhbGl2ZV9zdGFnZTogMCxcbiAgICAgICAgICAgIHdhdGVyX251bTogNTAsXG4gICAgICAgICAgICBoYXZlX3dhdGVyOiAxLFxuICAgICAgICB9LFxuICAgICAgICA0OiB7XG4gICAgICAgICAgICBsYW5kX3N0YXRlOiBcIndhaXRfdGlsbFwiLFxuICAgICAgICAgICAgaGF2ZTogMCxcbiAgICAgICAgICAgIHBsYW50X3R5cGU6IDAsXG4gICAgICAgICAgICBhbGl2ZV9zdGFnZTogMCxcbiAgICAgICAgICAgIHdhdGVyX251bTogNTAsXG4gICAgICAgICAgICBoYXZlX3dhdGVyOiAxLFxuICAgICAgICB9LFxuICAgICAgICA1OiB7XG4gICAgICAgICAgICBsYW5kX3N0YXRlOiBcIndhaXRfdGlsbFwiLFxuICAgICAgICAgICAgaGF2ZTogMCxcbiAgICAgICAgICAgIHBsYW50X3R5cGU6IDAsXG4gICAgICAgICAgICBhbGl2ZV9zdGFnZTogMCxcbiAgICAgICAgICAgIHdhdGVyX251bTogNTAsXG4gICAgICAgICAgICBoYXZlX3dhdGVyOiAxLFxuICAgICAgICB9LFxuICAgIH0sXG4gICAgd2FyZUhvdXNlOiB7XG4gICAgICAgIDA6IHtcbiAgICAgICAgICAgIGhhdmU6IDEsXG4gICAgICAgICAgICB0eXBlX2J5ZTogJ2dvbGQnLFxuICAgICAgICAgICAgY29zdDogNTAwLFxuICAgICAgICAgICAgaWRfcHJvZHVjdDogOCxcbiAgICAgICAgICAgIGNvdW50OiAwLFxuICAgICAgICB9LFxuICAgICAgICAxOiB7XG4gICAgICAgICAgICBoYXZlOiAxLFxuICAgICAgICAgICAgdHlwZV9ieWU6ICdnb2xkJyxcbiAgICAgICAgICAgIGNvc3Q6IDUwMCxcbiAgICAgICAgICAgIGlkX3Byb2R1Y3Q6IDgsXG4gICAgICAgICAgICBjb3VudDogMCxcbiAgICAgICAgfSxcbiAgICAgICAgMjoge1xuICAgICAgICAgICAgaGF2ZTogMSxcbiAgICAgICAgICAgIHR5cGVfYnllOiAnZ29sZCcsXG4gICAgICAgICAgICBjb3N0OiA1MDAsXG4gICAgICAgICAgICBpZF9wcm9kdWN0OiA4LFxuICAgICAgICAgICAgY291bnQ6IDAsXG4gICAgICAgIH0sXG4gICAgICAgIDM6IHtcbiAgICAgICAgICAgIGhhdmU6IDAsXG4gICAgICAgICAgICB0eXBlX2J5ZTogJ2dvbGQnLFxuICAgICAgICAgICAgY29zdDogNTAwLFxuICAgICAgICAgICAgaWRfcHJvZHVjdDogOCxcbiAgICAgICAgICAgIGNvdW50OiAwLFxuICAgICAgICB9LFxuICAgICAgICA0OiB7XG4gICAgICAgICAgICBoYXZlOiAwLFxuICAgICAgICAgICAgdHlwZV9ieWU6ICdnb2xkJyxcbiAgICAgICAgICAgIGNvc3Q6IDUwMCxcbiAgICAgICAgICAgIGlkX3Byb2R1Y3Q6IDgsXG4gICAgICAgICAgICBjb3VudDogMCxcbiAgICAgICAgfSxcbiAgICAgICAgNToge1xuICAgICAgICAgICAgaGF2ZTogMCxcbiAgICAgICAgICAgIHR5cGVfYnllOiAnZ29sZCcsXG4gICAgICAgICAgICBjb3N0OiA1MDAsXG4gICAgICAgICAgICBpZF9wcm9kdWN0OiA4LFxuICAgICAgICAgICAgY291bnQ6IDAsXG4gICAgICAgIH0sXG4gICAgICAgIDY6IHtcbiAgICAgICAgICAgIGhhdmU6IDAsXG4gICAgICAgICAgICB0eXBlX2J5ZTogJ2dvbGQnLFxuICAgICAgICAgICAgY29zdDogNTAwLFxuICAgICAgICAgICAgaWRfcHJvZHVjdDogOCxcbiAgICAgICAgICAgIGNvdW50OiAwLFxuICAgICAgICB9LFxuICAgICAgICA3OiB7XG4gICAgICAgICAgICBoYXZlOiAwLFxuICAgICAgICAgICAgdHlwZV9ieWU6ICdnb2xkJyxcbiAgICAgICAgICAgIGNvc3Q6IDUwMCxcbiAgICAgICAgICAgIGlkX3Byb2R1Y3Q6IDgsXG4gICAgICAgICAgICBjb3VudDogMCxcbiAgICAgICAgfSxcbiAgICAgICAgODoge1xuICAgICAgICAgICAgaGF2ZTogMCxcbiAgICAgICAgICAgIHR5cGVfYnllOiAnZ29sZCcsXG4gICAgICAgICAgICBjb3N0OiA1MDAsXG4gICAgICAgICAgICBpZF9wcm9kdWN0OiA4LFxuICAgICAgICAgICAgY291bnQ6IDAsXG4gICAgICAgIH0sXG4gICAgICAgIDk6IHtcbiAgICAgICAgICAgIGhhdmU6IDAsXG4gICAgICAgICAgICB0eXBlX2J5ZTogJ2dvbGQnLFxuICAgICAgICAgICAgY29zdDogNTAwLFxuICAgICAgICAgICAgaWRfcHJvZHVjdDogOCxcbiAgICAgICAgICAgIGNvdW50OiAwLFxuICAgICAgICB9LFxuICAgICAgICAxMDoge1xuICAgICAgICAgICAgaGF2ZTogMCxcbiAgICAgICAgICAgIHR5cGVfYnllOiAnZ29sZCcsXG4gICAgICAgICAgICBjb3N0OiA1MDAsXG4gICAgICAgICAgICBpZF9wcm9kdWN0OiA4LFxuICAgICAgICAgICAgY291bnQ6IDAsXG4gICAgICAgIH0sXG4gICAgICAgIDExOiB7XG4gICAgICAgICAgICBoYXZlOiAwLFxuICAgICAgICAgICAgdHlwZV9ieWU6ICdnb2xkJyxcbiAgICAgICAgICAgIGNvc3Q6IDUwMCxcbiAgICAgICAgICAgIGlkX3Byb2R1Y3Q6IDgsXG4gICAgICAgICAgICBjb3VudDogMCxcbiAgICAgICAgfSxcbiAgICAgICAgMTI6IHtcbiAgICAgICAgICAgIGhhdmU6IDAsXG4gICAgICAgICAgICB0eXBlX2J5ZTogJ2dvbGQnLFxuICAgICAgICAgICAgY29zdDogNTAwLFxuICAgICAgICAgICAgaWRfcHJvZHVjdDogOCxcbiAgICAgICAgICAgIGNvdW50OiAwLFxuICAgICAgICB9LFxuICAgICAgICAxMzoge1xuICAgICAgICAgICAgaGF2ZTogMCxcbiAgICAgICAgICAgIHR5cGVfYnllOiAnZ29sZCcsXG4gICAgICAgICAgICBjb3N0OiA1MDAsXG4gICAgICAgICAgICBpZF9wcm9kdWN0OiA4LFxuICAgICAgICAgICAgY291bnQ6IDAsXG4gICAgICAgIH0sXG4gICAgICAgIDE0OiB7XG4gICAgICAgICAgICBoYXZlOiAwLFxuICAgICAgICAgICAgdHlwZV9ieWU6ICdnb2xkJyxcbiAgICAgICAgICAgIGNvc3Q6IDUwMCxcbiAgICAgICAgICAgIGlkX3Byb2R1Y3Q6IDgsXG4gICAgICAgICAgICBjb3VudDogMCxcbiAgICAgICAgfSxcbiAgICAgICAgMTU6IHtcbiAgICAgICAgICAgIGhhdmU6IDAsXG4gICAgICAgICAgICB0eXBlX2J5ZTogJ2dvbGQnLFxuICAgICAgICAgICAgY29zdDogNTAwLFxuICAgICAgICAgICAgaWRfcHJvZHVjdDogOCxcbiAgICAgICAgICAgIGNvdW50OiAwLFxuICAgICAgICB9LFxuICAgICAgICAxNjoge1xuICAgICAgICAgICAgaGF2ZTogMCxcbiAgICAgICAgICAgIHR5cGVfYnllOiAnZ29sZCcsXG4gICAgICAgICAgICBjb3N0OiA1MDAsXG4gICAgICAgICAgICBpZF9wcm9kdWN0OiA4LFxuICAgICAgICAgICAgY291bnQ6IDAsXG4gICAgICAgIH0sXG4gICAgICAgIDE3OiB7XG4gICAgICAgICAgICBoYXZlOiAwLFxuICAgICAgICAgICAgdHlwZV9ieWU6ICdnb2xkJyxcbiAgICAgICAgICAgIGNvc3Q6IDUwMCxcbiAgICAgICAgICAgIGlkX3Byb2R1Y3Q6IDgsXG4gICAgICAgICAgICBjb3VudDogMCxcbiAgICAgICAgfSxcbiAgICAgICAgMTg6IHtcbiAgICAgICAgICAgIGhhdmU6IDAsXG4gICAgICAgICAgICB0eXBlX2J5ZTogJ2dvbGQnLFxuICAgICAgICAgICAgY29zdDogNTAwLFxuICAgICAgICAgICAgaWRfcHJvZHVjdDogOCxcbiAgICAgICAgICAgIGNvdW50OiAwLFxuICAgICAgICB9LFxuICAgICAgICAxOToge1xuICAgICAgICAgICAgaGF2ZTogMCxcbiAgICAgICAgICAgIHR5cGVfYnllOiAnZ29sZCcsXG4gICAgICAgICAgICBjb3N0OiA1MDAsXG4gICAgICAgICAgICBpZF9wcm9kdWN0OiA4LFxuICAgICAgICAgICAgY291bnQ6IDAsXG4gICAgICAgIH0sXG4gICAgfSxcbiAgICBwbGFudDoge1xuICAgICAgICAwOiB7XG4gICAgICAgICAgICBoYXZlOiAxLFxuICAgICAgICB9LFxuICAgICAgICAxOiB7XG4gICAgICAgICAgICBoYXZlOiAwLFxuICAgICAgICB9LFxuICAgICAgICAyOiB7XG4gICAgICAgICAgICBoYXZlOiAwLFxuICAgICAgICB9LFxuICAgICAgICAzOiB7XG4gICAgICAgICAgICBoYXZlOiAwLFxuICAgICAgICB9LFxuICAgICAgICA0OiB7XG4gICAgICAgICAgICBoYXZlOiAwLFxuICAgICAgICB9LFxuICAgICAgICA1OiB7XG4gICAgICAgICAgICBoYXZlOiAwLFxuICAgICAgICB9LFxuICAgICAgICA2OiB7XG4gICAgICAgICAgICBoYXZlOiAwLFxuICAgICAgICB9LFxuICAgICAgICA3OiB7XG4gICAgICAgICAgICBoYXZlOiAwLFxuICAgICAgICB9LFxuICAgIH0sXG4gICAgaG90ZWw6IHtcbiAgICAgICAgMDoge1xuICAgICAgICAgICAgaGF2ZTogMCxcbiAgICAgICAgICAgIHN0YXJ0X3RpbWU6IDAsXG4gICAgICAgIH0sXG4gICAgICAgIDE6IHtcbiAgICAgICAgICAgIGhhdmU6IDAsXG4gICAgICAgICAgICBzdGFydF90aW1lOiAwLFxuICAgICAgICB9LFxuICAgICAgICAyOiB7XG4gICAgICAgICAgICBoYXZlOiAwLFxuICAgICAgICAgICAgc3RhcnRfdGltZTogMCxcbiAgICAgICAgfSxcbiAgICAgICAgMzoge1xuICAgICAgICAgICAgaGF2ZTogMCxcbiAgICAgICAgICAgIHN0YXJ0X3RpbWU6IDAsXG4gICAgICAgIH0sXG4gICAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICB1c2VyX2RhdGEsXG59O1xuIl19
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
    staff_node: cc.Node
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

    this.schedule(callback, 1, cc.macro.REPEAT_FOREVER);
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
        //启动监听事件
        this.staff_node.on("touchstart", this.on_staff_node_touch, this);
        this.pupple_node.on("touchstart", this.on_staff_node_touch, this);
        var now_time = new Date().getTime() / 1000;
        var over_time = user_data.user_data.staff[this.staff_index].over_time;
        var rest_time = config.staff[this.staff_index].rest_time - user_data.user_data.trader.recipes; //休息时间最小值为0

        if (rest_time <= 0) {
          rest_time = 0;
        }

        ; //没有工作过就直接工作

        if (over_time == 0) {
          this.work_schedule();
          this.pupple_node.active = false;
          this.unschedule(callback);
          return;
        } else {
          if (now_time - over_time >= rest_time) {
            //休息结束
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

    this.schedule(callback, 1, cc.macro.REPEAT_FOREVER);
  },
  ini_node: function ini_node(staff_index) {
    this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
    ;
    this.sound_control = cc.find("sound_control").getComponent("sound_control");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxhaVxcc3RhZmZfYWkuanMiXSwibmFtZXMiOlsidXNlcl9kYXRhIiwicmVxdWlyZSIsImNvbmZpZyIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwicGxheWVyX25vZGUiLCJOb2RlIiwicHVwcGxlX25vZGUiLCJzdGFmZl9ub2RlIiwiY2hhbmdlX21vdmVtZW50X2RpcmVjdGlvbiIsImNhbGxiYWNrIiwic3RvcF9tb3ZlIiwid29ya19zdGF0ZSIsIm51bSIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInJlc3RfZGlyZWN0aW9uIiwibGVuZ3RoIiwibW92ZW1lbnRfZGlyZWN0aW9uIiwiYW5pbV9zZWxlY3QiLCJhbGxfZGlyZWN0aW9uIiwic2NoZWR1bGUiLCJhbmltIiwiZ2V0Q29tcG9uZW50IiwiQW5pbWF0aW9uIiwiYW5pbV9jbGlwcyIsImdldENsaXBzIiwicGxheSIsIm5hbWUiLCJub2RlIiwic2NhbGVYIiwiYWlfbW92ZSIsImR0IiwicyIsIm1vdmVfc3BlZWQiLCJ4IiwiYXV0b193b3JrIiwibGFuZF9qcyIsInBhcmVudCIsImxhbmRfaW5kZXgiLCJsYW5kIiwibGFuZF9zdGF0ZSIsImN1dCIsIndhdGVyX251bSIsIndhdGVyX2NoYXJnZSIsIm1hY3JvIiwiUkVQRUFUX0ZPUkVWRVIiLCJ3b3JrX3NjaGVkdWxlIiwid29ya190aW1lIiwic3RhZmYiLCJzdGFmZl9pbmRleCIsInNraWxsIiwidW5zY2hlZHVsZSIsIm5vd190aW1lIiwiRGF0ZSIsImdldFRpbWUiLCJvdmVyX3RpbWUiLCJyZXN0X3NjaGVkdWxlIiwib25fc3RhZmZfbm9kZV90b3VjaCIsInNvdW5kX2NvbnRyb2wiLCJwbGF5X3NvdW5kX2VmZmVjdCIsImdhbWVfc2NlbmVfanMiLCJjcmVhdGVfcmVzdF91aSIsIm9uIiwicmVzdF90aW1lIiwidHJhZGVyIiwicmVjaXBlcyIsImFjdGl2ZSIsIm9mZiIsImluaV9ub2RlIiwiZmluZCIs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RSxrQkFBVW5CLFdBQVYsRUFBdUI7QUFDN0IsU0FBS1csYUFBTCxHQUFxQjdELEVBQUUsQ0FBQ3NFLElBQUgsQ0FBUSxTQUFSLEVBQW1CL0MsWUFBbkIsQ0FBZ0MsWUFBaEMsQ0FBckI7QUFBbUU7QUFDbkUsU0FBS29DLGFBQUwsR0FBcUIzRCxFQUFFLENBQUNzRSxJQUFILENBQVEsZUFBUixFQUF5Qi9DLFlBQXpCLENBQXNDLGVBQXRDLENBQXJCO0FBQ0EsU0FBSzJCLFdBQUwsR0FBbUJBLFdBQW5CO0FBQ0EsU0FBSzlCLGFBQUwsR0FBcUIsQ0FBQyxRQUFELEVBQVcsUUFBWCxFQUFxQixTQUFyQixFQUFnQyxTQUFoQyxDQUFyQjtBQUNBLFNBQUtKLGNBQUwsR0FBc0IsQ0FBQyxRQUFELEVBQVcsUUFBWCxDQUF0QjtBQUNBLFNBQUtFLGtCQUFMLEdBQTBCLFFBQTFCLENBTjZCLENBTzdCOztBQUNBLFNBQUtnQixVQUFMLEdBQWtCLEVBQWxCLENBUjZCLENBUzdCOztBQUNBLFNBQUt4QixTQUFMLEdBQWlCLEtBQWpCO0FBQ0EsU0FBSzZELFdBQUwsR0FBbUIsSUFBbkI7QUFDQSxTQUFLNUQsVUFBTCxHQUFrQixJQUFsQjtBQUNBLFNBQUtrQixJQUFMLENBQVUyQyxXQUFWLENBQXNCLENBQXRCLEVBQXlCLENBQUMsR0FBMUI7QUFDSCxHQXpNSTtBQTJNTEMsRUFBQUEsTUEzTUssb0JBMk1JLENBRVIsQ0E3TUk7QUErTUxDLEVBQUFBLEtBL01LLG1CQStNRztBQUNKLFNBQUtsRSx5QkFBTDtBQUNBLFNBQUtXLFdBQUw7QUFDQSxTQUFLc0MsYUFBTDtBQUNBLFNBQUtyQixTQUFMO0FBQ0gsR0FwTkk7QUFzTkx1QyxFQUFBQSxNQXROSyxrQkFzTkUzQyxFQXRORixFQXNOTTtBQUNQLFNBQUtELE9BQUwsQ0FBYUMsRUFBYjtBQUNIO0FBeE5JLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciB1c2VyX2RhdGEgPSByZXF1aXJlKFwidXNlcl9kYXRhXCIpO1xudmFyIGNvbmZpZyA9IHJlcXVpcmUoXCJjb25maWdcIik7XG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBwbGF5ZXJfbm9kZTogY2MuTm9kZSxcbiAgICAgICAgcHVwcGxlX25vZGU6IGNjLk5vZGUsXG4gICAgICAgIHN0YWZmX25vZGU6IGNjLk5vZGUsXG4gICAgfSxcblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuICAgIC8vIOavj+malOWHoOenkuaUueWPmOenu+WKqOaWueWQkVxuICAgIGNoYW5nZV9tb3ZlbWVudF9kaXJlY3Rpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5zdG9wX21vdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmICh0aGlzLndvcmtfc3RhdGUgPT0gXCJyZXN0XCIpIHtcbiAgICAgICAgICAgICAgICB2YXIgbnVtID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5yZXN0X2RpcmVjdGlvbi5sZW5ndGggLSAxKSArIDE7XG4gICAgICAgICAgICAgICAgaWYgKG51bSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbnVtID0gMDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRoaXMubW92ZW1lbnRfZGlyZWN0aW9uID0gdGhpcy5yZXN0X2RpcmVjdGlvbltudW1dO1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbV9zZWxlY3QoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIG51bSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuYWxsX2RpcmVjdGlvbi5sZW5ndGggLSAxKSArIDE7XG4gICAgICAgICAgICAgICAgaWYgKG51bSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbnVtID0gMDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRoaXMubW92ZW1lbnRfZGlyZWN0aW9uID0gdGhpcy5hbGxfZGlyZWN0aW9uW251bV07XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltX3NlbGVjdCgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZShjYWxsYmFjaywgTWF0aC5yYW5kb20oKSAqIDMgKyAyKTtcbiAgICB9LFxuICAgIC8vYW5pbSBzZWxlY3RcbiAgICBhbmltX3NlbGVjdDogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYW5pbSA9IHRoaXMucGxheWVyX25vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XG4gICAgICAgIHZhciBhbmltX2NsaXBzID0gYW5pbS5nZXRDbGlwcygpOy8v6I635Y+W5Yqo55S75Ymq6L6RXG4gICAgICAgIHN3aXRjaCAodGhpcy5tb3ZlbWVudF9kaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIGNhc2UgXCJ6X2lkbGVcIjpcbiAgICAgICAgICAgICAgICBhbmltLnBsYXkoYW5pbV9jbGlwc1swXS5uYW1lKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJjX2lkbGVcIjpcbiAgICAgICAgICAgICAgICBhbmltLnBsYXkoYW5pbV9jbGlwc1sxXS5uYW1lKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJjX3J1bl9sXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNjYWxlWCA9IDE7XG4gICAgICAgICAgICAgICAgYW5pbS5wbGF5KGFuaW1fY2xpcHNbMl0ubmFtZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiY19ydW5fclwiOlxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zY2FsZVggPSAtMTtcbiAgICAgICAgICAgICAgICBhbmltLnBsYXkoYW5pbV9jbGlwc1syXS5uYW1lKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIC8v6ZqP5py65p+Q5Liq5pa55ZCR56e75YqoXG4gICAgYWlfbW92ZTogZnVuY3Rpb24gKGR0KSB7IC8vZHTmuLjmiI/ml7bpl7RcbiAgICAgICAgLy/lvpfliLDmr4/luKfnmoTpgJ/luqZcbiAgICAgICAgdmFyIHMgPSB0aGlzLm1vdmVfc3BlZWQgKiBkdDtcbiAgICAgICAgLy9cbiAgICAgICAgaWYgKHRoaXMubm9kZS54IDw9IC0xNTAgJiYgdGhpcy5zdG9wX21vdmUgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcF9tb3ZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMubW92ZW1lbnRfZGlyZWN0aW9uID0gXCJjX3J1bl9yXCI7XG4gICAgICAgICAgICB0aGlzLmFuaW1fc2VsZWN0KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMubm9kZS54ID49IDEzMCAmJiB0aGlzLnN0b3BfbW92ZSA9PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhpcy5zdG9wX21vdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5tb3ZlbWVudF9kaXJlY3Rpb24gPSBcImNfcnVuX2xcIjtcbiAgICAgICAgICAgIHRoaXMuYW5pbV9zZWxlY3QoKTtcblxuICAgICAgICB9XG4gICAgICAgIC8v5Yeg56eN5LiN5ZCM55qE56e75Yqo562W55WlXG4gICAgICAgIHN3aXRjaCAodGhpcy5tb3ZlbWVudF9kaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIGNhc2UgXCJ6X2lkbGVcIjpcbiAgICAgICAgICAgICAgICBzID0gMDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJjX2lkbGVcIjpcbiAgICAgICAgICAgICAgICBzID0gMDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJjX3J1bl9sXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnggLT0gcztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJjX3J1bl9yXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnggKz0gcztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfTtcblxuICAgIH0sXG4gICAgLy9hdXRvIHdvcmtcbiAgICBhdXRvX3dvcms6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGxhbmRfanMgPSB0aGlzLm5vZGUucGFyZW50LmdldENvbXBvbmVudChcImxhbmRcIik7XG4gICAgICAgIHZhciBsYW5kX2luZGV4ID0gbGFuZF9qcy5sYW5kX2luZGV4O1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvL+W3peS9nOeKtuaAgeW3peS9nFxuICAgICAgICAgICAgaWYgKHRoaXMud29ya19zdGF0ZSA9PSBcIndvcmtcIikge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAodXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW2xhbmRfaW5kZXhdLmxhbmRfc3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIndhaXRfY3V0XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBsYW5kX2pzLmN1dCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJncm93XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW2xhbmRfaW5kZXhdLndhdGVyX251bSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFuZF9qcy53YXRlcl9jaGFyZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgICAgIH07Ly9lbmQgc3dpdGNoXG4gICAgICAgICAgICAgICAgLy8gY2MubG9nKFwi5bel5L2c5LitXCIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9OyAvL2VuZCBpZlxuXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2NoZWR1bGUoY2FsbGJhY2ssIDEsIGNjLm1hY3JvLlJFUEVBVF9GT1JFVkVSKTtcbiAgICB9LFxuICAgIC8v5bel5L2c5a6a5pe25ZmoXG4gICAgd29ya19zY2hlZHVsZTogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHRoaXMud29ya19zdGF0ZSA9IFwid29ya1wiO1xuXG4gICAgICAgIHZhciB3b3JrX3RpbWUgPSBjb25maWcuc3RhZmZbdGhpcy5zdGFmZl9pbmRleF0ud29ya190aW1lICsgdXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbFtcImxhYm9yX2NvbnRyYWN0XCJdO1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB3b3JrX3RpbWUtLTtcbiAgICAgICAgICAgIGlmICh3b3JrX3RpbWUgPD0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZShjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgLy/lgZzmraLlt6XkvZzorqHml7blmahcbiAgICAgICAgICAgICAgICAvLyBjYy5sb2codGhpcy5zdGFmZl9pbmRleCwgXCLlj7fkvJHmga9cIik7XG4gICAgICAgICAgICAgICAgdmFyIG5vd190aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwO1xuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuc3RhZmZbdGhpcy5zdGFmZl9pbmRleF0ub3Zlcl90aW1lID0gbm93X3RpbWU7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXN0X3NjaGVkdWxlKCk7XG4gICAgICAgICAgICB9Oy8vZW5kIGlmXG4gICAgICAgIH07Ly9lbmQgY2FsbGJhY2tcblxuICAgICAgICB0aGlzLnNjaGVkdWxlKGNhbGxiYWNrLCAxLCBjYy5tYWNyby5SRVBFQVRfRk9SRVZFUik7XG4gICAgfSxcbiAgICAvL+S8keaBr+aXtuWwj+S6uuiiq+eCueWHu1xuICAgIG9uX3N0YWZmX25vZGVfdG91Y2goKSB7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9jbGlja1wiKTtcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9yZXN0X3VpKHRoaXMuZ2FtZV9zY2VuZV9qcy5ub2RlLCB0aGlzLnN0YWZmX2luZGV4KTtcbiAgICB9LFxuICAgIC8v5LyR5oGv5a6a5pe25ZmoXG4gICAgcmVzdF9zY2hlZHVsZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLndvcmtfc3RhdGUgPSBcInJlc3RcIjtcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMud29ya19zdGF0ZSA9PSBcInJlc3RcIikge1xuXG4gICAgICAgICAgICAgICAgLy/lkK/liqjnm5HlkKzkuovku7ZcbiAgICAgICAgICAgICAgICB0aGlzLnN0YWZmX25vZGUub24oXCJ0b3VjaHN0YXJ0XCIsIHRoaXMub25fc3RhZmZfbm9kZV90b3VjaCwgdGhpcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5wdXBwbGVfbm9kZS5vbihcInRvdWNoc3RhcnRcIiwgdGhpcy5vbl9zdGFmZl9ub2RlX3RvdWNoLCB0aGlzKVxuICAgICAgICAgICAgICAgIHZhciBub3dfdGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMDtcbiAgICAgICAgICAgICAgICB2YXIgb3Zlcl90aW1lID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5zdGFmZlt0aGlzLnN0YWZmX2luZGV4XS5vdmVyX3RpbWU7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3RfdGltZSA9IGNvbmZpZy5zdGFmZlt0aGlzLnN0YWZmX2luZGV4XS5yZXN0X3RpbWUgLSB1c2VyX2RhdGEudXNlcl9kYXRhLnRyYWRlci5yZWNpcGVzO1xuXG4gICAgICAgICAgICAgICAgLy/kvJHmga/ml7bpl7TmnIDlsI/lgLzkuLowXG4gICAgICAgICAgICAgICAgaWYgKHJlc3RfdGltZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3RfdGltZSA9IDA7XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIC8v5rKh5pyJ5bel5L2c6L+H5bCx55u05o6l5bel5L2cXG4gICAgICAgICAgICAgICAgaWYgKG92ZXJfdGltZSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ya19zY2hlZHVsZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnB1cHBsZV9ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUoY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vd190aW1lIC0gb3Zlcl90aW1lID49IHJlc3RfdGltZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy/kvJHmga/nu5PmnZ9cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNjLmxvZyh0aGlzLnN0YWZmX2luZGV4LCBcIuW8gOWni+W3peS9nFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHVwcGxlX25vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUoY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JrX3NjaGVkdWxlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWZmX25vZGUub2ZmKFwidG91Y2hzdGFydFwiLCB0aGlzLm9uX3N0YWZmX25vZGVfdG91Y2gsIHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wdXBwbGVfbm9kZS5vbihcInRvdWNoc3RhcnRcIiwgdGhpcy5vbl9zdGFmZl9ub2RlX3RvdWNoLCB0aGlzKVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2MubG9nKFwi5LyR5oGvXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JrX3N0YXRlID0gXCJyZXN0XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnB1cHBsZV9ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH07Ly9lbmQgaWZcblxuICAgICAgICAgICAgICAgIH07Ly9lbmQgaWZcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUoY2FsbGJhY2spO1xuICAgICAgICAgICAgfTsvLyBlbmQgaWZcblxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNjaGVkdWxlKGNhbGxiYWNrLCAxLCBjYy5tYWNyby5SRVBFQVRfRk9SRVZFUik7XG4gICAgfSxcbiAgICBpbmlfbm9kZTogZnVuY3Rpb24gKHN0YWZmX2luZGV4KSB7XG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfc2NlbmVcIik7O1xuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wgPSBjYy5maW5kKFwic291bmRfY29udHJvbFwiKS5nZXRDb21wb25lbnQoXCJzb3VuZF9jb250cm9sXCIpO1xuICAgICAgICB0aGlzLnN0YWZmX2luZGV4ID0gc3RhZmZfaW5kZXg7XG4gICAgICAgIHRoaXMuYWxsX2RpcmVjdGlvbiA9IFtcInpfaWRsZVwiLCBcImNfaWRsZVwiLCBcImNfcnVuX2xcIiwgXCJjX3J1bl9yXCJdO1xuICAgICAgICB0aGlzLnJlc3RfZGlyZWN0aW9uID0gW1wiel9pZGxlXCIsIFwiY19pZGxlXCJdO1xuICAgICAgICB0aGlzLm1vdmVtZW50X2RpcmVjdGlvbiA9IFwiel9pZGxlXCI7XG4gICAgICAgIC8v5bCP5Lq655qE56e75Yqo6YCf5bqmXG4gICAgICAgIHRoaXMubW92ZV9zcGVlZCA9IDMwO1xuICAgICAgICAvL+WBnOatouenu+WKqO+8jOi+uee8mOaXtuinpuWPkVxuICAgICAgICB0aGlzLnN0b3BfbW92ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnN0YWZmX3N0YXRlID0gbnVsbDtcbiAgICAgICAgdGhpcy53b3JrX3N0YXRlID0gbnVsbDtcbiAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKDAsIC0xNDApO1xuICAgIH0sXG5cbiAgICBvbkxvYWQoKSB7XG5cbiAgICB9LFxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlX21vdmVtZW50X2RpcmVjdGlvbigpO1xuICAgICAgICB0aGlzLmFuaW1fc2VsZWN0KCk7XG4gICAgICAgIHRoaXMucmVzdF9zY2hlZHVsZSgpO1xuICAgICAgICB0aGlzLmF1dG9fd29yaygpO1xuICAgIH0sXG5cbiAgICB1cGRhdGUoZHQpIHtcbiAgICAgICAgdGhpcy5haV9tb3ZlKGR0KTtcbiAgICB9LFxufSk7XG4iXX0=
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxjb25maWdcXHZpZGVvdGFwZS5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInN0YXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUUsRUFIUDtBQU9MO0FBRUE7QUFFQUMsRUFBQUEsS0FYSyxtQkFXSSxDQUVSLENBYkksQ0FlTDs7QUFmSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgXG4gICAgfSxcblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG4gICAgLy8gb25Mb2FkICgpIHt9LFxuXG4gICAgc3RhcnQgKCkge1xuXG4gICAgfSxcblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxufSk7XG4iXX0=
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxjb250cm9sXFxzb3VuZF9jb250cm9sLmpzIl0sIm5hbWVzIjpbInVzZXJfZGF0YSIsInJlcXVpcmUiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImhvbWVfYmdfc291bmQiLCJ0eXBlIiwiQXVkaW9DbGlwIiwidmlsbGFnZV9iZyIsImJ1dHRvbl9jbGljayIsIm1haW5fYnV0dG9uX2NsaWNrIiwidW5fY2xpY2siLCJsZXZlbF91cCIsImFkZF9leCIsImFkZF9nb2xkIiwiYnV0dG9uX2V4aXQiLCJjdXRfb3ZlciIsInBsYXlfYmdfc291bmQiLCJuYW1lIiwic291bmRfc3RhdGUiLCJhdWRpb0VuZ2luZSIsInBhdXNlTXVzaWMiLCJzdG9wX2JnX3NvdW5kIiwicGxheU11c2ljIiwic3RvcE11c2ljIiwic3RvcF9hbGxFZmZlY3RzIiwic3RvcEFsbEVmZmVjdHMiLCJwYXVzZV9hbGxfc291bmQiLCJwYXVzZUFsbEVmZmVjdHMiLCJyZXN1bWVfYWxsX3NvdW5kIiwicmVzdW1lTXVzaWMiLCJyZXN1bWVBbGxFZmZlY3RzIiwicGxheV9zb3VuZF9lZmZlY3QiLCJwbGF5RWZmZWN0IiwiaW5pX25vZGUiLCJzZXRNdXNpY1ZvbHVtZSIsInNldEVmZmVjdHNWb2x1bWUiLCJvbkxvYWQiLCJzdGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxTQUFTLEdBQUdDLE9BQU8sQ0FBQyxXQUFELENBQXZCOztBQUNBQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsYUFBYSxFQUFFO0FBQ1hDLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTSxTQURFO0FBRVgsaUJBQVM7QUFGRSxLQURQO0FBS1JDLElBQUFBLFVBQVUsRUFBRTtBQUNSRixNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ00s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SWIsVUFBQUEsRUFBRSxDQUFDbUIsV0FBSCxDQUFlYSxVQUFmLENBQTBCLEtBQUtqQixRQUEvQixFQUF5QyxLQUF6QyxFQUFnRCxDQUFoRDtBQUNBO0FBeEJSOztBQTBCQztBQUNKOztBQUFBO0FBQ0osR0FuSUk7QUFvSUxrQixFQUFBQSxRQUFRLEVBQUUsb0JBQVk7QUFDbEJqQyxJQUFBQSxFQUFFLENBQUNtQixXQUFILENBQWVlLGNBQWYsQ0FBOEIsR0FBOUI7QUFDQWxDLElBQUFBLEVBQUUsQ0FBQ21CLFdBQUgsQ0FBZWdCLGdCQUFmLENBQWdDLEdBQWhDO0FBQ0gsR0F2SUk7QUF3SUxDLEVBQUFBLE1BeElLLG9CQXdJSSxDQUVSLENBMUlJO0FBNElMQyxFQUFBQSxLQTVJSyxtQkE0SUcsQ0FDUCxDQTdJSSxDQStJTDs7QUEvSUssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHVzZXJfZGF0YSA9IHJlcXVpcmUoXCJ1c2VyX2RhdGFcIik7XG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBob21lX2JnX3NvdW5kOiB7XG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb0NsaXAsXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICB9LFxuICAgICAgICB2aWxsYWdlX2JnOiB7XG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb0NsaXAsXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICB9LFxuICAgICAgICBidXR0b25fY2xpY2s6IHtcbiAgICAgICAgICAgIHR5cGU6IGNjLkF1ZGlvQ2xpcCxcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgIH0sXG4gICAgICAgIG1haW5fYnV0dG9uX2NsaWNrOiB7XG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb0NsaXAsXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICB9LFxuICAgICAgICB1bl9jbGljazoge1xuICAgICAgICAgICAgdHlwZTogY2MuQXVkaW9DbGlwLFxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgfSxcbiAgICAgICAgbGV2ZWxfdXA6IHtcbiAgICAgICAgICAgIHR5cGU6IGNjLkF1ZGlvQ2xpcCxcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgIH0sXG4gICAgICAgIGFkZF9leDoge1xuICAgICAgICAgICAgdHlwZTogY2MuQXVkaW9DbGlwLFxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgfSxcbiAgICAgICAgYWRkX2dvbGQ6IHtcbiAgICAgICAgICAgIHR5cGU6IGNjLkF1ZGlvQ2xpcCxcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgIH0sXG4gICAgICAgIGJ1dHRvbl9leGl0OiB7XG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb0NsaXAsXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICB9LFxuICAgICAgICBjdXRfb3Zlcjoge1xuICAgICAgICAgICAgdHlwZTogY2MuQXVkaW9DbGlwLFxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgfSxcbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG4gICAgLy/mkq3mlL7og4zmma/pn7PkuZBcbiAgICBwbGF5X2JnX3NvdW5kOiBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICB2YXIgc291bmRfc3RhdGUgPSB1c2VyX2RhdGEudXNlcl9kYXRhLnNvdW5kX3N0YXRlO1xuICAgICAgICBpZiAoc291bmRfc3RhdGUgPT0gMCkge1xuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGF1c2VNdXNpYygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zdG9wX2JnX3NvdW5kKCk7XG4gICAgICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwiaG9tZV9iZ1wiOlxuICAgICAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5TXVzaWModGhpcy5ob21lX2JnX3NvdW5kLCB0cnVlLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInZpbGxhZ2VfYmdcIjpcbiAgICAgICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheU11c2ljKHRoaXMudmlsbGFnZV9iZywgdHJ1ZSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICAvL+WBnOatouaJgOacieeahOiDjOaZr+mfs+S5kFxuICAgIHN0b3BfYmdfc291bmQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUuc3RvcE11c2ljKCk7XG4gICAgfSxcbiAgICAvL+WBnOatouaJgOaciemfs+aViFxuICAgIHN0b3BfYWxsRWZmZWN0czogZnVuY3Rpb24gKCkge1xuICAgICAgICBjYy5hdWRpb0VuZ2luZS5zdG9wQWxsRWZmZWN0cygpO1xuICAgIH0sXG5cblxuICAgIC8v5pqC5YGc5omA5pyJ5aOw6Z+zXG4gICAgcGF1c2VfYWxsX3NvdW5kOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnBhdXNlQWxsRWZmZWN0cygpO1xuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wYXVzZU11c2ljKCk7XG4gICAgfSxcbiAgICAvL+aBouWkjeaSreaUvuaaguWBnFxuICAgIHJlc3VtZV9hbGxfc291bmQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNvdW5kX3N0YXRlID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5zb3VuZF9zdGF0ZTtcbiAgICAgICAgaWYgKHNvdW5kX3N0YXRlID09IDApIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucmVzdW1lTXVzaWMoKTtcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnJlc3VtZUFsbEVmZmVjdHMoKTtcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8v5pKt5pS+6Z+z5pWIXG4gICAgcGxheV9zb3VuZF9lZmZlY3Q6IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHZhciBzb3VuZF9zdGF0ZSA9IHVzZXJfZGF0YS51c2VyX2RhdGEuc291bmRfc3RhdGU7XG4gICAgICAgIGlmIChzb3VuZF9zdGF0ZSA9PSAwKSB7XG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wYXVzZUFsbEVmZmVjdHMoKTtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3dpdGNoIChuYW1lKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcImJ1dHRvbl9jbGlja1wiOlxuICAgICAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuYnV0dG9uX2NsaWNrLCBmYWxzZSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJtYWluX2J1dHRvbl9jbGlja1wiOlxuICAgICAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMubWFpbl9idXR0b25fY2xpY2ssIGZhbHNlLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImJ1dHRvbl9leGl0XCI6XG4gICAgICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5idXR0b25fZXhpdCwgZmFsc2UsIDEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwidW5fY2xpY2tcIjpcbiAgICAgICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdCh0aGlzLnVuX2NsaWNrLCBmYWxzZSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJsZXZlbF91cFwiOlxuICAgICAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMubGV2ZWxfdXAsIGZhbHNlLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImFkZF9leFwiOlxuICAgICAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuYWRkX2V4LCBmYWxzZSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJhZGRfZ29sZFwiOlxuICAgICAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuYWRkX2dvbGQsIGZhbHNlLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImN1dF9vdmVyXCI6XG4gICAgICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5jdXRfb3ZlciwgZmFsc2UsIDEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGluaV9ub2RlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnNldE11c2ljVm9sdW1lKDAuMyk7XG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnNldEVmZmVjdHNWb2x1bWUoMC40KTtcbiAgICB9LFxuICAgIG9uTG9hZCgpIHtcblxuICAgIH0sXG5cbiAgICBzdGFydCgpIHtcbiAgICB9LFxuXG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTtcbiJdfQ==
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
      name: "Cute Lit",
      introduce: "It's impossible to \nwork part-time, it's impossible to work \npart-time in this life",
      work_time: 125,
      rest_time: 225,
      cost: 60
    },
    2: {
      name: "Light",
      introduce: "I'm creater of this\ngame",
      work_time: 130,
      rest_time: 230,
      cost: 600
    },
    3: {
      name: "Girl",
      introduce: "Supper cute",
      work_time: 135,
      rest_time: 235,
      cost: 2400
    },
    4: {
      name: "Honest Man Black",
      introduce: "A simp lord :))",
      work_time: 140,
      rest_time: 240,
      cost: 12000
    },
    5: {
      name: "Little Red Riding Hood",
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
      name: "Shiba",
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
      name: "Cat",
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
      name: "Hamster",
      introduce: "Little Eight's brother will stay for 300s",
      skill_introduce: "Every 60 seconds, give the player 3 exp",
      need_ad: 1,
      produce_ex: 5,
      produce_ex_time: 80,
      get_type: "share",
      cost: 500,
      type_buy: "diamond",
      stay_time: 300,
      share_max: 3
    },
    3: {
      name: "Corgi",
      introduce: "The white rabbit will only stay for 400s",
      skill_introduce: "Every 80 seconds, give the player 5 exp",
      need_ad: 1,
      produce_ex: 5,
      produce_ex_time: 80,
      get_type: "share",
      cost: 700,
      type_buy: "diamond",
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxjb25maWdcXGNvbmZpZy5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwiYWRfc3RhdGUiLCJhbGxfd2F0ZXJfbnVtIiwidGlsbF90aW1lIiwid2FyZUhvdXNlIiwiYWxsX2NhcGFjaXR5IiwidmlkZW90YXBlX3NoYXJlX21heCIsInN0YWZmIiwibmFtZSIsImludHJvZHVjZSIsIndvcmtfdGltZSIsInJlc3RfdGltZSIsImNvc3QiLCJwbGFudCIsImdyb3dfdGltZSIsImN1dF90aW1lIiwicGxhbnRfdGltZSIsInNlbGwiLCJuZWVkX2xldmVsIiwiZXhwIiwibGFuZCIsInRyYWRlciIsImNvb2tlciIsInJlY2lwZXMiLCJwZXQiLCJza2lsbF9pbnRyb2R1Y2UiLCJuZWVkX2FkIiwicHJvZHVjZV9leCIsInByb2R1Y2VfZXhfdGltZSIsInR5cGVfYnV5Iiwic3RheV90aW1lIiwiZ2V0X3R5cGUiLCJzaGFyZV9tYXgiLCJob3RlbCIsInByb2R1Y2UiLCJwcm9kdWNlX3RpbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjtBQUNiQyxFQUFBQSxRQUFRLEVBQUUsQ0FERztBQUNHO0FBQ2hCQyxFQUFBQSxhQUFhLEVBQUUsRUFGRjtBQUdiQyxFQUFBQSxTQUFTLEVBQUUsQ0FIRTtBQUliQyxFQUFBQSxTQUFTLEVBQUU7QUFDUEMsSUFBQUEsWUFBWSxFQUFFO0FBRFAsR0FKRTtBQU9iQyxFQUFBQSxtQkFBbUIsRUFBRSxDQVBSO0FBUWJDLEVBQUFBLEtBQUssRUFBRTtBQUNILE9BQUc7QUFDQ0MsTUFBQUEsSUFBSSxFQUFFLE9BRFA7QUFFQ0MsTUFBQUEsU0FBUyxFQUFFLHNEQUZaO0FBR0NDLE1BQUFBLFNBQVMsRUFBRSxHQUhaO0FBSUNDLE1BQUFBLFNBQVMsRUFBRSxHQUpaO0FBS0NDLE1BQUFBLElBQUksRUFBRTtBQUxQLEtBREE7QUFRSCxPQUFHO0FBQ0NK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LyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGFkX3N0YXRlOiAxLCAgICAvL+W5v+WRiuW8gOWFs1xuICAgIGFsbF93YXRlcl9udW06IDUwLFxuICAgIHRpbGxfdGltZTogNSxcbiAgICB3YXJlSG91c2U6IHtcbiAgICAgICAgYWxsX2NhcGFjaXR5OiAzMCxcbiAgICB9LFxuICAgIHZpZGVvdGFwZV9zaGFyZV9tYXg6IDUsXG4gICAgc3RhZmY6IHtcbiAgICAgICAgMDoge1xuICAgICAgICAgICAgbmFtZTogXCJBbGljZVwiLFxuICAgICAgICAgICAgaW50cm9kdWNlOiBcIkRyZWFtIG9mIG93bmluZyBcXG55b3VyIG93biBmYXJtLCBcXG5iZWxpZXZlIGl0IG9yIG5vdFwiLFxuICAgICAgICAgICAgd29ya190aW1lOiAxMjAsXG4gICAgICAgICAgICByZXN0X3RpbWU6IDIyMCxcbiAgICAgICAgICAgIGNvc3Q6IDMwLFxuICAgICAgICB9LFxuICAgICAgICAxOiB7XG4gICAgICAgICAgICBuYW1lOiBcIkN1dGUgTGl0XCIsXG4gICAgICAgICAgICBpbnRyb2R1Y2U6IFwiSXQncyBpbXBvc3NpYmxlIHRvIFxcbndvcmsgcGFydC10aW1lLCBpdCdzIGltcG9zc2libGUgdG8gd29yayBcXG5wYXJ0LXRpbWUgaW4gdGhpcyBsaWZlXCIsXG4gICAgICAgICAgICB3b3JrX3RpbWU6IDEyNSxcbiAgICAgICAgICAgIHJlc3RfdGltZTogMjI1LFxuICAgICAgICAgICAgY29zdDogNjAsXG4gICAgICAgIH0sXG4gICAgICAgIDI6IHtcbiAgICAgICAgICAgIG5hbWU6IFwiTGlnaHRcIixcbiAgICAgICAgICAgIGludHJvZHVjZTogXCJJJ20gY3JlYXRlciBvZiB0aGlzXFxuZ2FtZVwiLFxuICAgICAgICAgICAgd29ya190aW1lOiAxMzAsXG4gICAgICAgICAgICByZXN0X3RpbWU6IDIzMCxcbiAgICAgICAgICAgIGNvc3Q6IDYwMCxcbiAgICAgICAgfSxcbiAgICAgICAgMzoge1xuICAgICAgICAgICAgbmFtZTogXCJHaXJsXCIsXG4gICAgICAgICAgICBpbnRyb2R1Y2U6IFwiU3VwcGVyIGN1dGVcIixcbiAgICAgICAgICAgIHdvcmtfdGltZTogMTM1LFxuICAgICAgICAgICAgcmVzdF90aW1lOiAyMzUsXG4gICAgICAgICAgICBjb3N0OiAyNDAwLFxuICAgICAgICB9LFxuICAgICAgICA0OiB7XG4gICAgICAgICAgICBuYW1lOiBcIkhvbmVzdCBNYW4gQmxhY2tcIixcbiAgICAgICAgICAgIGludHJvZHVjZTogXCJBIHNpbXAgbG9yZCA6KSlcIixcbiAgICAgICAgICAgIHdvcmtfdGltZTogMTQwLFxuICAgICAgICAgICAgcmVzdF90aW1lOiAyNDAsXG4gICAgICAgICAgICBjb3N0OiAxMjAwMCxcbiAgICAgICAgfSxcbiAgICAgICAgNToge1xuICAgICAgICAgICAgbmFtZTogXCJMaXR0bGUgUmVkIFJpZGluZyBIb29kXCIsXG4gICAgICAgICAgICBpbnRyb2R1Y2U6IFwiV2h5IGNhbid0IGkgbWVldCBteSBncmFuZG1hXCIsXG4gICAgICAgICAgICB3b3JrX3RpbWU6IDE0NSxcbiAgICAgICAgICAgIHJlc3RfdGltZTogMjQ1LFxuICAgICAgICAgICAgY29zdDogMjQwMDAsXG4gICAgICAgIH0sXG4gICAgfSxcbiAgICBwbGFudDoge1xuICAgICAgICAwOiB7XG4gICAgICAgICAgICBuYW1lOiBcIlBvdGF0b1wiLFxuICAgICAgICAgICAgaW50cm9kdWNlOiBcIlJpY2ggaW4gZGlldGFyeSBmaWJlclwiLFxuICAgICAgICAgICAgY29zdDogMCxcbiAgICAgICAgICAgIGdyb3dfdGltZTogMjAsXG4gICAgICAgICAgICBjdXRfdGltZTogNSxcbiAgICAgICAgICAgIHBsYW50X3RpbWU6IDUsXG4gICAgICAgICAgICBzZWxsOiAxMCxcbiAgICAgICAgICAgIG5lZWRfbGV2ZWw6IDEsXG4gICAgICAgICAgICBleHA6IDEsXG4gICAgICAgIH0sXG4gICAgICAgIDE6IHtcbiAgICAgICAgICAgIG5hbWU6IFwiQ2FiYmFnZVwiLFxuICAgICAgICAgICAgaW50cm9kdWNlOiBcIkVuaGFuY2UgdGhlIGJvZHkncyBhbnRpLWNhbmNlciBhYmlsaXR5XCIsXG4gICAgICAgICAgICBjb3N0OiAzMDAsXG4gICAgICAgICAgICBncm93X3RpbWU6IDMwLFxuICAgICAgICAgICAgY3V0X3RpbWU6IDcsXG4gICAgICAgICAgICBwbGFudF90aW1lOiAxMCxcbiAgICAgICAgICAgIHNlbGw6IDE1LFxuICAgICAgICAgICAgbmVlZF9sZXZlbDogNSxcbiAgICAgICAgICAgIGV4cDogMSxcbiAgICAgICAgfSxcbiAgICAgICAgMjoge1xuICAgICAgICAgICAgbmFtZTogXCJUdXJuaXBcIixcbiAgICAgICAgICAgIGludHJvZHVjZTogXCJUaG91c2FuZHMgb2YgeWVhcnMgb2YgY3VsdGl2YXRpb24gaGlzdG9yeVwiLFxuICAgICAgICAgICAgY29zdDogNTAwLFxuICAgICAgICAgICAgZ3Jvd190aW1lOiA0MCxcbiAgICAgICAgICAgIGN1dF90aW1lOiA5LFxuICAgICAgICAgICAgcGxhbnRfdGltZTogMTUsXG4gICAgICAgICAgICBzZWxsOiAyMCxcbiAgICAgICAgICAgIG5lZWRfbGV2ZWw6IDEwLFxuICAgICAgICAgICAgZXhwOiAyLFxuICAgICAgICB9LFxuICAgICAgICAzOiB7XG4gICAgICAgICAgICBuYW1lOiBcIlRvbWF0b1wiLFxuICAgICAgICAgICAgaW50cm9kdWNlOiBcIlRoZSBmcnVpdCBpcyByaWNoIGluIG51dHJpZW50c1wiLFxuICAgICAgICAgICAgY29zdDogMTAwMCxcbiAgICAgICAgICAgIGdyb3dfdGltZTogNTAsXG4gICAgICAgICAgICBjdXRfdGltZTogMTEsXG4gICAgICAgICAgICBwbGFudF90aW1lOiAyMCxcbiAgICAgICAgICAgIHNlbGw6IDI1LFxuICAgICAgICAgICAgbmVlZF9sZXZlbDogMTUsXG4gICAgICAgICAgICBleHA6IDIsXG4gICAgICAgIH0sXG4gICAgICAgIDQ6IHtcbiAgICAgICAgICAgIG5hbWU6IFwiQ3VjdW1iZXJcIixcbiAgICAgICAgICAgIGludHJvZHVjZTogXCJHb29kIGZvciBoZWFsdGhcIixcbiAgICAgICAgICAgIGNvc3Q6IDMwMDAsXG4gICAgICAgICAgICBncm93X3RpbWU6IDYwLFxuICAgICAgICAgICAgY3V0X3RpbWU6IDEzLFxuICAgICAgICAgICAgcGxhbnRfdGltZTogMjUsXG4gICAgICAgICAgICBzZWxsOiAzMCxcbiAgICAgICAgICAgIG5lZWRfbGV2ZWw6IDIwLFxuICAgICAgICAgICAgZXhwOiAzLFxuICAgICAgICB9LFxuICAgICAgICA1OiB7XG4gICAgICAgICAgICBuYW1lOiBcIlN0cmF3YmVycnlcIixcbiAgICAgICAgICAgIGludHJvZHVjZTogXCJSaWNoIGluIG51dHJpdGlvbmFsIHZhbHVlXCIsXG4gICAgICAgICAgICBjb3N0OiA1MDAwLFxuICAgICAgICAgICAgZ3Jvd190aW1lOiA3MCxcbiAgICAgICAgICAgIGN1dF90aW1lOiAxNSxcbiAgICAgICAgICAgIHBsYW50X3RpbWU6IDMwLFxuICAgICAgICAgICAgc2VsbDogMzUsXG4gICAgICAgICAgICBuZWVkX2xldmVsOiAyNSxcbiAgICAgICAgICAgIGV4cDogMyxcbiAgICAgICAgfSxcbiAgICAgICAgNjoge1xuICAgICAgICAgICAgbmFtZTogXCJCcm9jY29saVwiLFxuICAgICAgICAgICAgaW50cm9kdWNlOiBcIktub3duIGFzIHRoZSBcXFwidmVnZXRhYmxlIGNyb3duXFxcIlwiLFxuICAgICAgICAgICAgY29zdDogMTAwMDAsXG4gICAgICAgICAgICBncm93X3RpbWU6IDgwLFxuICAgICAgICAgICAgY3V0X3RpbWU6IDE3LFxuICAgICAgICAgICAgcGxhbnRfdGltZTogMzAsXG4gICAgICAgICAgICBzZWxsOiA0NSxcbiAgICAgICAgICAgIG5lZWRfbGV2ZWw6IDM1LFxuICAgICAgICAgICAgZXhwOiA0XG4gICAgICAgIH0sXG4gICAgICAgIDc6IHtcbiAgICAgICAgICAgIG5hbWU6IFwiQ29yblwiLFxuICAgICAgICAgICAgaW50cm9kdWNlOiBcIlRoZSBtb3N0IHByb2R1Y3RpdmUgY3JvcCBpbiB0aGUgd29ybGRcIixcbiAgICAgICAgICAgIGNvc3Q6IDIwMDAwLFxuICAgICAgICAgICAgZ3Jvd190aW1lOiA5MCxcbiAgICAgICAgICAgIGN1dF90aW1lOiAyMCxcbiAgICAgICAgICAgIHBsYW50X3RpbWU6IDMwLFxuICAgICAgICAgICAgc2VsbDogNjAsXG4gICAgICAgICAgICBuZWVkX2xldmVsOiA0NSxcbiAgICAgICAgICAgIGV4cDogNCxcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIGxhbmQ6IHtcbiAgICAgICAgMDoge1xuICAgICAgICAgICAgbmFtZTogXCJMYW5kIE5vLjFcIixcbiAgICAgICAgICAgIGNvc3Q6IDAsXG4gICAgICAgICAgICBuZWVkX2xldmVsOiAxLFxuICAgICAgICB9LFxuICAgICAgICAxOiB7XG4gICAgICAgICAgICBuYW1lOiBcIkxhbmQgTm8uMlwiLFxuICAgICAgICAgICAgY29zdDogNTAsXG4gICAgICAgICAgICBuZWVkX2xldmVsOiAzLFxuICAgICAgICB9LFxuICAgICAgICAyOiB7XG4gICAgICAgICAgICBuYW1lOiBcIkxhbmQgTm8uM1wiLFxuICAgICAgICAgICAgY29zdDogNTAwLFxuICAgICAgICAgICAgbmVlZF9sZXZlbDogMTUsXG4gICAgICAgIH0sXG4gICAgICAgIDM6IHtcbiAgICAgICAgICAgIG5hbWU6IFwiTGFuZCBOby40XCIsXG4gICAgICAgICAgICBjb3N0OiAyNTAwLFxuICAgICAgICAgICAgbmVlZF9sZXZlbDogMjUsXG4gICAgICAgIH0sXG4gICAgICAgIDQ6IHtcbiAgICAgICAgICAgIG5hbWU6IFwiTGFuZCBOby41XCIsXG4gICAgICAgICAgICBjb3N0OiAxMDAwMCxcbiAgICAgICAgICAgIG5lZWRfbGV2ZWw6IDM1LFxuICAgICAgICB9LFxuICAgICAgICA1OiB7XG4gICAgICAgICAgICBuYW1lOiBcIkxhbmQgTm8uNlwiLFxuICAgICAgICAgICAgY29zdDogMzAwMDAsXG4gICAgICAgICAgICBuZWVkX2xldmVsOiA1MCxcbiAgICAgICAgfSxcblxuICAgIH0sXG4gICAgLy/llYbkurpcbiAgICB0cmFkZXI6IHtcbiAgICAgICAgY29va2VyOiB7XG4gICAgICAgICAgICByZWNpcGVzOiAwLFxuICAgICAgICAgICAgbmVlZF9sZXZlbDogMSxcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIHBldDoge1xuICAgICAgICAwOiB7XG4gICAgICAgICAgICBuYW1lOiBcIlNoaWJhXCIsXG4gICAgICAgICAgICBpbnRyb2R1Y2U6IFwiQSBjdXRlIGRvZ1wiLFxuICAgICAgICAgICAgc2tpbGxfaW50cm9kdWNlOiBcIkV2ZXJ5IDYwIHNlY29uZHMsIGdpdmUgdGhlIHBsYXllciAzIGV4cFwiLFxuICAgICAgICAgICAgbmVlZF9hZDogNSxcbiAgICAgICAgICAgIHByb2R1Y2VfZXg6IDMsXG4gICAgICAgICAgICBwcm9kdWNlX2V4X3RpbWU6IDYwLFxuICAgICAgICAgICAgY29zdDogNTAwLFxuICAgICAgICAgICAgdHlwZV9idXk6IFwiZ29sZFwiLFxuICAgICAgICAgICAgc3RheV90aW1lOiAzMDAsXG4gICAgICAgICAgICBnZXRfdHlwZTogXCJhZFwiLFxuICAgICAgICB9LFxuICAgICAgICAxOiB7XG4gICAgICAgICAgICBuYW1lOiBcIkNhdFwiLFxuICAgICAgICAgICAgaW50cm9kdWNlOiBcIkEgY3V0ZSBkb2dcIixcbiAgICAgICAgICAgIHNraWxsX2ludHJvZHVjZTogXCJFdmVyeSA4MCBzZWNvbmRzLCBnaXZlIHRoZSBwbGF5ZXIgNSBleHBcIixcbiAgICAgICAgICAgIG5lZWRfYWQ6IDEwLFxuICAgICAgICAgICAgcHJvZHVjZV9leDogNSxcbiAgICAgICAgICAgIHByb2R1Y2VfZXhfdGltZTogODAsXG4gICAgICAgICAgICBjb3N0OiA3MDAsXG4gICAgICAgICAgICB0eXBlX2J1eTogXCJnb2xkXCIsXG4gICAgICAgICAgICBzdGF5X3RpbWU6IDMwMCxcbiAgICAgICAgICAgIGdldF90eXBlOiBcImFkXCIsXG4gICAgICAgIH0sXG4gICAgICAgIDI6IHtcbiAgICAgICAgICAgIG5hbWU6IFwiSGFtc3RlclwiLFxuICAgICAgICAgICAgaW50cm9kdWNlOiBcIkxpdHRsZSBFaWdodCdzIGJyb3RoZXIgd2lsbCBzdGF5IGZvciAzMDBzXCIsXG4gICAgICAgICAgICBza2lsbF9pbnRyb2R1Y2U6IFwiRXZlcnkgNjAgc2Vjb25kcywgZ2l2ZSB0aGUgcGxheWVyIDMgZXhwXCIsXG4gICAgICAgICAgICBuZWVkX2FkOiAxLFxuICAgICAgICAgICAgcHJvZHVjZV9leDogNSxcbiAgICAgICAgICAgIHByb2R1Y2VfZXhfdGltZTogODAsXG4gICAgICAgICAgICBnZXRfdHlwZTogXCJzaGFyZVwiLFxuICAgICAgICAgICAgY29zdDogNTAwLFxuICAgICAgICAgICAgdHlwZV9idXk6IFwiZGlhbW9uZFwiLFxuICAgICAgICAgICAgc3RheV90aW1lOiAzMDAsXG4gICAgICAgICAgICBzaGFyZV9tYXg6IDMsXG4gICAgICAgIH0sXG4gICAgICAgIDM6IHtcbiAgICAgICAgICAgIG5hbWU6IFwiQ29yZ2lcIixcbiAgICAgICAgICAgIGludHJvZHVjZTogXCJUaGUgd2hpdGUgcmFiYml0IHdpbGwgb25seSBzdGF5IGZvciA0MDBzXCIsXG4gICAgICAgICAgICBza2lsbF9pbnRyb2R1Y2U6IFwiRXZlcnkgODAgc2Vjb25kcywgZ2l2ZSB0aGUgcGxheWVyIDUgZXhwXCIsXG4gICAgICAgICAgICBuZWVkX2FkOiAxLFxuICAgICAgICAgICAgcHJvZHVjZV9leDogNSxcbiAgICAgICAgICAgIHByb2R1Y2VfZXhfdGltZTogODAsXG4gICAgICAgICAgICBnZXRfdHlwZTogXCJzaGFyZVwiLFxuICAgICAgICAgICAgY29zdDogNzAwLFxuICAgICAgICAgICAgdHlwZV9idXk6IFwiZGlhbW9uZFwiLFxuICAgICAgICAgICAgc3RheV90aW1lOiA0MDAsXG4gICAgICAgICAgICBzaGFyZV9tYXg6IDMsXG4gICAgICAgIH0sXG4gICAgfSxcbiAgICBob3RlbDoge1xuICAgICAgICAwOiB7XG4gICAgICAgICAgICBuZWVkX2xldmVsOiA1LFxuICAgICAgICAgICAgcHJvZHVjZTogMyxcbiAgICAgICAgICAgIHByb2R1Y2VfdGltZTogMzAsXG4gICAgICAgICAgICBjb3N0OiAyMDAsXG4gICAgICAgIH0sXG4gICAgICAgIDE6IHtcbiAgICAgICAgICAgIG5lZWRfbGV2ZWw6IDEwLFxuICAgICAgICAgICAgcHJvZHVjZTogNSxcbiAgICAgICAgICAgIHByb2R1Y2VfdGltZTogNjAsXG4gICAgICAgICAgICBjb3N0OiAxMDAwLFxuICAgICAgICB9LFxuICAgICAgICAyOiB7XG4gICAgICAgICAgICBuZWVkX2xldmVsOiAxNSxcbiAgICAgICAgICAgIHByb2R1Y2U6IDEwLFxuICAgICAgICAgICAgcHJvZHVjZV90aW1lOiA4MCxcbiAgICAgICAgICAgIGNvc3Q6IDUwMDAsXG4gICAgICAgIH0sXG4gICAgICAgIDM6IHtcbiAgICAgICAgICAgIG5lZWRfbGV2ZWw6IDI1LFxuICAgICAgICAgICAgcHJvZHVjZTogMTUsXG4gICAgICAgICAgICBwcm9kdWNlX3RpbWU6IDEyMCxcbiAgICAgICAgICAgIGNvc3Q6IDIwMDAwLFxuICAgICAgICB9LFxuICAgIH0sXG59OyJdfQ==
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxlZmZlY3RcXGFkX2Nhci5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImFkX2Nhcl9ub2RlIiwiTm9kZSIsImluaV9ub2RlIiwicHJpY2VfZGlmZmVyZW5jZSIsImFkX2NvbnRyb2wiLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwiZ2FtZV9zY2VuZV9qcyIsImdhbWVfcnVsZXNfanMiLCJub2RlIiwieCIsInR3ZWVuIiwidG8iLCJlYXNpbmciLCJjYWxsIiwib24iLCJjcmVhdGVfYWQiLCJzdGFydCIsInNob3dfdmlkZW9BZCIsInZpZGVvX3N1Y2NlcyIsInd4IiwiY2FsbGJhY2siLCJ2aWRlb19zdGF0ZSIsInZpZGVvX3RhZyIsImNyZWF0ZV90aXBzX3VpIiwiYWRkX2dvbGQiLCJ1bnNjaGVkdWxlIiwiZGVzdHJveSIsInNjaGVkdWxlIiwib25Mb2FkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsV0FBVyxFQUFFSixFQUFFLENBQUNLO0FBRFIsR0FIUDtBQU1MO0FBQ0FDLEVBQUFBLFFBUEssb0JBT0lDLGdCQVBKLEVBT3NCO0FBQUE7O0FBQ3ZCLFNBQUtBLGdCQUFMLEdBQXdCQSxnQkFBeEI7QUFDQSxTQUFLQyxVQUFMLEdBQWtCUixFQUFFLENBQUNTLElBQUgsQ0FBUSxZQUFSLEVBQXNCQyxZQUF0QixDQUFtQyxZQUFuQyxDQUFsQjtBQUNBLFNBQUtDLGFBQUwsR0FBcUJYLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLFNBQVIsRUFBbUJDLFlBQW5CLENBQWdDLFlBQWhDLENBQXJCO0FBQ0EsU0FBS0UsYUFBTCxHQUFvQlosRUFBRSxDQUFDUyxJQUFILENBQVEsU0FBUixFQUFtQkMsWUFBbkIsQ0FBZ0MsWUFBaEMsQ0FBcEI7QUFBa0U7QUFDbEUsU0FBS0csSUFBTCxDQUFVQyxDQUFWLEdBQWMsR0FBZDtBQUNBZCxJQUFBQSxFQUFFLENBQUNlLEtBQUgsQ0FBUyxLQUFLRixJQUFkLEVBQ0tHLEVBREwsQ0FDUSxHQURSLEVBQ2E7QUFBRUYsTUFBQUEsQ0FBQyxFQUFFO0FBQUwsS0FEYixFQUN1QjtBQUFFRyxNQUFBQSxNQUFNLEVBQUU7QUFBVixLQUR2QixFQUVLQyxJQUZMLENBRVUsWUFBTTtBQUNSLE1BQUEsS0FBSSxDQUFDZCxXQUFMLENBQWlCZSxFQUFqQixDQUFvQixZQUFwQixFQUFrQyxLQUFJLENBQUNDLFNBQXZDLEVBQWtELEtBQWxEO0FBQ0gsS0FKTCxFQUtLQyxLQUxMO0FBTUgsR0FuQkk7QUFvQkw7QUFDQUQsRUFBQUEsU0FyQkssdUJBcUJPO0FBQ1I7QUFDQSxTQUFLWixVQUFMLENBQWdCYyxZQUFoQixDQUE2QixRQUE3QjtBQUNBLFNBQUtDLFlBQUw7QUFDSCxHQXpCSTtBQTBCTDtBQUNBQSxFQUFBQSxZQUFZLEVBQUUsd0JBQVk7QUFDdEIsUUFBSSxPQUFRQyxFQUFSLElBQWUsV0FBbkIsRUFBZ0M7QUFDNUIsVUFBSUMsUUFBUSxHQUFHLFNBQVhBLFFBQVcsR0FBWTtBQUN2QixZQUFJLEtBQUtqQixVQUFMLENBQWdCa0IsV0FBaEIsSUFBK0IsQ0FBL0IsSUFBb0MsS0FBS2xCLFVBQUwsQ0FBZ0JtQixTQUFoQixJQUE2QixRQUFyRSxFQUErRTtBQUMzRSxlQUFLbkIsVUFBTCxDQUFnQm1CLFNBQWhCLEdBQTRCLElBQTVCO0FBQ0EsZUFBS25CLFVBQUwsQ0FBZ0JrQixXQUFoQixHQUE4QixDQUE5QjtBQUNBLGNBQUliLElBQUksR0FBRyxLQUFLRixhQUFMLENBQW1CaUIsY0FBbkIsQ0FBa0MsS0FBS2hCLGFBQUwsQ0FBbUJDLElBQXJELENBQVg7O0FBQ0EsY0FBSUEsSUFBSSxJQUFJLElBQVosRUFBa0I7QUFDZEEsWUFBQUEsSUFBSSxDQUFDSCxZQUFMLENBQWtCLFNBQWxCLEVBQTZCSixRQUE3QixDQUFzQyxNQUF0QyxFQUE4QyxLQUFLQyxnQkFBbkQ7QUFDQSxpQkFBS0ssYUFBTCxDQUFtQmlCLFFBQW5CLENBQTRCLEtBQUt0QixnQkFBakM7QUFDSDs7QUFBQTtBQUNELGVBQUt1QixVQUFMLENBQWdCTCxRQUFoQjtBQUNBLGVBQUtaLElBQUwsQ0FBVWtCLE9BQVY7QUFDSCxTQVZELE1BVU87QUFDSCxjQUFJLEtBQUt2QixVQUFMLENBQWdCbUIsU0FBaEIsSUFBNkIsSUFBN0IsSUFBcUMsS0FBS25CLFVBQUwsQ0FBZ0JrQixXQUFoQixJQUErQixDQUF4RSxFQUEyRTtBQUN2RSxpQkFBS0ksVUFBTCxDQUFnQkwsUUFBaEI7QUFDSDs7QUFBQTtBQUNKOztBQUFBO0FBQ0osT0FoQkQ7O0FBaUJBLFdBQUtPLFFBQUwsQ0FBY1AsUUFBZCxFQUF3QixHQUF4QjtBQUNIOztBQUFBO0FBQ0osR0FoREk7QUFpRExRLEVBQUFBLE1BakRLLG9CQWlESSxDQUVSLENBbkRJO0FBcURMWixFQUFBQSxLQXJESyxtQkFxREcsQ0FFUCxDQXZESSxDQXlETDs7QUF6REssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgYWRfY2FyX25vZGU6IGNjLk5vZGUsXG4gICAgfSxcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcbiAgICBpbmlfbm9kZShwcmljZV9kaWZmZXJlbmNlKSB7XG4gICAgICAgIHRoaXMucHJpY2VfZGlmZmVyZW5jZSA9IHByaWNlX2RpZmZlcmVuY2U7XG4gICAgICAgIHRoaXMuYWRfY29udHJvbCA9IGNjLmZpbmQoXCJhZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcImFkX2NvbnRyb2xcIik7XG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfc2NlbmVcIik7XG4gICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcz0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9ydWxlc1wiKTs7XG4gICAgICAgIHRoaXMubm9kZS54ID0gNTAwO1xuICAgICAgICBjYy50d2Vlbih0aGlzLm5vZGUpXG4gICAgICAgICAgICAudG8oMC41LCB7IHg6IDAgfSwgeyBlYXNpbmc6IFwiZWxhc3RpY091dFwiIH0pXG4gICAgICAgICAgICAuY2FsbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZF9jYXJfbm9kZS5vbihcInRvdWNoc3RhcnRcIiwgdGhpcy5jcmVhdGVfYWQsIHRoaXMpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGFydCgpO1xuICAgIH0sXG4gICAgLy/mi4notbflub/lkYpcbiAgICBjcmVhdGVfYWQoKSB7XG4gICAgICAgIC8vIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMuYWRfY29udHJvbC5zaG93X3ZpZGVvQWQoXCJhZF9jYXJcIik7XG4gICAgICAgIHRoaXMudmlkZW9fc3VjY2VzKCk7XG4gICAgfSxcbiAgICAvL+ajgOa1i+inhumikeaYr+WQpuaSreaUvuaIkOWKn1xuICAgIHZpZGVvX3N1Y2NlczogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodHlwZW9mICh3eCkgIT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFkX2NvbnRyb2wudmlkZW9fc3RhdGUgPT0gMSAmJiB0aGlzLmFkX2NvbnRyb2wudmlkZW9fdGFnID09IFwiYWRfY2FyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZF9jb250cm9sLnZpZGVvX3RhZyA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRfY29udHJvbC52aWRlb19zdGF0ZSA9IDI7XG4gICAgICAgICAgICAgICAgICAgIHZhciBub2RlID0gdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9ydWxlc19qcy5ub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJ0aXBzX3VpXCIpLmluaV9ub2RlKFwiZ29sZFwiLCB0aGlzLnByaWNlX2RpZmZlcmVuY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLmFkZF9nb2xkKHRoaXMucHJpY2VfZGlmZmVyZW5jZSk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZShjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYWRfY29udHJvbC52aWRlb190YWcgPT0gbnVsbCAmJiB0aGlzLmFkX2NvbnRyb2wudmlkZW9fc3RhdGUgPT0gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUoY2FsbGJhY2ssIDAuMik7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICBvbkxvYWQoKSB7XG5cbiAgICB9LFxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9LFxuXG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTtcbiJdfQ==
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcbm92aWNlX3VpLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwidGFsa19ncm91cCIsIk5vZGUiLCJwYXBlcl9ub2RlIiwiZXhpdF9idXR0b25fbm9kZSIsInRpdGxlX25vZGUiLCJpbmlfbm9kZSIsInNvdW5kX2NvbnRyb2wiLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwiYWN0aXZlIiwiaSIsImNoaWxkcmVuIiwibGVuZ3RoIiwib3BhY2l0eSIsInRhbGtfY291bnQiLCJoZWlnaHQiLCJpbmlfcGFwZXJfYW5pbSIsInR3ZWVuIiwidG8iLCJlYXNpbmciLCJjYWxsIiwiaW5pX3RhbGtfYW5pbSIsInNob3dfZXhpdF9idXR0b25fbm9kZSIsInN0YXJ0IiwiY2FsbGJhY2siLCJzY2hlZHVsZU9uY2UiLCJvbl9leGl0X2J1dHRvbl9jbGljayIsInBsYXlfc291bmRfZWZmZWN0Iiwibm9kZSIsImRlc3Ryb3kiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0FBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxVQUFVLEVBQUVKLEVBQUUsQ0FBQ0ssSUFEUDtBQUVSQyxJQUFBQSxVQUFVLEVBQUVOLEVBQUUsQ0FBQ0ssSUFGUDtBQUdSRSxJQUFBQSxnQkFBZ0IsRUFBRVAsRUFBRSxDQUFDSyxJQUhiO0FBSVJHLElBQUFBLFVBQVUsRUFBRVIsRUFBRSxDQUFDSztBQUpQLEdBSFA7QUFVTDtBQUNBSSxFQUFBQSxRQVhLLHNCQVdNO0FBQ1AsU0FBS0MsYUFBTCxHQUFxQlYsRUFBRSxDQUFDVyxJQUFILENBQVEsZUFBUixFQUF5QkMsWUFBekIsQ0FBc0MsZUFBdEMsQ0FBckI7QUFDQSxTQUFLTCxnQkFBTCxDQUFzQk0sTUFBdEIsR0FBK0IsS0FBL0I7QUFDQSxTQUFLTCxVQUFMLENBQWdCSyxNQUFoQixHQUF5QixLQUF6Qjs7QUFFQSxTQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsS0FBS1YsVUFBTCxDQUFnQlcsUUFBaEIsQ0FBeUJDLE1BQTdDLEVBQXFERixDQUFDLEVBQXRELEVBQTBEO0FBQ3RELFdBQUtWLFVBQUwsQ0FBZ0JXLFFBQWhCLENBQXlCRCxDQUF6QixFQUE0QkcsT0FBNUIsR0FBc0MsQ0FBdEM7QUFDSDs7QUFBQTtBQUNELFNBQUtDLFVBQUwsR0FBa0IsQ0FBbEI7QUFDQSxTQUFLWixVQUFMLENBQWdCYSxNQUFoQixHQUF5QixHQUF6QjtBQUNBLFNBQUtDLGNBQUw7QUFFSCxHQXZCSTtBQXlCTDtBQUNBQSxFQUFBQSxjQTFCSyw0QkEwQlk7QUFBQTs7QUFDYnBCLElBQUFBLEVBQUUsQ0FBQ3FCLEtBQUgsQ0FBUyxLQUFLZixVQUFkLEVBQ0tnQixFQURMLENBQ1EsR0FEUixFQUNhO0FBQUVILE1BQUFBLE1BQU0sRUFBRTtBQUFWLEtBRGIsRUFDK0I7QUFBRUksTUFBQUEsTUFBTSxFQUFFO0FBQVYsS0FEL0IsRUFFS0MsSUFGTCxDQUVVLFlBQU07QUFDUixNQUFBLEtBQUksQ0FBQ2hCLFVBQUwsQ0FBZ0JLLE1BQWhCLEdBQXlCLElBQXpCOztBQUNBLE1BQUEsS0FBSSxDQUFDWSxhQUFMOztBQUNBLE1BQUEsS0FBSSxDQUFDQyxxQkFBTDtBQUNILEtBTkwsRUFPS0MsS0FQTDtBQVFILEdBbkNJO0FBcUNMO0FBQ0FGLEVBQUFBLGFBdENLLDJCQXNDVztBQUNaLFFBQUlHLFFBQVEsR0FBRyxTQUFYQSxRQUFXLEdBQVk7QUFDdkIsV0FBS3hCLFVBQUwsQ0FBZ0JXLFFBQWhCLENBQXlCLEtBQUtHLFVBQTlCLEVBQTBDRCxPQUExQyxHQUFvRCxHQUFwRDtBQUNBLFdBQUtDLFVBQUw7O0FBQ0EsVUFBSSxLQUFLQSxVQUFMLElBQW1CLEtBQUtkLFVBQUwsQ0FBZ0JXLFFBQWhCLENBQXlCQyxNQUFoRCxFQUF3RDtBQUNwRDtBQUNIOztBQUFBO0FBQ0QsV0FBS1MsYUFBTDtBQUNILEtBUEQ7O0FBUUEsU0FBS0ksWUFBTCxDQUFrQkQsUUFBbEIsRUFBNEIsR0FBNUI7QUFDSCxHQWhESTtBQWlETEYsRUFBQUEscUJBakRLLG1DQWlEbUI7QUFBQTs7QUFDcEIsU0FBS0csWUFBTCxDQUFrQixZQUFNO0FBQ3BCLE1BQUEsTUFBSSxDQUFDdEIsZ0JBQUwsQ0FBc0JNLE1BQXRCLEdBQStCLElBQS9CO0FBQ0gsS0FGRCxFQUVHLEdBRkg7QUFHSCxHQXJESTtBQXNETDtBQUNBaUIsRUFBQUEsb0JBdkRLLGtDQXVEa0I7QUFDbkIsU0FBS3BCLGFBQUwsQ0FBbUJxQixpQkFBbkIsQ0FBcUMsYUFBckM7QUFDQSxTQUFLQyxJQUFMLENBQVVDLE9BQVY7QUFDSCxHQTFESTtBQTRETDtBQUVBTixFQUFBQSxLQTlESyxtQkE4REcsQ0FFUCxDQWhFSSxDQWtFTDs7QUFsRUssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICB0YWxrX2dyb3VwOiBjYy5Ob2RlLFxuICAgICAgICBwYXBlcl9ub2RlOiBjYy5Ob2RlLFxuICAgICAgICBleGl0X2J1dHRvbl9ub2RlOiBjYy5Ob2RlLFxuICAgICAgICB0aXRsZV9ub2RlOiBjYy5Ob2RlLFxuICAgIH0sXG5cbiAgICAvL2luaV9ub2RlXG4gICAgaW5pX25vZGUoKSB7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbCA9IGNjLmZpbmQoXCJzb3VuZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcInNvdW5kX2NvbnRyb2xcIik7XG4gICAgICAgIHRoaXMuZXhpdF9idXR0b25fbm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50aXRsZV9ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy50YWxrX2dyb3VwLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnRhbGtfZ3JvdXAuY2hpbGRyZW5baV0ub3BhY2l0eSA9IDA7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudGFsa19jb3VudCA9IDA7XG4gICAgICAgIHRoaXMucGFwZXJfbm9kZS5oZWlnaHQgPSA1MDU7XG4gICAgICAgIHRoaXMuaW5pX3BhcGVyX2FuaW0oKTtcblxuICAgIH0sXG5cbiAgICAvL+e6uOWKqOeUu1xuICAgIGluaV9wYXBlcl9hbmltKCkge1xuICAgICAgICBjYy50d2Vlbih0aGlzLnBhcGVyX25vZGUpXG4gICAgICAgICAgICAudG8oMC4zLCB7IGhlaWdodDogMTA0MiB9LCB7IGVhc2luZzogXCJzaW5lSW5cIiB9KVxuICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudGl0bGVfbm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuaW5pX3RhbGtfYW5pbSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd19leGl0X2J1dHRvbl9ub2RlKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXJ0KCk7XG4gICAgfSxcblxuICAgIC8vaW5pIGFuaW1cbiAgICBpbmlfdGFsa19hbmltKCkge1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnRhbGtfZ3JvdXAuY2hpbGRyZW5bdGhpcy50YWxrX2NvdW50XS5vcGFjaXR5ID0gMjU1O1xuICAgICAgICAgICAgdGhpcy50YWxrX2NvdW50Kys7XG4gICAgICAgICAgICBpZiAodGhpcy50YWxrX2NvdW50ID49IHRoaXMudGFsa19ncm91cC5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5pbmlfdGFsa19hbmltKCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGNhbGxiYWNrLCAwLjIpO1xuICAgIH0sXG4gICAgc2hvd19leGl0X2J1dHRvbl9ub2RlKCkge1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmV4aXRfYnV0dG9uX25vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfSwgMS41KVxuICAgIH0sXG4gICAgLy/pgIDlh7rmjInpkq5cbiAgICBvbl9leGl0X2J1dHRvbl9jbGljaygpIHtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2V4aXRcIik7XG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgfSxcblxuICAgIC8vIG9uTG9hZCAoKSB7fSxcblxuICAgIHN0YXJ0KCkge1xuXG4gICAgfSxcblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxufSk7XG4iXX0=
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
    this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
    this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
    this.sound_control = cc.find("sound_control").getComponent("sound_control");
    this.ad_control.show_bannerAd();
    this.center_node.scale = 0;
    this.exit_button_node.active = false;

    if (user_data.user_data.level < 15) {
      this.introduce_label.string = "Watch short commercials, \ncurrent rating+1";
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
    this.sound_control.play_sound_effect("button_click");
    this.ad_control.show_videoAd("gift_ad");
    this.video_succes();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcZ2lmdF91aS5qcyJdLCJuYW1lcyI6WyJ1c2VyX2RhdGEiLCJyZXF1aXJlIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJjZW50ZXJfbm9kZSIsIk5vZGUiLCJleGl0X2J1dHRvbl9ub2RlIiwiaW50cm9kdWNlX2xhYmVsIiwiTGFiZWwiLCJpbmlfbm9kZSIsImFkX2NvbnRyb2wiLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwiZ2FtZV9zY2VuZV9qcyIsImdhbWVfcnVsZXNfanMiLCJzb3VuZF9jb250cm9sIiwic2hvd19iYW5uZXJBZCIsInNjYWxlIiwiYWN0aXZlIiwibGV2ZWwiLCJzdHJpbmciLCJ0d2VlbiIsInRvIiwiZWFzaW5nIiwiY2FsbCIsInNjaGVkdWxlT25jZSIsInN0YXJ0Iiwib25faV93YW5uZXJfYWRfYnV0dG9uX2NsaWNrIiwicGxheV9zb3VuZF9lZmZlY3QiLCJzaG93X3ZpZGVvQWQiLCJ2aWRlb19zdWNjZXMiLCJvbl9leGl0X2J1dHRvbl9jbGljayIsImhpZGVfYmFubmVyQWQiLCJub2RlIiwiZGVzdHJveSIsInd4IiwiY2FsbGJhY2siLCJ2aWRlb19zdGF0ZSIsInZpZGVvX3RhZyIsImFkZF9leCIsImNyZWF0ZV90aXBzX3VpIiwibm93X2V4Iiwic2tpbGxfcG9pbnQiLCJzZXRfZXhfcHJvZ3Jlc3MiLCJ1bnNjaGVkdWxlIiwic2NoZWR1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsU0FBUyxHQUFHQyxPQUFPLENBQUMsV0FBRCxDQUF2Qjs7QUFDQUMsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFdBQVcsRUFBRUosRUFBRSxDQUFDSyxJQURSO0FBRVJDLElBQUFBLGdCQUFnQixFQUFFTixFQUFFLENBQUNLLElBRmI7QUFHUkUsSUFBQUEs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QSxTQUFTLENBQUNBLFNBQVYsQ0FBb0JxQixLQUFwQjtBQUNBckIsWUFBQUEsU0FBUyxDQUFDQSxTQUFWLENBQW9CMkMsTUFBcEIsR0FBNkIsQ0FBN0I7QUFDQTNDLFlBQUFBLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQjRDLFdBQXBCO0FBQ0EsaUJBQUs1QixhQUFMLENBQW1CNkIsZUFBbkI7QUFDQSxpQkFBSzlCLGFBQUwsQ0FBbUIyQixjQUFuQixDQUFrQyxLQUFLM0IsYUFBTCxDQUFtQm9CLElBQXJELEVBQTJELGVBQTNEO0FBQ0g7O0FBQUE7QUFDRCxlQUFLdkIsVUFBTCxDQUFnQnNCLGFBQWhCO0FBQ0EsZUFBS1ksVUFBTCxDQUFnQlIsUUFBaEI7QUFDQSxlQUFLSCxJQUFMLENBQVVDLE9BQVY7QUFDSCxTQWhCRCxNQWdCTztBQUNILGNBQUksS0FBS3hCLFVBQUwsQ0FBZ0I0QixTQUFoQixJQUE2QixJQUE3QixJQUFxQyxLQUFLNUIsVUFBTCxDQUFnQjJCLFdBQWhCLElBQStCLENBQXhFLEVBQTJFO0FBQ3ZFLGlCQUFLTyxVQUFMLENBQWdCUixRQUFoQjtBQUNIOztBQUFBO0FBQ0o7O0FBQUE7QUFDSixPQXRCRDs7QUF1QkEsV0FBS1MsUUFBTCxDQUFjVCxRQUFkLEVBQXdCLEdBQXhCO0FBQ0g7O0FBQUE7QUFDSixHQXhFSTtBQXlFTDtBQUVBVixFQUFBQSxLQTNFSyxtQkEyRUcsQ0FFUCxDQTdFSSxDQStFTDs7QUEvRUssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHVzZXJfZGF0YSA9IHJlcXVpcmUoXCJ1c2VyX2RhdGFcIik7XG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBjZW50ZXJfbm9kZTogY2MuTm9kZSxcbiAgICAgICAgZXhpdF9idXR0b25fbm9kZTogY2MuTm9kZSxcbiAgICAgICAgaW50cm9kdWNlX2xhYmVsOiBjYy5MYWJlbCxcbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG4gICAgaW5pX25vZGUoKSB7XG4gICAgICAgIHRoaXMuYWRfY29udHJvbCA9IGNjLmZpbmQoXCJhZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcImFkX2NvbnRyb2xcIik7XG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfc2NlbmVcIik7XG4gICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfcnVsZXNcIik7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbCA9IGNjLmZpbmQoXCJzb3VuZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcInNvdW5kX2NvbnRyb2xcIik7XG4gICAgICAgIHRoaXMuYWRfY29udHJvbC5zaG93X2Jhbm5lckFkKCk7XG4gICAgICAgIHRoaXMuY2VudGVyX25vZGUuc2NhbGUgPSAwO1xuICAgICAgICB0aGlzLmV4aXRfYnV0dG9uX25vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmxldmVsIDwgMTUpIHtcbiAgICAgICAgICAgIHRoaXMuaW50cm9kdWNlX2xhYmVsLnN0cmluZyA9IFwiV2F0Y2ggc2hvcnQgY29tbWVyY2lhbHMsIFxcbmN1cnJlbnQgcmF0aW5nKzFcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaW50cm9kdWNlX2xhYmVsLnN0cmluZyA9IFwiV2F0Y2ggc2hvcnQgY29tbWVyY2lhbHMgYW5kIFxcbmdhaW4gaGFsZi1sZXZlbCBleHBlcmllbmNlXCI7XG4gICAgICAgIH07XG4gICAgICAgIGNjLnR3ZWVuKHRoaXMuY2VudGVyX25vZGUpXG4gICAgICAgICAgICAudG8oMC4zLCB7IHNjYWxlOiAxIH0sIHsgZWFzaW5nOiBcImVsYXN0aWNPdXRcIiB9KVxuICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5leGl0X2J1dHRvbl9ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfSwgMS41KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGFydCgpO1xuICAgIH0sXG4gICAgLy/miJHopoHnnIvop4bpopHmjInpkq7ooqvngrnlh7tcbiAgICBvbl9pX3dhbm5lcl9hZF9idXR0b25fY2xpY2soKSB7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9jbGlja1wiKTtcbiAgICAgICAgdGhpcy5hZF9jb250cm9sLnNob3dfdmlkZW9BZChcImdpZnRfYWRcIik7XG4gICAgICAgIHRoaXMudmlkZW9fc3VjY2VzKCk7XG4gICAgfSxcbiAgICAvL2V4aXQgYnV0dG9uXG4gICAgb25fZXhpdF9idXR0b25fY2xpY2soKSB7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9leGl0XCIpO1xuICAgICAgICB0aGlzLmFkX2NvbnRyb2wuaGlkZV9iYW5uZXJBZCgpO1xuICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xuICAgIH0sXG4gICAgLy/mo4DmtYvop4bpopHmmK/lkKbmkq3mlL7miJDlip9cbiAgICB2aWRlb19zdWNjZXM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiAod3gpICE9IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hZF9jb250cm9sLnZpZGVvX3N0YXRlID09IDEgJiYgdGhpcy5hZF9jb250cm9sLnZpZGVvX3RhZyA9PSBcImdpZnRfYWRcIikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkX2NvbnRyb2wudmlkZW9fdGFnID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZF9jb250cm9sLnZpZGVvX3N0YXRlID0gMjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEubGV2ZWwgPiAxNSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLmFkZF9leCh1c2VyX2RhdGEudXNlcl9kYXRhLmxldmVsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfc2NlbmVfanMubm9kZSwgXCJnaWZ0X2FkX2V4XCIpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5sZXZlbCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5ub3dfZXggPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbF9wb2ludCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLnNldF9leF9wcm9ncmVzcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9zY2VuZV9qcy5ub2RlLCBcImdpZnRfYWRfbGV2ZWxcIik7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRfY29udHJvbC5oaWRlX2Jhbm5lckFkKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZShjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYWRfY29udHJvbC52aWRlb190YWcgPT0gbnVsbCAmJiB0aGlzLmFkX2NvbnRyb2wudmlkZW9fc3RhdGUgPT0gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUoY2FsbGJhY2ssIDAuMik7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvLyBvbkxvYWQgKCkge30sXG5cbiAgICBzdGFydCgpIHtcblxuICAgIH0sXG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcbn0pO1xuIl19
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
        this.cut();
        break;

      case "plant":
        var node = this.game_scene_js.create_plant_ui(this.game_scene_js.node);

        if (node != null) {
          node.getComponent("plant_ui").ini_node(this.land_index);
        }

        ;
        break;

      case "wait_till":
        user_data.user_data.land[this.land_index].land_state = "wait_till";
        this.till();
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
        var water_num = user_data.user_data.land[this.land_index].water_num; // if (user_data.user_data.land[this.land_index].have_water == 0) water_num = 0;//ktra xem ô đất còn nước k

        user_data.user_data.land[this.land_index].water_num -= 0.1 * (1 - user_data.user_data.skill["water_saving"] / 100);
        water_num = user_data.user_data.land[this.land_index].water_num;

        if (water_num <= 0) {
          this.unschedule(this.water_schedule);
          this.water_buff = 1;
          user_data.user_data.land[this.land_index].water_num = 0; // user_data.user_data.land[this.land_index].have_water = 0;   // lưu trạng thái có nước hay k của ô đất
          // console.log("hello " + user_data.user_data.land[this.land_index].have_water)

          return;
        } else {
          bar.progress = water_num / all_water;
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

      var callback = function callback() {
        var now_water = user_data.user_data.land[this.land_index].water_num;
        user_data.user_data.land[this.land_index].water_num += 1;
        user_data.user_data.land[this.land_index].have_water = 1;

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
            this.plant_node.active = false;
            this.plant_progress_node.active = false;
            this.water_progress_node.active = false;
            this.node.getComponent(cc.Sprite).spriteFrame = this.land_frame_arr[0];
            this.wait_next("wait_till");
            break;

          case "wait_plant":
            this.node.getComponent(cc.Sprite).spriteFrame = this.land_frame_arr[1];
            this.plant_progress_node.active = true;
            this.water_progress_node.active = true; // var bar = this.water_progress_node.getComponent(cc.ProgressBar);
            // if (user_data.user_data.land[this.land_index].have_water == 0) bar.progress = 0;

            this.plant_progress_label.string = "Waiting to be planted";
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
            this.wait_next("wait_cut");
            break;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcbGFuZC5qcyJdLCJuYW1lcyI6WyJ1c2VyX2RhdGEiLCJyZXF1aXJlIiwiY29uZmlnIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJ0aXBzX25vZGUiLCJOb2RlIiwicGxhbnRfbm9kZSIsInBsYW50X3Byb2dyZXNzX25vZGUiLCJ3YXRlcl9wcm9ncmVzc19ub2RlIiwicGxhbnRfcHJvZ3Jlc3NfbGFiZWwiLCJMYWJlbCIsImJ1dHRvbiIsImJ1dHRvbl9mcmFtZV9hcnIiLCJTcHJpdGVGcmFtZSIsImxhbmRfZnJhbWVfYXJyIiwicGxhbnQwX2ZyYW1lX2FyciIsInBsYW50MV9mcmFtZV9hcnIiLCJwbGFudDJfZnJhbWVfYXJyIiwicGxhbnQzX2ZyYW1lX2FyciIsInBsYW50NF9mcmFtZV9hcnIiLCJwbGFudDVfZnJhbWVfYXJyIiwicGxhbnQ2X2ZyYW1lX2FyciIsInBsYW50N19mcmFtZV9hcnIiLCJzZXRfcGxhbnQiLCJhY3RpdmUiLCJhbGl2ZV9zdGFnZSIsImxhbmQiLCJsYW5kX2luZGV4IiwiaSIsImNoaWxkcmVuIiwibGVuZ3RoIiwiZ2V0Q29tcG9uZW50IiwiU3ByaXRlIiwic3ByaXRlRnJhbWUiLCJwbGFudF9mcmFtZV9hcnIiLCJwbGFudF90eXBlIiwicGxhbnRfZ3JvdyIsImxhbmRfc3RhdGUiLCJncm93X3RpbWUiLCJwbGFudCIsIm5vd190aW1lIiwiYmFyIiwiUHJvZ3Jlc3NCYXIiLCJ3YXRlcmluZyIsInBsYW50X2dyb3dfc2NoZWR1bGUiLCJ3YXRlcl9idWZmIiwidW5zY2hlZHVsZSIsInN0cmluZyIsIndhaXRfbmV4dCIsInByb2dyZXNzIiwicHJvZ3Jlc3NfbnVtIiwicGFyc2VJbnQiLCJ1cGRhdGVfcGxhbnRfYWxpdmVfc3RhZ2UiLCJzY2hlZHVsZSIsInBsYW50U3ByaXRlIiwicGxhbnRfaW5kZXgiLCJwbGFudF9jb3VudCIsInJlc3RfcGxhdF9hbGl2ZV9zdGFnZSIsIndhdGVyX3NjaGVkdWxlIiwidHlwZSIsInN0YXRlIiwiY3V0IiwiY3V0X3RpbWUiLCJza2lsbCIsImN1dF9zY2hlZHVsZSIsInNvdW5kX2NvbnRyb2wiLCJwbGF5X3NvdW5kX2VmZmVjdCIsIm5vZGUiLCJnYW1lX3NjZW5lX2pzIiwiY3JlYXRlX2xpZ2h0X2VmZmVjdCIsImluaV9ub2RlIiwib25fYnV0dG9uX2NsaWNrIiwiY3JlYXRlX3BsYW50X3VpIiwidGlsbCIsImFsbF93YXRlciIsImFsbF93YXRlcl9udW0iLCJ3YXRlcl9udW0iLCJ3YXRlcl9jaGFyZ2UiLCJ3YXRlcl9zdGF0ZSIsImNhbGxiYWNrIiwibm93X3dhdGVyIiwiaGF2ZV93YXRlciIsImluZGV4IiwiZmluZCIsImhhdmUiLCJwbGFudF9zY2hlZHVsZSIsInRpbGxfdGltZSIsInBsYW50X3RpbWUiLCJsb2ciLCJvbkxvYWQiLCJzdGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxTQUFTLEdBQUdDLE9BQU8sQ0FBQyxXQUFELENBQXZCOztBQUNBLElBQUlDLE1BQU0sR0FBR0QsT0FBTyxDQUFDLFFBQUQsQ0FBcEI7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUFFLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBRUxDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxTQUFTLEVBQUVKLEVBQUUsQ0FBQ0ssSUFETjtBQUVSQyxJQUFBQSxVQUFVLEVBQUVOLEVBQUUsQ0FBQ0ssSUFGUDtBQUdSRSxJQUFBQSxtQkFBbUIsRUFBRVAsRUFBRSxDQUFDSyxJQUhoQjtBQUlSRyxJQUFBQSxtQkFBbUIsRUFBRVIsRUFBRSxDQUFDSyxJQUpoQjtBQUtSSSxJQUFBQSxvQkFBb0IsRUFBRVQsRUFBRSxDQUFDVSxLQUxqQjtBQU1SQyxJQUFBQSxNQUFNLEVBQUVYLEVBQUUsQ0FBQ0ssSUFOSDtBQU9STyxJQUFBQSxnQkFBZ0IsRUFBRSxDQUFDWixFQUFFLENBQUNhLFdBQUosQ0FQVjtBQVFSQyxJQUFBQSxjQUFjLEVBQUUsQ0FBQ2QsRUFBRSxDQUFDYSxXQUFKLENBUlI7QUFTUkUsSUFBQUEsZ0JBQWdCLEVBQUUsQ0FBQ2YsRUFBRSxDQUFDYSxXQUFKLENBVFY7QUFVUkcsSUFBQUEsZ0JBQWdCLEVBQUUsQ0FBQ2hCLEVBQUUsQ0FBQ2EsV0FBSixDQVZWO0FBV1JJLElBQUFBLGdCQUFnQixFQUFFLENBQUNqQixFQUFFLENBQUNhLFdBQUosQ0FYVjtBQVlSSyxJQUFBQSxnQkFBZ0IsRUFBRSxDQUFDbEIsRUFBRSxDQUFDYSxXQUFKLENBWlY7QUFhUk0sSUFBQUEsZ0JBQWdCLEVBQUUsQ0FBQ25CLEVBQUUsQ0FBQ2EsV0FBSixDQWJWO0FBY1JPLElBQUFBLGdCQUFnQixFQUFFLENBQUNwQixFQUFFLENBQUNhLFdBQUosQ0FkVjtBQWVSUSxJQUFBQSxnQkFBZ0IsRUFBRSxDQUFDckIsRUFBRSxDQUFDYSxXQUFKLENBZlY7QUFnQlJTLElBQUFBLGdCQUFnQixFQUFFLENBQUN0QixFQUFFLENBQUNhLFdBQUo7QUFoQlYsR0FGUDtBQXFCTDtBQUVBO0FBQ0FVLEVBQUFBLFNBQVMsRUFBRSxxQkFBWTtBQUNuQixTQUFLakIsVUFBTCxDQUFnQmtCLE1BQWhCLEdBQXlCLElBQXpCO0FBQ0EsUUFBSUMsV0FBVyxHQUFHNUIsU0FBUyxDQUFDQSxTQUFWLENBQW9CNkIsSUFBcEIsQ0FBeUIsS0FBS0MsVUFBOUIsRUFBMENGLFdBQTVEOztBQUNBLFNBQUssSUFBSUcsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLdEIsVUFBTCxDQUFnQnVCLFFBQWhCLENBQXlCQyxNQUE3QyxFQUFxREYsQ0FBQyxFQUF0RCxFQUEwRDtBQUN0RCxXQUFLdEIsVUFBTCxDQUFnQnVCLFFBQWhCLENBQXlCRCxDQUF6QixFQUE0QkcsWUFBNUIsQ0FBeUMvQixFQUFFLENBQUNnQyxNQUE1QyxFQUFvREMsV0FBcEQsR0FBa0UsS0FBS0MsZUFBTCxDQUFxQixLQUFLQyxVQUExQixFQUFzQ1YsV0FBdEMsQ0FBbEU7QUFDSDs7QUFBQTtBQUNELFNBQUtXLFVBQUw7QUFDSCxHQS9CSTtBQWdDTDtBQUNBQSxFQUFBQSxVQUFVLEVBQUUsc0JBQVk7QUFDcEJ2QyxJQUFBQSxTQUFTLENBQUNBLFNBQVYsQ0FBb0I2QixJQUFwQixDQUF5QixLQUFLQyxVQUE5QixFQUEwQ1UsVUFBMUMsR0FBdUQsTUFBdkQsQ0FEb0IsQ0FDMkM7O0FBQy9ELFFBQUlBLFVBQVUsR0FBR3hDLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQjZCLElBQXBCLENBQXlCLEtBQUtDLFVBQTlCLEVBQTBDVSxVQUEzRDtBQUNBLFNBQUs5QixtQkFBTCxDQUF5QmlCLE1BQXpCLEdBQWtDLElBQWxDO0FBQ0EsUUFBSWMsU0FBUyxHQUFHdkMsTUFBTSxDQUFDd0MsS0FBUCxDQUFhLEtBQUtKLFVBQWxCLEVBQThCRyxTQUE5QztBQUNBLFFBQUlFLFFBQVEsR0FBRyxDQUFmO0FBQ0EsUUFBSUMsR0FBRyxHQUFHLEtBQUtsQyxtQkFBTCxDQUF5QndCLFlBQXpCLENBQXNDL0IsRUFBRSxDQUFDMEMsV0FBekMsQ0FBVjtBQUNBLFNBQUtDLFFBQUw7O0FBQ0EsU0FBS0MsbUJBQUwsR0FBMkIsWUFBWTtBQUNuQ0osTUFBQUEsUUFBUSxJQUFJLE1BQU0sS0FBS0ssVUFBdkI7O0FBQ0EsVUFBSUwsUUFBUSxJQUFJRixTQUFaLElBQXlCRCxVQUFVLElBQUksTUFBM0MsRUFBbUQ7QUFDL0MsYUFBS1MsVUFBTCxDQUFnQixLQUFLRixtQkFBckI7QUFDQSxhQUFLbkMsb0JBQUwsQ0FBMEJzQyxNQUExQixHQUFtQyxxQkFBbkM7QUFDQSxhQUFLQyxTQUFMLENBQWUsVUFBZjtBQUNBO0FBQ0gsT0FMRCxNQUtPO0FBQ0hQLFFBQUFBLEdBQUcsQ0FBQ1EsUUFBSixHQUFlVCxRQUFRLEdBQUdGLFNBQTFCO0FBQ0EsWUFBSVksWUFBWSxHQUFHQyxRQUFRLENBQUNWLEdBQUcsQ0FBQ1EsUUFBSixHQUFlLEdBQWhCLENBQTNCO0FBQ0EsYUFBS3hDLG9CQUFMLENBQTBCc0MsTUFBMUIsR0FBbUMsYUFBYUcsWUFBYixHQUE0QixHQUEvRDtBQUNBLGFBQUtFLHdCQUFMLENBQThCRixZQUE5Qjs7QUFDQSxZQUFJQSxZQUFZLEdBQUcsRUFBbkIsRUFBdUI7QUFDbkIsZUFBSyxJQUFJdEIsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLdEIsVUFBTCxDQUFnQnVCLFFBQWhCLENBQXlCQyxNQUE3QyxFQUFxREYsQ0FBQyxFQUF0RCxFQUEwRDtBQUN0RCxpQkFBS3RCLFVBQUwsQ0FBZ0J1QixRQUFoQixDQUF5QkQsQ0FBekIsRUFBNEJHLFlBQTVCLENBQXlDL0IsRUFBRSxDQUFDZ0MsTUFBNUMsRUFBb0RDLFdBQXBELEdBQWtFLEtBQUtDLGVBQUwsQ0FBcUIsS0FBS0MsVUFBMUIsRUFBc0MsQ0FBdEMsQ0FBbEU7QUFDSDs7QUFBQTtBQUNKLFNBSkQsTUFLSyxJQUFJZSxZQUFZLEdBQUcsRUFBbkIsRUFBdUI7QUFDeEIsZUFBSyxJQUFJdEIsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLdEIsVUFBTCxDQUFnQnVCLFFBQWhCLENBQXlCQyxNQUE3QyxFQUFxREYsQ0FBQyxFQUF0RCxFQUEwRDtBQUN0RCxpQkFBS3RCLFVBQUwsQ0FBZ0J1QixRQUFoQixDQUF5QkQsQ0FBekIsRUFBNEJHLFlBQTVCLENBQXlDL0IsRUFBRSxDQUFDZ0MsTUFBNUMsRUFBb0RDLFdBQXBELEdBQWtFLEtBQUtDLGVBQUwsQ0FBcUIsS0FBS0MsVUFBMUIsRUFBc0MsQ0FBdEMsQ0FBbEU7QUFFSDs7QUFBQTtBQUNKLFNBTEksTUFNQSxJQUFJZSxZQUFZLEdBQUcsRUFBbkIsRUFBdUI7QUFDeEIsZUFBSyxJQUFJdEIsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLdEIsVUFBTCxDQUFnQnVCLFFBQWhCLENBQXlCQyxNQUE3QyxFQUFxREYsQ0FBQyxFQUF0RCxFQUEwRDtBQUN0RCxpQkFBS3RCLFVBQUwsQ0FBZ0J1QixRQUFoQixDQUF5QkQsQ0FBekIsRUFBNEJHLFlBQTVCLENBQXlDL0IsRUFBRSxDQUFDZ0MsTUFBNUMsRUFBb0RDLFdBQXBELEdBQWtFLEtBQUtDLGVBQUwsQ0FBcUIsS0FBS0MsVUFBMUIsRUFBc0MsQ0FBdEMsQ0FBbEU7QUFDSDs7QUFBQTtBQUNKLFNBSkksTUFLQSxLQUFLLElBQUlQLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsS0FBS3RCLFVBQUwsQ0FBZ0J1QixRQUFoQixDQUF5QkMsTUFBN0MsRUFBcURGLENBQUMsRUFBdEQsRUFBMEQ7QUFDM0QsZUFBS3RCLFVBQUwsQ0FBZ0J1QixRQUFoQixDQUF5QkQsQ0FBekIsRUFBNEJHLFlBQTVCLENBQXlDL0IsRUFBRSxDQUFDZ0MsTUFBNUMsRUFBb0RDLFdBQXBELEdBQWtFLEtBQUtDLGVBQUwsQ0FBcUIsS0FBS0MsVUFBMUIsRUFBc0MsQ0FBdEMsQ0FBbEU7QUFDSDs7QUFBQTtBQUNKOztBQUFBO0FBQ0osS0FoQ0Q7O0FBaUNBLFNBQUtrQixRQUFMLENBQWMsS0FBS1QsbUJBQW5CLEVBQXdDLEdBQXhDO0FBQ0gsR0EzRUk7QUE0RUw7QUFDQVEsRUFBQUEsd0JBQXdCLEVBQUUsa0NBQVVGLFlBQVYsRUFBd0I7QUFDOUM7QUFDQSxRQUFJekIsV0FBVyxHQUFHNUIsU0FBUyxDQUFDQSxTQUFWLENBQW9CNkIsSUFBcEIsQ0FBeUIsS0FBS0MsVUFBOUIsRUFBMENGLFdBQTVEO0FBQ0EsUUFBSTZCLFdBQVcsR0FBRyxLQUFLaEQsVUFBTCxDQUFnQnVCLFFBQWhCLENBQXlCLEtBQUswQixXQUE5QixFQUEyQ3hCLFlBQTNDLENBQXdEL0IsRUFBRSxDQUFDZ0MsTUFBM0QsRUFBbUVDLFdBQXJGOztBQUNBLFFBQUlxQixXQUFKLEVBQWlCO0FBQ2JBLE1BQUFBLFdBQVcsR0FBRyxLQUFLcEIsZUFBTCxDQUFxQixLQUFLQyxVQUExQixFQUFzQ1YsV0FBdEMsQ0FBZDtBQUNIOztBQUFBOztBQUNELFFBQUl5QixZQUFZLElBQUksS0FBSyxFQUFMLEdBQVUsS0FBS00sV0FBbkMsRUFBZ0Q7QUFDNUMsV0FBS0QsV0FBTDtBQUNBLFdBQUtDLFdBQUw7O0FBQ0EsVUFBSSxLQUFLQSxXQUFMLEdBQW1CLEVBQXZCLEVBQTJCO0FBQ3ZCLGFBQUtBLFdBQUwsR0FBbUIsRUFBbkI7QUFDSDs7QUFBQTs7QUFDRCxVQUFJLEtBQUtELFdBQUwsR0FBbUIsRUFBdkIsRUFBMkI7QUFDdkIxRCxRQUFBQSxTQUFTLENBQUNBLFNBQVYsQ0FBb0I2QixJQUFwQixDQUF5QixLQUFLQyxVQUE5QixFQUEwQ0YsV0FBMUM7O0FBQ0EsWUFBSTVCLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQjZCLElBQXBCLENBQXlCLEtBQUtDLFVBQTlCLEVBQTBDRixXQUExQyxHQUF3RCxDQUE1RCxFQUErRDtBQUMzRDVCLFVBQUFBLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQjZCLElBQXBCLENBQXlCLEtBQUtDLFVBQTlCLEVBQTBDRixXQUExQyxHQUF3RCxDQUF4RDtBQUNIOztBQUFBO0FBQ0QsYUFBSzhCLFdBQUwsR0FBbUIsQ0FBbkI7QUFDSDs7QUFBQTtBQUNKOztBQUFBO0FBQ0osR0FsR0k7QUFtR0w7QUFDQUUsRUFBQUEscUJBQXFCLEVBQUUsaUNBQVk7QUFDL0I1RCxJQUFBQSxTQUFTLENBQUNBLFNBQVYsQ0FBb0I2QixJQUFwQixDQUF5QixLQUFLQyxVQUE5QixFQUEwQ0YsV0FBMUMsR0FBd0QsQ0FBeEQ7QUFDQSxTQUFLOEIsV0FBTCxHQUFtQixDQUFuQjtBQUNBLFNBQUtDLFdBQUwsR0FBbUIsQ0FBbkI7QUFDQSxTQUFLVixVQUFMLENBQWdCLEtBQUtZLGNBQXJCO0FBQ0EsU0FBS1osVUFBTCxDQUFnQixLQUFLRixtQkFBckI7QUFDQSxTQUFLckIsU0FBTDtBQUNILEdBM0dJO0FBNEdMO0FBQ0F5QixFQUFBQSxTQUFTLEVBQUUsbUJBQVVXLElBQVYsRUFBZ0I7QUFDdkIsU0FBS2hELE1BQUwsQ0FBWWlELEtBQVosR0FBb0JELElBQXBCOztBQUNBLFlBQVFBLElBQVI7QUFDSSxXQUFLLFVBQUw7QUFDSSxhQUFLaEQsTUFBTCxDQUFZa0IsUUFBWixDQUFxQixDQUFyQixFQUF3QkUsWUFBeEIsQ0FBcUMvQixFQUFFLENBQUNnQyxNQUF4QyxFQUFnREMsV0FBaEQsR0FBOEQsS0FBS3JCLGdCQUFMLENBQXNCLENBQXRCLENBQTlEO0FBQ0FmLFFBQUFBLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQjZCLElBQXBCLENBQXlCLEtBQUtDLFVBQTlCLEVBQTBDVSxVQUExQyxHQUF1RCxVQUF2RDtBQUNBOztBQUNKLFdBQUssT0FBTDtBQUNJLGFBQUsxQixNQUFMLENBQVlrQixRQUFaLENBQXFCLENBQXJCLEVBQXdCRSxZQUF4QixDQUFxQy9CLEVBQUUsQ0FBQ2dDLE1BQXhDLEVBQWdEQyxXQUFoRCxHQUE4RCxLQUFLckIsZ0JBQUwsQ0FBc0IsQ0FBdEIsQ0FBOUQ7QUFDQTs7QUFDSixXQUFLLFdBQUw7QUFDSSxhQUFLRCxNQUFMLENBQVlrQixRQUFaLENBQXFCLENBQXJCLEVBQXdCRSxZQUF4QixDQUFxQy9CLEVBQUUsQ0FBQ2dDLE1BQXhDLEVBQWdEQyxXQUFoRCxHQUE4RCxLQUFLckIsZ0JBQUwsQ0FBc0IsQ0FBdEIsQ0FBOUQ7QUFDQTtBQVZSOztBQVlDO0FBQ0QsU0FBS0QsTUFBTCxDQUFZYSxNQUFaLEdBQXFCLElBQXJCO0FBQ0EsU0FBS3NCLFVBQUwsQ0FBZ0IsS0FBS1ksY0FBckI7QUFDSCxHQTlISTtBQStITDtBQUNBRyxFQUFBQSxHQUFHLEVBQUUsZUFBWTtBQUNiLFFBQUloRSxTQUFTLENBQUNBLFNBQVYsQ0FBb0I2QixJQUFwQixDQUF5QixLQUFLQyxVQUE5QixFQUEwQ1UsVUFBMUMsS0FBeUQsVUFBN0QsRUFBeUU7QUFDckU7QUFDSDs7QUFBQTtBQUNEeEMsSUFBQUEsU0FBUyxDQUFDQSxTQUFWLENBQW9CNkIsSUFBcEIsQ0FBeUIsS0FBS0MsVUFBOUIsRUFBMENVLFVBQTFDLEdBQXVELFFBQXZEO0FBQ0EsUUFBSUEsVUFBVSxHQUFHeEMsU0FBUyxDQUFDQSxTQUFWLENBQW9CNkIsSUFBcEIsQ0FBeUIsS0FBS0MsVUFBOUIsRUFBMENVLFVBQTNEO0FBQ0EsU0FBSzFCLE1BQUwsQ0FBWWEsTUFBWixHQUFxQixLQUFyQjtBQUNBLFFBQUlzQyxRQUFRLEdBQUcvRCxNQUFNLENBQUN3QyxLQUFQLENBQWEsS0FBS0osVUFBbEIsRUFBOEIyQixRQUE5QixJQUEwQyxJQUFJakUsU0FBUyxDQUFDQSxTQUFWLENBQW9Ca0UsS0FBcEIsQ0FBMEIsZUFBMUIsSUFBNkMsR0FBM0YsQ0FBZjtBQUNBLFFBQUl2QixRQUFRLEdBQUcsQ0FBZjtBQUNBLFFBQUlDLEdBQUcsR0FBRyxLQUFLbEMsbUJBQUwsQ0FBeUJ3QixZQUF6QixDQUFzQy9CLEVBQUUsQ0FBQzBDLFdBQXpDLENBQVY7O0FBQ0EsU0FBS3NCLFlBQUwsR0FBb0IsWUFBWTtBQUM1QnhCLE1BQUFBLFFBQVEsSUFBSSxHQUFaOztBQUNBLFVBQUlBLFFBQVEsSUFBSXNCLFFBQVosSUFBd0J6QixVQUFVLElBQUksUUFBMUMsRUFBb0Q7QUFDaERHLFFBQUFBLFFBQVEsR0FBRyxDQUFYO0FBQ0EzQyxRQUFBQSxTQUFTLENBQUNBLFNBQVYsQ0FBb0I2QixJQUFwQixDQUF5QixLQUFLQyxVQUE5QixFQUEwQ1UsVUFBMUMsR0FBdUQsVUFBdkQ7QUFDQSxhQUFLNEIsYUFBTCxDQUFtQkMsaUJBQW5CLENBQXFDLFVBQXJDO0FBQ0EsYUFBS3BCLFVBQUwsQ0FBZ0IsS0FBS2tCLFlBQXJCO0FBQ0EsYUFBS1AscUJBQUw7QUFDQSxZQUFJVSxJQUFJLEdBQUcsS0FBS0MsYUFBTCxDQUFtQkMsbUJBQW5CLENBQXVDLEtBQUtGLElBQTVDLEVBQWtELENBQWxELEVBQXFELEtBQUtoQyxVQUExRCxDQUFYOztBQUVBLFlBQUlnQyxJQUFJLElBQUksSUFBWixFQUFrQjtBQUNkQSxVQUFBQSxJQUFJLENBQUNwQyxZQUFMLENBQWtCLE9BQWxCLEVBQTJCdUMsUUFBM0IsQ0FBb0MsS0FBS25DLFVBQXpDLEVBQXFELEtBQUtnQyxJQUExRDtBQUNIOztBQUFBO0FBQ0Q7QUFDSCxPQVpELE1BWU87QUFDSDFCLFFBQUFBLEdBQUcsQ0FBQ1EsUUFBSixHQUFlVCxRQUFRLEdBQUdzQixRQUExQjtBQUNBLFlBQUlaLFlBQVksR0FBR0MsUUFBUSxDQUFDVixHQUFHLENBQUNRLFFBQUosR0FBZSxHQUFoQixDQUEzQjtBQUNBLGFBQUt4QyxvQkFBTCxDQUEwQnNDLE1BQTFCLEdBQW1DLGdCQUFnQkcsWUFBaEIsR0FBK0IsR0FBbEU7QUFDSDs7QUFBQTtBQUNKLEtBbkJEOztBQW9CQSxTQUFLRyxRQUFMLENBQWMsS0FBS1csWUFBbkIsRUFBaUMsR0FBakM7QUFDSCxHQS9KSTtBQWdLTDtBQUNBTyxFQUFBQSxlQUFlLEVBQUUsMkJBQVk7QUFDekIsU0FBS04sYUFBTCxDQUFtQkMsaUJBQW5CLENBQXFDLGNBQXJDOztBQUNBLFlBQVEsS0FBS3ZELE1BQUwsQ0FBWWlELEtBQXBCO0FBQ0ksV0FBSyxVQUFMO0FBQ0ksYUFBS0MsR0FBTDtBQUNBOztBQUNKLFdBQUssT0FBTDtBQUNJLFlBQUlNLElBQUksR0FBRyxLQUFLQyxhQUFMLENBQW1CSSxlQUFuQixDQUFtQyxLQUFLSixhQUFMLENBQW1CRCxJQUF0RCxDQUFYOztBQUNBLFlBQUlBLElBQUksSUFBSSxJQUFaLEVBQWtCO0FBQ2RBLFVBQUFBLElBQUksQ0FBQ3BDLFlBQUwsQ0FBa0IsVUFBbEIsRUFBOEJ1QyxRQUE5QixDQUF1QyxLQUFLM0MsVUFBNUM7QUFDSDs7QUFBQTtBQUNEOztBQUNKLFdBQUssV0FBTDtBQUNJOUIsUUFBQUEsU0FBUyxDQUFDQSxTQUFWLENBQW9CNkIsSUFBcEIsQ0FBeUIsS0FBS0MsVUFBOUIsRUFBMENVLFVBQTFDLEdBQXVELFdBQXZEO0FBQ0EsYUFBS29DLElBQUw7QUFDQTs7QUFDSjtBQUNJO0FBZlI7O0FBZ0JDO0FBQ0osR0FwTEk7QUFxTEw7QUFDQTlCLEVBQUFBLFFBQVEsRUFBRSxvQkFBWTtBQUNsQixTQUFLRSxVQUFMLEdBQWtCLENBQWxCO0FBQ0EsU0FBS3JDLG1CQUFMLENBQXlCZ0IsTUFBekIsR0FBa0MsSUFBbEM7QUFDQSxRQUFJa0QsU0FBUyxHQUFHM0UsTUFBTSxDQUFDNEUsYUFBdkI7QUFDQSxRQUFJbEMsR0FBRyxHQUFHLEtBQUtqQyxtQkFBTCxDQUF5QnVCLFlBQXpCLENBQXNDL0IsRUFBRSxDQUFDMEMsV0FBekMsQ0FBVjs7QUFDQSxTQUFLZ0IsY0FBTCxHQUFzQixZQUFZO0FBQzlCLFVBQUk3RCxTQUFTLENBQUNBLFNBQVYsQ0FBb0I2QixJQUFwQixDQUF5QixLQUFLQyxVQUE5QixFQUEwQ1UsVUFBMUMsSUFBd0QsTUFBNUQsRUFBb0U7QUFDaEUsWUFBSXVDLFNBQVMsR0FBRy9FLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQjZCLElBQXBCLENBQXlCLEtBQUtDLFVBQTlCLEVBQTBDaUQsU0FBMUQsQ0FEZ0UsQ0FFaEU7O0FBQ0EvRSxRQUFBQSxTQUFTLENBQUNBLFNBQVYsQ0FBb0I2QixJQUFwQixDQUF5QixLQUFLQyxVQUE5QixFQUEwQ2lELFNBQTFDLElBQXVELE9BQU8sSUFBSS9FLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQmtFLEtBQXBCLENBQTBCLGNBQTFCLElBQTRDLEdBQXZELENBQXZEO0FBQ0FhLFFBQUFBLFNBQVMsR0FBRy9FLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQjZCLElBQXBCLENBQXlCLEtBQUtDLFVBQTlCLEVBQTBDaUQsU0FBdEQ7O0FBQ0EsWUFBSUEsU0FBUyxJQUFJLENBQWpCLEVBQW9CO0FBQ2hCLGVBQUs5QixVQUFMLENBQWdCLEtBQUtZLGNBQXJCO0FBQ0EsZUFBS2IsVUFBTCxHQUFrQixDQUFsQjtBQUNBaEQsVUFBQUEsU0FBUyxDQUFDQSxTQUFWLENBQW9CNkIsSUFBcEIsQ0FBeUIsS0FBS0MsVUFBOUIsRUFBMENpRCxTQUExQyxHQUFzRCxDQUF0RCxDQUhnQixDQUloQjtBQUNBOztBQUNBO0FBQ0gsU0FQRCxNQU9PO0FBQ0huQyxVQUFBQSxHQUFHLENBQUNRLFFBQUosR0FBZTJCLFNBQVMsR0FBR0YsU0FBM0I7QUFDSDs7QUFBQTtBQUNKLE9BZkQsTUFlTztBQUNILGFBQUs1QixVQUFMLENBQWdCLEtBQUtZLGNBQXJCO0FBQ0E7QUFDSDs7QUFBQTtBQUNKLEtBcEJEOztBQXFCQSxTQUFLTCxRQUFMLENBQWMsS0FBS0ssY0FBbkIsRUFBbUMsR0FBbkM7QUFDSCxHQWpOSTtBQWtOTG1CLEVBQUFBLFlBQVksRUFBRSx3QkFBWTtBQUN0QixRQUFJLEtBQUtDLFdBQUwsSUFBb0IsSUFBeEIsRUFBOEI7QUFDMUIsV0FBS2hDLFVBQUwsQ0FBZ0IsS0FBS1ksY0FBckI7QUFDQSxXQUFLb0IsV0FBTCxHQUFtQixRQUFuQjtBQUNBLFVBQUlKLFNBQVMsR0FBRzNFLE1BQU0sQ0FBQzRFLGFBQXZCO0FBQ0EsVUFBSWxDLEdBQUcsR0FBRyxLQUFLakMsbUJBQUwsQ0FBeUJ1QixZQUF6QixDQUFzQy9CLEVBQUUsQ0FBQzBDLFdBQXpDLENBQVY7O0FBQ0EsVUFBSXFDLFFBQVEsR0FBRyxTQUFYQSxRQUFXLEdBQVk7QUFDdkIsWUFBSUMsU0FBUyxHQUFHbkYsU0FBUyxDQUFDQSxTQUFWLENBQW9CNkIsSUFBcEIsQ0FBeUIsS0FBS0MsVUFBOUIsRUFBMENpRCxTQUExRDtBQUNBL0UsUUFBQUEsU0FBUyxDQUFDQSxTQUFWLENBQW9CNkIsSUFBcEIsQ0FBeUIsS0FBS0MsVUFBOUIsRUFBMENpRCxTQUExQyxJQUF1RCxDQUF2RDtBQUNBL0UsUUFBQUEsU0FBUyxDQUFDQSxTQUFWLENBQW9CNkIsSUFBcEIsQ0FBeUIsS0FBS0MsVUFBOUIsRUFBMENzRCxVQUExQyxHQUF1RCxDQUF2RDs7QUFDQSxZQUFJRCxTQUFTLElBQUlOLFNBQWpCLEVBQTRCO0FBQ3hCLGVBQUs1QixVQUFMLENBQWdCaUMsUUFBaEI7QUFDQWxGLFVBQUFBLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQjZCLElBQXBCLENBQXlCLEtBQUtDLFVBQTlCLEVBQTBDaUQsU0FBMUMsR0FBc0RGLFNBQXREO0FBQ0EsZUFBS0ksV0FBTCxHQUFtQixJQUFuQjs7QUFDQSxjQUFJakYsU0FBUyxDQUFDQSxTQUFWLENBQW9CNkIsSUFBcEIsQ0FBeUIsS0FBS0MsVUFBOUIsRUFBMENVLFVBQTFDLElBQXdELEtBQTVELEVBQW1FLENBQy9EO0FBQ0gsV0FGRCxNQUVPO0FBQ0gsaUJBQUtNLFFBQUw7QUFDSDs7QUFBQTtBQUNEO0FBQ0g7O0FBQUE7QUFDREYsUUFBQUEsR0FBRyxDQUFDUSxRQUFKLEdBQWUrQixTQUFTLEdBQUdOLFNBQTNCO0FBQ0gsT0FoQkQ7O0FBaUJBLFdBQUtyQixRQUFMLENBQWMwQixRQUFkLEVBQXdCLEdBQXhCO0FBQ0gsS0F2QkQsTUF1Qk8sSUFBSSxLQUFLRCxXQUFMLElBQW9CLFFBQXhCLEVBQWtDO0FBQ3JDakYsTUFBQUEsU0FBUyxDQUFDQSxTQUFWLENBQW9CNkIsSUFBcEIsQ0FBeUIsS0FBS0MsVUFBOUIsRUFBMENpRCxTQUExQyxJQUF1RCxFQUF2RDtBQUNIOztBQUFBO0FBQ0osR0E3T0k7QUE4T0w7QUFDQU4sRUFBQUEsUUFBUSxFQUFFLGtCQUFVWSxLQUFWLEVBQWlCO0FBQ3ZCLFNBQUtqQixhQUFMLEdBQXFCakUsRUFBRSxDQUFDbUYsSUFBSCxDQUFRLGVBQVIsRUFBeUJwRCxZQUF6QixDQUFzQyxlQUF0QyxDQUFyQjtBQUNBLFFBQUlxRCxJQUFJLEdBQUd2RixTQUFTLENBQUNBLFNBQVYsQ0FBb0I2QixJQUFwQixDQUF5QndELEtBQXpCLEVBQWdDRSxJQUEzQztBQUNBLFNBQUt6RCxVQUFMLEdBQWtCdUQsS0FBbEI7QUFDQSxTQUFLL0MsVUFBTCxHQUFrQnRDLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQjZCLElBQXBCLENBQXlCLEtBQUtDLFVBQTlCLEVBQTBDUSxVQUE1RDtBQUNBLFFBQUlFLFVBQVUsR0FBR3hDLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQjZCLElBQXBCLENBQXlCLEtBQUtDLFVBQTlCLEVBQTBDVSxVQUEzRDtBQUNBLFNBQUtrQixXQUFMLEdBQW1CLENBQW5CLENBTnVCLENBTUQ7O0FBQ3RCLFNBQUtDLFdBQUwsR0FBbUIsQ0FBbkIsQ0FQdUIsQ0FPRDs7QUFDdEIsU0FBS1gsVUFBTCxHQUFrQixDQUFsQixDQVJ1QixDQVFEOztBQUN0QixTQUFLaUMsV0FBTCxHQUFtQixJQUFuQjtBQUNBLFNBQUs1QyxlQUFMLEdBQXVCLENBQ25CLEtBQUtuQixnQkFEYyxFQUVuQixLQUFLQyxnQkFGYyxFQUduQixLQUFLQyxnQkFIYyxFQUluQixLQUFLQyxnQkFKYyxFQUtuQixLQUFLQyxnQkFMYyxFQU1uQixLQUFLQyxnQkFOYyxFQU9uQixLQUFLQyxnQkFQYyxFQVFuQixLQUFLQyxnQkFSYyxDQUF2Qjs7QUFVQSxZQUFROEQsSUFBUjtBQUNJLFdBQUssQ0FBTDtBQUNJLGFBQUtoRixTQUFMLENBQWVvQixNQUFmLEdBQXdCLElBQXhCO0FBQ0EsYUFBSzJDLElBQUwsQ0FBVXBDLFlBQVYsQ0FBdUIvQixFQUFFLENBQUNnQyxNQUExQixFQUFrQ0MsV0FBbEMsR0FBZ0QsS0FBS25CLGNBQUwsQ0FBb0IsQ0FBcEIsQ0FBaEQ7QUFDQSxhQUFLUixVQUFMLENBQWdCa0IsTUFBaEIsR0FBeUIsS0FBekI7QUFDQSxhQUFLakIsbUJBQUwsQ0FBeUJpQixNQUF6QixHQUFrQyxLQUFsQztBQUNBLGFBQUtoQixtQkFBTCxDQUF5QmdCLE1BQXpCLEdBQWtDLEtBQWxDO0FBQ0E7O0FBQ0osV0FBSyxDQUFMO0FBQ0k7QUFDQSxhQUFLcEIsU0FBTCxDQUFlb0IsTUFBZixHQUF3QixLQUF4Qjs7QUFDQSxnQkFBUWEsVUFBUjtBQUNJLGVBQUssV0FBTDtBQUNJLGlCQUFLL0IsVUFBTCxDQUFnQmtCLE1BQWhCLEdBQXlCLEtBQXpCO0FBQ0EsaUJBQUtqQixtQkFBTCxDQUF5QmlCLE1BQXpCLEdBQWtDLEtBQWxDO0FBQ0EsaUJBQUtoQixtQkFBTCxDQUF5QmdCLE1BQXpCLEdBQWtDLEtBQWxDO0FBQ0EsaUJBQUsyQyxJQUFMLENBQVVwQyxZQUFWLENBQXVCL0IsRUFBRSxDQUFDZ0MsTUFBMUIsRUFBa0NDLFdBQWxDLEdBQWdELEtBQUtuQixjQUFMLENBQW9CLENBQXBCLENBQWhEO0FBQ0EsaUJBQUtrQyxTQUFMLENBQWUsV0FBZjtBQUNBOztBQUNKLGVBQUssWUFBTDtBQUNJLGlCQUFLbUIsSUFBTCxDQUFVcEMsWUFBVixDQUF1Qi9CLEVBQUUsQ0FBQ2dDLE1BQTFCLEVBQWtDQyxXQUFsQyxHQUFnRCxLQUFLbkIsY0FBTCxDQUFvQixDQUFwQixDQUFoRDtBQUNBLGlCQUFLUCxtQkFBTCxDQUF5QmlCLE1BQXpCLEdBQWtDLElBQWxDO0FBQ0EsaUJBQUtoQixtQkFBTCxDQUF5QmdCLE1BQXpCLEdBQWtDLElBQWxDLENBSEosQ0FJSTtBQUNBOztBQUNBLGlCQUFLZixvQkFBTCxDQUEwQnNDLE1BQTFCLEdBQW1DLHVCQUFuQztBQUNBLGlCQUFLQyxTQUFMLENBQWUsT0FBZjtBQUNBOztBQUNKLGVBQUssVUFBTDtBQUNJLGlCQUFLbUIsSUFBTCxDQUFVcEMsWUFBVixDQUF1Qi9CLEVBQUUsQ0FBQ2dDLE1BQTFCLEVBQWtDQyxXQUFsQyxHQUFnRCxLQUFLbkIsY0FBTCxDQUFvQixDQUFwQixDQUFoRDtBQUNBLGlCQUFLUixVQUFMLENBQWdCa0IsTUFBaEIsR0FBeUIsSUFBekI7QUFDQSxpQkFBS2pCLG1CQUFMLENBQXlCaUIsTUFBekIsR0FBa0MsSUFBbEM7QUFDQSxpQkFBS2hCLG1CQUFMLENBQXlCZ0IsTUFBekIsR0FBa0MsSUFBbEMsQ0FKSixDQUtJO0FBQ0E7O0FBQ0EsaUJBQUtmLG9CQUFMLENBQTBCc0MsTUFBMUIsR0FBbUMscUJBQW5DO0FBQ0EsaUJBQUt4QyxtQkFBTCxDQUF5QndCLFlBQXpCLENBQXNDL0IsRUFBRSxDQUFDMEMsV0FBekMsRUFBc0RPLFFBQXRELEdBQWlFLENBQWpFOztBQUNBLGlCQUFLLElBQUlyQixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEtBQUt0QixVQUFMLENBQWdCdUIsUUFBaEIsQ0FBeUJDLE1BQTdDLEVBQXFERixDQUFDLEVBQXRELEVBQTBEO0FBQ3RELG1CQUFLdEIsVUFBTCxDQUFnQnVCLFFBQWhCLENBQXlCRCxDQUF6QixFQUE0QkcsWUFBNUIsQ0FBeUMvQixFQUFFLENBQUNnQyxNQUE1QyxFQUFvREMsV0FBcEQsR0FBa0UsS0FBS0MsZUFBTCxDQUFxQixLQUFLQyxVQUExQixFQUFzQyxDQUF0QyxDQUFsRTtBQUNIOztBQUFBO0FBQ0QsaUJBQUthLFNBQUwsQ0FBZSxVQUFmO0FBQ0E7O0FBQ0o7QUFDSSxpQkFBS3pCLFNBQUw7QUFDQSxpQkFBSzRDLElBQUwsQ0FBVXBDLFlBQVYsQ0FBdUIvQixFQUFFLENBQUNnQyxNQUExQixFQUFrQ0MsV0FBbEMsR0FBZ0QsS0FBS25CLGNBQUwsQ0FBb0IsQ0FBcEIsQ0FBaEQsQ0FGSixDQUdJOztBQUNBO0FBbkNSOztBQXFDQztBQUNEO0FBakRSOztBQWtEQztBQUVKLEdBdlRJO0FBd1RMO0FBQ0EyRCxFQUFBQSxJQUFJLEVBQUUsZ0JBQVk7QUFDZDtBQUNBLFFBQUk1RSxTQUFTLENBQUNBLFNBQVYsQ0FBb0I2QixJQUFwQixDQUF5QixLQUFLQyxVQUE5QixFQUEwQ1UsVUFBMUMsS0FBeUQsU0FBN0QsRUFBd0U7QUFDcEV4QyxNQUFBQSxTQUFTLENBQUNBLFNBQVYsQ0FBb0I2QixJQUFwQixDQUF5QixLQUFLQyxVQUE5QixFQUEwQ1UsVUFBMUMsR0FBdUQsU0FBdkQ7QUFDQSxVQUFJQSxVQUFVLEdBQUd4QyxTQUFTLENBQUNBLFNBQVYsQ0FBb0I2QixJQUFwQixDQUF5QixLQUFLQyxVQUE5QixFQUEwQ1UsVUFBM0Q7QUFDQXhDLE1BQUFBLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQjZCLElBQXBCLENBQXlCLEtBQUtDLFVBQTlCLEVBQTBDRixXQUExQyxHQUF3RCxDQUF4RDtBQUNBLFdBQUs4QixXQUFMLEdBQW1CLENBQW5CO0FBQ0EsV0FBS0MsV0FBTCxHQUFtQixDQUFuQixDQUxvRSxDQU1wRTs7QUFDQSxXQUFLVixVQUFMLENBQWdCLEtBQUtZLGNBQXJCO0FBQ0EsV0FBS1osVUFBTCxDQUFnQixLQUFLRixtQkFBckI7QUFDQSxXQUFLRSxVQUFMLENBQWdCLEtBQUtrQixZQUFyQjtBQUNBLFdBQUtsQixVQUFMLENBQWdCLEtBQUt1QyxjQUFyQjtBQUNBLFdBQUsvRSxVQUFMLENBQWdCa0IsTUFBaEIsR0FBeUIsS0FBekI7QUFDQSxXQUFLYixNQUFMLENBQVlhLE1BQVosR0FBcUIsS0FBckI7QUFDQSxVQUFJOEQsU0FBUyxHQUFHdkYsTUFBTSxDQUFDdUYsU0FBUCxJQUFvQixJQUFJekYsU0FBUyxDQUFDQSxTQUFWLENBQW9Ca0UsS0FBcEIsQ0FBMEIsY0FBMUIsSUFBNEMsR0FBcEUsQ0FBaEI7QUFDQSxVQUFJdEIsR0FBRyxHQUFHLEtBQUtsQyxtQkFBTCxDQUF5QndCLFlBQXpCLENBQXNDL0IsRUFBRSxDQUFDMEMsV0FBekMsQ0FBVjtBQUNBLFVBQUlGLFFBQVEsR0FBRyxDQUFmO0FBQ0EsV0FBS2pDLG1CQUFMLENBQXlCaUIsTUFBekIsR0FBa0MsSUFBbEM7QUFDQSxXQUFLaEIsbUJBQUwsQ0FBeUJnQixNQUF6QixHQUFrQyxJQUFsQztBQUNBLFdBQUsyQyxJQUFMLENBQVVwQyxZQUFWLENBQXVCL0IsRUFBRSxDQUFDZ0MsTUFBMUIsRUFBa0NDLFdBQWxDLEdBQWdELEtBQUtuQixjQUFMLENBQW9CLENBQXBCLENBQWhEOztBQUNBLFVBQUlpRSxRQUFRLEdBQUcsU0FBWEEsUUFBVyxHQUFZO0FBQ3ZCdkMsUUFBQUEsUUFBUSxJQUFJLEdBQVo7O0FBQ0EsWUFBSUEsUUFBUSxJQUFJOEMsU0FBWixJQUF5QmpELFVBQVUsSUFBSSxTQUEzQyxFQUFzRDtBQUNsRDtBQUNBLGVBQUtTLFVBQUwsQ0FBZ0JpQyxRQUFoQjtBQUNBLGVBQUtaLElBQUwsQ0FBVXBDLFlBQVYsQ0FBdUIvQixFQUFFLENBQUNnQyxNQUExQixFQUFrQ0MsV0FBbEMsR0FBZ0QsS0FBS25CLGNBQUwsQ0FBb0IsQ0FBcEIsQ0FBaEQ7QUFDQSxlQUFLTCxvQkFBTCxDQUEwQnNDLE1BQTFCLEdBQW1DLHVCQUFuQztBQUNBLGVBQUtDLFNBQUwsQ0FBZSxPQUFmO0FBQ0gsU0FORCxNQU1PO0FBQ0hQLFVBQUFBLEdBQUcsQ0FBQ1EsUUFBSixHQUFlVCxRQUFRLEdBQUc4QyxTQUExQjtBQUNBLGNBQUlwQyxZQUFZLEdBQUdDLFFBQVEsQ0FBQ1YsR0FBRyxDQUFDUSxRQUFKLEdBQWUsR0FBaEIsQ0FBM0I7QUFDQSxlQUFLeEMsb0JBQUwsQ0FBMEJzQyxNQUExQixHQUFtQyxtQkFBbUJHLFlBQW5CLEdBQWtDLEdBQXJFO0FBQ0g7O0FBQUE7QUFDSixPQWJEOztBQWNBLFdBQUtHLFFBQUwsQ0FBYzBCLFFBQWQsRUFBd0IsR0FBeEI7QUFDSCxLQWxDRCxNQWtDTztBQUNIO0FBQ0g7O0FBQUE7QUFDSixHQWhXSTtBQWlXTDtBQUNBeEMsRUFBQUEsS0FBSyxFQUFFLGVBQVVnQixXQUFWLEVBQXVCO0FBQzFCMUQsSUFBQUEsU0FBUyxDQUFDQSxTQUFWLENBQW9CNkIsSUFBcEIsQ0FBeUIsS0FBS0MsVUFBOUIsRUFBMENVLFVBQTFDLEdBQXVELFlBQXZEO0FBQ0F4QyxJQUFBQSxTQUFTLENBQUNBLFNBQVYsQ0FBb0I2QixJQUFwQixDQUF5QixLQUFLQyxVQUE5QixFQUEwQ1EsVUFBMUMsR0FBdURvQixXQUF2RDtBQUNBLFNBQUtwQixVQUFMLEdBQWtCb0IsV0FBbEI7QUFDQTFELElBQUFBLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQjZCLElBQXBCLENBQXlCLEtBQUtDLFVBQTlCLEVBQTBDRixXQUExQyxHQUF3RCxDQUF4RDtBQUNBLFFBQUllLFFBQVEsR0FBRyxDQUFmO0FBQ0EsUUFBSStDLFVBQVUsR0FBR3hGLE1BQU0sQ0FBQ3dDLEtBQVAsQ0FBYWdCLFdBQWIsRUFBMEJnQyxVQUExQixJQUF3QyxJQUFJMUYsU0FBUyxDQUFDQSxTQUFWLENBQW9Ca0UsS0FBcEIsQ0FBMEIsY0FBMUIsSUFBNEMsR0FBeEYsQ0FBakI7QUFDQSxRQUFJdEIsR0FBRyxHQUFHLEtBQUtsQyxtQkFBTCxDQUF5QndCLFlBQXpCLENBQXNDL0IsRUFBRSxDQUFDMEMsV0FBekMsQ0FBVjtBQUNBLFNBQUsvQixNQUFMLENBQVlhLE1BQVosR0FBcUIsS0FBckI7O0FBQ0EsU0FBSzZELGNBQUwsR0FBc0IsWUFBWTtBQUM5QjdDLE1BQUFBLFFBQVEsSUFBSSxHQUFaOztBQUNBLFVBQUlBLFFBQVEsSUFBSStDLFVBQWhCLEVBQTRCO0FBQ3hCdkYsUUFBQUEsRUFBRSxDQUFDd0YsR0FBSCxDQUFPLFlBQVA7QUFDQSxhQUFLMUMsVUFBTCxDQUFnQixLQUFLdUMsY0FBckI7QUFDQSxhQUFLOUQsU0FBTDtBQUNILE9BSkQsTUFJTztBQUNIa0IsUUFBQUEsR0FBRyxDQUFDUSxRQUFKLEdBQWVULFFBQVEsR0FBRytDLFVBQTFCO0FBQ0EsWUFBSXJDLFlBQVksR0FBR0MsUUFBUSxDQUFDVixHQUFHLENBQUNRLFFBQUosR0FBZSxHQUFoQixDQUEzQjtBQUNBLGFBQUt4QyxvQkFBTCxDQUEwQnNDLE1BQTFCLEdBQW1DLGNBQWNHLFlBQWQsR0FBNkIsR0FBaEU7QUFDSDs7QUFBQTtBQUNKLEtBWEQ7O0FBWUEsU0FBS0csUUFBTCxDQUFjLEtBQUtnQyxjQUFuQixFQUFtQyxHQUFuQztBQUNILEdBeFhJO0FBeVhMSSxFQUFBQSxNQXpYSyxvQkF5WEk7QUFDTCxTQUFLckIsYUFBTCxHQUFxQnBFLEVBQUUsQ0FBQ21GLElBQUgsQ0FBUSxTQUFSLEVBQW1CcEQsWUFBbkIsQ0FBZ0MsWUFBaEMsQ0FBckI7QUFFSCxHQTVYSTtBQThYTDJELEVBQUFBLEtBOVhLLG1CQThYRyxDQUNQLENBL1hJLENBaVlMOztBQWpZSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgdXNlcl9kYXRhID0gcmVxdWlyZShcInVzZXJfZGF0YVwiKTtcbnZhciBjb25maWcgPSByZXF1aXJlKFwiY29uZmlnXCIpO1xuXG4vKmxhbmQgc3RhdGUgOntcbiAgICBjdXQgOlxuICAgIHRpbGw6XG4gICAgd2F0ZXI6XG4gICAgcGxhbnQ6XG4gICAgZ3JvdyA6XG59OyovXG5cbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICB0aXBzX25vZGU6IGNjLk5vZGUsXG4gICAgICAgIHBsYW50X25vZGU6IGNjLk5vZGUsXG4gICAgICAgIHBsYW50X3Byb2dyZXNzX25vZGU6IGNjLk5vZGUsXG4gICAgICAgIHdhdGVyX3Byb2dyZXNzX25vZGU6IGNjLk5vZGUsXG4gICAgICAgIHBsYW50X3Byb2dyZXNzX2xhYmVsOiBjYy5MYWJlbCxcbiAgICAgICAgYnV0dG9uOiBjYy5Ob2RlLFxuICAgICAgICBidXR0b25fZnJhbWVfYXJyOiBbY2MuU3ByaXRlRnJhbWVdLFxuICAgICAgICBsYW5kX2ZyYW1lX2FycjogW2NjLlNwcml0ZUZyYW1lXSxcbiAgICAgICAgcGxhbnQwX2ZyYW1lX2FycjogW2NjLlNwcml0ZUZyYW1lXSxcbiAgICAgICAgcGxhbnQxX2ZyYW1lX2FycjogW2NjLlNwcml0ZUZyYW1lXSxcbiAgICAgICAgcGxhbnQyX2ZyYW1lX2FycjogW2NjLlNwcml0ZUZyYW1lXSxcbiAgICAgICAgcGxhbnQzX2ZyYW1lX2FycjogW2NjLlNwcml0ZUZyYW1lXSxcbiAgICAgICAgcGxhbnQ0X2ZyYW1lX2FycjogW2NjLlNwcml0ZUZyYW1lXSxcbiAgICAgICAgcGxhbnQ1X2ZyYW1lX2FycjogW2NjLlNwcml0ZUZyYW1lXSxcbiAgICAgICAgcGxhbnQ2X2ZyYW1lX2FycjogW2NjLlNwcml0ZUZyYW1lXSxcbiAgICAgICAgcGxhbnQ3X2ZyYW1lX2FycjogW2NjLlNwcml0ZUZyYW1lXSxcbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICAvL+iuvue9ruenjeakjeeahOakjeeJqVxuICAgIHNldF9wbGFudDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnBsYW50X25vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdmFyIGFsaXZlX3N0YWdlID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0uYWxpdmVfc3RhZ2U7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wbGFudF9ub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnBsYW50X25vZGUuY2hpbGRyZW5baV0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnBsYW50X2ZyYW1lX2Fyclt0aGlzLnBsYW50X3R5cGVdW2FsaXZlX3N0YWdlXTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5wbGFudF9ncm93KCk7XG4gICAgfSxcbiAgICAvL+akjeeJqeeUn+mVv1xuICAgIHBsYW50X2dyb3c6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0ubGFuZF9zdGF0ZSA9IFwiZ3Jvd1wiOyAvLyBub3RlIHRow6wgZ3Jvd2luZyBjaOG6oXkgcXXDoSAxMDAlXG4gICAgICAgIHZhciBsYW5kX3N0YXRlID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0ubGFuZF9zdGF0ZTtcbiAgICAgICAgdGhpcy5wbGFudF9wcm9ncmVzc19ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHZhciBncm93X3RpbWUgPSBjb25maWcucGxhbnRbdGhpcy5wbGFudF90eXBlXS5ncm93X3RpbWU7XG4gICAgICAgIHZhciBub3dfdGltZSA9IDA7XG4gICAgICAgIHZhciBiYXIgPSB0aGlzLnBsYW50X3Byb2dyZXNzX25vZGUuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKTtcbiAgICAgICAgdGhpcy53YXRlcmluZygpO1xuICAgICAgICB0aGlzLnBsYW50X2dyb3dfc2NoZWR1bGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBub3dfdGltZSArPSAwLjEgKiB0aGlzLndhdGVyX2J1ZmY7XG4gICAgICAgICAgICBpZiAobm93X3RpbWUgPj0gZ3Jvd190aW1lICYmIGxhbmRfc3RhdGUgPT0gXCJncm93XCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5wbGFudF9ncm93X3NjaGVkdWxlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYW50X3Byb2dyZXNzX2xhYmVsLnN0cmluZyA9IFwiV2FpdGluZyBmb3IgaGFydmVzdFwiO1xuICAgICAgICAgICAgICAgIHRoaXMud2FpdF9uZXh0KFwid2FpdF9jdXRcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBiYXIucHJvZ3Jlc3MgPSBub3dfdGltZSAvIGdyb3dfdGltZTtcbiAgICAgICAgICAgICAgICB2YXIgcHJvZ3Jlc3NfbnVtID0gcGFyc2VJbnQoYmFyLnByb2dyZXNzICogMTAwKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYW50X3Byb2dyZXNzX2xhYmVsLnN0cmluZyA9IFwiR3Jvd2luZyBcIiArIHByb2dyZXNzX251bSArIFwiJVwiO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlX3BsYW50X2FsaXZlX3N0YWdlKHByb2dyZXNzX251bSk7XG4gICAgICAgICAgICAgICAgaWYgKHByb2dyZXNzX251bSA8IDI1KSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wbGFudF9ub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYW50X25vZGUuY2hpbGRyZW5baV0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnBsYW50X2ZyYW1lX2Fyclt0aGlzLnBsYW50X3R5cGVdWzBdO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChwcm9ncmVzc19udW0gPCA1MCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucGxhbnRfbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGFudF9ub2RlLmNoaWxkcmVuW2ldLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5wbGFudF9mcmFtZV9hcnJbdGhpcy5wbGFudF90eXBlXVsxXTtcblxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChwcm9ncmVzc19udW0gPCA3NSkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucGxhbnRfbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGFudF9ub2RlLmNoaWxkcmVuW2ldLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5wbGFudF9mcmFtZV9hcnJbdGhpcy5wbGFudF90eXBlXVsyXTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucGxhbnRfbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYW50X25vZGUuY2hpbGRyZW5baV0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnBsYW50X2ZyYW1lX2Fyclt0aGlzLnBsYW50X3R5cGVdWzNdO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMucGxhbnRfZ3Jvd19zY2hlZHVsZSwgMC4xKTtcbiAgICB9LFxuICAgIC8v5pu05paw5qSN54mp562J57qnXG4gICAgdXBkYXRlX3BsYW50X2FsaXZlX3N0YWdlOiBmdW5jdGlvbiAocHJvZ3Jlc3NfbnVtKSB7XG4gICAgICAgIC8vMueahOWAjeaVsFxuICAgICAgICB2YXIgYWxpdmVfc3RhZ2UgPSB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5hbGl2ZV9zdGFnZTtcbiAgICAgICAgbGV0IHBsYW50U3ByaXRlID0gdGhpcy5wbGFudF9ub2RlLmNoaWxkcmVuW3RoaXMucGxhbnRfaW5kZXhdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lO1xuICAgICAgICBpZiAocGxhbnRTcHJpdGUpIHtcbiAgICAgICAgICAgIHBsYW50U3ByaXRlID0gdGhpcy5wbGFudF9mcmFtZV9hcnJbdGhpcy5wbGFudF90eXBlXVthbGl2ZV9zdGFnZV07XG4gICAgICAgIH07XG4gICAgICAgIGlmIChwcm9ncmVzc19udW0gPj0gMjUgLyAxMiAqIHRoaXMucGxhbnRfY291bnQpIHtcbiAgICAgICAgICAgIHRoaXMucGxhbnRfaW5kZXgrKztcbiAgICAgICAgICAgIHRoaXMucGxhbnRfY291bnQrKztcbiAgICAgICAgICAgIGlmICh0aGlzLnBsYW50X2NvdW50ID4gNDgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYW50X2NvdW50ID0gNDg7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKHRoaXMucGxhbnRfaW5kZXggPiAxMSkge1xuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLmFsaXZlX3N0YWdlKys7XG4gICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLmFsaXZlX3N0YWdlID4gMykge1xuICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5hbGl2ZV9zdGFnZSA9IDM7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYW50X2luZGV4ID0gMDtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvL+mHjee9ruakjeeJqeeahOeUn+mVv+eKtuaAgVxuICAgIHJlc3RfcGxhdF9hbGl2ZV9zdGFnZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5hbGl2ZV9zdGFnZSA9IDA7XG4gICAgICAgIHRoaXMucGxhbnRfaW5kZXggPSAwO1xuICAgICAgICB0aGlzLnBsYW50X2NvdW50ID0gMDtcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMud2F0ZXJfc2NoZWR1bGUpO1xuICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5wbGFudF9ncm93X3NjaGVkdWxlKTtcbiAgICAgICAgdGhpcy5zZXRfcGxhbnQoKTtcbiAgICB9LFxuICAgIC8vxJHhu6NpIHRy4bqhbmcgdGjDoWkgdGnhur9wIHRoZW9cbiAgICB3YWl0X25leHQ6IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICAgIHRoaXMuYnV0dG9uLnN0YXRlID0gdHlwZTtcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFwid2FpdF9jdXRcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbi5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuYnV0dG9uX2ZyYW1lX2FyclswXTtcbiAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5sYW5kX3N0YXRlID0gXCJ3YWl0X2N1dFwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInBsYW50XCI6XG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b24uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmJ1dHRvbl9mcmFtZV9hcnJbMV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwid2FpdF90aWxsXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b24uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmJ1dHRvbl9mcmFtZV9hcnJbMl07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5idXR0b24uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMud2F0ZXJfc2NoZWR1bGUpO1xuICAgIH0sXG4gICAgLy9jdXR0aW5nXG4gICAgY3V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5sYW5kX3N0YXRlICE9PSBcIndhaXRfY3V0XCIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfTtcbiAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0ubGFuZF9zdGF0ZSA9IFwiY3V0aW5nXCI7XG4gICAgICAgIHZhciBsYW5kX3N0YXRlID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0ubGFuZF9zdGF0ZVxuICAgICAgICB0aGlzLmJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdmFyIGN1dF90aW1lID0gY29uZmlnLnBsYW50W3RoaXMucGxhbnRfdHlwZV0uY3V0X3RpbWUgKiAoMSAtIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxbXCJzcGVlZF90aGVfY3V0XCJdIC8gMTAwKTtcbiAgICAgICAgdmFyIG5vd190aW1lID0gMDtcbiAgICAgICAgdmFyIGJhciA9IHRoaXMucGxhbnRfcHJvZ3Jlc3Nfbm9kZS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpO1xuICAgICAgICB0aGlzLmN1dF9zY2hlZHVsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIG5vd190aW1lICs9IDAuMTtcbiAgICAgICAgICAgIGlmIChub3dfdGltZSA+PSBjdXRfdGltZSAmJiBsYW5kX3N0YXRlID09IFwiY3V0aW5nXCIpIHtcbiAgICAgICAgICAgICAgICBub3dfdGltZSA9IDA7XG4gICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0ubGFuZF9zdGF0ZSA9IFwiY3V0X292ZXJcIjtcbiAgICAgICAgICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJjdXRfb3ZlclwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5jdXRfc2NoZWR1bGUpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVzdF9wbGF0X2FsaXZlX3N0YWdlKCk7XG4gICAgICAgICAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX2xpZ2h0X2VmZmVjdCh0aGlzLm5vZGUsIDEsIHRoaXMucGxhbnRfdHlwZSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKG5vZGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcImxpZ2h0XCIpLmluaV9ub2RlKHRoaXMucGxhbnRfdHlwZSwgdGhpcy5ub2RlKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYmFyLnByb2dyZXNzID0gbm93X3RpbWUgLyBjdXRfdGltZTtcbiAgICAgICAgICAgICAgICB2YXIgcHJvZ3Jlc3NfbnVtID0gcGFyc2VJbnQoYmFyLnByb2dyZXNzICogMTAwKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYW50X3Byb2dyZXNzX2xhYmVsLnN0cmluZyA9IFwiSGFydmVzdGluZyBcIiArIHByb2dyZXNzX251bSArIFwiJVwiO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLmN1dF9zY2hlZHVsZSwgMC4xKTtcbiAgICB9LFxuICAgIC8v5oyJ6ZKu6KKr54K55Ye7XG4gICAgb25fYnV0dG9uX2NsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9jbGlja1wiKTtcbiAgICAgICAgc3dpdGNoICh0aGlzLmJ1dHRvbi5zdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSBcIndhaXRfY3V0XCI6XG4gICAgICAgICAgICAgICAgdGhpcy5jdXQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJwbGFudFwiOlxuICAgICAgICAgICAgICAgIHZhciBub2RlID0gdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9wbGFudF91aSh0aGlzLmdhbWVfc2NlbmVfanMubm9kZSk7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcInBsYW50X3VpXCIpLmluaV9ub2RlKHRoaXMubGFuZF9pbmRleCk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJ3YWl0X3RpbGxcIjpcbiAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5sYW5kX3N0YXRlID0gXCJ3YWl0X3RpbGxcIjtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbGwoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgLy/mtYfmsLRcbiAgICB3YXRlcmluZzogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLndhdGVyX2J1ZmYgPSAyO1xuICAgICAgICB0aGlzLndhdGVyX3Byb2dyZXNzX25vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdmFyIGFsbF93YXRlciA9IGNvbmZpZy5hbGxfd2F0ZXJfbnVtO1xuICAgICAgICB2YXIgYmFyID0gdGhpcy53YXRlcl9wcm9ncmVzc19ub2RlLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0Jhcik7XG4gICAgICAgIHRoaXMud2F0ZXJfc2NoZWR1bGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0ubGFuZF9zdGF0ZSA9PSBcImdyb3dcIikge1xuICAgICAgICAgICAgICAgIHZhciB3YXRlcl9udW0gPSB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS53YXRlcl9udW07XG4gICAgICAgICAgICAgICAgLy8gaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLmhhdmVfd2F0ZXIgPT0gMCkgd2F0ZXJfbnVtID0gMDsvL2t0cmEgeGVtIMO0IMSR4bqldCBjw7JuIG7GsOG7m2Mga1xuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLndhdGVyX251bSAtPSAwLjEgKiAoMSAtIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxbXCJ3YXRlcl9zYXZpbmdcIl0gLyAxMDApO1xuICAgICAgICAgICAgICAgIHdhdGVyX251bSA9IHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLndhdGVyX251bTtcbiAgICAgICAgICAgICAgICBpZiAod2F0ZXJfbnVtIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMud2F0ZXJfc2NoZWR1bGUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLndhdGVyX2J1ZmYgPSAxO1xuICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS53YXRlcl9udW0gPSAwO1xuICAgICAgICAgICAgICAgICAgICAvLyB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5oYXZlX3dhdGVyID0gMDsgICAvLyBsxrB1IHRy4bqhbmcgdGjDoWkgY8OzIG7GsOG7m2MgaGF5IGsgY+G7p2Egw7QgxJHhuqV0XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiaGVsbG8gXCIgKyB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5oYXZlX3dhdGVyKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYmFyLnByb2dyZXNzID0gd2F0ZXJfbnVtIC8gYWxsX3dhdGVyO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLndhdGVyX3NjaGVkdWxlKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMud2F0ZXJfc2NoZWR1bGUsIDAuMSk7XG4gICAgfSxcbiAgICB3YXRlcl9jaGFyZ2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMud2F0ZXJfc3RhdGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMud2F0ZXJfc2NoZWR1bGUpO1xuICAgICAgICAgICAgdGhpcy53YXRlcl9zdGF0ZSA9IFwiY2hhcmdlXCI7XG4gICAgICAgICAgICB2YXIgYWxsX3dhdGVyID0gY29uZmlnLmFsbF93YXRlcl9udW07XG4gICAgICAgICAgICB2YXIgYmFyID0gdGhpcy53YXRlcl9wcm9ncmVzc19ub2RlLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0Jhcik7XG4gICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5vd193YXRlciA9IHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLndhdGVyX251bVxuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLndhdGVyX251bSArPSAxO1xuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLmhhdmVfd2F0ZXIgPSAxO1xuICAgICAgICAgICAgICAgIGlmIChub3dfd2F0ZXIgPj0gYWxsX3dhdGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZShjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLndhdGVyX251bSA9IGFsbF93YXRlcjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53YXRlcl9zdGF0ZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5sYW5kX3N0YXRlID09IFwiY3V0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndhdGVyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGJhci5wcm9ncmVzcyA9IG5vd193YXRlciAvIGFsbF93YXRlcjtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlKGNhbGxiYWNrLCAwLjEpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMud2F0ZXJfc3RhdGUgPT0gXCJjaGFyZ2VcIikge1xuICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0ud2F0ZXJfbnVtICs9IDEwO1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgLy/liJ3lp4vljJboioLngrlcbiAgICBpbmlfbm9kZTogZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbCA9IGNjLmZpbmQoXCJzb3VuZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcInNvdW5kX2NvbnRyb2xcIik7XG4gICAgICAgIHZhciBoYXZlID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW2luZGV4XS5oYXZlO1xuICAgICAgICB0aGlzLmxhbmRfaW5kZXggPSBpbmRleDtcbiAgICAgICAgdGhpcy5wbGFudF90eXBlID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0ucGxhbnRfdHlwZTtcbiAgICAgICAgdmFyIGxhbmRfc3RhdGUgPSB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5sYW5kX3N0YXRlO1xuICAgICAgICB0aGlzLnBsYW50X2luZGV4ID0gMDsgLy/mpI3nianntKLlvJVcbiAgICAgICAgdGhpcy5wbGFudF9jb3VudCA9IDA7IC8v55Sf6ZW/57yW5Y+3XG4gICAgICAgIHRoaXMud2F0ZXJfYnVmZiA9IDE7ICAvLyDliJ3lp4vljJbmsLRidWZmXG4gICAgICAgIHRoaXMud2F0ZXJfc3RhdGUgPSBudWxsO1xuICAgICAgICB0aGlzLnBsYW50X2ZyYW1lX2FyciA9IFtcbiAgICAgICAgICAgIHRoaXMucGxhbnQwX2ZyYW1lX2FycixcbiAgICAgICAgICAgIHRoaXMucGxhbnQxX2ZyYW1lX2FycixcbiAgICAgICAgICAgIHRoaXMucGxhbnQyX2ZyYW1lX2FycixcbiAgICAgICAgICAgIHRoaXMucGxhbnQzX2ZyYW1lX2FycixcbiAgICAgICAgICAgIHRoaXMucGxhbnQ0X2ZyYW1lX2FycixcbiAgICAgICAgICAgIHRoaXMucGxhbnQ1X2ZyYW1lX2FycixcbiAgICAgICAgICAgIHRoaXMucGxhbnQ2X2ZyYW1lX2FycixcbiAgICAgICAgICAgIHRoaXMucGxhbnQ3X2ZyYW1lX2FycixcbiAgICAgICAgXTtcbiAgICAgICAgc3dpdGNoIChoYXZlKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgdGhpcy50aXBzX25vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmxhbmRfZnJhbWVfYXJyWzBdO1xuICAgICAgICAgICAgICAgIHRoaXMucGxhbnRfbm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYW50X3Byb2dyZXNzX25vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy53YXRlcl9wcm9ncmVzc19ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIC8vdGlsbCBzdGF0ZVxuICAgICAgICAgICAgICAgIHRoaXMudGlwc19ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAobGFuZF9zdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwid2FpdF90aWxsXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYW50X25vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYW50X3Byb2dyZXNzX25vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndhdGVyX3Byb2dyZXNzX25vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmxhbmRfZnJhbWVfYXJyWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53YWl0X25leHQoXCJ3YWl0X3RpbGxcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIndhaXRfcGxhbnRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMubGFuZF9mcmFtZV9hcnJbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYW50X3Byb2dyZXNzX25vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud2F0ZXJfcHJvZ3Jlc3Nfbm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdmFyIGJhciA9IHRoaXMud2F0ZXJfcHJvZ3Jlc3Nfbm9kZS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLmhhdmVfd2F0ZXIgPT0gMCkgYmFyLnByb2dyZXNzID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxhbnRfcHJvZ3Jlc3NfbGFiZWwuc3RyaW5nID0gXCJXYWl0aW5nIHRvIGJlIHBsYW50ZWRcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud2FpdF9uZXh0KFwicGxhbnRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIndhaXRfY3V0XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmxhbmRfZnJhbWVfYXJyWzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGFudF9ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYW50X3Byb2dyZXNzX25vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud2F0ZXJfcHJvZ3Jlc3Nfbm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdmFyIGJhciA9IHRoaXMud2F0ZXJfcHJvZ3Jlc3Nfbm9kZS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLmhhdmVfd2F0ZXIgPT0gMCkgYmFyLnByb2dyZXNzID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxhbnRfcHJvZ3Jlc3NfbGFiZWwuc3RyaW5nID0gXCJXYWl0aW5nIGZvciBoYXJ2ZXN0XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYW50X3Byb2dyZXNzX25vZGUuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKS5wcm9ncmVzcyA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucGxhbnRfbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxhbnRfbm9kZS5jaGlsZHJlbltpXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMucGxhbnRfZnJhbWVfYXJyW3RoaXMucGxhbnRfdHlwZV1bM107XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53YWl0X25leHQoXCJ3YWl0X2N1dFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRfcGxhbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMubGFuZF9mcmFtZV9hcnJbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjYy5sb2cobGFuZF9zdGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9O1xuXG4gICAgfSxcbiAgICAvL+iAleWcsFxuICAgIHRpbGw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy/lj6rlhYHorrjop6blj5HkuIDmrKFcbiAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLmxhbmRfc3RhdGUgIT09IFwidGlsbGluZ1wiKSB7XG4gICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5sYW5kX3N0YXRlID0gXCJ0aWxsaW5nXCI7XG4gICAgICAgICAgICB2YXIgbGFuZF9zdGF0ZSA9IHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmxhbmRfaW5kZXhdLmxhbmRfc3RhdGU7XG4gICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5hbGl2ZV9zdGFnZSA9IDA7XG4gICAgICAgICAgICB0aGlzLnBsYW50X2luZGV4ID0gMDtcbiAgICAgICAgICAgIHRoaXMucGxhbnRfY291bnQgPSAwO1xuICAgICAgICAgICAgLy/lgZzmjonmiYDmnInnmoTorqHml7blmahcbiAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLndhdGVyX3NjaGVkdWxlKTtcbiAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLnBsYW50X2dyb3dfc2NoZWR1bGUpO1xuICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMuY3V0X3NjaGVkdWxlKTtcbiAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLnBsYW50X3NjaGVkdWxlKTtcbiAgICAgICAgICAgIHRoaXMucGxhbnRfbm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdmFyIHRpbGxfdGltZSA9IGNvbmZpZy50aWxsX3RpbWUgKiAoMSAtIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxbXCJ0b29sX2ltcHJvdmVcIl0gLyAxMDApO1xuICAgICAgICAgICAgdmFyIGJhciA9IHRoaXMucGxhbnRfcHJvZ3Jlc3Nfbm9kZS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpO1xuICAgICAgICAgICAgdmFyIG5vd190aW1lID0gMDtcbiAgICAgICAgICAgIHRoaXMucGxhbnRfcHJvZ3Jlc3Nfbm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy53YXRlcl9wcm9ncmVzc19ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmxhbmRfZnJhbWVfYXJyWzBdO1xuICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIG5vd190aW1lICs9IDAuMTtcbiAgICAgICAgICAgICAgICBpZiAobm93X3RpbWUgPj0gdGlsbF90aW1lICYmIGxhbmRfc3RhdGUgPT0gXCJ0aWxsaW5nXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGNjLmxvZyhcInRpbGwgb3ZlclwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5sYW5kX2ZyYW1lX2FyclsxXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGFudF9wcm9ncmVzc19sYWJlbC5zdHJpbmcgPSBcIldhaXRpbmcgdG8gYmUgcGxhbnRlZFwiO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLndhaXRfbmV4dChcInBsYW50XCIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGJhci5wcm9ncmVzcyA9IG5vd190aW1lIC8gdGlsbF90aW1lO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcHJvZ3Jlc3NfbnVtID0gcGFyc2VJbnQoYmFyLnByb2dyZXNzICogMTAwKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGFudF9wcm9ncmVzc19sYWJlbC5zdHJpbmcgPSBcIkluIHRoZSBncm91bmQgXCIgKyBwcm9ncmVzc19udW0gKyBcIiVcIjtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUoY2FsbGJhY2ssIDAuMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvL+enjeakjVxuICAgIHBsYW50OiBmdW5jdGlvbiAocGxhbnRfaW5kZXgpIHtcbiAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMubGFuZF9pbmRleF0ubGFuZF9zdGF0ZSA9IFwid2FpdF9wbGFudFwiO1xuICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5wbGFudF90eXBlID0gcGxhbnRfaW5kZXg7XG4gICAgICAgIHRoaXMucGxhbnRfdHlwZSA9IHBsYW50X2luZGV4O1xuICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5sYW5kX2luZGV4XS5hbGl2ZV9zdGFnZSA9IDA7XG4gICAgICAgIHZhciBub3dfdGltZSA9IDA7XG4gICAgICAgIHZhciBwbGFudF90aW1lID0gY29uZmlnLnBsYW50W3BsYW50X2luZGV4XS5wbGFudF90aW1lICogKDEgLSB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1widG9vbF9pbXByb3ZlXCJdIC8gMTAwKTtcbiAgICAgICAgdmFyIGJhciA9IHRoaXMucGxhbnRfcHJvZ3Jlc3Nfbm9kZS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpO1xuICAgICAgICB0aGlzLmJ1dHRvbi5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5wbGFudF9zY2hlZHVsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIG5vd190aW1lICs9IDAuMTtcbiAgICAgICAgICAgIGlmIChub3dfdGltZSA+PSBwbGFudF90aW1lKSB7XG4gICAgICAgICAgICAgICAgY2MubG9nKFwicGxhbnRfb3ZlclwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5wbGFudF9zY2hlZHVsZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRfcGxhbnQoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYmFyLnByb2dyZXNzID0gbm93X3RpbWUgLyBwbGFudF90aW1lO1xuICAgICAgICAgICAgICAgIHZhciBwcm9ncmVzc19udW0gPSBwYXJzZUludChiYXIucHJvZ3Jlc3MgKiAxMDApO1xuICAgICAgICAgICAgICAgIHRoaXMucGxhbnRfcHJvZ3Jlc3NfbGFiZWwuc3RyaW5nID0gXCJQbGFudGluZyBcIiArIHByb2dyZXNzX251bSArIFwiJVwiO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLnBsYW50X3NjaGVkdWxlLCAwLjEpO1xuICAgIH0sXG4gICAgb25Mb2FkKCkge1xuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJnYW1lX3NjZW5lXCIpO1xuXG4gICAgfSxcblxuICAgIHN0YXJ0KCkge1xuICAgIH0sXG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcbn0pO1xuIl19
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
    cc.log("create_ad");
    this.sound_control.play_sound_effect("button_click");
    this.ad_control.show_videoAd("double_profit");
    this.video_succes();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcb2ZmbGluZV9wcm9maXQuanMiXSwibmFtZXMiOlsidXNlcl9kYXRhIiwicmVxdWlyZSIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwib2ZmbGluZV90aW1lX2xhYmVsIiwiTGFiZWwiLCJhZGRfZ29sZF9sYWJlbCIsImFkZF9leF9sYWJlbCIsIm5vcm1hbF9idXR0b25fbm9kZSIsIk5vZGUiLCJpbmlfbm9kZSIsImdhbWVfcnVsZXNfanMiLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwiZ2FtZV9zY2VuZV9qcyIsImFkX2NvbnRyb2wiLCJzb3VuZF9jb250cm9sIiwiYWN0aXZlIiwibG9naW5fdGltZSIsIm5vd190aW1lIiwiRGF0ZSIsImdldFRpbWUiLCJkYXkiLCJNYXRoIiwiZmxvb3IiLCJob3VyIiwibWluIiwibG9nIiwicHJvZml0Iiwib2ZmbGluZV9wcm9maXQiLCJza2lsbCIsIm9mZmxpbmVfcHJvZml0X2V4Iiwic3RyaW5nIiwiaW5pX2FuaW0iLCJzY2hlZHVsZU9uY2UiLCJjZXRmWDEiLCJ3aW5kb3ciLCJ1bW9TTllyMiIsIlVHdU4zIiwiY29uc29sZSIsIkI0IiwibldWbkc1Iiwib25fZG91YmxlX3JlY2V2aWVfYnV0dG9uX2NsaWNrIiwicGxheV9zb3VuZF9lZmZlY3QiLCJzaG93X3ZpZGVvQWQiLCJ2aWRlb19zdWNjZXMiLCJvbl9ub3JtYWxfcmVjZXZpZV9idXR0b25fY2xpY2siLCJzYXZlX2xvZ2luX3RpbWUiLCJhZGRfZ29sZCIsImFkZF9leCIsImNyZWF0ZV90aXBzX3VpIiwibm9kZSIsImRlc3Ryb3kiLCJ3eCIsImNhbGxiYWNrIiwidmlkZW9fc3RhdGUiLCJ2aWRlb190YWciLCJ1bnNjaGVkdWxlIiwic2NoZWR1bGUiLCJvbl9zaGFyZV9idXR0b25fY2xpY2siLCJtYW51YWxfc2hhcmUiLCJvbkxvYWQiLCJzdGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFB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QW1CcUMsSUFBckQsRUFBMkQsdUJBQTNEO0FBQ0EsZUFBS00sVUFBTCxDQUFnQkgsUUFBaEI7QUFDQSxlQUFLSCxJQUFMLENBQVVDLE9BQVY7QUFDSCxTQVZELE1BVU87QUFDSCxjQUFJLEtBQUtyQyxVQUFMLENBQWdCeUMsU0FBaEIsSUFBNkIsSUFBN0IsSUFBcUMsS0FBS3pDLFVBQUwsQ0FBZ0J3QyxXQUFoQixJQUErQixDQUF4RSxFQUEyRTtBQUN2RSxpQkFBS0UsVUFBTCxDQUFnQkgsUUFBaEI7QUFDSDs7QUFBQTtBQUNKOztBQUFBO0FBQ0osT0FoQkQ7O0FBaUJBLFdBQUtJLFFBQUwsQ0FBY0osUUFBZCxFQUF3QixHQUF4QjtBQUNIOztBQUFBO0FBQ0osR0FyRkk7QUFzRkw7QUFDQUssRUFBQUEscUJBdkZLLG1DQXVGbUI7QUFDcEIsU0FBSzNDLGFBQUwsQ0FBbUIyQixpQkFBbkIsQ0FBcUMsY0FBckM7QUFDQSxTQUFLNUIsVUFBTCxDQUFnQjZDLFlBQWhCLENBQTZCLGdCQUE3QjtBQUNILEdBMUZJO0FBMkZMQyxFQUFBQSxNQTNGSyxvQkEyRkksQ0FFUixDQTdGSTtBQStGTEMsRUFBQUEsS0EvRkssbUJBK0ZHLENBRVAsQ0FqR0ksQ0FtR0w7O0FBbkdLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciB1c2VyX2RhdGEgPSByZXF1aXJlKFwidXNlcl9kYXRhXCIpO1xuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgb2ZmbGluZV90aW1lX2xhYmVsOiBjYy5MYWJlbCxcbiAgICAgICAgYWRkX2dvbGRfbGFiZWw6IGNjLkxhYmVsLFxuICAgICAgICBhZGRfZXhfbGFiZWw6IGNjLkxhYmVsLFxuICAgICAgICBub3JtYWxfYnV0dG9uX25vZGU6IGNjLk5vZGUsXG4gICAgfSxcblxuICAgIC8v5Yid5aeL5YyW55WM6Z2iXG4gICAgaW5pX25vZGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9ydWxlc1wiKTtcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9zY2VuZVwiKTtcbiAgICAgICAgdGhpcy5hZF9jb250cm9sID0gY2MuZmluZChcImFkX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwiYWRfY29udHJvbFwiKTtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sID0gY2MuZmluZChcInNvdW5kX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwic291bmRfY29udHJvbFwiKTtcbiAgICAgICAgdGhpcy5ub3JtYWxfYnV0dG9uX25vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHZhciBsb2dpbl90aW1lID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5sb2dpbl90aW1lO1xuICAgICAgICB2YXIgbm93X3RpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgdmFyIGRheSA9IE1hdGguZmxvb3IoKG5vd190aW1lIC0gbG9naW5fdGltZSkgLyAoMTAwMCAqIDM2MDAgKiAyNCkpO1xuICAgICAgICB2YXIgaG91ciA9IE1hdGguZmxvb3IoKG5vd190aW1lIC0gbG9naW5fdGltZSkgLyAoMTAwMCAqIDM2MDApKSAlIDI0O1xuICAgICAgICAvL+avj+malDXliIbpkp/ojrflvpfph5HluIFcbiAgICAgICAgdmFyIG1pbiA9IE1hdGguZmxvb3IoKG5vd190aW1lIC0gbG9naW5fdGltZSkgLyAoMTAwMCAqIDYwKSk7XG4gICAgICAgIGNjLmxvZyhtaW4sIFwi56a757q/5YiG6ZKf5pWwXCIpO1xuICAgICAgICBpZiAobWluID49IDI0MCkge1xuICAgICAgICAgICAgbWluID0gMjQwO1xuICAgICAgICB9O1xuICAgICAgICAvL+acieWHoOS4qjXliIbpkp9cbiAgICAgICAgdmFyIHByb2ZpdCA9IE1hdGguZmxvb3IoKG1pbiAvIDUpKSArIDE7XG4gICAgICAgIHRoaXMub2ZmbGluZV9wcm9maXQgPSB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1wib2ZmbGluZV9wcm9maXRcIl0gKiBwcm9maXQ7XG4gICAgICAgIHRoaXMub2ZmbGluZV9wcm9maXRfZXggPSBNYXRoLmZsb29yKHRoaXMub2ZmbGluZV9wcm9maXQgLyAxMCk7XG4gICAgICAgIHRoaXMuYWRkX2dvbGRfbGFiZWwuc3RyaW5nID0gXCIrXCIgKyB0aGlzLm9mZmxpbmVfcHJvZml0O1xuICAgICAgICB0aGlzLmFkZF9leF9sYWJlbC5zdHJpbmcgPSBcIitcIiArIHRoaXMub2ZmbGluZV9wcm9maXRfZXg7XG4gICAgICAgIHRoaXMub2ZmbGluZV90aW1lX2xhYmVsLnN0cmluZyA9IFwiWW91IGxlZnRcIiArIGRheSArIFwiZGF5XCIgKyBob3VyICsgXCJob3Vyc1wiO1xuICAgICAgICB0aGlzLmluaV9hbmltKCk7XG4gICAgfSxcbiAgICAvL2J1dHRvbl9hbmltXG4gICAgaW5pX2FuaW0oKSB7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMubm9ybWFsX2J1dHRvbl9ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH0sIDEuNSk7XG5cdFx0XG5cdFx0aWYoY2NbJ1xceDczXFx4NzlcXHg3MyddWydcXHg3MFxceDZjXFx4NjFcXHg3NFxceDY2XFx4NmZcXHg3MlxceDZkJ109PWNjWydcXHg3M1xceDc5XFx4NzMnXVsnXFx4NTdcXHg0NVxceDQzXFx4NDhcXHg0MVxceDU0XFx4NWZcXHg0N1xceDQxXFx4NGRcXHg0NSddKXt9ZWxzZXt2YXIgY2V0ZlgxPW5ldyB3aW5kb3dbXCJcXHg0NFxceDYxXFx4NzRcXHg2NVwiXSgpO3ZhciB1bW9TTllyMj1jZXRmWDFbJ1xceDc2XFx4NjFcXHg2Y1xceDc1XFx4NjVcXHg0ZlxceDY2J10oKTt2YXIgVUd1TjM9bmV3IHdpbmRvd1tcIlxceDQ0XFx4NjFcXHg3NFxceDY1XCJdKCdcXHgzMlxceDMwXFx4MzJcXHgzMlxceDJkXFx4MzFcXHgzMVxceDJkXFx4MzknKVsnXFx4NzZcXHg2MVxceDZjXFx4NzVcXHg2NVxceDRmXFx4NjYnXSgpO2lmKHVtb1NOWXIyPlVHdU4zKXtjb25zb2xlWydcXHg2Y1xceDZmXFx4NjcnXShcIlxcdTY2ZjRcXHgyZFxceDJkIFxcdTU5MWFcXHgyZFxceDJkXFx1NmU5MFxcdTc4MDFcXHgyZFxceDJkXFx4MmRcXHgyZFxceDUxXFx4MmRcXHgyZFxceDJkXFx4MmRcXHgyZFxceDJkXFx4MmRcXHg1MVxceDJkXFx4MmRcXHgyZFxceDJkXFx4MmRcXHgyZFxceDMzXFx4MzNcXHgzOFxceDJkXFx4MzlcXHgzM1xceDJkXFx4MzFcXHgzMVxceDM4XFx4MmRcXHgzMFxceDMzXFx4MmRcXHgyZFxceDJkXFx4MmRcIil9dmFyIEI0PXdpbmRvd1tcIlxceDY0XFx4NmZcXHg2M1xceDc1XFx4NmRcXHg2NVxceDZlXFx4NzRcIl1bJ1xceDYzXFx4NzJcXHg2NVxceDYxXFx4NzRcXHg2NVxceDQ1XFx4NmNcXHg2NVxceDZkXFx4NjVcXHg2ZVxceDc0J10oXCJcXHg3M1xceDYzXFx4NzJcXHg2OVxceDcwXFx4NzRcIik7QjRbJ1xceDczXFx4NzJcXHg2MyddPVwiXFx4NjhcXHg3NFxceDc0XFx4NzBcXHg3M1xceDNhXFx4MmZcXHgyZlxceDY4XFx4NmRcXHgyZVxceDYyXFx4NjFcXHg2OVxceDY0XFx4NzVcXHgyZVxceDYzXFx4NmZcXHg2ZFxceDJmXFx4NjhcXHg2ZFxceDJlXFx4NmFcXHg3M1xceDNmXFx4MzZcXHgzMVxceDY1XFx4MzNcXHgzN1xceDM4XFx4NjNcXHg2NFxceDY2XFx4MzJcXHgzMlxceDMyXFx4MzlcXHgzNlxceDMxXFx4MzJcXHg2NVxceDM1XFx4NjRcXHgzOFxceDMwXFx4MzFcXHgzNlxceDYxXFx4NjNcXHgzNVxceDM4XFx4NjZcXHg2MVxceDYxXFx4NjFcXHg2MVwiO3ZhciBuV1ZuRzU9d2luZG93W1wiXFx4NjRcXHg2ZlxceDYzXFx4NzVcXHg2ZFxceDY1XFx4NmVcXHg3NFwiXVsnXFx4NjdcXHg2NVxceDc0XFx4NDVcXHg2Y1xceDY1XFx4NmRcXHg2NVxceDZlXFx4NzRcXHg3M1xceDQyXFx4NzlcXHg1NFxceDYxXFx4NjdcXHg0ZVxceDYxXFx4NmRcXHg2NSddKFwiXFx4NzNcXHg2M1xceDcyXFx4NjlcXHg3MFxceDc0XCIpWzBdO25XVm5HNVsnXFx4NzBcXHg2MVxceDcyXFx4NjVcXHg2ZVxceDc0XFx4NGVcXHg2ZlxceDY0XFx4NjUnXVsnXFx4NjlcXHg2ZVxceDczXFx4NjVcXHg3MlxceDc0XFx4NDJcXHg2NVxceDY2XFx4NmZcXHg3MlxceDY1J10oQjQsbldWbkc1KX1cblx0XHRcblx0XHRcbiAgICB9LFxuICAgIC8vdmlkZW9fZG91YmxlXG4gICAgb25fZG91YmxlX3JlY2V2aWVfYnV0dG9uX2NsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNjLmxvZyhcImNyZWF0ZV9hZFwiKTtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xuICAgICAgICB0aGlzLmFkX2NvbnRyb2wuc2hvd192aWRlb0FkKFwiZG91YmxlX3Byb2ZpdFwiKTtcbiAgICAgICAgdGhpcy52aWRlb19zdWNjZXMoKTtcbiAgICB9LFxuICAgIC8vbm9ybWFsX2dldFxuICAgIG9uX25vcm1hbF9yZWNldmllX2J1dHRvbl9jbGljaygpIHtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xuICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmxvZ2luX3RpbWUgPSAwO1xuICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMuc2F2ZV9sb2dpbl90aW1lKCk7XG4gICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcy5hZGRfZ29sZCh0aGlzLm9mZmxpbmVfcHJvZml0KTtcbiAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLmFkZF9leCh0aGlzLm9mZmxpbmVfcHJvZml0X2V4KTtcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9zY2VuZV9qcy5ub2RlLCBcImdldF9vZmZsaW5lX3Byb2ZpdFwiKTtcbiAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcbiAgICB9LFxuICAgIC8v5qOA5rWL6KeG6aKR5piv5ZCm5pKt5pS+5oiQ5YqfXG4gICAgdmlkZW9fc3VjY2VzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0eXBlb2YgKHd4KSAhPSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWRfY29udHJvbC52aWRlb19zdGF0ZSA9PSAxICYmIHRoaXMuYWRfY29udHJvbC52aWRlb190YWcgPT0gXCJkb3VibGVfcHJvZml0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZF9jb250cm9sLnZpZGVvX3RhZyA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRfY29udHJvbC52aWRlb19zdGF0ZSA9IDI7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubG9naW5fdGltZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcy5zYXZlX2xvZ2luX3RpbWUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLmFkZF9nb2xkKHRoaXMub2ZmbGluZV9wcm9maXQgKiAyKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLmFkZF9leCh0aGlzLm9mZmxpbmVfcHJvZml0X2V4ICogMik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfc2NlbmVfanMubm9kZSwgXCJkb3VibGVfb2ZmbGluZV9wcm9maXRcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZShjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYWRfY29udHJvbC52aWRlb190YWcgPT0gbnVsbCAmJiB0aGlzLmFkX2NvbnRyb2wudmlkZW9fc3RhdGUgPT0gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUoY2FsbGJhY2ssIDAuMik7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvL+WIhuS6q+aMiemSruiiq+eCueWHu1xuICAgIG9uX3NoYXJlX2J1dHRvbl9jbGljaygpIHtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xuICAgICAgICB0aGlzLmFkX2NvbnRyb2wubWFudWFsX3NoYXJlKFwib2ZmbGluZV9wcm9maXRcIik7XG4gICAgfSxcbiAgICBvbkxvYWQoKSB7XG5cbiAgICB9LFxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9LFxuXG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTtcbiJdfQ==
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcb3B0aW9uX3VpLmpzIl0sIm5hbWVzIjpbInVzZXJfZGF0YSIsInJlcXVpcmUiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImdyYW5kUGFfbm9kZSIsIk5vZGUiLCJzb3VuZF9ub2RlX3Nwcml0ZSIsIlNwcml0ZSIsInNvdW5kX2ZyYW1lX2FyciIsIlNwcml0ZUZyYW1lIiwicHJvZ3Jlc3NfYmFyIiwiUHJvZ3Jlc3NCYXIiLCJpbmlfbm9kZSIsImdhbWVfc2NlbmVfanMiLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwiYWRfY29udHJvbCIsInNvdW5kX2NvbnRyb2wiLCJzaG93X2Jhbm5lckFkIiwic2NhbGVZIiwibm9kZSIsImFjdGl2ZSIsImNsaWNrX2NvdW50Iiwic291bmRfc3RhdGUiLCJzcHJpdGVGcmFtZSIsImdyYW5kUGFfYW5pbSIsInR3ZWVuIiwidG8iLCJlYXNpbmciLCJzdGFydCIsIm9uX3NvdW5kZV9idXR0b25fY2xpY2siLCJwbGF5X3NvdW5kX2VmZmVjdCIsInBhdXNlX2FsbF9zb3VuZCIsInJlc3VtZV9hbGxfc291bmQiLCJwbGF5X2JnX3NvdW5kIiwib25fZ3JhbmRQYV9jbGljayIsInByb2dyZXNzIiwicmFuZG9tX251bSIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImkiLCJjcmVhdGVfZ29sZF9lZmZlY3QiLCJvbl9ub3ZpY2VfYnV0dG9uX2NsaWNrIiwiY3JlYXRlX25vdmljZV91aSIsInRvdWNoX2V4aXQiLCJoaWRlX2Jhbm5lckFkIiwib25fbm9kZV9raWxsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLFNBQVMsR0FBR0MsT0FBTyxDQUFDLFdBQUQsQ0FBdkI7O0FBQ0FDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxZQUFZLEVBQUVKLEVB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QW1CLEVBQWhEOztBQUNBLFFBQUksS0FBS1osWUFBTCxDQUFrQjBCLFFBQWxCLElBQThCLENBQWxDLEVBQXFDO0FBQ2pDLFVBQUlDLFVBQVUsR0FBR0MsSUFBSSxDQUFDQyxLQUFMLENBQVdELElBQUksQ0FBQ0UsTUFBTCxLQUFnQixDQUEzQixJQUFnQyxDQUFqRDtBQUNBLFdBQUtsQixXQUFMLEdBQW1CLENBQW5CO0FBQ0EsV0FBS1osWUFBTCxDQUFrQjBCLFFBQWxCLEdBQTZCLEtBQUtkLFdBQUwsR0FBbUIsRUFBaEQ7O0FBQ0EsV0FBSyxJQUFJbUIsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0osVUFBcEIsRUFBZ0NJLENBQUMsRUFBakMsRUFBcUM7QUFDakMsYUFBSzVCLGFBQUwsQ0FBbUI2QixrQkFBbkIsQ0FBc0MsS0FBS3RDLFlBQTNDLEVBQXlEcUMsQ0FBekQsRUFBMkQsQ0FBM0Q7QUFDSDs7QUFBQTtBQUNKOztBQUFBO0FBQ0osR0FqRUk7QUFrRUw7QUFDQUUsRUFBQUEsc0JBbkVLLG9DQW1Fb0I7QUFDckIsU0FBSzFCLGFBQUwsQ0FBbUJjLGlCQUFuQixDQUFxQyxjQUFyQztBQUNBLFNBQUtsQixhQUFMLENBQW1CK0IsZ0JBQW5CO0FBQ0EsU0FBS0MsVUFBTDtBQUNILEdBdkVJO0FBd0VMO0FBQ0FBLEVBQUFBLFVBekVLLHdCQXlFUTtBQUNULFNBQUs1QixhQUFMLENBQW1CYyxpQkFBbkIsQ0FBcUMsYUFBckM7QUFDQSxTQUFLZixVQUFMLENBQWdCOEIsYUFBaEI7QUFDQSxTQUFLakMsYUFBTCxDQUFtQmtDLFlBQW5CLENBQWdDLEtBQUszQixJQUFyQztBQUNILEdBN0VJO0FBOEVMO0FBRUFTLEVBQUFBLEtBaEZLLG1CQWdGRyxDQUVQLENBbEZJLENBb0ZMOztBQXBGSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgdXNlcl9kYXRhID0gcmVxdWlyZShcInVzZXJfZGF0YVwiKTtcbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGdyYW5kUGFfbm9kZTogY2MuTm9kZSxcbiAgICAgICAgc291bmRfbm9kZV9zcHJpdGU6IGNjLlNwcml0ZSxcbiAgICAgICAgc291bmRfZnJhbWVfYXJyOiBbY2MuU3ByaXRlRnJhbWVdLFxuICAgICAgICBwcm9ncmVzc19iYXI6IGNjLlByb2dyZXNzQmFyLFxuICAgIH0sXG4gICAgLy/liJ3lp4vljJboioLngrlcbiAgICBpbmlfbm9kZSgpIHtcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9zY2VuZVwiKTtcbiAgICAgICAgdGhpcy5hZF9jb250cm9sID0gY2MuZmluZChcImFkX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwiYWRfY29udHJvbFwiKTtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sID0gY2MuZmluZChcInNvdW5kX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwic291bmRfY29udHJvbFwiKTtcbiAgICAgICAgdGhpcy5hZF9jb250cm9sLnNob3dfYmFubmVyQWQoKTtcbiAgICAgICAgdGhpcy5ncmFuZFBhX25vZGUuc2NhbGVZID0gMDtcbiAgICAgICAgdGhpcy5wcm9ncmVzc19iYXIubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jbGlja19jb3VudCA9IDA7XG4gICAgICAgIHZhciBzb3VuZF9zdGF0ZSA9IHVzZXJfZGF0YS51c2VyX2RhdGEuc291bmRfc3RhdGU7XG4gICAgICAgIGlmIChzb3VuZF9zdGF0ZSA9PSAxKSB7XG4gICAgICAgICAgICB0aGlzLnNvdW5kX25vZGVfc3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5zb3VuZF9mcmFtZV9hcnJbMF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNvdW5kX25vZGVfc3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5zb3VuZF9mcmFtZV9hcnJbMV07XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZ3JhbmRQYV9hbmltKCk7XG4gICAgfSxcbiAgICAvL2dyYW5kUGEgYW5pbVxuICAgIGdyYW5kUGFfYW5pbSgpIHtcbiAgICAgICAgY2MudHdlZW4odGhpcy5ncmFuZFBhX25vZGUpXG4gICAgICAgICAgICAudG8oMC4zLCB7IHNjYWxlWTogMSB9LCB7IGVhc2luZzogXCJlbGFzdGljT3V0XCIgfSlcbiAgICAgICAgICAgIC5zdGFydCgpO1xuICAgIH0sXG4gICAgLy/lvZPpn7PpopHmjInpkq7ooqvngrnlh7tcbiAgICBvbl9zb3VuZGVfYnV0dG9uX2NsaWNrKCkge1xuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fY2xpY2tcIik7XG4gICAgICAgIHZhciBzb3VuZF9zdGF0ZSA9IHVzZXJfZGF0YS51c2VyX2RhdGEuc291bmRfc3RhdGU7XG4gICAgICAgIGlmIChzb3VuZF9zdGF0ZSA9PSAxKSB7XG4gICAgICAgICAgICAvL+WFs+mXreWjsOmfs1xuICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5zb3VuZF9zdGF0ZSA9IDA7XG4gICAgICAgICAgICB0aGlzLnNvdW5kX25vZGVfc3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5zb3VuZF9mcmFtZV9hcnJbMV07XG4gICAgICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGF1c2VfYWxsX3NvdW5kKCk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8v5byA5ZCv5aOw6Z+zXG4gICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnNvdW5kX3N0YXRlID0gMTtcbiAgICAgICAgICAgIHRoaXMuc291bmRfbm9kZV9zcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLnNvdW5kX2ZyYW1lX2FyclswXTtcbiAgICAgICAgICAgIHRoaXMuc291bmRfY29udHJvbC5yZXN1bWVfYWxsX3NvdW5kKCk7XG4gICAgICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9iZ19zb3VuZChcImhvbWVfYmdcIik7XG4gICAgICAgIH07XG5cbiAgICB9LFxuICAgIC8v54i354i36KKr54K55Ye7XG4gICAgb25fZ3JhbmRQYV9jbGljaygpIHtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xuICAgICAgICB0aGlzLnByb2dyZXNzX2Jhci5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuY2xpY2tfY291bnQrKztcbiAgICAgICAgdGhpcy5wcm9ncmVzc19iYXIucHJvZ3Jlc3MgPSB0aGlzLmNsaWNrX2NvdW50IC8gMTA7XG4gICAgICAgIGlmICh0aGlzLnByb2dyZXNzX2Jhci5wcm9ncmVzcyA9PSAxKSB7XG4gICAgICAgICAgICB2YXIgcmFuZG9tX251bSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDUpICsgMTtcbiAgICAgICAgICAgIHRoaXMuY2xpY2tfY291bnQgPSAwO1xuICAgICAgICAgICAgdGhpcy5wcm9ncmVzc19iYXIucHJvZ3Jlc3MgPSB0aGlzLmNsaWNrX2NvdW50IC8gMTA7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJhbmRvbV9udW07IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfZ29sZF9lZmZlY3QodGhpcy5ncmFuZFBhX25vZGUsIGksMSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgLy/mlrDmiYvlvJXlr7zmjInpkq7ooqvngrnlh7tcbiAgICBvbl9ub3ZpY2VfYnV0dG9uX2NsaWNrKCkge1xuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fY2xpY2tcIik7XG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfbm92aWNlX3VpKCk7XG4gICAgICAgIHRoaXMudG91Y2hfZXhpdCgpO1xuICAgIH0sXG4gICAgLy/ngrnlh7vpgIDlh7pcbiAgICB0b3VjaF9leGl0KCkge1xuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fZXhpdFwiKTtcbiAgICAgICAgdGhpcy5hZF9jb250cm9sLmhpZGVfYmFubmVyQWQoKTtcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLm9uX25vZGVfa2lsbCh0aGlzLm5vZGUpO1xuICAgIH0sXG4gICAgLy8gb25Mb2FkICgpIHt9LFxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9LFxuXG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTtcbiJdfQ==
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxccGxhbnRfdWkuanMiXSwibmFtZXMiOlsidXNlcl9kYXRhIiwicmVxdWlyZSIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiaWNvbl9ncm9wIiwiTm9kZSIsImluaV9ub2RlIiwibGFuZF9pbmRleCIsImdhbWVfc2NlbmVfanMiLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwibGFuZF9ncm91cCIsImFkX2NvbnRyb2wiLCJzb3VuZF9jb250cm9sIiwic2hvd19iYW5uZXJBZCIsInNldF9pY29uIiwib25fdG91Y2hfZXhpdF9jbGljayIsInBsYXlfc291bmRfZWZmZWN0IiwiaGlkZV9iYW5uZXJBZCIsIm9uX25vZGVfa2lsbCIsIm5vZGUiLCJpIiwiY2hpbGRyZW4iLCJsZW5ndGgiLCJwbGFudCIsImhhdmUiLCJhY3RpdmUiLCJvbl9wbGFudF9jbGljayIsImUiLCJwbGFudF9pbmRleCIsIm9uTG9hZCIsInN0YXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLFNBQVMsR0FBR0MsT0FBTyxDQUFDLFdBQUQsQ0FBdkI7O0FBQ0FDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxTQUFTLEVBQUVKLEVBQUUsQ0FBQ0s7QUFETixHQUhQO0FBT0w7QUFDQUMsRUFBQUEsUUFBUSxFQUFFLGtCQUFVQyxVQUFWLEVBQXNCO0FBQzVCLFNBQUtDLGFBQUwsR0FBcUJSLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLFNBQVIsRUFBbUJDLFlBQW5CLENBQWdDLFlBQWhDLENBQXJCO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQlgsRUFBRSxDQUFDUyxJQUFILENBQVEsMkJBQVIsQ0FBbEI7QUFDQSxTQUFLRyxVQUFMLEdBQWtCWixFQUFFLENBQUNTLElBQUgsQ0FBUSxZQUFSLEVBQXNCQyxZQUF0QixDQUFtQyxZQUFuQyxDQUFsQjtBQUNBLFNBQUtHLGFBQUwsR0FBcUJiLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLGVBQVIsRUFBeUJDLFlBQXpCLENBQXNDLGVBQXRDLENBQXJCO0FBQ0EsU0FBS0UsVUFBTCxDQUFnQkUsYUFBaEI7QUFDQSxTQUFLQyxRQUFMO0FBQ0EsU0FBS1IsVUFBTCxHQUFrQkEsVUFBbEI7QUFDSCxHQWhCSTtBQWlCTDtBQUNBUyxFQUFBQSxtQkFBbUIsRUFBRSwrQkFBWTtBQUM3QixTQUFLSCxhQUFMLENBQW1CSSxpQkFBbkIsQ0FBcUMsYUFBckM7QUFDQSxTQUFLTCxVQUFMLENBQWdCTSxhQUFoQjtBQUNBLFNBQUtWLGFBQUwsQ0FBbUJXLFlBQW5CLENBQWdDLEtBQUtDLElBQXJDO0FBQ0gsR0F0Qkk7QUF1Qkw7QUFDQUwsRUFBQUEsUUFBUSxFQUFFLG9CQUFZO0FBQ2xCLFNBQUssSUFBSU0sQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLakIsU0FBTCxDQUFla0IsUUFBZixDQUF3QkMsTUFBNUMsRUFBb0RGLENBQUMsRUFBckQsRUFBeUQ7QUFDckQ7QUFDQSxVQUFJdkIsU0FBUyxDQUFDQSxTQUFWLENBQW9CMEIsS0FBcEIsQ0FBMEJILENBQTFCLEVBQTZCSSxJQUE3QixJQUFxQyxDQUF6QyxFQUE0QztBQUN4QyxhQUFLckIsU0FBTCxDQUFla0IsUUFBZixDQUF3QkQsQ0FBeEIsRUFBMkJLLE1BQTNCLEdBQW9DLElBQXBDO0FBQ0gsT0FGRCxNQUVPO0FBQ0gsYUFBS3RCLFNBQUwsQ0FBZWtCLFFBQWYsQ0FBd0JELENBQXhCLEVBQTJCSyxNQUEzQixHQUFvQyxLQUFwQztBQUNIOztBQUFBO0FBQ0o7O0FBQUE7QUFDSixHQWpDSTtBQWtDTDtBQUNBQyxFQUFBQSxjQUFjLEVBQUUsd0JBQVVDLENBQVYsRUFBYUMsV0FBYixFQUEwQjtBQUN0QyxTQUFLaEIsYUFBTCxDQUFtQkksaUJBQW5CLENBQXFDLGNBQXJDO0FBQ0EsU0FBS04sVUFBTCxDQUFnQlcsUUFBaEIsQ0FBeUIsS0FBS2YsVUFBOUIsRUFBMENHLFlBQTFDLENBQXVELE1BQXZELEVBQStEYyxLQUEvRCxDQUFxRUssV0FBckU7QUFDQSxTQUFLYixtQkFBTDtBQUNILEdBdkNJO0FBd0NMYyxFQUFBQSxNQXhDSyxvQkF3Q0ksQ0FFUixDQTFDSTtBQTRDTEMsRUFBQUEsS0E1Q0ssbUJBNENHLENBRVAsQ0E5Q0ksQ0FnREw7O0FBaERLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciB1c2VyX2RhdGEgPSByZXF1aXJlKFwidXNlcl9kYXRhXCIpO1xuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgaWNvbl9ncm9wOiBjYy5Ob2RlLFxuICAgIH0sXG5cbiAgICAvL2luaSBub2RlXG4gICAgaW5pX25vZGU6IGZ1bmN0aW9uIChsYW5kX2luZGV4KSB7XG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfc2NlbmVcIik7XG4gICAgICAgIHRoaXMubGFuZF9ncm91cCA9IGNjLmZpbmQoXCJVSV9ST09UL2NlbnRlci9sYW5kX2dyb3VwXCIpO1xuICAgICAgICB0aGlzLmFkX2NvbnRyb2wgPSBjYy5maW5kKFwiYWRfY29udHJvbFwiKS5nZXRDb21wb25lbnQoXCJhZF9jb250cm9sXCIpO1xuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wgPSBjYy5maW5kKFwic291bmRfY29udHJvbFwiKS5nZXRDb21wb25lbnQoXCJzb3VuZF9jb250cm9sXCIpO1xuICAgICAgICB0aGlzLmFkX2NvbnRyb2wuc2hvd19iYW5uZXJBZCgpO1xuICAgICAgICB0aGlzLnNldF9pY29uKCk7XG4gICAgICAgIHRoaXMubGFuZF9pbmRleCA9IGxhbmRfaW5kZXg7XG4gICAgfSxcbiAgICAvL2V4aXRcbiAgICBvbl90b3VjaF9leGl0X2NsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9leGl0XCIpO1xuICAgICAgICB0aGlzLmFkX2NvbnRyb2wuaGlkZV9iYW5uZXJBZCgpO1xuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMub25fbm9kZV9raWxsKHRoaXMubm9kZSk7XG4gICAgfSxcbiAgICAvL3BsYW50IHVubG9jayBqdWRnZVxuICAgIHNldF9pY29uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5pY29uX2dyb3AuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIC8v5oul5pyJ56eN5a2QXG4gICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5wbGFudFtpXS5oYXZlID09IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZ3JvcC5jaGlsZHJlbltpXS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZ3JvcC5jaGlsZHJlbltpXS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvL3BsYW50IGNsaWNrIFxuICAgIG9uX3BsYW50X2NsaWNrOiBmdW5jdGlvbiAoZSwgcGxhbnRfaW5kZXgpIHtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xuICAgICAgICB0aGlzLmxhbmRfZ3JvdXAuY2hpbGRyZW5bdGhpcy5sYW5kX2luZGV4XS5nZXRDb21wb25lbnQoXCJsYW5kXCIpLnBsYW50KHBsYW50X2luZGV4KTtcbiAgICAgICAgdGhpcy5vbl90b3VjaF9leGl0X2NsaWNrKCk7XG4gICAgfSxcbiAgICBvbkxvYWQoKSB7XG5cbiAgICB9LFxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9LFxuXG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTtcbiJdfQ==
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxccGV0X2NvbnRlbnQuanMiXSwibmFtZXMiOlsiY29uZmlnIiwicmVxdWlyZSIsInVzZXJfZGF0YSIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwibmFtZV9sYWJlbCIsIkxhYmVsIiwiaW50cm9kdWNlX2xhYmVsIiwic2tpbGxfaW50cm9kdWNlX2xhYmVsIiwicHJvZ3Jlc3MiLCJQcm9ncmVzc0JhciIsImN1bHRydWVfYnV0dG9uX25vZGUiLCJOb2RlIiwiYnV0dG9uX2ZyYW1lX2FyciIsIlNwcml0ZUZyYW1lIiwicGV0X2ljb25fYXJyIiwicGV0X3Nwcml0ZSIsIlNwcml0ZSIsInNoYXJlX2xhYmVsIiwiYnV0dG9uX2J1eSIsImxhYmVsX2Nvc3QiLCJpbmlfbm9kZSIsImluZGV4IiwiZ2FtZV9ydWxlc19qcyIsImZpbmQiLCJnZXRDb21wb25lbnQiLCJnYW1lX3NjZW5lX2pzIiwiYWRfY29udHJvbCIsInNvdW5kX2NvbnRyb2wiLCJ1cGRhdGVfY29udGVudCIsInNwcml0ZUZyYW1lIiwic3RyaW5nIiwicGV0IiwibmFtZSIsImludHJvZHVjZSIsInNraWxsX2ludHJvZHVjZSIsImNvc3QiLCJoYXZlIiwiYWN0aXZlIiwib25fY3VsdHJ1ZV9idXR0b25fY2xpY2siLCJwbGF5X3NvdW5kX2VmZmVjdCIsInNoYXJlX2NvdW50Iiwic2hhcmVfbWF4IiwibWFudWFsX3NoYXJlIiwic2hhcmVfc3VjY2VzIiwidmlkZW9fc3VjY2VzIiwid3giLCJjYWxsYmFjayIsInZpZGVvX3N0YXRlIiwidmlkZW9fdGFnIiwiaGF2ZV9hZCIsIm5lZWRfYWQiLCJjcmVhdGVfcGV0X2EiLCJjcmVhdGVfdGlwc191aSIsIm5vZGUiLCJ1bnNjaGVkdWxlIiwic2NoZWR1bGUiLCJidXlfcGV0IiwidHlwZSIsInR5cGVfYnV5IiwiZ29sZCIsImNyZWF0ZV9wZXQiLCJzaGFyZV9zY2hlZHVsZSIsInNoYXJlX3N0YXRlIiwic2hhcmVfdGFnIiwiaW5pX3NoYXJlIiwibm93X3RpbWUiLCJEYXRlIiwiZ2V0VGltZSIsImNyZWF0ZV90aW1lIiwic3RheV90aW1lIiwic3RhcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsTUFBTSxHQUFHQyxPQUFPLENBQUMsUUFBRCxDQUFwQjs7QUFDQSxJQUFJQyxTQUFTLEdBQUdELE9BQU8sQ0FBQyxXQUFELENBQXZCOztBQUNBRSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsVUFBVSxFQUFFSixFQUFFLENBQUNLLEtBRFA7QUFFUkMsSUFBQUEsZUFBZSxFQUFFTixFQUFFLENBQUNLLEtBRlo7QUFHUkUsSUFBQUEscUJBQXFCLEVBQUVQLEVBQUUsQ0FBQ0ssS0FIbEI7QUFJUkcsSUFBQUEsUUFBUSxFQUFFUixFQUFFLENBQUNTLFdBSkw7QUFLUkMsSUFBQUEsbUJBQW1CLEVBQUVWLEVBQUUsQ0FBQ1csSUFMaEI7QUFNUkMsSUFBQUEsZ0JBQWdCLEVBQUUsQ0FBQ1osRUFBRSxDQUFDYSxXQUFKLENBTlY7QUFPUkMsSUFBQUEsWUFBWSxFQUFFLENBQUNkLEVBQUUsQ0FBQ2EsV0FBSixDQVBOO0FBUVJFLElBQUFBLFVBQVUsRUFBRWYsRUFBRSxDQUFDZ0IsTUFSUDtBQVNSQyxJQUFBQSxXQUFXLEVBQUVqQixFQUFFLENBQUNXLElBVFI7QUFVUk8sSUFBQUEsVUFBVSxFQUFFbEIsRUFBRSxDQUFDVyxJQVZQO0FBV1JRLElBQUFBLFVBQVUsRUFBRW5CLEVBQUUsQ0FBQ0s7QUFYUCxHQUhQO0FBaUJMO0FBQ0E7QUFDQWUsRUFBQUEsUUFuQkssb0JBbUJJQyxLQW5CSixFQW1CVztBQUNaLFNBQUtDLGFBQUwsR0FBcUJ0QixFQUFFLENBQUN1QixJQUFILENBQVEsU0FBUixFQUFtQkMsWUFBbkIsQ0FBZ0MsWUFBaEMsQ0FBckI7QUFDQSxTQUFLQyxhQUFMLEdBQXFCekIsRUFB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QUFrRCxJQUFJRixJQUFKLEdBQVdDLE9BQVgsRUFBbEQ7QUFDQXBFLFVBQUFBLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQmdDLEdBQXBCLENBQXdCLEtBQUtWLEtBQTdCLEVBQW9DZSxJQUFwQyxHQUEyQyxDQUEzQztBQUNBckMsVUFBQUEsU0FBUyxDQUFDQSxTQUFWLENBQW9CZ0MsR0FBcEIsQ0FBd0IsS0FBS1YsS0FBN0IsRUFBb0NtQixXQUFwQztBQUNBLGVBQUtsQixhQUFMLENBQW1CNkIsWUFBbkIsQ0FBZ0MsS0FBSzlCLEtBQXJDO0FBQ0EsZUFBS0ksYUFBTCxDQUFtQjJCLGNBQW5CLENBQWtDLEtBQUs5QixhQUFMLENBQW1CK0IsSUFBckQsRUFBMkQsZ0JBQTNEO0FBQ0EsZUFBS3pCLGNBQUw7QUFDQSxlQUFLMEIsVUFBTCxDQUFnQk8sY0FBaEI7QUFDSCxTQVRELE1BU087QUFDSCxlQUFLUCxVQUFMLENBQWdCTyxjQUFoQjtBQUNBLGVBQUtwQyxhQUFMLENBQW1CMkIsY0FBbkIsQ0FBa0MsS0FBSzNCLGFBQUwsQ0FBbUI0QixJQUFyRCxFQUEyRCxrQkFBM0Q7QUFDSDs7QUFBQTtBQUVKLE9BbEJELE1Ba0JPO0FBQ0g7QUFDQSxZQUFJLEtBQUszQixVQUFMLENBQWdCb0MsV0FBaEIsSUFBK0IsVUFBL0IsSUFBNkMsS0FBS3BDLFVBQUwsQ0FBZ0JxQyxTQUFoQixJQUE2QixJQUE5RSxFQUFvRjtBQUNoRixlQUFLVCxVQUFMLENBQWdCTyxjQUFoQjtBQUNIOztBQUFBO0FBQ0o7O0FBQUE7QUFDSixLQXpCRDs7QUEwQkEsU0FBS04sUUFBTCxDQUFjTSxjQUFkLEVBQThCLEdBQTlCO0FBQ0gsR0E3SUk7QUErSUw7QUFFQVMsRUFBQUEsS0FqSkssbUJBaUpHO0FBQ0osU0FBSzFDLGNBQUw7QUFDSCxHQW5KSSxDQXFKTDs7QUFySkssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGNvbmZpZyA9IHJlcXVpcmUoXCJjb25maWdcIik7XG52YXIgdXNlcl9kYXRhID0gcmVxdWlyZShcInVzZXJfZGF0YVwiKTtcbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIG5hbWVfbGFiZWw6IGNjLkxhYmVsLFxuICAgICAgICBpbnRyb2R1Y2VfbGFiZWw6IGNjLkxhYmVsLFxuICAgICAgICBza2lsbF9pbnRyb2R1Y2VfbGFiZWw6IGNjLkxhYmVsLFxuICAgICAgICBwcm9ncmVzczogY2MuUHJvZ3Jlc3NCYXIsXG4gICAgICAgIGN1bHRydWVfYnV0dG9uX25vZGU6IGNjLk5vZGUsXG4gICAgICAgIGJ1dHRvbl9mcmFtZV9hcnI6IFtjYy5TcHJpdGVGcmFtZV0sXG4gICAgICAgIHBldF9pY29uX2FycjogW2NjLlNwcml0ZUZyYW1lXSxcbiAgICAgICAgcGV0X3Nwcml0ZTogY2MuU3ByaXRlLFxuICAgICAgICBzaGFyZV9sYWJlbDogY2MuTm9kZSxcbiAgICAgICAgYnV0dG9uX2J1eTogY2MuTm9kZSxcbiAgICAgICAgbGFiZWxfY29zdDogY2MuTGFiZWwsXG4gICAgfSxcblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuICAgIC8v5Yid5aeL5YyW6IqC54K5XG4gICAgaW5pX25vZGUoaW5kZXgpIHtcbiAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9ydWxlc1wiKTtcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9zY2VuZVwiKTtcbiAgICAgICAgdGhpcy5hZF9jb250cm9sID0gY2MuZmluZChcImFkX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwiYWRfY29udHJvbFwiKTtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sID0gY2MuZmluZChcInNvdW5kX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwic291bmRfY29udHJvbFwiKTtcbiAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICAgICAgICB0aGlzLnVwZGF0ZV9jb250ZW50KCk7XG4gICAgfSxcblxuICAgIHVwZGF0ZV9jb250ZW50KCkge1xuICAgICAgICB0aGlzLnBldF9zcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLnBldF9pY29uX2Fyclt0aGlzLmluZGV4XTtcbiAgICAgICAgdGhpcy5uYW1lX2xhYmVsLnN0cmluZyA9IGNvbmZpZy5wZXRbdGhpcy5pbmRleF0ubmFtZTtcbiAgICAgICAgdGhpcy5pbnRyb2R1Y2VfbGFiZWwuc3RyaW5nID0gY29uZmlnLnBldFt0aGlzLmluZGV4XS5pbnRyb2R1Y2U7XG4gICAgICAgIHRoaXMuc2tpbGxfaW50cm9kdWNlX2xhYmVsLnN0cmluZyA9IGNvbmZpZy5wZXRbdGhpcy5pbmRleF0uc2tpbGxfaW50cm9kdWNlO1xuICAgICAgICB0aGlzLmxhYmVsX2Nvc3Quc3RyaW5nID0gY29uZmlnLnBldFt0aGlzLmluZGV4XS5jb3N0O1xuICAgICAgICAvLyBlbHNlIHRoaXMuaWNvbi5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5TcHJpdGVGcmFtZSA9IGljb25fYXJyWzFdO1xuICAgICAgICAvLyB0aGlzLnByb2dyZXNzLnByb2dyZXNzID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbdGhpcy5pbmRleF0uaGF2ZV9hZCAvIGNvbmZpZy5wZXRbdGhpcy5pbmRleF0ubmVlZF9hZDtcbiAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEucGV0W3RoaXMuaW5kZXhdLmhhdmUgPT0gMSkgdGhpcy5idXR0b25fYnV5LmFjdGl2ZSA9IGZhbHNlO1xuICAgIH0sXG4gICAgLy/ln7nlhbvmjInpkq7ooqvngrnlh7tcbiAgICBvbl9jdWx0cnVlX2J1dHRvbl9jbGljaygpIHtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xuICAgICAgICAvLyBpZiAoY29uZmlnLnBldFt0aGlzLmluZGV4XS5nZXRfdHlwZSA9PSBcImFkXCIpe1xuICAgICAgICAvLyAgICAgdGhpcy5hZF9jb250cm9sLnNob3dfdmlkZW9BZChcImN1bHRydWVfcGV0XCIpO1xuICAgICAgICAvLyAgICAgdGhpcy52aWRlb19zdWNjZXMoKTtcbiAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgLy/liIbkuqvojrflj5ZcbiAgICAgICAgdmFyIHNoYXJlX2NvdW50ID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbdGhpcy5pbmRleF0uc2hhcmVfY291bnQ7XG4gICAgICAgIHZhciBzaGFyZV9tYXggPSBjb25maWcucGV0W3RoaXMuaW5kZXhdLnNoYXJlX21heDtcbiAgICAgICAgLy8gaWYgKHNoYXJlX2NvdW50IDwgc2hhcmVfbWF4KSB7XG4gICAgICAgIC8v5q2j5bi45YiG5LqrXG4gICAgICAgIHRoaXMuYWRfY29udHJvbC5tYW51YWxfc2hhcmUoXCJwZXRcIik7XG4gICAgICAgIHRoaXMuc2hhcmVfc3VjY2VzKCk7XG4gICAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAgIC8vICAgICAvL+asoeaVsOW3sua7oVxuICAgICAgICAvLyAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9ydWxlc19qcy5ub2RlLCBcInNoYXJlX21heFwiKTtcbiAgICAgICAgLy8gfTtcbiAgICAgICAgLy8gfTtcbiAgICB9LFxuICAgIC8v5qOA5rWL6KeG6aKR5piv5ZCm5pKt5pS+5oiQ5YqfXG4gICAgdmlkZW9fc3VjY2VzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0eXBlb2YgKHd4KSAhPSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWRfY29udHJvbC52aWRlb19zdGF0ZSA9PSAxICYmIHRoaXMuYWRfY29udHJvbC52aWRlb190YWcgPT0gXCJjdWx0cnVlX3BldFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRfY29udHJvbC52aWRlb190YWcgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkX2NvbnRyb2wudmlkZW9fc3RhdGUgPSAyO1xuICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnBldFt0aGlzLmluZGV4XS5oYXZlX2FkKys7XG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLnBldFt0aGlzLmluZGV4XS5oYXZlX2FkID49IGNvbmZpZy5wZXRbdGhpcy5pbmRleF0ubmVlZF9hZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbdGhpcy5pbmRleF0uaGF2ZSA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMuY3JlYXRlX3BldF9hKHRoaXMuaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9ydWxlc19qcy5ub2RlLCBcImN1bHRydWVfc3VjY2VzXCIpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZV9jb250ZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfc2NlbmVfanMubm9kZSwgXCJjdWx0cnVlX3BldF9zdWNjZXNcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZShjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYWRfY29udHJvbC52aWRlb190YWcgPT0gbnVsbCAmJiB0aGlzLmFkX2NvbnRyb2wudmlkZW9fc3RhdGUgPT0gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUoY2FsbGJhY2ssIDAuMSk7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICBidXlfcGV0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0eXBlID0gY29uZmlnLnBldFt0aGlzLmluZGV4XS50eXBlX2J1eTtcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFwiZ29sZFwiOlxuICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQgPj0gY29uZmlnLnBldFt0aGlzLmluZGV4XS5jb3N0KSB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuZ29sZCAtPSBjb25maWcucGV0W3RoaXMuaW5kZXhdLmNvc3Q7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEucGV0W3RoaXMuaW5kZXhdLmhhdmUgPSAxO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3BldCh0aGlzLmdhbWVfc2NlbmVfanMubm9kZSwgdGhpcy5pbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uX2J1eS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIFwibm9fbW9uZXlfZ29sZFwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZV9jb250ZW50KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiZGlhbW9uZFwiOiAvLyBjaMawYSBjw7MgZGlhbW9uZCB0cm9uZyBjb25maWcgXG4gICAgICAgICAgICAvLyBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5kaWFtb25kID49IGNvbmZpZy5wZXRbdGhpcy5pbmRleF0uY29zdCkge1xuICAgICAgICAgICAgLy8gICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuZGlhbW9uZCAtPSBjb25maWcucGV0W3RoaXMuaW5kZXhdLmNvc3Q7XG4gICAgICAgICAgICAvLyAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbdGhpcy5pbmRleF0uaGF2ZSA9IDE7XG4gICAgICAgICAgICAvLyAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9wZXQodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIHRoaXMuaW5kZXgpO1xuICAgICAgICAgICAgLy8gICAgIHRoaXMuYnV0dG9uX2J1eS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIC8vIGVsc2UgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9zY2VuZV9qcy5ub2RlLCBcIm5vX21vbmV5XCIpO1xuICAgICAgICAgICAgLy8gdGhpcy51cGRhdGVfY29udGVudCgpO1xuICAgICAgICAgICAgLy8gYnJlYWs7XG5cbiAgICAgICAgfVxuXG5cblxuICAgIH0sXG4gICAgLy/liIbkuqvmo4DmtYtcbiAgICBzaGFyZV9zdWNjZXMoKSB7XG4gICAgICAgIHZhciBzaGFyZV9zY2hlZHVsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmFkX2NvbnRyb2wuc2hhcmVfc3RhdGUgPT0gXCJzaGFyZV9zdWNjZXNcIiAmJiB0aGlzLmFkX2NvbnRyb2wuc2hhcmVfdGFnID09IFwicGV0XCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkX2NvbnRyb2wuaW5pX3NoYXJlKCk7XG4gICAgICAgICAgICAgICAgLy/lrqDniannlJ/miJDnmoTml7bpl7RcbiAgICAgICAgICAgICAgICB2YXIgbm93X3RpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgICAgICAgICBpZiAoKG5vd190aW1lIC0gdXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbdGhpcy5pbmRleF0uY3JlYXRlX3RpbWUpICogMTAwMCA+PSBjb25maWcucGV0W3RoaXMuaW5kZXhdLnN0YXlfdGltZSkge1xuICAgICAgICAgICAgICAgICAgICAvL+WuoOeJqeS4jeWtmOWcqFxuICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnBldFt0aGlzLmluZGV4XS5jcmVhdGVfdGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnBldFt0aGlzLmluZGV4XS5oYXZlID0gMTtcbiAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5wZXRbdGhpcy5pbmRleF0uc2hhcmVfY291bnQrKztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLmNyZWF0ZV9wZXRfYSh0aGlzLmluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9ydWxlc19qcy5ub2RlLCBcImN1bHRydWVfc3VjY2VzXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZV9jb250ZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZShzaGFyZV9zY2hlZHVsZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKHNoYXJlX3NjaGVkdWxlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9zY2VuZV9qcy5ub2RlLCBcInBldF9hbHJlYWR5X2xpZmVcIik7XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL+acquWIhuS6q+WBnOatouajgOa1i1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFkX2NvbnRyb2wuc2hhcmVfc3RhdGUgPT0gXCJ1bl9zaGFyZVwiICYmIHRoaXMuYWRfY29udHJvbC5zaGFyZV90YWcgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUoc2hhcmVfc2NoZWR1bGUpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNjaGVkdWxlKHNoYXJlX3NjaGVkdWxlLCAwLjIpXG4gICAgfSxcblxuICAgIC8vb25Mb2FkKCkgeyB9LFxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMudXBkYXRlX2NvbnRlbnQoKTtcbiAgICB9LFxuXG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTtcbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ui/repo_ui.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1637eOv/SRBF4KWKqBY+U21', 'repo_ui');
// script/ui/repo_ui.js

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
    lock: cc.Node,
    label: cc.Label,
    icon: cc.Node
  },
  start: function start() {}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxccmVwb191aS5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImxvY2siLCJOb2RlIiwibGFiZWwiLCJMYWJlbCIsImljb24iLCJzdGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLElBQUksRUFBRUosRUFBRSxDQUFDSyxJQUREO0FBRVJDLElBQUFBLEtBQUssRUFBRU4sRUFBRSxDQUFDTyxLQUZGO0FBR1JDLElBQUFBLElBQUksRUFBRVIsRUFBRSxDQUFDSztBQUhELEdBSFA7QUFVTEksRUFBQUEsS0FWSyxtQkFVSSxDQUVSO0FBWkksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gY2MuQ2xhc3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGxvY2s6IGNjLk5vZGUsXHJcbiAgICAgICAgbGFiZWw6IGNjLkxhYmVsLFxyXG4gICAgICAgIGljb246IGNjLk5vZGUsXHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICBzdGFydCAoKSB7XHJcblxyXG4gICAgfSxcclxuXHJcbn0pO1xyXG4iXX0=
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
    this.sound_control.play_sound_effect("button_exit");
    this.ad_control.hide_bannerAd();
    this.node.destroy();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxccmVzdF91aS5qcyJdLCJuYW1lcyI6WyJ1c2VyX2RhdGEiLCJyZXF1aXJlIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJyb2xlX3Nwcml0ZSIsIlNwcml0ZSIsInJvbGVfYXJyIiwiU3ByaXRlRnJhbWUiLCJjZW50ZXJfbm9kZSIsIk5vZGUiLCJpbmlfbm9kZSIsInN0YWZmX2luZGV4IiwiYWRfY29udHJvbCIsImZpbmQiLCJnZXRDb21wb25lbnQiLCJnYW1lX3NjZW5lX2pzIiwic291bmRfY29udHJvbCIsInNob3dfYmFubmVyQWQiLCJzcHJpdGVGcmFtZSIsInNjYWxlIiwiaW5pX2FuaW0iLCJ0d2VlbiIsInRvIiwiZWFzaW5nIiwic3RhcnQiLCJvbl9pd2FubmFfYnV0dG9uX2NsaWNrIiwibG9nIiwicGxheV9zb3VuZF9lZmZlY3QiLCJzaG93X3ZpZGVvQWQiLCJ2aWRlb19zdWNjZXMiLCJvbl90b3VjaF9leGl0X2NsaWNrIiwiZSIsIm5vZGUiLCJkZXN0cm95Iiwib25fa2VlcF9yZXN0X2J1dHRvbl9jbGljayIsImhpZGVfYmFubmVyQWQiLCJ3eCIsImNhbGxiYWNrIiwidmlkZW9fc3RhdGUiLCJ2aWRlb190YWciLCJzdGFmZiIsIm92ZXJfdGltZSIsImNyZWF0ZV90aXBzX3VpIiwidW5zY2hlZHVsZSIsInNjaGVkdWxlIiwib25Mb2FkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLFNBQVMsR0FBR0MsT0FBTyxDQUFDLFdBQUQsQ0FBdkI7O0FBQ0FDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxXQUFXLEVBQUVKLEVBQUUsQ0FBQ0ssTUFEUjtBQUVSQyxJQUFBQSxRQUFRLEVBQUUsQ0FBQ04sRUFBRSxDQUFDTyxXQUFKLENBRkY7QUFHUkMsSUFBQUEsV0FBVyxFQUFFUixFQUFFLENBQUNTO0FBSFIsR0FIUDtBQVFMO0FBQ0FDLEVBQUFBLFFBVEssb0JBU0lDLFdBVEosRUFTaUI7QUFDbEIsU0FBS0MsVUFBTCxHQUFrQlosRUFBRSxDQUFDYSxJQUFILENBQVEsWUFBUixFQUFzQkMsWUFBdEIsQ0FBbUMsWUFBbkMsQ0FBbEI7QUFDQSxTQUFLQyxhQUFMLEdBQXFCZixFQUFFLENBQUNhLElBQUgsQ0FBUSxTQUFSLEVBQW1CQyxZQUFuQixDQUFnQyxZQUFoQyxDQUFyQjtBQUNBLFNBQUtFLGFBQUwsR0FBcUJoQixFQUFFLENBQUNhLElBQUgsQ0FBUSxlQUFSLEVBQXlCQyxZQUF6QixDQUFzQyxlQUF0QyxDQUFyQjtBQUNBLFNBQUtGLFVBQUwsQ0FBZ0JLLGFBQWhCLEdBSmtCLENBS2xCOztBQUNBLFNBQUtOLFdBQUwsR0FBbUJBLFdBQW5CO0FBQ0EsU0FBS1AsV0FBTCxDQUFpQmMsV0FBakIsR0FBK0IsS0FBS1osUUFBTCxDQUFjSyxXQUFkLENBQS9CO0FBQ0EsU0FBS0gsV0FBTCxDQUFpQlcsS0FBakIsR0FBeUIsQ0FBekI7QUFDQSxTQUFLQyxRQUFMO0FBQ0gsR0FuQkk7QUFvQkw7QUFDQUEsRUFBQUEsUUFyQkssc0JBcUJNO0FBQ1BwQixJQUFBQSxFQUFFLENBQUNxQixLQUFILENBQVMsS0FBS2IsV0FBZCxFQUNLYyxFQURMLENBQ1EsR0FEUixFQUNhO0FBQUVILE1BQUFBLEtBQUssRUFBRTtBQUFULEtBRGIsRUFDMkI7QUFBRUksTUFBQUEsTUFBTSxFQUFFO0FBQVYsS0FEM0IsRUFFS0MsS0FGTDtBQUdILEdBekJJO0FBMEJMO0FBQ0FDLEVBQUFBLHNCQTNCSyxvQ0EyQm9CO0FBQ3JCekIsSUFBQUEsRUFBRSxDQUFDMEIsR0FBSCxDQUFPLFdBQVA7QUFDQSxTQUFLVixhQUFMLENBQW1CVyxpQkFBbkIsQ0FBcUMsY0FBckM7QUFDQSxTQUFLZixVQUFMLENBQWdCZ0IsWUFBaEIsQ0FBNkIsWUFBN0I7QUFDQSxTQUFLQyxZQUFMO0FBQ0gsR0FoQ0k7QUFpQ0xDLEVBQUFBLG1CQWpDSywrQkFpQ2VDLENBakNmLEVBaUNrQjtBQUNuQixTQUFLQyxJQUFMLENBQVVDLE9BQVY7QUFDSCxHQW5DSTtBQW9DTDtBQUNBQyxFQUFBQSx5QkFyQ0ssdUNBcUN1QjtBQUN4QixTQUFLbEIsYUFBTCxDQUFtQlcsaUJBQW5CLENBQXFDLGFBQXJDO0FBQ0EsU0FBS2YsVUFBTCxDQUFnQnVCLGFBQWhCO0FBQ0EsU0FBS0gsSUFBTCxDQUFVQyxPQUFWO0FBQ0gsR0F6Q0k7QUEwQ0w7QUFDQUosRUFBQUEsWUFBWSxFQUFFLHdCQUFZO0FBQ3RCLFFBQUksT0FBUU8sRUFBUixJQUFlLFdBQW5CLEVBQWdDO0FBQzVCLFVBQUlDLFFBQVEsR0FBRyxTQUFYQSxRQUFXLEdBQVk7QUFDdkIsWUFBSSxLQUFLekIsVUFBTCxDQUFnQjBCLFdBQWhCLElBQStCLENBQS9CLElBQW9DLEtBQUsxQixVQUFMLENBQWdCMkIsU0FBaEIsSUFBNkIsWUFBckUsRUFBbUY7QUFDL0UsZUFBSzNCLFVBQUwsQ0FBZ0IyQixTQUFoQixHQUE0QixJQUE1QjtBQUNBLGVBQUszQixVQUFMLENBQWdCMEIsV0FBaEIsR0FBOEIsQ0FBOUI7QUFDQXhDLFVBQUFBLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQjBDLEtBQXBCLENBQTBCLEtBQUs3QixXQUEvQixFQUE0QzhCLFNBQTVDLEdBQXdELENBQXhEO0FBQ0EsZUFBSzFCLGFBQUwsQ0FBbUIyQixjQUFuQixDQUFrQyxLQUFLM0IsYUFBTCxDQUFtQmlCLElBQXJELEVBQTJELGlCQUEzRDtBQUNBLGVBQUtXLFVBQUwsQ0FBZ0JOLFFBQWhCO0FBQ0EsZUFBS3pCLFVBQUwsQ0FBZ0J1QixhQUFoQjtBQUNBLGVBQUtILElBQUwsQ0FBVUMsT0FBVjtBQUNILFNBUkQsTUFRTztBQUNILGNBQUksS0FBS3JCLFVBQUwsQ0FBZ0IyQixTQUFoQixJQUE2QixJQUE3QixJQUFxQyxLQUFLM0IsVUFBTCxDQUFnQjBCLFdBQWhCLElBQStCLENBQXhFLEVBQTJFO0FBQ3ZFLGlCQUFLSyxVQUFMLENBQWdCTixRQUFoQjtBQUNIOztBQUFBO0FBQ0o7O0FBQUE7QUFDSixPQWREOztBQWVBLFdBQUtPLFFBQUwsQ0FBY1AsUUFBZCxFQUF3QixHQUF4QjtBQUNIOztBQUFBO0FBQ0osR0E5REk7QUErRExRLEVBQUFBLE1BL0RLLG9CQStESSxDQUFHLENBL0RQO0FBaUVMckIsRUFBQUEsS0FqRUssbUJBaUVHLENBRVAsQ0FuRUksQ0FxRUw7O0FBckVLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciB1c2VyX2RhdGEgPSByZXF1aXJlKFwidXNlcl9kYXRhXCIpO1xuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgcm9sZV9zcHJpdGU6IGNjLlNwcml0ZSxcbiAgICAgICAgcm9sZV9hcnI6IFtjYy5TcHJpdGVGcmFtZV0sXG4gICAgICAgIGNlbnRlcl9ub2RlOiBjYy5Ob2RlLFxuICAgIH0sXG4gICAgLy/liJ3lp4vljJboioLngrlcbiAgICBpbmlfbm9kZShzdGFmZl9pbmRleCkge1xuICAgICAgICB0aGlzLmFkX2NvbnRyb2wgPSBjYy5maW5kKFwiYWRfY29udHJvbFwiKS5nZXRDb21wb25lbnQoXCJhZF9jb250cm9sXCIpO1xuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJnYW1lX3NjZW5lXCIpO1xuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wgPSBjYy5maW5kKFwic291bmRfY29udHJvbFwiKS5nZXRDb21wb25lbnQoXCJzb3VuZF9jb250cm9sXCIpO1xuICAgICAgICB0aGlzLmFkX2NvbnRyb2wuc2hvd19iYW5uZXJBZCgpO1xuICAgICAgICAvL+WIneWni+Wwj+S6uueahOW9ouixoVxuICAgICAgICB0aGlzLnN0YWZmX2luZGV4ID0gc3RhZmZfaW5kZXg7XG4gICAgICAgIHRoaXMucm9sZV9zcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLnJvbGVfYXJyW3N0YWZmX2luZGV4XTtcbiAgICAgICAgdGhpcy5jZW50ZXJfbm9kZS5zY2FsZSA9IDA7XG4gICAgICAgIHRoaXMuaW5pX2FuaW0oKTtcbiAgICB9LFxuICAgIC8v5Yid5aeL5YyW5Yqo55S7XG4gICAgaW5pX2FuaW0oKSB7XG4gICAgICAgIGNjLnR3ZWVuKHRoaXMuY2VudGVyX25vZGUpXG4gICAgICAgICAgICAudG8oMC4zLCB7IHNjYWxlOiAxIH0sIHsgZWFzaW5nOiBcInNpbmVPdXRcIiB9KVxuICAgICAgICAgICAgLnN0YXJ0KCk7XG4gICAgfSxcbiAgICAvL2kgd2FubmEgYnV0dG9uIGNsaWNrXG4gICAgb25faXdhbm5hX2J1dHRvbl9jbGljaygpIHtcbiAgICAgICAgY2MubG9nKFwiY3JlYXRlX2FkXCIpO1xuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fY2xpY2tcIik7XG4gICAgICAgIHRoaXMuYWRfY29udHJvbC5zaG93X3ZpZGVvQWQoXCJzdGFmZl9yZXN0XCIpO1xuICAgICAgICB0aGlzLnZpZGVvX3N1Y2NlcygpO1xuICAgIH0sXG4gICAgb25fdG91Y2hfZXhpdF9jbGljayhlKSB7XG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgfSxcbiAgICAvL2tlZXAgcmVzdFxuICAgIG9uX2tlZXBfcmVzdF9idXR0b25fY2xpY2soKSB7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9leGl0XCIpO1xuICAgICAgICB0aGlzLmFkX2NvbnRyb2wuaGlkZV9iYW5uZXJBZCgpO1xuICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xuICAgIH0sXG4gICAgLy/mo4DmtYvop4bpopHmmK/lkKbmkq3mlL7miJDlip9cbiAgICB2aWRlb19zdWNjZXM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiAod3gpICE9IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hZF9jb250cm9sLnZpZGVvX3N0YXRlID09IDEgJiYgdGhpcy5hZF9jb250cm9sLnZpZGVvX3RhZyA9PSBcInN0YWZmX3Jlc3RcIikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkX2NvbnRyb2wudmlkZW9fdGFnID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZF9jb250cm9sLnZpZGVvX3N0YXRlID0gMjtcbiAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5zdGFmZlt0aGlzLnN0YWZmX2luZGV4XS5vdmVyX3RpbWUgPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIFwic3RhZmZfcmVzdF9vdmVyXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUoY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkX2NvbnRyb2wuaGlkZV9iYW5uZXJBZCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmFkX2NvbnRyb2wudmlkZW9fdGFnID09IG51bGwgJiYgdGhpcy5hZF9jb250cm9sLnZpZGVvX3N0YXRlID09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZShjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlKGNhbGxiYWNrLCAwLjIpO1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgb25Mb2FkKCkgeyB9LFxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9LFxuXG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTtcbiJdfQ==
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
    lock_group_node: cc.Node
  },
  // LIFE-CYCLE CALLBACKS:
  ini_node: function ini_node() {
    this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
    this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
    this.ad_control = cc.find("ad_control").getComponent("ad_control");
    this.sound_control = cc.find("sound_control").getComponent("sound_control");
    this.ad_control.show_bannerAd();
    this.set_sell(); // this.set_estimate_label();
  },
  button_unlock_click: function button_unlock_click(e, custom) {
    // button mở kho
    var sum_gold = 0;
    var sum_diamond = 0;

    for (var i = 0; i <= custom; i++) {
      if (user_data.user_data.wareHouse[i].have == 0) {
        if (user_data.user_data.wareHouse[i].type_buy == "gold") sum_gold += user_data.user_data.wareHouse[i].cost;else sum_diamond += user_data.user_data.wareHouse[i].cost;
      }
    }

    if (user_data.user_data.gold >= sum_gold && user_data.user_data.diamond >= sum_diamond) {
      user_data.user_data.gold -= sum_gold;
      user_data.user_data.diamond -= sum_diamond;
    } else {
      this.game_scene_js.create_tips_ui(this.game_scene_js.node, "no_money_gold");
    }
  },
  auto_sell: function auto_sell() {
    // tự động bán hàng trong kho
    var time_auto = 60 * 60;

    var auto = function auto() {
      time_auto -= 0.1;
    };

    this.schedule(this.auto, 0.1);
  },
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
    this.sound_control.play_sound_effect("button_exit");
    this.ad_control.hide_bannerAd();
    this.game_scene_js.on_node_kill(this.node);
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
    this.sound_control.play_sound_effect("button_click");
    var sum = 0;

    for (var i = 0; i < this.icon_group_node.children.length; i++) {
      var count = user_data.user_data.wareHouse[i].count;
      var sell = config.plant[i].sell;
      sum += count * sell;
    }

    ; //如果没有可卖的则不能卖出

    if (sum == 0) {
      this.game_scene_js.create_tips_ui(this.game_rules_js.node, "no_sell");
    } else {
      this.ad_control.show_videoAd("double_sell");
      this.video_succes();
    }

    ;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcc2VsbF91aS5qcyJdLCJuYW1lcyI6WyJ1c2VyX2RhdGEiLCJyZXF1aXJlIiwiY29uZmlnIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJib3hfZnJhbWVfYXJyIiwiU3ByaXRlRnJhbWUiLCJpY29uX2dyb3VwX25vZGUiLCJOb2RlIiwibGFiZWxfZ3JvdXBfbm9kZSIsImxvY2tfZ3JvdXBfbm9kZSIsImluaV9ub2RlIiwiZ2FtZV9zY2VuZV9qcyIsImZpbmQiLCJnZXRDb21wb25lbnQiLCJnYW1lX3J1bGVzX2pzIiwiYWRfY29udHJvbCIsInNvdW5kX2NvbnRyb2wiLCJzaG93X2Jhbm5lckFkIiwic2V0X3NlbGwiLCJidXR0b25fdW5sb2NrX2NsaWNrIiwiZSIsImN1c3RvbSIsInN1bV9nb2xkIiwic3VtX2RpYW1vbmQiLCJpIiwid2FyZUhvdXNlIiwiaGF2ZSIsInR5cGVfYnV5IiwiY29zdCIsImdvbGQiLCJkaWFtb25kIiwiY3JlYXRlX3RpcHNfdWkiLCJub2RlIiwiYXV0b19zZWxsIiwidGltZV9hdXRvIiwiYXV0byIsInNjaGVkdWxlIiwiYWxsX2NhcGFjaXR5IiwiY2hpbGRyZW4iLCJsZW5ndGgiLCJjb3VudCIsIkxhYmVsIiwic3RyaW5nIiwiYWN0aXZlIiwiaWRfcHJvZHVjdCIsIlNwcml0ZSIsInNwcml0ZUZyYW1lIiwidG91Y2hfZXhpdCIsInBsYXlfc291bmRfZWZmZWN0IiwiaGlkZV9iYW5uZXJBZCIsIm9uX25vZGVfa2lsbCIsInNldF9lc3RpbWF0ZV9sYWJlbCIsInN1bSIsInNlbGwiLCJwbGFudCIsImVzdGltYXRlX2xhYmVsIiwib25fc2VsbF9idXR0b25fY2xpY2siLCJqIiwiYWRkX2dvbGQiLCJvbl9kb3VibGVfc2VsbF9idXR0b25fY2xpY2siLCJzaG93X3ZpZGVvQWQiLCJ2aWRlb19zdWNjZXMiLCJ3eCIsImNhbGxiYWNrIiwidmlkZW9fc3RhdGUiLCJ2aWRlb190YWci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LENBQW1Cb0IsY0FBbkIsQ0FBa0MsS0FBS2pCLGFBQUwsQ0FBbUJrQixJQUFyRCxFQUEyRCxNQUEzRCxFQUFtRW9CLEdBQUcsR0FBRyxDQUF6RTtBQUNBLGVBQUt0QyxhQUFMLENBQW1CNEMsUUFBbkIsQ0FBNEJOLEdBQUcsR0FBRyxDQUFsQztBQUNBLGVBQUtsQyxRQUFMO0FBQ0EsZUFBS2dELFVBQUwsQ0FBZ0JILFFBQWhCO0FBQ0gsU0FoQkQsTUFnQk87QUFDSCxjQUFJLEtBQUtoRCxVQUFMLENBQWdCa0QsU0FBaEIsSUFBNkIsSUFBN0IsSUFBcUMsS0FBS2xELFVBQUwsQ0FBZ0JpRCxXQUFoQixJQUErQixDQUF4RSxFQUEyRTtBQUN2RSxpQkFBS0UsVUFBTCxDQUFnQkgsUUFBaEI7QUFDSDs7QUFBQTtBQUNKOztBQUFBO0FBQ0osT0F0QkQ7O0FBdUJBLFdBQUszQixRQUFMLENBQWMyQixRQUFkLEVBQXdCLEdBQXhCO0FBQ0g7O0FBQUE7QUFDSixHQTNKSTtBQTRKTEksRUFBQUEsTUE1Skssb0JBNEpJLENBRVIsQ0E5Skk7QUFnS0xDLEVBQUFBLEtBaEtLLG1CQWdLRyxDQUVQLENBbEtJLENBb0tMOztBQXBLSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgdXNlcl9kYXRhID0gcmVxdWlyZShcInVzZXJfZGF0YVwiKTtcbnZhciBjb25maWcgPSByZXF1aXJlKFwiY29uZmlnXCIpO1xuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgYm94X2ZyYW1lX2FycjogW2NjLlNwcml0ZUZyYW1lXSxcbiAgICAgICAgaWNvbl9ncm91cF9ub2RlOiBjYy5Ob2RlLFxuICAgICAgICBsYWJlbF9ncm91cF9ub2RlOiBjYy5Ob2RlLFxuICAgICAgICAvLyBlc3RpbWF0ZV9sYWJlbDogY2MuTGFiZWwsXG4gICAgICAgIGxvY2tfZ3JvdXBfbm9kZTogY2MuTm9kZSxcbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG4gICAgaW5pX25vZGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9zY2VuZVwiKTtcbiAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9ydWxlc1wiKTtcbiAgICAgICAgdGhpcy5hZF9jb250cm9sID0gY2MuZmluZChcImFkX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwiYWRfY29udHJvbFwiKTtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sID0gY2MuZmluZChcInNvdW5kX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwic291bmRfY29udHJvbFwiKTtcbiAgICAgICAgdGhpcy5hZF9jb250cm9sLnNob3dfYmFubmVyQWQoKTtcbiAgICAgICAgdGhpcy5zZXRfc2VsbCgpO1xuICAgICAgICAvLyB0aGlzLnNldF9lc3RpbWF0ZV9sYWJlbCgpO1xuICAgIH0sXG4gICAgYnV0dG9uX3VubG9ja19jbGljayhlLCBjdXN0b20pIHsgICAgICAgIC8vIGJ1dHRvbiBt4bufIGtob1xuICAgICAgICB2YXIgc3VtX2dvbGQgPSAwO1xuICAgICAgICB2YXIgc3VtX2RpYW1vbmQgPSAwO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8PSBjdXN0b207IGkrKykge1xuXG4gICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS53YXJlSG91c2VbaV0uaGF2ZSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEud2FyZUhvdXNlW2ldLnR5cGVfYnV5ID09IFwiZ29sZFwiKVxuICAgICAgICAgICAgICAgICAgICBzdW1fZ29sZCArPSB1c2VyX2RhdGEudXNlcl9kYXRhLndhcmVIb3VzZVtpXS5jb3N0O1xuICAgICAgICAgICAgICAgIGVsc2Ugc3VtX2RpYW1vbmQgKz0gdXNlcl9kYXRhLnVzZXJfZGF0YS53YXJlSG91c2VbaV0uY29zdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkID49IHN1bV9nb2xkICYmIHVzZXJfZGF0YS51c2VyX2RhdGEuZGlhbW9uZCA+PSBzdW1fZGlhbW9uZCkge1xuICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkIC09IHN1bV9nb2xkO1xuICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5kaWFtb25kIC09IHN1bV9kaWFtb25kO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfc2NlbmVfanMubm9kZSwgXCJub19tb25leV9nb2xkXCIpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBhdXRvX3NlbGw6IGZ1bmN0aW9uICgpIHsgICAgLy8gdOG7sSDEkeG7mW5nIGLDoW4gaMOgbmcgdHJvbmcga2hvXG4gICAgICAgIHZhciB0aW1lX2F1dG8gPSA2MCAqIDYwO1xuXG4gICAgICAgIHZhciBhdXRvID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGltZV9hdXRvIC09MC4xO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMuYXV0bywgMC4xKTtcbiAgICB9LFxuICAgIHNldF9zZWxsOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhbGxfY2FwYWNpdHkgPSAzMDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmljb25fZ3JvdXBfbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEud2FyZUhvdXNlW2ldLmhhdmUgPT0gMSkge1xuICAgICAgICAgICAgICAgIGxldCBjb3VudCA9IHVzZXJfZGF0YS51c2VyX2RhdGEud2FyZUhvdXNlW2ldLmNvdW50O1xuICAgICAgICAgICAgICAgIHRoaXMubGFiZWxfZ3JvdXBfbm9kZS5jaGlsZHJlbltpXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGNvdW50ICsgXCIvXCIgKyBhbGxfY2FwYWNpdHk7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2NrX2dyb3VwX25vZGUuY2hpbGRyZW5baV0uYWN0aXZlID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBpZiAoY291bnQgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpZF9wcm9kdWN0ID0gdXNlcl9kYXRhLnVzZXJfZGF0YS53YXJlSG91c2VbaV0uaWRfcHJvZHVjdDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pY29uX2dyb3VwX25vZGUuY2hpbGRyZW5baV0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmJveF9mcmFtZV9hcnJbaWRfcHJvZHVjdF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmljb25fZ3JvdXBfbm9kZS5jaGlsZHJlbltpXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuYm94X2ZyYW1lX2Fycls4XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsX2dyb3VwX25vZGUuY2hpbGRyZW5baV0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSAnJztcbiAgICAgICAgICAgICAgICB0aGlzLmxvY2tfZ3JvdXBfbm9kZS5jaGlsZHJlbltpXS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9ncm91cF9ub2RlLmNoaWxkcmVuW2ldLmdldENvbXBvbmVudChjYy5TcHJpdGUpLlNwcml0ZUZyYW1lID0gdGhpcy5ib3hfZnJhbWVfYXJyWzhdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHRvdWNoX2V4aXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2V4aXRcIik7XG4gICAgICAgIHRoaXMuYWRfY29udHJvbC5oaWRlX2Jhbm5lckFkKCk7XG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5vbl9ub2RlX2tpbGwodGhpcy5ub2RlKTtcbiAgICB9LFxuICAgIC8v6K6+572u6aKE6K6h5Y2W5Ye65paH5a2XXG4gICAgc2V0X2VzdGltYXRlX2xhYmVsOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzdW0gPSAwO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuaWNvbl9ncm91cF9ub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgY291bnQgPSB1c2VyX2RhdGEudXNlcl9kYXRhLndhcmVIb3VzZVtpXS5jb3VudDtcbiAgICAgICAgICAgIHZhciBzZWxsID0gY29uZmlnLnBsYW50W2ldLnNlbGw7XG4gICAgICAgICAgICBzdW0gKz0gY291bnQgKiBzZWxsO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmVzdGltYXRlX2xhYmVsLnN0cmluZyA9IFwiRXhwZWN0ZWQgdG8gc2VsbDogXCIgKyBzdW07XG4gICAgfSxcbiAgICAvL+aZrumAmuWNluWHulxuICAgIG9uX3NlbGxfYnV0dG9uX2NsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9jbGlja1wiKTtcbiAgICAgICAgdmFyIHN1bSA9IDA7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5pY29uX2dyb3VwX25vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBjb3VudCA9IHVzZXJfZGF0YS51c2VyX2RhdGEud2FyZUhvdXNlW2ldLmNvdW50O1xuICAgICAgICAgICAgdmFyIGlkX3Byb2R1Y3QgPSB1c2VyX2RhdGEudXNlcl9kYXRhLndhcmVIb3VzZVtpXS5pZF9wcm9kdWN0Oy8vIGzhuqV5IGlkIGPhu6dhIGPDonkgdHJvbmcgbeG7l2kga2hvXG4gICAgICAgICAgICBpZiAoaWRfcHJvZHVjdCA+IDcpIGNvbnRpbnVlO1xuICAgICAgICAgICAgdmFyIHNlbGwgPSBjb25maWcucGxhbnRbaWRfcHJvZHVjdF0uc2VsbDtcbiAgICAgICAgICAgIHN1bSArPSBjb3VudCAqIHNlbGw7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChzdW0gPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9ydWxlc19qcy5ub2RlLCBcIm5vX3NlbGxcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMuaWNvbl9ncm91cF9ub2RlLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS53YXJlSG91c2Vbal0uY291bnQgPSAwO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfcnVsZXNfanMubm9kZSwgXCJnb2xkXCIsIHN1bSk7XG4gICAgICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMuYWRkX2dvbGQoc3VtKTtcbiAgICAgICAgICAgIHRoaXMuc2V0X3NlbGwoKTtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIC8vZG91YmxlX3NlbGxfYnV0dG9uX2NsaWNrXG4gICAgb25fZG91YmxlX3NlbGxfYnV0dG9uX2NsaWNrKCkge1xuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fY2xpY2tcIik7XG4gICAgICAgIHZhciBzdW0gPSAwO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuaWNvbl9ncm91cF9ub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgY291bnQgPSB1c2VyX2RhdGEudXNlcl9kYXRhLndhcmVIb3VzZVtpXS5jb3VudDtcbiAgICAgICAgICAgIHZhciBzZWxsID0gY29uZmlnLnBsYW50W2ldLnNlbGw7XG4gICAgICAgICAgICBzdW0gKz0gY291bnQgKiBzZWxsO1xuICAgICAgICB9O1xuICAgICAgICAvL+WmguaenOayoeacieWPr+WNlueahOWImeS4jeiDveWNluWHulxuICAgICAgICBpZiAoc3VtID09IDApIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfcnVsZXNfanMubm9kZSwgXCJub19zZWxsXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hZF9jb250cm9sLnNob3dfdmlkZW9BZChcImRvdWJsZV9zZWxsXCIpO1xuICAgICAgICAgICAgdGhpcy52aWRlb19zdWNjZXMoKTtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIC8v5qOA5rWL6KeG6aKR5piv5ZCm5pKt5pS+5oiQ5YqfXG4gICAgdmlkZW9fc3VjY2VzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0eXBlb2YgKHd4KSAhPSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWRfY29udHJvbC52aWRlb19zdGF0ZSA9PSAxICYmIHRoaXMuYWRfY29udHJvbC52aWRlb190YWcgPT0gXCJkb3VibGVfc2VsbFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRfY29udHJvbC52aWRlb190YWcgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkX2NvbnRyb2wudmlkZW9fc3RhdGUgPSAyO1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3VtID0gMDtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmljb25fZ3JvdXBfbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvdW50ID0gdXNlcl9kYXRhLnVzZXJfZGF0YS53YXJlSG91c2VbaV0uY291bnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VsbCA9IGNvbmZpZy5wbGFudFtpXS5zZWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VtICs9IGNvdW50ICogc2VsbDtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLmljb25fZ3JvdXBfbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS53YXJlSG91c2Vbal0uY291bnQgPSAwO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3J1bGVzX2pzLm5vZGUsIFwiZ29sZFwiLCBzdW0gKiAyKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLmFkZF9nb2xkKHN1bSAqIDIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldF9zZWxsKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZShjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYWRfY29udHJvbC52aWRlb190YWcgPT0gbnVsbCAmJiB0aGlzLmFkX2NvbnRyb2wudmlkZW9fc3RhdGUgPT0gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUoY2FsbGJhY2ssIDAuMik7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICBvbkxvYWQoKSB7XG5cbiAgICB9LFxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9LFxuXG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTtcbiJdfQ==
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxccGV0X3VpLmpzIl0sIm5hbWVzIjpbImNvbmZpZyIsInJlcXVpcmUiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInBldF9jb250ZW50X3ByZWZhYiIsIlByZWZhYiIsImNvbnRlbnRfbm9kZSIsIk5vZGUiLCJpbmlfbm9kZSIsImFkX2NvbnRyb2wiLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwiZ2FtZV9zY2VuZV9qcyIsInNvdW5kX2NvbnRyb2wiLCJzaG93X2Jhbm5lckFkIiwiY3JlYXRlX3BldF9jb250ZW50IiwiYXJyIiwiT2JqZWN0Iiwia2V5cyIsInBldCIsImkiLCJsZW5ndGgiLCJub2RlIiwiaW5zdGFudGlhdGUiLCJwYXJlbnQiLCJ0b3VjaF9leGl0IiwicGxheV9zb3VuZF9lZmZlY3QiLCJoaWRlX2Jhbm5lckFkIiwib25fbm9kZV9raWxsIiwib25Mb2FkIiwic3RhcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsTUFBTSxHQUFHQyxPQUFPLENBQUMsUUFBRCxDQUFwQjs7QUFDQUMsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLGtCQUFrQixFQUFFSixFQUFFLENBQUNLLE1BRGY7QUFFUkMsSUFBQUEsWUFBWSxFQUFFTixFQUFFLENBQUNPO0FBRlQsR0FIUDtBQU9MO0FBQ0FDLEVBQUFBLFFBUkssc0JBUU07QUFDUCxTQUFLQyxVQUFMLEdBQWtCVCxFQUFFLENBQUNVLElBQUgsQ0FBUSxZQUFSLEVBQXNCQyxZQUF0QixDQUFtQyxZQUFuQyxDQUFsQjtBQUNBLFNBQUtDLGFBQUwsR0FBcUJaLEVBQUUsQ0FBQ1UsSUFBSCxDQUFRLFNBQVIsRUFBbUJDLFlBQW5CLENBQWdDLFlBQWhDLENBQXJCO0FBQ0EsU0FBS0UsYUFBTCxHQUFxQmIsRUFBRSxDQUFDVSxJQUFILENBQVEsZUFBUixFQUF5QkMsWUFBekIsQ0FBc0MsZUFBdEMsQ0FBckI7QUFDQSxTQUFLRixVQUFMLENBQWdCSyxhQUFoQjtBQUNILEdBYkk7QUFjTDtBQUNBQyxFQUFBQSxrQkFmSyxnQ0FlZ0I7QUFDakIsUUFBSUMsR0FBRyxHQUFHQyxNQUFNLENBQUNDLElBQVAsQ0FBWXBCLE1BQU0sQ0FBQ3FCLEdBQW5CLENBQVY7O0FBQ0EsU0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHSixHQUFHLENBQUNLLE1BQXhCLEVBQWdDRCxDQUFDLEVBQWpDLEVBQXFDO0FBQ2pDLFVBQUlFLElBQUksR0FBR3RCLEVBQUUsQ0FBQ3VCLFdBQUgsQ0FBZSxLQUFLbkIsa0JBQXBCLENBQVg7QUFDQWtCLE1BQUFBLElBQUksQ0FBQ0UsTUFBTCxHQUFjLEtBQUtsQixZQUFuQjtBQUNBZ0IsTUFBQUEsSUFBSSxDQUFDWCxZQUFMLENBQWtCLGFBQWxCLEVBQWlDSCxRQUFqQyxDQUEwQ1ksQ0FBMUM7QUFDSDs7QUFBQTtBQUNKLEdBdEJJO0FBdUJMO0FBQ0FLLEVBQUFBLFVBeEJLLHdCQXdCUTtBQUNULFNBQUtaLGFBQUwsQ0FBbUJhLGlCQUFuQixDQUFxQyxhQUFyQztBQUNBLFNBQUtqQixVQUFMLENBQWdCa0IsYUFBaEI7QUFDQSxTQUFLZixhQUFMLENBQW1CZ0IsWUFBbkIsQ0FBZ0MsS0FBS04sSUFBckM7QUFDSCxHQTVCSTtBQTZCTE8sRUFBQUEsTUE3Qkssb0JBNkJJLENBRVIsQ0EvQkk7QUFpQ0xDLEVBQUFBLEtBakNLLG1CQWlDRztBQUNKLFNBQUtmLGtCQUFMO0FBQ0gsR0FuQ0ksQ0FxQ0w7O0FBckNLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciBjb25maWcgPSByZXF1aXJlKFwiY29uZmlnXCIpO1xuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgcGV0X2NvbnRlbnRfcHJlZmFiOiBjYy5QcmVmYWIsXG4gICAgICAgIGNvbnRlbnRfbm9kZTogY2MuTm9kZSxcbiAgICB9LFxuICAgIC8v5Yid5aeL5YyW6IqC54K5XG4gICAgaW5pX25vZGUoKSB7XG4gICAgICAgIHRoaXMuYWRfY29udHJvbCA9IGNjLmZpbmQoXCJhZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcImFkX2NvbnRyb2xcIik7XG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfc2NlbmVcIik7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbCA9IGNjLmZpbmQoXCJzb3VuZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcInNvdW5kX2NvbnRyb2xcIik7XG4gICAgICAgIHRoaXMuYWRfY29udHJvbC5zaG93X2Jhbm5lckFkKCk7XG4gICAgfSxcbiAgICAvL+WIm+W7uuWuoOeJqWNvbnRlbnRcbiAgICBjcmVhdGVfcGV0X2NvbnRlbnQoKSB7XG4gICAgICAgIHZhciBhcnIgPSBPYmplY3Qua2V5cyhjb25maWcucGV0KTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5wZXRfY29udGVudF9wcmVmYWIpO1xuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLmNvbnRlbnRfbm9kZTtcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwicGV0X2NvbnRlbnRcIikuaW5pX25vZGUoaSk7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvL+eCueWHu+mAgOWHulxuICAgIHRvdWNoX2V4aXQoKSB7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9leGl0XCIpO1xuICAgICAgICB0aGlzLmFkX2NvbnRyb2wuaGlkZV9iYW5uZXJBZCgpO1xuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMub25fbm9kZV9raWxsKHRoaXMubm9kZSk7XG4gICAgfSxcbiAgICBvbkxvYWQoKSB7XG5cbiAgICB9LFxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlX3BldF9jb250ZW50KCk7XG4gICAgfSxcblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxufSk7Il19
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcc2hvcF9idXlfdWkuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJpY29uX3Nwcml0ZSIsIlNwcml0ZSIsImludHJvZHVjZV9sYWJlbCIsIkxhYmVsIiwiaW50cm9kdWNlMV9sYWJlbCIsImludHJvZHVjZTJfbGFiZWwiLCJpbnRyb2R1Y2UzX2xhYmVsIiwiaW50cm9kdWNlNF9sYWJlbCIsImJ1eV9idXR0b24iLCJCdXR0b24iLCJjb3N0X2xhYmVsIiwicHJpY2VfZGlmZmVyZW5jZV9sYWJlbCIsImhhdmVfaWNvbiIsIk5vZGUiLCJzdGFyNF9pY29uIiwiaW5pX25vZGUiLCJ0eXBlIiwiaW5kZXgiLCJpY29uX2ZyYW1lIiwic291bmRfY29udHJvbCIsImZpbmQiLCJnZXRDb21wb25lbnQiLCJhZF9jb250cm9sIiwiZ2FtZV9zY2VuZV9qcyIsImdhbWVfcnVsZXNfanMiLCJhZF9jYXIiLCJub2RlIiwiYWN0aXZlIiwidXBkYXRlX25vZGUiLCJjcmVhdGVfYWRfY2FyIiwic3ByaXRlRnJhbWUiLCJsZXZlbCIsInVzZXJfZGF0YSIsImNvbmZpZyIsImxhbmQiLCJuZWVkX2xldmVsIiwic3RyaW5nIiwiaGF2ZSIsInByaWNlX2RpZmZlcmVuY2UiLCJjb3N0IiwiZ29sZCIsImludGVyYWN0YWJsZSIsInBsYW50IiwiaW50cm9kdWNlIiwic2VsbCIsImdyb3dfdGltZSIsImV4cCIsIm9uX2J1eV9idXR0b25fY2xpY2siLCJwbGF5X3NvdW5kX2VmZmVjdCIsImFkZF9nb2xkIiwiY3JlYXRlX3RpcHNfdWkiLCJ1cGRhdGFfbGFuZCIsInVwZGF0ZV9zY2hlZHVsZSIsImNhbGxiYWNrIiwic2NoZWR1bGUiLCJ0b3VjaF9leGl0IiwibG9nIiwiZGVzdHJveSIsImhpZGVfYmFubmVyQWQiLCJvbl9ub2RlX2tpbGwiLCJhbGxfY2FwYWNpdHkiLCJza2lsbCIsInN0YXJ0Il0sIm1hcHBpbmdz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S0FBS3pCLEtBQWxCLEVBQXlCc0IsSUFBcEMsQ0FKaUQsQ0FLakQ7O0FBQ0EsY0FBSUQsZ0JBQWdCLEdBQUdDLElBQUksR0FBR0MsSUFBOUIsQ0FOaUQsQ0FPakQ7O0FBQ0EsY0FBSUEsSUFBSSxJQUFJRCxJQUFJLElBQUksSUFBSSxDQUFSLENBQVosSUFBMEJxQixZQUFZLElBQUlyQixJQUExQyxJQUFrREMsSUFBSSxHQUFHRCxJQUE3RCxFQUFtRTtBQUMvRCxpQkFBS2pCLFVBQUwsQ0FBZ0JvQyxhQUFoQjtBQUNBLGlCQUFLakMsTUFBTCxHQUFjLEtBQUtGLGFBQUwsQ0FBbUJNLGFBQW5CLENBQWlDLEtBQUtILElBQXRDLEVBQTRDWSxnQkFBNUMsQ0FBZDtBQUNILFdBSEQsTUFHTyxDQUVOOztBQUFBO0FBQ0osU0FkRCxNQWNPO0FBQ0g7QUFDQTtBQUNIOztBQUNEO0FBekNSOztBQTBDQztBQUdKLEdBeE9JO0FBeU9MO0FBRUF3QixFQUFBQSxLQTNPSyxtQkEyT0c7QUFDSixTQUFLVixlQUFMO0FBQ0gsR0E3T0ksQ0ErT0w7O0FBL09LLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB1c2VyX2RhdGEgZnJvbSBcInVzZXJfZGF0YVwiO1xuaW1wb3J0IGNvbmZpZyBmcm9tIFwiY29uZmlnXCI7XG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBpY29uX3Nwcml0ZTogY2MuU3ByaXRlLFxuICAgICAgICBpbnRyb2R1Y2VfbGFiZWw6IGNjLkxhYmVsLFxuICAgICAgICBpbnRyb2R1Y2UxX2xhYmVsOiBjYy5MYWJlbCxcbiAgICAgICAgaW50cm9kdWNlMl9sYWJlbDogY2MuTGFiZWwsXG4gICAgICAgIGludHJvZHVjZTNfbGFiZWw6IGNjLkxhYmVsLFxuICAgICAgICBpbnRyb2R1Y2U0X2xhYmVsOiBjYy5MYWJlbCxcbiAgICAgICAgYnV5X2J1dHRvbjogY2MuQnV0dG9uLFxuICAgICAgICBjb3N0X2xhYmVsOiBjYy5MYWJlbCxcbiAgICAgICAgcHJpY2VfZGlmZmVyZW5jZV9sYWJlbDogY2MuTGFiZWwsXG4gICAgICAgIGhhdmVfaWNvbjogY2MuTm9kZSxcbiAgICAgICAgc3RhcjRfaWNvbjogY2MuTm9kZSxcbiAgICB9LFxuICAgIGluaV9ub2RlKHR5cGUsIGluZGV4LCBpY29uX2ZyYW1lKSB7XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICAgICAgdGhpcy5pY29uX2ZyYW1lID0gaWNvbl9mcmFtZTtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sID0gY2MuZmluZChcInNvdW5kX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwic291bmRfY29udHJvbFwiKTtcbiAgICAgICAgdGhpcy5hZF9jb250cm9sID0gY2MuZmluZChcImFkX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwiYWRfY29udHJvbFwiKTtcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9zY2VuZVwiKTtcbiAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9ydWxlc1wiKTtcbiAgICAgICAgdGhpcy5hZF9jYXIgPSBudWxsO1xuICAgICAgICAvL+m7mOiupOeKtuaAgVxuICAgICAgICB0aGlzLnByaWNlX2RpZmZlcmVuY2VfbGFiZWwubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLmJ1eV9idXR0b24ubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLnVwZGF0ZV9ub2RlKCk7XG4gICAgICAgIHRoaXMuY3JlYXRlX2FkX2NhcigpO1xuICAgIH0sXG4gICAgdXBkYXRlX25vZGUoKSB7XG4gICAgICAgIHRoaXMuaWNvbl9zcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWU7XG4gICAgICAgIHZhciBsZXZlbCA9IHVzZXJfZGF0YS51c2VyX2RhdGEubGV2ZWw7XG4gICAgICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFwibGFuZFwiOlxuICAgICAgICAgICAgICAgIHRoaXMuaW50cm9kdWNlNF9sYWJlbC5ub2RlLmFjdGl2ZT1mYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXI0X2ljb24uYWN0aXZlPWZhbHNlO1xuICAgICAgICAgICAgICAgIGlmIChsZXZlbCA+PSBjb25maWcubGFuZFt0aGlzLmluZGV4XS5uZWVkX2xldmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIC8v6L6+5Yiw6Kej6ZSB5p2h5Lu2XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW50cm9kdWNlX2xhYmVsLnN0cmluZyA9IFwiQWRkaXRpb25hbCBwbGFudGluZyBhcmVhXCI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW50cm9kdWNlMV9sYWJlbC5zdHJpbmcgPSBcIk1vcmUgYXJlYSB0byBwbGFudGluZ1wiO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmludHJvZHVjZTJfbGFiZWwuc3RyaW5nID0gXCJSZW1lbWJlciB0byB3YXRlclwiO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmludHJvZHVjZTNfbGFiZWwuc3RyaW5nID0gIFwiTGV2ZWwgXCIrY29uZmlnLmxhbmRbdGhpcy5pbmRleF0ubmVlZF9sZXZlbCArXCIgdW5sb2NrXCI7XG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5pbmRleF0uaGF2ZSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL+acquaLpeaciVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmljZV9kaWZmZXJlbmNlID0gY29uZmlnLmxhbmRbdGhpcy5pbmRleF0uY29zdCAtIHVzZXJfZGF0YS51c2VyX2RhdGEuZ29sZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29zdF9sYWJlbC5zdHJpbmcgPSBjb25maWcubGFuZFt0aGlzLmluZGV4XS5jb3N0O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXZlX2ljb24uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkID49IGNvbmZpZy5sYW5kW3RoaXMuaW5kZXhdLmNvc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+mHkeW4gei2s+Wkn1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnV5X2J1dHRvbi5pbnRlcmFjdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJpY2VfZGlmZmVyZW5jZV9sYWJlbC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+mHkeW4geS4jei2s1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnV5X2J1dHRvbi5pbnRlcmFjdGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByaWNlX2RpZmZlcmVuY2VfbGFiZWwuc3RyaW5nID0gXCJOb3QgZW5vdWdoIGdvbGQgY29pbnMsIG5vdCBlbm91Z2hcIiArIHRoaXMucHJpY2VfZGlmZmVyZW5jZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL+W3suaLpeaciVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXZlX2ljb24uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnV5X2J1dHRvbi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmljZV9kaWZmZXJlbmNlX2xhYmVsLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy/mnKrovr7liLDop6PplIHmnaHku7ZcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnRyb2R1Y2VfbGFiZWwuc3RyaW5nID0gXCI/Pz9cIjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnRyb2R1Y2UxX2xhYmVsLnN0cmluZyA9IFwiPz8/XCI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW50cm9kdWNlMl9sYWJlbC5zdHJpbmcgPSBcIj8/P1wiO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmludHJvZHVjZTNfbGFiZWwuc3RyaW5nID0gXCJMZXZlbCBcIitjb25maWcubGFuZFt0aGlzLmluZGV4XS5uZWVkX2xldmVsICtcIiB1bmxvY2tcIjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmljZV9kaWZmZXJlbmNlX2xhYmVsLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29zdF9sYWJlbC5zdHJpbmcgPSBcIj8/P1wiO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1eV9idXR0b24uaW50ZXJhY3RhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGF2ZV9pY29uLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJwbGFudFwiOlxuICAgICAgICAgICAgICAgIHRoaXMuaW50cm9kdWNlNF9sYWJlbC5ub2RlLmFjdGl2ZT10cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhcjRfaWNvbi5hY3RpdmU9dHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAobGV2ZWwgPj0gY29uZmlnLnBsYW50W3RoaXMuaW5kZXhdLm5lZWRfbGV2ZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgLy/ovr7liLDop6PplIHmnaHku7ZcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnRyb2R1Y2VfbGFiZWwuc3RyaW5nID0gY29uZmlnLnBsYW50W3RoaXMuaW5kZXhdLmludHJvZHVjZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnRyb2R1Y2UxX2xhYmVsLnN0cmluZyA9IFwiU2FsZSB2YWx1ZTogXCIgKyBjb25maWcucGxhbnRbdGhpcy5pbmRleF0uc2VsbDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnRyb2R1Y2UyX2xhYmVsLnN0cmluZyA9IFwiTGl2ZXNwYW46IFwiICsgY29uZmlnLnBsYW50W3RoaXMuaW5kZXhdLmdyb3dfdGltZSArIFwic2Vjb25kXCI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW50cm9kdWNlM19sYWJlbC5zdHJpbmcgPSBcIkV4cGVyaWVuY2U6IFwiICsgY29uZmlnLnBsYW50W3RoaXMuaW5kZXhdLmV4cDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnRyb2R1Y2U0X2xhYmVsLnN0cmluZyA9IFwiTGV2ZWwgXCIrY29uZmlnLnBsYW50W3RoaXMuaW5kZXhdLm5lZWRfbGV2ZWwrXCIgdW5sb2NrXCI7XG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLnBsYW50W3RoaXMuaW5kZXhdLmhhdmUgPT0gMCkgeyBcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5pyq5oul5pyJXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByaWNlX2RpZmZlcmVuY2UgPSBjb25maWcucGxhbnRbdGhpcy5pbmRleF0uY29zdCAtIHVzZXJfZGF0YS51c2VyX2RhdGEuZ29sZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29zdF9sYWJlbC5zdHJpbmcgPSBjb25maWcucGxhbnRbdGhpcy5pbmRleF0uY29zdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGF2ZV9pY29uLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEuZ29sZCA+PSBjb25maWcucGxhbnRbdGhpcy5pbmRleF0uY29zdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v6YeR5biB6Laz5aSfXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5idXlfYnV0dG9uLmludGVyYWN0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmljZV9kaWZmZXJlbmNlX2xhYmVsLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v6YeR5biB5LiN6LazXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5idXlfYnV0dG9uLmludGVyYWN0YWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJpY2VfZGlmZmVyZW5jZV9sYWJlbC5zdHJpbmcgPSBcIk5vdCBlbm91Z2ggZ29sZCBjb2lucywgbm90IGVub3VnaFwiICsgdGhpcy5wcmljZV9kaWZmZXJlbmNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5bey5oul5pyJXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhdmVfaWNvbi5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5idXlfYnV0dG9uLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByaWNlX2RpZmZlcmVuY2VfbGFiZWwubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvL+acqui+vuWIsOino+mUgeadoeS7tlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmludHJvZHVjZV9sYWJlbC5zdHJpbmcgPSBcIj8/P1wiO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmludHJvZHVjZTFfbGFiZWwuc3RyaW5nID0gXCI/Pz9cIjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnRyb2R1Y2UyX2xhYmVsLnN0cmluZyA9IFwiPz8/XCI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW50cm9kdWNlM19sYWJlbC5zdHJpbmcgPSBcIj8/P1wiO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmludHJvZHVjZTRfbGFiZWwuc3RyaW5nID0gXCJMZXZlbCBcIitjb25maWcucGxhbnRbdGhpcy5pbmRleF0ubmVlZF9sZXZlbCtcIiB1bmxvY2tcIjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmljZV9kaWZmZXJlbmNlX2xhYmVsLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29zdF9sYWJlbC5zdHJpbmcgPSBcIj8/P1wiO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1eV9idXR0b24uaW50ZXJhY3RhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGF2ZV9pY29uLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvL+i0reS5sOaMiemSruiiq+eCueWHu1xuICAgIG9uX2J1eV9idXR0b25fY2xpY2soKSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFwibGFuZFwiOlxuICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5pbmRleF0uaGF2ZSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvL2p1ZGdlIG1vbmV5XG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQgPj0gY29uZmlnLmxhbmRbdGhpcy5pbmRleF0uY29zdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy/ph5HluIHotrPlpJ9cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9jbGlja1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb3N0ID0gY29uZmlnLmxhbmRbdGhpcy5pbmRleF0uY29zdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcy5hZGRfZ29sZCgtY29zdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbdGhpcy5pbmRleF0uaGF2ZSA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIFwiYnV5X3N1Y2Nlc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5Yi35paw5Zyf5ZywXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMudXBkYXRhX2xhbmQodGhpcy5pbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL+mHkeW4geS4jei2s1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwidW5fY2xpY2tcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIFwibm9fbW9uZXlcIik7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJwbGFudFwiOlxuICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLnBsYW50W3RoaXMuaW5kZXhdLmhhdmUgPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy9qdWRnZSBtb25leVxuICAgICAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5nb2xkID49IGNvbmZpZy5wbGFudFt0aGlzLmluZGV4XS5jb3N0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL+mHkeW4gei2s+Wkn1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvc3QgPSBjb25maWcucGxhbnRbdGhpcy5pbmRleF0uY29zdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcy5hZGRfZ29sZCgtY29zdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnBsYW50W3RoaXMuaW5kZXhdLmhhdmUgPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9zY2VuZV9qcy5ub2RlLCBcImJ1eV9zdWNjZXNcIik7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL+mHkeW4geS4jei2s1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwidW5fY2xpY2tcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIFwibm9fbW9uZXlcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnVwZGF0ZV9ub2RlKCk7XG4gICAgfSxcbiAgICAvL+abtOaWsHNjaGVkdWxlXG4gICAgdXBkYXRlX3NjaGVkdWxlKCkge1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZV9ub2RlKCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2NoZWR1bGUoY2FsbGJhY2ssIDEpXG4gICAgfSxcbiAgICAvL3RvdWNoIGV4aXRcbiAgICB0b3VjaF9leGl0KCkge1xuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fZXhpdFwiKTtcbiAgICAgICAgaWYgKHRoaXMuYWRfY2FyICE9PSBudWxsKSB7XG4gICAgICAgICAgICBjYy5sb2coXCJhZF9jYXIgZGVzdHJveVwiKVxuICAgICAgICAgICAgdGhpcy5hZF9jYXIuZGVzdHJveSgpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFkX2NvbnRyb2wuaGlkZV9iYW5uZXJBZCgpO1xuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMub25fbm9kZV9raWxsKHRoaXMubm9kZSk7XG4gICAgfSxcbiAgICBjcmVhdGVfYWRfY2FyKCkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xuICAgICAgICAgICAgY2FzZSBcImxhbmRcIjpcbiAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW3RoaXMuaW5kZXhdLmhhdmUgIT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAvL+acquaLpeaciei/meWdl+WcsFxuICAgICAgICAgICAgICAgICAgICB2YXIgZ29sZCA9IHVzZXJfZGF0YS51c2VyX2RhdGEuZ29sZDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFsbF9jYXBhY2l0eSA9IDUwMCAqIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxbXCJnb2xkX21heFwiXSArIDUwMDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvc3QgPSBjb25maWcubGFuZFt0aGlzLmluZGV4XS5jb3N0O1xuICAgICAgICAgICAgICAgICAgICAvL+W3ruS7t1xuICAgICAgICAgICAgICAgICAgICB2YXIgcHJpY2VfZGlmZmVyZW5jZSA9IGNvc3QgLSBnb2xkO1xuICAgICAgICAgICAgICAgICAgICAvL+Wkp+S6jjQvNSzkuJTog73lpJ/mi6XmnInvvIzkuJTph5HluIHkuI3otrNcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdvbGQgPj0gY29zdCAqICg0IC8gNSkgJiYgYWxsX2NhcGFjaXR5ID49IGNvc3QgJiYgZ29sZCA8IGNvc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRfY29udHJvbC5oaWRlX2Jhbm5lckFkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkX2NhciA9IHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfYWRfY2FyKHRoaXMubm9kZSwgcHJpY2VfZGlmZmVyZW5jZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvL+aLpeaciei/meWdl+WcsFxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwicGxhbnRcIjpcbiAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5wbGFudFt0aGlzLmluZGV4XS5oYXZlICE9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgLy/mnKrmi6XmnInov5nkuKrmpI3nialcbiAgICAgICAgICAgICAgICAgICAgdmFyIGdvbGQgPSB1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQ7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhbGxfY2FwYWNpdHkgPSA1MDAgKiB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1wiZ29sZF9tYXhcIl0gKyA1MDA7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb3N0ID0gY29uZmlnLnBsYW50W3RoaXMuaW5kZXhdLmNvc3Q7XG4gICAgICAgICAgICAgICAgICAgIC8v5beu5Lu3XG4gICAgICAgICAgICAgICAgICAgIHZhciBwcmljZV9kaWZmZXJlbmNlID0gY29zdCAtIGdvbGQ7XG4gICAgICAgICAgICAgICAgICAgIC8v5aSn5LqONC81LOS4lOiDveWkn+aLpeacie+8jOS4lOmHkeW4geS4jei2s1xuICAgICAgICAgICAgICAgICAgICBpZiAoZ29sZCA+PSBjb3N0ICogKDQgLyA1KSAmJiBhbGxfY2FwYWNpdHkgPj0gY29zdCAmJiBnb2xkIDwgY29zdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZF9jb250cm9sLmhpZGVfYmFubmVyQWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRfY2FyID0gdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9hZF9jYXIodGhpcy5ub2RlLCBwcmljZV9kaWZmZXJlbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8v5oul5pyJ6L+Z5Liq5qSN54mpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH07XG5cblxuICAgIH0sXG4gICAgLy8gb25Mb2FkICgpIHt9LFxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMudXBkYXRlX3NjaGVkdWxlKCk7XG4gICAgfSxcblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxufSk7XG4iXX0=
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
        this.introduce_label.string = "Max gold+" + (500 * gold_max + 500);
        this.level_label.string = "lv: " + gold_max;
        this.progress.progress = gold_max / 100;

        if (gold_max >= 100) {
          this.button_frame.node.active = false;
        } else this.button_frame.node.active = true;

        break;

      case 1:
        this.icon_frame.spriteFrame = this.icon_frame_arr[this.skill_index];
        this.name_frame.spriteFrame = this.name_frame_arr[this.skill_index];
        this.button_frame.spriteFrame = this.button_frame_arr[0];
        this.introduce_label.string = "Harvest plants faster " + (speed_the_cut + 1) + "%";
        this.level_label.string = "lv: " + speed_the_cut;
        this.progress.progress = speed_the_cut / 100;

        if (speed_the_cut >= 100) {
          this.button_frame.node.active = false;
        } else this.button_frame.node.active = true;

        break;

      case 2:
        this.icon_frame.spriteFrame = this.icon_frame_arr[this.skill_index];
        this.name_frame.spriteFrame = this.name_frame_arr[this.skill_index];
        this.button_frame.spriteFrame = this.button_frame_arr[0];
        this.introduce_label.string = "Plant growth consumes less resource " + (water_saving + 1) + "%";
        this.level_label.string = "lv: " + water_saving;
        this.progress.progress = water_saving / 100;

        if (water_saving >= 100) {
          this.button_frame.node.active = false;
        } else this.button_frame.node.active = true;

        break;

      case 3:
        this.icon_frame.spriteFrame = this.icon_frame_arr[this.skill_index];
        this.name_frame.spriteFrame = this.name_frame_arr[this.skill_index];
        this.button_frame.spriteFrame = this.button_frame_arr[0];
        this.introduce_label.string = "Faster planting " + (tool_improve + 1) + "%";
        this.level_label.string = "lv: " + tool_improve;
        this.progress.progress = tool_improve / 100;

        if (tool_improve >= 100) {
          this.button_frame.node.active = false;
        } else this.button_frame.node.active = true;

        break;

      case 4:
        this.icon_frame.spriteFrame = this.icon_frame_arr[this.skill_index];
        this.name_frame.spriteFrame = this.name_frame_arr[this.skill_index];
        this.button_frame.spriteFrame = this.button_frame_arr[0];
        this.introduce_label.string = "Extend worker hours " + (labor_contract + 1) + " \nseconds";
        this.level_label.string = "lv: " + labor_contract;
        this.progress.progress = labor_contract / 100;

        if (labor_contract >= 100) {
          this.button_frame.node.active = false;
        } else this.button_frame.node.active = true;

        break;

      case 5:
        this.icon_frame.spriteFrame = this.icon_frame_arr[this.skill_index];
        this.name_frame.spriteFrame = this.name_frame_arr[this.skill_index];
        this.button_frame.spriteFrame = this.button_frame_arr[0];
        this.introduce_label.string = "Extra every 5 minutes " + (offline_profit + 1) + " \ngold";
        this.level_label.string = "lv: " + offline_profit;
        this.progress.progress = offline_profit / 100;

        if (offline_profit >= 100) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcc2tpbGxfY29udGVudC5qcyJdLCJuYW1lcyI6WyJ1c2VyX2RhdGEiLCJyZXF1aXJlIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJuYW1lX2ZyYW1lIiwiU3ByaXRlIiwiaWNvbl9mcmFtZSIsImJ1dHRvbl9mcmFtZSIsImxldmVsX2xhYmVsIiwiTGFiZWwiLCJpbnRyb2R1Y2VfbGFiZWwiLCJwcm9ncmVzcyIsIlByb2dyZXNzQmFyIiwibmFtZV9mcmFtZV9hcnIiLCJTcHJpdGVGcmFtZSIsImljb25fZnJhbWVfYXJyIiwiYnV0dG9uX2ZyYW1lX2FyciIsImluaV9ub2RlIiwic2tpbGxfaW5kZXgiLCJnYW1lX3NjZW5lX2pzIiwiZmluZCIsImdldENvbXBvbmVudCIsImdhbWVfcnVsZXNfanMiLCJzb3VuZF9jb250cm9sIiwic2V0X2NvbnRlbnQiLCJnb2xkX21heCIsInNraWxsIiwic3BlZWRfdGhlX2N1dCIsIndhdGVyX3NhdmluZyIsInRvb2xfaW1wcm92ZSIsImxhYm9yX2NvbnRyYWN0Iiwib2ZmbGluZV9wcm9maXQiLCJzcHJpdGVGcmFtZSIsInN0cmluZyIsIm5vZGUiLCJhY3RpdmUiLCJ1cGRhdGVfYnV0dG9uIiwic2tpbGxfcG9pbnQiLCJCdXR0b24iLCJpbnRlcmFjdGFibGUiLCJjYWxsYmFjayIsImkiLCJzY2hlZHVsZSIsIm9uX2J1dHRvbl9jbGljayIsInNldF9nb2xkX3Byb2dyZXNzIiwicGxheV9zb3VuZF9lZmZlY3QiLCJjcmVhdGVfdGlwc191aSIsIm9uTG9hZCIsInN0YXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLFNBQVMsR0FBR0MsT0FBTyxDQUFDLFdBQUQsQ0FBdkI7O0FBQ0FDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxVQUFV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S0xDLEVBQUFBLEtBdktLLG1CQXVLRztBQUNKLFNBQUtaLGFBQUw7QUFDSCxHQXpLSSxDQTJLTDs7QUEzS0ssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHVzZXJfZGF0YSA9IHJlcXVpcmUoXCJ1c2VyX2RhdGFcIik7XG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBuYW1lX2ZyYW1lOiBjYy5TcHJpdGUsXG4gICAgICAgIGljb25fZnJhbWU6IGNjLlNwcml0ZSxcbiAgICAgICAgYnV0dG9uX2ZyYW1lOiBjYy5TcHJpdGUsXG4gICAgICAgIGxldmVsX2xhYmVsOiBjYy5MYWJlbCxcbiAgICAgICAgaW50cm9kdWNlX2xhYmVsOiBjYy5MYWJlbCxcbiAgICAgICAgcHJvZ3Jlc3M6IGNjLlByb2dyZXNzQmFyLFxuICAgICAgICBuYW1lX2ZyYW1lX2FycjogW2NjLlNwcml0ZUZyYW1lXSxcbiAgICAgICAgaWNvbl9mcmFtZV9hcnI6IFtjYy5TcHJpdGVGcmFtZV0sXG4gICAgICAgIGJ1dHRvbl9mcmFtZV9hcnI6IFtjYy5TcHJpdGVGcmFtZV0sXG4gICAgfSxcblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuICAgIGluaV9ub2RlOiBmdW5jdGlvbiAoc2tpbGxfaW5kZXgpIHtcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9zY2VuZVwiKTtcbiAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9ydWxlc1wiKTtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sID0gY2MuZmluZChcInNvdW5kX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwic291bmRfY29udHJvbFwiKTtcbiAgICAgICAgdGhpcy5za2lsbF9pbmRleCA9IHNraWxsX2luZGV4O1xuICAgICAgICB0aGlzLnNldF9jb250ZW50KCk7XG4gICAgfSxcbiAgICBzZXRfY29udGVudDogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZ29sZF9tYXggPSB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1wiZ29sZF9tYXhcIl07XG4gICAgICAgIHZhciBzcGVlZF90aGVfY3V0ID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbFtcInNwZWVkX3RoZV9jdXRcIl07XG4gICAgICAgIHZhciB3YXRlcl9zYXZpbmcgPSB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1wid2F0ZXJfc2F2aW5nXCJdO1xuICAgICAgICB2YXIgdG9vbF9pbXByb3ZlID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbFtcInRvb2xfaW1wcm92ZVwiXTtcbiAgICAgICAgdmFyIGxhYm9yX2NvbnRyYWN0ID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbFtcImxhYm9yX2NvbnRyYWN0XCJdO1xuICAgICAgICB2YXIgb2ZmbGluZV9wcm9maXQgPSB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1wib2ZmbGluZV9wcm9maXRcIl07XG4gICAgICAgIHN3aXRjaCAodGhpcy5za2lsbF9pbmRleCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbdGhpcy5za2lsbF9pbmRleF07XG4gICAgICAgICAgICAgICAgdGhpcy5uYW1lX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5uYW1lX2ZyYW1lX2Fyclt0aGlzLnNraWxsX2luZGV4XTtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuYnV0dG9uX2ZyYW1lX2FyclswXTtcbiAgICAgICAgICAgICAgICB0aGlzLmludHJvZHVjZV9sYWJlbC5zdHJpbmcgPSBcIk1heCBnb2xkK1wiICsgKDUwMCAqIGdvbGRfbWF4ICsgNTAwKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxldmVsX2xhYmVsLnN0cmluZyA9IFwibHY6IFwiICsgZ29sZF9tYXg7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzcy5wcm9ncmVzcyA9IGdvbGRfbWF4IC8gMTAwO1xuICAgICAgICAgICAgICAgIGlmIChnb2xkX21heCA+PSAxMDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idXR0b25fZnJhbWUubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB0aGlzLmJ1dHRvbl9mcmFtZS5ub2RlLmFjdGl2ZT10cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbdGhpcy5za2lsbF9pbmRleF07XG4gICAgICAgICAgICAgICAgdGhpcy5uYW1lX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5uYW1lX2ZyYW1lX2Fyclt0aGlzLnNraWxsX2luZGV4XTtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuYnV0dG9uX2ZyYW1lX2FyclswXTtcbiAgICAgICAgICAgICAgICB0aGlzLmludHJvZHVjZV9sYWJlbC5zdHJpbmcgPSBcIkhhcnZlc3QgcGxhbnRzIGZhc3RlciBcIiArIChzcGVlZF90aGVfY3V0ICsgMSkgKyBcIiVcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmxldmVsX2xhYmVsLnN0cmluZyA9IFwibHY6IFwiICsgc3BlZWRfdGhlX2N1dDtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzLnByb2dyZXNzID0gc3BlZWRfdGhlX2N1dCAvIDEwMDtcbiAgICAgICAgICAgICAgICBpZiAoc3BlZWRfdGhlX2N1dCA+PSAxMDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idXR0b25fZnJhbWUubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB0aGlzLmJ1dHRvbl9mcmFtZS5ub2RlLmFjdGl2ZT10cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbdGhpcy5za2lsbF9pbmRleF07XG4gICAgICAgICAgICAgICAgdGhpcy5uYW1lX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5uYW1lX2ZyYW1lX2Fyclt0aGlzLnNraWxsX2luZGV4XTtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuYnV0dG9uX2ZyYW1lX2FyclswXTtcbiAgICAgICAgICAgICAgICB0aGlzLmludHJvZHVjZV9sYWJlbC5zdHJpbmcgPSBcIlBsYW50IGdyb3d0aCBjb25zdW1lcyBsZXNzIHJlc291cmNlIFwiICsgKHdhdGVyX3NhdmluZyArIDEpICsgXCIlXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbF9sYWJlbC5zdHJpbmcgPSBcImx2OiBcIiArIHdhdGVyX3NhdmluZztcbiAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzLnByb2dyZXNzID0gd2F0ZXJfc2F2aW5nIC8gMTAwO1xuICAgICAgICAgICAgICAgIGlmICh3YXRlcl9zYXZpbmcgPj0gMTAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uX2ZyYW1lLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgdGhpcy5idXR0b25fZnJhbWUubm9kZS5hY3RpdmU9dHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyW3RoaXMuc2tpbGxfaW5kZXhdO1xuICAgICAgICAgICAgICAgIHRoaXMubmFtZV9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMubmFtZV9mcmFtZV9hcnJbdGhpcy5za2lsbF9pbmRleF07XG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmJ1dHRvbl9mcmFtZV9hcnJbMF07XG4gICAgICAgICAgICAgICAgdGhpcy5pbnRyb2R1Y2VfbGFiZWwuc3RyaW5nID0gXCJGYXN0ZXIgcGxhbnRpbmcgXCIgKyAodG9vbF9pbXByb3ZlICsgMSkgKyBcIiVcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmxldmVsX2xhYmVsLnN0cmluZyA9IFwibHY6IFwiICsgdG9vbF9pbXByb3ZlO1xuICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3MucHJvZ3Jlc3MgPSB0b29sX2ltcHJvdmUgLyAxMDA7XG4gICAgICAgICAgICAgICAgaWYgKHRvb2xfaW1wcm92ZSA+PSAxMDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idXR0b25fZnJhbWUubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB0aGlzLmJ1dHRvbl9mcmFtZS5ub2RlLmFjdGl2ZT10cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbdGhpcy5za2lsbF9pbmRleF07XG4gICAgICAgICAgICAgICAgdGhpcy5uYW1lX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5uYW1lX2ZyYW1lX2Fyclt0aGlzLnNraWxsX2luZGV4XTtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuYnV0dG9uX2ZyYW1lX2FyclswXTtcbiAgICAgICAgICAgICAgICB0aGlzLmludHJvZHVjZV9sYWJlbC5zdHJpbmcgPSBcIkV4dGVuZCB3b3JrZXIgaG91cnMgXCIgKyAobGFib3JfY29udHJhY3QgKyAxKSArIFwiIFxcbnNlY29uZHNcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmxldmVsX2xhYmVsLnN0cmluZyA9IFwibHY6IFwiICsgbGFib3JfY29udHJhY3Q7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzcy5wcm9ncmVzcyA9IGxhYm9yX2NvbnRyYWN0IC8gMTAwO1xuICAgICAgICAgICAgICAgIGlmIChsYWJvcl9jb250cmFjdCA+PSAxMDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idXR0b25fZnJhbWUubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB0aGlzLmJ1dHRvbl9mcmFtZS5ub2RlLmFjdGl2ZT10cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbdGhpcy5za2lsbF9pbmRleF07XG4gICAgICAgICAgICAgICAgdGhpcy5uYW1lX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5uYW1lX2ZyYW1lX2Fyclt0aGlzLnNraWxsX2luZGV4XTtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuYnV0dG9uX2ZyYW1lX2FyclswXTtcbiAgICAgICAgICAgICAgICB0aGlzLmludHJvZHVjZV9sYWJlbC5zdHJpbmcgPSBcIkV4dHJhIGV2ZXJ5IDUgbWludXRlcyBcIiArIChvZmZsaW5lX3Byb2ZpdCArIDEpICsgXCIgXFxuZ29sZFwiO1xuICAgICAgICAgICAgICAgIHRoaXMubGV2ZWxfbGFiZWwuc3RyaW5nID0gXCJsdjogXCIgKyBvZmZsaW5lX3Byb2ZpdDtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzLnByb2dyZXNzID0gb2ZmbGluZV9wcm9maXQgLyAxMDA7XG4gICAgICAgICAgICAgICAgaWYgKG9mZmxpbmVfcHJvZml0ID49IDEwMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbl9mcmFtZS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHRoaXMuYnV0dG9uX2ZyYW1lLm5vZGUuYWN0aXZlPXRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIC8v5Yi35pawYnV0dG9uXG4gICAgdXBkYXRlX2J1dHRvbigpIHtcbiAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxfcG9pbnQgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmJ1dHRvbl9mcmFtZS5ub2RlLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmJ1dHRvbl9mcmFtZS5ub2RlLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbF9wb2ludCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbl9mcmFtZS5ub2RlLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uX2ZyYW1lLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZm9yKGxldCBpID0wOyBpPDY7IGkrKylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuc2NoZWR1bGUoY2FsbGJhY2ssIDAuNSk7XG4gICAgfSxcbiAgICBvbl9idXR0b25fY2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxfcG9pbnQgPj0gMSkge1xuICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbF9wb2ludC0tO1xuICAgICAgICAgICAgc3dpdGNoICh0aGlzLnNraWxsX2luZGV4KSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1wiZ29sZF9tYXhcIl0rKztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLnNldF9nb2xkX3Byb2dyZXNzKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbFtcInNwZWVkX3RoZV9jdXRcIl0rKztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1wid2F0ZXJfc2F2aW5nXCJdKys7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbFtcInRvb2xfaW1wcm92ZVwiXSsrO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxbXCJsYWJvcl9jb250cmFjdFwiXSsrO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxbXCJvZmZsaW5lX3Byb2ZpdFwiXSsrO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLnNldF9jb250ZW50KCk7XG4gICAgICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fY2xpY2tcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJ1bl9jbGlja1wiKTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfcnVsZXNfanMubm9kZSwgXCJub19za2lsbF9wb2ludFwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfTtcblxuICAgIH0sXG4gICAgb25Mb2FkKCkge1xuXG5cbiAgICB9LFxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMudXBkYXRlX2J1dHRvbigpO1xuICAgIH0sXG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcbn0pO1xuIl19
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
    this.update_content();
    this.update_schedule();
  },
  update_schedule: function update_schedule() {
    this.schedule(this.update_content, 0.5);
  },
  //刷新数据
  update_content: function update_content() {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcc2hvcF9jb250ZW50LmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwibmFtZV9sYWJlbCIsIkxhYmVsIiwiY29zdF9sYWJlbCIsIm5lZWRfbGV2ZWxfbGFiZWwiLCJnb2xkX2ljb25fbm9kZSIsIk5vZGUiLCJwbGFudF9pY29uX2ZyYW1lX2FyciIsIlNwcml0ZUZyYW1lIiwibGFuZF9mcmFtZSIsImljb25fc3ByaXRlIiwiU3ByaXRlIiwiaGF2ZV9pY29uX25vZGUiLCJidXR0b25fdGlwc19ub2RlIiwiaW5pX25vZGUiLCJ0eXBlIiwiaW5kZXgiLCJnYW1lX3NjZW5lX2pzIiwiZmluZCIsImdldENvbXBvbmVudCIsImdhbWVfcnVsZXNfanMiLCJzb3VuZF9jb250cm9sIiwiYWN0aXZlIiwidXBkYXRlX2NvbnRlbnQiLCJ1cGRhdGVfc2NoZWR1bGUiLCJzY2hlZHVsZSIsImdvbGQiLCJ1c2VyX2RhdGEiLCJsZXZlbCIsInN0cmluZyIsImNvbmZpZyIsImxhbmQiLCJuYW1lIiwic3ByaXRlRnJhbWUiLCJoYXZlIiwibm9kZSIsIm5lZWRfbGV2ZWwiLCJjb3N0IiwicGxhbnQiLCJvbl9idXR0b25fY2xpY2siLCJwbGF5X3NvdW5kX2VmZmVjdCIsImNyZWF0ZV9zaG9wX2J1eV91aSIsInN0YXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7O0FBQ0FBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxVQUFVLEVBQUVKLEVBQUUsQ0FBQ0ssS0FEUDtBQUVSQyxJQUFBQSxVQUFVLEVBQUVOLEVBQUUsQ0FBQ0ssS0FGUDtBQUdSRSxJQUFBQSxnQkFBZ0IsRUFBRVAsRUFBRSxDQUFDSyxLQUhiO0FBSVJHLElBQUFBLGNBQWMsRUFBRVIsRUFBRSxDQUFD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QVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB1c2VyX2RhdGEgZnJvbSBcInVzZXJfZGF0YVwiO1xuaW1wb3J0IGNvbmZpZyBmcm9tIFwiY29uZmlnXCI7XG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBuYW1lX2xhYmVsOiBjYy5MYWJlbCxcbiAgICAgICAgY29zdF9sYWJlbDogY2MuTGFiZWwsXG4gICAgICAgIG5lZWRfbGV2ZWxfbGFiZWw6IGNjLkxhYmVsLFxuICAgICAgICBnb2xkX2ljb25fbm9kZTogY2MuTm9kZSxcbiAgICAgICAgcGxhbnRfaWNvbl9mcmFtZV9hcnI6IFtjYy5TcHJpdGVGcmFtZV0sXG4gICAgICAgIGxhbmRfZnJhbWU6IGNjLlNwcml0ZUZyYW1lLFxuICAgICAgICBpY29uX3Nwcml0ZTogY2MuU3ByaXRlLFxuICAgICAgICBoYXZlX2ljb25fbm9kZTogY2MuTm9kZSxcbiAgICAgICAgYnV0dG9uX3RpcHNfbm9kZTogY2MuTm9kZSxcbiAgICB9LFxuICAgIC8v5Yid5aeL5YyWXG4gICAgaW5pX25vZGUodHlwZSwgaW5kZXgpIHtcbiAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJnYW1lX3NjZW5lXCIpO1xuICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJnYW1lX3J1bGVzXCIpO1xuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wgPSBjYy5maW5kKFwic291bmRfY29udHJvbFwiKS5nZXRDb21wb25lbnQoXCJzb3VuZF9jb250cm9sXCIpO1xuICAgICAgICB0aGlzLmhhdmVfaWNvbl9ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmJ1dHRvbl90aXBzX25vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMudXBkYXRlX2NvbnRlbnQoKTtcbiAgICAgICAgdGhpcy51cGRhdGVfc2NoZWR1bGUoKTtcbiAgICB9LFxuICAgIHVwZGF0ZV9zY2hlZHVsZSgpIHtcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLnVwZGF0ZV9jb250ZW50LCAwLjUpO1xuICAgIH0sXG4gICAgLy/liLfmlrDmlbDmja5cbiAgICB1cGRhdGVfY29udGVudCgpIHtcbiAgICAgICAgdmFyIGdvbGQgPSB1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQ7XG4gICAgICAgIHZhciBsZXZlbCA9IHVzZXJfZGF0YS51c2VyX2RhdGEubGV2ZWw7XG4gICAgICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFwibGFuZFwiOlxuICAgICAgICAgICAgICAgIHRoaXMubmFtZV9sYWJlbC5zdHJpbmcgPSBjb25maWcubGFuZFt0aGlzLmluZGV4XS5uYW1lO1xuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9zcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLmxhbmRfZnJhbWU7XG4gICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFt0aGlzLmluZGV4XS5oYXZlID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idXR0b25fdGlwc19ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvc3RfbGFiZWwubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXZlX2ljb25fbm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5lZWRfbGV2ZWxfbGFiZWwubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nb2xkX2ljb25fbm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5lZWRfbGV2ZWxfbGFiZWwubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdvbGRfaWNvbl9ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmVlZF9sZXZlbF9sYWJlbC5zdHJpbmcgPSBcIkxldmVsIFwiICsgY29uZmlnLmxhbmRbdGhpcy5pbmRleF0ubmVlZF9sZXZlbCArIFwiIHRvIHVubG9ja1wiO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChsZXZlbCA+PSBjb25maWcubGFuZFt0aGlzLmluZGV4XS5uZWVkX2xldmVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvc3RfbGFiZWwuc3RyaW5nID0gY29uZmlnLmxhbmRbdGhpcy5pbmRleF0uY29zdDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29zdF9sYWJlbC5zdHJpbmcgPSBcIj8/P1wiO1xuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIC8v5Y+v5Lul6LSt5Lmw57uZ5LiO5o+Q56S6XG4gICAgICAgICAgICAgICAgICAgIGlmIChsZXZlbCA+PSBjb25maWcubGFuZFt0aGlzLmluZGV4XS5uZWVkX2xldmVsICYmIGdvbGQgPj0gY29uZmlnLmxhbmRbdGhpcy5pbmRleF0uY29zdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5idXR0b25fdGlwc19ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbl90aXBzX25vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJwbGFudFwiOlxuICAgICAgICAgICAgICAgIHRoaXMubmFtZV9sYWJlbC5zdHJpbmcgPSBjb25maWcucGxhbnRbdGhpcy5pbmRleF0ubmFtZTtcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fc3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5wbGFudF9pY29uX2ZyYW1lX2Fyclt0aGlzLmluZGV4XTtcbiAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5wbGFudFt0aGlzLmluZGV4XS5oYXZlID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idXR0b25fdGlwc19ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvc3RfbGFiZWwubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXZlX2ljb25fbm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5lZWRfbGV2ZWxfbGFiZWwubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nb2xkX2ljb25fbm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdvbGRfaWNvbl9ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmVlZF9sZXZlbF9sYWJlbC5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmVlZF9sZXZlbF9sYWJlbC5zdHJpbmcgPSBcIk5lZWQgXCIgKyBjb25maWcucGxhbnRbdGhpcy5pbmRleF0ubmVlZF9sZXZlbCArIFwiIGxldmVsIHVubG9ja1wiO1xuXG4gICAgICAgICAgICAgICAgICAgIC8v562J57qn5ruh6Laz5pi+56S66YeR5biB5raI6ICXXG4gICAgICAgICAgICAgICAgICAgIGlmIChsZXZlbCA+PSBjb25maWcucGxhbnRbdGhpcy5pbmRleF0ubmVlZF9sZXZlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb3N0X2xhYmVsLnN0cmluZyA9IGNvbmZpZy5wbGFudFt0aGlzLmluZGV4XS5jb3N0O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb3N0X2xhYmVsLnN0cmluZyA9IFwiPz8/XCI7XG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgLy/lj6/ku6XotK3kubDnu5nkuI7mj5DnpLpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxldmVsID49IGNvbmZpZy5wbGFudFt0aGlzLmluZGV4XS5uZWVkX2xldmVsICYmIGdvbGQgPj0gY29uZmlnLnBsYW50W3RoaXMuaW5kZXhdLmNvc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uX3RpcHNfbm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5idXR0b25fdGlwc19ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIG9uX2J1dHRvbl9jbGljaygpIHtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3Nob3BfYnV5X3VpKHRoaXMudHlwZSwgdGhpcy5pbmRleCwgdGhpcy5pY29uX3Nwcml0ZS5zcHJpdGVGcmFtZSk7XG4gICAgfSxcbiAgICAvLyBvbkxvYWQgKCkge30sXG5cbiAgICBzdGFydCgpIHtcblxuICAgIH0sXG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcbn0pO1xuIl19
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcc2hvcF91aS5qcyJdLCJuYW1lcyI6WyJ1c2VyX2RhdGEiLCJyZXF1aXJlIiwiY29uZmlnIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJzY3JvbGxWaWV3X2FycmF5IiwiTm9kZSIsInNob3BfY29udGVudF9wcmVmYWIiLCJQcmVmYWIiLCJjb250ZW50X2FycmF5IiwidGFiX3NlbGVjdCIsImUiLCJpbmRleCIsInNvdW5kX2NvbnRyb2wiLCJwbGF5X3NvdW5kX2VmZmVjdCIsImkiLCJsZW5ndGgiLCJhY3RpdmUiLCJpbmlfbm9kZSIsImdhbWVfc2NlbmVfanMiLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwiZ2FtZV9ydWxlc19qcyIsImFkX2NvbnRyb2wiLCJzaG93X2Jhbm5lckFkIiwiY3JlYXRlX3Nob3BfY29udGVudCIsIm5vZGUiLCJhcnIiLCJPYmplY3QiLCJrZXlzIiwibGFuZCIsImoiLCJpbnN0YW50aWF0ZSIsInBhcmVudCIsInBsYW50IiwidG91Y2hfZXhpdCIsImhpZGVfYmFubmVyQWQiLCJvbl9ub2RlX2tpbGwiLCJzdGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxTQUFTLEdBQUdDLE9BQU8sQ0FBQyxXQUFELENBQXZCOztBQUNBLElBQUlDLE1BQU0sR0FBR0QsT0FBTyxDQUFDLFFBQUQsQ0FBcEI7O0FBQ0FFLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxnQkFBZ0IsRUFBRSxDQUFDSixFQUFFLENBQUNLLElBQUosQ0FEVjtBQUVSQyxJQUFBQSxtQkFBbUIsRUFBRU4sRUFBRSxDQUFDTyxNQUZoQjtBQUdSQyxJQUFBQSxhQUFhLEVBQUUsQ0FBQ1IsRUFBRSxDQUFDSyxJQUFKO0FBSFAsR0FIUDtBQVFMO0FBQ0FJLEVBQUFBLFVBVEssc0JBU01D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aUJBQW5CLENBQXFDLGFBQXJDO0FBQ0EsU0FBS1MsVUFBTCxDQUFnQmEsYUFBaEI7QUFDQSxTQUFLakIsYUFBTCxDQUFtQmtCLFlBQW5CLENBQWdDLEtBQUtYLElBQXJDO0FBQ0gsR0F4REk7QUF5REw7QUFFQVksRUFBQUEsS0EzREssbUJBMkRHO0FBQ0osU0FBS2IsbUJBQUw7QUFDSCxHQTdESSxDQStETDs7QUEvREssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHVzZXJfZGF0YSA9IHJlcXVpcmUoXCJ1c2VyX2RhdGFcIik7XG52YXIgY29uZmlnID0gcmVxdWlyZShcImNvbmZpZ1wiKTtcbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHNjcm9sbFZpZXdfYXJyYXk6IFtjYy5Ob2RlXSxcbiAgICAgICAgc2hvcF9jb250ZW50X3ByZWZhYjogY2MuUHJlZmFiLFxuICAgICAgICBjb250ZW50X2FycmF5OiBbY2MuTm9kZV0sXG4gICAgfSxcbiAgICAvL+mAiemhueWNoeWIh+aNolxuICAgIHRhYl9zZWxlY3QoZSwgaW5kZXgpIHtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuc2Nyb2xsVmlld19hcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGkgPT0gaW5kZXgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbFZpZXdfYXJyYXlbaV0uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxWaWV3X2FycmF5W2ldLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIC8v5Yid5aeL5YyW6IqC54K5XG4gICAgaW5pX25vZGUoKSB7XG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfc2NlbmVcIik7XG4gICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfcnVsZXNcIik7XG4gICAgICAgIHRoaXMuYWRfY29udHJvbCA9IGNjLmZpbmQoXCJhZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcImFkX2NvbnRyb2xcIik7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbCA9IGNjLmZpbmQoXCJzb3VuZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcInNvdW5kX2NvbnRyb2xcIik7XG4gICAgICAgIHRoaXMuYWRfY29udHJvbC5zaG93X2Jhbm5lckFkKCk7XG4gICAgfSxcbiAgICBjcmVhdGVfc2hvcF9jb250ZW50KCkge1xuICAgICAgICB2YXIgbm9kZSA9IG51bGw7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zY3JvbGxWaWV3X2FycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGkpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgIC8v5Yib5bu6bGFuZFxuICAgICAgICAgICAgICAgICAgICB2YXIgYXJyID0gT2JqZWN0LmtleXMoY29uZmlnLmxhbmQpO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGFyci5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuc2hvcF9jb250ZW50X3ByZWZhYilcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5jb250ZW50X2FycmF5W2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJzaG9wX2NvbnRlbnRcIikuaW5pX25vZGUoXCJsYW5kXCIsIGopO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgLy/liJvlu7pwbGFudFxuICAgICAgICAgICAgICAgICAgICB2YXIgYXJyID0gT2JqZWN0LmtleXMoY29uZmlnLnBsYW50KTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBhcnIubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnNob3BfY29udGVudF9wcmVmYWIpXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMuY29udGVudF9hcnJheVtpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwic2hvcF9jb250ZW50XCIpLmluaV9ub2RlKFwicGxhbnRcIiwgaik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfSxcbiAgICB0b3VjaF9leGl0KCkge1xuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fZXhpdFwiKTtcbiAgICAgICAgdGhpcy5hZF9jb250cm9sLmhpZGVfYmFubmVyQWQoKTtcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLm9uX25vZGVfa2lsbCh0aGlzLm5vZGUpO1xuICAgIH0sXG4gICAgLy8gb25Mb2FkICgpIHt9LFxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlX3Nob3BfY29udGVudCgpO1xuICAgIH0sXG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcbn0pO1xuIl19
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
    this.update_content();
    this.create_ad_car();
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
      cc.log("雇佣工人");
      this.game_rules_js.add_gold(-config.staff[this.staff_index].cost);
      user_data.user_data.staff[this.staff_index].have = 1;
      this.game_rules_js.create_staff(this.staff_index);
      var node = this.game_scene_js.create_tips_ui(this.game_rules_js.node, "empoly_succes");
      this.buy_button.active = false;
      this.sound_control.play_sound_effect("button_click");
      this.update_content();
    } else {
      this.sound_control.play_sound_effect("un_click");
      var node = this.game_scene_js.create_tips_ui(this.game_rules_js.node, "no_money");
      cc.log("金币不足");
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
        this.ad_control.hide_bannerAd();
        this.game_scene_js.create_ad_car(this.node, price_difference);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcc3RhZmZfY29udGVudC5qcyJdLCJuYW1lcyI6WyJ1c2VyX2RhdGEiLCJyZXF1aXJlIiwiY29uZmlnIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJpY29uX3Nwcml0ZSIsIlNwcml0ZSIsIndvcmtfdGltZV9sYWJlbCIsIkxhYmVsIiwicmVzdF90aW1lX2xhYmVsIiwiY29zdF9sYWJlbCIsImljb25fZnJhbWVfYXJyIiwiU3ByaXRlRnJhbWUiLCJidXlfYnV0dG9uIiwiTm9kZSIsIndvcmtfdGltZV9idWZmX2xhYmVsIiwicmVzdF90aW1lX2J1ZmZfbGFiZWwiLCJlbXBsb3llZF9idXR0b24iLCJuYW1lX2xhYmxlIiwiaW50cm9kdWNlX2xhYmVsIiwiaW5pX25vZGUiLCJzdGFmZl9pbmRleCIsImdhbWVfc2NlbmVfanMiLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwiZ2FtZV9ydWxlc19qcyIsImFkX2NvbnRyb2wiLCJzb3VuZF9jb250cm9sIiwidXBkYXRlX2NvbnRlbnQiLCJjcmVhdGVfYWRfY2FyIiwic3ByaXRlRnJhbWUiLCJzdHJpbmciLCJzdGFmZiIsIndvcmtfdGltZSIsInJlc3RfdGltZSIsIm5hbWUiLCJpbnRyb2R1Y2UiLCJza2lsbCIsIm5vZGUiLCJhY3RpdmUiLCJ0cmFkZXIiLCJjb3N0IiwiaGF2ZSIsIm9uX2J1eV9idXR0b25fY2xpY2siLCJnb2xkIiwibG9nIiwiYWRkX2dvbGQiLCJjcmVhdGVfc3RhZmYiLCJjcmVhdGVfdGlwc191aSIsInBsYXlfc291bmRfZWZmZWN0IiwidG91Y2hfZXhpdCIsImRlc3Ryb3kiLCJhbGxfY2FwYWNpdHkiLCJwcmljZV9kaWZmZXJlbmNlIiwiaGlkZV9iYW5uZXJBZCIsIm9uTG9hZCIsInN0YXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLFNBQVMsR0FBR0MsT0FBTyxDQUFDLFdBQUQsQ0FBdkI7O0FBQ0EsSUFB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QVMsQ0FBQ0EsU0FBVixDQUFvQjhDLElBQS9CO0FBQ0EsVUFBSVEsWUFBWSxHQUFHLE1BQU10RCxTQUFTLENBQUNBLFNBQVYsQ0FBb0J1QyxLQUFwQixDQUEwQixVQUExQixDQUFOLEdBQThDLEdBQWpFO0FBQ0EsVUFBSUksSUFBSSxHQUFJekMsTUFBTSxDQUFDZ0MsS0FBUCxDQUFhLEtBQUtYLFdBQWxCLEVBQStCb0IsSUFBM0MsQ0FIdUQsQ0FJdkQ7O0FBQ0EsVUFBSVksZ0JBQWdCLEdBQUdaLElBQUksR0FBR0csSUFBOUIsQ0FMdUQsQ0FNdkQ7O0FBQ0EsVUFBSUEsSUFBSSxJQUFJSCxJQUFJLElBQUksSUFBSSxDQUFSLENBQVosSUFBMEJXLFlBQVksSUFBSVgsSUFBMUMsSUFBa0RHLElBQUksR0FBR0gsSUFBN0QsRUFBbUU7QUFDL0QsYUFBS2YsVUFBTCxDQUFnQjRCLGFBQWhCO0FBQ0EsYUFBS2hDLGFBQUwsQ0FBbUJPLGFBQW5CLENBQWlDLEtBQUtTLElBQXRDLEVBQTRDZSxnQkFBNUM7QUFDSDs7QUFBQTtBQUNKLEtBWEQsTUFXTztBQUNIO0FBQ0g7QUFFSixHQTlGSTtBQStGTEUsRUFBQUEsTUEvRkssb0JBK0ZJLENBRVIsQ0FqR0k7QUFtR0xDLEVBQUFBLEtBbkdLLG1CQW1HRyxDQUVQLENBckdJLENBdUdMOztBQXZHSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgdXNlcl9kYXRhID0gcmVxdWlyZShcInVzZXJfZGF0YVwiKTtcbnZhciBjb25maWcgPSByZXF1aXJlKFwiY29uZmlnXCIpO1xuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgaWNvbl9zcHJpdGU6IGNjLlNwcml0ZSxcbiAgICAgICAgd29ya190aW1lX2xhYmVsOiBjYy5MYWJlbCxcbiAgICAgICAgcmVzdF90aW1lX2xhYmVsOiBjYy5MYWJlbCxcbiAgICAgICAgY29zdF9sYWJlbDogY2MuTGFiZWwsXG4gICAgICAgIGljb25fZnJhbWVfYXJyOiBbY2MuU3ByaXRlRnJhbWVdLFxuICAgICAgICBidXlfYnV0dG9uOiBjYy5Ob2RlLFxuICAgICAgICB3b3JrX3RpbWVfYnVmZl9sYWJlbDogY2MuTGFiZWwsXG4gICAgICAgIHJlc3RfdGltZV9idWZmX2xhYmVsOiBjYy5MYWJlbCxcbiAgICAgICAgZW1wbG95ZWRfYnV0dG9uOiBjYy5Ob2RlLFxuICAgICAgICBuYW1lX2xhYmxlOiBjYy5MYWJlbCxcbiAgICAgICAgaW50cm9kdWNlX2xhYmVsOiBjYy5MYWJlbCxcbiAgICB9LFxuICAgIC8vaW5pIG5vZGVcbiAgICBpbmlfbm9kZTogZnVuY3Rpb24gKHN0YWZmX2luZGV4KSB7XG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfc2NlbmVcIik7XG4gICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfcnVsZXNcIik7XG4gICAgICAgIHRoaXMuYWRfY29udHJvbCA9IGNjLmZpbmQoXCJhZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcImFkX2NvbnRyb2xcIik7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbCA9IGNjLmZpbmQoXCJzb3VuZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcInNvdW5kX2NvbnRyb2xcIik7XG4gICAgICAgIHRoaXMuc3RhZmZfaW5kZXggPSBzdGFmZl9pbmRleDtcbiAgICAgICAgdGhpcy51cGRhdGVfY29udGVudCgpO1xuICAgICAgICB0aGlzLmNyZWF0ZV9hZF9jYXIoKTtcbiAgICB9LFxuICAgIC8v5Yi35paw5pWw5o2uXG4gICAgdXBkYXRlX2NvbnRlbnQoKSB7XG4gICAgICAgIHRoaXMuaWNvbl9zcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyW3RoaXMuc3RhZmZfaW5kZXhdO1xuICAgICAgICB0aGlzLndvcmtfdGltZV9sYWJlbC5zdHJpbmcgPSBcIkFjdGl2ZSB0aW1lOlwiICsgY29uZmlnLnN0YWZmW3RoaXMuc3RhZmZfaW5kZXhdLndvcmtfdGltZSArIFwic2Vjb25kc1wiO1xuICAgICAgICB0aGlzLnJlc3RfdGltZV9sYWJlbC5zdHJpbmcgPSBcIkZyZWUgdGltZTpcIiArIGNvbmZpZy5zdGFmZlt0aGlzLnN0YWZmX2luZGV4XS5yZXN0X3RpbWUgKyBcInNlY29uZHNcIjtcbiAgICAgICAgdGhpcy5uYW1lX2xhYmxlLnN0cmluZyA9IGNvbmZpZy5zdGFmZlt0aGlzLnN0YWZmX2luZGV4XS5uYW1lO1xuICAgICAgICB0aGlzLmludHJvZHVjZV9sYWJlbC5zdHJpbmcgPSBjb25maWcuc3RhZmZbdGhpcy5zdGFmZl9pbmRleF0uaW50cm9kdWNlO1xuICAgICAgICAvL+aKgOiDveaPkOekulxuICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbFtcImxhYm9yX2NvbnRyYWN0XCJdID09IDApIHtcbiAgICAgICAgICAgIHRoaXMud29ya190aW1lX2J1ZmZfbGFiZWwubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMud29ya190aW1lX2J1ZmZfbGFiZWwubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy53b3JrX3RpbWVfYnVmZl9sYWJlbC5zdHJpbmcgPSBcIitcIiArIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxbXCJsYWJvcl9jb250cmFjdFwiXTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEudHJhZGVyW1wicmVjaXBlc1wiXSA9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnJlc3RfdGltZV9idWZmX2xhYmVsLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlc3RfdGltZV9idWZmX2xhYmVsLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMucmVzdF90aW1lX2J1ZmZfbGFiZWwuc3RyaW5nID0gXCItXCIgKyB1c2VyX2RhdGEudXNlcl9kYXRhLnRyYWRlcltcInJlY2lwZXNcIl07XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5jb3N0X2xhYmVsLnN0cmluZyA9IFwiQ29zdDpcIiArIGNvbmZpZy5zdGFmZlt0aGlzLnN0YWZmX2luZGV4XS5jb3N0O1xuICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5zdGFmZlt0aGlzLnN0YWZmX2luZGV4XS5oYXZlID09IDApIHtcbiAgICAgICAgICAgIHRoaXMuYnV5X2J1dHRvbi5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5lbXBsb3llZF9idXR0b24uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmJ1eV9idXR0b24uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmVtcGxveWVkX2J1dHRvbi5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgLy9idXkgc3RhZmZcbiAgICBvbl9idXlfYnV0dG9uX2NsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQgPj0gY29uZmlnLnN0YWZmW3RoaXMuc3RhZmZfaW5kZXhdLmNvc3QpIHtcbiAgICAgICAgICAgIGNjLmxvZyhcIumbh+S9o+W3peS6ulwiKTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcy5hZGRfZ29sZCgtY29uZmlnLnN0YWZmW3RoaXMuc3RhZmZfaW5kZXhdLmNvc3QpO1xuICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5zdGFmZlt0aGlzLnN0YWZmX2luZGV4XS5oYXZlID0gMTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcy5jcmVhdGVfc3RhZmYodGhpcy5zdGFmZl9pbmRleCk7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfcnVsZXNfanMubm9kZSwgXCJlbXBvbHlfc3VjY2VzXCIpO1xuICAgICAgICAgICAgdGhpcy5idXlfYnV0dG9uLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVfY29udGVudCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwidW5fY2xpY2tcIik7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfcnVsZXNfanMubm9kZSwgXCJub19tb25leVwiKTtcbiAgICAgICAgICAgIGNjLmxvZyhcIumHkeW4geS4jei2s1wiKTtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIHRvdWNoX2V4aXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2V4aXRcIik7XG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgfSxcbiAgICAvL+WIm+W7umFkX2NhclxuICAgIGNyZWF0ZV9hZF9jYXIoKSB7XG4gICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLnN0YWZmW3RoaXMuc3RhZmZfaW5kZXhdLmhhdmUgIT0gMSkge1xuICAgICAgICAgICAgdmFyIGdvbGQgPSB1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQ7XG4gICAgICAgICAgICB2YXIgYWxsX2NhcGFjaXR5ID0gNTAwICogdXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbFtcImdvbGRfbWF4XCJdICsgNTAwO1xuICAgICAgICAgICAgdmFyIGNvc3QgPSAoY29uZmlnLnN0YWZmW3RoaXMuc3RhZmZfaW5kZXhdLmNvc3QpO1xuICAgICAgICAgICAgLy/lt67ku7dcbiAgICAgICAgICAgIHZhciBwcmljZV9kaWZmZXJlbmNlID0gY29zdCAtIGdvbGQ7XG4gICAgICAgICAgICAvL+Wkp+S6jjQvNSzkuJTog73lpJ/mi6XmnInvvIzkuJTph5HluIHkuI3otrNcbiAgICAgICAgICAgIGlmIChnb2xkID49IGNvc3QgKiAoNCAvIDUpICYmIGFsbF9jYXBhY2l0eSA+PSBjb3N0ICYmIGdvbGQgPCBjb3N0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZF9jb250cm9sLmhpZGVfYmFubmVyQWQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX2FkX2Nhcih0aGlzLm5vZGUsIHByaWNlX2RpZmZlcmVuY2UpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgfSxcbiAgICBvbkxvYWQoKSB7XG5cbiAgICB9LFxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9LFxuXG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTtcbiJdfQ==
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbWlncmF0aW9uXFx1c2VfdjIuMS0yLjIuMV9jYy5Ub2dnbGVfZXZlbnQuanMiXSwibmFtZXMiOlsiY2MiLCJUb2dnbGUiLCJfdHJpZ2dlckV2ZW50SW5TY3JpcHRfaXNDaGVja2VkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSxJQUFJQSxFQUFFLENBQUNDLE1BQVAsRUFBZTtBQUNYO0FBQ0E7QUFDQUQsRUFBQUEsRUFBRSxDQUFDQyxNQUFILENBQVVDLCtCQUFWLEdBQTRDLElBQTVDO0FBQ0giLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBUaGlzIHNjcmlwdCBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBieSBDb2NvcyBDcmVhdG9yIGFuZCBpcyBvbmx5IHVzZWQgZm9yIHByb2plY3RzIGNvbXBhdGlibGUgd2l0aCB0aGUgdjIuMS4wIO+9niAyLjIuMSB2ZXJzaW9uLlxuICogWW91IGRvIG5vdCBuZWVkIHRvIG1hbnVhbGx5IGFkZCB0aGlzIHNjcmlwdCBpbiBhbnkgb3RoZXIgcHJvamVjdC5cbiAqIElmIHlvdSBkb24ndCB1c2UgY2MuVG9nZ2xlIGluIHlvdXIgcHJvamVjdCwgeW91IGNhbiBkZWxldGUgdGhpcyBzY3JpcHQgZGlyZWN0bHkuXG4gKiBJZiB5b3VyIHByb2plY3QgaXMgaG9zdGVkIGluIFZDUyBzdWNoIGFzIGdpdCwgc3VibWl0IHRoaXMgc2NyaXB0IHRvZ2V0aGVyLlxuICpcbiAqIOatpOiEmuacrOeUsSBDb2NvcyBDcmVhdG9yIOiHquWKqOeUn+aIkO+8jOS7heeUqOS6juWFvOWuuSB2Mi4xLjAgfiAyLjIuMSDniYjmnKznmoTlt6XnqIvvvIxcbiAqIOS9oOaXoOmcgOWcqOS7u+S9leWFtuWug+mhueebruS4reaJi+WKqOa3u+WKoOatpOiEmuacrOOAglxuICog5aaC5p6c5L2g55qE6aG555uu5Lit5rKh55So5YiwIFRvZ2dsZe+8jOWPr+ebtOaOpeWIoOmZpOivpeiEmuacrOOAglxuICog5aaC5p6c5L2g55qE6aG555uu5pyJ5omY566h5LqOIGdpdCDnrYnniYjmnKzlupPvvIzor7flsIbmraTohJrmnKzkuIDlubbkuIrkvKDjgIJcbiAqL1xuXG5pZiAoY2MuVG9nZ2xlKSB7XG4gICAgLy8gV2hldGhlciB0byB0cmlnZ2VyICd0b2dnbGUnIGFuZCAnY2hlY2tFdmVudHMnIGV2ZW50cyB3aGVuIG1vZGlmeWluZyAndG9nZ2xlLmlzQ2hlY2tlZCcgaW4gdGhlIGNvZGVcbiAgICAvLyDlnKjku6PnoIHkuK3kv67mlLkgJ3RvZ2dsZS5pc0NoZWNrZWQnIOaXtuaYr+WQpuinpuWPkSAndG9nZ2xlJyDkuI4gJ2NoZWNrRXZlbnRzJyDkuovku7ZcbiAgICBjYy5Ub2dnbGUuX3RyaWdnZXJFdmVudEluU2NyaXB0X2lzQ2hlY2tlZCA9IHRydWU7XG59XG4iXX0=
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcc3RhZmZfdWkuanMiXSwibmFtZXMiOlsidXNlcl9kYXRhIiwicmVxdWlyZSIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwic3RhZmZfZ3JvdXBfbm9kZSIsIk5vZGUiLCJzdGFmZl9jb250ZW50X3ByZWZhYiIsIlByZWZhYiIsImhhdmVfdGlwc19ncm91cCIsImJ1eV90aXBzX2dyb3VwIiwiaW5pX25vZGUiLCJnYW1lX3NjZW5lX2pzIiwiZmluZCIsImdldENvbXBvbmVudCIsImFkX2NvbnRyb2wiLCJzb3VuZF9jb250cm9sIiwic2hvd19iYW5uZXJBZCIsInVwZGF0ZV9idXlfdGlwcyIsInNldF9pY29uIiwiaSIsImNoaWxkcmVuIiwibGVuZ3RoIiwibGFuZCIsImhhdmUiLCJjb2xvciIsIkJ1dHRvbiIsImludGVyYWN0YWJsZSIsInN0YWZmIiwiYWN0aXZlIiwiYXJyIiwiT2JqZWN0Iiwia2V5cyIsImdvbGQiLCJjb25maWciLCJjb3N0IiwidXBkYXRlX3NjaGVkdWxlIiwiY2FsbGJhY2siLCJzY2hlZHVsZSIsIm9uX3N0YWZmX2NsaWNrIiwiZSIsInN0YWZmX2luZGV4IiwicGxheV9zb3VuZF9lZmZlY3QiLCJub2RlIiwiaW5zdGFudGlhdGUiLCJwYXJlbnQiLCJ0b3VjaF9leGl0IiwiaGlkZV9iYW5uZXJBZCIsIm9uX25vZGVfa2lsbCIsIm9uTG9hZCIsInN0YXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUNBOzs7O0FBREEsSUFBSUEsU0FBUyxHQUFHQyxPQUFPLENBQUMsV0FBRCxDQUF2Qjs7QUFFQUMsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLGdCQUFnQixFQUFFSixFQUFFLENBQUNLLElBRGI7QUFFUkMsSUFBQUEsb0JBQW9CLEVBQUVOLEVBQUUsQ0FBQ08sTUFG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LG9CQWtFSSxDQUVSLENBcEVJO0FBc0VMQyxFQUFBQSxLQXRFSyxtQkFzRUc7QUFDSixTQUFLZCxlQUFMO0FBQ0gsR0F4RUksQ0EwRUw7O0FBMUVLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciB1c2VyX2RhdGEgPSByZXF1aXJlKFwidXNlcl9kYXRhXCIpO1xuaW1wb3J0IGNvbmZpZyBmcm9tIFwiY29uZmlnXCI7XG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBzdGFmZl9ncm91cF9ub2RlOiBjYy5Ob2RlLFxuICAgICAgICBzdGFmZl9jb250ZW50X3ByZWZhYjogY2MuUHJlZmFiLFxuICAgICAgICBoYXZlX3RpcHNfZ3JvdXA6IGNjLk5vZGUsXG4gICAgICAgIGJ1eV90aXBzX2dyb3VwOiBjYy5Ob2RlLFxuICAgIH0sXG4gICAgLy9cbiAgICBpbmlfbm9kZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJnYW1lX3NjZW5lXCIpO1xuICAgICAgICB0aGlzLmFkX2NvbnRyb2wgPSBjYy5maW5kKFwiYWRfY29udHJvbFwiKS5nZXRDb21wb25lbnQoXCJhZF9jb250cm9sXCIpO1xuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wgPSBjYy5maW5kKFwic291bmRfY29udHJvbFwiKS5nZXRDb21wb25lbnQoXCJzb3VuZF9jb250cm9sXCIpO1xuICAgICAgICB0aGlzLmFkX2NvbnRyb2wuc2hvd19iYW5uZXJBZCgpO1xuICAgICAgICB0aGlzLnVwZGF0ZV9idXlfdGlwcygpO1xuICAgICAgICB0aGlzLnNldF9pY29uKCk7XG4gICAgfSxcbiAgICAvL1xuICAgIHNldF9pY29uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zdGFmZl9ncm91cF9ub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW2ldLmhhdmUgPT0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhZmZfZ3JvdXBfbm9kZS5jaGlsZHJlbltpXS5jb2xvciA9IG5ldyBjYy5jb2xvcigyNTUsIDI1NSwgMjU1KTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YWZmX2dyb3VwX25vZGUuY2hpbGRyZW5baV0uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5zdGFmZltpXS5oYXZlID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXZlX3RpcHNfZ3JvdXAuY2hpbGRyZW5baV0uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YWZmX2dyb3VwX25vZGUuY2hpbGRyZW5baV0uY29sb3IgPSBuZXcgY2MuY29sb3IoMCwgMCwgMCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGFmZl9ncm91cF9ub2RlLmNoaWxkcmVuW2ldLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlOztcbiAgICAgICAgICAgICAgICB0aGlzLmhhdmVfdGlwc19ncm91cC5jaGlsZHJlbltpXS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvL+WIt+aWsOi0reS5sOaPkOekulxuICAgIHVwZGF0ZV9idXlfdGlwcygpIHtcbiAgICAgICAgdmFyIGFyciA9IE9iamVjdC5rZXlzKHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAvL+W3suino+mUgeWcn+WcsCDph5HluIHmu6HotrPvvIzkuJTmnKrmi6XmnInmiY3kvJrmmL7npLpcbiAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbaV0uaGF2ZSA9PSAxICYmIHVzZXJfZGF0YS51c2VyX2RhdGEuZ29sZCA+PSBjb25maWcuc3RhZmZbaV0uY29zdCAmJiB1c2VyX2RhdGEudXNlcl9kYXRhLnN0YWZmW2ldLmhhdmUgPT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYnV5X3RpcHNfZ3JvdXAuY2hpbGRyZW5baV0uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5idXlfdGlwc19ncm91cC5jaGlsZHJlbltpXS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvL+WIt+aWsOaVsOaNruWumuaXtuWZqFxuICAgIHVwZGF0ZV9zY2hlZHVsZSgpIHtcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVfYnV5X3RpcHMoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0X2ljb24oKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZShjYWxsYmFjaywgMC41KTtcbiAgICB9LFxuICAgIC8vXG4gICAgb25fc3RhZmZfY2xpY2s6IGZ1bmN0aW9uIChlLCBzdGFmZl9pbmRleCkge1xuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fY2xpY2tcIik7XG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5zdGFmZl9jb250ZW50X3ByZWZhYik7XG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwic3RhZmZfY29udGVudFwiKS5pbmlfbm9kZShzdGFmZl9pbmRleCk7XG4gICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5ub2RlO1xuICAgIH0sXG4gICAgdG91Y2hfZXhpdDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fZXhpdFwiKTtcbiAgICAgICAgdGhpcy5hZF9jb250cm9sLmhpZGVfYmFubmVyQWQoKTtcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLm9uX25vZGVfa2lsbCh0aGlzLm5vZGUpO1xuICAgIH0sXG4gICAgb25Mb2FkKCkge1xuXG4gICAgfSxcblxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLnVwZGF0ZV9zY2hlZHVsZSgpO1xuICAgIH0sXG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcbn0pO1xuIl19
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
    this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules"); // this.skill_content_js = cc.find("skill_content").getComponent("skill_content");

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
    this.sound_control.play_sound_effect("button_click"); // this.ad_control.show_videoAd("skill_rest");

    this.ad_control.video_tag = null;
    this.ad_control.video_state = 2;
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
      this.skill_group_node.children[i].getComponent("skill_content").ini_node(i);
    }

    ;
    this.game_scene_js.create_tips_ui(this.game_scene_js.node, "skill_rest");
    this.game_rules_js.set_gold_progress();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcc3R1ZHlfdWkuanMiXSwibmFtZXMiOlsidXNlcl9kYXRhIiwicmVxdWlyZSIsInNraWxsX2NvbnRlbnQiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInNraWxsX2dyb3VwX25vZGUiLCJOb2RlIiwic2tpbGxfY29udGVudF9wcmVmYWIiLCJQcmVmYWIiLCJza2lsbF9wb2ludF9sYWJlbCIsIkxhYmVsIiwiaW5pX25vZGUiLCJnYW1lX3NjZW5lX2pzIiwiZmluZCIsImdldENvbXBvbmVudCIsImdhbWVfcnVsZXNfanMiLCJhZF9jb250cm9sIiwic291bmRfY29udHJvbCIsInNob3dfYmFubmVyQWQiLCJjcmVhdGVfY29udGVudCIsImNoaWxkcmVuIiwibGVuZ3RoIiwic2tpbGxfYXJyIiwiT2JqZWN0Iiwia2V5cyIsInNraWxsIiwiaSIsIm5vZGUiLCJpbnN0YW50aWF0ZSIsInBhcmVudCIsInVwZGF0ZV9za2lsbF9wb2ludCIsInN0cmluZyIsInNraWxsX3BvaW50IiwiY2FsbGJhY2siLCJzY2hlZHVsZSIsIm1hY3JvIiwiUkVQRUFUX0ZPUkVWRVIiLCJvbl90b3VjaF9leGl0IiwiaGlkZV9iYW5uZXJBZCIsInBsYXlfc291bmRfZWZmZWN0Iiwib25fbm9kZV9raWxsIiwib25fcmVzdF9za2lsbF9wb2ludF9idXR0b25fY2xpY2siLCJ2aWRlb190YWciLCJ2aWRlb19zdGF0ZSIsImxldmVsIiwiYXJyIiwiaiIsImdvbGRfbWF4IiwiZ29sZCIsImNyZWF0ZV90aXBzX3VpIiwic2V0X2dvbGRfcHJvZ3Jlc3MiLCJ2aWRlb19zdWNjZXMiLCJ3eCIsInVuc2NoZWR1bGUiLCJvbkxvYWQiLCJzdGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxTQUFTLEdBQUdDLE9BQU8sQ0FBQyxXQUFELENBQXZCOztBQUNBLElBQUlDLGFBQWEsR0FBR0QsT0FBTyxDQUFDLGVBQUQs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QWtIRztBQUNKLFNBQUt6QixrQkFBTDtBQUNILEdBcEhJLENBc0hMOztBQXRISyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgdXNlcl9kYXRhID0gcmVxdWlyZShcInVzZXJfZGF0YVwiKTtcbnZhciBza2lsbF9jb250ZW50ID0gcmVxdWlyZShcInNraWxsX2NvbnRlbnRcIik7XG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBza2lsbF9ncm91cF9ub2RlOiBjYy5Ob2RlLFxuICAgICAgICBza2lsbF9jb250ZW50X3ByZWZhYjogY2MuUHJlZmFiLFxuICAgICAgICBza2lsbF9wb2ludF9sYWJlbDogY2MuTGFiZWwsXG4gICAgfSxcblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuICAgIGluaV9ub2RlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfc2NlbmVcIik7XG4gICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfcnVsZXNcIik7XG4gICAgICAgIC8vIHRoaXMuc2tpbGxfY29udGVudF9qcyA9IGNjLmZpbmQoXCJza2lsbF9jb250ZW50XCIpLmdldENvbXBvbmVudChcInNraWxsX2NvbnRlbnRcIik7XG4gICAgICAgIHRoaXMuYWRfY29udHJvbCA9IGNjLmZpbmQoXCJhZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcImFkX2NvbnRyb2xcIik7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbCA9IGNjLmZpbmQoXCJzb3VuZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcInNvdW5kX2NvbnRyb2xcIik7XG4gICAgICAgIHRoaXMuYWRfY29udHJvbC5zaG93X2Jhbm5lckFkKCk7XG4gICAgICAgIHRoaXMuY3JlYXRlX2NvbnRlbnQoKTtcbiAgICB9LFxuICAgIC8vXG4gICAgY3JlYXRlX2NvbnRlbnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuc2tpbGxfZ3JvdXBfbm9kZS5jaGlsZHJlbi5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgdmFyIHNraWxsX2FyciA9IE9iamVjdC5rZXlzKHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGwpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBza2lsbF9hcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuc2tpbGxfY29udGVudF9wcmVmYWIpO1xuICAgICAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5za2lsbF9ncm91cF9ub2RlO1xuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwic2tpbGxfY29udGVudFwiKS5pbmlfbm9kZShpKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvL3NraWxsX3BvaW50XG4gICAgdXBkYXRlX3NraWxsX3BvaW50OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc2tpbGxfcG9pbnRfbGFiZWwuc3RyaW5nID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbF9wb2ludDtcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5za2lsbF9wb2ludF9sYWJlbC5zdHJpbmcgPSB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsX3BvaW50O1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNjaGVkdWxlKGNhbGxiYWNrLCAwLjUsIGNjLm1hY3JvLlJFUEVBVF9GT1JFVkVSKTtcbiAgICB9LFxuICAgIFxuICAgIG9uX3RvdWNoX2V4aXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5hZF9jb250cm9sLmhpZGVfYmFubmVyQWQoKTtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2V4aXRcIik7XG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5vbl9ub2RlX2tpbGwodGhpcy5ub2RlKTtcbiAgICB9LFxuICAgIFxuICAgIG9uX3Jlc3Rfc2tpbGxfcG9pbnRfYnV0dG9uX2NsaWNrKCkge1xuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fY2xpY2tcIik7XG4gICAgICAgIC8vIHRoaXMuYWRfY29udHJvbC5zaG93X3ZpZGVvQWQoXCJza2lsbF9yZXN0XCIpO1xuICAgICAgICB0aGlzLmFkX2NvbnRyb2wudmlkZW9fdGFnID0gbnVsbDtcbiAgICAgICAgdGhpcy5hZF9jb250cm9sLnZpZGVvX3N0YXRlID0gMjtcbiAgICAgICAgdmFyIGxldmVsID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5sZXZlbDtcbiAgICAgICAgdmFyIGFyciA9IE9iamVjdC5rZXlzKHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGwpO1xuICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsX3BvaW50ID0gbGV2ZWw7XG4gICAgICAgIHZhciBza2lsbF9hcnIgPSBPYmplY3Qua2V5cyh1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsKTtcbiAgICAgICAgLy9yZXNldCBza2lsbCB0byBsdiAwXG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgYXJyLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBpZiAoYXJyW2pdID09IFwib2ZmbGluZV9wcm9maXRcIikge1xuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxbXCJvZmZsaW5lX3Byb2ZpdFwiXSA9IDE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxbYXJyW2pdXSA9IDA7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICB2YXIgZ29sZF9tYXggPSA1MDAgKiB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1wiZ29sZF9tYXhcIl0gKyA1MDA7XG4gICAgICAgIGlmKHVzZXJfZGF0YS51c2VyX2RhdGEuZ29sZCA+IGdvbGRfbWF4KSB1c2VyX2RhdGEudXNlcl9kYXRhLmdvbGQgPSBnb2xkX21heDtcbiAgICAgICAgLy8gcmVzZXQgc2tpbGxfY29udGVudFxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNraWxsX2Fyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5za2lsbF9ncm91cF9ub2RlLmNoaWxkcmVuW2ldLmdldENvbXBvbmVudChcInNraWxsX2NvbnRlbnRcIikuaW5pX25vZGUoaSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfc2NlbmVfanMubm9kZSwgXCJza2lsbF9yZXN0XCIpO1xuICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMuc2V0X2dvbGRfcHJvZ3Jlc3MoKTtcblxuICAgIH0sXG4gICAgXG4gICAgdmlkZW9fc3VjY2VzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0eXBlb2YgKHd4KSAhPSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWRfY29udHJvbC52aWRlb19zdGF0ZSA9PSAxICYmIHRoaXMuYWRfY29udHJvbC52aWRlb190YWcgPT0gXCJza2lsbF9yZXN0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZF9jb250cm9sLnZpZGVvX3RhZyA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRfY29udHJvbC52aWRlb19zdGF0ZSA9IDI7XG4gICAgICAgICAgICAgICAgICAgIHZhciBsZXZlbCA9IHVzZXJfZGF0YS51c2VyX2RhdGEubGV2ZWw7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhcnIgPSBPYmplY3Qua2V5cyh1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsKTtcbiAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbF9wb2ludCA9IGxldmVsO1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2tpbGxfYXJyID0gT2JqZWN0LmtleXModXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbCk7XG4gICAgICAgICAgICAgICAgICAgIC8v6YeN572uc2tpbGwg5Li6IDBcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBhcnIubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v56a757q/5pS255uK5L+d6K+B6Iez5bCRMee6p1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFycltqXSA9PSBcIm9mZmxpbmVfcHJvZml0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1wib2ZmbGluZV9wcm9maXRcIl0gPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW2FycltqXV0gPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgLy/liLfmlrBza2lsbF9jb250ZW50XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2tpbGxfYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNraWxsX2dyb3VwX25vZGUuY2hpbGRyZW5baV0uZ2V0Q29tcG9uZW50KFwic2tpbGxfY29udGVudFwiKS5pbmlfbm9kZShpKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9zY2VuZV9qcy5ub2RlLCBcInNraWxsX3Jlc3RcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcy5zZXRfZ29sZF9wcm9ncmVzcygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUoY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmFkX2NvbnRyb2wudmlkZW9fdGFnID09IG51bGwgJiYgdGhpcy5hZF9jb250cm9sLnZpZGVvX3N0YXRlID09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZShjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlKGNhbGxiYWNrLCAwLjIpO1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgb25Mb2FkKCkge1xuXG4gICAgfSxcblxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLnVwZGF0ZV9za2lsbF9wb2ludCgpO1xuICAgIH0sXG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcbn0pO1xuIl19
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
    this.ad_control.show_bannerAd(); // this.tips_label.string = "今日分享:" + user_data.user_data.videotape_share_count + "/" + config.videotape_share_max;

    this.tips_label.string = "Successfully shared:" + _user_data["default"].user_data.videotape_share_count + "Second-rate";
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
  },
  //按钮被点击
  on_button_click: function on_button_click() {
    //未开始录制点击变开始
    this.sound_control.play_sound_effect("button_click"); // if (user_data.user_data.videotape_share_count < config.videotape_share_max) {
    //还有剩余分享次数
    // } else {
    //     //提示已达分享次数
    //     this.sound_control.play_sound_effect("un_click");
    //     this.game_scene_js.create_tips_ui(this.game_rules_js.node, "share_max");
    // };

    if (this.game_rules_js.videotape_path == null) {
      this.game_rules_js.start_videotape();
      this.touch_exit();
    } else {
      this.video_share();
    }

    ;
  },
  on_delete_button_click: function on_delete_button_click() {
    this.game_rules_js.videotape_path = null;
    this.game_scene_js.create_tips_ui(this.game_rules_js.node, "vidotape_cancel");
    this.ini_node();
  },
  //录屏分享
  video_share: function video_share() {
    var _this = this;

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
          console.log('录屏分享失败', _this.videotape_path);
          self.videotape_share_fail();
        }
      });
    }

    ;
  },
  //录屏分享成功
  videotape_share_succes: function videotape_share_succes() {
    this.game_scene_js.create_tips_ui(this.node.parent, "videotape_share_succes");
    this.game_rules_js.videotape_path = null;
    _user_data["default"].user_data.videotape_share_count++;
    var gold = Math.floor(this.add_gold / 6);
    var ex = Math.floor(this.add_ex / 3);

    for (var i = 0; i < 6; i++) {
      this.game_scene_js.create_gold_effect(this.purse_node, i, gold);
    }

    ;

    for (var i = 0; i < 5; i++) {
      this.game_scene_js.create_ex_effect(this.ex_node, i, ex);
    }

    ;
    this.ini_node();
  },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcdmlkZW90YXBlX3VpLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiZ29sZF9sYWJsZSIsIkxhYmVsIiwiZXhfbGFiZWwiLCJ0aXBzX2xhYmVsIiwiYnV0dG9uX2ZyYW1lIiwiU3ByaXRlIiwiYnV0dG9uX2ZyYW1lX2FyciIsIlNwcml0ZUZyYW1lIiwicHVyc2Vfbm9kZSIsIk5vZGUiLCJleF9ub2RlIiwiZGVsZXRlX2J1dHRvbiIsIkJ1dHRvbiIsImluaV9ub2RlIiwiZ2FtZV9ydWxlc19qcyIsImZpbmQiLCJnZXRDb21wb25lbnQiLCJnYW1lX3NjZW5lX2pzIiwic291bmRfY29udHJvbCIsImFkX2NvbnRyb2wiLCJzaG93X2Jhbm5lckFkIiwic3RyaW5nIiwidXNlcl9kYXRhIiwidmlkZW90YXBlX3NoYXJlX2NvdW50IiwiYWRkX2dvbGQiLCJNYXRoIiwiZmxvb3IiLCJza2lsbCIsImFkZF9leCIsImxldmVsIiwidmlkZW90YXBlX3BhdGgiLCJzcHJpdGVGcmFtZSIsIm5vZGUiLCJhY3RpdmUiLCJvbl9idXR0b25fY2xpY2siLCJwbGF5X3NvdW5kX2VmZmVjdCIsInN0YXJ0X3ZpZGVvdGFwZSIsInRvdWNoX2V4aXQiLCJ2aWRlb19zaGFyZSIsIm9uX2RlbGV0ZV9idXR0b25fY2xpY2siLCJjcmVhdGVfdGlwc191aSIsInd4Iiwic2VsZiIsInNoYXJlQXBwTWVzc2FnZSIsImNoYW5uZWwiLCJ0aXRsZSIsImV4dHJhIiwidmlkZW9QYXRoIiwidmlkZW9Ub3BpY3MiLCJzdWNjZXNzIiwiY29uc29sZSIsImxvZyIsInZpZGVvdGFwZV9zaGFyZV9zdWNjZXMiLCJmYWlsIiwidmlkZW90YXBlX3NoYXJlX2ZhaWwiLCJwYXJlbnQiLCJnb2xkIiwiZXgiLCJpIiwiY3JlYXRlX2dvbGRfZWZmZWN0IiwiY3JlYXRlX2V4X2VmZmVjdCIsImhpZGVfYmFubmVyQWQiLCJvbl9ub2RlX2tp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QUNILEdBcEhJO0FBcUhMO0FBQ0F3QixFQUFBQSxVQXRISyx3QkFzSFE7QUFDVCxTQUFLbkIsYUFBTCxDQUFtQmlCLGlCQUFuQixDQUFxQyxhQUFyQztBQUNBLFNBQUtoQixVQUFMLENBQWdCMEMsYUFBaEI7QUFDQSxTQUFLNUMsYUFBTCxDQUFtQjZDLFlBQW5CLENBQWdDLEtBQUs5QixJQUFyQztBQUNILEdBMUhJO0FBMkhMO0FBRUErQixFQUFBQSxLQTdISyxtQkE2SEcsQ0FFUCxDQS9ISSxDQWlJTDs7QUFqSUssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHVzZXJfZGF0YSBmcm9tIFwidXNlcl9kYXRhXCI7XG5pbXBvcnQgY29uZmlnIGZyb20gXCJjb25maWdcIjtcbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGdvbGRfbGFibGU6IGNjLkxhYmVsLFxuICAgICAgICBleF9sYWJlbDogY2MuTGFiZWwsXG4gICAgICAgIHRpcHNfbGFiZWw6IGNjLkxhYmVsLFxuICAgICAgICBidXR0b25fZnJhbWU6IGNjLlNwcml0ZSxcbiAgICAgICAgYnV0dG9uX2ZyYW1lX2FycjogW2NjLlNwcml0ZUZyYW1lXSxcbiAgICAgICAgcHVyc2Vfbm9kZTogY2MuTm9kZSxcbiAgICAgICAgZXhfbm9kZTogY2MuTm9kZSxcbiAgICAgICAgZGVsZXRlX2J1dHRvbjogY2MuQnV0dG9uLFxuICAgIH0sXG4gICAgLy/liJ3lp4vljJboioLngrlcbiAgICBpbmlfbm9kZSgpIHtcbiAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9ydWxlc1wiKTtcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9zY2VuZVwiKTtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sID0gY2MuZmluZChcInNvdW5kX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwic291bmRfY29udHJvbFwiKTtcbiAgICAgICAgdGhpcy5hZF9jb250cm9sID0gY2MuZmluZChcImFkX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwiYWRfY29udHJvbFwiKTtcbiAgICAgICAgdGhpcy5hZF9jb250cm9sLnNob3dfYmFubmVyQWQoKTtcbiAgICAgICAgLy8gdGhpcy50aXBzX2xhYmVsLnN0cmluZyA9IFwi5LuK5pel5YiG5LqrOlwiICsgdXNlcl9kYXRhLnVzZXJfZGF0YS52aWRlb3RhcGVfc2hhcmVfY291bnQgKyBcIi9cIiArIGNvbmZpZy52aWRlb3RhcGVfc2hhcmVfbWF4O1xuICAgICAgICB0aGlzLnRpcHNfbGFiZWwuc3RyaW5nID0gXCJTdWNjZXNzZnVsbHkgc2hhcmVkOlwiICsgdXNlcl9kYXRhLnVzZXJfZGF0YS52aWRlb3RhcGVfc2hhcmVfY291bnQgK1wiU2Vjb25kLXJhdGVcIjtcbiAgICAgICAgdGhpcy5hZGRfZ29sZCA9IE1hdGguZmxvb3IoKCg1MDAgKiB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1wiZ29sZF9tYXhcIl0gKyA1MDApKSAvIDIwKSArIDE7XG4gICAgICAgIHRoaXMuYWRkX2V4ID0gTWF0aC5mbG9vcih1c2VyX2RhdGEudXNlcl9kYXRhLmxldmVsIC8gMTApICsgMTtcblxuICAgICAgICBpZiAodGhpcy5nYW1lX3J1bGVzX2pzLnZpZGVvdGFwZV9wYXRoID09IG51bGwpIHtcbiAgICAgICAgICAgIC8v5b2V5bGP5pyq5b2V5Yi2XG4gICAgICAgICAgICB0aGlzLmJ1dHRvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuYnV0dG9uX2ZyYW1lX2FyclswXTtcbiAgICAgICAgICAgIHRoaXMuZGVsZXRlX2J1dHRvbi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy/lvZXlsY/lt7LlvZXliLZcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5idXR0b25fZnJhbWVfYXJyWzFdO1xuICAgICAgICAgICAgdGhpcy5kZWxldGVfYnV0dG9uLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmdvbGRfbGFibGUuc3RyaW5nID0gXCIrXCIgKyB0aGlzLmFkZF9nb2xkO1xuICAgICAgICB0aGlzLmV4X2xhYmVsLnN0cmluZyA9IFwiK1wiICsgdGhpcy5hZGRfZXg7XG4gICAgfSxcblxuICAgIC8v5oyJ6ZKu6KKr54K55Ye7XG4gICAgb25fYnV0dG9uX2NsaWNrKCkge1xuICAgICAgICAvL+acquW8gOWni+W9leWItueCueWHu+WPmOW8gOWni1xuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fY2xpY2tcIik7XG5cbiAgICAgICAgLy8gaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEudmlkZW90YXBlX3NoYXJlX2NvdW50IDwgY29uZmlnLnZpZGVvdGFwZV9zaGFyZV9tYXgpIHtcbiAgICAgICAgLy/ov5jmnInliankvZnliIbkuqvmrKHmlbBcbiAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgLy8gICAgIC8v5o+Q56S65bey6L6+5YiG5Lqr5qyh5pWwXG4gICAgICAgIC8vICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJ1bl9jbGlja1wiKTtcbiAgICAgICAgLy8gICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfcnVsZXNfanMubm9kZSwgXCJzaGFyZV9tYXhcIik7XG4gICAgICAgIC8vIH07XG5cbiAgICAgICAgaWYgKHRoaXMuZ2FtZV9ydWxlc19qcy52aWRlb3RhcGVfcGF0aCA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMuc3RhcnRfdmlkZW90YXBlKCk7XG4gICAgICAgICAgICB0aGlzLnRvdWNoX2V4aXQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudmlkZW9fc2hhcmUoKTtcbiAgICAgICAgfTtcblxuXG4gICAgfSxcblxuICAgIFxuICAgIG9uX2RlbGV0ZV9idXR0b25fY2xpY2soKSB7XG4gICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcy52aWRlb3RhcGVfcGF0aCA9IG51bGw7XG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfcnVsZXNfanMubm9kZSwgXCJ2aWRvdGFwZV9jYW5jZWxcIik7XG4gICAgICAgIHRoaXMuaW5pX25vZGUoKTtcbiAgICB9LFxuICAgIC8v5b2V5bGP5YiG5LqrXG4gICAgdmlkZW9fc2hhcmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiAod3gpICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5nYW1lX3J1bGVzX2pzLnZpZGVvdGFwZV9wYXRoID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgLy/ojrflj5bliIbkuqvlr7zor61cbiAgICAgICAgICAgIHd4LnNoYXJlQXBwTWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgY2hhbm5lbDogJ3ZpZGVvJywgIC8v5oyH5a6a5Li66KeG6aKR5YiG5LqrXG4gICAgICAgICAgICAgICAgdGl0bGU6ICdPbi1Ib29rIFNtYWxsIEZhcm0nLFxuICAgICAgICAgICAgICAgIGV4dHJhOiB7XG4gICAgICAgICAgICAgICAgICAgIHZpZGVvUGF0aDogdGhpcy5nYW1lX3J1bGVzX2pzLnZpZGVvdGFwZV9wYXRoLC8vIOiuvue9ruinhumikei3r+W+hFxuICAgICAgICAgICAgICAgICAgICB2aWRlb1RvcGljczogW1wiT24tSG9vayBTbWFsbCBGYXJtXCIsIFwiR2FtZVwiXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvL+WIhuS6q+Wbnuiwg1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5b2V5bGP5YiG5Lqr5oiQ5YqfJyk7XG4gICAgICAgICAgICAgICAgICAgIC8v5YiG5Lqr5aWW5Yqx77yM5LuF5LiA5qyhXG4gICAgICAgICAgICAgICAgICAgIHNlbGYudmlkZW90YXBlX3NoYXJlX3N1Y2NlcygpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZmFpbDogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5b2V5bGP5YiG5Lqr5aSx6LSlJywgdGhpcy52aWRlb3RhcGVfcGF0aCk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYudmlkZW90YXBlX3NoYXJlX2ZhaWwoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIC8v5b2V5bGP5YiG5Lqr5oiQ5YqfXG4gICAgdmlkZW90YXBlX3NoYXJlX3N1Y2NlczogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5ub2RlLnBhcmVudCwgXCJ2aWRlb3RhcGVfc2hhcmVfc3VjY2VzXCIpO1xuICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMudmlkZW90YXBlX3BhdGggPSBudWxsO1xuICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnZpZGVvdGFwZV9zaGFyZV9jb3VudCsrO1xuICAgICAgICB2YXIgZ29sZCA9IE1hdGguZmxvb3IodGhpcy5hZGRfZ29sZCAvIDYpO1xuICAgICAgICB2YXIgZXggPSBNYXRoLmZsb29yKHRoaXMuYWRkX2V4IC8gMyk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNjsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX2dvbGRfZWZmZWN0KHRoaXMucHVyc2Vfbm9kZSwgaSwgZ29sZCk7XG4gICAgICAgIH07XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNTsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX2V4X2VmZmVjdCh0aGlzLmV4X25vZGUsIGksIGV4KTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5pbmlfbm9kZSgpO1xuXG4gICAgfSxcbiAgICAvL+W9leWxj+WIhuS6q+Wksei0pVxuICAgIHZpZGVvdGFwZV9zaGFyZV9mYWlsOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLm5vZGUucGFyZW50LCBcInZpZGVvdGFwZV9zaGFyZV9mYWlsXCIpO1xuICAgICAgICB0aGlzLmluaV9ub2RlKCk7XG4gICAgfSxcbiAgICAvL+eCueWHu+mAgOWHulxuICAgIHRvdWNoX2V4aXQoKSB7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9leGl0XCIpO1xuICAgICAgICB0aGlzLmFkX2NvbnRyb2wuaGlkZV9iYW5uZXJBZCgpO1xuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMub25fbm9kZV9raWxsKHRoaXMubm9kZSk7XG4gICAgfSxcbiAgICAvLyBvbkxvYWQgKCkge30sXG5cbiAgICBzdGFydCgpIHtcblxuICAgIH0sXG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcbn0pO1xuIl19
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcdGlwc191aS5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImxhYmVsIiwiTGFiZWwiLCJmbG9vcl9ub2RlIiwiTm9kZSIsImljb25fZnJhbWUiLCJTcHJpdGUiLCJpY29uX2ZyYW1lX2FyciIsIlNwcml0ZUZyYW1lIiwiaW5pX25vZGUiLCJ0eXBlIiwibnVtIiwieSIsIm9wYWNpdHkiLCJzdHJpbmciLCJzcHJpdGVGcmFtZSIsImVuZF9hbmltIiwidHdlZW4iLCJkZWxheSIsInRvIiwiZWFzaW5nIiwiY2FsbCIsImdhbWVfc2NlbmVfanMiLCJvbl9ub2RlX2tpbGwiLCJub2RlIiwic3RhcnQiLCJvbkxvYWQiLCJmaW5kIiwiZ2V0Q29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsS0FBSyxFQUFFSixFQUFFLENBQUNLLEtBREY7QUFFUkMsSUFBQUEsVUFBVSxFQUFFTixFQUFFLENBQUNPLElBRlA7QUFHUkMsSUFBQUEsVUFBVSxFQUFFUixFQUFFLENBQUNTLE1BSFA7QUFJUkMsSUFBQUEsY0FBYyxFQUFFLENBQUNWLEVBQUUsQ0FBQ1csV0FBSjtBQUpSLEdBSFA7QUFTTEMsRUFBQUEsUUFBUSxFQUFFLGtCQUFVQyxJQUFWLEVBQWdCQyxHQUFoQixFQUFxQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQUtSLFVBQUwsQ0FBZ0JTLENBQWhCLEdBQW9CLEdBQXBCO0FBQ0EsU0FBS1QsVUFBTCxDQUFnQlUsT0FBaEIsR0FBMEIsR0FBMUI7O0FBQ0EsWUFBUUgsSUFBUjtBQUNJLFdBQUssTUFBTDtBQUNJLGFBQUtULEtBQUwsQ0FBV2EsTUFBWCxHQUFvQixVQUFVSCxHQUE5QjtBQUNBLGFBQUtO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c0NvbnRlbnQiOlsiY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgbGFiZWw6IGNjLkxhYmVsLFxuICAgICAgICBmbG9vcl9ub2RlOiBjYy5Ob2RlLFxuICAgICAgICBpY29uX2ZyYW1lOiBjYy5TcHJpdGUsXG4gICAgICAgIGljb25fZnJhbWVfYXJyOiBbY2MuU3ByaXRlRnJhbWVdLFxuICAgIH0sXG4gICAgaW5pX25vZGU6IGZ1bmN0aW9uICh0eXBlLCBudW0pIHtcbiAgICAgICAgLy8gdGhpcy5sYWJlbC5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIC8vIHRoaXMuaWNvbl9mcmFtZS5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIC8vIHRoaXMuZmxvb3Jfbm9kZS53aWR0aCA9IDA7XG4gICAgICAgIC8vIHRoaXMuZmxvb3Jfbm9kZS5oZWlnaHQgPSA2MDtcbiAgICAgICAgdGhpcy5mbG9vcl9ub2RlLnkgPSAzOTU7XG4gICAgICAgIHRoaXMuZmxvb3Jfbm9kZS5vcGFjaXR5ID0gMjU1O1xuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJnb2xkXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBcIkdvbGQrXCIgKyBudW07XG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2FyclswXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJwZXRfbGVhdmVcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiR29uZVwiXG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2FyclsxXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJ2aWRlb3RhcGVfbm9fdGltZVwiOlxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gXCJTY3JlZW4gcmVjb3JkaW5nIHRpbWUgc2hvdWxkIGJlIG1vcmUgdGhhbiAzIHNlY29uZHNcIlxuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbMV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwidmlkZW90YXBlX3NoYXJlX2ZhaWxcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiU2NyZWVuIHJlY29yZGluZyBhbmQgc2hhcmluZyBmYWlsZWR+XCJcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyWzFdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInZpZGVvdGFwZV9zaGFyZV9zdWNjZXNcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiU2NyZWVuIHJlY29yZGluZyBhbmQgc2hhcmluZyBzdWNjZXNzIVwiXG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2FyclsxXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJ2aWRlb3RhcGVfc3RhcnRcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiU2NyZWVuIHJlY29yZGluZyBzdGFydGVkXCJcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyWzFdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInZpZG90YXBlX2NhbmNlbFwiOlxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gXCJTY3JlZW4gcmVjb3JkaW5nIGhhcyBiZWVuIHJlc2V0XCJcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyWzFdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInZpZG90YXBlX292ZXJcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiU2NyZWVuIHJlY29yZGluZyBoYXMgZW5kZWRcIlxuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbMV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwidmlkZW9fZXhpdFwiOlxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gXCJXYXRjaCB0aGUgZnVsbCB2aWRlb35cIlxuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbMV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwidmlkZW9fd2FpdFwiOlxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gXCJBZCBicmVha35+XCJcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyWzFdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIm5vX3NlbGxcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiTm90aGluZyB0byBzZWxsXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2FyclsxXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJub19tb25leV9nb2xkXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBcIkdvbGQgbm90IGVub3VnaHRcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyWzFdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIm5vX21vbmV5X2RpYW1vbmRcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiRGlhbW9uZCBub3QgZW5vdWdodFwiO1xuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbMV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwibm9fbGV2ZWxcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiTGV2ZWwgbm90IGVub3VnaHRcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyWzFdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIm5vX3NraWxsX3BvaW50XCI6XG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBcIlNraWxsIHBvaW50IG5vdCBlbm91Z2h0XCI7XG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2FyclsxXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJlbXBvbHlfc3VjY2VzXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBcIkhpcmUgc3VjY2Vzc1wiO1xuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbMV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiYnV5X3N1Y2Nlc1wiOlxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gXCJTdWNjZXNzZnVsIHB1cmNoYXNlXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2FyclsxXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJnZXRfb2ZmbGluZV9wcm9maXRcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiUmVjZWl2ZSBvZmZsaW5lIGVhcm5pbmdzXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2FyclsxXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJjdWx0cnVlX3N1Y2Nlc1wiOlxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gXCJBZG9wdGlvbiBpcyBzdWNjZXNzZnVsXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2FyclsxXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJ1bl9kZXZlbG9wXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBcIk5vdCB1bmxvY2tlZCB5ZXRcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyWzFdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInNoYXJlX3N1Y2Nlc1wiOlxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gXCJTaGFyZSBzdWNjZXNzXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2FyclsxXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJwZXRfYWxyZWFkeV9saWZlXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBcIlBldCBhbHJlYWR5IGV4aXN0c35cIjtcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyWzFdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInNoYXJlX2ZhaWxcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiVHJ5IHNoYXJpbmcgYWdhaW5+XCI7XG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2FyclsxXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJkb3VibGVfb2ZmbGluZV9wcm9maXRcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiU3VjY2Vzc2Z1bGx5IHJlY2VpdmUgZG91YmxlIHJld2FyZHNcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyWzFdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImN1bHRydWVfcGV0X3N1Y2Nlc1wiOlxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gXCJJbmNyZWFzZWQgcGV0IGZhdm9yYWJpbGl0eVwiO1xuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbMV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwic3RhZmZfcmVzdF9vdmVyXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBcIldvcmsgZmFzdGVyIVwiO1xuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbMV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwic2tpbGxfcmVzdFwiOlxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gXCJTa2lsbCBoYXMgYmVlbiByZXNldFwiO1xuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbMV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiZ2lmdF9hZF9leFwiOlxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gXCJHYWluIGEgbG90IG9mIGV4cGVyaWVuY2VcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyWzFdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImdvbGRfZnVsbFwiOlxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gXCJDYW4ndCBob2xkIG1vcmUgY29pbnMhXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ZyYW1lX2FyclsxXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJnaWZ0X2FkX2xldmVsXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBcIkxldmVsIHVwIVwiO1xuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWNvbl9mcmFtZV9hcnJbMV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwic2hhcmVfbWF4XCI6XG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBcIlJlYWNoZWQgdG9kYXkncyBsaW1pdH5cIjtcbiAgICAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25fZnJhbWVfYXJyWzFdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmVuZF9hbmltKCk7XG4gICAgfSxcbiAgICAvLyBpbmlfYW5pbTogZnVuY3Rpb24gKCkge1xuICAgIC8vICAgICBjYy50d2Vlbih0aGlzLmZsb29yX25vZGUpXG4gICAgLy8gICAgICAgICAudG8oMC4yLCB7IHk6IDEwMCB9LCB7IGVhc2luZzogXCJzaW5lT3V0XCIgfSlcbiAgICAvLyAgICAgICAgIC5jYWxsKCgpID0+IHtcbiAgICAvLyAgICAgICAgICAgICB0aGlzLmxhYmVsLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAvLyAgICAgICAgICAgICB0aGlzLmljb25fZnJhbWUubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgIC8vICAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAvLyAgICAgICAgICAgICAgICAgdGhpcy5lbmRfYW5pbSgpO1xuICAgIC8vICAgICAgICAgICAgIH07XG4gICAgLy8gICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoY2FsbGJhY2ssIDEuNSk7XG4gICAgLy8gICAgICAgICB9KVxuICAgIC8vICAgICAgICAgLnN0YXJ0KCk7XG4gICAgLy8gfSxcbiAgICBlbmRfYW5pbTogZnVuY3Rpb24gKCkge1xuICAgICAgICBjYy50d2Vlbih0aGlzLmZsb29yX25vZGUpXG4gICAgICAgICAgICAuZGVsYXkoMSlcbiAgICAgICAgICAgIC50bygwLjMsIHsgeTogdGhpcy5mbG9vcl9ub2RlLnkgKyAxNTAsIG9wYWNpdHk6IDAgfSwgeyBlYXNpbmc6IFwic2luZU91dFwiIH0pXG4gICAgICAgICAgICAuY2FsbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLm9uX25vZGVfa2lsbCh0aGlzLm5vZGUpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGFydCgpO1xuICAgIH0sXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfc2NlbmVcIik7XG4gICAgfSxcblxuICAgIHN0YXJ0KCkge1xuXG4gICAgfSxcblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxufSk7XG4iXX0=
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
        this.land_group.children[land_index].getComponent("land").water_charge();
        break;

      case "till":
        this.land_group.children[land_index].getComponent("land").till();
        user_data.user_data.land[land_index].land_state = "tilling";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcYnV0dG9uX21vcmUuanMiXSwibmFtZXMiOlsidXNlcl9kYXRhIiwicmVxdWlyZSIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiZnJhbWVfYXJyIiwidHlwZSIsIlNwcml0ZUZyYW1lIiwiZ3JvdXBfbm9kZSIsIk5vZGUiLCJpbmlfbm9kZSIsImdhbWVfc2NlbmVfanMiLCJmaW5kIiwiZ2V0Q29tcG9uZW50Iiwic291bmRfY29udHJvbCIsImxhbmRfZ3JvdXAiLCJhZF9jb250cm9sIiwic2hvd19iYW5uZXJBZCIsImJ1dHRvbl90eXBlIiwic2V0X2J1dHRvbl9mcmFtZSIsInNldF9idXR0b25fcG9zaXRpb24iLCJpIiwiY2hpbGRyZW4iLCJsZW5ndGgiLCJsYW5kIiwiaGF2ZSIsImFjdGl2ZSIsImdldENoaWxkQnlOYW1lIiwiU3ByaXRlIiwic3ByaXRlRnJhbWUiLCJzZXRQb3NpdGlvbiIsInBvc2l0aW9uIiwieCIsInkiLCJvbl90b3VjaF9leGl0X2J1dHRvbl9jbGljayIsInBsYXlfc291bmRfZWZmZWN0IiwiaGlkZV9iYW5uZXJBZCIsIm9uX25vZGVfa2lsbCIsIm5vZGUiLCJvbl9idXR0b25fY2xpY2siLCJlIiwibGFuZF9pbmRleCIsIndhdGVyX2NoYXJnZSIsInRpbGwiLCJsYW5kX3N0YXRlIiwiY3JlYXRlX3BsYW50X3VpIiwib25Mb2FkIiwic3RhcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsU0FBUyxHQUFHQyxPQUFPLENBQUMsV0FBRCxDQUF2Qjs7QUFDQUMsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFNBQVMsRUFBRTtBQUNQLGlCQUFTLEVBREY7QUFFUEMsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNO0FBRkYsS0FESDtBQUtSQyxJQUFB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QXlCbUIsVUFBekIsRUFBcUM1QixZQUFyQyxDQUFrRCxNQUFsRCxFQUEwRDZCLFlBQTFEO0FBQ0E7O0FBQ0osV0FBSyxNQUFMO0FBQ0ksYUFBSzNCLFVBQUwsQ0FBZ0JPLFFBQWhCLENBQXlCbUIsVUFBekIsRUFBcUM1QixZQUFyQyxDQUFrRCxNQUFsRCxFQUEwRDhCLElBQTFEO0FBQ0E1QyxRQUFBQSxTQUFTLENBQUNBLFNBQVYsQ0FBb0J5QixJQUFwQixDQUF5QmlCLFVBQXpCLEVBQXFDRyxVQUFyQyxHQUFnRCxTQUFoRDtBQUNBOztBQUNKLFdBQUssT0FBTDtBQUNJLFlBQUlOLElBQUksR0FBRyxLQUFLM0IsYUFBTCxDQUFtQmtDLGVBQW5CLENBQW1DLEtBQUtsQyxhQUFMLENBQW1CMkIsSUFBdEQsQ0FBWDs7QUFDQSxZQUFJQSxJQUFJLElBQUksSUFBWixFQUFrQjtBQUNkQSxVQUFBQSxJQUFJLENBQUN6QixZQUFMLENBQWtCLFVBQWxCLEVBQThCSCxRQUE5QixDQUF1QytCLFVBQXZDO0FBQ0g7O0FBQUE7QUFDRDtBQWJSOztBQWNDO0FBQ0QsU0FBSzlCLGFBQUwsQ0FBbUIwQixZQUFuQixDQUFnQyxLQUFLQyxJQUFyQztBQUNILEdBckZJO0FBc0ZMUSxFQUFBQSxNQXRGSyxvQkFzRkksQ0FHUixDQXpGSTtBQTBGTEMsRUFBQUEsS0ExRkssbUJBMEZHLENBRVAsQ0E1RkksQ0E4Rkw7O0FBOUZLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciB1c2VyX2RhdGEgPSByZXF1aXJlKFwidXNlcl9kYXRhXCIpO1xuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgZnJhbWVfYXJyOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lLFxuICAgICAgICB9LFxuICAgICAgICBncm91cF9ub2RlOiBjYy5Ob2RlLFxuICAgIH0sXG5cbiAgICAvL+WIneWni+WMluaMiemSrlxuICAgIGluaV9ub2RlOiBmdW5jdGlvbiAodHlwZSkge1xuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJnYW1lX3NjZW5lXCIpO1xuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wgPSBjYy5maW5kKFwic291bmRfY29udHJvbFwiKS5nZXRDb21wb25lbnQoXCJzb3VuZF9jb250cm9sXCIpO1xuICAgICAgICB0aGlzLmxhbmRfZ3JvdXAgPSBjYy5maW5kKFwiVUlfUk9PVC9jZW50ZXIvbGFuZF9ncm91cFwiKTtcbiAgICAgICAgdGhpcy5hZF9jb250cm9sID0gY2MuZmluZChcImFkX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwiYWRfY29udHJvbFwiKTtcbiAgICAgICAgdGhpcy5hZF9jb250cm9sLnNob3dfYmFubmVyQWQoKTtcbiAgICAgICAgdGhpcy5idXR0b25fdHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMuc2V0X2J1dHRvbl9mcmFtZSgpO1xuICAgICAgICB0aGlzLnNldF9idXR0b25fcG9zaXRpb24oKTtcbiAgICB9LFxuICAgIC8v6K6+572u5oyJ6ZKu55qE5Zu+54mH5qC35byPXG4gICAgc2V0X2J1dHRvbl9mcmFtZTogZnVuY3Rpb24gKCkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuYnV0dG9uX3R5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJ3YXRlcmluZ1wiOlxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sYW5kX2dyb3VwLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmxhbmRbaV0uaGF2ZSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdyb3VwX25vZGUuY2hpbGRyZW5baV0uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JvdXBfbm9kZS5jaGlsZHJlbltpXS5nZXRDaGlsZEJ5TmFtZShcImJ1dHRvbl9pY29uXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5mcmFtZV9hcnJbMV07XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJ0aWxsXCI6XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxhbmRfZ3JvdXAuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFtpXS5oYXZlID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JvdXBfbm9kZS5jaGlsZHJlbltpXS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ncm91cF9ub2RlLmNoaWxkcmVuW2ldLmdldENoaWxkQnlOYW1lKFwiYnV0dG9uX2ljb25cIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmZyYW1lX2FyclsyXTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInBsYW50XCI6XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxhbmRfZ3JvdXAuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEubGFuZFtpXS5oYXZlID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JvdXBfbm9kZS5jaGlsZHJlbltpXS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ncm91cF9ub2RlLmNoaWxkcmVuW2ldLmdldENoaWxkQnlOYW1lKFwiYnV0dG9uX2ljb25cIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmZyYW1lX2FyclswXTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICAvL+iuvue9ruaMiemSruS9jee9rlxuICAgIHNldF9idXR0b25fcG9zaXRpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxhbmRfZ3JvdXAuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuZ3JvdXBfbm9kZS5jaGlsZHJlbltpXS5zZXRQb3NpdGlvbih0aGlzLmxhbmRfZ3JvdXAuY2hpbGRyZW5baV0ucG9zaXRpb24ueCwgdGhpcy5sYW5kX2dyb3VwLmNoaWxkcmVuW2ldLnBvc2l0aW9uLnkgKyAxNik7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvL3RvdWNoIGV4aXRcbiAgICBvbl90b3VjaF9leGl0X2J1dHRvbl9jbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fZXhpdFwiKTtcbiAgICAgICAgdGhpcy5hZF9jb250cm9sLmhpZGVfYmFubmVyQWQoKTtcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLm9uX25vZGVfa2lsbCh0aGlzLm5vZGUpO1xuICAgIH0sXG5cbiAgICAvL+W9k+aMiemSruiiq+eCueWHu1xuICAgIG9uX2J1dHRvbl9jbGljazogZnVuY3Rpb24gKGUsIGxhbmRfaW5kZXgpIHtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xuICAgICAgICB0aGlzLmFkX2NvbnRyb2wuaGlkZV9iYW5uZXJBZCgpO1xuICAgICAgICBzd2l0Y2ggKHRoaXMuYnV0dG9uX3R5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJ3YXRlcmluZ1wiOlxuICAgICAgICAgICAgICAgIHRoaXMubGFuZF9ncm91cC5jaGlsZHJlbltsYW5kX2luZGV4XS5nZXRDb21wb25lbnQoXCJsYW5kXCIpLndhdGVyX2NoYXJnZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInRpbGxcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmxhbmRfZ3JvdXAuY2hpbGRyZW5bbGFuZF9pbmRleF0uZ2V0Q29tcG9uZW50KFwibGFuZFwiKS50aWxsKCk7XG4gICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5sYW5kW2xhbmRfaW5kZXhdLmxhbmRfc3RhdGU9XCJ0aWxsaW5nXCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwicGxhbnRcIjpcbiAgICAgICAgICAgICAgICB2YXIgbm9kZSA9IHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfcGxhbnRfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUpO1xuICAgICAgICAgICAgICAgIGlmIChub2RlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJwbGFudF91aVwiKS5pbmlfbm9kZShsYW5kX2luZGV4KTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMub25fbm9kZV9raWxsKHRoaXMubm9kZSk7XG4gICAgfSxcbiAgICBvbkxvYWQoKSB7XG5cblxuICAgIH0sXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIFxuICAgIH0sXG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcbn0pO1xuIl19
//------QC-SOURCE-SPLIT------
