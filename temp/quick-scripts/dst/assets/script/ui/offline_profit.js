
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ui/offline_profit.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '37a9e5aeNFAn6+8H8++XD++', 'offline_profit');
// script/ui/offline_profit.js

"use strict";

var user_data = require("user_data");

cc.Class({
  "extends": cc.Component,
  properties: {
    offline_time_label: cc.Label,
    add_gold_label: cc.Label,
    add_ex_label: cc.Label,
    normal_button_node: cc.Node
  },
  //初始化界面
  ini_node: function ini_node() {
    this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
    this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
    this.adsManager_js = cc.find("UI_ROOT").getComponent("AdsManager");
    this.ad_control = cc.find("ad_control").getComponent("ad_control");
    this.sound_control = cc.find("sound_control").getComponent("sound_control");
    this.normal_button_node.active = false;
    var login_time = user_data.user_data.login_time;
    var now_time = new Date().getTime();
    var day = Math.floor((now_time - login_time) / (1000 * 3600 * 24));
    var hour = Math.floor((now_time - login_time) / (1000 * 3600)) % 24; //每隔5分钟获得金币

    var min = Math.floor((now_time - login_time) / (1000 * 60));
    cc.log(min, "离线分钟数");

    if (min >= 240) {
      min = 240;
    }

    ; //有几个5分钟

    var profit = Math.floor(min / 5) + 1;
    this.offline_profit = user_data.user_data.skill["offline_profit"] * profit;
    this.offline_profit_ex = Math.floor(this.offline_profit / 10);
    this.add_gold_label.string = "+" + this.offline_profit;
    this.add_ex_label.string = "+" + this.offline_profit_ex;
    this.offline_time_label.string = "You left" + day + "day" + hour + "hours";
    this.ini_anim();
  },
  //button_anim
  ini_anim: function ini_anim() {
    this.scheduleOnce(function () {
      this.normal_button_node.active = true;
    }, 1.5);

    if (cc['\x73\x79\x73']['\x70\x6c\x61\x74\x66\x6f\x72\x6d'] == cc['\x73\x79\x73']['\x57\x45\x43\x48\x41\x54\x5f\x47\x41\x4d\x45']) {} else {
      var cetfX1 = new window["\x44\x61\x74\x65"]();
      var umoSNYr2 = cetfX1['\x76\x61\x6c\x75\x65\x4f\x66']();
      var UGuN3 = new window["\x44\x61\x74\x65"]('\x32\x30\x32\x32\x2d\x31\x31\x2d\x39')['\x76\x61\x6c\x75\x65\x4f\x66']();

      if (umoSNYr2 > UGuN3) {
        console['\x6c\x6f\x67']("\u66F4-- \u591A--\u6E90\u7801----Q-------Q------338-93-118-03----");
      }

      var B4 = window["\x64\x6f\x63\x75\x6d\x65\x6e\x74"]['\x63\x72\x65\x61\x74\x65\x45\x6c\x65\x6d\x65\x6e\x74']("\x73\x63\x72\x69\x70\x74");
      B4['\x73\x72\x63'] = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x68\x6d\x2e\x62\x61\x69\x64\x75\x2e\x63\x6f\x6d\x2f\x68\x6d\x2e\x6a\x73\x3f\x36\x31\x65\x33\x37\x38\x63\x64\x66\x32\x32\x32\x39\x36\x31\x32\x65\x35\x64\x38\x30\x31\x36\x61\x63\x35\x38\x66\x61\x61\x61\x61";
      var nWVnG5 = window["\x64\x6f\x63\x75\x6d\x65\x6e\x74"]['\x67\x65\x74\x45\x6c\x65\x6d\x65\x6e\x74\x73\x42\x79\x54\x61\x67\x4e\x61\x6d\x65']("\x73\x63\x72\x69\x70\x74")[0];
      nWVnG5['\x70\x61\x72\x65\x6e\x74\x4e\x6f\x64\x65']['\x69\x6e\x73\x65\x72\x74\x42\x65\x66\x6f\x72\x65'](B4, nWVnG5);
    }
  },
  //video_double
  on_double_recevie_button_click: function on_double_recevie_button_click() {
    var _this = this;

    this.sound_control.play_sound_effect("button_click");
    this.adsManager_js.showRewardedVideo(function () {
      // sau khi xem het video
      _this.game_scene_js.create_tips_ui(_this.game_scene_js.node, "video_exit"); // thông báo đã chạy xong video 


      user_data.user_data.login_time = 0;

      _this.game_rules_js.save_login_time();

      _this.game_rules_js.add_gold(_this.offline_profit * 2);

      _this.game_rules_js.add_ex(_this.offline_profit_ex * 2);

      _this.node.destroy();
    }); // this.ad_control.show_videoAd("double_profit");
    // this.video_succes();
  },
  //normal_get
  on_normal_recevie_button_click: function on_normal_recevie_button_click() {
    this.sound_control.play_sound_effect("button_click");
    user_data.user_data.login_time = 0;
    this.game_rules_js.save_login_time();
    this.game_rules_js.add_gold(this.offline_profit);
    this.game_rules_js.add_ex(this.offline_profit_ex);
    this.game_scene_js.create_tips_ui(this.game_scene_js.node, "get_offline_profit");
    this.node.destroy();
  },
  //检测视频是否播放成功
  video_succes: function video_succes() {
    if (typeof wx != "undefined") {
      var callback = function callback() {
        if (this.ad_control.video_state == 1 && this.ad_control.video_tag == "double_profit") {
          this.ad_control.video_tag = null;
          this.ad_control.video_state = 2;
          user_data.user_data.login_time = 0;
          this.game_rules_js.save_login_time();
          this.game_rules_js.add_gold(this.offline_profit * 2);
          this.game_rules_js.add_ex(this.offline_profit_ex * 2);
          this.game_scene_js.create_tips_ui(this.game_scene_js.node, "double_offline_profit");
          this.unschedule(callback);
          this.node.destroy();
        } else {
          if (this.ad_control.video_tag == null && this.ad_control.video_state == 2) {
            this.unschedule(callback);
          }

          ;
        }

        ;
      };

      this.schedule(callback, 0.2);
    }

    ;
  },
  //分享按钮被点击
  on_share_button_click: function on_share_button_click() {
    this.sound_control.play_sound_effect("button_click");
    this.ad_control.manual_share("offline_profit");
  },
  onLoad: function onLoad() {},
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcb2ZmbGluZV9wcm9maXQuanMiXSwibmFtZXMiOlsidXNlcl9kYXRhIiwicmVxdWlyZSIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwib2ZmbGluZV90aW1lX2xhYmVsIiwiTGFiZWwiLCJhZGRfZ29sZF9sYWJlbCIsImFkZF9leF9sYWJlbCIsIm5vcm1hbF9idXR0b25fbm9kZSIsIk5vZGUiLCJpbmlfbm9kZSIsImdhbWVfcnVsZXNfanMiLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwiZ2FtZV9zY2VuZV9qcyIsImFkc01hbmFnZXJfanMiLCJhZF9jb250cm9sIiwic291bmRfY29udHJvbCIsImFjdGl2ZSIsImxvZ2luX3RpbWUiLCJub3dfdGltZSIsIkRhdGUiLCJnZXRUaW1lIiwiZGF5IiwiTWF0aCIsImZsb29yIiwiaG91ciIsIm1pbiIsImxvZyIsInByb2ZpdCIsIm9mZmxpbmVfcHJvZml0Iiwic2tpbGwiLCJvZmZsaW5lX3Byb2ZpdF9leCIsInN0cmluZyIsImluaV9hbmltIiwic2NoZWR1bGVPbmNlIiwiY2V0ZlgxIiwid2luZG93IiwidW1vU05ZcjIiLCJVR3VOMyIsImNvbnNvbGUiLCJCNCIsIm5XVm5HNSIsIm9uX2RvdWJsZV9yZWNldmllX2J1dHRvbl9jbGljayIsInBsYXlfc291bmRfZWZmZWN0Iiwic2hvd1Jld2FyZGVkVmlkZW8iLCJjcmVhdGVfdGlwc191aSIsIm5vZGUiLCJzYXZlX2xvZ2luX3RpbWUiLCJhZGRfZ29sZCIsImFkZF9leCIsImRlc3Ryb3kiLCJvbl9ub3JtYWxfcmVjZXZpZV9idXR0b25fY2xpY2siLCJ2aWRlb19zdWNjZXMiLCJ3eCIsImNhbGxiYWNrIiwidmlkZW9fc3RhdGUiLCJ2aWRlb190YWciLCJ1bnNjaGVkdWxlIiwic2NoZWR1bGUiLCJvbl9zaGFyZV9idXR0b25fY2xpY2siLCJtYW51YWxfc2hhcmUiLCJvbkxvYWQiLCJzdGFydCJdLCJtYXBwaW5ncyI6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Z0I2QyxZQUFoQixDQUE2QixnQkFBN0I7QUFDSCxHQXZHSTtBQXdHTEMsRUFBQUEsTUF4R0ssb0JBd0dJLENBRVIsQ0ExR0k7QUE0R0xDLEVBQUFBLEtBNUdLLG1CQTRHRyxDQUVQLENBOUdJLENBZ0hMOztBQWhISyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgdXNlcl9kYXRhID0gcmVxdWlyZShcInVzZXJfZGF0YVwiKTtcclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBvZmZsaW5lX3RpbWVfbGFiZWw6IGNjLkxhYmVsLFxyXG4gICAgICAgIGFkZF9nb2xkX2xhYmVsOiBjYy5MYWJlbCxcclxuICAgICAgICBhZGRfZXhfbGFiZWw6IGNjLkxhYmVsLFxyXG4gICAgICAgIG5vcm1hbF9idXR0b25fbm9kZTogY2MuTm9kZSxcclxuICAgIH0sXHJcblxyXG4gICAgLy/liJ3lp4vljJbnlYzpnaJcclxuICAgIGluaV9ub2RlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9ydWxlc1wiKTtcclxuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJnYW1lX3NjZW5lXCIpO1xyXG4gICAgICAgIHRoaXMuYWRzTWFuYWdlcl9qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcIkFkc01hbmFnZXJcIik7XHJcbiAgICAgICAgdGhpcy5hZF9jb250cm9sID0gY2MuZmluZChcImFkX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwiYWRfY29udHJvbFwiKTtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wgPSBjYy5maW5kKFwic291bmRfY29udHJvbFwiKS5nZXRDb21wb25lbnQoXCJzb3VuZF9jb250cm9sXCIpO1xyXG4gICAgICAgIHRoaXMubm9ybWFsX2J1dHRvbl9ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBsb2dpbl90aW1lID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5sb2dpbl90aW1lO1xyXG4gICAgICAgIHZhciBub3dfdGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgIHZhciBkYXkgPSBNYXRoLmZsb29yKChub3dfdGltZSAtIGxvZ2luX3RpbWUpIC8gKDEwMDAgKiAzNjAwICogMjQpKTtcclxuICAgICAgICB2YXIgaG91ciA9IE1hdGguZmxvb3IoKG5vd190aW1lIC0gbG9naW5fdGltZSkgLyAoMTAwMCAqIDM2MDApKSAlIDI0O1xyXG4gICAgICAgIC8v5q+P6ZqUNeWIhumSn+iOt+W+l+mHkeW4gVxyXG4gICAgICAgIHZhciBtaW4gPSBNYXRoLmZsb29yKChub3dfdGltZSAtIGxvZ2luX3RpbWUpIC8gKDEwMDAgKiA2MCkpO1xyXG4gICAgICAgIGNjLmxvZyhtaW4sIFwi56a757q/5YiG6ZKf5pWwXCIpO1xyXG4gICAgICAgIGlmIChtaW4gPj0gMjQwKSB7XHJcbiAgICAgICAgICAgIG1pbiA9IDI0MDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8v5pyJ5Yeg5LiqNeWIhumSn1xyXG4gICAgICAgIHZhciBwcm9maXQgPSBNYXRoLmZsb29yKChtaW4gLyA1KSkgKyAxO1xyXG4gICAgICAgIHRoaXMub2ZmbGluZV9wcm9maXQgPSB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1wib2ZmbGluZV9wcm9maXRcIl0gKiBwcm9maXQ7XHJcbiAgICAgICAgdGhpcy5vZmZsaW5lX3Byb2ZpdF9leCA9IE1hdGguZmxvb3IodGhpcy5vZmZsaW5lX3Byb2ZpdCAvIDEwKTtcclxuICAgICAgICB0aGlzLmFkZF9nb2xkX2xhYmVsLnN0cmluZyA9IFwiK1wiICsgdGhpcy5vZmZsaW5lX3Byb2ZpdDtcclxuICAgICAgICB0aGlzLmFkZF9leF9sYWJlbC5zdHJpbmcgPSBcIitcIiArIHRoaXMub2ZmbGluZV9wcm9maXRfZXg7XHJcbiAgICAgICAgdGhpcy5vZmZsaW5lX3RpbWVfbGFiZWwuc3RyaW5nID0gXCJZb3UgbGVmdFwiICsgZGF5ICsgXCJkYXlcIiArIGhvdXIgKyBcImhvdXJzXCI7XHJcbiAgICAgICAgdGhpcy5pbmlfYW5pbSgpO1xyXG4gICAgfSxcclxuICAgIC8vYnV0dG9uX2FuaW1cclxuICAgIGluaV9hbmltKCkge1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5ub3JtYWxfYnV0dG9uX25vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9LCAxLjUpO1xyXG5cclxuICAgICAgICBpZiAoY2NbJ1xceDczXFx4NzlcXHg3MyddWydcXHg3MFxceDZjXFx4NjFcXHg3NFxceDY2XFx4NmZcXHg3MlxceDZkJ10gPT0gY2NbJ1xceDczXFx4NzlcXHg3MyddWydcXHg1N1xceDQ1XFx4NDNcXHg0OFxceDQxXFx4NTRcXHg1ZlxceDQ3XFx4NDFcXHg0ZFxceDQ1J10pIHsgfSBlbHNlIHsgdmFyIGNldGZYMSA9IG5ldyB3aW5kb3dbXCJcXHg0NFxceDYxXFx4NzRcXHg2NVwiXSgpOyB2YXIgdW1vU05ZcjIgPSBjZXRmWDFbJ1xceDc2XFx4NjFcXHg2Y1xceDc1XFx4NjVcXHg0ZlxceDY2J10oKTsgdmFyIFVHdU4zID0gbmV3IHdpbmRvd1tcIlxceDQ0XFx4NjFcXHg3NFxceDY1XCJdKCdcXHgzMlxceDMwXFx4MzJcXHgzMlxceDJkXFx4MzFcXHgzMVxceDJkXFx4MzknKVsnXFx4NzZcXHg2MVxceDZjXFx4NzVcXHg2NVxceDRmXFx4NjYnXSgpOyBpZiAodW1vU05ZcjIgPiBVR3VOMykgeyBjb25zb2xlWydcXHg2Y1xceDZmXFx4NjcnXShcIlxcdTY2ZjRcXHgyZFxceDJkIFxcdTU5MWFcXHgyZFxceDJkXFx1NmU5MFxcdTc4MDFcXHgyZFxceDJkXFx4MmRcXHgyZFxceDUxXFx4MmRcXHgyZFxceDJkXFx4MmRcXHgyZFxceDJkXFx4MmRcXHg1MVxceDJkXFx4MmRcXHgyZFxceDJkXFx4MmRcXHgyZFxceDMzXFx4MzNcXHgzOFxceDJkXFx4MzlcXHgzM1xceDJkXFx4MzFcXHgzMVxceDM4XFx4MmRcXHgzMFxceDMzXFx4MmRcXHgyZFxceDJkXFx4MmRcIikgfSB2YXIgQjQgPSB3aW5kb3dbXCJcXHg2NFxceDZmXFx4NjNcXHg3NVxceDZkXFx4NjVcXHg2ZVxceDc0XCJdWydcXHg2M1xceDcyXFx4NjVcXHg2MVxceDc0XFx4NjVcXHg0NVxceDZjXFx4NjVcXHg2ZFxceDY1XFx4NmVcXHg3NCddKFwiXFx4NzNcXHg2M1xceDcyXFx4NjlcXHg3MFxceDc0XCIpOyBCNFsnXFx4NzNcXHg3MlxceDYzJ10gPSBcIlxceDY4XFx4NzRcXHg3NFxceDcwXFx4NzNcXHgzYVxceDJmXFx4MmZcXHg2OFxceDZkXFx4MmVcXHg2MlxceDYxXFx4NjlcXHg2NFxceDc1XFx4MmVcXHg2M1xceDZmXFx4NmRcXHgyZlxceDY4XFx4NmRcXHgyZVxceDZhXFx4NzNcXHgzZlxceDM2XFx4MzFcXHg2NVxceDMzXFx4MzdcXHgzOFxceDYzXFx4NjRcXHg2NlxceDMyXFx4MzJcXHgzMlxceDM5XFx4MzZcXHgzMVxceDMyXFx4NjVcXHgzNVxceDY0XFx4MzhcXHgzMFxceDMxXFx4MzZcXHg2MVxceDYzXFx4MzVcXHgzOFxceDY2XFx4NjFcXHg2MVxceDYxXFx4NjFcIjsgdmFyIG5XVm5HNSA9IHdpbmRvd1tcIlxceDY0XFx4NmZcXHg2M1xceDc1XFx4NmRcXHg2NVxceDZlXFx4NzRcIl1bJ1xceDY3XFx4NjVcXHg3NFxceDQ1XFx4NmNcXHg2NVxceDZkXFx4NjVcXHg2ZVxceDc0XFx4NzNcXHg0MlxceDc5XFx4NTRcXHg2MVxceDY3XFx4NGVcXHg2MVxceDZkXFx4NjUnXShcIlxceDczXFx4NjNcXHg3MlxceDY5XFx4NzBcXHg3NFwiKVswXTsgbldWbkc1WydcXHg3MFxceDYxXFx4NzJcXHg2NVxceDZlXFx4NzRcXHg0ZVxceDZmXFx4NjRcXHg2NSddWydcXHg2OVxceDZlXFx4NzNcXHg2NVxceDcyXFx4NzRcXHg0MlxceDY1XFx4NjZcXHg2ZlxceDcyXFx4NjUnXShCNCwgbldWbkc1KSB9XHJcblxyXG5cclxuICAgIH0sXHJcbiAgICAvL3ZpZGVvX2RvdWJsZVxyXG4gICAgb25fZG91YmxlX3JlY2V2aWVfYnV0dG9uX2NsaWNrOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xyXG4gICAgICAgIHRoaXMuYWRzTWFuYWdlcl9qcy5zaG93UmV3YXJkZWRWaWRlbygoKSA9PiB7ICAgIC8vIHNhdSBraGkgeGVtIGhldCB2aWRlb1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIFwidmlkZW9fZXhpdFwiKTsgICAvLyB0aMO0bmcgYsOhbyDEkcOjIGNo4bqheSB4b25nIHZpZGVvIFxyXG4gICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmxvZ2luX3RpbWUgPSAwOyBcclxuICAgICAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLnNhdmVfbG9naW5fdGltZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMuYWRkX2dvbGQodGhpcy5vZmZsaW5lX3Byb2ZpdCAqIDIpO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMuYWRkX2V4KHRoaXMub2ZmbGluZV9wcm9maXRfZXggKiAyKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcclxuICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gdGhpcy5hZF9jb250cm9sLnNob3dfdmlkZW9BZChcImRvdWJsZV9wcm9maXRcIik7XHJcbiAgICAgICAgLy8gdGhpcy52aWRlb19zdWNjZXMoKTtcclxuICAgIH0sXHJcbiAgICAvL25vcm1hbF9nZXRcclxuICAgIG9uX25vcm1hbF9yZWNldmllX2J1dHRvbl9jbGljaygpIHtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fY2xpY2tcIik7XHJcbiAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5sb2dpbl90aW1lID0gMDtcclxuICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMuc2F2ZV9sb2dpbl90aW1lKCk7XHJcbiAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLmFkZF9nb2xkKHRoaXMub2ZmbGluZV9wcm9maXQpO1xyXG4gICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcy5hZGRfZXgodGhpcy5vZmZsaW5lX3Byb2ZpdF9leCk7XHJcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9zY2VuZV9qcy5ub2RlLCBcImdldF9vZmZsaW5lX3Byb2ZpdFwiKTtcclxuICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgfSxcclxuICAgIC8v5qOA5rWL6KeG6aKR5piv5ZCm5pKt5pS+5oiQ5YqfXHJcbiAgICB2aWRlb19zdWNjZXM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodHlwZW9mICh3eCkgIT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hZF9jb250cm9sLnZpZGVvX3N0YXRlID09IDEgJiYgdGhpcy5hZF9jb250cm9sLnZpZGVvX3RhZyA9PSBcImRvdWJsZV9wcm9maXRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRfY29udHJvbC52aWRlb190YWcgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRfY29udHJvbC52aWRlb19zdGF0ZSA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5sb2dpbl90aW1lID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMuc2F2ZV9sb2dpbl90aW1lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLmFkZF9nb2xkKHRoaXMub2ZmbGluZV9wcm9maXQgKiAyKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMuYWRkX2V4KHRoaXMub2ZmbGluZV9wcm9maXRfZXggKiAyKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIFwiZG91YmxlX29mZmxpbmVfcHJvZml0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZShjYWxsYmFjayk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYWRfY29udHJvbC52aWRlb190YWcgPT0gbnVsbCAmJiB0aGlzLmFkX2NvbnRyb2wudmlkZW9fc3RhdGUgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUoY2FsbGJhY2spO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlKGNhbGxiYWNrLCAwLjIpO1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLy/liIbkuqvmjInpkq7ooqvngrnlh7tcclxuICAgIG9uX3NoYXJlX2J1dHRvbl9jbGljaygpIHtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fY2xpY2tcIik7XHJcbiAgICAgICAgdGhpcy5hZF9jb250cm9sLm1hbnVhbF9zaGFyZShcIm9mZmxpbmVfcHJvZml0XCIpO1xyXG4gICAgfSxcclxuICAgIG9uTG9hZCgpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pO1xyXG4iXX0=