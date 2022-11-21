
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
  //展示banner
  show_bannerAd: function show_bannerAd() {
    cc.log("create_bannerAD");

    if (typeof wx !== "undefined") {
      //抖音屏蔽banner
      var info = tt.getSystemInfoSync();

      if (info.appName.toUpperCase() === 'DOUYIN' || _config["default"].ad_state == 0) {
        return;
      } else {
        this.bannerAd.show();
      }
    }

    ;
  },
  hide_bannerAd: function hide_bannerAd() {
    cc.log("hide_bannerAD");

    if (typeof wx !== "undefined") {
      //抖音屏蔽banner
      var info = tt.getSystemInfoSync();

      if (info.appName.toUpperCase() === 'DOUYIN' || _config["default"].ad_state == 0) {
        return;
      } else {
        this.bannerAd.hide();
      }
    }

    ;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxjb250cm9sXFxhZF9jb250cm9sLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwib3Blbl9zaGFyZSIsInd4Iiwic2hvd1NoYXJlTWVudSIsIndpdGhTaGFyZVRpY2tldCIsIm9uU2hhcmVBcHBNZXNzYWdlIiwibWFudWFsX3NoYXJlIiwidGFnIiwidHQiLCJzaGFyZV90YWciLCJzaGFyZV9zdGF0ZSIsInNoYXJlX3RpbWUiLCJEYXRlIiwiZ2V0VGltZSIsInNlbGYiLCJzaGFyZUFwcE1lc3NhZ2UiLCJ0ZW1wbGF0ZUlkIiwidGl0bGUiLCJkZXNjIiwiaW1hZ2VVcmwiLCJxdWVyeSIsInN1Y2Nlc3MiLCJjb25zb2xlIiwibG9nIiwic2hhcmVfc3VjZXNzIiwiZmFpbCIsImUiLCJzaGFyZV9mYWlsIiwic2hhcmVfanVkZ2UiLCJvblNob3ciLCJub3dfdGltZSIsImdhbWVfc2NlbmVfanMiLCJjcmVhdGVfdGlwc191aSIsIm5vZGUiLCJpbmlfc2hhcmUiLCJjcmVhdGVfdmlkZW9BZCIsImNvbmZpZyIsImFkX3N0YXRlIiwidmlkZW9fYWQiLCJjcmVhdGVSZXdhcmRlZFZpZGVvQWQiLCJhZFVuaXRJZCIsIm9uRXJyb3IiLCJlcnIiLCJhZF9tYW5hZ2VlciIsInNob3dfdmlkZW9BZCIsIm5hbWUiLCJzb3VuZF9jb250cm9sIiwicGF1c2VfYWxsX3NvdW5kIiwidmlkZW9fdGFnIiwic2hvdyIsImxvYWQiLCJ0aGVuIiwib3Zlcl92aWRlb0FkIiwib25DbG9zZSIsInJlcyIsImlzRW5kZWQiLCJ1bmRlZmluZWQiLCJ2aWRlb19zdGF0ZSIsInJlc3VtZV9hbGxfc291bmQiLCJiYW5uZXJfYWQiLCJpbmZvIiwiZ2V0U3lzdGVtSW5mb1N5bmMiLCJhcHBOYW1lIiwidG9VcHBlckNhc2UiLCJzeXNJbmZvIiwiYmFubmVyQWQiLCJjcmVhdGVCYW5uZXJBZCIsImFkSW50ZXJ2YWxzIiwic3R5bGUiLCJsZWZ0IiwidG9wIiwid2lkdGgiLCJvblJlc2l6ZSIsIndpbmRvd0hlaWdodCIsImhlaWdodCIsIndpbmRvd1dpZHRoIiwic2hvd19iYW5uZXJBZCIsImhpZGVfYmFubmVyQWQiLCJoaWRlIiwib25Mb2FkIiwiZmluZCIsImdldENvbXBvbmVudCIsImp1ZGdlIiwic3RhcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUUsRUFIUDtBQU9MO0FBRUE7QUFDQUMsRUFBQUEsVUFBVSxFQUFFLHNCQUFZO0FBQ3BCLFFBQUksT0FBUUMsRUFBUixLQUFnQixXQUFwQixFQUFpQztBQUM3QjtBQUNBQSxNQUFBQSxFQUFFLENBQUNDLGFBQUgsQ0FBaUI7QUFBRUMsUUFBQUEsZUFBZSxFQUFFO0FBQW5CLE9BQWpCO0FBQ0FGLE1BQUFBLEVBQUUsQ0FBQ0csaUJBQUgsQ0FBcUIsWUFBWTtBQUM3QixlQUFPLENBQ0g7QUFERyxTQUFQO0FBR0gsT0FKRDtBQUtIOztBQUFBO0FBQ0osR0FwQkk7QUFzQkw7QUFDQUMsRUFBQUEsWUFBWSxFQUFFLHNCQUFVQyxHQUFWLEVBQWU7QUFDekIsUUFBSSxPQUFRQyxFQUFSLEtBQWdCLFdBQXBCLEVBQWlDO0FBQzdCO0FBQ0EsV0FBS0MsU0FBTCxHQUFpQkYsR0FBakI7QUFDQSxXQUFLRyxXQUFMLEdBQW1CLFFBQW5CO0FBQ0EsV0FBS0MsVUFBTCxHQUFrQixJQUFJQyxJQUFKLEdBQVdDLE9BQVgsRUFBbEIsQ0FKNkIsQ0FJVzs7QUFDeEMsVUFBSUMsSUFBSSxHQUFHLElBQVg7O0FBQ0EsY0FBUVAsR0FBUjtBQUNJLGFBQUssZ0JBQUw7QUFDSUMsVUFBQUEsRUFBRSxDQUFDTyxlQUFILENBQW1CO0FBQ2ZDLFlBQUFBLFVBQVUsRUFBRSxvQkFERztBQUNtQjtB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O0FBQ0EsU0FBS08sU0FBTDtBQUNBLFNBQUsxRCxVQUFMO0FBR0gsR0E1UEk7QUE4UExrRixFQUFBQSxLQTlQSyxtQkE4UEcsQ0FFUCxDQWhRSSxDQWtRTDs7QUFsUUssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNvbmZpZyBmcm9tIFwiY29uZmlnXCI7XG4vKlxuICAgIHNoYXJlX3N0YXRlIDp7XG4gICAgICAgIHNoYXJlZCA6IFwi5bey5YiG5LqrXCJcbiAgICAgICAgdW5fc2hhcmUgOiBcIuacquWIhuS6q1wiXG4gICAgICAgIHNoYXJlX3N1Y2NlcyA6XCLliIbkuqvmiJDlip9cIlxuICAgIH07XG4qL1xuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcblxuICAgIH0sXG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcblxuICAgIC8v5omT5byA5Y+z5LiK6KeSM+S4queCuei9rOWPkVxuICAgIG9wZW5fc2hhcmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiAod3gpICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICAvL+aYvuekuuW9k+WJjemhtemdouWPs+S4iuinkueahOi9rOWPkeaMiemSrlxuICAgICAgICAgICAgd3guc2hvd1NoYXJlTWVudSh7IHdpdGhTaGFyZVRpY2tldDogdHJ1ZSB9KVxuICAgICAgICAgICAgd3gub25TaGFyZUFwcE1lc3NhZ2UoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIC8v5omL5Yqo5ouJ6LW36L2s5Y+R6LCD55SoXG4gICAgbWFudWFsX3NoYXJlOiBmdW5jdGlvbiAodGFnKSB7XG4gICAgICAgIGlmICh0eXBlb2YgKHR0KSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgLy/orrDlvZXmmK/ku4DkuYjliIbkuqtcbiAgICAgICAgICAgIHRoaXMuc2hhcmVfdGFnID0gdGFnO1xuICAgICAgICAgICAgdGhpcy5zaGFyZV9zdGF0ZSA9IFwic2hhcmVkXCI7XG4gICAgICAgICAgICB0aGlzLnNoYXJlX3RpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTsgLy8g6K6w5b2V5b2T5YmN5pe26Ze0XG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICBzd2l0Y2ggKHRhZykge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJvZmZsaW5lX3Byb2ZpdFwiOlxuICAgICAgICAgICAgICAgICAgICB0dC5zaGFyZUFwcE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVJZDogXCJ1NzY0eDdicDl2MmQzazE2aWpcIiwgLy8g5pu/5o2i5oiQ6YCa6L+H5a6h5qC455qE5YiG5LqrSURcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkxlaXN1cmUgZmFybSwgaGFuZyB1cFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzYzogXCJBIHJlbGF4aW5nIGFuZCBjYXN1YWwgYnVzaW5lc3Mgc2ltdWxhdGlvbiBnYW1l44CCXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWFnZVVybDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5OiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzcygpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWIhuS6q+inhumikeaIkOWKn1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNoYXJlX3N1Y2VzcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhaWwoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5YiG5Lqr6KeG6aKR5aSx6LSlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2hhcmVfZmFpbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInBldFwiOlxuICAgICAgICAgICAgICAgICAgICB0dC5zaGFyZUFwcE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVJZDogXCJcIiwgLy8g5pu/5o2i5oiQ6YCa6L+H5a6h5qC455qE5YiG5LqrSURcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkRvIHlvdSBsaWtlIG1lP1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzYzogXCJJIHdhbnQgdGhpcyBsaXR0bGUgcGV0LCBwbGVhc2UgY2xpY2sgZm9yIG1l77yBXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWFnZVVybDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5OiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzcygpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWIhuS6q+inhumikeaIkOWKn1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNoYXJlX3N1Y2VzcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhaWwoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5YiG5Lqr6KeG6aKR5aSx6LSlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2hhcmVfZmFpbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuXG4gICAgfSxcbiAgICAvL+W+ruS/oeWbnuWIsOWJjeWPsOWIhuS6q+WIpOaWrVxuICAgIHNoYXJlX2p1ZGdlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0eXBlb2YgKHd4KSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgd3gub25TaG93KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAvL+agh+etvuS4jeiDveS4uuepuuW5tuS4lOWIhuS6q+eKtuaAgeS4uuW3suWIhuS6q1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLnNoYXJlX3N0YXRlID09IFwic2hhcmVkXCIgJiYgc2VsZi5zaGFyZV90YWcgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5vd190aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChub3dfdGltZSAtIHNlbGYuc2hhcmVfdGltZSA+PSAzMDAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNoYXJlX3N1Y2VzcyhzZWxmLnNoYXJlX3RhZyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNoYXJlX2ZhaWwoKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIC8v5YiG5Lqr5oiQ5YqfXG4gICAgc2hhcmVfc3VjZXNzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc2hhcmVfc3RhdGUgPSBcInNoYXJlX3N1Y2Nlc1wiO1xuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIFwic2hhcmVfc3VjY2VzXCIpO1xuICAgIH0sXG5cbiAgICAvL+WIhuS6q+Wksei0pVxuICAgIHNoYXJlX2ZhaWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5pbmlfc2hhcmUoKTtcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9zY2VuZV9qcy5ub2RlLCBcInNoYXJlX2ZhaWxcIik7XG5cbiAgICB9LFxuXG4gICAgLy/liJ3lp4vljJbliIbkuqtcbiAgICBpbmlfc2hhcmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5zaGFyZV90YWcgPSBudWxsOyAvL+WIhuS6q+eahOagh+etvlxuICAgICAgICB0aGlzLnNoYXJlX3RpbWUgPSBudWxsOyAvL+WIhuS6q+aXtueahOaXtumXtFxuICAgICAgICB0aGlzLnNoYXJlX3N0YXRlID0gXCJ1bl9zaGFyZVwiO1xuICAgIH0sXG5cbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8v5Yib5bu66KeG6aKR5bm/5ZGKXG4gICAgY3JlYXRlX3ZpZGVvQWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGNvbmZpZy5hZF9zdGF0ZSA9PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH07XG4gICAgICAgIGlmICh0eXBlb2YgKHd4KSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgLy/op4bpopHlub/lkYpcbiAgICAgICAgICAgIHRoaXMudmlkZW9fYWQgPSB3eC5jcmVhdGVSZXdhcmRlZFZpZGVvQWQoe1xuICAgICAgICAgICAgICAgIGFkVW5pdElkOiAnMm9vNjBzanhsZDkxMWdyaDI1JywvL+Whq+S4iuS9oOeahOW5v+WRiuS9jWlkXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgICAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgICAgICAgICAgLy/plJnor6/mj5DnpLpcbiAgICAgICAgICAgIHRoaXMudmlkZW9fYWQub25FcnJvcihlcnIgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRfbWFuYWdlZXIgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIC8v5bGV56S66KeG6aKR5bm/5ZGKXG4gICAgc2hvd192aWRlb0FkOiBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICBpZiAoY29uZmlnLmFkX3N0YXRlID09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHR5cGVvZiAod3gpICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hZF9tYW5hZ2VlciA9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIC8v5bm/5ZGK5pyq5byA5ZCvXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wYXVzZV9hbGxfc291bmQoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLnZpZGVvX3RhZyA9IG5hbWU7XG4gICAgICAgICAgICAvL+aXoOiuuuacieWkmuWwkeW5v+WRiizlj6rkvJrov5Tlm57kuIDkuKrlrp7kvotcbiAgICAgICAgICAgIHRoaXMudmlkZW9fYWQuc2hvdygpLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyDlpLHotKXph43or5VcbiAgICAgICAgICAgICAgICB0aGlzLnZpZGVvX2FkLmxvYWQoKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLnZpZGVvX2FkLnNob3coKSxcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfmv4DlirHop4bpopEg5bm/5ZGK5pi+56S65aSx6LSlJylcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfc2NlbmVfanMubm9kZSwgXCJ2aWRlb193YWl0XCIpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIC8v5bm/5ZGK57uT5p2f5oiW6YCA5Ye6XG4gICAgb3Zlcl92aWRlb0FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChjb25maWcuYWRfc3RhdGUgPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9O1xuICAgICAgICBpZiAodHlwZW9mICh3eCkgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHRoaXMudmlkZW9fYWQub25DbG9zZShyZXMgPT4ge1xuICAgICAgICAgICAgICAgIC8vIOeUqOaIt+eCueWHu+S6huOAkOWFs+mXreW5v+WRiuOAkeaMiemSrlxuICAgICAgICAgICAgICAgIC8vIOWwj+S6jiAyLjEuMCDnmoTln7rnoYDlupPniYjmnKzvvIxyZXMg5piv5LiA5LiqIHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgIGlmIChyZXMgJiYgcmVzLmlzRW5kZWQgfHwgcmVzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g5q2j5bi45pKt5pS+57uT5p2f77yM5Y+v5Lul5LiL5Y+R5ri45oiP5aWW5YqxXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlkZW9fc3RhdGUgPSAxOy8vIDHkuLrmiJDlip/vvIww5Li65aSx6LSlIDLkvY3mkq3mlL7nu5PmnZ9cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnJlc3VtZV9hbGxfc291bmQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOaSreaUvuS4remAlOmAgOWHuu+8jOS4jeS4i+WPkea4uOaIj+WlluWKsVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucmVzdW1lX2FsbF9zb3VuZCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZGVvX3N0YXRlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9zY2VuZV9qcy5ub2RlLCBcInZpZGVvX2V4aXRcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIC8v5Yib5bu6YmFubmVy5bm/5ZGKXG4gICAgYmFubmVyX2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0eXBlb2YgKHd4KSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgLy/mipbpn7PlsY/olL1iYW5uZXJcbiAgICAgICAgICAgIGNvbnN0IGluZm8gPSB0dC5nZXRTeXN0ZW1JbmZvU3luYygpO1xuICAgICAgICAgICAgaWYgKGluZm8uYXBwTmFtZS50b1VwcGVyQ2FzZSgpID09PSAnRE9VWUlOJyB8fCBjb25maWcuYWRfc3RhdGUgPT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8g5Yib5bu6IEJhbm5lciDlub/lkYrlrp7kvovvvIzmj5DliY3liJ3lp4vljJZcbiAgICAgICAgICAgICAgICBsZXQgc3lzSW5mbyA9IHd4LmdldFN5c3RlbUluZm9TeW5jKClcbiAgICAgICAgICAgICAgICB0aGlzLmJhbm5lckFkID0gd3guY3JlYXRlQmFubmVyQWQoe1xuICAgICAgICAgICAgICAgICAgICBhZFVuaXRJZDogJzZnMzc5OWI4Z2NiNTJ5MWR2aScsXG4gICAgICAgICAgICAgICAgICAgIGFkSW50ZXJ2YWxzOiAzMCxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3A6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzAwLFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB0aGlzLmJhbm5lckFkLm9uRXJyb3IoZXJyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnNob3dfcHVzaF9hZChcImJhbm5lclwiKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmJhbm5lckFkLm9uUmVzaXplKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmFubmVyQWQuc3R5bGUudG9wID0gc3lzSW5mby53aW5kb3dIZWlnaHQgLSByZXMuaGVpZ2h0IC0gMTA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmFubmVyQWQuc3R5bGUubGVmdCA9IChzeXNJbmZvLndpbmRvd1dpZHRoIC0gcmVzLndpZHRoKSAvIDI7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTsvL2VuZCBpZlxuICAgIH0sXG5cbiAgICAvL+WxleekumJhbm5lclxuICAgIHNob3dfYmFubmVyQWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2MubG9nKFwiY3JlYXRlX2Jhbm5lckFEXCIpO1xuICAgICAgICBpZiAodHlwZW9mICh3eCkgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIC8v5oqW6Z+z5bGP6JS9YmFubmVyXG4gICAgICAgICAgICBjb25zdCBpbmZvID0gdHQuZ2V0U3lzdGVtSW5mb1N5bmMoKTtcbiAgICAgICAgICAgIGlmIChpbmZvLmFwcE5hbWUudG9VcHBlckNhc2UoKSA9PT0gJ0RPVVlJTicgfHwgY29uZmlnLmFkX3N0YXRlID09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuYmFubmVyQWQuc2hvdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0sXG4gICAgaGlkZV9iYW5uZXJBZDogZnVuY3Rpb24gKCkge1xuICAgICAgICBjYy5sb2coXCJoaWRlX2Jhbm5lckFEXCIpO1xuICAgICAgICBpZiAodHlwZW9mICh3eCkgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIC8v5oqW6Z+z5bGP6JS9YmFubmVyXG4gICAgICAgICAgICBjb25zdCBpbmZvID0gdHQuZ2V0U3lzdGVtSW5mb1N5bmMoKTtcbiAgICAgICAgICAgIGlmIChpbmZvLmFwcE5hbWUudG9VcHBlckNhc2UoKSA9PT0gJ0RPVVlJTicgfHwgY29uZmlnLmFkX3N0YXRlID09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuYmFubmVyQWQuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0sXG5cblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgLy8gY2MuZ2FtZS5hZGRQZXJzaXN0Um9vdE5vZGUodGhpcy5ub2RlKTtcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9zY2VuZVwiKTtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sID0gY2MuZmluZChcInNvdW5kX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwic291bmRfY29udHJvbFwiKTtcbiAgICAgICAgLy8gdGhpcy5zaGFyZV9qdWRnZSgpO1xuICAgICAgICB0aGlzLmluaV9zaGFyZSgpO1xuICAgICAgICB0aGlzLmp1ZGdlID0gbnVsbDsgLy8g5Yik5pat5piv5ZCm5YiG5Lqr5oiQ5YqfXG4gICAgICAgIHRoaXMudmlkZW9fdGFnID0gbnVsbDsgLy/op4bpopHmoIfnrb5cbiAgICAgICAgdGhpcy52aWRlb19zdGF0ZSA9IG51bGw7IC8v6KeG6aKR5pKt5pS+55qE54q25oCBIDHkvY1zdWNjZXMgMOS4umZhaWxcbiAgICAgICAgdGhpcy5jcmVhdGVfdmlkZW9BZCgpO1xuICAgICAgICB0aGlzLm92ZXJfdmlkZW9BZCgpO1xuICAgICAgICB0aGlzLmJhbm5lcl9hZCgpO1xuICAgICAgICB0aGlzLm9wZW5fc2hhcmUoKTtcblxuXG4gICAgfSxcblxuICAgIHN0YXJ0KCkge1xuXG4gICAgfSxcblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxufSk7XG4iXX0=