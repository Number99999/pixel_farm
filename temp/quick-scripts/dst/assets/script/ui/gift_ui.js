
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
    this.game_scene_js = cc.find("UI_ROOT").getComponent("game_scene");
    this.game_rules_js = cc.find("UI_ROOT").getComponent("game_rules");
    this.sound_control = cc.find("sound_control").getComponent("sound_control");
    this.ad_control.show_bannerAd();
    this.center_node.scale = 0;
    this.exit_button_node.active = false;

    if (user_data.user_data.level < 15) {
      this.introduce_label.string = "Watch short commercials, \ncurrent rating+1";
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
    this.sound_control.play_sound_effect("button_click");
    this.ad_control.show_videoAd("gift_ad");
    this.video_succes();
  },
  //exit button
  on_exit_button_click: function on_exit_button_click() {
    this.sound_control.play_sound_effect("button_exit");
    this.ad_control.hide_bannerAd();
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
          this.ad_control.hide_bannerAd();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcZ2lmdF91aS5qcyJdLCJuYW1lcyI6WyJ1c2VyX2RhdGEiLCJyZXF1aXJlIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJjZW50ZXJfbm9kZSIsIk5vZGUiLCJleGl0X2J1dHRvbl9ub2RlIiwiaW50cm9kdWNlX2xhYmVsIiwiTGFiZWwiLCJpbmlfbm9kZSIsImFkX2NvbnRyb2wiLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwiZ2FtZV9zY2VuZV9qcyIsImdhbWVfcnVsZXNfanMiLCJzb3VuZF9jb250cm9sIiwic2hvd19iYW5uZXJBZCIsInNjYWxlIiwiYWN0aXZlIiwibGV2ZWwiLCJzdHJpbmciLCJ0d2VlbiIsInRvIiwiZWFzaW5nIiwiY2FsbCIsInNjaGVkdWxlT25jZSIsInN0YXJ0Iiwib25faV93YW5uZXJfYWRfYnV0dG9uX2NsaWNrIiwicGxheV9zb3VuZF9lZmZlY3QiLCJzaG93X3ZpZGVvQWQiLCJ2aWRlb19zdWNjZXMiLCJvbl9leGl0X2J1dHRvbl9jbGljayIsImhpZGVfYmFubmVyQWQiLCJub2RlIiwiZGVzdHJveSIsInd4IiwiY2FsbGJhY2siLCJ2aWRlb19zdGF0ZSIsInZpZGVvX3RhZyIsImFkZF9leCIsImNyZWF0ZV90aXBzX3VpIiwibm93X2V4Iiwic2tpbGxfcG9pbnQiLCJzZXRfZXhfcHJvZ3Jlc3MiLCJ1bnNjaGVkdWxlIiwic2NoZWR1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsU0FBUyxHQUFHQyxPQUFPLENBQUMsV0FBRCxDQUF2Qjs7QUFDQUMsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFdBQVcsRUFBRUosRUFBRSxDQUFDSyxJQURSO0FBRVJDLElBQUFBLGdCQUFnQixFQUFFTixFQUFFLENBQUNLLElBRmI7QUFHUkUsSUFBQUEsZUFBZSxFQUFFUCxFQUFFLENBQUNRO0FBSFosR0FIUDtBQVNMO0FBQ0FDLEVBQUFBLFFBVkssc0JBVU07QUFBQTs7QUFDUCxTQUFLQyxVQUFMLEdBQWtCVixFQUFFLENBQUNXLElBQUgsQ0FBUSxZQUFSLEVBQXNCQyxZQUF0QixDQUFtQyxZQUFuQyxDQUFsQjtBQUNBLFNBQUtDLGFBQUwsR0FBcUJiLEVBQUUsQ0FBQ1csSUFBSCxDQUFRLFNBQVIsRUFBbUJDLFlBQW5CLENBQWdDLFlBQWhDLENBQXJCO0FBQ0EsU0FBS0UsYUFBTCxHQUFxQmQsRUFBRSxDQUFDVyxJQUFILENBQVEsU0FBUixFQUFtQkMsWUFBbkIsQ0FBZ0MsWUFBaEMsQ0FBckI7QUFDQSxTQUFLRyxhQUFMLEdBQXFCZixFQUFFLENBQUNXLElBQUgsQ0FBUSxlQUFSLEVBQXlCQyxZQUF6QixDQUFzQyxlQUF0QyxDQUFyQjtBQUNBLFNBQUtGLFVBQUwsQ0FBZ0JNLGFBQWhCO0FBQ0EsU0FBS1osV0FBTCxDQUFpQmEsS0FBakIsR0FBeUIsQ0FBekI7QUFDQSxTQUFLWCxnQkFBTCxDQUFzQlksTUFBdEIsR0FBK0IsS0FBL0I7O0FBQ0EsUUFBSXBCLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQnFCLEtBQXBCLEdBQTRCLEVBQWhDLEVBQW9DO0FBQ2hDLFdBQUtaLGVBQUwsQ0FBcUJhLE1BQXJCLEdBQThCLDZDQUE5QjtBQUNILEtBRkQsTUFFTztBQUNILFdBQUtiLGVBQUwsQ0FBcUJhLE1BQXJCLEdBQThCLDBEQUE5QjtBQUNIOztBQUFBO0FBQ0RwQixJQUFBQSxFQUFFLENBQUNxQixLQUFILENBQVMsS0FBS2pCLFdBQWQsRUFDS2tCLEVBREwsQ0FDUSxHQURSLEVBQ2E7QUFBRUwsTUFBQUEsS0FBSyxFQUFFO0FBQVQsS0FEYixFQUMyQjtBQUFFTSxNQUFBQSxNQUFNLEVBQUU7QUFBVixLQUQzQixFQUVLQyxJQUZMLENBRVUsWUFBTTtBQUNSLE1BQUEsS0FBSSxDQUFDQyxZQUFMLENBQWtCLFlBQU07QUFDcEIsUUFBQSxLQUFJLENBQUNuQixnQkFBTCxDQUFzQlksTUFBdEIsR0FBK0IsSUFBL0I7QUFDSCxPQUZELEVBRUcsR0FGSDtBQUdILEtBTkwsRUFPS1EsS0FQTDtBQVFILEdBL0JJO0FBZ0NMO0FBQ0FDLEVBQUFBLDJCQWpDSyx5Q0FpQ3lCO0FBQzFCLFNBQUtaLGFBQUwsQ0FBbUJhLGlCQUFuQixDQUFxQyxjQUFyQztBQUNBLFNBQUtsQixVQUFMLENBQWdCbUIsWUFBaEIsQ0FBNkIsU0FBN0I7QUFDQSxTQUFLQyxZQUFMO0FBQ0gsR0FyQ0k7QUFzQ0w7QUFDQUMsRUFBQUEsb0JBdkNLLGtDQXVDa0I7QUFDbkIsU0FBS2hCLGFBQUwsQ0FBbUJhLGlCQUFuQixDQUFxQyxhQUFyQztBQUNBLFNBQUtsQixVQUFMLENBQWdCc0IsYUFBaEI7QUFDQSxTQUFLQyxJQUFMLENBQVVDLE9BQVY7QUFDSCxHQTNDSTtBQTRDTDtBQUNBSixFQUFBQSxZQUFZLEVBQUUsd0JBQVk7QUFDdEIsUUFBSSxPQUFRSyxFQUFSLElBQWUsV0FBbkIsRUFBZ0M7QUFDNUIsVUFBSUMsUUFBUSxHQUFHLFNBQVhBLFFBQVcsR0FBWTtBQUN2QixZQUFJLEtBQUsxQixVQUFMLENBQWdCMkIsV0FBaEIsSUFBK0IsQ0FBL0IsSUFBb0MsS0FBSzNCLFVBQUwsQ0FBZ0I0QixTQUFoQixJQUE2QixTQUFyRSxFQUFnRjtBQUM1RSxlQUFLNUIsVUFBTCxDQUFnQjRCLFNBQWhCLEdBQTRCLElBQTVCO0FBQ0EsZUFBSzVCLFVBQUwsQ0FBZ0IyQixXQUFoQixHQUE4QixDQUE5Qjs7QUFDQSxjQUFJdkMsU0FBUyxDQUFDQSxTQUFWLENBQW9CcUIsS0FBcEIsR0FBNEIsRUFBaEMsRUFBb0M7QUFDaEMsaUJBQUtMLGFBQUwsQ0FBbUJ5QixNQUFuQixDQUEwQnpDLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQnFCLEtBQTlDO0FBQ0EsaUJBQUtOLGFBQUwsQ0FBbUIyQixjQUFuQixDQUFrQyxLQUFLM0IsYUFBTCxDQUFtQm9CLElBQXJELEVBQTJELFlBQTNEO0FBQ0gsV0FIRCxNQUdPO0FBQ0huQyxZQUFBQSxTQUFTLENBQUNBLFNBQVYsQ0FBb0JxQixLQUFwQjtBQUNBckIsWUFBQUEsU0FBUyxDQUFDQSxTQUFWLENBQW9CMkMsTUFBcEIsR0FBNkIsQ0FBN0I7QUFDQTNDLFlBQUFBLFNBQVMsQ0FBQ0EsU0FBVixDQUFvQjRDLFdBQXBCO0FBQ0EsaUJBQUs1QixhQUFMLENBQW1CNkIsZUFBbkI7QUFDQSxpQkFBSzlCLGFBQUwsQ0FBbUIyQixjQUFuQixDQUFrQyxLQUFLM0IsYUFBTCxDQUFtQm9CLElBQXJELEVBQTJELGVBQTNEO0FBQ0g7O0FBQUE7QUFDRCxlQUFLdkIsVUFBTCxDQUFnQnNCLGFBQWhCO0FBQ0EsZUFBS1ksVUFBTCxDQUFnQlIsUUFBaEI7QUFDQSxlQUFLSCxJQUFMLENBQVVDLE9BQVY7QUFDSCxTQWhCRCxNQWdCTztBQUNILGNBQUksS0FBS3hCLFVBQUwsQ0FBZ0I0QixTQUFoQixJQUE2QixJQUE3QixJQUFxQyxLQUFLNUIsVUFBTCxDQUFnQjJCLFdBQWhCLElBQStCLENBQXhFLEVBQTJFO0FBQ3ZFLGlCQUFLTyxVQUFMLENBQWdCUixRQUFoQjtBQUNIOztBQUFBO0FBQ0o7O0FBQUE7QUFDSixPQXRCRDs7QUF1QkEsV0FBS1MsUUFBTCxDQUFjVCxRQUFkLEVBQXdCLEdBQXhCO0FBQ0g7O0FBQUE7QUFDSixHQXhFSTtBQXlFTDtBQUVBVixFQUFBQSxLQTNFSyxtQkEyRUcsQ0FFUCxDQTdFSSxDQStFTDs7QUEvRUssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHVzZXJfZGF0YSA9IHJlcXVpcmUoXCJ1c2VyX2RhdGFcIik7XG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBjZW50ZXJfbm9kZTogY2MuTm9kZSxcbiAgICAgICAgZXhpdF9idXR0b25fbm9kZTogY2MuTm9kZSxcbiAgICAgICAgaW50cm9kdWNlX2xhYmVsOiBjYy5MYWJlbCxcbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG4gICAgaW5pX25vZGUoKSB7XG4gICAgICAgIHRoaXMuYWRfY29udHJvbCA9IGNjLmZpbmQoXCJhZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcImFkX2NvbnRyb2xcIik7XG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfc2NlbmVcIik7XG4gICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfcnVsZXNcIik7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbCA9IGNjLmZpbmQoXCJzb3VuZF9jb250cm9sXCIpLmdldENvbXBvbmVudChcInNvdW5kX2NvbnRyb2xcIik7XG4gICAgICAgIHRoaXMuYWRfY29udHJvbC5zaG93X2Jhbm5lckFkKCk7XG4gICAgICAgIHRoaXMuY2VudGVyX25vZGUuc2NhbGUgPSAwO1xuICAgICAgICB0aGlzLmV4aXRfYnV0dG9uX25vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmxldmVsIDwgMTUpIHtcbiAgICAgICAgICAgIHRoaXMuaW50cm9kdWNlX2xhYmVsLnN0cmluZyA9IFwiV2F0Y2ggc2hvcnQgY29tbWVyY2lhbHMsIFxcbmN1cnJlbnQgcmF0aW5nKzFcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaW50cm9kdWNlX2xhYmVsLnN0cmluZyA9IFwiV2F0Y2ggc2hvcnQgY29tbWVyY2lhbHMgYW5kIFxcbmdhaW4gaGFsZi1sZXZlbCBleHBlcmllbmNlXCI7XG4gICAgICAgIH07XG4gICAgICAgIGNjLnR3ZWVuKHRoaXMuY2VudGVyX25vZGUpXG4gICAgICAgICAgICAudG8oMC4zLCB7IHNjYWxlOiAxIH0sIHsgZWFzaW5nOiBcImVsYXN0aWNPdXRcIiB9KVxuICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5leGl0X2J1dHRvbl9ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfSwgMS41KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGFydCgpO1xuICAgIH0sXG4gICAgLy/miJHopoHnnIvop4bpopHmjInpkq7ooqvngrnlh7tcbiAgICBvbl9pX3dhbm5lcl9hZF9idXR0b25fY2xpY2soKSB7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9jbGlja1wiKTtcbiAgICAgICAgdGhpcy5hZF9jb250cm9sLnNob3dfdmlkZW9BZChcImdpZnRfYWRcIik7XG4gICAgICAgIHRoaXMudmlkZW9fc3VjY2VzKCk7XG4gICAgfSxcbiAgICAvL2V4aXQgYnV0dG9uXG4gICAgb25fZXhpdF9idXR0b25fY2xpY2soKSB7XG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9leGl0XCIpO1xuICAgICAgICB0aGlzLmFkX2NvbnRyb2wuaGlkZV9iYW5uZXJBZCgpO1xuICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xuICAgIH0sXG4gICAgLy/mo4DmtYvop4bpopHmmK/lkKbmkq3mlL7miJDlip9cbiAgICB2aWRlb19zdWNjZXM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiAod3gpICE9IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hZF9jb250cm9sLnZpZGVvX3N0YXRlID09IDEgJiYgdGhpcy5hZF9jb250cm9sLnZpZGVvX3RhZyA9PSBcImdpZnRfYWRcIikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkX2NvbnRyb2wudmlkZW9fdGFnID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZF9jb250cm9sLnZpZGVvX3N0YXRlID0gMjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVzZXJfZGF0YS51c2VyX2RhdGEubGV2ZWwgPiAxNSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLmFkZF9leCh1c2VyX2RhdGEudXNlcl9kYXRhLmxldmVsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfc2NlbmVfanMubm9kZSwgXCJnaWZ0X2FkX2V4XCIpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5sZXZlbCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5ub3dfZXggPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5za2lsbF9wb2ludCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLnNldF9leF9wcm9ncmVzcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9zY2VuZV9qcy5ub2RlLCBcImdpZnRfYWRfbGV2ZWxcIik7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRfY29udHJvbC5oaWRlX2Jhbm5lckFkKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZShjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYWRfY29udHJvbC52aWRlb190YWcgPT0gbnVsbCAmJiB0aGlzLmFkX2NvbnRyb2wudmlkZW9fc3RhdGUgPT0gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUoY2FsbGJhY2ssIDAuMik7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvLyBvbkxvYWQgKCkge30sXG5cbiAgICBzdGFydCgpIHtcblxuICAgIH0sXG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcbn0pO1xuIl19