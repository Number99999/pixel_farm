
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
    this.adsManager_js = cc.find("UI_ROOT").getComponent("AdsManager"); //初始小人的形象

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxccmVzdF91aS5qcyJdLCJuYW1lcyI6WyJ1c2VyX2RhdGEiLCJyZXF1aXJlIiwiY29uZmlnIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJyb2xlX3Nwcml0ZSIsIlNwcml0ZSIsInJvbGVfYXJyIiwiU3ByaXRlRnJhbWUiLCJjZW50ZXJfbm9kZSIsIk5vZGUiLCJpbmlfbm9kZSIsInN0YWZmX2luZGV4IiwiYWRfY29udHJvbCIsImZpbmQiLCJnZXRDb21wb25lbnQiLCJnYW1lX3NjZW5lX2pzIiwiYWRzTWFuYWdlcl9qcyIsInNwcml0ZUZyYW1lIiwic2NhbGUiLCJpbmlfYW5pbSIsInR3ZWVuIiwidG8iLCJlYXNpbmciLCJzdGFydCIsIm9uX2l3YW5uYV9idXR0b25fY2xpY2siLCJsb2ciLCJzb3VuZF9jb250cm9sIiwicGxheV9zb3VuZF9lZmZlY3QiLCJzaG93X3ZpZGVvQWQiLCJ2aWRlb19zdWNjZXMiLCJvbl90b3VjaF9leGl0X2NsaWNrIiwiZSIsIm5vZGUiLCJkZXN0cm95Iiwib25fa2VlcF9yZXN0X2J1dHRvbl9jbGljayIsInNob3dSZXdhcmRlZFZpZGVvIiwiY2FsbGJhY2siLCJzdGFmZiIsIm5vd190aW1lIiwiRGF0ZSIsImdldFRpbWUiLCJvdmVyX3RpbWUiLCJyZXN0X3RpbWUiLCJjcmVhdGVfdGlwc191aSIsInNjaGVkdWxlIiwid3giLCJ2aWRlb19zdGF0ZSIsInZpZGVvX3RhZyIsInVuc2NoZWR1bGUiLCJvbkxvYWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsU0FBUyxHQUFHQyxPQUFPLENBQUMsV0FBRCxDQUF2Qjs7QUFDQSxJQUFJQyxNQUFNLEdBQUdELE9BQU8sQ0FBQyxRQUFELENBQXBCOztBQUNBRSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMs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LFVBQUwsQ0FBZ0JtQyxTQUFoQixJQUE2QixZQUFyRSxFQUFtRjtBQUMvRSxlQUFLbkMsVUFBTCxDQUFnQm1DLFNBQWhCLEdBQTRCLElBQTVCO0FBQ0EsZUFBS25DLFVBQUwsQ0FBZ0JrQyxXQUFoQixHQUE4QixDQUE5QjtBQUNBakQsVUFBQUEsU0FBUyxDQUFDQSxTQUFWLENBQW9Cd0MsS0FBcEIsQ0FBMEIsS0FBSzFCLFdBQS9CLEVBQTRDOEIsU0FBNUMsR0FBd0QsQ0FBeEQ7QUFDQSxlQUFLMUIsYUFBTCxDQUFtQjRCLGNBQW5CLENBQWtDLEtBQUs1QixhQUFMLENBQW1CaUIsSUFBckQsRUFBMkQsaUJBQTNEO0FBQ0EsZUFBS2dCLFVBQUwsQ0FBZ0JaLFFBQWhCO0FBQ0EsZUFBS0osSUFBTCxDQUFVQyxPQUFWO0FBQ0gsU0FQRCxNQU9PO0FBQ0gsY0FBSSxLQUFLckIsVUFBTCxDQUFnQm1DLFNBQWhCLElBQTZCLElBQTdCLElBQXFDLEtBQUtuQyxVQUFMLENBQWdCa0MsV0FBaEIsSUFBK0IsQ0FBeEUsRUFBMkU7QUFDdkUsaUJBQUtFLFVBQUwsQ0FBZ0JaLFFBQWhCO0FBQ0g7O0FBQUE7QUFDSjs7QUFBQTtBQUNKLE9BYkQ7O0FBY0EsV0FBS1EsUUFBTCxDQUFjUixRQUFkLEVBQXdCLEdBQXhCO0FBQ0g7O0FBQUE7QUFDSixHQXpFSTtBQTBFTGEsRUFBQUEsTUExRUssb0JBMEVJLENBQUcsQ0ExRVA7QUE0RUwxQixFQUFBQSxLQTVFSyxtQkE0RUcsQ0FFUCxDQTlFSSxDQWdGTDs7QUFoRkssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHVzZXJfZGF0YSA9IHJlcXVpcmUoXCJ1c2VyX2RhdGFcIik7XHJcbnZhciBjb25maWcgPSByZXF1aXJlKFwiY29uZmlnXCIpO1xyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIHJvbGVfc3ByaXRlOiBjYy5TcHJpdGUsXHJcbiAgICAgICAgcm9sZV9hcnI6IFtjYy5TcHJpdGVGcmFtZV0sXHJcbiAgICAgICAgY2VudGVyX25vZGU6IGNjLk5vZGUsXHJcbiAgICB9LFxyXG4gICAgLy/liJ3lp4vljJboioLngrlcclxuICAgIGluaV9ub2RlKHN0YWZmX2luZGV4KSB7XHJcbiAgICAgICAgdGhpcy5hZF9jb250cm9sID0gY2MuZmluZChcImFkX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwiYWRfY29udHJvbFwiKTtcclxuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJnYW1lX3NjZW5lXCIpO1xyXG4gICAgICAgIHRoaXMuYWRzTWFuYWdlcl9qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcIkFkc01hbmFnZXJcIik7XHJcbiAgICAgICAgLy/liJ3lp4vlsI/kurrnmoTlvaLosaFcclxuICAgICAgICB0aGlzLnN0YWZmX2luZGV4ID0gc3RhZmZfaW5kZXg7XHJcbiAgICAgICAgdGhpcy5yb2xlX3Nwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMucm9sZV9hcnJbc3RhZmZfaW5kZXhdO1xyXG4gICAgICAgIHRoaXMuY2VudGVyX25vZGUuc2NhbGUgPSAwO1xyXG4gICAgICAgIHRoaXMuaW5pX2FuaW0oKTtcclxuICAgIH0sXHJcbiAgICAvL+WIneWni+WMluWKqOeUu1xyXG4gICAgaW5pX2FuaW0oKSB7XHJcbiAgICAgICAgY2MudHdlZW4odGhpcy5jZW50ZXJfbm9kZSlcclxuICAgICAgICAgICAgLnRvKDAuMywgeyBzY2FsZTogMSB9LCB7IGVhc2luZzogXCJzaW5lT3V0XCIgfSlcclxuICAgICAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICB9LFxyXG4gICAgLy9pIHdhbm5hIGJ1dHRvbiBjbGlja1xyXG4gICAgb25faXdhbm5hX2J1dHRvbl9jbGljaygpIHtcclxuICAgICAgICBjYy5sb2coXCJjcmVhdGVfYWRcIik7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xyXG4gICAgICAgIHRoaXMuYWRfY29udHJvbC5zaG93X3ZpZGVvQWQoXCJzdGFmZl9yZXN0XCIpO1xyXG4gICAgICAgIHRoaXMudmlkZW9fc3VjY2VzKCk7XHJcbiAgICB9LFxyXG4gICAgb25fdG91Y2hfZXhpdF9jbGljayhlKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcclxuICAgIH0sXHJcbiAgICAvL2tlZXAgcmVzdFxyXG4gICAgb25fa2VlcF9yZXN0X2J1dHRvbl9jbGljaygpIHtcclxuICAgICAgICAvLyB1c2VyX2RhdGEudXNlcl9kYXRhLnN0YWZmW3RoaXMuc3RhZmZfaW5kZXhdLm5vd190aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgLzEwMDA7XHJcbiAgICAgICAgLy8gdXNlcl9kYXRhLnVzZXJfZGF0YS5zdGFmZlt0aGlzLnN0YWZmX2luZGV4XS5vdmVyX3RpbWUgLT0gY29uZmlnLnN0YWZmW3RoaXMuc3RhZmZfaW5kZXhdLnJlc3RfdGltZTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIjQzIG5vdyB0aW1lIFwiICsgdXNlcl9kYXRhLnVzZXJfZGF0YS5zdGFmZlt0aGlzLnN0YWZmX2luZGV4XS5ub3dfdGltZSApO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiNDQgcmVzdCB0aW1lIFwiICsgY29uZmlnLnN0YWZmW3RoaXMuc3RhZmZfaW5kZXhdLnJlc3RfdGltZSApO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiNDUgb3ZlciB0aW1lXCIgKyB1c2VyX2RhdGEudXNlcl9kYXRhLnN0YWZmW3RoaXMuc3RhZmZfaW5kZXhdLm92ZXJfdGltZSk7XHJcbiAgICAgICAgdGhpcy5hZHNNYW5hZ2VyX2pzLnNob3dSZXdhcmRlZFZpZGVvKCgpID0+IHtcclxuICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9zY2VuZV9qcy5ub2RlLCBcInN0YWZmX3Jlc3Rfb3ZlclwiKTtcclxuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuc3RhZmZbdGhpcy5zdGFmZl9pbmRleF0ubm93X3RpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDA7XHJcbiAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnN0YWZmW3RoaXMuc3RhZmZfaW5kZXhdLm92ZXJfdGltZSAtPSBjb25maWcuc3RhZmZbdGhpcy5zdGFmZl9pbmRleF0ucmVzdF90aW1lO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9zY2VuZV9qcy5ub2RlLCBcInN0YWZmX3Jlc3Rfb3ZlclwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUoY2FsbGJhY2ssIDAuMik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8v5qOA5rWL6KeG6aKR5piv5ZCm5pKt5pS+5oiQ5YqfXHJcbiAgICB2aWRlb19zdWNjZXM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodHlwZW9mICh3eCkgIT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hZF9jb250cm9sLnZpZGVvX3N0YXRlID09IDEgJiYgdGhpcy5hZF9jb250cm9sLnZpZGVvX3RhZyA9PSBcInN0YWZmX3Jlc3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRfY29udHJvbC52aWRlb190YWcgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRfY29udHJvbC52aWRlb19zdGF0ZSA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5zdGFmZlt0aGlzLnN0YWZmX2luZGV4XS5vdmVyX3RpbWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfc2NlbmVfanMubm9kZSwgXCJzdGFmZl9yZXN0X292ZXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKGNhbGxiYWNrKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hZF9jb250cm9sLnZpZGVvX3RhZyA9PSBudWxsICYmIHRoaXMuYWRfY29udHJvbC52aWRlb19zdGF0ZSA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZShjYWxsYmFjayk7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUoY2FsbGJhY2ssIDAuMik7XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBvbkxvYWQoKSB7IH0sXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcclxufSk7XHJcbiJdfQ==