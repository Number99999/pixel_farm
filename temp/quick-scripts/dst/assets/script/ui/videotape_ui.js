
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ui/videotape_ui.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '21fcbTbnSlBMYEA/XQyYuG5', 'videotape_ui');
// script/ui/videotape_ui.js

"use strict";

var _user_data = _interopRequireDefault(require("user_data"));

var _config = _interopRequireDefault(require("config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

cc.Class({
  "extends": cc.Component,
  properties: {
    gold_lable: cc.Label,
    ex_label: cc.Label,
    tips_label: cc.Label,
    button_frame: cc.Sprite,
    button_frame_arr: [cc.SpriteFrame],
    purse_node: cc.Node,
    ex_node: cc.Node,
    delete_button: cc.Button
  },
  //初始化节点
  ini_node: function ini_node() {
    this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
    this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
    this.sound_control = cc.find("sound_control").getComponent("sound_control");
    this.ad_control = cc.find("ad_control").getComponent("ad_control");
    this.ad_control.show_bannerAd(); // this.tips_label.string = "今日分享:" + user_data.user_data.videotape_share_count + "/" + config.videotape_share_max;

    this.tips_label.string = "Successfully shared:" + _user_data["default"].user_data.videotape_share_count + "Second-rate";
    this.add_gold = Math.floor((500 * _user_data["default"].user_data.skill["gold_max"] + 500) / 20) + 1;
    this.add_ex = Math.floor(_user_data["default"].user_data.level / 10) + 1;

    if (this.game_rules_js.videotape_path == null) {
      //录屏未录制
      this.button_frame.spriteFrame = this.button_frame_arr[0];
      this.delete_button.node.active = false;
    } else {
      //录屏已录制
      this.button_frame.spriteFrame = this.button_frame_arr[1];
      this.delete_button.node.active = true;
    }

    ;
    this.gold_lable.string = "+" + this.add_gold;
    this.ex_label.string = "+" + this.add_ex;
  },
  //按钮被点击
  on_button_click: function on_button_click() {
    //未开始录制点击变开始
    this.sound_control.play_sound_effect("button_click"); // if (user_data.user_data.videotape_share_count < config.videotape_share_max) {
    //还有剩余分享次数
    // } else {
    //     //提示已达分享次数
    //     this.sound_control.play_sound_effect("un_click");
    //     this.game_scene_js.create_tips_ui(this.game_rules_js.node, "share_max");
    // };

    if (this.game_rules_js.videotape_path == null) {
      this.game_rules_js.start_videotape();
      this.touch_exit();
    } else {
      this.video_share();
    }

    ;
  },
  on_delete_button_click: function on_delete_button_click() {
    this.game_rules_js.videotape_path = null;
    this.game_scene_js.create_tips_ui(this.game_rules_js.node, "vidotape_cancel");
    this.ini_node();
  },
  //录屏分享
  video_share: function video_share() {
    var _this = this;

    if (typeof wx !== "undefined") {
      if (this.game_rules_js.videotape_path == null) {
        return;
      }

      ;
      var self = this; //获取分享导语

      wx.shareAppMessage({
        channel: 'video',
        //指定为视频分享
        title: 'On-Hook Small Farm',
        extra: {
          videoPath: this.game_rules_js.videotape_path,
          // 设置视频路径
          videoTopics: ["On-Hook Small Farm", "Game"]
        },
        success: function success() {
          //分享回调
          console.log('录屏分享成功'); //分享奖励，仅一次

          self.videotape_share_succes();
        },
        fail: function fail() {
          console.log('录屏分享失败', _this.videotape_path);
          self.videotape_share_fail();
        }
      });
    }

    ;
  },
  //录屏分享成功
  videotape_share_succes: function videotape_share_succes() {
    this.game_scene_js.create_tips_ui(this.node.parent, "videotape_share_succes");
    this.game_rules_js.videotape_path = null;
    _user_data["default"].user_data.videotape_share_count++;
    var gold = Math.floor(this.add_gold / 6);
    var ex = Math.floor(this.add_ex / 3);

    for (var i = 0; i < 6; i++) {
      this.game_scene_js.create_gold_effect(this.purse_node, i, gold);
    }

    ;

    for (var i = 0; i < 5; i++) {
      this.game_scene_js.create_ex_effect(this.ex_node, i, ex);
    }

    ;
    this.ini_node();
  },
  //录屏分享失败
  videotape_share_fail: function videotape_share_fail() {
    this.game_scene_js.create_tips_ui(this.node.parent, "videotape_share_fail");
    this.ini_node();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcdmlkZW90YXBlX3VpLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiZ29sZF9sYWJsZSIsIkxhYmVsIiwiZXhfbGFiZWwiLCJ0aXBzX2xhYmVsIiwiYnV0dG9uX2ZyYW1lIiwiU3ByaXRlIiwiYnV0dG9uX2ZyYW1lX2FyciIsIlNwcml0ZUZyYW1lIiwicHVyc2Vfbm9kZSIsIk5vZGUiLCJleF9ub2RlIiwiZGVsZXRlX2J1dHRvbiIsIkJ1dHRvbiIsImluaV9ub2RlIiwiZ2FtZV9ydWxlc19qcyIsImZpbmQiLCJnZXRDb21wb25lbnQiLCJnYW1lX3NjZW5lX2pzIiwic291bmRfY29udHJvbCIsImFkX2NvbnRyb2wiLCJzaG93X2Jhbm5lckFkIiwic3RyaW5nIiwidXNlcl9kYXRhIiwidmlkZW90YXBlX3NoYXJlX2NvdW50IiwiYWRkX2dvbGQiLCJNYXRoIiwiZmxvb3IiLCJza2lsbCIsImFkZF9leCIsImxldmVsIiwidmlkZW90YXBlX3BhdGgiLCJzcHJpdGVGcmFtZSIsIm5vZGUiLCJhY3RpdmUiLCJvbl9idXR0b25fY2xpY2siLCJwbGF5X3NvdW5kX2VmZmVjdCIsInN0YXJ0X3ZpZGVvdGFwZSIsInRvdWNoX2V4aXQiLCJ2aWRlb19zaGFyZSIsIm9uX2RlbGV0ZV9idXR0b25fY2xpY2siLCJjcmVhdGVfdGlwc191aSIsInd4Iiwic2VsZiIsInNoYXJlQXBwTWVzc2FnZSIsImNoYW5uZWwiLCJ0aXRsZSIsImV4dHJhIiwidmlkZW9QYXRoIiwidmlkZW9Ub3BpY3MiLCJzdWNjZXNzIiwiY29uc29sZSIsImxvZyIsInZpZGVvdGFwZV9zaGFyZV9zdWNjZXMiLCJmYWlsIiwidmlkZW90YXBlX3NoYXJlX2ZhaWwiLCJwYXJlbnQiLCJnb2xkIiwiZXgiLCJpIiwiY3JlYXRlX2dvbGRfZWZmZWN0IiwiY3JlYXRlX2V4X2VmZmVjdCIsImhpZGVfYmFubmVyQWQiLCJvbl9ub2RlX2tp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QUNILEdBcEhJO0FBcUhMO0FBQ0F3QixFQUFBQSxVQXRISyx3QkFzSFE7QUFDVCxTQUFLbkIsYUFBTCxDQUFtQmlCLGlCQUFuQixDQUFxQyxhQUFyQztBQUNBLFNBQUtoQixVQUFMLENBQWdCMEMsYUFBaEI7QUFDQSxTQUFLNUMsYUFBTCxDQUFtQjZDLFlBQW5CLENBQWdDLEtBQUs5QixJQUFyQztBQUNILEdBMUhJO0FBMkhMO0FBRUErQixFQUFBQSxLQTdISyxtQkE2SEcsQ0FFUCxDQS9ISSxDQWlJTDs7QUFqSUssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHVzZXJfZGF0YSBmcm9tIFwidXNlcl9kYXRhXCI7XG5pbXBvcnQgY29uZmlnIGZyb20gXCJjb25maWdcIjtcbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGdvbGRfbGFibGU6IGNjLkxhYmVsLFxuICAgICAgICBleF9sYWJlbDogY2MuTGFiZWwsXG4gICAgICAgIHRpcHNfbGFiZWw6IGNjLkxhYmVsLFxuICAgICAgICBidXR0b25fZnJhbWU6IGNjLlNwcml0ZSxcbiAgICAgICAgYnV0dG9uX2ZyYW1lX2FycjogW2NjLlNwcml0ZUZyYW1lXSxcbiAgICAgICAgcHVyc2Vfbm9kZTogY2MuTm9kZSxcbiAgICAgICAgZXhfbm9kZTogY2MuTm9kZSxcbiAgICAgICAgZGVsZXRlX2J1dHRvbjogY2MuQnV0dG9uLFxuICAgIH0sXG4gICAgLy/liJ3lp4vljJboioLngrlcbiAgICBpbmlfbm9kZSgpIHtcbiAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9ydWxlc1wiKTtcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9zY2VuZVwiKTtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sID0gY2MuZmluZChcInNvdW5kX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwic291bmRfY29udHJvbFwiKTtcbiAgICAgICAgdGhpcy5hZF9jb250cm9sID0gY2MuZmluZChcImFkX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwiYWRfY29udHJvbFwiKTtcbiAgICAgICAgdGhpcy5hZF9jb250cm9sLnNob3dfYmFubmVyQWQoKTtcbiAgICAgICAgLy8gdGhpcy50aXBzX2xhYmVsLnN0cmluZyA9IFwi5LuK5pel5YiG5LqrOlwiICsgdXNlcl9kYXRhLnVzZXJfZGF0YS52aWRlb3RhcGVfc2hhcmVfY291bnQgKyBcIi9cIiArIGNvbmZpZy52aWRlb3RhcGVfc2hhcmVfbWF4O1xuICAgICAgICB0aGlzLnRpcHNfbGFiZWwuc3RyaW5nID0gXCJTdWNjZXNzZnVsbHkgc2hhcmVkOlwiICsgdXNlcl9kYXRhLnVzZXJfZGF0YS52aWRlb3RhcGVfc2hhcmVfY291bnQgK1wiU2Vjb25kLXJhdGVcIjtcbiAgICAgICAgdGhpcy5hZGRfZ29sZCA9IE1hdGguZmxvb3IoKCg1MDAgKiB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1wiZ29sZF9tYXhcIl0gKyA1MDApKSAvIDIwKSArIDE7XG4gICAgICAgIHRoaXMuYWRkX2V4ID0gTWF0aC5mbG9vcih1c2VyX2RhdGEudXNlcl9kYXRhLmxldmVsIC8gMTApICsgMTtcblxuICAgICAgICBpZiAodGhpcy5nYW1lX3J1bGVzX2pzLnZpZGVvdGFwZV9wYXRoID09IG51bGwpIHtcbiAgICAgICAgICAgIC8v5b2V5bGP5pyq5b2V5Yi2XG4gICAgICAgICAgICB0aGlzLmJ1dHRvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuYnV0dG9uX2ZyYW1lX2FyclswXTtcbiAgICAgICAgICAgIHRoaXMuZGVsZXRlX2J1dHRvbi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy/lvZXlsY/lt7LlvZXliLZcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5idXR0b25fZnJhbWVfYXJyWzFdO1xuICAgICAgICAgICAgdGhpcy5kZWxldGVfYnV0dG9uLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmdvbGRfbGFibGUuc3RyaW5nID0gXCIrXCIgKyB0aGlzLmFkZF9nb2xkO1xuICAgICAgICB0aGlzLmV4X2xhYmVsLnN0cmluZyA9IFwiK1wiICsgdGhpcy5hZGRfZXg7XG4gICAgfSxcblxuICAgIC8v5oyJ6ZKu6KKr54K55Ye7XG4gICAgb25fYnV0dG9uX2NsaWNrKCkge1xuICAgICAgICAvL+acquW8gOWni+W9leWItueCueWHu+WPmOW8gOWni1xuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fY2xpY2tcIik7XG5cbiAgICAgICAgLy8gaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEudmlkZW90YXBlX3NoYXJlX2NvdW50IDwgY29uZmlnLnZpZGVvdGFwZV9zaGFyZV9tYXgpIHtcbiAgICAgICAgLy/ov5jmnInliankvZnliIbkuqvmrKHmlbBcbiAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgLy8gICAgIC8v5o+Q56S65bey6L6+5YiG5Lqr5qyh5pWwXG4gICAgICAgIC8vICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJ1bl9jbGlja1wiKTtcbiAgICAgICAgLy8gICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfcnVsZXNfanMubm9kZSwgXCJzaGFyZV9tYXhcIik7XG4gICAgICAgIC8vIH07XG5cbiAgICAgICAgaWYgKHRoaXMuZ2FtZV9ydWxlc19qcy52aWRlb3RhcGVfcGF0aCA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMuc3RhcnRfdmlkZW90YXBlKCk7XG4gICAgICAgICAgICB0aGlzLnRvdWNoX2V4aXQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudmlkZW9fc2hhcmUoKTtcbiAgICAgICAgfTtcblxuXG4gICAgfSxcblxuICAgIFxuICAgIG9uX2RlbGV0ZV9idXR0b25fY2xpY2soKSB7XG4gICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcy52aWRlb3RhcGVfcGF0aCA9IG51bGw7XG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfcnVsZXNfanMubm9kZSwgXCJ2aWRvdGFwZV9jYW5jZWxcIik7XG4gICAgICAgIHRoaXMuaW5pX25vZGUoKTtcbiAgICB9LFxuICAgIC8v5b2V5bGP5YiG5LqrXG4gICAgdmlkZW9fc2hhcmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiAod3gpICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5nYW1lX3J1bGVzX2pzLnZpZGVvdGFwZV9wYXRoID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgLy/ojrflj5bliIbkuqvlr7zor61cbiAgICAgICAgICAgIHd4LnNoYXJlQXBwTWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgY2hhbm5lbDogJ3ZpZGVvJywgIC8v5oyH5a6a5Li66KeG6aKR5YiG5LqrXG4gICAgICAgICAgICAgICAgdGl0bGU6ICdPbi1Ib29rIFNtYWxsIEZhcm0nLFxuICAgICAgICAgICAgICAgIGV4dHJhOiB7XG4gICAgICAgICAgICAgICAgICAgIHZpZGVvUGF0aDogdGhpcy5nYW1lX3J1bGVzX2pzLnZpZGVvdGFwZV9wYXRoLC8vIOiuvue9ruinhumikei3r+W+hFxuICAgICAgICAgICAgICAgICAgICB2aWRlb1RvcGljczogW1wiT24tSG9vayBTbWFsbCBGYXJtXCIsIFwiR2FtZVwiXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvL+WIhuS6q+Wbnuiwg1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5b2V5bGP5YiG5Lqr5oiQ5YqfJyk7XG4gICAgICAgICAgICAgICAgICAgIC8v5YiG5Lqr5aWW5Yqx77yM5LuF5LiA5qyhXG4gICAgICAgICAgICAgICAgICAgIHNlbGYudmlkZW90YXBlX3NoYXJlX3N1Y2NlcygpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZmFpbDogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5b2V5bGP5YiG5Lqr5aSx6LSlJywgdGhpcy52aWRlb3RhcGVfcGF0aCk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYudmlkZW90YXBlX3NoYXJlX2ZhaWwoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIC8v5b2V5bGP5YiG5Lqr5oiQ5YqfXG4gICAgdmlkZW90YXBlX3NoYXJlX3N1Y2NlczogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5ub2RlLnBhcmVudCwgXCJ2aWRlb3RhcGVfc2hhcmVfc3VjY2VzXCIpO1xuICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMudmlkZW90YXBlX3BhdGggPSBudWxsO1xuICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnZpZGVvdGFwZV9zaGFyZV9jb3VudCsrO1xuICAgICAgICB2YXIgZ29sZCA9IE1hdGguZmxvb3IodGhpcy5hZGRfZ29sZCAvIDYpO1xuICAgICAgICB2YXIgZXggPSBNYXRoLmZsb29yKHRoaXMuYWRkX2V4IC8gMyk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNjsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX2dvbGRfZWZmZWN0KHRoaXMucHVyc2Vfbm9kZSwgaSwgZ29sZCk7XG4gICAgICAgIH07XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNTsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX2V4X2VmZmVjdCh0aGlzLmV4X25vZGUsIGksIGV4KTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5pbmlfbm9kZSgpO1xuXG4gICAgfSxcbiAgICAvL+W9leWxj+WIhuS6q+Wksei0pVxuICAgIHZpZGVvdGFwZV9zaGFyZV9mYWlsOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLm5vZGUucGFyZW50LCBcInZpZGVvdGFwZV9zaGFyZV9mYWlsXCIpO1xuICAgICAgICB0aGlzLmluaV9ub2RlKCk7XG4gICAgfSxcbiAgICAvL+eCueWHu+mAgOWHulxuICAgIHRvdWNoX2V4aXQoKSB7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9leGl0XCIpO1xuICAgICAgICB0aGlzLmFkX2NvbnRyb2wuaGlkZV9iYW5uZXJBZCgpO1xuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMub25fbm9kZV9raWxsKHRoaXMubm9kZSk7XG4gICAgfSxcbiAgICAvLyBvbkxvYWQgKCkge30sXG5cbiAgICBzdGFydCgpIHtcblxuICAgIH0sXG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcbn0pO1xuIl19