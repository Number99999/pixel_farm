
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/control/ad_control.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4cfbbsmFOFMvIhVViASXS9p', 'ad_control');
// script/control/ad_control.js

"use strict";

var _config = _interopRequireDefault(require("config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*
    share_state :{
        shared : "已分享"
        un_share : "未分享"
        share_succes :"分享成功"
    };
*/
cc.Class({
  "extends": cc.Component,
  properties: {},
  // LIFE-CYCLE CALLBACKS:
  //打开右上角3个点转发
  open_share: function open_share() {
    if (typeof wx !== "undefined") {
      //显示当前页面右上角的转发按钮
      wx.showShareMenu({
        withShareTicket: true
      });
      wx.onShareAppMessage(function () {
        return {//
        };
      });
    }

    ;
  },
  //手动拉起转发调用
  manual_share: function manual_share(tag) {
    if (typeof tt !== "undefined") {
      //记录是什么分享
      this.share_tag = tag;
      this.share_state = "shared";
      this.share_time = new Date().getTime(); // 记录当前时间

      var self = this;

      switch (tag) {
        case "offline_profit":
          tt.shareAppMessage({
            templateId: "u764x7bp9v2d3k16ij",
            // 替换成通过审核的分享ID
            title: "Leisure farm, hang up",
            desc: "A relaxing and casual business simulation game。",
            imageUrl: "",
            query: "",
            success: function success() {
              console.log("分享视频成功");
              self.share_sucess();
            },
            fail: function fail(e) {
              console.log("分享视频失败");
              self.share_fail();
            }
          });
          break;

        case "pet":
          tt.shareAppMessage({
            templateId: "",
            // 替换成通过审核的分享ID
            title: "Do you like me?",
            desc: "I want this little pet, please click for me！",
            imageUrl: "",
            query: "",
            success: function success() {
              console.log("分享视频成功");
              self.share_sucess();
            },
            fail: function fail(e) {
              console.log("分享视频失败");
              self.share_fail();
            }
          });
          break;
      }

      ;
    }

    ;
  },
  //微信回到前台分享判断
  share_judge: function share_judge() {
    if (typeof wx !== "undefined") {
      var self = this;
      wx.onShow(function () {
        //标签不能为空并且分享状态为已分享
        if (self.share_state == "shared" && self.share_tag !== null) {
          var now_time = new Date().getTime();

          if (now_time - self.share_time >= 3000) {
            self.share_sucess(self.share_tag);
          } else {
            self.share_fail();
          }

          ;
        } else {
          return;
        }
      });
    }
  },
  //分享成功
  share_sucess: function share_sucess() {
    this.share_state = "share_succes";
    this.game_scene_js.create_tips_ui(this.game_scene_js.node, "share_succes");
  },
  //分享失败
  share_fail: function share_fail() {
    this.ini_share();
    this.game_scene_js.create_tips_ui(this.game_scene_js.node, "share_fail");
  },
  //初始化分享
  ini_share: function ini_share() {
    this.share_tag = null; //分享的标签

    this.share_time = null; //分享时的时间

    this.share_state = "un_share";
  },
  //===========================================================
  //===========================================================
  //创建视频广告
  create_videoAd: function create_videoAd() {
    var _this = this;

    if (_config["default"].ad_state == 0) {
      return;
    }

    ;

    if (typeof wx !== "undefined") {
      //视频广告
      this.video_ad = wx.createRewardedVideoAd({
        adUnitId: '2oo60sjxld911grh25' //填上你的广告位id

      }); //=======================================================
      //=======================================================
      //错误提示

      this.video_ad.onError(function (err) {
        _this.ad_manageer = false;
        console.log(err);
      });
    }

    ;
  },
  //展示视频广告
  show_videoAd: function show_videoAd(name) {
    var _this2 = this;

    if (_config["default"].ad_state == 0) {
      return;
    }

    ;

    if (typeof wx !== "undefined") {
      if (this.ad_manageer == false) {//广告未开启
      } else {
        this.sound_control.pause_all_sound();
      }

      ;
      this.video_tag = name; //无论有多少广告,只会返回一个实例

      this.video_ad.show()["catch"](function () {
        // 失败重试
        _this2.video_ad.load().then(function () {
          return _this2.video_ad.show();
        })["catch"](function (err) {
          console.log('激励视频 广告显示失败');

          _this2.game_scene_js.create_tips_ui(_this2.game_scene_js.node, "video_wait");
        });
      });
    }

    ;
  },
  //广告结束或退出
  over_videoAd: function over_videoAd() {
    var _this3 = this;

    if (_config["default"].ad_state == 0) {
      return;
    }

    ;

    if (typeof wx !== "undefined") {
      this.video_ad.onClose(function (res) {
        // 用户点击了【关闭广告】按钮
        // 小于 2.1.0 的基础库版本，res 是一个 undefined
        if (res && res.isEnded || res === undefined) {
          // 正常播放结束，可以下发游戏奖励
          _this3.video_state = 1; // 1为成功，0为失败 2位播放结束

          _this3.sound_control.resume_all_sound();
        } else {
          // 播放中途退出，不下发游戏奖励
          _this3.sound_control.resume_all_sound();

          _this3.video_state = 0;

          _this3.game_scene_js.create_tips_ui(_this3.game_scene_js.node, "video_exit");
        }
      });
    }

    ;
  },
  //创建banner广告
  banner_ad: function banner_ad() {
    var _this4 = this;

    if (typeof wx !== "undefined") {
      //抖音屏蔽banner
      var info = tt.getSystemInfoSync();

      if (info.appName.toUpperCase() === 'DOUYIN' || _config["default"].ad_state == 0) {
        return;
      } else {
        // 创建 Banner 广告实例，提前初始化
        var sysInfo = wx.getSystemInfoSync();
        this.bannerAd = wx.createBannerAd({
          adUnitId: '6g3799b8gcb52y1dvi',
          adIntervals: 30,
          style: {
            left: 0,
            top: 0,
            width: 300
          }
        });
        this.bannerAd.onError(function (err) {
          console.log(err); // this.show_push_ad("banner");
        });
        this.bannerAd.onResize(function (res) {
          _this4.bannerAd.style.top = sysInfo.windowHeight - res.height - 10;
          _this4.bannerAd.style.left = (sysInfo.windowWidth - res.width) / 2;
        });
      }
    }

    ; //end if
  },
  onLoad: function onLoad() {
    // cc.game.addPersistRootNode(this.node);
    this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
    this.sound_control = cc.find("sound_control").getComponent("sound_control"); // this.share_judge();

    this.ini_share();
    this.judge = null; // 判断是否分享成功

    this.video_tag = null; //视频标签

    this.video_state = null; //视频播放的状态 1位succes 0为fail

    this.create_videoAd();
    this.over_videoAd();
    this.banner_ad();
    this.open_share();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxjb250cm9sXFxhZF9jb250cm9sLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwib3Blbl9zaGFyZSIsInd4Iiwic2hvd1NoYXJlTWVudSIsIndpdGhTaGFyZVRpY2tldCIsIm9uU2hhcmVBcHBNZXNzYWdlIiwibWFudWFsX3NoYXJlIiwidGFnIiwidHQiLCJzaGFyZV90YWciLCJzaGFyZV9zdGF0ZSIsInNoYXJlX3RpbWUiLCJEYXRlIiwiZ2V0VGltZSIsInNlbGYiLCJzaGFyZUFwcE1lc3NhZ2UiLCJ0ZW1wbGF0ZUlkIiwidGl0bGUiLCJkZXNjIiwiaW1hZ2VVcmwiLCJxdWVyeSIsInN1Y2Nlc3MiLCJjb25zb2xlIiwibG9nIiwic2hhcmVfc3VjZXNzIiwiZmFpbCIsImUiLCJzaGFyZV9mYWlsIiwic2hhcmVfanVkZ2UiLCJvblNob3ciLCJub3dfdGltZSIsImdhbWVfc2NlbmVfanMiLCJjcmVhdGVfdGlwc191aSIsIm5vZGUiLCJpbmlfc2hhcmUiLCJjcmVhdGVfdmlkZW9BZCIsImNvbmZpZyIsImFkX3N0YXRlIiwidmlkZW9fYWQiLCJjcmVhdGVSZXdhcmRlZFZpZGVvQWQiLCJhZFVuaXRJZCIsIm9uRXJyb3IiLCJlcnIiLCJhZF9tYW5hZ2VlciIsInNob3dfdmlkZW9BZCIsIm5hbWUiLCJzb3VuZF9jb250cm9sIiwicGF1c2VfYWxsX3NvdW5kIiwidmlkZW9fdGFnIiwic2hvdyIsImxvYWQiLCJ0aGVuIiwib3Zlcl92aWRlb0FkIiwib25DbG9zZSIsInJlcyIsImlzRW5kZWQiLCJ1bmRlZmluZWQiLCJ2aWRlb19zdGF0ZSIsInJlc3VtZV9hbGxfc291bmQiLCJiYW5uZXJfYWQiLCJpbmZvIiwiZ2V0U3lzdGVtSW5mb1N5bmMiLCJhcHBOYW1lIiwidG9VcHBlckNhc2UiLCJzeXNJbmZvIiwiYmFubmVyQWQiLCJjcmVhdGVCYW5uZXJBZCIsImFkSW50ZXJ2YWxzIiwic3R5bGUiLCJsZWZ0IiwidG9wIiwid2lkdGgiLCJvblJlc2l6ZSIsIndpbmRvd0hlaWdodCIsImhlaWdodCIsIndpbmRvd1dpZHRoIiwib25Mb2FkIiwiZmluZCIsImdldENvbXBvbmVudCIsImp1ZGdlIiwic3RhcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUUsRUFIUDtBQU9MO0FBRUE7QUFDQUMsRUFBQUEsVUFBVSxFQUFFLHNCQUFZO0FBQ3BCLFFBQUksT0FBUUMsRUFBUixLQUFnQixXQUFwQixFQUFpQztBQUM3QjtBQUNBQSxNQUFBQSxFQUFFLENBQUNDLGFBQUgsQ0FBaUI7QUFBRUMsUUFBQUEsZUFBZSxFQUFFO0FBQW5CLE9BQWpCO0FBQ0FGLE1BQUFBLEVBQUUsQ0FBQ0csaUJBQUgsQ0FBcUIsWUFBWTtBQUM3QixlQUFPLENBQ0g7QUFERyxTQUFQO0FBR0gsT0FKRDtBQUtIOztBQUFBO0FBQ0osR0FwQkk7QUFzQkw7QUFDQUMsRUFBQUEsWUFBWSxFQUFFLHNCQUFVQyxHQUFWLEVBQWU7QUFDekIsUUFBSSxPQUFRQyxFQUFSLEtBQWdCLFdBQXBCLEVBQWlDO0FBQzdCO0FBQ0EsV0FBS0MsU0FBTCxHQUFpQkYsR0FBakI7QUFDQSxXQUFLRyxXQUFMLEdBQW1CLFFBQW5CO0FBQ0EsV0FBS0MsVUFBTCxHQUFrQixJQUFJQyxJQUFKLEdBQVdDLE9BQVgsRUFBbEIsQ0FKNkIsQ0FJVzs7QUFDeEMsVUFBSUMsSUFBSSxHQUFHLElBQVg7O0FBQ0EsY0FBUVAsR0FBUjtBQUNJLGFBQUssZ0JBQUw7QUFDSUMsVUFBQUEsRUFBRSxDQUFDTyxlQUFILENBQW1CO0FBQ2ZDLFlBQUFBLFVBQVUsRUFBRSxvQkFERztBQUNtQjtBQUNsQ0MsWUFBQUEsS0FBSyxFQUFFLHVCQUZRO0FBR2ZDLFlBQUFB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ZUFBdEMsQ0FBckIsQ0FISyxDQUlMOztBQUNBLFNBQUs1QyxTQUFMO0FBQ0EsU0FBSzZDLEtBQUwsR0FBYSxJQUFiLENBTkssQ0FNYzs7QUFDbkIsU0FBSy9CLFNBQUwsR0FBaUIsSUFBakIsQ0FQSyxDQU9rQjs7QUFDdkIsU0FBS1MsV0FBTCxHQUFtQixJQUFuQixDQVJLLENBUW9COztBQUN6QixTQUFLdEIsY0FBTDtBQUNBLFNBQUtpQixZQUFMO0FBQ0EsU0FBS08sU0FBTDtBQUNBLFNBQUsxRCxVQUFMO0FBR0gsR0FwT0k7QUFzT0wrRSxFQUFBQSxLQXRPSyxtQkFzT0csQ0FFUCxDQXhPSSxDQTBPTDs7QUExT0ssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNvbmZpZyBmcm9tIFwiY29uZmlnXCI7XHJcbi8qXHJcbiAgICBzaGFyZV9zdGF0ZSA6e1xyXG4gICAgICAgIHNoYXJlZCA6IFwi5bey5YiG5LqrXCJcclxuICAgICAgICB1bl9zaGFyZSA6IFwi5pyq5YiG5LqrXCJcclxuICAgICAgICBzaGFyZV9zdWNjZXMgOlwi5YiG5Lqr5oiQ5YqfXCJcclxuICAgIH07XHJcbiovXHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgICAvL+aJk+W8gOWPs+S4iuinkjPkuKrngrnovazlj5FcclxuICAgIG9wZW5fc2hhcmU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodHlwZW9mICh3eCkgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgLy/mmL7npLrlvZPliY3pobXpnaLlj7PkuIrop5LnmoTovazlj5HmjInpkq5cclxuICAgICAgICAgICAgd3guc2hvd1NoYXJlTWVudSh7IHdpdGhTaGFyZVRpY2tldDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICB3eC5vblNoYXJlQXBwTWVzc2FnZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG5cclxuICAgIC8v5omL5Yqo5ouJ6LW36L2s5Y+R6LCD55SoXHJcbiAgICBtYW51YWxfc2hhcmU6IGZ1bmN0aW9uICh0YWcpIHtcclxuICAgICAgICBpZiAodHlwZW9mICh0dCkgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgLy/orrDlvZXmmK/ku4DkuYjliIbkuqtcclxuICAgICAgICAgICAgdGhpcy5zaGFyZV90YWcgPSB0YWc7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhcmVfc3RhdGUgPSBcInNoYXJlZFwiO1xyXG4gICAgICAgICAgICB0aGlzLnNoYXJlX3RpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTsgLy8g6K6w5b2V5b2T5YmN5pe26Ze0XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgc3dpdGNoICh0YWcpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJvZmZsaW5lX3Byb2ZpdFwiOlxyXG4gICAgICAgICAgICAgICAgICAgIHR0LnNoYXJlQXBwTWVzc2FnZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlSWQ6IFwidTc2NHg3YnA5djJkM2sxNmlqXCIsIC8vIOabv+aNouaIkOmAmui/h+WuoeaguOeahOWIhuS6q0lEXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkxlaXN1cmUgZmFybSwgaGFuZyB1cFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjOiBcIkEgcmVsYXhpbmcgYW5kIGNhc3VhbCBidXNpbmVzcyBzaW11bGF0aW9uIGdhbWXjgIJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VVcmw6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5OiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLliIbkuqvop4bpopHmiJDlip9cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNoYXJlX3N1Y2VzcygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmYWlsKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5YiG5Lqr6KeG6aKR5aSx6LSlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zaGFyZV9mYWlsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJwZXRcIjpcclxuICAgICAgICAgICAgICAgICAgICB0dC5zaGFyZUFwcE1lc3NhZ2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZUlkOiBcIlwiLCAvLyDmm7/mjaLmiJDpgJrov4flrqHmoLjnmoTliIbkuqtJRFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJEbyB5b3UgbGlrZSBtZT9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzYzogXCJJIHdhbnQgdGhpcyBsaXR0bGUgcGV0LCBwbGVhc2UgY2xpY2sgZm9yIG1l77yBXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlVXJsOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyeTogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzcygpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5YiG5Lqr6KeG6aKR5oiQ5YqfXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zaGFyZV9zdWNlc3MoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmFpbChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWIhuS6q+inhumikeWksei0pVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2hhcmVfZmFpbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICB9LFxyXG4gICAgLy/lvq7kv6Hlm57liLDliY3lj7DliIbkuqvliKTmlq1cclxuICAgIHNoYXJlX2p1ZGdlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiAod3gpICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgd3gub25TaG93KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIC8v5qCH562+5LiN6IO95Li656m65bm25LiU5YiG5Lqr54q25oCB5Li65bey5YiG5LqrXHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5zaGFyZV9zdGF0ZSA9PSBcInNoYXJlZFwiICYmIHNlbGYuc2hhcmVfdGFnICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5vd190aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vd190aW1lIC0gc2VsZi5zaGFyZV90aW1lID49IDMwMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zaGFyZV9zdWNlc3Moc2VsZi5zaGFyZV90YWcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2hhcmVfZmFpbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8v5YiG5Lqr5oiQ5YqfXHJcbiAgICBzaGFyZV9zdWNlc3M6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnNoYXJlX3N0YXRlID0gXCJzaGFyZV9zdWNjZXNcIjtcclxuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIFwic2hhcmVfc3VjY2VzXCIpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvL+WIhuS6q+Wksei0pVxyXG4gICAgc2hhcmVfZmFpbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuaW5pX3NoYXJlKCk7XHJcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9zY2VuZV9qcy5ub2RlLCBcInNoYXJlX2ZhaWxcIik7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvL+WIneWni+WMluWIhuS6q1xyXG4gICAgaW5pX3NoYXJlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5zaGFyZV90YWcgPSBudWxsOyAvL+WIhuS6q+eahOagh+etvlxyXG4gICAgICAgIHRoaXMuc2hhcmVfdGltZSA9IG51bGw7IC8v5YiG5Lqr5pe255qE5pe26Ze0XHJcbiAgICAgICAgdGhpcy5zaGFyZV9zdGF0ZSA9IFwidW5fc2hhcmVcIjtcclxuICAgIH0sXHJcblxyXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgLy/liJvlu7rop4bpopHlub/lkYpcclxuICAgIGNyZWF0ZV92aWRlb0FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKGNvbmZpZy5hZF9zdGF0ZSA9PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmICh0eXBlb2YgKHd4KSAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAvL+inhumikeW5v+WRilxyXG4gICAgICAgICAgICB0aGlzLnZpZGVvX2FkID0gd3guY3JlYXRlUmV3YXJkZWRWaWRlb0FkKHtcclxuICAgICAgICAgICAgICAgIGFkVW5pdElkOiAnMm9vNjBzanhsZDkxMWdyaDI1JywvL+Whq+S4iuS9oOeahOW5v+WRiuS9jWlkXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAgICAgICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAgICAgICAgICAgLy/plJnor6/mj5DnpLpcclxuICAgICAgICAgICAgdGhpcy52aWRlb19hZC5vbkVycm9yKGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkX21hbmFnZWVyID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLy/lsZXnpLrop4bpopHlub/lkYpcclxuICAgIHNob3dfdmlkZW9BZDogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgICBpZiAoY29uZmlnLmFkX3N0YXRlID09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKHR5cGVvZiAod3gpICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmFkX21hbmFnZWVyID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAvL+W5v+WRiuacquW8gOWQr1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBhdXNlX2FsbF9zb3VuZCgpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLnZpZGVvX3RhZyA9IG5hbWU7XHJcbiAgICAgICAgICAgIC8v5peg6K665pyJ5aSa5bCR5bm/5ZGKLOWPquS8mui/lOWbnuS4gOS4quWunuS+i1xyXG4gICAgICAgICAgICB0aGlzLnZpZGVvX2FkLnNob3coKS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyDlpLHotKXph43or5VcclxuICAgICAgICAgICAgICAgIHRoaXMudmlkZW9fYWQubG9hZCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy52aWRlb19hZC5zaG93KCksXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5r+A5Yqx6KeG6aKRIOW5v+WRiuaYvuekuuWksei0pScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfc2NlbmVfanMubm9kZSwgXCJ2aWRlb193YWl0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvL+W5v+WRiue7k+adn+aIlumAgOWHulxyXG4gICAgb3Zlcl92aWRlb0FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKGNvbmZpZy5hZF9zdGF0ZSA9PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmICh0eXBlb2YgKHd4KSAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICB0aGlzLnZpZGVvX2FkLm9uQ2xvc2UocmVzID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIOeUqOaIt+eCueWHu+S6huOAkOWFs+mXreW5v+WRiuOAkeaMiemSrlxyXG4gICAgICAgICAgICAgICAgLy8g5bCP5LqOIDIuMS4wIOeahOWfuuehgOW6k+eJiOacrO+8jHJlcyDmmK/kuIDkuKogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICBpZiAocmVzICYmIHJlcy5pc0VuZGVkIHx8IHJlcyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5q2j5bi45pKt5pS+57uT5p2f77yM5Y+v5Lul5LiL5Y+R5ri45oiP5aWW5YqxXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWRlb19zdGF0ZSA9IDE7Ly8gMeS4uuaIkOWKn++8jDDkuLrlpLHotKUgMuS9jeaSreaUvue7k+adn1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc291bmRfY29udHJvbC5yZXN1bWVfYWxsX3NvdW5kKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDmkq3mlL7kuK3pgJTpgIDlh7rvvIzkuI3kuIvlj5HmuLjmiI/lpZblirFcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucmVzdW1lX2FsbF9zb3VuZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlkZW9fc3RhdGUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfc2NlbmVfanMubm9kZSwgXCJ2aWRlb19leGl0XCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLy/liJvlu7piYW5uZXLlub/lkYpcclxuICAgIGJhbm5lcl9hZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgKHd4KSAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAvL+aKlumfs+Wxj+iUvWJhbm5lclxyXG4gICAgICAgICAgICBjb25zdCBpbmZvID0gdHQuZ2V0U3lzdGVtSW5mb1N5bmMoKTtcclxuICAgICAgICAgICAgaWYgKGluZm8uYXBwTmFtZS50b1VwcGVyQ2FzZSgpID09PSAnRE9VWUlOJyB8fCBjb25maWcuYWRfc3RhdGUgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8g5Yib5bu6IEJhbm5lciDlub/lkYrlrp7kvovvvIzmj5DliY3liJ3lp4vljJZcclxuICAgICAgICAgICAgICAgIGxldCBzeXNJbmZvID0gd3guZ2V0U3lzdGVtSW5mb1N5bmMoKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5iYW5uZXJBZCA9IHd4LmNyZWF0ZUJhbm5lckFkKHtcclxuICAgICAgICAgICAgICAgICAgICBhZFVuaXRJZDogJzZnMzc5OWI4Z2NiNTJ5MWR2aScsXHJcbiAgICAgICAgICAgICAgICAgICAgYWRJbnRlcnZhbHM6IDMwLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDMwMCxcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5iYW5uZXJBZC5vbkVycm9yKGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuc2hvd19wdXNoX2FkKFwiYmFubmVyXCIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhbm5lckFkLm9uUmVzaXplKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iYW5uZXJBZC5zdHlsZS50b3AgPSBzeXNJbmZvLndpbmRvd0hlaWdodCAtIHJlcy5oZWlnaHQgLSAxMDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJhbm5lckFkLnN0eWxlLmxlZnQgPSAoc3lzSW5mby53aW5kb3dXaWR0aCAtIHJlcy53aWR0aCkgLyAyO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07Ly9lbmQgaWZcclxuICAgIH0sXHJcblxyXG4gXHJcblxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICAvLyBjYy5nYW1lLmFkZFBlcnNpc3RSb290Tm9kZSh0aGlzLm5vZGUpO1xyXG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfc2NlbmVcIik7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sID0gY2MuZmluZChcInNvdW5kX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwic291bmRfY29udHJvbFwiKTtcclxuICAgICAgICAvLyB0aGlzLnNoYXJlX2p1ZGdlKCk7XHJcbiAgICAgICAgdGhpcy5pbmlfc2hhcmUoKTtcclxuICAgICAgICB0aGlzLmp1ZGdlID0gbnVsbDsgLy8g5Yik5pat5piv5ZCm5YiG5Lqr5oiQ5YqfXHJcbiAgICAgICAgdGhpcy52aWRlb190YWcgPSBudWxsOyAvL+inhumikeagh+etvlxyXG4gICAgICAgIHRoaXMudmlkZW9fc3RhdGUgPSBudWxsOyAvL+inhumikeaSreaUvueahOeKtuaAgSAx5L2Nc3VjY2VzIDDkuLpmYWlsXHJcbiAgICAgICAgdGhpcy5jcmVhdGVfdmlkZW9BZCgpO1xyXG4gICAgICAgIHRoaXMub3Zlcl92aWRlb0FkKCk7XHJcbiAgICAgICAgdGhpcy5iYW5uZXJfYWQoKTtcclxuICAgICAgICB0aGlzLm9wZW5fc2hhcmUoKTtcclxuXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCgpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxyXG59KTtcclxuIl19