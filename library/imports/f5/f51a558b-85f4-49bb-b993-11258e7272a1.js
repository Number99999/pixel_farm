"use strict";
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