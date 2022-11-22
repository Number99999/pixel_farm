
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcb3B0aW9uX3VpLmpzIl0sIm5hbWVzIjpbInVzZXJfZGF0YSIsInJlcXVpcmUiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImdyYW5kUGFfbm9kZSIsIk5vZGUiLCJzb3VuZF9ub2RlX3Nwcml0ZSIsIlNwcml0ZSIsInNvdW5kX2ZyYW1lX2FyciIsIlNwcml0ZUZyYW1lIiwicHJvZ3Jlc3NfYmFyIiwiUHJvZ3Jlc3NCYXIiLCJpbmlfbm9kZSIsImdhbWVfc2NlbmVfanMiLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwiYWRfY29udHJvbCIsInNvdW5kX2NvbnRyb2wiLCJzaG93X2Jhbm5lckFkIiwic2NhbGVZIiwibm9kZSIsImFjdGl2ZSIsImNsaWNrX2NvdW50Iiwic291bmRfc3RhdGUiLCJzcHJpdGVGcmFtZSIsImdyYW5kUGFfYW5pbSIsInR3ZWVuIiwidG8iLCJlYXNpbmciLCJzdGFydCIsIm9uX3NvdW5kZV9idXR0b25fY2xpY2siLCJwbGF5X3NvdW5kX2VmZmVjdCIsInBhdXNlX2FsbF9zb3VuZCIsInJlc3VtZV9hbGxfc291bmQiLCJwbGF5X2JnX3NvdW5kIiwib25fZ3JhbmRQYV9jbGljayIsInByb2dyZXNzIiwicmFuZG9tX251bSIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImkiLCJjcmVhdGVfZ29sZF9lZmZlY3QiLCJvbl9ub3ZpY2VfYnV0dG9uX2NsaWNrIiwiY3JlYXRlX25vdmljZV91aSIsInRvdWNoX2V4aXQiLCJoaWRlX2Jhbm5lckFkIiwib25fbm9kZV9raWxsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLFNBQVMsR0FBR0MsT0FBTyxDQUFDLFdBQUQsQ0FBdkI7O0FBQ0FDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxZQUFZLEVBQUVKLEVB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QW1CLEVBQWhEOztBQUNBLFFBQUksS0FBS1osWUFBTCxDQUFrQjBCLFFBQWxCLElBQThCLENBQWxDLEVBQXFDO0FBQ2pDLFVBQUlDLFVBQVUsR0FBR0MsSUFBSSxDQUFDQyxLQUFMLENBQVdELElBQUksQ0FBQ0UsTUFBTCxLQUFnQixDQUEzQixJQUFnQyxDQUFqRDtBQUNBLFdBQUtsQixXQUFMLEdBQW1CLENBQW5CO0FBQ0EsV0FBS1osWUFBTCxDQUFrQjBCLFFBQWxCLEdBQTZCLEtBQUtkLFdBQUwsR0FBbUIsRUFBaEQ7O0FBQ0EsV0FBSyxJQUFJbUIsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0osVUFBcEIsRUFBZ0NJLENBQUMsRUFBakMsRUFBcUM7QUFDakMsYUFBSzVCLGFBQUwsQ0FBbUI2QixrQkFBbkIsQ0FBc0MsS0FBS3RDLFlBQTNDLEVBQXlEcUMsQ0FBekQsRUFBMkQsQ0FBM0Q7QUFDSDs7QUFBQTtBQUNKOztBQUFBO0FBQ0osR0FqRUk7QUFrRUw7QUFDQUUsRUFBQUEsc0JBbkVLLG9DQW1Fb0I7QUFDckIsU0FBSzFCLGFBQUwsQ0FBbUJjLGlCQUFuQixDQUFxQyxjQUFyQztBQUNBLFNBQUtsQixhQUFMLENBQW1CK0IsZ0JBQW5CO0FBQ0EsU0FBS0MsVUFBTDtBQUNILEdBdkVJO0FBd0VMO0FBQ0FBLEVBQUFBLFVBekVLLHdCQXlFUTtBQUNULFNBQUs1QixhQUFMLENBQW1CYyxpQkFBbkIsQ0FBcUMsYUFBckM7QUFDQSxTQUFLZixVQUFMLENBQWdCOEIsYUFBaEI7QUFDQSxTQUFLakMsYUFBTCxDQUFtQmtDLFlBQW5CLENBQWdDLEtBQUszQixJQUFyQztBQUNILEdBN0VJO0FBOEVMO0FBRUFTLEVBQUFBLEtBaEZLLG1CQWdGRyxDQUVQLENBbEZJLENBb0ZMOztBQXBGSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgdXNlcl9kYXRhID0gcmVxdWlyZShcInVzZXJfZGF0YVwiKTtcclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBncmFuZFBhX25vZGU6IGNjLk5vZGUsXHJcbiAgICAgICAgc291bmRfbm9kZV9zcHJpdGU6IGNjLlNwcml0ZSxcclxuICAgICAgICBzb3VuZF9mcmFtZV9hcnI6IFtjYy5TcHJpdGVGcmFtZV0sXHJcbiAgICAgICAgcHJvZ3Jlc3NfYmFyOiBjYy5Qcm9ncmVzc0JhcixcclxuICAgIH0sXHJcbiAgICAvL+WIneWni+WMluiKgueCuVxyXG4gICAgaW5pX25vZGUoKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9zY2VuZVwiKTtcclxuICAgICAgICB0aGlzLmFkX2NvbnRyb2wgPSBjYy5maW5kKFwiYWRfY29udHJvbFwiKS5nZXRDb21wb25lbnQoXCJhZF9jb250cm9sXCIpO1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbCA9IGNjLmZpbmQoXCJzb3VuZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcInNvdW5kX2NvbnRyb2xcIik7XHJcbiAgICAgICAgdGhpcy5hZF9jb250cm9sLnNob3dfYmFubmVyQWQoKTtcclxuICAgICAgICB0aGlzLmdyYW5kUGFfbm9kZS5zY2FsZVkgPSAwO1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3NfYmFyLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jbGlja19jb3VudCA9IDA7XHJcbiAgICAgICAgdmFyIHNvdW5kX3N0YXRlID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5zb3VuZF9zdGF0ZTtcclxuICAgICAgICBpZiAoc291bmRfc3RhdGUgPT0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLnNvdW5kX25vZGVfc3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5zb3VuZF9mcmFtZV9hcnJbMF07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zb3VuZF9ub2RlX3Nwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMuc291bmRfZnJhbWVfYXJyWzFdO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5ncmFuZFBhX2FuaW0oKTtcclxuICAgIH0sXHJcbiAgICAvL2dyYW5kUGEgYW5pbVxyXG4gICAgZ3JhbmRQYV9hbmltKCkge1xyXG4gICAgICAgIGNjLnR3ZWVuKHRoaXMuZ3JhbmRQYV9ub2RlKVxyXG4gICAgICAgICAgICAudG8oMC4zLCB7IHNjYWxlWTogMSB9LCB7IGVhc2luZzogXCJlbGFzdGljT3V0XCIgfSlcclxuICAgICAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICB9LFxyXG4gICAgLy/lvZPpn7PpopHmjInpkq7ooqvngrnlh7tcclxuICAgIG9uX3NvdW5kZV9idXR0b25fY2xpY2soKSB7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xyXG4gICAgICAgIHZhciBzb3VuZF9zdGF0ZSA9IHVzZXJfZGF0YS51c2VyX2RhdGEuc291bmRfc3RhdGU7XHJcbiAgICAgICAgaWYgKHNvdW5kX3N0YXRlID09IDEpIHtcclxuICAgICAgICAgICAgLy/lhbPpl63lo7Dpn7NcclxuICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5zb3VuZF9zdGF0ZSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuc291bmRfbm9kZV9zcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLnNvdW5kX2ZyYW1lX2FyclsxXTtcclxuICAgICAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBhdXNlX2FsbF9zb3VuZCgpO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL+W8gOWQr+WjsOmfs1xyXG4gICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnNvdW5kX3N0YXRlID0gMTtcclxuICAgICAgICAgICAgdGhpcy5zb3VuZF9ub2RlX3Nwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMuc291bmRfZnJhbWVfYXJyWzBdO1xyXG4gICAgICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucmVzdW1lX2FsbF9zb3VuZCgpO1xyXG4gICAgICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9iZ19zb3VuZChcImhvbWVfYmdcIik7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICB9LFxyXG4gICAgLy/niLfniLfooqvngrnlh7tcclxuICAgIG9uX2dyYW5kUGFfY2xpY2soKSB7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3NfYmFyLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNsaWNrX2NvdW50Kys7XHJcbiAgICAgICAgdGhpcy5wcm9ncmVzc19iYXIucHJvZ3Jlc3MgPSB0aGlzLmNsaWNrX2NvdW50IC8gMTA7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvZ3Jlc3NfYmFyLnByb2dyZXNzID09IDEpIHtcclxuICAgICAgICAgICAgdmFyIHJhbmRvbV9udW0gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA1KSArIDE7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpY2tfY291bnQgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnByb2dyZXNzX2Jhci5wcm9ncmVzcyA9IHRoaXMuY2xpY2tfY291bnQgLyAxMDtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByYW5kb21fbnVtOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfZ29sZF9lZmZlY3QodGhpcy5ncmFuZFBhX25vZGUsIGksMSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvL+aWsOaJi+W8leWvvOaMiemSruiiq+eCueWHu1xyXG4gICAgb25fbm92aWNlX2J1dHRvbl9jbGljaygpIHtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fY2xpY2tcIik7XHJcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9ub3ZpY2VfdWkoKTtcclxuICAgICAgICB0aGlzLnRvdWNoX2V4aXQoKTtcclxuICAgIH0sXHJcbiAgICAvL+eCueWHu+mAgOWHulxyXG4gICAgdG91Y2hfZXhpdCgpIHtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fZXhpdFwiKTtcclxuICAgICAgICB0aGlzLmFkX2NvbnRyb2wuaGlkZV9iYW5uZXJBZCgpO1xyXG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5vbl9ub2RlX2tpbGwodGhpcy5ub2RlKTtcclxuICAgIH0sXHJcbiAgICAvLyBvbkxvYWQgKCkge30sXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcclxufSk7XHJcbiJdfQ==