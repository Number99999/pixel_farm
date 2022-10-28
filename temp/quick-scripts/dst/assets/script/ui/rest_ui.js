
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

    this.adsManager_js.showRewardedVideo(function () {
      var callback = function callback() {
        user_data.user_data.staff[this.staff_index].over_time = 0;
        this.game_scene_js.create_tips_ui(this.game_scene_js.node, "staff_rest_over");
        this.node.destroy();
      };

      _this.schedule(callback, 0.2);
    });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxccmVzdF91aS5qcyJdLCJuYW1lcyI6WyJ1c2VyX2RhdGEiLCJyZXF1aXJlIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJyb2xlX3Nwcml0ZSIsIlNwcml0ZSIsInJvbGVfYXJyIiwiU3ByaXRlRnJhbWUiLCJjZW50ZXJfbm9kZSIsIk5vZGUiLCJpbmlfbm9kZSIsInN0YWZmX2luZGV4IiwiYWRfY29udHJvbCIsImZpbmQiLCJnZXRDb21wb25lbnQiLCJnYW1lX3NjZW5lX2pzIiwiYWRzTWFuYWdlcl9qcyIsInNvdW5kX2NvbnRyb2wiLCJzaG93X2Jhbm5lckFkIiwic3ByaXRlRnJhbWUiLCJzY2FsZSIsImluaV9hbmltIiwidHdlZW4iLCJ0byIsImVhc2luZyIsInN0YXJ0Iiwib25faXdhbm5hX2J1dHRvbl9jbGljayIsImxvZyIsInBsYXlfc291bmRfZWZmZWN0Iiwic2hvd192aWRlb0FkIiwidmlkZW9fc3VjY2VzIiwib25fdG91Y2hfZXhpdF9jbGljayIsImUiLCJub2RlIiwiZGVzdHJveSIsIm9uX2tlZXBfcmVzdF9idXR0b25fY2xpY2siLCJzaG93UmV3YXJkZWRWaWRlbyIsImNhbGxiYWNrIiwic3RhZmYiLCJvdmVyX3RpbWUiLCJjcmVhdGVfdGlwc191aSIsInNjaGVkdWxlIiwid3giLCJ2aWRlb19zdGF0ZSIsInZpZGVvX3RhZyIsInVuc2NoZWR1bGUiLCJoaWRlX2Jhbm5lckFkIiwib25Mb2FkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLFNBQVMsR0FBR0MsT0FBTyxDQUFDLFdBQUQsQ0FBdkI7O0FBQ0FDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxXQUFXLEVBQUVKLEVBQUUsQ0FBQ0ssTUFEUjtBQUVSQyxJQUFBQSxRQUFRLEVBQUUsQ0FBQ04s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QThCLENBQTlCO0FBQ0E3QyxVQUFBQSxTQUFTLENBQUNBLFNBQVYsQ0FBb0J3QyxLQUFwQixDQUEwQixLQUFLM0IsV0FBL0IsRUFBNEM0QixTQUE1QyxHQUF3RCxDQUF4RDtBQUNBLGVBQUt4QixhQUFMLENBQW1CeUIsY0FBbkIsQ0FBa0MsS0FBS3pCLGFBQUwsQ0FBbUJrQixJQUFyRCxFQUEyRCxpQkFBM0Q7QUFDQSxlQUFLWSxVQUFMLENBQWdCUixRQUFoQjtBQUNBLGVBQUt6QixVQUFMLENBQWdCa0MsYUFBaEI7QUFDQSxlQUFLYixJQUFMLENBQVVDLE9BQVY7QUFDSCxTQVJELE1BUU87QUFDSCxjQUFJLEtBQUt0QixVQUFMLENBQWdCZ0MsU0FBaEIsSUFBNkIsSUFBN0IsSUFBcUMsS0FBS2hDLFVBQUwsQ0FBZ0IrQixXQUFoQixJQUErQixDQUF4RSxFQUEyRTtBQUN2RSxpQkFBS0UsVUFBTCxDQUFnQlIsUUFBaEI7QUFDSDs7QUFBQTtBQUNKOztBQUFBO0FBQ0osT0FkRDs7QUFlQSxXQUFLSSxRQUFMLENBQWNKLFFBQWQsRUFBd0IsR0FBeEI7QUFDSDs7QUFBQTtBQUNKLEdBdEVJO0FBdUVMVSxFQUFBQSxNQXZFSyxvQkF1RUksQ0FBRyxDQXZFUDtBQXlFTHRCLEVBQUFBLEtBekVLLG1CQXlFRyxDQUVQLENBM0VJLENBNkVMOztBQTdFSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgdXNlcl9kYXRhID0gcmVxdWlyZShcInVzZXJfZGF0YVwiKTtcbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHJvbGVfc3ByaXRlOiBjYy5TcHJpdGUsXG4gICAgICAgIHJvbGVfYXJyOiBbY2MuU3ByaXRlRnJhbWVdLFxuICAgICAgICBjZW50ZXJfbm9kZTogY2MuTm9kZSxcbiAgICB9LFxuICAgIC8v5Yid5aeL5YyW6IqC54K5XG4gICAgaW5pX25vZGUoc3RhZmZfaW5kZXgpIHtcbiAgICAgICAgdGhpcy5hZF9jb250cm9sID0gY2MuZmluZChcImFkX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwiYWRfY29udHJvbFwiKTtcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9zY2VuZVwiKTtcbiAgICAgICAgdGhpcy5hZHNNYW5hZ2VyX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiQWRzTWFuYWdlclwiKTtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sID0gY2MuZmluZChcInNvdW5kX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwic291bmRfY29udHJvbFwiKTtcbiAgICAgICAgdGhpcy5hZF9jb250cm9sLnNob3dfYmFubmVyQWQoKTtcbiAgICAgICAgLy/liJ3lp4vlsI/kurrnmoTlvaLosaFcbiAgICAgICAgdGhpcy5zdGFmZl9pbmRleCA9IHN0YWZmX2luZGV4O1xuICAgICAgICB0aGlzLnJvbGVfc3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5yb2xlX2FycltzdGFmZl9pbmRleF07XG4gICAgICAgIHRoaXMuY2VudGVyX25vZGUuc2NhbGUgPSAwO1xuICAgICAgICB0aGlzLmluaV9hbmltKCk7XG4gICAgfSxcbiAgICAvL+WIneWni+WMluWKqOeUu1xuICAgIGluaV9hbmltKCkge1xuICAgICAgICBjYy50d2Vlbih0aGlzLmNlbnRlcl9ub2RlKVxuICAgICAgICAgICAgLnRvKDAuMywgeyBzY2FsZTogMSB9LCB7IGVhc2luZzogXCJzaW5lT3V0XCIgfSlcbiAgICAgICAgICAgIC5zdGFydCgpO1xuICAgIH0sXG4gICAgLy9pIHdhbm5hIGJ1dHRvbiBjbGlja1xuICAgIG9uX2l3YW5uYV9idXR0b25fY2xpY2soKSB7XG4gICAgICAgIGNjLmxvZyhcImNyZWF0ZV9hZFwiKTtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xuICAgICAgICB0aGlzLmFkX2NvbnRyb2wuc2hvd192aWRlb0FkKFwic3RhZmZfcmVzdFwiKTtcbiAgICAgICAgdGhpcy52aWRlb19zdWNjZXMoKTtcbiAgICB9LFxuICAgIG9uX3RvdWNoX2V4aXRfY2xpY2soZSkge1xuICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xuICAgIH0sXG4gICAgLy9rZWVwIHJlc3RcbiAgICBvbl9rZWVwX3Jlc3RfYnV0dG9uX2NsaWNrKCkge1xuICAgICAgICB0aGlzLmFkc01hbmFnZXJfanMuc2hvd1Jld2FyZGVkVmlkZW8oKCkgPT4ge1xuICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuc3RhZmZbdGhpcy5zdGFmZl9pbmRleF0ub3Zlcl90aW1lID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIFwic3RhZmZfcmVzdF9vdmVyXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZShjYWxsYmFjaywgMC4yKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgfSxcblxuICAgIC8v5qOA5rWL6KeG6aKR5piv5ZCm5pKt5pS+5oiQ5YqfXG4gICAgdmlkZW9fc3VjY2VzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0eXBlb2YgKHd4KSAhPSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWRfY29udHJvbC52aWRlb19zdGF0ZSA9PSAxICYmIHRoaXMuYWRfY29udHJvbC52aWRlb190YWcgPT0gXCJzdGFmZl9yZXN0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZF9jb250cm9sLnZpZGVvX3RhZyA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRfY29udHJvbC52aWRlb19zdGF0ZSA9IDI7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuc3RhZmZbdGhpcy5zdGFmZl9pbmRleF0ub3Zlcl90aW1lID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9zY2VuZV9qcy5ub2RlLCBcInN0YWZmX3Jlc3Rfb3ZlclwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZF9jb250cm9sLmhpZGVfYmFubmVyQWQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hZF9jb250cm9sLnZpZGVvX3RhZyA9PSBudWxsICYmIHRoaXMuYWRfY29udHJvbC52aWRlb19zdGF0ZSA9PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUoY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZShjYWxsYmFjaywgMC4yKTtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIG9uTG9hZCgpIHsgfSxcblxuICAgIHN0YXJ0KCkge1xuXG4gICAgfSxcblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxufSk7XG4iXX0=