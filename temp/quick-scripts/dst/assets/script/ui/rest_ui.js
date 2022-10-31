
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxccmVzdF91aS5qcyJdLCJuYW1lcyI6WyJ1c2VyX2RhdGEiLCJyZXF1aXJlIiwiY29uZmlnIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJyb2xlX3Nwcml0ZSIsIlNwcml0ZSIsInJvbGVfYXJyIiwiU3ByaXRlRnJhbWUiLCJjZW50ZXJfbm9kZSIsIk5vZGUiLCJpbmlfbm9kZSIsInN0YWZmX2luZGV4IiwiYWRfY29udHJvbCIsImZpbmQiLCJnZXRDb21wb25lbnQiLCJnYW1lX3NjZW5lX2pzIiwiYWRzTWFuYWdlcl9qcyIsInNvdW5kX2NvbnRyb2wiLCJzaG93X2Jhbm5lckFkIiwic3ByaXRlRnJhbWUiLCJzY2FsZSIsImluaV9hbmltIiwidHdlZW4iLCJ0byIsImVhc2luZyIsInN0YXJ0Iiwib25faXdhbm5hX2J1dHRvbl9jbGljayIsImxvZyIsInBsYXlfc291bmRfZWZmZWN0Iiwic2hvd192aWRlb0FkIiwidmlkZW9fc3VjY2VzIiwib25fdG91Y2hfZXhpdF9jbGljayIsImUiLCJub2RlIiwiZGVzdHJveSIsIm9uX2tlZXBfcmVzdF9idXR0b25fY2xpY2siLCJzaG93UmV3YXJkZWRWaWRlbyIsImNhbGxiYWNrIiwic3RhZmYiLCJub3dfdGltZSIsIkRhdGUiLCJnZXRUaW1lIiwib3Zlcl90aW1lIiwicmVzdF90aW1lIiwiY3JlYXRlX3RpcHNfdWkiLCJzY2hlZHVsZSIsInd4IiwidmlkZW9fc3RhdGUiLCJ2aWRlb190YWciLCJ1bnNjaGVkdWxlIiwiaGlkZV9iYW5uZXJBZCIsIm9uTG9hZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxTQUFTLEdBQUdDLE9BQU8sQ0FBQyxXQUFELENBQXZCOztBQUNBLElBQUlDLE1BQU0sR0FBR0QsT0FBTyxDQUFDLFFBQUQsQ0FBcEI7O0FBQ0FFLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxT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dGEgPSByZXF1aXJlKFwidXNlcl9kYXRhXCIpO1xyXG52YXIgY29uZmlnID0gcmVxdWlyZShcImNvbmZpZ1wiKTtcclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICByb2xlX3Nwcml0ZTogY2MuU3ByaXRlLFxyXG4gICAgICAgIHJvbGVfYXJyOiBbY2MuU3ByaXRlRnJhbWVdLFxyXG4gICAgICAgIGNlbnRlcl9ub2RlOiBjYy5Ob2RlLFxyXG4gICAgfSxcclxuICAgIC8v5Yid5aeL5YyW6IqC54K5XHJcbiAgICBpbmlfbm9kZShzdGFmZl9pbmRleCkge1xyXG4gICAgICAgIHRoaXMuYWRfY29udHJvbCA9IGNjLmZpbmQoXCJhZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcImFkX2NvbnRyb2xcIik7XHJcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9zY2VuZVwiKTtcclxuICAgICAgICB0aGlzLmFkc01hbmFnZXJfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJBZHNNYW5hZ2VyXCIpO1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbCA9IGNjLmZpbmQoXCJzb3VuZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcInNvdW5kX2NvbnRyb2xcIik7XHJcbiAgICAgICAgdGhpcy5hZF9jb250cm9sLnNob3dfYmFubmVyQWQoKTtcclxuICAgICAgICAvL+WIneWni+Wwj+S6uueahOW9ouixoVxyXG4gICAgICAgIHRoaXMuc3RhZmZfaW5kZXggPSBzdGFmZl9pbmRleDtcclxuICAgICAgICB0aGlzLnJvbGVfc3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5yb2xlX2FycltzdGFmZl9pbmRleF07XHJcbiAgICAgICAgdGhpcy5jZW50ZXJfbm9kZS5zY2FsZSA9IDA7XHJcbiAgICAgICAgdGhpcy5pbmlfYW5pbSgpO1xyXG4gICAgfSxcclxuICAgIC8v5Yid5aeL5YyW5Yqo55S7XHJcbiAgICBpbmlfYW5pbSgpIHtcclxuICAgICAgICBjYy50d2Vlbih0aGlzLmNlbnRlcl9ub2RlKVxyXG4gICAgICAgICAgICAudG8oMC4zLCB7IHNjYWxlOiAxIH0sIHsgZWFzaW5nOiBcInNpbmVPdXRcIiB9KVxyXG4gICAgICAgICAgICAuc3RhcnQoKTtcclxuICAgIH0sXHJcbiAgICAvL2kgd2FubmEgYnV0dG9uIGNsaWNrXHJcbiAgICBvbl9pd2FubmFfYnV0dG9uX2NsaWNrKCkge1xyXG4gICAgICAgIGNjLmxvZyhcImNyZWF0ZV9hZFwiKTtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fY2xpY2tcIik7XHJcbiAgICAgICAgdGhpcy5hZF9jb250cm9sLnNob3dfdmlkZW9BZChcInN0YWZmX3Jlc3RcIik7XHJcbiAgICAgICAgdGhpcy52aWRlb19zdWNjZXMoKTtcclxuICAgIH0sXHJcbiAgICBvbl90b3VjaF9leGl0X2NsaWNrKGUpIHtcclxuICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgfSxcclxuICAgIC8va2VlcCByZXN0XHJcbiAgICBvbl9rZWVwX3Jlc3RfYnV0dG9uX2NsaWNrKCkge1xyXG4gICAgICAgIC8vIHVzZXJfZGF0YS51c2VyX2RhdGEuc3RhZmZbdGhpcy5zdGFmZl9pbmRleF0ubm93X3RpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSAvMTAwMDtcclxuICAgICAgICAvLyB1c2VyX2RhdGEudXNlcl9kYXRhLnN0YWZmW3RoaXMuc3RhZmZfaW5kZXhdLm92ZXJfdGltZSAtPSBjb25maWcuc3RhZmZbdGhpcy5zdGFmZl9pbmRleF0ucmVzdF90aW1lO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiNDMgbm93IHRpbWUgXCIgKyB1c2VyX2RhdGEudXNlcl9kYXRhLnN0YWZmW3RoaXMuc3RhZmZfaW5kZXhdLm5vd190aW1lICk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCI0NCByZXN0IHRpbWUgXCIgKyBjb25maWcuc3RhZmZbdGhpcy5zdGFmZl9pbmRleF0ucmVzdF90aW1lICk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCI0NSBvdmVyIHRpbWVcIiArIHVzZXJfZGF0YS51c2VyX2RhdGEuc3RhZmZbdGhpcy5zdGFmZl9pbmRleF0ub3Zlcl90aW1lKTtcclxuICAgICAgICB0aGlzLmFkc01hbmFnZXJfanMuc2hvd1Jld2FyZGVkVmlkZW8oKCkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIFwic3RhZmZfcmVzdF9vdmVyXCIpO1xyXG4gICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5zdGFmZlt0aGlzLnN0YWZmX2luZGV4XS5ub3dfdGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMDtcclxuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuc3RhZmZbdGhpcy5zdGFmZl9pbmRleF0ub3Zlcl90aW1lIC09IGNvbmZpZy5zdGFmZlt0aGlzLnN0YWZmX2luZGV4XS5yZXN0X3RpbWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIFwic3RhZmZfcmVzdF9vdmVyXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZShjYWxsYmFjaywgMC4yKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLy/mo4DmtYvop4bpopHmmK/lkKbmkq3mlL7miJDlip9cclxuICAgIHZpZGVvX3N1Y2NlczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgKHd4KSAhPSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFkX2NvbnRyb2wudmlkZW9fc3RhdGUgPT0gMSAmJiB0aGlzLmFkX2NvbnRyb2wudmlkZW9fdGFnID09IFwic3RhZmZfcmVzdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZF9jb250cm9sLnZpZGVvX3RhZyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZF9jb250cm9sLnZpZGVvX3N0YXRlID0gMjtcclxuICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnN0YWZmW3RoaXMuc3RhZmZfaW5kZXhdLm92ZXJfdGltZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9zY2VuZV9qcy5ub2RlLCBcInN0YWZmX3Jlc3Rfb3ZlclwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUoY2FsbGJhY2spO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRfY29udHJvbC5oaWRlX2Jhbm5lckFkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYWRfY29udHJvbC52aWRlb190YWcgPT0gbnVsbCAmJiB0aGlzLmFkX2NvbnRyb2wudmlkZW9fc3RhdGUgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUoY2FsbGJhY2spO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlKGNhbGxiYWNrLCAwLjIpO1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgb25Mb2FkKCkgeyB9LFxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pO1xyXG4iXX0=