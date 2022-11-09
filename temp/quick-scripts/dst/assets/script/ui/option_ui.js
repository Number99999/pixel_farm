
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcb3B0aW9uX3VpLmpzIl0sIm5hbWVzIjpbInVzZXJfZGF0YSIsInJlcXVpcmUiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImdyYW5kUGFfbm9kZSIsIk5vZGUiLCJzb3VuZF9ub2RlX3Nwcml0ZSIsIlNwcml0ZSIsInNvdW5kX2ZyYW1lX2FyciIsIlNwcml0ZUZyYW1lIiwicHJvZ3Jlc3NfYmFyIiwiUHJvZ3Jlc3NCYXIiLCJpbmlfbm9kZSIsImdhbWVfc2NlbmVfanMiLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwiYWRfY29udHJvbCIsInNvdW5kX2NvbnRyb2wiLCJzY2FsZVkiLCJub2RlIiwiYWN0aXZlIiwiY2xpY2tfY291bnQiLCJzb3VuZF9zdGF0ZSIsInNwcml0ZUZyYW1lIiwiZ3JhbmRQYV9hbmltIiwidHdlZW4iLCJ0byIsImVhc2luZyIsInN0YXJ0Iiwib25fc291bmRlX2J1dHRvbl9jbGljayIsInBsYXlfc291bmRfZWZmZWN0IiwicGF1c2VfYWxsX3NvdW5kIiwicmVzdW1lX2FsbF9zb3VuZCIsInBsYXlfYmdfc291bmQiLCJvbl9ncmFuZFBhX2NsaWNrIiwicHJvZ3Jlc3MiLCJyYW5kb21fbnVtIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiaSIsImNyZWF0ZV9nb2xkX2VmZmVjdCIsIm9uX25vdmljZV9idXR0b25fY2xpY2siLCJjcmVhdGVfbm92aWNlX3VpIiwidG91Y2hfZXhpdCIsIm9uX25vZGVfa2lsbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxTQUFTLEdBQUdDLE9BQU8sQ0FBQyxXQUFELENBQXZCOztBQUNBQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsWUFBWSxFQUFFSixFQUFFLENBQUNLLElBRFQ7QUFFUkMsSUFBQUEsaUJBQWlC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akMsVUFBSUMsVUFBVSxHQUFHQyxJQUFJLENBQUNDLEtBQUwsQ0FBV0QsSUFBSSxDQUFDRSxNQUFMLEtBQWdCLENBQTNCLElBQWdDLENBQWpEO0FBQ0EsV0FBS2xCLFdBQUwsR0FBbUIsQ0FBbkI7QUFDQSxXQUFLWCxZQUFMLENBQWtCeUIsUUFBbEIsR0FBNkIsS0FBS2QsV0FBTCxHQUFtQixFQUFoRDs7QUFDQSxXQUFLLElBQUltQixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHSixVQUFwQixFQUFnQ0ksQ0FBQyxFQUFqQyxFQUFxQztBQUNqQyxhQUFLM0IsYUFBTCxDQUFtQjRCLGtCQUFuQixDQUFzQyxLQUFLckMsWUFBM0MsRUFBeURvQyxDQUF6RCxFQUEyRCxDQUEzRDtBQUNIOztBQUFBO0FBQ0o7O0FBQUE7QUFDSixHQWhFSTtBQWlFTDtBQUNBRSxFQUFBQSxzQkFsRUssb0NBa0VvQjtBQUNyQixTQUFLekIsYUFBTCxDQUFtQmEsaUJBQW5CLENBQXFDLGNBQXJDO0FBQ0EsU0FBS2pCLGFBQUwsQ0FBbUI4QixnQkFBbkI7QUFDQSxTQUFLQyxVQUFMO0FBQ0gsR0F0RUk7QUF1RUw7QUFDQUEsRUFBQUEsVUF4RUssd0JBd0VRO0FBQ1QsU0FBSzNCLGFBQUwsQ0FBbUJhLGlCQUFuQixDQUFxQyxhQUFyQztBQUNBLFNBQUtqQixhQUFMLENBQW1CZ0MsWUFBbkIsQ0FBZ0MsS0FBSzFCLElBQXJDO0FBQ0gsR0EzRUk7QUE0RUw7QUFFQVMsRUFBQUEsS0E5RUssbUJBOEVHLENBRVAsQ0FoRkksQ0FrRkw7O0FBbEZLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciB1c2VyX2RhdGEgPSByZXF1aXJlKFwidXNlcl9kYXRhXCIpO1xyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGdyYW5kUGFfbm9kZTogY2MuTm9kZSxcclxuICAgICAgICBzb3VuZF9ub2RlX3Nwcml0ZTogY2MuU3ByaXRlLFxyXG4gICAgICAgIHNvdW5kX2ZyYW1lX2FycjogW2NjLlNwcml0ZUZyYW1lXSxcclxuICAgICAgICBwcm9ncmVzc19iYXI6IGNjLlByb2dyZXNzQmFyLFxyXG4gICAgfSxcclxuICAgIC8v5Yid5aeL5YyW6IqC54K5XHJcbiAgICBpbmlfbm9kZSgpIHtcclxuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJnYW1lX3NjZW5lXCIpO1xyXG4gICAgICAgIHRoaXMuYWRfY29udHJvbCA9IGNjLmZpbmQoXCJhZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcImFkX2NvbnRyb2xcIik7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sID0gY2MuZmluZChcInNvdW5kX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwic291bmRfY29udHJvbFwiKTtcclxuICAgICAgICB0aGlzLmdyYW5kUGFfbm9kZS5zY2FsZVkgPSAwO1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3NfYmFyLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jbGlja19jb3VudCA9IDA7XHJcbiAgICAgICAgdmFyIHNvdW5kX3N0YXRlID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5zb3VuZF9zdGF0ZTtcclxuICAgICAgICBpZiAoc291bmRfc3RhdGUgPT0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLnNvdW5kX25vZGVfc3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5zb3VuZF9mcmFtZV9hcnJbMF07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zb3VuZF9ub2RlX3Nwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMuc291bmRfZnJhbWVfYXJyWzFdO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5ncmFuZFBhX2FuaW0oKTtcclxuICAgIH0sXHJcbiAgICAvL2dyYW5kUGEgYW5pbVxyXG4gICAgZ3JhbmRQYV9hbmltKCkge1xyXG4gICAgICAgIGNjLnR3ZWVuKHRoaXMuZ3JhbmRQYV9ub2RlKVxyXG4gICAgICAgICAgICAudG8oMC4zLCB7IHNjYWxlWTogMSB9LCB7IGVhc2luZzogXCJlbGFzdGljT3V0XCIgfSlcclxuICAgICAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICB9LFxyXG4gICAgLy/lvZPpn7PpopHmjInpkq7ooqvngrnlh7tcclxuICAgIG9uX3NvdW5kZV9idXR0b25fY2xpY2soKSB7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xyXG4gICAgICAgIHZhciBzb3VuZF9zdGF0ZSA9IHVzZXJfZGF0YS51c2VyX2RhdGEuc291bmRfc3RhdGU7XHJcbiAgICAgICAgaWYgKHNvdW5kX3N0YXRlID09IDEpIHtcclxuICAgICAgICAgICAgLy/lhbPpl63lo7Dpn7NcclxuICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5zb3VuZF9zdGF0ZSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuc291bmRfbm9kZV9zcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLnNvdW5kX2ZyYW1lX2FyclsxXTtcclxuICAgICAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBhdXNlX2FsbF9zb3VuZCgpO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL+W8gOWQr+WjsOmfs1xyXG4gICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnNvdW5kX3N0YXRlID0gMTtcclxuICAgICAgICAgICAgdGhpcy5zb3VuZF9ub2RlX3Nwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMuc291bmRfZnJhbWVfYXJyWzBdO1xyXG4gICAgICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucmVzdW1lX2FsbF9zb3VuZCgpO1xyXG4gICAgICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9iZ19zb3VuZChcImhvbWVfYmdcIik7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICB9LFxyXG4gICAgLy/niLfniLfooqvngrnlh7tcclxuICAgIG9uX2dyYW5kUGFfY2xpY2soKSB7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3NfYmFyLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNsaWNrX2NvdW50Kys7XHJcbiAgICAgICAgdGhpcy5wcm9ncmVzc19iYXIucHJvZ3Jlc3MgPSB0aGlzLmNsaWNrX2NvdW50IC8gMTA7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvZ3Jlc3NfYmFyLnByb2dyZXNzID09IDEpIHtcclxuICAgICAgICAgICAgdmFyIHJhbmRvbV9udW0gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA1KSArIDE7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpY2tfY291bnQgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnByb2dyZXNzX2Jhci5wcm9ncmVzcyA9IHRoaXMuY2xpY2tfY291bnQgLyAxMDtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByYW5kb21fbnVtOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfZ29sZF9lZmZlY3QodGhpcy5ncmFuZFBhX25vZGUsIGksMSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvL+aWsOaJi+W8leWvvOaMiemSruiiq+eCueWHu1xyXG4gICAgb25fbm92aWNlX2J1dHRvbl9jbGljaygpIHtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fY2xpY2tcIik7XHJcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9ub3ZpY2VfdWkoKTtcclxuICAgICAgICB0aGlzLnRvdWNoX2V4aXQoKTtcclxuICAgIH0sXHJcbiAgICAvL+eCueWHu+mAgOWHulxyXG4gICAgdG91Y2hfZXhpdCgpIHtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fZXhpdFwiKTtcclxuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMub25fbm9kZV9raWxsKHRoaXMubm9kZSk7XHJcbiAgICB9LFxyXG4gICAgLy8gb25Mb2FkICgpIHt9LFxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pO1xyXG4iXX0=