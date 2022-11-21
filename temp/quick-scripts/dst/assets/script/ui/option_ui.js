
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