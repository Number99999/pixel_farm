
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcZ2lmdF91aS5qcyJdLCJuYW1lcyI6WyJ1c2VyX2RhdGEiLCJyZXF1aXJlIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJjZW50ZXJfbm9kZSIsIk5vZGUiLCJleGl0X2J1dHRvbl9ub2RlIiwiaW50cm9kdWNlX2xhYmVsIiwiTGFiZWwiLCJpbmlfbm9kZSIsImFkX2NvbnRyb2wiLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwiYWRzTWFuYWdlcl9qcyIsImdhbWVfc2NlbmVfanMiLCJnYW1lX3J1bGVzX2pzIiwic291bmRfY29udHJvbCIsInNjYWxlIiwiYWN0aXZlIiwibGV2ZWwiLCJzdHJpbmciLCJ0d2VlbiIsInRvIiwiZWFzaW5nIiwiY2FsbCIsInNjaGVkdWxlT25jZSIsInN0YXJ0Iiwib25faV93YW5uZXJfYWRfYnV0dG9uX2NsaWNrIiwicGxheV9zb3VuZF9lZmZlY3QiLCJzaG93UmV3YXJkZWRWaWRlbyIsImFkZF9leCIsImNyZWF0ZV90aXBzX3VpIiwibm9kZSIsIm5vd19leCIsInNraWxsX3BvaW50Iiwic2V0X2V4X3Byb2dyZXNzIiwidW5zY2hlZHVsZSIsImNhbGxiYWNrIiwiZGVzdHJveSIsIm9uX2V4aXRfYnV0dG9uX2NsaWNrIiwidmlkZW9fc3VjY2VzIiwid3giLCJ2aWRlb19zdGF0ZSIsInZpZGVvX3RhZyIsInNjaGVkdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLFNBQVMsR0FBR0MsT0FBTyxDQUFDLFdBQUQsQ0FBdkI7O0FBQ0FDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxXQUFXLEVBQUVKLEVBQUUsQ0FBQ0ssSUFEUjtBQUVSQyxJQUFBQSxnQkFBZ0IsRUFBRU4sRUFBRSxDQUFDSyxJQUZiO0FBR1JFLElBQUFBLGVBQWUsRUFBRVAs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QUtMLElBQUwsQ0FBVU0sT0FBVjtBQUNILFNBZkQsTUFlTztBQUNILGNBQUksS0FBSzVCLFVBQUwsQ0FBZ0JpQyxTQUFoQixJQUE2QixJQUE3QixJQUFxQyxLQUFLakMsVUFBTCxDQUFnQmdDLFdBQWhCLElBQStCLENBQXhFLEVBQTJFO0FBQ3ZFLGlCQUFLTixVQUFMLENBQWdCQyxRQUFoQjtBQUNIOztBQUFBO0FBQ0o7O0FBQUE7QUFDSixPQXJCRDs7QUFzQkEsV0FBS08sUUFBTCxDQUFjUCxRQUFkLEVBQXdCLEdBQXhCO0FBQ0g7O0FBQUE7QUFDSixHQXJGSTtBQXNGTDtBQUVBWCxFQUFBQSxLQXhGSyxtQkF3RkcsQ0FFUCxDQTFGSSxDQTRGTDs7QUE1RkssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHVzZXJfZGF0YSA9IHJlcXVpcmUoXCJ1c2VyX2RhdGFcIik7XHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgY2VudGVyX25vZGU6IGNjLk5vZGUsXHJcbiAgICAgICAgZXhpdF9idXR0b25fbm9kZTogY2MuTm9kZSxcclxuICAgICAgICBpbnRyb2R1Y2VfbGFiZWw6IGNjLkxhYmVsLFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuICAgIGluaV9ub2RlKCkge1xyXG4gICAgICAgIHRoaXMuYWRfY29udHJvbCA9IGNjLmZpbmQoXCJhZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcImFkX2NvbnRyb2xcIik7XHJcbiAgICAgICAgdGhpcy5hZHNNYW5hZ2VyX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiQWRzTWFuYWdlclwiKTtcclxuICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJnYW1lX3NjZW5lXCIpO1xyXG4gICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfcnVsZXNcIik7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sID0gY2MuZmluZChcInNvdW5kX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwic291bmRfY29udHJvbFwiKTtcclxuXHJcbiAgICAgICAgdGhpcy5jZW50ZXJfbm9kZS5zY2FsZSA9IDA7XHJcbiAgICAgICAgdGhpcy5leGl0X2J1dHRvbl9ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmxldmVsIDwgMTUpIHtcclxuICAgICAgICAgICAgdGhpcy5pbnRyb2R1Y2VfbGFiZWwuc3RyaW5nID0gXCJXYXRjaCBzaG9ydCBjb21tZXJjaWFscywgXFxubGV2ZWwrMVwiO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW50cm9kdWNlX2xhYmVsLnN0cmluZyA9IFwiV2F0Y2ggc2hvcnQgY29tbWVyY2lhbHMgYW5kIFxcbmdhaW4gaGFsZi1sZXZlbCBleHBlcmllbmNlXCI7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjYy50d2Vlbih0aGlzLmNlbnRlcl9ub2RlKVxyXG4gICAgICAgICAgICAudG8oMC4zLCB7IHNjYWxlOiAxIH0sIHsgZWFzaW5nOiBcImVsYXN0aWNPdXRcIiB9KVxyXG4gICAgICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5leGl0X2J1dHRvbl9ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9LCAxLjUpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zdGFydCgpO1xyXG4gICAgfSxcclxuICAgIC8v5oiR6KaB55yL6KeG6aKR5oyJ6ZKu6KKr54K55Ye7XHJcbiAgICBvbl9pX3dhbm5lcl9hZF9idXR0b25fY2xpY2soKSB7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xyXG4gICAgICAgIHRoaXMuYWRzTWFuYWdlcl9qcy5zaG93UmV3YXJkZWRWaWRlbygoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmxldmVsID4gMTUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcy5hZGRfZXgodXNlcl9kYXRhLnVzZXJfZGF0YS5sZXZlbCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIFwiZ2lmdF9hZF9leFwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubGV2ZWwrKztcclxuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubm93X2V4ID0gMDtcclxuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxfcG9pbnQrKztcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcy5zZXRfZXhfcHJvZ3Jlc3MoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfc2NlbmVfanMubm9kZSwgXCJnaWZ0X2FkX2xldmVsXCIpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKGNhbGxiYWNrKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvL2V4aXQgYnV0dG9uXHJcbiAgICBvbl9leGl0X2J1dHRvbl9jbGljaygpIHtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wucGxheV9zb3VuZF9lZmZlY3QoXCJidXR0b25fZXhpdFwiKTtcclxuXHJcbiAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcclxuICAgIH0sXHJcbiAgICAvL+ajgOa1i+inhumikeaYr+WQpuaSreaUvuaIkOWKn1xyXG4gICAgdmlkZW9fc3VjY2VzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiAod3gpICE9IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWRfY29udHJvbC52aWRlb19zdGF0ZSA9PSAxICYmIHRoaXMuYWRfY29udHJvbC52aWRlb190YWcgPT0gXCJnaWZ0X2FkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkX2NvbnRyb2wudmlkZW9fdGFnID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkX2NvbnRyb2wudmlkZW9fc3RhdGUgPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmxldmVsID4gMTUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLmFkZF9leCh1c2VyX2RhdGEudXNlcl9kYXRhLmxldmVsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9zY2VuZV9qcy5ub2RlLCBcImdpZnRfYWRfZXhcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5sZXZlbCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLm5vd19leCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxfcG9pbnQrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLnNldF9leF9wcm9ncmVzcygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIFwiZ2lmdF9hZF9sZXZlbFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZShjYWxsYmFjayk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYWRfY29udHJvbC52aWRlb190YWcgPT0gbnVsbCAmJiB0aGlzLmFkX2NvbnRyb2wudmlkZW9fc3RhdGUgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUoY2FsbGJhY2spO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlKGNhbGxiYWNrLCAwLjIpO1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLy8gb25Mb2FkICgpIHt9LFxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pO1xyXG4iXX0=