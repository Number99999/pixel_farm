
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcdmlkZW90YXBlX3VpLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiZ29sZF9sYWJsZSIsIkxhYmVsIiwiZXhfbGFiZWwiLCJ0aXBzX2xhYmVsIiwiYnV0dG9uX2ZyYW1lIiwiU3ByaXRlIiwiYnV0dG9uX2ZyYW1lX2FyciIsIlNwcml0ZUZyYW1lIiwicHVyc2Vfbm9kZSIsIk5vZGUiLCJleF9ub2RlIiwiZGVsZXRlX2J1dHRvbiIsIkJ1dHRvbiIsImluaV9ub2RlIiwiZ2FtZV9ydWxlc19qcyIsImZpbmQiLCJnZXRDb21wb25lbnQiLCJnYW1lX3NjZW5lX2pzIiwic291bmRfY29udHJvbCIsImFkX2NvbnRyb2wiLCJhZHNNYW5hZ2VyX2pzIiwiYWRkX2dvbGQiLCJNYXRoIiwiZmxvb3IiLCJ1c2VyX2RhdGEiLCJza2lsbCIsImFkZF9leCIsImxldmVsIiwidmlkZW90YXBlX3BhdGgiLCJzcHJpdGVGcmFtZSIsIm5vZGUiLCJhY3RpdmUiLCJzdHJpbmciLCJ0b2RheSIsIkRhdGUiLCJzYXZlX2RhdGUiLCJnZXREYXRlIiwid2F0Y2hfdmlkZW8iLCJvbl9idXR0b25fY2xpY2siLCJzaG93UmV3YXJkZWRWaWRlbyIsImNyZWF0ZV90aXBzX3VpIiwib25fZGVsZXRlX2J1dHRvbl9jbGljayIsInZpZGVvX3NoYXJlIiwid3giLCJzZWxmIiwic2hhcmVBcHBNZXNzYWdlIiwiY2hhbm5lbCIsInRpdGxlIiwiZXh0cmEiLCJ2aWRlb1BhdGgiLCJ2aWRlb1RvcGljcyIsInN1Y2Nlc3MiLCJjb25zb2xlIiwibG9nIiwidmlkZW90YXBlX3NoYXJlX3N1Y2NlcyIsImZhaWwiLCJ2aWRlb3RhcGVfc2hhcmVfZmFpbCIsInBhcmVudCIsInRvdWNoX2V4aXQiLCJwbGF5X3NvdW5kX2VmZmVjdCIsIm9uX25vZGVfa2lsbCIsImFkZF9nb2xkX3ZpZGVvIiwic3RhcnQiXSwibWFwcGluZ3MiOiI7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QyxRQUFBQSxJQUFJLEVBQUUsZ0JBQU07QUFDUkgsVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksUUFBWixFQUFzQixNQUFJLENBQUN6QixjQUEzQjtBQUNBZ0IsVUFBQUEsSUFBSSxDQUFDWSxvQkFBTDtBQUNIO0FBaEJjLE9BQW5CO0FBa0JIOztBQUFBO0FBQ0osR0FoR0k7QUFpR0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQUEsRUFBQUEsb0JBQW9CLEVBQUUsZ0NBQVk7QUFDOUIsU0FBS3ZDLGFBQUwsQ0FBbUJ1QixjQUFuQixDQUFrQyxLQUFLVixJQUFMLENBQVUyQixNQUE1QyxFQUFvRCxzQkFBcEQ7QUFDQSxTQUFLNUMsUUFBTDtBQUNILEdBckhJO0FBc0hMO0FBQ0E2QyxFQUFBQSxVQXZISyx3QkF1SFE7QUFDVCxTQUFLeEMsYUFBTCxDQUFtQnlDLGlCQUFuQixDQUFxQyxhQUFyQztBQUNBLFNBQUsxQyxhQUFMLENBQW1CMkMsWUFBbkIsQ0FBZ0MsS0FBSzlCLElBQXJDO0FBQ0gsR0ExSEk7QUEySEw7QUFFQStCLEVBQUFBLGNBQWMsRUFBRSwwQkFBWTtBQUN4QixTQUFLL0MsYUFBTCxDQUFtQk8sUUFBbkIsQ0FBNEJDLElBQUksQ0FBQ0MsS0FBTCxDQUFXLENBQUUsTUFBTUMsc0JBQVVBLFNBQVYsQ0FBb0JDLEtBQXBCLENBQTBCLFVBQTFCLENBQU4sR0FBOEMsR0FBaEQsSUFBd0QsRUFBbkUsSUFBeUUsQ0FBckc7QUFDSCxHQS9ISTtBQWdJTHFDLEVBQUFBLEtBaElLLG1CQWdJRyxDQUVQLENBbElJLENBb0lMOztBQXBJSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdXNlcl9kYXRhIGZyb20gXCJ1c2VyX2RhdGFcIjtcclxuaW1wb3J0IGNvbmZpZyBmcm9tIFwiY29uZmlnXCI7XHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgZ29sZF9sYWJsZTogY2MuTGFiZWwsXHJcbiAgICAgICAgZXhfbGFiZWw6IGNjLkxhYmVsLFxyXG4gICAgICAgIHRpcHNfbGFiZWw6IGNjLkxhYmVsLFxyXG4gICAgICAgIGJ1dHRvbl9mcmFtZTogY2MuU3ByaXRlLFxyXG4gICAgICAgIGJ1dHRvbl9mcmFtZV9hcnI6IFtjYy5TcHJpdGVGcmFtZV0sXHJcbiAgICAgICAgcHVyc2Vfbm9kZTogY2MuTm9kZSxcclxuICAgICAgICBleF9ub2RlOiBjYy5Ob2RlLFxyXG4gICAgICAgIGRlbGV0ZV9idXR0b246IGNjLkJ1dHRvbixcclxuICAgIH0sXHJcbiAgICAvL+WIneWni+WMluiKgueCuVxyXG4gICAgaW5pX25vZGUoKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9ydWxlc1wiKTtcclxuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJnYW1lX3NjZW5lXCIpO1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbCA9IGNjLmZpbmQoXCJzb3VuZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcInNvdW5kX2NvbnRyb2xcIik7XHJcbiAgICAgICAgdGhpcy5hZF9jb250cm9sID0gY2MuZmluZChcImFkX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwiYWRfY29udHJvbFwiKTtcclxuICAgICAgICB0aGlzLmFkc01hbmFnZXJfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJBZHNNYW5hZ2VyXCIpO1xyXG4gICAgICAgIHRoaXMuYWRkX2dvbGQgPSBNYXRoLmZsb29yKCgoNTAwICogdXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbFtcImdvbGRfbWF4XCJdICsgNTAwKSkgLyAyMCkgKyAxO1xyXG4gICAgICAgIHRoaXMuYWRkX2V4ID0gTWF0aC5mbG9vcih1c2VyX2RhdGEudXNlcl9kYXRhLmxldmVsIC8gMTApICsgMTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZ2FtZV9ydWxlc19qcy52aWRlb3RhcGVfcGF0aCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIC8v5b2V5bGP5pyq5b2V5Yi2XHJcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5idXR0b25fZnJhbWVfYXJyWzBdO1xyXG4gICAgICAgICAgICB0aGlzLmRlbGV0ZV9idXR0b24ubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL+W9leWxj+W3suW9leWItlxyXG4gICAgICAgICAgICB0aGlzLmJ1dHRvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuYnV0dG9uX2ZyYW1lX2FyclsxXTtcclxuICAgICAgICAgICAgdGhpcy5kZWxldGVfYnV0dG9uLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuZ29sZF9sYWJsZS5zdHJpbmcgPSBcIitcIiArIHRoaXMuYWRkX2dvbGQ7XHJcbiAgICAgICAgdGhpcy5leF9sYWJlbC5zdHJpbmcgPSBcIitcIiArIHRoaXMuYWRkX2V4O1xyXG4gICAgICAgIHZhciB0b2RheSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEuc2F2ZV9kYXRlID09IHRvZGF5LmdldERhdGUoKSlcclxuICAgICAgICAgICAgdGhpcy50aXBzX2xhYmVsLnN0cmluZyA9IFwiV2F0Y2hlZDogXCIgKyB1c2VyX2RhdGEudXNlcl9kYXRhLndhdGNoX3ZpZGVvICsgXCIvM1wiO1xyXG4gICAgICAgIGVsc2UgdGhpcy50aXBzX2xhYmVsLnN0cmluZyA9IFwiV2F0Y2hlZDogMC8zXCJcclxuICAgIH0sXHJcblxyXG4gICAgLy/mjInpkq7ooqvngrnlh7tcclxuICAgIG9uX2J1dHRvbl9jbGljaygpIHtcclxuICAgICAgICB2YXIgdG9kYXkgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIGlmICh0b2RheS5nZXREYXRlKCkgPT0gdXNlcl9kYXRhLnVzZXJfZGF0YS5zYXZlX2RhdGUgJiYgdXNlcl9kYXRhLnVzZXJfZGF0YS53YXRjaF92aWRlbyA8IDMpIHtcclxuICAgICAgICAgICAgdGhpcy5hZHNNYW5hZ2VyX2pzLnNob3dSZXdhcmRlZFZpZGVvKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEud2F0Y2hfdmlkZW8rKztcclxuICAgICAgICAgICAgICAgIHRoaXMudGlwc19sYWJlbC5zdHJpbmcgPSBcIldhdGNoZWQ6IFwiICsgdXNlcl9kYXRhLnVzZXJfZGF0YS53YXRjaF92aWRlbyArIFwiLzNcIjtcclxuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuc2F2ZV9kYXRlID0gdG9kYXkuZ2V0RGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLmFkZF9nb2xkKE1hdGguZmxvb3IoKCg1MDAgKiB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1wiZ29sZF9tYXhcIl0gKyA1MDApKSAvIDIwKSArIDEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLmFkZF9leChNYXRoLmZsb29yKHVzZXJfZGF0YS51c2VyX2RhdGEubGV2ZWwgLyAxMCkgKyAxKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0b2RheS5nZXREYXRlKCkgIT0gdXNlcl9kYXRhLnVzZXJfZGF0YS5zYXZlX2RhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5hZHNNYW5hZ2VyX2pzLnNob3dSZXdhcmRlZFZpZGVvKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHdhdGNoX3ZpZGVvID0gMTtcclxuICAgICAgICAgICAgICAgIHRoaXMudGlwc19sYWJlbC5zdHJpbmcgPSBcIldhdGNoZWQ6IFwiICsgdXNlcl9kYXRhLnVzZXJfZGF0YS53YXRjaF92aWRlbyArIFwiLzNcIjtcclxuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuc2F2ZV9kYXRlID0gdG9kYXkuZ2V0RGF0ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3J1bGVzX2pzLm5vZGUsIFwibm9fdmlkZW9fdG9kYXlcIik7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICBvbl9kZWxldGVfYnV0dG9uX2NsaWNrKCkge1xyXG4gICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcy52aWRlb3RhcGVfcGF0aCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9ydWxlc19qcy5ub2RlLCBcInZpZG90YXBlX2NhbmNlbFwiKTtcclxuICAgICAgICB0aGlzLmluaV9ub2RlKCk7XHJcbiAgICB9LFxyXG4gICAgLy/lvZXlsY/liIbkuqtcclxuICAgIHZpZGVvX3NoYXJlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiAod3gpICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmdhbWVfcnVsZXNfanMudmlkZW90YXBlX3BhdGggPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIC8v6I635Y+W5YiG5Lqr5a+86K+tXHJcbiAgICAgICAgICAgIHd4LnNoYXJlQXBwTWVzc2FnZSh7XHJcbiAgICAgICAgICAgICAgICBjaGFubmVsOiAndmlkZW8nLCAgLy/mjIflrprkuLrop4bpopHliIbkuqtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAnT24tSG9vayBTbWFsbCBGYXJtJyxcclxuICAgICAgICAgICAgICAgIGV4dHJhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmlkZW9QYXRoOiB0aGlzLmdhbWVfcnVsZXNfanMudmlkZW90YXBlX3BhdGgsLy8g6K6+572u6KeG6aKR6Lev5b6EXHJcbiAgICAgICAgICAgICAgICAgICAgdmlkZW9Ub3BpY3M6IFtcIk9uLUhvb2sgU21hbGwgRmFybVwiLCBcIkdhbWVcIl1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/liIbkuqvlm57osINcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5b2V5bGP5YiG5Lqr5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/liIbkuqvlpZblirHvvIzku4XkuIDmrKFcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnZpZGVvdGFwZV9zaGFyZV9zdWNjZXMoKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmYWlsOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+W9leWxj+WIhuS6q+Wksei0pScsIHRoaXMudmlkZW90YXBlX3BhdGgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYudmlkZW90YXBlX3NoYXJlX2ZhaWwoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvL+W9leWxj+WIhuS6q+aIkOWKn1xyXG4gICAgLy8gdmlkZW90YXBlX3NoYXJlX3N1Y2NlczogZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLm5vZGUucGFyZW50LCBcInZpZGVvdGFwZV9zaGFyZV9zdWNjZXNcIik7XHJcbiAgICAvLyAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLnZpZGVvdGFwZV9wYXRoID0gbnVsbDtcclxuICAgIC8vICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnZpZGVvdGFwZV9zaGFyZV9jb3VudCsrO1xyXG4gICAgLy8gICAgIHZhciBnb2xkID0gTWF0aC5mbG9vcih0aGlzLmFkZF9nb2xkIC8gNik7XHJcbiAgICAvLyAgICAgdmFyIGV4ID0gTWF0aC5mbG9vcih0aGlzLmFkZF9leCAvIDMpO1xyXG4gICAgLy8gICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNjsgaSsrKSB7XHJcbiAgICAvLyAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfZ29sZF9lZmZlY3QodGhpcy5wdXJzZV9ub2RlLCBpLCBnb2xkKTtcclxuICAgIC8vICAgICB9O1xyXG4gICAgLy8gICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICAvLyAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfZXhfZWZmZWN0KHRoaXMuZXhfbm9kZSwgaSwgZXgpO1xyXG4gICAgLy8gICAgIH07XHJcbiAgICAvLyAgICAgdGhpcy5pbmlfbm9kZSgpO1xyXG5cclxuICAgIC8vIH0sXHJcbiAgICAvL+W9leWxj+WIhuS6q+Wksei0pVxyXG4gICAgdmlkZW90YXBlX3NoYXJlX2ZhaWw6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5ub2RlLnBhcmVudCwgXCJ2aWRlb3RhcGVfc2hhcmVfZmFpbFwiKTtcclxuICAgICAgICB0aGlzLmluaV9ub2RlKCk7XHJcbiAgICB9LFxyXG4gICAgLy/ngrnlh7vpgIDlh7pcclxuICAgIHRvdWNoX2V4aXQoKSB7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2V4aXRcIik7XHJcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLm9uX25vZGVfa2lsbCh0aGlzLm5vZGUpO1xyXG4gICAgfSxcclxuICAgIC8vIG9uTG9hZCAoKSB7fSxcclxuXHJcbiAgICBhZGRfZ29sZF92aWRlbzogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcy5hZGRfZ29sZChNYXRoLmZsb29yKCgoNTAwICogdXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbFtcImdvbGRfbWF4XCJdICsgNTAwKSkgLyAyMCkgKyAxKTtcclxuICAgIH0sXHJcbiAgICBzdGFydCgpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxyXG59KTtcclxuIl19