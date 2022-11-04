
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ui/gift_ui.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2194dh97IxH3rmm+IE2GOoB', 'gift_ui');
// script/ui/gift_ui.js

"use strict";

var user_data = require("user_data");

cc.Class({
  "extends": cc.Component,
  properties: {
    center_node: cc.Node,
    exit_button_node: cc.Node,
    introduce_label: cc.Label
  },
  // LIFE-CYCLE CALLBACKS:
  ini_node: function ini_node() {
    var _this = this;

    this.ad_control = cc.find("ad_control").getComponent("ad_control");
    this.adsManager_js = cc.find("UI_ROOT").getComponent("AdsManager");
    this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
    this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
    this.sound_control = cc.find("sound_control").getComponent("sound_control");
    this.ad_control.show_bannerAd();
    this.center_node.scale = 0;
    this.exit_button_node.active = false;

    if (user_data.user_data.level < 15) {
      this.introduce_label.string = "Watch short commercials, \nlevel+1";
    } else {
      this.introduce_label.string = "Watch short commercials and \ngain half-level experience";
    }

    ;
    cc.tween(this.center_node).to(0.3, {
      scale: 1
    }, {
      easing: "elasticOut"
    }).call(function () {
      _this.scheduleOnce(function () {
        _this.exit_button_node.active = true;
      }, 1.5);
    }).start();
  },
  //我要看视频按钮被点击
  on_i_wanner_ad_button_click: function on_i_wanner_ad_button_click() {
    var _this2 = this;

    this.sound_control.play_sound_effect("button_click");
    this.adsManager_js.showRewardedVideo(function () {
      if (user_data.user_data.level > 15) {
        _this2.game_rules_js.add_ex(user_data.user_data.level);

        _this2.game_scene_js.create_tips_ui(_this2.game_scene_js.node, "gift_ad_ex");
      } else {
        user_data.user_data.level++;
        user_data.user_data.now_ex = 0;
        user_data.user_data.skill_point++;

        _this2.game_rules_js.set_ex_progress();

        _this2.game_scene_js.create_tips_ui(_this2.game_scene_js.node, "gift_ad_level");
      }

      ;

      _this2.unschedule(callback);

      _this2.node.destroy();
    });
  },
  //exit button
  on_exit_button_click: function on_exit_button_click() {
    this.sound_control.play_sound_effect("button_exit");
    this.node.destroy();
  },
  //检测视频是否播放成功
  video_succes: function video_succes() {
    if (typeof wx != "undefined") {
      var callback = function callback() {
        if (this.ad_control.video_state == 1 && this.ad_control.video_tag == "gift_ad") {
          this.ad_control.video_tag = null;
          this.ad_control.video_state = 2;

          if (user_data.user_data.level > 15) {
            this.game_rules_js.add_ex(user_data.user_data.level);
            this.game_scene_js.create_tips_ui(this.game_scene_js.node, "gift_ad_ex");
          } else {
            user_data.user_data.level++;
            user_data.user_data.now_ex = 0;
            user_data.user_data.skill_point++;
            this.game_rules_js.set_ex_progress();
            this.game_scene_js.create_tips_ui(this.game_scene_js.node, "gift_ad_level");
          }

          ;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcZ2lmdF91aS5qcyJdLCJuYW1lcyI6WyJ1c2VyX2RhdGEiLCJyZXF1aXJlIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJjZW50ZXJfbm9kZSIsIk5vZGUiLCJleGl0X2J1dHRvbl9ub2RlIiwiaW50cm9kdWNlX2xhYmVsIiwiTGFiZWwiLCJpbmlfbm9kZSIsImFkX2NvbnRyb2wiLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwiYWRzTWFuYWdlcl9qcyIsImdhbWVfc2NlbmVfanMiLCJnYW1lX3J1bGVzX2pzIiwic291bmRfY29udHJvbCIsInNob3dfYmFubmVyQWQiLCJzY2FsZSIsImFjdGl2ZSIsImxldmVsIiwic3RyaW5nIiwidHdlZW4iLCJ0byIsImVhc2luZyIsImNhbGwiLCJzY2hlZHVsZU9uY2UiLCJzdGFydCIsIm9uX2lfd2FubmVyX2FkX2J1dHRvbl9jbGljayIsInBsYXlfc291bmRfZWZmZWN0Iiwic2hvd1Jld2FyZGVkVmlkZW8iLCJhZGRfZXgiLCJjcmVhdGVfdGlwc191aSIsIm5vZGUiLCJub3dfZXgiLCJza2lsbF9wb2ludCIsInNldF9leF9wcm9ncmVzcyIsInVuc2NoZWR1bGUiLCJjYWxsYmFjayIsImRlc3Ryb3kiLCJvbl9leGl0X2J1dHRvbl9jbGljayIsInZpZGVvX3N1Y2NlcyIsInd4IiwidmlkZW9fc3RhdGUiLCJ2aWRlb190YWciLCJzY2hlZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxTQUFTLEdBQUdDLE9BQU8sQ0FBQyxXQUFELENBQXZCOztBQUNBQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsV0FBVyxFQUFFSixFQUFFLENBQUNLLElBRFI7QUFFUkMsSUFBQUEsZ0JBQWdCLEVBQUVOLEVBQUUsQ0FBQ0ssSUFGYjtBQUdSRSxJ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O0FBQ0g7O0FBQUE7QUFDRCxlQUFLSSxVQUFMLENBQWdCQyxRQUFoQjtBQUNBLGVBQUtMLElBQUwsQ0FBVU0sT0FBVjtBQUNILFNBZkQsTUFlTztBQUNILGNBQUksS0FBSzdCLFVBQUwsQ0FBZ0JrQyxTQUFoQixJQUE2QixJQUE3QixJQUFxQyxLQUFLbEMsVUFBTCxDQUFnQmlDLFdBQWhCLElBQStCLENBQXhFLEVBQTJFO0FBQ3ZFLGlCQUFLTixVQUFMLENBQWdCQyxRQUFoQjtBQUNIOztBQUFBO0FBQ0o7O0FBQUE7QUFDSixPQXJCRDs7QUFzQkEsV0FBS08sUUFBTCxDQUFjUCxRQUFkLEVBQXdCLEdBQXhCO0FBQ0g7O0FBQUE7QUFDSixHQXJGSTtBQXNGTDtBQUVBWCxFQUFBQSxLQXhGSyxtQkF3RkcsQ0FFUCxDQTFGSSxDQTRGTDs7QUE1RkssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHVzZXJfZGF0YSA9IHJlcXVpcmUoXCJ1c2VyX2RhdGFcIik7XHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgY2VudGVyX25vZGU6IGNjLk5vZGUsXHJcbiAgICAgICAgZXhpdF9idXR0b25fbm9kZTogY2MuTm9kZSxcclxuICAgICAgICBpbnRyb2R1Y2VfbGFiZWw6IGNjLkxhYmVsLFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuICAgIGluaV9ub2RlKCkge1xyXG4gICAgICAgIHRoaXMuYWRfY29udHJvbCA9IGNjLmZpbmQoXCJhZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcImFkX2NvbnRyb2xcIik7XHJcbiAgICAgICAgdGhpcy5hZHNNYW5hZ2VyX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiQWRzTWFuYWdlclwiKTtcclxuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJnYW1lX3NjZW5lXCIpO1xyXG4gICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfcnVsZXNcIik7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sID0gY2MuZmluZChcInNvdW5kX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwic291bmRfY29udHJvbFwiKTtcclxuICAgICAgICB0aGlzLmFkX2NvbnRyb2wuc2hvd19iYW5uZXJBZCgpO1xyXG4gICAgICAgIHRoaXMuY2VudGVyX25vZGUuc2NhbGUgPSAwO1xyXG4gICAgICAgIHRoaXMuZXhpdF9idXR0b25fbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5sZXZlbCA8IDE1KSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW50cm9kdWNlX2xhYmVsLnN0cmluZyA9IFwiV2F0Y2ggc2hvcnQgY29tbWVyY2lhbHMsIFxcbmxldmVsKzFcIjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmludHJvZHVjZV9sYWJlbC5zdHJpbmcgPSBcIldhdGNoIHNob3J0IGNvbW1lcmNpYWxzIGFuZCBcXG5nYWluIGhhbGYtbGV2ZWwgZXhwZXJpZW5jZVwiO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgY2MudHdlZW4odGhpcy5jZW50ZXJfbm9kZSlcclxuICAgICAgICAgICAgLnRvKDAuMywgeyBzY2FsZTogMSB9LCB7IGVhc2luZzogXCJlbGFzdGljT3V0XCIgfSlcclxuICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXhpdF9idXR0b25fbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSwgMS41KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuc3RhcnQoKTtcclxuICAgIH0sXHJcbiAgICAvL+aIkeimgeeci+inhumikeaMiemSruiiq+eCueWHu1xyXG4gICAgb25faV93YW5uZXJfYWRfYnV0dG9uX2NsaWNrKCkge1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9jbGlja1wiKTtcclxuICAgICAgICB0aGlzLmFkc01hbmFnZXJfanMuc2hvd1Jld2FyZGVkVmlkZW8oKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5sZXZlbCA+IDE1KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMuYWRkX2V4KHVzZXJfZGF0YS51c2VyX2RhdGEubGV2ZWwpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9zY2VuZV9qcy5ub2RlLCBcImdpZnRfYWRfZXhcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLmxldmVsKys7XHJcbiAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLm5vd19leCA9IDA7XHJcbiAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsX3BvaW50Kys7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVfcnVsZXNfanMuc2V0X2V4X3Byb2dyZXNzKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIFwiZ2lmdF9hZF9sZXZlbFwiKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZShjYWxsYmFjayk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLy9leGl0IGJ1dHRvblxyXG4gICAgb25fZXhpdF9idXR0b25fY2xpY2soKSB7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2V4aXRcIik7XHJcblxyXG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XHJcbiAgICB9LFxyXG4gICAgLy/mo4DmtYvop4bpopHmmK/lkKbmkq3mlL7miJDlip9cclxuICAgIHZpZGVvX3N1Y2NlczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgKHd4KSAhPSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFkX2NvbnRyb2wudmlkZW9fc3RhdGUgPT0gMSAmJiB0aGlzLmFkX2NvbnRyb2wudmlkZW9fdGFnID09IFwiZ2lmdF9hZFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZF9jb250cm9sLnZpZGVvX3RhZyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZF9jb250cm9sLnZpZGVvX3N0YXRlID0gMjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodXNlcl9kYXRhLnVzZXJfZGF0YS5sZXZlbCA+IDE1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcy5hZGRfZXgodXNlcl9kYXRhLnVzZXJfZGF0YS5sZXZlbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfc2NlbmVfanMubm9kZSwgXCJnaWZ0X2FkX2V4XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubGV2ZWwrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5ub3dfZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLnNraWxsX3BvaW50Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcy5zZXRfZXhfcHJvZ3Jlc3MoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9zY2VuZV9qcy5ub2RlLCBcImdpZnRfYWRfbGV2ZWxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUoY2FsbGJhY2spO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmFkX2NvbnRyb2wudmlkZW9fdGFnID09IG51bGwgJiYgdGhpcy5hZF9jb250cm9sLnZpZGVvX3N0YXRlID09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKGNhbGxiYWNrKTtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZShjYWxsYmFjaywgMC4yKTtcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8vIG9uTG9hZCAoKSB7fSxcclxuXHJcbiAgICBzdGFydCgpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxyXG59KTtcclxuIl19