
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxjb250cm9sXFxhZF9jb250cm9sLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwib3Blbl9zaGFyZSIsInd4Iiwic2hvd1NoYXJlTWVudSIsIndpdGhTaGFyZVRpY2tldCIsIm9uU2hhcmVBcHBNZXNzYWdlIiwibWFudWFsX3NoYXJlIiwidGFnIiwidHQiLCJzaGFyZV90YWciLCJzaGFyZV9zdGF0ZSIsInNoYXJlX3RpbWUiLCJEYXRlIiwiZ2V0VGltZSIsInNlbGYiLCJzaGFyZUFwcE1lc3NhZ2UiLCJ0ZW1wbGF0ZUlkIiwidGl0bGUiLCJkZXNjIiwiaW1hZ2VVcmwiLCJxdWVyeSIsInN1Y2Nlc3MiLCJjb25zb2xlIiwibG9nIiwic2hhcmVfc3VjZXNzIiwiZmFpbCIsImUiLCJzaGFyZV9mYWlsIiwic2hhcmVfanVkZ2UiLCJvblNob3ciLCJub3dfdGltZSIsImdhbWVfc2NlbmVfanMiLCJjcmVhdGVfdGlwc191aSIsIm5vZGUiLCJpbmlfc2hhcmUiLCJjcmVhdGVfdmlkZW9BZCIsImNvbmZpZyIsImFkX3N0YXRlIiwidmlkZW9fYWQiLCJjcmVhdGVSZXdhcmRlZFZpZGVvQWQiLCJhZFVuaXRJZCIsIm9uRXJyb3IiLCJlcnIiLCJhZF9tYW5hZ2VlciIsInNob3dfdmlkZW9BZCIsIm5hbWUiLCJzb3VuZF9jb250cm9sIiwicGF1c2VfYWxsX3NvdW5kIiwidmlkZW9fdGFnIiwic2hvdyIsImxvYWQiLCJ0aGVuIiwib3Zlcl92aWRlb0FkIiwib25DbG9zZSIsInJlcyIsImlzRW5kZWQiLCJ1bmRlZmluZWQiLCJ2aWRlb19zdGF0ZSIsInJlc3VtZV9hbGxfc291bmQiLCJiYW5uZXJfYWQiLCJpbmZvIiwiZ2V0U3lzdGVtSW5mb1N5bmMiLCJhcHBOYW1lIiwidG9VcHBlckNhc2UiLCJzeXNJbmZvIiwiYmFubmVyQWQiLCJjcmVhdGVCYW5uZXJBZCIsImFkSW50ZXJ2YWxzIiwic3R5bGUiLCJsZWZ0IiwidG9wIiwid2lkdGgiLCJvblJlc2l6ZSIsIndpbmRvd0hlaWdodCIsImhlaWdodCIsIndpbmRvd1dpZHRoIiwic2hvd19iYW5uZXJBZCIsIm9uTG9hZCIsImZpbmQiLCJnZXRDb21wb25lbnQiLCJqdWRnZSIsInN0YXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFLEVBSFA7QUFPTDtBQUVBO0FBQ0FDLEVBQUFBLFVBQVUsRUFBRSxzQkFBWTtBQUNwQixRQUFJLE9BQVFDLEVBQVIsS0FBZ0IsV0FBcEIsRUFBaUM7QUFDN0I7QUFDQUEsTUFBQUEsRUFBRSxDQUFDQyxhQUFILENBQWlCO0FBQUVDLFFBQUFBLGVBQWUsRUFBRTtBQUFuQixPQUFqQjtBQUNBRixNQUFBQSxFQUFFLENBQUNHLGlCQUFILENBQXFCLFlBQVk7QUFDN0IsZUFBTyxDQUNIO0FBREcsU0FBUDtBQUdILE9BSkQ7QUFLSDs7QUFBQTtBQUNKLEdBcEJJO0FBc0JMO0FBQ0FDLEVBQUFBLFlBQVksRUFBRSxzQkFBVUMsR0FBVixFQUFlO0FBQ3pCLFFBQUksT0FBUUMsRUFBUixLQUFnQixXQUFwQixFQUFpQztBQUM3QjtBQUNBLFdBQUtDLFNBQUwsR0FBaUJGLEdBQWpCO0FBQ0EsV0FBS0csV0FBTCxHQUFtQixRQUFuQjtBQUNBLFdBQUtDLFVBQUwsR0FBa0IsSUFBSUMsSUFBSixHQUFXQyxPQUFYLEVBQWxCLENBSjZCLENBSVc7O0FBQ3hDLFVBQUlDLElBQUksR0FBRyxJQUFYOztBQUNBLGNBQVFQLEdBQVI7QUFDSSxhQUFLLGdCQUFMO0FBQ0lDLFVBQUFBLEVBQUUsQ0FBQ08sZUFBSCxDQUFtQjtBQUNmQyxZQUFBQSxVQUFVLEVBQUUsb0JBREc7QUFDbUI7QUFDbENDLFlBQUFBLEtBQUssRUFBRSx1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OztBQUNBLFVBQUlELElBQUksQ0FBQ0UsT0FBTCxDQUFhQyxXQUFiLE9BQStCLFFBQS9CLElBQTJDM0IsbUJBQU9DLFFBQVAsSUFBbUIsQ0FBbEUsRUFBcUU7QUFDakU7QUFDSCxPQUZELE1BRU87QUFDSCxhQUFLNEIsUUFBTCxDQUFjaEIsSUFBZDtBQUNIO0FBQ0o7O0FBQUE7QUFDSixHQTlOSTtBQWtPTDRCLEVBQUFBLE1BbE9LLG9CQWtPSTtBQUNMO0FBQ0EsU0FBSzlDLGFBQUwsR0FBcUJsQyxFQUFFLENBQUNpRixJQUFILENBQVEsU0FBUixFQUFtQkMsWUFBbkIsQ0FBZ0MsWUFBaEMsQ0FBckI7QUFDQSxTQUFLakMsYUFBTCxHQUFxQmpELEVBQUUsQ0FBQ2lGLElBQUgsQ0FBUSxlQUFSLEVBQXlCQyxZQUF6QixDQUFzQyxlQUF0QyxDQUFyQixDQUhLLENBSUw7O0FBQ0EsU0FBSzdDLFNBQUw7QUFDQSxTQUFLOEMsS0FBTCxHQUFhLElBQWIsQ0FOSyxDQU1jOztBQUNuQixTQUFLaEMsU0FBTCxHQUFpQixJQUFqQixDQVBLLENBT2tCOztBQUN2QixTQUFLUyxXQUFMLEdBQW1CLElBQW5CLENBUkssQ0FRb0I7O0FBQ3pCLFNBQUt0QixjQUFMO0FBQ0EsU0FBS2lCLFlBQUw7QUFDQSxTQUFLTyxTQUFMO0FBQ0EsU0FBSzFELFVBQUw7QUFHSCxHQWpQSTtBQW1QTGdGLEVBQUFBLEtBblBLLG1CQW1QRyxDQUVQLENBclBJLENBdVBMOztBQXZQSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY29uZmlnIGZyb20gXCJjb25maWdcIjtcclxuLypcclxuICAgIHNoYXJlX3N0YXRlIDp7XHJcbiAgICAgICAgc2hhcmVkIDogXCLlt7LliIbkuqtcIlxyXG4gICAgICAgIHVuX3NoYXJlIDogXCLmnKrliIbkuqtcIlxyXG4gICAgICAgIHNoYXJlX3N1Y2NlcyA6XCLliIbkuqvmiJDlip9cIlxyXG4gICAgfTtcclxuKi9cclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG5cclxuICAgIC8v5omT5byA5Y+z5LiK6KeSM+S4queCuei9rOWPkVxyXG4gICAgb3Blbl9zaGFyZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgKHd4KSAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAvL+aYvuekuuW9k+WJjemhtemdouWPs+S4iuinkueahOi9rOWPkeaMiemSrlxyXG4gICAgICAgICAgICB3eC5zaG93U2hhcmVNZW51KHsgd2l0aFNoYXJlVGlja2V0OiB0cnVlIH0pXHJcbiAgICAgICAgICAgIHd4Lm9uU2hhcmVBcHBNZXNzYWdlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcblxyXG4gICAgLy/miYvliqjmi4notbfovazlj5HosIPnlKhcclxuICAgIG1hbnVhbF9zaGFyZTogZnVuY3Rpb24gKHRhZykge1xyXG4gICAgICAgIGlmICh0eXBlb2YgKHR0KSAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAvL+iusOW9leaYr+S7gOS5iOWIhuS6q1xyXG4gICAgICAgICAgICB0aGlzLnNoYXJlX3RhZyA9IHRhZztcclxuICAgICAgICAgICAgdGhpcy5zaGFyZV9zdGF0ZSA9IFwic2hhcmVkXCI7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhcmVfdGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpOyAvLyDorrDlvZXlvZPliY3ml7bpl7RcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRhZykge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIm9mZmxpbmVfcHJvZml0XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgdHQuc2hhcmVBcHBNZXNzYWdlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVJZDogXCJ1NzY0eDdicDl2MmQzazE2aWpcIiwgLy8g5pu/5o2i5oiQ6YCa6L+H5a6h5qC455qE5YiG5LqrSURcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiTGVpc3VyZSBmYXJtLCBoYW5nIHVwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2M6IFwiQSByZWxheGluZyBhbmQgY2FzdWFsIGJ1c2luZXNzIHNpbXVsYXRpb24gZ2FtZeOAglwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWFnZVVybDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcXVlcnk6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWIhuS6q+inhumikeaIkOWKn1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2hhcmVfc3VjZXNzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhaWwoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLliIbkuqvop4bpopHlpLHotKVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNoYXJlX2ZhaWwoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInBldFwiOlxyXG4gICAgICAgICAgICAgICAgICAgIHR0LnNoYXJlQXBwTWVzc2FnZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlSWQ6IFwiXCIsIC8vIOabv+aNouaIkOmAmui/h+WuoeaguOeahOWIhuS6q0lEXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkRvIHlvdSBsaWtlIG1lP1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjOiBcIkkgd2FudCB0aGlzIGxpdHRsZSBwZXQsIHBsZWFzZSBjbGljayBmb3IgbWXvvIFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VVcmw6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5OiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLliIbkuqvop4bpopHmiJDlip9cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNoYXJlX3N1Y2VzcygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmYWlsKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5YiG5Lqr6KeG6aKR5aSx6LSlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zaGFyZV9mYWlsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9O1xyXG5cclxuICAgIH0sXHJcbiAgICAvL+W+ruS/oeWbnuWIsOWJjeWPsOWIhuS6q+WIpOaWrVxyXG4gICAgc2hhcmVfanVkZ2U6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodHlwZW9mICh3eCkgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICB3eC5vblNob3coZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy/moIfnrb7kuI3og73kuLrnqbrlubbkuJTliIbkuqvnirbmgIHkuLrlt7LliIbkuqtcclxuICAgICAgICAgICAgICAgIGlmIChzZWxmLnNoYXJlX3N0YXRlID09IFwic2hhcmVkXCIgJiYgc2VsZi5zaGFyZV90YWcgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbm93X3RpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobm93X3RpbWUgLSBzZWxmLnNoYXJlX3RpbWUgPj0gMzAwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNoYXJlX3N1Y2VzcyhzZWxmLnNoYXJlX3RhZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zaGFyZV9mYWlsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy/liIbkuqvmiJDlip9cclxuICAgIHNoYXJlX3N1Y2VzczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuc2hhcmVfc3RhdGUgPSBcInNoYXJlX3N1Y2Nlc1wiO1xyXG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfc2NlbmVfanMubm9kZSwgXCJzaGFyZV9zdWNjZXNcIik7XHJcbiAgICB9LFxyXG5cclxuICAgIC8v5YiG5Lqr5aSx6LSlXHJcbiAgICBzaGFyZV9mYWlsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5pbmlfc2hhcmUoKTtcclxuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIFwic2hhcmVfZmFpbFwiKTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8v5Yid5aeL5YyW5YiG5LqrXHJcbiAgICBpbmlfc2hhcmU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnNoYXJlX3RhZyA9IG51bGw7IC8v5YiG5Lqr55qE5qCH562+XHJcbiAgICAgICAgdGhpcy5zaGFyZV90aW1lID0gbnVsbDsgLy/liIbkuqvml7bnmoTml7bpl7RcclxuICAgICAgICB0aGlzLnNoYXJlX3N0YXRlID0gXCJ1bl9zaGFyZVwiO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAvL+WIm+W7uuinhumikeW5v+WRilxyXG4gICAgY3JlYXRlX3ZpZGVvQWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoY29uZmlnLmFkX3N0YXRlID09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKHR5cGVvZiAod3gpICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIC8v6KeG6aKR5bm/5ZGKXHJcbiAgICAgICAgICAgIHRoaXMudmlkZW9fYWQgPSB3eC5jcmVhdGVSZXdhcmRlZFZpZGVvQWQoe1xyXG4gICAgICAgICAgICAgICAgYWRVbml0SWQ6ICcyb282MHNqeGxkOTExZ3JoMjUnLC8v5aGr5LiK5L2g55qE5bm/5ZGK5L2NaWRcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgICAgICAgICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgICAgICAgICAvL+mUmeivr+aPkOekulxyXG4gICAgICAgICAgICB0aGlzLnZpZGVvX2FkLm9uRXJyb3IoZXJyID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRfbWFuYWdlZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvL+WxleekuuinhumikeW5v+WRilxyXG4gICAgc2hvd192aWRlb0FkOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgICAgIGlmIChjb25maWcuYWRfc3RhdGUgPT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAodHlwZW9mICh3eCkgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYWRfbWFuYWdlZXIgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIC8v5bm/5ZGK5pyq5byA5ZCvXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGF1c2VfYWxsX3NvdW5kKCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMudmlkZW9fdGFnID0gbmFtZTtcclxuICAgICAgICAgICAgLy/ml6DorrrmnInlpJrlsJHlub/lkYos5Y+q5Lya6L+U5Zue5LiA5Liq5a6e5L6LXHJcbiAgICAgICAgICAgIHRoaXMudmlkZW9fYWQuc2hvdygpLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIOWksei0pemHjeivlVxyXG4gICAgICAgICAgICAgICAgdGhpcy52aWRlb19hZC5sb2FkKClcclxuICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLnZpZGVvX2FkLnNob3coKSxcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfmv4DlirHop4bpopEg5bm/5ZGK5pi+56S65aSx6LSlJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9zY2VuZV9qcy5ub2RlLCBcInZpZGVvX3dhaXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8v5bm/5ZGK57uT5p2f5oiW6YCA5Ye6XHJcbiAgICBvdmVyX3ZpZGVvQWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoY29uZmlnLmFkX3N0YXRlID09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKHR5cGVvZiAod3gpICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmlkZW9fYWQub25DbG9zZShyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8g55So5oi354K55Ye75LqG44CQ5YWz6Zet5bm/5ZGK44CR5oyJ6ZKuXHJcbiAgICAgICAgICAgICAgICAvLyDlsI/kuo4gMi4xLjAg55qE5Z+656GA5bqT54mI5pys77yMcmVzIOaYr+S4gOS4qiB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgIGlmIChyZXMgJiYgcmVzLmlzRW5kZWQgfHwgcmVzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDmraPluLjmkq3mlL7nu5PmnZ/vvIzlj6/ku6XkuIvlj5HmuLjmiI/lpZblirFcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZGVvX3N0YXRlID0gMTsvLyAx5Li65oiQ5Yqf77yMMOS4uuWksei0pSAy5L2N5pKt5pS+57uT5p2fXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnJlc3VtZV9hbGxfc291bmQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOaSreaUvuS4remAlOmAgOWHuu+8jOS4jeS4i+WPkea4uOaIj+WlluWKsVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc291bmRfY29udHJvbC5yZXN1bWVfYWxsX3NvdW5kKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWRlb19zdGF0ZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9zY2VuZV9qcy5ub2RlLCBcInZpZGVvX2V4aXRcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvL+WIm+W7umJhbm5lcuW5v+WRilxyXG4gICAgYmFubmVyX2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiAod3gpICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIC8v5oqW6Z+z5bGP6JS9YmFubmVyXHJcbiAgICAgICAgICAgIGNvbnN0IGluZm8gPSB0dC5nZXRTeXN0ZW1JbmZvU3luYygpO1xyXG4gICAgICAgICAgICBpZiAoaW5mby5hcHBOYW1lLnRvVXBwZXJDYXNlKCkgPT09ICdET1VZSU4nIHx8IGNvbmZpZy5hZF9zdGF0ZSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyDliJvlu7ogQmFubmVyIOW5v+WRiuWunuS+i++8jOaPkOWJjeWIneWni+WMllxyXG4gICAgICAgICAgICAgICAgbGV0IHN5c0luZm8gPSB3eC5nZXRTeXN0ZW1JbmZvU3luYygpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhbm5lckFkID0gd3guY3JlYXRlQmFubmVyQWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGFkVW5pdElkOiAnNmczNzk5YjhnY2I1MnkxZHZpJyxcclxuICAgICAgICAgICAgICAgICAgICBhZEludGVydmFsczogMzAsXHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzAwLFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhbm5lckFkLm9uRXJyb3IoZXJyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5zaG93X3B1c2hfYWQoXCJiYW5uZXJcIik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmFubmVyQWQub25SZXNpemUocmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJhbm5lckFkLnN0eWxlLnRvcCA9IHN5c0luZm8ud2luZG93SGVpZ2h0IC0gcmVzLmhlaWdodCAtIDEwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmFubmVyQWQuc3R5bGUubGVmdCA9IChzeXNJbmZvLndpbmRvd1dpZHRoIC0gcmVzLndpZHRoKSAvIDI7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTsvL2VuZCBpZlxyXG4gICAgfSxcclxuXHJcbiAgICAvL+WxleekumJhbm5lclxyXG4gICAgc2hvd19iYW5uZXJBZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNjLmxvZyhcImNyZWF0ZV9iYW5uZXJBRFwiKTtcclxuICAgICAgICBpZiAodHlwZW9mICh3eCkgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgLy/mipbpn7PlsY/olL1iYW5uZXJcclxuICAgICAgICAgICAgY29uc3QgaW5mbyA9IHR0LmdldFN5c3RlbUluZm9TeW5jKCk7XHJcbiAgICAgICAgICAgIGlmIChpbmZvLmFwcE5hbWUudG9VcHBlckNhc2UoKSA9PT0gJ0RPVVlJTicgfHwgY29uZmlnLmFkX3N0YXRlID09IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmFubmVyQWQuc2hvdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiBcclxuXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIC8vIGNjLmdhbWUuYWRkUGVyc2lzdFJvb3ROb2RlKHRoaXMubm9kZSk7XHJcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9zY2VuZVwiKTtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wgPSBjYy5maW5kKFwic291bmRfY29udHJvbFwiKS5nZXRDb21wb25lbnQoXCJzb3VuZF9jb250cm9sXCIpO1xyXG4gICAgICAgIC8vIHRoaXMuc2hhcmVfanVkZ2UoKTtcclxuICAgICAgICB0aGlzLmluaV9zaGFyZSgpO1xyXG4gICAgICAgIHRoaXMuanVkZ2UgPSBudWxsOyAvLyDliKTmlq3mmK/lkKbliIbkuqvmiJDlip9cclxuICAgICAgICB0aGlzLnZpZGVvX3RhZyA9IG51bGw7IC8v6KeG6aKR5qCH562+XHJcbiAgICAgICAgdGhpcy52aWRlb19zdGF0ZSA9IG51bGw7IC8v6KeG6aKR5pKt5pS+55qE54q25oCBIDHkvY1zdWNjZXMgMOS4umZhaWxcclxuICAgICAgICB0aGlzLmNyZWF0ZV92aWRlb0FkKCk7XHJcbiAgICAgICAgdGhpcy5vdmVyX3ZpZGVvQWQoKTtcclxuICAgICAgICB0aGlzLmJhbm5lcl9hZCgpO1xyXG4gICAgICAgIHRoaXMub3Blbl9zaGFyZSgpO1xyXG5cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pO1xyXG4iXX0=