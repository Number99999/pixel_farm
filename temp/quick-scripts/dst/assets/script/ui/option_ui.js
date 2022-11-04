
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcb3B0aW9uX3VpLmpzIl0sIm5hbWVzIjpbInVzZXJfZGF0YSIsInJlcXVpcmUiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImdyYW5kUGFfbm9kZSIsIk5vZGUiLCJzb3VuZF9ub2RlX3Nwcml0ZSIsIlNwcml0ZSIsInNvdW5kX2ZyYW1lX2FyciIsIlNwcml0ZUZyYW1lIiwicHJvZ3Jlc3NfYmFyIiwiUHJvZ3Jlc3NCYXIiLCJpbmlfbm9kZSIsImdhbWVfc2NlbmVfanMiLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwiYWRfY29udHJvbCIsInNvdW5kX2NvbnRyb2wiLCJzaG93X2Jhbm5lckFkIiwic2NhbGVZIiwibm9kZSIsImFjdGl2ZSIsImNsaWNrX2NvdW50Iiwic291bmRfc3RhdGUiLCJzcHJpdGVGcmFtZSIsImdyYW5kUGFfYW5pbSIsInR3ZWVuIiwidG8iLCJlYXNpbmciLCJzdGFydCIsIm9uX3NvdW5kZV9idXR0b25fY2xpY2siLCJwbGF5X3NvdW5kX2VmZmVjdCIsInBhdXNlX2FsbF9zb3VuZCIsInJlc3VtZV9hbGxfc291bmQiLCJwbGF5X2JnX3NvdW5kIiwib25fZ3JhbmRQYV9jbGljayIsInByb2dyZXNzIiwicmFuZG9tX251bSIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImkiLCJjcmVhdGVfZ29sZF9lZmZlY3QiLCJvbl9ub3ZpY2VfYnV0dG9uX2NsaWNrIiwiY3JlYXRlX25vdmljZV91aSIsInRvdWNoX2V4aXQiLCJvbl9ub2RlX2tpbGwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsU0FBUyxHQUFHQyxPQUFPLENBQUMsV0FBRCxDQUF2Qjs7QUFDQUMsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFlBQVksRUFBRUosRUFBRSxDQUFDSyxJQURUO0FB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UUFBSSxLQUFLWixZQUFMLENBQWtCMEIsUUFBbEIsSUFBOEIsQ0FBbEMsRUFBcUM7QUFDakMsVUFBSUMsVUFBVSxHQUFHQyxJQUFJLENBQUNDLEtBQUwsQ0FBV0QsSUFBSSxDQUFDRSxNQUFMLEtBQWdCLENBQTNCLElBQWdDLENBQWpEO0FBQ0EsV0FBS2xCLFdBQUwsR0FBbUIsQ0FBbkI7QUFDQSxXQUFLWixZQUFMLENBQWtCMEIsUUFBbEIsR0FBNkIsS0FBS2QsV0FBTCxHQUFtQixFQUFoRDs7QUFDQSxXQUFLLElBQUltQixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHSixVQUFwQixFQUFnQ0ksQ0FBQyxFQUFqQyxFQUFxQztBQUNqQyxhQUFLNUIsYUFBTCxDQUFtQjZCLGtCQUFuQixDQUFzQyxLQUFLdEMsWUFBM0MsRUFBeURxQyxDQUF6RCxFQUEyRCxDQUEzRDtBQUNIOztBQUFBO0FBQ0o7O0FBQUE7QUFDSixHQWpFSTtBQWtFTDtBQUNBRSxFQUFBQSxzQkFuRUssb0NBbUVvQjtBQUNyQixTQUFLMUIsYUFBTCxDQUFtQmMsaUJBQW5CLENBQXFDLGNBQXJDO0FBQ0EsU0FBS2xCLGFBQUwsQ0FBbUIrQixnQkFBbkI7QUFDQSxTQUFLQyxVQUFMO0FBQ0gsR0F2RUk7QUF3RUw7QUFDQUEsRUFBQUEsVUF6RUssd0JBeUVRO0FBQ1QsU0FBSzVCLGFBQUwsQ0FBbUJjLGlCQUFuQixDQUFxQyxhQUFyQztBQUNBLFNBQUtsQixhQUFMLENBQW1CaUMsWUFBbkIsQ0FBZ0MsS0FBSzFCLElBQXJDO0FBQ0gsR0E1RUk7QUE2RUw7QUFFQVMsRUFBQUEsS0EvRUssbUJBK0VHLENBRVAsQ0FqRkksQ0FtRkw7O0FBbkZLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciB1c2VyX2RhdGEgPSByZXF1aXJlKFwidXNlcl9kYXRhXCIpO1xyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGdyYW5kUGFfbm9kZTogY2MuTm9kZSxcclxuICAgICAgICBzb3VuZF9ub2RlX3Nwcml0ZTogY2MuU3ByaXRlLFxyXG4gICAgICAgIHNvdW5kX2ZyYW1lX2FycjogW2NjLlNwcml0ZUZyYW1lXSxcclxuICAgICAgICBwcm9ncmVzc19iYXI6IGNjLlByb2dyZXNzQmFyLFxyXG4gICAgfSxcclxuICAgIC8v5Yid5aeL5YyW6IqC54K5XHJcbiAgICBpbmlfbm9kZSgpIHtcclxuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJnYW1lX3NjZW5lXCIpO1xyXG4gICAgICAgIHRoaXMuYWRfY29udHJvbCA9IGNjLmZpbmQoXCJhZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcImFkX2NvbnRyb2xcIik7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sID0gY2MuZmluZChcInNvdW5kX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwic291bmRfY29udHJvbFwiKTtcclxuICAgICAgICB0aGlzLmFkX2NvbnRyb2wuc2hvd19iYW5uZXJBZCgpO1xyXG4gICAgICAgIHRoaXMuZ3JhbmRQYV9ub2RlLnNjYWxlWSA9IDA7XHJcbiAgICAgICAgdGhpcy5wcm9ncmVzc19iYXIubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNsaWNrX2NvdW50ID0gMDtcclxuICAgICAgICB2YXIgc291bmRfc3RhdGUgPSB1c2VyX2RhdGEudXNlcl9kYXRhLnNvdW5kX3N0YXRlO1xyXG4gICAgICAgIGlmIChzb3VuZF9zdGF0ZSA9PSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc291bmRfbm9kZV9zcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLnNvdW5kX2ZyYW1lX2FyclswXTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNvdW5kX25vZGVfc3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5zb3VuZF9mcmFtZV9hcnJbMV07XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmdyYW5kUGFfYW5pbSgpO1xyXG4gICAgfSxcclxuICAgIC8vZ3JhbmRQYSBhbmltXHJcbiAgICBncmFuZFBhX2FuaW0oKSB7XHJcbiAgICAgICAgY2MudHdlZW4odGhpcy5ncmFuZFBhX25vZGUpXHJcbiAgICAgICAgICAgIC50bygwLjMsIHsgc2NhbGVZOiAxIH0sIHsgZWFzaW5nOiBcImVsYXN0aWNPdXRcIiB9KVxyXG4gICAgICAgICAgICAuc3RhcnQoKTtcclxuICAgIH0sXHJcbiAgICAvL+W9k+mfs+mikeaMiemSruiiq+eCueWHu1xyXG4gICAgb25fc291bmRlX2J1dHRvbl9jbGljaygpIHtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fY2xpY2tcIik7XHJcbiAgICAgICAgdmFyIHNvdW5kX3N0YXRlID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5zb3VuZF9zdGF0ZTtcclxuICAgICAgICBpZiAoc291bmRfc3RhdGUgPT0gMSkge1xyXG4gICAgICAgICAgICAvL+WFs+mXreWjsOmfs1xyXG4gICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnNvdW5kX3N0YXRlID0gMDtcclxuICAgICAgICAgICAgdGhpcy5zb3VuZF9ub2RlX3Nwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMuc291bmRfZnJhbWVfYXJyWzFdO1xyXG4gICAgICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGF1c2VfYWxsX3NvdW5kKCk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8v5byA5ZCv5aOw6Z+zXHJcbiAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuc291bmRfc3RhdGUgPSAxO1xyXG4gICAgICAgICAgICB0aGlzLnNvdW5kX25vZGVfc3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5zb3VuZF9mcmFtZV9hcnJbMF07XHJcbiAgICAgICAgICAgIHRoaXMuc291bmRfY29udHJvbC5yZXN1bWVfYWxsX3NvdW5kKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X2JnX3NvdW5kKFwiaG9tZV9iZ1wiKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgIH0sXHJcbiAgICAvL+eIt+eIt+iiq+eCueWHu1xyXG4gICAgb25fZ3JhbmRQYV9jbGljaygpIHtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fY2xpY2tcIik7XHJcbiAgICAgICAgdGhpcy5wcm9ncmVzc19iYXIubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY2xpY2tfY291bnQrKztcclxuICAgICAgICB0aGlzLnByb2dyZXNzX2Jhci5wcm9ncmVzcyA9IHRoaXMuY2xpY2tfY291bnQgLyAxMDtcclxuICAgICAgICBpZiAodGhpcy5wcm9ncmVzc19iYXIucHJvZ3Jlc3MgPT0gMSkge1xyXG4gICAgICAgICAgICB2YXIgcmFuZG9tX251bSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDUpICsgMTtcclxuICAgICAgICAgICAgdGhpcy5jbGlja19jb3VudCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NfYmFyLnByb2dyZXNzID0gdGhpcy5jbGlja19jb3VudCAvIDEwO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJhbmRvbV9udW07IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9nb2xkX2VmZmVjdCh0aGlzLmdyYW5kUGFfbm9kZSwgaSwxKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8v5paw5omL5byV5a+85oyJ6ZKu6KKr54K55Ye7XHJcbiAgICBvbl9ub3ZpY2VfYnV0dG9uX2NsaWNrKCkge1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9jbGlja1wiKTtcclxuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX25vdmljZV91aSgpO1xyXG4gICAgICAgIHRoaXMudG91Y2hfZXhpdCgpO1xyXG4gICAgfSxcclxuICAgIC8v54K55Ye76YCA5Ye6XHJcbiAgICB0b3VjaF9leGl0KCkge1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9leGl0XCIpO1xyXG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5vbl9ub2RlX2tpbGwodGhpcy5ub2RlKTtcclxuICAgIH0sXHJcbiAgICAvLyBvbkxvYWQgKCkge30sXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcclxufSk7XHJcbiJdfQ==