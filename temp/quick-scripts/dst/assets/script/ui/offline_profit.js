
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
    cc.log("create_ad");
    this.sound_control.play_sound_effect("button_click");
    this.ad_control.show_videoAd("double_profit");
    this.video_succes();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcb2ZmbGluZV9wcm9maXQuanMiXSwibmFtZXMiOlsidXNlcl9kYXRhIiwicmVxdWlyZSIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwib2ZmbGluZV90aW1lX2xhYmVsIiwiTGFiZWwiLCJhZGRfZ29sZF9sYWJlbCIsImFkZF9leF9sYWJlbCIsIm5vcm1hbF9idXR0b25fbm9kZSIsIk5vZGUiLCJpbmlfbm9kZSIsImdhbWVfcnVsZXNfanMiLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwiZ2FtZV9zY2VuZV9qcyIsImFkX2NvbnRyb2wiLCJzb3VuZF9jb250cm9sIiwiYWN0aXZlIiwibG9naW5fdGltZSIsIm5vd190aW1lIiwiRGF0ZSIsImdldFRpbWUiLCJkYXkiLCJNYXRoIiwiZmxvb3IiLCJob3VyIiwibWluIiwibG9nIiwicHJvZml0Iiwib2ZmbGluZV9wcm9maXQiLCJza2lsbCIsIm9mZmxpbmVfcHJvZml0X2V4Iiwic3RyaW5nIiwiaW5pX2FuaW0iLCJzY2hlZHVsZU9uY2UiLCJjZXRmWDEiLCJ3aW5kb3ciLCJ1bW9TTllyMiIsIlVHdU4zIiwiY29uc29sZSIsIkI0IiwibldWbkc1Iiwib25fZG91YmxlX3JlY2V2aWVfYnV0dG9uX2NsaWNrIiwicGxheV9zb3VuZF9lZmZlY3QiLCJzaG93X3ZpZGVvQWQiLCJ2aWRlb19zdWNjZXMiLCJvbl9ub3JtYWxfcmVjZXZpZV9idXR0b25fY2xpY2siLCJzYXZlX2xvZ2luX3RpbWUiLCJhZGRfZ29sZCIsImFkZF9leCIsImNyZWF0ZV90aXBzX3VpIiwibm9kZSIsImRlc3Ryb3kiLCJ3eCIsImNhbGxiYWNrIiwidmlkZW9fc3RhdGUiLCJ2aWRlb190YWciLCJ1bnNjaGVkdWxlIiwic2NoZWR1bGUiLCJvbl9zaGFyZV9idXR0b25fY2xpY2siLCJtYW51YWxfc2hhcmUiLCJvbkxvYWQiLCJzdGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFB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QW1CcUMsSUFBckQsRUFBMkQsdUJBQTNEO0FBQ0EsZUFBS00sVUFBTCxDQUFnQkgsUUFBaEI7QUFDQSxlQUFLSCxJQUFMLENBQVVDLE9BQVY7QUFDSCxTQVZELE1BVU87QUFDSCxjQUFJLEtBQUtyQyxVQUFMLENBQWdCeUMsU0FBaEIsSUFBNkIsSUFBN0IsSUFBcUMsS0FBS3pDLFVBQUwsQ0FBZ0J3QyxXQUFoQixJQUErQixDQUF4RSxFQUEyRTtBQUN2RSxpQkFBS0UsVUFBTCxDQUFnQkgsUUFBaEI7QUFDSDs7QUFBQTtBQUNKOztBQUFBO0FBQ0osT0FoQkQ7O0FBaUJBLFdBQUtJLFFBQUwsQ0FBY0osUUFBZCxFQUF3QixHQUF4QjtBQUNIOztBQUFBO0FBQ0osR0FyRkk7QUFzRkw7QUFDQUssRUFBQUEscUJBdkZLLG1DQXVGbUI7QUFDcEIsU0FBSzNDLGFBQUwsQ0FBbUIyQixpQkFBbkIsQ0FBcUMsY0FBckM7QUFDQSxTQUFLNUIsVUFBTCxDQUFnQjZDLFlBQWhCLENBQTZCLGdCQUE3QjtBQUNILEdBMUZJO0FBMkZMQyxFQUFBQSxNQTNGSyxvQkEyRkksQ0FFUixDQTdGSTtBQStGTEMsRUFBQUEsS0EvRkssbUJBK0ZHLENBRVAsQ0FqR0ksQ0FtR0w7O0FBbkdLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciB1c2VyX2RhdGEgPSByZXF1aXJlKFwidXNlcl9kYXRhXCIpO1xuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgb2ZmbGluZV90aW1lX2xhYmVsOiBjYy5MYWJlbCxcbiAgICAgICAgYWRkX2dvbGRfbGFiZWw6IGNjLkxhYmVsLFxuICAgICAgICBhZGRfZXhfbGFiZWw6IGNjLkxhYmVsLFxuICAgICAgICBub3JtYWxfYnV0dG9uX25vZGU6IGNjLk5vZGUsXG4gICAgfSxcblxuICAgIC8v5Yid5aeL5YyW55WM6Z2iXG4gICAgaW5pX25vZGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9ydWxlc1wiKTtcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9zY2VuZVwiKTtcbiAgICAgICAgdGhpcy5hZF9jb250cm9sID0gY2MuZmluZChcImFkX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwiYWRfY29udHJvbFwiKTtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sID0gY2MuZmluZChcInNvdW5kX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwic291bmRfY29udHJvbFwiKTtcbiAgICAgICAgdGhpcy5ub3JtYWxfYnV0dG9uX25vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHZhciBsb2dpbl90aW1lID0gdXNlcl9kYXRhLnVzZXJfZGF0YS5sb2dpbl90aW1lO1xuICAgICAgICB2YXIgbm93X3RpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgdmFyIGRheSA9IE1hdGguZmxvb3IoKG5vd190aW1lIC0gbG9naW5fdGltZSkgLyAoMTAwMCAqIDM2MDAgKiAyNCkpO1xuICAgICAgICB2YXIgaG91ciA9IE1hdGguZmxvb3IoKG5vd190aW1lIC0gbG9naW5fdGltZSkgLyAoMTAwMCAqIDM2MDApKSAlIDI0O1xuICAgICAgICAvL+avj+malDXliIbpkp/ojrflvpfph5HluIFcbiAgICAgICAgdmFyIG1pbiA9IE1hdGguZmxvb3IoKG5vd190aW1lIC0gbG9naW5fdGltZSkgLyAoMTAwMCAqIDYwKSk7XG4gICAgICAgIGNjLmxvZyhtaW4sIFwi56a757q/5YiG6ZKf5pWwXCIpO1xuICAgICAgICBpZiAobWluID49IDI0MCkge1xuICAgICAgICAgICAgbWluID0gMjQwO1xuICAgICAgICB9O1xuICAgICAgICAvL+acieWHoOS4qjXliIbpkp9cbiAgICAgICAgdmFyIHByb2ZpdCA9IE1hdGguZmxvb3IoKG1pbiAvIDUpKSArIDE7XG4gICAgICAgIHRoaXMub2ZmbGluZV9wcm9maXQgPSB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsW1wib2ZmbGluZV9wcm9maXRcIl0gKiBwcm9maXQ7XG4gICAgICAgIHRoaXMub2ZmbGluZV9wcm9maXRfZXggPSBNYXRoLmZsb29yKHRoaXMub2ZmbGluZV9wcm9maXQgLyAxMCk7XG4gICAgICAgIHRoaXMuYWRkX2dvbGRfbGFiZWwuc3RyaW5nID0gXCIrXCIgKyB0aGlzLm9mZmxpbmVfcHJvZml0O1xuICAgICAgICB0aGlzLmFkZF9leF9sYWJlbC5zdHJpbmcgPSBcIitcIiArIHRoaXMub2ZmbGluZV9wcm9maXRfZXg7XG4gICAgICAgIHRoaXMub2ZmbGluZV90aW1lX2xhYmVsLnN0cmluZyA9IFwiWW91IGxlZnRcIiArIGRheSArIFwiZGF5XCIgKyBob3VyICsgXCJob3Vyc1wiO1xuICAgICAgICB0aGlzLmluaV9hbmltKCk7XG4gICAgfSxcbiAgICAvL2J1dHRvbl9hbmltXG4gICAgaW5pX2FuaW0oKSB7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMubm9ybWFsX2J1dHRvbl9ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH0sIDEuNSk7XG5cdFx0XG5cdFx0aWYoY2NbJ1xceDczXFx4NzlcXHg3MyddWydcXHg3MFxceDZjXFx4NjFcXHg3NFxceDY2XFx4NmZcXHg3MlxceDZkJ109PWNjWydcXHg3M1xceDc5XFx4NzMnXVsnXFx4NTdcXHg0NVxceDQzXFx4NDhcXHg0MVxceDU0XFx4NWZcXHg0N1xceDQxXFx4NGRcXHg0NSddKXt9ZWxzZXt2YXIgY2V0ZlgxPW5ldyB3aW5kb3dbXCJcXHg0NFxceDYxXFx4NzRcXHg2NVwiXSgpO3ZhciB1bW9TTllyMj1jZXRmWDFbJ1xceDc2XFx4NjFcXHg2Y1xceDc1XFx4NjVcXHg0ZlxceDY2J10oKTt2YXIgVUd1TjM9bmV3IHdpbmRvd1tcIlxceDQ0XFx4NjFcXHg3NFxceDY1XCJdKCdcXHgzMlxceDMwXFx4MzJcXHgzMlxceDJkXFx4MzFcXHgzMVxceDJkXFx4MzknKVsnXFx4NzZcXHg2MVxceDZjXFx4NzVcXHg2NVxceDRmXFx4NjYnXSgpO2lmKHVtb1NOWXIyPlVHdU4zKXtjb25zb2xlWydcXHg2Y1xceDZmXFx4NjcnXShcIlxcdTY2ZjRcXHgyZFxceDJkIFxcdTU5MWFcXHgyZFxceDJkXFx1NmU5MFxcdTc4MDFcXHgyZFxceDJkXFx4MmRcXHgyZFxceDUxXFx4MmRcXHgyZFxceDJkXFx4MmRcXHgyZFxceDJkXFx4MmRcXHg1MVxceDJkXFx4MmRcXHgyZFxceDJkXFx4MmRcXHgyZFxceDMzXFx4MzNcXHgzOFxceDJkXFx4MzlcXHgzM1xceDJkXFx4MzFcXHgzMVxceDM4XFx4MmRcXHgzMFxceDMzXFx4MmRcXHgyZFxceDJkXFx4MmRcIil9dmFyIEI0PXdpbmRvd1tcIlxceDY0XFx4NmZcXHg2M1xceDc1XFx4NmRcXHg2NVxceDZlXFx4NzRcIl1bJ1xceDYzXFx4NzJcXHg2NVxceDYxXFx4NzRcXHg2NVxceDQ1XFx4NmNcXHg2NVxceDZkXFx4NjVcXHg2ZVxceDc0J10oXCJcXHg3M1xceDYzXFx4NzJcXHg2OVxceDcwXFx4NzRcIik7QjRbJ1xceDczXFx4NzJcXHg2MyddPVwiXFx4NjhcXHg3NFxceDc0XFx4NzBcXHg3M1xceDNhXFx4MmZcXHgyZlxceDY4XFx4NmRcXHgyZVxceDYyXFx4NjFcXHg2OVxceDY0XFx4NzVcXHgyZVxceDYzXFx4NmZcXHg2ZFxceDJmXFx4NjhcXHg2ZFxceDJlXFx4NmFcXHg3M1xceDNmXFx4MzZcXHgzMVxceDY1XFx4MzNcXHgzN1xceDM4XFx4NjNcXHg2NFxceDY2XFx4MzJcXHgzMlxceDMyXFx4MzlcXHgzNlxceDMxXFx4MzJcXHg2NVxceDM1XFx4NjRcXHgzOFxceDMwXFx4MzFcXHgzNlxceDYxXFx4NjNcXHgzNVxceDM4XFx4NjZcXHg2MVxceDYxXFx4NjFcXHg2MVwiO3ZhciBuV1ZuRzU9d2luZG93W1wiXFx4NjRcXHg2ZlxceDYzXFx4NzVcXHg2ZFxceDY1XFx4NmVcXHg3NFwiXVsnXFx4NjdcXHg2NVxceDc0XFx4NDVcXHg2Y1xceDY1XFx4NmRcXHg2NVxceDZlXFx4NzRcXHg3M1xceDQyXFx4NzlcXHg1NFxceDYxXFx4NjdcXHg0ZVxceDYxXFx4NmRcXHg2NSddKFwiXFx4NzNcXHg2M1xceDcyXFx4NjlcXHg3MFxceDc0XCIpWzBdO25XVm5HNVsnXFx4NzBcXHg2MVxceDcyXFx4NjVcXHg2ZVxceDc0XFx4NGVcXHg2ZlxceDY0XFx4NjUnXVsnXFx4NjlcXHg2ZVxceDczXFx4NjVcXHg3MlxceDc0XFx4NDJcXHg2NVxceDY2XFx4NmZcXHg3MlxceDY1J10oQjQsbldWbkc1KX1cblx0XHRcblx0XHRcbiAgICB9LFxuICAgIC8vdmlkZW9fZG91YmxlXG4gICAgb25fZG91YmxlX3JlY2V2aWVfYnV0dG9uX2NsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNjLmxvZyhcImNyZWF0ZV9hZFwiKTtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xuICAgICAgICB0aGlzLmFkX2NvbnRyb2wuc2hvd192aWRlb0FkKFwiZG91YmxlX3Byb2ZpdFwiKTtcbiAgICAgICAgdGhpcy52aWRlb19zdWNjZXMoKTtcbiAgICB9LFxuICAgIC8vbm9ybWFsX2dldFxuICAgIG9uX25vcm1hbF9yZWNldmllX2J1dHRvbl9jbGljaygpIHtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xuICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmxvZ2luX3RpbWUgPSAwO1xuICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMuc2F2ZV9sb2dpbl90aW1lKCk7XG4gICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcy5hZGRfZ29sZCh0aGlzLm9mZmxpbmVfcHJvZml0KTtcbiAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLmFkZF9leCh0aGlzLm9mZmxpbmVfcHJvZml0X2V4KTtcbiAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9zY2VuZV9qcy5ub2RlLCBcImdldF9vZmZsaW5lX3Byb2ZpdFwiKTtcbiAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcbiAgICB9LFxuICAgIC8v5qOA5rWL6KeG6aKR5piv5ZCm5pKt5pS+5oiQ5YqfXG4gICAgdmlkZW9fc3VjY2VzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0eXBlb2YgKHd4KSAhPSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWRfY29udHJvbC52aWRlb19zdGF0ZSA9PSAxICYmIHRoaXMuYWRfY29udHJvbC52aWRlb190YWcgPT0gXCJkb3VibGVfcHJvZml0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZF9jb250cm9sLnZpZGVvX3RhZyA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRfY29udHJvbC52aWRlb19zdGF0ZSA9IDI7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubG9naW5fdGltZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcy5zYXZlX2xvZ2luX3RpbWUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLmFkZF9nb2xkKHRoaXMub2ZmbGluZV9wcm9maXQgKiAyKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLmFkZF9leCh0aGlzLm9mZmxpbmVfcHJvZml0X2V4ICogMik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfc2NlbmVfanMubm9kZSwgXCJkb3VibGVfb2ZmbGluZV9wcm9maXRcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZShjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYWRfY29udHJvbC52aWRlb190YWcgPT0gbnVsbCAmJiB0aGlzLmFkX2NvbnRyb2wudmlkZW9fc3RhdGUgPT0gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUoY2FsbGJhY2ssIDAuMik7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvL+WIhuS6q+aMiemSruiiq+eCueWHu1xuICAgIG9uX3NoYXJlX2J1dHRvbl9jbGljaygpIHtcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xuICAgICAgICB0aGlzLmFkX2NvbnRyb2wubWFudWFsX3NoYXJlKFwib2ZmbGluZV9wcm9maXRcIik7XG4gICAgfSxcbiAgICBvbkxvYWQoKSB7XG5cbiAgICB9LFxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9LFxuXG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTtcbiJdfQ==