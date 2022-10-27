
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
    this.adsManager = cc.find("UI_ROOT").getComponent("AdsManager");
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
      cc.log("=======48=======");
      this.adsManager.showRewardedVideo(function () {
        _user_data["default"].user_data.watch_video++;
        cc.log("=======50=======");
        _this.tips_label.string = "Watched: " + _user_data["default"].user_data.watch_video + "/3";
        _user_data["default"].user_data.save_date = today.getDate();
      });
    } else if (today.getDate() != _user_data["default"].user_data.save_date) {
      this.adsManager.showRewardedVideo(function () {
        cc.log("=======59=======");
        watch_video = 1;
        _this.tips_label.string = "Watched: " + _user_data["default"].user_data.watch_video + "/3";
        _user_data["default"].user_data.save_date = today.getDate();
      });
      cc.log("====65====");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcdmlkZW90YXBlX3VpLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiZ29sZF9sYWJsZSIsIkxhYmVsIiwiZXhfbGFiZWwiLCJ0aXBzX2xhYmVsIiwiYnV0dG9uX2ZyYW1lIiwiU3ByaXRlIiwiYnV0dG9uX2ZyYW1lX2FyciIsIlNwcml0ZUZyYW1lIiwicHVyc2Vfbm9kZSIsIk5vZGUiLCJleF9ub2RlIiwiZGVsZXRlX2J1dHRvbiIsIkJ1dHRvbiIsImluaV9ub2RlIiwiZ2FtZV9ydWxlc19qcyIsImZpbmQiLCJnZXRDb21wb25lbnQiLCJnYW1lX3NjZW5lX2pzIiwic291bmRfY29udHJvbCIsImFkX2NvbnRyb2wiLCJhZHNNYW5hZ2VyIiwic2hvd19iYW5uZXJBZCIsImFkZF9nb2xkIiwiTWF0aCIsImZsb29yIiwidXNlcl9kYXRhIiwic2tpbGwiLCJhZGRfZXgiLCJsZXZlbCIsInZpZGVvdGFwZV9wYXRoIiwic3ByaXRlRnJhbWUiLCJub2RlIiwiYWN0aXZlIiwic3RyaW5nIiwidG9kYXkiLCJEYXRlIiwic2F2ZV9kYXRlIiwiZ2V0RGF0ZSIsIndhdGNoX3ZpZGVvIiwib25fYnV0dG9uX2NsaWNrIiwibG9nIiwic2hvd1Jld2FyZGVkVmlkZW8iLCJjcmVhdGVfdGlwc191aSIsIm9uX2RlbGV0ZV9idXR0b25fY2xpY2siLCJ2aWRlb19zaGFyZSIsInd4Iiwic2VsZiIsInNoYXJlQXBwTWVzc2FnZSIsImNoYW5uZWwiLCJ0aXRsZSIsImV4dHJhIiwidmlkZW9QYXRoIiwidmlkZW9Ub3BpY3MiLCJzdWNjZXNzIiwiY29uc29sZSIsInZpZGVvdGFwZV9zaGFyZV9zdWNjZXMiLCJmYWlsIiwidmlkZW90YXBlX3NoYXJlX2ZhaWwiLCJwYXJlbnQiLCJ0b3VjaF9leGl0IiwicGxheV9zb3VuZF9lZmZlY3QiLCJoaWRlX2Jhbm5lckFkIiwib25fbm9kZV9raWxsIiwiYWRkX2dvbGRfdmlkZW8iLCJzdGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUNBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsVUFBVSxFQUFFSixFQUFFLENBQUNLLEtBRFA7QUFFUkMsSUFBQUEsUUFBUSxFQUFFTixFQUFFLENBQUNLLEtBRkw7QUFHUkUsSUFBQUEsVUFBVSxFQUFFUCxFQUFFLENBQUNLLEtBSFA7QUFJUkcsSUFBQUEsWUFBWSxFQUFFUixFQUFFLENBQUNTLE1BSlQ7QUFLUkMsSUFBQUEsZ0JBQWdCLEVBQUUsQ0FBQ1YsRUFBRSxDQUFDVyxXQUFKLENBTFY7QUFNUkMsSUFBQUEsVUFBVSxFQUFFWixFQUFFLENBQUNhLElBTlA7QUFPUkMsSUFBQUEsT0FBTyxFQUFFZCxFQUFFLENBQUNhLElBUEo7QUFRUkUsSUFBQUEsYUFBYSxFQUFFZixFQUFFLENBQUNnQjtBQVJWLEdBSFA7QUFhTDtBQUNBQyxFQUFBQSxRQWRLLHNCQWNNO0FBQ1AsU0FBS0MsYUFBTCxHQUFxQmxCLEVBQUUsQ0FBQ21CLElBQUgsQ0FBUSxTQUFSLEVBQW1CQyxZQUFuQixDQUFnQyxZQUFoQyxDQUFyQjtBQUNBLFNBQUtDLGFBQUwsR0FBcUJyQixFQUFFLENBQUNtQixJQUFILENBQVEsU0FBUixFQUFtQkMsWUFBbkIsQ0FBZ0MsWUFBaEMsQ0FBckI7QUFDQSxTQUFLRSxhQUFMLEdBQXFCdEIsRUFBRSxDQUFDbUIsSUFBSCxDQUFRLGVBQVIsRUFBeUJDLFlBQXpCLENBQXNDLGVBQXRDLENBQXJCO0FBQ0EsU0FBS0csVUFBTCxHQUFrQnZCLEVBQUUsQ0FBQ21CLElBQUgsQ0FBUSxZQUFSLEVBQXNCQyxZQUF0QixDQUFtQyxZQUFuQyxDQUFsQjtBQUNBLFNBQUtJLFVBQUwsR0FBa0J4QixFQUFFLENBQUNtQixJQUFILENBQVEsU0FBUixFQUFtQkMsWUFBbkIsQ0FBZ0MsWUFBaEMsQ0FBbEI7QUFDQSxTQUFLRyxVQUFMLENBQWdCRSxhQUFoQjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0JDLElBQUksQ0FBQ0MsS0FBTCxDQUFXLENBQUUsTUFBTUMsc0JBQVVBLFNBQVYsQ0FBb0JDLEtBQXBCLENBQTBCLFVBQTFCLENBQU4sR0FBOEMsR0FBaEQsSUFBd0QsRUFBbkUsSUFBeUUsQ0FBekY7QUFDQSxTQUFLQyxNQUFMLEdBQWNKLElBQUksQ0FBQ0MsS0FBTCxDQUFXQyxzQkFBVUEsU0FBVixDQUFvQkcsS0FBcEIsR0FBNEIsRUFBdkMsSUFBNkMsQ0FBM0Q7O0FBRUEsUUFBSSxLQUFLZCxhQUFMLENBQW1CZSxjQUFuQixJQUFxQyxJQUF6QyxFQUErQztBQUMzQztBQUNBLFdBQUt6QixZQUFMLENBQWtCMEIsV0FBbEIsR0FBZ0MsS0FBS3hCLGdCQUFMLENBQXNCLENBQXRCLENBQWhDO0FBQ0EsV0FBS0ssYUFBTCxDQUFtQm9CLElBQW5CLENBQXdCQyxNQUF4QixHQUFpQyxLQUFqQztBQUNILEtBSkQsTUFJTztBQUNIO0FBQ0EsV0FBSzVCLFlBQUwsQ0FBa0IwQixXQUFsQixHQUFnQyxLQUFLeEIsZ0JBQUwsQ0FBc0IsQ0FBdEIsQ0FBaEM7QUFDQSxXQUFLSyxhQUFMLENBQW1Cb0IsSUFBbkIsQ0FBd0JDLE1BQXhCLEdBQWlDLElBQWpDO0FBQ0g7O0FBQUE7QUFDRCxTQUFLaEMsVUFBTCxDQUFnQmlDLE1BQWhCLEdBQXlCLE1BQU0sS0FBS1gsUUFBcEM7QUFDQSxTQUFLcEIsUUFBTCxDQUFjK0IsTUFBZCxHQUF1QixNQUFNLEtBQUtOLE1BQWxDO0FBQ0EsUUFBSU8sS0FBSyxHQUFHLElBQUlDLElBQUosRUFBWjtBQUNBLFFBQUlWLHNCQUFVQSxTQUFWLENBQW9CVyxTQUFwQixJQUFpQ0YsS0FBSyxDQUFDRyxPQUFOLEVBQXJDLEVBQ0ksS0FBS2xDLFVBQUwsQ0FBZ0I4QixNQUFoQixHQUF5QixjQUFjUixzQkFBVUEsU0FBVixDQUFvQmEsV0FBbEMsR0FBZ0QsSUFBekUsQ0FESixLQUVLLEtBQUtuQyxVQUFMLENBQWdCOEIsTUFBaEIsR0FBeUIsY0FBekI7QUFDUixHQXZDSTtBQXlDTDtBQUNBTSxFQUFBQSxlQTFDSyw2QkEwQ2E7QUFBQTs7QUFDZCxRQUFJTCxLQUFLLEdBQUcsSUFBSUMsSUFBSixFQUFaOztBQUNBLFFBQUlELEtBQUssQ0FBQ0csT0FBTixNQUFtQlosc0JBQVVBLFNBQVYsQ0FBb0JXLFNBQXZDLElBQW9EWCxzQkFBVUEsU0FBVixDQUFvQmEsV0FBcEIsR0FBa0MsQ0FBMUYsRUFBNkY7QUFDekYxQyxNQUFBQSxFQUFFLENBQUM0QyxHQUFILENBQU8sa0JBQVA7QUFDQSxXQUFLcEIsVUFBTCxDQUFnQnFCLGlCQUFoQixDQUFrQyxZQUFNO0FBQ3BDaEIsOEJBQVVBLFNBQVYsQ0FBb0JhLFdBQXBCO0FBQ0ExQyxRQUFBQSxFQUFFLENBQUM0QyxHQUFILENBQU8sa0JBQVA7QUFDQSxRQUFBLEtBQUksQ0FBQ3JDLFVBQUwsQ0FBZ0I4QixNQUFoQixHQUF5QixjQUFjUixzQkFBVUEsU0FBVixDQUFvQmEsV0FBbEMsR0FBZ0QsSUFBekU7QUFDQWIsOEJBQVVBLFNBQVYsQ0FBb0JXLFNBQXBCLEdBQWdDRixLQUFLLENBQUNHLE9BQU4sRUFBaEM7QUFDSCxPQUxEO0FBT0gsS0FURCxNQVVLLElBQUlILEtBQUssQ0FBQ0csT0FBTixNQUFtQlosc0JBQVVBLFNBQVYsQ0FBb0JXLFNBQTNDLEVBQXNEO0FBQ3ZELFdBQUtoQixVQUFMLENBQWdCcUIsaUJBQWhCLENBQWtDLFlBQU07QUFDcEM3QyxRQUFBQSxFQUFFLENBQUM0QyxHQUFILENBQU8sa0JBQVA7QUFDQUYsUUFBQUEsV0FBVyxHQUFHLENBQWQ7QUFDQSxRQUFBLEtBQUksQ0FBQ25DLFVBQUwsQ0FBZ0I4QixNQUFoQixHQUF5QixjQUFjUixzQkFBVUEsU0FBVixDQUFvQmEsV0FBbEMsR0FBZ0QsSUFBekU7QUFDQWIsOEJBQVVBLFNBQVYsQ0FBb0JXLFNBQXBCLEdBQWdDRixLQUFLLENBQUNHLE9BQU4sRUFBaEM7QUFDSCxPQUxEO0FBT0F6QyxNQUFBQSxFQUFFLENBQUM0QyxHQUFILENBQU8sWUFBUDtBQUNILEtBVEksTUFVQSxLQUFLdkIsYUFBTCxDQUFtQnlCLGNBQW5CLENBQWtDLEtBQUs1QixhQUFMLENBQW1CaUIsSUFBckQsRUFBMkQsZ0JBQTNEO0FBQ1IsR0FqRUk7QUFvRUxZLEVBQUFBLHNCQXBFSyxvQ0FvRW9CO0FBQ3JCLFNBQUs3QixhQUFMLENBQW1CZSxjQUFuQixHQUFvQyxJQUFwQztBQUNBLFNBQUtaLGFBQUwsQ0FBbUJ5QixjQUFuQixDQUFrQyxLQUFLNUIsYUFBTCxDQUFtQmlCLElBQXJELEVBQTJELGlCQUEzRDtBQUNBLFNBQUtsQixRQUFMO0FBQ0gsR0F4RUk7QUF5RUw7QUFDQStCLEVBQUFBLFdBQVcsRUFBRSx1QkFBWTtBQUFBOztBQUNyQixRQUFJLE9BQVFDLEVBQVIsS0FBZ0IsV0FBcEIsRUFBaUM7QUFDN0IsVUFBSSxLQUFLL0IsYUFBTCxDQUFtQmUsY0FBbkIsSUFBcUMsSUFBekMsRUFBK0M7QUFDM0M7QUFDSDs7QUFBQTtBQUNELFVBQUlpQixJQUFJLEdBQUcsSUFBWCxDQUo2QixDQUs3Qjs7QUFDQUQsTUFBQUEsRUFBRSxDQUFDRSxlQUFILENBQW1CO0FBQ2ZDLFFBQUFBLE9BQU8sRUFBRSxPQURNO0FBQ0k7QUFDbkJDLFFBQUFBLEtBQUssRUFBRSxvQkFGUTtBQUdmQyxRQUFBQSxLQUFLLEVBQUU7QUFDSEMsVUFBQUEsU0FBUyxFQUFFLEtBQUtyQyxhQUFMLENBQW1CZSxjQUQzQjtBQUMwQztBQUM3Q3VCLFVBQUFBLFdBQVcsRUFBRSxDQUFDLG9CQUFELEVBQXVCLE1BQXZCO0FBRlYsU0FIUTtBQU9mQyxRQUFBQSxPQUFPLEVBQUUsbUJBQU07QUFDWDtBQUNBQyxVQUFBQSxPQUFPLENBQUNkLEdBQVIsQ0FBWSxRQUFaLEVBRlcsQ0FHWDs7QUFDQU0sVUFBQUEsSUFBSSxDQUFDUyxzQkFBTDtBQUNILFNBWmM7QUFhZkMsUUFBQUEsSUFBSSxFQUFFLGdCQUFNO0FBQ1JGLFVBQUFBLE9BQU8sQ0FBQ2QsR0FBUixDQUFZLFFBQVosRUFBc0IsTUFBSSxDQUFDWCxjQUEzQjtBQUNBaUIsVUFBQUEsSUFBSSxDQUFDVyxvQkFBTDtBQUNIO0FBaEJjLE9BQW5CO0FBa0JIOztBQUFBO0FBQ0osR0FwR0k7QUFxR0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQUEsRUFBQUEsb0JBQW9CLEVBQUUsZ0NBQVk7QUFDOUIsU0FBS3hDLGFBQUwsQ0FBbUJ5QixjQUFuQixDQUFrQyxLQUFLWCxJQUFMLENBQVUyQixNQUE1QyxFQUFvRCxzQkFBcEQ7QUFDQSxTQUFLN0MsUUFBTDtBQUNILEdBekhJO0FBMEhMO0FBQ0E4QyxFQUFBQSxVQTNISyx3QkEySFE7QUFDVCxTQUFLekMsYUFBTCxDQUFtQjBDLGlCQUFuQixDQUFxQyxhQUFyQztBQUNBLFNBQUt6QyxVQUFMLENBQWdCMEMsYUFBaEI7QUFDQSxTQUFLNUMsYUFBTCxDQUFtQjZDLFlBQW5CLENBQWdDLEtBQUsvQixJQUFyQztBQUNILEdBL0hJO0FBZ0lMO0FBRUFnQyxFQUFBQSxjQUFjLEVBQUUsMEJBQVk7QUFDeEIsU0FBS2pELGFBQUwsQ0FBbUJRLFFBQW5CLENBQTRCQyxJQUFJLENBQUNDLEtBQUwsQ0FBVyxDQUFFLE1BQU1DLHNCQUFVQSxTQUFWLENBQW9CQyxLQUFwQixDQUEwQixVQUExQixDQUFOLEdBQThDLEdBQWhELElBQXdELEVBQW5FLElBQXlFLENBQXJHO0FBQ0gsR0FwSUk7QUFxSUxzQyxFQUFBQSxLQXJJSyxtQkFxSUcsQ0FFUCxDQXZJSSxDQXlJTDs7QUF6SUssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHVzZXJfZGF0YSBmcm9tIFwidXNlcl9kYXRhXCI7XG5pbXBvcnQgY29uZmlnIGZyb20gXCJjb25maWdcIjtcbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGdvbGRfbGFibGU6IGNjLkxhYmVsLFxuICAgICAgICBleF9sYWJlbDogY2MuTGFiZWwsXG4gICAgICAgIHRpcHNfbGFiZWw6IGNjLkxhYmVsLFxuICAgICAgICBidXR0b25fZnJhbWU6IGNjLlNwcml0ZSxcbiAgICAgICAgYnV0dG9uX2ZyYW1lX2FycjogW2NjLlNwcml0ZUZyYW1lXSxcbiAgICAgICAgcHVyc2Vfbm9kZTogY2MuTm9kZSxcbiAgICAgICAgZXhfbm9kZTogY2MuTm9kZSxcbiAgICAgICAgZGVsZXRlX2J1dHRvbjogY2MuQnV0dG9uLFxuICAgIH0sXG4gICAgLy/liJ3lp4vljJboioLngrlcbiAgICBpbmlfbm9kZSgpIHtcbiAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9ydWxlc1wiKTtcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9zY2VuZVwiKTtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sID0gY2MuZmluZChcInNvdW5kX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwic291bmRfY29udHJvbFwiKTtcbiAgICAgICAgdGhpcy5hZF9jb250cm9sID0gY2MuZmluZChcImFkX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwiYWRfY29udHJvbFwiKTtcbiAgICAgICAgdGhpcy5hZHNNYW5hZ2VyID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiQWRzTWFuYWdlclwiKTtcbiAgICAgICAgdGhpcy5hZF9jb250cm9sLnNob3dfYmFubmVyQWQoKTtcbiAgICAgICAgdGhpcy5hZGRfZ29sZCA9IE1hdGguZmxvb3IoKCg1MDAgKiB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1wiZ29sZF9tYXhcIl0gKyA1MDApKSAvIDIwKSArIDE7XG4gICAgICAgIHRoaXMuYWRkX2V4ID0gTWF0aC5mbG9vcih1c2VyX2RhdGEudXNlcl9kYXRhLmxldmVsIC8gMTApICsgMTtcblxuICAgICAgICBpZiAodGhpcy5nYW1lX3J1bGVzX2pzLnZpZGVvdGFwZV9wYXRoID09IG51bGwpIHtcbiAgICAgICAgICAgIC8v5b2V5bGP5pyq5b2V5Yi2XG4gICAgICAgICAgICB0aGlzLmJ1dHRvbl9mcmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMuYnV0dG9uX2ZyYW1lX2FyclswXTtcbiAgICAgICAgICAgIHRoaXMuZGVsZXRlX2J1dHRvbi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy/lvZXlsY/lt7LlvZXliLZcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uX2ZyYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5idXR0b25fZnJhbWVfYXJyWzFdO1xuICAgICAgICAgICAgdGhpcy5kZWxldGVfYnV0dG9uLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5nb2xkX2xhYmxlLnN0cmluZyA9IFwiK1wiICsgdGhpcy5hZGRfZ29sZDtcbiAgICAgICAgdGhpcy5leF9sYWJlbC5zdHJpbmcgPSBcIitcIiArIHRoaXMuYWRkX2V4O1xuICAgICAgICB2YXIgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5zYXZlX2RhdGUgPT0gdG9kYXkuZ2V0RGF0ZSgpKVxuICAgICAgICAgICAgdGhpcy50aXBzX2xhYmVsLnN0cmluZyA9IFwiV2F0Y2hlZDogXCIgKyB1c2VyX2RhdGEudXNlcl9kYXRhLndhdGNoX3ZpZGVvICsgXCIvM1wiO1xuICAgICAgICBlbHNlIHRoaXMudGlwc19sYWJlbC5zdHJpbmcgPSBcIldhdGNoZWQ6IDAvM1wiXG4gICAgfSxcblxuICAgIC8v5oyJ6ZKu6KKr54K55Ye7XG4gICAgb25fYnV0dG9uX2NsaWNrKCkge1xuICAgICAgICB2YXIgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBpZiAodG9kYXkuZ2V0RGF0ZSgpID09IHVzZXJfZGF0YS51c2VyX2RhdGEuc2F2ZV9kYXRlICYmIHVzZXJfZGF0YS51c2VyX2RhdGEud2F0Y2hfdmlkZW8gPCAzKSB7XG4gICAgICAgICAgICBjYy5sb2coXCI9PT09PT09NDg9PT09PT09XCIpO1xuICAgICAgICAgICAgdGhpcy5hZHNNYW5hZ2VyLnNob3dSZXdhcmRlZFZpZGVvKCgpID0+IHtcbiAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLndhdGNoX3ZpZGVvKys7XG4gICAgICAgICAgICAgICAgY2MubG9nKFwiPT09PT09PTUwPT09PT09PVwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRpcHNfbGFiZWwuc3RyaW5nID0gXCJXYXRjaGVkOiBcIiArIHVzZXJfZGF0YS51c2VyX2RhdGEud2F0Y2hfdmlkZW8gKyBcIi8zXCI7XG4gICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5zYXZlX2RhdGUgPSB0b2RheS5nZXREYXRlKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRvZGF5LmdldERhdGUoKSAhPSB1c2VyX2RhdGEudXNlcl9kYXRhLnNhdmVfZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5hZHNNYW5hZ2VyLnNob3dSZXdhcmRlZFZpZGVvKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjYy5sb2coXCI9PT09PT09NTk9PT09PT09XCIpO1xuICAgICAgICAgICAgICAgIHdhdGNoX3ZpZGVvID0gMTtcbiAgICAgICAgICAgICAgICB0aGlzLnRpcHNfbGFiZWwuc3RyaW5nID0gXCJXYXRjaGVkOiBcIiArIHVzZXJfZGF0YS51c2VyX2RhdGEud2F0Y2hfdmlkZW8gKyBcIi8zXCI7XG4gICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5zYXZlX2RhdGUgPSB0b2RheS5nZXREYXRlKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY2MubG9nKFwiPT09PTY1PT09PVwiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfcnVsZXNfanMubm9kZSwgXCJub192aWRlb190b2RheVwiKTtcbiAgICB9LFxuXG5cbiAgICBvbl9kZWxldGVfYnV0dG9uX2NsaWNrKCkge1xuICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMudmlkZW90YXBlX3BhdGggPSBudWxsO1xuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3J1bGVzX2pzLm5vZGUsIFwidmlkb3RhcGVfY2FuY2VsXCIpO1xuICAgICAgICB0aGlzLmluaV9ub2RlKCk7XG4gICAgfSxcbiAgICAvL+W9leWxj+WIhuS6q1xuICAgIHZpZGVvX3NoYXJlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0eXBlb2YgKHd4KSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZV9ydWxlc19qcy52aWRlb3RhcGVfcGF0aCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIC8v6I635Y+W5YiG5Lqr5a+86K+tXG4gICAgICAgICAgICB3eC5zaGFyZUFwcE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIGNoYW5uZWw6ICd2aWRlbycsICAvL+aMh+WumuS4uuinhumikeWIhuS6q1xuICAgICAgICAgICAgICAgIHRpdGxlOiAnT24tSG9vayBTbWFsbCBGYXJtJyxcbiAgICAgICAgICAgICAgICBleHRyYToge1xuICAgICAgICAgICAgICAgICAgICB2aWRlb1BhdGg6IHRoaXMuZ2FtZV9ydWxlc19qcy52aWRlb3RhcGVfcGF0aCwvLyDorr7nva7op4bpopHot6/lvoRcbiAgICAgICAgICAgICAgICAgICAgdmlkZW9Ub3BpY3M6IFtcIk9uLUhvb2sgU21hbGwgRmFybVwiLCBcIkdhbWVcIl1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy/liIbkuqvlm57osINcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+W9leWxj+WIhuS6q+aIkOWKnycpO1xuICAgICAgICAgICAgICAgICAgICAvL+WIhuS6q+WlluWKse+8jOS7heS4gOasoVxuICAgICAgICAgICAgICAgICAgICBzZWxmLnZpZGVvdGFwZV9zaGFyZV9zdWNjZXMoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGZhaWw6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+W9leWxj+WIhuS6q+Wksei0pScsIHRoaXMudmlkZW90YXBlX3BhdGgpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnZpZGVvdGFwZV9zaGFyZV9mYWlsKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvL+W9leWxj+WIhuS6q+aIkOWKn1xuICAgIC8vIHZpZGVvdGFwZV9zaGFyZV9zdWNjZXM6IGZ1bmN0aW9uICgpIHtcbiAgICAvLyAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMubm9kZS5wYXJlbnQsIFwidmlkZW90YXBlX3NoYXJlX3N1Y2Nlc1wiKTtcbiAgICAvLyAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLnZpZGVvdGFwZV9wYXRoID0gbnVsbDtcbiAgICAvLyAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS52aWRlb3RhcGVfc2hhcmVfY291bnQrKztcbiAgICAvLyAgICAgdmFyIGdvbGQgPSBNYXRoLmZsb29yKHRoaXMuYWRkX2dvbGQgLyA2KTtcbiAgICAvLyAgICAgdmFyIGV4ID0gTWF0aC5mbG9vcih0aGlzLmFkZF9leCAvIDMpO1xuICAgIC8vICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDY7IGkrKykge1xuICAgIC8vICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9nb2xkX2VmZmVjdCh0aGlzLnB1cnNlX25vZGUsIGksIGdvbGQpO1xuICAgIC8vICAgICB9O1xuICAgIC8vICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDU7IGkrKykge1xuICAgIC8vICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV9leF9lZmZlY3QodGhpcy5leF9ub2RlLCBpLCBleCk7XG4gICAgLy8gICAgIH07XG4gICAgLy8gICAgIHRoaXMuaW5pX25vZGUoKTtcblxuICAgIC8vIH0sXG4gICAgLy/lvZXlsY/liIbkuqvlpLHotKVcbiAgICB2aWRlb3RhcGVfc2hhcmVfZmFpbDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5ub2RlLnBhcmVudCwgXCJ2aWRlb3RhcGVfc2hhcmVfZmFpbFwiKTtcbiAgICAgICAgdGhpcy5pbmlfbm9kZSgpO1xuICAgIH0sXG4gICAgLy/ngrnlh7vpgIDlh7pcbiAgICB0b3VjaF9leGl0KCkge1xuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fZXhpdFwiKTtcbiAgICAgICAgdGhpcy5hZF9jb250cm9sLmhpZGVfYmFubmVyQWQoKTtcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLm9uX25vZGVfa2lsbCh0aGlzLm5vZGUpO1xuICAgIH0sXG4gICAgLy8gb25Mb2FkICgpIHt9LFxuXG4gICAgYWRkX2dvbGRfdmlkZW86IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLmFkZF9nb2xkKE1hdGguZmxvb3IoKCg1MDAgKiB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1wiZ29sZF9tYXhcIl0gKyA1MDApKSAvIDIwKSArIDEpO1xuICAgIH0sXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9LFxuXG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTtcbiJdfQ==