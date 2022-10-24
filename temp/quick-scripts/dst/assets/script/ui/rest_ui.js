
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxccmVzdF91aS5qcyJdLCJuYW1lcyI6WyJ1c2VyX2RhdGEiLCJyZXF1aXJlIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJyb2xlX3Nwcml0ZSIsIlNwcml0ZSIsInJvbGVfYXJyIiwiU3ByaXRlRnJhbWUiLCJjZW50ZXJfbm9kZSIsIk5vZGUiLCJpbmlfbm9kZSIsInN0YWZmX2luZGV4IiwiYWRfY29udHJvbCIsImZpbmQiLCJnZXRDb21wb25lbnQiLCJnYW1lX3NjZW5lX2pzIiwic291bmRfY29udHJvbCIsInNob3dfYmFubmVyQWQiLCJzcHJpdGVGcmFtZSIsInNjYWxlIiwiaW5pX2FuaW0iLCJ0d2VlbiIsInRvIiwiZWFzaW5nIiwic3RhcnQiLCJvbl9pd2FubmFfYnV0dG9uX2NsaWNrIiwibG9nIiwicGxheV9zb3VuZF9lZmZlY3QiLCJzaG93X3ZpZGVvQWQiLCJ2aWRlb19zdWNjZXMiLCJvbl90b3VjaF9leGl0X2NsaWNrIiwiZSIsIm5vZGUiLCJkZXN0cm95Iiwib25fa2VlcF9yZXN0X2J1dHRvbl9jbGljayIsImhpZGVfYmFubmVyQWQiLCJ3eCIsImNhbGxiYWNrIiwidmlkZW9fc3RhdGUiLCJ2aWRlb190YWciLCJzdGFmZiIsIm92ZXJfdGltZSIsImNyZWF0ZV90aXBzX3VpIiwidW5zY2hlZHVsZSIsInNjaGVkdWxlIiwib25Mb2FkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLFNBQVMsR0FBR0MsT0FBTyxDQUFDLFdBQUQsQ0FBdkI7O0FBQ0FDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxXQUFXLEVBQUVKLEVBQUUsQ0FBQ0ssTUFEUjtBQUVSQyxJQUFBQSxRQUFRLEVBQUUsQ0FBQ04sRUFBRSxDQUFDTyxXQUFKLENBRkY7QUFHUkMsSUFBQUEsV0FB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QWdCTixRQUFoQjtBQUNIOztBQUFBO0FBQ0o7O0FBQUE7QUFDSixPQWREOztBQWVBLFdBQUtPLFFBQUwsQ0FBY1AsUUFBZCxFQUF3QixHQUF4QjtBQUNIOztBQUFBO0FBQ0osR0E5REk7QUErRExRLEVBQUFBLE1BL0RLLG9CQStESSxDQUFHLENBL0RQO0FBaUVMckIsRUFBQUEsS0FqRUssbUJBaUVHLENBRVAsQ0FuRUksQ0FxRUw7O0FBckVLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciB1c2VyX2RhdGEgPSByZXF1aXJlKFwidXNlcl9kYXRhXCIpO1xuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgcm9sZV9zcHJpdGU6IGNjLlNwcml0ZSxcbiAgICAgICAgcm9sZV9hcnI6IFtjYy5TcHJpdGVGcmFtZV0sXG4gICAgICAgIGNlbnRlcl9ub2RlOiBjYy5Ob2RlLFxuICAgIH0sXG4gICAgLy/liJ3lp4vljJboioLngrlcbiAgICBpbmlfbm9kZShzdGFmZl9pbmRleCkge1xuICAgICAgICB0aGlzLmFkX2NvbnRyb2wgPSBjYy5maW5kKFwiYWRfY29udHJvbFwiKS5nZXRDb21wb25lbnQoXCJhZF9jb250cm9sXCIpO1xuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJnYW1lX3NjZW5lXCIpO1xuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wgPSBjYy5maW5kKFwic291bmRfY29udHJvbFwiKS5nZXRDb21wb25lbnQoXCJzb3VuZF9jb250cm9sXCIpO1xuICAgICAgICB0aGlzLmFkX2NvbnRyb2wuc2hvd19iYW5uZXJBZCgpO1xuICAgICAgICAvL+WIneWni+Wwj+S6uueahOW9ouixoVxuICAgICAgICB0aGlzLnN0YWZmX2luZGV4ID0gc3RhZmZfaW5kZXg7XG4gICAgICAgIHRoaXMucm9sZV9zcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLnJvbGVfYXJyW3N0YWZmX2luZGV4XTtcbiAgICAgICAgdGhpcy5jZW50ZXJfbm9kZS5zY2FsZSA9IDA7XG4gICAgICAgIHRoaXMuaW5pX2FuaW0oKTtcbiAgICB9LFxuICAgIC8v5Yid5aeL5YyW5Yqo55S7XG4gICAgaW5pX2FuaW0oKSB7XG4gICAgICAgIGNjLnR3ZWVuKHRoaXMuY2VudGVyX25vZGUpXG4gICAgICAgICAgICAudG8oMC4zLCB7IHNjYWxlOiAxIH0sIHsgZWFzaW5nOiBcInNpbmVPdXRcIiB9KVxuICAgICAgICAgICAgLnN0YXJ0KCk7XG4gICAgfSxcbiAgICAvL2kgd2FubmEgYnV0dG9uIGNsaWNrXG4gICAgb25faXdhbm5hX2J1dHRvbl9jbGljaygpIHtcbiAgICAgICAgY2MubG9nKFwiY3JlYXRlX2FkXCIpO1xuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fY2xpY2tcIik7XG4gICAgICAgIHRoaXMuYWRfY29udHJvbC5zaG93X3ZpZGVvQWQoXCJzdGFmZl9yZXN0XCIpO1xuICAgICAgICB0aGlzLnZpZGVvX3N1Y2NlcygpO1xuICAgIH0sXG4gICAgb25fdG91Y2hfZXhpdF9jbGljayhlKSB7XG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgfSxcbiAgICAvL2tlZXAgcmVzdFxuICAgIG9uX2tlZXBfcmVzdF9idXR0b25fY2xpY2soKSB7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9leGl0XCIpO1xuICAgICAgICB0aGlzLmFkX2NvbnRyb2wuaGlkZV9iYW5uZXJBZCgpO1xuICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xuICAgIH0sXG4gICAgLy/mo4DmtYvop4bpopHmmK/lkKbmkq3mlL7miJDlip9cbiAgICB2aWRlb19zdWNjZXM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiAod3gpICE9IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hZF9jb250cm9sLnZpZGVvX3N0YXRlID09IDEgJiYgdGhpcy5hZF9jb250cm9sLnZpZGVvX3RhZyA9PSBcInN0YWZmX3Jlc3RcIikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkX2NvbnRyb2wudmlkZW9fdGFnID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZF9jb250cm9sLnZpZGVvX3N0YXRlID0gMjtcbiAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5zdGFmZlt0aGlzLnN0YWZmX2luZGV4XS5vdmVyX3RpbWUgPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIFwic3RhZmZfcmVzdF9vdmVyXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUoY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkX2NvbnRyb2wuaGlkZV9iYW5uZXJBZCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmFkX2NvbnRyb2wudmlkZW9fdGFnID09IG51bGwgJiYgdGhpcy5hZF9jb250cm9sLnZpZGVvX3N0YXRlID09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZShjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlKGNhbGxiYWNrLCAwLjIpO1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgb25Mb2FkKCkgeyB9LFxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9LFxuXG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTtcbiJdfQ==