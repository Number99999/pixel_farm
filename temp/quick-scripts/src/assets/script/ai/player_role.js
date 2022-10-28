"use strict";
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