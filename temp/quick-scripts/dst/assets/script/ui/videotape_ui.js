
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
    this.adsManager_js = cc.find("UI_ROOT").getComponent("AdsManager");
    this.ad_control.show_bannerAd();
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
    var today = new Date();
    if (_user_data["default"].user_data.save_date == today.getDate()) this.tips_label.string = "Watched: " + _user_data["default"].user_data.watch_video + "/3";else this.tips_label.string = "Watched: 0/3";
  },
  //按钮被点击
  on_button_click: function on_button_click() {
    var _this = this;

    var today = new Date();

    if (today.getDate() == _user_data["default"].user_data.save_date && _user_data["default"].user_data.watch_video < 3) {
      this.adsManager_js.showRewardedVideo(function () {
        _user_data["default"].user_data.watch_video++;
        _this.tips_label.string = "Watched: " + _user_data["default"].user_data.watch_video + "/3";
        _user_data["default"].user_data.save_date = today.getDate();

        _this.game_rules_js.add_gold(Math.floor((500 * _user_data["default"].user_data.skill["gold_max"] + 500) / 20) + 1);

        _this.game_rules_js.add_ex(Math.floor(_user_data["default"].user_data.level / 10) + 1);
      });
    } else if (today.getDate() != _user_data["default"].user_data.save_date) {
      this.adsManager_js.showRewardedVideo(function () {
        watch_video = 1;
        _this.tips_label.string = "Watched: " + _user_data["default"].user_data.watch_video + "/3";
        _user_data["default"].user_data.save_date = today.getDate();
      });
    } else this.game_scene_js.create_tips_ui(this.game_rules_js.node, "no_video_today");
  },
  on_delete_button_click: function on_delete_button_click() {
    this.game_rules_js.videotape_path = null;
    this.game_scene_js.create_tips_ui(this.game_rules_js.node, "vidotape_cancel");
    this.ini_node();
  },
  //录屏分享
  video_share: function video_share() {
    var _this2 = this;

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
          console.log('录屏分享失败', _this2.videotape_path);
          self.videotape_share_fail();
        }
      });
    }

    ;
  },
  //录屏分享成功
  // videotape_share_succes: function () {
  //     this.game_scene_js.create_tips_ui(this.node.parent, "videotape_share_succes");
  //     this.game_rules_js.videotape_path = null;
  //     user_data.user_data.videotape_share_count++;
  //     var gold = Math.floor(this.add_gold / 6);
  //     var ex = Math.floor(this.add_ex / 3);
  //     for (var i = 0; i < 6; i++) {
  //         this.game_scene_js.create_gold_effect(this.purse_node, i, gold);
  //     };
  //     for (var i = 0; i < 5; i++) {
  //         this.game_scene_js.create_ex_effect(this.ex_node, i, ex);
  //     };
  //     this.ini_node();
  // },
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
  add_gold_video: function add_gold_video() {
    this.game_rules_js.add_gold(Math.floor((500 * _user_data["default"].user_data.skill["gold_max"] + 500) / 20) + 1);
  },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcdmlkZW90YXBlX3VpLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiZ29sZF9sYWJsZSIsIkxhYmVsIiwiZXhfbGFiZWwiLCJ0aXBzX2xhYmVsIiwiYnV0dG9uX2ZyYW1lIiwiU3ByaXRlIiwiYnV0dG9uX2ZyYW1lX2FyciIsIlNwcml0ZUZyYW1lIiwicHVyc2Vfbm9kZSIsIk5vZGUiLCJleF9ub2RlIiwiZGVsZXRlX2J1dHRvbiIsIkJ1dHRvbiIsImluaV9ub2RlIiwiZ2FtZV9ydWxlc19qcyIsImZpbmQiLCJnZXRDb21wb25lbnQiLCJnYW1lX3NjZW5lX2pzIiwic291bmRfY29udHJvbCIsImFkX2NvbnRyb2wiLCJhZHNNYW5hZ2VyX2pzIiwic2hvd19iYW5uZXJBZCIsImFkZF9nb2xkIiwiTWF0aCIsImZsb29yIiwidXNlcl9kYXRhIiwic2tpbGwiLCJhZGRfZXgiLCJsZXZlbCIsInZpZGVvdGFwZV9wYXRoIiwic3ByaXRlRnJhbWUiLCJub2RlIiwiYWN0aXZlIiwic3RyaW5nIiwidG9kYXkiLCJEYXRlIiwic2F2ZV9kYXRlIiwiZ2V0RGF0ZSIsIndhdGNoX3ZpZGVvIiwib25fYnV0dG9uX2NsaWNrIiwic2hvd1Jld2FyZGVkVmlkZW8iLCJjcmVhdGVfdGlwc191aSIsIm9uX2RlbGV0ZV9idXR0b25fY2xpY2siLCJ2aWRlb19zaGFyZSIsInd4Iiwic2VsZiIsInNoYXJlQXBwTWVzc2FnZSIsImNoYW5uZWwiLCJ0aXRsZSIsImV4dHJhIiwidmlkZW9QYXRoIiwidmlkZW9Ub3BpY3MiLCJzdWNjZXNzIiwiY29uc29sZSIsImxvZyIsInZpZGVvdGFwZV9zaGFyZV9zdWNjZXMiLCJmYWlsIiwidmlkZW90YXBlX3NoYXJlX2ZhaWwiLCJwYXJlbnQiLCJ0b3VjaF9leGl0IiwicGxheV9zb3VuZF9lZmZlY3QiLCJoaWRlX2Jhbm5lckFkIiwib25fbm9kZV9raWxsIiwiYWRkX2dv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YXRhIGZyb20gXCJ1c2VyX2RhdGFcIjtcclxuaW1wb3J0IGNvbmZpZyBmcm9tIFwiY29uZmlnXCI7XHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgZ29sZF9sYWJsZTogY2MuTGFiZWwsXHJcbiAgICAgICAgZXhfbGFiZWw6IGNjLkxhYmVsLFxyXG4gICAgICAgIHRpcHNfbGFiZWw6IGNjLkxhYmVsLFxyXG4gICAgICAgIGJ1dHRvbl9mcmFtZTogY2MuU3ByaXRlLFxyXG4gICAgICAgIGJ1dHRvbl9mcmFtZV9hcnI6IFtjYy5TcHJpdGVGcmFtZV0sXHJcbiAgICAgICAgcHVyc2Vfbm9kZTogY2MuTm9kZSxcclxuICAgICAgICBleF9ub2RlOiBjYy5Ob2RlLFxyXG4gICAgICAgIGRlbGV0ZV9idXR0b246IGNjLkJ1dHRvbixcclxuICAgIH0sXHJcbiAgICAvL+WIneWni+WMluiKgueCuVxyXG4gICAgaW5pX25vZGUoKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9ydWxlc1wiKTtcclxuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJnYW1lX3NjZW5lXCIpO1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbCA9IGNjLmZpbmQoXCJzb3VuZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcInNvdW5kX2NvbnRyb2xcIik7XHJcbiAgICAgICAgdGhpcy5hZF9jb250cm9sID0gY2MuZmluZChcImFkX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwiYWRfY29udHJvbFwiKTtcclxuICAgICAgICB0aGlzLmFkc01hbmFnZXJfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJBZHNNYW5hZ2VyXCIpO1xyXG4gICAgICAgIHRoaXMuYWRfY29udHJvbC5zaG93X2Jhbm5lckFkKCk7XHJcbiAgICAgICAgdGhpcy5hZGRfZ29sZCA9IE1hdGguZmxvb3IoKCg1MDAgKiB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1wiZ29sZF9tYXhcIl0gKyA1MDApKSAvIDIwKSArIDE7XHJcbiAgICAgICAgdGhpcy5hZGRfZXggPSBNYXRoLmZsb29yKHVzZXJfZGF0YS51c2VyX2RhdGEubGV2ZWwgLyAxMCkgKyAxO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5nYW1lX3J1bGVzX2pzLnZpZGVvdGFwZV9wYXRoID09IG51bGwpIHtcclxuICAgICAgICAgICAgLy/lvZXlsY/mnKrlvZXliLZcclxuICAgICAgICAgICAgdGhpcy5idXR0b25fZnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLmJ1dHRvbl9mcmFtZV9hcnJbMF07XHJcbiAgICAgICAgICAgIHRoaXMuZGVsZXRlX2J1dHRvbi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8v5b2V5bGP5bey5b2V5Yi2XHJcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5idXR0b25fZnJhbWVfYXJyWzFdO1xyXG4gICAgICAgICAgICB0aGlzLmRlbGV0ZV9idXR0b24ubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5nb2xkX2xhYmxlLnN0cmluZyA9IFwiK1wiICsgdGhpcy5hZGRfZ29sZDtcclxuICAgICAgICB0aGlzLmV4X2xhYmVsLnN0cmluZyA9IFwiK1wiICsgdGhpcy5hZGRfZXg7XHJcbiAgICAgICAgdmFyIHRvZGF5ID0gbmV3IERhdGUoKTtcclxuICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5zYXZlX2RhdGUgPT0gdG9kYXkuZ2V0RGF0ZSgpKVxyXG4gICAgICAgICAgICB0aGlzLnRpcHNfbGFiZWwuc3RyaW5nID0gXCJXYXRjaGVkOiBcIiArIHVzZXJfZGF0YS51c2VyX2RhdGEud2F0Y2hfdmlkZW8gKyBcIi8zXCI7XHJcbiAgICAgICAgZWxzZSB0aGlzLnRpcHNfbGFiZWwuc3RyaW5nID0gXCJXYXRjaGVkOiAwLzNcIlxyXG4gICAgfSxcclxuXHJcbiAgICAvL+aMiemSruiiq+eCueWHu1xyXG4gICAgb25fYnV0dG9uX2NsaWNrKCkge1xyXG4gICAgICAgIHZhciB0b2RheSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgaWYgKHRvZGF5LmdldERhdGUoKSA9PSB1c2VyX2RhdGEudXNlcl9kYXRhLnNhdmVfZGF0ZSAmJiB1c2VyX2RhdGEudXNlcl9kYXRhLndhdGNoX3ZpZGVvIDwgMykge1xyXG4gICAgICAgICAgICB0aGlzLmFkc01hbmFnZXJfanMuc2hvd1Jld2FyZGVkVmlkZW8oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS53YXRjaF92aWRlbysrO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aXBzX2xhYmVsLnN0cmluZyA9IFwiV2F0Y2hlZDogXCIgKyB1c2VyX2RhdGEudXNlcl9kYXRhLndhdGNoX3ZpZGVvICsgXCIvM1wiO1xyXG4gICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5zYXZlX2RhdGUgPSB0b2RheS5nZXREYXRlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMuYWRkX2dvbGQoTWF0aC5mbG9vcigoKDUwMCAqIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxbXCJnb2xkX21heFwiXSArIDUwMCkpIC8gMjApICsgMSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMuYWRkX2V4KE1hdGguZmxvb3IodXNlcl9kYXRhLnVzZXJfZGF0YS5sZXZlbCAvIDEwKSArIDEpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRvZGF5LmdldERhdGUoKSAhPSB1c2VyX2RhdGEudXNlcl9kYXRhLnNhdmVfZGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmFkc01hbmFnZXJfanMuc2hvd1Jld2FyZGVkVmlkZW8oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgd2F0Y2hfdmlkZW8gPSAxO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aXBzX2xhYmVsLnN0cmluZyA9IFwiV2F0Y2hlZDogXCIgKyB1c2VyX2RhdGEudXNlcl9kYXRhLndhdGNoX3ZpZGVvICsgXCIvM1wiO1xyXG4gICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5zYXZlX2RhdGUgPSB0b2RheS5nZXREYXRlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfcnVsZXNfanMubm9kZSwgXCJub192aWRlb190b2RheVwiKTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIG9uX2RlbGV0ZV9idXR0b25fY2xpY2soKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLnZpZGVvdGFwZV9wYXRoID0gbnVsbDtcclxuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3J1bGVzX2pzLm5vZGUsIFwidmlkb3RhcGVfY2FuY2VsXCIpO1xyXG4gICAgICAgIHRoaXMuaW5pX25vZGUoKTtcclxuICAgIH0sXHJcbiAgICAvL+W9leWxj+WIhuS6q1xyXG4gICAgdmlkZW9fc2hhcmU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodHlwZW9mICh3eCkgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZV9ydWxlc19qcy52aWRlb3RhcGVfcGF0aCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgLy/ojrflj5bliIbkuqvlr7zor61cclxuICAgICAgICAgICAgd3guc2hhcmVBcHBNZXNzYWdlKHtcclxuICAgICAgICAgICAgICAgIGNoYW5uZWw6ICd2aWRlbycsICAvL+aMh+WumuS4uuinhumikeWIhuS6q1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICdPbi1Ib29rIFNtYWxsIEZhcm0nLFxyXG4gICAgICAgICAgICAgICAgZXh0cmE6IHtcclxuICAgICAgICAgICAgICAgICAgICB2aWRlb1BhdGg6IHRoaXMuZ2FtZV9ydWxlc19qcy52aWRlb3RhcGVfcGF0aCwvLyDorr7nva7op4bpopHot6/lvoRcclxuICAgICAgICAgICAgICAgICAgICB2aWRlb1RvcGljczogW1wiT24tSG9vayBTbWFsbCBGYXJtXCIsIFwiR2FtZVwiXVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvL+WIhuS6q+Wbnuiwg1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCflvZXlsY/liIbkuqvmiJDlip8nKTtcclxuICAgICAgICAgICAgICAgICAgICAvL+WIhuS6q+WlluWKse+8jOS7heS4gOasoVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYudmlkZW90YXBlX3NoYXJlX3N1Y2NlcygpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5b2V5bGP5YiG5Lqr5aSx6LSlJywgdGhpcy52aWRlb3RhcGVfcGF0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi52aWRlb3RhcGVfc2hhcmVfZmFpbCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8v5b2V5bGP5YiG5Lqr5oiQ5YqfXHJcbiAgICAvLyB2aWRlb3RhcGVfc2hhcmVfc3VjY2VzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMubm9kZS5wYXJlbnQsIFwidmlkZW90YXBlX3NoYXJlX3N1Y2Nlc1wiKTtcclxuICAgIC8vICAgICB0aGlzLmdhbWVfcnVsZXNfanMudmlkZW90YXBlX3BhdGggPSBudWxsO1xyXG4gICAgLy8gICAgIHVzZXJfZGF0YS51c2VyX2RhdGEudmlkZW90YXBlX3NoYXJlX2NvdW50Kys7XHJcbiAgICAvLyAgICAgdmFyIGdvbGQgPSBNYXRoLmZsb29yKHRoaXMuYWRkX2dvbGQgLyA2KTtcclxuICAgIC8vICAgICB2YXIgZXggPSBNYXRoLmZsb29yKHRoaXMuYWRkX2V4IC8gMyk7XHJcbiAgICAvLyAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA2OyBpKyspIHtcclxuICAgIC8vICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9nb2xkX2VmZmVjdCh0aGlzLnB1cnNlX25vZGUsIGksIGdvbGQpO1xyXG4gICAgLy8gICAgIH07XHJcbiAgICAvLyAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgIC8vICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9leF9lZmZlY3QodGhpcy5leF9ub2RlLCBpLCBleCk7XHJcbiAgICAvLyAgICAgfTtcclxuICAgIC8vICAgICB0aGlzLmluaV9ub2RlKCk7XHJcblxyXG4gICAgLy8gfSxcclxuICAgIC8v5b2V5bGP5YiG5Lqr5aSx6LSlXHJcbiAgICB2aWRlb3RhcGVfc2hhcmVfZmFpbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLm5vZGUucGFyZW50LCBcInZpZGVvdGFwZV9zaGFyZV9mYWlsXCIpO1xyXG4gICAgICAgIHRoaXMuaW5pX25vZGUoKTtcclxuICAgIH0sXHJcbiAgICAvL+eCueWHu+mAgOWHulxyXG4gICAgdG91Y2hfZXhpdCgpIHtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fZXhpdFwiKTtcclxuICAgICAgICB0aGlzLmFkX2NvbnRyb2wuaGlkZV9iYW5uZXJBZCgpO1xyXG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5vbl9ub2RlX2tpbGwodGhpcy5ub2RlKTtcclxuICAgIH0sXHJcbiAgICAvLyBvbkxvYWQgKCkge30sXHJcblxyXG4gICAgYWRkX2dvbGRfdmlkZW86IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMuYWRkX2dvbGQoTWF0aC5mbG9vcigoKDUwMCAqIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxbXCJnb2xkX21heFwiXSArIDUwMCkpIC8gMjApICsgMSk7XHJcbiAgICB9LFxyXG4gICAgc3RhcnQoKSB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcclxufSk7XHJcbiJdfQ==