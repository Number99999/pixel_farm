
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcdmlkZW90YXBlX3VpLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiZ29sZF9sYWJsZSIsIkxhYmVsIiwiZXhfbGFiZWwiLCJ0aXBzX2xhYmVsIiwiYnV0dG9uX2ZyYW1lIiwiU3ByaXRlIiwiYnV0dG9uX2ZyYW1lX2FyciIsIlNwcml0ZUZyYW1lIiwicHVyc2Vfbm9kZSIsIk5vZGUiLCJleF9ub2RlIiwiZGVsZXRlX2J1dHRvbiIsIkJ1dHRvbiIsImluaV9ub2RlIiwiZ2FtZV9ydWxlc19qcyIsImZpbmQiLCJnZXRDb21wb25lbnQiLCJnYW1lX3NjZW5lX2pzIiwic291bmRfY29udHJvbCIsImFkX2NvbnRyb2wiLCJhZHNNYW5hZ2VyX2pzIiwic2hvd19iYW5uZXJBZCIsImFkZF9nb2xkIiwiTWF0aCIsImZsb29yIiwidXNlcl9kYXRhIiwic2tpbGwiLCJhZGRfZXgiLCJsZXZlbCIsInZpZGVvdGFwZV9wYXRoIiwic3ByaXRlRnJhbWUiLCJub2RlIiwiYWN0aXZlIiwic3RyaW5nIiwidG9kYXkiLCJEYXRlIiwic2F2ZV9kYXRlIiwiZ2V0RGF0ZSIsIndhdGNoX3ZpZGVvIiwib25fYnV0dG9uX2NsaWNrIiwic2hvd1Jld2FyZGVkVmlkZW8iLCJjcmVhdGVfdGlwc191aSIsIm9uX2RlbGV0ZV9idXR0b25fY2xpY2siLCJ2aWRlb19zaGFyZSIsInd4Iiwic2VsZiIsInNoYXJlQXBwTWVzc2FnZSIsImNoYW5uZWwiLCJ0aXRsZSIsImV4dHJhIiwidmlkZW9QYXRoIiwidmlkZW9Ub3BpY3MiLCJzdWNjZXNzIiwiY29uc29sZSIsImxvZyIsInZpZGVvdGFwZV9zaGFyZV9zdWNjZXMiLCJmYWlsIiwidmlkZW90YXBlX3NoYXJlX2ZhaWwiLCJwYXJlbnQiLCJ0b3VjaF9leGl0IiwicGxheV9zb3VuZF9lZmZlY3QiLCJvbl9ub2RlX2tpbGwiLCJhZGRfZ29sZF92aWRlbyIsInN0YXJ0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WDs7QUFDQVQsVUFBQUEsSUFBSSxDQUFDVSxzQkFBTDtBQUNILFNBWmM7QUFhZkMsUUFBQUEsSUFBSSxFQUFFLGdCQUFNO0FBQ1JILFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLFFBQVosRUFBc0IsTUFBSSxDQUFDekIsY0FBM0I7QUFDQWdCLFVBQUFBLElBQUksQ0FBQ1ksb0JBQUw7QUFDSDtBQWhCYyxPQUFuQjtBQWtCSDs7QUFBQTtBQUNKLEdBakdJO0FBa0dMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0FBLEVBQUFBLG9CQUFvQixFQUFFLGdDQUFZO0FBQzlCLFNBQUt4QyxhQUFMLENBQW1Cd0IsY0FBbkIsQ0FBa0MsS0FBS1YsSUFBTCxDQUFVMkIsTUFBNUMsRUFBb0Qsc0JBQXBEO0FBQ0EsU0FBSzdDLFFBQUw7QUFDSCxHQXRISTtBQXVITDtBQUNBOEMsRUFBQUEsVUF4SEssd0JBd0hRO0FBQ1QsU0FBS3pDLGFBQUwsQ0FBbUIwQyxpQkFBbkIsQ0FBcUMsYUFBckM7QUFDQSxTQUFLM0MsYUFBTCxDQUFtQjRDLFlBQW5CLENBQWdDLEtBQUs5QixJQUFyQztBQUNILEdBM0hJO0FBNEhMO0FBRUErQixFQUFBQSxjQUFjLEVBQUUsMEJBQVk7QUFDeEIsU0FBS2hELGFBQUwsQ0FBbUJRLFFBQW5CLENBQTRCQyxJQUFJLENBQUNDLEtBQUwsQ0FBVyxDQUFFLE1BQU1DLHNCQUFVQSxTQUFWLENBQW9CQyxLQUFwQixDQUEwQixVQUExQixDQUFOLEdBQThDLEdBQWhELElBQXdELEVBQW5FLElBQXlFLENBQXJHO0FBQ0gsR0FoSUk7QUFpSUxxQyxFQUFBQSxLQWpJSyxtQkFpSUcsQ0FFUCxDQW5JSSxDQXFJTDs7QUFySUssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHVzZXJfZGF0YSBmcm9tIFwidXNlcl9kYXRhXCI7XHJcbmltcG9ydCBjb25maWcgZnJvbSBcImNvbmZpZ1wiO1xyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGdvbGRfbGFibGU6IGNjLkxhYmVsLFxyXG4gICAgICAgIGV4X2xhYmVsOiBjYy5MYWJlbCxcclxuICAgICAgICB0aXBzX2xhYmVsOiBjYy5MYWJlbCxcclxuICAgICAgICBidXR0b25fZnJhbWU6IGNjLlNwcml0ZSxcclxuICAgICAgICBidXR0b25fZnJhbWVfYXJyOiBbY2MuU3ByaXRlRnJhbWVdLFxyXG4gICAgICAgIHB1cnNlX25vZGU6IGNjLk5vZGUsXHJcbiAgICAgICAgZXhfbm9kZTogY2MuTm9kZSxcclxuICAgICAgICBkZWxldGVfYnV0dG9uOiBjYy5CdXR0b24sXHJcbiAgICB9LFxyXG4gICAgLy/liJ3lp4vljJboioLngrlcclxuICAgIGluaV9ub2RlKCkge1xyXG4gICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfcnVsZXNcIik7XHJcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9zY2VuZVwiKTtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wgPSBjYy5maW5kKFwic291bmRfY29udHJvbFwiKS5nZXRDb21wb25lbnQoXCJzb3VuZF9jb250cm9sXCIpO1xyXG4gICAgICAgIHRoaXMuYWRfY29udHJvbCA9IGNjLmZpbmQoXCJhZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcImFkX2NvbnRyb2xcIik7XHJcbiAgICAgICAgdGhpcy5hZHNNYW5hZ2VyX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiQWRzTWFuYWdlclwiKTtcclxuICAgICAgICB0aGlzLmFkX2NvbnRyb2wuc2hvd19iYW5uZXJBZCgpO1xyXG4gICAgICAgIHRoaXMuYWRkX2dvbGQgPSBNYXRoLmZsb29yKCgoNTAwICogdXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbFtcImdvbGRfbWF4XCJdICsgNTAwKSkgLyAyMCkgKyAxO1xyXG4gICAgICAgIHRoaXMuYWRkX2V4ID0gTWF0aC5mbG9vcih1c2VyX2RhdGEudXNlcl9kYXRhLmxldmVsIC8gMTApICsgMTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZ2FtZV9ydWxlc19qcy52aWRlb3RhcGVfcGF0aCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIC8v5b2V5bGP5pyq5b2V5Yi2XHJcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5idXR0b25fZnJhbWVfYXJyWzBdO1xyXG4gICAgICAgICAgICB0aGlzLmRlbGV0ZV9idXR0b24ubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL+W9leWxj+W3suW9leWItlxyXG4gICAgICAgICAgICB0aGlzLmJ1dHRvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuYnV0dG9uX2ZyYW1lX2FyclsxXTtcclxuICAgICAgICAgICAgdGhpcy5kZWxldGVfYnV0dG9uLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuZ29sZF9sYWJsZS5zdHJpbmcgPSBcIitcIiArIHRoaXMuYWRkX2dvbGQ7XHJcbiAgICAgICAgdGhpcy5leF9sYWJlbC5zdHJpbmcgPSBcIitcIiArIHRoaXMuYWRkX2V4O1xyXG4gICAgICAgIHZhciB0b2RheSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEuc2F2ZV9kYXRlID09IHRvZGF5LmdldERhdGUoKSlcclxuICAgICAgICAgICAgdGhpcy50aXBzX2xhYmVsLnN0cmluZyA9IFwiV2F0Y2hlZDogXCIgKyB1c2VyX2RhdGEudXNlcl9kYXRhLndhdGNoX3ZpZGVvICsgXCIvM1wiO1xyXG4gICAgICAgIGVsc2UgdGhpcy50aXBzX2xhYmVsLnN0cmluZyA9IFwiV2F0Y2hlZDogMC8zXCJcclxuICAgIH0sXHJcblxyXG4gICAgLy/mjInpkq7ooqvngrnlh7tcclxuICAgIG9uX2J1dHRvbl9jbGljaygpIHtcclxuICAgICAgICB2YXIgdG9kYXkgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIGlmICh0b2RheS5nZXREYXRlKCkgPT0gdXNlcl9kYXRhLnVzZXJfZGF0YS5zYXZlX2RhdGUgJiYgdXNlcl9kYXRhLnVzZXJfZGF0YS53YXRjaF92aWRlbyA8IDMpIHtcclxuICAgICAgICAgICAgdGhpcy5hZHNNYW5hZ2VyX2pzLnNob3dSZXdhcmRlZFZpZGVvKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEud2F0Y2hfdmlkZW8rKztcclxuICAgICAgICAgICAgICAgIHRoaXMudGlwc19sYWJlbC5zdHJpbmcgPSBcIldhdGNoZWQ6IFwiICsgdXNlcl9kYXRhLnVzZXJfZGF0YS53YXRjaF92aWRlbyArIFwiLzNcIjtcclxuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuc2F2ZV9kYXRlID0gdG9kYXkuZ2V0RGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLmFkZF9nb2xkKE1hdGguZmxvb3IoKCg1MDAgKiB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1wiZ29sZF9tYXhcIl0gKyA1MDApKSAvIDIwKSArIDEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLmFkZF9leChNYXRoLmZsb29yKHVzZXJfZGF0YS51c2VyX2RhdGEubGV2ZWwgLyAxMCkgKyAxKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0b2RheS5nZXREYXRlKCkgIT0gdXNlcl9kYXRhLnVzZXJfZGF0YS5zYXZlX2RhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5hZHNNYW5hZ2VyX2pzLnNob3dSZXdhcmRlZFZpZGVvKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHdhdGNoX3ZpZGVvID0gMTtcclxuICAgICAgICAgICAgICAgIHRoaXMudGlwc19sYWJlbC5zdHJpbmcgPSBcIldhdGNoZWQ6IFwiICsgdXNlcl9kYXRhLnVzZXJfZGF0YS53YXRjaF92aWRlbyArIFwiLzNcIjtcclxuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuc2F2ZV9kYXRlID0gdG9kYXkuZ2V0RGF0ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3J1bGVzX2pzLm5vZGUsIFwibm9fdmlkZW9fdG9kYXlcIik7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICBvbl9kZWxldGVfYnV0dG9uX2NsaWNrKCkge1xyXG4gICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcy52aWRlb3RhcGVfcGF0aCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9ydWxlc19qcy5ub2RlLCBcInZpZG90YXBlX2NhbmNlbFwiKTtcclxuICAgICAgICB0aGlzLmluaV9ub2RlKCk7XHJcbiAgICB9LFxyXG4gICAgLy/lvZXlsY/liIbkuqtcclxuICAgIHZpZGVvX3NoYXJlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiAod3gpICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmdhbWVfcnVsZXNfanMudmlkZW90YXBlX3BhdGggPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIC8v6I635Y+W5YiG5Lqr5a+86K+tXHJcbiAgICAgICAgICAgIHd4LnNoYXJlQXBwTWVzc2FnZSh7XHJcbiAgICAgICAgICAgICAgICBjaGFubmVsOiAndmlkZW8nLCAgLy/mjIflrprkuLrop4bpopHliIbkuqtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAnT24tSG9vayBTbWFsbCBGYXJtJyxcclxuICAgICAgICAgICAgICAgIGV4dHJhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmlkZW9QYXRoOiB0aGlzLmdhbWVfcnVsZXNfanMudmlkZW90YXBlX3BhdGgsLy8g6K6+572u6KeG6aKR6Lev5b6EXHJcbiAgICAgICAgICAgICAgICAgICAgdmlkZW9Ub3BpY3M6IFtcIk9uLUhvb2sgU21hbGwgRmFybVwiLCBcIkdhbWVcIl1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/liIbkuqvlm57osINcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5b2V5bGP5YiG5Lqr5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/liIbkuqvlpZblirHvvIzku4XkuIDmrKFcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnZpZGVvdGFwZV9zaGFyZV9zdWNjZXMoKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmYWlsOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+W9leWxj+WIhuS6q+Wksei0pScsIHRoaXMudmlkZW90YXBlX3BhdGgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYudmlkZW90YXBlX3NoYXJlX2ZhaWwoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvL+W9leWxj+WIhuS6q+aIkOWKn1xyXG4gICAgLy8gdmlkZW90YXBlX3NoYXJlX3N1Y2NlczogZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLm5vZGUucGFyZW50LCBcInZpZGVvdGFwZV9zaGFyZV9zdWNjZXNcIik7XHJcbiAgICAvLyAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLnZpZGVvdGFwZV9wYXRoID0gbnVsbDtcclxuICAgIC8vICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnZpZGVvdGFwZV9zaGFyZV9jb3VudCsrO1xyXG4gICAgLy8gICAgIHZhciBnb2xkID0gTWF0aC5mbG9vcih0aGlzLmFkZF9nb2xkIC8gNik7XHJcbiAgICAvLyAgICAgdmFyIGV4ID0gTWF0aC5mbG9vcih0aGlzLmFkZF9leCAvIDMpO1xyXG4gICAgLy8gICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNjsgaSsrKSB7XHJcbiAgICAvLyAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfZ29sZF9lZmZlY3QodGhpcy5wdXJzZV9ub2RlLCBpLCBnb2xkKTtcclxuICAgIC8vICAgICB9O1xyXG4gICAgLy8gICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICAvLyAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfZXhfZWZmZWN0KHRoaXMuZXhfbm9kZSwgaSwgZXgpO1xyXG4gICAgLy8gICAgIH07XHJcbiAgICAvLyAgICAgdGhpcy5pbmlfbm9kZSgpO1xyXG5cclxuICAgIC8vIH0sXHJcbiAgICAvL+W9leWxj+WIhuS6q+Wksei0pVxyXG4gICAgdmlkZW90YXBlX3NoYXJlX2ZhaWw6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5ub2RlLnBhcmVudCwgXCJ2aWRlb3RhcGVfc2hhcmVfZmFpbFwiKTtcclxuICAgICAgICB0aGlzLmluaV9ub2RlKCk7XHJcbiAgICB9LFxyXG4gICAgLy/ngrnlh7vpgIDlh7pcclxuICAgIHRvdWNoX2V4aXQoKSB7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2V4aXRcIik7XHJcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLm9uX25vZGVfa2lsbCh0aGlzLm5vZGUpO1xyXG4gICAgfSxcclxuICAgIC8vIG9uTG9hZCAoKSB7fSxcclxuXHJcbiAgICBhZGRfZ29sZF92aWRlbzogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcy5hZGRfZ29sZChNYXRoLmZsb29yKCgoNTAwICogdXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbFtcImdvbGRfbWF4XCJdICsgNTAwKSkgLyAyMCkgKyAxKTtcclxuICAgIH0sXHJcbiAgICBzdGFydCgpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxyXG59KTtcclxuIl19