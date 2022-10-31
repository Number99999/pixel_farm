
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

      _this2.ad_control.hide_bannerAd();

      _this2.unschedule(callback);

      _this2.node.destroy();
    });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx1aVxcZ2lmdF91aS5qcyJdLCJuYW1lcyI6WyJ1c2VyX2RhdGEiLCJyZXF1aXJlIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJjZW50ZXJfbm9kZSIsIk5vZGUiLCJleGl0X2J1dHRvbl9ub2RlIiwiaW50cm9kdWNlX2xhYmVsIiwiTGFiZWwiLCJpbmlfbm9kZSIsImFkX2NvbnRyb2wiLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwiYWRzTWFuYWdlcl9qcyIsImdhbWVfc2NlbmVfanMiLCJnYW1lX3J1bGVzX2pzIiwic291bmRfY29udHJvbCIsInNob3dfYmFubmVyQWQiLCJzY2FsZSIsImFjdGl2ZSIsImxldmVsIiwic3RyaW5nIiwidHdlZW4iLCJ0byIsImVhc2luZyIsImNhbGwiLCJzY2hlZHVsZU9uY2UiLCJzdGFydCIsIm9uX2lfd2FubmVyX2FkX2J1dHRvbl9jbGljayIsInBsYXlfc291bmRfZWZmZWN0Iiwic2hvd1Jld2FyZGVkVmlkZW8iLCJhZGRfZXgiLCJjcmVhdGVfdGlwc191aSIsIm5vZGUiLCJub3dfZXgiLCJza2lsbF9wb2ludCIsInNldF9leF9wcm9ncmVzcyIsImhpZGVfYmFubmVyQWQiLCJ1bnNjaGVkdWxlIiwiY2FsbGJhY2siLCJkZXN0cm95Iiwib25fZXhpdF9idXR0b25fY2xpY2siLCJ2aWRlb19zdWNjZXMiLCJ3eCIsInZpZGVvX3N0YXRlIiwidmlkZW9fdGFnIiwic2NoZWR1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsU0FBUyxHQUFHQyxPQUFPLENBQUMsV0FBRCxDQUF2Qjs7QUFDQUMsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFdBQVcsRUFBRUosRUFBRSxDQUFDSyxJQURSO0FBRVJDLElBQUFBLGdCQUFnQixFQUFFTixFQUFFLENB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Q0FBbUJxQixlQUFuQjtBQUNBLGlCQUFLdEIsYUFBTCxDQUFtQmtCLGNBQW5CLENBQWtDLEtBQUtsQixhQUFMLENBQW1CbUIsSUFBckQsRUFBMkQsZUFBM0Q7QUFDSDs7QUFBQTtBQUNELGVBQUt2QixVQUFMLENBQWdCMkIsYUFBaEI7QUFDQSxlQUFLQyxVQUFMLENBQWdCQyxRQUFoQjtBQUNBLGVBQUtOLElBQUwsQ0FBVU8sT0FBVjtBQUNILFNBaEJELE1BZ0JPO0FBQ0gsY0FBSSxLQUFLOUIsVUFBTCxDQUFnQm1DLFNBQWhCLElBQTZCLElBQTdCLElBQXFDLEtBQUtuQyxVQUFMLENBQWdCa0MsV0FBaEIsSUFBK0IsQ0FBeEUsRUFBMkU7QUFDdkUsaUJBQUtOLFVBQUwsQ0FBZ0JDLFFBQWhCO0FBQ0g7O0FBQUE7QUFDSjs7QUFBQTtBQUNKLE9BdEJEOztBQXVCQSxXQUFLTyxRQUFMLENBQWNQLFFBQWQsRUFBd0IsR0FBeEI7QUFDSDs7QUFBQTtBQUNKLEdBdEZJO0FBdUZMO0FBRUFaLEVBQUFBLEtBekZLLG1CQXlGRyxDQUVQLENBM0ZJLENBNkZMOztBQTdGSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgdXNlcl9kYXRhID0gcmVxdWlyZShcInVzZXJfZGF0YVwiKTtcclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBjZW50ZXJfbm9kZTogY2MuTm9kZSxcclxuICAgICAgICBleGl0X2J1dHRvbl9ub2RlOiBjYy5Ob2RlLFxyXG4gICAgICAgIGludHJvZHVjZV9sYWJlbDogY2MuTGFiZWwsXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG4gICAgaW5pX25vZGUoKSB7XHJcbiAgICAgICAgdGhpcy5hZF9jb250cm9sID0gY2MuZmluZChcImFkX2NvbnRyb2xcIikuZ2V0Q29tcG9uZW50KFwiYWRfY29udHJvbFwiKTtcclxuICAgICAgICB0aGlzLmFkc01hbmFnZXJfanMgPSBjYy5maW5kKFwiVUlfUk9PVFwiKS5nZXRDb21wb25lbnQoXCJBZHNNYW5hZ2VyXCIpO1xyXG4gICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcyA9IGNjLmZpbmQoXCJVSV9ST09UXCIpLmdldENvbXBvbmVudChcImdhbWVfc2NlbmVcIik7XHJcbiAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzID0gY2MuZmluZChcIlVJX1JPT1RcIikuZ2V0Q29tcG9uZW50KFwiZ2FtZV9ydWxlc1wiKTtcclxuICAgICAgICB0aGlzLnNvdW5kX2NvbnRyb2wgPSBjYy5maW5kKFwic291bmRfY29udHJvbFwiKS5nZXRDb21wb25lbnQoXCJzb3VuZF9jb250cm9sXCIpO1xyXG4gICAgICAgIHRoaXMuYWRfY29udHJvbC5zaG93X2Jhbm5lckFkKCk7XHJcbiAgICAgICAgdGhpcy5jZW50ZXJfbm9kZS5zY2FsZSA9IDA7XHJcbiAgICAgICAgdGhpcy5leGl0X2J1dHRvbl9ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmxldmVsIDwgMTUpIHtcclxuICAgICAgICAgICAgdGhpcy5pbnRyb2R1Y2VfbGFiZWwuc3RyaW5nID0gXCJXYXRjaCBzaG9ydCBjb21tZXJjaWFscywgXFxubGV2ZWwrMVwiO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW50cm9kdWNlX2xhYmVsLnN0cmluZyA9IFwiV2F0Y2ggc2hvcnQgY29tbWVyY2lhbHMgYW5kIFxcbmdhaW4gaGFsZi1sZXZlbCBleHBlcmllbmNlXCI7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjYy50d2Vlbih0aGlzLmNlbnRlcl9ub2RlKVxyXG4gICAgICAgICAgICAudG8oMC4zLCB7IHNjYWxlOiAxIH0sIHsgZWFzaW5nOiBcImVsYXN0aWNPdXRcIiB9KVxyXG4gICAgICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5leGl0X2J1dHRvbl9ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9LCAxLjUpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zdGFydCgpO1xyXG4gICAgfSxcclxuICAgIC8v5oiR6KaB55yL6KeG6aKR5oyJ6ZKu6KKr54K55Ye7XHJcbiAgICBvbl9pX3dhbm5lcl9hZF9idXR0b25fY2xpY2soKSB7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9jb250cm9sLnBsYXlfc291bmRfZWZmZWN0KFwiYnV0dG9uX2NsaWNrXCIpO1xyXG4gICAgICAgIHRoaXMuYWRzTWFuYWdlcl9qcy5zaG93UmV3YXJkZWRWaWRlbygoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmxldmVsID4gMTUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcy5hZGRfZXgodXNlcl9kYXRhLnVzZXJfZGF0YS5sZXZlbCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIFwiZ2lmdF9hZF9leFwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubGV2ZWwrKztcclxuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEubm93X2V4ID0gMDtcclxuICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxfcG9pbnQrKztcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9ydWxlc19qcy5zZXRfZXhfcHJvZ3Jlc3MoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZV9zY2VuZV9qcy5jcmVhdGVfdGlwc191aSh0aGlzLmdhbWVfc2NlbmVfanMubm9kZSwgXCJnaWZ0X2FkX2xldmVsXCIpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLmFkX2NvbnRyb2wuaGlkZV9iYW5uZXJBZCgpO1xyXG4gICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUoY2FsbGJhY2spO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8vZXhpdCBidXR0b25cclxuICAgIG9uX2V4aXRfYnV0dG9uX2NsaWNrKCkge1xyXG4gICAgICAgIHRoaXMuc291bmRfY29udHJvbC5wbGF5X3NvdW5kX2VmZmVjdChcImJ1dHRvbl9leGl0XCIpO1xyXG4gICAgICAgIHRoaXMuYWRfY29udHJvbC5oaWRlX2Jhbm5lckFkKCk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcclxuICAgIH0sXHJcbiAgICAvL+ajgOa1i+inhumikeaYr+WQpuaSreaUvuaIkOWKn1xyXG4gICAgdmlkZW9fc3VjY2VzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiAod3gpICE9IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWRfY29udHJvbC52aWRlb19zdGF0ZSA9PSAxICYmIHRoaXMuYWRfY29udHJvbC52aWRlb190YWcgPT0gXCJnaWZ0X2FkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkX2NvbnRyb2wudmlkZW9fdGFnID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkX2NvbnRyb2wudmlkZW9fc3RhdGUgPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VyX2RhdGEudXNlcl9kYXRhLmxldmVsID4gMTUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLmFkZF9leCh1c2VyX2RhdGEudXNlcl9kYXRhLmxldmVsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3NjZW5lX2pzLmNyZWF0ZV90aXBzX3VpKHRoaXMuZ2FtZV9zY2VuZV9qcy5ub2RlLCBcImdpZnRfYWRfZXhcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcl9kYXRhLnVzZXJfZGF0YS5sZXZlbCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyX2RhdGEudXNlcl9kYXRhLm5vd19leCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS51c2VyX2RhdGEuc2tpbGxfcG9pbnQrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX3J1bGVzX2pzLnNldF9leF9wcm9ncmVzcygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVfc2NlbmVfanMuY3JlYXRlX3RpcHNfdWkodGhpcy5nYW1lX3NjZW5lX2pzLm5vZGUsIFwiZ2lmdF9hZF9sZXZlbFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRfY29udHJvbC5oaWRlX2Jhbm5lckFkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKGNhbGxiYWNrKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hZF9jb250cm9sLnZpZGVvX3RhZyA9PSBudWxsICYmIHRoaXMuYWRfY29udHJvbC52aWRlb19zdGF0ZSA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZShjYWxsYmFjayk7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUoY2FsbGJhY2ssIDAuMik7XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvLyBvbkxvYWQgKCkge30sXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcclxufSk7XHJcbiJdfQ==